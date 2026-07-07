// Trang Kho Giao Diện — đọc category & query từ URL search params
import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Info, ChevronDown } from 'lucide-react';
import { TEMPLATES, type Template } from '../../data';
import { CATEGORY_HEADING_MAP } from '../../data/templates/registry';
import TemplateCard from './_components/TemplateCard';
import TemplateFilters, { type PriceFilter, type SortBy } from './_components/TemplateFilters';

// Heading "Tất cả" — cố định, không thuộc category nào
const ALL_HEADING = {
  title: 'Kho Giao Diện WebXịn Việt Nam',
  desc: 'Hệ thống hàng trăm giao diện thiết kế chuyên sâu dành cho chủ doanh nghiệp vừa và nhỏ. Không cần lập trình, kéo thả tức thì.',
};

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Đọc filter state từ URL — không cần useState riêng
  const category = searchParams.get('category') ?? 'all';
  const searchQuery = searchParams.get('q') ?? '';

  // Local UI state (không cần share lên trên)
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [visibleCount, setVisibleCount] = useState(15);

  const heading = category === 'all' ? ALL_HEADING : (CATEGORY_HEADING_MAP[category] ?? ALL_HEADING);

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

  const handleUseTemplate = (t: Template) => {
    navigate(`/template-editor/new?template=${t.id}`);
  };

  return (
    <div className="flex-1 py-5 sm:py-8 px-4 sm:px-6 xl:px-10 w-full">
      <Helmet>
        <title>{heading.title} — WebChoViet</title>
        <meta name="description" content={heading.desc} />
        <link rel="canonical" href="https://webchoviet.com/marketplace" />
      </Helmet>
      {/* ── Category breadcrumb + Heading ────────────────────────────────── */}
      <div className="space-y-2.5 sm:space-y-4 mb-6 sm:mb-8">
        {category !== 'all' && (
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <button onClick={() => navigate('/marketplace')} className="hover:text-primary-container">Marketplace</button>
            <span>&rsaquo;</span>
            <span className="text-primary-container capitalize">{heading.title.split(':')[1]?.trim() ?? category}</span>
          </nav>
        )}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gray-900 leading-tight">{heading.title}</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-3xl leading-relaxed">{heading.desc}</p>
      </div>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <TemplateFilters
        priceFilter={priceFilter}
        sortBy={sortBy}
        onPriceChange={v => { setPriceFilter(v); setVisibleCount(15); }}
        onSortChange={v => { setSortBy(v); setVisibleCount(15); }}
      />

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      {visible.length > 0 ? (
        <div className="stagger-children grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8">
          {visible.map(t => (
            <TemplateCard key={t.id} template={t} onUse={handleUseTemplate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant">
          <Info className="h-10 w-10 text-outline mx-auto mb-4" />
          <h3 className="text-base font-semibold text-gray-800">Không tìm thấy giao diện phù hợp</h3>
          <p className="text-xs text-gray-500 mt-1">Vui lòng thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
        </div>
      )}

      {/* ── Load more ────────────────────────────────────────────────────── */}
      {filtered.length > visibleCount && (
        <div className="text-center mt-12 mb-8">
          <button
            onClick={() => setVisibleCount(prev => prev + 15)}
            className="hover-lift inline-flex items-center gap-2 px-10 py-3 rounded-full border border-fnb-orange/40 bg-white hover:bg-fnb-cream transition-colors text-xs font-bold text-primary cursor-pointer shadow-sm active:scale-95"
          >
            <span>Tải thêm giao diện</span>
            <ChevronDown className="h-4 w-4 text-fnb-orange" />
          </button>
        </div>
      )}
    </div>
  );
}
