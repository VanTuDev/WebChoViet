import { useState, useMemo } from 'react';
import { ChevronDown, Star, Info } from 'lucide-react';
import { Template, TemplateCategory } from '../types';

interface TemplateMarketplaceProps {
  templates: Template[];
  selectedCategory: TemplateCategory;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onUseTemplate: (template: Template) => void;
}

export default function TemplateMarketplace({
  templates,
  selectedCategory,
  searchQuery,
  setSearchQuery,
  onUseTemplate
}: TemplateMarketplaceProps) {
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'bestseller' | 'priceAsc' | 'priceDesc'>('newest');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Category heading copy text exactly like the screenshots
  const headingInfo = useMemo(() => {
    switch (selectedCategory) {
      case 'spa':
        return {
          title: 'Kho Giao Diện: Làm đẹp & Spa',
          desc: 'Discover elegant, high-converting templates designed specifically for spas, salons, and beauty clinics. Create a calming digital experience for your clients.'
        };
      case 'restaurant':
        return {
          title: 'Kho Giao Diện: Nhà Hàng & Quán Ăn',
          desc: 'Thiết kế website chuyên nghiệp cho nhà hàng, quán cafe, tiệm bánh. Tích hợp sẵn tính năng đặt bàn, menu trực tuyến và tối ưu hóa SEO.'
        };
      case 'retail':
        return {
          title: 'Kho Giao Diện: Cửa Hàng Bán Lẻ',
          desc: 'Khám phá các mẫu giao diện được thiết kế chuyên biệt cho cửa hàng bán lẻ, tạp hóa, và siêu thị mini. Tối ưu hóa trải nghiệm mua sắm với giỏ hàng và hiển thị sản phẩm rõ nét.'
        };
      case 'coffee':
        return {
          title: 'Kho Giao Diện: Cafe & Đồ Uống',
          desc: 'Trưng bày danh sách cà phê, trà sữa, trà nhiệt đới ngọt lành quyến rũ kết hợp bánh ngọt hảo hạng. Hỗ trợ gọi món quét QR tại bàn thông minh.'
        };
      default:
        return {
          title: 'Kho Giao Diện WebXịn Việt Nam',
          desc: 'Hệ thống hàng trăm giao diện thiết kế chuyên sâu dành cho các chủ doanh nghiệp vừa và nhỏ tại Việt Nam. Không cần lập trình, kéo thả tức thì.'
        };
    }
  }, [selectedCategory]);

  // Apply filters and sorting
  const filteredTemplates = useMemo(() => {
    let result = [...templates];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Filter by Price (Free vs. Paid)
    if (priceFilter === 'free') {
      result = result.filter(t => t.price === 0);
    } else if (priceFilter === 'paid') {
      result = result.filter(t => t.price > 0);
    }

    // Sort
    if (sortBy === 'newest') {
      // Default initial indexing or specifically marked as new
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === 'bestseller') {
      result.sort((a, b) => {
        if (a.badge === 'BÁN CHẠY') return -1;
        if (b.badge === 'BÁN CHẠY') return 1;
        return (b.rating || 0) - (a.rating || 0);
      });
    } else if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [templates, selectedCategory, searchQuery, priceFilter, sortBy]);

  const pagedTemplates = useMemo(() => {
    return filteredTemplates.slice(0, visibleCount);
  }, [filteredTemplates, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="flex-1 py-8 px-6 md:px-10 overflow-y-auto max-w-7xl mx-auto" id="marketplace-content">
      {/* Category banner headers matching images exactly */}
      <div className="space-y-4 mb-8" id="category-banner">
        {selectedCategory !== 'all' && (
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <span>Marketplace</span>
            <span>&rsaquo;</span>
            <span className="text-[#0056b3] capitalize">{selectedCategory === 'spa' ? 'Spa & Beauty' : selectedCategory === 'coffee' ? 'Cafe & Đồ uống' : selectedCategory === 'restaurant' ? 'Restaurant' : 'Retail'}</span>
          </nav>
        )}
        <h1 className="text-3xl font-display font-bold text-gray-900 leading-tight">
          {headingInfo.title}
        </h1>
        <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
          {headingInfo.desc}
        </p>
      </div>

      {/* Filter and Sorting Bar (Extracted from screen controls) */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-gray-100 pb-5 mb-8" id="filters-toolbar">
        {/* Price Tags Filter Pills */}
        <div className="flex bg-gray-100/80 p-1 rounded-full text-xs font-medium" id="tags-filter-pills">
          <button
            onClick={() => setPriceFilter('all')}
            className={`rounded-full px-5 py-2 transition-all cursor-pointer ${
              priceFilter === 'all'
                ? 'bg-gradient-to-r from-[#003f87] to-[#0056b3] text-white font-semibold shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setPriceFilter('free')}
            className={`rounded-full px-5 py-2 transition-all cursor-pointer ${
              priceFilter === 'free'
                ? 'bg-gradient-to-r from-[#003f87] to-[#0056b3] text-white font-semibold shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Miễn phí
          </button>
          <button
            onClick={() => setPriceFilter('paid')}
            className={`rounded-full px-5 py-2 transition-all cursor-pointer ${
              priceFilter === 'paid'
                ? 'bg-gradient-to-r from-[#003f87] to-[#0056b3] text-white font-semibold shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Trả phí
          </button>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2" id="sort-dropdown-container">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sắp Xếp:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700 rounded-full pl-4 pr-10 py-1.5 focus:border-[#0056b3] focus:outline-none focus:ring-1 focus:ring-[#0056b3]/10 cursor-pointer"
            >
              <option value="newest">Mới nhất</option>
              <option value="bestseller">Xem nhiều & Bán chạy</option>
              <option value="priceAsc">Giá tăng dần</option>
              <option value="priceDesc">Giá giảm dần</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid of Templates */}
      {pagedTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="templates-grid">
          {pagedTemplates.map((item) => {
            const isFree = item.price === 0;
            return (
              <div 
                key={item.id} 
                className="group relative flex flex-col justify-between rounded-3xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl hover:border-gray-300/90 transition-all duration-300 overflow-hidden"
                id={`template-card-${item.id}`}
              >
                {/* Thumbnail Layer */}
                <div className="relative h-56 bg-gray-100 overflow-hidden" id={`card-thumbnail-${item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Status Overlays */}
                  {item.badge && (
                    <span className={`absolute left-4 top-4 text-[10px] font-extrabold tracking-wider text-white px-3 py-1 rounded-full shadow-sm uppercase ${
                      item.badge === 'BÁN CHẠY' 
                        ? 'bg-rose-500' 
                        : item.badge === 'PREMIUM'
                        ? 'bg-amber-500'
                        : 'bg-indigo-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {/* Rating Indicator */}
                  {item.rating && (
                    <span className="absolute left-4 bottom-4 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-yellow-400 font-bold text-xs px-2 py-0.75 rounded-lg">
                      <Star className="h-3 w-3 fill-yellow-400" />
                      <span>{item.rating}</span>
                    </span>
                  )}

                  {/* Price Tag in corner exactly like screenshots */}
                  <span className={`absolute right-4 top-4 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm ${
                    isFree 
                      ? 'bg-[#00aaff] text-white' 
                      : 'bg-white text-gray-800 border border-gray-100'
                  }`}>
                    {item.priceText}
                  </span>
                </div>

                {/* Details Area */}
                <div className="p-6 flex-1 flex flex-col justify-between" id={`card-details-${item.id}`}>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0056b3] transition-colors font-display">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom details & action row */}
                  <div className="mt-5 space-y-4 pt-4 border-t border-gray-100">
                    {/* Tags pill list */}
                    <div className="flex flex-wrap gap-1.5" id={`card-tags-${item.id}`}>
                      {item.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-[10px] bg-[#e3f2fd] text-[#0056b3] font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button 
                        onClick={() => onUseTemplate(item)}
                        className={`w-full py-2 px-4 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer hover:shadow-sm ${
                          isFree 
                            ? 'bg-blue-50 text-[#0056b3] hover:bg-blue-100' 
                            : 'bg-[#0056b3] text-white hover:bg-[#003f87]'
                        }`}
                        id={`use-temp-${item.id}`}
                      >
                        <span>{isFree ? 'Sử dụng miễn phí' : 'Mua ngay / Thiết kế'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200" id="empty-search-state">
          <Info className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-gray-800">Không tìm thấy giao diện phù hợp</h3>
          <p className="text-xs text-gray-500 mt-1">Vui lòng thay đổi cấu hình lọc hoặc từ khóa tìm kiếm của bạn.</p>
          <button 
            onClick={() => { setSearchQuery(''); setPriceFilter('all'); }}
            className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Xóa bộ lọc tìm kiếm
          </button>
        </div>
      )}

      {/* Load More Button matched to images */}
      {filteredTemplates.length > visibleCount && (
        <div className="text-center mt-12 mb-8" id="load-more-container">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-10 py-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-xs font-bold text-gray-700 cursor-pointer shadow-sm mx-auto active:scale-95"
            id="btn-load-more"
          >
            <span>Tải thêm giao diện</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );
}
