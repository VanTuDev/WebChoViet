// Template billing service — gọi các endpoint /templates/* của backend, song song hoàn toàn
// với billingService.ts (subscription). Xem BackEnd-WebChoViet/src/templates.
import { apiFetch } from './apiClient';

export type UserPlan = 'free' | 'pro' | 'ultra';

export interface TemplateAccessInfo {
  /** Giá gốc — áp dụng cho gói Free (và Pro/Ultra nếu không có override riêng bên dưới). */
  price: number;
  /** Giá riêng cho gói Pro — null = dùng `price`. 0 = miễn phí khi có gói Pro. */
  proPrice: number | null;
  /** Giá riêng cho gói Ultra — null = dùng `proPrice` rồi tới `price`. 0 = miễn phí khi có gói Ultra. */
  ultraPrice: number | null;
}

interface TemplateCheckoutResult {
  checkoutUrl: string;
  orderCode: number;
}

export type TemplatePurchaseStatus = 'pending' | 'success' | 'failed';

export interface TemplateCheckoutStatus {
  orderCode: number;
  status: TemplatePurchaseStatus;
  templateId: string;
  siteId: string;
  amount: number;
  note?: string;
}

/** Override giá/gói admin đã set cho từng template — key là templateId. Template chưa có trong
 * response nghĩa là admin chưa đụng vào, FE tự fallback về giá tĩnh trong registry. */
export function fetchTemplatePrices(): Promise<Record<string, TemplateAccessInfo>> {
  return apiFetch<Record<string, TemplateAccessInfo>>('/templates/prices');
}

export function createTemplateCheckout(
  templateId: string,
  siteId: string,
  staticFallbackPrice: number,
): Promise<TemplateCheckoutResult> {
  return apiFetch<TemplateCheckoutResult>(`/templates/${templateId}/checkout`, {
    method: 'POST',
    data: { siteId, staticFallbackPrice },
  });
}

export function fetchTemplateCheckoutStatus(orderCode: number): Promise<TemplateCheckoutStatus> {
  return apiFetch<TemplateCheckoutStatus>(`/templates/checkout/${orderCode}`);
}
