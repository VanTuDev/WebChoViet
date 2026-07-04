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

export default function MilkTea1({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { hero: images.hero ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=70' };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav data-section="nav" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <span data-field="shopName" className="font-bold text-xl text-[#E91E8C]">{t.shopName}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#menu" className="hover:text-[#E91E8C] cursor-pointer transition-colors">{t.nav.menu}</a>
          <a href="#about" className="hover:text-[#E91E8C] cursor-pointer transition-colors">{t.nav.about}</a>
        </div>
        <button data-track="order" className="bg-[#E91E8C] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#C2185B] transition-colors cursor-pointer shadow-md shadow-pink-200">
          {t.nav.orderNow}
        </button>
      </nav>

      {/* Hero */}
      <section data-section="hero" className="overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <span data-field="hero.badge" className="inline-block bg-pink-100 text-[#E91E8C] text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
              {t.hero.badge}
            </span>
            <h1 data-field="hero.title" className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{t.hero.title}</h1>
            <p data-field="hero.desc" className="text-lg text-gray-500 leading-relaxed">{t.hero.desc}</p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-[#E91E8C] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#C2185B] transition-colors shadow-lg shadow-pink-200/60 cursor-pointer">
                {t.hero.btnOrder}
              </button>
              <button className="border-2 border-[#E91E8C] text-[#E91E8C] font-semibold px-6 py-3 rounded-full hover:bg-pink-50 transition-colors cursor-pointer">
                {t.hero.btnMenu}
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-purple-200 rounded-3xl rotate-3 scale-105 opacity-40 blur-sm" />
              <img src={IMG.hero} alt={t.shopName} className="relative w-full h-80 lg:h-96 rounded-3xl object-cover shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" data-section="menu" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 data-field="menu.title" className="text-3xl font-bold text-center text-gray-900 mb-12">{t.menu.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.menu.items.map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100 hover:shadow-lg hover:shadow-pink-100 transition-all group cursor-pointer"
              >
                <div className="text-3xl mb-3">🧋</div>
                <div className="font-bold text-gray-900 mb-1 group-hover:text-[#E91E8C] transition-colors">{item.name}</div>
                <div className="text-sm text-gray-500 mb-3 leading-relaxed">{item.desc}</div>
                <div className="font-bold text-[#E91E8C] text-lg">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section data-section="info" className="bg-[#E91E8C] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl mb-1">🕐</div>
            <div data-field="info.hours" className="font-bold">{t.info.hours}</div>
            <div className="text-pink-200 text-sm mt-0.5">{t.info.hoursLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📞</div>
            <div data-field="info.phone" className="font-bold">{t.info.phone}</div>
            <div className="text-pink-200 text-sm mt-0.5">{t.info.phoneLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📍</div>
            <div data-field="info.address" className="font-bold">{t.info.address}</div>
            <div className="text-pink-200 text-sm mt-0.5">{t.info.addressLabel}</div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section data-section="location" className="py-16 px-6 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 data-field="location.title" className="text-3xl font-bold text-center text-gray-900 mb-10">{t.location.title}</h2>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-pink-100 h-[380px]">
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
              <div className="w-full h-full bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center gap-3 text-center px-6">
                <span className="text-4xl">📍</span>
                <p className="font-bold text-gray-900 text-lg">{t.info.address}</p>
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
