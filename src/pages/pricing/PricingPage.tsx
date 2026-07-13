import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import PricingCard, { type PricingPlanDef } from './_components/PricingCard';
import { useAppContext } from '../../store/AppContext';
import { ROUTES } from '../../config/routes';
import { setPostLoginRedirect } from '../../services/authService';
import HreflangLinks from '../../i18n/HreflangLinks';
import {
  fetchMySubscription, createCheckout, cancelSubscription, reactivateSubscription,
  type MySubscription, type PaidPlanId, type BillingCycle,
} from '../../services/billingService';

// Giá niêm yết — phần KHÔNG dịch; nguồn sự thật amount ở BE src/billing/plan-pricing.ts,
// sửa giá phải sửa cả 2 nơi. Nội dung text (name/desc/features) lấy từ i18n namespace pricing.
const PLAN_STATIC = [
  { id: 'free',  color: '#475569', price: null,                                       popular: false },
  { id: 'pro',   color: '#ff6b2c', price: { monthly: 199_000, yearly: 1_990_000 },    popular: true },
  { id: 'ultra', color: '#1e293b', price: { monthly: 499_000, yearly: 4_990_000 },    popular: false },
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

  return (
    <div className="py-10 px-6 xl:px-10 w-full space-y-8">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      <HreflangLinks path={ROUTES.PRICING} />
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
          {t('heading')}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {t('subheading')}
        </p>
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
    </div>
  );
}
