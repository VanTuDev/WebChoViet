import { Component, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Bọc RIÊNG quanh cây template trong khung xem trước (desktop lẫn mobile-iframe).
 * Trước đây preview không có error boundary nội bộ nào — 1 lỗi render của template
 * (vd .map() lên field rỗng vì site mới chưa có customData) sẽ văng lên tới
 * RouteErrorBoundary cấp route, sập LUÔN CẢ trang chỉnh sửa (sidebar/header biến
 * mất theo). Boundary này chặn lỗi lại đúng chỗ — khung preview báo lỗi riêng,
 * phần còn lại của trình chỉnh sửa vẫn dùng được để sửa nội dung gây lỗi.
 */
export default class PreviewErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('Lỗi render template trong khung xem trước:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 h-96 text-center px-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <p className="text-sm font-semibold text-gray-600">Không thể hiển thị bản xem trước.</p>
          <p className="text-xs text-gray-400 max-w-xs">
            Template gặp lỗi khi render — thử chỉnh lại nội dung vừa thay đổi hoặc tải lại trang.
          </p>
          {import.meta.env.DEV && (
            <pre className="mt-1 max-w-sm text-left text-[10px] text-red-400 bg-red-50 border border-red-100 rounded-lg p-2 overflow-auto">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
