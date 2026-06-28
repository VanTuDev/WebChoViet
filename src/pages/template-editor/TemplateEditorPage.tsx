import { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Globe, Check, Loader2, Monitor, Smartphone, Save, AlertCircle } from 'lucide-react';
import { TemplateCustomProvider } from '../../context/TemplateCustomContext';
import { saveSiteConfig, getSiteConfig, generateSlug, slugExists } from '../../services/siteConfigService';
import type { SiteConfig } from '../../types';
import EditorPanel from './_components/EditorPanel';
import PublishModal from './_components/PublishModal';
import InlineEditOverlay from './_components/InlineEditOverlay';
import { getUserId } from '../../utils/userId';
import { generateUUID } from '../../utils/uuid';
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
  const { upsertSiteConfig } = useAppContext();

  const isEdit = !!siteId && siteId !== 'new';

  const [site, setSite] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedPulse, setSavedPulse] = useState(false);
  const [slugError, setSlugError] = useState('');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [inlineEdit, setInlineEdit] = useState<{
    path: string[];
    originalValue: string;
    rect: DOMRect;
    fieldLabel: string;
  } | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'pending' | 'saved'>('idle');
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMounted = useRef(false);
  const pendingScrollKey = useRef<string | null>(null);

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

  // ── Inline edit: double-click on template to edit text ───────────────────
  const handlePreviewDblClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLElement | null;
    while (target && target !== e.currentTarget) {
      const field = target.getAttribute('data-field');
      if (field) {
        const path = field.split('.');
        const originalValue = target.textContent?.trim() ?? '';
        setInlineEdit({
          path,
          originalValue,
          rect: target.getBoundingClientRect(),
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
    const el = document.querySelector(`[data-section="${key}"]`);
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
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-white bg-primary rounded-full hover:bg-[#002d63] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xuất bản</span>
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
          ✏️ Chỉnh sửa
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
            mobileTab === 'preview'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          👁️ Xem trước
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
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-[#002d63] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            .preview-edit-mode [data-field]:hover { outline: 2px dashed #3b82f6; outline-offset: 3px; border-radius: 3px; }
          `}</style>

          <div
            className={`preview-edit-mode transition-all duration-300 ${
              viewport === 'mobile'
                ? 'max-w-97.5 mx-auto my-4 rounded-4xl overflow-hidden shadow-2xl ring-4 ring-gray-300'
                : 'min-h-full'
            }`}
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

    </div>
  );
}
