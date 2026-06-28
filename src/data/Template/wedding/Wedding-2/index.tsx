import { useState, useEffect } from 'react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';

type Lang = 'vi' | 'en';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson };
interface Props { lang?: string }

function useCountdown(isoDate: string) {
  const target = new Date(isoDate).getTime();
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86_400_000),
      hours:   Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line
  return time;
}

export default function Wedding2({ lang: initialLang = 'vi' }: Props) {
  const [lang, setLang] = useState<Lang>(initialLang as Lang);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;

  const IMG = {
    hero:      images.hero      ?? 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&auto=format&fit=crop&q=75',
    gallery_0: images.gallery_0 ?? 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&auto=format&fit=crop&q=70',
    gallery_1: images.gallery_1 ?? 'https://images.unsplash.com/photo-1501967786-f47cf5c70756?w=600&auto=format&fit=crop&q=70',
    gallery_2: images.gallery_2 ?? 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop&q=70',
    gallery_3: images.gallery_3 ?? 'https://images.unsplash.com/photo-1524824267900-2b6acd5e8726?w=600&auto=format&fit=crop&q=70',
  };

  // Parse DD.MM.YYYY → ISO for countdown
  const [d, m, y] = t.couple.date.split('.');
  const countdown = useCountdown(`${y}-${m}-${d}`);

  return (
    <div className="min-h-screen bg-[#FFFEF9] font-serif">

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#1B3A6B]/96 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-[#C5A028] tracking-[0.18em] text-sm uppercase font-sans">
          {t.couple.bride} <span className="text-white/30">&amp;</span> {t.couple.groom}
        </span>

        <div className="hidden md:flex items-center gap-7 text-[11px] font-sans font-semibold text-white/60 tracking-[0.15em] uppercase">
          <a href="#gallery" className="hover:text-[#C5A028] cursor-pointer transition-colors">{t.nav.gallery}</a>
          <a href="#events"  className="hover:text-[#C5A028] cursor-pointer transition-colors">{t.nav.event}</a>
          <a href="#rsvp"    className="hover:text-[#C5A028] cursor-pointer transition-colors">{t.nav.rsvp}</a>
        </div>

        <div className="flex items-center font-sans text-xs font-medium gap-0.5">
          {(['vi', 'en'] as Lang[]).map((l, i) => (
            <span key={l} className="flex items-center">
              {i > 0 && <span className="text-white/25 mx-1">|</span>}
              <button
                onClick={() => setLang(l)}
                className={`cursor-pointer transition-colors ${lang === l ? 'text-[#C5A028] font-bold' : 'text-white/40 hover:text-white'}`}
              >
                {l.toUpperCase()}
              </button>
            </span>
          ))}
        </div>
      </nav>

      {/* ── Hero — fullscreen ─────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px]">
        <img src={IMG.hero} alt="couple" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1B3A6B]/58" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Decorative rule */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#C5A028]/50" />
            <span className="text-[#C5A028] text-[11px] font-sans tracking-[0.35em] uppercase">{t.hero.badge}</span>
            <div className="h-px w-16 bg-[#C5A028]/50" />
          </div>

          <p className="text-white/60 text-xs font-sans tracking-[0.3em] uppercase mb-5">{t.hero.title}</p>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-none">{t.couple.bride}</h1>
          <div className="text-[#C5A028] text-4xl my-3">♥</div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-none mb-10">{t.couple.groom}</h1>

          <div className="border border-white/25 px-8 py-3 text-white/70 text-sm font-sans tracking-widest">
            {t.couple.dateLong} &nbsp;·&nbsp; {t.couple.location}
          </div>
        </div>

        {/* Scroll pulse */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-white/40 mx-auto animate-pulse" />
        </div>
      </section>

      {/* ── Countdown ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#1B3A6B] text-white text-center">
        <p className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#C5A028] mb-10">
          {t.countdown.title}
        </p>
        <div className="flex items-center justify-center gap-2 md:gap-10">
          {([
            { value: countdown.days,    label: t.countdown.days },
            { value: countdown.hours,   label: t.countdown.hours },
            { value: countdown.minutes, label: t.countdown.minutes },
            { value: countdown.seconds, label: t.countdown.seconds },
          ] as { value: number; label: string }[]).map((item, i) => (
            <>
              <div key={i} className="text-center w-16 md:w-24">
                <div className="text-4xl md:text-6xl font-bold tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-white/40 tracking-[0.2em] uppercase mt-2 font-sans">
                  {item.label}
                </div>
              </div>
              {i < 3 && <div key={`sep-${i}`} className="text-white/30 text-2xl pb-5">:</div>}
            </>
          ))}
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-[#C5A028]/40" />
            <span className="text-[#C5A028] text-[11px] font-sans tracking-[0.25em] uppercase">{t.gallery.title}</span>
            <div className="h-px w-12 bg-[#C5A028]/40" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[IMG.gallery_0, IMG.gallery_1, IMG.gallery_2, IMG.gallery_3].map((url, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer">
                <img
                  src={url}
                  alt={t.gallery.items[i]?.caption ?? ''}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#1B3A6B]/0 group-hover:bg-[#1B3A6B]/55 transition-all duration-300 flex items-end p-4">
                  <p className="text-white text-xs font-sans tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t.gallery.items[i]?.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section id="events" className="py-20 px-6 bg-[#FFFEF9]">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-[#C5A028]/40" />
            <span className="text-[#C5A028] text-[11px] font-sans tracking-[0.25em] uppercase">{t.events.title}</span>
            <div className="h-px w-12 bg-[#C5A028]/40" />
          </div>

          <div className="space-y-5">
            {t.events.items.map((event, i) => (
              <div key={i} className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-sm border border-[#1B3A6B]/8">
                <div className="text-3xl shrink-0">{event.icon}</div>
                <div className="w-px h-10 bg-[#C5A028]/30 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[#C5A028] font-sans font-bold text-sm">{event.time}</span>
                    <span className="text-gray-300 text-xs">—</span>
                    <span className="font-bold text-[#1B3A6B] text-sm">{event.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP ─────────────────────────────────────────────────────────── */}
      <section id="rsvp" className="py-20 px-6 bg-[#1B3A6B]">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#C5A028]/40" />
            <span className="text-[#C5A028] text-[11px] font-sans tracking-[0.25em] uppercase">{t.rsvp.title}</span>
            <div className="h-px w-12 bg-[#C5A028]/40" />
          </div>
          <p className="text-white/50 font-sans text-sm mb-8">{t.rsvp.desc}</p>

          <div className="space-y-3">
            <input
              type="text"
              placeholder={t.rsvp.namePlaceholder}
              className="w-full px-4 py-3 bg-white/8 border border-white/15 rounded-xl font-sans text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#C5A028] transition-all"
            />
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl text-sm font-sans font-semibold border border-[#C5A028] text-[#C5A028] hover:bg-[#C5A028] hover:text-[#1B3A6B] transition-all cursor-pointer">
                {t.rsvp.attending}
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm font-sans font-semibold border border-white/20 text-white/50 hover:border-white/40 hover:text-white/70 transition-all cursor-pointer">
                {t.rsvp.notAttending}
              </button>
            </div>
            <button className="w-full py-3 bg-[#C5A028] text-[#1B3A6B] rounded-xl font-sans font-black text-sm hover:bg-[#D4AF37] transition-colors cursor-pointer tracking-wide">
              {t.rsvp.send}
            </button>
          </div>
        </div>
      </section>

      {/* ── Info bar ─────────────────────────────────────────────────────── */}
      <section className="bg-[#C5A028] text-[#1B3A6B] py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl mb-1">📞</div>
            <div className="font-bold font-sans">{t.info.phone}</div>
          </div>
          <div className="w-px h-12 bg-[#1B3A6B]/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📍</div>
            <div className="font-bold font-sans">{t.info.address}</div>
          </div>
          <div className="w-px h-12 bg-[#1B3A6B]/20 hidden md:block" />
          <div>
            <div className="text-2xl mb-1">📅</div>
            <div className="font-bold font-sans">{t.couple.dateLong}</div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0F2240] text-white/25 text-center py-5 text-xs font-sans tracking-widest">
        {t.footer.copy}
      </footer>
    </div>
  );
}
