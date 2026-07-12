import {
  Wifi,
  Car,
  UtensilsCrossed,
  Flame,
  Navigation,
  Mountain,
  Waves,
  ShieldCheck,
  Leaf,
  Hammer,
  MapPin,
  Phone,
  Star,
  Quote,
  ArrowRight,
  Users,
  Facebook,
  MessageCircle,
} from 'lucide-react';
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
  heroBg: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=1600&q=80',
  aboutImg: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
  room1: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1000&q=80',
  room2: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&q=80',
  room3: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1000&q=80',
  room4: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&q=80',
  gallery1: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
  gallery2: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80',
  gallery3: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
  gallery4: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&q=80',
  avatar1: 'https://i.pravatar.cc/150?img=32',
  avatar2: 'https://i.pravatar.cc/150?img=44',
  avatar3: 'https://i.pravatar.cc/150?img=25',
};

/** Icon gán theo thứ tự item — trang trí, không phải nội dung dịch, nên định nghĩa ngoài i18n */
const ROOM_IMAGE_KEYS = ['room1', 'room2', 'room3', 'room4'] as const;
const AMENITY_ICONS = [Wifi, Car, UtensilsCrossed, Flame, Navigation, Mountain, Waves, ShieldCheck];
const ABOUT_BADGE_ICONS = [Hammer, Leaf];
const CONTACT_ICONS = [MapPin, Phone];
const GALLERY_IMAGE_KEYS = ['gallery1', 'gallery2', 'gallery3', 'gallery4'] as const;
const REVIEW_AVATARS = ['avatar1', 'avatar2', 'avatar3'] as const;

export default function Villa6({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a] font-sans antialiased overflow-x-hidden">

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/80 backdrop-blur-md">
        <nav className="flex justify-between items-center px-6 md:px-16 py-4 w-full max-w-7xl mx-auto">
          <span data-field="nav.brand" className="text-2xl font-light tracking-tight text-[#56642b]">{t.nav.brand}</span>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#about">{t.nav.linkAbout}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#rooms">{t.nav.linkRooms}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#amenities">{t.nav.linkAmenities}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#gallery">{t.nav.linkGallery}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#reviews">{t.nav.linkReviews}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#contact">{t.nav.linkContact}</a>
          </div>
          <a
            data-track="cta_book"
            data-field="nav.cta"
            href="#rooms"
            className="bg-[#56642b] text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90 active:scale-95 cursor-pointer"
          >
            {t.nav.cta}
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-cover bg-center scale-105" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-[#faf9f6]" />
          </div>
          <div className="relative z-10 text-center px-6 md:px-16 max-w-4xl">
            <Reveal as="span" data-field="hero.badge" variant="fade-up" className="inline-block text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white/90 mb-6 drop-shadow">
              {t.hero.badge}
            </Reveal>
            <Reveal as="h1" data-field="hero.title" variant="fade-up" delay={80} className="text-4xl md:text-6xl font-light leading-tight text-white mb-3 drop-shadow-lg">
              {t.hero.title}
            </Reveal>
            <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={160} className="text-lg md:text-xl font-light text-white/90 mb-6 drop-shadow">
              {t.hero.subtitle}
            </Reveal>
            <Reveal as="p" data-field="hero.desc" variant="fade-up" delay={220} className="text-base font-light text-white/80 mb-10 max-w-xl mx-auto drop-shadow">
              {t.hero.desc}
            </Reveal>
            <Reveal variant="fade-up" delay={300} className="flex flex-col md:flex-row gap-3 justify-center">
              <a
                data-field="hero.btnPrimary"
                href="#rooms"
                className="bg-[#56642b] text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide shadow-[0_20px_80px_-20px_rgba(86,100,43,0.4)] hover:opacity-90 transition-all"
              >
                {t.hero.btnPrimary}
              </a>
              <a
                data-track="cta_book"
                data-field="hero.btnSecondary"
                href="#contact"
                className="border-2 border-white text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                {t.hero.btnSecondary}
              </a>
            </Reveal>
          </div>
        </section>

        {/* About / Architecture */}
        <section data-section="about" className="py-20 px-6 md:px-16 max-w-7xl mx-auto overflow-hidden" id="about">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <Reveal variant="fade-right" className="md:col-span-5 space-y-6">
              <span data-field="about.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.about.label}</span>
              <h2 data-field="about.title" className="text-3xl md:text-4xl font-light text-[#1a1c1a] leading-tight">{t.about.title}</h2>
              <p data-field="about.desc" className="text-lg font-light text-[#46483c] leading-relaxed">{t.about.desc}</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {t.about.badges.map((badge, i) => {
                  const Icon = ABOUT_BADGE_ICONS[i] ?? Leaf;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon aria-hidden className="w-5 h-5 text-[#56642b]" />
                      <span data-field={`about.badges.${i}`} className="text-sm font-medium tracking-wide text-[#1a1c1a]">{badge}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal variant="zoom-in" delay={120} className="md:col-span-7 relative group">
              <div className="aspect-video rounded-[2rem] overflow-hidden shadow-[0_20px_80px_-20px_rgba(86,100,43,0.15)]">
                <img
                  src={IMG.aboutImg}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#56642b]/10 rounded-full blur-3xl -z-10" />
            </Reveal>
          </div>
        </section>

        {/* Rooms */}
        <section data-section="rooms" className="py-20 px-6 md:px-16 max-w-7xl mx-auto bg-[#f4f3f1] rounded-[3rem]" id="rooms">
          <Reveal variant="fade-up" className="text-center mb-16 max-w-2xl mx-auto">
            <span data-field="rooms.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.rooms.label}</span>
            <h2 data-field="rooms.title" className="text-3xl md:text-4xl font-light text-[#1a1c1a] mt-3">{t.rooms.title}</h2>
            <p data-field="rooms.subtitle" className="text-[#46483c] font-light mt-4">{t.rooms.subtitle}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.rooms.items.map((room, i) => {
              const imgSrc = IMG[ROOM_IMAGE_KEYS[i] as keyof typeof IMG] ?? IMG.room1;
              return (
                <Reveal key={i} variant="fade-up" delay={i * 100} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_80px_-20px_rgba(86,100,43,0.12)] flex flex-col">
                  <div className="h-56 overflow-hidden">
                    <img src={imgSrc} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 data-field={`rooms.items.${i}.name`} className="text-xl font-medium text-[#1a1c1a] mb-2">{room.name}</h3>
                    <p data-field={`rooms.items.${i}.desc`} className="text-[#46483c] font-light text-sm mb-6 flex-1">{room.desc}</p>
                    <div className="flex items-center gap-2 text-sm text-[#46483c] mb-6">
                      <Users aria-hidden className="w-4 h-4 text-[#56642b]" />
                      <span data-field={`rooms.items.${i}.capacity`}>{room.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span data-field={`rooms.items.${i}.price`} className="text-2xl font-light text-[#56642b]">{room.price}</span>
                        <span data-field={`rooms.items.${i}.unit`} className="text-xs text-[#46483c] ml-1">{room.unit}</span>
                      </div>
                      <a
                        data-track="cta_book"
                        data-field="rooms.btnBook"
                        href="#contact"
                        className="bg-[#8a9a5b] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-[#56642b] transition-all"
                      >
                        {t.rooms.btnBook}
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Amenities */}
        <section data-section="amenities" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="amenities">
          <Reveal variant="fade-up" className="text-center mb-16 max-w-2xl mx-auto">
            <span data-field="amenities.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.amenities.label}</span>
            <h2 data-field="amenities.title" className="text-3xl md:text-4xl font-light text-[#1a1c1a] mt-3">{t.amenities.title}</h2>
            <p data-field="amenities.subtitle" className="text-[#46483c] font-light mt-4">{t.amenities.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.amenities.items.map((item, i) => {
              const Icon = AMENITY_ICONS[i] ?? ShieldCheck;
              return (
                <Reveal
                  key={i}
                  variant="fade-up"
                  delay={i * 70}
                  className="flex flex-col items-center text-center gap-3 bg-[#f4f3f1] rounded-[2rem] p-8 hover:bg-[#e0e5d4] transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_10px_40px_-15px_rgba(86,100,43,0.3)]">
                    <Icon aria-hidden className="w-6 h-6 text-[#56642b]" />
                  </div>
                  <span data-field={`amenities.items.${i}.label`} className="text-sm font-medium text-[#1a1c1a]">{item.label}</span>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" className="py-20 bg-[#f4f3f1] overflow-hidden" id="gallery">
          <Reveal variant="fade-up" className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between mb-16">
            <div>
              <span data-field="gallery.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.gallery.label}</span>
              <h2 data-field="gallery.title" className="text-3xl md:text-4xl font-light text-[#1a1c1a] mt-3">{t.gallery.title}</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#56642b] text-sm font-medium group hover:translate-x-2 transition-transform">
              <span data-field="gallery.viewMore">{t.gallery.viewMore}</span>
              <ArrowRight aria-hidden className="w-4 h-4" />
            </button>
          </Reveal>
          <div className="flex flex-nowrap md:grid md:grid-cols-4 gap-6 px-6 md:px-16 overflow-x-auto pb-4">
            {GALLERY_IMAGE_KEYS.map((key, i) => (
              <Reveal
                key={key}
                variant="zoom-in"
                delay={i * 90}
                className={`flex-none w-72 md:w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_20px_80px_-20px_rgba(86,100,43,0.2)] bg-[#e0e5d4] relative group ${i % 2 === 1 ? 'md:mt-16' : ''}`}
              >
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMG[key]} alt="" />
                <div className="absolute inset-0 bg-[#56642b]/10 group-hover:bg-transparent transition-colors" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="reviews">
          <Reveal variant="fade-up" className="text-center mb-16 max-w-2xl mx-auto">
            <h2 data-field="testimonials.title" className="text-3xl md:text-4xl font-light text-[#1a1c1a]">{t.testimonials.title}</h2>
            <p data-field="testimonials.subtitle" className="text-[#46483c] font-light mt-3">{t.testimonials.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => {
              const avatarSrc = IMG[REVIEW_AVATARS[i] as keyof typeof IMG] ?? IMG.avatar1;
              return (
                <Reveal key={i} variant="fade-up" delay={i * 120} className="bg-white p-10 rounded-[2rem] shadow-[0_20px_80px_-20px_rgba(86,100,43,0.15)] relative">
                  <Quote aria-hidden className="w-8 h-8 text-[#8a9a5b]/40 absolute -top-4 left-8 bg-[#faf9f6] p-1 rounded-full" />
                  <div className="flex text-[#FFC107] mb-4" aria-hidden>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="w-4 h-4" fill={si < item.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="font-light text-[#46483c] mb-6 italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={avatarSrc} alt="" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 data-field={`testimonials.items.${i}.name`} className="text-sm font-medium text-[#1a1c1a]">{item.name}</h4>
                      <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#46483c]">{item.role}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Contact & Map */}
        <section data-section="contact" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="contact">
          <Reveal variant="fade-up" duration={800} className="bg-[#f4f3f1] rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_80px_-20px_rgba(86,100,43,0.18)]">
            <div className="p-8 md:p-16 md:w-1/2">
              <h2 data-field="contact.title" className="text-3xl font-light text-[#1a1c1a] mb-4">{t.contact.title}</h2>
              <p data-field="contact.subtitle" className="text-[#46483c] font-light mb-10">{t.contact.subtitle}</p>
              <div className="space-y-6">
                {([
                  { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                  { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                ]).map((row, ri) => {
                  const RowIcon = CONTACT_ICONS[ri];
                  return (
                    <div key={row.valueField} className="flex items-start gap-4">
                      <RowIcon aria-hidden className="w-5 h-5 text-[#56642b] bg-white p-2 rounded-xl box-content" />
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
                  data-track="cta_call"
                  data-field="contact.btnCall"
                  href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                  className="inline-block bg-[#56642b] text-white text-sm font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all"
                >
                  {t.contact.btnCall}
                </a>
                <a
                  data-track="cta_book"
                  data-field="contact.btnBook"
                  href="#rooms"
                  className="inline-block border-2 border-[#56642b] text-[#56642b] text-sm font-medium px-8 py-3 rounded-full hover:bg-[#56642b] hover:text-white transition-all"
                >
                  {t.contact.btnBook}
                </a>
                <a
                  data-track="cta_zalo"
                  className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  href="#"
                  aria-label="Zalo"
                >
                  <MessageCircle aria-hidden className="w-5 h-5" />
                </a>
                <a
                  className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  href="#"
                  aria-label="Facebook"
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
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#f4f3f1] py-10 mt-4">
        <Reveal variant="fade" className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 w-full max-w-7xl mx-auto border-t border-[#c6c8b8]/40 pt-10 gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span data-field="footer.brand" className="text-2xl font-light text-[#56642b]">{t.footer.brand}</span>
            <p data-field="footer.tagline" className="text-[#46483c] text-sm font-light max-w-sm text-center md:text-left">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-[#46483c] text-sm hover:text-[#56642b] transition-colors" href="#">{t.footer.privacy}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] transition-colors" href="#">{t.footer.terms}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] transition-colors" href="#contact">{t.footer.contact}</a>
          </div>
          <p data-field="footer.copy" className="text-[#46483c] text-sm opacity-70">{t.footer.copy}</p>
        </Reveal>
      </footer>

      {/* Mobile booking FAB */}
      <a
        data-track="cta_fab_book"
        href="#rooms"
        aria-label={t.hero.btnPrimary}
        className="fixed bottom-6 right-6 bg-[#56642b] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_20px_80px_-20px_rgba(86,100,43,0.5)] hover:scale-110 transition-transform z-40 md:hidden"
      >
        <Mountain aria-hidden className="w-7 h-7" />
      </a>
    </div>
  );
}
