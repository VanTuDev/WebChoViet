// ─── Khởi tạo i18n cho GIAO DIỆN HỆ THỐNG (6 ngôn ngữ vi/en/ko/th/zh/lo) ─────
// Tách biệt hoàn toàn với hệ thống dịch nội dung site khách (constants/languages.ts).
//
// Thứ tự phát hiện ngôn ngữ (quan trọng cho SEO):
//   1. ?lang= trên URL  — Googlebot crawl "https://vngoweb.com/pricing?lang=en" phải
//      thấy tiếng Anh NGAY từ lần render đầu (khớp hreflang đã khai báo), không phụ
//      thuộc localStorage (crawler không có).
//   2. localStorage 'vngoweb_lang' — lựa chọn user đã lưu.
//   3. navigator.language — ngôn ngữ trình duyệt lần đầu ghé thăm.
//   4. fallback 'vi'.
//
// File dịch lazy-load theo cặp (ngôn ngữ × namespace) qua dynamic import — Vite tách
// mỗi file JSON thành chunk riêng, không phình bundle ban đầu.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { APP_LANGS, DEFAULT_APP_LANG, isAppLang, type AppLang } from './types';
import { appLangMeta } from './languages';

export const APP_LANG_STORAGE_KEY = 'vngoweb_lang';

i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend((lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`)),
  )
  .use(initReactI18next)
  .init({
    supportedLngs: [...APP_LANGS],
    fallbackLng: DEFAULT_APP_LANG,
    load: 'languageOnly',           // 'en-US' → 'en', 'vi-VN' → 'vi'
    nonExplicitSupportedLngs: true,
    defaultNS: 'common',
    ns: ['common'],                 // namespace trang nạp thêm qua useTranslation('<ns>')
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: APP_LANG_STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false }, // React đã tự escape
    react: { useSuspense: true },
  });

/** Ngôn ngữ hệ thống hiện tại, đã chuẩn hoá về AppLang */
export function currentAppLang(): AppLang {
  const lng = (i18n.resolvedLanguage ?? i18n.language ?? '').split('-')[0];
  return isAppLang(lng) ? lng : DEFAULT_APP_LANG;
}

// Đồng bộ <html lang> theo ngôn ngữ đang hiển thị — quan trọng cho SEO/screen reader.
function syncHtmlLang(): void {
  document.documentElement.lang = appLangMeta(currentAppLang()).htmlLang;
}
i18n.on('languageChanged', syncHtmlLang);
if (i18n.isInitialized) syncHtmlLang();
else i18n.on('initialized', syncHtmlLang);

export default i18n;
