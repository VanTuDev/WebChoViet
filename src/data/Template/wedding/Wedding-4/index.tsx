import { useEffect, useRef, useState } from 'react';
import { Heart, MapPin, Users, UtensilsCrossed, Check, X, Navigation, Music, Play, Pause } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import LanguageSwitcher, { useTemplateLang } from '../../_shared/LanguageSwitcher';
import Reveal from '../../_shared/Reveal';
import { useCalendarMonth } from '../../_shared/useCalendarMonth';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHero from './images/hero.jpg';
import motifRoses from './images/motif-roses.svg';
import motifBlossom from './images/motif-blossom.svg';
import motifDivider from './images/motif-divider.svg';

const SUPPORTED_LANGS = ['vi', 'en', 'zh', 'ko'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
interface Props { lang?: string }

// Ngày cưới thật dùng để tính lịch mini — đổi 2 số này khi đổi ngày cưới, useCalendarMonth
// tự tính đúng thứ trong tuần + số ô trống đầu bảng, không cần tự nhẩm tay.
const WEDDING_YEAR = 2026;
const WEDDING_MONTH = 1; // 1–12

export default function Wedding4({ lang = 'vi' }: Props) {
  const { activeLang, setActiveLang } = useTemplateLang(lang as Lang, SUPPORTED_LANGS);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { hero: images.hero ?? imgHero };

  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);

  const highlightDay = Number(t.events.day);
  const { cells: calendarDays } = useCalendarMonth({ year: WEDDING_YEAR, month: WEDDING_MONTH });

  // ── Danh sách nhạc nền — khách bấm chọn 1 bài trong list thay vì chỉ 1 bài autoplay cố định.
  // `src` để trống cho tới khi chủ tiệc tự thêm link file mp3 qua panel tùy chỉnh (giống cách
  // `mapUrl` hoạt động) — bấm 1 bài chưa có src sẽ bị vô hiệu hoá (disabled), không lỗi im lặng.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicPanelRef = useRef<HTMLDivElement | null>(null);
  const [musicOpen, setMusicOpen] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const tracks = t.music.tracks;

  useEffect(() => {
    if (!musicOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (musicPanelRef.current && !musicPanelRef.current.contains(e.target as Node)) setMusicOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [musicOpen]);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const handleTrackClick = (i: number) => {
    const track = tracks[i];
    const audio = audioRef.current;
    if (!track?.src || !audio) return;
    if (playingIndex === i) {
      audio.pause();
      setPlayingIndex(null);
      return;
    }
    audio.src = track.src;
    void audio.play();
    setPlayingIndex(i);
  };

  return (
    // Trình bày như 1 tấm thiệp dọc duy nhất căn giữa trên nền trắng. Bề rộng thiệp
    // cố định bằng px/rem (KHÔNG dùng vw) — TemplateEditorPage render preview desktop
    // qua 1 pane có thể bị scale/co lại để vừa khung, nên đơn vị vw sẽ tính theo bề
    // ngang cửa sổ trình duyệt thật rồi bị scale chồng thêm 1 lần nữa, ra kích thước
    // không đoán trước được — cố định px mới cho kết quả nhất quán ở mọi nơi hiển thị.
    <div className="min-h-screen bg-white flex justify-center sm:py-10">
      <div className="relative w-full sm:w-120 p-1.5 sm:p-2">
        <div className="border border-[#C5A059] p-1">
          <div className="relative border-2 border-[#C5A059] bg-[#FDF9F1] text-[#1c1c17] font-sans antialiased overflow-hidden">

            <div className="absolute top-3 right-3 z-50">
              <LanguageSwitcher value={activeLang} onChange={setActiveLang} languages={SUPPORTED_LANGS} />
            </div>

            <main>
              {/* Hero */}
              <section data-section="hero" className="relative pt-16 pb-10 px-6 flex flex-col items-center">
                <img src={motifRoses} alt="" aria-hidden className="absolute top-2 left-2 w-16 opacity-40 select-none pointer-events-none" />
                <img src={motifBlossom} alt="" aria-hidden className="absolute bottom-2 right-2 w-20 opacity-40 select-none pointer-events-none" />

                <Reveal as="div" variant="fade-up" className="text-center mb-8 relative z-10">
                  <p data-field="hero.eyebrow" className="font-sans text-[11px] text-[#4e4639] mb-3 uppercase tracking-[0.25em]">{t.hero.eyebrow}</p>
                  <h1 data-field="hero.coupleNames" className="font-display text-3xl text-[#775a19] italic leading-tight">{t.hero.coupleNames}</h1>
                </Reveal>

                <Reveal variant="blur-up" duration={900} delay={150} className="relative z-10 w-full">
                  <div className="bg-white p-4 shadow-xl rotate-[-2deg] transition-transform hover:rotate-0 duration-700 border border-[#ece8e0]">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#F5F1E9]/80 backdrop-blur shadow-sm border border-[#C5A059]/10 z-20" />
                    <div className="relative overflow-hidden aspect-4/5 bg-[#dddad2]">
                      <img src={IMG.hero} alt={t.hero.coupleNames} className="object-cover w-full h-full" />
                    </div>
                    <div className="pt-6 pb-3 text-center">
                      <p data-field="hero.caption" className="font-display text-lg text-[#6B5B52] italic">{t.hero.caption}</p>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-14 h-14 z-30 transition-transform hover:scale-110 duration-300">
                      <div className="w-full h-full bg-[#C5A059] rounded-full flex items-center justify-center shadow-md border-2 border-[#e9c176] relative">
                        <Heart aria-hidden className="w-5 h-5 text-white" fill="currentColor" />
                        <div className="absolute inset-1 rounded-full border border-white/20" />
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delay={300} className="mt-10 relative z-10 w-full flex flex-col items-center">
                  <a
                    href="#rsvp"
                    data-field="hero.rsvpBtn"
                    data-track="hero-rsvp"
                    className="inline-block w-full text-center px-6 py-3.5 border border-[#C5A059] text-[#6B5B52] font-sans text-[11px] uppercase tracking-widest hover:bg-[#C5A059]/10 transition-all duration-500"
                  >
                    {t.hero.rsvpBtn}
                  </a>
                  <div className="mt-5 flex justify-center items-center gap-4 text-[#8B8C74]">
                    <div className="h-px w-8 bg-[#C5A059]/40" />
                    <Heart aria-hidden className="w-4 h-4" />
                    <div className="h-px w-8 bg-[#C5A059]/40" />
                  </div>
                </Reveal>
              </section>

              <Reveal variant="fade" className="flex justify-center px-6 mb-2">
                <img src={motifDivider} alt="" aria-hidden className="w-full" />
              </Reveal>

              {/* Ceremony */}
              <Reveal variant="fade-up" as="section" data-section="ceremony" className="pt-10 pb-10 px-6 border-t border-[#C5A059]/20 mt-4" id="ceremony">
                <h2 data-field="ceremony.title" className="font-display text-xl text-[#6B5B52] mb-8 uppercase tracking-widest text-center">{t.ceremony.title}</h2>

                {/* Nhà Trai/Nhà Gái PHẢI đối xứng 2 cột kể cả trên mobile (yêu cầu rõ ràng —
                    khác quy tắc "gộp về 1 cột" thường áp cho grid rộng khác) — cột hẹp lại
                    thì tên xuống dòng tự nhiên, không cắt/ẩn nội dung. */}
                <div className="grid grid-cols-2 gap-3 mb-10 text-center">
                  <div className="space-y-1.5">
                    <p data-field="ceremony.groomFamilyLabel" className="text-[11px] text-[#8B8C74] uppercase tracking-wider">{t.ceremony.groomFamilyLabel}</p>
                    {t.ceremony.groomParents.map((name, i) => (
                      <p key={i} className="font-display text-sm text-[#6B5B52]">{name}</p>
                    ))}
                    <p data-field="ceremony.groomAddress" className="text-xs opacity-60">{t.ceremony.groomAddress}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p data-field="ceremony.brideFamilyLabel" className="text-[11px] text-[#8B8C74] uppercase tracking-wider">{t.ceremony.brideFamilyLabel}</p>
                    {t.ceremony.brideParents.map((name, i) => (
                      <p key={i} className="font-display text-sm text-[#6B5B52]">{name}</p>
                    ))}
                    <p data-field="ceremony.brideAddress" className="text-xs opacity-60">{t.ceremony.brideAddress}</p>
                  </div>
                </div>

                <div className="mb-10 space-y-3 text-center">
                  <p data-field="ceremony.announceLabel" className="text-[11px] text-[#8B8C74] uppercase tracking-widest">{t.ceremony.announceLabel}</p>
                  <p data-field="ceremony.announceText" className="italic text-sm">{t.ceremony.announceText}</p>
                  <div className="flex flex-col items-center gap-1.5 pt-2">
                    <h3 data-field="ceremony.groomName" className="font-display text-2xl text-[#775a19]">{t.ceremony.groomName}</h3>
                    <p data-field="ceremony.groomTitle" className="text-[10px] opacity-60 uppercase">{t.ceremony.groomTitle}</p>
                    <Heart aria-hidden className="w-4 h-4 text-[#C5A059] my-1" />
                    <h3 data-field="ceremony.brideName" className="font-display text-2xl text-[#775a19]">{t.ceremony.brideName}</h3>
                    <p data-field="ceremony.brideTitle" className="text-[10px] opacity-60 uppercase">{t.ceremony.brideTitle}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#C5A059]/20 space-y-4 text-center">
                  <p data-field="ceremony.venueLabel" className="text-sm">
                    {t.ceremony.venueLabel} <span data-field="ceremony.venueName" className="font-bold">{t.ceremony.venueName}</span>
                  </p>
                  <div className="flex flex-col items-center">
                    <p data-field="ceremony.timeLabel" className="text-[11px] uppercase tracking-widest mb-1.5">{t.ceremony.timeLabel}</p>
                    <span data-field="ceremony.time" className="text-5xl font-display text-[#775a19]">{t.ceremony.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 py-3 border-y border-[#C5A059]/20">
                    <span data-field="ceremony.weekday" className="text-[11px] uppercase tracking-widest">{t.ceremony.weekday}</span>
                    <div className="w-px h-7 bg-[#C5A059]/30" />
                    <span data-field="ceremony.day" className="text-3xl font-display text-[#775a19]">{t.ceremony.day}</span>
                    <div className="w-px h-7 bg-[#C5A059]/30" />
                    <span data-field="ceremony.month" className="text-[11px] uppercase tracking-widest">{t.ceremony.month}</span>
                  </div>
                  <p data-field="ceremony.year" className="text-xl font-display">{t.ceremony.year}</p>
                  <p data-field="ceremony.lunarNote" className="italic text-xs text-[#8B8C74]">{t.ceremony.lunarNote}</p>
                </div>
              </Reveal>

              {/* Events / Reception */}
              <Reveal variant="fade-up" as="section" data-section="events" className="pt-10 pb-10 px-6 border-t border-[#C5A059]/20" id="events">
                <h2 data-field="events.title" className="font-display text-xl text-[#6B5B52] mb-6 uppercase tracking-widest text-center">{t.events.title}</h2>
                <div className="space-y-8 text-[#4e4639] text-center">
                  <div className="flex flex-col items-center">
                    <p data-field="events.timeLabel" className="text-[11px] uppercase tracking-widest mb-1.5">{t.events.timeLabel}</p>
                    <span data-field="events.time" className="text-5xl font-display text-[#775a19]">{t.events.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 py-3 border-y border-[#C5A059]/20">
                    <span data-field="events.weekday" className="text-[11px] uppercase tracking-widest">{t.events.weekday}</span>
                    <div className="w-px h-7 bg-[#C5A059]/30" />
                    <span data-field="events.day" className="text-3xl font-display text-[#775a19]">{t.events.day}</span>
                    <div className="w-px h-7 bg-[#C5A059]/30" />
                    <span data-field="events.month" className="text-[11px] uppercase tracking-widest">{t.events.month}</span>
                  </div>
                  <p data-field="events.year" className="text-xl font-display">{t.events.year}</p>
                  <p data-field="events.lunarNote" className="italic text-xs text-[#8B8C74]">{t.events.lunarNote}</p>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <Reveal variant="fade-up" className="text-center flex flex-col items-center gap-1">
                      <Users aria-hidden className="w-4 h-4 text-[#C5A059] mb-1" />
                      <p data-field="events.welcomeLabel" className="text-[10px] uppercase tracking-wider opacity-60">{t.events.welcomeLabel}</p>
                      <p data-field="events.welcomeTime" className="text-lg font-display">{t.events.welcomeTime}</p>
                    </Reveal>
                    <Reveal variant="fade-up" delay={100} className="text-center flex flex-col items-center gap-1">
                      <UtensilsCrossed aria-hidden className="w-4 h-4 text-[#C5A059] mb-1" />
                      <p data-field="events.startLabel" className="text-[10px] uppercase tracking-wider opacity-60">{t.events.startLabel}</p>
                      <p data-field="events.startTime" className="text-lg font-display">{t.events.startTime}</p>
                    </Reveal>
                  </div>

                  {/* Calendar mock */}
                  <Reveal variant="zoom-in" className="mt-6 bg-[#6B5B52] p-4 rounded shadow-inner text-white">
                    <p data-field="events.calendarMonthYear" className="font-display text-center mb-4 text-sm">{t.events.calendarMonthYear}</p>
                    <div className="grid grid-cols-7 text-[9px] gap-1 text-center uppercase opacity-60 mb-3">
                      {t.events.weekdaysShort.map((w, i) => <span key={i}>{w}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
                      {calendarDays.map((day, i) => {
                        if (day === null) return <span key={`empty-${i}`} />;
                        if (day === highlightDay) {
                          return (
                            <span key={day} className="relative flex items-center justify-center h-5">
                              <span className="absolute inset-0 flex items-center justify-center">
                                <Heart aria-hidden className="w-5 h-5 text-[#e9c176]" fill="currentColor" />
                              </span>
                              <span className="relative text-[#261900] z-10 font-bold">{day}</span>
                            </span>
                          );
                        }
                        return <span key={day} className="h-5 flex items-center justify-center">{day}</span>;
                      })}
                    </div>
                  </Reveal>

                  <div className="pt-6">
                    <h3 data-field="events.venueLabel" className="text-[11px] uppercase tracking-widest mb-3">{t.events.venueLabel}</h3>
                    <p data-field="events.venueName" className="font-display text-lg text-[#775a19] mb-1.5">{t.events.venueName}</p>
                    <p data-field="events.venueAddress" className="text-[#6B5B52]/80 text-sm">{t.events.venueAddress}</p>
                  </div>
                </div>
              </Reveal>

              {/* RSVP */}
              <Reveal variant="fade-up" as="section" data-section="rsvp" className="pt-10 pb-10 px-6 border-t border-[#C5A059]/20" id="rsvp">
                <div className="text-center mb-6">
                  <h2 data-field="rsvp.title" className="font-display text-xl text-[#6B5B52] mb-2 uppercase tracking-widest">{t.rsvp.title}</h2>
                  <p data-field="rsvp.subtitle" className="text-sm">{t.rsvp.subtitle}</p>
                  <p data-field="rsvp.deadline" className="text-[10px] text-[#8B8C74] mt-2 uppercase tracking-wider">{t.rsvp.deadline}</p>
                </div>

                <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label htmlFor="rsvp-name" data-field="rsvp.nameLabel" className="block text-[11px] text-[#8B8C74] mb-2 uppercase tracking-wider">{t.rsvp.nameLabel}</label>
                    <input id="rsvp-name" type="text" placeholder={t.rsvp.namePlaceholder}
                      className="w-full bg-transparent border-b border-[#d1c5b4] focus:border-[#C5A059] focus:ring-0 px-0 py-2 outline-none placeholder:text-[#6B5B52]/40 text-sm" />
                  </div>

                  <div>
                    <p data-field="rsvp.attendanceLabel" className="text-[11px] text-[#8B8C74] mb-2.5 uppercase tracking-wider">{t.rsvp.attendanceLabel}</p>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setAttending('yes')}
                        className={`flex items-center justify-center gap-2 py-2.5 border text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${attending === 'yes' ? 'bg-[#775a19] text-white border-[#775a19]' : 'border-[#C5A059] text-[#6B5B52] hover:bg-[#C5A059]/10'}`}
                      >
                        <Check aria-hidden className="w-3.5 h-3.5" /> {t.rsvp.attendYes}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending('no')}
                        className={`flex items-center justify-center gap-2 py-2.5 border text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${attending === 'no' ? 'bg-[#6B5B52] text-white border-[#6B5B52]' : 'border-[#C5A059] text-[#6B5B52] hover:bg-[#C5A059]/10'}`}
                      >
                        <X aria-hidden className="w-3.5 h-3.5" /> {t.rsvp.attendNo}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rsvp-message" data-field="rsvp.messageLabel" className="block text-[11px] text-[#8B8C74] mb-2 uppercase tracking-wider">{t.rsvp.messageLabel}</label>
                    <textarea id="rsvp-message" placeholder={t.rsvp.messagePlaceholder} rows={3}
                      className="w-full bg-transparent border-b border-[#d1c5b4] focus:border-[#C5A059] focus:ring-0 px-0 py-2 outline-none placeholder:text-[#6B5B52]/40 resize-none text-sm" />
                  </div>

                  <div className="text-center pt-1">
                    <button type="submit" data-field="rsvp.submit" data-track="rsvp-submit"
                      className="w-full bg-[#775a19] text-white px-6 py-3 text-[11px] uppercase tracking-widest border border-[#775a19] hover:bg-[#F7F3EB] hover:text-[#775a19] transition-all cursor-pointer">
                      {t.rsvp.submit}
                    </button>
                  </div>
                </form>
              </Reveal>

              {/* Location */}
              <Reveal variant="fade-up" as="section" data-section="location" className="pt-10 pb-10 px-6 border-t border-[#C5A059]/20" id="location">
                <div className="text-center mb-6">
                  <MapPin aria-hidden className="w-7 h-7 text-[#C5A059] mb-3 mx-auto" />
                  <h2 data-field="location.title" className="font-display text-xl text-[#6B5B52]">{t.location.title}</h2>
                  <p data-field="location.address" className="mt-2 text-sm text-[#6B5B52]/80">{t.location.address}</p>
                </div>
                <div className="w-full aspect-4/5 border border-[#C5A059] overflow-hidden">
                  {t.location.mapUrl ? (
                    <iframe
                      src={toGoogleMapsEmbedUrl(t.location.mapUrl)}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#F7F3EB] flex flex-col items-center justify-center gap-3 text-center px-6">
                      <MapPin aria-hidden className="w-9 h-9 text-[#775a19]" />
                      <p data-field="location.mapPlaceholder" className="text-xs text-[#6B5B52]/70">{t.location.mapPlaceholder}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.location.address)}`}
                        target="_blank" rel="noreferrer" data-track="get-directions"
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#775a19] border border-[#C5A059] px-4 py-2 hover:bg-[#C5A059]/10 transition-colors"
                      >
                        <Navigation aria-hidden className="w-3 h-3" /> {t.location.venueName}
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            </main>

            {/* Footer */}
            <Reveal variant="fade" as="footer" data-section="footer" className="bg-[#f1ede5] border-t border-[#C5A059]/20 flex flex-col items-center gap-2 py-10 px-6">
              <span data-field="footer.brand" className="font-display text-xl text-[#775a19] mb-3">{t.footer.brand}</span>
              <p data-field="footer.tagline" className="text-xs text-center text-[#4e4639]/80">{t.footer.tagline}</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-px bg-[#C5A059]/20" />
                <Heart aria-hidden className="w-3.5 h-3.5 text-[#8B8C74]" />
                <div className="w-10 h-px bg-[#C5A059]/20" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Music player — nổi cố định theo màn hình (KHÔNG đặt trong cây có Reveal/overflow-hidden
          ở trên: transform lúc ẩn của Reveal sẽ tạo containing block mới làm fixed lệch gốc).
          Đặt ở góc dưới-TRÁI — góc dưới-phải đã bị badge "Made with vngoweb" cố định chiếm
          (xem PublicSitePage.tsx, `fixed bottom-5 right-5`, hiện diện trên MỌI site đã publish). */}
      <div ref={musicPanelRef} className="fixed bottom-5 left-5 z-60 flex flex-col items-start gap-2">
        {musicOpen && (
          <div className="w-64 max-w-[80vw] bg-[#FDF9F1] border border-[#C5A059] shadow-xl p-3">
            <p className="text-[10px] uppercase tracking-widest text-[#8B8C74] mb-2 px-1">{t.music.toggleLabel}</p>
            <div className="space-y-1">
              {tracks.map((track, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleTrackClick(i)}
                  disabled={!track.src}
                  data-track="music-select"
                  className={`w-full flex items-center gap-2 px-2 py-2 text-left text-xs transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${playingIndex === i ? 'bg-[#C5A059]/15 text-[#775a19]' : 'text-[#6B5B52] hover:bg-[#C5A059]/10'}`}
                >
                  {playingIndex === i ? <Pause aria-hidden className="w-3.5 h-3.5 shrink-0" /> : <Play aria-hidden className="w-3.5 h-3.5 shrink-0" />}
                  <span className="min-w-0">
                    <span data-field={`music.tracks.${i}.title`} className="block truncate font-medium">{track.title}</span>
                    <span data-field={`music.tracks.${i}.artist`} className="block truncate text-[10px] opacity-60">{track.artist}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setMusicOpen(o => !o)}
          aria-label={t.music.toggleLabel}
          data-track="music-toggle"
          className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg border-2 border-[#e9c176] transition-colors cursor-pointer ${playingIndex !== null ? 'bg-[#775a19] text-white' : 'bg-[#C5A059] text-white'}`}
        >
          <Music aria-hidden className="w-4.5 h-4.5" />
        </button>
        <audio ref={audioRef} loop onEnded={() => setPlayingIndex(null)} />
      </div>
    </div>
  );
}
