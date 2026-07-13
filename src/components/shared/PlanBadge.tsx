import { BadgeCheck, Crown } from 'lucide-react';

export type UserPlan = 'free' | 'pro' | 'ultra';

const PLAN_META: Record<UserPlan, { label: string; icon: typeof BadgeCheck | null; className: string }> = {
  free:  { label: 'Miễn phí', icon: null,       className: 'bg-slate-100 text-slate-500' },
  pro:   { label: 'Pro',      icon: BadgeCheck, className: 'bg-orange-50 text-orange-600' },
  ultra: { label: 'Ultra',    icon: Crown,      className: 'bg-violet-50 text-violet-600' },
};

/** Biến thể cho nền tối (admin panel dark theme) — nhãn ngắn gọn tiếng Anh cho đồng nhất với phần còn lại của UI admin, màu tương phản đúng trên nền slate-900. */
const PLAN_META_DARK: Record<UserPlan, { label: string; className: string }> = {
  free:  { label: 'Free',  className: 'bg-slate-700 text-slate-300' },
  pro:   { label: 'Pro',   className: 'bg-orange-500/20 text-orange-300' },
  ultra: { label: 'Ultra', className: 'bg-violet-500/20 text-violet-300' },
};

/** Badge gói dịch vụ nhỏ gọn — dùng đồng nhất ở dropdown profile, sidebar, admin panel, mọi nơi hiển thị gói của user. */
export default function PlanBadge({ plan, variant = 'light' }: { plan: UserPlan; variant?: 'light' | 'dark' }) {
  const meta = PLAN_META[plan];
  const Icon = meta.icon;
  const { label, className } = variant === 'dark' ? PLAN_META_DARK[plan] : meta;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${className}`}>
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </span>
  );
}
