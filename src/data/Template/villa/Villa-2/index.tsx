import {
  Wifi,
  Waves,
  Car,
  UtensilsCrossed,
  Wind,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
  LogIn,
  LogOut,
  CalendarX,
  MapPin,
  Phone,
  Mail,
  Facebook,
  MessageCircle,
  Star,
  Quote,
  ArrowRight,
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
import imgIntroMain from './images/introMain.jpg';
import imgIntroSecondary from './images/introSecondary.jpg';
import imgHighlight1 from './images/highlight1.jpg';
import imgHighlight2 from './images/highlight2.jpg';
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
  introMain: imgIntroMain,
  introSecondary: imgIntroSecondary,
  highlight1: imgHighlight1,
  highlight2: imgHighlight2,
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

/** Icon gán theo thứ tự item của mảng nội dung — trang trí, không lưu trong i18n */
const ROOM_IMAGES = ['room1', 'room2', 'room3'] as const;
const AMENITY_ICONS = [Wifi, Waves, Car, UtensilsCrossed, Wind, ShieldCheck, Sparkles, Trees];
const POLICY_ICONS = [LogIn, LogOut, CalendarX];
const GALLERY_IMAGES = ['gallery1', 'gallery2', 'gallery3', 'gallery4'] as const;
const REVIEW_AVATARS = ['avatar1', 'avatar2', 'avatar3'] as const;
const CONTACT_ICONS = [MapPin, Phone, Mail];

export default function Villa2({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };
  const phoneHref = `tel:${t.contact.phone.replace(/\s/g, '')}`;

  return (
    <div className="font-['Lexend'] bg-[#faf9f6] text-[#1a1c1a] antialiased overflow-x-hidden">

      {/* Navbar */}
      <header data-section="nav" className="bg-[#faf9f6]/80 backdrop-blur-md sticky top-0 z-50 w-full">
        <nav className="flex justify-between items-center px-6 md:px-16 py-4 w-full max-w-7xl mx-auto">
          <span data-field="nav.brand" className="text-2xl tracking-tight text-[#56642b] font-semibold">{t.nav.brand}</span>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-[#56642b] border-b-2 border-[#56642b] pb-1" href="#hero">{t.nav.linkExperience}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#rooms">{t.nav.linkRooms}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#amenities">{t.nav.linkAmenities}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#reviews">{t.nav.linkReviews}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#contact">{t.nav.linkContact}</a>
          </div>
          <a
            data-track="cta_book"
            data-field="nav.cta"
            href="#contact"
            className="bg-[#56642b] text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
          >
            {t.nav.cta}
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="hero" data-section="hero" className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img alt="Hồ bơi vô cực hòa vào đường chân trời biển" className="w-full h-full object-cover brightness-75" src={IMG.heroBg} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf9f6]/60" />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-32">
            <div className="max-w-3xl">
              <Reveal as="h1" variant="fade-up" data-field="hero.title" className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
                {t.hero.title}
              </Reveal>
              <Reveal as="p" variant="fade-up" delay={120} data-field="hero.subtitle" className="text-lg text-white/90 mb-10 max-w-xl leading-relaxed">
                {t.hero.subtitle}
              </Reveal>
              <Reveal variant="fade-up" delay={240} className="flex flex-wrap gap-4">
                <a href="#rooms" data-field="hero.btnPrimary" className="bg-[#56642b] text-white px-10 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2">
                  {t.hero.btnPrimary} <ArrowRight aria-hidden className="w-4 h-4" />
                </a>
                <a href="#contact" data-track="cta_book" data-field="hero.btnSecondary" className="border border-white/50 text-white backdrop-blur-sm px-10 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all">
                  {t.hero.btnSecondary}
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Introduction / Design philosophy */}
        <section data-section="intro" className="py-20 px-6 md:px-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <Reveal variant="fade-right" className="rounded-2xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(86,100,43,0.15)]">
              <img alt="Không gian sinh hoạt chung nhìn ra vườn" loading="lazy" className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000" src={IMG.introMain} />
            </Reveal>
            <div className="md:pl-8">
              <Reveal variant="fade-up" data-field="intro.label" className="text-[#56642b] text-sm font-medium tracking-widest mb-3 block uppercase">
                {t.intro.label}
              </Reveal>
              <Reveal as="h2" variant="fade-up" delay={80} data-field="intro.title" className="text-2xl md:text-3xl text-[#1a1c1a] mb-6 leading-tight">
                {t.intro.title}
              </Reveal>
              <Reveal as="p" variant="fade-up" delay={140} data-field="intro.desc" className="text-[#46483c] mb-8 leading-relaxed">
                {t.intro.desc}
              </Reveal>
              <Reveal variant="fade-up" delay={200} className="mb-8">
                <img alt="Góc thư viện nhỏ trong villa" loading="lazy" className="w-full h-48 object-cover rounded-xl shadow-[0_10px_40px_-15px_rgba(86,100,43,0.15)] mb-4" src={IMG.introSecondary} />
                <p data-field="intro.quote" className="text-[#46483c] italic border-l-4 border-[#56642b]/20 pl-6 leading-relaxed">
                  &ldquo;{t.intro.quote}&rdquo;
                </p>
              </Reveal>
              <Reveal variant="fade-up" delay={260}>
                <a className="text-[#56642b] text-sm font-medium flex items-center gap-2 group" href="#rooms">
                  <span data-field="intro.link">{t.intro.link}</span>
                  <ArrowRight aria-hidden className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Immersive Details / Highlights */}
        <section data-section="highlights" className="py-20 bg-[#f4f3f1]">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <Reveal variant="fade-up" className="text-center mb-16">
              <h2 data-field="highlights.title" className="text-2xl md:text-3xl text-[#1a1c1a] mb-4">{t.highlights.title}</h2>
              <p data-field="highlights.subtitle" className="text-[#46483c] max-w-2xl mx-auto">{t.highlights.subtitle}</p>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              {t.highlights.items.map((item, i) => (
                <Reveal
                  key={i}
                  variant="zoom-in"
                  delay={i * 100}
                  className={`group relative overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-15px_rgba(86,100,43,0.12)] ${i % 2 === 1 ? 'md:mt-16' : ''}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={i === 0 ? IMG.highlight1 : IMG.highlight2} />
                  </div>
                  <div className="p-8">
                    <h3 data-field={`highlights.items.${i}.title`} className="text-xl text-[#1a1c1a] mb-2">{item.title}</h3>
                    <p data-field={`highlights.items.${i}.desc`} className="text-[#46483c] leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Rooms */}
        <section id="rooms" data-section="rooms" className="py-20 px-6 md:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal variant="fade-up" className="text-center mb-16">
              <span data-field="rooms.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase mb-2 block">{t.rooms.label}</span>
              <h2 data-field="rooms.title" className="text-2xl md:text-3xl text-[#1a1c1a] mb-4">{t.rooms.title}</h2>
              <p data-field="rooms.subtitle" className="text-[#46483c] max-w-2xl mx-auto">{t.rooms.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.rooms.items.map((room, i) => {
                const imgSrc = IMG[ROOM_IMAGES[i] as keyof typeof IMG] ?? IMG.room1;
                return (
                  <Reveal key={i} variant="fade-up" delay={i * 100} className="rounded-2xl overflow-hidden bg-[#faf9f6] shadow-[0_10px_40px_-15px_rgba(86,100,43,0.15)] flex flex-col">
                    <div className="h-56 overflow-hidden">
                      <img alt={room.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src={imgSrc} />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 data-field={`rooms.items.${i}.name`} className="text-xl text-[#1a1c1a] mb-1">{room.name}</h3>
                      <p data-field={`rooms.items.${i}.view`} className="text-xs uppercase tracking-wider text-[#56642b] font-medium mb-4">{room.view}</p>
                      <p data-field={`rooms.items.${i}.desc`} className="text-[#46483c] text-sm leading-relaxed mb-6 flex-1">{room.desc}</p>
                      <div className="flex items-center gap-2 text-[#46483c] text-sm mb-6">
                        <Users aria-hidden className="w-4 h-4 text-[#56642b]" />
                        <span data-field={`rooms.items.${i}.capacity`}>{room.capacity}</span>
                        <span data-field="rooms.capacityLabel">{t.rooms.capacityLabel}</span>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <span data-field={`rooms.items.${i}.price`} className="text-[#56642b] font-semibold text-lg">{room.price}</span>
                          <span data-field="rooms.priceSuffix" className="text-[#46483c] text-xs ml-1">{t.rooms.priceSuffix}</span>
                        </div>
                        <a href="#contact" className="bg-[#56642b]/10 text-[#56642b] hover:bg-[#56642b] hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-all">
                          {t.rooms.btnSelect}
                        </a>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section id="amenities" data-section="amenities" className="py-20 px-6 md:px-16 bg-[#f4f3f1]">
          <div className="max-w-7xl mx-auto">
            <Reveal variant="fade-up" className="text-center mb-16">
              <span data-field="amenities.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase mb-2 block">{t.amenities.label}</span>
              <h2 data-field="amenities.title" className="text-2xl md:text-3xl text-[#1a1c1a] mb-4">{t.amenities.title}</h2>
              <p data-field="amenities.subtitle" className="text-[#46483c] max-w-2xl mx-auto">{t.amenities.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.amenities.items.map((item, i) => {
                const Icon = AMENITY_ICONS[i % AMENITY_ICONS.length];
                return (
                  <Reveal key={i} variant="fade-up" delay={i * 60} className="bg-white rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-[0_10px_40px_-15px_rgba(86,100,43,0.1)]">
                    <div className="w-14 h-14 rounded-full bg-[#56642b]/10 flex items-center justify-center">
                      <Icon aria-hidden className="w-6 h-6 text-[#56642b]" />
                    </div>
                    <span data-field={`amenities.items.${i}.label`} className="text-sm font-medium text-[#1a1c1a]">{item.label}</span>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Booking policy strip */}
        <section data-section="policy" className="py-16 px-6 md:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal variant="fade-up" className="rounded-2xl bg-[#faf9f6] p-8 md:p-10 shadow-[0_10px_40px_-15px_rgba(86,100,43,0.1)]">
              <h2 data-field="policy.title" className="text-lg font-medium text-[#1a1c1a] mb-6">{t.policy.title}</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {t.policy.items.map((item, i) => {
                  const Icon = POLICY_ICONS[i % POLICY_ICONS.length];
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Icon aria-hidden className="w-5 h-5 text-[#56642b] shrink-0 mt-0.5" />
                      <div>
                        <p data-field={`policy.items.${i}.label`} className="text-sm font-medium text-[#1a1c1a]">{item.label}</p>
                        <p data-field={`policy.items.${i}.value`} className="text-sm text-[#46483c]">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" className="py-20 bg-[#f4f3f1] overflow-hidden">
          <Reveal variant="fade-up" className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between mb-16">
            <div>
              <span data-field="gallery.label" className="text-[#56642b] text-sm font-medium tracking-widest uppercase">{t.gallery.label}</span>
              <h2 data-field="gallery.title" className="text-2xl md:text-3xl text-[#1a1c1a] mt-3">{t.gallery.title}</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#56642b] text-sm font-medium group hover:translate-x-2 transition-transform">
              <span data-field="gallery.viewMore">{t.gallery.viewMore}</span>
              <ArrowRight aria-hidden className="w-4 h-4" />
            </button>
          </Reveal>
          <div className="flex flex-nowrap md:grid md:grid-cols-4 gap-6 px-6 md:px-16 overflow-x-auto pb-4">
            {GALLERY_IMAGES.map((key, i) => (
              <Reveal
                key={key}
                variant="zoom-in"
                delay={i * 90}
                className={`flex-none w-72 md:w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(86,100,43,0.15)] bg-white relative group ${i % 2 === 1 ? 'md:mt-16' : ''}`}
              >
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMG[key]} alt={`${t.gallery.title} ${i + 1}`} loading="lazy" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" data-section="testimonials" className="py-20 px-6 md:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <Reveal variant="fade-up" className="text-center mb-16">
              <h2 data-field="testimonials.title" className="text-2xl md:text-3xl text-[#1a1c1a] mb-4">{t.testimonials.title}</h2>
              <p data-field="testimonials.subtitle" className="text-[#46483c] max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.testimonials.items.map((item, i) => {
                const avatarSrc = IMG[REVIEW_AVATARS[i] as keyof typeof IMG] ?? IMG.avatar1;
                return (
                  <Reveal key={i} variant="fade-up" delay={i * 120} className="bg-[#faf9f6] p-8 rounded-2xl shadow-[0_10px_40px_-15px_rgba(86,100,43,0.15)] relative">
                    <Quote aria-hidden className="w-8 h-8 text-[#56642b]/30 absolute -top-4 left-8 bg-white p-1.5 rounded-full" />
                    <div className="flex gap-1 text-[#56642b] mb-4">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} aria-hidden className="w-4 h-4" fill={si < item.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p data-field={`testimonials.items.${i}.quote`} className="text-[#46483c] mb-6 italic leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={avatarSrc} alt={item.name} loading="lazy" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p data-field={`testimonials.items.${i}.name`} className="text-sm font-medium text-[#1a1c1a]">{item.name}</p>
                        <p data-field={`testimonials.items.${i}.location`} className="text-xs text-[#46483c]">{item.location}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact & Map */}
        <section id="contact" data-section="contact" className="py-20 px-6 md:px-16 bg-[#f4f3f1]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 items-stretch">
              <Reveal variant="fade-right" className="md:col-span-2">
                <h2 data-field="contact.title" className="text-2xl md:text-3xl text-[#1a1c1a] mb-4">{t.contact.title}</h2>
                <p data-field="contact.subtitle" className="text-[#46483c] mb-8">{t.contact.subtitle}</p>
                <div className="space-y-6">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                    { label: t.contact.emailLabel, value: t.contact.email, valueField: 'contact.email' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri];
                    return (
                      <div key={row.valueField} className="flex items-start gap-4">
                        <RowIcon aria-hidden className="w-5 h-5 text-[#56642b] bg-white p-2 rounded-xl box-content shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-[#1a1c1a]">{row.label}</p>
                          <p data-field={row.valueField} className="text-[#46483c]">{row.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    data-track="cta_call"
                    data-field="contact.btnCall"
                    href={phoneHref}
                    className="inline-block bg-[#56642b] text-white text-sm font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-all"
                  >
                    {t.contact.btnCall}
                  </a>
                  <a
                    data-track="cta_direction"
                    data-field="contact.btnDirection"
                    href={t.contact.mapUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block border border-[#56642b]/30 text-[#56642b] text-sm font-medium px-8 py-3.5 rounded-full hover:bg-[#56642b]/10 transition-all"
                  >
                    {t.contact.btnDirection}
                  </a>
                </div>
                <div className="mt-8 flex gap-3">
                  <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#56642b] shadow-[0_10px_40px_-15px_rgba(86,100,43,0.2)] hover:bg-[#56642b] hover:text-white transition-all" href="#" aria-label="Facebook">
                    <Facebook aria-hidden className="w-5 h-5" />
                  </a>
                  <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#56642b] shadow-[0_10px_40px_-15px_rgba(86,100,43,0.2)] hover:bg-[#56642b] hover:text-white transition-all" href="#" aria-label="Zalo">
                    <MessageCircle aria-hidden className="w-5 h-5" />
                  </a>
                </div>
              </Reveal>
              <Reveal variant="fade-left" className="md:col-span-3 min-h-[360px] rounded-2xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(86,100,43,0.2)]">
                {t.contact.mapUrl ? (
                  <iframe
                    src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                    className="w-full h-full border-0 min-h-[360px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full min-h-[360px] bg-white flex items-center justify-center flex-col gap-3">
                    <MapPin aria-hidden className="w-14 h-14 text-[#56642b]" />
                    <p className="text-sm font-medium text-[#46483c]">{t.contact.mapLoading}</p>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#f4f3f1] rounded-t-2xl">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <span data-field="footer.brand" className="text-xl text-[#56642b] font-semibold">{t.footer.brand}</span>
            <div className="flex gap-8 flex-wrap justify-center text-sm">
              <a className="text-[#46483c]/70 hover:text-[#56642b] transition-colors" href="#">{t.footer.linkSustainability}</a>
              <a className="text-[#46483c]/70 hover:text-[#56642b] transition-colors" href="#">{t.footer.linkPrivacy}</a>
              <a className="text-[#46483c]/70 hover:text-[#56642b] transition-colors" href="#">{t.footer.linkExperience}</a>
              <a className="text-[#46483c]/70 hover:text-[#56642b] transition-colors" href="#contact">{t.footer.linkContact}</a>
            </div>
          </div>
          <div className="border-t border-[#c6c8b8]/40 pt-8">
            <p data-field="footer.copy" className="text-xs text-[#46483c]/60 text-center">{t.footer.copy}</p>
          </div>
        </div>
      </footer>

      {/* Mobile booking FAB */}
      <a
        href="#contact"
        data-track="cta_book_fab"
        aria-label={t.hero.btnSecondary}
        className="fixed bottom-6 right-6 bg-[#56642b] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(86,100,43,0.5)] hover:scale-110 transition-transform z-40 md:hidden"
      >
        <CalendarCheck aria-hidden className="w-7 h-7" />
      </a>
    </div>
  );
}
