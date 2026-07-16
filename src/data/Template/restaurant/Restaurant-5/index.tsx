import { useState } from 'react';
import {
  Menu as MenuIcon, X, Home, UtensilsCrossed, Armchair, Star, MapPin, Phone, Mail,
  Clock, Flame, Flower2, Award, ArrowRight,
} from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroBg from './images/heroBg.jpg';
import imgBentoFlavor from './images/bentoFlavor.jpg';
import imgBentoSpace from './images/bentoSpace.jpg';
import imgMenu1 from './images/menu1.jpg';
import imgMenu2 from './images/menu2.jpg';
import imgMenu3 from './images/menu3.jpg';
import imgPaymentVisa from './images/paymentVisa.jpg';
import imgPaymentMc from './images/paymentMc.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg:     imgHeroBg,
  bentoFlavor:imgBentoFlavor,
  bentoSpace: imgBentoSpace,
  menu1:      imgMenu1,
  menu2:      imgMenu2,
  menu3:      imgMenu3,
  paymentVisa:imgPaymentVisa,
  paymentMc:  imgPaymentMc,
};

/** Icon liên hệ theo thứ tự address/phone/hours — trang trí, không phải nội dung dịch */
const CONTACT_ICONS = [MapPin, Phone, Clock];
/** Icon menu mobile-nav theo thứ tự home/menu/space/reviews/contact */
const MOBILE_NAV_ICONS = [Home, UtensilsCrossed, Armchair, Star, MapPin];

function SpiceLevel({ level }: { level: number }) {
  return (
    <div className="mt-4 flex items-center gap-1 text-[#a63b00]" aria-hidden>
      {[0, 1, 2].map(i => (
        <Flame key={i} className={`w-4 h-4 ${i < level ? 'fill-current' : 'opacity-25'}`} />
      ))}
    </div>
  );
}

export default function Restaurant5({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileLinks = [
    { key: 'home', label: t.mobileNav.home, href: '#' },
    { key: 'menu', label: t.mobileNav.menu, href: '#menu' },
    { key: 'space', label: t.mobileNav.space, href: '#space' },
    { key: 'reviews', label: t.mobileNav.reviews, href: '#reviews' },
    { key: 'contact', label: t.mobileNav.contact, href: '#contact' },
  ];

  return (
    <div className="bg-[#fff8f4] text-[#231a11] font-sans antialiased">

      {/* Header / Nav */}
      <header data-section="nav" className="bg-[#fff8f4]/95 backdrop-blur-md border-b border-[#887361]/10 sticky top-0 z-50 shadow-sm">
        <nav className="flex justify-between items-center px-6 md:px-16 py-3 max-w-screen-2xl mx-auto">
          <span data-field="nav.brand" className="font-lexend text-2xl font-bold text-[#8a5100]">{t.nav.brand}</span>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a className="text-[#a63b00] font-bold border-b-2 border-[#a63b00] pb-1" href="#menu">{t.nav.menu}</a>
            <a className="text-[#554434] hover:text-[#8a5100] transition-colors duration-300" href="#space">{t.nav.space}</a>
            <a className="text-[#554434] hover:text-[#8a5100] transition-colors duration-300" href="#reviews">{t.nav.reviews}</a>
            <a className="text-[#554434] hover:text-[#8a5100] transition-colors duration-300" href="#contact">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3">
            <a data-track="reserve" data-field="nav.bookTable" href="#reservations"
              className="hidden md:block px-6 py-2 bg-[#8a5100] text-white rounded-lg font-bold hover:bg-[#ff9900] transition-all active:scale-95">
              {t.nav.bookTable}
            </a>
            <a data-track="order" data-field="nav.orderNow" href="#menu"
              className="px-6 py-2 border-2 border-[#8a5100] text-[#8a5100] rounded-lg font-bold hover:bg-[#fff1e7] transition-all active:scale-95">
              {t.nav.orderNow}
            </a>
            <button aria-label="Menu" className="md:hidden flex items-center justify-center p-2 text-[#8a5100]" onClick={() => setMobileOpen(true)}>
              <MenuIcon aria-hidden className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-[#f7e5d7] shadow-xl flex flex-col p-4">
            <div className="flex items-center justify-between mb-8">
              <span className="font-lexend text-xl font-bold text-[#8a5100]">{t.nav.brand}</span>
              <button aria-label="Close" onClick={() => setMobileOpen(false)}>
                <X aria-hidden className="w-6 h-6 text-[#231a11]" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {mobileLinks.map((l, i) => {
                const Icon = MOBILE_NAV_ICONS[i] ?? Home;
                return (
                  <a key={l.key} href={l.href} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 p-3 text-[#554434] hover:bg-[#f1dfd1] rounded-lg transition-all">
                    <Icon aria-hidden className="w-5 h-5" />
                    <span className="text-sm font-medium">{l.label}</span>
                  </a>
                );
              })}
            </div>
            <div className="mt-auto">
              <a data-track="reserve" href="#reservations" onClick={() => setMobileOpen(false)}
                className="block text-center w-full py-4 bg-[#8a5100] text-white rounded-lg font-bold shadow-lg">
                {t.mobileNav.reserveNow}
              </a>
            </div>
          </aside>
        </div>
      )}

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="bg-cover bg-center w-full h-full" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f4] via-[#fff8f4]/40 to-transparent" />
          </div>
          <div className="relative z-10 px-6 md:px-16 max-w-screen-2xl mx-auto w-full">
            <div className="max-w-2xl">
              <span data-field="hero.badge" className="text-[#a63b00] font-bold uppercase tracking-widest text-sm mb-3 block">
                {t.hero.badge}
              </span>
              <h1 className="font-lexend text-4xl md:text-5xl font-bold text-[#231a11] leading-tight mb-4">
                <span data-field="hero.title">{t.hero.title}</span><br />
                <span data-field="hero.titleHighlight" className="text-[#8a5100]">{t.hero.titleHighlight}</span>
              </h1>
              <p data-field="hero.subtitle" className="text-lg text-[#554434] mb-8 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a data-track="reserve" data-field="hero.btnReserve" href="#reservations"
                  className="px-8 py-4 bg-[#8a5100] text-white rounded-lg font-bold text-lg hover:bg-[#ff9900] transition-all hover:shadow-xl hover:-translate-y-1">
                  {t.hero.btnReserve}
                </a>
                <a data-field="hero.btnMenu" href="#menu"
                  className="px-8 py-4 border-2 border-[#8a5100] text-[#8a5100] rounded-lg font-bold text-lg hover:bg-[#fff1e7] transition-all">
                  {t.hero.btnMenu}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bento feature section */}
        <section data-section="space" className="py-24 px-6 md:px-16 max-w-screen-2xl mx-auto" id="space">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <div className="group relative h-100 rounded-xl overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${IMG.bentoFlavor}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <h3 data-field="space.feature1.title" className="text-white font-lexend text-2xl font-semibold">{t.space.feature1.title}</h3>
                  <p data-field="space.feature1.desc" className="text-white/80">{t.space.feature1.desc}</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="bg-[#fdebdc] h-100 rounded-xl p-8 flex flex-col justify-center border border-[#887361]/5 relative overflow-hidden">
                <Flower2 aria-hidden className="absolute -right-6 -bottom-6 w-56 h-56 text-[#3b6934]/10" />
                <span data-field="space.feature2.badge" className="text-[#3b6934] font-bold text-sm mb-2">{t.space.feature2.badge}</span>
                <h3 data-field="space.feature2.title" className="font-lexend text-2xl font-semibold mb-3">{t.space.feature2.title}</h3>
                <p data-field="space.feature2.desc" className="text-[#554434] mb-6">{t.space.feature2.desc}</p>
                <a className="text-[#8a5100] font-bold flex items-center gap-2 group" href="#menu">
                  <span data-field="space.feature2.link">{t.space.feature2.link}</span>
                  <ArrowRight aria-hidden className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="bg-[#ff5e00]/10 h-75 rounded-xl p-8 flex flex-col border border-[#a63b00]/10">
                <Award aria-hidden className="w-9 h-9 text-[#a63b00] mb-4" />
                <h4 data-field="space.feature3.title" className="font-lexend text-2xl font-semibold text-[#531900] mb-2">{t.space.feature3.title}</h4>
                <p data-field="space.feature3.desc" className="text-[#554434]">{t.space.feature3.desc}</p>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="group relative h-75 rounded-xl overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${IMG.bentoSpace}')` }} />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-[#fff8f4]/90 backdrop-blur-md px-10 py-5 rounded-lg text-center shadow-2xl">
                    <span data-field="space.feature4.title" className="font-lexend text-2xl font-semibold text-[#8a5100]">{t.space.feature4.title}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section data-section="menu" className="py-24 bg-[#fff1e7]" id="menu">
          <div className="px-6 md:px-16 max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <div className="max-w-xl">
                <h2 data-field="menu.title" className="font-lexend text-3xl font-semibold text-[#231a11] mb-2">{t.menu.title}</h2>
                <div className="w-24 h-1 bg-[#8a5100] mb-4" />
                <p data-field="menu.subtitle" className="text-[#554434]">{t.menu.subtitle}</p>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto">
                {t.menu.filters.map((f, i) => (
                  <button key={i} data-field={`menu.filters.${i}`}
                    className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${i === 0 ? 'bg-[#a63b00] text-white' : 'hover:bg-[#f1dfd1] text-[#554434]'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.menu.items.map((item, i) => {
                const MENU_IMGS = [IMG.menu1, IMG.menu2, IMG.menu3];
                return (
                  <div key={i} className="group">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                      <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={MENU_IMGS[i]} alt={item.name} loading="lazy" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span data-field={`menu.items.${i}.tag`}
                          className="bg-[#3b6934] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 data-field={`menu.items.${i}.name`} className="font-lexend text-xl font-semibold group-hover:text-[#8a5100] transition-colors">{item.name}</h4>
                      <span data-field={`menu.items.${i}.price`} className="text-[#a63b00] font-bold shrink-0">{item.price}</span>
                    </div>
                    <p data-field={`menu.items.${i}.desc`} className="text-[#554434] text-sm line-clamp-2">{item.desc}</p>
                    <SpiceLevel level={item.spiceLevel} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reservation */}
        <section data-section="reservation" className="py-24 px-6 md:px-16 relative overflow-hidden" id="reservations">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#887361]/5">
            <div className="md:w-1/3 bg-[#8a5100] p-8 text-white flex flex-col justify-between">
              <div>
                <h3 data-field="reservation.title" className="font-lexend text-2xl font-semibold mb-3">{t.reservation.title}</h3>
                <p data-field="reservation.subtitle" className="opacity-90">{t.reservation.subtitle}</p>
              </div>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <Phone aria-hidden className="w-5 h-5" />
                  <span data-field="reservation.phone" className="text-sm font-medium">{t.reservation.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail aria-hidden className="w-5 h-5" />
                  <span data-field="reservation.email" className="text-sm font-medium">{t.reservation.email}</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#554434] font-bold uppercase">{t.reservation.nameLabel}</label>
                  <input className="bg-[#fff1e7] border border-[#887361]/10 rounded-lg p-3 focus:border-[#8a5100] focus:ring-1 focus:ring-[#8a5100] outline-none transition-all" placeholder={t.reservation.namePlaceholder} type="text" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#554434] font-bold uppercase">{t.reservation.phoneLabel}</label>
                  <input className="bg-[#fff1e7] border border-[#887361]/10 rounded-lg p-3 focus:border-[#8a5100] focus:ring-1 focus:ring-[#8a5100] outline-none transition-all" placeholder={t.reservation.phonePlaceholder} type="tel" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#554434] font-bold uppercase">{t.reservation.dateLabel}</label>
                  <input className="bg-[#fff1e7] border border-[#887361]/10 rounded-lg p-3 focus:border-[#8a5100] focus:ring-1 focus:ring-[#8a5100] outline-none transition-all" type="date" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#554434] font-bold uppercase">{t.reservation.guestsLabel}</label>
                  <select className="bg-[#fff1e7] border border-[#887361]/10 rounded-lg p-3 focus:border-[#8a5100] focus:ring-1 focus:ring-[#8a5100] outline-none transition-all">
                    {t.reservation.guestOptions.map((o, i) => <option key={i}>{o.label}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-xs text-[#554434] font-bold uppercase">{t.reservation.noteLabel}</label>
                  <textarea className="bg-[#fff1e7] border border-[#887361]/10 rounded-lg p-3 focus:border-[#8a5100] focus:ring-1 focus:ring-[#8a5100] outline-none transition-all" placeholder={t.reservation.notePlaceholder} rows={3} />
                </div>
                <button data-track="booking" className="sm:col-span-2 py-4 bg-[#8a5100] text-white rounded-lg font-bold hover:bg-[#ff9900] transition-all shadow-md active:scale-95 cursor-pointer" type="submit">
                  {t.reservation.submit}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-24 px-6 md:px-16 bg-[#fdebdc] overflow-hidden" id="reviews">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 data-field="testimonials.title" className="font-lexend text-3xl font-semibold mb-4">{t.testimonials.title}</h2>
              <div className="flex justify-center gap-1 text-[#8a5100]" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.testimonials.items.map((item, i) => (
                <div key={i} className="bg-[#fff8f4] p-8 rounded-xl shadow-sm border border-[#887361]/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div aria-hidden className="w-12 h-12 rounded-full bg-[#f1dfd1] flex items-center justify-center font-bold text-[#8a5100]">
                      {item.initials}
                    </div>
                    <div>
                      <h5 data-field={`testimonials.items.${i}.name`} className="font-bold">{item.name}</h5>
                      <span data-field={`testimonials.items.${i}.role`} className="text-xs text-[#554434]">{item.role}</span>
                    </div>
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="italic text-[#554434]">"{item.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact + Map */}
        <section data-section="contact" className="py-24 px-6 md:px-16 bg-[#fff8f4]" id="contact">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 data-field="contact.title" className="font-lexend text-3xl font-semibold text-[#231a11]">{t.contact.title}</h2>
              <div className="space-y-6">
                {([
                  { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                  { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                  { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                ]).map((row, ri) => {
                  const RowIcon = CONTACT_ICONS[ri];
                  return (
                    <div key={row.valueField} className="flex items-start gap-4">
                      <RowIcon aria-hidden className="w-5 h-5 mt-0.5 text-[#8a5100]" />
                      <div>
                        <h4 className="text-sm font-medium text-[#231a11]">{row.label}</h4>
                        <p data-field={row.valueField} className="text-[#554434]">{row.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a data-track="call" data-field="contact.btnCall" href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                className="inline-block bg-[#8a5100] text-white text-sm font-bold px-8 py-3 rounded-lg hover:bg-[#ff9900] transition-all">
                {t.contact.btnCall}
              </a>
            </div>
            <div className="rounded-xl overflow-hidden h-100 border border-[#887361]/10">
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
                <div className="w-full h-full bg-[#f1dfd1] flex items-center justify-center flex-col gap-3">
                  <MapPin aria-hidden className="w-14 h-14 text-[#8a5100]" />
                  <p className="text-sm font-medium text-[#554434]">{t.contact.mapLoading}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#f1dfd1] border-t border-[#887361]/10 text-[#231a11]">
        <div className="px-6 md:px-16 py-16 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="md:col-span-1">
              <h2 data-field="footer.brand" className="font-lexend text-2xl font-semibold text-[#8a5100] mb-4">{t.footer.brand}</h2>
              <p data-field="footer.desc" className="text-[#554434] mb-4">{t.footer.desc}</p>
            </div>
            <div>
              <h5 data-field="footer.exploreTitle" className="font-bold mb-4">{t.footer.exploreTitle}</h5>
              <ul className="space-y-2">
                {t.footer.exploreLinks.map((link, i) => (
                  <li key={i}><a data-field={`footer.exploreLinks.${i}`} className="text-[#554434] hover:text-[#a63b00] transition-all" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 data-field="footer.infoTitle" className="font-bold mb-4">{t.footer.infoTitle}</h5>
              <ul className="space-y-2">
                {t.footer.infoLinks.map((link, i) => (
                  <li key={i}><a data-field={`footer.infoLinks.${i}`} className="text-[#554434] hover:text-[#a63b00] transition-all" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 data-field="footer.contactTitle" className="font-bold mb-4">{t.footer.contactTitle}</h5>
              <p data-field="footer.address" className="text-[#554434] mb-2">{t.footer.address}</p>
              <p data-field="footer.hours" className="text-[#554434] mb-2">{t.footer.hours}</p>
              <p data-field="footer.hotline" className="text-[#8a5100] font-bold">{t.footer.hotline}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#887361]/10 gap-4">
            <span data-field="footer.copy" className="text-xs text-[#554434]">{t.footer.copy}</span>
            <div className="flex gap-6">
              <img alt="Visa" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" src={IMG.paymentVisa} loading="lazy" />
              <img alt="Mastercard" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" src={IMG.paymentMc} loading="lazy" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
