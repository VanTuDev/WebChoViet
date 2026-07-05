import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  /** Màu nền ô icon (hex/rgba) — vd "#1e3a5f" */
  iconBg: string;
  label: string;
  value: string | number;
  sub?: string;
}

/** Ô thống kê (icon + số liệu lớn + nhãn + ghi chú) dùng chung cho admin panel (nền tối). */
export default function StatTile({ icon, iconBg, label, value, sub }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
        <p className="text-xs text-slate-400 mt-0.5">{label}</p>
      </div>
      {sub && <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">{sub}</p>}
    </div>
  );
}
