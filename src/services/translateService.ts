import { getApiBaseUrl, getToken } from './authService';

export type TranslatableLang = 'en' | 'zh' | 'ko';

/**
 * Gọi backend POST /translate — Gemini dịch customData tiếng Việt sang các ngôn ngữ
 * đích. Key Gemini chỉ nằm ở server (xem BackEnd-WebChoViet/src/translate).
 */
export async function translateCustomData(
  data: Record<string, unknown>,
  targetLangs: TranslatableLang[],
): Promise<Record<TranslatableLang, Record<string, unknown>>> {
  const token = getToken();
  const res = await fetch(`${getApiBaseUrl()}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ data, targetLangs }),
  });

  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.success) {
    const msg = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new Error(msg || `Dịch thất bại (${res.status})`);
  }
  return body.data;
}
