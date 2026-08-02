import { useState } from 'react';
import { Heart, MapPin, Phone, MessageCircle, Users, UtensilsCrossed, Check, X, Navigation } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import LanguageSwitcher, { useTemplateLang } from '../../_shared/LanguageSwitcher';
import Reveal from '../../_shared/Reveal';
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

// Lịch tháng 01/2026: ngày 1 rơi vào Thứ Năm → cột tuần bắt đầu Thứ Hai nên có 3 ô trống đầu bảng
const CALENDAR_LEAD_OFFSET = 3;
const CALENDAR_DAYS_IN_MONTH = 31;

export default function Wedding4({ lang = 'vi' }: Props) {
  const { activeLang, setActiveLang } = useTemplateLang(lang as Lang, SUPPORTED_LANGS);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { hero: images.hero ?? imgHero };

  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);

  const highlightDay = Number(t.events.day);
  const calendarDays = Array.from({ length: CALENDAR_LEAD_OFFSET }, () => null).concat(
    Array.from({ length: CALENDAR_DAYS_IN_MONTH }, (_, i) => i + 1),
  );

  return (
    <div className="min-h-screen bg-[#FDF9F1] text-[#1c1c17] font-sans antialiased overflow-x-hidden">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher value={activeLang} onChange={setActiveLang} languages={SUPPORTED_LANGS} />
      </div>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative pt-20 pb-24 px-6 overflow-hidden flex flex-col items-center">
          <img src={motifRoses} alt="" aria-hidden className="absolute top-6 left-6 w-56 opacity-40 select-none pointer-events-none hidden lg:block" />
          <img src={motifBlossom} alt="" aria-hidden className="absolute bottom-6 right-6 w-64 opacity-40 select-none pointer-events-none hidden lg:block" />

          <Reveal as="div" variant="fade-up" className="text-center mb-12 relative z-10">
            <p data-field="hero.eyebrow" className="font-sans text-xs text-[#4e4639] mb-4 uppercase tracking-[0.25em]">{t.hero.eyebrow}</p>
            <h1 data-field="hero.coupleNames" className="font-display text-4xl md:text-6xl text-[#775a19] italic">{t.hero.coupleNames}</h1>
          </Reveal>

          <Reveal variant="blur-up" duration={900} delay={150} className="relative z-10">
            <div className="bg-white p-6 shadow-2xl rotate-[-2deg] transition-transform hover:rotate-0 duration-700 max-w-sm md:max-w-md border border-[#ece8e0]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-[#F5F1E9]/80 backdrop-blur shadow-sm border border-[#C5A059]/10 z-20" />
              <div className="relative overflow-hidden aspect-[4/5] bg-[#dddad2]">
                <img src={IMG.hero} alt={t.hero.coupleNames} className="object-cover w-full h-full" />
              </div>
              <div className="pt-8 pb-4 text-center">
                <p data-field="hero.caption" className="font-display text-2xl text-[#6B5B52] italic">{t.hero.caption}</p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 z-30 transition-transform hover:scale-110 duration-300">
                <div className="w-full h-full bg-[#C5A059] rounded-full flex items-center justify-center shadow-md border-2 border-[#e9c176] relative">
                  <Heart aria-hidden className="w-7 h-7 text-white" fill="currentColor" />
                  <div className="absolute inset-1 rounded-full border border-white/20" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={300} className="mt-20 relative z-10">
            <a
              href="#rsvp"
              data-field="hero.rsvpBtn"
              data-track="hero-rsvp"
              className="inline-block px-12 py-4 border border-[#C5A059] text-[#6B5B52] font-sans text-xs uppercase tracking-widest hover:bg-[#C5A059]/10 transition-all duration-500"
            >
              {t.hero.rsvpBtn}
            </a>
            <div className="mt-6 flex justify-center items-center gap-4 text-[#8B8C74]">
              <div className="h-px w-8 bg-[#C5A059]/40" />
              <Heart aria-hidden className="w-4 h-4" />
              <div className="h-px w-8 bg-[#C5A059]/40" />
            </div>
          </Reveal>
        </section>

        <Reveal variant="fade" className="flex justify-center px-6 -mt-4 mb-4">
          <img src={motifDivider} alt="" aria-hidden className="w-full max-w-2xl" />
        </Reveal>

        {/* Ceremony */}
        <section data-section="ceremony" className="py-20 px-6 max-w-4xl mx-auto" id="ceremony">
          <Reveal variant="fade-up" className="border border-[#C5A059] p-2">
            <div className="border-2 border-[#C5A059] p-10 md:p-16 bg-[#F7F3EB]">
              <div className="text-center max-w-2xl mx-auto">
                <h2 data-field="ceremony.title" className="font-display text-2xl md:text-3xl text-[#6B5B52] mb-12 uppercase tracking-widest">{t.ceremony.title}</h2>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="space-y-2">
                    <p data-field="ceremony.groomFamilyLabel" className="text-xs text-[#8B8C74] uppercase tracking-wider">{t.ceremony.groomFamilyLabel}</p>
                    {t.ceremony.groomParents.map((name, i) => (
                      <p key={i} className="font-display text-lg text-[#6B5B52]">{name}</p>
                    ))}
                    <p data-field="ceremony.groomAddress" className="text-sm opacity-60">{t.ceremony.groomAddress}</p>
                  </div>
                  <div className="space-y-2">
                    <p data-field="ceremony.brideFamilyLabel" className="text-xs text-[#8B8C74] uppercase tracking-wider">{t.ceremony.brideFamilyLabel}</p>
                    {t.ceremony.brideParents.map((name, i) => (
                      <p key={i} className="font-display text-lg text-[#6B5B52]">{name}</p>
                    ))}
                    <p data-field="ceremony.brideAddress" className="text-sm opacity-60">{t.ceremony.brideAddress}</p>
                  </div>
                </div>

                <div className="mb-12 space-y-4">
                  <p data-field="ceremony.announceLabel" className="text-xs text-[#8B8C74] uppercase tracking-widest">{t.ceremony.announceLabel}</p>
                  <p data-field="ceremony.announceText" className="italic">{t.ceremony.announceText}</p>
                  <div className="flex flex-col items-center gap-2 pt-2">
                    <h3 data-field="ceremony.groomName" className="font-display text-3xl md:text-4xl text-[#775a19]">{t.ceremony.groomName}</h3>
                    <p data-field="ceremony.groomTitle" className="text-[10px] opacity-60 uppercase">{t.ceremony.groomTitle}</p>
                    <Heart aria-hidden className="w-5 h-5 text-[#C5A059] my-1" />
                    <h3 data-field="ceremony.brideName" className="font-display text-3xl md:text-4xl text-[#775a19]">{t.ceremony.brideName}</h3>
                    <p data-field="ceremony.brideTitle" className="text-[10px] opacity-60 uppercase">{t.ceremony.brideTitle}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-[#C5A059]/20 space-y-6">
                  <p data-field="ceremony.venueLabel" className="text-base">
                    {t.ceremony.venueLabel} <span data-field="ceremony.venueName" className="font-bold">{t.ceremony.venueName}</span>
                  </p>
                  <div className="flex flex-col items-center">
                    <p data-field="ceremony.timeLabel" className="text-xs uppercase tracking-widest mb-2">{t.ceremony.timeLabel}</p>
                    <span data-field="ceremony.time" className="text-5xl md:text-6xl font-display text-[#775a19]">{t.ceremony.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-8 py-4 border-y border-[#C5A059]/20">
                    <span data-field="ceremony.weekday" className="text-xs uppercase tracking-widest">{t.ceremony.weekday}</span>
                    <div className="w-px h-8 bg-[#C5A059]/30" />
                    <span data-field="ceremony.day" className="text-4xl font-display text-[#775a19]">{t.ceremony.day}</span>
                    <div className="w-px h-8 bg-[#C5A059]/30" />
                    <span data-field="ceremony.month" className="text-xs uppercase tracking-widest">{t.ceremony.month}</span>
                  </div>
                  <p data-field="ceremony.year" className="text-2xl font-display">{t.ceremony.year}</p>
                  <p data-field="ceremony.lunarNote" className="italic text-[#8B8C74]">{t.ceremony.lunarNote}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Events / Reception */}
        <section data-section="events" className="pb-20 px-6 max-w-4xl mx-auto" id="events">
          <Reveal variant="fade-up" className="border border-[#C5A059] p-2">
            <div className="border-2 border-[#C5A059] p-10 md:p-16 bg-[#F7F3EB]">
              <div className="text-center max-w-2xl mx-auto">
                <h2 data-field="events.title" className="font-display text-2xl md:text-3xl text-[#6B5B52] mb-8 uppercase tracking-widest">{t.events.title}</h2>
                <div className="space-y-10 text-[#4e4639]">
                  <div className="flex flex-col items-center">
                    <p data-field="events.timeLabel" className="text-xs uppercase tracking-widest mb-2">{t.events.timeLabel}</p>
                    <span data-field="events.time" className="text-5xl md:text-6xl font-display text-[#775a19]">{t.events.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-8 py-4 border-y border-[#C5A059]/20">
                    <span data-field="events.weekday" className="text-xs uppercase tracking-widest">{t.events.weekday}</span>
                    <div className="w-px h-8 bg-[#C5A059]/30" />
                    <span data-field="events.day" className="text-4xl font-display text-[#775a19]">{t.events.day}</span>
                    <div className="w-px h-8 bg-[#C5A059]/30" />
                    <span data-field="events.month" className="text-xs uppercase tracking-widest">{t.events.month}</span>
                  </div>
                  <p data-field="events.year" className="text-2xl font-display">{t.events.year}</p>
                  <p data-field="events.lunarNote" className="italic text-[#8B8C74]">{t.events.lunarNote}</p>

                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <Reveal variant="fade-up" className="text-center flex flex-col items-center gap-1">
                      <Users aria-hidden className="w-5 h-5 text-[#C5A059] mb-1" />
                      <p data-field="events.welcomeLabel" className="text-xs uppercase tracking-wider opacity-60">{t.events.welcomeLabel}</p>
                      <p data-field="events.welcomeTime" className="text-xl font-display">{t.events.welcomeTime}</p>
                    </Reveal>
                    <Reveal variant="fade-up" delay={100} className="text-center flex flex-col items-center gap-1">
                      <UtensilsCrossed aria-hidden className="w-5 h-5 text-[#C5A059] mb-1" />
                      <p data-field="events.startLabel" className="text-xs uppercase tracking-wider opacity-60">{t.events.startLabel}</p>
                      <p data-field="events.startTime" className="text-xl font-display">{t.events.startTime}</p>
                    </Reveal>
                  </div>

                  {/* Calendar mock */}
                  <Reveal variant="zoom-in" className="mt-8 bg-[#6B5B52] p-8 rounded shadow-inner text-white mx-auto max-w-sm">
                    <p data-field="events.calendarMonthYear" className="font-display text-center mb-6">{t.events.calendarMonthYear}</p>
                    <div className="grid grid-cols-7 text-[10px] gap-2 text-center uppercase opacity-60 mb-4">
                      {t.events.weekdaysShort.map((w, i) => <span key={i}>{w}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {calendarDays.map((day, i) => {
                        if (day === null) return <span key={`empty-${i}`} />;
                        if (day === highlightDay) {
                          return (
                            <span key={day} className="relative flex items-center justify-center">
                              <span className="absolute inset-0 flex items-center justify-center">
                                <Heart aria-hidden className="w-6 h-6 text-[#e9c176]" fill="currentColor" />
                              </span>
                              <span className="relative text-[#261900] z-10 font-bold">{day}</span>
                            </span>
                          );
                        }
                        return <span key={day}>{day}</span>;
                      })}
                    </div>
                  </Reveal>

                  <div className="pt-8">
                    <h3 data-field="events.venueLabel" className="text-xs uppercase tracking-widest mb-4">{t.events.venueLabel}</h3>
                    <p data-field="events.venueName" className="font-display text-xl text-[#775a19] mb-2">{t.events.venueName}</p>
                    <p data-field="events.venueAddress" className="text-[#6B5B52]/80 max-w-xs mx-auto">{t.events.venueAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* RSVP */}
        <section data-section="rsvp" className="pb-20 px-6 max-w-3xl mx-auto" id="rsvp">
          <Reveal variant="fade-up" className="text-center mb-10">
            <h2 data-field="rsvp.title" className="font-display text-2xl md:text-3xl text-[#6B5B52] mb-3 uppercase tracking-widest">{t.rsvp.title}</h2>
            <p data-field="rsvp.subtitle" className="max-w-md mx-auto">{t.rsvp.subtitle}</p>
            <p data-field="rsvp.deadline" className="text-xs text-[#8B8C74] mt-2 uppercase tracking-wider">{t.rsvp.deadline}</p>
          </Reveal>

          <Reveal variant="fade-up" delay={100} className="border border-[#C5A059] p-2">
            <form className="border-2 border-[#C5A059] p-8 md:p-12 bg-[#F7F3EB] space-y-6" onSubmit={e => e.preventDefault()}>
              <div>
                <label htmlFor="rsvp-name" data-field="rsvp.nameLabel" className="block text-xs text-[#8B8C74] mb-2 uppercase tracking-wider">{t.rsvp.nameLabel}</label>
                <input id="rsvp-name" type="text" placeholder={t.rsvp.namePlaceholder}
                  className="w-full bg-transparent border-b border-[#d1c5b4] focus:border-[#C5A059] focus:ring-0 px-0 py-2 outline-none placeholder:text-[#6B5B52]/40" />
              </div>

              <div>
                <p data-field="rsvp.attendanceLabel" className="text-xs text-[#8B8C74] mb-3 uppercase tracking-wider">{t.rsvp.attendanceLabel}</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 border text-xs uppercase tracking-wider transition-colors cursor-pointer ${attending === 'yes' ? 'bg-[#775a19] text-white border-[#775a19]' : 'border-[#C5A059] text-[#6B5B52] hover:bg-[#C5A059]/10'}`}
                  >
                    <Check aria-hidden className="w-4 h-4" /> {t.rsvp.attendYes}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 border text-xs uppercase tracking-wider transition-colors cursor-pointer ${attending === 'no' ? 'bg-[#6B5B52] text-white border-[#6B5B52]' : 'border-[#C5A059] text-[#6B5B52] hover:bg-[#C5A059]/10'}`}
                  >
                    <X aria-hidden className="w-4 h-4" /> {t.rsvp.attendNo}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="rsvp-message" data-field="rsvp.messageLabel" className="block text-xs text-[#8B8C74] mb-2 uppercase tracking-wider">{t.rsvp.messageLabel}</label>
                <textarea id="rsvp-message" placeholder={t.rsvp.messagePlaceholder} rows={3}
                  className="w-full bg-transparent border-b border-[#d1c5b4] focus:border-[#C5A059] focus:ring-0 px-0 py-2 outline-none placeholder:text-[#6B5B52]/40 resize-none" />
              </div>

              <div className="text-center pt-2">
                <button type="submit" data-field="rsvp.submit" data-track="rsvp-submit"
                  className="bg-[#775a19] text-white px-10 py-3 text-xs uppercase tracking-widest border border-[#775a19] hover:bg-[#F7F3EB] hover:text-[#775a19] transition-all cursor-pointer">
                  {t.rsvp.submit}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal variant="fade-up" delay={200} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-center gap-4 border border-[#C5A059]/30 py-4 px-4">
              <span className="font-display text-[#775a19]">{t.ceremony.groomName}</span>
              <a href={`tel:${t.rsvp.groomPhone.replace(/\s/g, '')}`} data-track="rsvp-call-groom" title={t.rsvp.groomPhone} className="text-[#6B5B52] hover:text-[#775a19]"><Phone aria-hidden className="w-4 h-4" /></a>
              <a href={t.rsvp.groomZalo} target="_blank" rel="noreferrer" data-track="rsvp-zalo-groom" title="Zalo" className="text-[#6B5B52] hover:text-[#775a19]"><MessageCircle aria-hidden className="w-4 h-4" /></a>
            </div>
            <div className="flex items-center justify-center gap-4 border border-[#C5A059]/30 py-4 px-4">
              <span className="font-display text-[#775a19]">{t.ceremony.brideName}</span>
              <a href={`tel:${t.rsvp.bridePhone.replace(/\s/g, '')}`} data-track="rsvp-call-bride" title={t.rsvp.bridePhone} className="text-[#6B5B52] hover:text-[#775a19]"><Phone aria-hidden className="w-4 h-4" /></a>
              <a href={t.rsvp.brideZalo} target="_blank" rel="noreferrer" data-track="rsvp-zalo-bride" title="Zalo" className="text-[#6B5B52] hover:text-[#775a19]"><MessageCircle aria-hidden className="w-4 h-4" /></a>
            </div>
          </Reveal>
        </section>

        {/* Location */}
        <section data-section="location" className="pb-24 px-6 max-w-5xl mx-auto" id="location">
          <Reveal variant="fade-up" className="text-center mb-12">
            <MapPin aria-hidden className="w-9 h-9 text-[#C5A059] mb-4 mx-auto" />
            <h2 data-field="location.title" className="font-display text-2xl md:text-3xl text-[#6B5B52]">{t.location.title}</h2>
            <p data-field="location.address" className="mt-2 text-[#6B5B52]/80">{t.location.address}</p>
          </Reveal>
          <Reveal variant="zoom-in" duration={800} className="w-full aspect-[21/9] border border-[#C5A059] overflow-hidden">
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
              <div className="w-full h-full bg-[#F7F3EB] flex flex-col items-center justify-center gap-4 text-center px-6">
                <MapPin aria-hidden className="w-10 h-10 text-[#775a19]" />
                <p data-field="location.mapPlaceholder" className="text-sm text-[#6B5B52]/70 max-w-xs">{t.location.mapPlaceholder}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.location.address)}`}
                  target="_blank" rel="noreferrer" data-track="get-directions"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#775a19] border border-[#C5A059] px-5 py-2.5 hover:bg-[#C5A059]/10 transition-colors"
                >
                  <Navigation aria-hidden className="w-3.5 h-3.5" /> {t.location.venueName}
                </a>
              </div>
            )}
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#f1ede5] border-t border-[#C5A059]/20">
        <Reveal variant="fade" className="flex flex-col items-center gap-2 py-16 px-6">
          <span data-field="footer.brand" className="font-display text-2xl text-[#775a19] mb-4">{t.footer.brand}</span>
          <p data-field="footer.tagline" className="text-sm text-[#4e4639]/80 mb-8">{t.footer.tagline}</p>
          <div className="flex gap-12">
            <a data-field="footer.privacy" className="text-xs uppercase tracking-wider text-[#4e4639]/80 hover:text-[#775a19] transition-colors" href="#">{t.footer.privacy}</a>
            <a data-field="footer.contact" className="text-xs uppercase tracking-wider text-[#4e4639]/80 hover:text-[#775a19] transition-colors" href="#">{t.footer.contact}</a>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="w-12 h-px bg-[#C5A059]/20" />
            <Heart aria-hidden className="w-4 h-4 text-[#8B8C74]" />
            <div className="w-12 h-px bg-[#C5A059]/20" />
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
