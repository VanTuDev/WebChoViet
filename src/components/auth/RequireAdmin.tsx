// Layout route: chỉ cho phép user có role=admin vào các trang /admin/*.
// Backend vẫn là lớp bảo vệ thật (AdminGuard) — guard này chỉ để UX không hiện
// trang trống rồi mới báo lỗi 403.
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { useAppContext } from '../../store/AppContext';

export default function RequireAdmin() {
  const { user, authLoading } = useAppContext();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#60a5fa]" />
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return <Outlet />;
}
