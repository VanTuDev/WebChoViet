import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroBg from './images/heroBg.jpg';
import imgServiceCosmetic from './images/serviceCosmetic.jpg';
import imgServiceGeneral from './images/serviceGeneral.jpg';
import imgServiceImplant from './images/serviceImplant.jpg';
import imgTechLab from './images/techLab.jpg';
import imgTechLaser from './images/techLaser.jpg';
import imgTestimonialPortrait from './images/testimonialPortrait.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg: imgHeroBg,
  serviceCosmetic: imgServiceCosmetic,
  serviceGeneral: imgServiceGeneral,
  serviceImplant: imgServiceImplant,
  techLab: imgTechLab,
  techLaser: imgTechLaser,
  testimonialPortrait: imgTestimonialPortrait,
};

export default function DentalClinic6({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  const serviceImgs = [imgServiceGeneral, imgServiceCosmetic, imgServiceImplant].map((fallback, i) =>
    i === 0 ? IMG.serviceGeneral : i === 1 ? IMG.serviceCosmetic : IMG.serviceImplant
  );

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased">

      {/* Navigation */}
      <header data-section="nav" className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#002b5c]/5">
        <nav className="max-w-[1400px] mx-auto px-8 flex justify-between items-center py-6">
          <div className="text-2xl font-extrabold text-[#002b5c] tracking-tighter">
            <span data-field="nav.brand">{t.nav.brand}</span>
            <span data-field="nav.brandAccent" className="text-[#C5A059] ml-1">{t.nav.brandAccent}</span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <a className="text-[#002b5c] font-bold text-sm tracking-widest uppercase border-b border-[#002b5c] pb-1" href="#hero" data-field="nav.home">{t.nav.home}</a>
            <a className="text-[#002b5c]/60 hover:text-[#002b5c] transition-colors text-sm tracking-widest uppercase font-semibold" href="#technology" data-field="nav.link2">{t.nav.link2}</a>
            <a className="text-[#002b5c]/60 hover:text-[#002b5c] transition-colors text-sm tracking-widest uppercase font-semibold" href="#services" data-field="nav.link2">{t.nav.link2}</a>
            <a className="text-[#002b5c]/60 hover:text-[#002b5c] transition-colors text-sm tracking-widest uppercase font-semibold" href="#pricing" data-field="nav.link3">{t.nav.link3}</a>
            <a className="text-[#002b5c]/60 hover:text-[#002b5c] transition-colors text-sm tracking-widest uppercase font-semibold" href="#testimonials" data-field="nav.link5">{t.nav.link5}</a>
            <a className="text-[#002b5c]/60 hover:text-[#002b5c] transition-colors text-sm tracking-widest uppercase font-semibold" href="#footer" data-field="nav.link6">{t.nav.link6}</a>
          </div>
          <button data-track="booking" data-field="nav.cta" className="border border-[#002b5c] px-8 py-3 text-[#002b5c] font-bold text-sm tracking-widest uppercase hover:bg-[#002b5c] hover:text-white transition-all cursor-pointer">
            {t.nav.cta}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" id="hero" className="pt-32 pb-24 md:pb-32 bg-[#fbf9f8]">
          <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-5 z-10">
              <Reveal as="div" variant="fade-up" className="w-[60px] h-px bg-[#C5A059] mb-8" />
              <Reveal as="span" data-field="hero.since" variant="fade-up" delay={80} className="block text-[#C5A059] font-bold text-sm tracking-[0.3em] uppercase mb-6">{t.hero.since}</Reveal>
              <Reveal as="h1" variant="fade-up" delay={160} className="font-sans text-4xl md:text-6xl font-extrabold text-[#002b5c] mb-8 leading-[1.1]">
                <span data-field="hero.titleLine1">{t.hero.titleLine1}</span> <br />
                <span data-field="hero.titleAccent" className="text-[#C5A059]">{t.hero.titleAccent}</span> <br />
                <span data-field="hero.titleLine3">{t.hero.titleLine3}</span>
              </Reveal>
              <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={240} className="text-lg leading-relaxed text-[#414754] mb-10 max-w-md">
                {t.hero.subtitle}
              </Reveal>
              <Reveal variant="fade-up" delay={320} className="flex items-center gap-12">
                <button data-track="booking" data-field="hero.btnPrimary" className="bg-[#002b5c] text-white px-12 py-5 font-bold tracking-widest uppercase text-sm hover:-translate-y-0.5 transition-transform cursor-pointer">
                  {t.hero.btnPrimary}
                </button>
                <div className="h-px w-24 bg-[#002b5c]/20 hidden sm:block" />
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-7 relative mt-16 lg:mt-0">
              <Reveal variant="blur-up" delay={200} duration={900} className="aspect-[16/10] shadow-2xl relative z-0 overflow-hidden">
                <img className="w-full h-full object-cover" src={IMG.heroBg} alt={t.hero.imageAlt} loading="lazy" />
              </Reveal>
              <Reveal variant="fade-up" delay={400} className="absolute -bottom-12 -left-12 p-12 bg-white hidden lg:block shadow-xl max-w-xs border-t-4 border-[#C5A059]">
                <p data-field="hero.cardNumber" className="text-[#002b5c] font-bold text-2xl mb-2">{t.hero.cardNumber}</p>
                <p data-field="hero.cardLabel" className="text-[#414754] text-sm uppercase tracking-widest font-bold mb-4">{t.hero.cardLabel}</p>
                <p data-field="hero.cardDesc" className="text-[#414754] text-sm leading-relaxed">{t.hero.cardDesc}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section data-section="technology" id="technology" className="py-24 md:py-32 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <Reveal as="h2" variant="fade-up" className="font-sans text-3xl md:text-4xl font-bold text-[#002b5c] mb-6">
                  <span data-field="technology.eyebrowTitle1">{t.technology.eyebrowTitle1}</span> <br />
                  <span data-field="technology.eyebrowTitle2">{t.technology.eyebrowTitle2}</span>
                </Reveal>
                <Reveal as="div" variant="fade-up" delay={80} className="w-[60px] h-px bg-[#C5A059] mb-8" />
                <Reveal as="p" data-field="technology.desc" variant="fade-up" delay={160} className="text-[#414754] mb-12">{t.technology.desc}</Reveal>
                <div className="space-y-8">
                  {t.technology.items.map((item, i) => (
                    <Reveal key={i} variant="fade-up" delay={i * 120} className="pb-6 border-b border-[#002b5c]/10">
                      <h4 className="text-[#002b5c] font-bold text-lg mb-2">
                        <span data-field={`technology.items.${i}.number`}>{item.number}</span> — <span data-field={`technology.items.${i}.title`}>{item.title}</span>
                      </h4>
                      <p data-field={`technology.items.${i}.desc`} className="text-[#414754] text-sm">{item.desc}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <Reveal variant="zoom-in" className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img className="w-full h-full object-cover" src={IMG.techLaser} alt={t.technology.highlights[0].imageAlt} loading="lazy" />
                  </Reveal>
                  <Reveal variant="fade-up" delay={100} className="p-8 bg-[#f6f3f2]">
                    <h3 data-field="technology.highlights.0.title" className="text-[#002b5c] font-bold text-xl mb-4">{t.technology.highlights[0].title}</h3>
                    <p data-field="technology.highlights.0.desc" className="text-[#414754] text-sm leading-relaxed">{t.technology.highlights[0].desc}</p>
                  </Reveal>
                </div>
                <div className="space-y-8 md:pt-16">
                  <Reveal variant="zoom-in" delay={120} className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <img className="w-full h-full object-cover" src={IMG.techLab} alt={t.technology.highlights[1].imageAlt} loading="lazy" />
                  </Reveal>
                  <Reveal variant="fade-up" delay={220} className="p-8 bg-[#002b5c] text-white">
                    <h3 data-field="technology.highlights.1.title" className="text-[#C5A059] font-bold text-xl mb-4">{t.technology.highlights[1].title}</h3>
                    <p data-field="technology.highlights.1.desc" className="text-white/70 text-sm leading-relaxed">{t.technology.highlights[1].desc}</p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section data-section="services" id="services" className="py-24 md:py-32 bg-[#002b5c] text-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <Reveal variant="fade-up" className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-12">
              <div className="max-w-2xl">
                <span data-field="services.eyebrow" className="block text-[#C5A059] font-bold text-sm tracking-[0.3em] uppercase mb-4">{t.services.eyebrow}</span>
                <h2 data-field="services.title" className="font-sans text-4xl md:text-6xl font-extrabold">{t.services.title}</h2>
              </div>
              <div className="text-right hidden lg:block">
                <p data-field="services.tagline" className="text-white/40 text-sm uppercase tracking-widest font-bold">{t.services.tagline}</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-white/10">
              {t.services.items.map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 120} className={`group relative py-16 lg:px-12 border-b border-white/10 hover:bg-white/5 transition-colors ${i < 2 ? 'lg:border-r' : ''}`}>
                  <div className="mb-12 aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img className="w-full h-full object-cover" src={serviceImgs[i]} alt={item.imageAlt} loading="lazy" />
                  </div>
                  <span data-field={`services.items.${i}.number`} className="block text-[#C5A059] text-4xl font-extrabold mb-8">{item.number}</span>
                  <h3 data-field={`services.items.${i}.title`} className="text-2xl font-bold mb-6">{item.title}</h3>
                  <p data-field={`services.items.${i}.desc`} className="text-white/60 mb-8 leading-relaxed">{item.desc}</p>
                  <a className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold border-b border-[#C5A059] pb-1 text-[#C5A059]" href="#services">
                    <span data-field={`services.items.${i}.linkLabel`}>{item.linkLabel}</span>
                    <ArrowRight aria-hidden className="w-3 h-3" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section data-section="pricing" id="pricing" className="py-24 md:py-32 bg-[#fbf9f8]">
          <div className="max-w-[1400px] mx-auto px-8">
            <Reveal variant="fade-up" className="max-w-3xl mb-20">
              <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#002b5c] mb-6">
                <span data-field="pricing.title1">{t.pricing.title1}</span> <span data-field="pricing.titleAccent" className="text-[#C5A059]">{t.pricing.titleAccent}</span>
              </h2>
              <div className="w-[60px] h-px bg-[#C5A059] mb-8" />
              <p data-field="pricing.desc" className="text-[#414754]">{t.pricing.desc}</p>
            </Reveal>
            <div className="bg-white border-t border-[#002b5c]/10">
              <div className="grid grid-cols-12 gap-8 py-8 px-8 border-b border-[#002b5c]/5 text-sm uppercase tracking-widest font-bold text-[#002b5c]/40">
                <div className="col-span-6" data-field="pricing.colService">{t.pricing.colService}</div>
                <div className="col-span-3 text-right" data-field="pricing.colPrice">{t.pricing.colPrice}</div>
                <div className="col-span-3 text-right" data-field="pricing.colPolicy">{t.pricing.colPolicy}</div>
              </div>
              <div className="divide-y divide-[#002b5c]/5">
                {t.pricing.items.map((item, i) => (
                  <Reveal key={i} variant="fade-up" delay={i * 90} className="grid grid-cols-12 gap-8 py-10 px-8 items-center hover:bg-[#f6f3f2] transition-colors">
                    <div data-field={`pricing.items.${i}.name`} className="col-span-6 font-bold text-[#002b5c] text-lg md:text-xl">{item.name}</div>
                    <div data-field={`pricing.items.${i}.price`} className="col-span-3 text-right text-[#002b5c] font-semibold">{item.price}</div>
                    <div data-field={`pricing.items.${i}.policy`} className="col-span-3 text-right text-[#414754] text-sm">{item.policy}</div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal variant="fade-up" className="mt-16 flex justify-end">
              <button data-field="pricing.downloadLabel" className="border-b border-[#002b5c] text-[#002b5c] font-bold tracking-widest uppercase text-sm pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors cursor-pointer">
                {t.pricing.downloadLabel}
              </button>
            </Reveal>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" id="testimonials" className="py-24 md:py-32 bg-white overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 mb-16 lg:mb-0">
                <Reveal as="span" data-field="testimonials.eyebrow" variant="fade-up" className="block text-[#C5A059] font-bold text-sm tracking-[0.3em] uppercase mb-4">{t.testimonials.eyebrow}</Reveal>
                <Reveal as="h2" variant="fade-up" delay={80} className="font-sans text-3xl md:text-4xl font-bold text-[#002b5c] mb-12 leading-tight">
                  <span data-field="testimonials.titleLine1">{t.testimonials.titleLine1}</span> <br />
                  <span data-field="testimonials.titleLine2">{t.testimonials.titleLine2}</span>
                </Reveal>
                <div className="space-y-12">
                  {t.testimonials.items.slice(0, 2).map((item, i) => (
                    <Reveal key={i} variant="fade-up" delay={i * 150} className={`relative pl-12 border-l ${i === 0 ? 'border-[#C5A059]' : 'border-[#002b5c]/10'}`}>
                      <p data-field={`testimonials.items.${i}.quote`} className={`text-lg italic mb-6 leading-relaxed ${i === 0 ? 'text-[#002b5c]' : 'text-[#414754]'}`}>&ldquo;{item.quote}&rdquo;</p>
                      <div>
                        <p data-field={`testimonials.items.${i}.name`} className={`font-bold uppercase tracking-widest text-sm ${i === 0 ? 'text-[#002b5c]' : 'text-[#002b5c]/40'}`}>{item.name}</p>
                        <p data-field={`testimonials.items.${i}.role`} className="text-[#414754] text-xs">{item.role}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7 relative">
                <div className="grid grid-cols-2 gap-4">
                  <Reveal variant="zoom-in" className="aspect-[3/4] overflow-hidden grayscale mt-12">
                    <img className="w-full h-full object-cover" src={IMG.testimonialPortrait} alt={t.testimonials.photo1Alt} loading="lazy" />
                  </Reveal>
                  <Reveal variant="zoom-in" delay={120} className="aspect-[3/4] overflow-hidden">
                    <img className="w-full h-full object-cover" src={IMG.serviceImplant} alt={t.testimonials.photo2Alt} loading="lazy" />
                  </Reveal>
                </div>
                <div className="absolute -top-8 -right-8 w-32 h-32 border-t border-r border-[#C5A059] hidden lg:block" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 max-w-4xl mx-auto lg:mx-0">
              {t.testimonials.items.slice(2, 4).map((item, i) => {
                const idx = i + 2;
                return (
                  <Reveal key={idx} variant="fade-up" delay={i * 150} className="relative pl-12 border-l border-[#002b5c]/10">
                    <p data-field={`testimonials.items.${idx}.quote`} className="text-lg italic mb-6 leading-relaxed text-[#414754]">&ldquo;{item.quote}&rdquo;</p>
                    <div>
                      <p data-field={`testimonials.items.${idx}.name`} className="font-bold uppercase tracking-widest text-sm text-[#002b5c]/40">{item.name}</p>
                      <p data-field={`testimonials.items.${idx}.role`} className="text-[#414754] text-xs">{item.role}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" id="footer" className="bg-[#002b5c] text-white pt-24 md:pt-32">
        <div className="max-w-[1400px] mx-auto px-8 pb-24 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Reveal variant="fade-up" className="lg:col-span-5">
              <div className="text-3xl font-extrabold tracking-tighter mb-10">
                <span data-field="footer.brand">{t.footer.brand}</span>
                <span data-field="footer.brandAccent" className="text-[#C5A059] ml-2">{t.footer.brandAccent}</span>
              </div>
              <p data-field="footer.desc" className="text-white/60 max-w-sm mb-12 leading-relaxed">{t.footer.desc}</p>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden className="w-4 h-4 mt-1 text-[#C5A059] shrink-0" />
                  <div>
                    <span data-field="footer.addressLabel" className="block text-[#C5A059] text-xs font-bold uppercase tracking-[0.2em] mb-2">{t.footer.addressLabel}</span>
                    <p data-field="footer.address" className="text-white/80">{t.footer.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone aria-hidden className="w-4 h-4 mt-1 text-[#C5A059] shrink-0" />
                  <div>
                    <span data-field="footer.hotlineLabel" className="block text-[#C5A059] text-xs font-bold uppercase tracking-[0.2em] mb-2">{t.footer.hotlineLabel}</span>
                    <a data-track="call" data-field="footer.hotline" href={`tel:${t.footer.hotline.replace(/[^\d+]/g, '')}`} className="text-white/80 hover:text-[#C5A059] transition-colors">{t.footer.hotline}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock aria-hidden className="w-4 h-4 mt-1 text-[#C5A059] shrink-0" />
                  <div>
                    <span data-field="footer.hoursLabel" className="block text-[#C5A059] text-xs font-bold uppercase tracking-[0.2em] mb-2">{t.footer.hoursLabel}</span>
                    <p data-field="footer.hours" className="text-white/80">{t.footer.hours}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="blur-up" delay={150} duration={800} className="lg:col-span-7 h-[450px] lg:h-auto border border-white/10 relative">
              {t.footer.mapUrl ? (
                <iframe
                  src={toGoogleMapsEmbedUrl(t.footer.mapUrl)}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                  style={{ filter: 'contrast(1.2) opacity(0.8) invert(1) hue-rotate(180deg)' }}
                />
              ) : (
                <div className="w-full h-full relative">
                  <img className="w-full h-full object-cover grayscale opacity-40" src={IMG.heroBg} alt="" loading="lazy" />
                  <div className="absolute inset-0 bg-[#002b5c]/60" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="bg-white/95 backdrop-blur-md px-6 py-5 shadow-xl text-center">
                      <MapPin aria-hidden className="w-5 h-5 text-[#002b5c] mx-auto mb-2" />
                      <p data-field="footer.mapBrand" className="font-extrabold text-sm text-[#002b5c] leading-none mb-1">{t.footer.mapBrand}</p>
                      <p data-field="footer.mapSub" className="text-[10px] text-[#C5A059] font-extrabold uppercase tracking-widest">{t.footer.mapSub}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 pointer-events-none border-[16px] border-[#002b5c]/20" />
            </Reveal>
          </div>
        </div>
        <Reveal variant="fade" className="max-w-[1400px] mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p data-field="footer.copyright" className="text-white/40 text-xs uppercase tracking-widest">{t.footer.copyright}</p>
          <div className="flex gap-12">
            <span data-field="footer.link1" className="text-white/40 hover:text-[#C5A059] transition-colors text-xs uppercase tracking-widest font-bold">{t.footer.link1}</span>
            <span data-field="footer.link2" className="text-white/40 hover:text-[#C5A059] transition-colors text-xs uppercase tracking-widest font-bold">{t.footer.link2}</span>
            <span data-field="footer.link3" className="text-white/40 hover:text-[#C5A059] transition-colors text-xs uppercase tracking-widest font-bold">{t.footer.link3}</span>
          </div>
        </Reveal>
      </footer>

      {/* Mobile CTA */}
      <div className="lg:hidden fixed bottom-8 left-8 right-8 z-50">
        <button data-track="booking" data-field="stickyCta" className="w-full bg-[#C5A059] text-[#002b5c] font-bold py-5 tracking-widest uppercase text-sm shadow-2xl active:scale-95 transition-transform cursor-pointer">
          {t.stickyCta}
        </button>
      </div>
    </div>
  );
}
