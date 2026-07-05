import { apiFetch } from './apiClient';

export type TranslatableLang = 'en' | 'zh' | 'ko';

/**
 * Gọi backend POST /translate — Gemini dịch customData tiếng Việt sang các ngôn ngữ
 * đích. Key Gemini chỉ nằm ở server (xem BackEnd-WebChoViet/src/translate).
 */
export async function translateCustomData(
  data: Record<string, unknown>,
  targetLangs: TranslatableLang[],
): Promise<Record<TranslatableLang, Record<string, unknown>>> {
  return apiFetch<Record<TranslatableLang, Record<string, unknown>>>(
    '/translate',
    { method: 'POST', data: { data, targetLangs } },
    'Dịch thất bại.',
  );
}
