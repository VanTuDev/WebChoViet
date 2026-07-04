import { useEffect } from 'react';
import { sendLog } from '../services/analyticsService';

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

// Khách cũ hay mới — id lưu localStorage (sống lâu hơn tab), CHỈ dùng để suy ra
// true/false gửi kèm User-View, KHÔNG gửi chính id này lên server (tránh lưu
// định danh dài hạn không cần thiết ở backend).
function isReturningVisitor(): boolean {
  const KEY = 'wcv_visitor_id';
  const seen = !!localStorage.getItem(KEY);
  if (!seen) localStorage.setItem(KEY, crypto.randomUUID());
  return seen;
}

function getUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const v = params.get(key);
    if (v) utm[key] = v;
  }
  return utm;
}

// Suy ra nhãn từ href của element được click.
// Chỉ track các element có ý nghĩa rõ ràng để tránh nhiễu.
function inferClickLabel(el: Element): string | null {
  const explicit = el.getAttribute('data-track');
  if (explicit) return explicit;

  const href = (el as HTMLAnchorElement).href ?? '';
  if (!href) return null;

  if (/^tel:/.test(href)) return 'phone';
  if (/facebook\.com|fb\.com|fb\.me/.test(href)) return 'social-fb';
  if (/instagram\.com/.test(href)) return 'social-ig';
  if (/zalo\.me/.test(href)) return 'social-zalo';
  if (/tiktok\.com/.test(href)) return 'social-tiktok';
  if (/youtube\.com/.test(href)) return 'social-youtube';
  if (/maps\.google|goo\.gl\/maps|maps\.app\.goo/.test(href)) return 'map';
  if (/^mailto:/.test(href)) return 'email';

  return null;
}

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

/**
 * Gắn vào PublicSitePage để tự động gửi log qua sendLog():
 *   - User-View        khi component mount (kèm referrer, thiết bị, UTM, khách cũ/mới)
 *   - User-Click        event delegation, chỉ lấy link có ý nghĩa (tel, social, map)
 *                        hoặc element có attribute data-track="xxx"
 *   - User-Scroll-Depth mốc 25/50/75/100% chiều cao trang
 *   - User-Leave        khi rời trang mà KHÔNG hề click/cuộn gì (bounce)
 *   - User-Session-End  khi rời trang SAU KHI đã tương tác (click hoặc cuộn)
 *
 * Fire-and-forget → không ảnh hưởng UX dù backend chậm/lỗi.
 */
export function useAnalyticsTracker(slug: string | undefined): void {
  useEffect(() => {
    if (!slug) return;

    const sessionStart = Date.now();
    let hasInteracted = false;
    let sessionEndSent = false;
    const scrollMilestonesSent = new Set<number>();

    // 1. User-View
    sendLog(slug, 'User-View', {
      referrer: document.referrer || undefined,
      deviceType: getDeviceType(),
      isReturning: isReturningVisitor(),
      ...getUtmParams(),
    });

    // 2. User-Click — event delegation
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('[data-track], a[href]');
      if (!target) return;
      const label = inferClickLabel(target);
      if (label) {
        hasInteracted = true;
        sendLog(slug, 'User-Click', { element: label });
      }
    };
    document.addEventListener('click', handleClick);

    // 3. User-Scroll-Depth — mốc 25/50/75/100%, mỗi mốc gửi đúng 1 lần
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const pct = doc.scrollHeight > 0 ? (scrolled / doc.scrollHeight) * 100 : 0;
      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !scrollMilestonesSent.has(milestone)) {
          scrollMilestonesSent.add(milestone);
          hasInteracted = true;
          sendLog(slug, 'User-Scroll-Depth', { depth: milestone });
        }
      }
    };
    document.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Kết thúc phiên — User-Leave (bounce) nếu chưa từng tương tác,
    //    ngược lại User-Session-End. Gửi đúng 1 lần dù sự kiện nào fire trước.
    const sendSessionEnd = () => {
      if (sessionEndSent) return;
      sessionEndSent = true;
      const durationSeconds = Math.round((Date.now() - sessionStart) / 1000);
      sendLog(slug, hasInteracted ? 'User-Session-End' : 'User-Leave', { durationSeconds });
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') sendSessionEnd();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', sendSessionEnd);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', sendSessionEnd);
      sendSessionEnd(); // cleanup nếu component unmount trong SPA
    };
  }, [slug]);
}
