// Navbar cố định — dùng useNavigate & useLocation thay cho prop drilling
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { ROUTES } from '../../config/routes';

const NAV_LINKS = [
  { path: ROUTES.MARKETPLACE,        label: 'Kho Giao Diện' },
  { path: ROUTES.DASHBOARD_PROJECTS, label: 'Dự Án Của Tôi' },
  { path: ROUTES.PRICING,            label: 'Bảng Giá' },
  { path: ROUTES.TUTORIALS,          label: 'Hướng Dẫn' },
] as const;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openCreateModal } = useAppContext();

  const isOnMarketplace = location.pathname.startsWith('/marketplace');
  const searchQuery = searchParams.get('q') ?? '';

  const handleSearch = (q: string) => {
    if (isOnMarketplace) {
      // Cập nhật URL param ?q= ngay trên trang marketplace
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        q ? next.set('q', q) : next.delete('q');
        return next;
      });
    } else {
      // Nếu đang ở trang khác → chuyển sang marketplace kèm query
      navigate(`${ROUTES.MARKETPLACE}?q=${encodeURIComponent(q)}`);
    }
  };

  // Dashboard group: bất kỳ path /dashboard/* đều active nav "Dự Án Của Tôi"
  const isActive = (path: string) => {
    if (path === '/dashboard/projects') return location.pathname.startsWith('/dashboard');
    return location.pathname.startsWith(path);
  };

  return (
    // shrink-0: ngăn header bị nén khi flex column bị ép chiều cao
    <header className="shrink-0 z-40 w-full border-b border-[#e2e8f0] bg-white px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <div
          className="flex cursor-pointer items-center gap-2 select-none"
          onClick={() => navigate(ROUTES.MARKETPLACE)}
        >
          <span className="font-display text-2xl font-extrabold tracking-tight">
            <span className="text-black">web</span>
            <span className="text-[#0056b3]">choviet</span>
          </span>
          <span className="hidden sm:inline-block rounded-full bg-[#e3f2fd] px-2.5 py-0.5 text-[10px] font-semibold text-[#0056b3] uppercase tracking-wider">
            Chủ Quán Bán Lẻ
          </span>
        </div>

        {/* ── Nav links ────────────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV_LINKS.map(({ path, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`relative px-4 py-2 transition-all outline-none ${
                isActive(path) ? 'text-[#0056b3] font-semibold' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {label}
              {isActive(path) && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#0056b3] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* ── Actions ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 flex-1 md:flex-initial justify-end">
          {/* Search — chỉ hiển thị dạng text trên sm+ */}
          <div className="relative max-w-60 lg:max-w-72 w-full hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm mẫu..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-1.5 pl-9 pr-4 text-xs transition-colors focus:border-[#0056b3] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0056b3]/20"
            />
          </div>

          {/* Tạo web mới — mở CreateSiteWizard modal từ context */}
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 rounded-full bg-[#0056b3] hover:bg-[#003f87] hover:shadow-md transition-all px-4 py-2 text-xs font-semibold text-white cursor-pointer shadow-sm active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Tạo Web Mới</span>
          </button>

          {/* User avatar dropdown */}
          <div className="flex items-center border-l border-gray-100 pl-3">
            <div className="relative group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full border border-gray-200 object-cover hover:shadow"
              />
              <div className="absolute right-0 top-10 w-48 rounded-lg border border-gray-100 bg-white p-3 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                <p className="text-[11px] text-gray-400">Tài khoản</p>
                <p className="text-xs font-semibold text-gray-800 truncate">tunv.sw@gmail.com</p>
                <div className="mt-2 border-t border-gray-100 pt-2 flex flex-col gap-1">
                  <button
                    onClick={() => navigate(ROUTES.DASHBOARD_PROJECTS)}
                    className="text-left text-xs text-gray-600 hover:text-[#0056b3] py-1"
                  >
                    Quản lý dự án
                  </button>
                  <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-medium self-start">
                    Gói miễn phí dư dả
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
