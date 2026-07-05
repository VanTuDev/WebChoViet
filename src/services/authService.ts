// Auth service — gọi thẳng NestJS backend thật (không qua Express mock của Vite dev server).
// Base URL cấu hình qua VITE_API_URL — trỏ tới localhost:3001/api/v1 khi dev local,
// hoặc URL ngrok public khi backend được tunnel (xem BackEnd-WebChoViet/.env.example).

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'ultra';
  role: 'user' | 'admin';
}

const TOKEN_KEY = 'wcv_token';
const POST_LOGIN_REDIRECT_KEY = 'wcv_post_login_redirect';

export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/v1';
}

export function getGoogleLoginUrl(): string {
  return `${getApiBaseUrl()}/auth/google`;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
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
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Bỏ qua trang cảnh báo interstitial của ngrok free plan khi gọi qua tunnel
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (!res.ok) {
      if (res.status === 401) clearToken();
      return null;
    }

    const body = await res.json();
    return body.data as AuthUser;
  } catch (err) {
    console.error('fetchMe() thất bại:', err);
    return null;
  }
}

/** Logout — báo backend (best-effort) rồi xoá token phía client. */
export async function logoutRequest(): Promise<void> {
  const token = getToken();
  clearToken();
  if (!token) return;
  try {
    await fetch(`${getApiBaseUrl()}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });
  } catch {
    // Logout phía client vẫn coi là thành công dù request thất bại
  }
}
