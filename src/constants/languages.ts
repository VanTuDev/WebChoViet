// Dùng chung giữa Template Editor (chủ site chỉnh/dịch nội dung) và PublicSitePage
// (khách xem web tự đổi ngôn ngữ) — 1 nguồn duy nhất, tránh lệch nhãn giữa 2 nơi.
// Không dùng emoji cờ quốc gia: Windows không render được (hiện thành chữ "VN GB" xấu),
// và quy ước dự án là không dùng emoji trong UI — chỉ dùng nhãn chữ + icon lucide.
import type { SiteLang } from '../types';

interface LangMeta {
  code: SiteLang;
  label: string;       // Tên đầy đủ — "Tiếng Việt"
  shortLabel: string;  // Nhãn ngắn cho tab/nút — "VI"
}

export const LANGUAGES: LangMeta[] = [
  { code: 'vi', label: 'Tiếng Việt', shortLabel: 'VI' },
  { code: 'en', label: 'English',     shortLabel: 'EN' },
  { code: 'zh', label: '中文',         shortLabel: 'ZH' },
  { code: 'ko', label: '한국어',        shortLabel: 'KO' },
];

/** Các ngôn ngữ Gemini dịch tới — nguồn luôn là 'vi' nên không tự dịch chính nó */
export const TRANSLATABLE_LANGS: Array<'en' | 'zh' | 'ko'> = ['en', 'zh', 'ko'];

export function langMeta(code: SiteLang): LangMeta {
  return LANGUAGES.find(l => l.code === code) ?? LANGUAGES[0];
}

/** customData[lang] có nội dung thật hay chỉ là object rỗng (chưa từng dịch/nhập) */
export function hasContent(data: unknown): boolean {
  return !!data && typeof data === 'object' && Object.keys(data as object).length > 0;
}
