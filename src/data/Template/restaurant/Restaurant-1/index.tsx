import { Clock, Phone, MapPin, UtensilsCrossed } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHero from './images/hero.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
interface Props { lang?: string }

export default function Restaurant1({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { hero: images.hero ?? imgHero };

  return (
    <div className="min-h-screen bg-[#FFFBF5] font-sans">
      {/* Nav */}
      <nav data-section="nav" className="sticky top-0 z-50 bg-[#7C3A1A]/95 backdrop-blur-md px-6 py-3 flex items-center justify-between shadow-lg">
        <span data-field="shopName" className="font-bold text-xl text-[#FEF3C7]">{t.shopName}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-100">
          <a href="#menu" className="hover:text-white cursor-pointer transition-colors">{t.nav.menu}</a>
          <a href="#about" className="hover:text-white cursor-pointer transition-colors">{t.nav.about}</a>
        </div>
        <button data-track="reserve" className="bg-[#FEF3C7] text-[#7C3A1A] text-sm font-semibold px-4 py-2 rounded-full hover:bg-amber-100 transition-colors cursor-pointer">
          {t.nav.reserve}
        </button>
      </nav>

      {/* Hero */}
      <section data-section="hero" className="relative overflow-hidden">
        <div className="relative h-[480px] lg:h-[580px]">
          <img src={IMG.hero} alt={t.hero.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
          <div className="absolute inset-0 flex items-center px-8 lg:px-20">
            <div className="max-w-xl space-y-5">
              <span data-field="hero.badge" className="inline-block bg-[#FEF3C7] text-[#7C3A1A] text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
                {t.hero.badge}
              </span>
              <h1 data-field="hero.title" className="text-3xl lg:text-5xl font-bold text-white leading-tight">{t.hero.title}</h1>
              <p data-field="hero.desc" className="text-base text-gray-200 leading-relaxed">{t.hero.desc}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="bg-[#7C3A1A] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#5C2910] transition-colors cursor-pointer shadow-lg">
                  {t.hero.btnReserve}
                </button>
                <button className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                  {t.hero.btnMenu}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" data-section="menu" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 data-field="menu.title" className="text-3xl font-bold text-center text-[#7C3A1A] mb-12">{t.menu.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.menu.items.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-md hover:border-amber-200 transition-all group cursor-pointer"
              >
                <div className="mb-3"><UtensilsCrossed className="w-8 h-8 text-[#7C3A1A]" /></div>
                <div className="font-bold text-gray-900 mb-1 group-hover:text-[#7C3A1A] transition-colors">{item.name}</div>
                <div className="text-sm text-gray-500 mb-3 leading-relaxed">{item.desc}</div>
                <div className="font-bold text-[#7C3A1A] text-lg">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section data-section="info" className="bg-[#7C3A1A] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div>
            <Clock className="w-6 h-6 mx-auto mb-1" />
            <div data-field="info.hours" className="font-bold">{t.info.hours}</div>
            <div className="text-amber-300 text-sm mt-0.5">{t.info.hoursLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <Phone className="w-6 h-6 mx-auto mb-1" />
            <div data-field="info.phone" className="font-bold">{t.info.phone}</div>
            <div className="text-amber-300 text-sm mt-0.5">{t.info.phoneLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <MapPin className="w-6 h-6 mx-auto mb-1" />
            <div data-field="info.address" className="font-bold">{t.info.address}</div>
            <div className="text-amber-300 text-sm mt-0.5">{t.info.addressLabel}</div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section data-section="location" className="py-16 px-6 bg-[#FFFBF5]">
        <div className="max-w-5xl mx-auto">
          <h2 data-field="location.title" className="text-3xl font-bold text-center text-[#7C3A1A] mb-10">{t.location.title}</h2>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-amber-100 h-[380px]">
            {t.location.mapUrl ? (
              <iframe
                src={toGoogleMapsEmbedUrl(t.location.mapUrl)}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center gap-3 text-center px-6">
                <MapPin className="w-10 h-10 text-[#7C3A1A]" />
                <p className="font-bold text-[#7C3A1A] text-lg">{t.info.address}</p>
                <p className="text-sm text-gray-500">{t.info.hours} · {t.info.phone}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer data-section="footer" className="bg-gray-900 text-gray-400 text-center py-5 text-sm">
        <span data-field="footer.copy">{t.footer.copy}</span>
      </footer>
    </div>
  );
}
