import { Calendar, MapPin, Phone, Mail, ArrowRight, Star, ScanLine, Cpu, Sparkles } from 'lucide-react';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroCtScanner from './images/heroCtScanner.jpg';
import imgServiceImplantScan from './images/serviceImplantScan.jpg';
import imgTechCrownMilling from './images/techCrownMilling.jpg';
import imgTechJawScan from './images/techJawScan.jpg';
import imgAvatarPatient1 from './images/avatarPatient1.jpg';
import imgAvatarPatient2 from './images/avatarPatient2.jpg';
import imgAvatarPatient3 from './images/avatarPatient3.jpg';
import imgLocationMap from './images/locationMap.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroCtScanner: imgHeroCtScanner,
  serviceImplantScan: imgServiceImplantScan,
  techCrownMilling: imgTechCrownMilling,
  techJawScan: imgTechJawScan,
  avatarPatient1: imgAvatarPatient1,
  avatarPatient2: imgAvatarPatient2,
  avatarPatient3: imgAvatarPatient3,
  locationMap: imgLocationMap,
};

const TESTIMONIAL_AVATARS = [imgAvatarPatient1, imgAvatarPatient2, imgAvatarPatient3];

export default function DentalClinic4({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased">

      {/* Header - sticky, KHÔNG bọc Reveal */}
      <header data-section="nav" className="sticky top-0 z-50 bg-[#fbf9f8]/90 backdrop-blur-md border-b border-[#c1c6d7]/30 shadow-sm">
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-[1200px] mx-auto">
          <div className="flex flex-col leading-none">
            <span data-field="nav.brand" className="font-extrabold text-2xl text-[#0059bb] tracking-tight">{t.nav.brand}</span>
            <span data-field="nav.brandSub" className="text-[10px] font-bold text-[#717786] tracking-[0.3em] uppercase mt-1">{t.nav.brandSub}</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a className="text-sm font-bold text-[#0059bb] border-b-2 border-[#0059bb] pb-1" href="#hero" data-field="nav.home">{t.nav.home}</a>
            <a className="text-sm font-semibold text-[#414754] hover:text-[#0059bb] transition-colors duration-200" href="#services" data-field="nav.link1">{t.nav.link1}</a>
            <a className="text-sm font-semibold text-[#414754] hover:text-[#0059bb] transition-colors duration-200" href="#pricing" data-field="nav.link2">{t.nav.link2}</a>
            <a className="text-sm font-semibold text-[#414754] hover:text-[#0059bb] transition-colors duration-200" href="#reviews" data-field="nav.link3">{t.nav.link3}</a>
            <a className="text-sm font-semibold text-[#414754] hover:text-[#0059bb] transition-colors duration-200" href="#contact" data-field="nav.link4">{t.nav.link4}</a>
          </nav>
          <button data-track="booking" data-field="nav.cta" className="bg-[#0059bb] hover:bg-[#0070ea] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md cursor-pointer">
            {t.nav.cta}
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[#fbf9f8] to-[#e1e3e4]">
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
            <div className="space-y-8">
              <Reveal as="div" data-field="hero.badge" variant="fade-up" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0059bb]/30 bg-[#0059bb]/5 text-[#0059bb] text-xs font-bold uppercase tracking-widest">
                <Cpu aria-hidden className="w-3.5 h-3.5" />
                {t.hero.badge}
              </Reveal>
              <Reveal as="h1" variant="fade-up" delay={100} className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                <span data-field="hero.titleLine1" className="bg-gradient-to-r from-[#1b1c1c] to-[#717786] bg-clip-text text-transparent">{t.hero.titleLine1}</span><br />
                <span data-field="hero.titleLine2" className="bg-gradient-to-r from-[#1b1c1c] to-[#717786] bg-clip-text text-transparent">{t.hero.titleLine2}</span><br />
                <span data-field="hero.titleHighlight" className="text-[#0059bb]">{t.hero.titleHighlight}</span>
              </Reveal>
              <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={200} className="text-lg text-[#414754] max-w-lg leading-relaxed">
                {t.hero.subtitle}
              </Reveal>
              <Reveal variant="fade-up" delay={300} className="flex flex-wrap gap-4">
                <button data-track="booking" data-field="hero.btnPrimary" className="bg-[#0059bb] text-white px-8 py-4 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-[#0059bb]/20 transition-all transform hover:-translate-y-1 cursor-pointer">
                  {t.hero.btnPrimary}
                </button>
                <button data-field="hero.btnSecondary" className="border border-[#c1c6d7] bg-white/60 text-[#1b1c1c] px-8 py-4 rounded-xl text-sm font-bold hover:bg-white transition-all cursor-pointer">
                  {t.hero.btnSecondary}
                </button>
              </Reveal>
            </div>
            <Reveal variant="blur-up" delay={250} duration={900} className="relative hidden md:block">
              <div className="aspect-square rounded-[2rem] overflow-hidden relative z-10 shadow-[0_0_15px_rgba(0,89,187,0.2)] ring-1 ring-[#0070ea]/30">
                <img className="w-full h-full object-cover" src={IMG.heroCtScanner} alt={t.hero.imageAlt} loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl z-20 border border-white/40">
                <div data-field="hero.statNumber" className="text-[#0059bb] font-extrabold text-2xl">{t.hero.statNumber}</div>
                <div data-field="hero.statLabel" className="text-[#414754] text-xs font-bold uppercase tracking-wide mt-1">{t.hero.statLabel}</div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#0059bb]/10 rounded-full blur-3xl -z-10" />
            </Reveal>
          </div>
        </section>

        {/* Services - Bento Grid */}
        <section data-section="services" id="services" className="py-20 md:py-24 bg-[#fbf9f8]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <Reveal variant="fade-up" className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
              <h2 data-field="services.eyebrow" className="text-[#0059bb] font-bold text-xs uppercase tracking-[0.3em]">{t.services.eyebrow}</h2>
              <p data-field="services.title" className="text-3xl md:text-4xl font-extrabold text-[#1b1c1c] leading-tight">{t.services.title}</p>
              <p data-field="services.subtitle" className="text-[#414754] leading-relaxed">{t.services.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[280px]">
              {/* Featured large card */}
              <Reveal variant="zoom-in" className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl shadow-[0_0_15px_rgba(0,89,187,0.15)] ring-1 ring-[#0070ea]/20 min-h-[320px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={IMG.serviceImplantScan} alt={t.services.featured.imageAlt} loading="lazy" />
                <div className="absolute bottom-0 left-0 p-8 md:p-10 z-20">
                  <h3 data-field="services.featured.title" className="text-2xl font-extrabold text-white mb-2">{t.services.featured.title}</h3>
                  <p data-field="services.featured.desc" className="text-[#e4e2e1] max-w-md">{t.services.featured.desc}</p>
                  <a className="mt-4 inline-flex items-center gap-2 text-[#adc7ff] text-sm font-bold group/link" href="#services">
                    <span data-field="services.featured.linkLabel">{t.services.featured.linkLabel}</span>
                    <ArrowRight aria-hidden className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Reveal>
              {t.services.items.map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 100} className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 min-h-[220px] ${i === 1 ? 'bg-[#0059bb] text-white shadow-lg shadow-[#0059bb]/20' : 'bg-[#f6f3f2] border border-[#c1c6d7]/30 hover:bg-white'}`}>
                  <div data-field={`services.items.${i}.number`} className={`font-extrabold text-2xl ${i === 1 ? 'text-white/80' : 'text-[#0059bb]/30'}`}>{item.number}</div>
                  <div>
                    <h3 data-field={`services.items.${i}.title`} className={`font-extrabold text-xl mb-2 ${i === 1 ? 'text-white' : 'text-[#1b1c1c]'}`}>{item.title}</h3>
                    <p data-field={`services.items.${i}.desc`} className={i === 1 ? 'text-[#d8e2ff]' : 'text-[#414754]'}>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Precision */}
        <section data-section="technology" id="technology" className="py-20 md:py-24 bg-gradient-to-br from-[#fbf9f8] to-[#e1e3e4]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <Reveal variant="blur-up" className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <img className="w-full h-full object-cover" src={IMG.techCrownMilling} alt={t.technology.image1Alt} loading="lazy" />
                </Reveal>
                <Reveal variant="blur-up" delay={150} className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl translate-y-6">
                  <img className="w-full h-full object-cover" src={IMG.techJawScan} alt={t.technology.image2Alt} loading="lazy" />
                </Reveal>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <Reveal as="h2" variant="fade-up" className="text-3xl md:text-4xl font-extrabold text-[#1b1c1c] leading-tight">
                <span data-field="technology.title">{t.technology.title}</span> <br />
                <span data-field="technology.titleHighlight" className="text-[#0059bb]">{t.technology.titleHighlight}</span>
              </Reveal>
              <Reveal as="p" data-field="technology.desc" variant="fade-up" delay={100} className="text-lg text-[#414754] leading-relaxed">
                {t.technology.desc}
              </Reveal>
              <ul className="space-y-4">
                {t.technology.points.map((point, i) => (
                  <Reveal as="li" key={i} variant="fade-up" delay={i * 100} className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-[#c1c6d7]/20">
                    <ScanLine aria-hidden className="w-6 h-6 text-[#0059bb] shrink-0 mt-0.5" />
                    <div>
                      <h4 data-field={`technology.points.${i}.title`} className="text-sm font-bold text-[#1b1c1c]">{point.title}</h4>
                      <p data-field={`technology.points.${i}.desc`} className="text-[#414754] text-sm mt-1">{point.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section data-section="pricing" id="pricing" className="py-20 md:py-24 bg-[#fbf9f8]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <Reveal variant="fade-up" className="text-center mb-14 max-w-2xl mx-auto space-y-3">
              <h2 data-field="pricing.eyebrow" className="text-[#0059bb] font-bold text-xs uppercase tracking-[0.3em]">{t.pricing.eyebrow}</h2>
              <p data-field="pricing.title" className="text-3xl md:text-4xl font-extrabold text-[#1b1c1c]">{t.pricing.title}</p>
              <p data-field="pricing.subtitle" className="text-[#414754]">{t.pricing.subtitle}</p>
            </Reveal>
            <Reveal variant="fade-up" duration={800} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#c1c6d7]/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="bg-[#e6f2ff] text-[#1b1c1c]">
                      <th data-field="pricing.colService" className="p-5 md:p-6 font-extrabold text-lg">{t.pricing.colService}</th>
                      <th data-field="pricing.colPrice" className="p-5 md:p-6 font-extrabold text-lg">{t.pricing.colPrice}</th>
                      <th data-field="pricing.colAction" className="p-5 md:p-6 font-extrabold text-lg text-right">{t.pricing.colAction}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.pricing.items.map((item, i) => (
                      <tr key={i} className="border-b border-[#c1c6d7]/20 last:border-b-0 hover:bg-[#f6f3f2] transition-colors">
                        <td data-field={`pricing.items.${i}.name`} className="p-5 md:p-6 text-[#1b1c1c]">{item.name}</td>
                        <td data-field={`pricing.items.${i}.price`} className="p-5 md:p-6 font-bold text-[#0059bb]">{item.price}</td>
                        <td className="p-5 md:p-6 text-right">
                          <button data-track="booking" data-field="pricing.actionLabel" className="text-[#0059bb] font-bold hover:underline cursor-pointer">{t.pricing.actionLabel}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" id="reviews" className="py-20 md:py-24 bg-gradient-to-br from-[#fbf9f8] to-[#e1e3e4]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <Reveal variant="fade-up" className="text-center mb-14 max-w-2xl mx-auto space-y-3">
              <h2 data-field="testimonials.eyebrow" className="text-[#0059bb] font-bold text-xs uppercase tracking-[0.3em]">{t.testimonials.eyebrow}</h2>
              <p data-field="testimonials.title" className="text-3xl md:text-4xl font-extrabold text-[#1b1c1c]">{t.testimonials.title}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.testimonials.items.map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 100} className="bg-white p-8 rounded-3xl shadow-md flex flex-col gap-4 border border-[#c1c6d7]/20">
                  <div className="flex items-center gap-4">
                    <img className="w-16 h-16 rounded-full object-cover border-2 border-[#0059bb]/20" src={TESTIMONIAL_AVATARS[i] ?? TESTIMONIAL_AVATARS[0]} alt="" loading="lazy" />
                    <div>
                      <h4 data-field={`testimonials.items.${i}.name`} className="font-bold text-[#1b1c1c]">{item.name}</h4>
                      <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#0059bb] font-bold uppercase tracking-wide mt-0.5">{item.role}</p>
                      <div className="flex gap-0.5 mt-1.5" aria-hidden>
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} className="w-3.5 h-3.5 fill-[#facc15] text-[#facc15]" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="text-[#414754] italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating CTA (mobile) - fixed, KHÔNG bọc Reveal */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button data-track="booking" data-field="cta.floatingLabel" className="bg-[#0059bb] text-white p-4 rounded-full shadow-[0_0_15px_rgba(0,89,187,0.4)] flex items-center gap-2 cursor-pointer">
          <Calendar aria-hidden className="w-5 h-5" />
          <span className="text-sm font-bold pr-2">{t.cta.floatingLabel}</span>
        </button>
      </div>

      {/* Footer */}
      <footer data-section="footer" id="contact" className="bg-[#f6f3f2] border-t border-[#c1c6d7]/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-8 py-16 md:py-20 max-w-[1200px] mx-auto">
          <Reveal variant="fade-up" className="space-y-6">
            <div className="flex items-center gap-2 font-extrabold text-2xl text-[#0059bb]">
              <Sparkles aria-hidden className="w-6 h-6" />
              <span data-field="footer.brand">{t.footer.brand}</span>
            </div>
            <p data-field="footer.desc" className="text-[#414754] max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#414754]">
                <MapPin aria-hidden className="w-5 h-5 text-[#0059bb] shrink-0" />
                <span data-field="footer.address">{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-3 text-[#414754]">
                <Phone aria-hidden className="w-5 h-5 text-[#0059bb] shrink-0" />
                <a data-track="call" data-field="footer.phone" href={`tel:${t.footer.phone.replace(/[^\d+]/g, '')}`} className="hover:text-[#0059bb] transition-colors">{t.footer.phone}</a>
              </div>
              <div className="flex items-center gap-3 text-[#414754]">
                <Mail aria-hidden className="w-5 h-5 text-[#0059bb] shrink-0" />
                <a data-field="footer.email" href={`mailto:${t.footer.email}`} className="hover:text-[#0059bb] transition-colors">{t.footer.email}</a>
              </div>
            </div>
          </Reveal>
          <Reveal variant="fade-up" delay={150} className="space-y-4">
            <h4 data-field="footer.mapTitle" className="font-bold text-[#1b1c1c]">{t.footer.mapTitle}</h4>
            <div className="h-[280px] md:h-full min-h-[240px] rounded-3xl overflow-hidden border border-[#c1c6d7]/30 shadow-lg">
              {t.footer.mapUrl ? (
                <iframe
                  src={toGoogleMapsEmbedUrl(t.footer.mapUrl)}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              ) : (
                <div className="w-full h-full bg-[#e4e2e1] relative group">
                  <img className="w-full h-full object-cover grayscale contrast-125 opacity-40 group-hover:scale-110 transition-transform duration-1000" src={IMG.locationMap} alt="" loading="lazy" />
                  <div className="absolute inset-0 bg-[#0059bb]/5" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl text-center">
                      <p data-field="footer.mapBrand" className="font-extrabold text-sm text-[#1b1c1c] leading-none mb-1">{t.footer.mapBrand}</p>
                      <p data-field="footer.mapSub" className="text-[10px] text-[#0059bb] font-extrabold uppercase tracking-widest">{t.footer.mapSub}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
        <div className="border-t border-[#c1c6d7]/30 py-8 px-6 md:px-8">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p data-field="footer.copyright" className="text-[#414754] text-sm">{t.footer.copyright}</p>
            <div className="flex gap-6 text-sm">
              <span data-field="footer.link1" className="text-[#414754] hover:text-[#0059bb] transition-all cursor-pointer">{t.footer.link1}</span>
              <span data-field="footer.link2" className="text-[#414754] hover:text-[#0059bb] transition-all cursor-pointer">{t.footer.link2}</span>
              <span data-field="footer.link3" className="text-[#414754] hover:text-[#0059bb] transition-all cursor-pointer">{t.footer.link3}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
