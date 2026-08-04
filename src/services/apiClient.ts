import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { getApiBaseUrl, getToken } from './authToken';

/** Response envelope chuẩn từ backend NestJS: { success, data, message? } (xem ResponseInterceptor + AllExceptionsFilter phía BE) */
interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string | string[];
}

/**
 * Error chuẩn cho mọi lỗi API — giữ lại `status` (HTTP status code) thay vì chỉ có `message`
 * như Error thường, để nơi gọi cần phân biệt loại lỗi (vd 401 hết hạn token vs lỗi mạng) không
 * phải tự parse lại. Vẫn `extends Error` nên mọi chỗ đang bắt `Error`/đọc `.message` không đổi.
 */
export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
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
 * Gọi backend + tự bóc `data` khỏi envelope chuẩn. axios lo phần lớn việc này
 * miễn phí: tự throw cho status không phải 2xx, tự JSON.stringify/parse, tự
 * set đúng Content-Type cho cả JSON lẫn FormData (multipart, xem uploadService)
 * — chỉ cần chuẩn hoá lỗi về 1 Error dễ hiểu.
 */
export async function apiFetch<T>(path: string, config?: AxiosRequestConfig, fallbackMessage?: string): Promise<T> {
  try {
    const res = await client.request<ApiEnvelope<T>>({ url: path, ...config });
    if (!res.data?.success) {
      throw new ApiError(extractMessage(res.data) || fallbackMessage || `API lỗi: ${path}`, res.status);
    }
    return res.data.data as T;
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.response?.status;
      throw new ApiError(extractMessage(err.response?.data) || fallbackMessage || `API ${status ?? ''}: ${path}`.trim(), status);
    }
    throw err;
  }
}
