// Next.js 15 — generateMetadata động theo subdomain để tối ưu SEO từng quán
import type { Metadata } from 'next';
import { getSiteBySlug } from '@/lib/data';

type LayoutProps = {
  children: React.ReactNode;
  // Next.js 15: params là Promise, phải await trước khi dùng
  params: Promise<{ subdomain: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { subdomain } = await params;
  const site = await getSiteBySlug(subdomain);

  // Site không tồn tại → trả về metadata tối giản, tránh lỗi
  if (!site) {
    return {
      title: 'Trang không tồn tại | WebChoViet',
      robots: { index: false, follow: false },
    };
  }

  const title = `${site.name} — Menu & Thông tin`;
  const description =
    site.description ??
    `Xem menu, giá cả và thông tin liên hệ của ${site.name} tại WebChoViet.`;
  const siteUrl = `https://${subdomain}.webchoviet.com`;

  return {
    // ── Basic SEO ─────────────────────────────────────────────────────────
    title,
    description,
    metadataBase: new URL(siteUrl),

    // ── OpenGraph (Facebook, Zalo OG preview khi share link) ──────────────
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: 'WebChoViet',
      images: site.coverImageUrl
        ? [{ url: site.coverImageUrl, alt: site.name, width: 1200, height: 630 }]
        : [],
      locale: 'vi_VN',
      type: 'website',
    },

    // ── Twitter Card ──────────────────────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: site.coverImageUrl ? [site.coverImageUrl] : [],
    },

    // ── Canonical URL (tránh duplicate content) ───────────────────────────
    alternates: { canonical: siteUrl },

    // ── Robots: chỉ index khi site đang active ────────────────────────────
    robots: {
      index: site.isActive,
      follow: site.isActive,
      googleBot: { index: site.isActive, follow: site.isActive },
    },
  };
}

// Layout không cần thêm wrapper — children là <SubdomainPage /> đã có <main>
export default function SubdomainLayout({ children }: Pick<LayoutProps, 'children'>) {
  return <>{children}</>;
}
