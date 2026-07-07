import { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Globe, Check, Loader2, Monitor, Smartphone, Save, AlertCircle, Languages, MapPin, Pencil, Eye } from 'lucide-react';
import { TemplateCustomProvider } from '../../context/TemplateCustomContext';
import { saveSiteConfig, getSiteConfig, generateSlug, slugExists } from '../../services/siteConfigService';
import { translateCustomData } from '../../services/translateService';
import type { AutofillResult } from '../../services/googleMapsImportService';
import { LANGUAGES, TRANSLATABLE_LANGS, hasContent } from '../../constants/languages';
import type { SiteConfig } from '../../types';
import EditorPanel from './_components/EditorPanel';
import PublishModal from './_components/PublishModal';
import InlineEditOverlay from './_components/InlineEditOverlay';
import GoogleMapsImportModal from './_components/GoogleMapsImportModal';
import AiAssistantWidget from './_components/AiAssistantWidget';
import { generateUUID } from '../../utils/uuid';
import { deepMerge } from '../../utils/deepMerge';
import { useAppContext } from '../../store/AppContext';
import { ROUTES } from '../../config/routes';
import { TEMPLATES } from '../../data';
import {
  COMPONENT_MAP,
  SCHEMA_MAP,
  TEMPLATE_NAME_MAP,
  TEMPLATE_IMAGE_KEYS,
} from '../../data/templates/registry';

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
  const { upsertSiteConfig, showSnackbar, showConfirm } = useAppContext();

  const isEdit = !!siteId && siteId !== 'new';

  const [site, setSite] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedPulse, setSavedPulse] = useState(false);
  const [slugError, setSlugError] = useState('');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showGmapsModal, setShowGmapsModal] = useState(false);
  const [inlineEdit, setInlineEdit] = useState<{
    path: string[];
    originalValue: string;
    rect: DOMRect;
    fieldLabel: string;
  } | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'pending' | 'saved'>('idle');
  const [isTranslating, setIsTranslating] = useState(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Chống spam snackbar: chỉ báo lỗi autosave 1 lần cho mỗi chuỗi thất bại liên tiếp
  const autoSaveErrorNotified = useRef(false);
  const isMounted = useRef(false);
  const pendingScrollKey = useRef<string | null>(null);

  // ── Mobile preview: real iframe viewport so template CSS breakpoints
  // (Tailwind sm:/md:/lg:) recompute against a real 390px width instead of
  // the actual (wide) editor window — otherwise "mobile mode" just squeezes
  // the desktop layout into a small box instead of truly re-laying it out.
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeDocRef = useRef<Document | null>(null);
  const [iframeDoc, setIframeDoc] = useState<Document | null>(null);

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

        const tId = searchParams.get('template') ?? 'coffe-1';
        const generatedSlug = await generateSlug(TEMPLATE_NAME_MAP[tId] ?? tId);
        const base: SiteConfig = {
          id: generateUUID(),
          templateId: tId,
          slug: generatedSlug,
          name: TEMPLATE_NAME_MAP[tId] ?? tId,
          lang: 'vi',
          customData: { vi: {}, en: {}, zh: {}, ko: {} },
          images: {},
          status: 'draft',
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

  // ── Mobile preview iframe setup ─────────────────────────────────────────────
  // Fires once per mount of the <iframe> (i.e. each time the user switches to
  // mobile mode). Clones the app's current stylesheets into the iframe's own
  // document so Tailwind classes render identically, but evaluated against the
  // iframe's real (narrow) viewport — giving correct breakpoint switching and
  // native touch/scroll behavior, like an actual phone.
  const handleIframeLoad = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;

    const meta = doc.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1';
    doc.head.appendChild(meta);

    document.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
      doc.head.appendChild(node.cloneNode(true));
    });

    const style = doc.createElement('style');
    style.textContent = `
      html, body { margin: 0; padding: 0; background: #fff; }
      .preview-edit-mode [data-field] { cursor: text; }
      .preview-edit-mode [data-field]:hover { outline: 2px dashed #ff6b2c; outline-offset: 3px; border-radius: 3px; }
    `;
    doc.head.appendChild(style);
    doc.body.className = 'preview-edit-mode';

    iframeDocRef.current = doc;
    setIframeDoc(doc);
  }, []);

  // Reset when leaving mobile mode so a stale (detached) document from the
  // previous iframe instance can't be portaled into on the next switch.
  useEffect(() => {
    if (viewport !== 'mobile') {
      iframeDocRef.current = null;
      setIframeDoc(null);
    }
  }, [viewport]);

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
        autoSaveErrorNotified.current = false;
        setAutoSaveStatus('saved');
        setTimeout(() => setAutoSaveStatus('idle'), 2500);
      } catch (error) {
        // KHÔNG nuốt lỗi im lặng: nếu autosave thất bại (vd vượt giới hạn site của gói),
        // nội dung chỉ còn trong trình duyệt — user phải được biết để xử lý trước khi thoát.
        setAutoSaveStatus('idle');
        if (!autoSaveErrorNotified.current) {
          autoSaveErrorNotified.current = true;
          const msg = error instanceof Error ? error.message : 'Không rõ nguyên nhân.';
          showSnackbar(`Tự động lưu thất bại: ${msg} Nội dung chưa được lưu lên máy chủ.`, 'error');
        }
      }
    }, 1500);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [site]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Manual save ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!site) return;
    try {
      const toSave: SiteConfig = { ...site, updatedAt: new Date().toISOString() };
      const saved = await saveSiteConfig(toSave);
      setSite(saved);
      upsertSiteConfig(saved);
      setSavedPulse(true);
      setTimeout(() => setSavedPulse(false), 2000);
    } catch (error) {
      showSnackbar(error instanceof Error ? error.message : 'Không thể lưu. Vui lòng thử lại.', 'error');
    }
  };

  // ── Publish (called from PublishModal) ────────────────────────────────────
  const handlePublish = async (name: string): Promise<string> => {
    if (!site) return '';
    try {
      const slug = await generateSlug(name, site.id);
      const toSave: SiteConfig = {
        ...site,
        name,
        slug,
        status: 'published',
        updatedAt: new Date().toISOString(),
      };
      const saved = await saveSiteConfig(toSave);
      setSite(saved);
      upsertSiteConfig(saved);
      return slug;
    } catch (error) {
      showSnackbar(error instanceof Error ? error.message : 'Không thể xuất bản. Vui lòng thử lại.', 'error');
      throw error;
    }
  };

  // ── Dịch tự động vi → en/zh/ko qua Gemini ─────────────────────────────────
  const runTranslate = async () => {
    if (!site) return;
    const viData = (site.customData.vi as Record<string, unknown>) ?? {};
    setIsTranslating(true);
    try {
      const result = await translateCustomData(viData, TRANSLATABLE_LANGS);
      setSite(prev => (prev ? { ...prev, customData: { ...prev.customData, ...result } } : null));
      showSnackbar('Đã dịch xong English / 中文 / 한국어. Kiểm tra lại từng tab nhé.', 'success');
    } catch (error) {
      showSnackbar(error instanceof Error ? error.message : 'Dịch thất bại. Vui lòng thử lại.', 'error');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslate = () => {
    if (!site) return;
    const viData = (site.customData.vi as Record<string, unknown>) ?? {};
    if (!hasContent(viData)) {
      showSnackbar('Chưa có nội dung tiếng Việt để dịch. Hãy nhập nội dung trước.', 'error');
      return;
    }

    const alreadyTranslated = TRANSLATABLE_LANGS.some(l => hasContent(site.customData[l]));
    if (alreadyTranslated) {
      showConfirm({
        title: 'Ghi đè bản dịch hiện có?',
        message: 'EN / 中文 / 한국어 đã có nội dung — dịch lại sẽ THAY THẾ toàn bộ, mất các chỉnh sửa thủ công trước đó ở các ngôn ngữ này.',
        confirmLabel: 'Dịch lại',
        variant: 'danger',
        onConfirm: runTranslate,
      });
    } else {
      runTranslate();
    }
  };

  // ── Tạo tự động từ Google Maps: cào dữ liệu qua Apify + điền bằng Gemini ──
  const applyAutofillResult = useCallback((result: AutofillResult) => {
    setSite(prev => {
      if (!prev) return null;
      const mergedVi = deepMerge((prev.customData.vi as Record<string, unknown>) ?? {}, result.customData);
      return {
        ...prev,
        lang: 'vi',
        customData: { ...prev.customData, vi: mergedVi },
        images: { ...prev.images, ...result.images },
      };
    });
    showSnackbar('Đã tạo nội dung tự động từ Google Maps. Kiểm tra và chỉnh sửa lại nếu cần.', 'success');
  }, [showSnackbar]);

  const handleGmapsAutofillSuccess = useCallback((result: AutofillResult) => {
    setShowGmapsModal(false);
    const viData = (site?.customData.vi as Record<string, unknown>) ?? {};
    if (hasContent(viData)) {
      showConfirm({
        title: 'Ghi đè nội dung hiện có?',
        message: 'Nội dung tiếng Việt đã có sẵn — áp dụng dữ liệu từ Google Maps sẽ GHI ĐÈ nội dung này.',
        confirmLabel: 'Ghi đè',
        variant: 'danger',
        onConfirm: () => applyAutofillResult(result),
      });
    } else {
      applyAutofillResult(result);
    }
  }, [site, showConfirm, applyAutofillResult]);

  // ── Trợ lý AI (chat): áp dụng updates đã được người dùng xác nhận vào tab ngôn ngữ đang sửa ──
  const handleAiAssistantApply = useCallback((updates: Record<string, unknown>) => {
    setSite(prev => {
      if (!prev) return null;
      const merged = deepMerge((prev.customData[prev.lang] as Record<string, unknown>) ?? {}, updates);
      return { ...prev, customData: { ...prev.customData, [prev.lang]: merged } };
    });
    showSnackbar('Đã áp dụng thay đổi từ trợ lý AI.', 'success');
  }, [showSnackbar]);

  // ── Inline edit: double-click on template to edit text ───────────────────
  const handlePreviewDblClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLElement | null;
    while (target && target !== e.currentTarget) {
      const field = target.getAttribute('data-field');
      if (field) {
        const path = field.split('.');
        const originalValue = target.textContent?.trim() ?? '';
        let rect = target.getBoundingClientRect();
        // Target lives inside the mobile-preview iframe's own document —
        // its rect is relative to the iframe's viewport, so offset it by the
        // iframe's position in the outer page (where the overlay is drawn).
        if (target.ownerDocument !== document && iframeRef.current) {
          const frameRect = iframeRef.current.getBoundingClientRect();
          rect = new DOMRect(rect.left + frameRect.left, rect.top + frameRect.top, rect.width, rect.height);
        }
        setInlineEdit({
          path,
          originalValue,
          rect,
          fieldLabel: path[path.length - 1],
        });
        e.preventDefault();
        return;
      }
      target = target.parentElement;
    }
  }, []);

  const handleInlineEditChange = useCallback((value: string) => {
    if (!inlineEdit) return;
    handleFieldChange(inlineEdit.path, value);
  }, [inlineEdit, handleFieldChange]);

  const handleInlineEditUndo = useCallback(() => {
    if (!inlineEdit) return;
    handleFieldChange(inlineEdit.path, inlineEdit.originalValue);
    setInlineEdit(null);
  }, [inlineEdit, handleFieldChange]);

  // ── Section focus: scroll preview to clicked section ─────────────────────
  const scrollToSection = (key: string) => {
    const doc = viewport === 'mobile' && iframeDocRef.current ? iframeDocRef.current : document;
    const el = doc.querySelector(`[data-section="${key}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSectionFocus = (key: string) => {
    if (mobileTab === 'editor') {
      pendingScrollKey.current = key;
      setMobileTab('preview');
    } else {
      scrollToSection(key);
    }
  };

  useEffect(() => {
    setInlineEdit(null);
    if (mobileTab === 'preview' && pendingScrollKey.current) {
      const key = pendingScrollKey.current;
      pendingScrollKey.current = null;
      setTimeout(() => scrollToSection(key), 80);
    }
  }, [mobileTab]);

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

  // ── Context value ─────────────────────────────────────────────────────────
  const contextValue = {
    customData: (site?.customData[site?.lang] as Record<string, unknown>) ?? {},
    images: site?.images || {},
  };

  if (isLoading || !site) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-50 gap-3 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="text-sm font-semibold">Đang tải cấu hình...</span>
      </div>
    );
  }

  // templateId có thể trỏ tới 1 template đã bị gỡ khỏi registry (site cũ, đổi tên...) —
  // trước đây không check, `<TemplateComponent lang={...} />` với giá trị undefined ném
  // "invalid element type", crash render không có thông báo rõ ràng.
  if (!TemplateComponent) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-50 gap-3 text-center px-4">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-sm font-semibold text-gray-600">Không tìm thấy template "{templateId}".</p>
        <button
          onClick={() => navigate(ROUTES.MARKETPLACE)}
          className="mt-2 px-4 py-2 text-xs font-bold text-white bg-primary rounded-full hover:bg-[#b33912] transition-colors"
        >
          Về Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="shrink-0 bg-white border-b border-gray-200 z-40">

        {/* Row 1 – always visible */}
        <div className="flex items-center gap-2 px-3 h-12">
          <button
            onClick={() => navigate(ROUTES.MARKETPLACE)}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Quay lại</span>
          </button>

          <div className="w-px h-5 bg-gray-200 shrink-0" />

          {/* Site name — flex-1 on mobile, fixed on md+ */}
          <input
            type="text"
            value={site.name}
            onChange={e => setSite(prev => prev ? { ...prev, name: e.target.value } : null)}
            className="text-sm font-semibold text-gray-800 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none px-1 py-0.5 min-w-0 flex-1 md:flex-none md:w-44 transition-colors"
            placeholder="Tên trang web"
          />

          {/* Slug — lg+ only */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-gray-400 shrink-0">
            <span>/</span>
            <input
              type="text"
              value={site.slug}
              onChange={e => handleSlugChange(e.target.value)}
              className={`text-xs font-mono bg-transparent border-b ${slugError ? 'border-red-400 text-red-500' : 'border-transparent hover:border-gray-300 focus:border-primary'} focus:outline-none px-1 py-0.5 w-28 transition-colors`}
              placeholder="ten-trang"
            />
            {slugError && <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />}
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            {/* Viewport toggle — md+ */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop"
                className={`p-1.5 rounded-md transition-colors ${viewport === 'desktop' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="Mobile"
                className={`p-1.5 rounded-md transition-colors ${viewport === 'mobile' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Template name — xl+ */}
            <span className="hidden xl:block text-xs text-gray-400">{TEMPLATE_NAME_MAP[templateId]}</span>

            {/* Published badge — sm+ */}
            {site.status === 'published' && (
              <span className="hidden sm:inline text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Đã xuất bản
              </span>
            )}

            {/* Auto-save — lg+ */}
            {autoSaveStatus !== 'idle' && (
              <span className="hidden lg:flex items-center gap-1 text-[11px] text-gray-400">
                {autoSaveStatus === 'pending'
                  ? <><Loader2 className="w-3 h-3 animate-spin" />Đang lưu...</>
                  : <><Check className="w-3 h-3 text-emerald-500" />Đã lưu</>
                }
              </span>
            )}

            {/* Save */}
            <button
              onClick={handleSave}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-full transition-all ${savedPulse ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {savedPulse ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{savedPulse ? 'Đã lưu' : 'Lưu'}</span>
            </button>

            {/* Publish */}
            <button
              onClick={() => setShowPublishModal(true)}
              disabled={!!slugError}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-white bg-primary rounded-full hover:bg-[#b33912] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xuất bản</span>
            </button>
          </div>
        </div>

        {/* Row 2 – language tabs + dịch tự động */}
        <div className="flex items-center gap-2 px-3 h-10 border-t border-gray-100">
          <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setSite(prev => (prev ? { ...prev, lang: l.code } : null))}
                title={l.label}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-colors ${
                  site.lang === l.code ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span>{l.shortLabel}</span>
                {l.code !== 'vi' && hasContent(site.customData[l.code]) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                )}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowGmapsModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Tạo từ Google Maps</span>
            </button>

            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold text-primary bg-primary/10 hover:bg-primary/15 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isTranslating
                ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang dịch...</>
                : <><Languages className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Dịch tự động</span></>}
            </button>
          </div>
        </div>

      </header>

      {/* ── Mobile tab switcher ───────────────────────────────────────────── */}
      <div className="md:hidden shrink-0 flex bg-white border-b border-gray-200">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
            mobileTab === 'editor'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Pencil className="w-3.5 h-3.5" /> Chỉnh sửa
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
            mobileTab === 'preview'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Xem trước
        </button>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Editor panel:
            mobile → full-width when editor tab active, hidden when preview tab
            md+    → fixed sidebar (288px tablet / 340px desktop) */}
        <aside
          className={[
            'flex-col overflow-hidden bg-white border-r border-gray-200',
            mobileTab === 'editor' ? 'flex flex-1' : 'hidden',
            'md:flex md:flex-none md:w-72 lg:w-85',
          ].join(' ')}
        >
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
            onSectionFocus={handleSectionFocus}
          />
          <div className="shrink-0 px-4 py-3 border-t border-gray-100">
            <button
              onClick={() => setShowPublishModal(true)}
              disabled={!!slugError}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-[#b33912] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Globe className="w-4 h-4" />
              Xuất bản
            </button>
          </div>
        </aside>

        {/* Live preview:
            mobile → full-width when preview tab active, hidden when editor tab
            md+    → flex-1, takes remaining width */}
        <main
          className={[
            'overflow-auto bg-gray-100',
            mobileTab === 'preview' ? 'flex flex-col flex-1' : 'hidden',
            'md:flex md:flex-col md:flex-1',
          ].join(' ')}
        >
          {/* CSS: highlight data-field elements on hover in editor preview */}
          <style>{`
            .preview-edit-mode [data-field] { cursor: text; }
            .preview-edit-mode [data-field]:hover { outline: 2px dashed #ff6b2c; outline-offset: 3px; border-radius: 3px; }
          `}</style>

          {viewport === 'mobile' ? (
            /*
              Mobile mode renders inside a real <iframe> so the template's
              Tailwind breakpoints (sm:/md:/lg:) recompute against a real
              390px viewport — a plain narrow div can't do this, since CSS
              media queries evaluate against the browser window's actual
              width, not a container's width. This also gives native
              touch/scroll behavior inside the frame, like a real phone, and
              contains any `position: fixed` template navbars for free
              (no leaking on top of the editor header like the old
              same-DOM approach needed a transform hack for).
            */
            <div className="mx-auto my-4 w-97.5 rounded-4xl overflow-hidden shadow-2xl ring-4 ring-gray-300">
              <iframe
                ref={iframeRef}
                onLoad={handleIframeLoad}
                title="Xem trước trên điện thoại"
                style={{ width: 390, height: 844, border: 'none', display: 'block' }}
              />
              {iframeDoc &&
                createPortal(
                  <TemplateCustomProvider value={contextValue}>
                    <div onDoubleClick={handlePreviewDblClick}>
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
                    </div>
                  </TemplateCustomProvider>,
                  iframeDoc.body
                )}
            </div>
          ) : (
            <div
              className="preview-edit-mode isolate min-h-full"
              style={{ transform: 'translateZ(0)' }}
              onDoubleClick={handlePreviewDblClick}
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
          )}
        </main>
      </div>

      {/* ── Inline edit overlay ──────────────────────────────────────────── */}
      {inlineEdit && (
        <InlineEditOverlay
          initialValue={inlineEdit.originalValue}
          fieldLabel={inlineEdit.fieldLabel}
          rect={inlineEdit.rect}
          onChange={handleInlineEditChange}
          onClose={() => setInlineEdit(null)}
          onUndo={handleInlineEditUndo}
        />
      )}

      {/* ── Google Maps Import Modal ──────────────────────────────────────── */}
      {showGmapsModal && (
        <GoogleMapsImportModal
          templateSchema={schema}
          imageSlots={imageSlots}
          onSuccess={handleGmapsAutofillSuccess}
          onClose={() => setShowGmapsModal(false)}
        />
      )}

      {/* ── Publish Modal ─────────────────────────────────────────────────── */}
      {showPublishModal && (
        <PublishModal
          siteName={site.name}
          siteSlug={site.slug}
          templateName={TEMPLATE_NAME_MAP[templateId] ?? templateId}
          templatePrice={TEMPLATES.find(t => t.id === templateId)?.price ?? 0}
          slugError={slugError}
          onPublish={handlePublish}
          onClose={() => setShowPublishModal(false)}
        />
      )}

      {/* ── Trợ lý AI (chat nổi, kéo được) ───────────────────────────────── */}
      <AiAssistantWidget
        shopName={site.name}
        schema={schema}
        currentData={(site.customData[site.lang] as Record<string, unknown>) ?? {}}
        onApply={handleAiAssistantApply}
      />

    </div>
  );
}
