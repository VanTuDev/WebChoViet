// Backend redirect về đây sau khi Google OAuth thành công, kèm token trong URL fragment
// (#token=...) — không phải query string, để token không lọt vào access log/Referer.
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { useAppContext } from '../../store/AppContext';
import { consumePostLoginRedirect } from '../../services/authService';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { login, showSnackbar } = useAppContext();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // StrictMode gọi effect 2 lần ở dev — chỉ xử lý token 1 lần
    ran.current = true;

    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('token');

    if (!token) {
      showSnackbar('Đăng nhập thất bại. Vui lòng thử lại.', 'error');
      navigate(ROUTES.HOME, { replace: true });
      return;
    }

    login(token)
      .then(() => {
        // Xoá token khỏi URL để không lưu trong lịch sử trình duyệt
        window.history.replaceState(null, '', ROUTES.AUTH_CALLBACK);
        showSnackbar('Đăng nhập thành công! Chào mừng bạn.', 'success');
        navigate(consumePostLoginRedirect() ?? ROUTES.MARKETPLACE, { replace: true });
      })
      .catch(() => {
        // Trước đây không có .catch() — nếu login() reject (vd lỗi mạng), người dùng
        // bị kẹt vĩnh viễn ở màn "Đang đăng nhập..." không có lối thoát.
        showSnackbar('Đăng nhập thất bại. Vui lòng thử lại.', 'error');
        navigate(ROUTES.HOME, { replace: true });
      });
  }, [login, navigate, showSnackbar]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-slate-500">Đang đăng nhập...</p>
    </div>
  );
}
