import { useState } from 'react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';

type Lang = 'vi' | 'en';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson };
interface Props { lang?: string }

export default function Restaurant1({ lang: initialLang = 'vi' }: Props) {
  const [lang, setLang] = useState<Lang>(initialLang as Lang);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { hero: images.hero ?? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=70' };

  return (
    <div className="min-h-screen bg-[#FFFBF5] font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#7C3A1A]/95 backdrop-blur-md px-6 py-3 flex items-center justify-between shadow-lg">
        <span className="font-bold text-xl text-[#FEF3C7]">{t.shopName}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-100">
          <a href="#menu" className="hover:text-white cursor-pointer transition-colors">{t.nav.menu}</a>
          <a href="#about" className="hover:text-white cursor-pointer transition-colors">{t.nav.about}</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center text-xs font-medium gap-0.5">
            {(['vi', 'en'] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="text-amber-700 mx-1">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`cursor-pointer transition-colors ${lang === l ? 'text-white font-bold' : 'text-amber-300 hover:text-white'}`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          <button className="bg-[#FEF3C7] text-[#7C3A1A] text-sm font-semibold px-4 py-2 rounded-full hover:bg-amber-100 transition-colors cursor-pointer">
            {t.nav.reserve}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[480px] lg:h-[580px]">
          <img src={IMG.hero} alt={t.shopName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
          <div className="absolute inset-0 flex items-center px-8 lg:px-20">
            <div className="max-w-xl space-y-5">
              <span className="inline-block bg-[#FEF3C7] text-[#7C3A1A] text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
                {t.hero.badge}
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">{t.hero.title}</h1>
              <p className="text-base text-gray-200 leading-relaxed">{t.hero.desc}</p>
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
      <section id="menu" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#7C3A1A] mb-12">{t.menu.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.menu.items.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-md hover:border-amber-200 transition-all group cursor-pointer"
              >
                <div className="text-3xl mb-3">🍽️</div>
                <div className="font-bold text-gray-900 mb-1 group-hover:text-[#7C3A1A] transition-colors">{item.name}</div>
                <div className="text-sm text-gray-500 mb-3 leading-relaxed">{item.desc}</div>
                <div className="font-bold text-[#7C3A1A] text-lg">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section className="bg-[#7C3A1A] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl mb-1">🕐</div>
            <div className="font-bold">{t.info.hours}</div>
            <div className="text-amber-300 text-sm mt-0.5">{lang === 'vi' ? 'Giờ hoạt động' : 'Open hours'}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📞</div>
            <div className="font-bold">{t.info.phone}</div>
            <div className="text-amber-300 text-sm mt-0.5">Hotline</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📍</div>
            <div className="font-bold">{t.info.address}</div>
            <div className="text-amber-300 text-sm mt-0.5">{lang === 'vi' ? 'Địa chỉ' : 'Address'}</div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 text-center py-5 text-sm">{t.footer.copy}</footer>
    </div>
  );
}
