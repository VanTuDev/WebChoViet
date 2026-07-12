// Card hiển thị một template trong grid — UI-only, nhận data qua props.
// Mini card: khung ảnh dọc 3/4 thấy phần lớn mẫu (hover cuộn toàn trang),
// nút hành động hiện trong overlay khi hover; nhấn ảnh = mở xem trước.
import { Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Template } from '../../../data/templates/registry';
import { CATEGORY_REGISTRY } from '../../../data/templates/registry';
import { TEMPLATE_SCREEN_BY_ID } from '../../../utils/templateScreens';

const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORY_REGISTRY.map(c => [c.id, c.label]),
);

interface Props {
  template: Template;
  onUse: (t: Template) => void;
}

export default function TemplateCard({ template: t, onUse }: Props) {
  const navigate = useNavigate();
  const isFree = t.price === 0;
  // Ưu tiên screenshot full-page thật (hover cuộn xem toàn trang), fallback ảnh cover
  const screen = TEMPLATE_SCREEN_BY_ID[t.id];
  const goPreview = () => navigate(`/marketplace/preview/${t.id}`);
  const goUse = () => (isFree ? navigate(`/template-editor/new?template=${t.id}`) : onUse(t));

  return (
    <article className="group relative flex flex-col rounded-xl border border-outline-variant/60 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">

      {/* ── Thanh trình duyệt tối giản (3 chấm) ─────────────────────────── */}
      <div className="flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-fnb-cream to-white border-b border-outline-variant/40 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-fnb-red" />
        <span className="w-1.5 h-1.5 rounded-full bg-fnb-amber" />
        <span className="w-1.5 h-1.5 rounded-full bg-fnb-green" />
      </div>

      {/* ── Screenshot dọc — nhấn mở xem trước, hover cuộn toàn trang ──── */}
      <div
        onClick={goPreview}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && goPreview()}
        aria-label={`Xem trước mẫu ${t.name}`}
        className={`relative aspect-[3/4] w-full overflow-hidden bg-surface-container-low cursor-pointer ${screen ? 'tmpl-screen' : ''}`}
      >
        <img
          src={screen ?? t.imageUrl}
          alt={t.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`h-full w-full object-cover ${screen ? 'object-top' : 'transition-transform duration-700 group-hover:scale-105'}`}
        />

        {t.badge && (
          <span className={`absolute left-1.5 top-1.5 text-[8px] font-extrabold tracking-wide text-white px-1.5 py-0.5 rounded-full shadow uppercase ${
            t.badge === 'BÁN CHẠY'
              ? 'bg-gradient-to-r from-fnb-red to-fnb-orange'
              : t.badge === 'PREMIUM'
                ? 'bg-gradient-to-r from-fnb-amber to-fnb-orange'
                : 'bg-fnb-green'
          }`}>
            {t.badge}
          </span>
        )}

        {/* Overlay hành động khi hover */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 pb-2 pt-8 px-2 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={e => { e.stopPropagation(); goPreview(); }}
            className="w-full max-w-[140px] inline-flex items-center justify-center gap-1 bg-white/95 text-on-surface hover:text-primary text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow cursor-pointer active:scale-95 transition-all"
          >
            <Eye className="h-2.5 w-2.5" />
            Xem trước
          </button>
          <button
            onClick={e => { e.stopPropagation(); goUse(); }}
            className="w-full max-w-[140px] inline-flex items-center justify-center bg-gradient-to-r from-fnb-red to-fnb-orange text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg shadow-fnb-red/40 cursor-pointer active:scale-95 transition-all"
          >
            {isFree ? 'Dùng miễn phí' : 'Mua ngay'}
          </button>
        </div>
      </div>

      {/* ── Info 2 hàng: tên + giá / danh mục + rating ──────────────────── */}
      <div className="px-2 py-1.5 flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-[12px] font-bold text-gray-900 group-hover:text-primary transition-colors font-display truncate">
            {t.name}
          </h3>
          <span className={`shrink-0 text-[10px] font-extrabold ${isFree ? 'text-fnb-green' : 'text-primary'}`}>
            {t.priceText}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-on-surface-variant font-medium">
          <span className="truncate">{CATEGORY_LABEL[t.category] ?? t.category}</span>
          {t.rating && (
            <span className="flex items-center gap-0.5 shrink-0 font-bold text-on-surface ml-auto">
              <Star className="h-2.5 w-2.5 text-fnb-amber fill-fnb-amber" />
              {t.rating}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
