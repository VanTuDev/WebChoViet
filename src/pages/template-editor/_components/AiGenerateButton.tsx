import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, Send, Sparkles, Square } from 'lucide-react';
import { streamGenerateCopy } from '../../../services/aiCopywriterService';
import type { CopyFieldType, CopyStyle } from '../../../services/aiCopywriterService';

const STYLE_OPTIONS: { value: CopyStyle; label: string }[] = [
  { value: 'friendly', label: 'Thân thiện' },
  { value: 'humorous', label: 'Hài hước' },
  { value: 'luxury', label: 'Sang trọng' },
  { value: 'promotional', label: 'Khuyến mãi' },
];

const POPOVER_WIDTH = 256; // w-64

interface Props {
  fieldType: CopyFieldType;
  shopName: string;
  itemName?: string;
  /** Gọi lại với TOÀN BỘ nội dung đã tích luỹ tới thời điểm hiện tại — dùng để ghi thẳng vào ô input, tạo hiệu ứng gõ chữ */
  onGenerate: (accumulatedText: string) => void;
}

export default function AiGenerateButton({ fieldType, shopName, itemName, onGenerate }: Props) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<CopyStyle>('friendly');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Popover render qua portal + position:fixed để thoát mọi overflow/stacking context
  // của sidebar editor (overflow-y-auto) — nếu dùng absolute sẽ bị cắt hoặc bị đè.
  const updatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const left = Math.max(8, Math.min(rect.right - POPOVER_WIDTH, window.innerWidth - POPOVER_WIDTH - 8));
    // Nếu bên dưới không đủ chỗ (~300px) thì lật lên trên nút
    const estimatedHeight = 300;
    const top = rect.bottom + estimatedHeight > window.innerHeight && rect.top > estimatedHeight
      ? rect.top - estimatedHeight - 6
      : rect.bottom + 6;
    setPos({ top, left });
  };

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    // capture: true để bắt cả scroll bên trong sidebar (scroll event không bubble)
    const handleScroll = () => updatePosition();
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [open]);

  // Huỷ request đang chạy nếu component unmount (vd xoá món/đóng editor giữa chừng)
  useEffect(() => () => abortRef.current?.abort(), []);

  const runGenerate = async () => {
    if (loading) return;
    setError('');
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;
    let accumulated = '';
    try {
      await streamGenerateCopy(
        { fieldType, style, shopName, itemName, userContext: context.trim() || undefined },
        delta => {
          accumulated += delta;
          onGenerate(accumulated);
        },
        controller.signal,
      );
      setOpen(false);
    } catch (e) {
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        setError(e instanceof Error ? e.message : 'Tạo nội dung thất bại. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  };

  const popover = open && pos && createPortal(
    <div
      ref={popoverRef}
      className="fixed z-9999 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 space-y-2.5"
      style={{ top: pos.top, left: pos.left }}
    >
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Chọn văn phong</p>
      <div className="grid grid-cols-2 gap-1.5">
        {STYLE_OPTIONS.map(s => {
          const selected = style === s.value;
          return (
            <button
              key={s.value}
              type="button"
              disabled={loading}
              onClick={() => setStyle(s.value)}
              className={`text-[11px] font-semibold rounded-lg py-1.5 border transition-colors disabled:opacity-50 ${
                selected
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-violet-50 hover:text-violet-700'
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Ô mô tả thêm + nút gửi */}
      <div className="relative">
        <textarea
          rows={2}
          placeholder="Mô tả thêm cho AI (tuỳ chọn): quán bạn thế nào, menu có gì, ở đâu..."
          className="w-full text-[11px] text-gray-800 bg-gray-50 border border-gray-200 rounded-lg pl-2 pr-9 py-1.5 resize-none focus:outline-none focus:border-violet-400 transition-all"
          value={context}
          onChange={e => setContext(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              runGenerate();
            }
          }}
          disabled={loading}
        />
        <button
          type="button"
          onClick={runGenerate}
          disabled={loading}
          title="Tạo nội dung"
          className="absolute right-1.5 bottom-2.5 w-6 h-6 flex items-center justify-center rounded-md bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {loading
            ? <Loader2 className="w-3 h-3 animate-spin" />
            : <Send className="w-3 h-3" />}
        </button>
      </div>

      {loading && (
        <button
          type="button"
          onClick={() => abortRef.current?.abort()}
          className="w-full flex items-center justify-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg py-1.5 transition-colors"
        >
          <Square className="w-3 h-3" /> Dừng
        </button>
      )}
      {error && <p className="text-[10px] text-red-500 leading-relaxed">{error}</p>}
    </div>,
    document.body,
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        title="Tạo bằng AI"
        className="flex items-center gap-1 shrink-0 text-[10px] font-bold text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-1.5 py-0.5 rounded-md transition-colors"
      >
        <Sparkles className="w-3 h-3" /> AI
      </button>
      {popover}
    </>
  );
}
