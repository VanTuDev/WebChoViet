// ─── Tenant subdomain detection ─────────────────────────────────────────────
// Site khách xuất bản đang chuyển dần từ path `vngoweb.com/{slug}` sang subdomain
// `{slug}.vngoweb.com` (giống Shopify/Webflow). App là Vite SPA thuần (không phải
// Next.js) nên việc tách tenant phải làm ở client, đọc thẳng window.location.hostname
// lúc app khởi động — không có middleware/edge nào chạy trước.
//
// Dev: Chrome/Edge/Firefox tự resolve "*.localhost" về 127.0.0.1, nên test bằng
// "slug.localhost:5173" mà không cần cấu hình DNS/hosts gì thêm.
import { DOMAIN } from '../config/contact';

const RESERVED_SUBDOMAINS = new Set([
  'www', 'api', 'admin', 'app', 'mail', 'ftp', 'cdn', 'static', 'assets',
  'blog', 'staging', 'dev', 'test',
]);

const APEX_SUFFIX = `.${DOMAIN}`;
const DEV_SUFFIX = '.localhost';

/** Trả về slug tenant nếu hostname hiện tại là 1 subdomain hợp lệ, ngược lại null. */
export function getTenantSlug(hostname: string = window.location.hostname): string | null {
  let slug: string | null = null;

  if (hostname.endsWith(APEX_SUFFIX)) {
    slug = hostname.slice(0, -APEX_SUFFIX.length);
  } else if (hostname.endsWith(DEV_SUFFIX) && hostname !== 'localhost') {
    slug = hostname.slice(0, -DEV_SUFFIX.length);
  }

  if (!slug || RESERVED_SUBDOMAINS.has(slug)) return null;
  return slug;
}

/** URL công khai chuẩn của 1 site đã xuất bản — dạng subdomain. */
export function getPublicSiteUrl(slug: string): string {
  return `https://${slug}.${DOMAIN}`;
}
