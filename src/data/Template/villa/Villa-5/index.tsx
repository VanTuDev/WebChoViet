import {
  Wifi,
  Waves,
  Car,
  UtensilsCrossed,
  Wind,
  Umbrella,
  Sailboat,
  ShieldCheck,
  MapPin,
  Phone,
  Clock,
  Star,
  Quote,
  MessageCircle,
  Facebook,
  ChevronDown,
  CalendarCheck,
} from 'lucide-react';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHeroBg from './images/heroBg.jpg';
import imgRoom1 from './images/room1.jpg';
import imgRoom2 from './images/room2.jpg';
import imgRoom3 from './images/room3.jpg';
import imgGallery1 from './images/gallery1.jpg';
import imgGallery2 from './images/gallery2.jpg';
import imgGallery3 from './images/gallery3.jpg';
import imgGallery4 from './images/gallery4.jpg';
import imgAvatar1 from './images/avatar1.jpg';
import imgAvatar2 from './images/avatar2.jpg';
import imgAvatar3 from './images/avatar3.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg: imgHeroBg,
  room1: imgRoom1,
  room2: imgRoom2,
  room3: imgRoom3,
  gallery1: imgGallery1,
  gallery2: imgGallery2,
  gallery3: imgGallery3,
  gallery4: imgGallery4,
  avatar1: imgAvatar1,
  avatar2: imgAvatar2,
  avatar3: imgAvatar3,
};

/** Icon minh hoạ theo thứ tự item — trang trí, không phải nội dung dịch */
const ROOM_IMAGES = ['room1', 'room2', 'room3'] as const;
const AMENITY_ICONS = [Wifi, Waves, Car, UtensilsCrossed, Wind, Umbrella, Sailboat, ShieldCheck];
const GALLERY_IMAGES = ['gallery1', 'gallery2', 'gallery3', 'gallery4'] as const;
const REVIEW_AVATARS = ['avatar1', 'avatar2', 'avatar3'] as const;
const CONTACT_ICONS = [MapPin, Phone, Clock];

export default function Villa5({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images } as Record<string, string>;

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a] antialiased overflow-x-hidden" style={{ fontFamily: 'Lexend, sans-serif' }}>

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/80 backdrop-blur-md">
        <nav className="flex justify-between items-center px-6 md:px-10 py-4 w-full max-w-7xl mx-auto">
          <span data-field="nav.brand" className="text-xl md:text-2xl font-light text-[#56642b] tracking-tight">{t.nav.brand}</span>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a className="font-medium text-[#56642b] border-b border-[#56642b] pb-1 uppercase tracking-wider text-xs" href="#home">{t.nav.linkHome}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors uppercase tracking-wider text-xs" href="#rooms">{t.nav.linkRooms}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors uppercase tracking-wider text-xs" href="#amenities">{t.nav.linkAmenities}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors uppercase tracking-wider text-xs" href="#gallery">{t.nav.linkGallery}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors uppercase tracking-wider text-xs" href="#contact">{t.nav.linkContact}</a>
          </div>
          <a
            data-track="cta_nav_book"
            data-field="nav.cta"
            href="#contact"
            className="bg-[#56642b] text-white px-5 md:px-6 py-2.5 rounded-full text-xs md:text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-all"
          >
            {t.nav.cta}
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-cover bg-center scale-105" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-[#1a1c1a]/35" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <Reveal as="h1" variant="fade-up" className="text-white text-4xl md:text-6xl font-light mb-6 leading-tight drop-shadow-lg">
              <span data-field="hero.titleLine1">{t.hero.titleLine1}</span>
              <br />
              <span data-field="hero.titleLine2">{t.hero.titleLine2}</span>
            </Reveal>
            <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={120} className="text-white/90 text-lg font-light mb-10 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </Reveal>
            <Reveal variant="fade-up" delay={240} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                data-track="cta_hero_book"
                data-field="hero.btnPrimary"
                href="#contact"
                className="bg-[#faf9f6] text-[#56642b] px-8 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-[#8a9a5b] hover:text-white transition-all duration-300"
              >
                {t.hero.btnPrimary}
              </a>
              <a
                data-field="hero.btnSecondary"
                href="#rooms"
                className="text-white border border-white/50 px-8 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                {t.hero.btnSecondary}
              </a>
            </Reveal>
          </div>
          <div aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </section>

        {/* Floating booking widget */}
        <div data-section="booking" id="booking" className="relative -mt-16 md:-mt-20 z-20 flex justify-center px-6">
          <Reveal
            variant="fade-up"
            className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(86,100,43,0.18)] w-full max-w-5xl flex flex-col md:flex-row gap-6 items-center border border-[#e9e8e5]"
          >
            <div className="flex-1 w-full space-y-1 text-center md:text-left">
              <p data-field="booking.priceLabel" className="text-[#46483c] text-xs uppercase tracking-widest">{t.booking.priceLabel}</p>
              <h3 className="text-[#56642b] text-2xl md:text-3xl font-light">
                <span data-field="booking.price">{t.booking.price}</span>
                <span data-field="booking.priceUnit" className="text-base text-[#46483c] font-light">{t.booking.priceUnit}</span>
              </h3>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 items-center">
              <div className="flex flex-col gap-1 w-full sm:w-44">
                <label data-field="booking.checkInLabel" className="text-xs text-[#46483c] ml-2">{t.booking.checkInLabel}</label>
                <input className="w-full bg-[#f4f3f1] border-none rounded-full px-4 py-3 text-sm focus:ring-1 focus:ring-[#8a9a5b] outline-none" type="date" />
              </div>
              <div className="flex flex-col gap-1 w-full sm:w-44">
                <label data-field="booking.checkOutLabel" className="text-xs text-[#46483c] ml-2">{t.booking.checkOutLabel}</label>
                <input className="w-full bg-[#f4f3f1] border-none rounded-full px-4 py-3 text-sm focus:ring-1 focus:ring-[#8a9a5b] outline-none" type="date" />
              </div>
            </div>
            <a
              data-track="cta_widget_book"
              data-field="booking.cta"
              href="#contact"
              className="w-full md:w-auto bg-[#56642b] text-white px-8 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <CalendarCheck aria-hidden className="w-4 h-4" />
              {t.booking.cta}
            </a>
          </Reveal>
        </div>

        {/* Rooms */}
        <section data-section="rooms" id="rooms" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
          <Reveal variant="fade-up" className="text-center mb-16">
            <span data-field="rooms.label" className="text-[#56642b] text-xs font-medium tracking-[0.2em] uppercase">{t.rooms.label}</span>
            <h2 data-field="rooms.title" className="text-3xl md:text-4xl font-light mt-3 text-[#1a1c1a]">{t.rooms.title}</h2>
            <p data-field="rooms.subtitle" className="text-[#46483c] font-light mt-4 max-w-xl mx-auto">{t.rooms.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.rooms.items.map((room, i) => {
              const imgKey = ROOM_IMAGES[i] ?? 'room1';
              return (
                <Reveal key={i} variant="fade-up" delay={i * 110} className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(86,100,43,0.1)] border border-[#e9e8e5] flex flex-col">
                  <div className="h-56 overflow-hidden">
                    <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src={IMG[imgKey]} alt={room.name} loading="lazy" />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 data-field={`rooms.items.${i}.name`} className="text-xl font-medium text-[#1a1c1a] mb-2">{room.name}</h3>
                    <p data-field={`rooms.items.${i}.desc`} className="text-[#46483c] text-sm font-light mb-4 flex-1">{room.desc}</p>
                    <div className="flex items-center gap-3 text-xs text-[#46483c] mb-6">
                      <span data-field={`rooms.items.${i}.area`} className="bg-[#f4f3f1] px-3 py-1 rounded-full">{room.area}</span>
                      <span data-field={`rooms.items.${i}.capacity`} className="bg-[#f4f3f1] px-3 py-1 rounded-full">{room.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span data-field={`rooms.items.${i}.price`} className="text-[#56642b] font-medium text-lg">{room.price}</span>
                        <span data-field={`rooms.items.${i}.unit`} className="text-xs text-[#46483c]">{room.unit}</span>
                      </div>
                      <a
                        data-field={`rooms.items.${i}.cta`}
                        href="#contact"
                        className="bg-[#f4f3f1] text-[#1a1c1a] hover:bg-[#56642b] hover:text-white px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300"
                      >
                        {room.cta}
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Amenities */}
        <section data-section="amenities" id="amenities" className="py-24 px-6 md:px-10 bg-[#f4f3f1]">
          <div className="max-w-7xl mx-auto">
            <Reveal variant="fade-up" className="text-center mb-16">
              <span data-field="amenities.label" className="text-[#56642b] text-xs font-medium tracking-[0.2em] uppercase">{t.amenities.label}</span>
              <h2 data-field="amenities.title" className="text-3xl md:text-4xl font-light mt-3 text-[#1a1c1a]">{t.amenities.title}</h2>
              <p data-field="amenities.subtitle" className="text-[#46483c] font-light mt-4 max-w-xl mx-auto">{t.amenities.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.amenities.items.map((item, i) => {
                const AmenityIcon = AMENITY_ICONS[i] ?? Wifi;
                return (
                  <Reveal key={i} variant="fade-up" delay={i * 70} className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-[0_10px_30px_-10px_rgba(86,100,43,0.1)]">
                    <div className="w-12 h-12 rounded-full bg-[#e0e5d4] flex items-center justify-center">
                      <AmenityIcon aria-hidden className="w-5 h-5 text-[#56642b]" />
                    </div>
                    <span data-field={`amenities.items.${i}.label`} className="text-sm text-[#1a1c1a] font-light">{item.label}</span>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" id="gallery" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
          <Reveal variant="fade-up" className="text-center mb-16">
            <span data-field="gallery.label" className="text-[#56642b] text-xs font-medium tracking-[0.2em] uppercase">{t.gallery.label}</span>
            <h2 data-field="gallery.title" className="text-3xl md:text-4xl font-light mt-3 text-[#1a1c1a]">{t.gallery.title}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[640px]">
            {t.gallery.items.map((g, i) => {
              const imgKey = GALLERY_IMAGES[i] ?? 'gallery1';
              const spanClass =
                i === 0
                  ? 'md:col-span-2 md:row-span-2 h-64 md:h-auto'
                  : i === 1
                    ? 'md:col-span-2 md:row-span-1 h-52 md:h-auto'
                    : 'md:col-span-1 md:row-span-1 h-52 md:h-auto';
              return (
                <Reveal key={i} variant="zoom-in" delay={i * 90} className={`relative group overflow-hidden rounded-2xl bg-[#e9e8e5] ${spanClass}`}>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={IMG[imgKey]} alt={g.caption} loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span data-field={`gallery.items.${i}.caption`} className="text-sm font-medium">{g.caption}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-24 px-6 md:px-10 bg-[#f4f3f1]">
          <div className="max-w-7xl mx-auto">
            <Reveal variant="fade-up" className="text-center mb-16">
              <span data-field="testimonials.label" className="text-[#56642b] text-xs font-medium tracking-[0.2em] uppercase">{t.testimonials.label}</span>
              <h2 data-field="testimonials.title" className="text-3xl md:text-4xl font-light mt-3 text-[#1a1c1a]">{t.testimonials.title}</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.testimonials.items.map((item, i) => {
                const avatarSrc = IMG[REVIEW_AVATARS[i] as keyof typeof IMG] ?? IMG.avatar1;
                const rating = item.rating ?? 5;
                return (
                  <Reveal key={i} variant="fade-up" delay={i * 120} className="bg-white p-8 md:p-10 rounded-3xl border border-[#e9e8e5] relative shadow-[0_10px_30px_-10px_rgba(86,100,43,0.08)]">
                    <Quote aria-hidden className="w-8 h-8 text-[#8a9a5b]/40 absolute -top-4 left-8 bg-white p-1 rounded-full" />
                    <div className="flex gap-1 text-[#56642b] mb-4">
                      {[0, 1, 2, 3, 4].map(s => (
                        <Star key={s} aria-hidden className="w-4 h-4" fill={s < rating ? '#56642b' : 'none'} strokeWidth={1.5} />
                      ))}
                    </div>
                    <p data-field={`testimonials.items.${i}.quote`} className="text-[#1a1c1a] italic font-light mb-8 leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={avatarSrc} alt={item.name} loading="lazy" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h5 data-field={`testimonials.items.${i}.name`} className="font-medium text-[#1a1c1a] text-sm">{item.name}</h5>
                        <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#46483c]">{item.role}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact & Map */}
        <section data-section="contact" id="contact" className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
          <Reveal variant="fade-up" duration={800} className="bg-[#8a9a5b]/10 rounded-3xl overflow-hidden flex flex-col md:flex-row gap-10 md:gap-12 p-8 md:p-12">
            <div className="w-full md:w-1/2 flex flex-col">
              <h2 data-field="contact.title" className="text-2xl md:text-3xl font-light text-[#56642b] mb-4">{t.contact.title}</h2>
              <p data-field="contact.subtitle" className="text-[#46483c] font-light mb-8">{t.contact.subtitle}</p>
              <div className="space-y-6">
                {([
                  { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                  { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                  { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                ]).map((row, ri) => {
                  const RowIcon = CONTACT_ICONS[ri] ?? MapPin;
                  return (
                    <div key={row.valueField} className="flex items-start gap-4">
                      <RowIcon aria-hidden className="w-5 h-5 text-[#56642b] p-3 bg-white rounded-full box-content" />
                      <div>
                        <p className="text-xs text-[#46483c] uppercase tracking-widest">{row.label}</p>
                        <p data-field={row.valueField} className="text-[#1a1c1a] font-light">{row.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  data-track="cta_call"
                  data-field="contact.btnCall"
                  href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 bg-[#56642b] text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-all"
                >
                  <Phone aria-hidden className="w-4 h-4" />
                  {t.contact.btnCall}
                </a>
                <a
                  data-track="cta_book_contact"
                  data-field="contact.btnBook"
                  href="#booking"
                  className="inline-flex items-center gap-2 bg-white text-[#1a1c1a] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#56642b] hover:text-white transition-all shadow-[0_10px_30px_-10px_rgba(86,100,43,0.15)]"
                >
                  <CalendarCheck aria-hidden className="w-4 h-4" />
                  {t.contact.btnBook}
                </a>
                <a
                  data-track="cta_zalo"
                  data-field="contact.zalo"
                  href="#"
                  className="inline-flex items-center gap-2 bg-white text-[#1a1c1a] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#56642b] hover:text-white transition-all shadow-[0_10px_30px_-10px_rgba(86,100,43,0.15)]"
                >
                  <MessageCircle aria-hidden className="w-4 h-4" />
                  {t.contact.zalo}
                </a>
                <a
                  data-field="contact.facebook"
                  href="#"
                  className="inline-flex items-center gap-2 bg-white text-[#1a1c1a] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#1877F2] hover:text-white transition-all shadow-[0_10px_30px_-10px_rgba(86,100,43,0.15)]"
                >
                  <Facebook aria-hidden className="w-4 h-4" />
                  {t.contact.facebook}
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-80 md:h-auto rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(86,100,43,0.18)]">
              {t.contact.mapUrl ? (
                <iframe
                  src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full bg-white flex items-center justify-center flex-col gap-3 px-6 text-center">
                  <MapPin aria-hidden className="w-14 h-14 text-[#56642b]" />
                  <p className="text-sm font-medium text-[#46483c]">{t.contact.mapLoading}</p>
                  <p className="text-sm text-[#46483c] font-light">{t.contact.address}</p>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-white border-t border-[#e9e8e5] mt-4">
        <Reveal variant="fade" className="max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs space-y-3">
            <span data-field="footer.brand" className="text-2xl font-light text-[#56642b]">{t.footer.brand}</span>
            <p data-field="footer.tagline" className="text-[#46483c] text-sm font-light">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-16">
            <div className="space-y-4">
              <h6 data-field="footer.exploreTitle" className="text-xs uppercase tracking-wider font-semibold text-[#1a1c1a]">{t.footer.exploreTitle}</h6>
              <ul className="space-y-2">
                {t.footer.exploreLinks.map((link, i) => (
                  <li key={i}>
                    <a data-field={`footer.exploreLinks.${i}`} className="text-[#46483c] hover:text-[#56642b] transition-colors text-sm font-light" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h6 data-field="footer.infoTitle" className="text-xs uppercase tracking-wider font-semibold text-[#1a1c1a]">{t.footer.infoTitle}</h6>
              <ul className="space-y-2">
                {t.footer.infoLinks.map((link, i) => (
                  <li key={i}>
                    <a data-field={`footer.infoLinks.${i}`} className="text-[#46483c] hover:text-[#56642b] transition-colors text-sm font-light" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <div className="border-t border-[#e9e8e5] px-6 md:px-10 py-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p data-field="footer.copy" className="text-[#46483c] text-sm font-light">{t.footer.copy}</p>
          <div className="flex items-center gap-3">
            <a aria-label={t.contact.zalo} className="w-9 h-9 rounded-full bg-[#f4f3f1] flex items-center justify-center text-[#56642b] hover:bg-[#56642b] hover:text-white transition-all" href="#">
              <MessageCircle aria-hidden className="w-4 h-4" />
            </a>
            <a aria-label={t.contact.facebook} className="w-9 h-9 rounded-full bg-[#f4f3f1] flex items-center justify-center text-[#56642b] hover:bg-[#56642b] hover:text-white transition-all" href="#">
              <Facebook aria-hidden className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile quick-call FAB */}
      <a
        data-track="cta_fab_call"
        aria-label={t.contact.btnCall}
        href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
        className="fixed bottom-6 right-6 bg-[#56642b] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-40 md:hidden"
      >
        <Phone aria-hidden className="w-7 h-7" />
      </a>
    </div>
  );
}
