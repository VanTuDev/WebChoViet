import { Clock, Phone, MapPin, Star, Check, Dumbbell, Swords, Flower2, Bike, Waves, Activity } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';

// Icon chương trình tập gán theo thứ tự item (Gym & Cardio, Boxing & MMA, Yoga & Pilates,
// Cycling, Bơi Lội, CrossFit) — icon trang trí, không phải nội dung nên không nằm trong i18n
const PROGRAM_ICONS = [Dumbbell, Swords, Flower2, Bike, Waves, Activity];
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHero from './images/hero.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
interface Props { lang?: string }

export default function Gym1({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { hero: images.hero ?? imgHero };

  return (
    <div className="min-h-screen bg-[#0F0F0F] font-sans text-white">
      {/* Nav */}
      <nav data-section="nav" className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <span data-field="shopName" className="font-black text-xl text-[#F97316] tracking-wider">{t.shopName}</span>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#programs" className="hover:text-[#F97316] cursor-pointer transition-colors">{t.nav.programs}</a>
          <a href="#membership" className="hover:text-[#F97316] cursor-pointer transition-colors">{t.nav.membership}</a>
        </div>
        <button data-track="join" className="bg-[#F97316] text-white text-sm font-black px-5 py-2 rounded-full hover:bg-[#EA6E0C] transition-colors cursor-pointer tracking-wide">
          {t.nav.join}
        </button>
      </nav>

      {/* Hero */}
      <section data-section="hero" className="relative overflow-hidden h-[550px] lg:h-[650px]">
        <img src={IMG.hero} alt={`Không gian tập luyện hiện đại tại ${t.shopName}`} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8 lg:px-20">
          <div className="max-w-2xl space-y-5">
            <span data-field="hero.badge" className="inline-block bg-[#F97316]/20 text-[#F97316] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest border border-[#F97316]/30">
              {t.hero.badge}
            </span>
            <h1 data-field="hero.title" className="text-4xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight">
              {t.hero.title}
            </h1>
            <p data-field="hero.desc" className="text-base text-gray-300 leading-relaxed max-w-lg">{t.hero.desc}</p>
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
      <section id="programs" data-section="programs" className="py-20 px-6 bg-[#111827]">
        <div className="max-w-6xl mx-auto">
          <h2 data-field="programs.title" className="text-3xl font-black text-white text-center mb-12 uppercase tracking-wide">
            {t.programs.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.programs.items.map((item, i) => {
              const ProgramIcon = PROGRAM_ICONS[i % PROGRAM_ICONS.length];
              return (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#F97316]/50 hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="mb-3"><ProgramIcon className="w-8 h-8 text-[#F97316]" /></div>
                <div className="font-black text-white mb-0.5 group-hover:text-[#F97316] transition-colors text-lg">{item.name}</div>
                <div className="text-xs text-[#F97316] font-semibold mb-2 uppercase tracking-wider">{item.level}</div>
                <div className="text-sm text-gray-400 leading-relaxed">{item.desc}</div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" data-section="membership" className="py-20 px-6 bg-[#0F0F0F]">
        <div className="max-w-5xl mx-auto">
          <h2 data-field="membership.title" className="text-3xl font-black text-white text-center mb-12 uppercase tracking-wide">
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
                  <div className="flex items-center gap-1 text-xs font-black uppercase tracking-widest mb-3 text-white/80">
                    <Star className="w-3 h-3 fill-current" /> {t.membership.popularBadge}
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
                      <Check className={`w-4 h-4 shrink-0 ${plan.popular ? 'text-white' : 'text-[#F97316]'}`} />
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
                  {t.membership.signUp}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section data-section="info" className="bg-[#F97316] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div>
            <Clock className="w-6 h-6 mx-auto mb-1" />
            <div data-field="info.hours" className="font-black">{t.info.hours}</div>
            <div className="text-orange-100 text-sm mt-0.5">{t.info.hoursLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <Phone className="w-6 h-6 mx-auto mb-1" />
            <div data-field="info.phone" className="font-black">{t.info.phone}</div>
            <div className="text-orange-100 text-sm mt-0.5">{t.info.phoneLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <MapPin className="w-6 h-6 mx-auto mb-1" />
            <div data-field="info.address" className="font-black">{t.info.address}</div>
            <div className="text-orange-100 text-sm mt-0.5">{t.info.addressLabel}</div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section data-section="location" className="py-16 px-6 bg-[#111827]">
        <div className="max-w-5xl mx-auto">
          <h2 data-field="location.title" className="text-3xl font-black text-white text-center mb-10 uppercase tracking-wide">{t.location.title}</h2>
          <div className="rounded-2xl overflow-hidden border border-white/10 h-[380px]">
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
              <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center gap-3 text-center px-6">
                <MapPin className="w-10 h-10 text-[#F97316]" />
                <p className="font-black text-white text-lg">{t.info.address}</p>
                <p className="text-sm text-gray-400">{t.info.hours} · {t.info.phone}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer data-section="footer" className="bg-black text-gray-500 text-center py-5 text-sm">
        <span data-field="footer.copy">{t.footer.copy}</span>
      </footer>
    </div>
  );
}
