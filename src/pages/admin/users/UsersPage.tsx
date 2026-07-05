import { useState } from 'react';
import {
  Search, Ban, CheckCircle2, Users, ChevronDown, Loader2, ShieldCheck,
} from 'lucide-react';
import {
  fetchAdminUsers, toggleSuspendUser,
  AdminUserListItem,
} from '../../../services/adminService';
import { useAppContext } from '../../../store/AppContext';
import PlanBadge from '../../../components/shared/PlanBadge';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useFetchState } from '../../../hooks/useFetchState';
import LoadingState from '../../../components/common/LoadingState';
import EmptyState from '../../../components/common/EmptyState';
import ErrorBanner from '../../../components/common/ErrorBanner';
import Pagination from '../../../components/common/Pagination';
import { avatarUrl } from '../../../utils/avatar';

type PlanFilter = 'all' | 'free' | 'pro' | 'ultra';

const PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_MS = 400;

export default function UsersPage() {
  const { showSnackbar, showConfirm } = useAppContext();

  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [filterPlan, setFilterPlan] = useState<PlanFilter>('all');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Debounce chỉ áp dụng cho ô tìm kiếm — xóa hết ô tìm kiếm thì thấy lại danh sách ngay (delay=0)
  const debouncedQ = useDebouncedValue(q, q ? SEARCH_DEBOUNCE_MS : 0);

  const { data, loading, error, setData } = useFetchState(
    () => fetchAdminUsers({
      page,
      limit: PAGE_SIZE,
      search: debouncedQ.trim() || undefined,
      plan: filterPlan === 'all' ? undefined : filterPlan,
    }),
    [page, debouncedQ, filterPlan],
    'Không tải được danh sách.',
  );
  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  // Đổi search/filter → quay về trang 1
  const handleSearch = (val: string) => { setQ(val); setPage(1); };
  const handleFilterPlan = (val: PlanFilter) => { setFilterPlan(val); setPage(1); };

  const doToggleSuspend = async (u: AdminUserListItem) => {
    setTogglingId(u.id);
    try {
      const { isSuspended } = await toggleSuspendUser(u.id);
      setData(prev => prev && {
        ...prev,
        items: prev.items.map(item => (item.id === u.id ? { ...item, isSuspended } : item)),
      });
      showSnackbar(isSuspended ? `Đã khóa tài khoản ${u.email}.` : `Đã mở khóa tài khoản ${u.email}.`, 'success');
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Thao tác thất bại.', 'error');
    } finally {
      setTogglingId(null);
    }
  };

  const handleToggleSuspend = (u: AdminUserListItem) => {
    if (u.isSuspended) {
      doToggleSuspend(u); // mở khóa — thao tác an toàn, không cần confirm
      return;
    }
    showConfirm({
      title: 'Khóa tài khoản?',
      message: `${u.email} sẽ bị đăng xuất và không thể sử dụng hệ thống cho tới khi được mở khóa. Website đã xuất bản của họ vẫn hiển thị.`,
      confirmLabel: 'Khóa tài khoản',
      variant: 'danger',
      onConfirm: () => doToggleSuspend(u),
    });
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Người dùng</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          {loading ? 'Đang tải...' : `${total.toLocaleString('vi-VN')} tài khoản`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-55">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={q}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#0056b3] transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={filterPlan}
            onChange={e => handleFilterPlan(e.target.value as PlanFilter)}
            className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-[#0056b3] cursor-pointer transition-all"
          >
            <option value="all">Tất cả gói</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="ultra">Ultra</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Error */}
      {error && <ErrorBanner message={error} />}

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Người dùng', 'Gói', 'Vai trò', 'Trạng thái', 'Websites', 'Ngày tham gia', 'Thao tác'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <LoadingState variant="row" colSpan={7} message="Đang tải danh sách..." />
              ) : items.length === 0 ? (
                <EmptyState variant="row" colSpan={7} icon={Users} message="Không tìm thấy người dùng nào" />
              ) : items.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={avatarUrl(u.name, u.avatar)} alt="" className="w-8 h-8 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer" />
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">{u.name}</p>
                        <p className="text-xs text-slate-400 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <PlanBadge plan={u.plan} variant="dark" />
                  </td>
                  <td className="px-5 py-3.5">
                    {u.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0056b3]/20 text-[#60a5fa]">
                        <ShieldCheck className="h-3 w-3" /> Admin
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Thành viên</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      u.isSuspended ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {u.isSuspended ? 'Tạm khóa' : 'Hoạt động'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-300">{u.siteCount}</td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs">
                    {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-5 py-3.5">
                    {/* Không cho tự khóa admin khác từ UI — thao tác nhạy cảm, làm thẳng trong DB nếu thật sự cần */}
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleToggleSuspend(u)}
                        disabled={togglingId === u.id}
                        title={u.isSuspended ? 'Mở khóa' : 'Tạm khóa'}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 ${
                          u.isSuspended
                            ? 'text-emerald-400 hover:bg-emerald-500/10'
                            : 'text-amber-400 hover:bg-amber-500/10'
                        }`}
                      >
                        {togglingId === u.id
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          : u.isSuspended ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} total={total} itemLabel="tài khoản" onChange={setPage} disabled={loading} />
      </div>
    </div>
  );
}
