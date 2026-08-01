import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Check, Loader2, LayoutTemplate, X, Search, Layers, Coins } from 'lucide-react';
import { TEMPLATES, CATEGORY_REGISTRY } from '../../../data/templates/registry';
import { fetchTemplatePrices, type TemplateAccessInfo } from '../../../services/templateBillingService';
import { updateTemplateAccess } from '../../../services/adminService';
import { useFetchState } from '../../../hooks/useFetchState';
import LoadingState from '../../../components/common/LoadingState';
import ErrorBanner from '../../../components/common/ErrorBanner';

const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORY_REGISTRY.map(c => [c.id, c.label]),
);

/** Class dùng chung để bỏ mũi tên tăng/giảm mặc định của input[type=number] (Chrome/Edge/Firefox) — chỉ còn là ô nhập số thuần. */
const NO_SPINNER = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none';

interface RowDraft {
  price: number;
  /** null = chưa override, dùng giá gốc (`price`) */
  proPrice: number | null;
  ultraPrice: number | null;
  saving: boolean;
  saved: boolean;
}

/** Ô nhập giá kèm đơn vị "đ" cố định bên phải — dùng chung cho mọi ô giá trong trang. */
function PriceInput({
  value, placeholder, onChange, className = '',
}: {
  value: number | '';
  placeholder?: string;
  onChange: (raw: string) => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="number"
        min={0}
        step={1000}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg pl-2.5 pr-6 py-1.5 focus:outline-none focus:border-primary-container placeholder:text-slate-600 ${NO_SPINNER}`}
      />
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">đ</span>
    </div>
  );
}

/** Ô nhập giá theo gói Pro/Ultra — trống = kế thừa giá gốc, có nút "Miễn phí" tắt nhanh + nút xóa override. */
function OverridePriceInput({
  value, onChange,
}: {
  value: number | null;
  onChange: (next: number | null) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 flex-1 min-w-0">
      <PriceInput
        value={value ?? ''}
        placeholder="= giá gốc"
        onChange={raw => onChange(raw === '' ? null : Math.max(0, Number(raw) || 0))}
        className="flex-1 min-w-0"
      />
      {value !== 0 && (
        <button
          type="button"
          onClick={() => onChange(0)}
          title="Đặt miễn phí cho gói này"
          className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer whitespace-nowrap"
        >
          Free
        </button>
      )}
      {value !== null && (
        <button
          type="button"
          onClick={() => onChange(null)}
          title="Xóa override — quay lại dùng giá gốc"
          className="text-slate-500 hover:text-slate-300 cursor-pointer shrink-0"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

/** 1 hàng nhãn + ô nhập trong card giá — dùng chung cho cả 3 mức giá để card luôn thẳng cột. */
function PriceField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-slate-500 w-20 shrink-0">{label}</span>
      {children}
    </div>
  );
}

export default function AdminTemplatesPage() {
  const { data: overrides, loading, error } = useFetchState(
    () => fetchTemplatePrices(),
    [],
    'Không tải được giá template.',
  );

  const [drafts, setDrafts] = useState<Record<string, RowDraft>>({});
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!overrides) return;
    const next: Record<string, RowDraft> = {};
    for (const t of TEMPLATES) {
      const ov: TemplateAccessInfo | undefined = overrides[t.id];
      next[t.id] = {
        price: ov?.price ?? t.price,
        proPrice: ov?.proPrice ?? null,
        ultraPrice: ov?.ultraPrice ?? null,
        saving: false,
        saved: false,
      };
    }
    setDrafts(next);
  }, [overrides]);

  const customizedCount = useMemo(
    () => Object.values(drafts).filter(d => d.proPrice !== null || d.ultraPrice !== null).length,
    [drafts],
  );

  const filteredTemplates = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return TEMPLATES;
    return TEMPLATES.filter(t => t.name.toLowerCase().includes(query) || t.id.toLowerCase().includes(query));
  }, [q]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof TEMPLATES>();
    for (const t of filteredTemplates) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    }
    return Array.from(map.entries());
  }, [filteredTemplates]);

  const updateDraft = (id: string, patch: Partial<RowDraft>) => {
    setDrafts(prev => ({ ...prev, [id]: { ...prev[id], ...patch, saved: false } }));
  };

  const handleSave = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;
    updateDraft(id, { saving: true });
    try {
      await updateTemplateAccess(id, draft.price, draft.proPrice, draft.ultraPrice);
      setDrafts(prev => ({ ...prev, [id]: { ...prev[id], saving: false, saved: true } }));
      setTimeout(() => setDrafts(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], saved: false } } : prev)), 2000);
    } catch {
      updateDraft(id, { saving: false });
    }
  };

  const SUMMARY = [
    { label: 'Tổng số mẫu', value: TEMPLATES.length, Icon: LayoutTemplate },
    { label: 'Danh mục', value: CATEGORY_REGISTRY.length, Icon: Layers },
    { label: 'Đã tùy chỉnh giá Pro/Ultra', value: customizedCount, Icon: Coins },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-white">Quản lý template</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Đặt giá gốc (gói Free) và giá riêng cho Pro/Ultra của từng mẫu — để trống ô Pro/Ultra
          nghĩa là dùng giá gốc, đặt <span className="text-emerald-400 font-semibold">0đ</span> để
          mở miễn phí mẫu đó cho gói tương ứng. Áp dụng ngay cho Marketplace và luồng xuất bản.
        </p>
      </div>

      {error && <ErrorBanner message={error} />}

      {/* Summary + search */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="grid grid-cols-3 gap-3 flex-1">
          {SUMMARY.map(({ label, value, Icon }) => (
            <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-container/15 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary-container" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold text-white leading-tight">{value}</p>
                <p className="text-[11px] text-slate-500 truncate">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative lg:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Tìm mẫu theo tên..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-primary-container transition-all"
          />
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : grouped.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
          Không tìm thấy mẫu nào khớp "{q}".
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(([category, items]) => (
            <section key={category} aria-labelledby={`cat-${category}`} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-800 flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4 text-slate-500" />
                <h2 id={`cat-${category}`} className="text-sm font-bold text-white">{CATEGORY_LABEL[category] ?? category}</h2>
                <span className="text-[11px] text-slate-500">({items.length} mẫu)</span>
              </div>
              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                {items.map(t => {
                  const draft = drafts[t.id];
                  if (!draft) return null;
                  return (
                    <div key={t.id} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-white font-semibold text-sm leading-tight">{t.name}</h3>
                        <span className="text-[10px] text-slate-600 font-mono shrink-0 mt-0.5">{t.id}</span>
                      </div>

                      <div className="space-y-2 border-t border-slate-800/80 pt-3">
                        <PriceField label="Giá gốc · Free">
                          <PriceInput
                            value={draft.price}
                            onChange={raw => updateDraft(t.id, { price: Math.max(0, Number(raw) || 0) })}
                            className="flex-1"
                          />
                        </PriceField>
                        <PriceField label="Giá gói Pro">
                          <OverridePriceInput
                            value={draft.proPrice}
                            onChange={v => updateDraft(t.id, { proPrice: v })}
                          />
                        </PriceField>
                        <PriceField label="Giá gói Ultra">
                          <OverridePriceInput
                            value={draft.ultraPrice}
                            onChange={v => updateDraft(t.id, { ultraPrice: v })}
                          />
                        </PriceField>
                      </div>

                      <button
                        onClick={() => handleSave(t.id)}
                        disabled={draft.saving}
                        className={`self-end flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                          draft.saved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary-container text-white hover:bg-primary-container/80'
                        }`}
                      >
                        {draft.saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : draft.saved ? <Check className="h-3.5 w-3.5" /> : null}
                        {draft.saving ? 'Đang lưu...' : draft.saved ? 'Đã lưu' : 'Lưu'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
