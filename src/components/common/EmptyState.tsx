import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  message: string;
  variant?: 'block' | 'row';
  colSpan?: number;
}

/** Trạng thái "không có dữ liệu" dùng chung cho bảng/danh sách admin & dashboard. */
export default function EmptyState({ icon: Icon, message, variant = 'block', colSpan }: Props) {
  const content = (
    <>
      <Icon className="h-8 w-8 mx-auto mb-2 opacity-30" />
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
