import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, XCircle, RefreshCw, ChevronDown, Search, Loader2, AlertCircle } from 'lucide-react';
import { fetchAdminPayments, type AdminPaymentListItem, type AdminPaymentTotals } from '../../../services/adminService';

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';
const PLAN_LABEL: Record<string, string> = { pro: 'Kinh Doanh WebPro', ultra: 'Thương Hiệu Ultra' };
const CYCLE_LABEL: Record<string, string> = { monthly: 'Hàng tháng', yearly: 'Hàng năm' };

type TxStatus = 'pending' | 'success' | 'failed' | 'refunded';

const TX_STATUS: Record<TxStatus, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  success:  { label: 'Thành công', cls: 'bg-emerald-500/10 text-emerald-400', Icon: CheckCircle2 },
  pending:  { label: 'Đang chờ',   cls: 'bg-amber-500/10  text-amber-400',    Icon: Clock },
  failed:   { label: 'Thất bại',   cls: 'bg-rose-500/10   text-rose-400',     Icon: XCircle },
  refunded: { label: 'Hoàn tiền',  cls: 'bg-slate-500/20  text-slate-400',    Icon: RefreshCw },
};

const EMPTY_TOTALS: AdminPaymentTotals = { successAmount: 0, pendingAmount: 0, failedCount: 0, refundedAmount: 0 };
const PAGE_LIMIT = 20;

export default function PaymentsPage() {
  const [q, setQ] = useState('');
  const [filterStatus, setFilterStatus] = useState<TxStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<AdminPaymentListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totals, setTotals] = useState<AdminPaymentTotals>(EMPTY_TOTALS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    const handle = setTimeout(() => {
      fetchAdminPayments({
        search: q || undefined,
        status: filterStatus === 'all' ? undefined : filterStatus,
        page, limit: PAGE_LIMIT,
      })
        .then(res => {
          if (cancelled) return;
          setItems(res.items);
          setTotal(res.total);
          setTotals(res.totals);
        })
        .catch(err => { if (!cancelled) setError(err instanceof Error ? err.message : 'Không tải được dữ liệu.'); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 300);
    return () => { cancelled = true; clearTimeout(handle); };
  }, [q, filterStatus, page]);

  const handleSearch = (v: string) => { setQ(v); setPage(1); };
  const handleStatus = (v: TxStatus | 'all') => { setFilterStatus(v); setPage(1); };

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
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#0056b3] transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => handleStatus(e.target.value as TxStatus | 'all')}
            className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-[#0056b3] cursor-pointer transition-all"
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

      {error && (
        <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-2xl px-5 py-4">
          <AlertCircle className="h-5 w-5 shrink-0" /> {error}
        </div>
      )}

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
                <tr>
                  <td colSpan={7} className="text-center text-slate-500 text-sm py-12">
                    <Loader2 className="h-4 w-4 animate-spin inline mr-2" /> Đang tải...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-slate-500 text-sm py-12">
                    Không có giao dịch phù hợp
                  </td>
                </tr>
              ) : items.map(tx => {
                const s = TX_STATUS[tx.status];
                const SIcon = s.Icon;
                return (
                  <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={tx.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(tx.userName)}&background=0056b3&color=fff`}
                          alt="" className="w-7 h-7 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate text-xs">{tx.userName}</p>
                          <p className="text-[10px] text-slate-400 truncate">{tx.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 whitespace-nowrap text-xs">
                      {PLAN_LABEL[tx.plan] ?? tx.plan} · {CYCLE_LABEL[tx.billingCycle] ?? tx.billingCycle}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-white whitespace-nowrap">{fmt(tx.amount)}</td>
                    <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap text-xs font-mono">#{tx.orderCode}</td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1.5 w-fit text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${s.cls}`}>
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

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800">
            <p className="text-[11px] text-slate-500">Trang {page}/{totalPages} · {total} giao dịch</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                ← Trước
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Sau →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
