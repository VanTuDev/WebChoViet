// ─── Ngôn ngữ của GIAO DIỆN HỆ THỐNG (app chrome: header/footer/trang công khai) ───
// KHÁC HOÀN TOÀN với SiteLang (src/constants/languages.ts) — hệ thống dịch nội dung
// site của KHÁCH (vi/en/zh/ko). Hai hệ thống độc lập, không dùng chung type/state.

export const APP_LANGS = ['vi', 'en', 'ko', 'th', 'zh', 'lo'] as const;

export type AppLang = (typeof APP_LANGS)[number];

export const DEFAULT_APP_LANG: AppLang = 'vi';

export function isAppLang(value: string | null | undefined): value is AppLang {
  return !!value && (APP_LANGS as readonly string[]).includes(value);
}
