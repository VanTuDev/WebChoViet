import { getApiBaseUrl, getToken } from './authService';

export interface AiChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiChatResult {
  reply: string;
  updates: Record<string, unknown>;
}

const MAX_HISTORY_TURNS = 10;

/**
 * Trợ lý nội dung AI — prompt được dựng NGAY TRÊN FE (nhúng schema/nội dung hiện
 * tại/lịch sử hội thoại) rồi gửi qua backend POST /ai-proxy/generate, một proxy
 * Gemini CHUNG dùng lại được cho mọi tính năng AI khác — không cần thêm code
 * backend cho tính năng AI mới. Key Gemini vẫn chỉ nằm ở server (xem
 * BackEnd-WebChoViet/src/ai-proxy) — FE không bao giờ cầm key thật.
 */
function buildPrompt(params: {
  shopName: string;
  schema: Record<string, unknown>;
  currentData: Record<string, unknown>;
  message: string;
  history: AiChatTurn[];
}): string {
  const history = params.history
    .slice(-MAX_HISTORY_TURNS)
    .map(h => `${h.role === 'user' ? 'Chủ quán' : 'Trợ lý'}: ${h.content}`)
    .join('\n');

  return `Bạn là trợ lý AI giúp chủ quán "${params.shopName}" chỉnh sửa nội dung website của họ bằng cách trò chuyện.

Cấu trúc dữ liệu website (schema — CHỈ dùng để biết những field/key nào tồn tại và đúng kiểu dữ liệu,
TUYỆT ĐỐI không đổi tên key hay thêm key lạ không có trong schema này):
${JSON.stringify(params.schema, null, 2)}

Nội dung website hiện tại (giá trị đang thật sự hiển thị cho khách xem):
${JSON.stringify(params.currentData, null, 2)}
${history ? `\nLịch sử hội thoại gần đây:\n${history}\n` : ''}
Yêu cầu mới nhất của chủ quán: "${params.message}"

Nhiệm vụ: dựa theo yêu cầu, hãy tạo/chỉnh sửa nội dung phù hợp (viết lại slogan, mô tả, thêm/sửa món
trong menu, v.v.). Nếu yêu cầu chỉ là câu hỏi/trò chuyện thông thường không cần sửa gì, để "updates" là {}.

Quy tắc bắt buộc:
1. CHỈ trả về đúng 1 chuỗi JSON hợp lệ theo format sau, không bọc trong markdown, không giải thích gì
   thêm ngoài field "reply":
{
  "reply": "câu trả lời ngắn gọn bằng tiếng Việt, thông báo bạn đã sửa gì hoặc trả lời câu hỏi",
  "updates": { ... chỉ chứa các field ĐÃ THAY ĐỔI so với nội dung hiện tại, giữ đúng cấu trúc lồng
               nhau (nesting) và tên key như trong schema — KHÔNG lặp lại field không đổi, KHÔNG
               thêm key lạ ngoài schema ... }
}
2. Với mảng object (menu/danh sách món/tính năng): nếu chỉ sửa 1 phần tử thì vẫn trả về TOÀN BỘ mảng
   theo đúng thứ tự (giữ nguyên các phần tử không đổi), có thể thêm phần tử mới vào cuối mảng nếu
   chủ quán yêu cầu thêm món/mục mới.
3. Không bịa thông tin cụ thể (địa chỉ, số điện thoại, giá) nếu chủ quán không cung cấp hoặc chưa có
   sẵn trong nội dung hiện tại.`;
}

async function callGemini(prompt: string): Promise<string> {
  const token = getToken();
  const res = await fetch(`${getApiBaseUrl()}/ai-proxy/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ prompt, json: true }),
  });

  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.success) {
    const msg = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new Error(msg || `Trợ lý AI thất bại (${res.status})`);
  }
  return body.data.text as string;
}

export async function sendAiAssistantMessage(params: {
  shopName: string;
  schema: Record<string, unknown>;
  currentData: Record<string, unknown>;
  message: string;
  history: AiChatTurn[];
}): Promise<AiChatResult> {
  const rawText = await callGemini(buildPrompt(params));
  const cleanText = rawText.trim().replace(/^```json\s*/i, '').replace(/```$/, '');

  let parsed: { reply?: unknown; updates?: unknown };
  try {
    parsed = JSON.parse(cleanText);
  } catch {
    throw new Error('AI trả về dữ liệu không hợp lệ, vui lòng thử lại.');
  }

  return {
    reply: typeof parsed.reply === 'string' ? parsed.reply : 'Đã xử lý yêu cầu.',
    updates:
      parsed.updates && typeof parsed.updates === 'object' && !Array.isArray(parsed.updates)
        ? (parsed.updates as Record<string, unknown>)
        : {},
  };
}
