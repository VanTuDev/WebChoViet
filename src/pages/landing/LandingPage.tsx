import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardPaste,
  Coffee,
  CupSoda,
  Flame,
  Languages,
  LogIn,
  MapPin,
  PlayCircle,
  QrCode,
  Rocket,
  Sparkles,
  Star,
  UtensilsCrossed,
  Zap,
} from 'lucide-react';
import { TEMPLATES, CATEGORY_REGISTRY } from '../../data/templates/registry';
import type { Template } from '../../data/templates/registry';
import { ROUTES } from '../../config/routes';
import { DOMAIN } from '../../config/contact';
import SiteHeader from '../../components/shared/SiteHeader';
import SiteFooter from '../../components/shared/SiteFooter';
import HreflangLinks from '../../i18n/HreflangLinks';

/* ═══════════════════════════════════════════════════════════════════════
   Showcase data — screenshot thật của template (utils/templateScreens)
   ghép với metadata trong registry.
═══════════════════════════════════════════════════════════════════════ */
import { TEMPLATE_SCREEN_BY_ID as SHOT_BY_ID } from '../../utils/templateScreens';

const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORY_REGISTRY.map(c => [c.id, c.label]),
);

type ShowcaseItem = Template & { screen: string };

const SHOWCASE: ShowcaseItem[] = TEMPLATES.filter(t => SHOT_BY_ID[t.id]).map(t => ({
  ...t,
  screen: SHOT_BY_ID[t.id],
}));

// Chip "Tất cả" dịch theo ngôn ngữ hệ thống (label: null → render bằng t());
// label category lấy từ registry — dữ liệu catalog template, giữ nguyên tiếng gốc.
const FILTER_CHIPS: { id: string; label: string | null }[] = [
  { id: 'all', label: null },
  ...CATEGORY_REGISTRY.filter(c => SHOWCASE.some(t => t.category === c.id)).map(c => ({
    id: c.id,
    label: c.label,
  })),
];

/* ═══════════════════════════════════════════════════════════════════════
   3D Coverflow carousel — trình diễn screenshot template
═══════════════════════════════════════════════════════════════════════ */
function TemplateCarousel3D({
  items,
  onOpen,
}: {
  items: ShowcaseItem[];
  onOpen: () => void;
}) {
  const { t } = useTranslation('landing');
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);
  const n = items.length;

  const go = useCallback(
    (dir: 1 | -1) => setActive(a => (a + dir + n) % n),
    [n],
  );

  /* Autoplay — dừng khi đang hover */
  useEffect(() => {
    if (n < 2) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) setActive(a => (a + 1) % n);
    }, 4000);
    return () => clearInterval(timer);
  }, [n]);

  if (n === 0) return null;

  /* Khoảng cách vòng ngắn nhất từ slide i tới slide active: [-n/2, n/2] */
  const offsetOf = (i: number) => {
    let off = i - active;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    return off;
  };

  const current = items[active];

  return (
    <div
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Sân khấu 3D */}
      <div className="carousel-3d relative h-[460px] sm:h-[520px] overflow-hidden">
        {items.map((tmpl, i) => {
          const off = offsetOf(i);
          const abs = Math.abs(off);
          const hidden = abs > 2;
          const isCenter = off === 0;
          return (
            <div
              key={tmpl.id}
              className="carousel-3d__slide"
              style={{
                transform: `translate(-50%, -50%) translateX(calc(${off} * min(270px, 31vw))) translateZ(${-abs * 170}px) rotateY(${off * -24}deg) scale(${isCenter ? 1 : 0.92})`,
                opacity: hidden ? 0 : 1 - abs * 0.12,
                filter: isCenter ? 'none' : 'saturate(0.85) brightness(0.92)',
                zIndex: 10 - abs,
                pointerEvents: hidden ? 'none' : 'auto',
              }}
            >
              <button
                onClick={() => (isCenter ? onOpen() : setActive(i))}
                className="block w-[240px] sm:w-[300px] text-left cursor-pointer group outline-none"
                aria-label={isCenter ? t('showcase.previewAria', { name: tmpl.name }) : t('showcase.goToAria', { name: tmpl.name })}
              >
                <div className="rounded-2xl overflow-hidden bg-white shadow-2xl shadow-fnb-red/25 ring-1 ring-black/5">
                  {/* Thanh trình duyệt giả lập */}
                  <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-fnb-cream to-white border-b border-outline-variant/40">
                    <span className="w-2.5 h-2.5 rounded-full bg-fnb-red" />
                    <span className="w-2.5 h-2.5 rounded-full bg-fnb-amber" />
                    <span className="w-2.5 h-2.5 rounded-full bg-fnb-green" />
                    <span className="ml-2 flex-1 truncate text-[10px] font-inter text-on-surface-variant bg-surface-container-low rounded-full px-2.5 py-0.5">
                      {DOMAIN}/{tmpl.id}
                    </span>
                  </div>

                  {/* Screenshot full-page — hover sẽ cuộn từ từ xuống cuối trang */}
                  <div className="tmpl-screen relative h-[300px] sm:h-[360px] overflow-hidden">
                    <img
                      src={tmpl.screen}
                      alt={t('showcase.screenshotAlt', { name: tmpl.name })}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {tmpl.badge && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-fnb-red to-fnb-orange text-white text-[10px] font-inter font-bold px-2.5 py-1 rounded-full shadow-lg shadow-fnb-red/40">
                        {tmpl.badge}
                      </span>
                    )}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-fnb-red/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-5">
                        <span className="bg-white text-fnb-red font-inter font-semibold text-xs px-5 py-2.5 rounded-full shadow-lg flex items-center gap-1.5">
                          {t('showcase.previewThis')}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="px-4 py-3 flex items-center justify-between gap-2 bg-white">
                    <div className="min-w-0">
                      <p className="font-lexend font-semibold text-sm text-on-surface truncate">{tmpl.name}</p>
                      <p className="font-inter text-[11px] text-on-surface-variant truncate">
                        {CATEGORY_LABEL[tmpl.category] ?? tmpl.category}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[11px] font-inter font-bold px-2.5 py-1 rounded-full ${
                        tmpl.price === 0
                          ? 'bg-fnb-green/10 text-fnb-green'
                          : 'bg-fnb-amber/15 text-on-secondary-container'
                      }`}
                    >
                      {tmpl.priceText}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}

        {/* Nút điều hướng */}
        <button
          onClick={() => go(-1)}
          aria-label={t('showcase.prevSlide')}
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-fnb-red shadow-lg shadow-fnb-red/20 flex items-center justify-center hover:bg-fnb-red hover:text-white hover:scale-110 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label={t('showcase.nextSlide')}
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-fnb-red shadow-lg shadow-fnb-red/20 flex items-center justify-center hover:bg-fnb-red hover:text-white hover:scale-110 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Chấm điều hướng + đánh giá mẫu đang chọn */}
      <div className="flex flex-col items-center gap-3 mt-2">
        <div className="flex flex-wrap justify-center items-center gap-1.5 max-w-md px-4">
          {items.map((tmpl, i) => (
            <button
              key={tmpl.id}
              onClick={() => setActive(i)}
              aria-label={t('showcase.selectAria', { name: tmpl.name })}
              className={`rounded-full transition-all cursor-pointer ${
                i === active
                  ? 'w-7 h-2.5 bg-gradient-to-r from-fnb-orange to-fnb-red'
                  : 'w-2.5 h-2.5 bg-outline-variant hover:bg-fnb-orange/50'
              }`}
            />
          ))}
        </div>
        {current?.rating && (
          <div className="flex items-center gap-1 font-inter text-xs text-on-surface-variant">
            <Star className="w-3.5 h-3.5 text-fnb-amber fill-fnb-amber" />
            <span className="font-semibold text-on-surface">{current.rating}</span>
            · {t('showcase.trustedBy')}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const goToMarketplace = () => navigate(ROUTES.MARKETPLACE);

  /* Scroll-reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const showcased = useMemo(
    () => (activeFilter === 'all' ? SHOWCASE : SHOWCASE.filter(t => t.category === activeFilter)),
    [activeFilter],
  );

  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden selection:bg-fnb-amber/40 selection:text-on-secondary-container relative min-h-screen">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      <HreflangLinks path="/" />

      {/* ── Decorative background blobs — tông ấm nóng nhiều màu ─────────── */}
      <div className="fixed top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-fnb-orange/20 blur-[110px] -z-10 pointer-events-none" />
      <div className="fixed top-[30%] right-[-15%] w-[35%] h-[45%] rounded-full bg-fnb-pink/15 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-15%] left-[20%] w-[40%] h-[40%] rounded-full bg-fnb-amber/20 blur-[130px] -z-10 pointer-events-none" />

      <SiteHeader variant="landing" />

      <main className="pt-[100px] pb-20">

        {/* ════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════ */}
        <section className="animate-on-scroll max-w-[1280px] mx-auto px-6 pt-16 pb-20 flex flex-col lg:flex-row items-center gap-16">

          {/* Left — text */}
          <div className="lg:w-1/2 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-fnb-orange/15 to-fnb-red/15 text-fnb-red border border-fnb-orange/30 px-4 py-1.5 rounded-full text-xs font-semibold font-inter">
              <Zap className="w-3.5 h-3.5 fill-fnb-amber text-fnb-amber" />
              {t('hero.badge')}
            </div>

            <h1 className="font-lexend font-bold text-[42px] sm:text-[48px] leading-[1.15] tracking-tight text-on-surface">
              {t('hero.title1')}{' '}
              <span className="bg-gradient-to-r from-fnb-red via-fnb-orange to-fnb-amber bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>{' '}
              {t('hero.title2')}
            </h1>

            <p className="font-inter text-[18px] leading-[1.6] text-on-surface-variant max-w-lg">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-3 w-full sm:w-auto">
              <Link
                to={ROUTES.DASHBOARD_PROJECTS}
                className="bg-gradient-to-r from-fnb-red to-fnb-orange text-white font-inter font-semibold text-sm px-10 py-3.5 rounded-full shadow-lg shadow-fnb-red/30 hover:shadow-xl hover:shadow-fnb-red/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {t('hero.ctaStart')}
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
              <Link
                to={ROUTES.MARKETPLACE}
                className="bg-white text-fnb-red border-2 border-fnb-orange/40 font-inter font-semibold text-sm px-10 py-3.5 rounded-full hover:bg-fnb-cream hover:border-fnb-orange transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PlayCircle className="w-4.5 h-4.5" />
                {t('hero.ctaDemo')}
              </Link>
            </div>

            {/* Mini social proof */}
            <ul className="flex items-center gap-4 pt-2 font-inter text-xs text-on-surface-variant list-none">
              <li className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-fnb-orange" /> {t('hero.proofCafe')}
              </li>
              <li className="flex items-center gap-1.5">
                <UtensilsCrossed className="w-4 h-4 text-fnb-red" /> {t('hero.proofRestaurant')}
              </li>
              <li className="flex items-center gap-1.5">
                <CupSoda className="w-4 h-4 text-fnb-pink" /> {t('hero.proofMilkTea')}
              </li>
            </ul>
          </div>

          {/* Right — floating image */}
          <div className="lg:w-1/2 w-full relative floating">
            <div className="absolute inset-0 bg-gradient-to-tr from-fnb-amber/40 via-fnb-orange/25 to-fnb-pink/25 rounded-[3rem] rotate-3 scale-105 -z-10" />
            <div className="bg-white rounded-[2rem] p-3 shadow-xl shadow-fnb-orange/15 border border-fnb-orange/15">
              <img
                className="w-full h-auto rounded-[1rem] object-cover aspect-[4/3]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQoMz0YvfyhaGdi32H71jL9Ok6eY0_9tC6zk5x7X6FGqokHK2kSKieZBf4XG6AMZyB2MuYkQbK7ircYWiC36iy8c-GWR3jhkrEg193FUumWy0qDg-qzzQDh4dt9ZVDUk0aPEVvU-E9JQhXhbNn9_43RUbXZtBwjzjwW3nFhyQ1rRIDDJbAbVMZQyyakFnZeNfzqfnZmzSqkY5TdV4XxdecblzkzWEYxt5q5x3jmMIuwC8Vw1_TQQFHor0Bm4DA5WkxyUatgZV0vWo"
                alt={t('hero.imageAlt')}
              />
            </div>
            <div
              className="absolute -bottom-6 -left-6 glass-panel rounded-xl p-3 flex items-center gap-3 shadow-lg shadow-fnb-red/15 animate-bounce"
              style={{ animationDuration: '3s' }}
            >
              <div className="bg-fnb-green/15 text-fnb-green rounded-full p-1.5 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-inter font-semibold text-[12px] text-on-surface">{t('hero.floatReady')}</p>
                <p className="text-[10px] text-on-surface-variant">{t('hero.floatReadySub')}</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-4 glass-panel rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-lg shadow-fnb-amber/20">
              <QrCode className="w-6 h-6 text-fnb-red" />
              <div>
                <p className="font-inter font-semibold text-[11px] text-on-surface">{t('hero.floatQr')}</p>
                <p className="text-[10px] text-fnb-green font-semibold">{t('hero.floatQrSub')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            TEMPLATE SHOWCASE — 3D carousel screenshot thật
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="animate-on-scroll relative py-20 mt-4 overflow-hidden"
          style={{ animationDelay: '100ms' }}
        >
          {/* Nền warm gradient cho khu trưng bày */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fnb-orange/8 to-transparent -z-10" />

          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 bg-fnb-amber/15 text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-semibold font-inter mb-4">
                <Flame className="w-3.5 h-3.5 text-fnb-red" />
                {t('showcase.badge')}
              </div>
              <h2 className="font-lexend font-bold text-[32px] sm:text-[38px] leading-[1.25] text-on-surface mb-3">
                {t('showcase.title1')}{' '}
                <span className="bg-gradient-to-r from-fnb-orange to-fnb-pink bg-clip-text text-transparent">
                  {t('showcase.titleHighlight')}
                </span>
                {t('showcase.title2')}
              </h2>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant max-w-2xl mx-auto">
                {t('showcase.description')}
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {FILTER_CHIPS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`font-inter font-semibold text-xs px-4 py-2 rounded-full cursor-pointer border transition-all ${
                    activeFilter === f.id
                      ? 'bg-gradient-to-r from-fnb-red to-fnb-orange text-white border-transparent shadow-md shadow-fnb-red/30 scale-105'
                      : 'bg-white text-on-surface-variant border-outline-variant hover:border-fnb-orange hover:text-fnb-red'
                  }`}
                >
                  {f.label ?? t('showcase.filterAll')}
                </button>
              ))}
            </div>

            <TemplateCarousel3D
              key={activeFilter}
              items={showcased}
              onOpen={goToMarketplace}
            />

            <div className="text-center mt-8">
              <Link
                to={ROUTES.MARKETPLACE}
                className="inline-flex items-center gap-1.5 font-inter font-semibold text-sm text-fnb-red hover:text-fnb-orange transition-colors cursor-pointer"
              >
                {t('showcase.exploreAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            FEATURES — Bento Grid nhiều màu
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="features"
          className="animate-on-scroll max-w-[1280px] mx-auto px-6 py-20"
          style={{ animationDelay: '200ms' }}
        >
          <div className="text-center mb-10">
            <h2 className="font-lexend font-bold text-[32px] leading-[1.3] text-on-surface mb-3">
              {t('features.title1')}{' '}
              <span className="bg-gradient-to-r from-fnb-red to-fnb-orange bg-clip-text text-transparent">{t('features.titleHighlight')}</span>{' '}
              {t('features.title2')}
            </h2>
            <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-fnb-orange/10 to-white rounded-[2rem] p-10 border border-fnb-orange/20 shadow-md shadow-fnb-orange/10 glow-hover flex flex-col h-full group">
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br from-fnb-orange to-fnb-red text-white flex items-center justify-center mb-6 shadow-lg shadow-fnb-orange/30 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-3">
                {t('features.maps.title')}
              </h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant flex-grow">
                {t('features.maps.description')}
              </p>
            </div>

            <div className="bg-gradient-to-b from-fnb-green/10 to-white rounded-[2rem] p-10 border border-fnb-green/20 shadow-md shadow-fnb-green/10 glow-hover flex flex-col h-full group">
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br from-fnb-green to-emerald-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-fnb-green/30 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Languages className="w-6 h-6" />
              </div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-3">
                {t('features.multilang.title')}
              </h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant flex-grow">
                {t('features.multilang.description')}
              </p>
            </div>

            <div className="bg-gradient-to-b from-fnb-pink/10 to-white rounded-[2rem] p-10 border border-fnb-pink/20 shadow-md shadow-fnb-pink/10 glow-hover flex flex-col h-full group">
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br from-fnb-pink to-fnb-red text-white flex items-center justify-center mb-6 shadow-lg shadow-fnb-pink/30 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-3">
                {t('features.qr.title')}
              </h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant flex-grow">
                {t('features.qr.description')}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            HOW IT WORKS
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="animate-on-scroll max-w-[1280px] mx-auto px-6 py-20"
          style={{ animationDelay: '300ms' }}
        >
          <div className="text-center mb-20">
            <h2 className="font-lexend font-bold text-[32px] leading-[1.3] text-on-surface mb-3">
              {t('howItWorks.title1')}{' '}
              <span className="bg-gradient-to-r from-fnb-orange to-fnb-amber bg-clip-text text-transparent">{t('howItWorks.titleHighlight')}</span>
            </h2>
            <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant max-w-2xl mx-auto">
              {t('howItWorks.description')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 rounded-full bg-gradient-to-r from-fnb-orange/40 via-fnb-amber/40 to-fnb-green/40 z-0" />

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10 md:w-1/3 px-6 mb-10 md:mb-0">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-fnb-orange flex items-center justify-center mb-6 shadow-lg shadow-fnb-orange/25 text-fnb-orange">
                <LogIn className="w-9 h-9" />
              </div>
              <div className="bg-gradient-to-br from-fnb-orange to-fnb-red text-white font-inter font-bold text-xs w-8 h-8 rounded-full flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20 shadow-md shadow-fnb-red/30">1</div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-1">{t('howItWorks.step1Title')}</h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant">
                {t('howItWorks.step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10 md:w-1/3 px-6 mb-10 md:mb-0">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-fnb-amber flex items-center justify-center mb-6 shadow-lg shadow-fnb-amber/25 text-fnb-amber">
                <ClipboardPaste className="w-9 h-9" />
              </div>
              <div className="bg-gradient-to-br from-fnb-amber to-fnb-orange text-white font-inter font-bold text-xs w-8 h-8 rounded-full flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20 shadow-md shadow-fnb-amber/30">2</div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-1">{t('howItWorks.step2Title')}</h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant">
                {t('howItWorks.step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10 md:w-1/3 px-6">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-fnb-green flex items-center justify-center mb-6 shadow-lg shadow-fnb-green/25 text-fnb-green">
                <Rocket className="w-9 h-9" />
              </div>
              <div className="bg-gradient-to-br from-fnb-green to-emerald-600 text-white font-inter font-bold text-xs w-8 h-8 rounded-full flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20 shadow-md shadow-fnb-green/30">3</div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-1">{t('howItWorks.step3Title')}</h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant">
                {t('howItWorks.step3Desc')}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CTA SECTION
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="animate-on-scroll max-w-[1280px] mx-auto px-6 py-20"
          style={{ animationDelay: '400ms' }}
        >
          <div className="bg-gradient-to-br from-fnb-red via-fnb-orange to-fnb-amber text-white rounded-[2rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl shadow-fnb-red/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-fnb-pink/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            <Coffee className="absolute top-10 left-[12%] w-10 h-10 text-white/20 -rotate-12" />
            <UtensilsCrossed className="absolute bottom-12 right-[14%] w-12 h-12 text-white/20 rotate-12" />
            <Sparkles className="absolute top-14 right-[22%] w-8 h-8 text-white/25" />

            <h2 className="font-lexend font-bold text-[36px] sm:text-[48px] leading-[1.2] tracking-tight mb-3 relative z-10">
              {t('cta.title')}
            </h2>
            <p className="font-inter text-[18px] leading-[1.6] text-white/85 mb-10 max-w-xl mx-auto relative z-10">
              {t('cta.description')}
            </p>
            <Link
              to={ROUTES.DASHBOARD_PROJECTS}
              className="bg-white text-fnb-red font-inter font-bold text-sm px-14 sm:px-20 py-4 rounded-full shadow-xl shadow-black/15 hover:scale-105 hover:shadow-2xl transition-all relative z-10 cursor-pointer inline-flex items-center gap-2"
            >
              {t('cta.button')}
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter variant="landing" />
    </div>
  );
}
