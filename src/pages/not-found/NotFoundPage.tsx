// Trang 404 — standalone, không dùng AppLayout
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, LayoutDashboard, ArrowLeft, MapPin } from 'lucide-react';
import { ROUTES } from '../../config/routes';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 font-sans antialiased relative overflow-hidden">
      <Helmet>
        <title>Không tìm thấy trang — WebChoViet</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Ambient glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-sky-200/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-100/25 blur-[150px] pointer-events-none" />

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-lg w-full"
      >

        {/* Big 404 */}
        <div className="relative inline-block mb-6">
          <span className="font-lexend font-black text-[140px] leading-none text-slate-100 select-none">
            404
          </span>
          {/* Icon overlay */}
          <motion.div
            animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity, repeatDelay: 4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100">
              <MapPin className="h-14 w-14 text-[#0056b3]" strokeWidth={1.5} />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
                <span className="text-white text-[10px] font-black">!</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <h1 className="font-lexend font-black text-2xl text-slate-900 mb-3">
          Trang này không tồn tại
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-2">
          Đường dẫn{' '}
          <code className="bg-slate-100 text-rose-600 px-1.5 py-0.5 rounded text-xs font-mono font-bold">
            {location.pathname}
          </code>{' '}
          không tìm thấy trên hệ thống.
        </p>
        <p className="text-slate-400 text-xs mb-8">
          Có thể đường dẫn đã bị thay đổi, hoặc bạn gõ nhầm URL.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 bg-white rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại trang trước
          </button>

          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#0056b3] hover:bg-[#003f87] rounded-full transition-all shadow-md cursor-pointer active:scale-95"
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </button>

          <button
            onClick={() => navigate(ROUTES.DASHBOARD_PROJECTS)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0056b3] border border-[#0056b3]/30 bg-blue-50 hover:bg-blue-100 rounded-full transition-all cursor-pointer active:scale-95"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">Trang phổ biến</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Kho Giao Diện', path: ROUTES.MARKETPLACE },
              { label: 'Bảng Giá',       path: ROUTES.PRICING },
              { label: 'Hướng Dẫn',      path: ROUTES.TUTORIALS },
              { label: 'Dự Án Của Tôi',  path: ROUTES.DASHBOARD_PROJECTS },
              { label: 'Quản Lý QR',     path: ROUTES.DASHBOARD_QRCODES },
              { label: 'Hỗ Trợ',         path: ROUTES.DASHBOARD_SUPPORT },
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="text-xs font-medium text-slate-600 hover:text-[#0056b3] px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-[#0056b3]/30 transition-all cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer brand */}
      <div className="absolute bottom-6 text-xs text-slate-400">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="font-lexend font-extrabold text-slate-700 cursor-pointer hover:text-[#0056b3] transition-colors"
        >
          web<span className="text-[#0056b3]">choviet</span>
        </button>
        {' '}&mdash; Giải pháp số hóa cho doanh nghiệp Việt
      </div>
    </div>
  );
}
