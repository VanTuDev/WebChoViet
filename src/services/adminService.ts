// Admin service — gọi các endpoint /admin/* của backend (JWT + role admin bắt buộc,
// xem BackEnd-WebChoViet/src/admin). Response backend đã bọc chuẩn { success, data }.
import { getApiBaseUrl, getToken } from './authService';

// ── Types — khớp AdminService backend (admin.service.ts) ───────────────────────

export interface AdminStats {
  totalUsers: number;
  newUsersLast7Days: number;
  totalSites: number;
  publishedSites: number;
  viewsLast30Days: number;
  clicksLast30Days: number;
  revenue: {
    last30Days: number;
    allTime: number;
    activeSubscriptions: number;
    pendingPayments: number;
  };
}

export interface AdminUserListItem {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'ultra';
  role: 'user' | 'admin';
  isSuspended: boolean;
  siteCount: number;
  createdAt: string;
}

export interface AdminUserList {
  items: AdminUserListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface ListUsersParams {
  search?: string;
  plan?: 'free' | 'pro' | 'ultra';
  page?: number;
  limit?: number;
}

export interface PlatformDaily {
  date: string;
  views: number;
  clicks: number;
  leaves: number;
  sessions: number;
}

export interface PlatformAnalytics {
  days: number;
  daily: PlatformDaily[];
  totals: { views: number; clicks: number; uniqueVisitors: number; bounceRate: number };
  topSites: { slug: string; views: number }[];
  deviceBreakdown: { mobile: number; tablet: number; desktop: number };
  userGrowth: { date: string; count: number }[];
  planDistribution: { free: number; pro: number; ultra: number };
  dailyRevenue: { date: string; amount: number }[];
  conversionFunnel: { registered: number; withSite: number; publishedSite: number; paying: number };
}

// ── API helper ──────────────────────────────────────────────────────────────────

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

// ── Public service API ──────────────────────────────────────────────────────────

export function fetchAdminStats(): Promise<AdminStats> {
  return api<AdminStats>('/admin/stats');
}

export function fetchAdminUsers(params: ListUsersParams = {}): Promise<AdminUserList> {
  const q = new URLSearchParams();
  if (params.search) q.set('search', params.search);
  if (params.plan) q.set('plan', params.plan);
  if (params.page) q.set('page', String(params.page));
  if (params.limit) q.set('limit', String(params.limit));
  const qs = q.toString();
  return api<AdminUserList>(`/admin/users${qs ? `?${qs}` : ''}`);
}

export function toggleSuspendUser(userId: string): Promise<{ id: string; isSuspended: boolean }> {
  return api(`/admin/users/${userId}/toggle-suspend`, { method: 'PATCH' });
}

export function fetchPlatformAnalytics(
  range: number | { fromDate: string; toDate: string },
): Promise<PlatformAnalytics> {
  const qs = typeof range === 'number'
    ? `days=${range}`
    : `fromDate=${range.fromDate}&toDate=${range.toDate}`;
  return api<PlatformAnalytics>(`/admin/analytics?${qs}`);
}

// ── Sites management ────────────────────────────────────────────────────────────

export interface AdminSiteListItem {
  id: string;
  slug: string;
  name: string;
  templateId: string;
  status: 'draft' | 'published';
  isPending: boolean;
  planLocked: boolean;
  ownerName: string;
  ownerEmail: string;
  ownerAvatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSiteList {
  items: AdminSiteListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface ListSitesParams {
  search?: string;
  status?: 'draft' | 'published';
  page?: number;
  limit?: number;
}

export function fetchAdminSites(params: ListSitesParams = {}): Promise<AdminSiteList> {
  const q = new URLSearchParams();
  if (params.search) q.set('search', params.search);
  if (params.status) q.set('status', params.status);
  if (params.page) q.set('page', String(params.page));
  if (params.limit) q.set('limit', String(params.limit));
  const qs = q.toString();
  return api<AdminSiteList>(`/admin/sites${qs ? `?${qs}` : ''}`);
}

export function toggleSitePending(siteId: string): Promise<{ id: string; isPending: boolean }> {
  return api(`/admin/sites/${siteId}/toggle-pending`, { method: 'PATCH' });
}

export function deleteSite(siteId: string): Promise<{ message: string }> {
  return api(`/admin/sites/${siteId}`, { method: 'DELETE' });
}

// ── Payments (real data — thay cho mock TRANSACTIONS trước đây) ────────────────

export interface AdminPaymentListItem {
  id: string;
  orderCode: number;
  plan: 'pro' | 'ultra';
  billingCycle: 'monthly' | 'yearly';
  amount: number;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  paidAt: string | null;
  createdAt: string;
  note?: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
}

export interface AdminPaymentTotals {
  successAmount: number;
  pendingAmount: number;
  failedCount: number;
  refundedAmount: number;
}

export interface AdminPaymentList {
  items: AdminPaymentListItem[];
  total: number;
  page: number;
  limit: number;
  totals: AdminPaymentTotals;
}

export interface ListPaymentsParams {
  search?: string;
  status?: 'pending' | 'success' | 'failed' | 'refunded';
  page?: number;
  limit?: number;
}

export function fetchAdminPayments(params: ListPaymentsParams = {}): Promise<AdminPaymentList> {
  const q = new URLSearchParams();
  if (params.search) q.set('search', params.search);
  if (params.status) q.set('status', params.status);
  if (params.page) q.set('page', String(params.page));
  if (params.limit) q.set('limit', String(params.limit));
  const qs = q.toString();
  return api<AdminPaymentList>(`/admin/payments${qs ? `?${qs}` : ''}`);
}
