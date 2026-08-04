import { useEffect, useMemo, useState } from 'react';
import {
  Check, Loader2, LayoutTemplate, X, Search, Layers, Coins,
  ChevronUp, ChevronDown, ChevronsUpDown, Save,
} from 'lucide-react';
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

interface PriceSnapshot {
  price: number;
  /** null = chưa override, dùng giá gốc (`price`) */
  proPrice: number | null;
  ultraPrice: number | null;
}

interface RowDraft extends PriceSnapshot {
  saving: boolean;
  saved: boolean;
}

type SortKey = 'name' | 'category' | 'price';
type SortDir = 'asc' | 'desc';

/** Ô nhập giá kèm đơn vị "đ" cố định bên phải — Enter lưu ngay hàng đang sửa (thao tác kiểu bảng tính). */
function PriceInput({
  value, placeholder, onChange, onEnter, className = '',
}: {
  value: number | '';
  placeholder?: string;
  onChange: (raw: string) => void;
  onEnter?: () => void;
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
        onKeyDown={e => { if (e.key === 'Enter') onEnter?.(); }}
        className={`w-full bg-slate-800/70 border border-slate-700 text-slate-200 text-xs rounded-lg pl-2.5 pr-6 py-1.5 focus:outline-none focus:border-primary-container focus:bg-slate-800 placeholder:text-slate-600 ${NO_SPINNER}`}
      />
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">đ</span>
    </div>
  );
}

/** Ô nhập giá theo gói Pro/Ultra — trống = kế thừa giá gốc, có nút "Free" tắt nhanh + nút xóa override. */
function OverridePriceInput({
  value, onChange, onEnter,
}: {
  value: number | null;
  onChange: (next: number | null) => void;
  onEnter?: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <PriceInput
        value={value ?? ''}
        placeholder="= giá gốc"
        onChange={raw => onChange(raw === '' ? null : Math.max(0, Number(raw) || 0))}
        onEnter={onEnter}
        className="flex-1 min-w-0"
      />
      {value !== 0 && (
        <button
          type="button"
          onClick={() => onChange(0)}
          title="Đặt miễn phí cho gói này"
          className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer whitespace-nowrap shrink-0"
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

/** Icon trạng thái sắp xếp trên tiêu đề cột — mờ khi cột đó chưa được chọn để sort. */
function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown className="h-3 w-3 text-slate-600" />;
  return dir === 'asc'
    ? <ChevronUp className="h-3 w-3 text-primary-container" />
    : <ChevronDown className="h-3 w-3 text-primary-container" />;
}

export default function AdminTemplatesPage() {
  const { data: overrides, loading, error } = useFetchState(
    () => fetchTemplatePrices(),
    [],
    'Không tải được giá template.',
  );

  const [drafts, setDrafts] = useState<Record<string, RowDraft>>({});
  /** Giá trị đã lưu gần nhất (từ server) — so sánh với `drafts` để biết hàng nào đang có thay đổi chưa lưu. */
  const [committed, setCommitted] = useState<Record<string, PriceSnapshot>>({});
  const [q, setQ] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('category');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [savingAll, setSavingAll] = useState(false);

  useEffect(() => {
    if (!overrides) return;
    const nextDrafts: Record<string, RowDraft> = {};
    const nextCommitted: Record<string, PriceSnapshot> = {};
    for (const t of TEMPLATES) {
      const ov: TemplateAccessInfo | undefined = overrides[t.id];
      const snapshot: PriceSnapshot = {
        price: ov?.price ?? t.price,
        proPrice: ov?.proPrice ?? null,
        ultraPrice: ov?.ultraPrice ?? null,
      };
      nextDrafts[t.id] = { ...snapshot, saving: false, saved: false };
      nextCommitted[t.id] = snapshot;
    }
    setDrafts(nextDrafts);
    setCommitted(nextCommitted);
  }, [overrides]);

  const customizedCount = useMemo(
    () => Object.values(drafts).filter(d => d.proPrice !== null || d.ultraPrice !== null).length,
    [drafts],
  );

  /** ID các hàng đang có thay đổi chưa lưu — dùng để tô viền hàng, khoá nút Lưu, và đếm cho nút "Lưu tất cả". */
  const dirtySet = useMemo(() => {
    const set = new Set<string>();
    for (const id of Object.keys(drafts)) {
      const d = drafts[id];
      const c = committed[id];
      if (d && c && (d.price !== c.price || d.proPrice !== c.proPrice || d.ultraPrice !== c.ultraPrice)) {
        set.add(id);
      }
    }
    return set;
  }, [drafts, committed]);

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = TEMPLATES.filter(t => categoryFilter === 'all' || t.category === categoryFilter);
    if (query) {
      list = list.filter(t => t.name.toLowerCase().includes(query) || t.id.toLowerCase().includes(query));
    }
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...list].sort((a, b) => {
      if (sortKey === 'price') {
        const pa = drafts[a.id]?.price ?? a.price;
        const pb = drafts[b.id]?.price ?? b.price;
        return (pa - pb) * dir;
      }
      if (sortKey === 'category') {
        const la = CATEGORY_LABEL[a.category] ?? a.category;
        const lb = CATEGORY_LABEL[b.category] ?? b.category;
        return (la.localeCompare(lb) || a.name.localeCompare(b.name)) * dir;
      }
      return a.name.localeCompare(b.name) * dir;
    });
  }, [q, categoryFilter, sortKey, sortDir, drafts]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const updateDraft = (id: string, patch: Partial<PriceSnapshot>) => {
    setDrafts(prev => ({ ...prev, [id]: { ...prev[id], ...patch, saved: false } }));
  };

  /** Gọi API lưu 1 hàng, đồng bộ lại `committed` khi thành công — dùng chung cho nút Lưu từng hàng lẫn "Lưu tất cả". */
  const saveOne = async (id: string): Promise<boolean> => {
    const draft = drafts[id];
    if (!draft) return false;
    try {
      await updateTemplateAccess(id, draft.price, draft.proPrice, draft.ultraPrice);
      setCommitted(prev => ({
        ...prev,
        [id]: { price: draft.price, proPrice: draft.proPrice, ultraPrice: draft.ultraPrice },
      }));
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = async (id: string) => {
    if (!dirtySet.has(id)) return;
    setDrafts(prev => ({ ...prev, [id]: { ...prev[id], saving: true, saved: false } }));
    const ok = await saveOne(id);
    setDrafts(prev => ({ ...prev, [id]: { ...prev[id], saving: false, saved: ok } }));
    if (ok) {
      setTimeout(() => setDrafts(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], saved: false } } : prev)), 2000);
    }
  };

  const handleSaveAll = async () => {
    const ids = Array.from(dirtySet);
    if (ids.length === 0) return;
    setSavingAll(true);
    setDrafts(prev => {
      const next = { ...prev };
      for (const id of ids) next[id] = { ...next[id], saving: true, saved: false };
      return next;
    });
    const results = await Promise.all(ids.map(async id => [id, await saveOne(id)] as const));
    setDrafts(prev => {
      const next = { ...prev };
      for (const [id, ok] of results) next[id] = { ...next[id], saving: false, saved: ok };
      return next;
    });
    setSavingAll(false);
    setTimeout(() => {
      setDrafts(prev => {
        const next = { ...prev };
        for (const [id] of results) if (next[id]) next[id] = { ...next[id], saved: false };
        return next;
      });
    }, 2000);
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
          mở miễn phí mẫu đó cho gói tương ứng. Bấm{' '}
          <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">Enter</kbd>{' '}
          trong ô để lưu ngay hàng đó, hoặc sửa nhiều hàng rồi bấm "Lưu tất cả" — bấm tiêu đề cột để
          sắp xếp. Áp dụng ngay cho Marketplace và luồng xuất bản.
        </p>
      </div>

      {error && <ErrorBanner message={error} />}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
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

      {/* Toolbar: tìm kiếm + lọc danh mục + lưu hàng loạt */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1 lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Tìm mẫu theo tên hoặc mã..."
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-primary-container transition-all"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-primary-container lg:w-56"
        >
          <option value="all">Tất cả danh mục</option>
          {CATEGORY_REGISTRY.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>

        <div className="flex-1" />

        {dirtySet.size > 0 && (
          <button
            onClick={handleSaveAll}
            disabled={savingAll}
            className="flex items-center justify-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-xl bg-primary-container text-white hover:bg-primary-container/80 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
          >
            {savingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {savingAll ? 'Đang lưu...' : `Lưu tất cả (${dirtySet.size})`}
          </button>
        )}
      </div>

      {loading ? (
        <LoadingState />
      ) : rows.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
          Không tìm thấy mẫu nào khớp bộ lọc hiện tại.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="border-collapse" style={{ tableLayout: 'fixed', width: '100%', minWidth: '1120px' }}>
              <caption className="sr-only">Danh sách giá template theo danh mục, gói Free/Pro/Ultra</caption>
              <colgroup>
                <col style={{ width: '44px' }} />
                <col style={{ width: '240px' }} />
                <col style={{ width: '130px' }} />
                <col style={{ width: '140px' }} />
                <col style={{ width: '190px' }} />
                <col style={{ width: '190px' }} />
                <col style={{ width: '110px' }} />
                <col style={{ width: '92px' }} />
              </colgroup>
              <thead className="sticky top-0 z-10 bg-slate-900">
                <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wide text-slate-500">
                  <th scope="col" className="text-left px-2 py-2.5 font-semibold">#</th>
                  <th scope="col" className="text-left px-3 py-2.5 font-semibold">
                    <button type="button" onClick={() => toggleSort('name')} className="flex items-center gap-1 cursor-pointer hover:text-slate-300">
                      Template <SortIcon active={sortKey === 'name'} dir={sortDir} />
                    </button>
                  </th>
                  <th scope="col" className="text-left px-3 py-2.5 font-semibold">
                    <button type="button" onClick={() => toggleSort('category')} className="flex items-center gap-1 cursor-pointer hover:text-slate-300">
                      Danh mục <SortIcon active={sortKey === 'category'} dir={sortDir} />
                    </button>
                  </th>
                  <th scope="col" className="text-left px-3 py-2.5 font-semibold">
                    <button type="button" onClick={() => toggleSort('price')} className="flex items-center gap-1 cursor-pointer hover:text-slate-300">
                      Giá gốc · Free <SortIcon active={sortKey === 'price'} dir={sortDir} />
                    </button>
                  </th>
                  <th scope="col" className="text-left px-3 py-2.5 font-semibold">Giá gói Pro</th>
                  <th scope="col" className="text-left px-3 py-2.5 font-semibold">Giá gói Ultra</th>
                  <th scope="col" className="text-left px-3 py-2.5 font-semibold">Trạng thái</th>
                  <th scope="col" className="text-right px-3 py-2.5 font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rows.map((t, i) => {
                  const draft = drafts[t.id];
                  if (!draft) return null;
                  const dirty = dirtySet.has(t.id);
                  const customized = draft.proPrice !== null || draft.ultraPrice !== null;
                  return (
                    <tr
                      key={t.id}
                      className={`${i % 2 === 0 ? 'bg-slate-950/30' : ''} hover:bg-slate-800/40 transition-colors border-l-2 ${dirty ? 'border-l-amber-400' : 'border-l-transparent'}`}
                    >
                      <td className="px-2 py-2.5 text-[11px] text-slate-600 font-mono align-top">{i + 1}</td>
                      <th scope="row" className="text-left px-3 py-2 align-top font-normal">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={t.imageUrl} alt="" loading="lazy" className="w-8 h-8 rounded-lg object-cover border border-slate-800 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-white text-xs font-semibold truncate" title={t.name}>{t.name}</p>
                            <p className="text-[10px] text-slate-600 font-mono truncate" title={t.id}>{t.id}</p>
                          </div>
                        </div>
                      </th>
                      <td className="px-3 py-2.5 align-top">
                        <span className="text-xs text-slate-400">{CATEGORY_LABEL[t.category] ?? t.category}</span>
                      </td>
                      <td className="px-3 py-2 align-top">
                        <PriceInput
                          value={draft.price}
                          onChange={raw => updateDraft(t.id, { price: Math.max(0, Number(raw) || 0) })}
                          onEnter={() => handleSave(t.id)}
                        />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <OverridePriceInput
                          value={draft.proPrice}
                          onChange={v => updateDraft(t.id, { proPrice: v })}
                          onEnter={() => handleSave(t.id)}
                        />
                      </td>
                      <td className="px-3 py-2 align-top">
                        <OverridePriceInput
                          value={draft.ultraPrice}
                          onChange={v => updateDraft(t.id, { ultraPrice: v })}
                          onEnter={() => handleSave(t.id)}
                        />
                      </td>
                      <td className="px-3 py-2.5 align-top">
                        {customized ? (
                          <span className="inline-flex items-center text-[10px] font-bold text-primary-container bg-primary-container/15 rounded-full px-2 py-0.5">Đã tùy chỉnh</span>
                        ) : (
                          <span className="inline-flex items-center text-[10px] text-slate-600 bg-slate-800/60 rounded-full px-2 py-0.5">Mặc định</span>
                        )}
                      </td>
                      <td className="px-3 py-2 align-top text-right">
                        <button
                          onClick={() => handleSave(t.id)}
                          disabled={draft.saving || (!dirty && !draft.saved)}
                          title={dirty ? 'Lưu thay đổi hàng này' : 'Không có thay đổi'}
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                            draft.saved ? 'bg-emerald-500/20 text-emerald-400' : dirty ? 'bg-primary-container text-white hover:bg-primary-container/80' : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {draft.saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : draft.saved ? <Check className="h-3.5 w-3.5" /> : null}
                          {draft.saving ? '' : draft.saved ? 'Đã lưu' : 'Lưu'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
