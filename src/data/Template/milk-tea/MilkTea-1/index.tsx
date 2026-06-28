import { useState } from 'react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';

type Lang = 'vi' | 'en';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson };
interface Props { lang?: string }

export default function MilkTea1({ lang: initialLang = 'vi' }: Props) {
  const [lang, setLang] = useState<Lang>(initialLang as Lang);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { hero: images.hero ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=70' };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <span className="font-bold text-xl text-[#E91E8C]">{t.shopName}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#menu" className="hover:text-[#E91E8C] cursor-pointer transition-colors">{t.nav.menu}</a>
          <a href="#about" className="hover:text-[#E91E8C] cursor-pointer transition-colors">{t.nav.about}</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center text-xs font-medium gap-0.5">
            {(['vi', 'en'] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="text-pink-200 mx-1">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`cursor-pointer transition-colors ${lang === l ? 'text-[#E91E8C] font-bold' : 'text-gray-400 hover:text-[#E91E8C]'}`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          <button className="bg-[#E91E8C] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#C2185B] transition-colors cursor-pointer shadow-md shadow-pink-200">
            {t.nav.orderNow}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <span className="inline-block bg-pink-100 text-[#E91E8C] text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{t.hero.title}</h1>
            <p className="text-lg text-gray-500 leading-relaxed">{t.hero.desc}</p>
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
      <section id="menu" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.menu.title}</h2>
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
      <section className="bg-[#E91E8C] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl mb-1">🕐</div>
            <div className="font-bold">{t.info.hours}</div>
            <div className="text-pink-200 text-sm mt-0.5">{lang === 'vi' ? 'Giờ hoạt động' : 'Open hours'}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📞</div>
            <div className="font-bold">{t.info.phone}</div>
            <div className="text-pink-200 text-sm mt-0.5">Hotline</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📍</div>
            <div className="font-bold">{t.info.address}</div>
            <div className="text-pink-200 text-sm mt-0.5">{lang === 'vi' ? 'Địa chỉ' : 'Address'}</div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 text-center py-5 text-sm">{t.footer.copy}</footer>
    </div>
  );
}
