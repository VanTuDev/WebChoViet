import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Stethoscope,
  CheckCircle2,
  FlaskConical,
  Droplet,
  ChevronLeft,
  ChevronRight,
  Info,
  Award,
  MapPin,
  Clock,
  Phone,
  Map as MapIcon,
  Globe,
  Share2,
  Mail,
  CalendarDays,
} from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroBg from './images/heroBg.jpg';
import imgBentoImg from './images/bentoImg.jpg';
import imgGallery1 from './images/gallery1.jpg';
import imgGallery2 from './images/gallery2.jpg';
import imgGallery3 from './images/gallery3.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg:  imgHeroBg,
  bentoImg: imgBentoImg,
  gallery1: imgGallery1,
  gallery2: imgGallery2,
  gallery3: imgGallery3,
};

/** Icon cho bento highlight — nằm ngoài i18n vì là trang trí, không phải nội dung dịch */
const HIGHLIGHT_ICONS = [Stethoscope, CheckCircle2, FlaskConical, Droplet];
const CONTACT_ICONS = [MapPin, Clock, Phone];

export default function Spa1({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-white text-[#0f172a] font-sans antialiased">

      {/* Navbar */}
      <header data-section="nav" className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-[#e2e8f0] shadow-sm">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto">
          <span data-field="nav.brand" className="font-lexend text-2xl font-bold text-[#0ea5e9] flex items-center gap-2">
            <Sparkles aria-hidden className="w-6 h-6" />
            {t.nav.brand}
          </span>
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
            <a className="text-[#0ea5e9] font-bold border-b-2 border-[#0ea5e9] pb-1" href="#highlights">{t.nav.linkServices}</a>
            <a className="text-[#475569] hover:text-[#0ea5e9] transition-colors" href="#gallery">{t.nav.linkAbout}</a>
            <a className="text-[#475569] hover:text-[#0ea5e9] transition-colors" href="#prices">{t.nav.linkPrices}</a>
            <a className="text-[#475569] hover:text-[#0ea5e9] transition-colors" href="#location">{t.nav.linkLocation}</a>
          </nav>
          <div className="flex gap-3">
            <button data-track="consultation" className="hidden sm:inline-flex px-6 py-2.5 rounded-full border border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9]/5 transition-all text-sm font-medium hover:scale-105 duration-300">
              {t.nav.getAdvice}
            </button>
            <button data-track="booking" className="px-6 py-2.5 rounded-full bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20 hover:scale-105 transition-all active:scale-95 text-sm font-medium">
              {t.nav.bookNow}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={IMG.heroBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-2xl space-y-6">
              <div data-field="hero.badge" className="inline-flex items-center gap-2 bg-[#0ea5e9]/10 text-[#0369a1] px-4 py-2 rounded-full font-medium text-sm">
                <ShieldCheck aria-hidden className="w-4 h-4" />
                {t.hero.badge}
              </div>
              <h1 className="font-lexend text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-[#0f172a]">
                <span data-field="hero.title">{t.hero.title}</span>
                <br />
                <span data-field="hero.titleHighlight" className="text-[#0ea5e9]">{t.hero.titleHighlight}</span>
              </h1>
              <p data-field="hero.subtitle" className="text-xl text-[#475569] leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <button data-track="booking" data-field="hero.ctaText" className="px-8 py-4 bg-[#0ea5e9] text-white rounded-full text-lg font-bold shadow-xl shadow-[#0ea5e9]/20 hover:scale-105 transition-transform flex items-center gap-2">
                  {t.hero.ctaText}
                  <ArrowRight aria-hidden className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4 px-4">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-[#e2e8f0]" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-[#cbd5e1]" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-[#94a3b8]" />
                  </div>
                  <div className="text-sm font-medium text-[#0f172a]">
                    <span data-field="hero.socialProofCount" className="text-[#0ea5e9] font-bold">{t.hero.socialProofCount}</span>{' '}
                    <span data-field="hero.socialProofText">{t.hero.socialProofText}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights — bento grid */}
        <section data-section="highlights" className="py-20 bg-[#f8fafc]" id="highlights">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 data-field="highlights.title" className="font-lexend text-4xl font-extrabold tracking-tight">{t.highlights.title}</h2>
              <p data-field="highlights.subtitle" className="text-[#475569] max-w-2xl mx-auto">{t.highlights.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:auto-rows-[180px]">
              {t.highlights.items.map((item, i) => {
                const Icon = HIGHLIGHT_ICONS[i] ?? Sparkles;
                if (i === 0) {
                  return (
                    <div key={i} className="md:col-span-2 md:row-span-2 bg-white/70 backdrop-blur-md border border-white/40 p-8 rounded-3xl flex flex-col justify-between group hover:shadow-2xl hover:shadow-[#0ea5e9]/10 transition-all duration-500">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-[#0ea5e9]/10 rounded-xl flex items-center justify-center text-[#0ea5e9]">
                          <Icon aria-hidden className="w-6 h-6" />
                        </div>
                        <h3 data-field={`highlights.items.${i}.title`} className="text-2xl font-bold">{item.title}</h3>
                        <p data-field={`highlights.items.${i}.desc`} className="text-[#475569]">{item.desc}</p>
                      </div>
                      <div className="mt-8 overflow-hidden rounded-2xl relative h-48">
                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={IMG.bentoImg} alt={item.title} loading="lazy" />
                      </div>
                    </div>
                  );
                }
                if (i === 1) {
                  return (
                    <div key={i} className="md:col-span-2 bg-white/70 backdrop-blur-md border border-white/40 p-8 rounded-3xl flex items-center gap-6 group hover:bg-[#0ea5e9] hover:text-white transition-all duration-500">
                      <div className="flex-1 space-y-2">
                        <h3 data-field={`highlights.items.${i}.title`} className="text-xl font-bold">{item.title}</h3>
                        <p data-field={`highlights.items.${i}.desc`} className="text-sm opacity-80">{item.desc}</p>
                      </div>
                      <Icon aria-hidden className="w-12 h-12 text-[#0ea5e9] group-hover:text-white shrink-0" />
                    </div>
                  );
                }
                return (
                  <div key={i} className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-3xl flex flex-col items-center text-center justify-center space-y-3 hover:shadow-lg transition-all">
                    <Icon aria-hidden className="w-9 h-9 text-[#0ea5e9]" />
                    <h4 data-field={`highlights.items.${i}.title`} className="font-bold">{item.title}</h4>
                    <p data-field={`highlights.items.${i}.desc`} className="text-xs text-[#475569]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" className="py-20 overflow-hidden" id="gallery">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="space-y-2">
                <h2 data-field="gallery.title" className="font-lexend text-4xl font-extrabold tracking-tight">{t.gallery.title}</h2>
                <p data-field="gallery.subtitle" className="text-[#475569]">{t.gallery.subtitle}</p>
              </div>
              <div className="flex gap-2">
                <button aria-label="prev" className="p-3 rounded-full border border-[#cbd5e1] hover:bg-[#f1f5f9] transition-colors">
                  <ChevronLeft aria-hidden className="w-5 h-5" />
                </button>
                <button aria-label="next" className="p-3 rounded-full border border-[#cbd5e1] hover:bg-[#f1f5f9] transition-colors">
                  <ChevronRight aria-hidden className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[IMG.gallery1, IMG.gallery2, IMG.gallery3].map((img, i) => (
                <div key={i} className={`group relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-xl ${i === 1 ? 'md:translate-y-12' : ''}`}>
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img} alt={t.gallery.steps[i]?.title ?? ''} loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end text-white">
                    <span data-field={`gallery.steps.${i}.label`} className="text-xs font-bold uppercase tracking-widest mb-2">{t.gallery.steps[i]?.label}</span>
                    <h4 data-field={`gallery.steps.${i}.title`} className="text-xl font-bold">{t.gallery.steps[i]?.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services / Price list */}
        <section data-section="services" className="py-20 bg-[#f1f5f9]/60" id="prices">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 data-field="services.title" className="font-lexend text-4xl font-extrabold tracking-tight mb-4">{t.services.title}</h2>
              <p data-field="services.subtitle" className="text-[#475569]">{t.services.subtitle}</p>
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-[#e2e8f0] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc]">
                    <th className="p-4 font-bold text-[#0f172a] border-b border-[#e2e8f0] text-sm">{t.services.colService}</th>
                    <th className="p-4 font-bold text-[#0f172a] border-b border-[#e2e8f0] text-sm">{t.services.colDuration}</th>
                    <th className="p-4 font-bold text-[#0f172a] border-b border-[#e2e8f0] text-right text-sm">{t.services.colPrice}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {t.services.items.map((item, i) => (
                    <tr key={i} className="hover:bg-[#f1f5f9]/60 transition-colors">
                      <td className="p-4">
                        <div data-field={`services.items.${i}.name`} className="font-bold text-sm">{item.name}</div>
                        <div data-field={`services.items.${i}.desc`} className="text-[10px] text-[#475569] mt-0.5">{item.desc}</div>
                      </td>
                      <td data-field={`services.items.${i}.duration`} className="p-4 text-[#475569] text-xs">{item.duration}</td>
                      <td data-field={`services.items.${i}.price`} className="p-4 font-bold text-[#0ea5e9] text-right text-sm">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex justify-center">
              <p data-field="services.note" className="text-sm text-[#475569] flex items-center gap-2 italic">
                <Info aria-hidden className="w-4 h-4 shrink-0" />
                {t.services.note}
              </p>
            </div>
          </div>
        </section>

        {/* Credibility */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-[#0ea5e9]/5 rounded-[3rem] p-12 text-center flex flex-col items-center gap-6 relative overflow-hidden border border-[#0ea5e9]/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#0ea5e9] relative z-10">
                <Award aria-hidden className="w-14 h-14 text-[#0ea5e9]" />
              </div>
              <div className="space-y-4 relative z-10">
                <h2 data-field="credibility.title" className="text-3xl font-extrabold">{t.credibility.title}</h2>
                <p data-field="credibility.desc" className="text-lg text-[#475569] max-w-lg mx-auto">{t.credibility.desc}</p>
                <div className="flex justify-center gap-8 pt-4 flex-wrap">
                  {t.credibility.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-8">
                      {i > 0 && <div className="w-px h-10 bg-[#cbd5e1] hidden sm:block" />}
                      <div className="flex flex-col items-center">
                        <span data-field={`credibility.stats.${i}.value`} className="text-2xl font-bold text-[#0ea5e9]">{stat.value}</span>
                        <span data-field={`credibility.stats.${i}.label`} className="text-xs font-medium uppercase tracking-wider text-[#475569]">{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Location */}
        <section data-section="contact" className="py-20 bg-white" id="location">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 data-field="contact.title" className="font-lexend text-4xl font-extrabold tracking-tight">{t.contact.title}</h2>
                <p data-field="contact.subtitle" className="text-lg text-[#475569]">{t.contact.subtitle}</p>
                <div className="space-y-4">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri] ?? MapPin;
                    return (
                      <div key={row.valueField} className="flex items-start gap-4">
                        <RowIcon aria-hidden className="w-5 h-5 mt-1 text-[#0ea5e9]" />
                        <div>
                          <div className="font-bold">{row.label}</div>
                          <div data-field={row.valueField} className="text-[#475569]">{row.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <a data-track="directions" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.contact.address)}`} target="_blank" rel="noreferrer"
                  className="inline-block px-8 py-3 border-2 border-[#0ea5e9] text-[#0ea5e9] rounded-xl font-bold hover:bg-[#0ea5e9] hover:text-white transition-all">
                  {t.contact.btnDirections}
                </a>
              </div>
              <div className="h-96 bg-[#f1f5f9] rounded-[2rem] overflow-hidden shadow-inner relative border border-[#e2e8f0]">
                {t.contact.mapUrl ? (
                  <iframe
                    src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                    className="w-full h-full border-0 relative z-10"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center flex-col gap-3">
                    <MapIcon aria-hidden className="w-14 h-14 text-[#0ea5e9]" />
                    <p className="text-sm font-medium text-[#475569]">{t.contact.mapLoading}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#f8fafc] rounded-t-3xl shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 px-6 py-16 max-w-7xl mx-auto">
          <div className="space-y-4 max-w-sm">
            <span data-field="footer.brand" className="font-lexend text-2xl font-bold text-[#0ea5e9]">{t.footer.brand}</span>
            <p data-field="footer.desc" className="text-base text-[#475569]">{t.footer.desc}</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white transition-colors" href="#" aria-label="Website">
                <Globe aria-hidden className="w-4 h-4" />
              </a>
              <a className="w-10 h-10 rounded-full bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white transition-colors" href="#" aria-label="Share">
                <Share2 aria-hidden className="w-4 h-4" />
              </a>
              <a className="w-10 h-10 rounded-full bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white transition-colors" href="#" aria-label="Email">
                <Mail aria-hidden className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <h5 data-field="footer.servicesTitle" className="text-xs font-bold uppercase tracking-widest text-[#0f172a]">{t.footer.servicesTitle}</h5>
              <ul className="space-y-2">
                {t.footer.servicesLinks.map((link, i) => (
                  <li key={i}><a className="text-[#475569] hover:text-[#0ea5e9] transition-colors underline text-xs" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h5 data-field="footer.infoTitle" className="text-xs font-bold uppercase tracking-widest text-[#0f172a]">{t.footer.infoTitle}</h5>
              <ul className="space-y-2">
                {t.footer.infoLinks.map((link, i) => (
                  <li key={i}><a className="text-[#475569] hover:text-[#0ea5e9] transition-colors underline text-xs" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-[#e2e8f0] py-6 text-center">
          <p data-field="footer.copyright" className="text-xs text-[#475569]">{t.footer.copyright}</p>
        </div>
      </footer>

      {/* Floating location badge */}
      <div className="fixed bottom-8 left-8 z-40 hidden lg:block">
        <div className="bg-white/90 backdrop-blur shadow-2xl rounded-2xl p-4 flex items-center gap-4 border border-[#e2e8f0] max-w-xs">
          <div className="w-12 h-12 bg-[#0ea5e9] rounded-xl flex items-center justify-center text-white shrink-0">
            <MapPin aria-hidden className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <div data-field="contact.floatingTitle" className="font-bold">{t.contact.floatingTitle}</div>
            <div className="text-[#475569]">{t.contact.address}</div>
          </div>
        </div>
      </div>

      {/* Booking FAB */}
      <button data-track="booking" className="fixed bottom-8 right-8 z-40 bg-[#0ea5e9] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-2 overflow-hidden max-w-[56px] hover:max-w-xs duration-500">
        <CalendarDays aria-hidden className="w-6 h-6 shrink-0" />
        <span data-field="booking.fabText" className="whitespace-nowrap font-bold text-sm pr-4 opacity-0 group-hover:opacity-100 transition-opacity">{t.booking.fabText}</span>
      </button>
    </div>
  );
}
