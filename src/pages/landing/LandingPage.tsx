import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
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
  Flame,
  Languages,
  LogIn,
  MapPin,
  PlayCircle,
  QrCode,
  Rocket,
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
import { useTemplateStars } from '../../hooks/useTemplateStars';
import {
  ApricotBranch,
  GoldCloud,
  Lantern,
  MaiPetal,
  ThuyBaWave,
} from './_components/VietMotifs';

/* Element hạc & hoa mẫu đơn tách nền từ public/chim-hac-vector-2.jpg
   (script flood-fill + connected-components) — PNG trong suốt trong public/elements/ */
const EL = {
  hacCream: '/elements/hac-1.png', // hạc kem cánh đen, bay lên, mặt hướng phải
  hacUp: '/elements/hac-2.png', // hạc trắng vút lên, đầu hướng trái-trên
  hacGlide: '/elements/hac-3.png', // hạc hồng sải cánh lượn, đầu hướng phải
  hacLand: '/elements/hac-4.png', // hạc trắng cánh chữ V, mỏ hướng trái
  peony: '/elements/hoa-mau-don.png', // hoa mẫu đơn đỏ viền vàng
} as const;

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

/* Cánh mai rơi trong hero — vị trí/thời lượng cố định để render ổn định */
const PETALS = [
  { left: '6%', delay: '0s', duration: '11s', size: 16 },
  { left: '18%', delay: '3.5s', duration: '14s', size: 12 },
  { left: '34%', delay: '7s', duration: '12s', size: 14 },
  { left: '52%', delay: '1.8s', duration: '15s', size: 11 },
  { left: '68%', delay: '5.2s', duration: '13s', size: 15 },
  { left: '82%', delay: '9s', duration: '16s', size: 12 },
  { left: '93%', delay: '2.6s', duration: '12.5s', size: 13 },
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
                <div className="rounded-2xl overflow-hidden bg-white shadow-2xl shadow-viet-red/30 ring-2 ring-viet-gold/45">
                  {/* Thanh trình duyệt giả lập — sơn mài đỏ viền vàng */}
                  <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-viet-maroon to-viet-red border-b-2 border-viet-gold/60">
                    <span className="w-2.5 h-2.5 rounded-full bg-viet-gold" />
                    <span className="w-2.5 h-2.5 rounded-full bg-fnb-orange" />
                    <span className="w-2.5 h-2.5 rounded-full bg-viet-cream" />
                    <span className="ml-2 flex-1 truncate text-[10px] font-viet text-viet-cream/90 bg-white/12 rounded-full px-2.5 py-0.5">
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
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-viet-red to-fnb-orange text-white text-[10px] font-viet font-bold px-2.5 py-1 rounded-full shadow-lg shadow-viet-red/40">
                        {tmpl.badge}
                      </span>
                    )}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-viet-red/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-5">
                        <span className="bg-viet-cream text-viet-red font-viet font-semibold text-xs px-5 py-2.5 rounded-full shadow-lg flex items-center gap-1.5">
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
                      <p className="font-viet text-[11px] text-on-surface-variant truncate">
                        {CATEGORY_LABEL[tmpl.category] ?? tmpl.category}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[11px] font-viet font-bold px-2.5 py-1 rounded-full ${
                        tmpl.price === 0
                          ? 'bg-fnb-green/10 text-fnb-green'
                          : 'bg-viet-gold/20 text-on-secondary-container'
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
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-viet-red ring-1 ring-viet-gold/50 shadow-lg shadow-viet-red/20 flex items-center justify-center hover:bg-viet-red hover:text-viet-cream hover:scale-110 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label={t('showcase.nextSlide')}
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-viet-red ring-1 ring-viet-gold/50 shadow-lg shadow-viet-red/20 flex items-center justify-center hover:bg-viet-red hover:text-viet-cream hover:scale-110 transition-all cursor-pointer"
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
                  ? 'w-7 h-2.5 bg-gradient-to-r from-viet-gold to-viet-red'
                  : 'w-2.5 h-2.5 bg-outline-variant hover:bg-viet-gold/60'
              }`}
            />
          ))}
        </div>
        {current && getStarCount(current.id) > 0 && (
          <div className="flex items-center gap-1 font-viet text-xs text-on-surface-variant">
            <Star className="w-3.5 h-3.5 text-viet-gold fill-viet-gold" />
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

  const heroShot = SHOWCASE[0];

  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden selection:bg-viet-gold/40 selection:text-viet-maroon relative min-h-screen">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      <HreflangLinks path="/" />

      <SiteHeader variant="landing" />

      <main className="pb-20">

        {/* ════════════════════════════════════════════════════════════════
            HERO — lụa đỏ son, hạc bay, vân mây vàng kim
            (nền: public/BackgroundLandingPage.jpg)
        ════════════════════════════════════════════════════════════════ */}
        <section
          aria-label={t('hero.badge')}
          className="hero-parallax relative overflow-hidden bg-viet-maroon bg-cover bg-center pt-[130px] pb-36 sm:pb-44"
          style={{ backgroundImage: "url('/BackgroundLandingPage.jpg')" }}
        >
          {/* Phủ tối nhẹ bên trái để chữ nổi trên nền lụa */}
          <div className="absolute inset-0 bg-gradient-to-r from-viet-lacquer/75 via-viet-lacquer/35 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-viet-lacquer/50 to-transparent pointer-events-none" />

          {/* Vân mây trôi — bị kéo theo khi cuộn (parallax) */}
          <div data-par="0.1" data-par-mouse="9" className="par-wrap absolute top-[16%] right-[4%] w-52 pointer-events-none hidden sm:block">
            <GoldCloud className="cloud-drift w-full opacity-70" />
          </div>
          <div data-par="0.18" data-par-mouse="6" className="par-wrap absolute bottom-[30%] left-[2%] w-40 pointer-events-none hidden lg:block">
            <GoldCloud className="cloud-drift w-full opacity-45" />
          </div>

          {/* Đèn lồng treo hai bên — lắc lư, trễ nhẹ khi cuộn */}
          <div data-par="-0.06" data-par-mouse="5" className="par-wrap absolute top-0 left-[7%] w-16 sm:w-20 pointer-events-none hidden md:block">
            <Lantern className="lantern-swing w-full drop-shadow-xl" />
          </div>
          <div data-par="-0.08" data-par-mouse="4" className="par-wrap absolute top-0 right-[9%] w-12 sm:w-14 pointer-events-none hidden lg:block">
            <Lantern className="lantern-swing w-full drop-shadow-xl" />
          </div>

          {/* Hạc hồng bay xa phía trên khu chữ */}
          <div data-par="0.15" data-par-mouse="12" className="par-wrap absolute top-[13%] left-[40%] w-32 pointer-events-none hidden xl:block">
            <img
              src={EL.hacGlide}
              alt=""
              aria-hidden="true"
              width={330}
              height={239}
              className="floating w-full h-auto opacity-85 select-none"
            />
          </div>

          {/* Cánh mai vàng rơi */}
          {PETALS.map((p, i) => (
            <MaiPetal
              key={i}
              className="petal-fall absolute top-0 pointer-events-none"
              style={{
                left: p.left,
                width: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              } as CSSProperties}
            />
          ))}

          <div className="relative max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-14 lg:gap-10">

            {/* Left — text */}
            <div className="lg:w-[52%] flex flex-col items-start space-y-7">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-viet-gold-light border border-viet-gold/50 px-4 py-1.5 rounded-full text-xs font-semibold font-viet">
                <Zap className="w-3.5 h-3.5 fill-viet-gold text-viet-gold" />
                {t('hero.badge')}
              </div>

              <h1 className="font-display font-extrabold text-[40px] sm:text-[54px] leading-[1.12] tracking-tight text-viet-cream drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
                {t('hero.title1')}{' '}
                <span className="text-gold-shine">{t('hero.titleHighlight')}</span>{' '}
                {t('hero.title2')}
              </h1>

              <p className="font-viet text-[17px] sm:text-[18px] leading-[1.7] text-viet-cream/85 max-w-lg">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
                <Link
                  to={ROUTES.DASHBOARD_PROJECTS}
                  className="bg-gradient-to-r from-viet-gold-light via-viet-gold to-viet-gold-light bg-[length:200%_auto] hover:bg-right text-viet-maroon font-viet font-bold text-sm px-10 py-4 rounded-full shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-viet-gold/30 hover:-translate-y-0.5 transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {t('hero.ctaStart')}
                  <ArrowRight className="w-4.5 h-4.5" />
                </Link>
                <Link
                  to={ROUTES.MARKETPLACE}
                  className="bg-white/5 text-viet-cream border border-viet-cream/50 backdrop-blur-sm font-viet font-semibold text-sm px-10 py-4 rounded-full hover:bg-white/15 hover:border-viet-gold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlayCircle className="w-4.5 h-4.5" />
                  {t('hero.ctaDemo')}
                </Link>
              </div>

              {/* Mini social proof */}
              <ul className="flex items-center gap-5 pt-1 font-viet text-xs text-viet-cream/75 list-none">
                <li className="flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-viet-gold" /> {t('hero.proofCafe')}
                </li>
                <li className="flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-viet-gold" /> {t('hero.proofRestaurant')}
                </li>
              </ul>
            </div>

            {/* Right — hạc bay + mockup trình duyệt nghiêng 3D theo con trỏ */}
            <div
              className="lg:w-[48%] w-full relative"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <div data-par="0.07" data-par-mouse="20" className="par-wrap absolute -top-24 sm:-top-32 right-[10%] w-[56%] max-w-[350px] pointer-events-none z-0">
                <img
                  src={EL.hacLand}
                  alt=""
                  aria-hidden="true"
                  width={333}
                  height={250}
                  className="crane-glide w-full h-auto drop-shadow-[0_16px_28px_rgba(0,0,0,0.4)] select-none"
                />
              </div>

              {heroShot && (
                <div ref={tiltRef} className="tilt-card relative mt-20 sm:mt-24">
                  {/* Khung sơn mài vàng phía sau */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-viet-gold/50 via-viet-gold-light/30 to-transparent rounded-[2rem] rotate-2 scale-[1.04] -z-10" />
                  <div className="rounded-[1.6rem] overflow-hidden ring-2 ring-viet-gold/60 shadow-2xl shadow-black/45 bg-white">
                    {/* Thanh trình duyệt */}
                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-viet-maroon to-viet-red border-b-2 border-viet-gold/60">
                      <span className="w-2.5 h-2.5 rounded-full bg-viet-gold" />
                      <span className="w-2.5 h-2.5 rounded-full bg-fnb-orange" />
                      <span className="w-2.5 h-2.5 rounded-full bg-viet-cream" />
                      <span className="ml-2 flex-1 truncate text-[10px] font-viet text-viet-cream/90 bg-white/12 rounded-full px-2.5 py-0.5">
                        {DOMAIN}/{heroShot.id}
                      </span>
                    </div>
                    <div className="tmpl-screen h-[280px] sm:h-[340px] overflow-hidden">
                      <img
                        src={heroShot.screen}
                        alt={t('showcase.screenshotAlt', { name: heroShot.name })}
                        className="w-full h-full object-cover"
                        width={640}
                        height={400}
                      />
                    </div>
                  </div>

                  {/* Badge nổi — kính mờ tối trên nền đỏ */}
                  <div
                    className="absolute -bottom-6 -left-4 sm:-left-6 bg-viet-lacquer/70 backdrop-blur-md border border-viet-gold/40 rounded-xl p-3 flex items-center gap-3 shadow-lg shadow-black/40 animate-bounce"
                    style={{ animationDuration: '3s' }}
                  >
                    <div className="bg-fnb-green/20 text-fnb-green rounded-full p-1.5 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-viet font-semibold text-[12px] text-viet-cream">{t('hero.floatReady')}</p>
                      <p className="text-[10px] text-viet-cream/70">{t('hero.floatReadySub')}</p>
                    </div>
                  </div>
                  <div className="absolute z-20 -top-5 -right-2 sm:-right-4 bg-viet-lacquer/70 backdrop-blur-md border border-viet-gold/40 rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-lg shadow-black/40">
                    <QrCode className="w-6 h-6 text-viet-gold" />
                    <div>
                      <p className="font-viet font-semibold text-[11px] text-viet-cream">{t('hero.floatQr')}</p>
                      <p className="text-[10px] text-viet-gold-light font-semibold">{t('hero.floatQrSub')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sóng thủy ba khép chân hero */}
          <ThuyBaWave
            className="absolute -bottom-px left-0 w-full h-16 sm:h-20"
            fill="#8d1216"
            stroke="#d9a441"
          />
        </section>

        {/* ════════════════════════════════════════════════════════════════
            TEMPLATE SHOWCASE — 3D carousel screenshot thật
        ════════════════════════════════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden" aria-label={t('showcase.badge')}>
          {/* Hạc trắng vút lên bên phải khu trưng bày — kéo theo khi cuộn */}
          <div data-par="0.12" data-par-mouse="10" className="par-wrap absolute top-8 right-[1%] w-[240px] lg:w-[300px] pointer-events-none hidden md:block">
            <img
              src={EL.hacUp}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={299}
              height={248}
              className="floating w-full h-auto select-none"
            />
          </div>
          <div data-par="0.17" className="par-wrap absolute top-24 left-[3%] w-44 pointer-events-none hidden lg:block">
            <GoldCloud className="w-full opacity-25" />
          </div>

          <div className="max-w-[1280px] mx-auto px-6">
            <div className="reveal-3d text-center mb-8">
              <div className="inline-flex items-center gap-1.5 bg-viet-red/8 text-viet-red border border-viet-red/20 px-4 py-1.5 rounded-full text-xs font-semibold font-viet mb-5">
                <Flame className="w-3.5 h-3.5 text-viet-red" />
                {t('showcase.badge')}
              </div>
              <h2 className="font-display font-bold text-[32px] sm:text-[40px] leading-[1.22] text-on-surface mb-3">
                {t('showcase.title1')}{' '}
                <span className="bg-gradient-to-r from-viet-red via-fnb-orange to-viet-gold bg-clip-text text-transparent">
                  {t('showcase.titleHighlight')}
                </span>
                {t('showcase.title2')}
              </h2>
              <p className="font-viet text-[16px] leading-[1.65] text-on-surface-variant max-w-2xl mx-auto">
                {t('showcase.description')}
              </p>
            </div>

            {/* Filter chips */}
            <div className="reveal-3d flex flex-wrap justify-center gap-2 mb-6" style={{ transitionDelay: '90ms' }}>
              {FILTER_CHIPS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`font-viet font-semibold text-xs px-4 py-2 rounded-full cursor-pointer border transition-all ${
                    activeFilter === f.id
                      ? 'bg-gradient-to-r from-viet-red to-fnb-orange text-white border-transparent shadow-md shadow-viet-red/30 scale-105'
                      : 'bg-white text-on-surface-variant border-outline-variant hover:border-viet-gold hover:text-viet-red'
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
                className="inline-flex items-center gap-1.5 font-viet font-semibold text-sm text-viet-red hover:text-fnb-orange transition-colors cursor-pointer"
              >
                {t('showcase.exploreAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            FEATURES — bento 3 thẻ đỏ / xanh / vàng kim
        ════════════════════════════════════════════════════════════════ */}
        <section
          id="features"
          className="relative max-w-[1280px] mx-auto px-6 py-20"
          aria-labelledby="features-heading"
        >
          <div data-par="0.1" className="par-wrap absolute -top-4 right-0 w-40 sm:w-52 pointer-events-none">
            <ApricotBranch className="w-full opacity-70" />
          </div>
          {/* Hoa mẫu đơn đỏ viền vàng — góc trái đối trọng cành mai */}
          <img
            src={EL.peony}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={162}
            height={154}
            className="absolute top-0 left-0 w-32 sm:w-40 h-auto opacity-90 pointer-events-none select-none"
          />

          <div className="reveal-3d text-center mb-12">
            <h2 id="features-heading" className="font-display font-bold text-[32px] sm:text-[36px] leading-[1.25] text-on-surface mb-3">
              {t('features.title1')}{' '}
              <span className="bg-gradient-to-r from-viet-red to-viet-gold bg-clip-text text-transparent">{t('features.titleHighlight')}</span>{' '}
              {t('features.title2')}
            </h2>
            <p className="font-viet text-[16px] leading-[1.65] text-on-surface-variant max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="reveal-3d relative overflow-hidden bg-gradient-to-b from-viet-red/8 to-white rounded-[2rem] p-10 border border-viet-red/20 shadow-md shadow-viet-red/10 glow-hover flex flex-col h-full group">
              <GoldCloud className="absolute -top-3 -right-6 w-36 opacity-15 pointer-events-none" />
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br from-viet-red to-fnb-orange text-white flex items-center justify-center mb-6 shadow-lg shadow-viet-red/30 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-3">
                {t('features.maps.title')}
              </h3>
              <p className="font-viet text-[15.5px] leading-[1.65] text-on-surface-variant flex-grow">
                {t('features.maps.description')}
              </p>
            </article>

            <article className="reveal-3d relative overflow-hidden bg-gradient-to-b from-fnb-green/10 to-white rounded-[2rem] p-10 border border-fnb-green/20 shadow-md shadow-fnb-green/10 glow-hover flex flex-col h-full group" style={{ transitionDelay: '110ms' }}>
              <GoldCloud className="absolute -top-3 -right-6 w-36 opacity-15 pointer-events-none" />
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br from-fnb-green to-emerald-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-fnb-green/30 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Languages className="w-6 h-6" />
              </div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-3">
                {t('features.multilang.title')}
              </h3>
              <p className="font-viet text-[15.5px] leading-[1.65] text-on-surface-variant flex-grow">
                {t('features.multilang.description')}
              </p>
            </article>

            <article className="reveal-3d relative overflow-hidden bg-gradient-to-b from-viet-gold/15 to-white rounded-[2rem] p-10 border border-viet-gold/30 shadow-md shadow-viet-gold/15 glow-hover flex flex-col h-full group" style={{ transitionDelay: '220ms' }}>
              <GoldCloud className="absolute -top-3 -right-6 w-36 opacity-20 pointer-events-none" />
              <div className="w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br from-viet-gold-light to-viet-gold text-viet-maroon flex items-center justify-center mb-6 shadow-lg shadow-viet-gold/35 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-3">
                {t('features.qr.title')}
              </h3>
              <p className="font-viet text-[15.5px] leading-[1.65] text-on-surface-variant flex-grow">
                {t('features.qr.description')}
              </p>
            </article>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            HOW IT WORKS — 3 bước, số đánh dấu kiểu ấn triện đỏ
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="max-w-[1280px] mx-auto px-6 py-20"
          aria-labelledby="how-heading"
        >
          <div className="reveal-3d text-center mb-20">
            <h2 id="how-heading" className="font-display font-bold text-[32px] sm:text-[36px] leading-[1.25] text-on-surface mb-3">
              {t('howItWorks.title1')}{' '}
              <span className="bg-gradient-to-r from-fnb-orange to-viet-gold bg-clip-text text-transparent">{t('howItWorks.titleHighlight')}</span>
            </h2>
            <p className="font-viet text-[16px] leading-[1.65] text-on-surface-variant max-w-2xl mx-auto">
              {t('howItWorks.description')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 rounded-full bg-gradient-to-r from-viet-red/35 via-viet-gold/50 to-fnb-green/35 z-0" />

            {/* Step 1 */}
            <div className="reveal-3d flex flex-col items-center text-center relative z-10 md:w-1/3 px-6 mb-10 md:mb-0">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-viet-red flex items-center justify-center mb-6 shadow-lg shadow-viet-red/25 text-viet-red">
                <LogIn className="w-9 h-9" />
              </div>
              <div className="bg-viet-red text-viet-cream font-display font-bold text-sm w-8 h-8 rounded-md ring-2 ring-viet-gold/70 ring-offset-2 ring-offset-surface flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20 shadow-md shadow-viet-red/30">1</div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-1">{t('howItWorks.step1Title')}</h3>
              <p className="font-viet text-[15.5px] leading-[1.65] text-on-surface-variant">
                {t('howItWorks.step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="reveal-3d flex flex-col items-center text-center relative z-10 md:w-1/3 px-6 mb-10 md:mb-0" style={{ transitionDelay: '110ms' }}>
              <div className="w-24 h-24 rounded-full bg-white border-4 border-viet-gold flex items-center justify-center mb-6 shadow-lg shadow-viet-gold/30 text-viet-gold">
                <ClipboardPaste className="w-9 h-9" />
              </div>
              <div className="bg-viet-red text-viet-cream font-display font-bold text-sm w-8 h-8 rounded-md ring-2 ring-viet-gold/70 ring-offset-2 ring-offset-surface flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20 shadow-md shadow-viet-red/30">2</div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-1">{t('howItWorks.step2Title')}</h3>
              <p className="font-viet text-[15.5px] leading-[1.65] text-on-surface-variant">
                {t('howItWorks.step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="reveal-3d flex flex-col items-center text-center relative z-10 md:w-1/3 px-6" style={{ transitionDelay: '220ms' }}>
              <div className="w-24 h-24 rounded-full bg-white border-4 border-fnb-green flex items-center justify-center mb-6 shadow-lg shadow-fnb-green/25 text-fnb-green">
                <Rocket className="w-9 h-9" />
              </div>
              <div className="bg-viet-red text-viet-cream font-display font-bold text-sm w-8 h-8 rounded-md ring-2 ring-viet-gold/70 ring-offset-2 ring-offset-surface flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20 shadow-md shadow-viet-red/30">3</div>
              <h3 className="font-lexend font-semibold text-[22px] leading-[1.4] text-on-surface mb-1">{t('howItWorks.step3Title')}</h3>
              <p className="font-viet text-[15.5px] leading-[1.65] text-on-surface-variant">
                {t('howItWorks.step3Desc')}
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CTA — trở lại tấm lụa đỏ son
        ════════════════════════════════════════════════════════════════ */}
        <section className="max-w-[1280px] mx-auto px-6 py-20" aria-label={t('cta.title')}>
          <div
            className="reveal-3d relative overflow-hidden bg-viet-maroon bg-cover bg-center text-viet-cream rounded-[2.5rem] p-12 sm:p-20 text-center shadow-2xl shadow-viet-red/35 ring-2 ring-viet-gold/40"
            style={{ backgroundImage: "url('/BackgroundLandingPage.jpg')" }}
          >
            <div className="absolute inset-0 bg-viet-lacquer/45" />
            <div data-par="0.1" className="par-wrap absolute top-8 right-[6%] w-40 pointer-events-none">
              <GoldCloud className="cloud-drift w-full opacity-60" />
            </div>
            {/* Hạc kem cánh đen bay vào giữa CTA — kéo theo khi cuộn */}
            <div data-par="0.07" data-par-mouse="10" className="par-wrap absolute top-[30%] left-[3%] w-40 sm:w-48 pointer-events-none hidden sm:block">
              <img
                src={EL.hacCream}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={308}
                height={279}
                className="crane-glide w-full h-auto opacity-95 select-none"
              />
            </div>

            <h2 className="font-display font-bold text-[34px] sm:text-[46px] leading-[1.2] tracking-tight mb-4 relative z-10 drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)]">
              {t('cta.title')}
            </h2>
            <p className="font-viet text-[17px] leading-[1.7] text-viet-cream/85 mb-10 max-w-xl mx-auto relative z-10">
              {t('cta.description')}
            </p>
            <Link
              to={ROUTES.DASHBOARD_PROJECTS}
              className="bg-gradient-to-r from-viet-gold-light via-viet-gold to-viet-gold-light bg-[length:200%_auto] hover:bg-right text-viet-maroon font-viet font-bold text-sm px-14 sm:px-20 py-4 rounded-full shadow-xl shadow-black/30 hover:scale-105 hover:shadow-2xl transition-all duration-500 relative z-10 cursor-pointer inline-flex items-center gap-2"
            >
              {t('cta.button')}
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>

            <ThuyBaWave
              className="absolute -bottom-px left-0 w-full h-12 opacity-70"
              fill="#8d1216"
              stroke="#d9a441"
            />
          </div>
        </section>
      </main>

      <SiteFooter variant="landing" />
    </div>
  );
}
