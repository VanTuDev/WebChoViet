import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, CreditCard, ArrowLeftRight,
  LogOut, ShieldCheck, Bell, ChevronRight,
} from 'lucide-react';
import { ROUTES } from '../config/routes';

const NAV = [
  { path: ROUTES.ADMIN_DASHBOARD,    label: 'Tổng quan',        Icon: LayoutDashboard },
  { path: ROUTES.ADMIN_USERS,        label: 'Người dùng',       Icon: Users },
  { path: ROUTES.ADMIN_PAYMENTS,     label: 'Thanh toán',       Icon: CreditCard },
  { path: ROUTES.ADMIN_TRANSACTIONS, label: 'Dòng tiền',        Icon: ArrowLeftRight },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => navigate(ROUTES.ADMIN_LOGIN);

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden font-sans">

      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <aside className="w-60 shrink-0 flex flex-col bg-slate-900 border-r border-slate-800">

        {/* Brand */}
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0056b3] flex items-center justify-center shrink-0">
              <ShieldCheck className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Admin Portal</p>
              <p className="text-[10px] text-slate-400 mt-0.5">webchoviet.com</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500 px-3 mb-3">
            Quản trị hệ thống
          </p>
          {NAV.map(({ path, label, Icon }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all outline-none cursor-pointer ${
                  active
                    ? 'bg-[#0056b3] text-white shadow-md shadow-[#0056b3]/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
                {active && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-slate-800 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/60 mb-2">
            <div className="w-7 h-7 rounded-lg bg-[#0056b3]/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-3.5 w-3.5 text-[#60a5fa]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white leading-none">Super Admin</p>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">admin@webchoviet.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* ── Main area ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="shrink-0 h-14 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-6">
          <div>
            {NAV.find(n => isActive(n.path)) && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Admin</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                <span className="text-white font-medium">
                  {NAV.find(n => isActive(n.path))?.label}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <div className="w-px h-5 bg-slate-700" />
            <span className="text-xs text-slate-400 font-medium">
              {new Date().toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
