/**
 * ─── LanguageSwitcher ─────────────────────────────────────────────────────────
 *
 * Nút chuyển ngôn ngữ dùng chung cho mọi template — hiển thị icon quả địa cầu
 * kèm dropdown chọn ngôn ngữ, để khách truy cập tự đổi ngôn ngữ ngay trên
 * trang web đã xuất bản (không phụ thuộc thanh ngôn ngữ của editor).
 *
 * Cách dùng trong một template:
 *
 *   const { activeLang, setActiveLang } = useTemplateLang(lang, ['vi', 'en']);
 *   ...
 *   <LanguageSwitcher value={activeLang} onChange={setActiveLang} languages={['vi', 'en']} />
 *
 * Component này cố ý giữ styling trung tính (nền trắng mờ + backdrop-blur)
 * để đặt vừa trên header sáng lẫn tối của mọi template.
 */
import { useEffect, useRef, useState } from 'react';

/** Toàn bộ ngôn ngữ hệ thống hỗ trợ. Template chỉ truyền subset nó có i18n. */
export const ALL_LANGS = ['vi', 'en', 'zh', 'ko'] as const;
export type TemplateLang = (typeof ALL_LANGS)[number];

const LANG_META: Record<TemplateLang, { flag: string; name: string; short: string }> = {
  vi: { flag: '🇻🇳', name: 'Tiếng Việt', short: 'VI' },
  en: { flag: '🇬🇧', name: 'English', short: 'EN' },
  zh: { flag: '🇨🇳', name: '中文', short: '中文' },
  ko: { flag: '🇰🇷', name: '한국어', short: '한국어' },
};

/**
 * Hook quản lý ngôn ngữ đang hiển thị của template.
 *
 * - Khởi tạo từ prop `lang` (editor / URL truyền xuống).
 * - Khi editor đổi prop `lang` → đồng bộ lại (editor luôn thắng).
 * - Khi khách bấm LanguageSwitcher trên trang → đổi state nội bộ.
 */
export function useTemplateLang<L extends TemplateLang>(
  propLang: string | undefined,
  supported: readonly L[],
): { activeLang: L; setActiveLang: (l: L) => void } {
  const normalize = (raw: string | undefined): L =>
    supported.includes(raw as L) ? (raw as L) : supported[0];

  const [activeLang, setActiveLang] = useState<L>(() => normalize(propLang));

  // Editor đổi ngôn ngữ preview → reset lựa chọn nội bộ theo editor
  useEffect(() => {
    setActiveLang(normalize(propLang));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propLang]);

  return { activeLang, setActiveLang };
}

interface LanguageSwitcherProps<L extends TemplateLang> {
  /** Ngôn ngữ đang hiển thị */
  value: L;
  /** Gọi khi khách chọn ngôn ngữ mới */
  onChange: (lang: L) => void;
  /** Các ngôn ngữ template này có bản dịch (mặc định: cả 4) */
  languages?: readonly L[];
}

export default function LanguageSwitcher<L extends TemplateLang>({
  value,
  onChange,
  languages = ALL_LANGS as unknown as readonly L[],
}: LanguageSwitcherProps<L>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài hoặc nhấn Escape
  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open]);

  // Chỉ có 1 ngôn ngữ → không có gì để chuyển, ẩn luôn
  if (languages.length <= 1) return null;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Chuyển đổi ngôn ngữ / Change language"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-white/70 backdrop-blur text-sm font-medium text-gray-700 hover:bg-white transition-colors cursor-pointer"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
        </svg>
        <span>{LANG_META[value].short}</span>
        <svg aria-hidden viewBox="0 0 24 24" className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-lg border border-black/10 overflow-hidden z-50"
        >
          {languages.map(code => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={code === value}
              onClick={() => {
                onChange(code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 flex items-center gap-2.5 text-sm transition-colors cursor-pointer hover:bg-gray-100 ${
                code === value ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-700'
              }`}
            >
              <span aria-hidden>{LANG_META[code].flag}</span>
              <span>{LANG_META[code].name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
