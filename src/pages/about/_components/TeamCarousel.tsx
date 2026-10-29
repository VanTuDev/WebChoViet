// ─── Carousel giới thiệu từng thành viên đội ngũ — trang /about ───────────────
// CSS scroll-snap (vuốt/cuộn native trên mobile) + nút điều hướng + ảnh thumbnail + tự chạy.
// Vòng lặp vô hạn: danh sách được nhân 3 bản (COPIES), luôn đứng ở bản giữa; khi cuộn sang bản
// đầu/cuối thì nhảy ngầm (không animate) về slide tương ứng ở bản giữa → hai bên luôn có người.
// Bản nhân thêm chỉ để hiển thị: aria-hidden, alt rỗng, không dùng thẻ heading (tránh trùng lặp).
// Slide đang ở giữa được phóng to; mô tả của người đó hiện ở khung bên dưới (aria-live).
// Tự chạy tạm dừng khi hover/focus/chạm, tắt hẳn khi người dùng bật prefers-reduced-motion.

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { teamPhoto, type TeamGroupId } from '../../../config/team';

export interface CarouselMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  group: TeamGroupId;
  groupTitle: string;
}

/** Class Tailwind viết nguyên văn để Tailwind quét được */
const GROUP_STYLE: Record<TeamGroupId, { frame: string; chip: string }> = {
  ops: {
    frame: 'from-secondary-container via-primary-container to-primary',
    chip: 'bg-secondary-container text-on-secondary-container',
  },
  marketing: {
    frame: 'from-primary-container via-primary to-tertiary',
    chip: 'bg-tertiary-container text-on-tertiary-container',
  },
};

const COPIES = 3;
const AUTOPLAY_MS = 4500;
const TOUCH_PAUSE_MS = 9000;
const SETTLE_MS = 140;

export default function TeamCarousel({ members, brand }: { members: CarouselMember[]; brand: string }) {
  const { t } = useTranslation('about');
  const n = members.length;
  const trackRef = useRef<HTMLUListElement>(null);
  const [abs, setAbs] = useState(n); // chỉ số tuyệt đối trong danh sách đã nhân; bắt đầu ở bản giữa
  const absRef = useRef(n);
  const hoverRef = useRef(false);
  const pausedUntilRef = useRef(0);
  const reducedRef = useRef(false);
  const rafRef = useRef(0);
  const settleRef = useRef(0);

  const items = Array.from({ length: COPIES }, (_, c) => members.map((m) => ({ m, copy: c }))).flat();

  const offsetFor = (i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return null;
    return slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
  };

  const goToAbs = useCallback((i: number) => {
    const left = offsetFor(i);
    if (left === null) return;
    trackRef.current?.scrollTo({ left, behavior: reducedRef.current ? 'auto' : 'smooth' });
  }, []);

  const step = useCallback((dir: 1 | -1) => goToAbs(absRef.current + dir), [goToAbs]);

  /** Chọn người i (0..n-1) bằng đường ngắn nhất so với vị trí hiện tại */
  const goToMember = useCallback((i: number) => {
    const cur = absRef.current % n;
    let delta = i - cur;
    if (delta > n / 2) delta -= n;
    if (delta < -n / 2) delta += n;
    goToAbs(absRef.current + delta);
  }, [goToAbs, n]);

  // Cuộn xong mà đang ở bản đầu/cuối → nhảy ngầm về bản giữa (cùng người, không animate)
  const recenter = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cur = absRef.current;
    if (cur >= n && cur < 2 * n) return;
    const target = (cur % n) + n;
    const left = offsetFor(target);
    if (left === null) return;
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = left;
    absRef.current = target;
    setAbs(target);
    requestAnimationFrame(() => {
      track.style.scrollSnapType = '';
      track.style.scrollBehavior = '';
    });
  }, [n]);

  // Slide gần tâm khung nhất = slide đang active
  const onScroll = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((el, i) => {
        const node = el as HTMLElement;
        const dist = Math.abs(node.offsetLeft + node.clientWidth / 2 - center);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      absRef.current = best;
      setAbs(best);
    });
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(recenter, SETTLE_MS);
  };

  // Đặt slide đầu của bản giữa vào giữa khung trước khi trình duyệt vẽ (không nhấp nháy)
  useLayoutEffect(() => {
    const track = trackRef.current;
    const left = offsetFor(n);
    if (track && left !== null) track.scrollLeft = left;
  }, [n]);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onResize = () => {
      const left = offsetFor(absRef.current);
      if (left !== null && trackRef.current) trackRef.current.scrollLeft = left;
    };
    window.addEventListener('resize', onResize);

    let timer = 0;
    if (!reducedRef.current) {
      timer = window.setInterval(() => {
        if (hoverRef.current || document.hidden || Date.now() < pausedUntilRef.current) return;
        step(1);
      }, AUTOPLAY_MS);
    }
    return () => {
      window.removeEventListener('resize', onResize);
      window.clearInterval(timer);
      window.clearTimeout(settleRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [step]);

  const pauseForTouch = () => { pausedUntilRef.current = Date.now() + TOUCH_PAUSE_MS; };

  const active = abs % n;
  const current = members[active] ?? members[0];
  const currentStyle = GROUP_STYLE[current.group];

  return (
    <div
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
      onFocus={() => { hoverRef.current = true; }}
      onBlur={() => { hoverRef.current = false; }}
      onTouchStart={pauseForTouch}
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={t('team.carousel.label')}
        className="relative"
        style={{ '--slide-w': 'min(70vw, 320px)' } as CSSProperties}
      >
        <button
          type="button"
          onClick={() => { pauseForTouch(); step(-1); }}
          aria-label={t('team.carousel.prev')}
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-transform"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => { pauseForTouch(); step(1); }}
          aria-label={t('team.carousel.next')}
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-transform"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <ul
          ref={trackRef}
          onScroll={onScroll}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); pauseForTouch(); step(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); pauseForTouch(); step(-1); }
          }}
          tabIndex={0}
          className="relative flex gap-5 overflow-x-auto snap-x snap-mandatory py-8 px-[calc(50%-var(--slide-w)/2)] list-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-primary rounded-3xl"
        >
          {items.map(({ m, copy }, i) => {
            const style = GROUP_STYLE[m.group];
            const isActive = i === abs;
            const isClone = copy !== 1;
            const memberIdx = i % n;
            return (
              <li
                key={`${copy}-${m.id}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${memberIdx + 1} / ${n}`}
                aria-hidden={isClone || undefined}
                onClick={() => { if (!isActive) { pauseForTouch(); goToAbs(i); } }}
                className={`w-[var(--slide-w)] shrink-0 snap-center transition-all duration-500 ${
                  isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60 cursor-pointer hover:opacity-90'
                }`}
              >
                <article className={`group h-full rounded-[1.75rem] p-[3px] bg-gradient-to-br ${style.frame} ${
                  isActive ? 'shadow-2xl shadow-primary/30' : 'shadow-md'
                }`}>
                  <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-300">
                    <img
                      src={teamPhoto(m.id)}
                      srcSet={`${teamPhoto(m.id, 480)} 480w, ${teamPhoto(m.id)} 800w`}
                      sizes="320px"
                      alt={isClone ? '' : `${m.name} — ${m.role}, ${brand}`}
                      width={800}
                      height={1000}
                      loading={copy === 1 && memberIdx < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold shadow ${style.chip}`}>
                      {m.groupTitle}
                    </span>
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-viet-lacquer/95 via-viet-lacquer/70 to-transparent px-4 pb-4 pt-14 text-white">
                      {isClone
                        ? <p className="text-xl font-display font-extrabold leading-tight">{m.name}</p>
                        : <h3 className="text-xl font-display font-extrabold leading-tight">{m.name}</h3>}
                      <p className="mt-0.5 text-xs font-medium text-white/85">{m.role}</p>
                    </figcaption>
                  </figure>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Thumbnail điều hướng — nút thật nên dùng được bằng bàn phím/đọc màn hình */}
      <ul className="mt-2 flex items-center justify-center gap-2 sm:gap-3 list-none">
        {members.map((m, i) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => { pauseForTouch(); goToMember(i); }}
              aria-label={t('team.carousel.pick', { name: m.name })}
              aria-current={i === active ? 'true' : undefined}
              className={`block rounded-full transition-all duration-300 ${
                i === active ? 'ring-4 ring-primary scale-110' : 'ring-2 ring-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={teamPhoto(m.id, 480)}
                alt=""
                width={480}
                height={600}
                loading="lazy"
                className="h-11 w-11 sm:h-14 sm:w-14 rounded-full object-cover object-top bg-slate-300"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Mô tả người đang được chọn — đọc lại cho trình đọc màn hình khi đổi slide */}
      <div aria-live="polite" className="mt-6 text-center max-w-2xl mx-auto min-h-[8.5rem]">
        <div key={current.id} className="animate-fade-in-up">
          <p className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${currentStyle.chip}`}>
            {current.groupTitle}
          </p>
          <p className="mt-2 text-2xl font-display font-extrabold text-gray-900">{current.name}</p>
          <p className="text-sm font-semibold text-primary">{current.role}</p>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">{current.bio}</p>
        </div>
      </div>
    </div>
  );
}
