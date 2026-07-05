import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { getApiBaseUrl, getToken } from './authService';

/** Response envelope chuẩn từ backend NestJS: { success, data, message? } (xem ResponseInterceptor + AllExceptionsFilter phía BE) */
interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string | string[];
}

/**
 * axios instance dùng chung cho mọi service — baseURL/token gắn ĐỘNG qua interceptor
 * (không cố định lúc khởi tạo axios.create) vì cả 2 có thể đổi giữa phiên làm việc
 * (URL ngrok đổi mỗi lần chạy lại, token cập nhật ngay sau khi đăng nhập).
 */
const client = axios.create({
  headers: { 'ngrok-skip-browser-warning': 'true' },
});

client.interceptors.request.use(config => {
  config.baseURL = getApiBaseUrl();
  const token = getToken();
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

function extractMessage(body: unknown): string | undefined {
  const msg = (body as ApiEnvelope<unknown> | undefined)?.message;
  return Array.isArray(msg) ? msg.join(', ') : msg;
}

/**
 * Gọi backend + tự bóc `data` khỏi envelope chuẩn — trước đây gần như mỗi service
 * tự lặp lại y hệt đoạn gắn header JWT/ngrok, parse JSON, check `success`, throw
 * Error. axios lo phần lớn việc này miễn phí: tự throw cho status không phải 2xx,
 * tự JSON.stringify/parse, tự set đúng Content-Type cho cả JSON lẫn FormData
 * (multipart, xem uploadService) — chỉ cần chuẩn hoá lỗi về 1 Error dễ hiểu.
 */
export async function apiFetch<T>(path: string, config?: AxiosRequestConfig, fallbackMessage?: string): Promise<T> {
  try {
    const res = await client.request<ApiEnvelope<T>>({ url: path, ...config });
    if (!res.data?.success) {
      throw new Error(extractMessage(res.data) || fallbackMessage || `API lỗi: ${path}`);
    }
    return res.data.data as T;
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.response?.status;
      throw new Error(extractMessage(err.response?.data) || fallbackMessage || `API ${status ?? ''}: ${path}`.trim());
    }
    throw err;
  }
}
