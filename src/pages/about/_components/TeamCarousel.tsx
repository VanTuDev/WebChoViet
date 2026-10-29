// ─── Carousel thẻ giới thiệu từng thành viên — trang /about ───────────────────
// Mỗi người một thẻ: ảnh ở trên (tên + vai trò đè lên ảnh), lời giới thiệu bản thân bên dưới.
// Chia theo TRANG cho đều: desktop 3 thẻ/trang, tablet 2, điện thoại 1 (thẻ kế tiếp ló ra gợi ý vuốt).
// CSS scroll-snap (vuốt native) + nút Trước/Sau + chấm theo trang + tự chạy.
// Tự chạy tạm dừng khi hover/focus/chạm, tắt hẳn khi người dùng bật prefers-reduced-motion.

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { teamPhoto } from '../../../config/team';

export type CardGroup = 'ops' | 'marketing' | 'founder';

export interface CarouselMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  group: CardGroup;
  chip: string;
}

/** Class Tailwind viết nguyên văn để Tailwind quét được */
const GROUP_STYLE: Record<CardGroup, { frame: string; chip: string }> = {
  ops: {
    frame: 'from-secondary-container via-primary-container to-primary',
    chip: 'bg-secondary-container text-on-secondary-container',
  },
  marketing: {
    frame: 'from-primary-container via-primary to-tertiary',
    chip: 'bg-tertiary-container text-on-tertiary-container',
  },
  founder: {
    frame: 'from-secondary-container via-primary-container to-tertiary-container',
    chip: 'bg-viet-lacquer text-white',
  },
};

const GAP_PX = 20; // = gap-5
const AUTOPLAY_MS = 5000;
const TOUCH_PAUSE_MS = 9000;

export default function TeamCarousel({ members, brand }: { members: CarouselMember[]; brand: string }) {
  const { t } = useTranslation('about');
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const pageRef = useRef(0);
  const pagesRef = useRef(1);
  const hoverRef = useRef(false);
  const pausedUntilRef = useRef(0);
  const reducedRef = useRef(false);
  const rafRef = useRef(0);

  /** Số thẻ thấy được cùng lúc + độ dài 1 trang (px), đo từ layout thật */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return null;
    const cardW = first.offsetWidth;
    const perView = Math.max(1, Math.round((track.clientWidth + GAP_PX) / (cardW + GAP_PX)));
    return { perView, pageW: perView * (cardW + GAP_PX), pages: Math.max(1, Math.ceil(members.length / perView)) };
  }, [members.length]);

  const goToPage = useCallback((p: number) => {
    const m = measure();
    if (!m) return;
    trackRef.current?.scrollTo({ left: p * m.pageW, behavior: reducedRef.current ? 'auto' : 'smooth' });
  }, [measure]);

  const step = useCallback((dir: 1 | -1) => {
    goToPage((pageRef.current + dir + pagesRef.current) % pagesRef.current);
  }, [goToPage]);

  const syncPage = useCallback(() => {
    const track = trackRef.current;
    const m = measure();
    if (!track || !m) return;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const p = atEnd ? m.pages - 1 : Math.min(m.pages - 1, Math.round(track.scrollLeft / m.pageW));
    pageRef.current = p;
    pagesRef.current = m.pages;
    setPage(p);
    setPages(m.pages);
  }, [measure]);

  const onScroll = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(syncPage);
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    syncPage();
    window.addEventListener('resize', syncPage);
    let timer = 0;
    if (!reducedRef.current) {
      timer = window.setInterval(() => {
        if (hoverRef.current || document.hidden || Date.now() < pausedUntilRef.current) return;
        step(1);
      }, AUTOPLAY_MS);
    }
    return () => {
      window.removeEventListener('resize', syncPage);
      window.clearInterval(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [syncPage, step]);

  const pauseForUser = () => { pausedUntilRef.current = Date.now() + TOUCH_PAUSE_MS; };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={t('team.carousel.label')}
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
      onFocus={() => { hoverRef.current = true; }}
      onBlur={() => { hoverRef.current = false; }}
      onTouchStart={pauseForUser}
    >
      <ul
        ref={trackRef}
        onScroll={onScroll}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); pauseForUser(); step(1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); pauseForUser(); step(-1); }
        }}
        tabIndex={0}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-6 px-1 list-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-primary rounded-3xl"
      >
        {members.map((m, i) => {
          const style = GROUP_STYLE[m.group];
          return (
            <li
              key={m.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${members.length}`}
              className="shrink-0 snap-start w-[82%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <article className={`group h-full rounded-[1.75rem] p-[3px] bg-gradient-to-br ${style.frame} shadow-xl shadow-primary/15`}>
                <div className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white">
                  {/* Ảnh ở trên cùng thẻ */}
                  <figure className="relative aspect-[4/5] overflow-hidden bg-slate-300">
                    <img
                      src={teamPhoto(m.id)}
                      srcSet={`${teamPhoto(m.id, 480)} 480w, ${teamPhoto(m.id)} 800w`}
                      sizes="(min-width: 1024px) 330px, (min-width: 640px) 45vw, 80vw"
                      alt={`${m.name} — ${m.role}, ${brand}`}
                      width={800}
                      height={1000}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold shadow ${style.chip}`}>
                      {m.chip}
                    </span>
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-viet-lacquer/95 via-viet-lacquer/70 to-transparent px-5 pb-4 pt-16 text-white">
                      <h3 className="text-2xl font-display font-extrabold leading-tight">{m.name}</h3>
                      <p className="mt-0.5 text-xs font-medium text-white/85">{m.role}</p>
                    </figcaption>
                  </figure>
                  {/* Lời giới thiệu bản thân */}
                  <p className="flex-1 p-5 text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {pages > 1 && (
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => { pauseForUser(); step(-1); }}
            aria-label={t('team.carousel.prev')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md shadow-primary/20 hover:scale-110 active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <ul className="flex items-center gap-2 list-none">
            {Array.from({ length: pages }, (_, p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => { pauseForUser(); goToPage(p); }}
                  aria-label={t('team.carousel.page', { n: p + 1 })}
                  aria-current={p === page ? 'true' : undefined}
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    p === page ? 'w-8 bg-primary' : 'w-2.5 bg-primary/30 hover:bg-primary/60'
                  }`}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => { pauseForUser(); step(1); }}
            aria-label={t('team.carousel.next')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md shadow-primary/20 hover:scale-110 active:scale-95 transition-transform"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
