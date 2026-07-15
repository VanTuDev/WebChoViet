import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { Link } from 'react-router-dom';
import { ShieldCheck, BadgePercent, XCircle, Sparkles, ArrowUpRight } from 'lucide-react';
import PricingCard, { type PricingPlanDef } from './_components/PricingCard';
import { useAppContext } from '../../store/AppContext';
import { ROUTES } from '../../config/routes';
import { DOMAIN, BRAND_NAME } from '../../config/contact';
import { setPostLoginRedirect } from '../../services/authService';
import HreflangLinks from '../../i18n/HreflangLinks';
import {
  fetchMySubscription, createCheckout, cancelSubscription, reactivateSubscription,
  type MySubscription, type PaidPlanId, type BillingCycle,
} from '../../services/billingService';

// Giá niêm yết + hạn mức site — phần KHÔNG dịch; nguồn sự thật amount ở BE src/billing/plan-pricing.ts,
// hạn mức khớp BE src/users/schemas/user.schema.ts (PLAN_SITE_LIMIT) — sửa phải sửa cả 2 nơi.
// Nội dung text (name/desc/features) lấy từ i18n namespace pricing.
const PLAN_STATIC = [
  { id: 'free',  color: '#475569', price: null,                                    limits: { draft: 2, published: 2 },  popular: false },
  { id: 'pro',   color: '#ff6b2c', price: { monthly: 199_000, yearly: 1_990_000 }, limits: { draft: 4, published: 4 },  popular: true },
  { id: 'ultra', color: '#5b21b6', price: { monthly: 499_000, yearly: 4_990_000 }, limits: { draft: 10, published: 6 }, popular: false },
] as const;

function buildPlanDefs(t: TFunction<'pricing'>): PricingPlanDef[] {
  return PLAN_STATIC.map(p => ({
    ...p,
    price: p.price ? { ...p.price } : null,
    name: t(`plans.${p.id}.name`),
    desc: t(`plans.${p.id}.desc`),
    features: t(`plans.${p.id}.features`, { returnObjects: true }) as string[],
  }));
}

const PLAN_RANK: Record<string, number> = { free: 0, pro: 1, ultra: 2 };

function resolveCardState(
  planId: PricingPlanDef['id'],
  cycle: BillingCycle,
  subscription: MySubscription | null,
  t: TFunction<'pricing'>,
) {
  const currentPlan = subscription?.plan ?? 'free';
  const rank = PLAN_RANK[planId];
  const currentRank = PLAN_RANK[currentPlan];

  if (planId === 'free') {
    return currentPlan === 'free'
      ? { cta: t('cta.current'), disabled: true, actionable: false }
      : { cta: t('cta.lower'), disabled: true, actionable: false };
  }

  if (planId === currentPlan) {
    if (subscription?.billingCycle === cycle) {
      return { cta: t('cta.currentPlan'), disabled: true, actionable: false };
    }
    return { cta: t('cta.changeCycle'), disabled: false, actionable: true };
  }

  if (rank > currentRank) return { cta: t('cta.upgrade'), disabled: false, actionable: true };
  return { cta: t('cta.lower'), disabled: true, actionable: false };
}

export default function PricingPage() {
  const { t, i18n } = useTranslation('pricing');
  const { isAuthenticated, showSnackbar, openLoginModal } = useAppContext();
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [subscription, setSubscription] = useState<MySubscription | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<PaidPlanId | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const planDefs = useMemo(() => buildPlanDefs(t), [t]);
  const cycleOptions: { value: BillingCycle; label: string }[] = [
    { value: 'monthly', label: t('cycle.monthly') },
    { value: 'yearly', label: t('cycle.yearly') },
  ];
  // Định dạng ngày theo locale đang xem (vi-VN, en-US...)
  const dateLocale = i18n.resolvedLanguage === 'vi' ? 'vi-VN' : i18n.resolvedLanguage;

  useEffect(() => {
    if (!isAuthenticated) { setSubscription(null); return; }
    fetchMySubscription().then(setSubscription).catch(() => setSubscription(null));
  }, [isAuthenticated]);

  const handleCancelToggle = async () => {
    setCancelLoading(true);
    try {
      const updated = subscription?.cancelAtPeriodEnd
        ? await reactivateSubscription()
        : await cancelSubscription();
      setSubscription(updated);
      showSnackbar(
        updated.cancelAtPeriodEnd ? t('subscription.cancelSuccess') : t('subscription.reactivateSuccess'),
        'success',
      );
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : t('subscription.requestFailed'), 'error');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleUpgrade = async (plan: PaidPlanId) => {
    if (!isAuthenticated) {
      setPostLoginRedirect(ROUTES.PRICING);
      openLoginModal();
      return;
    }
    setCheckoutLoading(plan);
    try {
      const { checkoutUrl } = await createCheckout(plan, cycle);
      window.location.href = checkoutUrl;
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : t('subscription.checkoutFailed'), 'error');
      setCheckoutLoading(null);
    }
  };

  // ── SEO+GEO: JSON-LD Product/Offer khớp đúng 3 gói hiển thị trên trang ─────
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: BRAND_NAME,
    description: t('meta.description'),
    brand: { '@type': 'Brand', name: BRAND_NAME },
    offers: planDefs
      .filter((p): p is PricingPlanDef & { price: NonNullable<PricingPlanDef['price']> } => !!p.price)
      .map(p => ({
        '@type': 'Offer',
        name: p.name,
        description: p.desc,
        price: p.price.monthly,
        priceCurrency: 'VND',
        url: `https://${DOMAIN}${ROUTES.PRICING}`,
        availability: 'https://schema.org/InStock',
      })),
  };

  const trustBadges = [
    { icon: ShieldCheck, label: t('trust.secure') },
    { icon: BadgePercent, label: t('trust.noFees') },
    { icon: XCircle, label: t('trust.cancelAnytime') },
  ];

  return (
    <div className="py-10 px-6 xl:px-10 w-full space-y-8">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <HreflangLinks path={ROUTES.PRICING} />
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
          {t('heading')}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {t('subheading')}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1">
          {trustBadges.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <Icon className="h-3.5 w-3.5 text-emerald-500" />
              {label}
            </li>
          ))}
        </ul>
      </header>

      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-full p-1">
          {cycleOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setCycle(opt.value)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                cycle === opt.value ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {subscription && subscription.plan !== 'free' && subscription.status === 'active' && subscription.currentPeriodEnd && (
        <div className="max-w-2xl mx-auto w-full rounded-2xl border border-gray-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gray-900">
              {planDefs.find(p => p.id === subscription.plan)?.name ?? subscription.plan}
              {' · '}
              {subscription.billingCycle === 'yearly' ? t('cycle.yearlyShort') : t('cycle.monthlyShort')}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {subscription.cancelAtPeriodEnd
                ? t('subscription.cancelScheduled', { date: new Date(subscription.currentPeriodEnd).toLocaleDateString(dateLocale) })
                : t('subscription.activeUntil', { date: new Date(subscription.currentPeriodEnd).toLocaleDateString(dateLocale) })}
            </p>
          </div>
          <button
            disabled={cancelLoading}
            onClick={handleCancelToggle}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              subscription.cancelAtPeriodEnd
                ? 'bg-fnb-orange hover:bg-primary text-white'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-600'
            }`}
          >
            {subscription.cancelAtPeriodEnd ? t('subscription.keepPlan') : t('subscription.cancelPlan')}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {planDefs.map(plan => {
          const { cta, disabled, actionable } = resolveCardState(plan.id, cycle, subscription, t);
          return (
            <PricingCard
              key={plan.id}
              plan={plan}
              cycle={cycle}
              cta={cta}
              disabled={disabled || checkoutLoading !== null}
              loading={checkoutLoading === plan.id}
              onSelect={() => actionable && handleUpgrade(plan.id as PaidPlanId)}
            />
          );
        })}
      </div>

      <section
        aria-labelledby="template-perk-heading"
        className="max-w-4xl mx-auto w-full rounded-3xl bg-gradient-to-r from-fnb-cream to-white border border-outline-variant/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-8"
      >
        <div className="h-14 w-14 shrink-0 rounded-2xl bg-fnb-orange/10 flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-fnb-orange" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 id="template-perk-heading" className="text-base font-display font-bold text-gray-900">
            {t('templatePerk.title')}
          </h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {t('templatePerk.desc')}
          </p>
        </div>
        <Link
          to={ROUTES.MARKETPLACE}
          className="shrink-0 inline-flex items-center gap-1.5 bg-primary hover:bg-fnb-orange text-white text-xs font-bold px-5 py-2.5 rounded-full shadow transition-colors"
        >
          {t('templatePerk.cta')}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </div>
  );
}
