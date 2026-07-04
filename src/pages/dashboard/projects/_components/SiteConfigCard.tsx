import { Edit3, ExternalLink, Trash2, Globe, FileEdit, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SiteConfig } from '../../../../types';
import { TEMPLATES } from '../../../../data';
import { ROUTES } from '../../../../config/routes';

interface Props {
  site: SiteConfig;
  onDelete: () => void;
}

const TEMPLATE_NAMES: Record<string, string> = {
  'coffe-1': 'Garden Oasis',
  'coffe-2': 'Tropical Chill',
  'coffe-3': 'The Ocean Cafe',
  'coffe-4': 'Koi Garden',
  'coffe-5': 'Mật Ngọt Tea',
};

const LANG_LABELS: Record<string, string> = {
  vi: 'VI', en: 'EN', zh: 'ZH', ko: 'KO',
};

export default function SiteConfigCard({ site, onDelete }: Props) {
  const navigate = useNavigate();
  const template = TEMPLATES.find(t => t.id === site.templateId);
  const liveUrl = `/${site.slug}`;
  const isPublished = site.status === 'published';

  const updatedDate = new Date(site.updatedAt).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {template?.imageUrl ? (
          <img
            src={template.imageUrl}
            alt={site.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            <Globe className="w-10 h-10 opacity-30" />
          </div>
        )}

        {/* Status badge */}
        <span className={`absolute top-3 right-3 flex items-center gap-1 text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white ${
          site.planLocked ? 'bg-orange-500' : isPublished ? 'bg-emerald-500' : 'bg-gray-400'
        }`}>
          {site.planLocked ? (<><Lock className="h-2.5 w-2.5" /> Đã khóa</>) : isPublished ? '● Live' : '○ Nháp'}
        </span>

        {/* Template badge */}
        <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
          {TEMPLATE_NAMES[site.templateId] ?? site.templateId}
        </span>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#0056b3] transition-colors leading-snug line-clamp-1">
            {site.name}
          </h3>

          {/* URL slug */}
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Globe className="w-3 h-3 flex-shrink-0" />
            <span className="font-mono truncate">/{site.slug}</span>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 text-[10px] text-gray-400">
            <span>{LANG_LABELS[site.lang] ?? site.lang}</span>
            <span>·</span>
            <span>Cập nhật: {updatedDate}</span>
          </div>

          {site.planLocked && (
            <p className="text-[10px] text-orange-600 bg-orange-50 border border-orange-100 rounded-lg px-2 py-1.5 leading-relaxed">
              Vượt giới hạn gói Free nên tạm khóa, không hiển thị công khai. Nâng cấp gói hoặc xóa bớt website khác để mở lại.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
          <button
            onClick={() => navigate(`/template-editor/${site.id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200/80 text-gray-700 transition-colors cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Chỉnh sửa
          </button>

          {site.planLocked ? (
            <button
              onClick={() => navigate(ROUTES.PRICING)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white transition-colors cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" />
              Nâng cấp để mở
            </button>
          ) : isPublished ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-[#003f87] hover:bg-[#002d63] text-white transition-colors cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Xem Live
            </a>
          ) : (
            <button
              onClick={() => navigate(`/template-editor/${site.id}`)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer"
            >
              <FileEdit className="h-3.5 w-3.5" />
              Xuất bản
            </button>
          )}

          <button
            onClick={onDelete}
            className="p-2 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors cursor-pointer"
            title="Xóa dự án"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
