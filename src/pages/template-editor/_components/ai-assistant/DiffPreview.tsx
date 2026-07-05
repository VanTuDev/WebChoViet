import { flattenChanges } from './diffUtils';

export default function DiffPreview({ updates, current }: { updates: Record<string, unknown>; current: Record<string, unknown> }) {
  const changes = flattenChanges(updates, current);
  const shown = changes.slice(0, 6);
  const extra = changes.length - shown.length;

  return (
    <div className="mt-2 space-y-1.5 bg-white/70 rounded-lg border border-violet-200 p-2">
      {shown.map((c, i) => (
        <div key={i} className="text-[11px] leading-snug">
          <span className="font-semibold text-violet-700">{c.label}</span>
          {c.oldValue && c.oldValue !== c.newValue && (
            <span className="text-gray-400 line-through ml-1">{c.oldValue.slice(0, 40)}</span>
          )}
          <span className="text-gray-700 ml-1">→ {c.newValue.slice(0, 60) || '(trống)'}</span>
        </div>
      ))}
      {extra > 0 && <p className="text-[10px] text-gray-400">+{extra} thay đổi khác</p>}
    </div>
  );
}
