// Card hiển thị một template trong grid — UI-only, nhận data qua props
import { Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Template } from '../../../types';

interface Props {
  template: Template;
  onUse: (t: Template) => void;
}

export default function TemplateCard({ template: t, onUse }: Props) {
  const navigate = useNavigate();
  const isFree = t.price === 0;

  return (
    <article className="group relative flex flex-col justify-between rounded-3xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl hover:border-gray-300/90 transition-all duration-300 overflow-hidden">
      {/* ── Thumbnail ───────────────────────────────────────────────────── */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        <img
          src={t.imageUrl}
          alt={t.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge: BÁN CHẠY / PREMIUM / MỚI */}
        {t.badge && (
          <span className={`absolute left-4 top-4 text-[10px] font-extrabold tracking-wider text-white px-3 py-1 rounded-full shadow-sm uppercase ${
            t.badge === 'BÁN CHẠY' ? 'bg-rose-500' : t.badge === 'PREMIUM' ? 'bg-amber-500' : 'bg-indigo-600'
          }`}>
            {t.badge}
          </span>
        )}

        {/* Rating */}
        {t.rating && (
          <span className="absolute left-4 bottom-4 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-yellow-400 font-bold text-xs px-2 py-1 rounded-lg">
            <Star className="h-3 w-3 fill-yellow-400" />
            {t.rating}
          </span>
        )}

        {/* Price tag */}
        <span className={`absolute right-4 top-4 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm ${
          isFree ? 'bg-[#00aaff] text-white' : 'bg-white text-gray-800 border border-gray-100'
        }`}>
          {t.priceText}
        </span>
      </div>

      {/* ── Details ─────────────────────────────────────────────────────── */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0056b3] transition-colors font-display">
            {t.name}
          </h3>
          <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">{t.description}</p>
        </div>

        <div className="mt-5 space-y-4 pt-4 border-t border-gray-100">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {t.tags.map((tag, i) => (
              <span key={i} className="text-[10px] bg-[#e3f2fd] text-[#0056b3] font-medium px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/marketplace/preview/${t.id}`)}
              className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95 cursor-pointer"
              title="Xem trước template"
            >
              <Eye className="h-3.5 w-3.5" />
              Xem trước
            </button>
            <button
              onClick={() => isFree
                ? navigate(`/template-editor/new?template=${t.id}`)
                : onUse(t)
              }
              className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer hover:shadow-sm ${
                isFree
                  ? 'bg-blue-50 text-[#0056b3] hover:bg-blue-100'
                  : 'bg-[#0056b3] text-white hover:bg-[#003f87]'
              }`}
            >
              {isFree ? 'Dùng miễn phí' : 'Mua ngay'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
