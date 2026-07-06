import { Coffee, CupSoda, MapPin, Clock, Phone, Star, Share2, MessageCircle, ShoppingCart } from 'lucide-react';
import Reveal from '../../_shared/Reveal';
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
  heroBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa7hO-2pu0fubtVfd30zM9SrE0oFcWzg4t0VBgCEe0c1BPJW3B-tsuNvoesemvdHBhb0IR_IrgpnsYjeoiGBVA1oDV03ag3M6wgiGkrZWwNSH3Ey92ulGqlRTOMBQ7or11rBWCiH0Mfe6w1Vjz_Hl3YDpmYqAuCZ_KJDINbR9WUvKd7ZbjPuXEUM5sEegwRqjwfRMysQpvPqVVW_XUDzJE3wRfFEdbMwm2xJozFBWOpeeixZe2WgNl',
  menuFeatured: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDodW_lmZQ6zKZdUe_3m1_UbLqzM7cw2lB49TMbblqNQOknkbIpuMWgTh_ZIESvcL5vzBZDzWNVhIk8Ri_lOvYhDaXH4jjDZ0ZXD8FwN_4d5bHGyXIHUZEaRGXzh7xOGnwrDX8bOuKKEH1txmHbISOJQ0hT2cqWwzPqPwnuzfMha-q4D5KUk4S3jeS0tyxH9Bjqr8uC8POXzNM_fw23GvM9c647IoD81zhF5JwVPOzDxelGCjX7P_AT',
  gallery1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIud2DolIkBtQQvWjhEopoPyJwzSofk2Ih-MKDsMZsFZUD7ua-45yZv0OZiAGI2h3BkhPP7S6nIDO7vwTBho_D997B5jNOKA7ltya1b_b6Ke7fw1zbGf8O6fJ_0B1OkzLRP1OV1tQFucD-Ik_4qV6jGZLydxx0bc2pbYVETieO4REH9ZjNiCMbS4kzlT2dDFaEcoEyrEZmhAgVYj6DhLYMk5bjPn5P98JOldN6KT_nTuyLlh6jh0Xb',
  gallery2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy8N8Stgl1FtOs2jnbDJuAMq8gjKfk4I-zDnD6FLobGeSvomblhF5ydUeiOCuU2q0QNbYEzhXuBDfBijpKnADuk580YvyHwRT4apXIpWjiB1xHvqOOW04ymi6hG4nbSktQPAzGAJdhvnpV5ge4j1ZYPwr6ISDZiOHPbapIp_GrtFwKFuQJZwwalnGNyn-8pIMz3cT5nOB0gGDNp1d-KZ_jrHrfu6nnW68O5IKvKxBvjQ_n6QN8jUvg',
  gallery3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYYMYEYfN7FJX13ylAJQBoKXrNuS2sWFZCs33c0WeFSZPQuxUKQxj98R57dmD6DyhH9nDNF93iJa4tZE30nx_B3pk831aprZ5x85DqPXhj5SkMnD5XdNoDMccxJbRThfIjc3VPFugIgNtOxkJniqJpUP8bU5z6n64cq5y6_LDT879F_CCV04OWJ4EfhI1WTMmsJ9-4mUQwSFKvFhYdpW9Pkd3H5oTCGIdY1XJdQpAzYGCeToqNnEWN',
  gallery4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgmrdbVs2erBFKMvjRWdC80zLvyQILUAzyrm1wh_uRheX3Ea2ChA0d-0r1ggaOVsIZ_By-h-_S5GYh2s6MKvXuCgO7SkkGRRxOuBdvsWa1Nu7Y6iSFntADBgq5O8vpCvBI-iAFDXq7T5roHagyf962SQOLDDQwrpwhynbNSokrZOWIUHieU5C9fUJX4OF2abQm_zU_985rBLEUodNAeW2QKneh7H0w3BWlqbGVegm_kap7zHYGm9Mk',
  avatar1: 'https://lh3.googleusercontent.com/aida/AP1WRLtI_ne1U9Nsu3H4YBzSiooK5BQSogLCPk7t4W31d9iHudjuGq_aBgPiUIAKfyCKmJbyBiAA-0a5i-ZEI_r-3emipT3UhDKcqLgmspeS0aqvNubCt1nC8MCFerm9sJZOCmPdXHncxlYz4PmFR1xehQjw_DTIA3__NDuFs0SgUi-fmqfjSx_pzCtuKXUv0VHRa8VS33P0f9P3g8im8BUTAJQjyGew5xmaujuKTACBqkfXVIzK1OFkiNjryG4',
  avatar2: 'https://lh3.googleusercontent.com/aida/AP1WRLvKom7znxLJXRYK6ogR18f3P1yRDUmhAadVjCYfjm9zk-RQIsJdXZzQjXTxPg3UBMyZB-ZkOnGCY17QMvgLlpcHMmH5KXmIbi5xZClguuiC6OGlsZaoFxfpLNVeqMXx4J49ljJhFq28TB0oaQB8q9dpI-xJlLHKgdJU4IjCgTXna55MsPHLQ6c1kPvmRIUqZZl444y-iXX8HTzmDk1ou7M04nd6UVkbwnC0I5dOrnzy6go8VzUQU6FHZmo',
  avatar3: 'https://lh3.googleusercontent.com/aida/AP1WRLtnqGi6iEPr_VHu33rdGQXmBeI4Yi4ZgH2doQnqMCYmqdbl5ZQjJouy9NbZz82ORWPUaxjvouZulgWuNuVMUYJWm0KBTksB_FkVNX0ffvN0YhyyCNQL4f_QvdcJ9qE4-HonbuOLxFxv527sjFdzk3Xo77NeaLMNWUzS6qTS9XdgTHKmzf70jsk0T8mV2wOCYtq37L9USQZt30aAYDGoGUMUzjXcfyXwa06vp0ztejAZ0CMECNKbRQqQzs8',
};

/** Icon cho 2 món menu phụ — nằm ngoài i18n vì không phải nội dung dịch */
const MENU_ITEM_ICONS = [Coffee, CupSoda];
const AVATAR_KEYS = ['avatar1', 'avatar2', 'avatar3'] as const;
const GALLERY_KEYS = ['gallery1', 'gallery2', 'gallery3', 'gallery4'] as const;

export default function Coffe7({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-sans antialiased">

      {/* Navbar */}
      <header data-section="nav" className="sticky top-0 w-full z-50 bg-[#fbf9f5]/70 backdrop-blur-xl shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex justify-between items-center">
          <span data-field="nav.brand" className="font-lexend text-xl md:text-2xl font-bold text-[#79542e]">{t.nav.brand}</span>
          <nav className="hidden md:flex gap-8 items-center text-sm">
            <a className="text-[#79542e] font-bold border-b-2 border-[#79542e] pb-1" href="#menu">{t.nav.menu}</a>
            <a className="text-[#50453b] hover:text-[#79542e] transition-colors duration-200" href="#gallery">{t.nav.ourStory}</a>
            <a className="text-[#50453b] hover:text-[#79542e] transition-colors duration-200" href="#contact">{t.nav.reservations}</a>
            <a className="text-[#50453b] hover:text-[#79542e] transition-colors duration-200" href="#contact">{t.nav.locations}</a>
          </nav>
          <button data-track="cta" data-field="nav.orderOnline" className="bg-[#79542e] text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all active:scale-95 cursor-pointer">
            {t.nav.orderOnline}
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src={IMG.heroBg} alt="" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(27,28,26,0.4), rgba(27,28,26,0.7))' }} />
          </div>
          <div className="relative z-10 text-center max-w-3xl px-6">
            <Reveal as="h1" data-field="hero.title" variant="fade-up" className="font-lexend text-4xl md:text-5xl font-semibold leading-tight text-white mb-6">
              {t.hero.title}
            </Reveal>
            <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={120} className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </Reveal>
            <Reveal variant="fade-up" delay={240} className="flex flex-col md:flex-row gap-4 justify-center">
              <a data-field="hero.btnMenu" href="#menu" className="bg-[#79542e] text-white px-10 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition-transform text-center">
                {t.hero.btnMenu}
              </a>
              <a data-field="hero.btnReserve" data-track="cta" href="#contact" className="border-2 border-white text-white px-10 py-3 rounded-full font-medium backdrop-blur-sm hover:bg-white hover:text-[#79542e] transition-all text-center">
                {t.hero.btnReserve}
              </a>
            </Reveal>
          </div>
        </section>

        {/* Menu */}
        <section data-section="menu" className="py-20 max-w-[1280px] mx-auto px-6" id="menu">
          <Reveal variant="fade-up" className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <span data-field="menu.eyebrow" className="text-[#79542e] text-xs font-semibold tracking-widest uppercase">{t.menu.eyebrow}</span>
              <h2 data-field="menu.title" className="font-lexend text-3xl md:text-4xl font-semibold mt-1">{t.menu.title}</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {t.menu.tabs.map((tab, i) => (
                <button
                  key={i}
                  data-field={`menu.tabs.${i}`}
                  className={
                    i === 0
                      ? 'bg-[#79542e] text-white px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium'
                      : 'bg-[#eae8e4] text-[#50453b] px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium hover:bg-[#d4e4d2] transition-colors'
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured item */}
            <Reveal variant="zoom-in" className="md:col-span-8 group relative rounded-xl overflow-hidden h-[400px]">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={IMG.menuFeatured} alt={t.menu.featured.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                <span data-field="menu.featured.badge" className="bg-[#536254] text-white px-3 py-1 rounded-full text-xs font-semibold w-fit mb-3">{t.menu.featured.badge}</span>
                <h3 data-field="menu.featured.name" className="font-lexend text-2xl font-medium text-white mb-2">{t.menu.featured.name}</h3>
                <p data-field="menu.featured.desc" className="text-white/80 max-w-md">{t.menu.featured.desc}</p>
                <span data-field="menu.featured.price" className="text-white font-bold mt-3">{t.menu.featured.price}</span>
              </div>
            </Reveal>

            {/* Two column items */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {t.menu.items.map((item, i) => {
                const ItemIcon = MENU_ITEM_ICONS[i] ?? Coffee;
                return (
                  <Reveal key={i} variant="fade-left" delay={120 + i * 120} className="flex-1">
                  <div className="bg-[#f5f3ef] p-6 rounded-xl hover:shadow-md transition-shadow cursor-pointer group h-full">
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-16 h-16 rounded-lg bg-[#eae8e4] flex items-center justify-center">
                        <ItemIcon aria-hidden className="w-7 h-7 text-[#79542e]" />
                      </div>
                      <span data-field={`menu.items.${i}.price`} className="text-[#79542e] font-bold">{item.price}</span>
                    </div>
                    <h4 data-field={`menu.items.${i}.name`} className="font-lexend text-lg font-medium mb-1 group-hover:text-[#79542e] transition-colors">{item.name}</h4>
                    <p data-field={`menu.items.${i}.desc`} className="text-sm text-[#50453b]">{item.desc}</p>
                  </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" className="bg-[#fbf9f5] py-20" id="gallery">
          <div className="max-w-[1280px] mx-auto px-6">
            <Reveal variant="fade-up" className="text-center mb-10">
              <h2 data-field="gallery.title" className="font-lexend text-3xl md:text-4xl font-semibold">{t.gallery.title}</h2>
              <p data-field="gallery.subtitle" className="text-[#50453b] max-w-xl mx-auto mt-3">{t.gallery.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY_KEYS.map((key, i) => (
                <Reveal key={key} variant="zoom-in" delay={i * 90} className={`h-[300px] md:h-[400px] rounded-xl overflow-hidden group ${i % 2 === 0 ? 'md:mt-12' : ''}`}>
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={IMG[key]} alt="" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-20 max-w-[1280px] mx-auto px-6">
          <Reveal as="h2" data-field="testimonials.title" variant="fade-up" className="font-lexend text-3xl md:text-4xl font-semibold text-center mb-12">{t.testimonials.title}</Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => {
              const avatarKey = AVATAR_KEYS[i] ?? 'avatar1';
              return (
                <Reveal key={i} variant="fade-up" delay={i * 120} className="bg-[#efeeea] p-8 rounded-2xl relative">
                  <div className="flex items-center gap-3 mb-4">
                    <img className="w-14 h-14 rounded-full object-cover border-2 border-[#ffdcbd]" src={IMG[avatarKey]} alt="" />
                    <div>
                      <p data-field={`testimonials.items.${i}.name`} className="text-sm font-medium">{item.name}</p>
                      <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#50453b]">{item.role}</p>
                    </div>
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="italic text-[#50453b] leading-relaxed">"{item.quote}"</p>
                  <div className="mt-4 flex text-[#79542e]" aria-label={`${item.rating} sao`}>
                    {Array.from({ length: item.rating }).map((_, si) => (
                      <Star key={si} aria-hidden className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <section data-section="contact" className="py-20 bg-[#f5f3ef]" id="contact">
          <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal variant="fade-right">
              <h2 data-field="contact.title" className="font-lexend text-3xl md:text-4xl font-semibold mb-6">{t.contact.title}</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin aria-hidden className="w-5 h-5 mt-1 text-[#79542e]" />
                  <div>
                    <p className="text-sm font-medium">{t.contact.addressLabel}</p>
                    <p data-field="contact.address" className="text-[#50453b]">{t.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock aria-hidden className="w-5 h-5 mt-1 text-[#79542e]" />
                  <div>
                    <p className="text-sm font-medium">{t.contact.hoursLabel}</p>
                    <p data-field="contact.hours" className="text-[#50453b]">{t.contact.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone aria-hidden className="w-5 h-5 mt-1 text-[#79542e]" />
                  <div>
                    <p className="text-sm font-medium">{t.contact.phoneLabel}</p>
                    <p className="text-[#50453b]">
                      <span data-field="contact.phone">{t.contact.phone}</span>
                      {' | '}
                      <span data-field="contact.email">{t.contact.email}</span>
                    </p>
                  </div>
                </div>
              </div>
              <form className="mt-8 space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input className="w-full bg-[#fbf9f5] border border-[#d4c4b7] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#79542e] focus:border-[#79542e]" placeholder={t.contact.formName} type="text" />
                <input className="w-full bg-[#fbf9f5] border border-[#d4c4b7] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#79542e] focus:border-[#79542e]" placeholder={t.contact.formEmail} type="email" />
                <textarea className="w-full bg-[#fbf9f5] border border-[#d4c4b7] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#79542e] focus:border-[#79542e]" placeholder={t.contact.formMessage} rows={4} />
                <button data-track="cta" data-field="contact.formSubmit" type="submit" className="w-full bg-[#79542e] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                  {t.contact.formSubmit}
                </button>
              </form>
            </Reveal>
            <Reveal variant="fade-left" delay={150} className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-[#d4c4b7]">
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
                <div className="w-full h-full bg-[#eae8e4] flex items-center justify-center flex-col gap-3">
                  <MapPin aria-hidden className="w-14 h-14 text-[#79542e]" />
                  <p className="text-sm font-medium text-[#50453b]">{t.contact.mapLoading}</p>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="w-full py-16 px-6 border-t border-[#d4c4b7] bg-[#e4e2de]">
        <Reveal variant="fade" className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 data-field="footer.brand" className="font-lexend text-xl font-bold text-[#79542e] mb-1">{t.footer.brand}</h4>
            <p data-field="footer.copy" className="text-sm text-[#50453b]">{t.footer.copy}</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a className="text-[#50453b] hover:text-[#79542e] transition-colors duration-200" href="#">{t.footer.privacy}</a>
            <a className="text-[#50453b] hover:text-[#79542e] transition-colors duration-200" href="#">{t.footer.terms}</a>
            <a className="text-[#50453b] hover:text-[#79542e] transition-colors duration-200" href="#">{t.footer.sustainability}</a>
            <a className="text-[#50453b] hover:text-[#79542e] transition-colors duration-200" href="#">{t.footer.contactUs}</a>
          </div>
          <div className="flex gap-3">
            <a aria-label="Share" className="w-10 h-10 rounded-full bg-[#fbf9f5] flex items-center justify-center hover:bg-[#ffdcbd] transition-colors" href="#">
              <Share2 aria-hidden className="w-4 h-4 text-[#79542e]" />
            </a>
            <a aria-label="Chat" className="w-10 h-10 rounded-full bg-[#fbf9f5] flex items-center justify-center hover:bg-[#ffdcbd] transition-colors" href="#">
              <MessageCircle aria-hidden className="w-4 h-4 text-[#79542e]" />
            </a>
          </div>
        </Reveal>
      </footer>

      {/* Mobile FAB */}
      <button
        data-track="cta"
        aria-label={t.nav.fabLabel}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#79542e] text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:scale-110 active:scale-95 transition-all md:hidden"
      >
        <ShoppingCart aria-hidden className="w-6 h-6" />
      </button>
    </div>
  );
}
