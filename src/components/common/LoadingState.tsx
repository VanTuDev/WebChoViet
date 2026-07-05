import { Loader2 } from 'lucide-react';

interface Props {
  message?: string;
  /** "row" nhúng làm 1 hàng &lt;tr&gt; trong bảng (cần colSpan) — "block" là div độc lập */
  variant?: 'block' | 'row';
  colSpan?: number;
}

/** Trạng thái "đang tải" dùng chung cho bảng/danh sách admin & dashboard — thay cho mỗi trang tự viết 1 bản. */
export default function LoadingState({ message = 'Đang tải...', variant = 'block', colSpan }: Props) {
  const content = (
    <>
      <Loader2 className="h-4 w-4 animate-spin inline-block mr-2" />
      {message}
    </>
  );

  if (variant === 'row') {
    return (
      <tr>
        <td colSpan={colSpan} className="text-center text-slate-500 text-sm py-12">
          {content}
        </td>
      </tr>
    );
  }
  return <div className="text-center text-slate-500 text-sm py-12">{content}</div>;
}
