import { useNavigate } from 'react-router-dom';
import { Crown, BadgeCheck, ArrowUpRight } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import type { UserPlan } from '../shared/PlanBadge';

interface Props {
  /** null = chưa đăng nhập — coi như free, hiển thị CTA nâng cấp */
  plan: UserPlan | null;
}

/**
 * Card trạng thái gói ở sidebar — DUY NHẤT 1 component dùng chung cho cả Marketplace lẫn
 * Dashboard sidebar, phản ánh đúng `user.plan` thật thay vì text tĩnh "Gói WebPro Đang Mở"
 * hiển thị cố định bất kể user đang dùng gói gì.
 */
export default function SidebarPlanCard({ plan }: Props) {
  const navigate = useNavigate();
  const effectivePlan = plan ?? 'free';

  if (effectivePlan === 'ultra') {
    return (
      <div className="bg-violet-950 text-white rounded-2xl p-5 shadow-sm text-center space-y-2 mt-8 relative overflow-hidden">
        <div className="absolute -right-2.5 -top-2.5 opacity-10">
          <Crown className="h-20 w-20" />
        </div>
        <div className="flex items-center justify-center gap-1.5 text-sm font-bold">
          <Crown className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          <span>Gói Ultra đang hoạt động</span>
        </div>
        <p className="text-xs text-violet-200 leading-relaxed">
          Bạn đang dùng gói cao cấp nhất của WebChoViet. Cảm ơn bạn đã đồng hành!
        </p>
      </div>
    );
  }

  if (effectivePlan === 'pro') {
    return (
      <div className="bg-[#003f87] text-white rounded-2xl p-5 shadow-sm text-center space-y-3 mt-8 relative overflow-hidden">
        <div className="absolute -right-2.5 -top-2.5 opacity-10">
          <BadgeCheck className="h-20 w-20" />
        </div>
        <div className="flex items-center justify-center gap-1.5 text-sm font-bold">
          <BadgeCheck className="h-4 w-4 text-emerald-300" />
          <span>Gói Pro đang hoạt động</span>
        </div>
        <p className="text-xs text-[#bbd0ff] leading-relaxed">
          Muốn thêm đặc quyền cao cấp hơn nữa? Khám phá gói Ultra.
        </p>
        <button
          onClick={() => navigate(ROUTES.PRICING)}
          className="w-full py-2 bg-white text-[#003f87] hover:bg-gray-50 transition-colors rounded-full text-xs font-bold cursor-pointer shadow active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span>Xem gói Ultra</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  // free hoặc chưa đăng nhập
  return (
    <div className="bg-[#003f87] text-white rounded-2xl p-5 shadow-sm text-center space-y-3 mt-8 relative overflow-hidden">
      <div className="absolute -right-2.5 -top-2.5 opacity-10">
        <BadgeCheck className="h-20 w-20" />
      </div>
      <div className="text-sm font-bold">Nâng cấp gói WebPro</div>
      <p className="text-xs text-[#bbd0ff] leading-relaxed">
        Mở khóa miền riêng biệt (.vn, .com) & loại bỏ hoàn toàn logo WebChoViet.
      </p>
      <button
        onClick={() => navigate(ROUTES.PRICING)}
        className="w-full py-2 bg-white text-[#003f87] hover:bg-gray-50 transition-colors rounded-full text-xs font-bold cursor-pointer shadow active:scale-95"
      >
        Đăng ký gói Pro
      </button>
    </div>
  );
}
