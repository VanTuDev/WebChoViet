import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
  color: string;
}

interface Props {
  plan: Plan;
}

export default function PricingCard({ plan }: Props) {
  return (
    <div className={`rounded-3xl border p-6 flex flex-col justify-between relative bg-white transition-all hover:shadow-xl ${
      plan.popular
        ? 'border-[#00aaff] ring-2 ring-[#00aaff]/10 shadow-md scale-[1.02] z-10'
        : 'border-gray-200 shadow-sm'
    }`}>
      {plan.popular && (
        <span className="absolute top-[-14px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#003f87] to-[#00aaff] text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider shadow">
          Khuyên Dùng Nhiều Nhất ⭐
        </span>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold font-display" style={{ color: plan.color }}>{plan.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{plan.desc}</p>
        </div>

        <div className="flex items-baseline gap-1 py-2 border-b border-gray-50">
          <span className="text-3xl font-display font-extrabold text-gray-900">{plan.price}</span>
          <span className="text-xs text-gray-500">/ {plan.period}</span>
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
        className={`w-full py-3.5 rounded-full text-xs font-bold mt-8 transition-colors active:scale-95 cursor-pointer ${
          plan.popular
            ? 'bg-[#00aaff] hover:bg-[#003f87] text-white shadow-md'
            : 'bg-gray-100 hover:bg-gray-200/80 text-gray-700'
        }`}
        onClick={() => alert(`Cảm ơn bạn đã quan tâm đến ${plan.name}!`)}
      >
        {plan.cta}
      </button>
    </div>
  );
}
