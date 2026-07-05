// Billing service — gọi các endpoint /billing/* của backend (JWT bắt buộc, xem
// BackEnd-WebChoViet/src/billing). Response backend đã bọc chuẩn { success, data }.
import { apiFetch } from './apiClient';

export type PaidPlanId = 'pro' | 'ultra';
export type BillingCycle = 'monthly' | 'yearly';
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export interface MySubscription {
  plan: 'free' | PaidPlanId;
  billingCycle: BillingCycle | null;
  status: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentRecord {
  _id: string;
  plan: PaidPlanId;
  billingCycle: BillingCycle;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  orderCode: number;
  providerTransactionId?: string;
  paidAt?: string;
  note?: string;
  createdAt: string;
}

export interface CheckoutResult {
  checkoutUrl: string;
  orderCode: number;
}

export interface CheckoutStatus {
  orderCode: number;
  status: PaymentStatus;
  plan: PaidPlanId;
  billingCycle: BillingCycle;
  amount: number;
  note?: string;
}

export function fetchMySubscription(): Promise<MySubscription> {
  return apiFetch<MySubscription>('/billing/me');
}

export function fetchMyPayments(): Promise<PaymentRecord[]> {
  return apiFetch<PaymentRecord[]>('/billing/me/payments');
}

export function createCheckout(plan: PaidPlanId, billingCycle: BillingCycle): Promise<CheckoutResult> {
  return apiFetch<CheckoutResult>('/billing/checkout', {
    method: 'POST',
    data: { plan, billingCycle },
  });
}

export function fetchCheckoutStatus(orderCode: number): Promise<CheckoutStatus> {
  return apiFetch<CheckoutStatus>(`/billing/checkout/${orderCode}`);
}

/** Hủy tự động gia hạn — vẫn dùng gói tới hết kỳ đã trả. */
export function cancelSubscription(): Promise<MySubscription> {
  return apiFetch<MySubscription>('/billing/cancel', { method: 'PATCH' });
}

/** Khôi phục gia hạn trước khi hết kỳ — hủy thao tác cancelSubscription trước đó. */
export function reactivateSubscription(): Promise<MySubscription> {
  return apiFetch<MySubscription>('/billing/reactivate', { method: 'PATCH' });
}
