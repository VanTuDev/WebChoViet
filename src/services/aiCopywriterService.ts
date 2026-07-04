import { getApiBaseUrl, getToken } from './authService';

export type CopyFieldType = 'dish_description' | 'slogan' | 'shop_intro' | 'feature_highlight';
export type CopyStyle = 'friendly' | 'humorous' | 'luxury' | 'promotional';

export interface GenerateCopyParams {
  fieldType: CopyFieldType;
  style: CopyStyle;
  shopName: string;
  /** Tên món ăn (dish_description) hoặc tên đặc điểm/tiện ích (feature_highlight) */
  itemName?: string;
  userContext?: string;
}

/**
 * Gọi backend POST /ai-copywriter/generate — Gemini sinh nội dung marketing theo văn
 * phong đã chọn, trả về dạng SSE. `onDelta` được gọi liên tục với từng đoạn text mới
 * nhận được để hiển thị hiệu ứng gõ chữ ở phía gọi (Key Gemini chỉ nằm ở server).
 */
export async function streamGenerateCopy(
  params: GenerateCopyParams,
  onDelta: (textChunk: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const token = getToken();
  const res = await fetch(`${getApiBaseUrl()}/ai-copywriter/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(params),
    signal,
  });

  if (!res.ok || !res.body) {
    const body = await res.json().catch(() => null);
    const msg = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new Error(msg || `Tạo nội dung thất bại (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split('\n\n');
    buffer = events.pop() ?? '';

    for (const event of events) {
      const line = event.trim();
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload) continue;

      let parsed: { text?: string; error?: string; done?: boolean };
      try {
        parsed = JSON.parse(payload);
      } catch {
        continue;
      }
      if (parsed.error) throw new Error(parsed.error);
      if (typeof parsed.text === 'string') onDelta(parsed.text);
      if (parsed.done) return;
    }
  }
}
