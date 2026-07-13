// Trang thống kê tổng hợp cho admin — toàn bộ dữ liệu THẬT: traffic/user từ sendLog + users,
// doanh thu + phễu chuyển đổi từ Payment/Subscription/Sites (GET /admin/analytics).
import { useEffect, useMemo, useState } from 'react';
import {
  Eye, Users, MousePointerClick, LogOut as LeaveIcon,
  Globe, TrendingUp, UserPlus,
} from 'lucide-react';
import { fetchPlatformAnalytics, PlatformAnalytics } from '../../../services/adminService';
import { getPublicSiteUrl } from '../../../utils/tenant';
import { TimeSeriesChart, BarChart, DonutChart, CHART_COLORS } from './_components/charts';
import StatTile from '../../../components/common/StatTile';
import LoadingState from '../../../components/common/LoadingState';
import ErrorBanner from '../../../components/common/ErrorBanner';

const nf = (n: number) => n.toLocaleString('vi-VN');
const fmtVnd = (n: number) => `${nf(n)}đ`;

const RANGE_OPTIONS = [
  { value: 7,  label: '7 ngày' },
  { value: 30, label: '30 ngày' },
  { value: 90, label: '90 ngày' },
] as const;
type RangeValue = (typeof RANGE_OPTIONS)[number]['value'];

const todayStr = () => new Date().toISOString().slice(0, 10);
const daysAgoStr = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-sm font-bold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const [days, setDays] = useState<RangeValue>(30);
  const [customMode, setCustomMode] = useState(false);
  const [fromDate, setFromDate] = useState(daysAgoStr(30));
  const [toDate, setToDate] = useState(todayStr());
  const [appliedCustomRange, setAppliedCustomRange] = useState<{ fromDate: string; toDate: string } | null>(null);
  const [data, setData] = useState<PlatformAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (customMode && !appliedCustomRange) return; // chờ bấm "Áp dụng"
    let cancelled = false;
    setLoading(true);
    setError('');
    const request = customMode && appliedCustomRange ? appliedCustomRange : days;
    fetchPlatformAnalytics(request)
      .then(d => { if (!cancelled) setData(d); })
      .catch(err => { if (!cancelled) setError(err instanceof Error ? err.message : 'Không tải được dữ liệu.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [days, customMode, appliedCustomRange]);

  const rangeLabel = customMode && appliedCustomRange
    ? `${appliedCustomRange.fromDate} → ${appliedCustomRange.toDate}`
    : `${days} ngày`;

  const dates = useMemo(() => data?.daily.map(d => d.date) ?? [], [data]);
  const revenueValues = useMemo(() => data?.dailyRevenue.map(d => d.amount) ?? [], [data]);
  const revenueTotal = useMemo(() => revenueValues.reduce((s, v) => s + v, 0), [revenueValues]);

  // Phễu chuyển đổi thật — toàn thời gian (không giới hạn theo khoảng ngày đang chọn)
  const conversionSteps = useMemo(() => {
    if (!data) return [];
    const { registered, withSite, publishedSite, paying } = data.conversionFunnel;
    return [
      { label: 'Đã đăng ký',            value: registered,    color: '#6da7ec' },
      { label: 'Đã tạo website',        value: withSite,      color: '#3987e5' },
      { label: 'Đã xuất bản website',   value: publishedSite, color: '#256abf' },
      { label: 'Đã nâng cấp trả phí',   value: paying,         color: '#184f95' },
    ];
  }, [data]);

  return (
    <div className="p-6 space-y-6">

      {/* ── Header + range filter (1 hàng, trên các chart) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Thống kê hệ thống</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Truy cập · Người dùng · Gói dịch vụ · Doanh thu
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-2">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-0.5 self-start">
            {RANGE_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => { setCustomMode(false); setAppliedCustomRange(null); setDays(value); }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  !customMode && days === value ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setCustomMode(true)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                customMode ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tuỳ chỉnh
            </button>
          </div>

          {customMode && (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-2">
              <input
                type="date"
                value={fromDate}
                max={toDate}
                onChange={e => setFromDate(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
              />
              <span className="text-xs text-slate-500">→</span>
              <input
                type="date"
                value={toDate}
                min={fromDate}
                max={todayStr()}
                onChange={e => setToDate(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
              />
              <button
                onClick={() => setAppliedCustomRange({ fromDate, toDate })}
                disabled={!fromDate || !toDate || fromDate > toDate}
                className="px-3 py-1 text-xs font-semibold rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer"
              >
                Áp dụng
              </button>
            </div>
          )}
        </div>
      </div>

      {loading && <LoadingState message="Đang tổng hợp dữ liệu..." />}

      {error && !loading && <ErrorBanner message={error} />}

      {data && !loading && (
        <>
          {/* ── KPI tiles ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatTile
              icon={<Eye className="h-5 w-5" style={{ color: '#fdba74' }} />} iconBg="#4a2412"
              label="Tổng lượt xem" value={nf(data.totals.views)} sub={`${rangeLabel} · toàn bộ website`}
            />
            <StatTile
              icon={<Users className="h-5 w-5" style={{ color: '#34d399' }} />} iconBg="#064e3b"
              label="Khách độc lập" value={nf(data.totals.uniqueVisitors)} sub="Unique visitors (theo phiên)"
            />
            <StatTile
              icon={<MousePointerClick className="h-5 w-5" style={{ color: '#a78bfa' }} />} iconBg="#2e1065"
              label="Lượt tương tác" value={nf(data.totals.clicks)} sub="Click phone / social / map..."
            />
            <StatTile
              icon={<LeaveIcon className="h-5 w-5" style={{ color: '#fb7185' }} />} iconBg="#4c0519"
              label="Tỉ lệ rời trang" value={`${data.totals.bounceRate}%`} sub="Vào rồi rời đi, không thao tác"
            />
          </div>

          {/* ── Traffic 2 series ── */}
          <Card title="Lưu lượng truy cập theo ngày">
            <TimeSeriesChart
              dates={dates}
              series={[
                { name: 'Lượt xem', color: CHART_COLORS.blue, values: data.daily.map(d => d.views) },
                { name: 'Tương tác', color: CHART_COLORS.aqua, values: data.daily.map(d => d.clicks) },
              ]}
            />
          </Card>

          {/* ── User growth + Plan distribution ── */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card title="Người dùng đăng ký mới">
              <BarChart
                dates={dates}
                values={data.userGrowth.map(g => g.count)}
                color={CHART_COLORS.blue}
                unitLabel="người dùng mới"
              />
            </Card>

            <Card title="Phân bổ gói dịch vụ">
              <DonutChart
                centerLabel="Tài khoản"
                slices={[
                  { label: 'Free',  value: data.planDistribution.free,  color: CHART_COLORS.yellow },
                  { label: 'Pro',   value: data.planDistribution.pro,   color: CHART_COLORS.blue },
                  { label: 'Ultra', value: data.planDistribution.ultra, color: CHART_COLORS.magenta },
                ]}
              />
            </Card>
          </div>

          {/* ── Top sites + Devices ── */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card title="Website được xem nhiều nhất">
              {data.topSites.length === 0 ? (
                <p className="text-center text-slate-500 text-sm py-8">Chưa có lượt truy cập nào.</p>
              ) : (
                <div className="space-y-3">
                  {data.topSites.map((site, i) => {
                    const maxViews = data.topSites[0].views || 1;
                    return (
                      <div key={site.slug} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-600 w-4 shrink-0 tabular-nums">{i + 1}</span>
                        <Globe className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <a
                              href={getPublicSiteUrl(site.slug)} target="_blank" rel="noopener noreferrer"
                              className="text-xs font-medium text-slate-300 hover:text-white truncate font-mono"
                            >
                              {site.slug}.vngoweb.com
                            </a>
                            <span className="text-xs font-bold text-slate-200 tabular-nums shrink-0 pl-2">
                              {nf(site.views)}
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${(site.views / maxViews) * 100}%`, backgroundColor: CHART_COLORS.blue }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            <Card title="Thiết bị truy cập">
              <div className="space-y-4 pt-1">
                {([
                  { key: 'mobile',  label: 'Mobile',  value: data.deviceBreakdown.mobile },
                  { key: 'desktop', label: 'Desktop', value: data.deviceBreakdown.desktop },
                  { key: 'tablet',  label: 'Tablet',  value: data.deviceBreakdown.tablet },
                ] as const).map(({ key, label, value }) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-slate-400">{label}</span>
                      <span className="text-xs font-bold text-slate-200 tabular-nums">{value}%</span>
                    </div>
                    {/* Cùng 1 hue — identity nằm ở nhãn hàng, không phải màu */}
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${value}%`, backgroundColor: CHART_COLORS.blue }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ── Doanh thu + Phễu chuyển đổi (dữ liệu thật) ── */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card title="Doanh thu theo ngày">
              <div className="flex items-baseline gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-emerald-400 self-center" />
                <span className="text-xl font-bold text-white tabular-nums">{fmtVnd(revenueTotal)}</span>
                <span className="text-[11px] text-slate-500">tổng {rangeLabel} · giao dịch PayOS thành công</span>
              </div>
              <BarChart
                dates={dates}
                values={revenueValues}
                color={CHART_COLORS.aqua}
                unitLabel="đồng"
                height={140}
              />
            </Card>

            <Card title="Phễu chuyển đổi người dùng">
              <div className="space-y-3.5 pt-1">
                {conversionSteps.map((step, i) => {
                  const maxVal = conversionSteps[0]?.value || 1;
                  const pctOfPrev = i === 0 ? 100 : Math.round((step.value / (conversionSteps[i - 1].value || 1)) * 100);
                  return (
                    <div key={step.label}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                          {i === 0 && <UserPlus className="h-3 w-3 text-slate-500" />}
                          {step.label}
                        </span>
                        <span className="text-xs text-slate-500 tabular-nums">
                          <span className="font-bold text-slate-200">{nf(step.value)}</span>
                          {i > 0 && <span className="ml-1.5">({pctOfPrev}%)</span>}
                        </span>
                      </div>
                      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${Math.max((step.value / maxVal) * 100, 1.5)}%`, backgroundColor: step.color }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-[10px] text-slate-600 pt-1">
                  Toàn thời gian — không giới hạn theo khoảng ngày đang chọn ở trên.
                </p>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
