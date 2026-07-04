// Billing service — gọi các endpoint /billing/* của backend (JWT bắt buộc, xem
// BackEnd-WebChoViet/src/billing). Response backend đã bọc chuẩn { success, data }.
import { getApiBaseUrl, getToken } from './authService';

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

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      Authorization: `Bearer ${getToken() ?? ''}`,
      ...init?.headers,
    },
  });

  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.success) {
    const msg = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new Error(msg || `API ${res.status}: ${path}`);
  }
  return body.data as T;
}

export function fetchMySubscription(): Promise<MySubscription> {
  return api<MySubscription>('/billing/me');
}

export function fetchMyPayments(): Promise<PaymentRecord[]> {
  return api<PaymentRecord[]>('/billing/me/payments');
}

export function createCheckout(plan: PaidPlanId, billingCycle: BillingCycle): Promise<CheckoutResult> {
  return api<CheckoutResult>('/billing/checkout', {
    method: 'POST',
    body: JSON.stringify({ plan, billingCycle }),
  });
}

export function fetchCheckoutStatus(orderCode: number): Promise<CheckoutStatus> {
  return api<CheckoutStatus>(`/billing/checkout/${orderCode}`);
}

/** Hủy tự động gia hạn — vẫn dùng gói tới hết kỳ đã trả. */
export function cancelSubscription(): Promise<MySubscription> {
  return api<MySubscription>('/billing/cancel', { method: 'PATCH' });
}

/** Khôi phục gia hạn trước khi hết kỳ — hủy thao tác cancelSubscription trước đó. */
export function reactivateSubscription(): Promise<MySubscription> {
  return api<MySubscription>('/billing/reactivate', { method: 'PATCH' });
}
