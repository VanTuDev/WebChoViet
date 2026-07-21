import { CheckCircle2, MapPin, Phone, Clock } from 'lucide-react';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgAvatarUser1 from './images/avatarUser1.jpg';
import imgAvatarUser2 from './images/avatarUser2.jpg';
import imgAvatarUser3 from './images/avatarUser3.jpg';
import imgHeroBg from './images/heroBg.jpg';
import imgTech1CtScan from './images/tech1CtScan.jpg';
import imgTech2Scanner from './images/tech2Scanner.jpg';
import imgResultsMain from './images/resultsMain.jpg';
import imgFacility1Lounge from './images/facility1Lounge.jpg';
import imgFacility2Treatment from './images/facility2Treatment.jpg';
import imgSmilePortrait from './images/smilePortrait.jpg';
import imgLocationMap from './images/locationMap.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  avatarUser1: imgAvatarUser1,
  avatarUser2: imgAvatarUser2,
  avatarUser3: imgAvatarUser3,
  heroBg: imgHeroBg,
  tech1CtScan: imgTech1CtScan,
  tech2Scanner: imgTech2Scanner,
  resultsMain: imgResultsMain,
  facility1Lounge: imgFacility1Lounge,
  facility2Treatment: imgFacility2Treatment,
  smilePortrait: imgSmilePortrait,
  locationMap: imgLocationMap,
};

export default function DentalClinic1({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased">

      {/* Navbar */}
      <header data-section="nav" className="sticky top-0 w-full z-50 bg-[#fbf9f8]/80 backdrop-blur-xl border-b border-[#c1c6d7]/20">
        <nav className="flex justify-between items-center max-w-[1280px] mx-auto px-6 md:px-8 py-5">
          <div className="flex flex-col">
            <span data-field="nav.brand" className="font-lexend font-extrabold text-2xl text-[#0059bb] tracking-tighter leading-none">{t.nav.brand}</span>
            <span data-field="nav.brandSub" className="font-bold text-[10px] text-[#414754] tracking-[0.3em] leading-none uppercase mt-1">{t.nav.brandSub}</span>
          </div>
          <div className="hidden lg:flex gap-10 items-center text-sm font-semibold tracking-wide">
            <a className="text-[#0059bb] font-bold" href="#hero" data-field="nav.home">{t.nav.home}</a>
            <a className="text-[#414754] hover:text-[#0059bb] transition-colors" href="#technology" data-field="nav.link1">{t.nav.link1}</a>
            <a className="text-[#414754] hover:text-[#0059bb] transition-colors" href="#services" data-field="nav.link2">{t.nav.link2}</a>
            <a className="text-[#414754] hover:text-[#0059bb] transition-colors" href="#pricing" data-field="nav.link3">{t.nav.link3}</a>
            <a className="text-[#414754] hover:text-[#0059bb] transition-colors" href="#testimonials" data-field="nav.link4">{t.nav.link4}</a>
            <a className="text-[#414754] hover:text-[#0059bb] transition-colors" href="#footer" data-field="nav.link5">{t.nav.link5}</a>
          </div>
          <button data-track="booking" data-field="nav.cta" className="bg-[#0059bb] text-white font-bold text-sm px-7 py-3 rounded-full hover:shadow-xl hover:shadow-[#0059bb]/20 transition-all active:scale-95 cursor-pointer">
            {t.nav.cta}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" id="hero" className="relative overflow-hidden bg-[#fbf9f8] pt-16 pb-24 lg:pt-24">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0059bb]/5 -skew-x-12 origin-top pointer-events-none" />
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <Reveal as="div" data-field="hero.badge" variant="fade-up" className="inline-flex items-center px-5 py-2 rounded-full bg-[#0059bb]/10 text-[#0059bb] font-bold text-xs uppercase tracking-[0.2em]">
                {t.hero.badge}
              </Reveal>
              <Reveal as="h1" variant="fade-up" delay={100} className="font-lexend text-4xl md:text-6xl font-extrabold text-[#1b1c1c] leading-tight">
                <span data-field="hero.titleLine1">{t.hero.titleLine1}</span><br />
                <span data-field="hero.titleLine2" className="text-[#0059bb] italic font-medium">{t.hero.titleLine2}</span>
              </Reveal>
              <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={200} className="text-lg text-[#414754] max-w-xl leading-relaxed opacity-90">
                {t.hero.subtitle}
              </Reveal>
              <Reveal variant="fade-up" delay={300} className="flex flex-col sm:flex-row gap-6 pt-4">
                <button data-track="booking" data-field="hero.btnPrimary" className="bg-[#0059bb] text-white font-bold text-lg px-10 py-4 rounded-2xl hover:shadow-2xl hover:shadow-[#0059bb]/30 transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                  {t.hero.btnPrimary}
                </button>
                <div className="flex items-center gap-5 px-4 border-l border-[#c1c6d7]/50">
                  <div className="flex -space-x-4">
                    <img className="w-12 h-12 rounded-full border-4 border-[#fbf9f8] shadow-lg object-cover" src={IMG.avatarUser1} alt="" loading="lazy" />
                    <img className="w-12 h-12 rounded-full border-4 border-[#fbf9f8] shadow-lg object-cover" src={IMG.avatarUser2} alt="" loading="lazy" />
                    <img className="w-12 h-12 rounded-full border-4 border-[#fbf9f8] shadow-lg object-cover" src={IMG.avatarUser3} alt="" loading="lazy" />
                  </div>
                  <div className="text-[#414754]">
                    <span data-field="hero.statNumber" className="block font-extrabold text-[#1b1c1c] text-xl tracking-tight">{t.hero.statNumber}</span>
                    <span data-field="hero.statLabel" className="text-xs font-bold uppercase tracking-widest opacity-60">{t.hero.statLabel}</span>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal variant="blur-up" delay={200} duration={900} className="relative group">
              <div className="absolute -inset-4 bg-[#0059bb]/10 rounded-[3rem] blur-3xl group-hover:bg-[#0059bb]/20 transition-colors duration-700" />
              <div className="rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] relative aspect-[4/3] ring-1 ring-black/5 z-10">
                <img className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" src={IMG.heroBg} alt={t.hero.imageAlt} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0059bb]/20 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl z-20 hidden md:block border border-white/50 ring-1 ring-black/5">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-1.5 h-9 bg-[#0059bb] rounded-full" />
                  <div>
                    <p data-field="hero.cardTitle" className="font-bold text-[#1b1c1c] text-base">{t.hero.cardTitle}</p>
                    <p data-field="hero.cardSubtitle" className="text-xs font-bold text-[#0059bb] tracking-widest uppercase mt-0.5">{t.hero.cardSubtitle}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-1 w-12 rounded-full bg-[#0059bb]" />
                  <div className="h-1 w-8 rounded-full bg-[#0059bb]/20" />
                  <div className="h-1 w-8 rounded-full bg-[#0059bb]/20" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Technology */}
        <section data-section="technology" id="technology" className="py-20 md:py-28 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <Reveal variant="fade-up" className="text-center mb-16 max-w-3xl mx-auto space-y-4">
              <h2 data-field="technology.eyebrow" className="text-[#0059bb] font-bold text-sm uppercase tracking-[0.4em]">{t.technology.eyebrow}</h2>
              <p data-field="technology.title" className="font-lexend text-[#1b1c1c] text-2xl md:text-4xl font-bold leading-tight">{t.technology.title}</p>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              {t.technology.items.map((item, i) => {
                const img = i === 0 ? IMG.tech1CtScan : IMG.tech2Scanner;
                return (
                  <Reveal key={i} variant="fade-up" delay={i * 100} className="group relative overflow-hidden rounded-[2.5rem] bg-[#fbf9f8] border border-[#c1c6d7]/10 flex flex-col hover:border-[#0059bb]/20 hover:shadow-2xl hover:shadow-[#0059bb]/5 transition-all duration-500">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={img} alt={item.imageAlt} loading="lazy" />
                    </div>
                    <div className="p-10 lg:p-12 flex-grow">
                      <h3 data-field={`technology.items.${i}.title`} className="font-lexend font-extrabold text-2xl text-[#1b1c1c] mb-4 tracking-tight">{item.title}</h3>
                      <p data-field={`technology.items.${i}.desc`} className="text-[#414754] leading-relaxed opacity-80">{item.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section data-section="services" id="services" className="py-20 md:py-28 bg-[#fbf9f8]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <Reveal variant="fade-up" className="text-center mb-16 max-w-3xl mx-auto space-y-4">
              <h2 data-field="services.eyebrow" className="text-[#0059bb] font-bold text-sm uppercase tracking-[0.4em]">{t.services.eyebrow}</h2>
              <p data-field="services.title" className="font-lexend text-[#1b1c1c] text-2xl md:text-4xl font-bold leading-tight">{t.services.title}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.services.items.map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 100} className="group bg-white p-10 rounded-[2.5rem] border border-[#c1c6d7]/10 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col items-start relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#0059bb]/5 rounded-bl-[3rem] group-hover:scale-[3] transition-transform duration-1000 origin-top-right" />
                  <h3 data-field={`services.items.${i}.title`} className="font-extrabold text-xl text-[#1b1c1c] mb-4 relative z-10">{item.title}</h3>
                  <p data-field={`services.items.${i}.desc`} className="text-[#414754] mb-8 flex-grow leading-relaxed opacity-80 relative z-10">{item.desc}</p>
                  <div className="w-10 h-1 bg-[#0059bb]/20 rounded-full group-hover:w-full transition-all duration-700 relative z-10" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section data-section="results" id="results" className="py-20 md:py-28 bg-white overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <Reveal variant="zoom-in" duration={900} className="relative group">
                <div className="rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.2)] relative z-10 border-[10px] border-white aspect-[4/3]">
                  <img className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" src={IMG.resultsMain} alt={t.results.imageAlt} loading="lazy" />
                </div>
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#0059bb]/5 rounded-full blur-[100px]" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#0059bb]/10 rounded-full blur-[100px]" />
                <div data-field="results.badge" className="absolute top-8 left-8 bg-white/85 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl font-bold text-[#0059bb] z-20 border border-white/50 tracking-wide uppercase text-xs">
                  {t.results.badge}
                </div>
              </Reveal>
              <div className="space-y-8">
                <Reveal as="h2" variant="fade-up" className="font-lexend text-[#1b1c1c] text-2xl md:text-4xl font-bold leading-tight uppercase tracking-tight">
                  <span data-field="results.title">{t.results.title}</span><br />
                  <span data-field="results.titleHighlight" className="text-[#0059bb]">{t.results.titleHighlight}</span>
                </Reveal>
                <Reveal as="p" data-field="results.desc" variant="fade-up" delay={100} className="text-lg text-[#414754] leading-relaxed opacity-90">
                  {t.results.desc}
                </Reveal>
                <div className="space-y-5">
                  {t.results.points.map((point, i) => (
                    <Reveal key={i} variant="fade-up" delay={200 + i * 80} className="flex items-center gap-4">
                      <CheckCircle2 aria-hidden className="w-5 h-5 text-[#0059bb] shrink-0" />
                      <span data-field={`results.points.${i}`} className="text-[#1b1c1c] font-bold tracking-tight">{point}</span>
                    </Reveal>
                  ))}
                </div>
                <Reveal variant="fade-up" delay={300}>
                  <button data-track="booking" data-field="results.btnLabel" className="bg-[#0059bb] text-white font-bold text-lg px-10 py-4 rounded-2xl hover:shadow-2xl transition-all duration-500 mt-2 cursor-pointer">
                    {t.results.btnLabel}
                  </button>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section data-section="pricing" id="pricing" className="py-20 md:py-28 bg-[#fbf9f8]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <Reveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 border-b border-[#c1c6d7]/20 pb-10">
              <div className="max-w-2xl">
                <h2 data-field="pricing.eyebrow" className="text-[#0059bb] font-bold text-sm uppercase tracking-[0.4em] mb-4">{t.pricing.eyebrow}</h2>
                <p data-field="pricing.title" className="font-lexend text-[#1b1c1c] text-2xl md:text-4xl font-bold leading-tight">{t.pricing.title}</p>
              </div>
              <div className="inline-flex p-1.5 bg-[#f0eded] rounded-2xl shadow-inner border border-[#c1c6d7]/10 self-start">
                <span data-field="pricing.tab1" className="px-8 py-3 bg-white text-[#0059bb] font-bold rounded-xl shadow-sm tracking-tight text-sm">{t.pricing.tab1}</span>
                <span data-field="pricing.tab2" className="px-8 py-3 text-[#414754] font-bold tracking-tight text-sm">{t.pricing.tab2}</span>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {t.pricing.groups.map((group, gi) => (
                <Reveal key={gi} variant="fade-up" delay={gi * 100} className="overflow-hidden rounded-[2.5rem] border border-[#c1c6d7]/10 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="bg-[#0059bb]/5 px-8 py-7 border-b border-[#c1c6d7]/10">
                    <h3 data-field={`pricing.groups.${gi}.title`} className="font-extrabold text-xl text-[#0059bb] tracking-tight">{group.title}</h3>
                  </div>
                  <div className="divide-y divide-[#c1c6d7]/10">
                    {group.items.map((item, ii) => (
                      <div key={ii} className="px-8 py-7 flex justify-between items-center gap-4 hover:bg-[#0059bb]/[0.02] transition-colors">
                        <div>
                          <p data-field={`pricing.groups.${gi}.items.${ii}.name`} className="font-extrabold text-[#1b1c1c] text-base mb-1 tracking-tight">{item.name}</p>
                          <p data-field={`pricing.groups.${gi}.items.${ii}.desc`} className="text-[#414754] text-sm font-medium opacity-70 italic">{item.desc}</p>
                        </div>
                        <span data-field={`pricing.groups.${gi}.items.${ii}.price`} className="font-extrabold text-[#0059bb] text-xl tracking-tighter shrink-0">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section data-section="facilities" id="facilities" className="py-20 md:py-28 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <Reveal variant="fade-up" className="text-center mb-16 max-w-3xl mx-auto space-y-4">
              <h2 data-field="facilities.eyebrow" className="text-[#0059bb] font-bold text-sm uppercase tracking-[0.4em]">{t.facilities.eyebrow}</h2>
              <p data-field="facilities.title" className="font-lexend text-[#1b1c1c] text-2xl md:text-4xl font-bold leading-tight">{t.facilities.title}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {t.facilities.items.map((item, i) => {
                const img = i === 0 ? IMG.facility1Lounge : IMG.facility2Treatment;
                return (
                  <Reveal key={i} variant="zoom-in" delay={i * 100} className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#c1c6d7]/10 aspect-video">
                    <img className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" src={img} alt={item.imageAlt} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <p data-field={`facilities.items.${i}.label`} className="text-white font-bold text-xl uppercase tracking-widest">{item.label}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" id="testimonials" className="py-20 md:py-28 bg-[#fbf9f8]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8">
            <Reveal variant="fade-up" className="text-center mb-20 max-w-3xl mx-auto space-y-4">
              <h2 data-field="testimonials.eyebrow" className="text-[#0059bb] font-bold text-sm uppercase tracking-[0.4em]">{t.testimonials.eyebrow}</h2>
              <p data-field="testimonials.title" className="font-lexend text-[#1b1c1c] text-2xl md:text-4xl font-bold leading-tight">{t.testimonials.title}</p>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 space-y-8">
                {[0, 1].map(i => (
                  <Reveal key={i} variant="fade-up" delay={i * 100}>
                    <TestimonialCard index={i} t={t} IMG={IMG} />
                  </Reveal>
                ))}
              </div>
              <Reveal variant="zoom-in" delay={150} duration={900} className="lg:col-span-4 relative group">
                <div className="absolute -inset-4 bg-[#0059bb]/10 rounded-[3rem] blur-2xl group-hover:bg-[#0059bb]/20 transition-all" />
                <div className="relative rounded-[3rem] overflow-hidden aspect-[3/4] shadow-2xl z-10 border-[12px] border-white">
                  <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={IMG.smilePortrait} alt={t.testimonials.centerImageAlt} loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0059bb]/60 via-transparent to-transparent flex items-end p-10">
                    <p data-field="testimonials.centerCaption" className="text-white font-extrabold text-xl leading-tight">{t.testimonials.centerCaption}</p>
                  </div>
                </div>
              </Reveal>
              <div className="lg:col-span-4 space-y-8">
                {[2, 3].map(i => (
                  <Reveal key={i} variant="fade-up" delay={(i - 2) * 100}>
                    <TestimonialCard index={i} t={t} IMG={IMG} />
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal variant="fade-up" delay={200} className="mt-16 flex justify-center">
              <button data-track="booking" data-field="testimonials.ctaLabel" className="px-14 py-4 bg-[#0059bb] text-white font-bold rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(0,89,187,0.4)] transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                {t.testimonials.ctaLabel}
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" id="footer" className="bg-white border-t border-[#c1c6d7]/20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <Reveal variant="fade-up" className="space-y-6">
              <div className="flex flex-col">
                <span data-field="footer.brand" className="font-lexend font-extrabold text-2xl text-[#0059bb] tracking-tighter">{t.footer.brand}</span>
                <span data-field="footer.brandSub" className="font-bold text-xs text-[#414754] tracking-[0.4em] uppercase mt-1">{t.footer.brandSub}</span>
              </div>
              <p data-field="footer.desc" className="text-[#414754] leading-relaxed opacity-80">{t.footer.desc}</p>
            </Reveal>
            <Reveal variant="fade-up" delay={100} className="space-y-6">
              <h4 data-field="footer.contactTitle" className="font-extrabold text-lg text-[#1b1c1c] tracking-tight">{t.footer.contactTitle}</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden className="w-4 h-4 mt-1 text-[#0059bb] shrink-0" />
                  <div>
                    <span data-field="footer.addressLabel" className="block text-[10px] font-extrabold text-[#0059bb] uppercase tracking-[0.2em] mb-1">{t.footer.addressLabel}</span>
                    <span data-field="footer.address" className="text-[#414754] font-medium">{t.footer.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone aria-hidden className="w-4 h-4 mt-1 text-[#0059bb] shrink-0" />
                  <div>
                    <span data-field="footer.hotlineLabel" className="block text-[10px] font-extrabold text-[#0059bb] uppercase tracking-[0.2em] mb-1">{t.footer.hotlineLabel}</span>
                    <a data-track="call" data-field="footer.hotline" href={`tel:${t.footer.hotline.replace(/[^\d+]/g, '')}`} className="text-[#1b1c1c] font-extrabold text-xl tracking-tighter hover:text-[#0059bb] transition-colors">{t.footer.hotline}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock aria-hidden className="w-4 h-4 mt-1 text-[#0059bb] shrink-0" />
                  <div>
                    <span data-field="footer.hoursLabel" className="block text-[10px] font-extrabold text-[#0059bb] uppercase tracking-[0.2em] mb-1">{t.footer.hoursLabel}</span>
                    <span className="text-[#414754] font-medium">
                      <span data-field="footer.hoursLine1">{t.footer.hoursLine1}</span><br />
                      <span data-field="footer.hoursLine2">{t.footer.hoursLine2}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="fade-up" delay={200} className="space-y-6">
              <h4 data-field="footer.mapTitle" className="font-extrabold text-lg text-[#1b1c1c] tracking-tight">{t.footer.mapTitle}</h4>
              <div className="rounded-[2rem] overflow-hidden h-56 shadow-xl border border-[#c1c6d7]/10 relative">
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
                  <div className="w-full h-full bg-[#eae8e7] relative group">
                    <img className="w-full h-full object-cover grayscale contrast-125 opacity-40 group-hover:scale-110 transition-transform duration-1000" src={IMG.locationMap} alt="" loading="lazy" />
                    <div className="absolute inset-0 bg-[#0059bb]/5" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl ring-1 ring-black/5 text-center">
                        <p data-field="footer.mapBrand" className="font-extrabold text-sm text-[#1b1c1c] leading-none mb-1">{t.footer.mapBrand}</p>
                        <p data-field="footer.mapSub" className="text-[10px] text-[#0059bb] font-extrabold uppercase tracking-widest">{t.footer.mapSub}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal variant="fade" className="border-t border-[#c1c6d7]/10 py-8 bg-[#fbf9f8]/50">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p data-field="footer.copyright" className="font-bold text-[#414754] text-sm opacity-60">{t.footer.copyright}</p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
              <span data-field="footer.link1" className="text-[#414754] font-extrabold text-[10px] uppercase tracking-[0.3em]">{t.footer.link1}</span>
              <span data-field="footer.link2" className="text-[#414754] font-extrabold text-[10px] uppercase tracking-[0.3em]">{t.footer.link2}</span>
              <span data-field="footer.link3" className="text-[#414754] font-extrabold text-[10px] uppercase tracking-[0.3em]">{t.footer.link3}</span>
            </div>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}

/** Thẻ testimonial — tách riêng vì avatar tái sử dụng ảnh khách hàng theo index cố định. */
function TestimonialCard({ index, t, IMG }: { index: number; t: typeof import('./i18n/vi.json'); IMG: typeof DEFAULT_IMGS }) {
  const item = t.testimonials.items[index];
  const avatars = [IMG.avatarUser1, IMG.avatarUser2, IMG.avatarUser3, IMG.resultsMain];
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-[#c1c6d7]/10 shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="flex items-center gap-4 mb-6">
        <img className="w-14 h-14 rounded-full object-cover ring-4 ring-[#0059bb]/5" src={avatars[index]} alt="" loading="lazy" />
        <div>
          <p data-field={`testimonials.items.${index}.name`} className="font-extrabold text-[#1b1c1c] text-base">{item.name}</p>
          <p data-field={`testimonials.items.${index}.role`} className="text-[#0059bb] text-xs font-extrabold uppercase tracking-widest">{item.role}</p>
        </div>
      </div>
      <p data-field={`testimonials.items.${index}.quote`} className="text-[#414754] italic leading-relaxed opacity-90">&ldquo;{item.quote}&rdquo;</p>
    </div>
  );
}
