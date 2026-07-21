import { ChevronDown, ArrowRight, CheckCircle2, MapPin, Phone, Clock, CalendarCheck, Quote } from 'lucide-react';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroBg from './images/heroBg.jpg';
import imgDoctorPortrait from './images/doctorPortrait.jpg';
import imgImplantPrecision from './images/implantPrecision.jpg';
import imgConsultationRoom from './images/consultationRoom.jpg';
import imgLocationMap from './images/locationMap.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg: imgHeroBg,
  doctorPortrait: imgDoctorPortrait,
  implantPrecision: imgImplantPrecision,
  consultationRoom: imgConsultationRoom,
  locationMap: imgLocationMap,
};

/** Vòng tròn chữ cái đầu tên khách hàng — thay cho avatar ảnh vì mockup gốc không có ảnh chân dung bệnh nhân. */
function InitialAvatar({ name }: { name: string }) {
  const letter = name.trim().charAt(0).toUpperCase() || '?';
  return (
    <div className="w-12 h-12 shrink-0 rounded-full bg-[#0059bb]/10 text-[#0059bb] font-bold text-lg flex items-center justify-center">
      {letter}
    </div>
  );
}

export default function DentalClinic3({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased">

      {/* Navbar — KHÔNG bọc Reveal vì sticky (transform trên tổ tiên làm lệch gốc toạ độ) */}
      <header data-section="nav" className="sticky top-0 z-50 bg-[#fbf9f8]/90 backdrop-blur-md border-b border-[#c1c6d7]/30 shadow-sm">
        <nav className="flex justify-between items-center max-w-[1200px] mx-auto px-6 py-4">
          <a href="#hero" data-field="nav.brand" className="font-bold text-2xl text-[#0059bb] tracking-tight">{t.nav.brand}</a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" data-field="nav.home" className="text-sm font-bold text-[#0059bb] border-b-2 border-[#0059bb] pb-1">{t.nav.home}</a>
            <a href="#experts" data-field="nav.about" className="text-sm text-[#414754] hover:text-[#0059bb] transition-colors">{t.nav.about}</a>
            <div className="relative group">
              <button className="text-sm text-[#414754] hover:text-[#0059bb] transition-colors flex items-center gap-1">
                <span data-field="nav.services">{t.nav.services}</span>
                <ChevronDown aria-hidden className="w-3 h-3 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 pt-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white border border-[#c1c6d7]/30 shadow-lg py-2">
                  <a href="#services" data-field="nav.servicesSub1" className="block px-5 py-3 text-sm text-[#1b1c1c] hover:bg-[#f6f3f2] hover:text-[#0059bb] transition-colors">{t.nav.servicesSub1}</a>
                  <a href="#services" data-field="nav.servicesSub2" className="block px-5 py-3 text-sm text-[#1b1c1c] hover:bg-[#f6f3f2] hover:text-[#0059bb] transition-colors">{t.nav.servicesSub2}</a>
                  <a href="#services" data-field="nav.servicesSub3" className="block px-5 py-3 text-sm text-[#1b1c1c] hover:bg-[#f6f3f2] hover:text-[#0059bb] transition-colors">{t.nav.servicesSub3}</a>
                  <a href="#services" data-field="nav.servicesSub4" className="block px-5 py-3 text-sm text-[#1b1c1c] hover:bg-[#f6f3f2] hover:text-[#0059bb] transition-colors">{t.nav.servicesSub4}</a>
                </div>
              </div>
            </div>
            <a href="#pricing" data-field="nav.pricing" className="text-sm text-[#414754] hover:text-[#0059bb] transition-colors">{t.nav.pricing}</a>
            <a href="#services" data-field="nav.technology" className="text-sm text-[#414754] hover:text-[#0059bb] transition-colors">{t.nav.technology}</a>
            <a href="#testimonials" data-field="nav.testimonials" className="text-sm text-[#414754] hover:text-[#0059bb] transition-colors">{t.nav.testimonials}</a>
            <a href="#footer" data-field="nav.contact" className="text-sm text-[#414754] hover:text-[#0059bb] transition-colors">{t.nav.contact}</a>
          </div>
          <button data-track="booking" data-field="nav.cta" className="hidden sm:inline-flex bg-[#0059bb] text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#0070ea] transition-colors cursor-pointer">
            {t.nav.cta}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" id="hero" className="relative min-h-[85vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img src={IMG.heroBg} alt={t.hero.imageAlt} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbf9f8] via-[#fbf9f8]/50 to-transparent" />
          </div>
          <div className="relative z-10 px-6 max-w-[1200px] mx-auto w-full py-24">
            <div className="max-w-2xl">
              <Reveal as="span" data-field="hero.eyebrow" variant="fade-up" className="block text-sm font-bold text-[#0059bb] tracking-[0.3em] uppercase mb-4">{t.hero.eyebrow}</Reveal>
              <Reveal as="h1" variant="fade-up" delay={100} className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                <span data-field="hero.titleLine1">{t.hero.titleLine1}</span><br />
                <span data-field="hero.titleLine2">{t.hero.titleLine2}</span>
              </Reveal>
              <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={200} className="text-lg text-[#414754] mb-10 max-w-lg leading-relaxed">
                {t.hero.subtitle}
              </Reveal>
              <Reveal variant="fade-up" delay={300} className="flex flex-wrap gap-4">
                <button data-track="booking" data-field="hero.btnPrimary" className="bg-[#0059bb] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#0070ea] transition-colors cursor-pointer">
                  {t.hero.btnPrimary}
                </button>
                <a href="#experts" data-field="hero.btnSecondary" className="border border-[#717786] text-[#1b1c1c] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#f6f3f2] transition-colors">
                  {t.hero.btnSecondary}
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Experts */}
        <section data-section="experts" id="experts" className="py-20 md:py-[80px] bg-white overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <Reveal as="h2" data-field="experts.eyebrow" variant="fade-up" className="text-sm font-bold text-[#0059bb] tracking-[0.3em] uppercase mb-4">{t.experts.eyebrow}</Reveal>
              <Reveal as="h3" variant="fade-up" delay={100} className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                <span data-field="experts.title">{t.experts.title}</span><br />
                <span data-field="experts.titleLine2">{t.experts.titleLine2}</span>
              </Reveal>
              <Reveal variant="fade-up" delay={200} className="space-y-6">
                <p data-field="experts.desc" className="text-[#414754] leading-relaxed">{t.experts.desc}</p>
                <div className="pt-6 border-t border-[#c1c6d7]/30 grid grid-cols-2 gap-8">
                  <div>
                    <p data-field="experts.stat1Number" className="text-2xl font-bold text-[#0059bb]">{t.experts.stat1Number}</p>
                    <p data-field="experts.stat1Label" className="text-xs uppercase tracking-wider text-[#414754]">{t.experts.stat1Label}</p>
                  </div>
                  <div>
                    <p data-field="experts.stat2Number" className="text-2xl font-bold text-[#0059bb]">{t.experts.stat2Number}</p>
                    <p data-field="experts.stat2Label" className="text-xs uppercase tracking-wider text-[#414754]">{t.experts.stat2Label}</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal variant="blur-up" delay={150} duration={900} className="md:col-span-7 relative">
              <div className="aspect-[4/5] bg-[#f0eded] overflow-hidden">
                <img src={IMG.doctorPortrait} alt={t.experts.imageAlt} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#fbf9f8] p-8 shadow-xl max-w-xs border border-[#c1c6d7]/20 hidden lg:block">
                <Quote aria-hidden className="w-6 h-6 text-[#0059bb]/40 mb-3" />
                <p data-field="experts.quote" className="text-[#414754] italic mb-4">&ldquo;{t.experts.quote}&rdquo;</p>
                <p data-field="experts.quoteName" className="text-sm font-bold text-[#0059bb]">{t.experts.quoteName}</p>
                <p data-field="experts.quoteRole" className="text-xs text-[#414754] uppercase tracking-tight">{t.experts.quoteRole}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section data-section="services" id="services" className="bg-[#f6f3f2] py-20 md:py-[80px]">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal variant="fade-up" className="flex flex-col sm:flex-row justify-between sm:items-end mb-16 border-b border-[#c1c6d7] pb-8 gap-4">
              <div>
                <h2 data-field="services.eyebrow" className="text-sm font-bold text-[#0059bb] tracking-[0.3em] uppercase mb-4">{t.services.eyebrow}</h2>
                <h3 className="text-2xl md:text-3xl font-bold">{t.services.title}</h3>
              </div>
              <a href="#pricing" data-field="services.viewAllLabel" className="text-sm font-bold text-[#414754] hover:text-[#0059bb] transition-colors flex items-center gap-2 uppercase tracking-wider">
                {t.services.viewAllLabel}
                <ArrowRight aria-hidden className="w-4 h-4" />
              </a>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#c1c6d7]/30">
              {t.services.items.map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 100} className="bg-white p-10 md:p-12 group hover:bg-[#0059bb] transition-colors duration-500">
                  <h4 data-field={`services.items.${i}.title`} className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{item.title}</h4>
                  <p data-field={`services.items.${i}.desc`} className="text-[#414754] mb-8 group-hover:text-white/80 transition-colors">{item.desc}</p>
                  <div className="h-1 w-12 bg-[#0059bb] group-hover:bg-white group-hover:w-full transition-all duration-500" />
                </Reveal>
              ))}
            </div>
            <div className="mt-1 flex flex-col md:flex-row gap-px bg-[#c1c6d7]/30">
              <Reveal variant="zoom-in" className="md:w-1/2 overflow-hidden">
                <img src={IMG.implantPrecision} alt={t.services.precisionImageAlt} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 min-h-[280px]" loading="lazy" />
              </Reveal>
              <Reveal variant="fade-up" delay={150} className="md:w-1/2 bg-white p-10 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                  <span data-field="services.precisionTitle">{t.services.precisionTitle}</span><br />
                  <span data-field="services.precisionTitleLine2">{t.services.precisionTitleLine2}</span>
                </h3>
                <p data-field="services.precisionDesc" className="text-[#414754] mb-8 leading-relaxed">{t.services.precisionDesc}</p>
                <ul className="space-y-4">
                  {t.services.precisionPoints.map((point, i) => (
                    <li key={i} className="flex items-center gap-4 text-[#414754] text-sm font-bold">
                      <span className="w-1.5 h-1.5 bg-[#0059bb] rounded-full shrink-0" />
                      <span data-field={`services.precisionPoints.${i}`}>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section data-section="experience" id="experience" className="py-20 md:py-[80px] bg-white">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 relative z-10">
              <Reveal as="h2" data-field="experience.eyebrow" variant="fade-up" className="text-sm font-bold text-[#0059bb] tracking-[0.3em] uppercase mb-4">{t.experience.eyebrow}</Reveal>
              <Reveal as="h3" variant="fade-up" delay={100} className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                <span data-field="experience.title">{t.experience.title}</span><br />
                <span data-field="experience.titleLine2">{t.experience.titleLine2}</span>
              </Reveal>
              <Reveal as="p" data-field="experience.desc" variant="fade-up" delay={200} className="text-lg text-[#414754] mb-10 leading-relaxed">{t.experience.desc}</Reveal>
              <div className="space-y-8">
                {t.experience.steps.map((step, i) => (
                  <Reveal key={i} variant="fade-up" delay={300 + i * 100} className="flex gap-6 items-start">
                    <div className="text-4xl font-bold text-[#0059bb]/20 leading-none">{step.number}</div>
                    <div>
                      <h4 data-field={`experience.steps.${i}.title`} className="text-xl font-bold mb-2">{step.title}</h4>
                      <p data-field={`experience.steps.${i}.desc`} className="text-[#414754] leading-relaxed">{step.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal variant="blur-up" delay={150} duration={900} className="md:col-span-6 relative">
              <div className="aspect-square bg-[#f0eded] overflow-hidden translate-x-0 md:translate-x-8 -translate-y-0 md:-translate-y-8">
                <img src={IMG.consultationRoom} alt={t.experience.imageAlt} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="hidden md:block absolute inset-0 border-2 border-[#0059bb] -translate-x-4 translate-y-4 -z-10" />
            </Reveal>
          </div>
        </section>

        {/* Pricing */}
        <section data-section="pricing" id="pricing" className="py-20 md:py-[80px] bg-[#f6f3f2]">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal variant="fade-up" className="text-center mb-16">
              <h2 data-field="pricing.eyebrow" className="text-sm font-bold text-[#0059bb] tracking-[0.3em] uppercase mb-4">{t.pricing.eyebrow}</h2>
              <h3 className="text-2xl md:text-3xl font-bold">{t.pricing.title}</h3>
            </Reveal>
            <Reveal variant="fade-up" delay={100} className="max-w-4xl mx-auto bg-white border border-[#c1c6d7]/30 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0eded]">
                    <th data-field="pricing.colService" className="px-6 md:px-8 py-6 text-xs font-bold uppercase tracking-wider">{t.pricing.colService}</th>
                    <th data-field="pricing.colPrice" className="px-6 md:px-8 py-6 text-xs font-bold uppercase tracking-wider text-right">{t.pricing.colPrice}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c1c6d7]/30">
                  {t.pricing.items.map((item, i) => (
                    <tr key={i} className="hover:bg-[#fbf9f8] transition-colors">
                      <td className="px-6 md:px-8 py-6">
                        <p data-field={`pricing.items.${i}.name`} className="text-sm font-bold">{item.name}</p>
                        <p data-field={`pricing.items.${i}.desc`} className="text-xs text-[#414754] mt-1">{item.desc}</p>
                      </td>
                      <td data-field={`pricing.items.${i}.price`} className="px-6 md:px-8 py-6 text-right text-[#0059bb] font-bold whitespace-nowrap">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-8 bg-[#f0eded] text-center">
                <p data-field="pricing.note" className="text-xs text-[#414754] mb-4">{t.pricing.note}</p>
                <button data-track="booking" data-field="pricing.downloadLabel" className="text-[#0059bb] text-sm font-bold underline tracking-widest uppercase hover:opacity-70 transition-opacity cursor-pointer">{t.pricing.downloadLabel}</button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Testimonials — bổ sung vì mockup gốc không có section này */}
        <section data-section="testimonials" id="testimonials" className="py-20 md:py-[80px] bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal variant="fade-up" className="text-center mb-16 max-w-2xl mx-auto">
              <h2 data-field="testimonials.eyebrow" className="text-sm font-bold text-[#0059bb] tracking-[0.3em] uppercase mb-4">{t.testimonials.eyebrow}</h2>
              <h3 className="text-2xl md:text-3xl font-bold">{t.testimonials.title}</h3>
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-4 space-y-6">
                {[0, 1].map(i => <TestimonialCard key={i} index={i} t={t} delay={i * 100} />)}
              </div>
              <Reveal variant="zoom-in" delay={150} duration={900} className="lg:col-span-4 relative">
                <div className="relative aspect-[3/4] overflow-hidden border border-[#c1c6d7]/30">
                  <img src={IMG.doctorPortrait} alt={t.testimonials.centerImageAlt} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0059bb]/70 via-transparent to-transparent flex items-end p-8">
                    <p data-field="testimonials.centerCaption" className="text-white font-bold text-lg leading-tight">{t.testimonials.centerCaption}</p>
                  </div>
                </div>
              </Reveal>
              <div className="lg:col-span-4 space-y-6">
                {[2, 3].map(i => <TestimonialCard key={i} index={i} t={t} delay={(i - 2) * 100} />)}
              </div>
            </div>
            <Reveal variant="fade-up" delay={200} className="mt-16 flex justify-center">
              <button data-track="booking" data-field="testimonials.ctaLabel" className="bg-[#0059bb] text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#0070ea] transition-colors cursor-pointer">
                {t.testimonials.ctaLabel}
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" id="footer" className="bg-[#f6f3f2] border-t border-[#c1c6d7]/50">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 pt-20 pb-16">
          <Reveal variant="fade-up">
            <h4 data-field="footer.brand" className="text-2xl font-bold text-[#0059bb] mb-8">{t.footer.brand}</h4>
            <p data-field="footer.desc" className="text-[#414754] mb-8 max-w-sm leading-relaxed">{t.footer.desc}</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone aria-hidden className="w-4 h-4 mt-1 text-[#0059bb] shrink-0" />
                <div>
                  <span data-field="footer.hotlineLabel" className="block text-[10px] uppercase tracking-widest text-[#414754] mb-1">{t.footer.hotlineLabel}</span>
                  <a data-track="call" data-field="footer.hotline" href={`tel:${t.footer.hotline.replace(/[^\d+]/g, '')}`} className="text-[#0059bb] font-bold text-lg hover:opacity-70 transition-opacity">{t.footer.hotline}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin aria-hidden className="w-4 h-4 mt-1 text-[#0059bb] shrink-0" />
                <div>
                  <span data-field="footer.addressLabel" className="block text-[10px] uppercase tracking-widest text-[#414754] mb-1">{t.footer.addressLabel}</span>
                  <span data-field="footer.address" className="text-[#1b1c1c]">{t.footer.address}</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal variant="fade-up" delay={100} className="grid grid-cols-2 gap-8">
            <div>
              <h5 data-field="footer.linksTitle" className="text-sm font-bold uppercase mb-6">{t.footer.linksTitle}</h5>
              <ul className="space-y-4 text-sm">
                <li><span data-field="footer.link1" className="text-[#414754] hover:text-[#0059bb] transition-colors cursor-pointer">{t.footer.link1}</span></li>
                <li><span data-field="footer.link2" className="text-[#414754] hover:text-[#0059bb] transition-colors cursor-pointer">{t.footer.link2}</span></li>
                <li><span data-field="footer.link3" className="text-[#414754] hover:text-[#0059bb] transition-colors cursor-pointer">{t.footer.link3}</span></li>
                <li><span data-field="footer.link4" className="text-[#414754] hover:text-[#0059bb] transition-colors cursor-pointer">{t.footer.link4}</span></li>
              </ul>
            </div>
            <div>
              <h5 data-field="footer.hoursTitle" className="text-sm font-bold uppercase mb-6">{t.footer.hoursTitle}</h5>
              <ul className="space-y-2 text-sm text-[#414754]">
                <li className="flex items-start gap-2">
                  <Clock aria-hidden className="w-4 h-4 mt-0.5 text-[#0059bb] shrink-0" />
                  <span>
                    <span data-field="footer.hoursLine1">{t.footer.hoursLine1}</span><br />
                    <span data-field="footer.hoursLine2">{t.footer.hoursLine2}</span>
                  </span>
                </li>
                <li data-field="footer.hoursNote" className="pt-4 text-[#0059bb] italic font-bold text-xs">{t.footer.hoursNote}</li>
              </ul>
            </div>
          </Reveal>
          <Reveal variant="zoom-in" delay={200} duration={800} className="h-64 md:h-full min-h-[280px]">
            {t.footer.mapUrl ? (
              <iframe
                src={toGoogleMapsEmbedUrl(t.footer.mapUrl)}
                className="w-full h-full border border-[#c1c6d7]/30"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            ) : (
              <div className="w-full h-full border border-[#c1c6d7]/30 relative group overflow-hidden">
                <img src={IMG.locationMap} alt="" className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-[#0059bb]/10" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-white/95 px-5 py-4 shadow-xl text-center">
                    <p data-field="footer.mapBrand" className="font-bold text-sm leading-none mb-1">{t.footer.mapBrand}</p>
                    <p data-field="footer.mapSub" className="text-[10px] text-[#0059bb] font-bold uppercase tracking-widest">{t.footer.mapSub}</p>
                  </div>
                </div>
              </div>
            )}
          </Reveal>
        </div>
        <div className="border-t border-[#c1c6d7]/30 py-8">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p data-field="footer.copyright" className="text-xs text-[#414754]">{t.footer.copyright}</p>
            <div className="flex gap-8">
              <span data-field="footer.social1" className="text-xs text-[#414754] hover:text-[#0059bb] transition-colors cursor-pointer">{t.footer.social1}</span>
              <span data-field="footer.social2" className="text-xs text-[#414754] hover:text-[#0059bb] transition-colors cursor-pointer">{t.footer.social2}</span>
              <span data-field="footer.social3" className="text-xs text-[#414754] hover:text-[#0059bb] transition-colors cursor-pointer">{t.footer.social3}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA — KHÔNG bọc Reveal vì fixed */}
      <button data-track="booking" aria-label="Đặt lịch khám" className="fixed bottom-6 right-6 bg-[#0059bb] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40 md:hidden cursor-pointer">
        <CalendarCheck aria-hidden className="w-6 h-6" />
      </button>
    </div>
  );
}

function TestimonialCard({ index, t, delay }: { index: number; t: typeof import('./i18n/vi.json'); delay?: number }) {
  const item = t.testimonials.items[index];
  return (
    <Reveal variant="fade-up" delay={delay} className="bg-white p-8 border border-[#c1c6d7]/30 hover:border-[#0059bb]/40 hover:shadow-lg transition-all duration-500">
      <div className="flex items-center gap-4 mb-5">
        <InitialAvatar name={item.name} />
        <div>
          <p data-field={`testimonials.items.${index}.name`} className="font-bold text-[#1b1c1c] text-sm">{item.name}</p>
          <p data-field={`testimonials.items.${index}.role`} className="text-[#0059bb] text-xs font-bold uppercase tracking-widest">{item.role}</p>
        </div>
      </div>
      <p data-field={`testimonials.items.${index}.quote`} className="text-[#414754] italic leading-relaxed text-sm">&ldquo;{item.quote}&rdquo;</p>
    </Reveal>
  );
}
