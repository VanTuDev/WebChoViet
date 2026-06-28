// ─── Analytics Service ─────────────────────────────────────────────────────────
//
// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  BE ENDPOINTS CẦN BUILD — thêm vào api/routes.ts                           ║
// ╠══════════════════════════════════════════════════════════════════════════════╣
// ║                                                                              ║
// ║  POST /api/analytics/track                                                   ║
// ║    Body: TrackEvent                                                           ║
// ║    Logic:                                                                     ║
// ║      const ANALYTICS_DIR = path.resolve(cwd, 'data/analytics');              ║
// ║      Tạo thư mục nếu chưa có.                                                ║
// ║      Đọc data/analytics/[slug].json (hoặc tạo mới với cấu trúc rỗng).       ║
// ║      today = new Date().toISOString().slice(0, 10)   // "YYYY-MM-DD"         ║
// ║      if (!db.daily[today]) db.daily[today] = emptyDayRecord()               ║
// ║                                                                              ║
// ║      Nếu type === 'pageview':                                                 ║
// ║        db.daily[today].views++                                                ║
// ║        // unique: Set<sessionId> lưu per-day, độ dài Set = uniqueVisitors    ║
// ║        db.daily[today].sessionIds.add(body.sessionId)                        ║
// ║        db.daily[today].uniqueVisitors = sessionIds.size                      ║
// ║        db.daily[today].devices[body.data.deviceType]++                       ║
// ║                                                                              ║
// ║      Nếu type === 'click':                                                    ║
// ║        db.daily[today].clicks++                                               ║
// ║        const label = body.data.element ?? 'unknown'                          ║
// ║        db.interactions[label] = (db.interactions[label] ?? 0) + 1            ║
// ║                                                                              ║
// ║      Nếu type === 'session_end':                                              ║
// ║        db.daily[today].totalSessions++                                        ║
// ║        db.daily[today].totalTimeSeconds += body.data.durationSeconds ?? 0    ║
// ║        // avgTime = totalTimeSeconds / totalSessions khi query                ║
// ║                                                                              ║
// ║      Lưu lại file. Response: { ok: true }                                    ║
// ║                                                                              ║
// ║  GET /api/analytics/:slug?days=7                                             ║
// ║    Logic:                                                                     ║
// ║      Đọc data/analytics/[slug].json                                           ║
// ║      Lọc N ngày gần nhất từ db.daily                                         ║
// ║      Tổng hợp total { views, uniqueVisitors, clicks, avgTimeSeconds }        ║
// ║      topInteractions: Object.entries(db.interactions)                        ║
// ║                         .sort(([,a],[,b]) => b-a).slice(0,5)                ║
// ║      deviceBreakdown: tổng devices từ tất cả daily records                  ║
// ║    Response: SlugAnalytics (xem interface bên dưới)                         ║
// ║                                                                              ║
// ║  Cấu trúc file data/analytics/[slug].json:                                  ║
// ║  {                                                                            ║
// ║    "slug": "my-coffee",                                                       ║
// ║    "daily": {                                                                 ║
// ║      "2026-06-26": {                                                          ║
// ║        "views": 45,                                                           ║
// ║        "uniqueVisitors": 32,                                                  ║
// ║        "sessionIds": ["uuid1", "uuid2", ...],  // dedup ở đây               ║
// ║        "clicks": 12,                                                          ║
// ║        "totalSessions": 30,                                                   ║
// ║        "totalTimeSeconds": 2610,                                              ║
// ║        "devices": { "mobile": 24, "tablet": 4, "desktop": 4 }               ║
// ║      }                                                                        ║
// ║    },                                                                         ║
// ║    "interactions": {                                                          ║
// ║      "phone": 136,                                                            ║
// ║      "social-fb": 68,                                                         ║
// ║      "map": 51                                                                ║
// ║    }                                                                          ║
// ║  }                                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TrackEvent {
  slug: string;
  type: 'pageview' | 'click' | 'session_end';
  sessionId: string;      // UUID lưu trong sessionStorage, không lưu PII
  timestamp: string;      // ISO 8601
  data?: {
    element?: string;           // 'phone' | 'cta' | 'social-fb' | 'map' | v.v.
    durationSeconds?: number;   // chỉ dùng với session_end
    referrer?: string;          // document.referrer, chỉ dùng với pageview
    deviceType?: 'mobile' | 'tablet' | 'desktop';
  };
}

export interface DailyStats {
  date: string;           // "YYYY-MM-DD"
  views: number;
  uniqueVisitors: number;
  clicks: number;
  avgTimeSeconds: number;
}

export interface SlugAnalytics {
  slug: string;
  isMock?: boolean;       // true nếu BE chưa kết nối
  total: {
    views: number;
    uniqueVisitors: number;
    clicks: number;
    avgTimeSeconds: number;
  };
  daily: DailyStats[];    // mảng N ngày gần nhất, đã điền ngày trống = 0
  topInteractions: { element: string; label: string; count: number }[];
  deviceBreakdown: { mobile: number; tablet: number; desktop: number };
}

// ── Session ID ────────────────────────────────────────────────────────────────
// Lưu trong sessionStorage → mất khi đóng tab, không theo dõi giữa các session.
// Không lưu PII (tên/email/IP). Đủ để đếm unique visitors per day.

function getOrCreateSessionId(): string {
  const KEY = 'wcv_sid';
  let sid = sessionStorage.getItem(KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(KEY, sid);
  }
  return sid;
}

// ── Track ─────────────────────────────────────────────────────────────────────

/**
 * Gửi event tracking lên BE. Fire-and-forget, không throw.
 * keepalive: true → gửi được kể cả khi tab đang đóng (dùng cho session_end).
 */
export async function trackEvent(
  event: Omit<TrackEvent, 'sessionId' | 'timestamp'>,
): Promise<void> {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...event,
        sessionId: getOrCreateSessionId(),
        timestamp: new Date().toISOString(),
      } satisfies TrackEvent),
      keepalive: true,
    });
  } catch {
    // silent fail — không ảnh hưởng UX trang public
  }
}

// ── Fetch ─────────────────────────────────────────────────────────────────────

/**
 * Lấy analytics của một slug. Fallback sang mock nếu API chưa build.
 */
export async function fetchAnalytics(slug: string, days = 7): Promise<SlugAnalytics> {
  try {
    const res = await fetch(`/api/analytics/${slug}?days=${days}`);
    if (res.ok) return res.json() as Promise<SlugAnalytics>;
  } catch {
    // fall through to mock
  }
  return { ...buildMockAnalytics(slug, days), isMock: true };
}

// ── Mock data (dùng khi BE chưa sẵn sàng) ─────────────────────────────────────

const INTERACTION_LABELS: Record<string, string> = {
  phone:        'Số điện thoại',
  'cta':        'Nút đặt bàn',
  'social-fb':  'Facebook',
  map:          'Xem bản đồ',
  'social-ig':  'Instagram',
  'social-zalo':'Zalo',
};

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

  return {
    slug,
    total: { ...totals, avgTimeSeconds },
    daily,
    topInteractions,
    deviceBreakdown: { mobile: 62, tablet: 15, desktop: 23 },
  };
}
