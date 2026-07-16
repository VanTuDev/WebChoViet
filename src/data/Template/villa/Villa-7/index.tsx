import {
  Wifi,
  Car,
  UtensilsCrossed,
  Wind,
  Trees,
  Bus,
  ShieldCheck,
  Waves,
  Leaf,
  Users,
  MapPin,
  Clock,
  Phone,
  Star,
  Quote,
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
import imgIntroImg from './images/introImg.jpg';
import imgRoomFeatured from './images/roomFeatured.jpg';
import imgRoom1 from './images/room1.jpg';
import imgRoom2 from './images/room2.jpg';
import imgRoom3 from './images/room3.jpg';
import imgAmenitiesImg from './images/amenitiesImg.jpg';
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
  introImg: imgIntroImg,
  roomFeatured: imgRoomFeatured,
  room1: imgRoom1,
  room2: imgRoom2,
  room3: imgRoom3,
  amenitiesImg: imgAmenitiesImg,
  gallery1: imgGallery1,
  gallery2: imgGallery2,
  gallery3: imgGallery3,
  gallery4: imgGallery4,
  avatar1: imgAvatar1,
  avatar2: imgAvatar2,
  avatar3: imgAvatar3,
};

/** Icon/ảnh gán theo thứ tự item của mảng nội dung — trang trí, không lưu trong i18n */
const ROOM_IMAGES = ['room1', 'room2', 'room3'] as const;
const AMENITY_ICONS = [Wifi, Car, UtensilsCrossed, Wind, Trees, Bus, ShieldCheck, Waves];
const INTRO_ICONS = [Waves, Wifi, UtensilsCrossed, Leaf];
const CONTACT_ICONS = [MapPin, Clock, Phone];
const REVIEW_AVATARS = ['avatar1', 'avatar2', 'avatar3'] as const;

export default function Villa7({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="font-['Lexend'] bg-[#faf9f6] text-[#1a1c1a] antialiased overflow-x-hidden">

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/90 backdrop-blur-md">
        <nav className="flex justify-between items-center px-6 md:px-16 py-4 w-full max-w-7xl mx-auto">
          <span data-field="nav.brand" className="text-xl md:text-2xl font-semibold tracking-tight text-[#56642b]">{t.nav.brand}</span>
          <div className="hidden lg:flex items-center gap-8 text-sm">
            <a className="font-bold text-[#56642b] border-b-2 border-[#56642b] pb-1" href="#rooms">{t.nav.linkRooms}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#amenities">{t.nav.linkAmenities}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#gallery">{t.nav.linkGallery}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#reviews">{t.nav.linkReviews}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#contact">{t.nav.linkContact}</a>
          </div>
          <a
            data-track="cta_book_nav"
            data-field="nav.cta"
            href="#contact"
            className="bg-[#56642b] text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:opacity-90 active:scale-95 transition-all duration-300"
          >
            {t.nav.cta}
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-cover bg-center scale-105" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1a]/70 via-[#1a1c1a]/10 to-[#1a1c1a]/30" />
          </div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#d9eaa3]/20 rounded-full blur-3xl" />
          <div className="relative z-10 text-center px-6 md:px-16 max-w-4xl">
            <Reveal as="h1" data-field="hero.title" variant="fade-up" className="text-4xl md:text-6xl font-light leading-tight text-white mb-6 drop-shadow-lg">
              {t.hero.title}
            </Reveal>
            <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={120} className="text-base md:text-lg font-light text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </Reveal>
            <Reveal variant="fade-up" delay={240} className="flex flex-col md:flex-row gap-3 justify-center">
              <a
                data-track="cta_book_hero"
                data-field="hero.btnPrimary"
                href="#contact"
                className={`bg-[#56642b] text-white px-10 py-4 rounded-full text-sm font-medium shadow-[0_20px_50px_-10px_rgba(86,100,43,0.18)] hover:scale-105 transition-transform`}
              >
                {t.hero.btnPrimary}
              </a>
              <a data-field="hero.btnSecondary" href="#rooms"
                className="border-2 border-white text-white px-10 py-4 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-white/10 transition-all">
                {t.hero.btnSecondary}
              </a>
            </Reveal>
          </div>
        </section>

        {/* Intro */}
        <section data-section="intro" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <Reveal variant="zoom-in" className="lg:w-1/2 relative">
              <div className="absolute -top-8 -left-8 w-32 h-32 border border-[#56642b]/20 rounded-full opacity-50 hidden md:block" />
              <img
                src={IMG.introImg}
                alt={t.intro.title}
                loading="lazy"
                className={`rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(86,100,43,0.18)] w-full aspect-[4/5] object-cover relative z-10`}
              />
            </Reveal>
            <div className="lg:w-1/2 space-y-6">
              <span data-field="intro.label" className="text-[#56642b] text-sm font-medium tracking-[0.2em] uppercase">{t.intro.label}</span>
              <h2 data-field="intro.title" className="text-3xl md:text-4xl font-normal leading-snug">{t.intro.title}</h2>
              <p data-field="intro.desc" className="text-[#46483c] text-lg font-light leading-relaxed">{t.intro.desc}</p>
              <div className="grid grid-cols-2 gap-4 pt-3">
                {t.intro.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#e0e5d4] flex items-center justify-center text-[#56642b] shrink-0">
                      {(() => { const Icon = INTRO_ICONS[i] ?? Trees; return <Icon aria-hidden className="w-5 h-5" />; })()}
                    </div>
                    <span data-field={`intro.highlights.${i}`} className="text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rooms */}
        <section data-section="rooms" className="py-20 px-6 md:px-16 max-w-7xl mx-auto bg-[#f4f3f1] rounded-[3rem]" id="rooms">
          <Reveal variant="fade-up" className="text-center mb-16">
            <span data-field="rooms.label" className="text-[#56642b] text-sm font-medium tracking-[0.2em] uppercase">{t.rooms.label}</span>
            <h2 data-field="rooms.title" className="text-3xl md:text-4xl font-normal mt-3">{t.rooms.title}</h2>
            <p data-field="rooms.subtitle" className="text-[#46483c] font-light mt-3">{t.rooms.subtitle}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured room */}
            <Reveal
              variant="zoom-in"
              className={`md:col-span-3 relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(86,100,43,0.18)] group grid grid-cols-1 md:grid-cols-2`}
            >
              <div className="relative h-72 md:h-auto overflow-hidden">
                <img src={IMG.roomFeatured} alt={t.rooms.featured.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span data-field="rooms.featured.badge" className="absolute top-4 left-4 bg-[#56642b] text-white px-4 py-1.5 rounded-full text-xs font-medium">
                  {t.rooms.featured.badge}
                </span>
              </div>
              <div className="bg-white p-8 md:p-10 flex flex-col justify-center gap-4">
                <span data-field="rooms.featured.tag" className="text-xs font-medium text-[#56642b] uppercase tracking-widest">{t.rooms.featured.tag}</span>
                <h3 data-field="rooms.featured.name" className="text-2xl font-normal">{t.rooms.featured.name}</h3>
                <p data-field="rooms.featured.desc" className="text-[#46483c] font-light leading-relaxed">{t.rooms.featured.desc}</p>
                <div className="flex items-center gap-2 text-sm text-[#46483c]">
                  <Users aria-hidden className="w-4 h-4 text-[#56642b]" />
                  <span data-field="rooms.featured.capacity">{t.rooms.featured.capacity}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-[#c6c8b8]/50">
                  <span className="text-2xl font-medium text-[#56642b]">
                    <span data-field="rooms.featured.price">{t.rooms.featured.price}</span>
                    <span data-field="rooms.featured.unit" className="text-sm font-light text-[#46483c]">{t.rooms.featured.unit}</span>
                  </span>
                  <a data-track="cta_book_room" href="#contact" className="bg-[#56642b] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                    {t.rooms.label}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Standard items */}
            {t.rooms.items.map((room, i) => {
              const imgSrc = IMG[ROOM_IMAGES[i] as keyof typeof IMG] ?? IMG.room1;
              return (
                <Reveal key={i} variant="fade-up" delay={100 + i * 100} className={`bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(86,100,43,0.18)] flex flex-col group`}>
                  <div className="h-56 overflow-hidden relative">
                    <img src={imgSrc} alt={room.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <span data-field={`rooms.items.${i}.tag`} className="absolute top-4 right-4 bg-white/85 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#56642b]">
                      {room.tag}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h4 data-field={`rooms.items.${i}.name`} className="text-lg font-medium">{room.name}</h4>
                    <p data-field={`rooms.items.${i}.desc`} className="text-[#46483c] text-sm font-light flex-1">{room.desc}</p>
                    <div className="flex items-center gap-2 text-xs text-[#46483c]">
                      <Users aria-hidden className="w-4 h-4 text-[#56642b]" />
                      <span data-field={`rooms.items.${i}.capacity`}>{room.capacity}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-[#c6c8b8]/50">
                      <span className="font-medium text-[#56642b]">
                        <span data-field={`rooms.items.${i}.price`}>{room.price}</span>
                        <span data-field={`rooms.items.${i}.unit`} className="text-xs font-light text-[#46483c]">{room.unit}</span>
                      </span>
                      <a href="#contact" className="text-[#56642b] text-sm font-medium hover:underline">{t.gallery.viewMore}</a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Amenities */}
        <section data-section="amenities" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="amenities">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1 space-y-5">
              <span data-field="amenities.label" className="text-[#56642b] text-sm font-medium tracking-[0.2em] uppercase">{t.amenities.label}</span>
              <h2 data-field="amenities.title" className="text-3xl md:text-4xl font-normal">{t.amenities.title}</h2>
              <p data-field="amenities.desc" className="text-[#46483c] text-lg font-light leading-relaxed">{t.amenities.desc}</p>
            </div>
            <Reveal variant="zoom-in" className="order-1 lg:order-2">
              <img src={IMG.amenitiesImg} alt={t.amenities.title} loading="lazy" className={`rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(86,100,43,0.18)] w-full aspect-video object-cover`} />
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {t.amenities.items.map((item, i) => {
              const Icon = AMENITY_ICONS[i] ?? Wifi;
              return (
                <Reveal key={i} variant="fade-up" delay={i * 60} className="flex flex-col items-center text-center gap-3 bg-[#f4f3f1] rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#56642b] shadow-sm">
                    <Icon aria-hidden className="w-5 h-5" />
                  </div>
                  <span data-field={`amenities.items.${i}.label`} className="text-sm font-medium">{item.label}</span>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" className="py-20 bg-[#efeeeb] overflow-hidden" id="gallery">
          <Reveal variant="fade-up" className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between mb-16">
            <div>
              <span data-field="gallery.label" className="text-[#56642b] text-sm font-medium tracking-[0.2em] uppercase">{t.gallery.label}</span>
              <h2 data-field="gallery.title" className="text-3xl md:text-4xl font-normal mt-3">{t.gallery.title}</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#56642b] text-sm font-medium group hover:translate-x-2 transition-transform">
              <span data-field="gallery.viewMore">{t.gallery.viewMore}</span>
              <ArrowRight aria-hidden className="w-4 h-4" />
            </button>
          </Reveal>
          <div className="flex flex-nowrap md:grid md:grid-cols-4 gap-6 px-6 md:px-16 overflow-x-auto pb-4">
            {[IMG.gallery1, IMG.gallery2, IMG.gallery3, IMG.gallery4].map((src, i) => (
              <Reveal
                key={i}
                variant="zoom-in"
                delay={i * 90}
                className={`flex-none w-72 md:w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(86,100,43,0.18)] bg-[#c6c8b8] relative group ${i % 2 === 1 ? 'md:mt-16' : ''}`}
              >
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={src} alt={`${t.gallery.title} ${i + 1}`} loading="lazy" />
                <div className="absolute inset-0 bg-[#56642b]/10 group-hover:bg-transparent transition-colors" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="reviews">
          <Reveal variant="fade-up" className="text-center mb-16">
            <h2 data-field="testimonials.title" className="text-3xl md:text-4xl font-normal">{t.testimonials.title}</h2>
            <p data-field="testimonials.subtitle" className="text-[#46483c] font-light mt-3">{t.testimonials.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => {
              const avatarSrc = IMG[REVIEW_AVATARS[i] as keyof typeof IMG] ?? IMG.avatar1;
              const rating = item.rating ?? 5;
              return (
                <Reveal key={i} variant="fade-up" delay={i * 120} className={`bg-[#f4f3f1] p-8 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(86,100,43,0.18)] relative`}>
                  <Quote aria-hidden className="w-8 h-8 text-[#8a9a5b]/50 absolute -top-4 left-8 bg-[#faf9f6] p-1 rounded-full" />
                  <div className="flex gap-1 mb-4" aria-label={`${rating}/5`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} aria-hidden className={`w-4 h-4 ${s < rating ? 'fill-[#56642b] text-[#56642b]' : 'text-[#c6c8b8]'}`} />
                    ))}
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="font-light text-[#424845] mb-6 italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={avatarSrc} alt={item.name} loading="lazy" className="w-11 h-11 rounded-full object-cover border-2 border-[#8a9a5b]" />
                    <div>
                      <h4 data-field={`testimonials.items.${i}.name`} className="text-sm font-medium text-[#56642b]">{item.name}</h4>
                      <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#46483c]">{item.role}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Contact & Map */}
        <section data-section="contact" className="py-20 bg-[#f4f3f1]" id="contact">
          <div className="px-6 md:px-16 max-w-7xl mx-auto">
            <Reveal variant="fade-up" duration={800} className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-xl">
              <div className="p-8 md:p-16 md:w-1/2">
                <h2 data-field="contact.title" className="text-3xl font-normal mb-4">{t.contact.title}</h2>
                <p data-field="contact.subtitle" className="text-[#46483c] font-light mb-10">{t.contact.subtitle}</p>
                <div className="space-y-6">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri];
                    return (
                      <div key={row.valueField} className="flex items-start gap-4">
                        <RowIcon aria-hidden className="w-5 h-5 text-[#56642b] bg-[#e0e5d4] p-2 rounded-xl box-content" />
                        <div>
                          <h4 className="text-sm font-medium">{row.label}</h4>
                          <p data-field={row.valueField} className="text-[#46483c] font-light">{row.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    data-track="cta_book"
                    data-field="contact.btnBook"
                    href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                    className="inline-block bg-[#56642b] text-white text-sm font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all"
                  >
                    {t.contact.btnBook}
                  </a>
                  <a
                    data-track="cta_call"
                    data-field="contact.btnCall"
                    href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 border-2 border-[#56642b] text-[#56642b] text-sm font-medium px-8 py-3 rounded-full hover:bg-[#e0e5d4] transition-all"
                  >
                    <Phone aria-hidden className="w-4 h-4" />
                    {t.contact.btnCall}
                  </a>
                  <a
                    data-track="cta_zalo"
                    className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                    href="#"
                    aria-label={t.footer.zalo}
                  >
                    <MessageCircle aria-hidden className="w-5 h-5" />
                  </a>
                  <a
                    className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                    href="#"
                    aria-label={t.footer.facebook}
                  >
                    <Facebook aria-hidden className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 h-96 md:h-auto relative bg-[#e3e2e0]">
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
                    <MapPin aria-hidden className="w-14 h-14 text-[#56642b]" />
                    <p className="text-sm font-medium text-[#46483c]">{t.contact.mapLoading}</p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#faf9f6] py-10 mt-4">
        <Reveal variant="fade" className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 w-full max-w-7xl mx-auto border-t border-[#c6c8b8]/40 pt-10 gap-6">
          <div className="text-center md:text-left">
            <span data-field="footer.brand" className="text-xl font-semibold text-[#56642b]">{t.footer.brand}</span>
            <p data-field="footer.tagline" className="text-[#46483c] text-sm font-light">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-[#46483c] text-sm hover:text-[#56642b] underline transition-colors" href="#">{t.footer.privacy}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] underline transition-colors" href="#">{t.footer.terms}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] underline transition-colors" href="#">{t.footer.zalo}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] underline transition-colors" href="#">{t.footer.facebook}</a>
          </div>
          <p data-field="footer.copy" className="text-[#46483c] text-xs opacity-70 text-center md:text-right">{t.footer.copy}</p>
        </Reveal>
      </footer>

      {/* Mobile quick-book FAB */}
      <a
        data-track="cta_fab_book"
        href="#contact"
        aria-label={t.hero.btnPrimary}
        className="fixed bottom-6 right-6 bg-[#56642b] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-40 md:hidden"
      >
        <Waves aria-hidden className="w-7 h-7" />
      </a>
    </div>
  );
}
