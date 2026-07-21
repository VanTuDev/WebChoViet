// Sidebar thích ứng: hiển thị khác nhau dựa trên URL hiện tại (useLocation)
// Responsive: desktop/tablet (md+) là sidebar dọc bên trái, THU GỌN được về
// rail icon (trạng thái nhớ qua localStorage); mobile (<md) ẩn sidebar,
// thay bằng thanh chip cuộn ngang MobileSidebarNav (render bên trong <main> ở AppLayout).
import React, { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../store/AppContext';
import {
  LayoutGrid, Coffee, Sparkles, Utensils,
  Dumbbell, Heart, Home, Smile,
  TrendingUp, QrCode, Settings, HelpCircle,
  FolderSymlink, PanelLeftClose, PanelLeftOpen, Crown,
} from 'lucide-react';
import { ROUTES } from '../../config/routes';
import SidebarPlanCard from './SidebarPlanCard';

// ── Config constants ───────────────────────────────────────────────────────────
// Label là key trong namespace common (sidebar.*) — dịch qua useTranslation bên dưới,
// KHÔNG hardcode chuỗi tiếng Việt để đổi ngôn ngữ ảnh hưởng toàn bộ sidebar.

const MARKETPLACE_CATEGORIES: { id: string; labelKey: string; icon: React.ReactNode }[] = [
  { id: 'all',        labelKey: 'sidebar.categories.all',        icon: <LayoutGrid className="h-4 w-4 shrink-0" /> },
  { id: 'coffee',     labelKey: 'sidebar.categories.coffee',     icon: <Coffee    className="h-4 w-4 shrink-0" /> },
  { id: 'restaurant', labelKey: 'sidebar.categories.restaurant', icon: <Utensils  className="h-4 w-4 shrink-0" /> },
  { id: 'spa',        labelKey: 'sidebar.categories.spa',        icon: <Sparkles  className="h-4 w-4 shrink-0" /> },
  { id: 'gym',        labelKey: 'sidebar.categories.gym',        icon: <Dumbbell  className="h-4 w-4 shrink-0" /> },
  { id: 'wedding',    labelKey: 'sidebar.categories.wedding',    icon: <Heart     className="h-4 w-4 shrink-0" /> },
  { id: 'villa',      labelKey: 'sidebar.categories.villa',      icon: <Home      className="h-4 w-4 shrink-0" /> },
  { id: 'dentalClinic', labelKey: 'sidebar.categories.dental',   icon: <Smile     className="h-4 w-4 shrink-0" /> },
];

const DASHBOARD_MENUS = [
  { path: ROUTES.DASHBOARD_PROJECTS,  labelKey: 'sidebar.menus.projects',  icon: <FolderSymlink className="h-4 w-4 shrink-0" /> },
  { path: ROUTES.DASHBOARD_ANALYTICS, labelKey: 'sidebar.menus.analytics', icon: <TrendingUp className="h-4 w-4 shrink-0" /> },
  { path: ROUTES.DASHBOARD_QRCODES,   labelKey: 'sidebar.menus.qrcodes',   icon: <QrCode className="h-4 w-4 shrink-0" /> },
  { path: ROUTES.DASHBOARD_SETTINGS,  labelKey: 'sidebar.menus.settings',  icon: <Settings className="h-4 w-4 shrink-0" /> },
  { path: ROUTES.DASHBOARD_SUPPORT,   labelKey: 'sidebar.menus.support',   icon: <HelpCircle className="h-4 w-4 shrink-0" /> },
];

// ── Shared state hooks ─────────────────────────────────────────────────────────

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

/** Trạng thái thu gọn — nhớ qua localStorage để giữ nguyên giữa các lần vào */
const COLLAPSE_KEY = 'wcv-sidebar-collapsed';

function useCollapsed() {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === '1');
  const toggle = () => {
    setCollapsed(prev => {
      localStorage.setItem(COLLAPSE_KEY, prev ? '0' : '1');
      return !prev;
    });
  };
  return { collapsed, toggle };
}

// ── Shared shell + nav item ────────────────────────────────────────────────────

function SidebarShell({
  collapsed, onToggle, title, children,
}: {
  collapsed: boolean;
  onToggle: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const { t } = useTranslation('common');

  return (
    // h-full: lấp đầy chiều cao body container (đã được giới hạn bởi h-screen ở AppLayout)
    // hidden md:flex — mobile dùng MobileSidebarNav thay thế
    <aside
      className={`hidden md:flex h-full shrink-0 border-r border-outline-variant/50 bg-white/70 backdrop-blur-sm flex-col justify-between py-4 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16 px-2' : 'w-56 lg:w-64 px-3'
      }`}
    >
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Header: tiêu đề + nút thu gọn/mở rộng */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between pl-3 pr-1'}`}>
          {!collapsed && (
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 truncate">
              {title}
            </h2>
          )}
          <button
            onClick={onToggle}
            title={collapsed ? t('sidebar.expandMenu') : t('sidebar.collapseMenu')}
            aria-label={collapsed ? t('sidebar.expandMenu') : t('sidebar.collapseMenu')}
            className="p-1.5 rounded-lg text-outline hover:bg-fnb-cream hover:text-primary transition-colors cursor-pointer shrink-0"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {children}
      </div>
    </aside>
  );
}

function SidebarItem({
  icon, label, active, collapsed, onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      title={collapsed ? label : undefined}
      className={`relative w-full flex items-center rounded-xl text-sm font-medium transition-all duration-200 outline-none cursor-pointer group ${
        collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
      } ${
        active
          ? 'bg-gradient-to-r from-fnb-red to-fnb-orange text-white shadow-md shadow-fnb-red/25 font-semibold'
          : 'text-gray-600 hover:bg-fnb-cream hover:text-primary hover:translate-x-0.5'
      }`}
    >
      {/* Vạch chỉ báo active khi thu gọn */}
      {active && collapsed && (
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-fnb-red" />
      )}
      {icon}
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}

/** Chân sidebar: card gói đầy đủ khi mở, nút vương miện khi thu gọn */
function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { t } = useTranslation('common');

  if (collapsed) {
    return (
      <button
        onClick={() => navigate(ROUTES.PRICING)}
        title={t('sidebar.upgradePlan')}
        aria-label={t('sidebar.upgradePlan')}
        className="mx-auto p-2.5 rounded-xl bg-gradient-to-br from-fnb-amber to-fnb-orange text-white shadow-md shadow-fnb-amber/30 hover:scale-110 transition-transform cursor-pointer"
      >
        <Crown className="h-4 w-4" />
      </button>
    );
  }
  return <SidebarPlanCard plan={user?.plan ?? null} />;
}

// ── Marketplace Sidebar (lọc theo danh mục) ────────────────────────────────────

function MarketplaceSidebar() {
  const { t } = useTranslation('common');
  const { selected, select } = useMarketplaceCategory();
  const { collapsed, toggle } = useCollapsed();

  return (
    <SidebarShell collapsed={collapsed} onToggle={toggle} title={t('sidebar.marketplaceTitle')}>
      <nav className="space-y-1">
        {MARKETPLACE_CATEGORIES.map(cat => (
          <SidebarItem
            key={cat.id}
            icon={cat.icon}
            label={t(cat.labelKey)}
            active={selected === cat.id}
            collapsed={collapsed}
            onSelect={() => select(cat.id)}
          />
        ))}
      </nav>
      <div className="mt-auto pt-4">
        <SidebarFooter collapsed={collapsed} />
      </div>
    </SidebarShell>
  );
}

// ── Dashboard Sidebar (điều hướng sub-pages) ──────────────────────────────────

function DashboardSidebar() {
  const { t } = useTranslation('common');
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed, toggle } = useCollapsed();

  return (
    <SidebarShell collapsed={collapsed} onToggle={toggle} title={t('sidebar.dashboardTitle')}>
      <nav className="space-y-1">
        {DASHBOARD_MENUS.map(menu => (
          <SidebarItem
            key={menu.path}
            icon={menu.icon}
            label={t(menu.labelKey)}
            active={location.pathname === menu.path}
            collapsed={collapsed}
            onSelect={() => navigate(menu.path)}
          />
        ))}
      </nav>
      <div className="mt-auto pt-4">
        <SidebarFooter collapsed={collapsed} />
      </div>
    </SidebarShell>
  );
}

// ── Mobile: thanh chip cuộn ngang thay cho sidebar (chỉ hiện < md) ─────────────

function MobileChipBar({ items }: {
  items: { key: string; label: string; icon: React.ReactNode; active: boolean; onSelect: () => void }[];
}) {
  const { t } = useTranslation('common');
  return (
    <nav
      className="md:hidden sticky top-0 z-30 shrink-0 flex items-center gap-2 overflow-x-auto bg-surface/95 backdrop-blur-sm border-b border-outline-variant/40 px-4 py-2.5 scrollbar-none"
      aria-label={t('sidebar.quickNav')}
    >
      {items.map(item => (
        <button
          key={item.key}
          onClick={item.onSelect}
          className={`flex items-center gap-1.5 shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            item.active
              ? 'bg-gradient-to-r from-fnb-red to-fnb-orange text-white shadow-sm shadow-fnb-red/30'
              : 'bg-white text-gray-600 border border-outline-variant hover:border-fnb-orange hover:text-primary'
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
  const { t } = useTranslation('common');
  const { selected, select } = useMarketplaceCategory();
  return (
    <MobileChipBar
      items={MARKETPLACE_CATEGORIES.map(cat => ({
        key: cat.id,
        label: t(cat.labelKey),
        icon: cat.icon,
        active: selected === cat.id,
        onSelect: () => select(cat.id),
      }))}
    />
  );
}

function MobileDashboardNav() {
  const { t } = useTranslation('common');
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <MobileChipBar
      items={DASHBOARD_MENUS.map(menu => ({
        key: menu.path,
        label: t(menu.labelKey),
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
