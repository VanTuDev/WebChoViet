// ─── Metadata hiển thị cho từng ngôn ngữ hệ thống ────────────────────────────
// label: tên ngôn ngữ viết bằng CHÍNH ngôn ngữ đó (endonym) — người Thái tìm
// chữ "ไทย" chứ không tìm "Tiếng Thái". shortLabel: mã 2 chữ hiển thị cạnh cờ.

import type { AppLang } from './types';

export interface AppLangMeta {
  code: AppLang;
  /** Tên ngôn ngữ bằng chính ngôn ngữ đó */
  label: string;
  /** Mã ngắn hiển thị cạnh cờ (VI/EN/...) */
  shortLabel: string;
  /** BCP 47 — dùng cho <html lang> và og:locale */
  htmlLang: string;
  ogLocale: string;
}

export const APP_LANGUAGES: AppLangMeta[] = [
  { code: 'vi', label: 'Tiếng Việt', shortLabel: 'VI', htmlLang: 'vi', ogLocale: 'vi_VN' },
  { code: 'en', label: 'English',    shortLabel: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  { code: 'ko', label: '한국어',      shortLabel: 'KO', htmlLang: 'ko', ogLocale: 'ko_KR' },
  { code: 'th', label: 'ไทย',        shortLabel: 'TH', htmlLang: 'th', ogLocale: 'th_TH' },
  { code: 'zh', label: '中文',        shortLabel: 'ZH', htmlLang: 'zh', ogLocale: 'zh_CN' },
  { code: 'lo', label: 'ລາວ',        shortLabel: 'LO', htmlLang: 'lo', ogLocale: 'lo_LA' },
];

export function appLangMeta(code: AppLang): AppLangMeta {
  return APP_LANGUAGES.find(l => l.code === code) ?? APP_LANGUAGES[0];
}
