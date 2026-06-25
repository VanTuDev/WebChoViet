import { useState, useMemo } from 'react';
import {
  CheckCircle2, Clock, XCircle, RefreshCw,
  ChevronDown, Search, ArrowRight,
} from 'lucide-react';
import { TRANSACTIONS, METHOD_LABEL, TxStatus, PayMethod } from '../../../data/adminData';

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

const TX_STATUS: Record<TxStatus, { label: string; cls: string; dot: string; Icon: typeof CheckCircle2 }> = {
  success:  { label: 'Thành công', cls: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-500', Icon: CheckCircle2 },
  pending:  { label: 'Đang chờ',   cls: 'bg-amber-500/10  text-amber-400',    dot: 'bg-amber-500',   Icon: Clock },
  failed:   { label: 'Thất bại',   cls: 'bg-rose-500/10   text-rose-400',     dot: 'bg-rose-500',    Icon: XCircle },
  refunded: { label: 'Hoàn tiền',  cls: 'bg-slate-500/20  text-slate-400',    dot: 'bg-slate-500',   Icon: RefreshCw },
};

function groupByDate(txs: typeof TRANSACTIONS) {
  const map: Record<string, typeof TRANSACTIONS> = {};
  txs.forEach(tx => {
    const key = new Date(tx.paidAt).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    if (!map[key]) map[key] = [];
    map[key].push(tx);
  });
  return Object.entries(map).sort((a, b) =>
    new Date(b[1][0].paidAt).getTime() - new Date(a[1][0].paidAt).getTime()
  );
}

export default function TransactionsPage() {
  const [q, setQ] = useState('');
  const [filterStatus, setFilterStatus] = useState<TxStatus | 'all'>('all');
  const [filterMethod, setFilterMethod] = useState<PayMethod | 'all'>('all');

  const filtered = useMemo(() => {
    const sorted = [...TRANSACTIONS].sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime());
    return sorted.filter(t => {
      const matchQ = !q || t.userName.toLowerCase().includes(q.toLowerCase()) || t.userEmail.toLowerCase().includes(q.toLowerCase()) || t.id.includes(q);
      const matchStatus = filterStatus === 'all' || t.status === filterStatus;
      const matchMethod = filterMethod === 'all' || t.method === filterMethod;
      return matchQ && matchStatus && matchMethod;
    });
  }, [q, filterStatus, filterMethod]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Dòng tiền</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Lịch sử tất cả giao dịch — ai thanh toán gói gì, bao nhiêu, vào lúc nào
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Tìm tên, email hoặc mã giao dịch..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#0056b3] transition-all"
          />
        </div>
        {[
          {
            val: filterStatus, set: setFilterStatus,
            opts: [['all', 'Tất cả trạng thái'], ['success', 'Thành công'], ['pending', 'Đang chờ'], ['failed', 'Thất bại'], ['refunded', 'Hoàn tiền']],
          },
          {
            val: filterMethod, set: setFilterMethod,
            opts: [['all', 'Tất cả hình thức'], ['bank_transfer', 'Chuyển khoản'], ['momo', 'MoMo'], ['vnpay', 'VNPay'], ['zalopay', 'ZaloPay']],
          },
        ].map(({ val, set, opts }, i) => (
          <div key={i} className="relative">
            <select
              value={val}
              onChange={e => (set as (v: string) => void)(e.target.value)}
              className="appearance-none bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl pl-4 pr-8 py-2.5 focus:outline-none focus:border-[#0056b3] cursor-pointer transition-all"
            >
              {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Summary row */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-slate-400">{filtered.length} giao dịch</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
        <span className="text-emerald-400 font-semibold">
          {fmt(filtered.filter(t => t.status === 'success').reduce((s, t) => s + t.amount, 0))} đã thu
        </span>
        {filtered.some(t => t.status === 'pending') && (
          <>
            <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-amber-400 font-semibold">
              {fmt(filtered.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0))} chờ xử lý
            </span>
          </>
        )}
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
          Không tìm thấy giao dịch nào
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([dateLabel, txs]) => (
            <div key={dateLabel}>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full">
                  {dateLabel}
                </span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              {/* Transaction cards for this date */}
              <div className="space-y-3 pl-4 relative">
                {/* vertical timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-800" />

                {txs.map(tx => {
                  const s = TX_STATUS[tx.status];
                  const SIcon = s.Icon;
                  return (
                    <div key={tx.id} className="relative flex gap-4">
                      {/* Timeline dot */}
                      <div className="shrink-0 -ml-[5px] mt-4 flex flex-col items-center">
                        <div className={`w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${s.dot}`} />
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 hover:border-slate-700 transition-colors">
                        <div className="flex flex-wrap items-start gap-3">
                          {/* User */}
                          <div className="flex items-center gap-3 flex-1 min-w-[180px]">
                            <img
                              src={tx.userAvatar} alt=""
                              className="w-9 h-9 rounded-full border border-slate-700 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-white text-sm truncate">{tx.userName}</p>
                              <p className="text-xs text-slate-400 truncate">{tx.userEmail}</p>
                            </div>
                          </div>

                          {/* Transaction info */}
                          <div className="flex flex-wrap items-center gap-3 shrink-0">
                            {/* Plan badge */}
                            <div className="text-right">
                              <p className="text-[11px] text-slate-500">Gói dịch vụ</p>
                              <p className="text-xs font-semibold text-white">{tx.planLabel}</p>
                            </div>
                            <div className="w-px h-8 bg-slate-800" />

                            {/* Method */}
                            <div className="text-right">
                              <p className="text-[11px] text-slate-500">Hình thức</p>
                              <p className="text-xs font-semibold text-white">{METHOD_LABEL(tx.method)}</p>
                            </div>
                            <div className="w-px h-8 bg-slate-800" />

                            {/* Amount */}
                            <div className="text-right">
                              <p className="text-[11px] text-slate-500">Số tiền</p>
                              <p className="text-base font-bold text-white">{fmt(tx.amount)}</p>
                            </div>
                            <div className="w-px h-8 bg-slate-800" />

                            {/* Status */}
                            <span className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${s.cls}`}>
                              <SIcon className="h-3.5 w-3.5" />
                              {s.label}
                            </span>
                          </div>
                        </div>

                        {/* Bottom row */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80">
                          <span className="text-[10px] font-mono text-slate-600">#{tx.id.toUpperCase()}</span>
                          <div className="flex items-center gap-3">
                            {tx.note && (
                              <span className="text-[11px] text-amber-400/80 italic">{tx.note}</span>
                            )}
                            <span className="text-[11px] text-slate-500">
                              {new Date(tx.paidAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
