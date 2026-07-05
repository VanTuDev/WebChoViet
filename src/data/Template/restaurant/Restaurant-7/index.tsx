import { MapPin, Phone, Mail, Quote, Facebook, Instagram, Youtube, Menu } from 'lucide-react';
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
  hero: 'https://lh3.googleusercontent.com/aida/AP1WRLvWGLzS4GDNPNs6dtEzfgiEs2NLzqNcAm2-St4v1GXWLoNVEfZFNi6kmeMxOy83S_jlLOdaqOkfkJOkEmu919gm3YQXfqv1Sgm1xv0IhA5Ke_Hx6M4Bi9Qm25HAuZ_34SnpQ6fU4hVUvMI3T36GoBL82qjMxYGoytkEYcKfFQjnK1pJOPJIwtOuKykL7d5EmHe4SV5PBnJHQIk5LPXxK4WzdWQXue0tia-vTPsbxG0qTzfddtdk0-wI_A',
  story: 'https://lh3.googleusercontent.com/aida/AP1WRLsk1-akQjPqvE_eK92bQiR4DflPO8rjkzLPWw2LcmOVhYtPDClh2rXkvhhk29X0aPMBoPuvsAxBbYdOjXSsTWXsJxwtxziK6bMiInWyS_cdjKohapRreKfRn2pqviKIDJUR_fB8l3N4By503vZsO3fPlwWIB_BqBNUgrK72F5tUP-1SlKOY6C-qW6JAqgV5-YYTaBZry16MSTcNzP7uGFf-JHG6GCMmlc1kKE-Wm7fWgsc3cobg2UyNVQI',
  menuHighlight: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVZD_g73ewOx_veijkevHIA-X-Ghl9_ydaJHgQHA8M_c5RAvpf9E1QGTmvsYQ0grr7M1cfTQip5-TWYF3fnRO4PrgKNv0IrN9k1wG_orwx07SmJDvGShcBULZKjwON3_QP03O_aW2ghnUjx3GMthxR65BWXKwqXlQQxy-Yz_hVc57TMaL2nllQgeLJUv1f-VYS8Qjvll-3EDz9viz2jcsPpeATQoAxMJ2qHA_oQtTQgj79Ttab3Fgu',
  mapFallback: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfjB3kVuTfnV8-5iyqYjZPXqSXnyXaMYmWmtT1oKmzcad4wMQhPqTKuFvWNMNtfVx2o22Z_dQQBXEkzgy84ZqTIAkkiaiZd-Wb8Awl-jzMkqA-jps3y-Li-qrDUa74rQije-1kDuXhUQvab0QUPMxtzz99x3jqR3V0hOuJuNjN0_2YwHKbFUR-AgR8_5rIhfr8qawuBXIL-tshoBR3Y0NyHpsHD6jei1bTwGRsum2F4NU9Gx_C5mnk',
};

/** Icon liên hệ & mạng xã hội — nằm ngoài i18n vì không phải nội dung dịch */
const CONTACT_ICONS = [MapPin, Phone, Mail];
const SOCIAL_ICONS = [Instagram, Facebook, Youtube];

export default function Restaurant7({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  const contactRows = [
    { label: t.contact.addressLabel, value: t.contact.address, field: 'contact.address' },
    { label: t.contact.phoneLabel, value: t.contact.phone, field: 'contact.phone' },
    { label: t.contact.emailLabel, value: t.contact.email, field: 'contact.email' },
  ];

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-lexend antialiased">

      {/* Navbar */}
      <nav data-section="nav" className="fixed top-0 w-full z-50 bg-[#131313]/70 backdrop-blur-xl border-b border-[#5b4040]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 flex justify-between items-center h-20">
          <span data-field="nav.brand" className="text-xl md:text-2xl font-bold text-[#ffb3b4] uppercase tracking-tighter">
            {t.nav.brand}
          </span>
          <div className="hidden md:flex gap-10 items-center">
            <a className="text-sm font-medium text-[#e5e2e1] hover:text-[#ffb3b4] transition-colors duration-300" href="#menu">{t.nav.menu}</a>
            <a className="text-sm font-medium text-[#e5e2e1] hover:text-[#ffb3b4] transition-colors duration-300" href="#story">{t.nav.story}</a>
            <a className="text-sm font-medium text-[#e5e2e1] hover:text-[#ffb3b4] transition-colors duration-300" href="#location">{t.nav.location}</a>
            <a data-track="contact" href="#location"
              className="bg-[#c41e3a] text-[#ffdada] px-8 py-3 text-sm font-semibold hover:bg-[#680016] active:scale-95 transition-all">
              {t.nav.contact}
            </a>
          </div>
          <button aria-label="menu" className="md:hidden text-[#ffb3b4]">
            <Menu aria-hidden className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img alt={t.hero.titleLine1} className="w-full h-full object-cover opacity-60 scale-105" src={IMG.hero} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(19,19,19,0) 0%, rgba(19,19,19,1) 100%)' }} />
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-16 text-center">
            <span data-field="hero.badge" className="text-xs font-medium text-[#ffb3b4] uppercase tracking-[0.4em] mb-4 block">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
              <span data-field="hero.titleLine1">{t.hero.titleLine1}</span> <br />
              <span data-field="hero.titleLine2">{t.hero.titleLine2}</span>
            </h1>
            <div className="w-24 h-1 bg-[#c41e3a] mx-auto mb-8" />
            <p data-field="hero.subtitle" className="text-lg leading-relaxed max-w-2xl mx-auto text-[#c6c6c7]">
              {t.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Story */}
        <section data-section="story" className="py-24 bg-[#131313]" id="story">
          <div className="max-w-[1200px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 border border-[#5b4040] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
              <img alt={t.story.title} className="w-full h-[400px] md:h-[600px] object-cover relative z-10" src={IMG.story} />
            </div>
            <div className="md:pl-16">
              <h2 data-field="story.title" className="text-3xl md:text-5xl font-bold text-[#ffb3b4] mb-6">{t.story.title}</h2>
              <p data-field="story.description" className="text-lg leading-relaxed text-[#c6c6c7] mb-8">
                {t.story.description}
              </p>
              <div className="flex items-center gap-4 text-[#ffb3b4]">
                <span className="w-12 h-px bg-[#ffb3b4]" />
                <span data-field="story.tag" className="text-xs tracking-widest uppercase font-medium">{t.story.tag}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section data-section="menuSection" className="py-24 bg-[#0e0e0e]" id="menu">
          <div className="max-w-[1200px] mx-auto px-6 md:px-16">
            <div className="text-center mb-16">
              <h2 data-field="menuSection.title" className="text-3xl md:text-5xl font-bold text-[#ffb3b4] mb-4">{t.menuSection.title}</h2>
              <div className="flex justify-center gap-8 border-b border-[#5b4040] pb-2 overflow-x-auto">
                {t.menuSection.tabs.map((tab, i) => (
                  <button
                    key={i}
                    data-field={`menuSection.tabs.${i}`}
                    className={`px-4 pb-2 whitespace-nowrap text-sm font-medium transition-colors ${i === 0 ? 'text-[#ffb3b4] border-b-2 border-[#ffb3b4]' : 'text-[#e5e2e1] hover:text-[#ffb3b4]'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Highlight image */}
              <div className="lg:col-span-7 h-full">
                <div className="relative h-full min-h-[400px] overflow-hidden group">
                  <img alt={t.menuSection.highlightName} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={IMG.menuHighlight} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131313] to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8">
                    <span data-field="menuSection.highlightBadge" className="bg-[#c41e3a] text-[#ffdada] px-3 py-1 text-xs font-semibold mb-2 inline-block">
                      {t.menuSection.highlightBadge}
                    </span>
                    <h3 data-field="menuSection.highlightName" className="text-2xl font-semibold text-white">{t.menuSection.highlightName}</h3>
                  </div>
                </div>
              </div>

              {/* Menu list */}
              <div className="lg:col-span-5 space-y-8">
                {t.menuSection.items.map((item, i) => (
                  <div key={i} className="pb-6 border-b border-[#2d2d2d] flex justify-between items-end group cursor-pointer">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 data-field={`menuSection.items.${i}.name`} className="text-xl font-semibold group-hover:text-[#ffb3b4] transition-colors">{item.name}</h4>
                        {item.tag && (
                          <span data-field={`menuSection.items.${i}.tag`} className="bg-[#5b4040] text-[10px] px-2 py-0.5 text-white tracking-tighter uppercase">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p data-field={`menuSection.items.${i}.desc`} className="text-[#c6c6c7] text-sm italic">{item.desc}</p>
                    </div>
                    <span data-field={`menuSection.items.${i}.price`} className="text-[#ffb3b4] text-xl font-semibold shrink-0 pl-4">{item.price}</span>
                  </div>
                ))}

                <div className="flex justify-center md:justify-end pt-4">
                  <a data-track="viewMenu" data-field="menuSection.viewAllBtn" href="#location"
                    className="border border-white px-10 py-4 text-sm font-semibold hover:bg-white hover:text-[#131313] transition-all duration-300 text-center">
                    {t.menuSection.viewAllBtn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-24 bg-[#20201f]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-16">
            <h2 data-field="testimonials.title" className="text-3xl md:text-5xl font-bold text-center text-[#ffb3b4] mb-16">{t.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.testimonials.items.map((item, i) => (
                <div key={i} className="bg-[#131313] border border-[#5b4040] p-8 relative">
                  <Quote aria-hidden className="w-9 h-9 text-[#ffb3b4] mb-6" />
                  <p data-field={`testimonials.items.${i}.quote`} className="text-lg italic text-[#e5e2e1] mb-8 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div>
                    <p data-field={`testimonials.items.${i}.name`} className="text-lg font-semibold text-[#ffb3b4]">{item.name}</p>
                    <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#c6c6c7] uppercase tracking-wide">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location / Contact */}
        <section data-section="location" className="py-24 bg-[#131313]" id="location">
          <div className="max-w-[1200px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="bg-[#2a2a2a] p-8 md:p-12 flex flex-col justify-center">
              <h2 data-field="contact.title" className="text-3xl md:text-5xl font-bold text-[#ffb3b4] mb-8">{t.contact.title}</h2>
              <div className="space-y-8">
                {contactRows.map((row, ri) => {
                  const RowIcon = CONTACT_ICONS[ri];
                  return (
                    <div key={row.field} className="flex items-start gap-6">
                      <RowIcon aria-hidden className="w-5 h-5 mt-1 text-[#ffb3b4]" />
                      <div>
                        <h5 className="text-lg font-semibold mb-1">{row.label}</h5>
                        <p data-field={row.field} className="text-[#c6c6c7] text-base">{row.value}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-8 border-t border-[#5b4040]">
                  <h5 data-field="contact.hoursTitle" className="text-lg font-semibold mb-4">{t.contact.hoursTitle}</h5>
                  <div className="flex justify-between text-[#c6c6c7] text-sm">
                    <span data-field="contact.hoursWeekdayLabel">{t.contact.hoursWeekdayLabel}</span>
                    <span data-field="contact.hoursWeekdayTime">{t.contact.hoursWeekdayTime}</span>
                  </div>
                  <div className="flex justify-between text-[#c6c6c7] text-sm mt-2">
                    <span data-field="contact.hoursWeekendLabel">{t.contact.hoursWeekendLabel}</span>
                    <span data-field="contact.hoursWeekendTime">{t.contact.hoursWeekendTime}</span>
                  </div>
                </div>
                <a data-track="call" data-field="contact.btnContact" href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                  className="inline-block bg-[#c41e3a] text-[#ffdada] px-8 py-3 text-sm font-semibold hover:bg-[#680016] transition-all w-fit">
                  {t.contact.btnContact}
                </a>
              </div>
            </div>

            <div className="relative min-h-[400px] md:min-h-[500px] border border-[#5b4040]">
              {t.contact.mapUrl ? (
                <iframe
                  src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              ) : (
                <div className="absolute inset-0">
                  <img className="w-full h-full object-cover opacity-50 grayscale" src={IMG.mapFallback} alt="" />
                  <div className="absolute inset-0 bg-[#131313]/60 flex flex-col items-center justify-center gap-3 text-center px-6">
                    <MapPin aria-hidden className="w-12 h-12 text-[#ffb3b4]" />
                    <p className="text-sm font-medium text-[#e5e2e1]">{t.contact.mapLoading}</p>
                    <p data-field="contact.address" className="text-xs text-[#c6c6c7] max-w-xs">{t.contact.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#0e0e0e] w-full pt-24 pb-12 border-t border-[#5b4040]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <span data-field="footer.brand" className="text-2xl font-bold text-[#ffb3b4] uppercase tracking-tighter mb-6 block">{t.footer.brand}</span>
            <p data-field="footer.description" className="text-[#e3bebd] text-sm max-w-xs leading-relaxed">{t.footer.description}</p>
          </div>
          <div>
            <h6 data-field="footer.linksTitle" className="text-lg font-semibold text-[#e5e2e1] mb-6">{t.footer.linksTitle}</h6>
            <ul className="space-y-4 text-sm">
              {t.footer.links.map((link, i) => (
                <li key={i}><a data-field={`footer.links.${i}`} className="text-[#e3bebd] hover:text-[#ffb3b4] transition-colors" href="#">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h6 data-field="footer.socialTitle" className="text-lg font-semibold text-[#e5e2e1] mb-6">{t.footer.socialTitle}</h6>
            <div className="flex gap-6">
              {SOCIAL_ICONS.map((SocialIcon, i) => (
                <a key={i} className="text-[#e3bebd] hover:text-[#ffb3b4] transition-all hover:-translate-y-1" href="#">
                  <SocialIcon aria-hidden className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 mt-16 pt-8 border-t border-[#5b4040] text-center">
          <p data-field="footer.copy" className="text-[#e3bebd] text-sm">{t.footer.copy}</p>
        </div>
      </footer>
    </div>
  );
}
