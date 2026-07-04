// Layout route: chặn truy cập nếu chưa đăng nhập — dùng cho Dashboard + Template Editor
// (những trang cần gọi API backend có JWT guard: /sites/my, POST /sites...).
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { useAppContext } from '../../store/AppContext';

export default function RequireAuth() {
  const { isAuthenticated, authLoading } = useAppContext();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
