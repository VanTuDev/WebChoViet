import { lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { TEMPLATES } from '../../data';

const COMPONENT_MAP: Record<string, React.LazyExoticComponent<React.ComponentType<{ lang?: 'vi' | 'en' | 'zh' | 'ko' }>>> = {
  'coffe-1': lazy(() => import('../../data/Template/Coffe-1/index')),
  'coffe-2': lazy(() => import('../../data/Template/Coffe-2/index')),
  'coffe-3': lazy(() => import('../../data/Template/Coffe-3/index')),
  'coffe-4': lazy(() => import('../../data/Template/Coffe-4/index')),
  'coffe-5': lazy(() => import('../../data/Template/Coffe-5/index')),
};

export default function TemplatePreviewPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const template = TEMPLATES.find(t => t.id === templateId);
  const Component = templateId ? COMPONENT_MAP[templateId] : null;

  if (!Component || !template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
        <p className="text-gray-500 text-sm">Không tìm thấy template.</p>
        <button
          onClick={() => navigate(ROUTES.MARKETPLACE)}
          className="px-6 py-2 bg-[#003f87] text-white text-xs font-bold rounded-full"
        >
          ← Quay lại Marketplace
        </button>
      </div>
    );
  }

  const isFree = template.price === 0;

  return (
    <div className="relative">
      {/* ── Floating toolbar ─────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <button
          onClick={() => navigate(ROUTES.MARKETPLACE + '?category=coffee')}
          className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#003f87] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại Marketplace
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-900">{template.name}</span>
          {template.badge && (
            <span className={`text-[10px] font-extrabold tracking-wider text-white px-2.5 py-0.5 rounded-full uppercase ${
              template.badge === 'BÁN CHẠY' ? 'bg-rose-500' : template.badge === 'PREMIUM' ? 'bg-amber-500' : 'bg-indigo-600'
            }`}>
              {template.badge}
            </span>
          )}
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${isFree ? 'bg-[#00aaff] text-white' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
            {template.priceText}
          </span>
        </div>

        <button
          onClick={() => navigate(`/template-editor/new?template=${templateId}`)}
          className="px-6 py-2 bg-[#003f87] hover:bg-[#002d63] text-white text-xs font-bold rounded-full transition-colors shadow-sm active:scale-95"
        >
          {isFree ? 'Dùng miễn phí ngay' : 'Mua & Thiết kế ngay'}
        </button>
      </div>

      {/* ── Template content — rendered below toolbar ─────────────── */}
      <div className="pt-[52px]">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#003f87] border-t-transparent rounded-full" />
          </div>
        }>
          <Component lang="vi" />
        </Suspense>
      </div>
    </div>
  );
}
