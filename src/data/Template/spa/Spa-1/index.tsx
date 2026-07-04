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

export default function Spa1({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { hero: images.hero ?? 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=70' };

  return (
    <div className="min-h-screen bg-[#F0FDF4] font-sans">
      {/* Nav */}
      <nav data-section="nav" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <span data-field="shopName" className="font-bold text-xl text-[#3D7A5E]">{t.shopName}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#services" className="hover:text-[#3D7A5E] cursor-pointer transition-colors">{t.nav.services}</a>
          <a href="#about" className="hover:text-[#3D7A5E] cursor-pointer transition-colors">{t.nav.about}</a>
        </div>
        <button data-track="book" className="bg-[#3D7A5E] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#2D5E47] transition-colors cursor-pointer shadow-md shadow-green-200">
          {t.nav.book}
        </button>
      </nav>

      {/* Hero */}
      <section data-section="hero" className="relative overflow-hidden">
        <div className="relative h-[480px] lg:h-[580px]">
          <img src={IMG.hero} alt={t.shopName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D7A5E]/80 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 lg:px-20">
            <div className="max-w-xl space-y-5">
              <span data-field="hero.badge" className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide border border-white/30">
                {t.hero.badge}
              </span>
              <h1 data-field="hero.title" className="text-3xl lg:text-5xl font-bold text-white leading-tight">{t.hero.title}</h1>
              <p data-field="hero.desc" className="text-base text-green-50 leading-relaxed">{t.hero.desc}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="bg-white text-[#3D7A5E] font-semibold px-6 py-3 rounded-full hover:bg-green-50 transition-colors cursor-pointer shadow-lg">
                  {t.hero.btnBook}
                </button>
                <button className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                  {t.hero.btnLearn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" data-section="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 data-field="services.title" className="text-3xl font-bold text-center text-[#3D7A5E] mb-12">{t.services.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 hover:shadow-md hover:border-green-200 transition-all group cursor-pointer"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-gray-900 mb-1 group-hover:text-[#3D7A5E] transition-colors">{item.name}</div>
                <div className="text-sm text-gray-500 mb-3 leading-relaxed">{item.desc}</div>
                <div className="font-semibold text-[#3D7A5E]">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section data-section="info" className="bg-[#3D7A5E] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl mb-1">🕐</div>
            <div data-field="info.hours" className="font-bold">{t.info.hours}</div>
            <div className="text-green-200 text-sm mt-0.5">{t.info.hoursLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📞</div>
            <div data-field="info.phone" className="font-bold">{t.info.phone}</div>
            <div className="text-green-200 text-sm mt-0.5">{t.info.phoneLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📍</div>
            <div data-field="info.address" className="font-bold">{t.info.address}</div>
            <div className="text-green-200 text-sm mt-0.5">{t.info.addressLabel}</div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section data-section="location" className="py-16 px-6 bg-[#F0FDF4]">
        <div className="max-w-5xl mx-auto">
          <h2 data-field="location.title" className="text-3xl font-bold text-center text-[#3D7A5E] mb-10">{t.location.title}</h2>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-green-100 h-[380px]">
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
              <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col items-center justify-center gap-3 text-center px-6">
                <span className="text-4xl">📍</span>
                <p className="font-bold text-[#3D7A5E] text-lg">{t.info.address}</p>
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
