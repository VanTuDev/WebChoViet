import { Rocket, ArrowRight, Atom, ShieldCheck, Sparkles, Wind, Waves, Star, Check, MapPin, Phone, Mail, User } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';

// Icon chương trình Nebula Space gán theo thứ tự item (Zen Orbit, Flow Nebula, Aura Soundbath)
// và icon 2 điểm nổi bật công nghệ Aura-Sense — icon trang trí, không phải nội dung nên không nằm trong i18n
const PROGRAM_ICONS = [Sparkles, Wind, Waves];
const TECH_ICONS = [Atom, ShieldCheck];

import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
interface Props { lang?: string }

export default function Gym4({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = {
    hero: images.hero ?? 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1400&auto=format&fit=crop&q=70',
    tech: images.tech ?? 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&auto=format&fit=crop&q=70',
    nebula: images.nebula ?? 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1400&auto=format&fit=crop&q=70',
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-[#E5E2E1] overflow-x-clip relative">
      {/* Atmospheric blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#8A2BE2] opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#00F2FF] opacity-20 blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav data-section="nav" className="sticky top-0 z-50 bg-[#050505]/60 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <span data-field="shopName" className="font-bold text-lg tracking-tight flex items-center gap-2">
          <Rocket className="w-5 h-5 text-[#00F2FF]" /> {t.shopName}
        </span>
        <div className="hidden md:flex items-center gap-7 text-sm text-[#C4C7C7] uppercase tracking-wide">
          <a href="#programs" className="hover:text-[#00F2FF] cursor-pointer transition-colors">{t.nav.programs}</a>
          <a href="#membership" className="hover:text-[#00F2FF] cursor-pointer transition-colors">{t.nav.membership}</a>
          <a href="#contact" className="hover:text-[#00F2FF] cursor-pointer transition-colors">{t.nav.contact}</a>
        </div>
        <button data-track="join" className="px-6 py-2 bg-[#00F2FF] text-black font-bold rounded-full text-xs tracking-widest uppercase hover:brightness-110 transition-all cursor-pointer">
          {t.nav.join}
        </button>
      </nav>

      {/* Hero */}
      <section data-section="hero" className="relative overflow-hidden min-h-[90vh] flex items-center justify-center text-center">
        <img src={IMG.hero} alt={t.shopName} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
        <div className="relative z-10 max-w-3xl px-6 space-y-6">
          <span data-field="hero.badge" className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00F2FF]">{t.hero.badge}</span>
          <h1 className="text-4xl lg:text-7xl font-bold leading-tight tracking-tighter" style={{ textShadow: '0 0 20px rgba(0,242,255,0.3)' }}>
            <span data-field="hero.title">{t.hero.title}</span>{' '}
            <span data-field="hero.titleAccent" className="text-[#00F2FF]">{t.hero.titleAccent}</span>
          </h1>
          <p data-field="hero.desc" className="text-base lg:text-lg text-[#C4C7C7] max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button data-track="join-hero" className="flex items-center gap-2 bg-[#00F2FF] text-black font-bold px-8 py-3.5 rounded-full hover:brightness-110 transition-all cursor-pointer text-sm">
              {t.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-[#00F2FF]/30 text-[#E5E2E1] bg-[#00F2FF]/10 font-semibold px-8 py-3.5 rounded-full hover:bg-[#00F2FF]/20 transition-all cursor-pointer text-sm">
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* Tech highlight */}
      <section data-section="tech" className="relative py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span data-field="tech.badge" className="inline-block px-4 py-1 rounded-full border border-[#00F2FF]/30 text-[#00F2FF] text-xs font-semibold mb-5 tracking-widest uppercase">
              {t.tech.badge}
            </span>
            <h2 data-field="tech.title" className="text-3xl lg:text-4xl font-bold mb-5 tracking-tight">{t.tech.title}</h2>
            <p data-field="tech.desc" className="text-[#C4C7C7] mb-8 leading-relaxed">{t.tech.desc}</p>
            <ul className="space-y-5">
              {t.tech.points.map((p, i) => {
                const Icon = TECH_ICONS[i % TECH_ICONS.length];
                return (
                  <li key={i} className="flex items-start gap-4">
                    <Icon className="w-5 h-5 text-[#00F2FF] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-[#B9C7E4]">{p.title}</h4>
                      <p className="text-[#C4C7C7] text-sm mt-0.5">{p.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-[#00F2FF]/10 bg-[#0A192F]/40 backdrop-blur-xl p-2 aspect-square">
            <img src={IMG.tech} alt={t.tech.title} className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>
      </section>

      {/* Programs / Nebula Space */}
      <section id="programs" data-section="programs" className="relative py-24 px-6 bg-[#0e0e0e]">
        <img src={IMG.nebula} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 data-field="programs.title" className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">{t.programs.title}</h2>
          <p data-field="programs.subtitle" className="text-[#C4C7C7] max-w-3xl mx-auto mb-14">{t.programs.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.programs.items.map((item, i) => {
              const Icon = PROGRAM_ICONS[i % PROGRAM_ICONS.length];
              return (
                <div key={i} className="bg-[#0A192F]/40 backdrop-blur-xl border border-[#00F2FF]/10 hover:border-[#00F2FF] hover:shadow-[0_0_20px_rgba(0,242,255,0.15)] rounded-xl p-8 text-left transition-all">
                  <Icon className="w-9 h-9 text-[#8A2BE2] mb-5" />
                  <h3 className="font-semibold text-lg mb-2 text-[#B9C7E4]">{item.name}</h3>
                  <p className="text-[#C4C7C7] text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights stat bar */}
      <section data-section="highlights" className="py-10 px-6 bg-[#0A192F]/60 border-y border-[#00F2FF]/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          {t.highlights.items.map((h, i) => (
            <div key={i}>
              <div className="font-bold text-3xl text-[#00F2FF]">{h.value}</div>
              <div className="text-[#C4C7C7] text-sm mt-0.5">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership */}
      <section id="membership" data-section="membership" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <h2 data-field="membership.title" className="text-3xl lg:text-4xl font-bold tracking-tight">{t.membership.title}</h2>
          <p data-field="membership.subtitle" className="text-[#C4C7C7] text-sm max-w-2xl mx-auto">{t.membership.subtitle}</p>
          <div className="w-20 h-1 bg-[#00F2FF] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.membership.plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-9 flex flex-col bg-[#0A192F]/40 backdrop-blur-xl border ${
                plan.popular ? 'border-[#00F2FF]/40 md:scale-105 shadow-[0_0_40px_rgba(0,242,255,0.1)]' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00F2FF] text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {t.membership.popularBadge}
                </div>
              )}
              <h3 className="font-semibold text-lg text-[#B9C7E4] mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-white mb-6">
                {plan.price} <span className="text-sm font-normal text-[#C4C7C7]">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm text-[#C4C7C7]">
                    <Check className="w-4 h-4 text-[#00F2FF] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all mt-auto uppercase tracking-wide ${
                  plan.popular ? 'bg-[#00F2FF] text-black hover:brightness-110' : 'border border-white/20 text-white hover:bg-white/5'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section data-section="testimonials" className="py-24 px-6 bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto">
          <h2 data-field="testimonials.title" className="text-3xl lg:text-4xl font-bold text-center mb-4 tracking-tight">{t.testimonials.title}</h2>
          <p className="text-[#C4C7C7] text-center mb-14">{t.testimonials.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((rev, i) => (
              <div key={i} className="bg-[#0A192F]/40 backdrop-blur-xl border border-white/10 rounded-xl p-8 flex flex-col gap-4">
                <div className="flex gap-1 text-[#00F2FF]">
                  {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-[#E5E2E1] italic leading-relaxed flex-1">"{rev.quote}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#3C4962] flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-[#B9C7E4]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#B9C7E4] text-sm">{rev.name}</div>
                    <div className="text-xs text-[#C4C7C7] uppercase tracking-tight">{rev.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Map */}
      <section id="contact" data-section="contact" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 data-field="contact.title" className="text-3xl lg:text-4xl font-bold mb-8 tracking-tight">{t.contact.title}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#00F2FF] shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#B9C7E4]">{t.contact.addressLabel}</div>
                  <p data-field="contact.address" className="text-[#C4C7C7] text-sm mt-0.5">{t.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#00F2FF] shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#B9C7E4]">{t.contact.phoneLabel}</div>
                  <p data-field="contact.phone" className="text-[#C4C7C7] text-sm mt-0.5">{t.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#00F2FF] shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#B9C7E4]">{t.contact.emailLabel}</div>
                  <p data-field="contact.email" className="text-[#C4C7C7] text-sm mt-0.5">{t.contact.email}</p>
                </div>
              </div>
            </div>
            <button data-track="visit" className="mt-8 bg-[#00F2FF] text-black font-bold px-7 py-3.5 rounded-full hover:brightness-110 transition-all cursor-pointer text-sm uppercase tracking-wide">
              {t.contact.ctaText}
            </button>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden border border-[#00F2FF]/10 bg-[#0A192F]/40 backdrop-blur-xl p-1">
            {t.contact.mapUrl ? (
              <iframe
                src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                className="w-full h-full border-0 rounded-xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            ) : (
              <div className="w-full h-full bg-[#050505]/60 rounded-xl flex flex-col items-center justify-center gap-3 text-center px-6">
                <MapPin className="w-10 h-10 text-[#00F2FF]/60" />
                <p className="font-bold text-white text-lg">{t.contact.address}</p>
                <p className="text-sm text-[#C4C7C7]">{t.contact.phone}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer data-section="footer" className="border-t border-white/5 py-6 text-center text-[#C4C7C7]/60 text-sm">
        <span data-field="footer.copy">{t.footer.copy}</span>
      </footer>
    </div>
  );
}
