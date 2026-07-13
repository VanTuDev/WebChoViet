// ─── Thẻ SEO đa ngôn ngữ dùng chung cho mọi trang công khai ──────────────────
// Sinh canonical tự tham chiếu theo ngôn ngữ đang xem + hreflang alternate cho cả
// 6 ngôn ngữ + x-default — cùng convention ?lang= mà PublicSitePage đã dùng cho
// site khách. Nhúng bên trong khối <Helmet> sẵn có của từng trang.

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { DOMAIN } from '../config/contact';
import { APP_LANGUAGES } from './languages';
import { DEFAULT_APP_LANG, isAppLang } from './types';

interface HreflangLinksProps {
  /** Đường dẫn tuyệt đối trong app, ví dụ "/pricing" — KHÔNG kèm query string */
  path: string;
}

export default function HreflangLinks({ path }: HreflangLinksProps) {
  const { i18n } = useTranslation();
  const base = `https://${DOMAIN}${path === '/' ? '' : path}`;

  const lng = (i18n.resolvedLanguage ?? i18n.language ?? '').split('-')[0];
  const active = isAppLang(lng) ? lng : DEFAULT_APP_LANG;

  const urlFor = (code: string) =>
    code === DEFAULT_APP_LANG ? (base || `https://${DOMAIN}/`) : `${base}?lang=${code}`;

  return (
    <Helmet>
      <link rel="canonical" href={urlFor(active)} />
      {APP_LANGUAGES.map(({ code, htmlLang }) => (
        <link key={code} rel="alternate" hrefLang={htmlLang} href={urlFor(code)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={urlFor(DEFAULT_APP_LANG)} />
      <meta property="og:locale" content={APP_LANGUAGES.find(l => l.code === active)!.ogLocale} />
    </Helmet>
  );
}
