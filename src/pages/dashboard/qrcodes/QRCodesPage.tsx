import { useAppContext } from '../../../store/AppContext';
import { getPublicSiteUrl } from '../../../utils/tenant';

export default function QRCodesPage() {
  const { siteConfigs } = useAppContext();

  const publishedSites = siteConfigs.filter(s => s.status === 'published');

  return (
    <div className="py-8 px-6 xl:px-10 w-full space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-gray-900">Danh Sách Toàn Bộ Mã QR</h1>
        <p className="text-xs text-gray-500 mt-1">In ấn dán bàn dễ dàng. Bấm vào từng dòng để tải file chất lượng cao.</p>
      </div>

      <div className="space-y-4">
        {publishedSites.map(site => {
          const siteUrl = getPublicSiteUrl(site.slug);
          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(siteUrl)}`;
          return (
            <div key={site.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <img src={qrUrl} className="h-16 w-16" alt={site.name} referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-sm text-gray-800">{site.name}</h4>
                  <p className="text-xs text-gray-400 font-mono">{siteUrl}</p>
                  <span className="text-[10px] font-bold mt-1 inline-block text-emerald-600">● Đang live</span>
                </div>
              </div>
              <a
                href={qrUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="px-4 py-2 border rounded-full text-xs font-bold text-primary-container hover:bg-slate-50 cursor-pointer"
              >
                Tải trực tiếp
              </a>
            </div>
          );
        })}

        {publishedSites.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-xs text-gray-500">
            Chưa có website nào được xuất bản. Xuất bản website để nhận mã QR.
          </div>
        )}
      </div>
    </div>
  );
}
