import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { ROUTES } from '../../config/routes';

interface Props {
  title?: string;
  message?: string;
}

/**
 * `errorElement` dùng chung cho react-router — route nào throw lỗi lúc render
 * (vd 1 template đọc field không tồn tại trong customData rồi .map() lên
 * undefined) sẽ hiện trang này thay vì cả SPA sập trắng không cách nào phục
 * hồi. Trước đây KHÔNG có bất kỳ error boundary nào trong toàn bộ app.
 */
export default function RouteErrorBoundary({ title, message }: Props) {
  const error = useRouteError();
  console.error('Route render error:', error);

  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-red-50 border border-red-100 text-red-500 rounded-2xl flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-xl font-bold text-gray-800 mb-2">{title ?? 'Đã xảy ra lỗi'}</h1>
      <p className="text-gray-500 text-sm mb-6 max-w-md">
        {message ?? 'Trang này gặp sự cố khi hiển thị. Vui lòng tải lại trang hoặc quay về trang chủ.'}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Tải lại trang
        </button>
        <Link
          to={ROUTES.HOME}
          className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-full hover:bg-gray-50 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
      {import.meta.env.DEV && detail && (
        <pre className="mt-6 max-w-lg text-left text-[10px] text-red-400 bg-red-50 border border-red-100 rounded-lg p-3 overflow-auto">
          {detail}
        </pre>
      )}
    </div>
  );
}
