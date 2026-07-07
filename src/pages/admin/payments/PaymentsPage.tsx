import { useState } from 'react';
import { Search, ChevronDown, Receipt } from 'lucide-react';
import { fetchAdminPayments, type AdminPaymentTotals } from '../../../services/adminService';
import { PAYMENT_STATUS_META, PLAN_PURCHASE_LABEL, type PaymentStatus } from '../../../utils/paymentDisplay';
import { avatarUrl } from '../../../utils/avatar';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useFetchState } from '../../../hooks/useFetchState';
import LoadingState from '../../../components/common/LoadingState';
import EmptyState from '../../../components/common/EmptyState';
import ErrorBanner from '../../../components/common/ErrorBanner';
import Pagination from '../../../components/common/Pagination';

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';
const CYCLE_LABEL: Record<string, string> = { monthly: 'Hàng tháng', yearly: 'Hàng năm' };

const EMPTY_TOTALS: AdminPaymentTotals = { successAmount: 0, pendingAmount: 0, failedCount: 0, refundedAmount: 0 };
const PAGE_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 300;

export default function PaymentsPage() {
  const [q, setQ] = useState('');
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const debouncedQ = useDebouncedValue(q, q ? SEARCH_DEBOUNCE_MS : 0);

  const { data, loading, error } = useFetchState(
    () => fetchAdminPayments({
      search: debouncedQ || undefined,
      status: filterStatus === 'all' ? undefined : filterStatus,
      page, limit: PAGE_LIMIT,
    }),
    [debouncedQ, filterStatus, page],
  );
  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totals = data?.totals ?? EMPTY_TOTALS;

  const handleSearch = (v: string) => { setQ(v); setPage(1); };
  const handleStatus = (v: PaymentStatus | 'all') => { setFilterStatus(v); setPage(1); };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT));

  const STATS_CARDS = [
    { label: 'Tổng thu', value: fmt(totals.successAmount), sub: 'Giao dịch thành công', cls: 'text-emerald-400' },
    { label: 'Đang chờ xác nhận', value: fmt(totals.pendingAmount), sub: 'Giao dịch pending', cls: 'text-amber-400' },
    { label: 'Giao dịch lỗi', value: `${totals.failedCount} giao dịch`, sub: 'Cần theo dõi và xử lý', cls: 'text-rose-400' },
    { label: 'Đã hoàn tiền', value: fmt(totals.refundedAmount), sub: 'Xử lý thủ công', cls: 'text-slate-400' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Quản lý thanh toán</h1>
        <p className="text-sm text-slate-400 mt-0.5">Theo dõi tất cả giao dịch thanh toán qua PayOS</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS_CARDS.map(({ label, value, sub, cls }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className={`text-xl font-bold ${cls}`}>{value}</p>
            <p className="text-xs font-semibold text-white mt-1">{label}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={q}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Tìm tên khách hàng hoặc email..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-primary-container transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => handleStatus(e.target.value as PaymentStatus | 'all')}
            className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-primary-container cursor-pointer transition-all"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="success">Thành công</option>
            <option value="pending">Đang chờ</option>
            <option value="failed">Thất bại</option>
            <option value="refunded">Hoàn tiền</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {error && <ErrorBanner message={error} />}

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Khách hàng', 'Gói dịch vụ', 'Số tiền', 'Mã đơn hàng', 'Trạng thái', 'Thời gian', 'Ghi chú'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <LoadingState variant="row" colSpan={7} />
              ) : items.length === 0 ? (
                <EmptyState variant="row" colSpan={7} icon={Receipt} message="Không có giao dịch phù hợp" />
              ) : items.map(tx => {
                const s = PAYMENT_STATUS_META[tx.status];
                const SIcon = s.icon;
                return (
                  <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={avatarUrl(tx.userName, tx.userAvatar)}
                          alt="" className="w-7 h-7 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate text-xs">{tx.userName}</p>
                          <p className="text-[10px] text-slate-400 truncate">{tx.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 whitespace-nowrap text-xs">
                      {PLAN_PURCHASE_LABEL[tx.plan] ?? tx.plan} · {CYCLE_LABEL[tx.billingCycle] ?? tx.billingCycle}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-white whitespace-nowrap">{fmt(tx.amount)}</td>
                    <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap text-xs font-mono">#{tx.orderCode}</td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1.5 w-fit text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${s.className}`}>
                        <SIcon className="h-3 w-3" />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(tx.paidAt ?? tx.createdAt).toLocaleString('vi-VN', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs max-w-[140px] truncate">
                      {tx.note ?? '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} total={total} itemLabel="giao dịch" onChange={setPage} disabled={loading} />
      </div>
    </div>
  );
}
