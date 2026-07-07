// Sidebar thích ứng: hiển thị khác nhau dựa trên URL hiện tại (useLocation)
// Responsive: desktop/tablet (md+) là sidebar dọc bên trái; mobile (<md) ẩn sidebar,
// thay bằng thanh chip cuộn ngang MobileSidebarNav (render bên trong <main> ở AppLayout).
import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import {
  LayoutGrid, Coffee, Sparkles, Utensils, Milk,
  Dumbbell, Heart,
  TrendingUp, QrCode, Settings, HelpCircle,
  FolderSymlink,
} from 'lucide-react';
import { ROUTES } from '../../config/routes';
import SidebarPlanCard from './SidebarPlanCard';

// ── Config constants ───────────────────────────────────────────────────────────

const MARKETPLACE_CATEGORIES: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'all',        label: 'Tất cả giao diện',    icon: <LayoutGrid className="h-4 w-4" /> },
  { id: 'coffee',     label: 'Cafe & Đồ Uống',      icon: <Coffee    className="h-4 w-4" /> },
  { id: 'milk-tea',   label: 'Trà Sữa',             icon: <Milk      className="h-4 w-4" /> },
  { id: 'restaurant', label: 'Nhà Hàng & Quán Ăn', icon: <Utensils  className="h-4 w-4" /> },
  { id: 'spa',        label: 'Spa & Làm Đẹp',       icon: <Sparkles  className="h-4 w-4" /> },
  { id: 'gym',        label: 'Gym & Thể Thao',      icon: <Dumbbell  className="h-4 w-4" /> },
  { id: 'wedding',    label: 'Thiệp Cưới',          icon: <Heart     className="h-4 w-4" /> },
];

const DASHBOARD_MENUS = [
  { path: ROUTES.DASHBOARD_PROJECTS,  label: 'Dự án của tôi',      icon: <FolderSymlink className="h-4 w-4" /> },
  { path: ROUTES.DASHBOARD_ANALYTICS, label: 'Phân tích hiệu quả', icon: <TrendingUp className="h-4 w-4" /> },
  { path: ROUTES.DASHBOARD_QRCODES,   label: 'Quản lý Mã QR',      icon: <QrCode className="h-4 w-4" /> },
  { path: ROUTES.DASHBOARD_SETTINGS,  label: 'Cài đặt hệ thống',   icon: <Settings className="h-4 w-4" /> },
  { path: ROUTES.DASHBOARD_SUPPORT,   label: 'Kênh hỗ trợ 24/7',  icon: <HelpCircle className="h-4 w-4" /> },
];

// ── Shared state hooks (dùng chung cho sidebar dọc lẫn thanh chip mobile) ──────

function useMarketplaceCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get('category') ?? 'all';

  const select = (cat: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      cat === 'all' ? next.delete('category') : next.set('category', cat);
      return next;
    });
  };

  return { selected, select };
}

// ── Shared wrapper ─────────────────────────────────────────────────────────────

function SidebarShell({ children }: { children: React.ReactNode }) {
  return (
    // h-full: lấp đầy chiều cao body container (đã được giới hạn bởi h-screen ở AppLayout)
    // hidden md:flex — mobile dùng MobileSidebarNav thay thế; md thu gọn w-56, lg đủ w-64
    <aside className="hidden md:flex h-full w-56 lg:w-64 shrink-0 border-r border-[#e2e8f0] bg-gray-50/50 flex-col justify-between py-6 px-4 overflow-y-auto">
      {children}
    </aside>
  );
}

// ── Marketplace Sidebar (lọc theo danh mục) ────────────────────────────────────

function MarketplaceSidebar() {
  const { selected, select } = useMarketplaceCategory();
  const { user } = useAppContext();

  return (
    <SidebarShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3">
            Danh Mục Giao Diện
          </h2>

        </div>

        <nav className="space-y-1">
          {MARKETPLACE_CATEGORIES.map(cat => {
            const active = selected === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => select(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all outline-none cursor-pointer ${
                  active
                    ? 'bg-fnb-orange text-white shadow-sm font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <SidebarPlanCard plan={user?.plan ?? null} />
    </SidebarShell>
  );
}

// ── Dashboard Sidebar (điều hướng sub-pages) ──────────────────────────────────

function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAppContext();

  return (
    <SidebarShell>
      <div className="space-y-6">
        <nav className="space-y-1">
          {DASHBOARD_MENUS.map(menu => {
            const active = location.pathname === menu.path;
            return (
              <button
                key={menu.path}
                onClick={() => navigate(menu.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all outline-none cursor-pointer ${
                  active
                    ? 'bg-fnb-orange text-white shadow-sm font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {menu.icon}
                <span>{menu.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <SidebarPlanCard plan={user?.plan ?? null} />
    </SidebarShell>
  );
}

// ── Mobile: thanh chip cuộn ngang thay cho sidebar (chỉ hiện < md) ─────────────

function MobileChipBar({ items }: {
  items: { key: string; label: string; icon: React.ReactNode; active: boolean; onSelect: () => void }[];
}) {
  return (
    <nav
      className="md:hidden sticky top-0 z-30 shrink-0 flex items-center gap-2 overflow-x-auto bg-[#f7f9fb]/95 backdrop-blur-sm border-b border-gray-100 px-4 py-2.5 scrollbar-none"
      aria-label="Điều hướng nhanh"
    >
      {items.map(item => (
        <button
          key={item.key}
          onClick={item.onSelect}
          className={`flex items-center gap-1.5 shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            item.active
              ? 'bg-fnb-orange text-white shadow-sm'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function MobileMarketplaceNav() {
  const { selected, select } = useMarketplaceCategory();
  return (
    <MobileChipBar
      items={MARKETPLACE_CATEGORIES.map(cat => ({
        key: cat.id,
        label: cat.label,
        icon: cat.icon,
        active: selected === cat.id,
        onSelect: () => select(cat.id),
      }))}
    />
  );
}

function MobileDashboardNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <MobileChipBar
      items={DASHBOARD_MENUS.map(menu => ({
        key: menu.path,
        label: menu.label,
        icon: menu.icon,
        active: location.pathname === menu.path,
        onSelect: () => navigate(menu.path),
      }))}
    />
  );
}

/** Thanh điều hướng ngang cho mobile — render bên trong <main> ở AppLayout, trước <Outlet /> */
export function MobileSidebarNav() {
  const location = useLocation();
  if (location.pathname.startsWith('/marketplace')) return <MobileMarketplaceNav />;
  return <MobileDashboardNav />;
}

// ── Root Sidebar — tự quyết định loại sidebar theo URL ────────────────────────

export default function Sidebar() {
  const location = useLocation();
  if (location.pathname.startsWith('/marketplace')) return <MarketplaceSidebar />;
  return <DashboardSidebar />;
}
