import { useState } from 'react';
import {
  Plus,
  Edit3,
  Eye,
  QrCode,
  Download,
  Trash2,
  TrendingUp,
  Calendar,
  ExternalLink,
  Smartphone,
  Info,
} from 'lucide-react';
import { Project, Metric } from '../types';

interface DashboardProps {
  projects: Project[];
  metrics: Metric[];
  onEditProject: (project: Project) => void;
  onPreviewProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onAddNewClick: () => void;
  onToggleStatus: (projectId: string) => void;
}

export default function Dashboard({
  projects,
  metrics,
  onEditProject,
  onPreviewProject,
  onDeleteProject,
  onAddNewClick,
  onToggleStatus
}: DashboardProps) {
  // Selected project for the active QR Code highlight card on the right
  const [selectedProjId, setSelectedProjId] = useState<string>(projects[0]?.id || '');

  const activeQRProject = projects.find(p => p.id === selectedProjId) || projects[0] || null;

  const handleDownloadQR = (project: Project) => {
    // Standard prompt to download or notify
    const link = document.createElement('a');
    link.href = project.qrCodeUrl;
    link.target = '_blank';
    link.download = `${project.storeName}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 py-8 px-6 md:px-10 overflow-y-auto max-w-7xl mx-auto space-y-8" id="dashboard-main-view">
      {/* Welcome Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" id="welcome-banner">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
            Chào mừng trở lại, Tên chủ quán!
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Tổng quan hoạt động kinh doanh và hiệu năng kinh doanh của bạn hôm nay.
          </p>
        </div>
        <button
          onClick={onAddNewClick}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00aaff] hover:bg-[#0089cc] text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all cursor-pointer select-none active:scale-95 self-start md:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Tạo Website Mới</span>
        </button>
      </div>

      {/* Metrics Row - Matches dashboard screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="dashboard-metrics">
        {metrics.map((metric, idx) => {
          // Render based on visual style
          return (
            <div 
              key={idx} 
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
              id={`metric-box-${idx}`}
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  {metric.title}
                </span>
                <span className="text-3xl font-display font-extrabold text-gray-800 block">
                  {metric.value}
                </span>
              </div>
              <div className="text-right">
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                  metric.changeType === 'increase' 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : metric.changeType === 'decrease'
                    ? 'bg-rose-50 text-rose-700'
                    : 'bg-gray-50 text-gray-500'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Area - Split: Projects List on Left, Active QR Manager on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="dashboard-split-panels">
        
        {/* Projects List: Handles 2 Columns */}
        <div className="lg:col-span-2 space-y-5" id="projects-list-panel">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 font-display">
              Dự án của tôi
            </h2>
            <button 
              className="text-[#0056b3] hover:text-[#003f87] text-xs font-semibold"
              onClick={() => alert('Đang hiển thị toàn bộ dự án hiện hành.')}
            >
              Xem tất cả &rarr;
            </button>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => {
                const isSelected = selectedProjId === proj.id;
                const templatePreviewImg = proj.items[0]?.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80';
                
                return (
                  <div 
                    key={proj.id}
                    onClick={() => setSelectedProjId(proj.id)}
                    className={`group relative flex flex-col justify-between rounded-2xl border bg-white overflow-hidden transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'border-[#00aaff] ring-2 ring-[#00aaff]/10 shadow-md translate-y-[-2px]' 
                        : 'border-gray-200/80 hover:border-gray-300 hover:shadow shadow-sm'
                    }`}
                    id={`project-card-${proj.id}`}
                  >
                    {/* Project Visual Mock thumbnail */}
                    <div className="relative h-40 bg-gray-50 overflow-hidden">
                      <img 
                        src={templatePreviewImg} 
                        alt={proj.storeName}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      
                      {/* Active / Draft Status */}
                      <span className={`absolute top-3 right-3 text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full shadow-sm text-white ${
                        proj.status === 'Active' ? 'bg-[#00aaff]' : 'bg-gray-400'
                      }`}>
                        ● {proj.status}
                      </span>
                    </div>

                    {/* Description Area */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 font-display group-hover:text-[#0056b3] transition-colors leading-snug">
                          {proj.storeName}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Cập nhật lần cuối: {proj.lastUpdated}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                          {proj.description || 'Chưa cấu hình mô tả của cửa hàng.'}
                        </p>
                      </div>

                      {/* Action Layout Buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                        {/* Edit Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditProject(proj);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200/80 text-gray-700 transition-colors cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Sửa</span>
                        </button>

                        {/* View Live Live Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPreviewProject(proj);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-[#0056b3] hover:bg-[#003f87] text-white transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Xem Live</span>
                        </button>

                        {/* Delete Trash Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteProject(proj.id);
                          }}
                          className="p-2 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors cursor-pointer"
                          title="Xóa dự án"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-sm font-medium text-gray-600">Bạn chưa thiết lập dự án nào.</p>
              <button
                onClick={onAddNewClick}
                className="mt-3 px-4 py-2 bg-[#0056b3] text-white text-xs font-semibold rounded-full hover:bg-opacity-95"
              >
                Khởi tạo ngay
              </button>
            </div>
          )}
        </div>

        {/* Dynamic QR Highlight Area - Right Side Panel matching image exactly */}
        <div className="space-y-5" id="qr-manager-panel">
          <div className="pb-2 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 font-display">
              Quản lý Mã QR
            </h2>
          </div>

          {activeQRProject ? (
            <div className="bg-gradient-to-b from-[#e3f2fd]/60 to-white border border-[#e3f2fd] rounded-3xl p-6 text-center space-y-6" id="qr-display-box">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0056b3] bg-[#e3f2fd] px-2.5 py-0.5 rounded-full inline-block">
                  Mã QR Động
                </span>
                <h3 className="text-sm font-semibold text-gray-800 pt-2">
                  Dự án: <span className="text-[#0056b3] font-bold">{activeQRProject.storeName}</span>
                </h3>
              </div>

              {/* QR Image block */}
              <div className="bg-white p-5 rounded-2xl inline-block shadow-sm border border-gray-100 relative group">
                <img 
                  src={activeQRProject.qrCodeUrl}
                  alt={`QR cho ${activeQRProject.storeName}`}
                  referrerPolicy="no-referrer"
                  className="h-44 w-44 object-contain mx-auto"
                />
                
                {/* Visual Scanner Guide line overlay */}
                <div className="absolute inset-5 border-2 border-indigo-500/20 rounded-lg pointer-events-none group-hover:border-[#00aaff]/60 transition-colors">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00aaff]" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00aaff]" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00aaff]" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00aaff]" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-500 leading-relaxed px-2">
                  Khách hàng có thể quét mã này trực tiếp bằng camera điện thoại, Zalo để truy cập tức thì vào thực đơn/cửa hàng của bạn.
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  {/* Download Action  */}
                  <button
                    onClick={() => handleDownloadQR(activeQRProject)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0056b3] hover:bg-[#003f87] text-white rounded-xl text-xs font-bold shadow transition-all cursor-pointer select-none active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    <span>Tải mã QR</span>
                  </button>

                  {/* Toggle Status of dynamic site */}
                  <button
                    onClick={() => onToggleStatus(activeQRProject.id)}
                    className={`w-full flex items-center justify-center gap-1.5 py-2 border rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      activeQRProject.status === 'Active'
                        ? 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                        : 'border-blue-200 bg-blue-50/50 hover:bg-blue-100/50 text-[#0056b3]'
                    }`}
                  >
                    {activeQRProject.status === 'Active' ? 'Tạm ngưng hoạt động cửa hàng' : 'Kích hoạt hoạt động cửa hàng'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-3xl p-6 text-center text-gray-500 text-xs py-10">
              Vui lòng tạo một dự án mới để quản lý mã QR Code của bạn.
            </div>
          )}
        </div>
      </div>
      
      {/* Visual walkthrough banner  */}
      <div className="bg-[#e3f2fd] rounded-2xl p-5 flex items-start gap-4 border border-[#bbd0ff]">
        <span className="p-2 bg-[#00aaff]/10 text-[#0056b3] rounded-xl shrink-0">
          <Info className="h-5 w-5" />
        </span>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Mẹo tối ưu vận hành:</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Mã QR Code được khởi tạo tại WebChoViet là **Mã QR Động**. Bạn hoàn toàn có thể sửa đổi nội dung món ăn, bảng giá dịch vụ hay tên cửa hiệu bất kỳ lúc nào trong trình chỉnh sửa mà **không cần phải in lại mã QR mới**. Tiết kiệm tới 100% chi phí in ấn quảng bá!
          </p>
        </div>
      </div>
    </div>
  );
}
