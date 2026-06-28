import { useState } from 'react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';

type Lang = 'vi' | 'en';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson };
interface Props { lang?: string }

export default function Gym1({ lang: initialLang = 'vi' }: Props) {
  const [lang, setLang] = useState<Lang>(initialLang as Lang);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { hero: images.hero ?? 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=70' };

  return (
    <div className="min-h-screen bg-[#0F0F0F] font-sans text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <span className="font-black text-xl text-[#F97316] tracking-wider">{t.shopName}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#programs" className="hover:text-[#F97316] cursor-pointer transition-colors">{t.nav.programs}</a>
          <a href="#membership" className="hover:text-[#F97316] cursor-pointer transition-colors">{t.nav.membership}</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center text-xs font-medium gap-0.5">
            {(['vi', 'en'] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="text-gray-600 mx-1">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`cursor-pointer transition-colors ${lang === l ? 'text-[#F97316] font-bold' : 'text-gray-500 hover:text-[#F97316]'}`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          <button className="bg-[#F97316] text-white text-sm font-black px-5 py-2 rounded-full hover:bg-[#EA6E0C] transition-colors cursor-pointer tracking-wide">
            {t.nav.join}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden h-[550px] lg:h-[650px]">
        <img src={IMG.hero} alt={t.shopName} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 lg:px-20">
          <div className="max-w-2xl space-y-5">
            <span className="inline-block bg-[#F97316]/20 text-[#F97316] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest border border-[#F97316]/30">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-base text-gray-300 leading-relaxed max-w-lg">{t.hero.desc}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button className="bg-[#F97316] text-white font-black px-8 py-3 rounded-full hover:bg-[#EA6E0C] transition-colors cursor-pointer tracking-wide uppercase text-sm">
                {t.hero.btnJoin}
              </button>
              <button className="border-2 border-white/30 text-white font-bold px-6 py-3 rounded-full hover:border-white/60 transition-colors cursor-pointer text-sm">
                {t.hero.btnVisit}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 px-6 bg-[#111827]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12 uppercase tracking-wide">
            {t.programs.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.programs.items.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#F97316]/50 hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-black text-white mb-0.5 group-hover:text-[#F97316] transition-colors text-lg">{item.name}</div>
                <div className="text-xs text-[#F97316] font-semibold mb-2 uppercase tracking-wider">{item.level}</div>
                <div className="text-sm text-gray-400 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="py-20 px-6 bg-[#0F0F0F]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12 uppercase tracking-wide">
            {t.membership.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.membership.plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border ${
                  plan.popular
                    ? 'bg-[#F97316] border-[#F97316]'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="text-xs font-black uppercase tracking-widest mb-3 text-white/80">
                    ⭐ {lang === 'vi' ? 'Phổ Biến Nhất' : 'Most Popular'}
                  </div>
                )}
                <div className="font-black text-2xl text-white mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-0.5 mb-5">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-sm text-white/70">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-white/90">
                      <span className={plan.popular ? 'text-white' : 'text-[#F97316]'}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-black text-sm uppercase tracking-wide cursor-pointer transition-all ${
                    plan.popular
                      ? 'bg-white text-[#F97316] hover:bg-gray-100'
                      : 'bg-[#F97316] text-white hover:bg-[#EA6E0C]'
                  }`}
                >
                  {lang === 'vi' ? 'Đăng Ký Ngay' : 'Sign Up Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section className="bg-[#F97316] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl mb-1">🕐</div>
            <div className="font-black">{t.info.hours}</div>
            <div className="text-orange-100 text-sm mt-0.5">{lang === 'vi' ? 'Giờ hoạt động' : 'Open hours'}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📞</div>
            <div className="font-black">{t.info.phone}</div>
            <div className="text-orange-100 text-sm mt-0.5">Hotline</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📍</div>
            <div className="font-black">{t.info.address}</div>
            <div className="text-orange-100 text-sm mt-0.5">{lang === 'vi' ? 'Địa chỉ' : 'Address'}</div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-gray-500 text-center py-5 text-sm">{t.footer.copy}</footer>
    </div>
  );
}
