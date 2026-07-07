// Thanh filter: lọc giá (Tất cả / Miễn phí / Trả phí) + sort dropdown
import { ChevronDown } from 'lucide-react';

export type PriceFilter = 'all' | 'free' | 'paid';
export type SortBy = 'newest' | 'bestseller' | 'priceAsc' | 'priceDesc';

interface Props {
  priceFilter: PriceFilter;
  sortBy: SortBy;
  onPriceChange: (v: PriceFilter) => void;
  onSortChange: (v: SortBy) => void;
}

const PRICE_OPTIONS: { id: PriceFilter; label: string }[] = [
  { id: 'all',  label: 'Tất cả' },
  { id: 'free', label: 'Miễn phí' },
  { id: 'paid', label: 'Trả phí' },
];

export default function TemplateFilters({ priceFilter, sortBy, onPriceChange, onSortChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-gray-100 pb-5 mb-8">
      {/* Price pills */}
      <div className="flex bg-gray-100/80 p-1 rounded-full text-xs font-medium">
        {PRICE_OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => onPriceChange(opt.id)}
            className={`rounded-full px-5 py-2 transition-all cursor-pointer ${
              priceFilter === opt.id
                ? 'bg-gradient-to-r from-primary to-primary-container text-white font-semibold shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sắp Xếp:</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value as SortBy)}
            className="appearance-none bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700 rounded-full pl-4 pr-10 py-1.5 focus:border-primary-container focus:outline-none cursor-pointer"
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
  );
}
