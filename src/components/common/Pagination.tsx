import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  totalPages: number;
  total: number;
  /** Danh từ đơn vị đếm — vd "tài khoản", "giao dịch", "website" */
  itemLabel: string;
  onChange: (page: number) => void;
  disabled?: boolean;
}

/** Điều khiển phân trang prev/next dùng chung cho các bảng admin — ẩn hẳn khi chỉ có 1 trang. */
export default function Pagination({ page, totalPages, total, itemLabel, onChange, disabled }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800">
      <p className="text-[11px] text-slate-500">
        Trang {page}/{totalPages} · {total.toLocaleString('vi-VN')} {itemLabel}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={disabled || page <= 1}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={disabled || page >= totalPages}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
