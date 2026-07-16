import { useRef } from 'react';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import { useTemplateLang } from '../../_shared/LanguageSwitcher';
import Reveal from '../../_shared/Reveal';
import imgMenuImgs2 from './images/menuImgs2.png';
import imgMenuImgs3 from './images/menuImgs3.png';
import imgMenuImgs4 from './images/menuImgs4.png';
import imgMenuImgs5 from './images/menuImgs5.png';
import imgMenuImgs6 from './images/menuImgs6.png';
import imgMenuImgs7 from './images/menuImgs7.png';
import imgMenuImgs8 from './images/menuImgs8.png';
import imgMenuImgs9 from './images/menuImgs9.png';
import imgMenuImgs10 from './images/menuImgs10.png';
import imgGalleryImgs1 from './images/galleryImgs1.png';
import imgGalleryImgs2 from './images/galleryImgs2.png';
import imgGalleryImgs3 from './images/galleryImgs3.png';
import imgGalleryImgs4 from './images/galleryImgs4.png';
import imgGalleryImgs5 from './images/galleryImgs5.png';
import imgAvatarImgs1 from './images/avatarImgs1.png';
import imgAvatarImgs2 from './images/avatarImgs2.png';
import imgAvatarImgs3 from './images/avatarImgs3.png';
import imgMapImg from './images/mapImg.png';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: Lang; }

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR5n9B0_RVMJxE2RqfpBBcJi60BO0k3wk_GecmGPTjBbXxDaQz_1lIQq9gALjkaSGJQvj_vb3OM0qKp1t36oTPjPi9LLQK9b7YWsNbLO-s-nTBvKBCGxaO_1Z5h8aKSLrfKiqXS1RX3bBHZC9MnXKqQ9SqEpBiX0uRJhVIqp_i7WT9sEV4y9A2Dp8cxSQTYjZ_SL6v0rkCbEoJHK2w8cePMfqyU0Jh5VFcmyeE6bI1bVqRlKHKBPkCZP1JmA6OAHyvf6Toi_TM';

const MENU_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDpQjR7FLLMBxRdGVvHn0HBs4wB2f5BEwD5LXl4t1QL-yRG-aLhNPHC1KqpGC9z3LBUa5xzaRIPpH-TtBVPJa-BJ4YwnRGicvVwrSz-pvFwVuBbaCJJ9M6LiivFqZs4lJLe03zKB0yKI0v5-9DPFZ-p0aE_3Y7V6JgPPHE8c7n8dpq1gnHo7i_FnNMY4JkVsrZ4x1j5VJjxakxjMKaEt3eBbFSmLKvD6W8JrZ2g-d3Kp55OlXs-v9ACDKiKiGxcX8p3aMFkLniTz5A',
  imgMenuImgs2,
  imgMenuImgs3,
  imgMenuImgs4,
  imgMenuImgs5,
  imgMenuImgs6,
  imgMenuImgs7,
  imgMenuImgs8,
  imgMenuImgs9,
  imgMenuImgs10,
];

const GALLERY_IMGS = [
  imgGalleryImgs1,
  imgGalleryImgs2,
  imgGalleryImgs3,
  imgGalleryImgs4,
  imgGalleryImgs5,
];

const AVATAR_IMGS = [
  imgAvatarImgs1,
  imgAvatarImgs2,
  imgAvatarImgs3,
];

const MAP_IMG = imgMapImg;

export default function Coffe5({ lang: propLang = 'vi' }: Props) {
  // Ngôn ngữ đổi qua LanguageSwitcher chung của PublicSitePage (truyền xuống bằng prop lang),
  // không có switcher riêng trong template này.
  const { activeLang: lang } = useTemplateLang(propLang, ['vi', 'en', 'zh', 'ko'] as const);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(dir: 'prev' | 'next') {
    carouselRef.current?.scrollBy({ left: dir === 'next' ? 300 : -300, behavior: 'smooth' });
  }

  return (
    <div className="bg-[#FFFBEB] text-[#191c1e] font-inter">
      <style>{`
        .scrollbar-hide { scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header */}
      <header data-section="nav" className="fixed top-0 w-full z-50 bg-[#FFFBEB]/80 backdrop-blur-md shadow-sm">
        <nav className="flex justify-between items-center px-6 py-3 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3">
            <span data-field="nav.brand" className="font-lexend text-2xl tracking-tight text-primary">{t.nav.brand}</span>
            <div className="h-6 w-px bg-[#c2c6d4]" />
            <div className="flex items-center gap-1 font-bold text-[#92400e] text-sm">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bubble_chart</span>
              {t.nav.shopName}
            </div>
          </div>
          <div className="hidden md:flex gap-8">
            <a className="text-[#92400e] font-bold border-b-2 border-[#92400e] pb-1 text-sm" href="#">{t.nav.home}</a>
            <a className="text-[#57534e] hover:text-[#92400e] transition-colors text-sm" href="#menu">{t.nav.menu}</a>
            <a className="text-[#57534e] hover:text-[#92400e] transition-colors text-sm" href="#gallery">{t.nav.space}</a>
            <a className="text-[#57534e] hover:text-[#92400e] transition-colors text-sm" href="#contact">{t.nav.contact}</a>
          </div>
        </nav>
      </header>

      <main className="pt-[72px]">
        {/* Hero */}
        <section data-section="hero" className="py-20 px-6 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal variant="fade-up" className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEF3C7] text-[#92400e] text-xs font-semibold rounded-full mb-6 border border-[#fde68a]">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span data-field="hero.badge">{t.hero.badge}</span>
            </Reveal>
            <Reveal as="h1" variant="fade-up" delay={100} className="font-lexend text-[48px] leading-[1.2] font-bold tracking-[-0.02em] text-[#191c1e]">
              <span data-field="hero.title">{t.hero.title}</span>{' '}
              <span data-field="hero.titleHighlight" className="text-[#92400e]">{t.hero.titleHighlight}</span>
            </Reveal>
            <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={200} className="text-lg leading-[1.6] text-[#57534e] mt-6 mb-10">{t.hero.subtitle}</Reveal>
            <Reveal variant="fade-up" delay={300} className="flex flex-wrap gap-6">
              <a data-field="hero.btnMenu" className="bg-[#92400e] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#78350f] transition-colors shadow-lg" href="#menu">{t.hero.btnMenu}</a>
              <a data-field="hero.btnGallery" className="border border-[#92400e]/30 text-[#92400e] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#FEF3C7] transition-colors" href="#gallery">{t.hero.btnGallery}</a>
            </Reveal>
          </div>
          <Reveal variant="zoom-in" delay={200} duration={800} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img className="w-full h-[500px] object-cover" src={images['hero'] ?? HERO_IMG} alt={t.hero.badge} />
            </div>
            <div className="absolute -top-6 -right-6 bg-[#92400e] text-white px-4 py-2 rounded-2xl text-xs font-semibold shadow-xl animate-bounce">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {t.hero.badgeBestSeller}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FEF3C7] text-[#92400e] px-4 py-2 rounded-2xl text-xs font-semibold border border-[#fde68a] shadow-xl animate-pulse">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                {t.hero.badgeOrganic}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Menu Carousel */}
        <section data-section="menuSection" className="py-20 bg-[#FEF3C7]/50" id="menu">
          <div className="max-w-[1280px] mx-auto px-6">
            <Reveal variant="fade-up" className="flex justify-between items-end mb-10">
              <div>
                <h2 data-field="menuSection.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#191c1e]">{t.menuSection.sectionTitle}</h2>
                <p data-field="menuSection.sectionSubtitle" className="text-base text-[#57534e] mt-1">{t.menuSection.sectionSubtitle}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => scrollCarousel('prev')} className="w-10 h-10 rounded-full border border-[#fde68a] bg-white text-[#92400e] flex items-center justify-center hover:bg-[#FEF3C7] transition-all cursor-pointer">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button onClick={() => scrollCarousel('next')} className="w-10 h-10 rounded-full border border-[#fde68a] bg-white text-[#92400e] flex items-center justify-center hover:bg-[#FEF3C7] transition-all cursor-pointer">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </Reveal>
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-6"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {(Array.isArray(t.menuSection.items) ? t.menuSection.items : []).map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i < 4 ? i * 100 : 0} className="w-[280px] flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="h-48 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images[`menuSection_items_${i}`] ?? MENU_IMGS[i % MENU_IMGS.length]} alt={item.name} loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 data-field={`menuSection.items.${i}.name`} className="font-bold text-[#191c1e] text-base mb-1">{item.name}</h3>
                    <div className="flex justify-between items-center mt-3">
                      <span data-field={`menuSection.items.${i}.price`} className="font-bold text-[#92400e]">{item.price}</span>
                      <button className="bg-[#92400e] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#78350f] transition-colors cursor-pointer">
                        {t.menuSection.addToCart}
                      </button>
                    </div>
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Bento */}
        <section data-section="gallery" className="py-20 bg-[#FFFBEB]" id="gallery">
          <div className="max-w-[1280px] mx-auto px-6">
            <Reveal variant="fade-up" className="text-center mb-10">
              <div className="flex justify-center gap-3 mb-3">
                {t.gallery.hashtags.map((tag, i) => (
                  <span key={i} className="text-xs font-semibold text-[#92400e] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#fde68a]">{tag}</span>
                ))}
              </div>
              <h2 data-field="gallery.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#191c1e]">{t.gallery.sectionTitle}</h2>
              <p data-field="gallery.sectionSubtitle" className="text-base text-[#57534e] mt-1">{t.gallery.sectionSubtitle}</p>
            </Reveal>
            <div className="grid grid-cols-12 gap-6 h-[600px]">
              <Reveal as="article" variant="zoom-in" className="col-span-6 row-span-2 rounded-2xl overflow-hidden group relative h-full">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={images['gallery_0'] ?? GALLERY_IMGS[0]} alt={t.gallery.mainTitle} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-white font-lexend text-2xl font-semibold">{t.gallery.mainTitle}</h3>
                  <p className="text-white/80 text-xs font-semibold mt-1">{t.gallery.mainDesc}</p>
                </div>
              </Reveal>
              <Reveal as="article" variant="zoom-in" delay={100} className="col-span-3 rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images['gallery_1'] ?? GALLERY_IMGS[1]} alt="Cozy check-in corner with warm decor" loading="lazy" />
              </Reveal>
              <Reveal as="article" variant="zoom-in" delay={180} className="col-span-3 rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images['gallery_2'] ?? GALLERY_IMGS[2]} alt="Aesthetic seating area with plants" loading="lazy" />
              </Reveal>
              <Reveal as="article" variant="zoom-in" delay={260} className="col-span-3 rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images['gallery_3'] ?? GALLERY_IMGS[3]} alt="Fresh milk tea drinks on display" loading="lazy" />
              </Reveal>
              <Reveal as="article" variant="zoom-in" delay={340} className="col-span-3 rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images['gallery_4'] ?? GALLERY_IMGS[4]} alt="Guests enjoying drinks at the counter" loading="lazy" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Testimonials — middle card elevated */}
        <section data-section="testimonials" className="py-20 bg-[#FEF3C7]/50">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <Reveal as="h2" data-field="testimonials.sectionTitle" variant="fade-up" className="font-lexend text-[32px] leading-[1.3] font-semibold mb-20">{t.testimonials.sectionTitle}</Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {(Array.isArray(t.testimonials.items) ? t.testimonials.items : []).map((item, i) => (
                // Card giữa có class scale-105 (transform tĩnh) → Reveal phải bọc ngoài, không làm chính card
                <Reveal key={i} variant="fade-up" delay={i * 120}>
                <div
                  className={`bg-white rounded-2xl p-10 text-left transition-all duration-300 ${i === 1 ? 'scale-105 z-10 shadow-2xl' : 'shadow-sm'}`}
                >
                  <div className="flex gap-1 mb-6 text-amber-400">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <span key={si} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-base leading-[1.6] text-[#57534e] mb-6 italic">"{item.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#fde68a]">
                      <img className="w-full h-full object-cover" src={images[`avatar_${i}`] ?? AVATAR_IMGS[i]} alt={item.name} loading="lazy" />
                    </div>
                    <div>
                      <p className="text-sm font-medium font-bold text-[#191c1e]">{item.name}</p>
                      <p className="text-xs font-semibold text-[#92400e]">{item.role}</p>
                    </div>
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact — primary panel + map */}
        <section data-section="contact" className="py-20 px-6 max-w-[1280px] mx-auto" id="contact">
          <Reveal variant="fade-up" duration={800} className="rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="md:w-2/5 bg-primary text-white p-10 flex flex-col justify-center">
              <h2 data-field="contact.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold mb-10 whitespace-pre-line">{t.contact.sectionTitle}</h2>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <span className="material-symbols-outlined">location_on</span>
                  <div>
                    <p className="font-bold text-xs font-semibold opacity-80 uppercase tracking-wide">{t.contact.addressLabel}</p>
                    <p data-field="contact.address" className="text-base mt-1">{t.contact.address}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined">call</span>
                  <div>
                    <p className="font-bold text-xs font-semibold opacity-80 uppercase tracking-wide">{t.contact.phoneLabel}</p>
                    <a data-field="contact.phone" data-track="call" href={`tel:${t.contact.phone.replace(/\s+/g, '')}`} className="text-base mt-1 hover:underline cursor-pointer inline-block">{t.contact.phone}</a>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined">schedule</span>
                  <div>
                    <p className="font-bold text-xs font-semibold opacity-80 uppercase tracking-wide">{t.contact.hoursLabel}</p>
                    <p data-field="contact.hours" className="text-base mt-1">{t.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-3/5 relative min-h-[400px]">
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
                <img className="w-full h-full object-cover" src={images['map'] ?? MAP_IMG} alt={t.contact.mapLabel} loading="lazy" />
              )}
              <div className="absolute top-6 right-6 bg-white px-3 py-1 rounded-full text-xs font-semibold text-[#92400e] shadow-md">
                {t.contact.mapLabel}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-primary text-white py-20">
        <Reveal variant="fade" className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span data-field="footer.brand" className="font-lexend text-2xl font-bold">{t.footer.brand}</span>
              <div className="h-5 w-px bg-white/30" />
              <div className="flex items-center gap-1 text-sm font-bold">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>bubble_chart</span>
                {t.footer.shopName}
              </div>
            </div>
            <p data-field="footer.desc" className="text-sm opacity-80 max-w-xs">{t.footer.desc}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-6 opacity-80 uppercase tracking-widest">{t.footer.exploreTitle}</h4>
            <ul className="space-y-3">
              {t.footer.exploreLinks.map((link, i) => (
                <li key={i}><a className="text-sm opacity-80 hover:opacity-100 transition-opacity hover:underline" href="#">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 opacity-80 uppercase tracking-widest">{t.footer.newsletterTitle}</h4>
            <p className="text-sm opacity-70 mb-6">{t.footer.newsletterDesc}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.newsletterPlaceholder}
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm placeholder:opacity-60 focus:outline-none focus:border-white/50"
              />
              <button type="submit" data-track="newsletter-submit" className="px-6 py-2 bg-white text-primary rounded-full text-sm font-medium hover:bg-[#e0e3e5] transition-colors cursor-pointer">
                {t.footer.newsletterBtn}
              </button>
            </form>
          </div>
        </Reveal>
        <div className="max-w-[1280px] mx-auto px-6 mt-10 pt-10 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-3 text-xs opacity-70">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <a className="hover:opacity-100 transition-opacity" href="#">{t.footer.privacy}</a>
            <a className="hover:opacity-100 transition-opacity" href="#">{t.footer.terms}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
