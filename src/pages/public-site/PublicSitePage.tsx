import { Suspense, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSiteConfigBySlug } from '../../services/siteConfigService';
import { TemplateCustomProvider } from '../../context/TemplateCustomContext';
import { useAnalyticsTracker } from '../../hooks/useAnalyticsTracker';
import type { SiteConfig } from '../../types';

import { COMPONENT_MAP } from '../../data/templates/registry';

function TemplateSite({ config }: { config: SiteConfig }) {
  useAnalyticsTracker(config.slug);

  const Component = COMPONENT_MAP[config.templateId];
  if (!Component) return null;

  const contextValue = {
    customData: (config.customData[config.lang] as Record<string, unknown>) ?? config.customData,
    images: config.images,
  };

  return (
    <div className="relative">
      <TemplateCustomProvider value={contextValue}>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        }>
          <Component lang={config.lang} />
        </Suspense>
      </TemplateCustomProvider>

      {/* "Made with WebChoViet" badge */}
      <a
        href="/"
        className="fixed bottom-5 right-5 flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-lg border border-black/5 rounded-full pl-3 pr-4 py-2 text-xs font-semibold text-gray-600 hover:shadow-xl hover:text-gray-900 transition-all z-50"
      >
        <span className="text-base leading-none">☕</span>
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
          document.title = `${config.name} — WebChoViet`;
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
    return <TemplateSite config={state.config} />;
  }

  // 404
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-center px-4">
      <div className="text-7xl mb-6 select-none">☕</div>
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
