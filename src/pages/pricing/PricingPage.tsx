import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingCard, { type PricingPlanDef } from './_components/PricingCard';
import { useAppContext } from '../../store/AppContext';
import { ROUTES } from '../../config/routes';
import { setPostLoginRedirect } from '../../services/authService';
import {
  fetchMySubscription, createCheckout, cancelSubscription, reactivateSubscription,
  type MySubscription, type PaidPlanId, type BillingCycle,
} from '../../services/billingService';

const CYCLE_OPTIONS: { value: BillingCycle; label: string }[] = [
  { value: 'monthly', label: 'Hàng tháng' },
  { value: 'yearly', label: 'Hàng năm (tiết kiệm ~17%)' },
];

const PLAN_DEFS: PricingPlanDef[] = [
  {
    id: 'free',
    name: 'Khởi Nghiệp (Miễn phí)',
    color: '#475569',
    desc: 'Giải pháp hoàn hảo để bắt đầu số hóa thực đơn & quầy bán lẻ nhỏ.',
    features: [
      'Tối đa 2 website đã xuất bản + 2 bản nháp thử nghiệm',
      'Tên miền phụ dạng: .webchoviet.com',
      'Hỗ trợ Mã QR động không giới hạn',
      'Trình quản lý thực đơn kéo thả căn bản',
      'Quảng cáo WebChoViet hiển thị ở góc',
    ],
    price: null,
    popular: false,
  },
  {
    id: 'pro',
    name: 'Kinh Doanh WebPro',
    color: '#0056b3',
    desc: 'Dành cho các chủ quán, chủ thương hiệu bứt tốc doanh số bán hàng.',
    features: [
      'Khởi tạo không giới hạn website',
      'Hỗ trợ gắn Tên Miền Riêng (.vn, .com, .net)',
      'Xóa bỏ hoàn toàn logo & watermark WebChoViet',
      'Phân tích dữ liệu quét sâu theo tuần',
      'Băng thông không giới hạn cực nhanh',
      'SSL trọn đời miễn phí',
      'Hỗ trợ riêng qua Zalo 24/7',
    ],
    price: { monthly: 199_000, yearly: 1_990_000 },
    popular: true,
  },
  {
    id: 'ultra',
    name: 'Thương Hiệu Ultra',
    color: '#1e293b',
    desc: 'Gói cao cấp nhất — dành cho chuỗi cửa hàng và thương hiệu đang mở rộng.',
    features: [
      'Tất cả tính năng của gói WebPro',
      'Phân quyền nhân viên đa Chi Nhánh',
      'Báo cáo thống kê chuyên sâu theo ngày',
      'Ưu tiên xử lý hỗ trợ trong 2 giờ',
      'Đội ngũ chăm sóc vận hành Premium',
    ],
    price: { monthly: 499_000, yearly: 4_990_000 },
    popular: false,
  },
];

const PLAN_RANK: Record<string, number> = { free: 0, pro: 1, ultra: 2 };

function resolveCardState(planId: PricingPlanDef['id'], cycle: BillingCycle, subscription: MySubscription | null) {
  const currentPlan = subscription?.plan ?? 'free';
  const rank = PLAN_RANK[planId];
  const currentRank = PLAN_RANK[currentPlan];

  if (planId === 'free') {
    return currentPlan === 'free'
      ? { cta: 'Đang sử dụng', disabled: true, actionable: false }
      : { cta: 'Gói thấp hơn', disabled: true, actionable: false };
  }

  if (planId === currentPlan) {
    if (subscription?.billingCycle === cycle) {
      return { cta: 'Gói hiện tại', disabled: true, actionable: false };
    }
    return { cta: 'Đổi chu kỳ thanh toán', disabled: false, actionable: true };
  }

  if (rank > currentRank) return { cta: 'Nâng cấp ngay', disabled: false, actionable: true };
  return { cta: 'Gói thấp hơn', disabled: true, actionable: false };
}

export default function PricingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, showSnackbar, openLoginModal } = useAppContext();
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [subscription, setSubscription] = useState<MySubscription | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<PaidPlanId | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

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
        updated.cancelAtPeriodEnd ? 'Đã xác nhận không gia hạn.' : 'Đã khôi phục — gói tiếp tục như bình thường.',
        'success',
      );
    } catch (err) {
      showSnackbar(err instanceof Error ? err.message : 'Không thực hiện được yêu cầu.', 'error');
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
      showSnackbar(err instanceof Error ? err.message : 'Không tạo được đơn thanh toán. Vui lòng thử lại.', 'error');
      setCheckoutLoading(null);
    }
  };

  return (
    <div className="py-10 px-6 xl:px-10 w-full space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
          Bảng Giá Dịch Vụ WebChoViet
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Không phát sinh chi phí ẩn. Thanh toán an toàn qua PayOS (chuyển khoản ngân hàng/VietQR).
        </p>
      </div>

      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-full p-1">
          {CYCLE_OPTIONS.map(opt => (
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
              {PLAN_DEFS.find(p => p.id === subscription.plan)?.name ?? subscription.plan}
              {' · '}
              {subscription.billingCycle === 'yearly' ? 'Hàng năm' : 'Hàng tháng'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {subscription.cancelAtPeriodEnd
                ? `Đã xác nhận không gia hạn — gói sẽ chuyển về Free vào ${new Date(subscription.currentPeriodEnd).toLocaleDateString('vi-VN')}.`
                : `Gói đang hoạt động tới ${new Date(subscription.currentPeriodEnd).toLocaleDateString('vi-VN')}. Sau ngày này cần thanh toán lại để tiếp tục dùng.`}
            </p>
          </div>
          <button
            disabled={cancelLoading}
            onClick={handleCancelToggle}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              subscription.cancelAtPeriodEnd
                ? 'bg-[#00aaff] hover:bg-[#003f87] text-white'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-600'
            }`}
          >
            {subscription.cancelAtPeriodEnd ? 'Vẫn muốn tiếp tục' : 'Hủy gói'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {PLAN_DEFS.map(plan => {
          const { cta, disabled, actionable } = resolveCardState(plan.id, cycle, subscription);
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
