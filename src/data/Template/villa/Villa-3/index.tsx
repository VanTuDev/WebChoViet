import {
  ArrowRight,
  Car,
  Compass,
  Facebook,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  ShieldCheck,
  Star,
  TreePine,
  UtensilsCrossed,
  Users,
  Wifi,
  Wind,
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
import imgStoryImg from './images/storyImg.jpg';
import imgRoom1 from './images/room1.jpg';
import imgRoom2 from './images/room2.jpg';
import imgRoom3 from './images/room3.jpg';
import imgRoom4 from './images/room4.jpg';
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
  storyImg: imgStoryImg,
  room1: imgRoom1,
  room2: imgRoom2,
  room3: imgRoom3,
  room4: imgRoom4,
  gallery1: imgGallery1,
  gallery2: imgGallery2,
  gallery3: imgGallery3,
  gallery4: imgGallery4,
  avatar1: imgAvatar1,
  avatar2: imgAvatar2,
  avatar3: imgAvatar3,
};

/** Icon minh hoạ gán theo thứ tự mảng nội dung — trang trí, không lưu trong i18n */
const ROOM_IMAGE_KEYS = ['room1', 'room2', 'room3', 'room4'] as const;
const STORY_ICONS = [TreePine, Wind];
const AMENITY_ICONS = [Wifi, Car, UtensilsCrossed, Compass, ShieldCheck, Mountain];
const REVIEW_AVATARS = ['avatar1', 'avatar2', 'avatar3'] as const;
const CONTACT_ICONS = [MapPin, Users, Phone];

export default function Villa3({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a] antialiased overflow-x-hidden" style={{ fontFamily: 'Lexend, sans-serif' }}>

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/80 backdrop-blur-md">
        <nav className="flex justify-between items-center px-6 md:px-16 py-5 w-full max-w-7xl mx-auto">
          <span data-field="nav.brand" className="text-2xl font-light text-[#56642b] tracking-tighter">{t.nav.brand}</span>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a className="font-medium text-[#56642b] border-b-2 border-[#56642b] pb-1" href="#rooms">{t.nav.linkRooms}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors" href="#amenities">{t.nav.linkAmenities}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors" href="#gallery">{t.nav.linkGallery}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors" href="#reviews">{t.nav.linkReviews}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors" href="#contact">{t.nav.linkContact}</a>
          </div>
          <button data-track="cta_navbar" data-field="nav.cta" className="bg-[#56642b] text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 active:scale-95 transition-all cursor-pointer">
            {t.nav.cta}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#faf9f6]/10 to-[#faf9f6]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 text-center">
            <Reveal as="span" variant="fade-up" data-field="hero.badge" className="inline-block px-4 py-1.5 bg-[#56642b]/10 text-[#56642b] rounded-full text-xs font-medium tracking-widest uppercase mb-6">
              {t.hero.badge}
            </Reveal>
            <Reveal as="h1" variant="fade-up" delay={80} data-field="hero.title" className="text-4xl md:text-6xl font-light text-[#1a1c1a] mb-8 tracking-tight leading-tight">
              {t.hero.title}
            </Reveal>
            <Reveal as="p" variant="fade-up" delay={160} data-field="hero.subtitle" className="text-lg font-light text-[#46483c] mb-12 max-w-2xl mx-auto opacity-90">
              {t.hero.subtitle}
            </Reveal>
            <Reveal variant="fade-up" delay={240} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a data-track="cta_book_hero" data-field="hero.btnPrimary" href="#rooms"
                className="bg-[#56642b] text-white px-10 py-5 rounded-full text-sm font-medium shadow-[0_10px_40px_-10px_rgba(86,100,43,0.35)] hover:opacity-90 transition-all">
                {t.hero.btnPrimary}
              </a>
              <a data-field="hero.btnSecondary" href="#gallery"
                className="border border-[#76786b] text-[#1a1c1a] px-10 py-5 rounded-full text-sm font-medium hover:bg-[#efeeeb] transition-all">
                {t.hero.btnSecondary}
              </a>
            </Reveal>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
            <div className="w-8 h-8 rounded-full border border-[#56642b] animate-pulse" />
            <span data-field="hero.scrollHint" className="text-xs uppercase tracking-widest text-[#56642b]">{t.hero.scrollHint}</span>
          </div>
        </section>

        {/* Story */}
        <section data-section="story" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="story">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal variant="zoom-in" className="relative group">
              <div className="rounded-[2rem] overflow-hidden aspect-[4/5] shadow-[0_10px_40px_-10px_rgba(86,100,43,0.2)]">
                <img alt={t.story.imageCaptionTitle} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={IMG.storyImg} />
              </div>
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-[#faf9f6]/90 backdrop-blur-md p-8 rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(86,100,43,0.25)] hidden md:block max-w-xs border border-white/40">
                <h4 data-field="story.imageCaptionTitle" className="text-xl text-[#56642b] font-normal mb-2">{t.story.imageCaptionTitle}</h4>
                <p data-field="story.imageCaptionDesc" className="text-sm text-[#46483c] font-light">{t.story.imageCaptionDesc}</p>
              </div>
            </Reveal>
            <Reveal variant="fade-up" delay={100} className="lg:pl-8">
              <span data-field="story.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.story.label}</span>
              <h2 data-field="story.title" className="text-3xl md:text-4xl font-normal text-[#1a1c1a] mt-3 mb-8 tracking-tight">{t.story.title}</h2>
              <p data-field="story.description" className="text-lg font-light text-[#46483c] mb-10 leading-relaxed opacity-90">{t.story.description}</p>
              <ul className="space-y-6">
                {t.story.features.map((feature, i) => {
                  const FeatureIcon = STORY_ICONS[i] ?? TreePine;
                  return (
                    <li key={i} className="flex items-start gap-4">
                      <FeatureIcon aria-hidden className="w-5 h-5 text-[#56642b] p-2 bg-[#e0e5d4] rounded-full box-content shrink-0" />
                      <div>
                        <h5 data-field={`story.features.${i}.title`} className="text-sm font-semibold text-[#1a1c1a]">{feature.title}</h5>
                        <p data-field={`story.features.${i}.desc`} className="text-sm font-light text-[#46483c]">{feature.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Rooms */}
        <section data-section="rooms" className="py-20 px-6 md:px-16 max-w-7xl mx-auto bg-[#f4f3f1] rounded-[3rem]" id="rooms">
          <Reveal variant="fade-up" className="text-center mb-16">
            <span data-field="rooms.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.rooms.label}</span>
            <h2 data-field="rooms.title" className="text-3xl md:text-4xl font-normal text-[#1a1c1a] mt-3">{t.rooms.title}</h2>
            <p data-field="rooms.subtitle" className="text-[#46483c] font-light mt-4 max-w-xl mx-auto">{t.rooms.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.rooms.items.map((room, i) => {
              const roomImg = IMG[ROOM_IMAGE_KEYS[i] as keyof typeof IMG] ?? IMG.room1;
              return (
                <Reveal key={i} variant="fade-up" delay={i * 100} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(86,100,43,0.15)] flex flex-col sm:flex-row group">
                  <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <img src={roomImg} alt={room.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7 flex flex-col justify-between sm:w-3/5">
                    <div>
                      <h3 data-field={`rooms.items.${i}.name`} className="text-xl text-[#1a1c1a] font-normal mb-2">{room.name}</h3>
                      <p data-field={`rooms.items.${i}.desc`} className="text-sm text-[#46483c] font-light mb-4">{room.desc}</p>
                      <span data-field={`rooms.items.${i}.capacity`} className="inline-flex items-center gap-1.5 text-xs text-[#5b6053] bg-[#e0e5d4] px-3 py-1 rounded-full">
                        <Users aria-hidden className="w-3.5 h-3.5" /> {room.capacity}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-6">
                      <span data-field={`rooms.items.${i}.price`} className="text-lg font-medium text-[#56642b]">{room.price}</span>
                      <span className="text-xs text-[#76786b]">/{t.booking.perNight.replace('/', '')}</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Amenities */}
        <section data-section="amenities" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="amenities">
          <Reveal variant="fade-up" className="text-center mb-16">
            <span data-field="amenities.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.amenities.label}</span>
            <h2 data-field="amenities.title" className="text-3xl md:text-4xl font-normal text-[#1a1c1a] mt-3">{t.amenities.title}</h2>
            <div className="w-16 h-0.5 bg-[#56642b]/30 mx-auto mt-6 rounded-full" />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.amenities.items.map((item, i) => {
              const AmenityIcon = AMENITY_ICONS[i] ?? Wifi;
              return (
                <Reveal key={i} variant="fade-up" delay={i * 80} className="bg-white p-8 rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(86,100,43,0.12)] hover:bg-[#f4f3f1] transition-colors duration-500">
                  <AmenityIcon aria-hidden className="w-6 h-6 text-[#56642b] mb-5" />
                  <h3 data-field={`amenities.items.${i}.title`} className="text-base font-medium text-[#1a1c1a] mb-2">{item.title}</h3>
                  <p data-field={`amenities.items.${i}.desc`} className="text-sm font-light text-[#46483c]">{item.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" className="py-20 bg-[#f4f3f1]" id="gallery">
          <Reveal variant="fade-up" className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between mb-16">
            <div>
              <span data-field="gallery.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.gallery.label}</span>
              <h2 data-field="gallery.title" className="text-3xl md:text-4xl font-normal text-[#1a1c1a] mt-3">{t.gallery.title}</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#56642b] text-sm font-medium group hover:translate-x-1 transition-transform">
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
                className={`flex-none w-72 md:w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-[0_10px_40px_-10px_rgba(86,100,43,0.2)] relative group ${i % 2 === 1 ? 'md:mt-16' : ''}`}
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
            <h2 data-field="testimonials.title" className="text-3xl md:text-4xl font-normal text-[#1a1c1a]">{t.testimonials.title}</h2>
            <p data-field="testimonials.subtitle" className="text-[#46483c] font-light mt-3 max-w-xl mx-auto">{t.testimonials.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => {
              const avatarSrc = IMG[REVIEW_AVATARS[i] as keyof typeof IMG] ?? IMG.avatar1;
              return (
                <Reveal key={i} variant="fade-up" delay={i * 120} className="bg-white p-9 rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(86,100,43,0.15)] border border-[#c6c8b8]/20">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} aria-hidden className={`w-4 h-4 ${s < item.rating ? 'fill-[#56642b] text-[#56642b]' : 'text-[#c6c8b8]'}`} />
                    ))}
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="font-light text-[#46483c] mb-6 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={avatarSrc} alt={item.name} loading="lazy" className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <h4 data-field={`testimonials.items.${i}.name`} className="text-sm font-medium text-[#1a1c1a]">{item.name}</h4>
                      <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#76786b]">{item.role}</p>
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
            <Reveal variant="fade-up" duration={800} className="bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_10px_40px_-10px_rgba(86,100,43,0.2)]">
              <div className="p-8 md:p-16 md:w-1/2">
                <h2 data-field="contact.title" className="text-3xl font-normal text-[#1a1c1a] mb-4">{t.contact.title}</h2>
                <p data-field="contact.subtitle" className="text-[#46483c] font-light mb-10 leading-relaxed">{t.contact.subtitle}</p>
                <div className="space-y-6">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri];
                    return (
                      <div key={row.valueField} className="flex items-start gap-4">
                        <RowIcon aria-hidden className="w-5 h-5 text-[#56642b] bg-[#e0e5d4] p-2 rounded-full box-content shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-[#1a1c1a]">{row.label}</h4>
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
                    href="#rooms"
                    className="inline-block bg-[#56642b] text-white text-sm font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-all"
                  >
                    {t.contact.btnBook}
                  </a>
                  <a
                    data-track="cta_call"
                    data-field="contact.btnCall"
                    href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                    className="inline-block border border-[#76786b] text-[#1a1c1a] text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#efeeeb] transition-all"
                  >
                    {t.contact.btnCall}
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity" href="#" aria-label="Facebook">
                    <Facebook aria-hidden className="w-4 h-4" />
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity" href="#" aria-label="Zalo">
                    <MessageCircle aria-hidden className="w-4 h-4" />
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
          <div className="flex flex-col items-center md:items-start gap-1">
            <span data-field="footer.brand" className="text-xl font-light text-[#56642b]">{t.footer.brand}</span>
            <p data-field="footer.tagline" className="text-sm text-[#46483c] opacity-70">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-[#46483c] text-sm hover:text-[#56642b] transition-colors" href="#">{t.footer.privacy}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] transition-colors" href="#">{t.footer.terms}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] transition-colors" href="#contact">{t.footer.contact}</a>
          </div>
          <p data-field="footer.copy" className="text-[#46483c] text-xs opacity-70">{t.footer.copy}</p>
        </Reveal>
      </footer>

      {/* Sticky booking bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2.5rem)] max-w-md">
        <div className="bg-[#faf9f6]/95 backdrop-blur-md p-4 rounded-full shadow-[0_10px_40px_-10px_rgba(86,100,43,0.35)] flex items-center justify-between border border-white/60">
          <div className="pl-4">
            <span data-field="booking.priceLabel" className="block text-[10px] uppercase tracking-widest text-[#46483c] opacity-60">{t.booking.priceLabel}</span>
            <span data-field="booking.price" className="text-lg font-medium text-[#56642b]">{t.booking.price}</span>
            <span data-field="booking.perNight" className="text-xs text-[#46483c]">{t.booking.perNight}</span>
          </div>
          <a data-track="cta_book_sticky" data-field="booking.cta" href="#rooms" className="bg-[#56642b] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:opacity-90 active:scale-95 transition-all">
            {t.booking.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
