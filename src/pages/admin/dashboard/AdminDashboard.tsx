import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Globe, Eye, MousePointerClick, UserPlus,
  ArrowRight, Loader2, AlertCircle, CreditCard, ExternalLink, Search,
  CircleDot, FileEdit, Lock, Unlock, Trash2,
} from 'lucide-react';
import {
  fetchAdminStats, fetchAdminUsers, fetchAdminSites,
  toggleSitePending as apiToggleSitePending, deleteSite as apiDeleteSite,
  AdminStats, AdminUserListItem, AdminSiteListItem,
} from '../../../services/adminService';
import { ROUTES } from '../../../config/routes';
import { useAppContext } from '../../../store/AppContext';

const nf = (n: number) => n.toLocaleString('vi-VN');
const fmtVnd = (n: number) => `${nf(n)}đ`;
const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const PLAN_BADGE: Record<string, string> = {
  free:  'bg-slate-700 text-slate-300',
  pro:   'bg-blue-500/20 text-blue-300',
  ultra: 'bg-violet-500/20 text-violet-300',
};
const PLAN_LABEL: Record<string, string> = { free: 'Free', pro: 'Pro', ultra: 'Ultra' };

function avatarUrl(u: Pick<AdminUserListItem, 'avatar' | 'name'> | { ownerAvatar?: string; ownerName: string }): string {
  const av = 'avatar' in u ? u.avatar : (u as any).ownerAvatar;
  const nm = 'name' in u ? u.name : (u as any).ownerName;
  return av || `https://ui-avatars.com/api/?name=${encodeURIComponent(nm)}&background=0056b3&color=fff`;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { showConfirm, showSnackbar } = useAppContext();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<AdminUserListItem[]>([]);
  const [sites, setSites] = useState<AdminSiteListItem[]>([]);
  const [sitesTotal, setSitesTotal] = useState(0);
  const [sitesPage, setSitesPage] = useState(1);
  const [sitesSearch, setSitesSearch] = useState('');
  const [sitesStatus, setSitesStatus] = useState<'' | 'draft' | 'published'>('');
  const [sitesLoading, setSitesLoading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const SITES_LIMIT = 10;

  const handleTogglePending = async (siteId: string, currentPending: boolean) => {
    try {
      const res = await apiToggleSitePending(siteId);
      showSnackbar(
        res.isPending ? 'Đã tạm dừng website thành công.' : 'Đã mở khóa website thành công.',
        'success'
      );
      setSites(prev => prev.map(s => s.id === siteId ? { ...s, isPending: res.isPending } : s));
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Có lỗi xảy ra.', 'error');
    }
  };

  const handleDeleteSite = (siteId: string, siteName: string) => {
    showConfirm({
      title: 'Xóa website?',
      message: `Bạn có chắc chắn muốn xóa website "${siteName}"? Hành động này không thể hoàn tác.`,
      confirmLabel: 'Xóa',
      variant: 'danger',
      onConfirm: async () => {
        try {
          await apiDeleteSite(siteId);
          showSnackbar('Đã xóa website thành công.', 'success');
          // Reload current page
          reloadSites(sitesPage, sitesSearch, sitesStatus);
        } catch (err) {
          showSnackbar(err instanceof Error ? err.message : 'Không thể xóa website.', 'error');
        }
      }
    });
  };

  // Initial load — stats + recent users + first page of sites
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchAdminStats(),
      fetchAdminUsers({ limit: 6 }),
      fetchAdminSites({ limit: SITES_LIMIT }),
    ])
      .then(([s, u, si]) => {
        if (cancelled) return;
        setStats(s);
        setRecentUsers(u.items);
        setSites(si.items);
        setSitesTotal(si.total);
      })
      .catch(err => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Không tải được dữ liệu.');
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Reload sites when filters or page change
  const reloadSites = (page: number, search: string, status: string) => {
    setSitesLoading(true);
    fetchAdminSites({
      page,
      limit: SITES_LIMIT,
      search: search || undefined,
      status: (status as 'draft' | 'published') || undefined,
    })
      .then(res => {
        setSites(res.items);
        setSitesTotal(res.total);
        setSitesPage(res.page);
      })
      .catch(() => {})
      .finally(() => setSitesLoading(false));
  };

  const handleSitesSearch = (q: string) => {
    setSitesSearch(q);
    reloadSites(1, q, sitesStatus);
  };

  const handleSitesStatus = (status: '' | 'draft' | 'published') => {
    setSitesStatus(status);
    reloadSites(1, sitesSearch, status);
  };

  const handleSitesPage = (page: number) => {
    reloadSites(page, sitesSearch, sitesStatus);
  };

  const totalSitesPages = Math.ceil(sitesTotal / SITES_LIMIT);

  // Get base URL for public sites (same origin, /:slug)
  const getPublicUrl = (slug: string) => `${window.location.origin}/${slug}`;

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center py-32 text-slate-400 gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm">Đang tải dữ liệu hệ thống...</span>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-2xl px-5 py-4">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Không tải được dữ liệu hệ thống</p>
            <p className="text-xs text-rose-400/80 mt-0.5">{error || 'Vui lòng thử lại.'}</p>
          </div>
        </div>
      </div>
    );
  }

  const KPI = [
    {
      label: 'Tổng người dùng',
      value: nf(stats.totalUsers),
      sub: `+${nf(stats.newUsersLast7Days)} trong 7 ngày qua`,
      Icon: Users, color: '#60a5fa', bg: '#1e3a5f',
    },
    {
      label: 'Tổng website',
      value: nf(stats.totalSites),
      sub: `${nf(stats.publishedSites)} đang xuất bản`,
      Icon: Globe, color: '#34d399', bg: '#064e3b',
    },
    {
      label: 'Lượt xem (30 ngày)',
      value: nf(stats.viewsLast30Days),
      sub: 'Trên tất cả website',
      Icon: Eye, color: '#a78bfa', bg: '#2e1065',
    },
    {
      label: 'Lượt tương tác (30 ngày)',
      value: nf(stats.clicksLast30Days),
      sub: 'Click phone / social / map...',
      Icon: MousePointerClick, color: '#fb923c', bg: '#431407',
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

      {/* ── Header ── */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-white">Tổng quan hệ thống</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
        </p>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map(({ label, value, sub, Icon, color, bg }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: bg }}
            >
              <Icon className="h-5 w-5" style={{ color }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Tổng website — danh sách tất cả site ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="h-4 w-4 text-emerald-400" />
            Tổng website
            <span className="text-[10px] font-normal bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full ml-1">
              {sitesTotal}
            </span>
          </h2>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial sm:w-52">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-500 pointer-events-none">
                <Search className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                placeholder="Tìm slug, tên, email..."
                value={sitesSearch}
                onChange={e => handleSitesSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
              />
            </div>

            {/* Status filter */}
            <select
              value={sitesStatus}
              onChange={e => handleSitesStatus(e.target.value as '' | 'draft' | 'published')}
              className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="">Tất cả</option>
              <option value="published">Đang xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
        </div>

        {/* Site list */}
        {sitesLoading ? (
          <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs">Đang tải...</span>
          </div>
        ) : sites.length === 0 ? (
          <p className="text-center text-slate-500 text-sm py-10">Chưa có website nào.</p>
        ) : (
          <>
            {/* Table header — md+ (mobile dùng layout card riêng bên dưới) */}
            <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_200px_110px_150px] lg:grid-cols-[minmax(0,1fr)_200px_130px_110px_150px] xl:grid-cols-[minmax(0,1fr)_200px_120px_130px_110px_150px] gap-3 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800/50">
              <span>Website</span>
              <span>Chủ sở hữu</span>
              <span className="hidden xl:block">Template</span>
              <span className="hidden lg:block">Ngày tạo</span>
              <span>Trạng thái</span>
              <span className="text-right">Hành động</span>
            </div>

            <div className="divide-y divide-slate-800/50">
              {sites.map(site => {
                const statusBadge = site.isPending ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                    <Lock className="h-2.5 w-2.5" />
                    Tạm khóa
                  </span>
                ) : site.planLocked ? (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full"
                    title="Vượt giới hạn gói Free sau khi hạ gói — không hiển thị public"
                  >
                    <Lock className="h-2.5 w-2.5" />
                    Khóa do gói
                  </span>
                ) : site.status === 'published' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <CircleDot className="h-2.5 w-2.5" />
                    Xuất bản
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    <FileEdit className="h-2.5 w-2.5" />
                    Nháp
                  </span>
                );

                const actions = (
                  <div className="flex items-center justify-end gap-1.5">
                    {site.status === 'published' && (
                      <a
                        href={getPublicUrl(site.slug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                        title="Mở trang web"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Xem
                      </a>
                    )}
                    <button
                      onClick={() => handleTogglePending(site.id, site.isPending)}
                      className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                        site.isPending
                          ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20'
                          : 'text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20'
                      }`}
                      title={site.isPending ? "Mở khóa website" : "Khóa website"}
                    >
                      {site.isPending ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                      <span>{site.isPending ? 'Mở' : 'Khóa'}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteSite(site.id, site.name)}
                      className="flex items-center gap-1 text-[11px] font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                      title="Xóa website"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Xóa</span>
                    </button>
                  </div>
                );

                return (
                  <div key={site.id} className="hover:bg-slate-800/30 transition-colors">

                    {/* ── Mobile card (<md) ── */}
                    <div className="md:hidden px-4 py-3 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{site.name}</p>
                          <p className="text-[11px] text-slate-500 truncate font-mono">/{site.slug}</p>
                        </div>
                        <div className="shrink-0">{statusBadge}</div>
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={avatarUrl({ ownerAvatar: site.ownerAvatar, ownerName: site.ownerName })}
                          alt=""
                          className="w-6 h-6 rounded-full border border-slate-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="text-xs text-slate-300 truncate">{site.ownerName}</p>
                          <p className="text-[11px] text-slate-500 truncate">{site.ownerEmail}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[11px] text-slate-500">Tạo: {fmtDateTime(site.createdAt)}</p>
                        {actions}
                      </div>
                    </div>

                    {/* ── Desktop row (md+) ── */}
                    <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_200px_110px_150px] lg:grid-cols-[minmax(0,1fr)_200px_130px_110px_150px] xl:grid-cols-[minmax(0,1fr)_200px_120px_130px_110px_150px] gap-3 items-center px-5 py-3">
                      {/* Site info */}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{site.name}</p>
                        <p className="text-[11px] text-slate-500 truncate font-mono">/{site.slug}</p>
                      </div>

                      {/* Owner: tên + email */}
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={avatarUrl({ ownerAvatar: site.ownerAvatar, ownerName: site.ownerName })}
                          alt=""
                          className="w-6 h-6 rounded-full border border-slate-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="text-xs text-slate-300 truncate">{site.ownerName}</p>
                          <p className="text-[11px] text-slate-500 truncate" title={site.ownerEmail}>{site.ownerEmail}</p>
                        </div>
                      </div>

                      {/* Template — chỉ hiện xl+ */}
                      <span className="hidden xl:block text-[11px] text-slate-500 truncate">{site.templateId}</span>

                      {/* Ngày giờ tạo — chỉ hiện lg+ */}
                      <span className="hidden lg:block text-[11px] text-slate-400 tabular-nums" title={`Cập nhật: ${fmtDateTime(site.updatedAt)}`}>
                        {fmtDateTime(site.createdAt)}
                      </span>

                      {/* Status */}
                      <div>{statusBadge}</div>

                      {/* Actions */}
                      {actions}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalSitesPages > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 border-t border-slate-800">
                <p className="text-[11px] text-slate-500">
                  Trang {sitesPage}/{totalSitesPages} · {sitesTotal} website
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSitesPage(sitesPage - 1)}
                    disabled={sitesPage <= 1}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    ← Trước
                  </button>
                  {Array.from({ length: Math.min(totalSitesPages, 5) }, (_, i) => {
                    let page: number;
                    if (totalSitesPages <= 5) {
                      page = i + 1;
                    } else if (sitesPage <= 3) {
                      page = i + 1;
                    } else if (sitesPage >= totalSitesPages - 2) {
                      page = totalSitesPages - 4 + i;
                    } else {
                      page = sitesPage - 2 + i;
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => handleSitesPage(page)}
                        className={`w-7 h-7 text-[11px] font-medium rounded-lg transition-colors cursor-pointer ${
                          page === sitesPage
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handleSitesPage(sitesPage + 1)}
                    disabled={sitesPage >= totalSitesPages}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    Sau →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── Người dùng mới nhất ── */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-[#60a5fa]" />
              Người dùng mới nhất
            </h2>
            <button
              onClick={() => navigate(ROUTES.ADMIN_USERS)}
              className="flex items-center gap-1 text-xs text-[#60a5fa] hover:text-blue-300 transition-colors cursor-pointer"
            >
              Xem tất cả <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {recentUsers.length === 0 ? (
            <p className="text-center text-slate-500 text-sm py-10">Chưa có người dùng nào.</p>
          ) : (
            <div className="divide-y divide-slate-800">
              {recentUsers.map(u => (
                <div key={u.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-800/40 transition-colors">
                  <img
                    src={avatarUrl(u)}
                    alt=""
                    className="w-8 h-8 rounded-full border border-slate-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{u.name}</p>
                    <p className="text-xs text-slate-400 truncate">{u.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-300">{u.siteCount} website</p>
                    <p className="text-[11px] text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${PLAN_BADGE[u.plan]}`}>
                    {PLAN_LABEL[u.plan]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Doanh thu (PayOS) ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CreditCard className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-sm font-bold text-white">Doanh thu</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white tabular-nums">{fmtVnd(stats.revenue.last30Days)}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">30 ngày qua</p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-300 tabular-nums">{fmtVnd(stats.revenue.allTime)}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Tổng cộng</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-300 tabular-nums">{nf(stats.revenue.activeSubscriptions)}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Thuê bao hoạt động</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

