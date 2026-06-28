import { useEffect } from 'react';
import { trackEvent } from '../services/analyticsService';

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
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

/**
 * Gắn vào PublicSitePage để tự động track:
 *   - pageview: khi component mount
 *   - click: event delegation, chỉ lấy link có ý nghĩa (tel, social, map)
 *             hoặc element có attribute data-track="xxx"
 *   - session_end: khi tab ẩn (visibilitychange) hoặc đóng (beforeunload)
 *
 * Fire-and-forget → không ảnh hưởng UX dù BE chưa có.
 */
export function useAnalyticsTracker(slug: string | undefined): void {
  useEffect(() => {
    if (!slug) return;

    const sessionStart = Date.now();
    let sessionEndSent = false;

    // 1. Pageview
    trackEvent({
      slug,
      type: 'pageview',
      data: {
        referrer: document.referrer || undefined,
        deviceType: getDeviceType(),
      },
    });

    // 2. Click tracking via event delegation
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('[data-track], a[href]');
      if (!target) return;
      const label = inferClickLabel(target);
      if (label) {
        trackEvent({ slug, type: 'click', data: { element: label } });
      }
    };

    document.addEventListener('click', handleClick);

    // 3. Session end — gửi đúng một lần dù sự kiện nào fire trước
    const sendSessionEnd = () => {
      if (sessionEndSent) return;
      sessionEndSent = true;
      trackEvent({
        slug,
        type: 'session_end',
        data: { durationSeconds: Math.round((Date.now() - sessionStart) / 1000) },
      });
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') sendSessionEnd();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', sendSessionEnd);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', sendSessionEnd);
      sendSessionEnd(); // cleanup nếu component unmount trong SPA
    };
  }, [slug]);
}
