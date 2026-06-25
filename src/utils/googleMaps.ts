/** Returns true if the URL is a valid Google Maps embed URL that browsers can iframe */
export function isGoogleMapsEmbedUrl(url: string): boolean {
  return url.includes('/maps/embed');
}

/**
 * Pass through the URL if it's already an embed URL.
 * Google Maps share URLs (non-embed) will be rejected by browsers due to X-Frame-Options,
 * so users must supply the embed URL from Share → Embed a map → copy the src.
 */
export function toGoogleMapsEmbedUrl(url: string): string {
  return url.trim();
}
