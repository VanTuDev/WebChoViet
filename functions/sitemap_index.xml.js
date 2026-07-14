// Cloudflare Pages Function — proxy /sitemap_index.xml sang backend Render.
// Functions chạy TRƯỚC _redirects nên không còn bị rule /:slug (subdomain
// site khách) nuốt mất — đây là nguyên nhân bug redirect nhầm sang
// sitemap_index.xml.vngoweb.com (Cloudflare Pages không hỗ trợ proxy 200
// tới domain ngoài trong _redirects, nên rule cũ luôn bị bỏ qua và rơi
// xuống catch-all /:slug bên dưới).
const BACKEND_URL = 'https://webchoviet-server.onrender.com/sitemap_index.xml';

export async function onRequestGet() {
  const upstream = await fetch(BACKEND_URL);
  const body = await upstream.text();

  return new Response(body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/xml; charset=utf-8',
      'Cache-Control': upstream.headers.get('Cache-Control') ?? 'public, max-age=3600',
    },
  });
}
