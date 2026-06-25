import { lazy, Suspense, useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Globe, Check, Loader2, Monitor, Smartphone, Sparkles, Save, AlertCircle } from 'lucide-react';
import { TemplateCustomProvider } from '../../context/TemplateCustomContext';
import { TEMPLATE_IMAGE_KEYS } from '../../data/Template/templateImageKeys';
import { saveSiteConfig, getSiteConfig, generateSlug, slugExists } from '../../services/siteConfigService';
import type { SiteConfig, SiteTemplateId, SiteLang } from '../../types';
import EditorPanel from './_components/EditorPanel';
import PublishModal from './_components/PublishModal';
import { translateCustomData } from '../../services/geminiService';
import { getUserId } from '../../utils/userId';
import { useAppContext } from '../../store/AppContext';
import { TEMPLATES } from '../../data';

// ── i18n schemas (vi only, used as field schema) ───────────────────────────
import coffe1Schema from '../../data/Template/Coffe-1/i18n/vi.json';
import coffe2Schema from '../../data/Template/Coffe-2/i18n/vi.json';
import coffe3Schema from '../../data/Template/Coffe-3/i18n/vi.json';
import coffe4Schema from '../../data/Template/Coffe-4/i18n/vi.json';
import coffe5Schema from '../../data/Template/Coffe-5/i18n/vi.json';

// ── Lazy template components ───────────────────────────────────────────────
const COMPONENT_MAP: Record<string, React.LazyExoticComponent<React.ComponentType<{ lang?: string }>>> = {
  'coffe-1': lazy(() => import('../../data/Template/Coffe-1/index')),
  'coffe-2': lazy(() => import('../../data/Template/Coffe-2/index')),
  'coffe-3': lazy(() => import('../../data/Template/Coffe-3/index')),
  'coffe-4': lazy(() => import('../../data/Template/Coffe-4/index')),
  'coffe-5': lazy(() => import('../../data/Template/Coffe-5/index')),
};

const SCHEMA_MAP: Record<string, Record<string, unknown>> = {
  'coffe-1': coffe1Schema as Record<string, unknown>,
  'coffe-2': coffe2Schema as Record<string, unknown>,
  'coffe-3': coffe3Schema as Record<string, unknown>,
  'coffe-4': coffe4Schema as Record<string, unknown>,
  'coffe-5': coffe5Schema as Record<string, unknown>,
};

const TEMPLATE_NAMES: Record<string, string> = {
  'coffe-1': 'Garden Oasis',
  'coffe-2': 'Tropical Chill',
  'coffe-3': 'The Ocean Cafe',
  'coffe-4': 'Koi Garden',
  'coffe-5': 'Mật Ngọt Tea',
};

const LANGS: { value: SiteLang; label: string }[] = [
  { value: 'vi', label: '🇻🇳 Tiếng Việt' },
  { value: 'en', label: '🇬🇧 English' },
  { value: 'zh', label: '🇨🇳 中文' },
  { value: 'ko', label: '🇰🇷 한국어' },
];

// ── Utility: set any value at a dot-path in a nested object ──────────────

function setAtPath(obj: Record<string, unknown>, path: string[], value: unknown): Record<string, unknown> {
  if (path.length === 0) return obj;
  const [head, ...rest] = path;
  if (rest.length === 0) {
    return { ...obj, [head]: value };
  }
  const child = (obj[head] as Record<string, unknown>) ?? {};
  return { ...obj, [head]: setAtPath(child, rest, value) };
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function TemplateEditorPage() {
  const navigate = useNavigate();
  const { siteId } = useParams<{ siteId?: string }>();
  const [searchParams] = useSearchParams();
  const { upsertSiteConfig } = useAppContext();

  const isEdit = !!siteId && siteId !== 'new';

  const [site, setSite] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedPulse, setSavedPulse] = useState(false);
  const [slugError, setSlugError] = useState('');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'pending' | 'saved'>('idle');
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(false);

  const templateId = site?.templateId || 'coffe-1';
  const TemplateComponent = COMPONENT_MAP[templateId];
  const schema = SCHEMA_MAP[templateId] ?? {};
  const imageSlots = TEMPLATE_IMAGE_KEYS[templateId] ?? [];

  // ── Load configuration asynchronously ──────────────────────────────────────
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        if (isEdit) {
          const existing = await getSiteConfig(siteId!);
          if (existing) {
            // Ensure customData is language-namespaced
            const hasLangKeys = existing.customData && ('vi' in existing.customData || 'en' in existing.customData);
            if (!hasLangKeys) {
              existing.customData = { vi: existing.customData || {}, en: {}, zh: {}, ko: {} };
            } else {
              existing.customData = {
                vi: existing.customData.vi || {},
                en: existing.customData.en || {},
                zh: existing.customData.zh || {},
                ko: existing.customData.ko || {},
              };
            }
            setSite(existing);
            setIsLoading(false);
            return;
          }
        }

        const tId = (searchParams.get('template') ?? 'coffe-1') as SiteTemplateId;
        const generatedSlug = await generateSlug(TEMPLATE_NAMES[tId] ?? tId);
        const base: SiteConfig = {
          id: crypto.randomUUID(),
          templateId: tId,
          slug: generatedSlug,
          name: TEMPLATE_NAMES[tId] ?? tId,
          lang: 'vi',
          customData: { vi: {}, en: {}, zh: {}, ko: {} },
          images: {},
          status: 'draft',
          createdBy: getUserId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setSite(base);
      } catch (error) {
        console.error('Failed to load site config:', error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [isEdit, siteId, searchParams]);

  // ── Field change ──────────────────────────────────────────────────────────
  const handleFieldChange = useCallback((path: string[], value: string) => {
    setSite(prev => {
      if (!prev) return null;
      return {
        ...prev,
        customData: setAtPath(prev.customData, [prev.lang, ...path], value),
      };
    });
  }, []);

  // ── Array field change ────────────────────────────────────────────────────
  const handleArrayChange = useCallback((path: string[], newArray: Record<string, unknown>[]) => {
    setSite(prev => {
      if (!prev) return null;
      return {
        ...prev,
        customData: setAtPath(prev.customData, [prev.lang, ...path], newArray),
      };
    });
  }, []);

  // ── Image change ──────────────────────────────────────────────────────────
  const handleImageChange = useCallback((key: string, dataUrl: string) => {
    setSite(prev => {
      if (!prev) return null;
      return { ...prev, images: { ...prev.images, [key]: dataUrl } };
    });
  }, []);

  // ── Auto-save: debounce 1.5s on every site change ─────────────────────────
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    if (!site || isLoading) return;
    setAutoSaveStatus('pending');
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      try {
        const toSave: SiteConfig = { ...site, updatedAt: new Date().toISOString() };
        await saveSiteConfig(toSave);
        upsertSiteConfig(toSave);
        setAutoSaveStatus('saved');
        setTimeout(() => setAutoSaveStatus('idle'), 2500);
      } catch {
        setAutoSaveStatus('idle');
      }
    }, 1500);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [site]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Manual save ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!site) return;
    const toSave: SiteConfig = {
      ...site,
      createdBy: site.createdBy ?? getUserId(),
      updatedAt: new Date().toISOString(),
    };
    const saved = await saveSiteConfig(toSave);
    setSite(saved);
    upsertSiteConfig(saved);
    setSavedPulse(true);
    setTimeout(() => setSavedPulse(false), 2000);
  };

  // ── Publish (called from PublishModal) ────────────────────────────────────
  const handlePublish = async (name: string): Promise<string> => {
    if (!site) return '';
    const slug = await generateSlug(name, site.id);
    const toSave: SiteConfig = {
      ...site,
      name,
      slug,
      status: 'published',
      createdBy: site.createdBy ?? getUserId(),
      updatedAt: new Date().toISOString(),
    };
    const saved = await saveSiteConfig(toSave);
    setSite(saved);
    upsertSiteConfig(saved);
    return slug;
  };

  // ── Slug validation ───────────────────────────────────────────────────────
  const handleSlugChange = async (val: string) => {
    if (!site) return;
    const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '');
    const exists = await slugExists(clean, site.id);
    setSlugError(exists ? 'Slug này đã được dùng' : '');
    setSite(prev => {
      if (!prev) return null;
      return { ...prev, slug: clean };
    });
  };

  // ── AI Translate with Gemini ──────────────────────────────────────────────
  const [isTranslating, setIsTranslating] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(localStorage.getItem('gemini_api_key') || '');
  const [translationError, setTranslationError] = useState('');

  const handleAiTranslate = async (keyToUse?: string) => {
    const apiK = keyToUse || apiKeyInput || import.meta.env.VITE_GEMINI_API_KEY || '';
    if (!apiK) { setShowApiKeyModal(true); return; }
    if (!site) return;
    setIsTranslating(true);
    setTranslationError('');

    try {
      const sourceData = (site.customData.vi as Record<string, unknown>) || {};
      if (Object.keys(sourceData).length === 0) {
        alert('Vui lòng điền một số thông tin chỉnh sửa bằng Tiếng Việt trước khi dịch!');
        setIsTranslating(false);
        return;
      }

      const translated = await translateCustomData(sourceData, ['en', 'zh', 'ko'], apiK);

      setSite(prev => {
        if (!prev) return null;
        return {
          ...prev,
          customData: {
            ...prev.customData,
            en: { ...(prev.customData.en as Record<string, unknown>), ...translated.en },
            zh: { ...(prev.customData.zh as Record<string, unknown>), ...translated.zh },
            ko: { ...(prev.customData.ko as Record<string, unknown>), ...translated.ko },
          },
        };
      });

      alert('Đã dịch tự động sang tiếng Anh, tiếng Trung và tiếng Hàn thành công bằng Gemini!');
      if (keyToUse) {
        localStorage.setItem('gemini_api_key', keyToUse);
        setShowApiKeyModal(false);
      }
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Lỗi dịch thuật bằng AI. Vui lòng thử lại.';
      if (msg === 'API_KEY_MISSING') {
        setShowApiKeyModal(true);
      } else {
        setTranslationError(msg);
      }
    } finally {
      setIsTranslating(false);
    }
  };

  // ── Context value ─────────────────────────────────────────────────────────
  const contextValue = {
    customData: (site?.customData[site?.lang] as Record<string, unknown>) ?? {},
    images: site?.images || {},
  };

  if (isLoading || !site) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-50 gap-3 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#003f87]" />
        <span className="text-sm font-semibold">Đang tải cấu hình...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* ── Top toolbar ───────────────────────────────────────────────────── */}
      <header className="flex-shrink-0 h-[52px] bg-white border-b border-gray-200 flex items-center px-4 gap-3 z-40">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        <div className="w-px h-5 bg-gray-200" />

        {/* Site name */}
        <input
          type="text"
          value={site.name}
          onChange={e => setSite(prev => prev ? { ...prev, name: e.target.value } : null)}
          className="text-sm font-semibold text-gray-800 bg-transparent border-0 border-b border-transparent hover:border-gray-300 focus:border-[#003f87] focus:outline-none px-1 py-0.5 w-48 transition-colors"
          placeholder="Tên trang web"
        />

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>/p/</span>
          <input
            type="text"
            value={site.slug}
            onChange={e => handleSlugChange(e.target.value)}
            className={`text-xs font-mono bg-transparent border-0 border-b ${slugError ? 'border-red-400 text-red-500' : 'border-transparent hover:border-gray-300 focus:border-[#003f87]'} focus:outline-none px-1 py-0.5 w-36 transition-colors`}
            placeholder="ten-trang"
          />
          {slugError && <span className="text-[10px] text-red-500">{slugError}</span>}
        </div>

        {/* Lang selector + AI translate */}
        <div className="flex items-center gap-2">
          <select
            value={site.lang}
            onChange={e => setSite(prev => prev ? { ...prev, lang: e.target.value as SiteLang } : null)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#003f87] cursor-pointer"
          >
            {LANGS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>

          <button
            onClick={() => handleAiTranslate()}
            disabled={isTranslating}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#0056b3] bg-[#0056b3]/10 hover:bg-[#0056b3]/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            title="Dịch tự động cấu hình Tiếng Việt sang Anh, Trung, Hàn bằng AI Gemini"
          >
            {isTranslating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{isTranslating ? 'Đang dịch...' : 'Dịch AI (Gemini)'}</span>
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Viewport toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-md transition-colors ${viewport === 'desktop' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-md transition-colors ${viewport === 'mobile' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-xs text-gray-400 hidden sm:block">{TEMPLATE_NAMES[templateId]}</span>

          {/* Draft status badge */}
          {site.status === 'published' && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Đã xuất bản
            </span>
          )}

          {/* Auto-save indicator */}
          {autoSaveStatus !== 'idle' && (
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              {autoSaveStatus === 'pending'
                ? <><Loader2 className="w-3 h-3 animate-spin" />Đang lưu...</>
                : <><Check className="w-3 h-3 text-emerald-500" />Đã lưu tự động</>
              }
            </span>
          )}

          {/* Manual save */}
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full transition-all ${savedPulse ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {savedPulse ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {savedPulse ? 'Đã lưu' : 'Lưu'}
          </button>
        </div>
      </header>

      {/* ── Body: panel + preview ─────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <aside className="flex-shrink-0 w-[340px] bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tùy chỉnh nội dung</h2>
            <button
              onClick={() => setShowPublishModal(true)}
              disabled={!!slugError}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#003f87] rounded-full hover:bg-[#002d63] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Globe className="w-3 h-3" />
              Xuất bản
            </button>
          </div>
          <EditorPanel
            schema={schema}
            customData={(site.customData[site.lang] as Record<string, unknown>) ?? {}}
            images={site.images}
            imageSlots={imageSlots}
            onChange={handleFieldChange}
            onArrayChange={handleArrayChange}
            onImageChange={handleImageChange}
          />
        </aside>

        {/* Right: live preview */}
        <main className="flex-1 overflow-auto bg-gray-100">
          <div
            className={`transition-all duration-300 ${viewport === 'mobile' ? 'max-w-[390px] mx-auto my-4 rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-gray-300' : 'min-h-full'}`}
          >
            <TemplateCustomProvider value={contextValue}>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-96 gap-3 text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Đang tải template...</span>
                  </div>
                }
              >
                <TemplateComponent lang={site.lang} />
              </Suspense>
            </TemplateCustomProvider>
          </div>
        </main>
      </div>

      {/* ── Publish Modal ─────────────────────────────────────────────────── */}
      {showPublishModal && (
        <PublishModal
          siteName={site.name}
          siteSlug={site.slug}
          templateName={TEMPLATE_NAMES[templateId] ?? templateId}
          templatePrice={TEMPLATES.find(t => t.id === templateId)?.price ?? 0}
          slugError={slugError}
          onPublish={handlePublish}
          onClose={() => setShowPublishModal(false)}
        />
      )}

      {/* ── API Key Modal ─────────────────────────────────────────────────── */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-bold text-sm">Nhập Gemini API Key</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Dịch thuật tự động bằng AI yêu cầu bạn cung cấp một <strong>Gemini API Key</strong> (từ Google AI Studio). Khóa này sẽ được lưu ở trình duyệt của bạn và không tải lên máy chủ của chúng tôi.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-blue-400 transition-all font-mono"
            />
            {translationError && (
              <p className="text-[10px] text-red-500 font-semibold bg-red-50 p-2 rounded-lg">{translationError}</p>
            )}
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => { setShowApiKeyModal(false); setTranslationError(''); }}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => handleAiTranslate(apiKeyInput)}
                disabled={isTranslating}
                className="px-4 py-2 bg-[#003f87] hover:bg-[#002d63] text-white font-bold rounded-lg disabled:opacity-50"
              >
                {isTranslating ? 'Đang dịch...' : 'Xác nhận dịch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
