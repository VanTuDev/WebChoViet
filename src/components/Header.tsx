import { Search, Plus } from 'lucide-react';

interface HeaderProps {
  activeSection: 'marketplace' | 'dashboard' | 'pricing' | 'tutorials';
  setActiveSection: (sec: 'marketplace' | 'dashboard' | 'pricing' | 'tutorials') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateNew: () => void;
  userEmail: string;
}

export default function Header({
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery,
  onCreateNew,
  userEmail
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e2e8f0] bg-white/95 backdrop-blur-md px-6 py-3" id="main-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo Section */}
        <div 
          className="flex cursor-pointer items-center gap-2 select-none" 
          onClick={() => setActiveSection('marketplace')}
          id="logo-container"
        >
          <span className="font-display text-2xl font-extrabold tracking-tight">
            <span className="text-black">web</span>
            <span className="text-[#0056b3]">choviet</span>
          </span>
          <span className="hidden sm:inline-block rounded-full bg-[#e3f2fd] px-2.5 py-0.5 text-[10px] font-semibold text-[#0056b3] uppercase tracking-wider">
            Chủ Quán Bán Lẻ
          </span>
        </div>

        {/* Navigation Categories */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium" id="header-nav">
          <button
            onClick={() => setActiveSection('marketplace')}
            className={`relative px-4 py-2 transition-all duration-200 outline-none ${
              activeSection === 'marketplace'
                ? 'text-[#0056b3] font-semibold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Kho Giao Diện
            {activeSection === 'marketplace' && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#0056b3] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`relative px-4 py-2 transition-all duration-200 outline-none ${
              activeSection === 'dashboard'
                ? 'text-[#0056b3] font-semibold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Dự Án Của Tôi
            {activeSection === 'dashboard' && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#0056b3] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveSection('pricing')}
            className={`relative px-4 py-2 transition-all duration-200 outline-none ${
              activeSection === 'pricing'
                ? 'text-[#0056b3] font-semibold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Bảng Giá
            {activeSection === 'pricing' && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#0056b3] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveSection('tutorials')}
            className={`relative px-4 py-2 transition-all duration-200 outline-none ${
              activeSection === 'tutorials'
                ? 'text-[#0056b3] font-semibold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Hướng Dẫn
            {activeSection === 'tutorials' && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#0056b3] rounded-full" />
            )}
          </button>
        </nav>

        {/* Actions / Search Section */}
        <div className="flex items-center gap-3 md:gap-4 flex-1 md:flex-initial justify-end" id="header-actions">
          {/* Search Box - Only show when finding templates */}
          <div className="relative max-w-[15rem] lg:max-w-[18rem] w-full hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm mẫu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-1.5 pl-9 pr-4 text-xs transition-colors focus:border-[#0056b3] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0056b3]/20"
            />
          </div>

          {/* Quick Create Action */}
          <button
            onClick={onCreateNew}
            className="flex items-center gap-1.5 rounded-full bg-[#0056b3] hover:bg-[#003f87] hover:shadow-md transition-all px-4 py-2 text-xs font-semibold text-white cursor-pointer shadow-sm active:scale-95"
            id="create-new-button"
          >
            <Plus className="h-4 w-4" />
            <span>Tạo Web Mới</span>
          </button>

          {/* User Profile Info */}
          <div className="flex items-center gap-2 border-l border-gray-100 pl-3">
            <div className="relative group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User Avatar"
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full border border-gray-200 object-cover hover:shadow "
              />
              <div className="absolute right-0 top-10 w-48 rounded-lg border border-gray-100 bg-white p-3 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                <p className="text-[11px] text-gray-400 truncate">Tài khoản</p>
                <p className="text-xs font-semibold text-gray-800 truncate" title={userEmail}>
                  {userEmail || 'tunv.sw@gmail.com'}
                </p>
                <div className="mt-2 border-t border-gray-100 pt-2 flex flex-col gap-1">
                  <button 
                    onClick={() => setActiveSection('dashboard')}
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
