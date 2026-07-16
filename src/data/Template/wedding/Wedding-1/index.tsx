import { useState } from 'react';
import { MapPin, Heart, Flower2, Mail, Phone, Calendar } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import imgHero from './images/hero.jpg';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
interface Props { lang?: string }

export default function Wedding1({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [guestName, setGuestName] = useState('');
  const IMG = { hero: images.hero ?? imgHero };

  return (
    <div className="min-h-screen bg-[#FDF8F3] font-serif">
      {/* Nav */}
      <nav data-section="nav" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 px-6 py-3 flex items-center justify-between shadow-sm">
        <span className="font-bold text-[#B7935F] text-lg">
          <span data-field="couple.bride">{t.couple.bride}</span> <span className="text-gray-300">&amp;</span> <span data-field="couple.groom">{t.couple.groom}</span>
        </span>
        <div className="hidden md:flex items-center gap-6 text-sm font-sans font-medium text-gray-600">
          <a href="#story" className="hover:text-[#B7935F] cursor-pointer transition-colors">{t.nav.story}</a>
          <a href="#events" className="hover:text-[#B7935F] cursor-pointer transition-colors">{t.nav.event}</a>
          <a href="#rsvp" className="hover:text-[#B7935F] cursor-pointer transition-colors">{t.nav.rsvp}</a>
        </div>
      </nav>

      {/* Hero */}
      <section data-section="hero" className="relative overflow-hidden">
        <div className="relative h-[580px] lg:h-[700px]">
          <img src={IMG.hero} alt={`${t.couple.bride} và ${t.couple.groom}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#FDF8F3]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span data-field="hero.badge" className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-sans font-bold px-4 py-1.5 rounded-full tracking-widest border border-white/30 mb-6">
              {t.hero.badge}
            </span>
            <p data-field="hero.intro" className="text-white/80 text-sm font-sans mb-2">{t.hero.intro}</p>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2">
              {t.couple.bride} <span className="text-[#F9D89C]">&amp;</span> {t.couple.groom}
            </h1>
            <p data-field="hero.tag" className="text-white/60 text-sm font-sans mb-4">{t.hero.tag}</p>
            <div className="border-t border-white/30 pt-4 mt-2">
              <div data-field="couple.dateLong" className="text-white text-lg font-sans font-light">{t.couple.dateLong}</div>
              <div data-field="couple.location" className="flex items-center justify-center gap-1 text-white/70 text-sm font-sans mt-1">
                <MapPin className="w-3.5 h-3.5" /> {t.couple.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" data-section="story" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-9 h-9 mx-auto mb-4 text-[#B7935F]" />
          <h2 data-field="story.title" className="text-3xl font-bold text-[#B7935F] mb-6">{t.story.title}</h2>
          <p data-field="story.text" className="text-gray-600 leading-relaxed text-lg">{t.story.text}</p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-24 bg-amber-200" />
            <Flower2 className="w-6 h-6 text-[#B7935F]" />
            <div className="h-px w-24 bg-amber-200" />
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" data-section="events" className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 data-field="events.title" className="text-3xl font-bold text-[#B7935F] text-center mb-10">{t.events.title}</h2>
          <div className="space-y-4">
            {t.events.items.map((event, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl bg-amber-50 border border-amber-100">
                <div className="shrink-0 text-center min-w-[60px]">
                  <div className="text-[#B7935F] font-bold font-sans">{event.time}</div>
                </div>
                <div className="w-px bg-amber-200 self-stretch shrink-0" />
                <div>
                  <div className="font-bold text-gray-900 mb-0.5">{event.name}</div>
                  <div className="text-sm text-gray-500 font-sans">{event.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" data-section="rsvp" className="py-20 px-6">
        <div className="max-w-lg mx-auto text-center">
          <Mail className="w-9 h-9 mx-auto mb-4 text-[#B7935F]" />
          <h2 data-field="rsvp.title" className="text-3xl font-bold text-[#B7935F] mb-2">{t.rsvp.title}</h2>
          <p data-field="rsvp.desc" className="text-gray-500 font-sans mb-8">{t.rsvp.desc}</p>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-amber-100 space-y-4 text-left">
            <input
              type="text"
              placeholder={t.rsvp.namePlaceholder}
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              className="w-full px-4 py-3 border border-amber-200 rounded-xl font-sans text-sm focus:outline-none focus:border-[#B7935F] focus:ring-1 focus:ring-[#B7935F]/20 transition-all"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setAttending('yes')}
                className={`flex-1 py-3 rounded-xl text-sm font-sans font-semibold border-2 transition-all cursor-pointer ${
                  attending === 'yes'
                    ? 'bg-[#B7935F] border-[#B7935F] text-white'
                    : 'border-amber-200 text-gray-600 hover:border-[#B7935F]'
                }`}
              >
                {t.rsvp.attending}
              </button>
              <button
                onClick={() => setAttending('no')}
                className={`flex-1 py-3 rounded-xl text-sm font-sans font-semibold border-2 transition-all cursor-pointer ${
                  attending === 'no'
                    ? 'bg-gray-500 border-gray-500 text-white'
                    : 'border-amber-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {t.rsvp.notAttending}
              </button>
            </div>
            <button
              data-track="rsvp"
              disabled={!guestName || !attending}
              className="w-full py-3 bg-[#B7935F] text-white rounded-xl font-sans font-bold text-sm hover:bg-[#9E7E4E] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.rsvp.send}
            </button>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section data-section="info" className="bg-[#B7935F] text-white py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div>
            <Phone className="w-6 h-6 mx-auto mb-1" />
            <div data-field="info.phone" className="font-bold font-sans">{t.info.phone}</div>
            <div className="text-amber-100 text-sm mt-0.5 font-sans">{t.info.phoneLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <MapPin className="w-6 h-6 mx-auto mb-1" />
            <div data-field="info.address" className="font-bold font-sans">{t.info.address}</div>
            <div className="text-amber-100 text-sm mt-0.5 font-sans">{t.info.addressLabel}</div>
          </div>
          <div className="w-px h-12 bg-white/20 hidden md:block" />
          <div>
            <Calendar className="w-6 h-6 mx-auto mb-1" />
            <div className="font-bold font-sans">{t.couple.dateLong}</div>
            <div className="text-amber-100 text-sm mt-0.5 font-sans">{t.info.dateLabel}</div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section data-section="location" className="py-16 px-6 bg-[#FDF8F3]">
        <div className="max-w-4xl mx-auto">
          <h2 data-field="location.title" className="text-3xl font-bold text-[#B7935F] text-center mb-10">{t.location.title}</h2>
          <div className="rounded-3xl overflow-hidden shadow-lg border border-amber-100 h-[380px]">
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
              <div className="w-full h-full bg-amber-50 flex flex-col items-center justify-center gap-3 text-center px-6">
                <MapPin className="w-10 h-10 text-[#B7935F]" />
                <p className="font-bold text-[#B7935F] text-lg">{t.info.address}</p>
                <p className="text-sm text-gray-500 font-sans">{t.couple.dateLong}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer data-section="footer" className="bg-gray-900 text-gray-400 text-center py-5 text-sm font-sans">
        <span data-field="footer.copy">{t.footer.copy}</span>
      </footer>
    </div>
  );
}
