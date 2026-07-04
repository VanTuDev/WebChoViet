// Đăng nhập admin — dùng chung Google OAuth với user thường, chỉ khác ở chỗ
// kiểm tra role=admin sau khi xác thực. KHÔNG có mật khẩu riêng: quyền admin
// được gán thủ công trong MongoDB (users.role = 'admin'), backend AdminGuard
// là lớp bảo vệ thật sự.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ShieldX, Loader2, LogOut } from 'lucide-react';
import { ROUTES } from '../../../config/routes';
import { useAppContext } from '../../../store/AppContext';
import { getGoogleLoginUrl, setPostLoginRedirect } from '../../../services/authService';

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { user, authLoading, isAuthenticated, logout } = useAppContext();

  // Đã là admin → vào thẳng dashboard, không hiện lại trang login
  useEffect(() => {
    if (!authLoading && user?.role === 'admin') {
      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
    }
  }, [authLoading, user, navigate]);

  const handleGoogleLogin = () => {
    // Sau OAuth, AuthCallbackPage sẽ đưa user quay lại đây thay vì Marketplace
    setPostLoginRedirect(ROUTES.ADMIN_LOGIN);
    window.location.href = getGoogleLoginUrl();
  };

  const isNonAdminUser = !authLoading && isAuthenticated && user?.role !== 'admin';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 antialiased">

      {/* Ambient glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0056b3]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0056b3] shadow-lg shadow-[#0056b3]/30 mb-4">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-sm text-slate-400 mt-1">webchoviet.com — Hệ thống quản trị nội bộ</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

          {authLoading ? (
            <div className="flex items-center justify-center gap-2 py-6 text-slate-400 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang kiểm tra phiên đăng nhập...
            </div>
          ) : isNonAdminUser ? (
            /* Đã đăng nhập nhưng không có quyền admin */
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-500/10">
                <ShieldX className="h-6 w-6 text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Không có quyền truy cập</p>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Tài khoản <span className="text-slate-300 font-medium">{user?.email}</span> không phải
                  quản trị viên. Đăng xuất và thử lại bằng tài khoản khác.
                </p>
              </div>
              <button
                onClick={() => logout()}
                className="w-full h-11 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </button>
            </div>
          ) : (
            /* Chưa đăng nhập */
            <div className="space-y-5">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 h-12 bg-white hover:bg-slate-100 text-slate-800 text-sm font-semibold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
              >
                <GoogleLogo />
                Đăng nhập bằng Google
              </button>
              <p className="text-center text-[11px] text-slate-500 leading-relaxed">
                Chỉ tài khoản được cấp quyền quản trị mới truy cập được.
                Đăng nhập bằng tài khoản khác sẽ bị từ chối.
              </p>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-slate-600 mt-6">
          Truy cập dành riêng cho nhân viên WebChoViet. Mọi hoạt động được ghi lại.
        </p>
      </div>
    </div>
  );
}
