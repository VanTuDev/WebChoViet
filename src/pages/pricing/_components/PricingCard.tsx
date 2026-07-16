import { Check, Loader2, Rocket, BadgeCheck, Crown, Globe, NotebookPen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { BillingCycle } from '../../../services/billingService';

export interface PricingPlanDef {
  id: 'free' | 'pro' | 'ultra';
  name: string;
  color: string;
  desc: string;
  features: string[];
  /** null = gói miễn phí, không có giá theo chu kỳ */
  price: { monthly: number; yearly: number } | null;
  /** Giới hạn số site — tách riêng draft/published, khớp PLAN_SITE_LIMIT phía backend */
  limits: { draft: number; published: number };
  popular: boolean;
}

interface Props {
  plan: PricingPlanDef;
  cycle: BillingCycle;
  cta: string;
  disabled: boolean;
  loading: boolean;
  onSelect: () => void;
}

const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

const PLAN_ICON = { free: Rocket, pro: BadgeCheck, ultra: Crown } as const;

const PLAN_VISUAL: Record<PricingPlanDef['id'], { iconBg: string; ring: string; header: string; cta: string }> = {
  free: {
    iconBg: 'bg-slate-100 text-slate-500',
    ring: 'border-gray-200',
    header: '',
    cta: 'bg-gray-100 hover:bg-gray-200/80 text-gray-700',
  },
  pro: {
    iconBg: 'bg-fnb-orange/10 text-fnb-orange',
    ring: 'border-fnb-orange ring-2 ring-fnb-orange/10 shadow-md scale-[1.02] z-10',
    header: 'bg-gradient-to-r from-primary to-fnb-orange',
    cta: 'bg-fnb-orange hover:bg-primary text-white shadow-md',
  },
  ultra: {
    iconBg: 'bg-violet-100 text-violet-600',
    ring: 'border-violet-200',
    header: 'bg-gradient-to-r from-violet-950 to-violet-800',
    cta: 'bg-violet-950 hover:bg-violet-900 text-white shadow-md',
  },
};

export default function PricingCard({ plan, cycle, cta, disabled, loading, onSelect }: Props) {
  const { t } = useTranslation('pricing');
  const amount = plan.price ? plan.price[cycle] : 0;
  const periodLabel = plan.price ? (cycle === 'monthly' ? 'tháng' : 'năm') : 'mãi mãi';
  const savings = plan.price && cycle === 'yearly' ? plan.price.monthly * 12 - plan.price.yearly : 0;
  const visual = PLAN_VISUAL[plan.id];
  const Icon = PLAN_ICON[plan.id];

  return (
    // Wrapper NGOÀI không có overflow-hidden — chỉ để định vị ribbon "Khuyên dùng"
    // nổi phía trên card mà không bị mép bo tròn của card cắt mất (bug cũ: ribbon
    // đặt trong chính div overflow-hidden nên nửa trên bị clip sát viền card).
    <div className="relative h-full">
      {plan.popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-fnb-orange text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider shadow-md z-10 whitespace-nowrap">
          Khuyên Dùng Nhiều Nhất
        </span>
      )}

      <div className={`h-full rounded-3xl border flex flex-col justify-between bg-white transition-all hover:shadow-xl overflow-hidden ${visual.ring} ${!plan.popular && plan.id !== 'ultra' ? 'shadow-sm' : ''}`}>

      {visual.header && <div className={`h-1.5 shrink-0 ${visual.header}`} />}

      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-center gap-3">
          <div className={`h-11 w-11 shrink-0 rounded-2xl flex items-center justify-center ${visual.iconBg}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-gray-900">{plan.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{plan.desc}</p>
          </div>
        </div>

        <div className="py-2 border-b border-gray-50">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-display font-extrabold text-gray-900">{plan.price ? fmt(amount) : '0đ'}</span>
            <span className="text-xs text-gray-500">/ {periodLabel}</span>
          </div>
          {savings > 0 && (
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              Tiết kiệm {fmt(savings)} mỗi năm so với trả theo tháng
            </p>
          )}
        </div>

        {/* ── Hạn mức website: điều đầu tiên khách cần biết khi so sánh gói ── */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-gray-50 text-gray-700 px-2.5 py-1.5 rounded-lg">
            <Globe className="h-3.5 w-3.5" style={{ color: plan.color }} />
            {t('quota.published', { n: plan.limits.published })}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-gray-50 text-gray-700 px-2.5 py-1.5 rounded-lg">
            <NotebookPen className="h-3.5 w-3.5" style={{ color: plan.color }} />
            {t('quota.draft', { n: plan.limits.draft })}
          </span>
        </div>

        <ul className="space-y-2.5 pt-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 pb-6">
        <button
          disabled={disabled}
          onClick={onSelect}
          className={`w-full py-3.5 rounded-full text-xs font-bold transition-colors active:scale-95 flex items-center justify-center gap-2 ${
            disabled
              ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
              : `${visual.cta} cursor-pointer`
          }`}
        >
          {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {cta}
        </button>
      </div>
      </div>
    </div>
  );
}
