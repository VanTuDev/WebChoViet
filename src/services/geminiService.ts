import axios, { isAxiosError } from 'axios';

/**
 * Service to handle translation using Gemini 2.5 Flash API
 */

export async function translateCustomData(
  vietnameseData: Record<string, unknown>,
  targetLangs: ('en' | 'zh' | 'ko')[],
  userApiKey?: string
): Promise<Record<string, Record<string, unknown>>> {
  // Try to get API key from Env or parameter
  const apiKey = userApiKey || import.meta.env.VITE_GEMINI_API_KEY || '';
  
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `Bạn là một trợ lý dịch thuật chuyên nghiệp. Hãy dịch toàn bộ các giá trị text trong đối tượng JSON tiếng Việt dưới đây sang các ngôn ngữ: ${targetLangs.map(l => {
    if (l === 'en') return 'Tiếng Anh (en)';
    if (l === 'zh') return 'Tiếng Trung (zh)';
    if (l === 'ko') return 'Tiếng Hàn (ko)';
    return l;
  }).join(', ')}.

Quy tắc:
1. Chỉ dịch các giá trị chuỗi văn bản (ví dụ: các đoạn mô tả, tiêu đề, nhãn nút bấm).
2. TUYỆT ĐỐI không thay đổi tên các Key của JSON.
3. Giữ nguyên giá trị của các trường không phải văn bản thường như: định dạng tiền tệ (ví dụ "55.000 ₫", "65K"), mã màu, số lượng, hoặc bất kỳ ID nào.
4. Trả về kết quả dưới dạng đối tượng JSON duy nhất có cấu trúc như sau:
{
  ${targetLangs.map(l => `"${l}": { ... đối tượng đã dịch sang ${l} ... }`).join(',\n  ')}
}
5. Chỉ phản hồi duy nhất chuỗi JSON hợp lệ, không bọc trong thẻ code markdown (\`\`\`json ... \`\`\`), không có thêm bất kỳ giải thích nào trước hoặc sau JSON.

Dữ liệu JSON gốc cần dịch:
${JSON.stringify(vietnameseData, null, 2)}`;

  try {
    const response = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // Longer timeout for translation
    });

    const result = response.data;
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('Không nhận được phản hồi từ Gemini API');
    }

    // Parse clean JSON output
    const cleanText = responseText.trim().replace(/^```json\s*/i, '').replace(/```$/, '');
    const translatedData = JSON.parse(cleanText);
    return translatedData;
  } catch (error: unknown) {
    console.error('Gemini translate error:', error);
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || `Gemini API error ${error.response?.status}`);
    }
    throw error;
  }
}
