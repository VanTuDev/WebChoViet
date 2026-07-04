/**
 * Returns true if the URL is a Google Maps URL that browsers can iframe.
 * Hai dạng hợp lệ:
 * 1. `/maps/embed` — URL lấy từ Google Maps → Chia sẻ → "Nhúng bản đồ" (user dán tay).
 * 2. `output=embed` — dạng URL cổ điển nhúng được không cần API key, backend autofill
 *    sinh tự động từ toạ độ cào được (xem TemplateAutofillService.fillMapUrls).
 * Link chia sẻ thường (không thuộc 2 dạng trên) bị browser chặn bởi X-Frame-Options.
 */
export function isGoogleMapsEmbedUrl(url: string): boolean {
  return url.includes('/maps/embed') || (url.includes('google.') && url.includes('output=embed'));
}

/** Pass through the URL if it's already an embed URL (đã validate bằng isGoogleMapsEmbedUrl). */
export function toGoogleMapsEmbedUrl(url: string): string {
  return url.trim();
}
