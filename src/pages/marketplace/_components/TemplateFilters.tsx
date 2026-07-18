// Thanh filter: lọc giá (Tất cả / Miễn phí / Trả phí) + sort dropdown + count hiển thị
import { ChevronDown } from 'lucide-react';

export type PriceFilter = 'all' | 'free' | 'paid';
export type SortBy = 'newest' | 'bestseller' | 'mostStarred' | 'priceAsc' | 'priceDesc';

interface Props {
  priceFilter: PriceFilter;
  sortBy: SortBy;
  totalCount: number;
  onPriceChange: (v: PriceFilter) => void;
  onSortChange: (v: SortBy) => void;
}

const PRICE_OPTIONS: { id: PriceFilter; label: string }[] = [
  { id: 'all',  label: 'Tất cả' },
  { id: 'free', label: 'Miễn phí' },
  { id: 'paid', label: 'Trả phí' },
];

export default function TemplateFilters({ priceFilter, sortBy, totalCount, onPriceChange, onSortChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-b border-gray-100 pb-5 mb-8">
      {/* Left: count + price pills */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Result count badge */}
        <span className="text-[11px] font-bold text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/50">
          {totalCount} mẫu
        </span>

        {/* Price filter pills */}
        <div className="flex bg-gray-100/80 p-1 rounded-full text-xs font-medium">
          {PRICE_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => onPriceChange(opt.id)}
              className={`rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                priceFilter === opt.id
                  ? 'bg-linear-to-r from-primary to-primary-container text-white font-semibold shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right: sort dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Sắp Xếp:</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value as SortBy)}
            className="appearance-none bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700 rounded-full pl-4 pr-9 py-1.5 focus:border-primary-container focus:outline-none cursor-pointer"
          >
            <option value="newest">Mới nhất</option>
            <option value="bestseller">Bán chạy</option>
            <option value="mostStarred">Nhiều sao nhất</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
