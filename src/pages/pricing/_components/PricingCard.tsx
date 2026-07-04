import { Check, Loader2 } from 'lucide-react';
import type { BillingCycle } from '../../../services/billingService';

export interface PricingPlanDef {
  id: 'free' | 'pro' | 'ultra';
  name: string;
  color: string;
  desc: string;
  features: string[];
  /** null = gói miễn phí, không có giá theo chu kỳ */
  price: { monthly: number; yearly: number } | null;
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

export default function PricingCard({ plan, cycle, cta, disabled, loading, onSelect }: Props) {
  const amount = plan.price ? plan.price[cycle] : 0;
  const periodLabel = plan.price ? (cycle === 'monthly' ? 'tháng' : 'năm') : 'mãi mãi';
  const savings = plan.price && cycle === 'yearly' ? plan.price.monthly * 12 - plan.price.yearly : 0;

  return (
    <div className={`rounded-3xl border p-6 flex flex-col justify-between relative bg-white transition-all hover:shadow-xl ${
      plan.popular
        ? 'border-[#00aaff] ring-2 ring-[#00aaff]/10 shadow-md scale-[1.02] z-10'
        : 'border-gray-200 shadow-sm'
    }`}>
      {plan.popular && (
        <span className="absolute top-[-14px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#003f87] to-[#00aaff] text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider shadow">
          Khuyên Dùng Nhiều Nhất
        </span>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold font-display" style={{ color: plan.color }}>{plan.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{plan.desc}</p>
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

        <ul className="space-y-2.5 pt-2">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        disabled={disabled}
        onClick={onSelect}
        className={`w-full py-3.5 rounded-full text-xs font-bold mt-8 transition-colors active:scale-95 flex items-center justify-center gap-2 ${
          disabled
            ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
            : plan.popular
              ? 'bg-[#00aaff] hover:bg-[#003f87] text-white shadow-md cursor-pointer'
              : 'bg-gray-100 hover:bg-gray-200/80 text-gray-700 cursor-pointer'
        }`}
      >
        {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {cta}
      </button>
    </div>
  );
}
