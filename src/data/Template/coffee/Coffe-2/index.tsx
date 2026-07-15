import { useRef, useState } from 'react';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
type TabKey = 'signature' | 'coffee' | 'tea';

interface Props { lang?: Lang; }

const glassCard = {
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.3)',
} as const;

const SLIDE_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAdLMqjDGSjcg9BNtGMqRZs5DzFzQrtcKw8TgfospemgnfRbUn1awWdCRd2cHi80P4mvgR0vaq7iAAW6AXtYJiqnfAAbqcE6IC84PSdAQEsttEdQl44ckbleKo33pGgJHArDqwfrwk-9XRQRY9ivQHo4aTURIRMhSAic7AADLHIUrp9cMiOR7_-pioCDczuz8OgcUKN3a7EIEO4TBEzLMyz7PXK7xP84w_XqyR0UlWSQxuJHo-7DSh4CD332h8NTGZZKfEobgQy2oc',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBEL4exsTFkxdGfFnYI6OPBu7RQhY6XDy4-MleOU-jMeLix6_ZYGgAnnhTat7wiHreeb5kgwcl04_N7gvOh8cwjxOSrW5iWJMPeTUBbjzw7BMkhczJsyjX9bwahsnGtdoHDwFvwZHoLpD3qKTbuN4Q9KT1A6eMt4IZhDd4_t06xj6etcl1JfWe62tfmDZEVAbESqR86WIKZH334xn0FX8ILOFiUg8ZBJpcKsP2nX1SuSmxUgxwcbd7T9XJ1X5D_XM0JdtghoKi8yWg',
];

const BESTSELLER_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBDCwpfl7hv3Z9YkrtZlg2YDaY-XaEeI3-i-AOYbaIDLBedP-aOJTiOHa2pRDqx314dCuqWkO48bjuzkee6XGderAEeuvBe4HSIWqhk86KKWP5LmBBev_2Zoy0dE-R5qmm_qhJhSCowC02qvZ5SseMMsEA6EBNBJRYaMVckZflXXQ8R3_giIKXXx8HkE_wbAveiq2xXFSj5n8fDo8Y-KeXCgMXXVAdedzR9j6jOOUxpVwVrZwcWA1HckZrYCn3DK8R097BeMMQto5E',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-8cTGCBMH1NHLgK3-N2j7eiAV_w0K9P9VI3j9Jf27l-Z3e0rv8v9NkkFvwB_lu7xShYrPrT_1UqHPs-ryMCrK0ZAqS6FRUyxmLkDNIr_olmOpXe7TAbMKEsFt2wKwRnPr6hP_0HxFdMkeziBJ_A8OsZG7p6V2sJ5GVAVwd3AK6IO3xsBEt43E7LdDymlQcHJATG7RLWGX3gfkJldzkXBvUC7CVRx3hmxLUhp6RvreFayDKmNbpmHtnb9sIsd3sc7-JFlYLUh-8TQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDraIGhwfQBlHoKOfS4XVo-rU__7HO8jMzRnVqbaVkF1JnmKTibmCn6_xS2fflzaTcukdQx5NduYs7dCJq6KoKlXKM0fPNHJCR1ASIeELChdy8Uh5_LwW0MUwusYi4MDRBTdz6OEwmpMDTk6whk2XTs12KB803ugBtR2IfpOEPnXwuTRmLIqrNT8Jxu-SiMo0rje4PcD5tV7ggV4Zs9fdUqBkXcKMHfU_ZWE313rG4GY6ZheKs-nENmISFYxXpalUyzCfO2HhE34RE',
];

const AVATAR_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCyluc5rhJPBPrNhYCLLFC7FIvZhGhfChP_1kPBpzxayKir2zIxr1-PElv1FxgM6IWfjZanl-49znLWUrcIGJoGwqN6xVU7-x5-r7Vb3juDFmafLOgaWc4O4i3S-naIu9JV7C9b-Fw2MqwgLnmfCz5X6bQNeD7SX5ipQLALVM5SOBbbqmiemQ4TtqyznMYZdUpoi-97sG9HPRxszS9Ljb8yc0lqXRNHgZwT6TQRrdzceoSV2HPsRYRpwF3yCOAgGTEgfHBrbpJpO0Y',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnAQry9HFK-ecJVcL9_kCL39ztrOI_NPUAIx1WlEsgt48fuFEzwyiX1BDvIPNccCOK_Kk2pfYSuz-7HaQ7meN5MEnKMvAbxSi_1Ndz6WP4N1vNHnI74O4v6BW-VSgcOtmFF4zY63YJLieNGuIwK3emcg8BjIvzDBhYz_7UOSFn9GXpeo4KBCtsIogZg6jhhg4jD_Nkn1LtnQr0nSRuJHKbbmd1pBeN4YmKXPY9giLecrpiKCDcJjEUJhKR_s2WBt3Ob4B5WRXQQ4Q',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCD0_aKD4u0q8exAjJm-pKJNiUGe_yZaArAWss8N_i70Ia_G5qxc8mfnBoXZQgApHMwgkJjfdwn4NuXVm2k5YaFL5b-Hz9N041wpDnT-psHv-Bo19XLT9ohMnbA-FjF_4BRrSPOfKfZOkEjGHfPNTrgHVqXHNcJIFw1oIoO1-lYEO5xFG03kn1Ihnt1qhg1m9G9BV1GwolVswlWFMfifOrEjVx3B2xQl08nsGt13CFInDu3FD3pDElDce-Bx0I3lN1VK6-khaQ13-4',
];

const MAP_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBktsMp5r2HBD_yrSARsoytd_YLBAW6osqvP_5nKZMKwTsWg2YfpbfKTEC_rXZXdJW1FME7MLZ1vfzav33Ri-8UoiK1quVVkUAtcr-t4Y_HdspYbAkvS-IKp1mhNsfWJy4fTLYAX-8zC9xTRC_16_2IK1SopXufZKXEK-kTruD15RMAZaeWg8YBQ7kSi0O-SQFY5aLTdEmgE-iR-W1QKjAcWUZ6t7uiyTHOZnsLCcSAVtK252-AkA6lmPvWWfxtywl7SKMjSsTi34g';
const SPACE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuAuDQu1q9ySPWpcewoJ0KbwPt4ZuMjj10ehn-d0Q4jNiKYU7dLY9kgyCtlslk4xgms6ZGNN7GBcVIAnT02rQPTXJ9Vwfxcyfmy6klcWx5QmAC8IBSZgYtCxwil739UPNsziwmBAXetEAxICOGSTiThDRen8OrlFk6kOyVcZGbgysORStU3DJl86af9vkgFXvrmxSLun0CVY3CGiYy1zW9kYRdtyXyLW4J4P5HKDxUaCQhX2HUu-MuZuLLopBaE7RDw7Z6Qa1h_zc';

export default function Coffe2({ lang = 'vi' }: Props) {
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('signature');

  function scrollSlider(dir: 'prev' | 'next') {
    if (!sliderRef.current) return;
    const w = sliderRef.current.offsetWidth;
    sliderRef.current.scrollBy({ left: dir === 'next' ? w : -w, behavior: 'smooth' });
  }

  const menuItems = t.menuSection.items[activeTab];

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-inter overflow-x-hidden">
      <style>{`
        @keyframes sway { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        .animate-sway { animation: sway 6s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <header data-section="nav" className="fixed top-0 w-full z-50 shadow-sm bg-[#f7f9fb]/80 backdrop-blur-md">
        <nav className="flex justify-between items-center px-10 py-3 max-w-[1280px] mx-auto">
          <a data-field="nav.brand" className="font-lexend text-2xl tracking-tight text-[#191c1e]" href="#">{t.nav.brand}</a>
          <div className="hidden md:flex gap-6">
            <a className="text-secondary font-bold border-b-2 border-secondary text-base transition-all" href="#hero">{t.nav.home}</a>
            <a className="text-[#424752] hover:text-primary text-base transition-colors" href="#menu">{t.nav.menu}</a>
            <a className="text-[#424752] hover:text-primary text-base transition-colors" href="#space">{t.nav.space}</a>
            <a className="text-[#424752] hover:text-primary text-base transition-colors" href="#location">{t.nav.location}</a>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:shadow-lg active:scale-95 transition-all cursor-pointer">{t.nav.start}</button>
        </nav>
      </header>

      <main className="overflow-x-hidden">
        {/* Hero Slider */}
        <section data-section="hero" className="relative h-screen w-full pt-[72px]" id="hero">
          <div
            ref={sliderRef}
            className="flex h-full overflow-x-auto snap-x scroll-smooth"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
          >
            {t.hero.slides.map((slide, i) => (
              <div key={i} className="relative w-full h-full flex-shrink-0 snap-start">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${images[`slide_${i}`] ?? SLIDE_IMGS[i]}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-20 text-white">
                  <Reveal as="h1" data-field={`hero.slides.${i}.title`} variant="fade-up" className="font-lexend text-[48px] leading-[1.2] font-bold tracking-[-0.02em] max-w-2xl mb-3">{slide.title}</Reveal>
                  <Reveal as="p" data-field={`hero.slides.${i}.desc`} variant="fade-up" delay={120} className="text-lg leading-[1.6] max-w-xl opacity-90">{slide.desc}</Reveal>
                  <Reveal variant="fade-up" delay={240} className="mt-6">
                    <button data-field={`hero.slides.${i}.btn`} className="bg-[#00a9fd] text-[#003a5c] px-10 py-3 rounded-full text-sm font-medium hover:bg-[#cce5ff] transition-colors cursor-pointer">{slide.btn}</button>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-10 right-10 flex gap-3 z-20">
            <button onClick={() => scrollSlider('prev')} className="w-12 h-12 rounded-full flex items-center justify-center text-[#191c1e] hover:bg-white transition-all cursor-pointer" style={glassCard}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button onClick={() => scrollSlider('next')} className="w-12 h-12 rounded-full flex items-center justify-center text-[#191c1e] hover:bg-white transition-all cursor-pointer" style={glassCard}>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Decorative floating leaves */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 animate-sway opacity-10">
            <span className="material-symbols-outlined text-[160px] text-primary">eco</span>
          </div>
          <div className="absolute bottom-20 -right-20 w-64 h-64 animate-sway opacity-10" style={{ animationDelay: '1s' }}>
            <span className="material-symbols-outlined text-[200px] text-secondary">park</span>
          </div>
        </div>

        {/* Best Sellers */}
        <section data-section="bestsellers" className="py-20 px-6 max-w-[1280px] mx-auto relative z-10">
          <Reveal variant="fade-up" className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span data-field="bestsellers.badge" className="text-secondary text-sm font-medium uppercase tracking-widest">{t.bestsellers.badge}</span>
              <h2 data-field="bestsellers.title" className="font-lexend text-[32px] leading-[1.3] font-semibold mt-1">{t.bestsellers.title}</h2>
            </div>
            <div className="flex gap-3">
              <button className="p-3 rounded-full border border-[#c2c6d4] hover:bg-[#eceef0] transition-all cursor-pointer">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-3 rounded-full border border-[#c2c6d4] hover:bg-[#eceef0] transition-all cursor-pointer">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Array.isArray(t.bestsellers.items) ? t.bestsellers.items : []).map((item, i) => (
              <Reveal key={i} variant="fade-up" delay={i * 110}>
              <div className="group relative overflow-hidden rounded-2xl p-6 hover:shadow-xl transition-all duration-500 h-full" style={glassCard}>
                <div className="aspect-square overflow-hidden rounded-xl mb-6">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images[`bestsellers_items_${i}`] ?? BESTSELLER_IMGS[i]} alt={item.name} />
                </div>
                <h3 data-field={`bestsellers.items.${i}.name`} className="font-lexend text-2xl font-semibold">{item.name}</h3>
                <p data-field={`bestsellers.items.${i}.desc`} className="text-[#424752] mb-6 text-base">{item.desc}</p>
                <div className="flex justify-between items-center">
                  <span data-field={`bestsellers.items.${i}.price`} className="text-primary font-bold text-2xl">{item.price}</span>
                  <button className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Menu Tabs */}
        <section data-section="menuSection" className="py-20 bg-[#f2f4f6] relative z-10" id="menu">
          <div className="max-w-[1280px] mx-auto px-6">
            <Reveal variant="fade-up" className="text-center mb-20">
              <h2 data-field="menuSection.title" className="font-lexend text-[48px] leading-[1.2] font-bold tracking-[-0.02em]">{t.menuSection.title}</h2>
              <p data-field="menuSection.subtitle" className="text-[#424752] mt-3 max-w-lg mx-auto">{t.menuSection.subtitle}</p>
            </Reveal>
            <Reveal variant="fade-up" delay={100} className="flex justify-center mb-10">
              <div className="inline-flex p-1 bg-white rounded-full shadow-sm border border-[#c2c6d4]">
                {(Object.keys(t.menuSection.tabs) as TabKey[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${activeTab === tab ? 'bg-primary text-white' : 'text-[#424752] hover:bg-[#eceef0]'}`}
                  >
                    {t.menuSection.tabs[tab]}
                  </button>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">
              {(menuItems ?? []).map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 60}>
                <div className="flex justify-between items-center p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 group">
                  <div className="flex-1">
                    <h4 className="font-bold text-2xl group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className="text-[#424752] text-base">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-primary">{item.price}đ</span>
                    <div className="w-px h-8 bg-[#c2c6d4]" />
                    <button className="w-8 h-8 rounded-full border border-[#c2c6d4] flex items-center justify-center hover:bg-secondary hover:text-white transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Space Section */}
        <section data-section="space" className="py-20 px-6 max-w-[1280px] mx-auto relative z-10" id="space">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <Reveal variant="fade-right" className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl relative z-20">
                <img className="w-full h-[500px] object-cover" src={images['space'] ?? SPACE_IMG} alt="Cafe Space" />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#cce5ff] rounded-full -z-10 blur-3xl opacity-50" />
            </Reveal>
            <Reveal variant="fade-left" delay={150}>
              <span data-field="space.badge" className="text-secondary text-sm font-medium uppercase tracking-widest">{t.space.badge}</span>
              <h2 data-field="space.title" className="font-lexend text-[48px] leading-[1.2] font-bold tracking-[-0.02em] mt-1 mb-6">{t.space.title}</h2>
              <p data-field="space.desc" className="text-[#424752] text-lg leading-[1.6] mb-10">{t.space.desc}</p>
              <div className="grid grid-cols-2 gap-6">
                {t.space.amenities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">{a.icon}</span>
                    <div>
                      <p className="font-bold">{a.title}</p>
                      <p className="text-xs font-semibold opacity-70">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-20 bg-primary/10 relative z-10 overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 relative z-20">
            <Reveal as="h2" data-field="testimonials.title" variant="fade-up" className="font-lexend text-[32px] leading-[1.3] font-semibold text-center mb-20">{t.testimonials.title}</Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Array.isArray(t.testimonials.items) ? t.testimonials.items : []).map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 120} className="p-10 rounded-2xl" style={glassCard}>
                  <div className="flex text-[#00a9fd] mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <span key={si} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-base mb-6">"{item.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#e0e3e5] overflow-hidden">
                      <img className="w-full h-full object-cover" src={images[`avatar_${i}`] ?? AVATAR_IMGS[i]} alt={item.name} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs font-semibold opacity-70">{item.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section data-section="location" className="py-20 px-6 max-w-[1280px] mx-auto relative z-10" id="location">
          <div className="flex flex-col md:flex-row gap-20">
            <Reveal variant="fade-right" className="md:w-1/3">
              <h2 data-field="location.title" className="font-lexend text-[32px] leading-[1.3] font-semibold mb-6">{t.location.title}</h2>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <p data-field="location.address" className="text-base">{t.location.address}</p>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <div>
                    <p className="font-bold">{t.location.hoursLabel}</p>
                    <p data-field="location.hours" className="text-base">{t.location.hours}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-primary">call</span>
                  <a data-field="location.phone" data-track="call" href={`tel:${t.location.phone.replace(/\s+/g, '')}`} className="text-base hover:text-primary transition-colors cursor-pointer">{t.location.phone}</a>
                </div>
                <div className="pt-6">
                  <button data-track="directions" className="bg-primary text-white px-10 py-3 rounded-full text-sm font-medium hover:shadow-lg transition-all w-full cursor-pointer">{t.location.directionsBtn}</button>
                </div>
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={150} className="md:w-2/3 h-[400px] rounded-2xl overflow-hidden shadow-lg">
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
                <img className="w-full h-full object-cover" src={images['map'] ?? MAP_IMG} alt="Location Map" />
              )}
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="w-full relative border-t border-[#c2c6d4] bg-white py-20">
        <Reveal variant="fade" className="flex flex-col md:flex-row justify-between items-center px-10 max-w-[1280px] mx-auto gap-6">
          <div className="text-center md:text-left">
            <a data-field="footer.brand" className="font-lexend text-2xl text-[#191c1e]" href="#">{t.footer.brand}</a>
            <p data-field="footer.desc" className="text-[#424752] text-base max-w-xs mt-3">{t.footer.desc}</p>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-3">
              <p className="font-bold text-primary">{t.footer.linksTitle}</p>
              <a className="text-[#424752] hover:text-secondary transition-colors" href="#">{t.footer.about}</a>
              <a className="text-[#424752] hover:text-secondary transition-colors" href="#">{t.footer.terms}</a>
              <a className="text-[#424752] hover:text-secondary transition-colors" href="#">{t.footer.privacy}</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-primary">{t.footer.followTitle}</p>
              <div className="flex gap-6">
                <a className="text-[#424752] hover:text-secondary transition-colors" href="#">
                  <span className="material-symbols-outlined">face_nod</span>
                </a>
                <a className="text-[#424752] hover:text-secondary transition-colors" href="#">
                  <span className="material-symbols-outlined">photo_camera</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="max-w-[1280px] mx-auto px-10 mt-20 pt-10 border-t border-[#c2c6d4] text-center opacity-70">
          <p data-field="footer.copyright" className="text-base">{t.footer.copyright}</p>
        </div>
      </footer>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 cursor-pointer">
        <span className="material-symbols-outlined text-[32px]">shopping_cart</span>
      </button>
    </div>
  );
}
