import { useEffect, useMemo, useState } from 'react';
import { Check, Loader2, LayoutTemplate } from 'lucide-react';
import { TEMPLATES, CATEGORY_REGISTRY } from '../../../data/templates/registry';
import { fetchTemplatePrices, type TemplateAccessInfo, type UserPlan } from '../../../services/templateBillingService';
import { updateTemplateAccess } from '../../../services/adminService';
import { useFetchState } from '../../../hooks/useFetchState';
import LoadingState from '../../../components/common/LoadingState';
import ErrorBanner from '../../../components/common/ErrorBanner';

const PLAN_OPTIONS: { value: UserPlan; label: string }[] = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'ultra', label: 'Ultra' },
];

const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORY_REGISTRY.map(c => [c.id, c.label]),
);

interface RowDraft {
  minPlan: UserPlan;
  price: number;
  saving: boolean;
  saved: boolean;
}

export default function AdminTemplatesPage() {
  const { data: overrides, loading, error } = useFetchState(
    () => fetchTemplatePrices(),
    [],
    'Không tải được giá template.',
  );

  const [drafts, setDrafts] = useState<Record<string, RowDraft>>({});

  useEffect(() => {
    if (!overrides) return;
    const next: Record<string, RowDraft> = {};
    for (const t of TEMPLATES) {
      const ov: TemplateAccessInfo | undefined = overrides[t.id];
      next[t.id] = { minPlan: ov?.minPlan ?? 'free', price: ov?.price ?? t.price, saving: false, saved: false };
    }
    setDrafts(next);
  }, [overrides]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof TEMPLATES>();
    for (const t of TEMPLATES) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    }
    return Array.from(map.entries());
  }, []);

  const updateDraft = (id: string, patch: Partial<RowDraft>) => {
    setDrafts(prev => ({ ...prev, [id]: { ...prev[id], ...patch, saved: false } }));
  };

  const handleSave = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;
    updateDraft(id, { saving: true });
    try {
      await updateTemplateAccess(id, draft.minPlan, draft.price);
      setDrafts(prev => ({ ...prev, [id]: { ...prev[id], saving: false, saved: true } }));
      setTimeout(() => setDrafts(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], saved: false } } : prev)), 2000);
    } catch {
      updateDraft(id, { saving: false });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Quản lý template</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Đặt giá và gói tối thiểu (Free/Pro/Ultra) cho từng mẫu — áp dụng ngay cho Marketplace và luồng xuất bản.
        </p>
      </div>

      {error && <ErrorBanner message={error} />}

      {loading ? (
        <LoadingState />
      ) : (
        <div className="space-y-6">
          {grouped.map(([category, items]) => (
            <div key={category} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-800 flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4 text-slate-500" />
                <h2 className="text-sm font-bold text-white">{CATEGORY_LABEL[category] ?? category}</h2>
                <span className="text-[11px] text-slate-500">({items.length} mẫu)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800">
                      {['Mẫu', 'Gói tối thiểu', 'Giá (VNĐ)', ''].map(h => (
                        <th key={h} className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {items.map(t => {
                      const draft = drafts[t.id];
                      if (!draft) return null;
                      return (
                        <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-3 text-white font-medium whitespace-nowrap">{t.name}</td>
                          <td className="px-5 py-3">
                            <select
                              value={draft.minPlan}
                              onChange={e => updateDraft(t.id, { minPlan: e.target.value as UserPlan })}
                              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary-container cursor-pointer"
                            >
                              {PLAN_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-5 py-3">
                            <input
                              type="number"
                              min={0}
                              step={1000}
                              value={draft.price}
                              onChange={e => updateDraft(t.id, { price: Math.max(0, Number(e.target.value) || 0) })}
                              className="w-28 bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary-container"
                            />
                          </td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => handleSave(t.id)}
                              disabled={draft.saving}
                              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                                draft.saved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary-container text-white hover:bg-primary-container/80'
                              }`}
                            >
                              {draft.saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : draft.saved ? <Check className="h-3.5 w-3.5" /> : null}
                              {draft.saving ? 'Đang lưu...' : draft.saved ? 'Đã lưu' : 'Lưu'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
