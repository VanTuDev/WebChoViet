import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import LanguageSwitcher, { useTemplateLang } from '../../_shared/LanguageSwitcher';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';

const SUPPORTED_LANGS = ['vi', 'en', 'zh', 'ko'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
interface Props { lang?: string }

// Lịch tháng 10/2024: ngày 1 rơi vào Thứ Ba → 2 ô trống đầu bảng, Chủ Nhật là 6/13/20/27
const CALENDAR_LEAD_OFFSET = 2;
const CALENDAR_DAYS_IN_MONTH = 31;

export default function Wedding3({ lang = 'vi' }: Props) {
  const { activeLang, setActiveLang } = useTemplateLang(lang as Lang, SUPPORTED_LANGS);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;

  const IMG = {
    hero: images.hero ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhA_hTI6n8Eny8ykuqqT9nigsfgaE53fwSpOMTTPE6qbJcYu_Y1UnmSSac8gyVr6HCsS2_lvRvwf7-CJaSP5qNYGhlWoCe-eSNcb_WATav_n-LYSYzTckTR-PhRnWj3znJD9f8bK77j4LtM0CIfxjkkxxSFUFn7qXoBZHayf4e1RMSv6i3jEFEaTLgBBkuXFDT8htikojB7ztsXH0qamDlqz7ivgdqcwFRdW21Kj5FXwPlVsfvB3xu4kNoC_Fhzs8aUX_j14uv5UY',
    gallery_0: images.gallery_0 ?? 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=70',
    gallery_1: images.gallery_1 ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWBXCiCfNQMpA9nwOtKfUIm8LPpysQvoaIixt6LyhLfL8aCkND82L9fHSBbj-yQxBTrgnLy2GCAPahhKq361G_h3EBAIRhWusdGDiQxezk4DXLr7QDIoLQ9RpIle0dCqDYUYat4RYoc0Vf4jaQvVVntVHReJxyDJCta8MdBVKvZBsnScWwPhUjBSyuRn9euqLUAVtbWhhzazNthXxdwqHGp5bS_QpfYeK66XzmvVtY6eVemyKSX5G77-gyiMTKyppVdvfDEl-i634',
  };

  const calendarDays = Array.from({ length: CALENDAR_LEAD_OFFSET }, () => null).concat(
    Array.from({ length: CALENDAR_DAYS_IN_MONTH }, (_, i) => i + 1),
  );

  return (
    <div className="min-h-screen bg-[#FCF9F2] text-[#2c241b] font-serif">

      {/* Nav */}
      <nav data-section="nav" className="hidden md:flex justify-between items-center px-6 h-20 z-50 bg-[#FCF9F2]/95 backdrop-blur-xl fixed top-0 w-full shadow-sm border-b border-[#D4AF37]/30">
        <span data-field="nav.brand" className="font-bold text-2xl text-[#86041d]">{t.nav.brand}</span>
        <ul className="flex gap-8 text-sm font-sans">
          <li><a href="#" className="text-[#B8860B] font-semibold border-b-2 border-[#B8860B] pb-1 transition-colors">{t.nav.home}</a></li>
          <li><a href="#gallery" className="text-[#594140] font-medium hover:text-[#B8860B] transition-colors">{t.nav.gallery}</a></li>
          <li><a href="#timeline" className="text-[#594140] font-medium hover:text-[#B8860B] transition-colors">{t.nav.timeline}</a></li>
          <li><a href="#rsvp" className="text-[#594140] font-medium hover:text-[#B8860B] transition-colors">{t.nav.rsvp}</a></li>
        </ul>
        <div className="flex items-center gap-3">
          <LanguageSwitcher value={activeLang} onChange={setActiveLang} languages={SUPPORTED_LANGS} />
          <button className="bg-[#86041d] text-white px-6 py-2 rounded font-sans text-xs font-semibold border border-[#86041d] hover:bg-[#FCF9F2] hover:text-[#86041d] transition-all uppercase tracking-widest shadow-md cursor-pointer">
            {t.nav.giftBtn}
          </button>
        </div>
      </nav>

      {/* Mobile language switcher */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <LanguageSwitcher value={activeLang} onChange={setActiveLang} languages={SUPPORTED_LANGS} />
      </div>

      <main className="pt-6 md:pt-28 pb-32 max-w-6xl mx-auto px-5 md:px-6">

        {/* Hero */}
        <section data-section="hero" className="relative min-h-[600px] md:min-h-[820px] flex items-center justify-center rounded overflow-hidden mb-24 border-[3px] border-double border-[#D4AF37]/60 p-2 bg-[#FCF9F2]">
          <div className="relative w-full h-full rounded overflow-hidden">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img src={IMG.hero} alt="Wedding couple" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-20 text-center p-8 md:p-12 max-w-2xl bg-[#FCF9F2]/85 backdrop-blur-md border border-[#D4AF37]/40 shadow-lg mx-4 rounded flex flex-col items-center justify-center my-12">
              {/* Corner ornaments */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]" />

              <p data-field="hero.eyebrow" className="font-sans text-xs tracking-[0.3em] mb-6 text-[#B8860B] uppercase font-semibold">{t.hero.eyebrow}</p>
              <h1 data-field="hero.coupleNames" className="font-bold text-4xl md:text-6xl mb-8 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent [text-shadow:2px_2px_4px_rgba(0,0,0,0.15)]">
                {t.hero.coupleNames}
              </h1>
              <p data-field="hero.invitation" className="text-lg italic mb-10 max-w-md mx-auto">{t.hero.invitation}</p>
              <div className="inline-flex items-center gap-6 border-t border-b border-[#D4AF37]/40 py-6 px-10">
                <div className="text-right">
                  <p className="font-sans text-xs uppercase text-[#B8860B]">{t.hero.dayLabel}</p>
                  <p className="text-xl font-semibold">{t.hero.month}</p>
                </div>
                <div className="text-7xl font-bold text-[#86041d] mx-4">{t.hero.day}</div>
                <div className="text-left">
                  <p className="font-sans text-xs uppercase text-[#B8860B]">{t.hero.yearLabel}</p>
                  <p className="text-xl font-semibold">{t.hero.year}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex justify-center mb-24 opacity-70">
          <span aria-hidden className="text-[#B8860B] text-5xl font-light">✨</span>
        </div>

        {/* Calendar */}
        <section data-section="calendar" className="mb-24 max-w-lg mx-auto text-center">
          <h2 data-field="calendar.title" className="text-3xl font-semibold text-[#86041d] mb-8">{t.calendar.title}</h2>
          <div className="border border-[#D4AF37] shadow-[inset_0_0_10px_rgba(212,175,55,0.1),0_0_10px_rgba(212,175,55,0.1)] p-8 bg-[#F8F1E5] relative">
            <div className="font-sans text-lg mb-6 text-[#B8860B] uppercase tracking-widest">{t.calendar.monthYear}</div>
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center font-sans">
              {t.calendar.weekdays.map((w, i) => (
                <div key={w} className={i === 0 ? 'font-semibold text-[#86041d]' : 'font-semibold text-[#594140]'}>{w}</div>
              ))}
              {calendarDays.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />;
                const isSunday = (CALENDAR_LEAD_OFFSET + day - 1) % 7 === 0;
                const isWeddingDay = day === t.calendar.highlightDay;
                if (isWeddingDay) {
                  return (
                    <div key={day} className="py-1 relative z-10 text-white font-bold">
                      <span className="absolute inset-0 bg-[#86041d] rounded-full z-[-1] scale-125" />
                      <span aria-hidden className="absolute -top-4 -right-3 text-[#B8860B] text-sm rotate-12">♥</span>
                      {day}
                    </div>
                  );
                }
                return (
                  <div key={day} className={`py-1 ${isSunday ? 'text-[#86041d]' : ''}`}>{day}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mb-24" id="gallery" data-section="gallery">
          <div className="text-center mb-12">
            <h2 data-field="gallery.title" className="text-3xl font-semibold text-[#86041d] mb-4">{t.gallery.title}</h2>
            <p data-field="gallery.subtitle" className="text-[#594140]">{t.gallery.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            <div className="md:col-span-2 md:row-span-2 border-2 border-[#C9B093]/30 p-1 bg-white relative group overflow-hidden">
              <img src={IMG.gallery_0} alt="Wedding detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="border-2 border-[#C9B093]/30 p-1 bg-white relative group overflow-hidden">
              <img src={IMG.gallery_1} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-24 max-w-3xl mx-auto" id="timeline" data-section="timeline">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#86041d] mb-4">{t.timeline.title}</h2>
            <p className="text-[#594140] max-w-md mx-auto">{t.timeline.subtitle}</p>
          </div>
          <div className="relative space-y-16 py-8">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent -translate-x-1/2" />
            {t.timeline.items.map((item, i) => {
              // Các mốc xen kẽ trái/phải: mốc chẵn có tên+mô tả bên trái, giờ bên phải; mốc lẻ ngược lại
              const detail = (
                <>
                  <h3 className="text-xl font-semibold text-[#86041d] mb-1">{item.name}</h3>
                  <p className="text-[#594140]">{item.desc}</p>
                </>
              );
              const time = <p className="text-4xl text-[#B8860B] opacity-80">{item.time}</p>;
              const isEven = i % 2 === 0;

              return (
                <div key={i} className="relative flex items-center justify-between w-full">
                  <div className="w-5/12 text-right pr-8">{isEven ? detail : time}</div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#FCF9F2] flex items-center justify-center shadow-md z-10">
                    <span aria-hidden className="text-xl">{item.icon}</span>
                  </div>
                  <div className="w-5/12 pl-8">{isEven ? time : detail}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RSVP / Guestbook */}
        <section className="max-w-4xl mx-auto" id="rsvp" data-section="rsvp">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#86041d] mb-4">{t.rsvp.title}</h2>
            <p className="text-[#594140]">{t.rsvp.subtitle}</p>
          </div>
          <div className="border border-[#D4AF37] shadow-[inset_0_0_10px_rgba(212,175,55,0.1),0_0_10px_rgba(212,175,55,0.1)] p-8 md:p-12 bg-[#F8F1E5]">
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs text-[#B8860B] mb-2 uppercase tracking-wider">{t.rsvp.nameLabel}</label>
                  <input type="text" placeholder={t.rsvp.namePlaceholder}
                    className="w-full bg-transparent border-b border-[#D4C4B5] focus:border-[#B8860B] focus:ring-0 px-0 py-2 outline-none placeholder:text-[#594140]/40" />
                </div>
                <div>
                  <label className="block font-sans text-xs text-[#B8860B] mb-2 uppercase tracking-wider">{t.rsvp.relationLabel}</label>
                  <select className="w-full bg-transparent border-b border-[#D4C4B5] focus:border-[#B8860B] focus:ring-0 px-0 py-2 outline-none">
                    {t.rsvp.relationOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-sans text-xs text-[#B8860B] mb-2 uppercase tracking-wider">{t.rsvp.messageLabel}</label>
                <textarea placeholder={t.rsvp.messagePlaceholder} rows={3}
                  className="w-full bg-transparent border-b border-[#D4C4B5] focus:border-[#B8860B] focus:ring-0 px-0 py-2 outline-none placeholder:text-[#594140]/40 resize-none" />
              </div>
              <div className="text-center pt-4">
                <button type="submit" data-track="rsvp" className="bg-[#86041d] text-white px-10 py-3 font-sans text-xs font-semibold border border-[#86041d] hover:bg-[#FCF9F2] hover:text-[#86041d] transition-all uppercase tracking-widest shadow-md cursor-pointer">
                  {t.rsvp.submit}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Google Maps */}
        <section data-section="location" className="max-w-4xl mx-auto mt-24" id="location">
          <div className="text-center mb-12">
            <h2 data-field="location.title" className="text-3xl font-semibold text-[#86041d] mb-4">{t.location.title}</h2>
            <p data-field="location.subtitle" className="text-[#594140]">{t.location.subtitle}</p>
          </div>
          <div className="border-[3px] border-double border-[#D4AF37]/60 p-2 bg-[#FCF9F2]">
            <div className="h-[380px] overflow-hidden">
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
                <div className="w-full h-full bg-[#F8F1E5] flex flex-col items-center justify-center gap-3 text-center px-6">
                  <span aria-hidden className="text-4xl">📍</span>
                  <p data-field="location.address" className="font-semibold text-[#86041d] text-lg">{t.location.address}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Bottom nav — mobile */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-6 px-4 md:hidden bg-[#FCF9F2]/95 backdrop-blur-2xl rounded-t-2xl border-t border-[#D4AF37]/30 shadow-[0_-4px_20px_rgba(212,175,55,0.1)]">
        <a href="#" className="flex flex-col items-center justify-center text-[#594140] p-2">
          <span aria-hidden className="text-xl">🏠</span>
          <span className="text-[10px] mt-1">{t.mobileNav.home}</span>
        </a>
        <a href="#timeline" className="flex flex-col items-center justify-center text-[#86041d] bg-[#F8F1E5] rounded-full px-4 py-2 shadow-sm border border-[#D4AF37]/20">
          <span aria-hidden className="text-xl">📅</span>
          <span className="text-[10px] mt-1">{t.mobileNav.schedule}</span>
        </a>
        <a href="#gallery" className="flex flex-col items-center justify-center text-[#594140] p-2">
          <span aria-hidden className="text-xl">🖼️</span>
          <span className="text-[10px] mt-1">{t.mobileNav.gallery}</span>
        </a>
        <a href="#" className="flex flex-col items-center justify-center text-[#594140] p-2">
          <span aria-hidden className="text-xl">🎁</span>
          <span className="text-[10px] mt-1">{t.mobileNav.gift}</span>
        </a>
      </nav>
    </div>
  );
}
