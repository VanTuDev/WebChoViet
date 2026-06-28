import { Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { TEMPLATES } from '../../data';
import { COMPONENT_MAP } from '../../data/templates/registry';

type Lang = 'vi' | 'en' | 'zh' | 'ko';

const LANG_OPTIONS: { value: Lang; flag: string; label: string }[] = [
  { value: 'vi', flag: '🇻🇳', label: 'VN' },
  { value: 'en', flag: '🇬🇧', label: 'EN' },
  { value: 'zh', flag: '🇨🇳', label: 'ZH' },
  { value: 'ko', flag: '🇰🇷', label: 'KO' },
];

export default function TemplatePreviewPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>('vi');

  const template = TEMPLATES.find(t => t.id === templateId);
  const Component = templateId ? COMPONENT_MAP[templateId] : null;

  if (!Component || !template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-gray-500 text-sm">Không tìm thấy template.</p>
        <button
          onClick={() => navigate(ROUTES.MARKETPLACE)}
          className="px-6 py-2 bg-primary text-white text-xs font-bold rounded-full"
        >
          ← Quay lại Marketplace
        </button>
      </div>
    );
  }

  const isFree = template.price === 0;

  return (
    <div className="relative">

      {/* ── Template renders at full height, no offset ───────────────── */}
      <div className="pb-14">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        }>
          <Component lang={lang} />
        </Suspense>
      </div>

      {/* ── Floating bottom toolbar ───────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-9999 flex items-center justify-between px-4 py-2.5 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">

        {/* Left: back */}
        <button
          onClick={() => navigate(ROUTES.MARKETPLACE)}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Quay lại</span>
        </button>

        {/* Center: name + badge + lang switcher */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-900 hidden sm:block">{template.name}</span>
          {template.badge && (
            <span className={`text-[10px] font-extrabold tracking-wider text-white px-2.5 py-0.5 rounded-full uppercase ${
              template.badge === 'BÁN CHẠY' ? 'bg-rose-500' : template.badge === 'PREMIUM' ? 'bg-amber-500' : 'bg-indigo-600'
            }`}>
              {template.badge}
            </span>
          )}

          {/* Lang switcher */}
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 gap-0.5">
            {LANG_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                title={opt.label}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold transition-all ${
                  lang === opt.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span>{opt.flag}</span>
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: price + CTA */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            isFree ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            {template.priceText}
          </span>
          <button
            onClick={() => navigate(`/template-editor/new?template=${templateId}`)}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-full transition-colors shadow-sm active:scale-95"
          >
            {isFree ? 'Dùng miễn phí' : 'Mua ngay'}
          </button>
        </div>
      </div>
    </div>
  );
}
