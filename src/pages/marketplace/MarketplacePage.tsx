// Trang Kho Giao Diện — đọc category & query từ URL search params
import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Info, ChevronDown } from 'lucide-react';
import { TEMPLATES } from '../../data';
import { useAppContext } from '../../store/AppContext';
import type { Template, TemplateCategory } from '../../types';
import TemplateCard from './_components/TemplateCard';
import TemplateFilters, { type PriceFilter, type SortBy } from './_components/TemplateFilters';

// ── Heading per category ───────────────────────────────────────────────────────
const HEADING: Record<TemplateCategory | 'all', { title: string; desc: string }> = {
  all: {
    title: 'Kho Giao Diện WebXịn Việt Nam',
    desc: 'Hệ thống hàng trăm giao diện thiết kế chuyên sâu dành cho chủ doanh nghiệp vừa và nhỏ. Không cần lập trình, kéo thả tức thì.',
  },
  spa: {
    title: 'Kho Giao Diện: Làm đẹp & Spa',
    desc: 'Giao diện sang trọng, high-converting cho spa, salon và thẩm mỹ viện. Tích hợp đặt lịch hẹn.',
  },
  restaurant: {
    title: 'Kho Giao Diện: Nhà Hàng & Quán Ăn',
    desc: 'Website chuyên nghiệp cho nhà hàng, cafe, tiệm bánh. Đặt bàn trực tuyến, menu QR và tối ưu SEO.',
  },
  retail: {
    title: 'Kho Giao Diện: Cửa Hàng Bán Lẻ',
    desc: 'Mẫu giao diện cho siêu thị mini, tạp hóa và cửa hàng thời trang. Giỏ hàng và thanh toán nhanh.',
  },
  coffee: {
    title: 'Kho Giao Diện: Cafe & Đồ Uống',
    desc: 'Trưng bày menu cà phê, trà sữa đẹp mắt. Hỗ trợ gọi món quét QR tại bàn thông minh.',
  },
};

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { openCreateModal } = useAppContext();

  // Đọc filter state từ URL — không cần useState riêng
  const category = (searchParams.get('category') ?? 'all') as TemplateCategory | 'all';
  const searchQuery = searchParams.get('q') ?? '';

  // Local UI state (không cần share lên trên)
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [visibleCount, setVisibleCount] = useState(6);

  const heading = HEADING[category] ?? HEADING['all'];

  // ── Filter & Sort logic ────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...TEMPLATES];

    if (category !== 'all') result = result.filter(t => t.category === category);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)),
      );
    }
    if (priceFilter === 'free') result = result.filter(t => t.price === 0);
    if (priceFilter === 'paid') result = result.filter(t => t.price > 0);

    if (sortBy === 'bestseller')
      result.sort((a, b) => {
        if (a.badge === 'BÁN CHẠY') return -1;
        if (b.badge === 'BÁN CHẠY') return 1;
        return (b.rating ?? 0) - (a.rating ?? 0);
      });
    else if (sortBy === 'priceAsc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'priceDesc') result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.id.localeCompare(a.id));

    return result;
  }, [category, searchQuery, priceFilter, sortBy]);

  const visible = filtered.slice(0, visibleCount);

  // Khi chọn template → mở wizard (template đã chọn được set trong wizard)
  const handleUseTemplate = (t: Template) => {
    openCreateModal();
  };

  return (
    <div className="flex-1 py-8 px-6 xl:px-10 w-full">
      {/* ── Category breadcrumb + Heading ────────────────────────────────── */}
      <div className="space-y-4 mb-8">
        {category !== 'all' && (
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <button onClick={() => navigate('/marketplace')} className="hover:text-[#0056b3]">Marketplace</button>
            <span>&rsaquo;</span>
            <span className="text-[#0056b3] capitalize">{heading.title.split(':')[1]?.trim() ?? category}</span>
          </nav>
        )}
        <h1 className="text-3xl font-display font-bold text-gray-900 leading-tight">{heading.title}</h1>
        <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">{heading.desc}</p>
      </div>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <TemplateFilters
        priceFilter={priceFilter}
        sortBy={sortBy}
        onPriceChange={v => { setPriceFilter(v); setVisibleCount(6); }}
        onSortChange={v => { setSortBy(v); setVisibleCount(6); }}
      />

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visible.map(t => (
            <TemplateCard key={t.id} template={t} onUse={handleUseTemplate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <Info className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-gray-800">Không tìm thấy giao diện phù hợp</h3>
          <p className="text-xs text-gray-500 mt-1">Vui lòng thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
        </div>
      )}

      {/* ── Load more ────────────────────────────────────────────────────── */}
      {filtered.length > visibleCount && (
        <div className="text-center mt-12 mb-8">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="inline-flex items-center gap-2 px-10 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-xs font-bold text-gray-700 cursor-pointer shadow-sm active:scale-95"
          >
            <span>Tải thêm giao diện</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}
