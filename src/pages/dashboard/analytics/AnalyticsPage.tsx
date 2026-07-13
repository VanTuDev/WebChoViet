import { useState, useEffect } from 'react';
import {
  Eye, Users, MousePointerClick, Clock, LogOut,
  Smartphone, Monitor, Tablet,
  Globe, Loader2, AlertTriangle,
  Phone, UtensilsCrossed, ThumbsUp, Map, Camera, MessageCircle, Music, Mail, MousePointer,
} from 'lucide-react';
import { useAppContext } from '../../../store/AppContext';
import { fetchAnalytics } from '../../../services/analyticsService';
import { getPublicSiteUrl } from '../../../utils/tenant';
import type { SlugAnalytics, DailyStats } from '../../../services/analyticsService';

// ── Helpers ───────────────────────────────────────────────────────────────────

const VI_DAY = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function dayLabel(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return VI_DAY[new Date(y, m - 1, d).getDay()];
}

function shortDate(dateStr: string): string {
  const [, m, d] = dateStr.split('-');
  return `${d}/${m}`;
}

function fmtTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
  sub?: string;
}

// Trend % đã bị gỡ: giá trị cũ là số hardcode giả (12/8/-3), không tính từ dữ liệu thật.
// Muốn khôi phục cần backend trả thêm số liệu kỳ trước để so sánh.
function StatCard({ icon, iconBg, label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
      <span className={`p-2.5 rounded-xl self-start ${iconBg}`}>{icon}</span>
      <div>
        <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{label}</p>
        {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Bar Chart (pure CSS — không cần thư viện) ─────────────────────────────────

function BarChart({ data, days }: { data: DailyStats[]; days: number }) {
  const max = Math.max(...data.map(d => d.views), 1);
  // Chỉ hiển thị label ngày trên 30-day view (tránh chen chúc)
  const showDayName = days <= 14;

  return (
    <div className="flex items-end gap-1 h-44 w-full">
      {data.map((d, i) => {
        const pct = Math.max((d.views / max) * 100, 3);
        return (
          <div key={i} className="group relative flex flex-col items-center justify-end h-full flex-1 min-w-0">
            {/* Tooltip on hover */}
            <div className="absolute -top-11 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-lg">
              <span className="font-bold">{d.views}</span> lượt xem
              <br />
              <span className="text-gray-400">{d.uniqueVisitors} độc lập · {d.clicks} click</span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>

            {/* Bar */}
            <div
              className="w-full bg-primary/75 hover:bg-primary rounded-t-sm transition-colors cursor-default"
              style={{ height: `${pct}%` }}
            />

            {/* Label */}
            <span className="text-[9px] text-gray-400 mt-1.5 truncate w-full text-center">
              {showDayName ? dayLabel(d.date) : shortDate(d.date)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Interaction Icon mapping ──────────────────────────────────────────────────

const INTERACTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  phone:          Phone,
  cta:            UtensilsCrossed,
  'social-fb':    ThumbsUp,
  map:            Map,
  'social-ig':    Camera,
  'social-zalo':  MessageCircle,
  'social-tiktok':Music,
  email:          Mail,
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const DAYS_OPTIONS = [
  { value: 7,  label: '7 ngày' },
  { value: 14, label: '14 ngày' },
  { value: 30, label: '30 ngày' },
] as const;
type DaysValue = 7 | 14 | 30;

export default function AnalyticsPage() {
  const { siteConfigs } = useAppContext();
  const publishedSites = siteConfigs.filter(s => s.status === 'published');

  const [selectedSlug, setSelectedSlug] = useState('');
  const [days, setDays] = useState<DaysValue>(7);
  const [analytics, setAnalytics] = useState<SlugAnalytics | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-chọn site đầu tiên
  useEffect(() => {
    if (!selectedSlug && publishedSites.length > 0) {
      setSelectedSlug(publishedSites[0].slug);
    }
  }, [publishedSites, selectedSlug]);

  useEffect(() => {
    if (!selectedSlug) { setAnalytics(null); return; }
    setLoading(true);
    fetchAnalytics(selectedSlug, days).then(data => {
      setAnalytics(data);
      setLoading(false);
    });
  }, [selectedSlug, days]);

  // ── Empty state — chưa xuất bản site nào ────────────────────────────────────
  if (publishedSites.length === 0) {
    return (
      <div className="py-8 px-6 xl:px-10 w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900">Phân Tích Trang Web</h1>
          <p className="text-xs text-gray-500 mt-1">Theo dõi lượt xem, khách truy cập và tương tác.</p>
        </div>
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <Globe className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-600">Chưa có website nào được xuất bản.</p>
          <p className="text-xs text-gray-400 mt-1">Xuất bản website để bắt đầu theo dõi analytics.</p>
        </div>
      </div>
    );
  }

  const selectedSite = publishedSites.find(s => s.slug === selectedSlug);

  return (
    <div className="py-8 px-6 xl:px-10 w-full space-y-6 max-w-5xl">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900">Phân Tích Trang Web</h1>
          <p className="text-xs text-gray-500 mt-1">
            Lượt xem · Khách truy cập · Tương tác · Thời gian trên trang
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Site selector */}
          <select
            value={selectedSlug}
            onChange={e => setSelectedSlug(e.target.value)}
            className="text-xs border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {publishedSites.map(s => (
              <option key={s.id} value={s.slug}>{s.name}</option>
            ))}
          </select>

          {/* Days tabs */}
          <div className="flex bg-gray-100 rounded-xl p-0.5">
            {DAYS_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setDays(value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  days === value
                    ? 'bg-white shadow text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mock data notice ─────────────────────────────────────────────────── */}
      {analytics?.isMock && (
        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl px-4 py-3">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Đang hiển thị dữ liệu mẫu.</span>{' '}
            Không gọi được API analytics từ backend (chưa đăng nhập, mất mạng, hoặc backend chưa chạy).
          </div>
        </div>
      )}

      {/* ── URL badge ────────────────────────────────────────────────────────── */}
      {selectedSite && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span>Đang theo dõi:</span>
          <a
            href={getPublicSiteUrl(selectedSite.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-primary hover:underline"
          >
            {selectedSite.slug}.vngoweb.com
          </a>
        </div>
      )}

      {/* ── Loading skeleton ─────────────────────────────────────────────────── */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span className="text-sm">Đang tải dữ liệu...</span>
        </div>
      )}

      {/* ── Dashboard ────────────────────────────────────────────────────────── */}
      {analytics && !loading && (
        <>
          {/* ── Khách truy cập: hôm nay / tuần này / tháng này ─────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Khách truy cập</h3>
            <div className="grid grid-cols-3 gap-4">
              {([
                { label: 'Hôm nay', value: analytics.visitors.today, sub: undefined },
                { label: 'Tuần này', value: analytics.visitors.thisWeek, sub: '7 ngày gần nhất' },
                { label: 'Tháng này', value: analytics.visitors.thisMonth, sub: '30 ngày gần nhất' },
              ] as const).map(({ label, value, sub }) => (
                <div key={label} className="text-center border-r last:border-r-0 border-gray-50">
                  <p className="text-2xl font-bold text-gray-900">{value.toLocaleString('vi-VN')}</p>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                  {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* ── Stat cards ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              icon={<Eye className="h-4 w-4 text-orange-600" />}
              iconBg="bg-orange-50"
              label="Tổng lượt xem"
              value={analytics.total.views.toLocaleString('vi-VN')}
              sub={`${days} ngày gần nhất`}

            />
            <StatCard
              icon={<Users className="h-4 w-4 text-violet-600" />}
              iconBg="bg-violet-50"
              label="Khách độc lập"
              value={analytics.total.uniqueVisitors.toLocaleString('vi-VN')}
              sub="Unique visitors"

            />
            <StatCard
              icon={<MousePointerClick className="h-4 w-4 text-emerald-600" />}
              iconBg="bg-emerald-50"
              label="Lượt tương tác"
              value={analytics.total.clicks.toLocaleString('vi-VN')}
              sub="Clicks có ý nghĩa"

            />
            <StatCard
              icon={<LogOut className="h-4 w-4 text-red-500" />}
              iconBg="bg-red-50"
              label="Tỉ lệ rời trang"
              value={`${analytics.total.bounceRate}%`}
              sub="Vào rồi rời đi, không thao tác"
            />
            <StatCard
              icon={<Clock className="h-4 w-4 text-orange-500" />}
              iconBg="bg-orange-50"
              label="Thời gian TB/phiên"
              value={fmtTime(analytics.total.avgTimeSeconds)}
              sub="Avg session duration"
            />
          </div>

          {/* ── Bar Chart ───────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-gray-800">
                Lượt xem theo ngày
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-primary/75 inline-block" />
                  Lượt xem
                </span>
              </div>
            </div>
            <BarChart data={analytics.daily} days={days} />
          </div>

          {/* ── Bottom row ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Top interactions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-1">Top tương tác</h3>
              <p className="text-[11px] text-gray-400 mb-4">Các nút / link được nhấn nhiều nhất</p>
              <div className="space-y-4">
                {analytics.topInteractions.map((item, i) => {
                  const maxCount = analytics.topInteractions[0]?.count || 1;
                  const pct = Math.round((item.count / maxCount) * 100);
                  const IconComp = INTERACTION_ICONS[item.element] ?? MousePointer;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                        <IconComp className="h-4 w-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-medium text-gray-700 truncate pr-2">
                            {item.label}
                          </span>
                          <span className="text-xs font-bold text-gray-900 tabular-nums shrink-0">
                            {item.count.toLocaleString('vi-VN')}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary/60 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Device breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-1">Thiết bị sử dụng</h3>
              <p className="text-[11px] text-gray-400 mb-4">Tỷ lệ truy cập theo loại thiết bị</p>

              <div className="space-y-4">
                {([
                  {
                    key: 'mobile',
                    label: 'Mobile',
                    value: analytics.deviceBreakdown.mobile,
                    icon: <Smartphone className="h-4 w-4" />,
                    color: 'bg-orange-500',
                    textColor: 'text-orange-600',
                  },
                  {
                    key: 'desktop',
                    label: 'Desktop',
                    value: analytics.deviceBreakdown.desktop,
                    icon: <Monitor className="h-4 w-4" />,
                    color: 'bg-violet-500',
                    textColor: 'text-violet-600',
                  },
                  {
                    key: 'tablet',
                    label: 'Tablet',
                    value: analytics.deviceBreakdown.tablet,
                    icon: <Tablet className="h-4 w-4" />,
                    color: 'bg-orange-400',
                    textColor: 'text-orange-500',
                  },
                ] as const).map(({ key, label, value, icon, color, textColor }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-gray-400 shrink-0">{icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-medium text-gray-700">{label}</span>
                        <span className={`text-xs font-bold tabular-nums ${textColor}`}>{value}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color} rounded-full transition-all`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary row */}
              <div className="mt-5 pt-4 border-t border-gray-50 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xl font-bold text-orange-600">{analytics.deviceBreakdown.mobile}%</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Mobile</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-violet-600">{analytics.deviceBreakdown.desktop}%</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Desktop</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-orange-500">{analytics.deviceBreakdown.tablet}%</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Tablet</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
