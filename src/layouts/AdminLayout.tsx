import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, CreditCard, ArrowLeftRight,
  LogOut, ShieldCheck, Bell, ChevronRight, BarChart3, ArrowLeft,
  Menu, X,
} from 'lucide-react';
import { ROUTES } from '../config/routes';
import { useAppContext } from '../store/AppContext';

const NAV = [
  { path: ROUTES.ADMIN_DASHBOARD,    label: 'Tổng quan',        Icon: LayoutDashboard },
  { path: ROUTES.ADMIN_ANALYTICS,    label: 'Thống kê',         Icon: BarChart3 },
  { path: ROUTES.ADMIN_USERS,        label: 'Người dùng',       Icon: Users },
  { path: ROUTES.ADMIN_PAYMENTS,     label: 'Thanh toán',       Icon: CreditCard },
  { path: ROUTES.ADMIN_TRANSACTIONS, label: 'Dòng tiền',        Icon: ArrowLeftRight },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAppContext();
  // Mobile (<lg): sidebar là drawer trượt từ trái, mở bằng nút hamburger trên top bar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Đóng drawer khi chuyển trang (bấm 1 mục nav xong drawer phải tự đóng)
  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  };

  // Nội dung sidebar dùng chung cho cả bản tĩnh (lg+) lẫn drawer mobile
  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
              <ShieldCheck className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Admin Portal</p>
              <p className="text-[10px] text-slate-400 mt-0.5">vngoweb.com</p>
            </div>
          </div>
          {/* Nút đóng — chỉ hiện trong drawer mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Đóng menu"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
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
                  ? 'bg-primary-container text-white shadow-md shadow-primary-container/30'
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
          <div className="w-7 h-7 rounded-lg bg-primary-container/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-3.5 w-3.5 text-[#fdba74]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white leading-none truncate">{user?.name ?? 'Admin'}</p>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">{user?.email ?? ''}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(ROUTES.MARKETPLACE)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Về trang người dùng</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden font-sans">

      {/* ── Sidebar tĩnh — chỉ hiện lg+ ─────────────────────────────── */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-slate-900 border-r border-slate-800">
        {sidebarContent}
      </aside>

      {/* ── Sidebar drawer — mobile/tablet (<lg) ────────────────────── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 max-w-[80vw] flex flex-col bg-slate-900 border-r border-slate-800 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* ── Main area ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="shrink-0 h-14 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-3 sm:px-6 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* Hamburger — mobile/tablet */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Mở menu quản trị"
            >
              <Menu className="h-5 w-5" />
            </button>
            {NAV.find(n => isActive(n.path)) && (
              <div className="flex items-center gap-2 text-sm min-w-0">
                <span className="text-slate-500 hidden sm:inline">Admin</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-600 hidden sm:inline" />
                <span className="text-white font-medium truncate">
                  {NAV.find(n => isActive(n.path))?.label}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <div className="w-px h-5 bg-slate-700 hidden sm:block" />
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
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
