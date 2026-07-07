import { useMemo, useState } from 'react';
import {
  Globe, Loader2, Search, Rocket, FileEdit, Lock, ChevronDown, Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../store/AppContext';
import SiteConfigCard from './_components/SiteConfigCard';

type StatusFilter = 'all' | 'published' | 'draft' | 'locked';
type SortBy = 'updated' | 'name';

const STATUS_CHIPS: { id: StatusFilter; label: string }[] = [
  { id: 'all',       label: 'Tất cả' },
  { id: 'published', label: 'Đang live' },
  { id: 'draft',     label: 'Bản nháp' },
  { id: 'locked',    label: 'Đã khóa' },
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const {
    siteConfigs, siteConfigsLoaded, removeSiteConfig,
    showConfirm, showSnackbar, user,
  } = useAppContext();

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('updated');

  const handleDeleteSiteConfig = (id: string) => {
    showConfirm({
      title: 'Xóa website?',
      message: 'Website và toàn bộ nội dung tùy chỉnh sẽ bị xóa vĩnh viễn. Không thể khôi phục.',
      confirmLabel: 'Xóa website',
      variant: 'danger',
      onConfirm: async () => {
        try {
          await removeSiteConfig(id);
          showSnackbar('Đã xóa website thành công.', 'success');
        } catch {
          showSnackbar('Không thể xóa. Vui lòng thử lại.', 'error');
        }
      },
    });
  };

  const publishedCount = siteConfigs.filter(s => s.status === 'published' && !s.planLocked).length;
  const draftCount = siteConfigs.filter(s => s.status === 'draft').length;
  const lockedCount = siteConfigs.filter(s => s.planLocked).length;

  // ── Filter + search + sort ──────────────────────────────────────────────
  const visible = useMemo(() => {
    let result = [...siteConfigs];

    if (statusFilter === 'published') result = result.filter(s => s.status === 'published' && !s.planLocked);
    else if (statusFilter === 'draft') result = result.filter(s => s.status === 'draft');
    else if (statusFilter === 'locked') result = result.filter(s => s.planLocked);

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q),
      );
    }

    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    else result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    return result;
  }, [siteConfigs, statusFilter, query, sortBy]);

  const stats = [
    { label: 'Tổng website', value: siteConfigs.length, Icon: Globe,    accent: 'from-fnb-red to-fnb-orange',    shadow: 'shadow-fnb-red/25' },
    { label: 'Đang live',    value: publishedCount,     Icon: Rocket,   accent: 'from-fnb-green to-emerald-600', shadow: 'shadow-fnb-green/25' },
    { label: 'Bản nháp',     value: draftCount,         Icon: FileEdit, accent: 'from-fnb-amber to-fnb-orange',  shadow: 'shadow-fnb-amber/25' },
    { label: 'Đã khóa',      value: lockedCount,        Icon: Lock,     accent: 'from-fnb-pink to-fnb-red',      shadow: 'shadow-fnb-pink/25' },
  ];

  return (
    <div className="py-8 px-6 xl:px-10 w-full space-y-8">

      {/* ── Welcome banner ───────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
            Chào mừng trở lại{user?.name ? `, ${user.name}` : ', Chủ Quán'}!
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Tổng quan hoạt động và hiệu năng kinh doanh của bạn hôm nay.
          </p>
        </div>
        <button
          onClick={() => navigate('/marketplace')}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-fnb-red to-fnb-orange hover:shadow-lg hover:shadow-fnb-red/30 text-white text-xs font-bold rounded-full shadow-sm transition-all cursor-pointer active:scale-95 self-start md:self-auto"
        >
          <Sparkles className="h-4 w-4" />
          <span>Tạo Website Mới</span>
        </button>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <div className="stagger-children grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, Icon, accent, shadow }) => (
          <div
            key={label}
            className="hover-lift flex items-center gap-3.5 bg-white rounded-2xl border border-outline-variant/50 px-4 py-3.5 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} text-white flex items-center justify-center shadow-md ${shadow} shrink-0`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-display font-extrabold text-gray-900 leading-none">{value}</p>
              <p className="text-[11px] text-on-surface-variant font-medium mt-1 truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Websites section ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        {/* Toolbar: title + search + chips + sort */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 pb-3 border-b border-outline-variant/40">
          <div className="flex items-center gap-2 mr-auto">
            <h2 className="text-lg font-bold text-gray-900 font-display">Website của tôi</h2>
            {!siteConfigsLoaded && <Loader2 className="h-4 w-4 animate-spin text-outline" />}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-outline pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc slug..."
              className="w-full rounded-full border border-outline-variant/70 bg-white py-2 pl-8.5 pr-3 text-xs focus:border-fnb-orange focus:outline-none focus:ring-2 focus:ring-fnb-orange/20 transition-all"
            />
          </div>

          {/* Status chips */}
          <div className="flex flex-wrap gap-1.5">
            {STATUS_CHIPS.map(c => (
              <button
                key={c.id}
                onClick={() => setStatusFilter(c.id)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  statusFilter === c.id
                    ? 'bg-gradient-to-r from-fnb-red to-fnb-orange text-white border-transparent shadow-sm shadow-fnb-red/30'
                    : 'bg-white text-on-surface-variant border-outline-variant hover:border-fnb-orange hover:text-primary'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortBy)}
              className="appearance-none bg-white border border-outline-variant/70 text-[11px] font-semibold text-gray-700 rounded-full pl-3.5 pr-8 py-1.5 focus:border-fnb-orange focus:outline-none cursor-pointer transition-colors"
            >
              <option value="updated">Mới cập nhật</option>
              <option value="name">Tên A→Z</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-outline pointer-events-none" />
          </div>
        </div>

        {/* Grid / empty states */}
        {siteConfigsLoaded && siteConfigs.length === 0 ? (
          <div className="text-center py-14 bg-gradient-to-br from-fnb-cream to-fnb-orange/10 rounded-3xl border border-dashed border-fnb-orange/30">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-fnb-red to-fnb-orange text-white flex items-center justify-center shadow-lg shadow-fnb-red/25">
              <Globe className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-gray-800">Bạn chưa có website nào.</p>
            <p className="text-xs text-gray-500 mt-1 mb-5">Chọn một mẫu đẹp và tùy chỉnh theo thương hiệu của bạn — chỉ mất vài phút.</p>
            <button
              onClick={() => navigate('/marketplace')}
              className="px-6 py-2.5 bg-gradient-to-r from-fnb-red to-fnb-orange text-white text-xs font-bold rounded-full hover:shadow-lg hover:shadow-fnb-red/30 transition-all cursor-pointer active:scale-95"
            >
              Khám phá Kho Giao Diện
            </button>
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-12 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant">
            <Search className="h-8 w-8 text-outline mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-700">Không tìm thấy website phù hợp.</p>
            <p className="text-xs text-gray-500 mt-1">Thử đổi từ khóa hoặc bộ lọc trạng thái.</p>
          </div>
        ) : (
          <div className="stagger-children grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8">
            {visible.map(site => (
              <SiteConfigCard
                key={site.id}
                site={site}
                onDelete={() => handleDeleteSiteConfig(site.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
