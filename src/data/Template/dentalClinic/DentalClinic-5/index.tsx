import { Star, MapPin, Phone, Mail, Facebook, Youtube, Instagram, CalendarCheck, ArrowRight } from 'lucide-react';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroDoctorPortrait from './images/heroDoctorPortrait.jpg';
import imgServiceImplant from './images/serviceImplant.jpg';
import imgServiceGeneralLifestyle from './images/serviceGeneralLifestyle.jpg';
import imgAvatarMinhHoang from './images/avatarMinhHoang.jpg';
import imgAvatarLanPhuong from './images/avatarLanPhuong.jpg';
import imgAvatarThuVan from './images/avatarThuVan.jpg';
import imgLocationMap from './images/locationMap.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroDoctorPortrait: imgHeroDoctorPortrait,
  serviceImplant: imgServiceImplant,
  serviceGeneralLifestyle: imgServiceGeneralLifestyle,
  avatarMinhHoang: imgAvatarMinhHoang,
  avatarLanPhuong: imgAvatarLanPhuong,
  avatarThuVan: imgAvatarThuVan,
  locationMap: imgLocationMap,
};

const TESTIMONIAL_AVATARS = [imgAvatarMinhHoang, imgAvatarLanPhuong, imgAvatarThuVan];

const PRIMARY = '#05664F';
const PRIMARY_LIGHT = '#088A6A';

export default function DentalClinic5({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] font-sans antialiased">

      {/* Navbar */}
      <header data-section="nav" className="sticky top-0 w-full z-50 bg-[#fbf9f8]/90 backdrop-blur-md border-b border-[#c1c6d7]/30 shadow-sm">
        <nav className="flex justify-between items-center max-w-[1200px] mx-auto px-6 py-4">
          <span data-field="nav.brand" className="font-extrabold text-2xl tracking-tight" style={{ color: PRIMARY }}>{t.nav.brand}</span>
          <div className="hidden md:flex gap-8 text-sm font-semibold">
            <a href="#hero" className="border-b-2 pb-0.5 transition-colors" style={{ color: PRIMARY, borderColor: PRIMARY }} data-field="nav.home">{t.nav.home}</a>
            <a href="#services" className="text-[#414754] hover:opacity-70 transition-colors" data-field="nav.link1">{t.nav.link1}</a>
            <a href="#pricing" className="text-[#414754] hover:opacity-70 transition-colors" data-field="nav.link2">{t.nav.link2}</a>
            <a href="#testimonials" className="text-[#414754] hover:opacity-70 transition-colors" data-field="nav.link3">{t.nav.link3}</a>
            <a href="#footer" className="text-[#414754] hover:opacity-70 transition-colors" data-field="nav.link4">{t.nav.link4}</a>
          </div>
          <button
            data-track="booking"
            data-field="nav.cta"
            className="text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all active:opacity-80 cursor-pointer"
            style={{ backgroundColor: PRIMARY }}
          >
            {t.nav.cta}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" id="hero" className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 space-y-8 z-10">
              <Reveal as="span" variant="fade-up" data-field="hero.eyebrow" className="font-bold tracking-widest uppercase text-xs" style={{ color: PRIMARY }}>{t.hero.eyebrow}</Reveal>
              <Reveal as="h1" variant="fade-up" delay={100} className="font-extrabold text-4xl md:text-5xl lg:text-[52px] leading-tight tracking-tight">
                <span data-field="hero.titleLine1">{t.hero.titleLine1}</span><br />
                <span data-field="hero.titleLine2" style={{ color: PRIMARY }}>{t.hero.titleLine2}</span><br />
                <span data-field="hero.titleLine3">{t.hero.titleLine3}</span>
              </Reveal>
              <Reveal as="p" variant="fade-up" delay={200} data-field="hero.subtitle" className="text-[#414754] text-lg max-w-md leading-relaxed">
                {t.hero.subtitle}
              </Reveal>
              <Reveal variant="fade-up" delay={300} className="flex flex-wrap gap-4">
                <button
                  data-track="booking"
                  data-field="hero.btnPrimary"
                  className="text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {t.hero.btnPrimary}
                </button>
                <button
                  data-track="booking"
                  data-field="hero.btnSecondary"
                  className="border px-8 py-4 rounded-full font-semibold hover:bg-black/[0.02] transition-all cursor-pointer"
                  style={{ borderColor: PRIMARY, color: PRIMARY }}
                >
                  {t.hero.btnSecondary}
                </button>
              </Reveal>
            </div>
            <Reveal variant="blur-up" delay={200} duration={900} className="md:col-span-6 relative">
              <div
                className="overflow-hidden w-full aspect-square shadow-[0px_4px_20px_rgba(5,102,79,0.08)]"
                style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
              >
                <img className="w-full h-full object-cover" src={IMG.heroDoctorPortrait} alt={t.hero.imageAlt} loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-2xl" style={{ backgroundColor: `${PRIMARY}1a` }} />
            </Reveal>
          </div>
        </section>

        {/* Stats / Trust banner */}
        <section data-section="stats" className="bg-[#f6f3f2] py-12">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {t.stats.items.map((s, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 100}>
                  <div data-field={`stats.items.${i}.number`} className="font-extrabold text-3xl md:text-4xl" style={{ color: PRIMARY }}>{s.number}</div>
                  <div data-field={`stats.items.${i}.label`} className="text-[#414754] text-xs uppercase tracking-wider mt-1">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Services: Bento grid */}
        <section data-section="services" id="services" className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
              <Reveal variant="fade-up" className="max-w-xl">
                <h2 data-field="services.eyebrow" className="font-bold text-2xl md:text-3xl mb-4">{t.services.eyebrow}</h2>
                <p data-field="services.title" className="text-[#414754]">{t.services.title}</p>
              </Reveal>
              <Reveal variant="fade-up" delay={100}>
                <a href="#pricing" className="font-bold border-b pb-1 inline-flex items-center gap-1" style={{ color: PRIMARY, borderColor: PRIMARY }} data-field="services.viewAll">
                  {t.services.viewAll}
                </a>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Large, image left */}
              <Reveal variant="fade-up" className="md:col-span-2 bg-[#fbf9f8] p-8 md:p-10 rounded-3xl shadow-[0px_4px_20px_rgba(5,102,79,0.08)] group border border-[#c1c6d7]/10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-4">
                    <h3 data-field="services.items.0.title" className="font-bold text-2xl" style={{ color: PRIMARY }}>{t.services.items[0].title}</h3>
                    <p data-field="services.items.0.desc" className="text-[#414754]">{t.services.items[0].desc}</p>
                    <span className="inline-flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform" style={{ color: PRIMARY }} data-field="services.learnMore">
                      {t.services.learnMore} <ArrowRight aria-hidden className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden">
                    <img className="w-full h-full object-cover" src={IMG.serviceImplant} alt={t.services.items[0].imageAlt} loading="lazy" />
                  </div>
                </div>
              </Reveal>
              {/* Card 2 */}
              <Reveal variant="fade-up" delay={100} className="bg-[#f6f3f2] p-8 rounded-3xl border border-[#c1c6d7]/10 hover:bg-white hover:shadow-[0px_4px_20px_rgba(5,102,79,0.08)] transition-all group">
                <div className="h-16 w-16 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_LIGHT} 100%)` }}>
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <h3 data-field="services.items.1.title" className="font-bold text-xl mb-3" style={{ color: PRIMARY }}>{t.services.items[1].title}</h3>
                <p data-field="services.items.1.desc" className="text-[#414754] mb-6">{t.services.items[1].desc}</p>
                <span className="font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: PRIMARY }} data-field="services.learnMore">
                  {t.services.learnMore} <ArrowRight aria-hidden className="w-4 h-4" />
                </span>
              </Reveal>
              {/* Card 3 */}
              <Reveal variant="fade-up" delay={200} className="bg-[#f6f3f2] p-8 rounded-3xl border border-[#c1c6d7]/10 hover:bg-white hover:shadow-[0px_4px_20px_rgba(5,102,79,0.08)] transition-all group">
                <div className="h-16 w-16 rounded-2xl mb-6 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_LIGHT} 100%)` }}>
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <h3 data-field="services.items.2.title" className="font-bold text-xl mb-3" style={{ color: PRIMARY }}>{t.services.items[2].title}</h3>
                <p data-field="services.items.2.desc" className="text-[#414754] mb-6">{t.services.items[2].desc}</p>
                <span className="font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: PRIMARY }} data-field="services.learnMore">
                  {t.services.learnMore} <ArrowRight aria-hidden className="w-4 h-4" />
                </span>
              </Reveal>
              {/* Card 4: Long, image left */}
              <Reveal variant="fade-up" delay={300} className="md:col-span-2 bg-[#fbf9f8] p-8 rounded-3xl border border-[#c1c6d7]/10 hover:bg-white hover:shadow-[0px_4px_20px_rgba(5,102,79,0.08)] transition-all flex flex-col md:flex-row gap-8 items-center group">
                <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden">
                  <img className="w-full h-full object-cover" src={IMG.serviceGeneralLifestyle} alt={t.services.items[3].imageAlt} loading="lazy" />
                </div>
                <div className="flex-1">
                  <h3 data-field="services.items.3.title" className="font-bold text-xl mb-3" style={{ color: PRIMARY }}>{t.services.items[3].title}</h3>
                  <p data-field="services.items.3.desc" className="text-[#414754] mb-4">{t.services.items[3].desc}</p>
                  <span className="font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: PRIMARY }} data-field="services.learnMore">
                    {t.services.learnMore} <ArrowRight aria-hidden className="w-4 h-4" />
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section data-section="pricing" id="pricing" className="py-16 md:py-24 bg-[#fbf9f8]">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal variant="fade-up" className="text-center mb-16">
              <h2 data-field="pricing.title" className="font-bold text-2xl md:text-3xl mb-4">{t.pricing.title}</h2>
              <p data-field="pricing.subtitle" className="text-[#414754] max-w-2xl mx-auto">{t.pricing.subtitle}</p>
            </Reveal>
            <Reveal variant="zoom-in" delay={100} className="bg-white rounded-3xl overflow-hidden border border-[#c1c6d7]/30 shadow-[0px_4px_20px_rgba(5,102,79,0.08)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ backgroundColor: `${PRIMARY}14`, color: PRIMARY }} className="font-bold">
                      <th className="px-8 py-6" data-field="pricing.colService">{t.pricing.colService}</th>
                      <th className="px-8 py-6" data-field="pricing.colDetail">{t.pricing.colDetail}</th>
                      <th className="px-8 py-6 text-right" data-field="pricing.colPrice">{t.pricing.colPrice}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c1c6d7]/30">
                    {t.pricing.items.map((item, i) => (
                      <Reveal as="tr" key={i} variant="fade-up" delay={i * 80} className="hover:bg-black/[0.015] transition-colors">
                        <td data-field={`pricing.items.${i}.name`} className="px-8 py-6 font-bold">{item.name}</td>
                        <td data-field={`pricing.items.${i}.desc`} className="px-8 py-6 text-[#414754]">{item.desc}</td>
                        <td data-field={`pricing.items.${i}.price`} className="px-8 py-6 text-right font-bold" style={{ color: PRIMARY }}>{item.price}</td>
                      </Reveal>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" id="testimonials" className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal variant="fade-up" className="flex flex-col items-center mb-16">
              <div className="w-12 h-1 mb-6" style={{ backgroundColor: PRIMARY }} />
              <h2 data-field="testimonials.title" className="font-bold text-2xl md:text-3xl text-center">{t.testimonials.title}</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.testimonials.items.map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 100} className="bg-[#f6f3f2] p-8 rounded-3xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                      <img className="w-full h-full object-cover" src={TESTIMONIAL_AVATARS[i] ?? IMG.avatarMinhHoang} alt="" loading="lazy" />
                    </div>
                    <div>
                      <h4 data-field={`testimonials.items.${i}.name`} className="font-bold">{item.name}</h4>
                      <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#414754]">{item.role}</p>
                    </div>
                  </div>
                  <div className="mb-4 flex gap-1" style={{ color: PRIMARY }}>
                    {Array.from({ length: item.rating }).map((_, si) => (
                      <Star key={si} aria-hidden className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="italic text-[#414754] leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section data-section="cta" className="max-w-[1200px] mx-auto px-6 mb-16 md:mb-24">
          <div
            className="rounded-[40px] p-10 md:p-20 text-center text-white relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_LIGHT} 100%)` }}
          >
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <Reveal as="h2" variant="fade-up" className="font-extrabold text-3xl md:text-5xl leading-tight">
                <span data-field="cta.titleLine1">{t.cta.titleLine1}</span><br />
                <span data-field="cta.titleLine2">{t.cta.titleLine2}</span>
              </Reveal>
              <Reveal as="p" variant="fade-up" delay={100} data-field="cta.subtitle" className="text-lg opacity-90">{t.cta.subtitle}</Reveal>
              <Reveal variant="fade-up" delay={200}>
                <button
                  data-track="booking"
                  data-field="cta.btnLabel"
                  className="bg-white px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  style={{ color: PRIMARY }}
                >
                  {t.cta.btnLabel}
                </button>
              </Reveal>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" id="footer" className="bg-[#f6f3f2] border-t border-[#c1c6d7]/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 py-16 md:py-24 max-w-[1200px] mx-auto">
          <Reveal variant="fade-up" className="space-y-6">
            <div data-field="footer.brand" className="font-extrabold text-2xl" style={{ color: PRIMARY }}>{t.footer.brand}</div>
            <p data-field="footer.desc" className="text-[#414754] max-w-md">{t.footer.desc}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MapPin aria-hidden className="w-5 h-5 shrink-0" style={{ color: PRIMARY }} />
                <span data-field="footer.address">{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone aria-hidden className="w-5 h-5 shrink-0" style={{ color: PRIMARY }} />
                <a data-track="call" data-field="footer.phone" href={`tel:${t.footer.phone.replace(/[^\d+]/g, '')}`} className="hover:underline">{t.footer.phone}</a>
              </div>
              <div className="flex items-center gap-4">
                <Mail aria-hidden className="w-5 h-5 shrink-0" style={{ color: PRIMARY }} />
                <span data-field="footer.email">{t.footer.email}</span>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <a aria-label="Facebook" href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:text-white transition-all" style={{ backgroundColor: `${PRIMARY}1a`, color: PRIMARY }}>
                <Facebook aria-hidden className="w-4 h-4" />
              </a>
              <a aria-label="Youtube" href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:text-white transition-all" style={{ backgroundColor: `${PRIMARY}1a`, color: PRIMARY }}>
                <Youtube aria-hidden className="w-4 h-4" />
              </a>
              <a aria-label="Instagram" href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:text-white transition-all" style={{ backgroundColor: `${PRIMARY}1a`, color: PRIMARY }}>
                <Instagram aria-hidden className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
          <Reveal variant="zoom-in" delay={150} className="h-64 md:h-full min-h-[300px] rounded-3xl overflow-hidden shadow-[0px_4px_20px_rgba(5,102,79,0.08)] border border-[#c1c6d7]/30 relative">
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
              <div className="absolute inset-0 bg-[#e4e2e1] group">
                <img className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 transition-transform duration-1000" src={IMG.locationMap} alt="" loading="lazy" />
                <div className="absolute inset-0" style={{ backgroundColor: `${PRIMARY}0d` }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="text-white p-3 rounded-xl shadow-xl" style={{ backgroundColor: PRIMARY }}>
                    <MapPin aria-hidden className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%]">
                  <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl text-center">
                    <p data-field="footer.mapBrand" className="font-extrabold text-sm leading-none">{t.footer.mapBrand}</p>
                  </div>
                </div>
              </div>
            )}
          </Reveal>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 py-8 border-t border-[#c1c6d7]/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p data-field="footer.copyright" className="text-[#414754] text-xs">{t.footer.copyright}</p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="text-[#414754] hover:opacity-70 transition-all" data-field="footer.link1">{t.footer.link1}</a>
            <a href="#" className="text-[#414754] hover:opacity-70 transition-all" data-field="footer.link2">{t.footer.link2}</a>
            <a href="#" className="text-[#414754] hover:opacity-70 transition-all" data-field="footer.link3">{t.footer.link3}</a>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <button
          data-track="booking"
          data-field="mobileCta.label"
          className="w-full text-white py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
          style={{ backgroundColor: PRIMARY }}
        >
          <CalendarCheck aria-hidden className="w-5 h-5" />
          {t.mobileCta.label}
        </button>
      </div>
    </div>
  );
}
