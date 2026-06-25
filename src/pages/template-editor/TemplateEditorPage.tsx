import { lazy, Suspense, useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Globe, Check, Loader2, Monitor, Smartphone, Sparkles, AlertCircle, Copy, ExternalLink, X } from 'lucide-react';
import { TemplateCustomProvider } from '../../context/TemplateCustomContext';
import { TEMPLATE_IMAGE_KEYS } from '../../data/Template/templateImageKeys';
import { saveSiteConfig, getSiteConfig, generateSlug, slugExists } from '../../services/siteConfigService';
import type { SiteConfig, SiteTemplateId, SiteLang } from '../../types';
import EditorPanel from './_components/EditorPanel';
import { translateCustomData } from '../../services/geminiService';
import { getUserId } from '../../utils/userId';
import { useAppContext } from '../../store/AppContext';

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
  const [publishedSite, setPublishedSite] = useState<SiteConfig | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

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

  // ── Save (draft) ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!site) return;
    const toSave: SiteConfig = {
      ...site,
      createdBy: site.createdBy ?? getUserId(),
      updatedAt: new Date().toISOString(),
    };
    try {
      const saved = await saveSiteConfig(toSave);
      setSite(saved);
      upsertSiteConfig(saved);
      setSavedPulse(true);
      setTimeout(() => setSavedPulse(false), 2000);
    } catch (err) {
      console.error('Failed to save config:', err);
      alert('Không thể lưu cấu hình. Vui lòng thử lại.');
    }
  };

  // ── Publish ───────────────────────────────────────────────────────────────
  const handlePublish = async () => {
    if (!site || !!slugError) return;
    const toSave: SiteConfig = {
      ...site,
      status: 'published',
      createdBy: site.createdBy ?? getUserId(),
      updatedAt: new Date().toISOString(),
    };
    try {
      const saved = await saveSiteConfig(toSave);
      setSite(saved);
      upsertSiteConfig(saved);
      setPublishedSite(saved);   // opens success modal
    } catch (err) {
      console.error('Failed to publish:', err);
      alert('Không thể xuất bản. Vui lòng thử lại.');
    }
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

  // ── Copy live URL ─────────────────────────────────────────────────────────
  const handleCopyUrl = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
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

          {/* Save button */}
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full transition-all ${savedPulse ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {savedPulse ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {savedPulse ? 'Đã lưu' : 'Lưu nháp'}
          </button>

          {/* Publish button */}
          <button
            onClick={handlePublish}
            disabled={!!slugError}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#003f87] rounded-full hover:bg-[#002d63] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            Xuất bản
          </button>
        </div>
      </header>

      {/* ── Body: panel + preview ─────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <aside className="flex-shrink-0 w-[340px] bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tùy chỉnh nội dung</h2>
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

      {/* ── Publish Success Modal ─────────────────────────────────────────── */}
      {publishedSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003f87] to-[#0056b3] p-6 text-white relative">
              <button
                onClick={() => setPublishedSite(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold">Xuất bản thành công!</h2>
                  <p className="text-xs text-white/80 mt-0.5">Website của bạn đã live trên internet</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Site info */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tên website</p>
                <p className="text-sm font-semibold text-gray-900">{publishedSite.name}</p>
              </div>

              {/* Live URL box */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Đường dẫn truy cập</p>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                  <Globe className="w-3.5 h-3.5 text-[#003f87] flex-shrink-0" />
                  <span className="text-xs font-mono text-gray-700 flex-1 truncate">
                    {window.location.origin}/p/{publishedSite.slug}
                  </span>
                  <button
                    onClick={() => handleCopyUrl(publishedSite.slug)}
                    className="flex items-center gap-1 text-xs font-semibold text-[#003f87] hover:text-[#002d63] transition-colors flex-shrink-0"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedUrl ? 'Đã sao chép' : 'Sao chép'}
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 rounded-xl p-3 space-y-0.5">
                  <p className="text-gray-400 font-medium">Template</p>
                  <p className="font-bold text-gray-800">{TEMPLATE_NAMES[publishedSite.templateId]}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 space-y-0.5">
                  <p className="text-gray-400 font-medium">Ngôn ngữ mặc định</p>
                  <p className="font-bold text-gray-800">
                    {publishedSite.lang === 'vi' ? '🇻🇳 Tiếng Việt' : publishedSite.lang === 'en' ? '🇬🇧 English' : publishedSite.lang === 'zh' ? '🇨🇳 中文' : '🇰🇷 한국어'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setPublishedSite(null); navigate('/dashboard/projects'); }}
                  className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Về trang dự án
                </button>
                <a
                  href={`/p/${publishedSite.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-[#003f87] hover:bg-[#002d63] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Xem trang live
                </a>
              </div>
            </div>
          </div>
        </div>
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
