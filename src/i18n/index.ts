// ─── Khởi tạo i18n cho GIAO DIỆN HỆ THỐNG (6 ngôn ngữ vi/en/ko/th/zh/lo) ─────
// Tách biệt hoàn toàn với hệ thống dịch nội dung site khách (constants/languages.ts).
//
// Thứ tự phát hiện ngôn ngữ (quan trọng cho SEO):
//   1. ?lang= trên URL  — Googlebot crawl "https://vngoweb.com/pricing?lang=en" phải
//      thấy tiếng Anh NGAY từ lần render đầu (khớp hreflang đã khai báo), không phụ
//      thuộc localStorage (crawler không có).
//   2. localStorage 'vngoweb_lang' — lựa chọn user đã lưu.
//   3. fallback 'vi'.
//
// CỐ Ý KHÔNG dùng 'navigator' trong detection order: Googlebot's headless Chrome
// mặc định navigator.language = en-US, nên nếu bật navigator detection, URL mặc định
// "https://vngoweb.com/" (không có ?lang=) sẽ bị Googlebot render + index title/meta
// bằng TIẾNG ANH trong khi canonical/x-default khai báo là tiếng Việt — gây lệch
// title/description trên kết quả tìm kiếm (đã xảy ra thật, xem SERP screenshot).
// URL mặc định phải LUÔN là 'vi' cho mọi visitor lần đầu (kể cả bot); người dùng
// thật tự đổi ngôn ngữ qua LanguageSwitcher, được lưu localStorage cho lần sau.
//
// File dịch lazy-load theo cặp (ngôn ngữ × namespace) qua dynamic import — Vite tách
// mỗi file JSON thành chunk riêng, không phình bundle ban đầu.
//
// NGOẠI LỆ: tiếng Việt (ngôn ngữ mặc định, đa số visitor + Googlebot) của các namespace
// cần ngay lúc mở trang chủ được đóng gói sẵn trong bundle đầu. Nếu lazy-load, trang
// chủ phải chờ thác nước 3 vòng request nối tiếp trước khi hiện chữ đầu tiên:
// common → landing (LandingPage suspend) → onboarding (WelcomeModal/TourOverlay luôn
// mount ở RootLayout và suspend) — kéo FCP/LCP trên mobile thêm hàng giây.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { APP_LANGS, DEFAULT_APP_LANG, isAppLang, type AppLang } from './types';
import { appLangMeta } from './languages';
import viCommon from './locales/vi/common.json';
import viLanding from './locales/vi/landing.json';
import viOnboarding from './locales/vi/onboarding.json';

const APP_LANG_STORAGE_KEY = 'vngoweb_lang';

// Loại các file đã import tĩnh ở trên khỏi danh sách lazy-load (tránh Vite gộp nhầm/
// cảnh báo "dynamically imported but also statically imported").
const LAZY_LOCALES = import.meta.glob(
  ['./locales/*/*.json', '!./locales/vi/{common,landing,onboarding}.json'],
  { import: 'default' },
);

i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend((lng: string, ns: string) => {
      const load = LAZY_LOCALES[`./locales/${lng}/${ns}.json`];
      return load ? load() : Promise.reject(new Error(`Không có file dịch ${lng}/${ns}.json`));
    }),
  )
  .use(initReactI18next)
  .init({
    supportedLngs: [...APP_LANGS],
    fallbackLng: DEFAULT_APP_LANG,
    load: 'languageOnly',           // 'en-US' → 'en', 'vi-VN' → 'vi'
    nonExplicitSupportedLngs: true,
    // Bản dịch đóng gói sẵn (xem comment đầu file); phần còn lại vẫn qua backend.
    resources: { vi: { common: viCommon, landing: viLanding, onboarding: viOnboarding } },
    partialBundledLanguages: true,
    defaultNS: 'common',
    // 'onboarding' nạp ngay lúc init (song song với common) cho ngôn ngữ khác vi —
    // RootLayout luôn cần nó; để tới lúc render mới nạp là thêm 1 vòng request nối tiếp.
    ns: ['common', 'onboarding'],   // namespace trang nạp thêm qua useTranslation('<ns>')
    detection: {
      order: ['querystring', 'localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: APP_LANG_STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false }, // React đã tự escape
    react: { useSuspense: true },
  });

/** Ngôn ngữ hệ thống hiện tại, đã chuẩn hoá về AppLang */
function currentAppLang(): AppLang {
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
