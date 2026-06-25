// Hàng 3 metric cards trên dashboard — hiển thị lượt quét, lượt xem, đánh giá
import type { Metric } from '../../../../types';

interface Props {
  metrics: Metric[];
}

export default function MetricsRow({ metrics }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              {metric.title}
            </span>
            <span className="text-3xl font-display font-extrabold text-gray-800 block">
              {metric.value}
            </span>
          </div>
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
            metric.changeType === 'increase'
              ? 'bg-emerald-50 text-emerald-700'
              : metric.changeType === 'decrease'
              ? 'bg-rose-50 text-rose-700'
              : 'bg-gray-50 text-gray-500'
          }`}>
            {metric.change}
          </span>
        </div>
      ))}
    </div>
  );
}
