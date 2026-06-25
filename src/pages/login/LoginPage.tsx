// Trang đăng nhập — standalone, chỉ hỗ trợ Google OAuth
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { useAppContext } from '../../store/AppContext';

// SVG logo Google chính thức
function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { showSnackbar } = useAppContext();

  const handleGoogleLogin = () => {
    // TODO: tích hợp Google OAuth thực tế
    showSnackbar('Đăng nhập thành công! Chào mừng bạn.', 'success');
    navigate(ROUTES.DASHBOARD_PROJECTS);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased overflow-hidden">

      {/* Background glows */}
      <div className="fixed -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-sky-100/60 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[120px] -z-10 pointer-events-none" />

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-6">
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Về trang chủ
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate(ROUTES.HOME)}
          className="font-lexend font-extrabold text-lg text-slate-900 cursor-pointer select-none"
        >
          web<span className="text-[#0056b3]">choviet</span>
        </motion.button>
      </div>

      {/* Main card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden">

            {/* Card header — blue gradient strip */}
            <div className="bg-linear-to-r from-[#003f87] to-[#0056b3] px-8 pt-8 pb-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 border border-white/25 mb-4 shadow-lg">
                  <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <h1 className="font-lexend font-bold text-[22px] text-white mb-1">Chào mừng trở lại</h1>
                <p className="text-sm text-blue-200/80">Đăng nhập để quản lý cửa hàng của bạn</p>
              </div>
            </div>

            {/* Card body */}
            <div className="px-8 py-8">

              {/* Google button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 h-12 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 shadow-sm group"
              >
                <GoogleLogo />
                <span>Tiếp tục với Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[11px] text-slate-400 font-medium px-1">hoặc</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Email — coming soon */}
              <button
                disabled
                className="w-full h-12 rounded-xl border border-dashed border-slate-200 text-sm text-slate-400 cursor-not-allowed flex items-center justify-center gap-2"
              >
                Đăng nhập bằng Email
                <span className="text-[9px] font-bold bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Sắp ra mắt
                </span>
              </button>

              {/* Terms */}
              <p className="text-center text-[11px] text-slate-400 leading-relaxed mt-6">
                Bằng cách đăng nhập, bạn đồng ý với{' '}
                <button className="text-[#0056b3] hover:underline cursor-pointer">Điều khoản</button>
                {' '}và{' '}
                <button className="text-[#0056b3] hover:underline cursor-pointer">Bảo mật</button>
                {' '}của WebChoViet.
              </p>
            </div>
          </div>

          {/* Below card */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-center text-xs text-slate-500 mt-6"
          >
            Chưa có tài khoản?{' '}
            <button
              onClick={() => navigate(ROUTES.MARKETPLACE)}
              className="text-[#0056b3] hover:underline cursor-pointer font-semibold"
            >
              Khám phá giao diện miễn phí
            </button>
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center justify-center gap-5 mt-6 text-[10px] text-slate-400 font-medium"
          >
            <span className="flex items-center gap-1">🔒 Bảo mật SSL</span>
            <span className="w-px h-3 bg-slate-200" />
            <span className="flex items-center gap-1">✓ Không lưu mật khẩu</span>
            <span className="w-px h-3 bg-slate-200" />
            <span className="flex items-center gap-1">✓ GDPR</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
