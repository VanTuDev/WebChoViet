import { MapPin, Phone, Mail, Clock, Star, ChevronRight } from 'lucide-react';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroReception from './images/heroReception.jpg';
import imgTechEquipment from './images/techEquipment.jpg';
import imgAvatarHoangNam from './images/avatarHoangNam.jpg';
import imgTransformationResult from './images/transformationResult.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroReception: imgHeroReception,
  techEquipment: imgTechEquipment,
  avatarHoangNam: imgAvatarHoangNam,
  transformationResult: imgTransformationResult,
};

const TESTIMONIAL_INITIAL_BG = ['bg-[#007BFF]', 'bg-[#333333]', 'bg-[#0066d6]'];

export default function DentalClinic2({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };
  const telHref = `tel:${t.footer.hotline.replace(/[^\d+]/g, '')}`;

  return (
    <div className="bg-white text-[#333333] font-sans antialiased pb-20 lg:pb-0">

      {/* Navbar */}
      <header data-section="nav" className="bg-white/90 backdrop-blur-md border-b border-[#DCE9FA] sticky top-0 z-50 shadow-sm">
        <nav className="flex justify-between items-center px-6 md:px-8 py-4 max-w-[1200px] mx-auto w-full">
          <span data-field="nav.brand" className="font-lexend text-xl md:text-2xl font-extrabold text-[#007BFF] tracking-tight">{t.nav.brand}</span>
          <div className="hidden lg:flex gap-8 items-center">
            <a className="text-sm font-bold text-[#007BFF] border-b-2 border-[#007BFF] py-1" href="#hero" data-field="nav.home">{t.nav.home}</a>
            <a className="text-sm font-semibold text-[#666666] hover:text-[#007BFF] transition-colors" href="#technology" data-field="nav.link1">{t.nav.link1}</a>
            <a className="text-sm font-semibold text-[#666666] hover:text-[#007BFF] transition-colors" href="#services" data-field="nav.link2">{t.nav.link2}</a>
            <a className="text-sm font-semibold text-[#666666] hover:text-[#007BFF] transition-colors" href="#testimonials" data-field="nav.link3">{t.nav.link3}</a>
            <a className="text-sm font-semibold text-[#666666] hover:text-[#007BFF] transition-colors" href="#footer" data-field="nav.link4">{t.nav.link4}</a>
          </div>
          <button data-track="booking" data-field="nav.cta" className="bg-[#007BFF] text-white font-bold text-sm px-6 py-2.5 rounded-[0.5rem] shadow-[0_4px_20px_rgba(0,123,255,0.25)] hover:bg-[#0066d6] active:scale-95 transition-all cursor-pointer">
            {t.nav.cta}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" id="hero" className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#F8F9FA]">
          <Reveal variant="blur-up" duration={900} className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src={IMG.heroReception} alt={t.hero.imageAlt} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20" />
          </Reveal>
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10 w-full">
            <div className="max-w-2xl space-y-8">
              <Reveal as="div" data-field="hero.badge" variant="fade-up" className="inline-block py-1 border-b-2 border-[#007BFF] text-[#007BFF] font-bold text-sm tracking-[0.2em] uppercase">
                {t.hero.badge}
              </Reveal>
              <Reveal as="h1" variant="fade-up" delay={100} className="font-lexend text-4xl md:text-6xl font-extrabold text-[#333333] leading-tight">
                <span data-field="hero.titleLine1">{t.hero.titleLine1}</span><br />
                <span data-field="hero.titleLine2" className="text-[#007BFF]">{t.hero.titleLine2}</span>
              </Reveal>
              <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={200} className="text-lg text-[#666666] leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </Reveal>
              <Reveal variant="fade-up" delay={300} className="flex flex-col sm:flex-row gap-4 pt-2">
                <button data-track="booking" data-field="hero.btnPrimary" className="bg-[#007BFF] text-white font-bold px-10 py-4 rounded-[0.5rem] shadow-[0_12px_30px_rgba(0,123,255,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer">
                  {t.hero.btnPrimary}
                </button>
                <a href="#services" data-field="hero.btnSecondary" className="bg-white text-[#333333] font-bold px-10 py-4 rounded-[0.5rem] border border-[#DCE9FA] hover:bg-[#F0F7FF] transition-all text-center">
                  {t.hero.btnSecondary}
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section data-section="technology" id="technology" className="py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7">
                <Reveal variant="zoom-in" duration={800} className="relative rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,123,255,0.12)]">
                  <img className="w-full aspect-[4/3] object-cover" src={IMG.techEquipment} alt={t.technology.imageAlt} loading="lazy" />
                </Reveal>
              </div>
              <div className="lg:col-span-5 space-y-8">
                <Reveal as="p" data-field="technology.eyebrow" variant="fade-up" className="text-[#007BFF] font-bold tracking-[0.2em] uppercase text-sm">{t.technology.eyebrow}</Reveal>
                <Reveal as="h2" data-field="technology.title" variant="fade-up" delay={100} className="font-lexend text-3xl md:text-4xl font-bold leading-tight text-[#333333]">{t.technology.title}</Reveal>
                <div className="space-y-6">
                  {t.technology.items.map((item, i) => (
                    <Reveal key={i} as="div" variant="fade-up" delay={i * 100} className={`border-l-4 pl-6 ${i === 0 ? 'border-[#007BFF]' : 'border-[#DCE9FA]'}`}>
                      <h3 data-field={`technology.items.${i}.title`} className="font-bold text-xl text-[#333333] mb-2">{item.title}</h3>
                      <p data-field={`technology.items.${i}.desc`} className="text-[#666666] leading-relaxed">{item.desc}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Pricing */}
        <section data-section="services" id="services" className="py-16 md:py-20 bg-[#F0F7FF]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <Reveal as="div" variant="fade-up" className="max-w-2xl">
                <p data-field="services.eyebrow" className="text-[#007BFF] font-bold tracking-[0.2em] uppercase text-sm mb-4">{t.services.eyebrow}</p>
                <h2 data-field="services.title" className="font-lexend text-3xl md:text-4xl font-bold text-[#333333]">{t.services.title}</h2>
              </Reveal>
              <Reveal variant="fade-up" delay={100} className="flex gap-3">
                <span data-field="services.tab1" className="px-6 py-2 bg-white border border-[#DCE9FA] rounded-full font-bold text-sm text-[#666666]">{t.services.tab1}</span>
                <span data-field="services.tab2" className="px-6 py-2 bg-[#007BFF] text-white rounded-full font-bold text-sm">{t.services.tab2}</span>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {t.services.groups.map((group, gi) => (
                <Reveal key={gi} as="div" variant="fade-up" delay={gi * 150} className="space-y-8">
                  <div className="pb-4 border-b border-[#DCE9FA]">
                    <h3 data-field={`services.groups.${gi}.title`} className="font-lexend font-bold text-xl text-[#007BFF]">{group.title}</h3>
                  </div>
                  <div className="space-y-8">
                    {group.items.map((item, ii) => (
                      <Reveal key={ii} as="div" variant="fade-up" delay={ii * 80} className="flex justify-between items-start gap-6 group">
                        <div className="flex-1">
                          <p data-field={`services.groups.${gi}.items.${ii}.name`} className="font-bold text-lg text-[#333333] mb-1 group-hover:text-[#007BFF] transition-colors">{item.name}</p>
                          <p data-field={`services.groups.${gi}.items.${ii}.desc`} className="text-sm text-[#666666]">{item.desc}</p>
                        </div>
                        <span data-field={`services.groups.${gi}.items.${ii}.price`} className="font-extrabold text-xl text-[#007BFF] whitespace-nowrap">{item.price}</span>
                      </Reveal>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Testimonials */}
        <section data-section="testimonials" id="testimonials" className="py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-20">
              <div className="lg:col-span-5 order-2 lg:order-1 space-y-12">
                <Reveal as="div" variant="fade-up">
                  <p data-field="testimonials.eyebrow" className="text-[#007BFF] font-bold tracking-[0.2em] uppercase text-sm mb-4">{t.testimonials.eyebrow}</p>
                  <h2 data-field="testimonials.title" className="font-lexend text-3xl md:text-4xl font-bold text-[#333333] leading-tight">{t.testimonials.title}</h2>
                </Reveal>

                <Reveal as="div" variant="fade-up" delay={100} className="bg-[#F8F9FA] p-8 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,123,255,0.08)] border border-[#DCE9FA]">
                  <div className="flex gap-1 mb-4" aria-hidden>
                    {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="w-4 h-4 fill-[#007BFF] text-[#007BFF]" />)}
                  </div>
                  <p data-field="testimonials.items.0.quote" className="text-[#666666] italic text-lg mb-8 leading-relaxed">&ldquo;{t.testimonials.items[0].quote}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#007BFF] shrink-0">
                      <img className="w-full h-full object-cover" src={IMG.avatarHoangNam} alt="" loading="lazy" />
                    </div>
                    <div>
                      <p data-field="testimonials.items.0.name" className="font-bold text-[#333333] text-lg">{t.testimonials.items[0].name}</p>
                      <p data-field="testimonials.items.0.role" className="text-[#007BFF] text-sm font-bold">{t.testimonials.items[0].role}</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal as="div" variant="fade-up" delay={200} className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <p data-field="testimonials.stat1Number" className="font-lexend text-[#007BFF] text-4xl font-extrabold mb-2">{t.testimonials.stat1Number}</p>
                    <p data-field="testimonials.stat1Label" className="text-[#666666] font-bold text-sm uppercase tracking-wide">{t.testimonials.stat1Label}</p>
                  </div>
                  <div>
                    <p data-field="testimonials.stat2Number" className="font-lexend text-[#007BFF] text-4xl font-extrabold mb-2">{t.testimonials.stat2Number}</p>
                    <p data-field="testimonials.stat2Label" className="text-[#666666] font-bold text-sm uppercase tracking-wide">{t.testimonials.stat2Label}</p>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-6 items-center">
                  <Reveal variant="zoom-in" delay={150} duration={800} className="space-y-6">
                    <div className="rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,123,255,0.15)] transform translate-y-12">
                      <img className="w-full aspect-[3/4] object-cover" src={IMG.transformationResult} alt={t.testimonials.transformationImageAlt} loading="lazy" />
                    </div>
                  </Reveal>
                  <Reveal variant="zoom-in" delay={250} duration={800} className="space-y-6">
                    <div className="rounded-[1.5rem] overflow-hidden shadow-[0_12px_30px_rgba(0,123,255,0.15)]">
                      <img className="w-full aspect-square object-cover" src={IMG.avatarHoangNam} alt={t.testimonials.trustImageAlt} loading="lazy" />
                    </div>
                    <div className="bg-[#007BFF] p-8 rounded-[1.5rem] text-white">
                      <p data-field="testimonials.highlightTitle" className="font-bold text-2xl mb-2 leading-tight">{t.testimonials.highlightTitle}</p>
                      <p data-field="testimonials.highlightDesc" className="opacity-90 text-sm">{t.testimonials.highlightDesc}</p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            {/* Additional testimonial cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.testimonials.items.slice(1).map((item, idx) => (
                <Reveal key={idx} as="div" variant="fade-up" delay={idx * 100} className="bg-white p-8 rounded-[1.5rem] border border-[#DCE9FA] shadow-[0_4px_20px_rgba(0,123,255,0.06)] hover:shadow-[0_12px_30px_rgba(0,123,255,0.12)] transition-all">
                  <div className="flex gap-1 mb-4" aria-hidden>
                    {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="w-4 h-4 fill-[#007BFF] text-[#007BFF]" />)}
                  </div>
                  <p data-field={`testimonials.items.${idx + 1}.quote`} className="text-[#666666] italic leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${TESTIMONIAL_INITIAL_BG[idx % TESTIMONIAL_INITIAL_BG.length]} text-white font-bold flex items-center justify-center shrink-0`} aria-hidden>
                      {item.name.replace(/^(Mr\.|Ms\.)\s*/, '').charAt(0)}
                    </div>
                    <div>
                      <p data-field={`testimonials.items.${idx + 1}.name`} className="font-bold text-[#333333]">{item.name}</p>
                      <p data-field={`testimonials.items.${idx + 1}.role`} className="text-[#007BFF] text-xs font-bold uppercase tracking-wide">{item.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" id="footer" className="bg-[#F8F9FA] border-t border-[#DCE9FA]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-16">
            <div className="lg:col-span-5 space-y-8">
              <Reveal as="div" variant="fade-up">
                <p data-field="footer.eyebrow" className="text-[#007BFF] font-bold tracking-[0.2em] uppercase text-sm mb-4">{t.footer.eyebrow}</p>
                <h2 data-field="footer.title" className="font-lexend text-3xl md:text-4xl font-bold text-[#333333]">{t.footer.title}</h2>
              </Reveal>
              <Reveal as="div" variant="fade-up" delay={100} className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden className="w-5 h-5 mt-1 text-[#007BFF] shrink-0" />
                  <div>
                    <span data-field="footer.addressLabel" className="block text-[#007BFF] font-bold text-xs uppercase tracking-widest mb-1">{t.footer.addressLabel}</span>
                    <span data-field="footer.address" className="text-[#333333]">{t.footer.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone aria-hidden className="w-5 h-5 mt-1 text-[#007BFF] shrink-0" />
                  <div>
                    <span data-field="footer.hotlineLabel" className="block text-[#007BFF] font-bold text-xs uppercase tracking-widest mb-1">{t.footer.hotlineLabel}</span>
                    <a data-track="call" data-field="footer.hotline" href={telHref} className="text-[#333333] font-bold text-2xl hover:text-[#007BFF] transition-colors">{t.footer.hotline}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail aria-hidden className="w-5 h-5 mt-1 text-[#007BFF] shrink-0" />
                  <div>
                    <span data-field="footer.emailLabel" className="block text-[#007BFF] font-bold text-xs uppercase tracking-widest mb-1">{t.footer.emailLabel}</span>
                    <span data-field="footer.email" className="text-[#333333]">{t.footer.email}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock aria-hidden className="w-5 h-5 mt-1 text-[#007BFF] shrink-0" />
                  <div>
                    <span data-field="footer.hoursLabel" className="block text-[#007BFF] font-bold text-xs uppercase tracking-widest mb-1">{t.footer.hoursLabel}</span>
                    <span className="text-[#333333] block">
                      <span data-field="footer.hoursLine1">{t.footer.hoursLine1}</span><br />
                      <span data-field="footer.hoursLine2">{t.footer.hoursLine2}</span>
                    </span>
                  </div>
                </div>
              </Reveal>
              <Reveal as="div" variant="fade-up" delay={200}>
                <button data-track="booking" data-field="footer.ctaLabel" className="bg-[#007BFF] text-white font-bold px-10 py-4 rounded-[0.5rem] shadow-[0_12px_30px_rgba(0,123,255,0.3)] hover:-translate-y-0.5 transition-all w-full sm:w-auto cursor-pointer">
                  {t.footer.ctaLabel}
                </button>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <h3 data-field="footer.mapTitle" className="font-bold text-lg text-[#333333] mb-4">{t.footer.mapTitle}</h3>
              <Reveal variant="zoom-in" duration={800} className="rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,123,255,0.12)] border border-[#DCE9FA] h-[380px] relative">
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
                  <div className="w-full h-full bg-[#F0F7FF] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,_#DCE9FA_1px,_transparent_1px)] [background-size:20px_20px] opacity-60" />
                    <div className="bg-white/95 backdrop-blur-md px-6 py-5 rounded-[1rem] shadow-xl ring-1 ring-[#DCE9FA] text-center relative z-10">
                      <MapPin className="w-6 h-6 text-[#007BFF] mx-auto mb-2" aria-hidden />
                      <p data-field="footer.mapBrand" className="font-extrabold text-sm text-[#333333] leading-none mb-1">{t.footer.mapBrand}</p>
                      <p data-field="footer.mapSub" className="text-[10px] text-[#007BFF] font-extrabold uppercase tracking-widest">{t.footer.mapSub}</p>
                    </div>
                  </div>
                )}
              </Reveal>
            </div>
          </div>

          <Reveal as="div" variant="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-[#DCE9FA]">
            <div className="space-y-4">
              <div data-field="footer.brand" className="font-lexend text-xl font-extrabold text-[#007BFF]">{t.footer.brand}</div>
              <p data-field="footer.desc" className="text-[#666666] leading-relaxed max-w-md">{t.footer.desc}</p>
            </div>
            <div className="space-y-4">
              <h4 data-field="footer.navTitle" className="font-bold text-[#333333]">{t.footer.navTitle}</h4>
              <nav className="flex flex-col gap-3">
                <a className="text-[#666666] hover:text-[#007BFF] transition-colors text-sm flex items-center gap-1" href="#hero" data-field="footer.navLink1"><ChevronRight aria-hidden className="w-3.5 h-3.5" />{t.footer.navLink1}</a>
                <a className="text-[#666666] hover:text-[#007BFF] transition-colors text-sm flex items-center gap-1" href="#technology" data-field="footer.navLink2"><ChevronRight aria-hidden className="w-3.5 h-3.5" />{t.footer.navLink2}</a>
                <a className="text-[#666666] hover:text-[#007BFF] transition-colors text-sm flex items-center gap-1" href="#services" data-field="footer.navLink3"><ChevronRight aria-hidden className="w-3.5 h-3.5" />{t.footer.navLink3}</a>
                <a className="text-[#666666] hover:text-[#007BFF] transition-colors text-sm flex items-center gap-1" href="#testimonials" data-field="footer.navLink4"><ChevronRight aria-hidden className="w-3.5 h-3.5" />{t.footer.navLink4}</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 data-field="footer.legalTitle" className="font-bold text-[#333333]">{t.footer.legalTitle}</h4>
              <nav className="flex flex-col gap-3">
                <span className="text-[#666666] text-sm" data-field="footer.legalLink1">{t.footer.legalLink1}</span>
                <span className="text-[#666666] text-sm" data-field="footer.legalLink2">{t.footer.legalLink2}</span>
                <span className="text-[#666666] text-sm" data-field="footer.legalLink3">{t.footer.legalLink3}</span>
              </nav>
            </div>
          </Reveal>
        </div>
        <div className="border-t border-[#DCE9FA] py-6 bg-white">
          <p data-field="footer.copyright" className="text-center text-[#666666] text-sm">{t.footer.copyright}</p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 backdrop-blur-md border-t border-[#DCE9FA]">
        <button data-track="booking" data-field="nav.cta" className="w-full bg-[#007BFF] text-white font-bold py-3.5 rounded-[0.5rem] shadow-[0_12px_30px_rgba(0,123,255,0.3)] cursor-pointer">
          {t.nav.cta}
        </button>
      </div>
    </div>
  );
}
