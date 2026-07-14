// Cloudflare Pages Function — proxy /sitemaps/* sang backend Render.
// Xem giải thích lý do cần Function (thay vì _redirects) ở
// functions/sitemap_index.xml.js.
const BACKEND_ORIGIN = 'https://webchoviet-server.onrender.com';

export async function onRequestGet({ params }) {
  const segments = Array.isArray(params.path) ? params.path : [params.path].filter(Boolean);
  const upstream = await fetch(`${BACKEND_ORIGIN}/sitemaps/${segments.join('/')}`);
  const body = await upstream.text();

  return new Response(body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/xml; charset=utf-8',
      'Cache-Control': upstream.headers.get('Cache-Control') ?? 'public, max-age=3600',
    },
  });
}
