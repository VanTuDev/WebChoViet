import { Droplet, Waves, Sparkles, CheckCircle2, MapPin, Phone, Smile, Camera, AtSign, Map as MapIcon } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroBg from './images/heroBg.jpg';
import imgHighlight1 from './images/highlight1.jpg';
import imgHighlight2 from './images/highlight2.jpg';
import imgHighlight3 from './images/highlight3.jpg';
import imgAtmosphere1 from './images/atmosphere1.jpg';
import imgAtmosphere2 from './images/atmosphere2.jpg';
import imgLocationMap from './images/locationMap.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg:      imgHeroBg,
  highlight1:  imgHighlight1,
  highlight2:  imgHighlight2,
  highlight3:  imgHighlight3,
  atmosphere1: imgAtmosphere1,
  atmosphere2: imgAtmosphere2,
  locationMap: imgLocationMap,
};

/** Icon cho 3 nhóm dịch vụ trong bảng giá — nằm ngoài i18n vì không phải nội dung dịch */
const CATEGORY_ICONS = [Droplet, Waves, Sparkles];
const SOCIAL_ICONS = [Smile, Camera, AtSign];

export default function Spa6({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] font-sans antialiased">

      {/* Navbar */}
      <header data-section="nav" className="sticky top-0 w-full z-50 bg-[#f8f9fa]/80 backdrop-blur-lg border-b border-[#bfc7d1]/30 shadow-sm">
        <nav className="flex justify-between items-center max-w-[1200px] mx-auto px-5 md:px-16 py-4">
          <span data-field="nav.brand" className="font-lexend text-2xl md:text-3xl font-semibold text-[#005d90] tracking-tight">{t.nav.brand}</span>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a className="text-[#005d90] font-bold border-b-2 border-[#005d90] pb-1" href="#">{t.nav.home}</a>
            <a className="text-[#404850] hover:text-[#005d90] transition-colors" href="#highlights">{t.nav.link1}</a>
            <a className="text-[#404850] hover:text-[#005d90] transition-colors" href="#services">{t.nav.link2}</a>
            <a className="text-[#404850] hover:text-[#005d90] transition-colors" href="#atmosphere">{t.nav.link3}</a>
          </div>
          <button data-track="booking" data-field="nav.cta" className="bg-[#005d90] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm font-medium hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer">
            {t.nav.cta}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="bg-cover bg-center w-full h-full" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fa]/50 to-transparent" />
          </div>
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-16">
            <div className="max-w-2xl bg-[#c3e9f1]/20 backdrop-blur-md border border-white/30 p-8 md:p-12 rounded-[2rem]">
              <h1 data-field="hero.title" className="font-lexend text-3xl md:text-5xl font-semibold text-[#005d90] mb-6 leading-tight tracking-tight">
                {t.hero.title}
              </h1>
              <p data-field="hero.subtitle" className="text-base md:text-lg text-[#40646b] mb-10 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button data-track="booking" data-field="hero.btnPrimary" className="bg-[#005d90] text-white px-10 py-4 rounded-full font-medium shadow-lg hover:bg-[#0077b6] transition-colors">
                  {t.hero.btnPrimary}
                </button>
                <a href="#atmosphere" data-field="hero.btnSecondary" className="border border-[#005d90] text-[#005d90] px-10 py-4 rounded-full font-medium hover:bg-[#005d90]/5 transition-colors text-center">
                  {t.hero.btnSecondary}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights — bento grid */}
        <section data-section="highlights" className="py-20 md:py-24 bg-[#f3f4f5]" id="highlights">
          <div className="max-w-[1200px] mx-auto px-5 md:px-16">
            <div className="text-center mb-16">
              <h2 data-field="highlights.title" className="font-lexend text-3xl md:text-5xl font-semibold text-[#005d90] mb-4 tracking-tight">{t.highlights.title}</h2>
              <p data-field="highlights.subtitle" className="text-lg text-[#404850]">{t.highlights.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 group relative overflow-hidden rounded-[2rem] aspect-[16/9]">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMG.highlight1} alt={t.highlights.items[0].title} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0077b6]/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 p-8">
                  {t.highlights.items[0].badge && (
                    <span data-field="highlights.items.0.badge" className="inline-block px-4 py-1 bg-[#c3e9f1] text-[#466a71] rounded-full text-xs font-medium tracking-wide mb-4">{t.highlights.items[0].badge}</span>
                  )}
                  <h3 data-field="highlights.items.0.title" className="font-lexend text-xl font-medium text-white mb-2">{t.highlights.items[0].title}</h3>
                  <p data-field="highlights.items.0.desc" className="text-white/90 max-w-md">{t.highlights.items[0].desc}</p>
                </div>
              </div>
              <div className="md:col-span-4 group relative overflow-hidden rounded-[2rem] hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMG.highlight2} alt={t.highlights.items[1].title} loading="lazy" />
                <div className="absolute inset-0 bg-[#005d90]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/40 to-transparent">
                  <h3 data-field="highlights.items.1.title" className="font-lexend text-xl font-medium text-white mb-2">{t.highlights.items[1].title}</h3>
                  <p data-field="highlights.items.1.desc" className="text-white/80">{t.highlights.items[1].desc}</p>
                </div>
              </div>
              <div className="md:col-span-12 group relative overflow-hidden rounded-[2rem] h-96">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMG.highlight3} alt={t.highlights.items[2].title} loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <h3 data-field="highlights.items.2.title" className="font-lexend text-2xl md:text-3xl font-semibold text-white mb-4">{t.highlights.items[2].title}</h3>
                  <p data-field="highlights.items.2.desc" className="text-white/90 max-w-xl text-lg">{t.highlights.items[2].desc}</p>
                  {t.highlights.items[2].btnLabel && (
                    <button data-field="highlights.items.2.btnLabel" className="mt-8 bg-white text-[#005d90] px-8 py-3 rounded-full font-medium hover:bg-[#cde5ff] transition-colors">{t.highlights.items[2].btnLabel}</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services / Price list */}
        <section data-section="services" className="py-20 md:py-24 bg-[#f8f9fa]" id="services">
          <div className="max-w-[1200px] mx-auto px-5 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 data-field="services.title" className="font-lexend text-3xl md:text-5xl font-semibold text-[#005d90] mb-4 tracking-tight">{t.services.title}</h2>
                <p data-field="services.subtitle" className="text-lg text-[#404850]">{t.services.subtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.services.categories.map((cat, ci) => {
                const CatIcon = CATEGORY_ICONS[ci] ?? Droplet;
                const featured = ci === 1;
                return (
                  <div
                    key={ci}
                    className={
                      featured
                        ? 'bg-[#0077b6] p-8 rounded-[2rem] shadow-xl flex flex-col h-full md:-translate-y-4'
                        : 'bg-[#c3e9f1]/20 backdrop-blur-md border border-white/30 p-8 rounded-[2rem] flex flex-col h-full'
                    }
                  >
                    <CatIcon aria-hidden className={`w-9 h-9 mb-6 ${featured ? 'text-white' : 'text-[#005d90]'}`} />
                    <h3 data-field={`services.categories.${ci}.title`} className={`font-lexend text-xl font-medium mb-6 ${featured ? 'text-white' : 'text-[#005d90]'}`}>
                      {cat.title}
                    </h3>
                    <ul className="space-y-6 flex-grow">
                      {cat.items.map((item, ii) => (
                        <li key={ii} className={`flex justify-between items-start gap-4 border-b pb-4 ${featured ? 'border-white/20' : 'border-[#bfc7d1]/30'}`}>
                          <div>
                            <h4 data-field={`services.categories.${ci}.items.${ii}.name`} className={`font-bold text-sm ${featured ? 'text-white' : 'text-[#191c1d]'}`}>{item.name}</h4>
                            <p data-field={`services.categories.${ci}.items.${ii}.desc`} className={`text-xs mt-1 leading-relaxed ${featured ? 'text-white/70' : 'text-[#404850]'}`}>{item.desc}</p>
                            <p data-field={`services.categories.${ci}.items.${ii}.duration`} className={`text-xs mt-1 ${featured ? 'text-white/70' : 'text-[#404850]'}`}>{item.duration}</p>
                          </div>
                          <span data-field={`services.categories.${ci}.items.${ii}.price`} className={`font-bold shrink-0 ${featured ? 'text-white' : 'text-[#005d90]'}`}>{item.price}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      data-track="booking"
                      data-field={`services.categories.${ci}.btnLabel`}
                      className={
                        featured
                          ? 'mt-8 w-full py-3 rounded-full bg-white text-[#005d90] font-bold hover:bg-[#c3e9f1] transition-all'
                          : 'mt-8 w-full py-3 rounded-full border border-[#005d90] text-[#005d90] hover:bg-[#005d90] hover:text-white transition-all'
                      }
                    >
                      {cat.btnLabel}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Atmosphere */}
        <section data-section="atmosphere" className="py-20 md:py-24 bg-[#e1e3e4] overflow-hidden" id="atmosphere">
          <div className="max-w-[1200px] mx-auto px-5 md:px-16">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 data-field="atmosphere.title" className="font-lexend text-3xl md:text-5xl font-semibold text-[#005d90] mb-8 tracking-tight">{t.atmosphere.title}</h2>
                <div className="space-y-8">
                  {t.atmosphere.items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle2 aria-hidden className="w-6 h-6 mt-1 text-[#005d90] shrink-0" />
                      <div>
                        <h4 data-field={`atmosphere.items.${i}.title`} className="font-lexend text-lg font-medium text-[#191c1d] mb-2">{item.title}</h4>
                        <p data-field={`atmosphere.items.${i}.desc`} className="text-[#404850] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <img className="rounded-[2rem] w-full h-80 object-cover shadow-lg" src={IMG.atmosphere1} alt={t.atmosphere.image1Alt} loading="lazy" />
                <img className="rounded-[2rem] w-full h-80 object-cover shadow-lg mt-12" src={IMG.atmosphere2} alt={t.atmosphere.image2Alt} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Location / Contact */}
        <section data-section="contact" className="py-20 md:py-24 bg-[#f8f9fa]" id="contact">
          <div className="max-w-[1200px] mx-auto px-5 md:px-16">
            <div className="text-center mb-16">
              <h2 data-field="contact.title" className="font-lexend text-3xl md:text-5xl font-semibold text-[#005d90] mb-4 tracking-tight">{t.contact.title}</h2>
              <p data-field="contact.subtitle" className="text-lg text-[#404850]">{t.contact.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="flex items-start gap-4">
                <MapPin aria-hidden className="w-5 h-5 mt-0.5 text-[#005d90] shrink-0" />
                <p data-field="contact.address" className="text-[#404850]">{t.contact.address}</p>
              </div>
              <div className="flex items-start gap-4">
                <Phone aria-hidden className="w-5 h-5 mt-0.5 text-[#005d90] shrink-0" />
                <a data-track="call" data-field="contact.phone" href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="text-[#404850] hover:text-[#005d90] transition-colors">
                  {t.contact.phone}
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white h-[420px] md:h-[500px] relative">
              {t.contact.mapUrl ? (
                <iframe
                  src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              ) : (
                <div className="w-full h-full bg-[#e7e8e9] flex items-center justify-center relative">
                  <div className="absolute inset-0 grayscale contrast-125 opacity-40">
                    <img className="w-full h-full object-cover" src={IMG.locationMap} alt="" loading="lazy" />
                  </div>
                  <div className="relative z-10 text-center px-4">
                    <div className="bg-[#005d90] text-white p-4 rounded-full shadow-2xl mb-4 inline-block">
                      <MapIcon aria-hidden className="w-8 h-8" />
                    </div>
                    <div className="bg-white/90 backdrop-blur p-6 rounded-[1.5rem] shadow-xl max-w-sm mx-auto border border-[#005d90]/20">
                      <h4 data-field="contact.brandName" className="font-lexend text-lg font-medium text-[#005d90] mb-2">{t.contact.brandName}</h4>
                      <p className="text-sm text-[#404850] mb-1">{t.contact.address}</p>
                      <p className="text-xs text-[#404850]/70">{t.contact.mapLoading}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-white border-t border-[#bfc7d1]/20">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-5 md:px-16 py-12 gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span data-field="footer.brand" className="font-lexend text-xl font-medium text-[#005d90]">{t.footer.brand}</span>
            <p data-field="footer.tagline" className="text-[#404850] text-center md:text-left max-w-xs">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a className="text-[#404850] hover:text-[#005d90] transition-colors" href="#">{t.footer.link1}</a>
            <a className="text-[#404850] hover:text-[#005d90] transition-colors" href="#">{t.footer.link2}</a>
            <a className="text-[#404850] hover:text-[#005d90] transition-colors" href="#">{t.footer.link3}</a>
            <a className="text-[#404850] hover:text-[#005d90] transition-colors" href="#">{t.footer.link4}</a>
          </div>
          <div className="flex gap-6">
            {SOCIAL_ICONS.map((Icon, i) => (
              <a key={i} className="text-[#005d90] hover:scale-110 transition-transform" href="#">
                <Icon aria-hidden className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center py-6 border-t border-[#bfc7d1]/10 text-xs text-[#404850]/60">
          <span data-field="footer.copy">{t.footer.copy}</span>
        </div>
      </footer>
    </div>
  );
}
