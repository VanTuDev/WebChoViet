import { BadgeCheck, Crown } from 'lucide-react';

export type UserPlan = 'free' | 'pro' | 'ultra';

export const PLAN_META: Record<UserPlan, { label: string; icon: typeof BadgeCheck | null; className: string }> = {
  free:  { label: 'Miễn phí', icon: null,       className: 'bg-slate-100 text-slate-500' },
  pro:   { label: 'Pro',      icon: BadgeCheck, className: 'bg-blue-50 text-blue-600' },
  ultra: { label: 'Ultra',    icon: Crown,      className: 'bg-violet-50 text-violet-600' },
};

/** Badge gói dịch vụ nhỏ gọn — dùng đồng nhất ở dropdown profile, sidebar, mọi nơi hiển thị gói của user. */
export default function PlanBadge({ plan }: { plan: UserPlan }) {
  const meta = PLAN_META[plan];
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.className}`}>
      {Icon && <Icon className="h-3 w-3" />}
      {meta.label}
    </span>
  );
}
