// ─── Token/API-config primitives ────────────────────────────────────────────
// Tách riêng khỏi authService.ts vì apiClient.ts (axios instance dùng chung)
// cần đọc token/base URL trong request interceptor — nếu để chung 1 file với
// authService (nơi gọi apiFetch từ apiClient.ts) sẽ tạo import vòng
// apiClient → authService → apiClient.

const TOKEN_KEY = 'wcv_token';

export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/v1';
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
