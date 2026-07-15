import { useEffect, useState } from 'react';
import { fetchTemplatePrices, type TemplateAccessInfo, type UserPlan } from '../services/templateBillingService';

export interface EffectiveTemplateAccess {
  /** Giá áp dụng cho gói hiện tại của user xem trang (đã tính override Pro/Ultra nếu có). */
  price: number;
  /** Giá gốc (gói Free) — dùng để hiển thị giá gạch ngang khi đang được giảm giá. */
  basePrice: number;
  /** true nếu price < basePrice nhờ gói hiện tại của user. */
  isDiscounted: boolean;
  /** Gói cao hơn (user chưa có) mà nếu nâng cấp sẽ được giá tốt hơn giá hiện tại — null nếu không có ưu đãi thêm. */
  upsellPlan: 'pro' | 'ultra' | null;
  upsellPrice: number | null;
}

// Cache module-level — nhiều component (Marketplace, TemplatePreview, PublishModal) cùng cần
// giá template nhưng chỉ nên gọi /templates/prices 1 lần mỗi phiên, không phải 1 lần/component.
let cache: Record<string, TemplateAccessInfo> | null = null;
let inflight: Promise<Record<string, TemplateAccessInfo>> | null = null;

function loadPrices(): Promise<Record<string, TemplateAccessInfo>> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetchTemplatePrices()
      .then(data => { cache = data; return data; })
      .catch(() => ({}))
      .finally(() => { inflight = null; });
  }
  return inflight;
}

/** Giá hiệu lực cho 1 gói cụ thể — khớp đúng logic `resolveEffectivePrice` phía backend. */
function priceForPlan(access: TemplateAccessInfo | undefined, basePrice: number, plan: UserPlan): number {
  if (!access) return basePrice;
  if (plan === 'ultra') return access.ultraPrice ?? access.proPrice ?? access.price;
  if (plan === 'pro') return access.proPrice ?? access.price;
  return access.price;
}

/**
 * Điều kiện truy cập hiệu lực cho 1 template: override do admin set (nếu có) qua
 * AdminTemplatesPage, else mặc định giá tĩnh từ FE registry. Không có khái niệm khóa cứng
 * theo gói — mọi user dùng được mọi template, chỉ khác giá (Pro/Ultra có thể được giảm giá
 * hoặc miễn phí do admin cấu hình riêng cho từng mẫu).
 */
export function useTemplateAccess() {
  const [overrides, setOverrides] = useState<Record<string, TemplateAccessInfo>>(cache ?? {});

  useEffect(() => {
    let cancelled = false;
    loadPrices().then(data => { if (!cancelled) setOverrides(data); });
    return () => { cancelled = true; };
  }, []);

  function getEffectiveAccess(templateId: string, staticPrice: number, userPlan: UserPlan = 'free'): EffectiveTemplateAccess {
    const access = overrides[templateId];
    const basePrice = access?.price ?? staticPrice;
    const price = priceForPlan(access, staticPrice, userPlan);

    let upsellPlan: 'pro' | 'ultra' | null = null;
    let upsellPrice: number | null = null;
    if (access && userPlan !== 'ultra') {
      if (userPlan === 'free') {
        const proCandidate = access.proPrice ?? basePrice;
        const ultraCandidate = access.ultraPrice ?? access.proPrice ?? basePrice;
        if (proCandidate < price) { upsellPlan = 'pro'; upsellPrice = proCandidate; }
        else if (ultraCandidate < price) { upsellPlan = 'ultra'; upsellPrice = ultraCandidate; }
      } else if (userPlan === 'pro') {
        const ultraCandidate = access.ultraPrice ?? access.proPrice ?? basePrice;
        if (ultraCandidate < price) { upsellPlan = 'ultra'; upsellPrice = ultraCandidate; }
      }
    }

    return { price, basePrice, isDiscounted: price < basePrice, upsellPlan, upsellPrice };
  }

  return { getEffectiveAccess };
}
