// Trang danh sách toàn bộ mã QR — in ấn dán bàn
import { useAppContext } from '../../../store/AppContext';

export default function QRCodesPage() {
  const { projects } = useAppContext();

  return (
    <div className="py-8 px-6 xl:px-10 w-full space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-gray-900">Danh Sách Toàn Bộ Mã QR</h1>
        <p className="text-xs text-gray-500 mt-1">In ấn dán bàn dễ dàng. Bấm vào từng dòng để tải file chất lượng cao.</p>
      </div>

      <div className="space-y-4">
        {projects.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <img src={p.qrCodeUrl} className="h-16 w-16" alt={p.storeName} referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-bold text-sm text-gray-800">{p.storeName}</h4>
                <p className="text-xs text-gray-400 font-mono">ID: {p.id}</p>
                <span className={`text-[10px] font-bold mt-1 inline-block ${
                  p.status === 'Active' ? 'text-emerald-600' : 'text-gray-400'
                }`}>
                  ● {p.status}
                </span>
              </div>
            </div>
            <a
              href={p.qrCodeUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              className="px-4 py-2 border rounded-full text-xs font-bold text-[#0056b3] hover:bg-slate-50 cursor-pointer"
            >
              Tải trực tiếp
            </a>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-xs text-gray-500">
            Chưa có dự án nào. Tạo website mới để nhận mã QR.
          </div>
        )}
      </div>
    </div>
  );
}
