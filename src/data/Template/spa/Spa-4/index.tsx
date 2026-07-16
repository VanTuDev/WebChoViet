import {
  Cpu, FlaskConical, ShieldCheck, Scan, Droplet, Sparkles,
  MapPin, PhoneCall, Clock, Navigation, Facebook, Instagram, Youtube,
} from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroBg from './images/heroBg.jpg';
import imgJourney0 from './images/journey0.jpg';
import imgJourney1 from './images/journey1.jpg';
import imgJourney2 from './images/journey2.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg:   imgHeroBg,
  journey_0: imgJourney0,
  journey_1: imgJourney1,
  journey_2: imgJourney2,
};

/** Icon trang trí — không phải nội dung dịch nên đặt ngoài i18n */
const TRUST_ICONS = [Cpu, FlaskConical, ShieldCheck];
const SERVICE_CATEGORY_ICONS = [Scan, FlaskConical, Droplet, Sparkles];
const SOCIAL_ICONS = [Facebook, Instagram, Youtube];

export default function Spa4({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  const primaryPhone = t.contact.phone.split(' - ')[0].replace(/\s/g, '');

  return (
    <div className="bg-[#f9f9ff] text-[#111c2d] font-sans antialiased">

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#003f87]/5 shadow-sm">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto">
          <span data-field="nav.brand" className="font-lexend text-xl font-bold text-[#003f87]">{t.nav.brand}</span>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-[#003f87] border-b-2 border-[#003f87] pb-1" href="#trust">{t.nav.links[0]}</a>
            <a className="text-sm font-medium text-[#424752] hover:text-[#003f87] transition-colors" href="#journey">{t.nav.links[1]}</a>
            <a className="text-sm font-medium text-[#424752] hover:text-[#003f87] transition-colors" href="#services">{t.nav.links[2]}</a>
            <a className="text-sm font-medium text-[#424752] hover:text-[#003f87] transition-colors" href="#contact">{t.nav.links[3]}</a>
          </nav>
          <button data-track="cta-book" className="bg-[#0056b3] text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer">
            {t.nav.cta}
          </button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero */}
        <section data-section="hero" className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[#f9f9ff] to-[#e7eeff] px-6">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span data-field="hero.badge" className="inline-block px-4 py-1 rounded-full bg-[#9ae1ff] text-[#003f87] text-xs font-semibold uppercase tracking-widest">
                {t.hero.badge}
              </span>
              <h1 className="font-lexend text-4xl lg:text-5xl font-semibold text-[#003f87] leading-tight">
                <span data-field="hero.title">{t.hero.title}</span>{' '}
                <br className="hidden lg:block" />
                <span data-field="hero.titleHighlight" className="text-[#0c6780] font-light">{t.hero.titleHighlight}</span>
              </h1>
              <p data-field="hero.subtitle" className="text-lg font-light leading-relaxed text-[#424752] max-w-lg">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a data-track="cta-explore" data-field="hero.btnPrimary" href="#services"
                  className="bg-[#003f87] text-white px-10 py-4 rounded-full text-sm font-medium shadow-lg hover:opacity-90 transition-all">
                  {t.hero.btnPrimary}
                </a>
                <a data-field="hero.btnSecondary" href="#contact"
                  className="border-2 border-[#003f87] text-[#003f87] px-10 py-4 rounded-full text-sm font-medium hover:bg-[#003f87]/5 transition-all">
                  {t.hero.btnSecondary}
                </a>
              </div>
            </div>
            <div className="relative h-[420px] lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
              <img className="w-full h-full object-cover" src={IMG.heroBg} alt={t.hero.title} />
            </div>
          </div>
        </section>

        {/* Trust elements */}
        <section data-section="trust" id="trust" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.trust.items.map((item, i) => {
                const Icon = TRUST_ICONS[i] ?? ShieldCheck;
                return (
                  <div key={i} className="flex flex-col items-center text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#e7eeff] flex items-center justify-center text-[#003f87]">
                      <Icon aria-hidden className="w-7 h-7" />
                    </div>
                    <h3 data-field={`trust.items.${i}.title`} className="font-lexend text-lg font-medium text-[#003f87]">{item.title}</h3>
                    <p data-field={`trust.items.${i}.desc`} className="text-sm font-light text-[#424752]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services / Pricing */}
        <section data-section="services" id="services" className="py-24 bg-[#f9f9ff]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-3">
              <h2 data-field="services.title" className="font-lexend text-3xl font-medium text-[#003f87]">{t.services.title}</h2>
              <p data-field="services.subtitle" className="text-base font-light text-[#424752]">{t.services.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.services.categories.map((cat, ci) => {
                const CatIcon = SERVICE_CATEGORY_ICONS[ci] ?? Sparkles;
                const featured = 'featured' in cat && cat.featured;
                return (
                  <div key={ci} className={`p-6 rounded-2xl flex flex-col border border-[#003f87]/5 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,86,179,0.04)] ${featured ? 'bg-[#d7e2ff]/40' : 'bg-[#f0f3ff]'}`}>
                    <div className="flex items-center gap-2 mb-6">
                      <CatIcon aria-hidden className="w-5 h-5 text-[#003f87]" />
                      <h4 data-field={`services.categories.${ci}.title`} className="font-lexend text-base font-medium text-[#003f87]">{cat.title}</h4>
                    </div>
                    <ul className="space-y-4 flex-grow">
                      {cat.items.map((item, ii) => (
                        <li key={ii} className="flex flex-col gap-1 border-b border-[#003f87]/10 pb-3">
                          <div className="flex justify-between items-start gap-2">
                            <span data-field={`services.categories.${ci}.items.${ii}.name`} className="text-xs font-semibold text-[#111c2d]">{item.name}</span>
                            <span className="text-xs font-semibold text-[#003f87] shrink-0 text-right">
                              <span data-field={`services.categories.${ci}.items.${ii}.price`}>{item.price}</span>
                              {'oldPrice' in item && item.oldPrice ? (
                                <span data-field={`services.categories.${ci}.items.${ii}.oldPrice`} className="ml-1 line-through text-[#424752] font-light">{item.oldPrice}</span>
                              ) : null}
                            </span>
                          </div>
                          <div className="flex justify-between items-center gap-2">
                            <span data-field={`services.categories.${ci}.items.${ii}.desc`} className="text-[11px] font-light text-[#424752] leading-relaxed">{item.desc}</span>
                            <span data-field={`services.categories.${ci}.items.${ii}.duration`} className="text-[11px] font-medium text-[#0c6780] shrink-0">{item.duration}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {'ctaText' in cat && cat.ctaText ? (
                      <button data-track="cta-combo" data-field="services.categories.3.ctaText" className="mt-4 w-full bg-[#003f87] text-white py-2.5 rounded-full text-xs font-semibold hover:opacity-90 transition-all">
                        {cat.ctaText}
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section data-section="journey" id="journey" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl space-y-3">
                <h2 data-field="journey.title" className="font-lexend text-3xl font-medium text-[#003f87]">{t.journey.title}</h2>
                <p data-field="journey.subtitle" className="text-base font-light text-[#424752]">{t.journey.subtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.journey.steps.map((step, i) => {
                const img = [IMG.journey_0, IMG.journey_1, IMG.journey_2][i] ?? IMG.journey_0;
                return (
                  <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img} alt={step.caption} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003f87]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p data-field={`journey.steps.${i}.caption`} className="text-white text-sm font-medium">{step.caption}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact + Map */}
        <section data-section="contact" id="contact" className="py-20 bg-[#f0f3ff]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-6">
              <h2 data-field="contact.title" className="font-lexend text-3xl font-medium text-[#003f87]">{t.contact.title}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin aria-hidden className="w-5 h-5 mt-0.5 text-[#003f87]" />
                  <div>
                    <p className="text-sm font-medium text-[#111c2d]">{t.contact.addressLabel}</p>
                    <p data-field="contact.address" className="text-sm font-light text-[#424752]">{t.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <PhoneCall aria-hidden className="w-5 h-5 mt-0.5 text-[#003f87]" />
                  <div>
                    <p className="text-sm font-medium text-[#111c2d]">{t.contact.phoneLabel}</p>
                    <p data-field="contact.phone" className="text-sm font-light text-[#424752]">{t.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock aria-hidden className="w-5 h-5 mt-0.5 text-[#003f87]" />
                  <div>
                    <p className="text-sm font-medium text-[#111c2d]">{t.contact.hoursLabel}</p>
                    <p data-field="contact.hours" className="text-sm font-light text-[#424752]">{t.contact.hours}</p>
                  </div>
                </div>
              </div>
              <a data-track="cta-directions" data-field="contact.btnDirection" href={`tel:${primaryPhone}`}
                className="w-full bg-[#003f87] text-white py-4 rounded-full text-sm font-medium shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                <Navigation aria-hidden className="w-4 h-4" />
                <span>{t.contact.btnDirection}</span>
              </a>
            </div>
            <div className="lg:col-span-2 h-[450px] rounded-2xl overflow-hidden shadow-xl border border-[#c2c6d4]/20">
              {t.contact.mapUrl ? (
                <iframe
                  src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full bg-[#e7eeff] flex flex-col items-center justify-center gap-3 px-6 text-center">
                  <MapPin aria-hidden className="w-14 h-14 text-[#003f87]" />
                  <p data-field="contact.address" className="text-sm font-medium text-[#111c2d]">{t.contact.address}</p>
                  <p data-field="contact.mapFallback" className="text-xs font-light text-[#424752] max-w-xs">{t.contact.mapFallback}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="w-full py-16 bg-[#e7eeff] border-t border-[#c2c6d4]/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-2">
            <div data-field="footer.brand" className="font-lexend text-lg font-bold text-[#003f87] mb-6">{t.footer.brand}</div>
            <p data-field="footer.desc" className="text-sm font-light text-[#424752] max-w-sm mb-8">{t.footer.desc}</p>
            <div className="flex gap-4">
              {SOCIAL_ICONS.map((Icon, i) => (
                <a key={i} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#003f87] shadow-sm hover:scale-110 transition-transform" href="#">
                  <Icon aria-hidden className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 data-field="footer.infoTitle" className="text-sm font-medium text-[#111c2d] mb-6 uppercase tracking-wider">{t.footer.infoTitle}</h4>
            <ul className="space-y-4">
              {t.footer.infoLinks.map((link, i) => (
                <li key={i}><a data-field={`footer.infoLinks.${i}`} className="text-xs font-light text-[#424752] hover:text-[#003f87] transition-colors" href="#">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 data-field="footer.newsletterTitle" className="text-sm font-medium text-[#111c2d] mb-6 uppercase tracking-wider">{t.footer.newsletterTitle}</h4>
            <p data-field="footer.newsletterDesc" className="text-xs font-light text-[#424752] mb-4">{t.footer.newsletterDesc}</p>
            <div className="relative">
              <input className="w-full bg-white border-none rounded-full pl-6 pr-24 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#003f87]/20" placeholder={t.footer.emailPlaceholder} type="email" />
              <button data-track="cta-newsletter" className="absolute right-1 top-1 bottom-1 px-6 bg-[#003f87] text-white rounded-full text-xs font-medium">{t.footer.sendBtn}</button>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center border-t border-[#c2c6d4]/10 pt-8 max-w-7xl mx-auto px-6">
          <p data-field="footer.copy" className="text-xs font-light text-[#424752]">{t.footer.copy}</p>
        </div>
      </footer>
    </div>
  );
}
