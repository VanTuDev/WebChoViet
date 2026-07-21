import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Search, Plus, Menu, X, LogOut, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { useAppContext } from '../../store/AppContext';
import PlanBadge from './PlanBadge';
import Wordmark from './Wordmark';
import LanguageSwitcher from '../../i18n/LanguageSwitcher';

// ── Shared Logo — dùng ở cả 2 variant ────────────────────────────────────────
// <Link> thay vì button+navigate: crawler thấy được liên kết nội bộ (SEO).

function Logo({ badge }: { badge?: string }) {
  return (
    <Link
      to={ROUTES.HOME}
      className="flex items-center gap-1.5 text-xl text-slate-900 cursor-pointer select-none shrink-0 outline-none"
    >
      <Wordmark icon />
      {badge && (
        <span className="hidden sm:inline-flex text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wide">
          {badge}
        </span>
      )}
    </Link>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface SiteHeaderProps {
  variant?: 'landing' | 'app';
}

type NavLink =
  | { labelKey: string; type: 'anchor'; href: string }
  | { labelKey: string; type: 'route'; path: string };

// ── Nav config — label là key trong namespace common (nav.*) ─────────────────

const LANDING_NAV: NavLink[] = [
  { labelKey: 'nav.features',    type: 'anchor', href: '#features' },
  { labelKey: 'nav.marketplace', type: 'route',  path: ROUTES.MARKETPLACE },
  { labelKey: 'nav.pricing',     type: 'route',  path: ROUTES.PRICING },
  { labelKey: 'nav.tutorials',   type: 'route',  path: ROUTES.TUTORIALS },
  { labelKey: 'nav.about',       type: 'route',  path: ROUTES.ABOUT },
];

const APP_NAV: NavLink[] = [
  { labelKey: 'nav.marketplace', type: 'route', path: ROUTES.MARKETPLACE },
  { labelKey: 'nav.myProjects',  type: 'route', path: ROUTES.DASHBOARD_PROJECTS },
  { labelKey: 'nav.pricing',     type: 'route', path: ROUTES.PRICING },
  { labelKey: 'nav.tutorials',   type: 'route', path: ROUTES.TUTORIALS },
  { labelKey: 'nav.about',       type: 'route', path: ROUTES.ABOUT },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function SiteHeader({ variant = 'app' }: SiteHeaderProps) {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout, showConfirm, openLoginModal } = useAppContext();

  const handleLogout = () => {
    setAvatarOpen(false);
    showConfirm({
      title: t('header.logoutConfirmTitle'),
      message: t('header.logoutConfirmMessage'),
      confirmLabel: t('header.logoutConfirmAction'),
      variant: 'danger',
      onConfirm: async () => {
        await logout();
        navigate(ROUTES.HOME, { replace: true });
      },
    });
  };

  useEffect(() => {
    if (!avatarOpen) return;
    const close = (e: MouseEvent) => {
      if (!avatarRef.current?.contains(e.target as Node)) setAvatarOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [avatarOpen]);

  const isLanding = variant === 'landing';
  const isOnMarketplace = location.pathname.startsWith('/marketplace');
  const searchQuery = searchParams.get('q') ?? '';

  const handleSearch = (q: string) => {
    if (isOnMarketplace) {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        q ? next.set('q', q) : next.delete('q');
        return next;
      });
    } else {
      navigate(`${ROUTES.MARKETPLACE}?q=${encodeURIComponent(q)}`);
    }
  };

  const isActive = (path: string) => {
    if (path === ROUTES.DASHBOARD_PROJECTS) return location.pathname.startsWith('/dashboard');
    return location.pathname.startsWith(path);
  };

  const navLinks = isLanding ? LANDING_NAV : APP_NAV;
  const closeMobile = () => setMobileOpen(false);

  // ── Shared nav link renderer — <a>/<Link> thật để crawler đọc được ─────────
  function NavItem({ link, mobile = false }: { link: NavLink; mobile?: boolean }) {
    const label = t(link.labelKey);
    const baseClass = mobile
      ? 'block w-full text-left py-3 text-sm font-medium border-b border-gray-50 last:border-0 transition-colors cursor-pointer'
      : 'relative hover:text-slate-900 transition-colors cursor-pointer outline-none whitespace-nowrap';

    if (link.type === 'anchor') {
      return (
        <a
          href={link.href}
          onClick={mobile ? closeMobile : undefined}
          className={`${baseClass} text-gray-600 hover:text-primary`}
        >
          {label}
        </a>
      );
    }

    const active = !isLanding && isActive(link.path);
    return (
      <Link
        to={link.path}
        onClick={mobile ? closeMobile : undefined}
        className={`${baseClass} ${
          active
            ? 'text-primary font-semibold'
            : mobile
              ? 'text-gray-700 hover:text-primary'
              : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        {label}
        {active && !mobile && (
          <span className="absolute -bottom-4.5 left-0 right-0 h-0.5 bg-primary rounded-full" />
        )}
      </Link>
    );
  }

  // ── Landing variant ─────────────────────────────────────────────────────────
  if (isLanding) {
    return (
      <nav className="fixed top-0 left-0 w-full z-40 bg-surface/80 backdrop-blur-md shadow-md shadow-primary/5">
        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <Logo />

          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map(link => <NavItem key={link.labelKey} link={link} />)}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            {/* Đã đăng nhập → CTA tạo web (Link cho crawler); chưa → mở modal đăng nhập */}
            {isAuthenticated ? (
              <Link
                to={ROUTES.MARKETPLACE}
                className="flex items-center gap-1.5 bg-primary text-white font-inter font-medium text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                {t('header.createSite')}
              </Link>
            ) : (
              <button
                className="bg-primary text-white font-inter font-medium text-sm px-5 py-2.5 rounded-full shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
                onClick={openLoginModal}
              >
                {t('header.login')}
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? t('nav.menuClose') : t('nav.menuOpen')}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 pb-5 pt-3 space-y-1 shadow-lg">
            {navLinks.map(link => <NavItem key={link.labelKey} link={link} mobile />)}
            <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
              <div className="flex justify-center pb-1">
                <LanguageSwitcher dropDirection="up" />
              </div>
              {isAuthenticated ? (
                <Link
                  to={ROUTES.MARKETPLACE}
                  onClick={closeMobile}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  {t('header.createSite')}
                </Link>
              ) : (
                <button
                  className="w-full py-2.5 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
                  onClick={() => { openLoginModal(); closeMobile(); }}
                >
                  {t('header.login')}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  }

  // ── App variant ─────────────────────────────────────────────────────────────
  return (
    <header className="shrink-0 z-40 w-full border-b border-slate-100/80 bg-white/95 backdrop-blur-md">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">

        <Logo badge="Beta" />

        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium flex-1 justify-center">
          {navLinks.map(link => <NavItem key={link.labelKey} link={link} />)}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {/* Search */}
          <div className="relative w-40 lg:w-56 hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
              <Search className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50/60 py-1.5 pl-8 pr-3 text-xs transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>

          {/* Chuyển đổi ngôn ngữ — chỉ hiện ở đây trên desktop, mobile đã có trong drawer bên dưới */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Auth: avatar user thật nếu đã đăng nhập, nút Đăng nhập nếu chưa */}
          {isAuthenticated && user ? (
            <div ref={avatarRef} className="relative ml-1 pl-2 border-l border-gray-100">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=e8491f&color=fff`}
                alt={user.name}
                referrerPolicy="no-referrer"
                onClick={() => setAvatarOpen(v => !v)}
                className="h-8 w-8 rounded-full border border-gray-200 object-cover hover:shadow transition-shadow cursor-pointer"
              />
              {avatarOpen && (
                <div className="absolute right-0 top-11 w-52 rounded-xl border border-gray-100 bg-white p-3 shadow-xl z-50">
                  <p className="text-[11px] text-gray-400">{t('header.account')}</p>
                  <p className="text-xs font-semibold text-gray-800 truncate mt-0.5">{user.email}</p>
                  <div className="mt-2 border-t border-gray-100 pt-2 flex flex-col gap-1.5">
                    <Link
                      to={ROUTES.DASHBOARD_PROJECTS}
                      onClick={() => setAvatarOpen(false)}
                      className="text-left text-xs text-gray-600 hover:text-primary py-1 transition-colors cursor-pointer"
                    >
                      {t('header.manageProjects')}
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to={ROUTES.ADMIN_DASHBOARD}
                        onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-1.5 text-left text-xs text-orange-600 hover:text-orange-800 py-1 transition-colors cursor-pointer font-medium"
                      >
                        <Shield className="h-3 w-3" />
                        {t('header.adminPanel')}
                      </Link>
                    )}
                    <PlanBadge plan={user.plan} />
                  </div>
                  <div className="mt-2 border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 text-left text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      {t('header.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="ml-1 pl-3 border-l border-gray-100 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer whitespace-nowrap"
            >
              {t('header.login')}
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-gray-100 transition-colors ml-1"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? t('nav.menuClose') : t('nav.menuOpen')}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-3 pb-2 flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <LanguageSwitcher />
          </div>
          <nav className="px-4 pb-3 flex flex-col">
            {navLinks.map(link => <NavItem key={link.labelKey} link={link} mobile />)}
            <Link
              to={ROUTES.MARKETPLACE}
              onClick={closeMobile}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 px-4 py-2.5 text-sm font-semibold text-white cursor-pointer active:scale-95 transition-all shadow-sm"
            >
              <Plus className="h-4 w-4" />
              {t('header.createSite')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
