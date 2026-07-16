import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import { useTemplateLang } from '../../_shared/LanguageSwitcher';
import Reveal from '../../_shared/Reveal';
import imgHero from './images/hero.png';
import imgMap from './images/map.png';
import imgCoffee1 from './images/coffee1.png';
import imgCoffee2 from './images/coffee2.png';
import imgCoffee3 from './images/coffee3.png';
import imgCoffee4 from './images/coffee4.png';
import imgTea1 from './images/tea1.png';
import imgTea2 from './images/tea2.png';
import imgTea3 from './images/tea3.png';
import imgTea4 from './images/tea4.png';
import imgPastries1 from './images/pastries1.png';
import imgPastries2 from './images/pastries2.png';
import imgPastries3 from './images/pastries3.png';
import imgPastries4 from './images/pastries4.png';
import imgGallery1 from './images/gallery1.png';
import imgGallery2 from './images/gallery2.png';
import imgGallery3 from './images/gallery3.png';
import imgGallery4 from './images/gallery4.png';
import imgTestimonials1 from './images/testimonials1.png';
import imgTestimonials2 from './images/testimonials2.png';
import imgTestimonials3 from './images/testimonials3.png';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: Lang; }

const glassCard = {
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.3)',
} as const;

const IMAGES = {
  hero: imgHero,
  coffee: [
    imgCoffee1,
    imgCoffee2,
    imgCoffee3,
    imgCoffee4,
  ],
  tea: [
    imgTea1,
    imgTea2,
    imgTea3,
    imgTea4,
  ],
  pastries: [
    imgPastries1,
    imgPastries2,
    imgPastries3,
    imgPastries4,
  ],
  gallery: [
    imgGallery1,
    imgGallery2,
    imgGallery3,
    imgGallery4,
  ],
  testimonials: [
    imgTestimonials1,
    imgTestimonials2,
    imgTestimonials3,
  ],
  map: imgMap,
};

type Category = 'coffee' | 'tea' | 'pastries';

export default function Coffe3({ lang: propLang = 'vi' }: Props) {
  // Ngôn ngữ đổi qua LanguageSwitcher chung của PublicSitePage (truyền xuống bằng prop lang),
  // không có switcher riêng trong template này.
  const { activeLang: lang } = useTemplateLang(propLang, ['vi', 'en', 'zh', 'ko'] as const);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;

  function renderMenuItems(category: Category, defaultImgs: string[]) {
    const raw = t.menu[category].items;
    const items: typeof viJson.menu.coffee.items = Array.isArray(raw) ? raw : [];
    return items.map((item, i) => {
      const imgSrc = images[`menu_${category}_items_${i}`] ?? defaultImgs[i] ?? '';
      return (
        <Reveal key={i} variant="fade-up" delay={i * 90}>
        <div className="group bg-white p-3 rounded-2xl hover:shadow-xl transition-all border border-[#c2c6d4]/30">
          <div className="relative h-48 mb-3 overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={imgSrc} alt={item.name} loading="lazy" />
            {item.badge && (
              <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full ${item.badge === 'HOT' ? 'bg-[#ba1a1a] text-white' : 'bg-secondary text-white'}`}>{item.badge}</span>
            )}
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h4 data-field={`menu.${category}.items.${i}.name`} className="text-sm font-medium text-[#191c1e]">{item.name}</h4>
              <p data-field={`menu.${category}.items.${i}.desc`} className="text-xs font-semibold text-[#424752]">{item.desc}</p>
            </div>
            <span data-field={`menu.${category}.items.${i}.price`} className="text-sm font-medium text-primary">{item.price}</span>
          </div>
        </div>
        </Reveal>
      );
    });
  }

  return (
    <div className="bg-[#f7f9fb] font-inter text-[#191c1e]">
      {/* Nav */}
      <nav data-section="nav" className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md border-b border-[#c2c6d4]/30 shadow-sm">
        <div className="flex justify-between items-center px-10 py-3 max-w-[1280px] mx-auto">
          <a data-field="nav.brand" className="font-lexend text-2xl font-bold text-primary" href="#">{t.nav.brand}</a>
          <div className="hidden md:flex items-center gap-6">
            <a className="text-base text-primary border-b-2 border-primary pb-1" href="#">{t.nav.home}</a>
            <a className="text-base text-[#424752] hover:text-primary transition-colors" href="#menu">{t.nav.menu}</a>
            <a className="text-base text-[#424752] hover:text-primary transition-colors" href="#gallery">{t.nav.gallery}</a>
            <a className="text-base text-[#424752] hover:text-primary transition-colors" href="#reviews">{t.nav.reviews}</a>
            <a className="text-base text-[#424752] hover:text-primary transition-colors" href="#contact">{t.nav.contact}</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section data-section="hero" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${IMAGES.hero}')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fb]/80 via-[#f7f9fb]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-10 w-full">
          <div className="max-w-2xl space-y-6">
            <Reveal as="span" data-field="hero.badge" variant="fade-up" className="inline-block px-3 py-1 bg-[#cce5ff] text-[#004b73] rounded-full text-xs font-semibold tracking-wider uppercase">
              {t.hero.badge}
            </Reveal>
            <Reveal as="h1" variant="fade-up" delay={100} className="font-lexend text-[48px] leading-[1.2] font-bold tracking-[-0.02em] text-primary">
              <span data-field="hero.title">{t.hero.title}</span><br />
              <span data-field="hero.titleHighlight" className="text-secondary">{t.hero.titleHighlight}</span>
            </Reveal>
            <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={200} className="text-lg leading-[1.6] text-[#424752] max-w-lg">{t.hero.subtitle}</Reveal>
            <Reveal variant="fade-up" delay={300} className="flex gap-3 pt-6">
              <a className="bg-primary text-white px-20 py-6 rounded-2xl text-sm font-medium hover:scale-105 transition-all shadow-lg flex items-center gap-2" href="#menu">
                <span data-field="hero.btnMenu">{t.hero.btnMenu}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section data-section="menu" className="py-20 max-w-[1280px] mx-auto px-10" id="menu">
        <Reveal variant="fade-up" className="text-center mb-20 space-y-3">
          <h2 data-field="menu.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-primary">{t.menu.sectionTitle}</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
          <p data-field="menu.sectionSubtitle" className="text-base leading-[1.6] text-[#424752]">{t.menu.sectionSubtitle}</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
              <h3 className="font-lexend text-2xl font-semibold text-primary">{t.menu.coffee.title}</h3>
            </div>
            {renderMenuItems('coffee', IMAGES.coffee)}
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              <h3 className="font-lexend text-2xl font-semibold text-primary">{t.menu.tea.title}</h3>
            </div>
            {renderMenuItems('tea', IMAGES.tea)}
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bakery_dining</span>
              <h3 className="font-lexend text-2xl font-semibold text-primary">{t.menu.pastries.title}</h3>
            </div>
            {renderMenuItems('pastries', IMAGES.pastries)}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section data-section="gallery" className="py-20 bg-[#f2f4f6]" id="gallery">
        <div className="max-w-[1280px] mx-auto px-10">
          <Reveal variant="fade-up" className="text-center mb-20">
            <h2 data-field="gallery.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-primary">{t.gallery.sectionTitle}</h2>
            <p data-field="gallery.sectionSubtitle" className="text-base leading-[1.6] text-[#424752] mt-3">{t.gallery.sectionSubtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[800px] md:h-[600px]">
            <Reveal variant="zoom-in" className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group relative">
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <span className="text-white text-sm font-medium border border-white px-6 py-3 rounded-full">{t.gallery.viewAll}</span>
              </div>
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMAGES.gallery[0]} alt="Cozy ocean-view lounge area at The Ocean Cafe" loading="lazy" />
            </Reveal>
            <Reveal variant="zoom-in" delay={100} className="rounded-2xl overflow-hidden group">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMAGES.gallery[1]} alt="Outdoor seating deck facing the sea" loading="lazy" />
            </Reveal>
            <Reveal variant="zoom-in" delay={180} className="rounded-2xl overflow-hidden group">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMAGES.gallery[2]} alt="Coastal-themed interior corner with natural light" loading="lazy" />
            </Reveal>
            <Reveal variant="zoom-in" delay={260} className="md:col-span-2 rounded-2xl overflow-hidden group">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMAGES.gallery[3]} alt="Coffee bar and espresso counter" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section data-section="testimonials" className="py-20 max-w-[1280px] mx-auto px-10" id="reviews">
        <Reveal variant="fade-up" className="text-center mb-20">
          <h2 data-field="testimonials.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-primary">{t.testimonials.sectionTitle}</h2>
          <p data-field="testimonials.sectionSubtitle" className="text-base leading-[1.6] text-[#424752] mt-3">{t.testimonials.sectionSubtitle}</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {(Array.isArray(t.testimonials.items) ? t.testimonials.items : []).map((item, i) => (
            <Reveal key={i} variant="fade-up" delay={i * 120}>
            <div className="p-10 rounded-2xl shadow-sm border border-[#c2c6d4]/20 hover:-translate-y-2 transition-all h-full" style={glassCard}>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container">
                  <img className="w-full h-full object-cover" src={IMAGES.testimonials[i]} alt={item.name} loading="lazy" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-primary">{item.name}</h4>
                  <div className="flex text-secondary text-sm">
                    {Array.from({ length: Math.floor(item.stars) }).map((_, si) => (
                      <span key={si} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                    {item.stars % 1 !== 0 && (
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-base leading-[1.6] text-[#424752] italic">"{item.text}"</p>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section data-section="contact" className="py-20 bg-[#e6e8ea] overflow-hidden" id="contact">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="flex flex-col lg:flex-row gap-20 items-stretch">
            <Reveal variant="fade-right" className="lg:w-1/3 space-y-10">
              <div>
                <h2 data-field="contact.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-primary mb-3">{t.contact.sectionTitle}</h2>
                <p data-field="contact.sectionSubtitle" className="text-base leading-[1.6] text-[#424752]">{t.contact.sectionSubtitle}</p>
              </div>
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-primary p-3 bg-primary-container/10 rounded-full">location_on</span>
                  <div>
                    <p className="text-sm font-medium text-[#191c1e]">{t.contact.addressLabel}</p>
                    <p data-field="contact.address" className="text-base leading-[1.6] text-[#424752]">{t.contact.address}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-primary p-3 bg-primary-container/10 rounded-full">call</span>
                  <div>
                    <p className="text-sm font-medium text-[#191c1e]">{t.contact.phoneLabel}</p>
                    <a data-field="contact.phone" data-track="call" href={`tel:${t.contact.phone.replace(/\s+/g, '')}`} className="text-base leading-[1.6] text-[#424752] hover:text-primary transition-colors cursor-pointer">{t.contact.phone}</a>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-primary p-3 bg-primary-container/10 rounded-full">schedule</span>
                  <div>
                    <p className="text-sm font-medium text-[#191c1e]">{t.contact.hoursLabel}</p>
                    <p data-field="contact.hours" className="text-base leading-[1.6] text-[#424752]">{t.contact.hours}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={150} className="lg:w-2/3 min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-[#c2c6d4]/30">
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
                <img className="w-full h-full object-cover" src={IMAGES.map} alt={t.contact.address} loading="lazy" />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-section="footer" className="w-full py-20 bg-[#e0e3e5]">
        <Reveal variant="fade" className="flex flex-col md:flex-row justify-between items-center px-10 gap-6 max-w-[1280px] mx-auto">
          <div className="space-y-3 text-center md:text-left">
            <span data-field="footer.brand" className="font-lexend text-2xl font-bold text-primary block">{t.footer.brand}</span>
            <p data-field="footer.copyright" className="text-sm font-medium text-[#424752] max-w-xs">{t.footer.copyright}</p>
          </div>
          <div className="flex gap-6">
            <a className="text-[#424752] hover:text-secondary transition-colors text-sm font-medium" href="#">{t.footer.privacy}</a>
            <a className="text-[#424752] hover:text-secondary transition-colors text-sm font-medium" href="#">{t.footer.terms}</a>
            <a className="text-[#424752] hover:text-secondary transition-colors text-sm font-medium" href="#">{t.footer.careers}</a>
          </div>
          <div className="flex gap-3">
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">face_nod</span>
            </a>
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </a>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
