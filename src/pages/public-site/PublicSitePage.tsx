import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert, Mail, ArrowLeft, Coffee, SearchX, Globe as GlobeIcon, Download } from 'lucide-react';
import { getSiteConfigBySlug } from '../../services/siteConfigService';
import { TemplateCustomProvider } from '../../context/TemplateCustomContext';
import { useAnalyticsTracker } from '../../hooks/useAnalyticsTracker';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import { sendLog } from '../../services/analyticsService';
import { LANGUAGES, hasContent, langMeta } from '../../constants/languages';
import type { SiteConfig, SiteLang } from '../../types';
import { extractSeoFacts, buildLocalBusinessJsonLd, ogLocaleForLang } from '../../utils/seo';
import { cloudinarySquareIcon } from '../../utils/cloudinaryIcon';

import { COMPONENT_MAP, TEMPLATES } from '../../data/templates/registry';

// ── Language switcher — chỉ hiện nếu site có từ 2 ngôn ngữ có nội dung trở lên ──

function LanguageSwitcher({
  current, available, onChange,
}: {
  current: SiteLang;
  available: SiteLang[];
  onChange: (lang: SiteLang) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  if (available.length <= 1) return null;
  const currentMeta = langMeta(current);

  return (
    <div ref={ref} className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm shadow-lg border border-black/5 rounded-full pl-3 pr-2.5 py-2 text-xs font-semibold text-gray-700 hover:shadow-xl transition-all"
      >
        <GlobeIcon className="w-3.5 h-3.5 text-gray-500" />
        <span>{currentMeta.shortLabel}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-11 bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-36 overflow-hidden">
          {available.map(code => {
            const meta = langMeta(code);
            return (
              <button
                key={code}
                onClick={() => { onChange(code); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                  code === current ? 'font-bold text-primary' : 'text-gray-600'
                }`}
              >
                <span className="w-7 text-[10px] font-bold text-gray-400">{meta.shortLabel}</span>
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TemplateSite({ config }: { config: SiteConfig }) {
  useAnalyticsTracker(config.slug);
  const [searchParams, setSearchParams] = useSearchParams();

  // Chỉ cho khách chọn ngôn ngữ nào THỰC SỰ có nội dung (tránh hiện trang trống)
  const availableLangs = LANGUAGES.map(l => l.code).filter(code => hasContent(config.customData[code]));

  const urlLang = searchParams.get('lang') as SiteLang | null;
  const activeLang: SiteLang =
    urlLang && availableLangs.includes(urlLang)
      ? urlLang
      : availableLangs.includes(config.lang)
        ? config.lang
        : (availableLangs[0] ?? config.lang);

  const handleLangChange = (lang: SiteLang) => {
    sendLog(config.slug, 'User-Language-Switch', { lang });
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('lang', lang);
      return next;
    });
  };

  const Component = COMPONENT_MAP[config.templateId];
  if (!Component) return null;

  const contextValue = {
    customData: (config.customData[activeLang] as Record<string, unknown>) ?? config.customData,
    images: config.images,
  };

  const ogImage = Object.values(config.images || {})[0];
  const canonicalUrl = `https://webchoviet.com/${config.slug}`;
  const category = TEMPLATES.find(t => t.id === config.templateId)?.category;
  const activeCustomData = (config.customData[activeLang] as Record<string, unknown>) ?? config.customData;
  const seoFacts = extractSeoFacts(activeCustomData);
  const description = seoFacts.tagline || `${config.name} — website được tạo bởi WebChoViet.`;
  const jsonLd = buildLocalBusinessJsonLd({
    name: config.name,
    url: canonicalUrl,
    category,
    image: ogImage,
    facts: seoFacts,
  });

  // ── PWA: cho khách "Thêm vào Màn hình chính" — hợp với use-case quét QR tại bàn,
  // khách quay lại quán nhiều lần thì không cần quét QR lại mỗi lần. Manifest DỘNG
  // theo từng site (tên/icon riêng), build ngay trên FE qua data: URI — không cần
  // thêm endpoint backend nào.
  const iconUrl = ogImage ? cloudinarySquareIcon(ogImage, 512) : `${window.location.origin}/favicon.svg`;
  const manifestHref = `data:application/json,${encodeURIComponent(JSON.stringify({
    name: config.name,
    short_name: config.name.slice(0, 30),
    start_url: `/${config.slug}`,
    scope: `/${config.slug}`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ff6b2c',
    icons: [{ src: iconUrl, sizes: ogImage ? '512x512' : 'any', type: ogImage ? 'image/png' : 'image/svg+xml' }],
  }))}`;

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    // Scope hẹp đúng bằng slug — SW này KHÔNG được phép ảnh hưởng tới các route khác
    // của app (dashboard/editor/admin), chỉ kiểm soát đúng trang site công khai này.
    navigator.serviceWorker.register('/sw.js', { scope: `/${config.slug}` }).catch(() => {
      // Cài đặt PWA là tính năng phụ trợ — lỗi ở đây không được phép ảnh hưởng tới việc xem site
    });
  }, [config.slug]);

  const { canInstall, promptInstall } = useInstallPrompt();

  return (
    <div className="relative">
      <Helmet>
        <title>{config.name} — WebChoViet</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        {availableLangs.map(code => (
          <link
            key={code}
            rel="alternate"
            hrefLang={code}
            href={code === config.lang ? canonicalUrl : `${canonicalUrl}?lang=${code}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={ogLocaleForLang(activeLang)} />
        <meta property="og:title" content={config.name} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
        <meta name="twitter:title" content={config.name} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

        {/* PWA — cho phép "Thêm vào Màn hình chính". manifest động theo từng site (data: URI). */}
        <link rel="manifest" href={manifestHref} />
        <meta name="theme-color" content="#ff6b2c" />
        {/* iOS Safari không đọc manifest.json cho Add to Home Screen — cần riêng bộ meta tag này */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={config.name} />
        <link rel="apple-touch-icon" href={iconUrl} />
      </Helmet>
      <TemplateCustomProvider value={contextValue}>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        }>
          <Component lang={activeLang} />
        </Suspense>
      </TemplateCustomProvider>

      <LanguageSwitcher current={activeLang} available={availableLangs} onChange={handleLangChange} />

      {/* Cài đặt lên màn hình chính — chỉ hiện khi trình duyệt xác nhận có thể cài (Chrome/Edge/Android) */}
      {canInstall && (
        <button
          onClick={promptInstall}
          className="fixed top-4 left-4 z-50 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm shadow-lg border border-black/5 rounded-full pl-3 pr-3.5 py-2 text-xs font-semibold text-gray-700 hover:shadow-xl transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-primary" />
          Cài đặt
        </button>
      )}

      {/* "Made with WebChoViet" badge */}
      <a
        href="/"
        className="fixed bottom-5 right-5 flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-lg border border-black/5 rounded-full pl-3 pr-4 py-2 text-xs font-semibold text-gray-600 hover:shadow-xl hover:text-gray-900 transition-all z-50"
      >
        <Coffee className="w-4 h-4 text-primary" />
        <span>Made with <span className="font-bold text-primary">WebChoViet</span></span>
      </a>
    </div>
  );
}

export default function PublicSitePage() {
  const { slug } = useParams<{ slug: string }>();

  type State =
    | { kind: 'loading' }
    | { kind: 'template'; config: SiteConfig }
    | { kind: 'notfound' };

  const [state, setState] = useState<State>({ kind: 'loading' });

  useEffect(() => {
    if (!slug) { setState({ kind: 'notfound' }); return; }

    async function checkSite() {
      try {
        // 1. Check new template-based sites
        const config = await getSiteConfigBySlug(slug);
        if (config && config.status === 'published') {
          setState({ kind: 'template', config });
          return;
        }
      } catch (error) {
        console.error('Failed to load published site:', error);
      }
      setState({ kind: 'notfound' });
    }

    checkSite();
    return () => { document.title = 'WebChoViet'; };
  }, [slug]);

  if (state.kind === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (state.kind === 'template') {
    if (state.config.isPending) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <Helmet>
            <meta name="robots" content="noindex, nofollow" />
          </Helmet>
          <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-white">Website Tạm Ngưng Hoạt Động</h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Trang web <span className="font-semibold text-slate-200">/{slug}</span> đã bị tạm dừng hoạt động bởi Quản trị viên. 
                Vui lòng liên hệ với Ban quản trị để biết thêm chi tiết và yêu cầu mở khóa.
              </p>
            </div>
            
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="mailto:vantu.software@gmail.com?subject=Yeu cau mo khoa website WebChoViet"
                className="w-full flex items-center justify-center gap-2 py-3 bg-linear-to-r from-orange-600 to-orange-600 hover:opacity-90 active:scale-95 text-white rounded-xl text-sm font-semibold shadow-md transition-all cursor-pointer"
              >
                <Mail className="h-4 w-4" />
                Liên hệ Quản trị viên
              </a>
              <Link
                to="/"
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Về Trang Chủ WebChoViet
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return <TemplateSite config={state.config} />;
  }

  // 404
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-center px-4">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SearchX className="w-16 h-16 text-gray-300 mb-6" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Trang không tìm thấy</h1>
      <p className="text-gray-500 text-sm mb-2">
        Đường dẫn{' '}
        <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded font-mono text-xs">
          /{slug}
        </code>{' '}
        chưa được xuất bản hoặc không tồn tại.
      </p>
      <p className="text-gray-400 text-xs mb-8">
        Nếu bạn vừa xuất bản, hãy kiểm tra lại slug hoặc thử tải lại trang.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-700 transition-colors"
      >
        Về trang chủ WebChoViet
      </Link>
    </div>
  );
}
