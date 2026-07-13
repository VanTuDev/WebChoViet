// Card một website của user — đồng bộ phong cách mini card bên Marketplace:
// khung trình duyệt 3 chấm + slug, ảnh dọc 3/4 hover cuộn toàn trang,
// nút hành động chính nằm trong overlay khi hover.
import { Edit3, ExternalLink, Trash2, Globe, FileEdit, Lock, Link2, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SiteConfig } from '../../../../types';
import { TEMPLATES } from '../../../../data';
import { TEMPLATE_NAME_MAP } from '../../../../data/templates/registry';
import { TEMPLATE_SCREEN_BY_ID } from '../../../../utils/templateScreens';
import { ROUTES } from '../../../../config/routes';
import { useAppContext } from '../../../../store/AppContext';

interface Props {
  site: SiteConfig;
  onDelete: () => void;
}

const LANG_LABELS: Record<string, string> = {
  vi: 'VI', en: 'EN', zh: 'ZH', ko: 'KO',
};

export default function SiteConfigCard({ site, onDelete }: Props) {
  const navigate = useNavigate();
  const { showSnackbar } = useAppContext();
  const template = TEMPLATES.find(t => t.id === site.templateId);
  const screen = TEMPLATE_SCREEN_BY_ID[site.templateId];
  const isPublished = site.status === 'published';
  const goEdit = () => navigate(`/template-editor/${site.id}`);

  const updatedDate = new Date(site.updatedAt).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit',
  });

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${site.slug}`);
      showSnackbar('Đã sao chép link website.', 'success');
    } catch {
      showSnackbar('Không thể sao chép link.', 'error');
    }
  };

  return (
    <article className="group relative flex flex-col rounded-xl border border-outline-variant/60 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">

      {/* ── Thanh trình duyệt: 3 chấm + slug ────────────────────────────── */}
      <div className="flex items-center gap-0.5 px-2 py-1 bg-gradient-to-r from-fnb-cream to-white border-b border-outline-variant/40 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-fnb-red" />
        <span className="w-1.5 h-1.5 rounded-full bg-fnb-amber" />
        <span className="w-1.5 h-1.5 rounded-full bg-fnb-green" />
        <span className="ml-1.5 flex-1 truncate text-[9px] font-mono text-on-surface-variant bg-surface-container-low rounded-full px-2 py-px">
          vngoweb.com/{site.slug}
        </span>
      </div>

      {/* ── Screenshot dọc — nhấn mở editor, hover cuộn toàn trang ─────── */}
      <div
        onClick={goEdit}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && goEdit()}
        aria-label={`Chỉnh sửa website ${site.name}`}
        className={`relative aspect-[3/4] w-full overflow-hidden bg-surface-container-low cursor-pointer ${screen ? 'tmpl-screen' : ''}`}
      >
        {screen || template?.imageUrl ? (
          <img
            src={screen ?? template?.imageUrl}
            alt={site.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className={`h-full w-full object-cover ${screen ? 'object-top' : 'transition-transform duration-700 group-hover:scale-105'}`}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-outline">
            <Globe className="w-10 h-10 opacity-30" />
          </div>
        )}

        {/* Status badge — vị trí như badge template */}
        <span
          className={`absolute left-1.5 top-1.5 flex items-center gap-1 text-[8px] font-extrabold tracking-wide text-white px-2 py-0.5 rounded-full shadow uppercase ${
            site.planLocked
              ? 'bg-gradient-to-r from-fnb-amber to-fnb-orange'
              : isPublished
                ? 'bg-fnb-green'
                : 'bg-gray-400'
          }`}
          title={site.planLocked ? 'Vượt giới hạn gói Free nên tạm khóa — nâng cấp gói hoặc xóa bớt website để mở lại.' : undefined}
        >
          {site.planLocked ? (<><Lock className="h-2 w-2" /> Khóa</>) : isPublished ? '● Live' : '○ Nháp'}
        </span>

        {/* Overlay hành động khi hover */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 pb-2 pt-8 px-2 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={e => { e.stopPropagation(); goEdit(); }}
            className="w-full max-w-[140px] inline-flex items-center justify-center gap-1 bg-white/95 text-on-surface hover:text-primary text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow cursor-pointer active:scale-95 transition-all"
          >
            <Edit3 className="h-2.5 w-2.5" />
            Chỉnh sửa
          </button>
          {site.planLocked ? (
            <button
              onClick={e => { e.stopPropagation(); navigate(ROUTES.PRICING); }}
              className="w-full max-w-[140px] inline-flex items-center justify-center gap-1 bg-gradient-to-r from-fnb-amber to-fnb-orange text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg shadow-fnb-amber/40 cursor-pointer active:scale-95 transition-all"
            >
              <Lock className="h-2.5 w-2.5" />
              Nâng cấp để mở
            </button>
          ) : isPublished ? (
            <a
              href={`/${site.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-full max-w-[140px] inline-flex items-center justify-center gap-1 bg-gradient-to-r from-fnb-red to-fnb-orange text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg shadow-fnb-red/40 cursor-pointer active:scale-95 transition-all"
            >
              <ExternalLink className="h-2.5 w-2.5" />
              Xem Live
            </a>
          ) : (
            <button
              onClick={e => { e.stopPropagation(); goEdit(); }}
              className="w-full max-w-[140px] inline-flex items-center justify-center gap-1 bg-gradient-to-r from-fnb-amber to-fnb-orange text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg shadow-fnb-amber/40 cursor-pointer active:scale-95 transition-all"
            >
              <FileEdit className="h-2.5 w-2.5" />
              Xuất bản
            </button>
          )}
        </div>
      </div>

      {/* ── Info: tên + ngày / template + thao tác nhanh ────────────────── */}
      <div className="px-2 py-1.5 flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-[12px] font-bold text-gray-900 group-hover:text-primary transition-colors font-display truncate">
            {site.name}
          </h3>
          <span className="shrink-0 text-[9px] text-on-surface-variant font-medium">{updatedDate}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-on-surface-variant font-medium">
          <span className="truncate">{TEMPLATE_NAME_MAP[site.templateId] ?? site.templateId}</span>
          <span className="shrink-0 font-bold text-primary/70">{LANG_LABELS[site.lang] ?? site.lang}</span>
          <span className="flex items-center gap-0.5 ml-auto shrink-0">
            {isPublished && !site.planLocked && (
              <>
                <button
                  onClick={copyLink}
                  className="p-1 rounded-md text-gray-400 hover:bg-fnb-cream hover:text-primary transition-colors cursor-pointer"
                  title="Sao chép link website"
                >
                  <Link2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => navigate(ROUTES.DASHBOARD_QRCODES)}
                  className="p-1 rounded-md text-gray-400 hover:bg-fnb-cream hover:text-primary transition-colors cursor-pointer"
                  title="Mã QR của website"
                >
                  <QrCode className="h-3 w-3" />
                </button>
              </>
            )}
            <button
              onClick={onDelete}
              className="p-1 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              title="Xóa dự án"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </span>
        </div>
      </div>
    </article>
  );
}
