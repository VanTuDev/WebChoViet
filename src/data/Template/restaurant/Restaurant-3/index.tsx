import { Flame, Soup, ChefHat, Users, Trees, Star, Globe, Mail, Phone, Clock, MapPin, Navigation, CalendarCheck } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHero from './images/hero.jpg';
import imgBroth from './images/broth.jpg';
import imgWagyu from './images/wagyu.jpg';
import imgSeafood from './images/seafood.jpg';
import imgPrivate from './images/private.jpg';
import imgGroup from './images/group.jpg';
import imgTerrace from './images/terrace.jpg';
import imgMap from './images/map.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  hero:    imgHero,
  broth:   imgBroth,
  wagyu:   imgWagyu,
  seafood: imgSeafood,
  private: imgPrivate,
  group:   imgGroup,
  terrace: imgTerrace,
  map:     imgMap,
};

/** Icon minh hoạ cho 2 feature "Không Gian Nhà Hàng" — không phải nội dung dịch */
const SPACE_ICONS = [Users, Trees];
/** Icon cho hàng thông tin liên hệ (địa chỉ / điện thoại / giờ mở cửa) */
const CONTACT_ICONS = [MapPin, Phone, Clock];

export default function Restaurant3({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#fcf9f2] text-[#1c1c18] font-lexend antialiased">

      {/* Navbar */}
      <header data-section="nav" className="sticky top-0 w-full z-50 bg-[#fcf9f2]/90 backdrop-blur-md shadow-sm">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <Soup aria-hidden className="w-6 h-6 text-[#8f000d]" />
            <span data-field="nav.brand" className="text-xl font-bold text-[#8f000d]">{t.nav.brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-base">
            <a className="text-[#8f000d] font-bold border-b-2 border-[#8f000d] pb-1" href="#menu">{t.nav.menu}</a>
            <a className="text-[#5a403e] hover:text-[#795900] transition-colors" href="#space">{t.nav.privateDining}</a>
            <a className="text-[#5a403e] hover:text-[#795900] transition-colors" href="#reviews">{t.nav.locations}</a>
            <a className="text-[#5a403e] hover:text-[#795900] transition-colors" href="#contact">{t.nav.reservations}</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-semibold text-[#795900] hover:underline">{t.nav.loyalty}</button>
            <a data-track="reserve" data-field="nav.cta" href="#contact"
              className="bg-[#8f000d] text-white px-6 py-2.5 rounded-lg text-sm font-semibold active:scale-95 transition-transform hover:opacity-90">
              {t.nav.cta}
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative h-[85vh] min-h-125 w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" src={IMG.hero} alt={t.hero.title} />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <h1 data-field="hero.title" className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {t.hero.title}
            </h1>
            <p data-field="hero.subtitle" className="text-lg text-[#fcf9f2] mb-8">{t.hero.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a data-track="reserve" data-field="hero.btnReserve" href="#contact"
                className="bg-[#b22222] text-white px-8 py-4 rounded-xl text-sm font-semibold shadow-lg hover:bg-[#8f000d] transition-all active:scale-95">
                {t.hero.btnReserve}
              </a>
              <a data-field="hero.btnMenu" href="#menu"
                className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl text-sm font-semibold hover:bg-white/30 transition-all active:scale-95">
                {t.hero.btnMenu}
              </a>
            </div>
          </div>
        </section>

        {/* Menu bento */}
        <section data-section="menuSection" className="py-16 md:py-24 bg-[#fcf9f2]" id="menu">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span data-field="menuSection.eyebrow" className="text-[#8f000d] text-sm font-semibold tracking-widest uppercase">{t.menuSection.eyebrow}</span>
                <h2 data-field="menuSection.title" className="text-3xl font-bold mt-1">{t.menuSection.title}</h2>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {t.menuSection.chips.map((chip, i) => (
                  <span key={i} data-field={`menuSection.chips.${i}`}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold ${i === 0 ? 'bg-[#8f000d] text-white' : 'bg-[#f0eee7] border border-[#8e706d] text-[#5a403e]'}`}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Featured broth card */}
              <div className="md:col-span-8 relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 min-h-100 group">
                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMG.broth} alt={t.menuSection.featured.name} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: t.menuSection.featured.heatLevel }).map((_, i) => (
                      <Flame key={i} aria-hidden className="w-5 h-5 text-[#ffbf00] fill-current" />
                    ))}
                  </div>
                  <h3 data-field="menuSection.featured.name" className="text-2xl font-bold text-white">{t.menuSection.featured.name}</h3>
                  <p data-field="menuSection.featured.desc" className="text-[#e5e2db] max-w-md">{t.menuSection.featured.desc}</p>
                </div>
              </div>

              {/* Side items */}
              <div className="md:col-span-4 flex flex-col gap-6">
                {[{ img: IMG.wagyu, item: t.menuSection.items[0], field: 'menuSection.items.0' },
                  { img: IMG.seafood, item: t.menuSection.items[1], field: 'menuSection.items.1' }].map((row) => (
                  <div key={row.field} className="bg-white rounded-3xl p-4 shadow-sm border border-[#ebe8e1] flex gap-4 items-center group cursor-pointer hover:border-[#8f000d] transition-all">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform" src={row.img} alt={row.item.name} loading="lazy" />
                    </div>
                    <div>
                      <h4 data-field={`${row.field}.name`} className="font-semibold text-sm">{row.item.name}</h4>
                      <p data-field={`${row.field}.desc`} className="text-[#5a403e] text-xs">{row.item.desc}</p>
                      <span data-field={`${row.field}.price`} className="text-[#8f000d] font-bold mt-2 block">{row.item.price}</span>
                    </div>
                  </div>
                ))}
                <div className="bg-[#b22222] rounded-3xl p-6 flex flex-col justify-center items-center text-center text-white flex-1">
                  <ChefHat aria-hidden className="w-9 h-9 mb-2" />
                  <h4 data-field="menuSection.viewAll.title" className="text-lg font-semibold">{t.menuSection.viewAll.title}</h4>
                  <p data-field="menuSection.viewAll.desc" className="text-[#ffdad6] text-xs mt-1">{t.menuSection.viewAll.desc}</p>
                  <a data-field="menuSection.viewAll.cta" href="#menu" className="mt-4 bg-white text-[#8f000d] px-4 py-1.5 rounded-full text-sm font-semibold active:scale-95 transition-transform">
                    {t.menuSection.viewAll.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cozy space */}
        <section data-section="space" className="py-16 md:py-24 bg-[#f6f3ec]" id="space">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden h-64 shadow-md">
                    <img className="w-full h-full object-cover" src={IMG.private} alt={t.space.features[0].title} loading="lazy" />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-48 shadow-md">
                    <img className="w-full h-full object-cover" src={IMG.group} alt={t.space.title} loading="lazy" />
                  </div>
                </div>
                <div className="pt-6">
                  <div className="rounded-2xl overflow-hidden h-[450px] shadow-md">
                    <img className="w-full h-full object-cover" src={IMG.terrace} alt={t.space.features[1].title} loading="lazy" />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span data-field="space.eyebrow" className="text-[#795900] text-sm font-semibold tracking-widest uppercase">{t.space.eyebrow}</span>
                <h2 data-field="space.title" className="text-3xl md:text-4xl font-bold mt-1 mb-4">{t.space.title}</h2>
                <p data-field="space.desc" className="text-lg text-[#5a403e] mb-8 leading-relaxed">{t.space.desc}</p>
                <div className="space-y-4">
                  {t.space.features.map((f, i) => {
                    const FeatureIcon = SPACE_ICONS[i] ?? Users;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#ffbf00] flex items-center justify-center flex-shrink-0">
                          <FeatureIcon aria-hidden className="w-5 h-5 text-[#6d5000]" />
                        </div>
                        <div>
                          <h4 data-field={`space.features.${i}.title`} className="font-semibold">{f.title}</h4>
                          <p data-field={`space.features.${i}.desc`} className="text-sm text-[#5a403e]">{f.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials + Contact/Map */}
        <section data-section="testimonials" className="py-16 md:py-24 bg-[#fcf9f2]" id="reviews">
          <div className="max-w-7xl mx-auto px-6">
            <h2 data-field="testimonials.title" className="text-3xl font-bold text-center mb-16">{t.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {t.testimonials.items.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-[#f0eee7] hover:shadow-md transition-shadow">
                  <div aria-hidden className="flex text-[#ffbf00] mb-2 gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="text-[#5a403e] italic mb-4 leading-relaxed">"{item.quote}"</p>
                  <div className="flex items-center gap-2">
                    <div aria-hidden className="w-10 h-10 rounded-full bg-[#e5e2db]" />
                    <div>
                      <span data-field={`testimonials.items.${i}.name`} className="font-semibold block">{item.name}</span>
                      <span data-field={`testimonials.items.${i}.role`} className="text-sm text-[#5a403e]">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact + Map */}
            <div data-section="contact" id="contact" className="rounded-[2rem] overflow-hidden bg-[#ebe8e1] relative shadow-lg">
              <div className="h-100">
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
                  <div className="relative w-full h-full">
                    <img className="w-full h-full object-cover" src={IMG.map} alt={t.contact.address} loading="lazy" />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center flex-col gap-2">
                      <MapPin aria-hidden className="w-12 h-12 text-[#8f000d]" />
                      <p className="text-sm font-semibold text-white bg-black/50 px-3 py-1 rounded-full">{t.contact.mapLoading}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-white/90 backdrop-blur-md p-6 rounded-2xl md:max-w-md shadow-xl">
                <h4 data-field="contact.branchName" className="font-semibold text-[#8f000d] mb-2">{t.contact.branchName}</h4>
                <div className="space-y-2 mb-4">
                  {([
                    { Icon: CONTACT_ICONS[0], value: t.contact.address, field: 'contact.address' },
                    { Icon: CONTACT_ICONS[1], value: t.contact.phone, field: 'contact.phone' },
                    { Icon: CONTACT_ICONS[2], value: t.contact.hours, field: 'contact.hours' },
                  ]).map((row) => (
                    <div key={row.field} className="flex items-start gap-2">
                      <row.Icon aria-hidden className="w-4 h-4 mt-0.5 text-[#5a403e] flex-shrink-0" />
                      <p data-field={row.field} className="text-sm text-[#5a403e]">{row.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a data-track="call" data-field="contact.btnReserve" href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                    className="flex-1 bg-[#8f000d] text-white text-sm font-semibold px-4 py-2.5 rounded-full text-center hover:opacity-90 transition-all active:scale-95">
                    {t.contact.btnReserve}
                  </a>
                  <button aria-label={t.contact.btnDirections} className="bg-[#8f000d] text-white p-2.5 rounded-full active:scale-90 transition-transform">
                    <Navigation aria-hidden className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="w-full bg-[#e5e2db]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-16 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Soup aria-hidden className="w-6 h-6 text-[#8f000d]" />
              <span data-field="footer.brand" className="text-xl font-bold text-[#8f000d]">{t.footer.brand}</span>
            </div>
            <p data-field="footer.desc" className="text-sm text-[#5a403e] max-w-sm">{t.footer.desc}</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-[#e5e2db] border border-[#8e706d] flex items-center justify-center hover:text-[#8f000d] transition-all" href="#">
                <Globe aria-hidden className="w-4 h-4" />
              </a>
              <a className="w-10 h-10 rounded-full bg-[#e5e2db] border border-[#8e706d] flex items-center justify-center hover:text-[#8f000d] transition-all" href="#">
                <Mail aria-hidden className="w-4 h-4" />
              </a>
              <a data-track="call" className="w-10 h-10 rounded-full bg-[#e5e2db] border border-[#8e706d] flex items-center justify-center hover:text-[#8f000d] transition-all" href={`tel:${t.contact.phone.replace(/\s/g, '')}`}>
                <Phone aria-hidden className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 data-field="footer.companyTitle" className="font-semibold">{t.footer.companyTitle}</h5>
              <ul className="space-y-1">
                {t.footer.companyLinks.map((link, i) => (
                  <li key={i}><a data-field={`footer.companyLinks.${i}`} className="text-sm text-[#5a403e] hover:text-[#8f000d] underline transition-all" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h5 data-field="footer.exploreTitle" className="font-semibold">{t.footer.exploreTitle}</h5>
              <ul className="space-y-1">
                {t.footer.exploreLinks.map((link, i) => (
                  <li key={i}><a data-field={`footer.exploreLinks.${i}`} className="text-sm text-[#5a403e] hover:text-[#8f000d] underline transition-all" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-[#8e706d]/30 max-w-7xl mx-auto px-6 py-4">
          <p data-field="footer.copy" className="text-sm text-[#5a403e] text-center md:text-left">{t.footer.copy}</p>
        </div>
      </footer>

      {/* FAB reservation */}
      <div className="fixed bottom-6 right-6 z-50">
        <a data-track="reserve" href="#contact"
          className="bg-[#ffbf00] text-[#6d5000] shadow-2xl p-4 rounded-full flex items-center gap-2 group active:scale-95 transition-all">
          <CalendarCheck aria-hidden className="w-5 h-5" />
          <span data-field="fab.label" className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-semibold whitespace-nowrap">
            {t.fab.label}
          </span>
        </a>
      </div>
    </div>
  );
}
