import {
  BadgeCheck, ArrowRight, Flower2, ChevronRight, CheckCircle2,
  Award, Users, MapPin, Phone, Clock, Globe, Mail,
} from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroImg:       'https://lh3.googleusercontent.com/aida-public/AB6AXuDqhhfM9bFLQdzZ1FgZCH2B6Md4GUbCPodCbEy-I34NdyPONJaBAKvrWEfuokU8bk9YczaW0ttDV9kpBvjKlPr4ogzakNJ_9VTsElrmsRBiF6bKcD1xQnM02C7dz11-Cc2pZf8-HoMh0ezwkCuljEYhmy2bLCsyDEtiX9TdjjTMips9NlflP3ZZKiZBwLN1b_E2UopUJqvSDr-iLc97TKxzFBaCEuBaHol4fhZNiqjixwnfmGIwye4G',
  acneImg:       'https://lh3.googleusercontent.com/aida-public/AB6AXuDmou1haC8jNjkiDUuGynK92mspCztxLFVfY1dYoGPMbAQATHwSvEC2cHgQiDz-BFVFrJtjEGErUhJR4llJmXQoCLVbpheItOoBW8q7IJgQM_DTy5y4lo8u9mNjxZgqD7UmW8ShyLOVH99lsTildOCUc0ciA_tQzOsM8gXGlffw6Vzzltu9w3ldYHJQgadAhlrIkiuSpIHFDkEsn4iAWADnhbTUlb_PP5knkwZDYEemW2IZWPiYYeB1',
  skinCareImg:   'https://lh3.googleusercontent.com/aida-public/AB6AXuCWoCd3jRjtcXPePQRUtU29t_kcebw46QQW-2uTwEY78BuYuksoq3dvlU25nvZbHzWGLdHa3FM9mpl2Pgf0icsXrecJIRjmfr88GcvEAPxIJbGf0pjsKXDWEJ4zZckPZGRe34Va42zSaReool-9-xalJE0R4vLcRbviin6vZa0DhKhlM7V-GVKftlKylDzw2WOE_flxj94LGTxhMZNX4pW_mIPZ_pV3YA7MK_FnEHi3xVdQVG3NVppa',
  bodyTherapyImg:'https://lh3.googleusercontent.com/aida-public/AB6AXuCBL7qUeWqJ88K_d4OMW8e-ZzVyIJEiRisoPzaRXaj3tvsTHNcZrww4tgQw1GSo2ZNU2huf5qz-fHRD9kd7JXGledkR7puqUXL2TVLy1crFV2CV0PBAgyrYQtpmSQzLxgZPlH7kiYU2mJk_d74neMu425tesvnjYbLLwEjimMtIDlGlhr5jV7UhrCBUFczGpNeyrJ8_AhCnhflr8DkiIeYX0uSjrohItSv_oxB0FeXAN28gk-cSGF2e',
  teamPortrait1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfqSwKdFZ8HnDEDhwU4d1JMOSFrrmzvqXG9d0OLsYJqDPnc3-movtiXfKEkotaH5kygzvlnWgYLAuDyJj8w7kIearwcXYYRJse_kudQI2d_srkSHe1bJIkWKx12z8Lnbrv-3wITRdqVi2f8xLg6TrExV_moHmYGy5TRJrvPES9wcoLlji_N9v73nE-6CWKSFO8xXDukBnHCkCtN3FkShCWSdwuCuupxqXKtpUeom4JNZY5_kS3E8yg',
  teamPortrait2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeEX9-YIeueFrH_Cca7mUSGcl6V7QTbraFv6BULlkAAVS5ISurHyXIMn-ChPzodcvkrdjHsacDDF_9UCm0-OKM4Y_plv3MnOdIOa3Xg6nWrqvFY3uRY6vw5U47e6Dv0XUmzFSXj-KaMdE2GoxVzC3wDy8LSLZNRfqbgA2qyMcfgQNFM6Z8gwk5W7CL7-1OLX462UlzrJPtMHwqSZogCJzcpBqGbCXnWBWieSAbNS3mO7cGZ2IVZQb_',
};

/** Icon cho danh sách contact (địa chỉ / điện thoại / giờ mở cửa) — trang trí, không phải nội dung dịch */
const CONTACT_ICONS = [MapPin, Phone, Clock];
const SOCIAL_ICONS = [Globe, Mail];

export default function Spa2({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#fbf9f9] text-[#1b1c1c] font-sans antialiased">

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9f9]/70 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center w-full px-5 md:px-16 py-4 max-w-7xl mx-auto">
          <span data-field="nav.brand" className="text-2xl font-semibold tracking-tight text-[#30628a]">{t.nav.brand}</span>
          <nav className="hidden md:flex items-center gap-12">
            <a className="text-[#30628a] border-b-2 border-[#30628a] pb-1 font-bold text-sm" href="#services">{t.nav.services}</a>
            <a className="text-[#41474e] hover:text-[#30628a] transition-colors text-sm font-medium" href="#team">{t.nav.about}</a>
            <a className="text-[#41474e] hover:text-[#30628a] transition-colors text-sm font-medium" href="#prices">{t.nav.prices}</a>
            <a className="text-[#41474e] hover:text-[#30628a] transition-colors text-sm font-medium" href="#location">{t.nav.location}</a>
          </nav>
          <div className="flex gap-3">
            <button className="hidden sm:block px-6 py-2 rounded-full text-[#30628a] border border-[#30628a] hover:bg-[#30628a]/5 transition-all text-sm font-medium">
              {t.nav.btnAdvice}
            </button>
            <button data-track="cta-book" className="px-6 py-2 rounded-full bg-[#30628a] text-white hover:scale-105 transition-transform duration-300 shadow-sm text-sm font-medium cursor-pointer">
              {t.nav.btnBook}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          data-section="hero"
          className="relative pt-32 pb-20 px-5 md:px-16 bg-white overflow-hidden"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#d3e5f1] text-[#30628a] text-xs font-semibold">
                <BadgeCheck aria-hidden className="w-4 h-4" />
                <span data-field="hero.badge">{t.hero.badge}</span>
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#30628a]">
                <span data-field="hero.title">{t.hero.title}</span> <br />
                <span data-field="hero.titleHighlight" className="text-[#40627b]">{t.hero.titleHighlight}</span>
              </h1>
              <p data-field="hero.subtitle" className="text-lg leading-relaxed text-[#41474e] max-w-lg">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  data-track="cta-hero"
                  href="#services"
                  className="px-8 py-4 rounded-full bg-[#30628a] text-white font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  {t.hero.cta} <ArrowRight aria-hidden className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(162,210,255,0.35)] aspect-square relative group">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={IMG.heroImg}
                  alt={t.hero.imageAlt}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#fbf9f9] p-6 rounded-2xl shadow-xl border border-[#a2d2ff]/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#a2d2ff] flex items-center justify-center text-[#30628a] shrink-0">
                  <Flower2 aria-hidden className="w-6 h-6" />
                </div>
                <div>
                  <p data-field="hero.badgeYears" className="text-sm font-bold text-[#30628a]">{t.hero.badgeYears}</p>
                  <p data-field="hero.badgeYearsSub" className="text-xs text-[#41474e]">{t.hero.badgeYearsSub}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights bento grid */}
        <section data-section="highlights" className="py-20 px-5 md:px-16 max-w-7xl mx-auto" id="services">
          <div className="text-center mb-16">
            <h2 data-field="highlights.title" className="text-3xl font-semibold text-[#30628a] mb-3">{t.highlights.title}</h2>
            <p data-field="highlights.subtitle" className="text-base text-[#41474e]">{t.highlights.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Acne treatment — large card */}
            <div className="md:col-span-8 bg-[#efeded] rounded-[2rem] p-8 relative overflow-hidden group min-h-[400px] flex flex-col justify-end">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                src={IMG.acneImg}
                alt={t.highlights.acne.imageAlt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#efeded] via-transparent to-transparent" />
              <div className="relative z-10">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#30628a] text-white text-xs font-semibold">{t.highlights.acne.tag1}</span>
                  <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[#30628a] text-xs font-semibold">{t.highlights.acne.tag2}</span>
                </div>
                <h3 data-field="highlights.acne.title" className="text-2xl font-semibold text-[#30628a] mb-2">{t.highlights.acne.title}</h3>
                <p data-field="highlights.acne.desc" className="text-base text-[#41474e] max-w-md mb-4">{t.highlights.acne.desc}</p>
                <button className="text-[#30628a] font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  {t.highlights.acne.link} <ChevronRight aria-hidden className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Skin care */}
            <div className="md:col-span-4 bg-[#a2d2ff]/20 rounded-[2rem] p-8 flex flex-col justify-between group">
              <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={IMG.skinCareImg} alt={t.highlights.skinCare.imageAlt} />
              </div>
              <div>
                <h3 data-field="highlights.skinCare.title" className="text-2xl font-semibold text-[#30628a] mb-2">{t.highlights.skinCare.title}</h3>
                <p data-field="highlights.skinCare.desc" className="text-base text-[#41474e]">{t.highlights.skinCare.desc}</p>
              </div>
            </div>

            {/* Body therapy */}
            <div className="md:col-span-4 bg-[#aed1ef]/20 rounded-[2rem] p-8 group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={IMG.bodyTherapyImg} alt={t.highlights.bodyTherapy.imageAlt} />
              </div>
              <h3 data-field="highlights.bodyTherapy.title" className="text-2xl font-semibold text-[#30628a] mb-2">{t.highlights.bodyTherapy.title}</h3>
              <p data-field="highlights.bodyTherapy.desc" className="text-base text-[#41474e]">{t.highlights.bodyTherapy.desc}</p>
            </div>

            {/* Custom plan */}
            <div className="md:col-span-8 bg-white border border-[#c1c7cf] rounded-[2rem] p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 data-field="highlights.customPlan.title" className="text-2xl font-semibold text-[#30628a]">{t.highlights.customPlan.title}</h3>
                <p data-field="highlights.customPlan.desc" className="text-base text-[#41474e]">{t.highlights.customPlan.desc}</p>
                <ul className="space-y-2">
                  {t.highlights.customPlan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#41474e]">
                      <CheckCircle2 aria-hidden className="w-5 h-5 text-[#30628a] shrink-0" />
                      <span data-field={`highlights.customPlan.features.${i}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#f5f3f3] rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div data-field="highlights.customPlan.statValue" className="text-4xl font-bold text-[#30628a]">{t.highlights.customPlan.statValue}</div>
                  <p data-field="highlights.customPlan.statLabel" className="text-sm font-medium text-[#41474e]">{t.highlights.customPlan.statLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services / price list */}
        <section data-section="services" className="py-20 bg-[#f5f3f3]" id="prices">
          <div className="max-w-7xl mx-auto px-5 md:px-16">
            <div className="text-center mb-16">
              <h2 data-field="services.title" className="text-3xl font-semibold text-[#30628a] mb-3">{t.services.title}</h2>
              <p data-field="services.subtitle" className="text-base text-[#41474e]">{t.services.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {t.services.categories.map((cat, ci) => (
                <div key={ci} className={ci % 2 === 1 ? '' : 'space-y-8'}>
                  <div className={ci >= 2 ? 'mt-8' : ''}>
                    <h3 data-field={`services.categories.${ci}.title`} className="text-sm font-bold text-[#30628a] border-b border-[#c1c7cf]/50 pb-2 mb-4">
                      {cat.title}
                    </h3>
                    <div className="bg-white rounded-2xl overflow-hidden divide-y divide-[#c1c7cf]/30 shadow-sm">
                      {cat.items.map((item, ii) => (
                        <div key={ii} className="p-4 hover:bg-[#30628a]/5 transition-colors flex justify-between items-center gap-4">
                          <div>
                            <h4 data-field={`services.categories.${ci}.items.${ii}.name`} className="text-sm font-bold text-[#1b1c1c]">{item.name}</h4>
                            <p data-field={`services.categories.${ci}.items.${ii}.desc`} className="text-xs leading-tight text-[#41474e]">
                              {item.desc} · <span data-field={`services.categories.${ci}.items.${ii}.duration`}>{item.duration}</span>
                            </p>
                          </div>
                          <div data-field={`services.categories.${ci}.items.${ii}.price`} className="text-[#30628a] font-bold text-base shrink-0">{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 p-8 bg-[#a2d2ff]/10 rounded-[2rem] text-center border border-[#a2d2ff]/30">
              <p data-field="services.promo" className="text-base text-[#30628a] mb-4">{t.services.promo}</p>
              <button data-track="cta-promo" className="px-8 py-3 rounded-full bg-[#30628a] text-white font-bold hover:scale-105 transition-transform">
                {t.services.promoCta}
              </button>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" className="py-20 px-5 md:px-16 bg-white" id="gallery">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 data-field="gallery.title" className="text-3xl font-semibold text-[#30628a] mb-3">{t.gallery.title}</h2>
              <p data-field="gallery.subtitle" className="text-base text-[#41474e]">{t.gallery.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[IMG.heroImg, IMG.skinCareImg, IMG.bodyTherapyImg].map((src, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    src={src}
                    alt={t.gallery.items[i]?.alt ?? ''}
                    data-field={`gallery.items.${i}.alt`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section data-section="team" className="py-20 px-5 md:px-16 max-w-7xl mx-auto" id="team">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <h2 data-field="team.title" className="text-3xl font-semibold text-[#30628a] mb-4">{t.team.title}</h2>
              <p data-field="team.desc" className="text-lg leading-relaxed text-[#41474e] mb-8">{t.team.desc}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-[#efeded] rounded-2xl">
                  <Award aria-hidden className="w-6 h-6 text-[#30628a] mb-2" />
                  <h4 data-field="team.cert.title" className="text-sm font-bold text-[#1b1c1c]">{t.team.cert.title}</h4>
                  <p data-field="team.cert.sub" className="text-xs text-[#41474e]">{t.team.cert.sub}</p>
                </div>
                <div className="p-6 bg-[#efeded] rounded-2xl">
                  <Users aria-hidden className="w-6 h-6 text-[#30628a] mb-2" />
                  <h4 data-field="team.care.title" className="text-sm font-bold text-[#1b1c1c]">{t.team.care.title}</h4>
                  <p data-field="team.care.sub" className="text-xs text-[#41474e]">{t.team.care.sub}</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              <img className="rounded-[2rem] aspect-[3/4] object-cover mt-12" src={IMG.teamPortrait1} alt={t.team.portrait1Alt} />
              <img className="rounded-[2rem] aspect-[3/4] object-cover" src={IMG.teamPortrait2} alt={t.team.portrait2Alt} />
            </div>
          </div>
        </section>

        {/* Contact / Map */}
        <section data-section="contact" className="py-20 px-5 md:px-16 bg-[#f5f3f3]" id="location">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="space-y-6">
                <h2 data-field="contact.title" className="text-3xl font-semibold text-[#30628a]">{t.contact.title}</h2>
                <p data-field="contact.subtitle" className="text-lg leading-relaxed text-[#41474e]">{t.contact.subtitle}</p>
                <div className="space-y-3">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                    { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri];
                    return (
                      <div key={row.valueField} className="flex items-center gap-3 text-[#1b1c1c]">
                        <RowIcon aria-hidden className="w-5 h-5 text-[#30628a] shrink-0" />
                        <span data-field={row.valueField} className="font-medium">{row.value}</span>
                      </div>
                    );
                  })}
                </div>
                <a
                  data-track="cta-directions"
                  data-field="contact.btnDirection"
                  href={t.contact.mapUrl ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.contact.address)}` : `tel:${t.contact.phone.replace(/\s/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-8 py-3 rounded-full bg-[#30628a] text-white font-bold hover:scale-105 transition-transform"
                >
                  {t.contact.btnDirection}
                </a>
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-lg h-[400px] border border-[#c1c7cf]/30">
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
                  <div className="w-full h-full bg-[#e9e8e7] flex items-center justify-center flex-col gap-3">
                    <MapPin aria-hidden className="w-14 h-14 text-[#30628a]" />
                    <p className="text-sm font-medium text-[#41474e]">{t.contact.mapLoading}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-white border-t border-[#c1c7cf]/10">
        <div className="max-w-7xl mx-auto px-5 md:px-16 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-4 max-w-xs">
              <div data-field="footer.brand" className="text-2xl font-semibold text-[#30628a]">{t.footer.brand}</div>
              <p data-field="footer.desc" className="text-base text-[#41474e]">{t.footer.desc}</p>
              <div className="flex gap-3">
                {SOCIAL_ICONS.map((Icon, i) => (
                  <a key={i} className="w-10 h-10 rounded-full bg-[#a2d2ff]/30 flex items-center justify-center text-[#30628a] hover:bg-[#30628a] hover:text-white transition-all" href="#">
                    <Icon aria-hidden className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-2">
                <h5 data-field="footer.servicesTitle" className="font-bold text-[#1b1c1c]">{t.footer.servicesTitle}</h5>
                <ul className="space-y-1 text-[#41474e] text-sm">
                  {t.footer.servicesLinks.map((link, i) => (
                    <li key={i}><a data-field={`footer.servicesLinks.${i}`} className="hover:text-[#30628a] transition-colors underline" href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h5 data-field="footer.policyTitle" className="font-bold text-[#1b1c1c]">{t.footer.policyTitle}</h5>
                <ul className="space-y-1 text-[#41474e] text-sm">
                  {t.footer.policyLinks.map((link, i) => (
                    <li key={i}><a data-field={`footer.policyLinks.${i}`} className="hover:text-[#30628a] transition-colors underline" href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h5 data-field="footer.contactTitle" className="font-bold text-[#1b1c1c]">{t.footer.contactTitle}</h5>
                <ul className="space-y-1 text-[#41474e] text-sm">
                  <li className="flex items-center gap-1.5"><MapPin aria-hidden className="w-3.5 h-3.5" /> <span data-field="footer.contactCity">{t.footer.contactCity}</span></li>
                  <li className="flex items-center gap-1.5"><Phone aria-hidden className="w-3.5 h-3.5" /> <span data-field="footer.contactPhone">{t.footer.contactPhone}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-[#c1c7cf]/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p data-field="footer.copyright" className="text-xs text-[#41474e]">{t.footer.copyright}</p>
            <div className="flex gap-6 text-xs text-[#41474e]">
              <span data-field="footer.tagline1">{t.footer.tagline1}</span>
              <span data-field="footer.tagline2">{t.footer.tagline2}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
