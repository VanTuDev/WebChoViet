// ─── Analytics / Log Service ────────────────────────────────────────────────────
// sendLog() là hàm CHUNG duy nhất để gửi mọi loại sự kiện thống kê lên backend
// (BackEnd-WebChoViet/src/analytics — POST /analytics/track). Muốn track thêm 1
// hành vi mới của user, chỉ cần gọi sendLog(slug, '<Loại-Mới>', { ...data }) —
// không cần đổi schema hay endpoint (xem LogEventType bên dưới để thêm loại mới).
import { apiFetch } from './apiClient';
import { getApiBaseUrl } from './authService';

// ── Types ─────────────────────────────────────────────────────────────────────

type LogEventType =
  | 'User-View'          // Vào trang
  | 'User-Leave'          // Rời đi mà KHÔNG tương tác gì (bounce)
  | 'User-Click'          // Click 1 element có ý nghĩa (phone, social, map, CTA...)
  | 'User-Session-End'    // Rời đi SAU KHI đã tương tác — tách khỏi bounce
  | 'User-Scroll-Depth'   // Cuộn tới mốc 25/50/75/100%
  | 'User-Conversion'     // Hoàn thành mục tiêu marketing (đặt bàn, gọi, liên hệ...)
  | 'User-Language-Switch'; // Khách đổi ngôn ngữ xem trang public

export interface DailyStats {
  date: string;           // "YYYY-MM-DD"
  views: number;
  uniqueVisitors: number;
  clicks: number;
  avgTimeSeconds: number;
}

export interface SlugAnalytics {
  slug: string;
  isMock?: boolean;       // true nếu BE không gọi được → đang hiển thị dữ liệu mẫu
  total: {
    views: number;
    uniqueVisitors: number;
    clicks: number;
    avgTimeSeconds: number;
    bounceRate: number;   // % phiên rời đi mà không tương tác gì, luôn trong [0, 100]
  };
  visitors: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  daily: DailyStats[];
  topInteractions: { element: string; label: string; count: number }[];
  deviceBreakdown: { mobile: number; tablet: number; desktop: number };
}

// ── Session ID ────────────────────────────────────────────────────────────────
// Lưu trong sessionStorage → mất khi đóng tab. Không lưu PII (tên/email/IP).
// Đủ để đếm unique visitors và phân biệt các phiên.

function getOrCreateSessionId(): string {
  const KEY = 'wcv_sid';
  let sid = sessionStorage.getItem(KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(KEY, sid);
  }
  return sid;
}

// ── sendLog — hàm chung duy nhất để gửi log ─────────────────────────────────────

/**
 * Gửi 1 sự kiện thống kê lên backend. Fire-and-forget, không throw — lỗi mạng
 * không được phép ảnh hưởng UX của trang public.
 *
 * Cố tình dùng `fetch` thẳng thay vì `apiFetch` (axios) ở đây: `keepalive: true`
 * (vẫn gửi được khi tab đang đóng — quan trọng cho User-Leave) là 1 flag riêng
 * của Fetch API, axios (mặc định chạy trên XHR ở trình duyệt) không có khái
 * niệm tương đương — dùng apiFetch sẽ âm thầm mất hành vi này.
 */
export async function sendLog(
  slug: string,
  type: LogEventType,
  data?: Record<string, unknown>,
): Promise<void> {
  try {
    await fetch(`${getApiBaseUrl()}/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        slug,
        type,
        sessionId: getOrCreateSessionId(),
        data: data ?? {},
      }),
      keepalive: true,
    });
  } catch {
    // silent fail — không ảnh hưởng UX trang public
  }
}

// ── Fetch (dashboard chủ site) ──────────────────────────────────────────────────

const INTERACTION_LABELS: Record<string, string> = {
  phone:          'Số điện thoại',
  cta:            'Nút đặt bàn',
  'social-fb':    'Facebook',
  map:            'Xem bản đồ',
  'social-ig':    'Instagram',
  'social-zalo':  'Zalo',
  'social-tiktok':'TikTok',
  'social-youtube':'YouTube',
  email:          'Email',
};

/** Lấy analytics của 1 site — yêu cầu đăng nhập (chỉ chủ site xem được). Fallback mock nếu lỗi. */
export async function fetchAnalytics(slug: string, days = 7): Promise<SlugAnalytics> {
  try {
    const raw = await apiFetch<Omit<SlugAnalytics, 'topInteractions'> & {
      topInteractions: { element: string; count: number }[];
    }>(`/analytics/${encodeURIComponent(slug)}?days=${days}`);
    return {
      ...raw,
      topInteractions: raw.topInteractions.map(t => ({
        ...t,
        label: INTERACTION_LABELS[t.element] ?? t.element,
      })),
    };
  } catch {
    // fall through to mock
  }
  return { ...buildMockAnalytics(slug, days), isMock: true };
}

// ── Mock data (dùng khi BE chưa gọi được — mất mạng, chưa đăng nhập...) ────────

function buildMockAnalytics(slug: string, days: number): SlugAnalytics {
  const daily: DailyStats[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const views = Math.floor(Math.random() * 80) + 10;
    daily.push({
      date: `${y}-${m}-${day}`,
      views,
      uniqueVisitors: Math.floor(views * (0.55 + Math.random() * 0.3)),
      clicks: Math.floor(views * 0.12 + Math.random() * 6),
      avgTimeSeconds: Math.floor(45 + Math.random() * 105),
    });
  }

  const totals = daily.reduce(
    (acc, d) => ({
      views: acc.views + d.views,
      uniqueVisitors: acc.uniqueVisitors + d.uniqueVisitors,
      clicks: acc.clicks + d.clicks,
    }),
    { views: 0, uniqueVisitors: 0, clicks: 0 },
  );

  const avgTimeSeconds = Math.round(
    daily.reduce((s, d) => s + d.avgTimeSeconds, 0) / daily.length,
  );

  const topInteractions = [
    { element: 'phone',       label: INTERACTION_LABELS['phone'],      count: Math.floor(totals.clicks * 0.42) },
    { element: 'cta',         label: INTERACTION_LABELS['cta'],        count: Math.floor(totals.clicks * 0.26) },
    { element: 'social-fb',   label: INTERACTION_LABELS['social-fb'],  count: Math.floor(totals.clicks * 0.19) },
    { element: 'map',         label: INTERACTION_LABELS['map'],        count: Math.floor(totals.clicks * 0.13) },
  ];

  const last = (n: number) => daily.slice(Math.max(0, daily.length - n));
  const sumUnique = (arr: DailyStats[]) => arr.reduce((s, d) => s + d.uniqueVisitors, 0);

  return {
    slug,
    total: { ...totals, avgTimeSeconds, bounceRate: 38 },
    visitors: {
      today: daily[daily.length - 1]?.uniqueVisitors ?? 0,
      thisWeek: sumUnique(last(7)),
      thisMonth: sumUnique(last(30)),
    },
    daily,
    topInteractions,
    deviceBreakdown: { mobile: 62, tablet: 15, desktop: 23 },
  };
}
