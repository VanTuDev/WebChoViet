import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardPaste,
  Flame,
  Languages,
  LogIn,
  MapPin,
  PlayCircle,
  QrCode,
  Rocket,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import { TEMPLATES, CATEGORY_REGISTRY } from '../../data/templates/registry';
import type { Template } from '../../data/templates/registry';
import { ROUTES } from '../../config/routes';
import { DOMAIN } from '../../config/contact';
import SiteHeader from '../../components/shared/SiteHeader';
import SiteFooter from '../../components/shared/SiteFooter';
import HreflangLinks from '../../i18n/HreflangLinks';
import { useTemplateStars } from '../../hooks/useTemplateStars';

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
   Sóng bo mềm khép chân hero — 1 đường cong duy nhất, gradient thương
   hiệu (primary → tertiary), thay cho hoạ tiết vảy cá sơn mài cũ.
═══════════════════════════════════════════════════════════════════════ */
function HeroWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="heroWaveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="55%" stopColor="var(--color-secondary)" />
          <stop offset="100%" stopColor="var(--color-tertiary)" />
        </linearGradient>
      </defs>
      <path
        d="M0,58 C240,110 420,0 720,26 C1020,52 1200,10 1440,50 L1440,110 L0,110 Z"
        fill="url(#heroWaveGrad)"
      />
    </svg>
  );
}

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
  const { getStarCount } = useTemplateStars();

  const go = useCallback(
    (dir: 1 | -1) => setActive(a => (a + dir + n) % n),
    [n],
  );

  /* Autoplay — dừng khi đang hover */
  useEffect(() => {
    if (n < 2) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) setActive(a => (a + 1) % n);
    }, 7000);
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
                <div className="rounded-2xl overflow-hidden bg-white shadow-2xl shadow-primary/20 ring-1 ring-outline-variant">
                  {/* Thanh trình duyệt giả lập — gradient thương hiệu */}
                  <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-primary to-tertiary">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                    <span className="ml-2 flex-1 truncate text-[10px] font-inter text-white/90 bg-white/15 rounded-full px-2.5 py-0.5">
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
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-primary to-tertiary text-white text-[10px] font-inter font-bold px-2.5 py-1 rounded-full shadow-lg shadow-primary/40">
                        {tmpl.badge}
                      </span>
                    )}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-5">
                        <span className="bg-white text-primary font-inter font-semibold text-xs px-5 py-2.5 rounded-full shadow-lg flex items-center gap-1.5">
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
                          : 'bg-primary/10 text-primary'
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
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-primary ring-1 ring-primary/20 shadow-lg shadow-primary/15 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label={t('showcase.nextSlide')}
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-primary ring-1 ring-primary/20 shadow-lg shadow-primary/15 flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all cursor-pointer"
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
                  ? 'w-7 h-2.5 bg-gradient-to-r from-primary to-tertiary'
                  : 'w-2.5 h-2.5 bg-outline-variant hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
        {current && getStarCount(current.id) > 0 && (
          <div className="flex items-center gap-1 font-inter text-xs text-on-surface-variant">
            <Star className="w-3.5 h-3.5 text-fnb-amber fill-fnb-amber" />
            <span className="font-semibold text-on-surface">{getStarCount(current.id)}</span>
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
  const tiltRef = useRef<HTMLDivElement>(null);

  const goToMarketplace = () => navigate(ROUTES.MARKETPLACE);

  /* Scroll-reveal: fade-up cổ điển + dựng 3D cho khối lớn */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              entry.target.classList.contains('reveal-3d') ? 'in-view' : 'animate-fade-in-up',
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll('.animate-on-scroll, .reveal-3d')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Động cơ cuộn dùng chung ────────────────────────────────────────
     1) [data-par] / [data-par-mouse]: parallax — element bị "kéo theo"
        khi cuộn (mỗi element một tốc độ) và nghiêng nhẹ theo con trỏ.
     2) [data-stack-card]: card dính xếp chồng — card sau trườn lên đè
        card trước, card trước lùi sâu (scale + tối dần), card đang vào
        màn hình dựng dậy từ tư thế ngả 3D theo đúng tiến độ cuộn.
        HIỆN KHÔNG có element nào trong trang gắn data-stack-card — nhánh
        này đang ở trạng thái chờ (stackEls rỗng, không chạy gì), giữ lại
        để dùng khi cần thêm khối card xếp chồng.
     3) [data-tilt-scroll]: khối nghiêng rotateX liên tục theo khoảng
        cách tới tâm màn hình.
     Tất cả gom về 1 requestAnimationFrame, tắt khi reduced-motion. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const parEls = Array.from(document.querySelectorAll<HTMLElement>('[data-par], [data-par-mouse]'));
    const tiltEls = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt-scroll]'));
    const stackEls = Array.from(document.querySelectorAll<HTMLElement>('[data-stack-card]'));
    const centers = new Map<HTMLElement, number>();
    /* Điểm dính so le đọc từ data-stack-top (khớp class top-* của từng card) */
    const stickOf = (el: HTMLElement) => parseFloat(el.dataset.stackTop ?? '110');

    const clampN = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    /* Đo tâm gốc (chưa transform) của element parallax theo toạ độ tài liệu */
    const measure = () => {
      parEls.forEach(el => { el.style.transform = ''; });
      parEls.forEach(el => {
        const r = el.getBoundingClientRect();
        centers.set(el, r.top + window.scrollY + r.height / 2);
      });
    };

    let mx = 0;
    let my = 0;
    let raf = 0;

    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const mid = window.scrollY + vh / 2;

      parEls.forEach(el => {
        const speed = parseFloat(el.dataset.par ?? '0');
        const depth = parseFloat(el.dataset.parMouse ?? '0');
        const dy = (mid - (centers.get(el) ?? mid)) * speed;
        el.style.transform = `translate3d(${(mx * depth).toFixed(1)}px, ${(dy + my * depth * 0.6).toFixed(1)}px, 0)`;
      });

      tiltEls.forEach(el => {
        const max = parseFloat(el.dataset.tiltScroll ?? '5');
        const r = el.getBoundingClientRect();
        const off = clampN((r.top + r.height / 2 - vh / 2) / (vh / 2), -1, 1);
        el.style.transform = `perspective(1200px) rotateX(${(off * max).toFixed(2)}deg)`;
      });

      stackEls.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const stickTop = stickOf(card);
        /* Tiến độ đi vào: 0 = vừa ló ở đáy màn hình, 1 = chạm điểm dính */
        const enter = clampN((vh - r.top) / Math.max(1, vh - stickTop), 0, 1);
        let rx = (1 - enter) * 9;
        let scale = 1;
        let ty = 0;
        let dim = 0;
        const next = stackEls[i + 1];
        if (next) {
          /* Tiến độ bị card sau đè lên */
          const cover = clampN(1 - (next.getBoundingClientRect().top - stickOf(next)) / (vh * 0.75), 0, 1);
          scale = 1 - cover * 0.05;
          ty = -cover * 10;
          dim = cover;
        }
        card.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) translateY(${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        card.style.filter = dim > 0.02 ? `brightness(${(1 - dim * 0.28).toFixed(3)})` : '';
      });
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      schedule();
    };
    const onResize = () => { measure(); schedule(); };

    measure();
    apply();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  /* Mockup hero nghiêng 3D theo con trỏ */
  const handleTilt = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(px * 10).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(py * -8).toFixed(2)}deg`);
  };
  const resetTilt = () => {
    tiltRef.current?.style.setProperty('--rx', '0deg');
    tiltRef.current?.style.setProperty('--ry', '0deg');
  };

  const showcased = useMemo(
    () => (activeFilter === 'all' ? SHOWCASE : SHOWCASE.filter(t => t.category === activeFilter)),
    [activeFilter],
  );

  const HERO_PILLS = [
    { key: 'pillFast', Icon: Zap },
    { key: 'pillQr', Icon: QrCode },
    { key: 'pillMultilang', Icon: Languages },
  ] as const;

  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary relative min-h-screen">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      <HreflangLinks path="/" />

      <SiteHeader variant="landing" />

      <main className="pb-20">

        {/* ════════════════════════════════════════════════════════════════
            HERO — câu chuyện đúng banner chính thức: thẻ Google Maps →
            mũi tên → website hoàn chỉnh. Nền sáng gradient thương hiệu
            (lam ngọc → xanh dương → tím), không còn lụa đỏ/hạc/đèn lồng.
        ════════════════════════════════════════════════════════════════ */}
        <section
          aria-label={t('hero.title1')}
          className="hero-parallax relative overflow-hidden bg-gradient-to-b from-surface via-surface to-primary-container/15 pt-[130px] pb-24 sm:pb-32"
        >
          {/* Quầng sáng mềm — chiều sâu, không hình khối cứng */}
          <div data-par="0.08" className="par-wrap absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-tertiary/15 blur-3xl pointer-events-none" />
          <div data-par="0.05" className="par-wrap absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

          <div className="relative max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

            {/* Left — text */}
            <div className="lg:w-[52%] flex flex-col items-start space-y-7">
              <h1 className="font-display font-extrabold text-[40px] sm:text-[54px] leading-[1.12] tracking-tight text-on-surface">
                {t('hero.title1')}{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>{' '}
                {t('hero.title2')}
              </h1>

              <p className="font-inter text-[19px] sm:text-[21px] font-medium leading-[1.5] text-on-surface-variant">
                {t('hero.subheading')}
              </p>

              <p className="font-inter text-[17px] sm:text-[18px] leading-[1.7] text-on-surface-variant max-w-lg">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
                <Link
                  to={ROUTES.DASHBOARD_PROJECTS}
                  className="bg-primary hover:bg-primary/90 text-white font-inter font-bold text-sm px-10 py-4 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {t('hero.ctaStart')}
                  <ArrowRight className="w-4.5 h-4.5" />
                </Link>
                <Link
                  to={ROUTES.MARKETPLACE}
                  className="bg-white text-on-surface border border-outline-variant font-inter font-semibold text-sm px-10 py-4 rounded-full hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlayCircle className="w-4.5 h-4.5" />
                  {t('hero.ctaDemo')}
                </Link>
              </div>

              {/* 3 pill — đúng banner chính thức: Nhanh chóng / QR Trang Web / Đa Ngôn Ngữ */}
              <ul className="flex flex-wrap items-center gap-2.5 pt-1 list-none">
                {HERO_PILLS.map(({ key, Icon }) => (
                  <li
                    key={key}
                    className="flex items-center gap-1.5 font-inter text-xs font-semibold text-on-surface bg-surface-container-lowest border border-outline-variant px-3.5 py-2 rounded-full shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" /> {t(`hero.${key}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — ảnh banner chính thức (design/Logo/bannerweb_VNGOweb.png,
                cắt phần minh hoạ: thẻ Google Maps → mũi tên → website/mobile) */}
            <div
              className="lg:w-[48%] w-full relative"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <div ref={tiltRef} className="tilt-card relative">
                <img
                  src="/hero-banner-visual.jpg"
                  alt={t('hero.visualAlt')}
                  className="w-full h-auto rounded-[1.6rem] shadow-2xl shadow-primary/25"
                  width={1350}
                  height={930}
                />

                {/* Badge nổi */}
                <div
                  className="absolute -bottom-5 -left-3 sm:-left-6 bg-white border border-outline-variant rounded-xl p-3 flex items-center gap-3 shadow-lg animate-bounce"
                  style={{ animationDuration: '3s' }}
                >
                  <div className="bg-fnb-green/10 text-fnb-green rounded-full p-1.5 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-inter font-semibold text-[12px] text-on-surface">{t('hero.floatReady')}</p>
                    <p className="text-[10px] text-on-surface-variant">{t('hero.floatReadySub')}</p>
                  </div>
                </div>
                <div className="absolute z-20 -top-4 -right-2 sm:-right-5 bg-white border border-outline-variant rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-inter font-semibold text-[11px] text-on-surface">{t('hero.floatQr')}</p>
                    <p className="text-[10px] text-primary font-semibold">{t('hero.floatQrSub')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sóng bo mềm khép chân hero — gradient thương hiệu */}
          <HeroWave className="absolute -bottom-px left-0 w-full h-14 sm:h-20" />
        </section>

        {/* ════════════════════════════════════════════════════════════════
            TEMPLATE SHOWCASE — 3D carousel screenshot thật
        ════════════════════════════════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden" aria-label={t('showcase.badge')}>
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="reveal-3d text-center mb-8">
              <div className="inline-flex items-center gap-1.5 bg-primary/8 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-semibold font-inter mb-5">
                <Flame className="w-3.5 h-3.5" />
                {t('showcase.badge')}
              </div>
              <h2 className="font-display font-bold text-[32px] sm:text-[40px] leading-[1.22] text-on-surface mb-3">
                {t('showcase.title1')}{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                  {t('showcase.titleHighlight')}
                </span>
                {t('showcase.title2')}
              </h2>
              <p className="font-inter text-[16px] leading-[1.65] text-on-surface-variant max-w-2xl mx-auto">
                {t('showcase.description')}
              </p>
            </div>

            {/* Filter chips */}
            <div className="reveal-3d flex flex-wrap justify-center gap-2 mb-6" style={{ transitionDelay: '90ms' }}>
              {FILTER_CHIPS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`font-inter font-semibold text-xs px-4 py-2 rounded-full cursor-pointer border transition-all ${
                    activeFilter === f.id
                      ? 'bg-gradient-to-r from-primary to-tertiary text-white border-transparent shadow-md shadow-primary/30 scale-105'
                      : 'bg-white text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary'
                  }`}
                >
                  {f.label ?? t('showcase.filterAll')}
                </button>
              ))}
            </div>

            <div className="reveal-3d" style={{ transitionDelay: '160ms' }}>
              {/* Sân khấu nghiêng rotateX liên tục theo vị trí cuộn */}
              <div data-tilt-scroll="6">
                <TemplateCarousel3D
                  key={activeFilter}
                  items={showcased}
                  onOpen={goToMarketplace}
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                to={ROUTES.MARKETPLACE}
                className="inline-flex items-center gap-1.5 font-inter font-semibold text-sm text-primary hover:text-tertiary transition-colors cursor-pointer"
              >
                {t('showcase.exploreAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            FEATURES — 3 thẻ lam / ngọc lam / tím, khớp bậc thang thương hiệu
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="features"
          className="relative max-w-[1280px] mx-auto px-6 py-20"
          aria-labelledby="features-heading"
        >
          <div className="reveal-3d text-center mb-12">
            <h2 id="features-heading" className="font-display font-bold text-[32px] sm:text-[36px] leading-[1.25] text-on-surface mb-3">
              {t('features.title1')}{' '}
              <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">{t('features.titleHighlight')}</span>{' '}
              {t('features.title2')}
            </h2>
            <p className="font-inter text-[16px] leading-[1.65] text-on-surface-variant max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="reveal-3d relative overflow-hidden bg-gradient-to-b from-primary/8 to-white rounded-[2rem] p-10 border border-primary/20 shadow-md shadow-primary/10 glow-hover flex flex-col h-full group">
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-3">
                {t('features.maps.title')}
              </h3>
              <p className="font-inter text-[15.5px] leading-[1.65] text-on-surface-variant flex-grow">
                {t('features.maps.description')}
              </p>
            </article>

            <article className="reveal-3d relative overflow-hidden bg-gradient-to-b from-secondary/8 to-white rounded-[2rem] p-10 border border-secondary/20 shadow-md shadow-secondary/10 glow-hover flex flex-col h-full group" style={{ transitionDelay: '110ms' }}>
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-secondary text-white flex items-center justify-center mb-6 shadow-lg shadow-secondary/30 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Languages className="w-6 h-6" />
              </div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-3">
                {t('features.multilang.title')}
              </h3>
              <p className="font-inter text-[15.5px] leading-[1.65] text-on-surface-variant flex-grow">
                {t('features.multilang.description')}
              </p>
            </article>

            <article className="reveal-3d relative overflow-hidden bg-gradient-to-b from-tertiary/8 to-white rounded-[2rem] p-10 border border-tertiary/20 shadow-md shadow-tertiary/10 glow-hover flex flex-col h-full group" style={{ transitionDelay: '220ms' }}>
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-tertiary text-white flex items-center justify-center mb-6 shadow-lg shadow-tertiary/30 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-3">
                {t('features.qr.title')}
              </h3>
              <p className="font-inter text-[15.5px] leading-[1.65] text-on-surface-variant flex-grow">
                {t('features.qr.description')}
              </p>
            </article>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            HOW IT WORKS — 3 bước, số đánh dấu theo bậc thang thương hiệu
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="max-w-[1280px] mx-auto px-6 py-20"
          aria-labelledby="how-heading"
        >
          <div className="reveal-3d text-center mb-20">
            <h2 id="how-heading" className="font-display font-bold text-[32px] sm:text-[36px] leading-[1.25] text-on-surface mb-3">
              {t('howItWorks.title1')}{' '}
              <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">{t('howItWorks.titleHighlight')}</span>
            </h2>
            <p className="font-inter text-[16px] leading-[1.65] text-on-surface-variant max-w-2xl mx-auto">
              {t('howItWorks.description')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 rounded-full bg-gradient-to-r from-primary/35 via-secondary/45 to-tertiary/35 z-0" />

            {/* Step 1 */}
            <div className="reveal-3d flex flex-col items-center text-center relative z-10 md:w-1/3 px-6 mb-10 md:mb-0">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/25 text-primary">
                <LogIn className="w-9 h-9" />
              </div>
              <div className="bg-primary text-white font-display font-bold text-sm w-8 h-8 rounded-md ring-2 ring-primary/30 ring-offset-2 ring-offset-surface flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20 shadow-md shadow-primary/30">1</div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-1">{t('howItWorks.step1Title')}</h3>
              <p className="font-inter text-[15.5px] leading-[1.65] text-on-surface-variant">
                {t('howItWorks.step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="reveal-3d flex flex-col items-center text-center relative z-10 md:w-1/3 px-6 mb-10 md:mb-0" style={{ transitionDelay: '110ms' }}>
              <div className="w-24 h-24 rounded-full bg-white border-4 border-secondary flex items-center justify-center mb-6 shadow-lg shadow-secondary/30 text-secondary">
                <ClipboardPaste className="w-9 h-9" />
              </div>
              <div className="bg-secondary text-white font-display font-bold text-sm w-8 h-8 rounded-md ring-2 ring-secondary/30 ring-offset-2 ring-offset-surface flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20 shadow-md shadow-secondary/30">2</div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-1">{t('howItWorks.step2Title')}</h3>
              <p className="font-inter text-[15.5px] leading-[1.65] text-on-surface-variant">
                {t('howItWorks.step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="reveal-3d flex flex-col items-center text-center relative z-10 md:w-1/3 px-6" style={{ transitionDelay: '220ms' }}>
              <div className="w-24 h-24 rounded-full bg-white border-4 border-tertiary flex items-center justify-center mb-6 shadow-lg shadow-tertiary/25 text-tertiary">
                <Rocket className="w-9 h-9" />
              </div>
              <div className="bg-tertiary text-white font-display font-bold text-sm w-8 h-8 rounded-md ring-2 ring-tertiary/30 ring-offset-2 ring-offset-surface flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20 shadow-md shadow-tertiary/30">3</div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-1">{t('howItWorks.step3Title')}</h3>
              <p className="font-inter text-[15.5px] leading-[1.65] text-on-surface-variant">
                {t('howItWorks.step3Desc')}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CTA — panel gradient thương hiệu đậm (lam → tím), khép trang
        ════════════════════════════════════════════════════════════════ */}
        <section className="max-w-[1280px] mx-auto px-6 py-20" aria-label={t('cta.title')}>
          <div className="reveal-3d relative overflow-hidden bg-gradient-to-br from-primary via-secondary/90 to-tertiary text-white rounded-[2.5rem] p-12 sm:p-20 text-center shadow-2xl shadow-primary/30">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

            <h2 className="font-display font-bold text-[34px] sm:text-[46px] leading-[1.2] tracking-tight mb-4 relative z-10">
              {t('cta.title')}
            </h2>
            <p className="font-inter text-[17px] leading-[1.7] text-white/85 mb-10 max-w-xl mx-auto relative z-10">
              {t('cta.description')}
            </p>
            <Link
              to={ROUTES.DASHBOARD_PROJECTS}
              className="bg-white text-primary font-inter font-bold text-sm px-14 sm:px-20 py-4 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 relative z-10 cursor-pointer inline-flex items-center gap-2"
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
