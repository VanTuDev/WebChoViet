import type { CSSProperties } from 'react';
import { ArrowRight, Dumbbell, UserCheck, Flower2, Star, Check, MapPin, Phone, Mail, User } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';

// Icon dịch vụ gán theo thứ tự item (Phòng Gym Hiện Đại, Huấn Luyện Cá Nhân, Yoga & Tĩnh Tâm)
// — icon trang trí, không phải nội dung nên không nằm trong i18n
const PROGRAM_ICONS = [Dumbbell, UserCheck, Flower2];

import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
interface Props { lang?: string }

// Tactile neumorphism — chữ ký thị giác riêng của Terra Strength (khác 3D-glass của Gym-2,
// futuristic-glass của Gym-4): bề mặt "nổi/lõm" bằng box-shadow đôi thay vì border phẳng.
const RAISED: CSSProperties = {
  boxShadow: '-6px -6px 12px rgba(238,189,142,0.05), 6px 6px 12px rgba(0,0,0,0.4)',
  border: '1px solid rgba(166,124,82,0.1)',
};
const RECESSED: CSSProperties = {
  boxShadow: 'inset -4px -4px 8px rgba(238,189,142,0.02), inset 4px 4px 8px rgba(0,0,0,0.5)',
  backgroundColor: '#0f0e0d',
};

export default function Gym3({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = {
    hero: images.hero ?? 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&auto=format&fit=crop&q=70',
    program_0: images.program_0 ?? 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&auto=format&fit=crop&q=70',
    program_1: images.program_1 ?? 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=700&auto=format&fit=crop&q=70',
    program_2: images.program_2 ?? 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=700&auto=format&fit=crop&q=70',
  };
  const PROGRAM_IMAGES = [IMG.program_0, IMG.program_1, IMG.program_2];

  return (
    <div className="min-h-screen bg-[#141312] font-sans text-[#E6E1DF]">
      {/* Nav */}
      <header data-section="nav" className="sticky top-0 z-50 bg-[#141312]/85 backdrop-blur-xl border-b border-[#B4885D]/20 px-6 py-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <span data-field="shopName" className="font-black text-lg uppercase tracking-tight text-[#EEBD8E]">{t.shopName}</span>
          <div className="hidden md:flex items-center gap-7 text-sm text-[#D4C4B7]">
            <a href="#programs" className="hover:text-[#EEBD8E] cursor-pointer transition-colors">{t.nav.programs}</a>
            <a href="#membership" className="hover:text-[#EEBD8E] cursor-pointer transition-colors">{t.nav.membership}</a>
            <a href="#contact" className="hover:text-[#EEBD8E] cursor-pointer transition-colors">{t.nav.contact}</a>
          </div>
          <a href="#membership" data-track="join" className="text-sm font-semibold text-[#EEBD8E] border border-[#EEBD8E]/40 rounded-lg px-4 py-1.5 hover:bg-[#EEBD8E]/10 transition-colors cursor-pointer">
            {t.nav.join}
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section data-section="hero" className="relative overflow-hidden min-h-[80vh] flex items-center">
        <img src={IMG.hero} alt={t.shopName} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141312] via-[#141312]/70 to-transparent" />
        <div className="relative z-10 px-6 lg:px-16 max-w-2xl space-y-6 py-24">
          <span data-field="hero.badge" className="block text-xs font-semibold uppercase tracking-[0.3em] text-[#EEBD8E]">{t.hero.badge}</span>
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span data-field="hero.title">{t.hero.title}</span><br />
            <span data-field="hero.titleAccent" className="bg-gradient-to-r from-[#FFDCBD] to-[#EEBD8E] bg-clip-text text-transparent">{t.hero.titleAccent}</span>
          </h1>
          <p data-field="hero.desc" className="text-base text-[#D4C4B7] leading-relaxed max-w-xl">{t.hero.desc}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button data-track="join-hero" className="flex items-center gap-2 bg-gradient-to-r from-[#EEBD8E] to-[#B4885D] text-[#2C1600] font-bold px-7 py-3.5 rounded-xl hover:brightness-105 transition-all cursor-pointer text-sm">
              {t.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-[#B4885D]/40 text-[#E6E1DF] font-semibold px-7 py-3.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer text-sm">
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* Programs / Services bento */}
      <section id="programs" data-section="programs" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-3">
            <h2 data-field="programs.title" className="text-3xl lg:text-4xl font-extrabold">{t.programs.title}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#EEBD8E] to-[#B4885D] mx-auto rounded-full" />
            <p data-field="programs.subtitle" className="text-[#D4C4B7] text-sm">{t.programs.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {t.programs.items.map((item, i) => {
              const Icon = PROGRAM_ICONS[i % PROGRAM_ICONS.length];
              return (
                <div
                  key={i}
                  style={RAISED}
                  className={`relative overflow-hidden rounded-xl min-h-[280px] group ${i === 0 ? 'md:col-span-8' : 'md:col-span-4'}`}
                >
                  <img src={PROGRAM_IMAGES[i]} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-[#0F0E0D]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <Icon className="w-7 h-7 text-[#EEBD8E] mb-2" />
                    <h3 className="font-bold text-white text-lg mb-1.5">{item.name}</h3>
                    <p className="text-sm text-[#D4C4B7] max-w-md leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}

            {/* Bento bonus card — công nghệ Aura Fit + vòng chỉ số 98% */}
            <div data-section="tech" style={RECESSED} className="md:col-span-8 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-[#B4885D]/10">
              <div className="flex-1">
                <h3 data-field="tech.title" className="font-bold text-[#EEBD8E] text-lg mb-2">{t.tech.title}</h3>
                <p data-field="tech.desc" className="text-sm text-[#D4C4B7] leading-relaxed">{t.tech.desc}</p>
              </div>
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#EEBD8E]/20" />
                <div className="absolute inset-0 rounded-full border-4 border-[#EEBD8E] border-t-transparent rotate-45" />
                <span className="font-extrabold text-2xl text-[#EEBD8E]">{t.tech.stat}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" data-section="membership" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <h2 data-field="membership.title" className="text-3xl lg:text-4xl font-extrabold">{t.membership.title}</h2>
            <p data-field="membership.subtitle" className="text-[#D4C4B7] text-sm">{t.membership.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.membership.plans.map((plan, i) => (
              <div
                key={i}
                style={plan.popular ? undefined : RAISED}
                className={`relative rounded-xl p-8 flex flex-col h-full ${
                  plan.popular
                    ? 'bg-[#2B2A28] border-2 border-[#EEBD8E] shadow-2xl'
                    : 'bg-[#211F1E]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#EEBD8E] to-[#B4885D] text-[#2C1600] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    {t.membership.popularBadge}
                  </div>
                )}
                <span className={`text-xs font-bold uppercase tracking-widest mb-4 ${plan.popular ? 'text-[#EEBD8E]' : 'text-[#D4C4B7]'}`}>{plan.name}</span>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-[#D4C4B7] text-sm"> {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 text-sm text-[#D4C4B7]">
                      <Check className="w-4 h-4 shrink-0 text-[#EEBD8E]" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all mt-auto ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#EEBD8E] to-[#B4885D] text-[#2C1600] hover:brightness-105'
                      : 'border border-[#B4885D]/30 text-white hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section data-section="testimonials" className="py-24 px-6 bg-[#1D1B1A] border-y border-[#B4885D]/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <h2 data-field="testimonials.title" className="text-3xl lg:text-4xl font-extrabold">{t.testimonials.title}</h2>
            <p className="text-[#D4C4B7] text-sm">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((rev, i) => (
              <div key={i} style={RECESSED} className="rounded-xl p-7 border border-[#B4885D]/15 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#EEBD8E]/15 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-[#EEBD8E]" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{rev.name}</div>
                    <div className="flex gap-0.5 text-[#EEBD8E] mt-0.5">
                      {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#D4C4B7] italic leading-relaxed">"{rev.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Map */}
      <section id="contact" data-section="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 data-field="contact.title" className="text-3xl lg:text-4xl font-extrabold">{t.contact.title}</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="p-2.5 rounded-lg bg-[#EEBD8E]/10 shrink-0"><MapPin className="w-5 h-5 text-[#EEBD8E]" /></span>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.contact.addressLabel}</h4>
                  <p data-field="contact.address" className="text-[#D4C4B7] text-sm mt-0.5">{t.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="p-2.5 rounded-lg bg-[#EEBD8E]/10 shrink-0"><Phone className="w-5 h-5 text-[#EEBD8E]" /></span>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.contact.phoneLabel}</h4>
                  <p data-field="contact.phone" className="text-[#D4C4B7] text-sm mt-0.5">{t.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="p-2.5 rounded-lg bg-[#EEBD8E]/10 shrink-0"><Mail className="w-5 h-5 text-[#EEBD8E]" /></span>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.contact.emailLabel}</h4>
                  <p data-field="contact.email" className="text-[#D4C4B7] text-sm mt-0.5">{t.contact.email}</p>
                </div>
              </div>
            </div>
            <button data-track="visit" className="bg-gradient-to-r from-[#EEBD8E] to-[#B4885D] text-[#2C1600] font-bold px-7 py-3.5 rounded-xl hover:brightness-105 transition-all cursor-pointer text-sm">
              {t.contact.ctaText}
            </button>
          </div>

          <div className="relative h-96 md:h-[440px] rounded-2xl overflow-hidden border border-[#B4885D]/20">
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
              <div className="w-full h-full bg-[#211F1E] flex flex-col items-center justify-center gap-3 text-center px-6">
                <MapPin className="w-10 h-10 text-[#EEBD8E]/60" />
                <p className="font-bold text-white text-lg">{t.contact.address}</p>
                <p className="text-sm text-[#D4C4B7]">{t.contact.phone}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer data-section="footer" className="bg-[#0F0E0D] text-[#9C8E83] text-center py-6 text-sm border-t border-[#B4885D]/10">
        <span data-field="footer.copy">{t.footer.copy}</span>
      </footer>
    </div>
  );
}
