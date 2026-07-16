import { Zap, ArrowRight, Cpu, SunMedium, Flame, Star, Check, MapPin, Phone, Mail, User } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';

// Icon chương trình/công nghệ gán theo thứ tự item (Thiết bị thông minh, Ánh sáng sinh học,
// Xông hơi hồng ngoại) — icon trang trí, không phải nội dung nên không nằm trong i18n
const PROGRAM_ICONS = [Cpu, SunMedium, Flame];

import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHero from './images/hero.jpg';
import imgFeature from './images/feature.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
interface Props { lang?: string }

export default function Gym2({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = {
    hero: images.hero ?? imgHero,
    feature: images.feature ?? imgFeature,
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-white">
      {/* Nav */}
      <nav data-section="nav" className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <span data-field="shopName" className="font-black text-xl text-[#DC2626] tracking-tighter uppercase">{t.shopName}</span>
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-300 uppercase tracking-wide">
          <a href="#programs" className="hover:text-[#DC2626] cursor-pointer transition-colors">{t.nav.programs}</a>
          <a href="#membership" className="hover:text-[#DC2626] cursor-pointer transition-colors">{t.nav.membership}</a>
          <a href="#contact" className="hover:text-[#DC2626] cursor-pointer transition-colors">{t.nav.contact}</a>
        </div>
        <button data-track="join" className="bg-[#DC2626] text-white text-sm font-black px-5 py-2.5 rounded-full hover:brightness-110 transition-all cursor-pointer tracking-wide shadow-[0_0_20px_rgba(220,38,38,0.4)]">
          {t.nav.join}
        </button>
      </nav>

      {/* Hero */}
      <section data-section="hero" className="relative overflow-hidden min-h-[85vh] flex items-center">
        <img src={IMG.hero} alt={`Không gian phòng tập hiện đại tại ${t.shopName}`} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        <div className="relative z-10 px-6 lg:px-16 max-w-3xl space-y-6 py-24">
          <span data-field="hero.badge" className="inline-flex items-center gap-2 bg-[#DC2626]/10 text-[#DC2626] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase border border-[#DC2626]/30">
            <Zap className="w-3.5 h-3.5" /> {t.hero.badge}
          </span>
          <h1 className="text-4xl lg:text-7xl font-black leading-[1.05] uppercase tracking-tighter">
            <span data-field="hero.title">{t.hero.title}</span><br />
            <span data-field="hero.titleAccent" className="text-[#DC2626]">{t.hero.titleAccent}</span>
          </h1>
          <p data-field="hero.desc" className="text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl">{t.hero.desc}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button data-track="join-hero" className="flex items-center gap-2 bg-[#DC2626] text-white font-black px-8 py-4 rounded-lg hover:brightness-110 transition-all cursor-pointer uppercase text-sm shadow-[0_10px_30px_rgba(220,38,38,0.35)]">
              {t.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-white/5 backdrop-blur border border-white/20 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-all cursor-pointer text-sm">
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* Programs / Signature Technology */}
      <section id="programs" data-section="programs" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <h2 data-field="programs.title" className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#DC2626]">{t.programs.title}</h2>
            <p data-field="programs.subtitle" className="text-gray-400 text-sm">{t.programs.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.programs.items.map((item, i) => {
              const Icon = PROGRAM_ICONS[i % PROGRAM_ICONS.length];
              if (i === 1) {
                return (
                  <div key={i} className="relative rounded-2xl overflow-hidden group min-h-[280px] border border-white/10">
                    <img src={IMG.feature} alt={item.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <Icon className="w-8 h-8 text-[#DC2626] mb-2" />
                      <h3 className="font-black text-white uppercase text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={i} className="bg-white/5 backdrop-blur rounded-2xl p-7 border border-white/10 hover:border-[#DC2626]/50 hover:bg-white/[0.07] transition-all">
                  <div className="w-14 h-14 rounded-xl bg-[#DC2626]/15 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[#DC2626]" />
                  </div>
                  <h3 className="font-black text-white uppercase text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights stat bar */}
      <section data-section="highlights" className="bg-[#DC2626] py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          {t.highlights.items.map((h, i) => (
            <div key={i}>
              <div className="font-black text-3xl">{h.value}</div>
              <div className="text-red-100 text-sm mt-0.5 uppercase tracking-wide">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership */}
      <section id="membership" data-section="membership" className="py-24 px-6 bg-[#0F0F0F]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <h2 data-field="membership.title" className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t.membership.title}</h2>
            <p data-field="membership.subtitle" className="text-gray-400 text-sm max-w-2xl mx-auto">{t.membership.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.membership.plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 border flex flex-col ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[#DC2626]/15 to-transparent border-[#DC2626] md:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.15)]'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#DC2626] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> {t.membership.popularBadge}
                  </div>
                )}
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-sm text-gray-400">{plan.period}</span>
                </div>
                <div className="w-full h-px bg-white/10 mb-6" />
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <Check className="w-4 h-4 shrink-0 text-[#DC2626]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wide cursor-pointer transition-all mt-auto ${
                    plan.popular
                      ? 'bg-[#DC2626] text-white hover:brightness-110'
                      : 'border border-white/20 text-white hover:bg-white/5'
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
      <section data-section="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 space-y-2">
            <h2 data-field="testimonials.title" className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t.testimonials.title}</h2>
            <p className="text-gray-400 text-sm">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((rev, i) => (
              <div key={i} className="bg-white/5 backdrop-blur rounded-2xl p-7 border border-white/10 flex flex-col gap-4">
                <div className="flex gap-1 text-[#DC2626]">
                  {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-gray-300 italic leading-relaxed flex-1">"{rev.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#DC2626]/15 border border-[#DC2626]/30 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{rev.name}</div>
                    <div className="text-xs text-gray-500">{rev.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Map */}
      <section id="contact" data-section="contact" className="py-24 px-6 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 data-field="contact.title" className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t.contact.title}</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#DC2626] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold uppercase text-sm text-gray-200">{t.contact.addressLabel}</h4>
                  <p data-field="contact.address" className="text-gray-400 text-sm mt-0.5">{t.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#DC2626] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold uppercase text-sm text-gray-200">{t.contact.phoneLabel}</h4>
                  <p data-field="contact.phone" className="text-gray-400 text-sm mt-0.5">{t.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#DC2626] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold uppercase text-sm text-gray-200">{t.contact.emailLabel}</h4>
                  <p data-field="contact.email" className="text-gray-400 text-sm mt-0.5">{t.contact.email}</p>
                </div>
              </div>
            </div>
            <button data-track="visit" className="bg-[#DC2626] text-white font-bold px-7 py-3.5 rounded-lg hover:brightness-110 transition-all cursor-pointer text-sm uppercase tracking-wide">
              {t.contact.ctaText}
            </button>
          </div>

          <div className="relative h-96 md:h-[440px] rounded-2xl overflow-hidden border border-white/10">
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
              <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center gap-3 text-center px-6">
                <MapPin className="w-10 h-10 text-[#DC2626]" />
                <p className="font-black text-white text-lg">{t.contact.address}</p>
                <p className="text-sm text-gray-400">{t.contact.phone}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer data-section="footer" className="bg-black text-gray-500 text-center py-6 text-sm border-t border-white/5">
        <span data-field="footer.copy">{t.footer.copy}</span>
      </footer>
    </div>
  );
}
