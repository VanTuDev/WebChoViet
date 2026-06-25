// Panel bên phải dashboard: hiển thị QR Code của project đang được chọn
import { Download } from 'lucide-react';
import type { Project } from '../../../../types';

interface Props {
  project: Project | null;
  onToggleStatus: () => void;
}

export default function QRPanel({ project, onToggleStatus }: Props) {
  const handleDownload = () => {
    if (!project) return;
    const link = document.createElement('a');
    link.href = project.qrCodeUrl;
    link.target = '_blank';
    link.download = `${project.storeName}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!project) {
    return (
      <div className="bg-gray-50 border rounded-3xl p-6 text-center text-gray-500 text-xs py-10">
        Vui lòng tạo một dự án mới để quản lý mã QR Code của bạn.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#e3f2fd]/60 to-white border border-[#e3f2fd] rounded-3xl p-6 text-center space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0056b3] bg-[#e3f2fd] px-2.5 py-0.5 rounded-full inline-block">
          Mã QR Động
        </span>
        <h3 className="text-sm font-semibold text-gray-800 pt-2">
          Dự án: <span className="text-[#0056b3] font-bold">{project.storeName}</span>
        </h3>
      </div>

      {/* QR image với corner decorations */}
      <div className="bg-white p-5 rounded-2xl inline-block shadow-sm border border-gray-100 relative group">
        <img
          src={project.qrCodeUrl}
          alt={`QR cho ${project.storeName}`}
          referrerPolicy="no-referrer"
          className="h-44 w-44 object-contain mx-auto"
        />
        <div className="absolute inset-5 border-2 border-indigo-500/20 rounded-lg pointer-events-none group-hover:border-[#00aaff]/60 transition-colors">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00aaff]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00aaff]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00aaff]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00aaff]" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-gray-500 leading-relaxed px-2">
          Khách hàng quét mã này bằng camera hoặc Zalo để truy cập tức thì vào menu của bạn.
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0056b3] hover:bg-[#003f87] text-white rounded-xl text-xs font-bold shadow transition-all cursor-pointer active:scale-95"
          >
            <Download className="h-4 w-4" />
            <span>Tải mã QR</span>
          </button>
          <button
            onClick={onToggleStatus}
            className={`w-full flex items-center justify-center gap-1.5 py-2 border rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              project.status === 'Active'
                ? 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                : 'border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 text-[#0056b3]'
            }`}
          >
            {project.status === 'Active' ? 'Tạm ngưng hoạt động' : 'Kích hoạt lại cửa hàng'}
          </button>
        </div>
      </div>
    </div>
  );
}
