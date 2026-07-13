// ─── Bộ chọn ngôn ngữ hệ thống (cờ + mã) — đặt ở SiteHeader cả 2 variant ─────
// Đổi ngôn ngữ: i18next tự lưu localStorage (qua detector caches), đồng thời cập
// nhật ?lang= trên URL để reload/chia sẻ link giữ đúng ngôn ngữ và khớp canonical
// tự tham chiếu trong HreflangLinks.

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FlagIcon from './FlagIcon';
import { APP_LANGUAGES, appLangMeta } from './languages';
import { DEFAULT_APP_LANG, isAppLang, type AppLang } from './types';

interface LanguageSwitcherProps {
  /** 'up' khi đặt gần mép dưới màn hình (mobile drawer) */
  dropDirection?: 'down' | 'up';
  className?: string;
}

export default function LanguageSwitcher({ dropDirection = 'down', className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const lng = (i18n.resolvedLanguage ?? i18n.language ?? '').split('-')[0];
  const active: AppLang = isAppLang(lng) ? lng : DEFAULT_APP_LANG;
  const activeMeta = appLangMeta(active);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const select = (code: AppLang) => {
    setOpen(false);
    if (code === active) return;
    void i18n.changeLanguage(code);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (code === DEFAULT_APP_LANG) next.delete('lang');
      else next.set('lang', code);
      return next;
    }, { replace: true });
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${activeMeta.label}`}
        className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-primary/40 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <FlagIcon lang={active} className="h-3.5 w-[21px]" />
        {activeMeta.shortLabel}
        <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Ngôn ngữ / Language"
          className={`absolute right-0 z-50 w-44 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl ${
            dropDirection === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {APP_LANGUAGES.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={code === active}>
              <button
                type="button"
                onClick={() => select(code)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                  code === active
                    ? 'bg-primary/8 font-semibold text-primary'
                    : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'
                }`}
              >
                <FlagIcon lang={code} className="h-3.5 w-[21px]" />
                <span className="flex-1">{label}</span>
                {code === active && <Check className="h-3.5 w-3.5" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
