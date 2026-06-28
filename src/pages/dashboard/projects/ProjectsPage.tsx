import { Globe, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../store/AppContext';
import SiteConfigCard from './_components/SiteConfigCard';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const {
    siteConfigs, siteConfigsLoaded, removeSiteConfig,
    showConfirm, showSnackbar,
  } = useAppContext();

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

  const publishedSites = siteConfigs.filter(s => s.status === 'published');
  const draftSites = siteConfigs.filter(s => s.status === 'draft');

  return (
    <div className="py-8 px-6 xl:px-10 w-full space-y-10">

      {/* ── Welcome banner ───────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
            Chào mừng trở lại, Chủ Quán!
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Tổng quan hoạt động và hiệu năng kinh doanh của bạn hôm nay.
          </p>
        </div>
        <button
          onClick={() => navigate('/marketplace?category=coffee')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-[#002d63] text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer active:scale-95 self-start md:self-auto"
        >
          <Globe className="h-4 w-4" />
          <span>Tạo Website Mới</span>
        </button>
      </div>

      {/* ── Template websites ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900 font-display">Website của tôi</h2>
            {!siteConfigsLoaded && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            )}
          </div>
          <div className="flex items-center gap-2">
            {publishedSites.length > 0 && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                {publishedSites.length} đang live
              </span>
            )}
            <span className="text-primary-container text-xs font-semibold">{siteConfigs.length} website</span>
          </div>
        </div>

        {siteConfigsLoaded && siteConfigs.length === 0 ? (
          <div className="text-center py-12 bg-linear-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-dashed border-gray-200">
            <Globe className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-600">Bạn chưa có website nào.</p>
            <p className="text-xs text-gray-400 mt-1 mb-4">Chọn một template đẹp và tùy chỉnh theo thương hiệu của bạn.</p>
            <button
              onClick={() => navigate('/marketplace?category=coffee')}
              className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-full hover:bg-[#002d63] transition-colors"
            >
              Khám phá Template
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {publishedSites.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Đang xuất bản</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {publishedSites.map(site => (
                    <SiteConfigCard
                      key={site.id}
                      site={site}
                      onDelete={() => handleDeleteSiteConfig(site.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {draftSites.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bản nháp</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {draftSites.map(site => (
                    <SiteConfigCard
                      key={site.id}
                      site={site}
                      onDelete={() => handleDeleteSiteConfig(site.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
