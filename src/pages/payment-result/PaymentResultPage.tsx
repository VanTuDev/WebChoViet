// PayOS redirect về đây sau khi thanh toán (cả returnUrl lẫn cancelUrl trỏ cùng 1 trang này) —
// trang tự hỏi backend (GET /billing/checkout/:orderCode) để lấy trạng thái đã đối soát thật,
// KHÔNG tin trực tiếp query string PayOS gắn vào URL (dễ giả mạo từ phía trình duyệt).
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, Clock } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { useAppContext } from '../../store/AppContext';
import { fetchCheckoutStatus, type CheckoutStatus } from '../../services/billingService';

const PLAN_LABEL: Record<string, string> = { pro: 'Kinh Doanh WebPro', ultra: 'Thương Hiệu Ultra' };
const CYCLE_LABEL: Record<string, string> = { monthly: 'tháng', yearly: 'năm' };

const POLL_ATTEMPTS = 5;
const POLL_INTERVAL_MS = 1500;

export default function PaymentResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshUser } = useAppContext();
  const [status, setStatus] = useState<CheckoutStatus | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const orderCodeParam = searchParams.get('orderCode');
  const orderCode = orderCodeParam ? Number(orderCodeParam) : NaN;

  useEffect(() => {
    if (!orderCodeParam || Number.isNaN(orderCode)) {
      setError('Thiếu mã đơn hàng.');
      setLoading(false);
      return;
    }

    let cancelled = false;

    const poll = async (attempt: number) => {
      try {
        const result = await fetchCheckoutStatus(orderCode);
        if (cancelled) return;
        setStatus(result);

        if (result.status === 'pending' && attempt < POLL_ATTEMPTS) {
          setTimeout(() => poll(attempt + 1), POLL_INTERVAL_MS);
          return;
        }
        if (result.status === 'success') await refreshUser();
        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Không kiểm tra được trạng thái đơn hàng.');
        setLoading(false);
      }
    };

    poll(0);
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCode, orderCodeParam]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 px-6">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm space-y-5">
        {loading ? (
          <>
            <Loader2 className="h-10 w-10 animate-spin text-[#00aaff] mx-auto" />
            <p className="text-sm text-gray-500">Đang xác nhận thanh toán...</p>
          </>
        ) : error ? (
          <>
            <XCircle className="h-12 w-12 text-rose-500 mx-auto" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Không thể kiểm tra đơn hàng</h1>
              <p className="text-sm text-gray-500 mt-1.5">{error}</p>
            </div>
          </>
        ) : status?.status === 'success' ? (
          <>
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Thanh toán thành công</h1>
              <p className="text-sm text-gray-500 mt-1.5">
                Đã nâng cấp lên {PLAN_LABEL[status.plan] ?? status.plan} ({CYCLE_LABEL[status.billingCycle] ?? status.billingCycle}).
              </p>
            </div>
          </>
        ) : status?.status === 'pending' ? (
          <>
            <Clock className="h-12 w-12 text-amber-500 mx-auto" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Đang chờ xác nhận</h1>
              <p className="text-sm text-gray-500 mt-1.5">
                Giao dịch đang được xử lý. Nếu đã chuyển khoản thành công, gói sẽ được kích hoạt trong ít phút.
              </p>
            </div>
          </>
        ) : (
          <>
            <XCircle className="h-12 w-12 text-rose-500 mx-auto" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Thanh toán không thành công</h1>
              <p className="text-sm text-gray-500 mt-1.5">{status?.note || 'Đơn hàng đã bị hủy hoặc hết hạn.'}</p>
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate(ROUTES.PRICING)}
            className="flex-1 py-3 rounded-full text-xs font-bold bg-gray-100 hover:bg-gray-200/80 text-gray-700 transition-colors cursor-pointer"
          >
            Bảng giá
          </button>
          <button
            onClick={() => navigate(ROUTES.DASHBOARD_PROJECTS)}
            className="flex-1 py-3 rounded-full text-xs font-bold bg-[#00aaff] hover:bg-[#003f87] text-white transition-colors cursor-pointer"
          >
            Vào Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
