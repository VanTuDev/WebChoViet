import { CheckCircle2, Clock, XCircle, RefreshCw, type LucideIcon } from 'lucide-react';
import { TEMPLATE_NAME_MAP } from '../data/templates/registry';

export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

interface PaymentStatusMeta {
  label: string;
  /** Màu chữ/nền cho badge trạng thái */
  className: string;
  /** Màu chấm tròn (timeline ở TransactionsPage) */
  dotClassName: string;
  icon: LucideIcon;
}

/** Trạng thái giao dịch PayOS — dùng chung cho PaymentsPage (bảng) và TransactionsPage (timeline). */
export const PAYMENT_STATUS_META: Record<PaymentStatus, PaymentStatusMeta> = {
  success:  { label: 'Thành công', className: 'bg-emerald-500/10 text-emerald-400', dotClassName: 'bg-emerald-500', icon: CheckCircle2 },
  pending:  { label: 'Đang chờ',   className: 'bg-amber-500/10  text-amber-400',    dotClassName: 'bg-amber-500',   icon: Clock },
  failed:   { label: 'Thất bại',   className: 'bg-rose-500/10   text-rose-400',     dotClassName: 'bg-rose-500',    icon: XCircle },
  refunded: { label: 'Hoàn tiền',  className: 'bg-slate-500/20  text-slate-400',    dotClassName: 'bg-slate-500',   icon: RefreshCw },
};

/** Tên marketing của gói (khác với PLAN_META của PlanBadge — đây là tên hiển thị trong lịch sử giao dịch, không phải badge tài khoản) */
export const PLAN_PURCHASE_LABEL: Record<string, string> = {
  pro: 'Kinh Doanh WebPro',
  ultra: 'Thương Hiệu Ultra',
};

/** Tên hiển thị cho 1 giao dịch trong Payments/Transactions — subscription dùng tên gói, template dùng tên mẫu. */
export function formatTransactionItemLabel(kind: 'subscription' | 'template', itemLabel: string): string {
  if (kind === 'template') return TEMPLATE_NAME_MAP[itemLabel] ?? itemLabel;
  return PLAN_PURCHASE_LABEL[itemLabel] ?? itemLabel;
}
