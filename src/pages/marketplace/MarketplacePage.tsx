// Trang Kho Giao Diện — đọc category & query từ URL search params
import { useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Info, ChevronDown } from 'lucide-react';
import { TEMPLATES, type Template } from '../../data';
import { CATEGORY_HEADING_MAP } from '../../data/templates/registry';
import { ROUTES } from '../../config/routes';
import { DOMAIN } from '../../config/contact';
import TemplateCard from './_components/TemplateCard';
import TemplateFilters, { type PriceFilter, type SortBy } from './_components/TemplateFilters';
import HreflangLinks from '../../i18n/HreflangLinks';
import { useTemplateStars } from '../../hooks/useTemplateStars';

export default function MarketplacePage() {
  const { t } = useTranslation('marketplace');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') ?? 'all';
  const searchQuery = searchParams.get('q') ?? '';

  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [visibleCount, setVisibleCount] = useState(15);
  const { getStarCount } = useTemplateStars();

  const allHeading = { title: t('allHeading.title'), desc: t('allHeading.desc') };
  const heading = category === 'all' ? allHeading : (CATEGORY_HEADING_MAP[category] ?? allHeading);

  // ── Filter & Sort logic ────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...TEMPLATES];

    if (category !== 'all') result = result.filter(t => t.category === category);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)),
      );
    }
    if (priceFilter === 'free') result = result.filter(t => t.price === 0);
    if (priceFilter === 'paid') result = result.filter(t => t.price > 0);

    if (sortBy === 'bestseller')
      result.sort((a, b) => {
        if (a.badge === 'BÁN CHẠY') return -1;
        if (b.badge === 'BÁN CHẠY') return 1;
        return getStarCount(b.id) - getStarCount(a.id);
      });
    else if (sortBy === 'mostStarred') result.sort((a, b) => getStarCount(b.id) - getStarCount(a.id));
    else if (sortBy === 'priceAsc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'priceDesc') result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.id.localeCompare(a.id));

    return result;
  }, [category, searchQuery, priceFilter, sortBy, getStarCount]);

  const visible = filtered.slice(0, visibleCount);

  const handleUseTemplate = (t: Template) => {
    navigate(`/template-editor/new?template=${t.id}`);
  };

  // BreadcrumbList JSON-LD
  const categoryLabel = heading.title.split(':')[1]?.trim() ?? category;
  const breadcrumbJsonLd = category !== 'all' ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('breadcrumbRoot'), item: `https://${DOMAIN}${ROUTES.MARKETPLACE}` },
      { '@type': 'ListItem', position: 2, name: categoryLabel, item: `https://${DOMAIN}${ROUTES.MARKETPLACE}?category=${category}` },
    ],
  } : null;

  return (
    <div className="flex-1 py-5 sm:py-8 px-4 sm:px-6 xl:px-10 w-full">
      <Helmet>
        <title>{category === 'all' ? t('meta.title') : `${heading.title} — vngoweb`}</title>
        <meta name="description" content={category === 'all' ? t('meta.description') : heading.desc} />
        {breadcrumbJsonLd && (
          <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        )}
      </Helmet>
      <HreflangLinks path={ROUTES.MARKETPLACE} />

      {/* ── Category breadcrumb + Heading ────────────────────────────────── */}
      <header className="space-y-2.5 sm:space-y-4 mb-6 sm:mb-8">
        {category !== 'all' && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <Link to={ROUTES.MARKETPLACE} className="hover:text-primary-container">{t('breadcrumbRoot')}</Link>
            <span aria-hidden="true">&rsaquo;</span>
            <span className="text-primary-container capitalize">{heading.title.split(':')[1]?.trim() ?? category}</span>
          </nav>
        )}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gray-900 leading-tight">{heading.title}</h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-3xl leading-relaxed">{heading.desc}</p>
      </header>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <TemplateFilters
        priceFilter={priceFilter}
        sortBy={sortBy}
        totalCount={filtered.length}
        onPriceChange={v => { setPriceFilter(v); setVisibleCount(15); }}
        onSortChange={v => { setSortBy(v); setVisibleCount(15); }}
      />

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      {visible.length > 0 ? (
        <div className="stagger-children grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8">
          {visible.map(t => (
            <TemplateCard key={t.id} template={t} onUse={handleUseTemplate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant">
          <Info className="h-10 w-10 text-outline mx-auto mb-4" />
          <h3 className="text-base font-semibold text-gray-800">{t('empty.title')}</h3>
          <p className="text-xs text-gray-500 mt-1">{t('empty.desc')}</p>
        </div>
      )}

      {/* ── Load more ────────────────────────────────────────────────────── */}
      {filtered.length > visibleCount && (
        <div className="text-center mt-12 mb-8">
          <button
            onClick={() => setVisibleCount(prev => prev + 15)}
            className="hover-lift inline-flex items-center gap-2 px-10 py-3 rounded-full border border-fnb-orange/40 bg-white hover:bg-fnb-cream transition-colors text-xs font-bold text-primary cursor-pointer shadow-sm active:scale-95"
          >
            <span>{t('loadMore')}</span>
            <ChevronDown className="h-4 w-4 text-fnb-orange" />
          </button>
        </div>
      )}
    </div>
  );
}
