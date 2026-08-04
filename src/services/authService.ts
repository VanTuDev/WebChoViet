// Auth service — gọi thẳng NestJS backend thật (không qua Express mock của Vite dev server).
// Base URL cấu hình qua VITE_API_URL — trỏ tới localhost:3001/api/v1 khi dev local,
// hoặc URL ngrok public khi backend được tunnel (xem BackEnd-WebChoViet/.env.example).
import { ApiError, apiFetch } from './apiClient';
import { getApiBaseUrl, getToken, clearToken } from './authToken';

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'ultra';
  role: 'user' | 'admin';
}

const POST_LOGIN_REDIRECT_KEY = 'wcv_post_login_redirect';

export function getGoogleLoginUrl(): string {
  return `${getApiBaseUrl()}/auth/google`;
}

/**
 * OAuth callback luôn đổ về /auth/callback rồi mặc định đi tới Marketplace.
 * Trang nào cần user quay lại đúng chỗ sau khi đăng nhập (vd /admin/login)
 * thì set đích đến trước khi redirect sang Google.
 */
export function setPostLoginRedirect(path: string): void {
  sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, path);
}

/** Lấy rồi xóa đích redirect (one-shot) — trả null nếu không có */
export function consumePostLoginRedirect(): string | null {
  const path = sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY);
  if (path) sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
  return path;
}

/**
 * Lấy profile user đang đăng nhập từ token hiện có. Trả về null nếu chưa đăng
 * nhập/token hết hạn — VÀ CẢ khi lỗi mạng (offline, DNS fail...), để giữ đúng
 * hợp đồng "trả null khi thất bại" mà mọi nơi gọi hàm này đang giả định. Trước
 * đây không try/catch: lỗi mạng làm hàm throw thay vì trả null, biến thành
 * unhandled rejection ở các nơi gọi không có .catch() (vd lúc app khởi động).
 */
export async function fetchMe(): Promise<AuthUser | null> {
  if (!getToken()) return null;

  try {
    return await apiFetch<AuthUser>('/auth/me');
  } catch (err) {
    // ApiError giữ status HTTP — chỉ 401 (token hết hạn/không hợp lệ) mới xoá token,
    // lỗi mạng/5xx thì giữ nguyên token, có thể vẫn còn hợp lệ khi mạng ổn lại.
    if (err instanceof ApiError && err.status === 401) {
      clearToken();
    } else {
      console.error('fetchMe() thất bại:', err);
    }
    return null;
  }
}

/** Logout — báo backend (best-effort) rồi xoá token phía client. */
export async function logoutRequest(): Promise<void> {
  const token = getToken();
  clearToken();
  if (!token) return;
  try {
    // Gắn thẳng token vừa xoá vào header — interceptor của apiClient đọc getToken() lúc
    // request chạy, mà token đã bị clearToken() ở trên nên tự nó sẽ không gắn được nữa.
    await apiFetch('/auth/logout', { headers: { Authorization: `Bearer ${token}` } });
  } catch {
    // Logout phía client vẫn coi là thành công dù request thất bại
  }
}
