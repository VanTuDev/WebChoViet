import { useMemo, useState } from 'react';
import { ChevronDown, Search, Receipt, Users, Info, ChevronRight } from 'lucide-react';
import {
  fetchAdminPayments, fetchAdminPaymentsByUser, fetchPlatformAnalytics,
  type AdminPaymentListItem, type AdminUserCashFlowItem, type AdminPaymentTotals,
} from '../../../services/adminService';
import { PAYMENT_STATUS_META, formatTransactionItemLabel, type PaymentStatus } from '../../../utils/paymentDisplay';
import { avatarUrl } from '../../../utils/avatar';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useFetchState } from '../../../hooks/useFetchState';
import LoadingState from '../../../components/common/LoadingState';
import EmptyState from '../../../components/common/EmptyState';
import ErrorBanner from '../../../components/common/ErrorBanner';
import Pagination from '../../../components/common/Pagination';
import { TimeSeriesChart, CHART_COLORS } from '../analytics/_components/charts';
import PlanBadge from '../../../components/shared/PlanBadge';

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';
const nf = (n: number) => n.toLocaleString('vi-VN');
const fmtDateTime = (iso: string | Date) =>
  new Date(iso).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const PAGE_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 300;
const EMPTY_TOTALS: AdminPaymentTotals = { successAmount: 0, pendingAmount: 0, failedCount: 0, refundedAmount: 0 };

type ViewMode = 'flat' | 'byUser';

export default function TransactionsPage() {
  const [view, setView] = useState<ViewMode>('flat');
  const [q, setQ] = useState('');
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | 'all'>('all');
  const [flatPage, setFlatPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const debouncedQ = useDebouncedValue(q, q ? SEARCH_DEBOUNCE_MS : 0);

  const handleSearch = (v: string) => { setQ(v); setFlatPage(1); setUserPage(1); };
  const handleStatus = (v: PaymentStatus | 'all') => { setFilterStatus(v); setFlatPage(1); };
  const goToUser = (email: string) => { setQ(email); setFilterStatus('all'); setFlatPage(1); setView('flat'); };

  // Tổng quan toàn hệ thống (không phụ thuộc filter/trang hiện tại) — cho 4 thẻ KPI luôn ổn định
  const { data: overview } = useFetchState(() => fetchAdminPayments({ page: 1, limit: 1 }), []);
  const totals = overview?.totals ?? EMPTY_TOTALS;

  // Biểu đồ thu nhập 30 ngày — tách nguồn subscription/template, dùng chung API Analytics đã có sẵn
  const { data: analytics } = useFetchState(() => fetchPlatformAnalytics(30), []);

  const { data: flatData, loading: flatLoading, error: flatError } = useFetchState(
    () => fetchAdminPayments({
      search: debouncedQ || undefined,
      status: filterStatus === 'all' ? undefined : filterStatus,
      page: flatPage, limit: PAGE_LIMIT,
    }),
    [debouncedQ, filterStatus, flatPage],
  );
  const flatItems = flatData?.items ?? [];
  const flatTotalPages = Math.max(1, Math.ceil((flatData?.total ?? 0) / PAGE_LIMIT));

  const { data: userData, loading: userLoading, error: userError } = useFetchState(
    () => fetchAdminPaymentsByUser({ search: debouncedQ || undefined, page: userPage, limit: PAGE_LIMIT }),
    [debouncedQ, userPage],
  );
  const userItems = userData?.items ?? [];
  const userTotalPages = Math.max(1, Math.ceil((userData?.total ?? 0) / PAGE_LIMIT));

  const chartDates = useMemo(() => analytics?.dailyRevenue.map(d => d.date) ?? [], [analytics]);

  const STATS_CARDS = [
    { label: 'Tổng đã thu', value: fmt(totals.successAmount), sub: 'Giao dịch thành công', cls: 'text-emerald-400' },
    { label: 'Đang chờ xử lý', value: fmt(totals.pendingAmount), sub: 'Tự hủy sau 30 phút', cls: 'text-amber-400' },
    { label: 'Thất bại / đã hủy', value: `${nf(totals.failedCount)} đơn`, sub: 'Bao gồm đơn quá hạn thanh toán', cls: 'text-rose-400' },
    { label: 'Đã hoàn tiền', value: fmt(totals.refundedAmount), sub: 'Xử lý thủ công', cls: 'text-slate-400' },
  ];

  const STATUS_OPTIONS: { value: PaymentStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'success', label: 'Thành công' },
    { value: 'pending', label: 'Đang chờ' },
    { value: 'failed', label: 'Thất bại' },
    { value: 'refunded', label: 'Hoàn tiền' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-white">Dòng tiền</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Toàn bộ giao dịch PayOS — ai thanh toán gói/template gì, bao nhiêu, vào lúc nào — gộp theo giao dịch hoặc theo từng người dùng
        </p>
      </div>

      {/* Banner tự hủy 30 phút */}
      <div className="flex items-start gap-2.5 bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs rounded-2xl px-4 py-3">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          Đơn hàng ở trạng thái <span className="font-semibold">Đang chờ</span> quá 30 phút mà chưa thanh toán sẽ được hệ thống
          tự động chuyển sang <span className="font-semibold">Thất bại</span> (kèm ghi chú "Tự động hủy") — tránh treo đơn ảo
          làm sai lệch số liệu dòng tiền.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS_CARDS.map(({ label, value, sub, cls }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className={`text-xl font-bold ${cls}`}>{value}</p>
            <p className="text-xs font-semibold text-white mt-1">{label}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Income chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-white mb-4">Thu nhập 30 ngày qua</h2>
        {!analytics ? (
          <LoadingState />
        ) : (
          <TimeSeriesChart
            dates={chartDates}
            series={[
              { name: 'Gói dịch vụ', color: CHART_COLORS.blue, values: analytics.dailyRevenue.map(d => d.subscriptionAmount) },
              { name: 'Template', color: CHART_COLORS.aqua, values: analytics.dailyRevenue.map(d => d.templateAmount) },
            ]}
          />
        )}
      </div>

      {/* View toggle + filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex bg-slate-900 border border-slate-800 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setView('flat')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              view === 'flat' ? 'bg-primary-container text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Receipt className="h-3.5 w-3.5" />
            Theo giao dịch
          </button>
          <button
            onClick={() => setView('byUser')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              view === 'byUser' ? 'bg-primary-container text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            Theo người dùng
          </button>
        </div>

        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={q}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Tìm tên hoặc email khách hàng..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-primary-container transition-all"
          />
        </div>

        {view === 'flat' && (
          <div className="relative">
            <select
              value={filterStatus}
              onChange={e => handleStatus(e.target.value as PaymentStatus | 'all')}
              className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-primary-container cursor-pointer transition-all"
            >
              {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        )}
      </div>

      {/* ── Bảng dữ liệu dạng cột (kiểu Excel) ── */}
      {view === 'flat' ? (
        <>
          {flatError && <ErrorBanner message={flatError} />}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-auto max-h-[640px]">
              <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-950">
                    {['Người dùng', 'Loại', 'Sản phẩm', 'Mã đơn', 'Số tiền', 'Trạng thái', 'Thời gian', 'Ghi chú'].map(h => (
                      <th key={h} className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 whitespace-nowrap border-b border-r border-slate-800 last:border-r-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {flatLoading ? (
                    <LoadingState variant="row" colSpan={8} />
                  ) : flatItems.length === 0 ? (
                    <EmptyState variant="row" colSpan={8} icon={Receipt} message="Không tìm thấy giao dịch nào" />
                  ) : flatItems.map((tx: AdminPaymentListItem) => {
                    const s = PAYMENT_STATUS_META[tx.status];
                    const SIcon = s.icon;
                    return (
                      <tr key={tx.id} className="odd:bg-slate-900 even:bg-slate-900/60 hover:bg-slate-800/60 transition-colors">
                        <td className="px-4 py-2.5 border-b border-r border-slate-800/80">
                          <button
                            onClick={() => goToUser(tx.userEmail)}
                            title={`ID: ${tx.userId}`}
                            className="flex items-center gap-2.5 min-w-0 cursor-pointer text-left"
                          >
                            <img src={avatarUrl(tx.userName, tx.userAvatar)} alt="" className="w-7 h-7 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer" />
                            <span className="min-w-0">
                              <span className="block font-medium text-white truncate text-xs">{tx.userName}</span>
                              <span className="block text-[10px] text-slate-500 truncate">{tx.userEmail}</span>
                            </span>
                          </button>
                        </td>
                        <td className="px-4 py-2.5 border-b border-r border-slate-800/80 text-slate-400 text-xs whitespace-nowrap">
                          {tx.kind === 'template' ? 'Template' : 'Gói dịch vụ'}
                        </td>
                        <td className="px-4 py-2.5 border-b border-r border-slate-800/80 text-slate-300 text-xs whitespace-nowrap">
                          {formatTransactionItemLabel(tx.kind, tx.itemLabel)}
                        </td>
                        <td className="px-4 py-2.5 border-b border-r border-slate-800/80 text-slate-400 text-xs font-mono whitespace-nowrap">#{tx.orderCode}</td>
                        <td className="px-4 py-2.5 border-b border-r border-slate-800/80 font-bold text-white text-right tabular-nums whitespace-nowrap">{fmt(tx.amount)}</td>
                        <td className="px-4 py-2.5 border-b border-r border-slate-800/80">
                          <span className={`flex items-center gap-1.5 w-fit text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${s.className}`}>
                            <SIcon className="h-3 w-3" />
                            {s.label}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 border-b border-r border-slate-800/80 text-slate-400 text-xs whitespace-nowrap tabular-nums">
                          {fmtDateTime(tx.paidAt ?? tx.createdAt)}
                        </td>
                        <td className="px-4 py-2.5 border-b border-slate-800/80 text-slate-500 text-xs max-w-[200px] truncate">
                          {tx.note ?? '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination page={flatPage} totalPages={flatTotalPages} total={flatData?.total ?? 0} itemLabel="giao dịch" onChange={setFlatPage} disabled={flatLoading} />
          </div>
        </>
      ) : (
        <>
          {userError && <ErrorBanner message={userError} />}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-auto max-h-[640px]">
              <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-950">
                    {['Người dùng', 'Gói', 'Số đơn', 'Đã thu', 'Đang chờ', 'Thất bại', 'Đơn gần nhất', ''].map(h => (
                      <th key={h} className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 whitespace-nowrap border-b border-r border-slate-800 last:border-r-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {userLoading ? (
                    <LoadingState variant="row" colSpan={8} />
                  ) : userItems.length === 0 ? (
                    <EmptyState variant="row" colSpan={8} icon={Users} message="Không tìm thấy người dùng nào" />
                  ) : userItems.map((u: AdminUserCashFlowItem) => (
                    <tr key={u.userId} className="odd:bg-slate-900 even:bg-slate-900/60 hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-2.5 border-b border-r border-slate-800/80">
                        <div className="flex items-center gap-2.5 min-w-0" title={`ID: ${u.userId}`}>
                          <img src={avatarUrl(u.userName, u.userAvatar)} alt="" className="w-7 h-7 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer" />
                          <span className="min-w-0">
                            <span className="block font-medium text-white truncate text-xs">{u.userName}</span>
                            <span className="block text-[10px] text-slate-500 truncate">{u.userEmail}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 border-b border-r border-slate-800/80"><PlanBadge plan={u.plan} variant="dark" /></td>
                      <td className="px-4 py-2.5 border-b border-r border-slate-800/80 text-slate-300 text-xs text-right tabular-nums">{nf(u.orderCount)}</td>
                      <td className="px-4 py-2.5 border-b border-r border-slate-800/80 font-bold text-emerald-400 text-right tabular-nums whitespace-nowrap">{fmt(u.successAmount)}</td>
                      <td className="px-4 py-2.5 border-b border-r border-slate-800/80 text-amber-400 text-right tabular-nums whitespace-nowrap">
                        {u.pendingCount > 0 ? fmt(u.pendingAmount) : '—'}
                      </td>
                      <td className="px-4 py-2.5 border-b border-r border-slate-800/80 text-rose-400 text-right tabular-nums">
                        {u.failedCount > 0 ? nf(u.failedCount) : '—'}
                      </td>
                      <td className="px-4 py-2.5 border-b border-r border-slate-800/80 text-slate-400 text-xs whitespace-nowrap tabular-nums">
                        {fmtDateTime(u.lastOrderAt)}
                      </td>
                      <td className="px-4 py-2.5 border-b border-slate-800/80">
                        <button
                          onClick={() => goToUser(u.userEmail)}
                          className="flex items-center gap-1 text-[11px] font-medium text-primary-container hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Xem giao dịch <ChevronRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={userPage} totalPages={userTotalPages} total={userData?.total ?? 0} itemLabel="người dùng" onChange={setUserPage} disabled={userLoading} />
          </div>
        </>
      )}
    </div>
  );
}
