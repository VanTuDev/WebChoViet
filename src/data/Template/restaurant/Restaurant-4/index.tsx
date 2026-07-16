import {
  Flame, CupSoda, PartyPopper, ChefHat, Plus, ArrowRight, ArrowUpRight,
  Star, MapPin, Clock, Phone, Facebook, Instagram, MessageCircle,
  UtensilsCrossed, Armchair, ShoppingCart, Map as MapIcon,
} from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroBg from './images/heroBg.jpg';
import imgMenuFeatured from './images/menuFeatured.jpg';
import imgSpaceMain from './images/spaceMain.jpg';
import imgSpaceWok from './images/spaceWok.jpg';
import imgSpaceTea from './images/spaceTea.jpg';
import imgSpaceDecor from './images/spaceDecor.jpg';
import imgMapImg from './images/mapImg.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg:      imgHeroBg,
  menuFeatured: imgMenuFeatured,
  spaceMain:   imgSpaceMain,
  spaceWok:    imgSpaceWok,
  spaceTea:    imgSpaceTea,
  spaceDecor:  imgSpaceDecor,
  mapImg:      imgMapImg,
};

/** Icon cho 2 thẻ bento danh mục (trang trí, không phải nội dung dịch) */
const SIDE_ICONS = [Flame, CupSoda];
/** Icon cho 3 dòng thông tin liên hệ: địa chỉ / giờ mở cửa / điện thoại */
const CONTACT_ICONS = [MapPin, Clock, Phone];

export default function Restaurant4({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#fff8f4] text-[#231a11] font-lexend antialiased">

      {/* Navbar */}
      <header data-section="nav" className="bg-[#fff8f4]/95 backdrop-blur-md border-b border-[#887361]/10 sticky top-0 z-50 shadow-sm">
        <nav className="flex justify-between items-center px-6 lg:px-16 py-2 max-w-screen-2xl mx-auto h-20">
          <span data-field="nav.brand" className="font-lexend text-2xl font-bold text-[#8a5100]">{t.nav.brand}</span>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a className="text-[#a63b00] font-bold border-b-2 border-[#a63b00] pb-1" href="#menu">{t.nav.menu}</a>
            <a className="text-[#554434] hover:text-[#8a5100] transition-colors duration-300" href="#space">{t.nav.space}</a>
            <a className="text-[#554434] hover:text-[#8a5100] transition-colors duration-300" href="#reviews">{t.nav.reviews}</a>
            <a className="text-[#554434] hover:text-[#8a5100] transition-colors duration-300" href="#contact">{t.nav.contact}</a>
          </div>
          <div className="flex gap-3">
            <button data-track="order" data-field="nav.orderNow" className="hidden lg:block px-6 py-2 rounded-lg border-2 border-[#a63b00] text-[#a63b00] font-bold hover:bg-[#a63b00]/10 transition-all cursor-pointer">
              {t.nav.orderNow}
            </button>
            <a data-track="reserve" data-field="nav.bookTable" href="#contact" className="px-6 py-2 rounded-lg bg-[#ff9900] text-[#653a00] font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
              {t.nav.bookTable}
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover brightness-[0.7]" src={IMG.heroBg} alt={`${t.hero.titlePrefix} ${t.hero.titleHighlight} ${t.hero.titleSuffix}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fff8f4] via-transparent to-black/30" />
          </div>
          <div className="relative z-10 px-6 lg:px-16 max-w-4xl">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#ff5e00]/20 backdrop-blur-sm border border-[#ff5e00]/30">
              <span data-field="hero.badge" className="text-[#a63b00] font-bold tracking-widest text-sm">{t.hero.badge}</span>
            </div>
            <h1 className="font-lexend text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.1]">
              <span data-field="hero.titlePrefix">{t.hero.titlePrefix}</span>{' '}
              <span data-field="hero.titleHighlight" className="text-[#ff9900] [text-shadow:0_0_10px_rgba(255,94,0,0.8),0_0_20px_rgba(255,153,0,0.4)]">{t.hero.titleHighlight}</span>
              <br /><span data-field="hero.titleSuffix">{t.hero.titleSuffix}</span>
            </h1>
            <p data-field="hero.subtitle" className="text-white/90 text-lg mb-8 max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a data-field="hero.btnMenu" className="px-10 py-4 bg-[#ff5e00] text-white font-bold rounded-lg hover:shadow-[0_0_25px_rgba(255,94,0,0.5)] transition-all" href="#menu">
                {t.hero.btnMenu}
              </a>
              <a data-field="hero.btnGallery" className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-all" href="#space">
                {t.hero.btnGallery}
              </a>
            </div>
          </div>
          {/* Floating spice badge */}
          <div className="absolute bottom-20 right-20 hidden xl:flex gap-4 animate-bounce">
            <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center gap-3">
              <Flame aria-hidden className="w-7 h-7 text-[#ff5e00]" />
              <span data-field="hero.spicyBadge" className="text-white font-bold">{t.hero.spicyBadge}</span>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section data-section="menuSection" className="py-24 bg-[#fff8f4]" id="menu">
          <div className="px-6 lg:px-16 max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <h2 data-field="menuSection.title" className="font-lexend text-3xl font-semibold text-[#231a11] mb-2">{t.menuSection.title}</h2>
                <div className="h-1 w-24 bg-[#a63b00] rounded-full" />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto">
                {t.menuSection.tabs.map((tab, ti) => (
                  <button key={ti} className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${ti === 0 ? 'bg-[#ff5e00] text-white' : 'border border-[#887361]/20 text-[#554434] hover:border-[#a63b00]'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured + side bento */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
              <div className="lg:col-span-7 bg-[#fdebdc] rounded-3xl overflow-hidden flex flex-col md:flex-row group border border-[#887361]/5">
                <div className="md:w-1/2 overflow-hidden h-full min-h-75">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={IMG.menuFeatured} alt={t.menuSection.featured.name} loading="lazy" />
                </div>
                <div className="md:w-1/2 p-10 flex flex-col justify-center">
                  <span data-field="menuSection.featured.label" className="text-[#a63b00] font-bold text-xs tracking-widest mb-2">{t.menuSection.featured.label}</span>
                  <h3 data-field="menuSection.featured.name" className="font-lexend text-2xl font-semibold text-[#231a11] mb-4">{t.menuSection.featured.name}</h3>
                  <p data-field="menuSection.featured.desc" className="text-[#554434] mb-6 leading-relaxed">{t.menuSection.featured.desc}</p>
                  <div className="flex items-center gap-2 mb-8">
                    <ChefHat aria-hidden className="w-5 h-5 text-[#a63b00]" />
                    <span data-field="menuSection.featured.tag" className="font-bold text-[#a63b00]">{t.menuSection.featured.tag}</span>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span data-field="menuSection.featured.price" className="text-2xl font-bold text-[#231a11]">{t.menuSection.featured.price}</span>
                    <button aria-label={t.menuSection.featured.name} className="w-12 h-12 bg-[#8a5100] rounded-full text-white flex items-center justify-center hover:bg-[#a63b00] transition-colors cursor-pointer">
                      <Plus aria-hidden className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {t.menuSection.sideCards.map((card, ci) => {
                  const SideIcon = SIDE_ICONS[ci] ?? Flame;
                  return (
                    <div key={ci} className={`bg-[#f7e5d7] p-6 rounded-2xl flex flex-col justify-between border border-[#887361]/5 hover:shadow-xl transition-all group ${ci === 0 ? 'text-[#a63b00]' : 'text-[#3b6934]'}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${ci === 0 ? 'bg-[#ff5e00]/20' : 'bg-[#8cbe80]/20'}`}>
                        <SideIcon aria-hidden className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 data-field={`menuSection.sideCards.${ci}.title`} className="font-bold text-lg mb-1 text-[#231a11]">{card.title}</h4>
                        <p data-field={`menuSection.sideCards.${ci}.desc`} className="text-xs text-[#554434]">{card.desc}</p>
                      </div>
                      <ArrowRight aria-hidden className="self-end w-4 h-4 text-[#887361] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
                <div className="col-span-2 bg-[#392f25] p-8 rounded-3xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 data-field="menuSection.promo.title" className="text-white font-lexend text-2xl font-semibold mb-2">{t.menuSection.promo.title}</h4>
                    <p data-field="menuSection.promo.desc" className="text-white/60 mb-6">{t.menuSection.promo.desc}</p>
                    <button data-track="promo" data-field="menuSection.promo.cta" className="px-6 py-2 bg-[#ff9900] text-[#653a00] font-bold rounded-lg hover:scale-105 transition-transform cursor-pointer">
                      {t.menuSection.promo.cta}
                    </button>
                  </div>
                  <PartyPopper aria-hidden className="absolute -right-6 -bottom-6 w-40 h-40 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* Full menu items */}
            <h3 data-field="menuSection.itemsTitle" className="font-lexend text-2xl font-semibold text-[#8a5100] mb-8">{t.menuSection.itemsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.menuSection.items.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-[#dbc2ad] bg-white/60 hover:-translate-y-1 hover:shadow-lg transition-all">
                  <span className="inline-block mb-2 px-2 py-0.5 rounded-full bg-[#f1dfd1] text-[10px] font-bold tracking-wide text-[#554434]">{item.category}</span>
                  <div className="flex justify-between gap-2 mb-1">
                    <h4 data-field={`menuSection.items.${i}.name`} className="text-sm font-bold text-[#231a11]">{item.name}</h4>
                    <span data-field={`menuSection.items.${i}.price`} className="text-[#a63b00] font-bold shrink-0">{item.price}</span>
                  </div>
                  <p data-field={`menuSection.items.${i}.desc`} className="text-xs leading-relaxed text-[#554434]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vibe Gallery */}
        <section data-section="space" className="py-24 bg-[#fff8f4] overflow-hidden" id="space">
          <div className="px-6 lg:px-16 max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 data-field="space.title" className="font-lexend text-3xl font-semibold text-[#231a11]">{t.space.title}</h2>
              <p data-field="space.subtitle" className="text-[#554434] mt-4">{t.space.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:h-150">
              <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative group h-64 md:h-auto">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src={IMG.spaceMain} alt={t.space.caption} loading="lazy" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span data-field="space.caption" className="text-white font-bold border-2 border-white px-6 py-2 rounded-full">{t.space.caption}</span>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative group hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src={IMG.spaceWok} alt="Đầu bếp đảo chảo món đường phố Thái" loading="lazy" />
              </div>
              <div className="rounded-3xl overflow-hidden relative group hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src={IMG.spaceTea} alt="Trà sữa Thái đặc trưng" loading="lazy" />
              </div>
              <div className="col-span-2 rounded-3xl overflow-hidden relative group hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src={IMG.spaceDecor} alt="Không gian trang trí đậm chất Bangkok" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-24 bg-[#fff1e7] relative" id="reviews">
          <div className="px-6 lg:px-16 max-w-screen-2xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div>
                <h2 data-field="testimonials.title" className="font-lexend text-3xl font-semibold text-[#231a11] mb-6">{t.testimonials.title}</h2>
                <div className="flex items-center gap-4 mb-8">
                  <div aria-hidden className="flex text-[#ff9900]">
                    {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="w-5 h-5 fill-current" />)}
                  </div>
                  <span className="font-bold text-[#231a11]">
                    <span data-field="testimonials.ratingScore">{t.testimonials.ratingScore}</span>{' '}
                    <span data-field="testimonials.ratingCount">{t.testimonials.ratingCount}</span>
                  </span>
                </div>
                <a data-field="testimonials.ctaGoogle" href={t.contact.mapUrl || '#contact'} className="flex items-center gap-2 text-[#a63b00] font-bold hover:underline">
                  {t.testimonials.ctaGoogle} <ArrowUpRight aria-hidden className="w-4 h-4" />
                </a>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.testimonials.items.map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-[#887361]/5 hover:-translate-y-1 transition-transform">
                    <p data-field={`testimonials.items.${i}.quote`} className="text-[#554434] italic mb-6">&ldquo;{item.quote}&rdquo;</p>
                    <div className="flex items-center gap-4">
                      <div aria-hidden className="w-12 h-12 rounded-full bg-[#f1dfd1] flex items-center justify-center text-[#8a5100] font-bold">
                        {item.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <h5 data-field={`testimonials.items.${i}.name`} className="font-bold text-[#231a11]">{item.name}</h5>
                        <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#554434]">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact + Map */}
        <section data-section="contact" className="py-24 bg-[#fff8f4]" id="contact">
          <div className="px-6 lg:px-16 max-w-screen-2xl mx-auto">
            <div className="bg-[#fdebdc] rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
              <div className="lg:w-1/2 p-10 lg:p-16">
                <h2 data-field="contact.title" className="font-lexend text-3xl font-semibold text-[#231a11] mb-8">{t.contact.title}</h2>
                <div className="space-y-8">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone', extra: t.contact.email },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri] ?? MapPin;
                    return (
                      <div key={row.valueField} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#8a5100]/10 rounded-full flex items-center justify-center text-[#8a5100] shrink-0">
                          <RowIcon aria-hidden className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-1 text-[#231a11]">{row.label}</h4>
                          <p data-field={row.valueField} className="text-[#554434]">{row.value}</p>
                          {row.extra && <p data-field="contact.email" className="text-[#554434]">{row.extra}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-10">
                  <a data-track="call" href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                    className="inline-block px-8 py-3 rounded-lg bg-[#a63b00] text-white font-bold hover:opacity-90 transition-all">
                    {t.contact.phoneLabel}: {t.contact.phone}
                  </a>
                </div>
                <div className="mt-8 flex gap-4">
                  <a aria-label="Facebook" className="w-10 h-10 border border-[#887361]/20 rounded-full flex items-center justify-center text-[#554434] hover:bg-[#a63b00] hover:text-white transition-all" href="#">
                    <Facebook aria-hidden className="w-4 h-4" />
                  </a>
                  <a aria-label="Instagram" className="w-10 h-10 border border-[#887361]/20 rounded-full flex items-center justify-center text-[#554434] hover:bg-[#a63b00] hover:text-white transition-all" href="#">
                    <Instagram aria-hidden className="w-4 h-4" />
                  </a>
                  <a aria-label="Zalo" className="w-10 h-10 border border-[#887361]/20 rounded-full flex items-center justify-center text-[#554434] hover:bg-[#a63b00] hover:text-white transition-all" href="#">
                    <MessageCircle aria-hidden className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2 h-100 lg:h-auto min-h-100 relative">
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
                  <div className="w-full h-full relative grayscale hover:grayscale-0 transition-all duration-700">
                    <img className="w-full h-full object-cover" src={IMG.mapImg} alt={t.contact.address} loading="lazy" />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center flex-col gap-2">
                      <div className="bg-white/90 p-3 rounded-full shadow-lg">
                        <MapPin aria-hidden className="w-8 h-8 text-[#8a5100]" />
                      </div>
                      <p className="text-xs font-bold text-[#231a11] bg-white/90 px-3 py-1 rounded-full">{t.contact.address}</p>
                    </div>
                    <div className="absolute top-8 right-8 bg-white p-4 rounded-xl shadow-lg border border-[#887361]/5 max-w-50">
                      <p data-field="contact.openNowLabel" className="text-xs font-bold text-[#8a5100] mb-2">{t.contact.openNowLabel}</p>
                      <p data-field="contact.openNowText" className="text-sm font-medium text-[#231a11]">{t.contact.openNowText}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#f1dfd1] border-t border-[#887361]/10 mt-20 pb-20 md:pb-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-16 py-8 gap-4 max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <div data-field="footer.brand" className="font-lexend text-xl font-semibold text-[#8a5100] mb-1">{t.footer.brand}</div>
            <p data-field="footer.tagline" className="text-xs text-[#554434]">{t.footer.tagline}</p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center text-sm">
            <a className="text-[#554434] hover:text-[#a63b00] hover:underline transition-all" href="#">{t.footer.privacy}</a>
            <a className="text-[#554434] hover:text-[#a63b00] hover:underline transition-all" href="#">{t.footer.terms}</a>
            <a className="text-[#554434] hover:text-[#a63b00] hover:underline transition-all" href="#">{t.footer.support}</a>
          </div>
          <div data-field="footer.copy" className="text-xs text-[#554434]">{t.footer.copy}</div>
        </div>
      </footer>

      {/* Mobile bottom nav */}
      <div data-section="mobileNav" className="md:hidden fixed bottom-0 left-0 right-0 bg-[#fff8f4]/95 backdrop-blur-xl border-t border-[#887361]/10 z-100 px-6 py-2 flex justify-between items-center">
        <a className="flex flex-col items-center gap-0.5 text-[#a63b00] font-bold" href="#menu">
          <UtensilsCrossed aria-hidden className="w-5 h-5" />
          <span className="text-[10px]">{t.mobileNav.menu}</span>
        </a>
        <a className="flex flex-col items-center gap-0.5 text-[#554434]" href="#space">
          <Armchair aria-hidden className="w-5 h-5" />
          <span className="text-[10px]">{t.mobileNav.space}</span>
        </a>
        <div className="relative -top-6">
          <button data-track="order" aria-label={t.nav.orderNow} className="w-14 h-14 bg-[#ff5e00] text-white rounded-full shadow-[0_8px_24px_rgba(255,94,0,0.4)] flex items-center justify-center cursor-pointer">
            <ShoppingCart aria-hidden className="w-6 h-6" />
          </button>
        </div>
        <a className="flex flex-col items-center gap-0.5 text-[#554434]" href="#reviews">
          <Star aria-hidden className="w-5 h-5" />
          <span className="text-[10px]">{t.mobileNav.reviews}</span>
        </a>
        <a className="flex flex-col items-center gap-0.5 text-[#554434]" href="#contact">
          <MapIcon aria-hidden className="w-5 h-5" />
          <span className="text-[10px]">{t.mobileNav.direction}</span>
        </a>
      </div>
    </div>
  );
}
