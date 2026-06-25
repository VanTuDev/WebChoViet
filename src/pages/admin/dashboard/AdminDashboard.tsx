import { useNavigate } from 'react-router-dom';
import {
  Users, TrendingUp, CreditCard, AlertTriangle,
  ArrowUpRight, ArrowRight, CheckCircle2, Clock, XCircle, RefreshCw,
} from 'lucide-react';
import { ADMIN_STATS, ADMIN_USERS, TRANSACTIONS, METHOD_LABEL } from '../../../data/adminData';
import { ROUTES } from '../../../config/routes';

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

const TX_STATUS = {
  success:  { label: 'Thành công',   cls: 'bg-emerald-500/10 text-emerald-400', Icon: CheckCircle2 },
  pending:  { label: 'Đang chờ',     cls: 'bg-amber-500/10  text-amber-400',    Icon: Clock },
  failed:   { label: 'Thất bại',     cls: 'bg-rose-500/10   text-rose-400',     Icon: XCircle },
  refunded: { label: 'Hoàn tiền',    cls: 'bg-slate-500/20  text-slate-400',    Icon: RefreshCw },
};

const KPI = [
  {
    label: 'Tổng người dùng',
    value: ADMIN_STATS.totalUsers,
    sub: `${ADMIN_STATS.activeUsers} đang hoạt động`,
    Icon: Users,
    color: '#60a5fa',
    bg: '#1e3a5f',
    trend: '+12% so với tháng trước',
  },
  {
    label: 'Doanh thu thực nhận',
    value: fmt(ADMIN_STATS.totalRevenue),
    sub: `Đang chờ: ${fmt(ADMIN_STATS.pendingRevenue)}`,
    Icon: TrendingUp,
    color: '#34d399',
    bg: '#064e3b',
    trend: '+8.4% so với tháng trước',
  },
  {
    label: 'Tài khoản trả phí',
    value: ADMIN_STATS.proUsers + ADMIN_STATS.enterpriseUsers,
    sub: `Pro: ${ADMIN_STATS.proUsers}  |  Enterprise: ${ADMIN_STATS.enterpriseUsers}`,
    Icon: CreditCard,
    color: '#a78bfa',
    bg: '#2e1065',
    trend: '+3 người dùng tuần này',
  },
  {
    label: 'Giao dịch lỗi',
    value: ADMIN_STATS.failedTx,
    sub: `Hoàn tiền: ${fmt(ADMIN_STATS.refundedAmount)}`,
    Icon: AlertTriangle,
    color: '#fb923c',
    bg: '#431407',
    trend: 'Cần xem xét xử lý',
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const recentTx = TRANSACTIONS.slice(0, 6);
  const topUsers = [...ADMIN_USERS]
    .filter(u => u.totalSpent > 0)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">

      {/* ── Header ── */}
      <div>
        <h1 className="text-xl font-bold text-white">Tổng quan hệ thống</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
        </p>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI.map(({ label, value, sub, Icon, color, bg, trend }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: bg }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                <ArrowUpRight className="h-3 w-3 text-emerald-400" />
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
            <div className="pt-2 border-t border-slate-800">
              <p className="text-[11px] text-slate-500">{sub}</p>
              <p className="text-[11px] text-emerald-400 mt-0.5">{trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── Recent transactions ── */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white">Giao dịch gần đây</h2>
            <button
              onClick={() => navigate(ROUTES.ADMIN_TRANSACTIONS)}
              className="flex items-center gap-1 text-xs text-[#60a5fa] hover:text-blue-300 transition-colors cursor-pointer"
            >
              Xem tất cả <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="divide-y divide-slate-800">
            {recentTx.map(tx => {
              const s = TX_STATUS[tx.status];
              const SIcon = s.Icon;
              return (
                <div key={tx.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-800/40 transition-colors">
                  <img src={tx.userAvatar} alt="" className="w-8 h-8 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{tx.userName}</p>
                    <p className="text-xs text-slate-400 truncate">{tx.planLabel} · {METHOD_LABEL(tx.method)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">{fmt(tx.amount)}</p>
                    <p className="text-[11px] text-slate-500">
                      {new Date(tx.paidAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.cls} shrink-0`}>
                    <SIcon className="h-3 w-3" />
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Top paying users ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white">Top khách hàng</h2>
            <button
              onClick={() => navigate(ROUTES.ADMIN_USERS)}
              className="text-xs text-[#60a5fa] hover:text-blue-300 transition-colors cursor-pointer"
            >
              Xem tất cả
            </button>
          </div>
          <div className="divide-y divide-slate-800">
            {topUsers.map((u, i) => (
              <div key={u.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/40 transition-colors">
                <span className="text-xs font-bold text-slate-600 w-4 shrink-0">{i + 1}</span>
                <img src={u.avatar} alt="" className="w-8 h-8 rounded-full border border-slate-700 shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{u.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-emerald-400">{fmt(u.totalSpent)}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    u.plan === 'enterprise' ? 'bg-violet-500/20 text-violet-300'
                    : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {u.plan === 'enterprise' ? 'Enterprise' : 'Pro'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Plan distribution bar ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-white mb-4">Phân bổ gói dịch vụ</h2>
        <div className="flex gap-3 h-3 rounded-full overflow-hidden mb-4">
          <div
            className="bg-slate-600 rounded-full transition-all"
            style={{ width: `${(ADMIN_USERS.filter(u => u.plan === 'free').length / ADMIN_USERS.length) * 100}%` }}
          />
          <div
            className="bg-[#0056b3] rounded-full transition-all"
            style={{ width: `${(ADMIN_STATS.proUsers / ADMIN_USERS.length) * 100}%` }}
          />
          <div
            className="bg-violet-500 rounded-full transition-all"
            style={{ width: `${(ADMIN_STATS.enterpriseUsers / ADMIN_USERS.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-6 text-xs">
          {[
            { label: 'Free', count: ADMIN_USERS.filter(u => u.plan === 'free').length, cls: 'bg-slate-600' },
            { label: 'Pro', count: ADMIN_STATS.proUsers, cls: 'bg-[#0056b3]' },
            { label: 'Enterprise', count: ADMIN_STATS.enterpriseUsers, cls: 'bg-violet-500' },
          ].map(({ label, count, cls }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${cls}`} />
              <span className="text-slate-400">{label}</span>
              <span className="text-white font-bold">{count}</span>
              <span className="text-slate-500">({Math.round((count / ADMIN_USERS.length) * 100)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
