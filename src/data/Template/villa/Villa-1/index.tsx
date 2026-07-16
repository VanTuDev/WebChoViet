import {
  Wifi,
  Waves,
  Car,
  UtensilsCrossed,
  Wind,
  ShieldCheck,
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
  Quote,
  CalendarCheck,
  Facebook,
  MessageCircle,
  ArrowRight,
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
import imgRoomZenGarden from './images/roomZenGarden.jpg';
import imgRoomPoolSuite from './images/roomPoolSuite.jpg';
import imgRoomFamilyVilla from './images/roomFamilyVilla.jpg';
import imgRoomSkyLoft from './images/roomSkyLoft.jpg';
import imgGalleryExterior from './images/galleryExterior.jpg';
import imgGalleryInterior from './images/galleryInterior.jpg';
import imgGalleryArchitecture from './images/galleryArchitecture.jpg';
import imgGalleryPoolNight from './images/galleryPoolNight.jpg';
import imgWelcomeTray from './images/welcomeTray.jpg';
import imgAvatar1 from './images/avatar1.jpg';
import imgAvatar2 from './images/avatar2.jpg';
import imgAvatar3 from './images/avatar3.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg: imgHeroBg,
  roomZenGarden: imgRoomZenGarden,
  roomPoolSuite: imgRoomPoolSuite,
  roomFamilyVilla: imgRoomFamilyVilla,
  roomSkyLoft: imgRoomSkyLoft,
  galleryExterior: imgGalleryExterior,
  galleryInterior: imgGalleryInterior,
  galleryArchitecture: imgGalleryArchitecture,
  galleryPoolNight: imgGalleryPoolNight,
  welcomeTray: imgWelcomeTray,
  avatar1: imgAvatar1,
  avatar2: imgAvatar2,
  avatar3: imgAvatar3,
};

/** Icon tiện nghi & phòng — gán theo thứ tự mảng nội dung, không lưu trong i18n */
const AMENITY_ICONS = [Wifi, Waves, Car, UtensilsCrossed, Wind, ShieldCheck];
const ROOM_IMAGE_KEYS = ['roomZenGarden', 'roomPoolSuite', 'roomFamilyVilla', 'roomSkyLoft'] as const;
const GALLERY_IMAGE_KEYS = ['galleryExterior', 'galleryInterior', 'galleryArchitecture', 'galleryPoolNight'] as const;
const REVIEW_AVATARS = ['avatar1', 'avatar2', 'avatar3'] as const;
const CONTACT_ICONS = [MapPin, Phone, Mail];

export default function Villa1({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images } as Record<string, string>;

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a] font-sans antialiased overflow-x-hidden" style={{ fontFamily: 'Lexend, sans-serif' }}>

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 left-0 w-full z-50 bg-[#faf9f6]/80 backdrop-blur-md">
        <nav className="flex justify-between items-center px-6 md:px-10 py-5 max-w-[1440px] mx-auto">
          <span data-field="nav.brand" className="text-2xl font-light text-[#56642b] tracking-tight">{t.nav.brand}</span>
          <div className="hidden lg:flex items-center gap-10">
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#amenities">{t.nav.linkAmenities}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#rooms">{t.nav.linkRooms}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#gallery">{t.nav.linkGallery}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#reviews">{t.nav.linkReviews}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#contact">{t.nav.linkContact}</a>
          </div>
          <a
            data-track="cta_book"
            data-field="nav.cta"
            href="#contact"
            className="bg-[#56642b] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            {t.nav.cta}
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-cover bg-center scale-105" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <Reveal as="span" data-field="hero.badge" variant="fade-up" className="inline-block bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              {t.hero.badge}
            </Reveal>
            <Reveal as="h1" data-field="hero.title" variant="fade-up" delay={80} className="text-4xl md:text-6xl font-light leading-tight text-white mb-6 drop-shadow-lg">
              {t.hero.title}
            </Reveal>
            <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={160} className="text-lg font-light text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md">
              {t.hero.subtitle}
            </Reveal>
            <Reveal variant="fade-up" delay={240} className="flex flex-col md:flex-row items-center justify-center gap-3">
              <a data-field="hero.btnPrimary" href="#rooms"
                className="bg-[#56642b] text-white px-10 py-4 rounded-full text-sm font-medium shadow-[0_10px_40px_-10px_rgba(86,100,43,0.5)] hover:opacity-90 transition-all">
                {t.hero.btnPrimary}
              </a>
              <a data-track="cta_book" data-field="hero.btnSecondary" href="#contact"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full text-sm font-medium hover:bg-white/20 transition-all">
                {t.hero.btnSecondary}
              </a>
            </Reveal>
          </div>
        </section>

        {/* Floating booking card — không bọc Reveal vì phần tử fixed (xem _shared/README.md) */}
        <aside data-section="booking" className="fixed bottom-8 right-8 z-40 w-full max-w-[300px] hidden lg:block">
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_40px_-10px_rgba(86,100,43,0.25)] border border-[#c6c8b8]/30">
            <div className="mb-4">
              <span data-field="booking.priceLabel" className="text-[#46483c] text-xs font-medium uppercase tracking-widest">{t.booking.priceLabel}</span>
              <div className="text-[#56642b] text-2xl font-light mt-1">
                <span data-field="booking.priceValue">{t.booking.priceValue}</span>{' '}
                <span data-field="booking.priceSuffix" className="text-[#46483c] text-base">{t.booking.priceSuffix}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 mb-5">
              <MapPin aria-hidden className="w-4 h-4 text-[#56642b] mt-0.5 shrink-0" />
              <span data-field="booking.location" className="text-[#46483c] text-sm">{t.booking.location}</span>
            </div>
            <a
              data-track="cta_book"
              data-field="booking.btnBook"
              href="#contact"
              className="block text-center w-full bg-[#56642b] text-white py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300"
            >
              {t.booking.btnBook}
            </a>
          </div>
        </aside>

        {/* Amenities */}
        <section data-section="amenities" id="amenities" className="py-20 px-6 md:px-10 max-w-[1440px] mx-auto">
          <Reveal variant="fade-up" className="text-center mb-14">
            <span data-field="amenities.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.amenities.label}</span>
            <h2 data-field="amenities.title" className="text-3xl md:text-4xl font-light mt-3 text-[#1a1c1a]">{t.amenities.title}</h2>
            <p data-field="amenities.subtitle" className="text-[#46483c] max-w-xl mx-auto mt-4 font-light">{t.amenities.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {t.amenities.items.map((item, i) => {
              const Icon = AMENITY_ICONS[i] ?? Wifi;
              return (
                <Reveal key={i} variant="fade-up" delay={i * 80} className="bg-[#f4f3f1] hover:bg-[#efeeeb] transition-colors p-6 rounded-[1.5rem] text-center group">
                  <div className="w-14 h-14 bg-[#8a9a5b]/15 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon aria-hidden className="w-6 h-6 text-[#56642b]" />
                  </div>
                  <h3 data-field={`amenities.items.${i}.title`} className="text-sm font-medium text-[#1a1c1a] mb-1">{item.title}</h3>
                  <p data-field={`amenities.items.${i}.desc`} className="text-xs text-[#46483c] font-light leading-relaxed">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Rooms */}
        <section data-section="rooms" id="rooms" className="py-20 px-6 md:px-10 max-w-[1440px] mx-auto">
          <Reveal variant="fade-up" className="text-center mb-14">
            <span data-field="rooms.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.rooms.label}</span>
            <h2 data-field="rooms.title" className="text-3xl md:text-4xl font-light mt-3 text-[#1a1c1a]">{t.rooms.title}</h2>
            <p data-field="rooms.subtitle" className="text-[#46483c] max-w-2xl mx-auto mt-4 font-light leading-relaxed">{t.rooms.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.rooms.items.map((room, i) => {
              const imgSrc = IMG[ROOM_IMAGE_KEYS[i] ?? 'roomZenGarden'] ?? IMG.roomZenGarden;
              return (
                <Reveal key={i} variant="fade-up" delay={i * 100} className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(86,100,43,0.15)] border border-[#c6c8b8]/20 flex flex-col group">
                  <div className="h-48 overflow-hidden">
                    <img src={imgSrc} alt={room.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 data-field={`rooms.items.${i}.name`} className="text-lg font-medium text-[#56642b] mb-2">{room.name}</h3>
                    <p data-field={`rooms.items.${i}.desc`} className="text-sm text-[#46483c] font-light leading-relaxed flex-1">{room.desc}</p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#c6c8b8]/30">
                      <div className="flex items-center gap-1.5 text-xs text-[#46483c]">
                        <Users aria-hidden className="w-3.5 h-3.5" />
                        <span data-field={`rooms.items.${i}.capacity`}>{room.capacity}</span>
                      </div>
                      <div className="text-right">
                        <span data-field={`rooms.items.${i}.price`} className="font-medium text-[#56642b]">{room.price}</span>
                        <span className="text-[#46483c] text-xs">{t.booking.priceSuffix}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Welcome experience */}
        <section data-section="welcome" className="py-20 px-6 md:px-10 bg-[#f4f3f1]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal variant="fade-right">
              <span data-field="welcome.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase block mb-3">{t.welcome.label}</span>
              <h2 data-field="welcome.title" className="text-3xl md:text-4xl font-light text-[#1a1c1a] mb-6">{t.welcome.title}</h2>
              <p data-field="welcome.text" className="text-[#46483c] font-light leading-relaxed mb-8">{t.welcome.text}</p>
              <div className="p-6 border-l-4 border-[#56642b] bg-[#8a9a5b]/10 rounded-r-2xl">
                <Quote aria-hidden className="w-5 h-5 text-[#56642b] mb-2" />
                <p data-field="welcome.quote" className="italic text-[#46483c] font-light">{t.welcome.quote}</p>
              </div>
            </Reveal>
            <Reveal variant="zoom-in" delay={150} className="rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(86,100,43,0.2)] h-96">
              <img src={IMG.welcomeTray} alt={t.welcome.title} loading="lazy" className="w-full h-full object-cover" />
            </Reveal>
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" id="gallery" className="py-20 px-6 md:px-10 max-w-[1440px] mx-auto overflow-hidden">
          <Reveal variant="fade-up" className="flex flex-col md:flex-row items-end justify-between mb-14">
            <div>
              <span data-field="gallery.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.gallery.label}</span>
              <h2 data-field="gallery.title" className="text-3xl md:text-4xl font-light mt-3 text-[#1a1c1a]">{t.gallery.title}</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#56642b] text-sm font-medium group hover:translate-x-1 transition-transform mt-4 md:mt-0">
              <span data-field="gallery.viewMore">{t.gallery.viewMore}</span>
              <ArrowRight aria-hidden className="w-4 h-4" />
            </button>
          </Reveal>
          <div className="flex flex-nowrap md:grid md:grid-cols-4 gap-6 overflow-x-auto pb-4">
            {GALLERY_IMAGE_KEYS.map((key, i) => (
              <Reveal
                key={key}
                variant="zoom-in"
                delay={i * 90}
                className={`flex-none w-72 md:w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(86,100,43,0.2)] relative group ${i % 2 === 1 ? 'md:mt-16' : ''}`}
              >
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMG[key]} alt={t.gallery.items[i]?.alt ?? t.gallery.title} loading="lazy" />
                <div className="absolute inset-0 bg-[#56642b]/10 group-hover:bg-transparent transition-colors" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" id="reviews" className="py-20 px-6 md:px-10 max-w-[1440px] mx-auto">
          <Reveal variant="fade-up" className="text-center mb-14">
            <h2 data-field="testimonials.title" className="text-3xl md:text-4xl font-light text-[#1a1c1a]">{t.testimonials.title}</h2>
            <p data-field="testimonials.subtitle" className="text-[#46483c] mt-3 font-light max-w-xl mx-auto">{t.testimonials.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => {
              const avatarSrc = IMG[REVIEW_AVATARS[i] as keyof typeof IMG] ?? IMG.avatar1;
              const rating = Math.max(0, Math.min(5, item.rating));
              return (
                <Reveal key={i} variant="fade-up" delay={i * 120} className="bg-white p-8 rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(86,100,43,0.2)] border border-[#c6c8b8]/20 relative">
                  <Quote aria-hidden className="w-8 h-8 text-[#8a9a5b]/40 absolute -top-4 left-8 bg-[#faf9f6] p-1 rounded-full" />
                  <div className="flex gap-1 mb-4" aria-hidden>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`w-4 h-4 ${s < rating ? 'fill-[#56642b] text-[#56642b]' : 'text-[#c6c8b8]'}`} />
                    ))}
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="font-light text-[#46483c] mb-6 italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={avatarSrc} alt={item.name} loading="lazy" className="w-11 h-11 rounded-full object-cover border-2 border-[#8a9a5b]" />
                    <div>
                      <h3 data-field={`testimonials.items.${i}.name`} className="text-sm font-medium text-[#56642b]">{item.name}</h3>
                      <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#46483c]">{item.role}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Contact & Map */}
        <section data-section="contact" id="contact" className="py-20 px-6 md:px-10 bg-[#f4f3f1]">
          <Reveal variant="fade-up" className="text-center mb-14">
            <h2 data-field="contact.title" className="text-3xl md:text-4xl font-light text-[#1a1c1a]">{t.contact.title}</h2>
            <p data-field="contact.subtitle" className="text-[#46483c] mt-3 font-light">{t.contact.subtitle}</p>
          </Reveal>
          <div className="max-w-[1440px] mx-auto">
            <Reveal variant="fade-up" duration={800} className="bg-white rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_10px_40px_-10px_rgba(86,100,43,0.25)]">
              <div className="p-8 md:p-14 lg:w-2/5">
                <div className="space-y-6">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                    { label: t.contact.emailLabel, value: t.contact.email, valueField: 'contact.email' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri];
                    return (
                      <div key={row.valueField} className="flex items-start gap-4">
                        <RowIcon aria-hidden className="w-5 h-5 text-[#56642b] bg-[#8a9a5b]/15 p-2.5 rounded-full box-content shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-[#1a1c1a]">{row.label}</p>
                          <p data-field={row.valueField} className="text-[#46483c] font-light">{row.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    data-track="cta_call"
                    data-field="contact.btnCall"
                    href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                    className="inline-block bg-[#56642b] text-white text-sm font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-all"
                  >
                    {t.contact.btnCall}
                  </a>
                  <a
                    data-track="cta_book"
                    data-field="contact.btnBook"
                    href="#rooms"
                    className="inline-block border border-[#56642b] text-[#56642b] text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#56642b] hover:text-white transition-all"
                  >
                    {t.contact.btnBook}
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity" href="#" aria-label="Facebook">
                    <Facebook aria-hidden className="w-4 h-4" />
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity" href="#" aria-label="Zalo">
                    <MessageCircle aria-hidden className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="lg:w-3/5 h-96 lg:h-auto relative bg-[#e9e8e5]">
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
                  <div className="w-full h-full flex items-center justify-center flex-col gap-3">
                    <MapPin aria-hidden className="w-12 h-12 text-[#56642b]" />
                    <p className="text-sm font-medium text-[#46483c]">{t.contact.mapLoading}</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#efeeeb] py-12 rounded-t-[2rem]">
        <Reveal variant="fade" className="flex flex-col md:flex-row justify-between items-center px-6 md:px-10 w-full max-w-[1440px] mx-auto gap-6">
          <div className="text-center md:text-left">
            <span data-field="footer.brand" className="text-2xl font-light text-[#56642b]">{t.footer.brand}</span>
            <p data-field="footer.tagline" className="text-sm text-[#46483c] font-light mt-1">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-[#46483c] text-sm hover:text-[#56642b] transition-colors" href="#">{t.footer.privacy}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] transition-colors" href="#">{t.footer.terms}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] transition-colors" href="#contact">{t.footer.contact}</a>
          </div>
          <p data-field="footer.copy" className="text-[#46483c] text-xs font-light opacity-80">{t.footer.copy}</p>
        </Reveal>
      </footer>

      {/* Mobile Booking FAB */}
      <a
        data-track="cta_fab_book"
        data-field="booking.fabLabel"
        href="#contact"
        className="fixed bottom-6 left-6 right-6 lg:hidden z-50 bg-[#56642b] text-white py-4 rounded-full text-sm font-medium shadow-2xl flex items-center justify-center gap-2"
      >
        <CalendarCheck aria-hidden className="w-5 h-5" />
        {t.booking.fabLabel}
      </a>
    </div>
  );
}
