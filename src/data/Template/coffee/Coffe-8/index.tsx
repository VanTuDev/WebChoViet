import { PlusCircle, ArrowRight, Quote, MapPin, Clock, Phone, Facebook, Instagram, ShoppingCart } from 'lucide-react';
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

const DEFAULT_IMGS = {
  heroBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdB27d9Pn_rM-EpTqt-KpZmRwU8-9xBrPxpISCHBXPY2Bs78ToDr2uRCrYHfLHavKcjpc3T2Bwk9yIX5lNX3aUuHTcptC9aZRIj_acME9Dd3e_f31KMifmeXY92bO1OBnwqrWz_UlubfwOZRIcwPjeSlZPY3SuYNXPKuQ2dj0EEYhwvJtQiZp7hWOhACSIIhaEg6mofF-obg238UoBddGzmK-wvJIjF8_UBtGkaigT0yRxBYNz4by1',
  menuFeatured: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7BHE2MzdhG4Vdi97dbPirRMzCnV1pqC5mUphxrRcO97834hgZNUHC6HGZX5A9BsisjmIPWW_J3logXCV1QrqHcm8DIx3NmWZIhZJpRIPP1DzABG9oWGLnZfkEVmem6QdaGdY-5NtROhNAc9moL55zQ6uaNXUUtxC8G1EJIkGxDp-9rh_amozxTomgL1-zAg1Xy2tpxzwMXbitmV0GHLouqKwt7adUbvDdbixyM2FXIo04WkpoNXQG',
  gallery1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBExuNaVtcGjuwhR_vuZces8_c4ZUQsy1dZ-zaaK6_3oYFsnMbDqIJFXlAJBPBeB-Ky8iWYSxZb5s0gKsK9KAi5BM2rM9dgdYbY91n8thxqI1TYkTfAMEN3tMGXWW7igbdIl6avvSQqQ7SIC9hH_mwKzVoeJoqLR1jA3yuGWSnGUOmZnyey-ZWCYTIAElMTSe34anAD-ToSkfsxAucnSx84X2tLcDnHkLYH_q5-Io3KShSISI28EACs',
  gallery2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTvOYUmV004DMzbKe69PBneRvW5h0xnVfrJyEUjd1my8dvLUBdJ6THn3nhZhBnh48sYOrKwOiZemQGlNx7pT4tdKHM-vQqF52Co6bjRMHqBSWimC2ofE9t0WnavbA9su-e89sPOU0GYDOLTusmDY9FceREboM9HLBQpPQDA-R-H-2POzMOrKGuK2ZR6dw_xZbbULxtnsuBXd6TeyHmFicH2DXLXFu-ObsXKF780WDsILkqApu93aj7',
  gallery3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA9kptxLgFzda2Wu_Xaddedw7polRkt3cK8JZNdSdkwGsmzNnM8yJEs_VY0nYdy568oex6J7qb4DwFDix7uZOLO7RDlW09PGXAXWjDkYb3F6kBYullvV-Au8fitCR6gBphdBVLeOExSngFx9sSRr4WOBDU0WFHwPkeHzqnN2yZBPaAoUTrUjtvAndtZUPZFTd8Pq6Fa-JrXXV9dHUwJJj1Yo9EObvH5gDnY-0y1ha6us-Awy9fPAx',
  gallery4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqxcywH71Q_54l7OO_eMpNZ26BBR9p14So035GBJtVayZnFBP7kJYJ_HapckPXfbbs10AIM8PlxaFRpeRG_IvBYDQvTq4B_GpSU-R7YT30XPTyfUEythPNwqevlzscFDQhwaFLQNXwUpDoM0qg1imbyuSs_AGGPijlbFZdSroCEChX7xCNFxmNPE3xgaLDur0r3HH4Y-zQGU2FJ95WKDuXDqOrcVrpquBkqUYKtuKWNqc94pKv8-89',
  avatar1: 'https://lh3.googleusercontent.com/aida/AP1WRLtI_ne1U9Nsu3H4YBzSiooK5BQSogLCPk7t4W31d9iHudjuGq_aBgPiUIAKfyCKmJbyBiAA-0a5i-ZEI_r-3emipT3UhDKcqLgmspeS0aqvNubCt1nC8MCFerm9sJZOCmPdXHncxlYz4PmFR1xehQjw_DTIA3__NDuFs0SgUi-fmqfjSx_pzCtuKXUv0VHRa8VS33P0f9P3g8im8BUTAJQjyGew5xmaujuKTACBqkfXVIzK1OFkiNjryG4',
  avatar2: 'https://lh3.googleusercontent.com/aida/AP1WRLvKom7znxLJXRYK6ogR18f3P1yRDUmhAadVjCYfjm9zk-RQIsJdXZzQjXTxPg3UBMyZB-ZkOnGCY17QMvgLlpcHMmH5KXmIbi5xZClguuiC6OGlsZaoFxfpLNVeqMXx4J49ljJhFq28TB0oaQB8q9dpI-xJlLHKgdJU4IjCgTXna55MsPHLQ6c1kPvmRIUqZZl444y-iXX8HTzmDk1ou7M04nd6UVkbwnC0I5dOrnzy6go8VzUQU6FHZmo',
  avatar3: 'https://lh3.googleusercontent.com/aida/AP1WRLtnqGi6iEPr_VHu33rdGQXmBeI4Yi4ZgH2doQnqMCYmqdbl5ZQjJouy9NbZz82ORWPUaxjvouZulgWuNuVMUYJWm0KBTksB_FkVNX0ffvN0YhyyCNQL4f_QvdcJ9qE4-HonbuOLxFxv527sjFdzk3Xo77NeaLMNWUzS6qTS9XdgTHKmzf70jsk0T8mV2wOCYtq37L9USQZt30aAYDGoGUMUzjXcfyXwa06vp0ztejAZ0CMECNKbRQqQzs8',
};

/** Icon nhân vật đánh giá — dùng vòng lặp cố định, không lưu emoji trong i18n */
const REVIEW_AVATARS = ['avatar1', 'avatar2', 'avatar3'] as const;
const CONTACT_ICONS = [MapPin, Clock, Phone];

export default function Coffe8({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#f7faf7] text-[#181c1b] font-sans antialiased overflow-x-hidden">

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 left-0 right-0 z-50 bg-[#f7faf7]/80 backdrop-blur-md shadow-sm">
        <nav className="flex justify-between items-center px-6 md:px-16 py-4 w-full max-w-7xl mx-auto">
          <span data-field="nav.brand" className="text-2xl text-[#4e635a] font-bold tracking-tight">{t.nav.brand}</span>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a className="font-bold text-[#4e635a] border-b-2 border-[#4e635a] pb-1" href="#coffee">{t.nav.linkCoffee}</a>
            <a className="text-[#424845] hover:text-[#4e635a] transition-colors duration-300" href="#menu">{t.nav.linkMenu}</a>
            <a className="text-[#424845] hover:text-[#4e635a] transition-colors duration-300" href="#space">{t.nav.linkSpace}</a>
            <a className="text-[#424845] hover:text-[#4e635a] transition-colors duration-300" href="#reviews">{t.nav.linkReviews}</a>
            <a className="text-[#424845] hover:text-[#4e635a] transition-colors duration-300" href="#contact">{t.nav.linkContact}</a>
          </div>
          <button data-track="cta_visit" data-field="nav.cta" className="bg-[#4e635a] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 cursor-pointer">
            {t.nav.cta}
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative h-screen flex items-center justify-center pt-20">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="w-full h-full bg-cover bg-center scale-105" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-[#4e635a]/20 mix-blend-multiply" />
          </div>
          <div className="relative z-10 text-center px-6 md:px-16 max-w-4xl">
            <h1 data-field="hero.title" className="text-4xl md:text-5xl font-medium leading-tight text-white mb-6 drop-shadow-lg">
              {t.hero.title}
            </h1>
            <p data-field="hero.subtitle" className="text-lg font-light text-[#ecefec] mb-10 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col md:flex-row gap-3 justify-center">
              <a data-field="hero.btnPrimary" href="#menu"
                className="bg-[#4e635a] text-white px-10 py-4 rounded-full text-sm font-medium shadow-[0_10px_40px_-10px_rgba(141,163,153,0.35)] hover:scale-105 transition-transform">
                {t.hero.btnPrimary}
              </a>
              <a data-track="cta_reserve" data-field="hero.btnSecondary" href="#contact"
                className="border-2 border-white text-white px-10 py-4 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-white/10 transition-all">
                {t.hero.btnSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section data-section="menu" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="menu">
          <div className="text-center mb-16">
            <span data-field="menu.label" className="text-[#4e635a] text-sm font-medium tracking-widest uppercase">{t.menu.label}</span>
            <h2 data-field="menu.title" className="text-3xl md:text-4xl font-medium mt-3">{t.menu.title}</h2>
            <div className="w-16 h-1 bg-[#8da399] mx-auto mt-6 rounded-full" />
          </div>

          {/* Category tabs (decorative) */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {t.menu.tabs.map((tab, i) => (
              <span
                key={i}
                data-field={`menu.tabs.${i}`}
                className={
                  i === 0
                    ? 'px-6 py-2 rounded-full bg-[#4e635a] text-white text-sm font-medium cursor-default'
                    : 'px-6 py-2 rounded-full bg-[#f1f4f1] text-[#424845] text-sm font-medium hover:bg-[#d1e8dd] transition-colors cursor-default'
                }
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured item */}
            <div className="md:col-span-2 relative h-96 rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(141,163,153,0.4)] group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${IMG.menuFeatured}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <span data-field="menu.featured.badge" className="bg-[#d5e7de] text-[#586861] px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                  {t.menu.featured.badge}
                </span>
                <h3 data-field="menu.featured.name" className="text-2xl font-medium">{t.menu.featured.name}</h3>
                <p data-field="menu.featured.desc" className="font-light opacity-80 max-w-md">{t.menu.featured.desc}</p>
              </div>
            </div>

            {/* Standard items */}
            {t.menu.items.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-[0_10px_40px_-10px_rgba(141,163,153,0.25)] flex flex-col justify-between border border-[#c2c8c4]/30">
                <div>
                  <h4 data-field={`menu.items.${i}.name`} className="text-lg font-medium text-[#4e635a] mb-1">{item.name}</h4>
                  <p data-field={`menu.items.${i}.desc`} className="text-[#424845] text-sm font-light">{item.desc}</p>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span data-field={`menu.items.${i}.price`} className="font-medium text-[#4e635a]">{item.price}</span>
                  <PlusCircle aria-hidden className="w-6 h-6 text-[#8da399] cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Space / Gallery */}
        <section data-section="gallery" className="py-20 bg-[#f1f4f1] overflow-hidden" id="space">
          <div className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between mb-16">
            <div>
              <span data-field="gallery.label" className="text-[#4e635a] text-sm font-medium tracking-widest uppercase">{t.gallery.label}</span>
              <h2 data-field="gallery.title" className="text-3xl md:text-4xl font-medium mt-3">{t.gallery.title}</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#4e635a] text-sm font-medium group hover:translate-x-2 transition-transform">
              <span data-field="gallery.viewMore">{t.gallery.viewMore}</span>
              <ArrowRight aria-hidden className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-nowrap md:grid md:grid-cols-4 gap-6 px-6 md:px-16 overflow-x-auto pb-4">
            {[IMG.gallery1, IMG.gallery2, IMG.gallery3, IMG.gallery4].map((src, i) => (
              <div
                key={i}
                className={`flex-none w-72 md:w-full aspect-[3/4] rounded-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(141,163,153,0.3)] bg-[#b5ccc1] relative group ${i % 2 === 1 ? 'md:mt-20' : ''}`}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={src}
                  alt=""
                />
                <div className="absolute inset-0 bg-[#4e635a]/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="reviews">
          <div className="text-center mb-16">
            <h2 data-field="testimonials.title" className="text-3xl md:text-4xl font-medium">{t.testimonials.title}</h2>
            <p data-field="testimonials.subtitle" className="text-[#424845] mt-3">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => {
              const avatarSrc = IMG[REVIEW_AVATARS[i] as keyof typeof IMG] ?? IMG.avatar1;
              return (
                <div key={i} className="bg-white p-10 rounded-xl shadow-[0_10px_40px_-10px_rgba(141,163,153,0.3)] border border-[#c2c8c4]/20 relative">
                  <Quote aria-hidden className="w-8 h-8 text-[#8da399]/40 absolute -top-4 left-8 bg-[#f7faf7] p-1 rounded-full" />
                  <p data-field={`testimonials.items.${i}.quote`} className="font-light text-[#424845] mb-6 italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={avatarSrc} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-[#8da399]" />
                    <div>
                      <h4 data-field={`testimonials.items.${i}.name`} className="text-sm font-medium text-[#4e635a]">{item.name}</h4>
                      <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#424845]">{item.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact & Map */}
        <section data-section="contact" className="py-20 bg-[#f7faf7]" id="contact">
          <div className="px-6 md:px-16 max-w-7xl mx-auto">
            <div className="bg-[#f1f4f1] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-xl">
              <div className="p-8 md:p-16 md:w-1/2">
                <h2 data-field="contact.title" className="text-3xl font-medium mb-4">{t.contact.title}</h2>
                <p data-field="contact.subtitle" className="text-[#424845] mb-10">{t.contact.subtitle}</p>
                <div className="space-y-6">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri];
                    return (
                      <div key={row.valueField} className="flex items-start gap-4">
                        <RowIcon aria-hidden className="w-5 h-5 text-[#4e635a] bg-[#d1e8dd] p-2 rounded-xl box-content" />
                        <div>
                          <h4 className="text-sm font-medium">{row.label}</h4>
                          <p data-field={row.valueField} className="text-[#424845]">{row.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-10 flex items-center gap-4">
                  <a
                    data-track="cta_call"
                    data-field="contact.btnCall"
                    href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                    className="inline-block bg-[#4e635a] text-white text-sm font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all"
                  >
                    {t.contact.btnCall}
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[#4e635a] flex items-center justify-center text-white hover:opacity-80 transition-opacity" href="#" aria-label="Facebook">
                    <Facebook aria-hidden className="w-5 h-5" />
                  </a>
                  <a className="w-10 h-10 rounded-full bg-[#4e635a] flex items-center justify-center text-white hover:opacity-80 transition-opacity" href="#" aria-label="Instagram">
                    <Instagram aria-hidden className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 h-96 md:h-auto relative bg-[#d8dbd8]">
                {t.contact.mapUrl ? (
                  <iframe
                    src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center flex-col gap-3">
                    <MapPin aria-hidden className="w-14 h-14 text-[#4e635a]" />
                    <p className="text-sm font-medium text-[#424845]">{t.contact.mapLoading}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-white py-10 mt-4">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 w-full max-w-7xl mx-auto border-t border-[#c2c8c4]/20 pt-10 gap-6">
          <span data-field="footer.brand" className="text-2xl font-bold text-[#4e635a]">{t.footer.brand}</span>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-[#424845] text-sm hover:text-[#4e635a] underline transition-colors" href="#">{t.footer.privacy}</a>
            <a className="text-[#424845] text-sm hover:text-[#4e635a] underline transition-colors" href="#">{t.footer.terms}</a>
            <a className="text-[#424845] text-sm hover:text-[#4e635a] underline transition-colors" href="#">{t.footer.sustainability}</a>
            <a className="text-[#424845] text-sm hover:text-[#4e635a] underline transition-colors" href="#">{t.footer.careers}</a>
          </div>
          <p data-field="footer.copy" className="text-[#424845] text-sm opacity-70">{t.footer.copy}</p>
        </div>
      </footer>

      {/* Mobile quick-order FAB */}
      <button
        data-track="cta_fab_order"
        aria-label={t.hero.btnPrimary}
        className="fixed bottom-6 right-6 bg-[#4e635a] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-40 md:hidden"
      >
        <ShoppingCart aria-hidden className="w-7 h-7" />
      </button>
    </div>
  );
}
