// ─── Engine hướng dẫn từng bước (spotlight tour) ───────────────────────────
// Làm mờ toàn màn hình trừ 1 lỗ hổng đúng hình dạng phần tử thật đang được nhắc
// tới (không phải ảnh chụp/giả lập) — người dùng thao tác trực tiếp lên đó.
// 4 tấm chắn (trên/dưới/trái/phải) tạo lỗ hổng thay vì box-shadow 1 khối, vì mỗi
// tấm cần backdrop-blur riêng — kỹ thuật box-shadow không hỗ trợ blur.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Check, MousePointerClick, Sparkles } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { stepMatchesPath, type TourStep } from '../../onboarding/steps';

const HOLE_PADDING = 10;
const GAP = 18;
const EDGE_MARGIN = 12;

interface Hole { top: number; left: number; right: number; bottom: number; }

function rectsEqual(a: DOMRect, b: DOMRect): boolean {
  return a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height;
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), Math.max(min, max));
}

/**
 * Nhiều component (Sidebar desktop/mobile, thẻ mẫu lặp lại trong grid...) dùng
 * CHUNG 1 giá trị data-tour ở nhiều bản sao khác nhau (responsive hoặc lặp
 * danh sách) — chỉ 1 bản đang thật sự hiển thị tại 1 thời điểm. querySelector
 * đơn thuần luôn trả về bản ĐẦU TIÊN theo thứ tự DOM bất kể nó có bị
 * `display:none` hay không, nên phải tự lọc: getClientRects() trả về mảng rỗng
 * cho phần tử không được render trong luồng bố cục (kể cả tổ tiên display:none),
 * nhưng vẫn khác 0 với phần tử chỉ đang `opacity:0` (ẩn để hiện khi hover) —
 * đúng thứ mình cần cho cả 2 trường hợp.
 */
function findVisibleTarget(selector: string): HTMLElement | null {
  const candidates = document.querySelectorAll<HTMLElement>(selector);
  for (const el of candidates) {
    if (el.getClientRects().length > 0) return el;
  }
  return null;
}

type Placement = TourStep['placement'];

function resolvePlacement(hole: Hole, preferred: Placement, size: { w: number; h: number }): Placement {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const fits: Record<Placement, boolean> = {
    right:  hole.right + GAP + size.w <= vw,
    left:   hole.left - GAP - size.w >= 0,
    bottom: hole.bottom + GAP + size.h <= vh,
    top:    hole.top - GAP - size.h >= 0,
  };
  if (fits[preferred]) return preferred;
  const order: Placement[] = ['bottom', 'right', 'top', 'left'];
  return order.find(p => fits[p]) ?? preferred;
}

function computeTooltipPos(hole: Hole, preferred: Placement, size: { w: number; h: number }) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const placement = resolvePlacement(hole, preferred, size);
  let top = 0;
  let left = 0;

  if (placement === 'right' || placement === 'left') {
    top = clamp(hole.top + (hole.bottom - hole.top) / 2 - size.h / 2, EDGE_MARGIN, vh - size.h - EDGE_MARGIN);
    left = placement === 'right' ? hole.right + GAP : hole.left - GAP - size.w;
  } else {
    left = clamp(hole.left + (hole.right - hole.left) / 2 - size.w / 2, EDGE_MARGIN, vw - size.w - EDGE_MARGIN);
    top = placement === 'bottom' ? hole.bottom + GAP : hole.top - GAP - size.h;
  }

  return {
    top: clamp(top, EDGE_MARGIN, vh - size.h - EDGE_MARGIN),
    left: clamp(left, EDGE_MARGIN, vw - size.w - EDGE_MARGIN),
    placement,
  };
}

export default function TourOverlay() {
  const { active, currentStep, stepIndex, totalSteps, nextStep, prevStep, finishTour } = useOnboarding();
  const { t } = useTranslation('onboarding');
  const location = useLocation();
  const pathname = location.pathname;

  const [rect, setRect] = useState<DOMRect | null>(null);
  const [tooltipSize, setTooltipSize] = useState({ w: 320, h: 220 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const scrolledForRef = useRef<string | null>(null);
  const forcedRef = useRef<{ el: HTMLElement; opacity: string; pointerEvents: string } | null>(null);

  // ── Tìm + theo dõi phần tử mục tiêu bằng vòng lặp requestAnimationFrame:
  // đơn giản hơn nhiều so với việc quản lý riêng MutationObserver (chờ mount
  // bất đồng bộ) + ResizeObserver (đổi cỡ) + scroll/resize listener (cuộn lồng
  // nhau) — 1 vòng lặp duy nhất xử lý tất cả, chi phí không đáng kể vì chỉ chạy
  // trong lúc hướng dẫn đang bật (tính năng người dùng chủ động bật). ─────────
  useEffect(() => {
    scrolledForRef.current = null;
    setRect(null);
    if (!active || !currentStep) return;
    if (!stepMatchesPath(currentStep, pathname)) return; // đang chờ người dùng điều hướng tới đúng trang

    let raf = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const el = findVisibleTarget(currentStep.target);
      if (el) {
        if (currentStep.forceVisible && forcedRef.current?.el !== el) {
          forcedRef.current = { el, opacity: el.style.opacity, pointerEvents: el.style.pointerEvents };
          el.style.setProperty('opacity', '1', 'important');
          el.style.setProperty('pointer-events', 'auto', 'important');
        }
        const r = el.getBoundingClientRect();
        setRect(prev => (prev && rectsEqual(prev, r) ? prev : r));
        if (scrolledForRef.current !== currentStep.id) {
          scrolledForRef.current = currentStep.id;
          const comfortablyVisible = r.top >= 72 && r.bottom <= window.innerHeight - 72;
          if (!comfortablyVisible) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setRect(null);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      const f = forcedRef.current;
      if (f) {
        f.el.style.opacity = f.opacity;
        f.el.style.pointerEvents = f.pointerEvents;
        forcedRef.current = null;
      }
    };
  }, [active, currentStep, pathname]);

  // Đo kích thước thật của thẻ tooltip sau khi render nội dung (title/body dài
  // ngắn khác nhau theo từng bước) để định vị chính xác — tránh đoán cứng.
  useLayoutEffect(() => {
    const el = tooltipRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (w && h && (w !== tooltipSize.w || h !== tooltipSize.h)) setTooltipSize({ w, h });
  });

  if (!active || !currentStep || !rect) return null;

  const hole: Hole = {
    top: Math.max(rect.top - HOLE_PADDING, 0),
    left: Math.max(rect.left - HOLE_PADDING, 0),
    right: Math.min(rect.right + HOLE_PADDING, window.innerWidth),
    bottom: Math.min(rect.bottom + HOLE_PADDING, window.innerHeight),
  };
  const holeW = Math.max(hole.right - hole.left, 0);
  const holeH = Math.max(hole.bottom - hole.top, 0);
  const tooltipPos = computeTooltipPos(hole, currentStep.placement, tooltipSize);

  const Icon = currentStep.icon;
  const isFirst = stepIndex === 0;
  const isRouteAdvance = currentStep.advance === 'route';
  const isFinish = currentStep.advance === 'finish';

  return createPortal(
    <AnimatePresence>
      <motion.div
        key={currentStep.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9990] pointer-events-none"
        aria-hidden="true"
      >
        {/* ── 4 tấm chắn mờ tạo lỗ hổng quanh phần tử thật ─────────────────── */}
        <div className="tour-dim" style={{ top: 0, left: 0, right: 0, height: hole.top }} />
        <div className="tour-dim" style={{ top: hole.bottom, left: 0, right: 0, bottom: 0 }} />
        <div className="tour-dim" style={{ top: hole.top, left: 0, width: hole.left, height: holeH }} />
        <div className="tour-dim" style={{ top: hole.top, left: hole.right, right: 0, height: holeH }} />

        {/* ── Viền phát sáng quanh phần tử thật ────────────────────────────── */}
        <div
          className="tour-ring"
          style={{ top: hole.top, left: hole.left, width: holeW, height: holeH }}
        />

        {/* ── Thẻ hướng dẫn ─────────────────────────────────────────────────── */}
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          className="fixed w-[calc(100vw-24px)] sm:w-80 rounded-2xl bg-white shadow-2xl shadow-slate-900/25 pointer-events-auto overflow-hidden"
          style={{ top: tooltipPos.top, left: tooltipPos.left }}
        >
          {/* Dải màu thương hiệu phía trên */}
          <div className="h-1.5 bg-gradient-to-r from-fnb-red via-fnb-orange to-fnb-amber" />

          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-fnb-red to-fnb-orange text-white flex items-center justify-center shadow-md shadow-fnb-red/25">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-fnb-orange uppercase tracking-wide">
                  <Sparkles className="h-3 w-3" />
                  {t('tour.stepCounter', { current: stepIndex + 1, total: totalSteps })}
                </div>
                <h3 className="mt-0.5 text-sm font-display font-bold text-gray-900 leading-snug">
                  {t(`steps.${currentStep.id}.title`)}
                </h3>
              </div>
            </div>

            <p className="mt-2.5 text-xs text-gray-600 leading-relaxed">
              {t(`steps.${currentStep.id}.body`)}
            </p>

            {isRouteAdvance && (
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-fnb-orange bg-fnb-cream rounded-lg px-2.5 py-2">
                <MousePointerClick className="h-3.5 w-3.5 shrink-0 animate-pulse" />
                {t('tour.routeHint')}
              </div>
            )}

            {/* Chấm tiến độ */}
            <div className="mt-3.5 flex items-center gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === stepIndex ? 'w-4 bg-fnb-red' : i < stepIndex ? 'w-1.5 bg-fnb-orange/50' : 'w-1.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <div className="mt-3.5 flex items-center justify-between gap-2">
              <button
                onClick={prevStep}
                disabled={isFirst}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                {t('tour.back')}
              </button>

              {!isRouteAdvance && (
                <button
                  onClick={isFinish ? finishTour : nextStep}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-fnb-red to-fnb-orange rounded-full shadow-sm shadow-fnb-red/30 hover:shadow-md transition-all cursor-pointer active:scale-95"
                >
                  {isFinish ? t('tour.finish') : t('tour.next')}
                  {isFinish ? <Check className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
