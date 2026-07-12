import {
  Wifi, Car, Flame, Plane, ShieldCheck, Compass, Wind, Coffee,
  MapPin, Phone, Star, Quote, Users, Facebook, MessageCircle, CalendarCheck,
  Mountain, Waves, ArrowRight,
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
  heroBg: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1800&auto=format&fit=crop',
  heritageImg: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1400&auto=format&fit=crop',
  fireplaceImg: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=1200&auto=format&fit=crop',
  room1: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=1200&auto=format&fit=crop',
  room2: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop',
  room3: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop',
  room4: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
  gallery1: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=1200&auto=format&fit=crop',
  gallery2: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
  gallery3: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
  gallery4: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
  avatar1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  avatar2: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=400&auto=format&fit=crop',
  avatar3: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
};

/** Icon gán theo thứ tự item — trang trí, không lưu trong i18n (quy tắc #6) */
const AMENITY_ICONS = [Wifi, Car, Flame, Plane, ShieldCheck, Compass, Wind, Coffee];
const CONTACT_ICONS = [MapPin, Plane, Phone];
const REVIEW_AVATARS = ['avatar1', 'avatar2', 'avatar3'] as const;
const ROOM_IMAGE_KEYS = ['room1', 'room2', 'room3', 'room4'] as const;
const GALLERY_KEYS = ['gallery1', 'gallery2', 'gallery3', 'gallery4'] as const;

export default function Villa4({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="font-['Lexend'] bg-[#faf9f6] text-[#1a1c1a] antialiased overflow-x-hidden">

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/80 backdrop-blur-md">
        <nav className="flex justify-between items-center px-6 md:px-16 py-5 w-full max-w-7xl mx-auto">
          <span data-field="nav.brand" className="text-2xl font-light text-[#56642b] tracking-tight">{t.nav.brand}</span>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a className="font-medium text-[#56642b] border-b-2 border-[#56642b] pb-1" href="#rooms">{t.nav.linkRooms}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#amenities">{t.nav.linkAmenities}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#reviews">{t.nav.linkReviews}</a>
            <a className="text-[#46483c] hover:text-[#56642b] transition-colors duration-300" href="#contact">{t.nav.linkContact}</a>
          </div>
          <a
            data-track="cta_nav_book"
            data-field="nav.cta"
            href="#contact"
            className="bg-[#56642b] text-white px-7 py-3 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300 active:scale-95"
          >
            {t.nav.cta}
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative h-screen min-h-[680px] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-cover bg-center scale-105" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/30" />
          </div>
          <div className="relative z-10 text-center text-white px-6 max-w-3xl">
            <Reveal as="span" variant="fade-up" data-field="hero.badge" className="block text-xs font-medium tracking-[0.25em] uppercase opacity-80 mb-4">
              {t.hero.badge}
            </Reveal>
            <Reveal as="h1" variant="fade-up" delay={100} data-field="hero.title" className="text-4xl md:text-6xl font-light leading-tight mb-6">
              {t.hero.title}
            </Reveal>
            <Reveal as="p" variant="fade-up" delay={200} data-field="hero.subtitle" className="text-base md:text-lg font-light mb-10 max-w-2xl mx-auto opacity-90">
              {t.hero.subtitle}
            </Reveal>
            <Reveal variant="fade-up" delay={320} className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a
                data-track="cta_hero_book"
                data-field="hero.btnPrimary"
                href="#contact"
                className="bg-[#56642b] text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-all shadow-xl"
              >
                {t.hero.btnPrimary}
              </a>
              <a
                data-field="hero.btnSecondary"
                href="#rooms"
                className="border border-white/60 text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white/10 transition-all"
              >
                {t.hero.btnSecondary}
              </a>
            </Reveal>
          </div>
        </section>

        {/* Heritage / Cultural bento */}
        <section data-section="heritage" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <Reveal variant="fade-right" className="lg:col-span-7 rounded-[2rem] overflow-hidden relative group min-h-[420px]">
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={IMG.heritageImg}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent p-10 flex flex-col justify-end">
                <h2 data-field="heritage.mainTitle" className="text-white text-2xl md:text-3xl font-light mb-3">{t.heritage.mainTitle}</h2>
                <p data-field="heritage.mainDesc" className="text-white/85 font-light max-w-md">{t.heritage.mainDesc}</p>
              </div>
            </Reveal>
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Reveal variant="fade-left" delay={100} className="bg-[#f4f3f1] p-10 rounded-[2rem] flex-1 flex flex-col justify-center">
                <Mountain aria-hidden className="w-9 h-9 text-[#56642b] mb-4" />
                <h3 data-field="heritage.card1Title" className="text-xl font-light text-[#56642b] mb-2">{t.heritage.card1Title}</h3>
                <p data-field="heritage.card1Desc" className="text-[#46483c] font-light text-sm leading-relaxed">{t.heritage.card1Desc}</p>
              </Reveal>
              <Reveal variant="fade-left" delay={200} className="bg-[#e0e5d4] p-10 rounded-[2rem] flex-1 flex flex-col justify-center">
                <Waves aria-hidden className="w-9 h-9 text-[#5b6053] mb-4" />
                <h3 data-field="heritage.card2Title" className="text-xl font-light text-[#5b6053] mb-2">{t.heritage.card2Title}</h3>
                <p data-field="heritage.card2Desc" className="text-[#616659] font-light text-sm leading-relaxed">{t.heritage.card2Desc}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Evening experience by the fireplace */}
        <section data-section="experience" className="py-20 bg-[#e3e2e0] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal variant="fade-right" className="order-2 md:order-1">
              <span data-field="experience.label" className="text-xs font-medium text-[#56642b] uppercase tracking-[0.2em] block mb-4">
                {t.experience.label}
              </span>
              <h2 data-field="experience.title" className="text-3xl md:text-4xl font-light text-[#56642b] mb-5">{t.experience.title}</h2>
              <p data-field="experience.desc" className="text-base font-light text-[#46483c] leading-relaxed mb-10">{t.experience.desc}</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Flame aria-hidden className="w-6 h-6 text-[#56642b] shrink-0 mt-1" />
                  <div>
                    <p data-field="experience.feature1Title" className="text-sm font-medium text-[#56642b]">{t.experience.feature1Title}</p>
                    <p data-field="experience.feature1Desc" className="text-xs text-[#46483c]">{t.experience.feature1Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star aria-hidden className="w-6 h-6 text-[#56642b] shrink-0 mt-1" />
                  <div>
                    <p data-field="experience.feature2Title" className="text-sm font-medium text-[#56642b]">{t.experience.feature2Title}</p>
                    <p data-field="experience.feature2Desc" className="text-xs text-[#46483c]">{t.experience.feature2Desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="zoom-in" className="order-1 md:order-2 relative">
              <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(86,100,43,0.15)] aspect-[4/5]">
                <img alt="" className="w-full h-full object-cover" src={IMG.fireplaceImg} />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-[0_20px_40px_-10px_rgba(86,100,43,0.2)] hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#56642b]/10 flex items-center justify-center">
                    <Flame aria-hidden className="w-5 h-5 text-[#56642b]" />
                  </div>
                  <div>
                    <p data-field="experience.badgeLabel" className="text-xs font-medium text-[#56642b]">{t.experience.badgeLabel}</p>
                    <p data-field="experience.badgeValue" className="text-lg font-light">{t.experience.badgeValue}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Rooms */}
        <section data-section="rooms" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="rooms">
          <Reveal variant="fade-up" className="text-center mb-16">
            <span data-field="rooms.label" className="text-[#56642b] text-xs font-medium tracking-[0.2em] uppercase">{t.rooms.label}</span>
            <h2 data-field="rooms.title" className="text-3xl md:text-4xl font-light mt-3">{t.rooms.title}</h2>
            <p data-field="rooms.subtitle" className="text-[#46483c] font-light mt-4 max-w-xl mx-auto">{t.rooms.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.rooms.items.map((room, i) => {
              const imgKey = ROOM_IMAGE_KEYS[i] ?? 'room1';
              return (
                <Reveal key={i} variant="fade-up" delay={i * 100} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(86,100,43,0.1)] flex flex-col">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={IMG[imgKey as keyof typeof IMG]}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 data-field={`rooms.items.${i}.name`} className="text-xl font-light text-[#56642b] mb-2">{room.name}</h3>
                    <p data-field={`rooms.items.${i}.desc`} className="text-sm font-light text-[#46483c] leading-relaxed mb-6 flex-1">{room.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#c6c8b8]/40">
                      <div className="flex items-center gap-2 text-[#46483c] text-xs">
                        <Users aria-hidden className="w-4 h-4" />
                        <span data-field={`rooms.items.${i}.capacity`}>{room.capacity}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span data-field={`rooms.items.${i}.price`} className="text-lg font-medium text-[#56642b]">{room.price}</span>
                        <span data-field={`rooms.items.${i}.unit`} className="text-xs text-[#46483c]">{room.unit}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Amenities */}
        <section data-section="amenities" className="py-20 bg-[#f4f3f1]" id="amenities">
          <div className="px-6 md:px-16 max-w-7xl mx-auto">
            <Reveal variant="fade-up" className="text-center mb-16">
              <span data-field="amenities.label" className="text-[#56642b] text-xs font-medium tracking-[0.2em] uppercase">{t.amenities.label}</span>
              <h2 data-field="amenities.title" className="text-3xl md:text-4xl font-light mt-3">{t.amenities.title}</h2>
              <p data-field="amenities.subtitle" className="text-[#46483c] font-light mt-4 max-w-xl mx-auto">{t.amenities.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.amenities.items.map((item, i) => {
                const Icon = AMENITY_ICONS[i % AMENITY_ICONS.length];
                return (
                  <Reveal
                    key={i}
                    variant="fade-up"
                    delay={i * 60}
                    className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-[0_20px_40px_-10px_rgba(86,100,43,0.08)] hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#e0e5d4] flex items-center justify-center">
                      <Icon aria-hidden className="w-6 h-6 text-[#56642b]" />
                    </div>
                    <p data-field={`amenities.items.${i}.label`} className="text-sm font-light text-[#46483c]">{item.label}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" className="py-20 overflow-hidden">
          <Reveal variant="fade-up" className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between mb-14">
            <div>
              <span data-field="gallery.label" className="text-[#56642b] text-xs font-medium tracking-[0.2em] uppercase">{t.gallery.label}</span>
              <h2 data-field="gallery.title" className="text-3xl md:text-4xl font-light mt-3">{t.gallery.title}</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#56642b] text-sm font-medium group hover:translate-x-2 transition-transform">
              <span data-field="gallery.viewMore">{t.gallery.viewMore}</span>
              <ArrowRight aria-hidden className="w-4 h-4" />
            </button>
          </Reveal>
          <div className="flex flex-nowrap md:grid md:grid-cols-4 gap-6 px-6 md:px-16 overflow-x-auto pb-4">
            {GALLERY_KEYS.map((key, i) => (
              <Reveal
                key={key}
                variant="zoom-in"
                delay={i * 90}
                className={`flex-none w-72 md:w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(86,100,43,0.15)] bg-[#e3e2e0] relative group ${i % 2 === 1 ? 'md:mt-16' : ''}`}
              >
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMG[key]} alt="" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="reviews">
          <Reveal variant="fade-up" className="text-center mb-16">
            <h2 data-field="testimonials.title" className="text-3xl md:text-4xl font-light">{t.testimonials.title}</h2>
            <p data-field="testimonials.subtitle" className="text-[#46483c] font-light mt-3">{t.testimonials.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => {
              const avatarSrc = IMG[REVIEW_AVATARS[i] as keyof typeof IMG] ?? IMG.avatar1;
              const rating = Math.max(0, Math.min(5, item.rating ?? 5));
              return (
                <Reveal key={i} variant="fade-up" delay={i * 120} className="bg-white p-10 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(86,100,43,0.12)] relative">
                  <Quote aria-hidden className="w-8 h-8 text-[#8a9a5b]/40 absolute -top-4 left-8 bg-[#faf9f6] p-1 rounded-full" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        aria-hidden
                        className={`w-4 h-4 ${s < rating ? 'text-[#56642b] fill-[#56642b]' : 'text-[#c6c8b8]'}`}
                      />
                    ))}
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="font-light text-[#46483c] mb-6 italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={avatarSrc} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-[#8a9a5b]" />
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
            <Reveal variant="fade-up" duration={800} className="bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_40px_-10px_rgba(86,100,43,0.15)]">
              <div className="p-8 md:p-16 md:w-1/2">
                <span data-field="contact.label" className="text-[#56642b] text-xs font-medium tracking-[0.2em] uppercase block mb-3">{t.contact.label}</span>
                <h2 data-field="contact.title" className="text-3xl font-light mb-4">{t.contact.title}</h2>
                <p data-field="contact.subtitle" className="text-[#46483c] font-light mb-10">{t.contact.subtitle}</p>
                <div className="space-y-6">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.airportLabel, value: t.contact.airportValue, valueField: 'contact.airportValue' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri];
                    return (
                      <div key={row.valueField} className="flex items-start gap-4">
                        <RowIcon aria-hidden className="w-5 h-5 text-[#56642b] bg-[#e0e5d4] p-2 rounded-full box-content" />
                        <div>
                          <h4 className="text-sm font-medium">{row.label}</h4>
                          <p data-field={row.valueField} className="text-[#46483c] font-light">{row.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-10 flex items-center gap-4 flex-wrap">
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
                    className="inline-flex items-center gap-2 border border-[#56642b] text-[#56642b] text-sm font-medium px-8 py-3 rounded-full hover:bg-[#56642b]/5 transition-all"
                  >
                    <CalendarCheck aria-hidden className="w-4 h-4" />
                    {t.contact.btnBook}
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity" href="#" aria-label="Facebook">
                    <Facebook aria-hidden className="w-5 h-5" />
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[#56642b] flex items-center justify-center text-white hover:opacity-80 transition-opacity" href="#" aria-label="Zalo">
                    <MessageCircle aria-hidden className="w-5 h-5" />
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
      <footer data-section="footer" className="bg-[#faf9f6] py-10">
        <Reveal variant="fade" className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 w-full max-w-7xl mx-auto border-t border-[#c6c8b8]/40 pt-10 gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span data-field="footer.brand" className="text-2xl font-light text-[#56642b]">{t.footer.brand}</span>
            <p data-field="footer.tagline" className="text-[#46483c] text-sm font-light">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-[#46483c] text-sm hover:text-[#56642b] underline transition-colors" href="#">{t.footer.linkPrivacy}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] underline transition-colors" href="#">{t.footer.linkTerms}</a>
            <a className="text-[#46483c] text-sm hover:text-[#56642b] underline transition-colors" href="#contact">{t.footer.linkContact}</a>
          </div>
          <p data-field="footer.copy" className="text-[#46483c] text-xs opacity-70">{t.footer.copy}</p>
        </Reveal>
      </footer>

      {/* Mobile booking FAB */}
      <a
        data-track="cta_fab_book"
        href="#contact"
        aria-label={t.nav.cta}
        className="fixed bottom-6 right-6 bg-[#56642b] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(86,100,43,0.4)] hover:scale-110 transition-transform z-40 md:hidden"
      >
        <CalendarCheck aria-hidden className="w-7 h-7" />
      </a>
    </div>
  );
}
