/**
 * ─── Reveal — hiệu ứng xuất hiện / ẩn đi theo viewport cho template ───────────
 *
 * Phần tử bắt đầu ở trạng thái mờ + dịch nhẹ; khi cuộn TỚI thì trượt vào mượt,
 * khi cuộn QUA (ra khỏi viewport) thì ẩn đi mượt và sẽ xuất hiện lại khi cuộn
 * ngược về (two-way, không phải one-shot) — đúng yêu cầu "hiệu ứng xuất hiện
 * và hiệu ứng ẩn đi". Đặt `once` nếu 1 khối chỉ nên chạy hiệu ứng lần đầu.
 *
 * Tự chứa theo quy tắc _shared/: styling bằng inline style (không cần thêm
 * keyframes vào Tailwind config), 1 IntersectionObserver chia sẻ cho mọi
 * instance, tôn trọng `prefers-reduced-motion`.
 *
 * LƯU Ý: KHÔNG bọc Reveal quanh phần tử chứa con `position: fixed/sticky`
 * (nav dính, nút gọi nổi...) — `transform` trên tổ tiên làm fixed lệch gốc toạ độ.
 *
 * Cách dùng điển hình:
 *   <Reveal as="section" data-section="menu" className="...">...</Reveal>
 *   {items.map((item, i) => (
 *     <Reveal key={i} delay={i * 90} variant="zoom-in" className="card...">...</Reveal>
 *   ))}
 */
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode, Ref } from 'react';

export type RevealVariant =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left' // trượt VỀ bên trái (bắt đầu lệch phải) — theo quy ước AOS
  | 'fade-right' // trượt VỀ bên phải (bắt đầu lệch trái)
  | 'zoom-in'
  | 'blur-up'; // dùng tiết kiệm — filter blur tốn GPU trên mobile yếu

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /** Thẻ render thật — giữ nguyên ngữ nghĩa HTML của template (section/figure/li...) */
  as?: ElementType;
  variant?: RevealVariant;
  /** Trễ (ms) trước khi XUẤT HIỆN — dùng stagger item trong grid; lúc ẩn không trễ */
  delay?: number;
  /** Thời lượng hiệu ứng (ms) */
  duration?: number;
  /** true = chỉ xuất hiện 1 lần, không ẩn lại khi cuộn qua */
  once?: boolean;
}

const HIDDEN_STYLES: Record<RevealVariant, CSSProperties> = {
  fade: { opacity: 0 },
  'fade-up': { opacity: 0, transform: 'translateY(28px)' },
  'fade-down': { opacity: 0, transform: 'translateY(-28px)' },
  'fade-left': { opacity: 0, transform: 'translateX(36px)' },
  'fade-right': { opacity: 0, transform: 'translateX(-36px)' },
  'zoom-in': { opacity: 0, transform: 'scale(0.93)' },
  'blur-up': { opacity: 0, transform: 'translateY(24px)', filter: 'blur(10px)' },
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'; // easeOutQuint — vào nhanh, dừng êm

// ── 1 IntersectionObserver dùng chung cho mọi Reveal trên trang ────────────────
// rootMargin âm tạo "dải kích hoạt" 84% giữa viewport: phần tử phải vào sâu 8%
// mới hiện, và ra khỏi 8% mới ẩn — tránh nhấp nháy ở mép màn hình.
type VisibilityCallback = (visible: boolean) => void;

let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, VisibilityCallback>();

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          observerCallbacks.get(entry.target)?.(entry.isIntersecting);
        }
      },
      { rootMargin: '-8% 0px -8% 0px', threshold: 0 },
    );
  }
  return sharedObserver;
}

export default function Reveal({
  children,
  as,
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  once = false,
  style,
  ...rest
}: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  // reduced = true → bỏ hẳn hiệu ứng, phần tử luôn hiển thị bình thường
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    ) {
      setReduced(true);
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    const observer = getSharedObserver();
    observerCallbacks.set(el, isVisible => {
      if (once) {
        if (!isVisible) return;
        setVisible(true);
        observerCallbacks.delete(el);
        observer.unobserve(el);
        return;
      }
      setVisible(isVisible);
    });
    observer.observe(el);

    return () => {
      observerCallbacks.delete(el);
      observer.unobserve(el);
    };
  }, [once]);

  let motionStyle: CSSProperties;
  if (reduced) {
    motionStyle = {};
  } else {
    const hidden = HIDDEN_STYLES[variant];
    const shown: CSSProperties = { opacity: 1 };
    if (hidden.transform) shown.transform = 'none';
    if (hidden.filter) shown.filter = 'blur(0px)';
    motionStyle = {
      ...(visible ? shown : hidden),
      transition: `opacity ${duration}ms ${EASE}, transform ${duration}ms ${EASE}, filter ${duration}ms ${EASE}`,
      transitionDelay: visible ? `${delay}ms` : '0ms',
    };
  }

  return (
    <Tag ref={ref as Ref<HTMLElement>} style={{ ...style, ...motionStyle }} {...rest}>
      {children}
    </Tag>
  );
}
