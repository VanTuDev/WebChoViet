import { AlertCircle } from 'lucide-react';

/** Banner báo lỗi dùng chung (nền tối, admin/dashboard) — thay cho mỗi trang tự viết 1 bản gần giống hệt nhau. */
export default function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium px-5 py-4 rounded-2xl">
      <AlertCircle className="h-5 w-5 shrink-0" />
      {message}
    </div>
  );
}
