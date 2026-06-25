import { useState, useMemo } from 'react';
import { CheckCircle2, Clock, XCircle, RefreshCw, ChevronDown, Search } from 'lucide-react';
import { TRANSACTIONS, ADMIN_STATS, METHOD_LABEL, TxStatus, PayMethod } from '../../../data/adminData';

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

const TX_STATUS: Record<TxStatus, { label: string; cls: string; bar: string; Icon: typeof CheckCircle2 }> = {
  success:  { label: 'Thành công',  cls: 'bg-emerald-500/10 text-emerald-400', bar: 'bg-emerald-500', Icon: CheckCircle2 },
  pending:  { label: 'Đang chờ',    cls: 'bg-amber-500/10  text-amber-400',    bar: 'bg-amber-500',   Icon: Clock },
  failed:   { label: 'Thất bại',    cls: 'bg-rose-500/10   text-rose-400',     bar: 'bg-rose-500',    Icon: XCircle },
  refunded: { label: 'Hoàn tiền',   cls: 'bg-slate-500/20  text-slate-400',    bar: 'bg-slate-500',   Icon: RefreshCw },
};

const STATS_CARDS = [
  {
    label: 'Tổng thu',
    value: fmt(ADMIN_STATS.totalRevenue),
    sub: `${TRANSACTIONS.filter(t => t.status === 'success').length} giao dịch thành công`,
    cls: 'text-emerald-400',
  },
  {
    label: 'Đang chờ xác nhận',
    value: fmt(ADMIN_STATS.pendingRevenue),
    sub: `${TRANSACTIONS.filter(t => t.status === 'pending').length} giao dịch`,
    cls: 'text-amber-400',
  },
  {
    label: 'Giao dịch lỗi',
    value: `${ADMIN_STATS.failedTx} giao dịch`,
    sub: 'Cần theo dõi và xử lý',
    cls: 'text-rose-400',
  },
  {
    label: 'Đã hoàn tiền',
    value: fmt(ADMIN_STATS.refundedAmount),
    sub: `${TRANSACTIONS.filter(t => t.status === 'refunded').length} đơn hoàn`,
    cls: 'text-slate-400',
  },
];

export default function PaymentsPage() {
  const [q, setQ] = useState('');
  const [filterStatus, setFilterStatus] = useState<TxStatus | 'all'>('all');
  const [filterMethod, setFilterMethod] = useState<PayMethod | 'all'>('all');

  const filtered = useMemo(() => TRANSACTIONS.filter(t => {
    const matchQ = !q || t.userName.toLowerCase().includes(q.toLowerCase()) || t.userEmail.toLowerCase().includes(q.toLowerCase());
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchMethod = filterMethod === 'all' || t.method === filterMethod;
    return matchQ && matchStatus && matchMethod;
  }), [q, filterStatus, filterMethod]);

  const totalFiltered = filtered.reduce((s, t) => t.status === 'success' ? s + t.amount : s, 0);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Quản lý thanh toán</h1>
        <p className="text-sm text-slate-400 mt-0.5">Theo dõi tất cả giao dịch thanh toán trong hệ thống</p>
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

      {/* Status distribution */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Phân bổ trạng thái giao dịch</p>
        <div className="flex gap-1.5 h-2 rounded-full overflow-hidden mb-3">
          {(['success', 'pending', 'failed', 'refunded'] as TxStatus[]).map(s => {
            const count = TRANSACTIONS.filter(t => t.status === s).length;
            return (
              <div
                key={s}
                className={`${TX_STATUS[s].bar} rounded-full transition-all`}
                style={{ width: `${(count / TRANSACTIONS.length) * 100}%` }}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4">
          {(['success', 'pending', 'failed', 'refunded'] as TxStatus[]).map(s => {
            const count = TRANSACTIONS.filter(t => t.status === s).length;
            const { label, bar } = TX_STATUS[s];
            return (
              <div key={s} className="flex items-center gap-2 text-xs">
                <span className={`w-2 h-2 rounded-full ${bar}`} />
                <span className="text-slate-400">{label}</span>
                <span className="text-white font-bold">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Tìm tên khách hàng hoặc email..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#0056b3] transition-all"
          />
        </div>
        {[
          {
            value: filterStatus, set: setFilterStatus,
            opts: [['all', 'Tất cả trạng thái'], ['success', 'Thành công'], ['pending', 'Đang chờ'], ['failed', 'Thất bại'], ['refunded', 'Hoàn tiền']],
          },
          {
            value: filterMethod, set: setFilterMethod,
            opts: [['all', 'Tất cả phương thức'], ['bank_transfer', 'Chuyển khoản'], ['momo', 'MoMo'], ['vnpay', 'VNPay'], ['zalopay', 'ZaloPay']],
          },
        ].map(({ value, set, opts }, i) => (
          <div key={i} className="relative">
            <select
              value={value}
              onChange={e => (set as (v: string) => void)(e.target.value)}
              className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-[#0056b3] cursor-pointer transition-all"
            >
              {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Result summary */}
      {(q || filterStatus !== 'all' || filterMethod !== 'all') && (
        <p className="text-sm text-slate-400">
          Tìm thấy <span className="text-white font-semibold">{filtered.length}</span> giao dịch
          {filtered.length > 0 && <> · Tổng thu lọc: <span className="text-emerald-400 font-semibold">{fmt(totalFiltered)}</span></>}
        </p>
      )}

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Khách hàng', 'Gói dịch vụ', 'Số tiền', 'Phương thức', 'Trạng thái', 'Thời gian', 'Ghi chú'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-slate-500 text-sm py-12">
                    Không có giao dịch phù hợp
                  </td>
                </tr>
              ) : filtered.map(tx => {
                const s = TX_STATUS[tx.status];
                const SIcon = s.Icon;
                return (
                  <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={tx.userAvatar} alt="" className="w-7 h-7 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer" />
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate text-xs">{tx.userName}</p>
                          <p className="text-[10px] text-slate-400 truncate">{tx.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 whitespace-nowrap text-xs">{tx.planLabel}</td>
                    <td className="px-5 py-3.5 font-bold text-white whitespace-nowrap">{fmt(tx.amount)}</td>
                    <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap text-xs">{METHOD_LABEL(tx.method)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1.5 w-fit text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${s.cls}`}>
                        <SIcon className="h-3 w-3" />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(tx.paidAt).toLocaleString('vi-VN', {
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
      </div>
    </div>
  );
}
