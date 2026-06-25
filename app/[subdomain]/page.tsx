// Server Component — nhận slug từ URL, truy vấn DB, render giao diện quán + JSON-LD SEO
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getSiteBySlug } from '@/lib/data';
import type { SiteData, MenuCategory, MenuItem } from '@/types/site';

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Định dạng giá tiền VNĐ: 55000 → "55.000 ₫" */
function formatVnd(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);
}

/** Xây dựng JSON-LD Schema.org (Restaurant / LocalBusiness) cho Google Search */
function buildJsonLd(site: SiteData, subdomain: string): Record<string, unknown> {
  const isFood = ['RESTAURANT', 'CAFE', 'BAR'].includes(site.category);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isFood ? 'Restaurant' : 'LocalBusiness',
    name: site.name,
    description: site.description,
    url: `https://${subdomain}.webchoviet.com`,
    telephone: site.phone,
    image: site.coverImageUrl,
    ...(site.cuisine && { servesCuisine: site.cuisine }),
    ...(site.openingHours && { openingHours: site.openingHours }),
    ...(site.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address,
        addressCountry: 'VN',
      },
    }),
    // Link đến phần menu trên cùng trang
    hasMenu: `https://${subdomain}.webchoviet.com#menu`,
    // Nhúng danh sách món ăn để Google hiểu cấu trúc menu
    ...(isFood && {
      menu: {
        '@type': 'Menu',
        hasMenuSection: site.menuCategories.map((cat) => ({
          '@type': 'MenuSection',
          name: cat.name,
          hasMenuItem: cat.items.map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            description: item.description,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'VND',
            },
          })),
        })),
      },
    }),
  };

  // Loại bỏ các key có giá trị undefined
  return JSON.parse(JSON.stringify(schema));
}

// ── Sub-components (tất cả là Server Components, không cần 'use client') ──────

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-[#E0F4FF] overflow-hidden flex gap-3 p-3 hover:shadow-md transition-shadow">
      {/* Ảnh món ăn */}
      {item.imageUrl && (
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover rounded-xl"
            sizes="96px"
          />
        </div>
      )}

      {/* Thông tin món */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm leading-snug">{item.name}</h3>
          {/* Tên tiếng Anh — hiển thị dưới dạng in nghiêng màu xanh nhạt */}
          {item.nameEn && (
            <p className="text-xs text-[#90E0EF] italic mt-0.5">{item.nameEn}</p>
          )}
          {item.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
          )}
        </div>
        <p className="text-[#0077B6] font-bold text-sm mt-2">{formatVnd(item.price)}</p>
      </div>
    </article>
  );
}

function MenuSection({ category }: { category: MenuCategory }) {
  return (
    <section className="scroll-mt-4" id={`cat-${category.id}`}>
      {/* Tiêu đề danh mục: viền trái xanh đậm, tên Anh màu xanh nhạt */}
      <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3 border-l-4 border-[#0077B6] pl-3">
        {category.name}
        {category.nameEn && (
          <span className="text-[#90E0EF] font-normal normal-case ml-2">
            · {category.nameEn}
          </span>
        )}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

// ── Inline SVG Icons (không cần thêm dependency icon) ─────────────────────────

function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.5c0-.55.45-1 1-1H8c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.01L6.6 10.8z" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
    </svg>
  );
}

// ── Page Component ─────────────────────────────────────────────────────────────

type PageProps = {
  params: Promise<{ subdomain: string }>;
};

export default async function SubdomainPage({ params }: PageProps) {
  const { subdomain } = await params;

  // Truy vấn DB — nếu không có hoặc inactive → 404
  const site = await getSiteBySlug(subdomain);
  if (!site) notFound();

  const jsonLd = buildJsonLd(site, subdomain);

  return (
    <>
      {/* ── JSON-LD Schema.org ──────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#F0F7FF] font-sans">

        {/* ── Hero / Cover Image ──────────────────────────────────────────────── */}
        <div className="relative">
          {site.coverImageUrl ? (
            <div className="relative w-full h-48 sm:h-64">
              <Image
                src={site.coverImageUrl}
                alt={`Ảnh bìa ${site.name}`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              {/* Gradient overlay để card phía dưới đọc được */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0077B6]/10 via-transparent to-[#0077B6]/60" />
            </div>
          ) : (
            /* Fallback khi chưa có ảnh bìa */
            <div className="w-full h-32 bg-gradient-to-r from-[#0077B6] to-[#00B4D8]" />
          )}

          {/* ── Business Info Card (nổi lên trên cover image) ──────────────── */}
          <div className="px-4">
            <div className="bg-white rounded-2xl shadow-lg -mt-10 relative z-10 p-4">
              <div className="flex items-start gap-3">
                {/* Logo hoặc chữ cái đầu tên quán */}
                {site.logoUrl ? (
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={site.logoUrl}
                      alt={`Logo ${site.name}`}
                      fill
                      className="object-cover rounded-xl border-2 border-[#90E0EF]"
                      sizes="64px"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0077B6] to-[#00B4D8] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white text-2xl font-bold select-none">
                      {site.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Tên & mô tả quán */}
                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-gray-800 leading-tight">{site.name}</h1>
                  {site.description && (
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{site.description}</p>
                  )}
                </div>
              </div>

              {/* ── Info Pills: SĐT / Địa chỉ / Giờ mở cửa ────────────────── */}
              {(site.phone || site.address || site.openingHours) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {site.phone && (
                    <a
                      href={`tel:${site.phone}`}
                      className="flex items-center gap-1.5 bg-[#E0F4FF] text-[#0077B6] rounded-full px-3 py-1.5 text-xs font-medium hover:bg-[#0077B6] hover:text-white transition-colors"
                    >
                      <IconPhone />
                      {site.phone}
                    </a>
                  )}
                  {site.address && (
                    <span className="flex items-center gap-1.5 bg-[#E0F4FF] text-[#0077B6] rounded-full px-3 py-1.5 text-xs font-medium">
                      <IconLocation />
                      <span className="line-clamp-1">{site.address}</span>
                    </span>
                  )}
                  {site.openingHours && (
                    <span className="flex items-center gap-1.5 bg-green-50 text-green-600 rounded-full px-3 py-1.5 text-xs font-medium">
                      <IconClock />
                      {site.openingHours}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Menu Section ──────────────────────────────────────────────────── */}
        {site.menuCategories.length > 0 ? (
          <main className="px-4 pt-5 pb-10" id="menu">
            {/* Tiêu đề section Menu */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-1 bg-[#0077B6] rounded-full" />
              <h2 className="text-base font-bold text-[#0077B6]">Thực đơn</h2>
              <div className="flex-1 h-px bg-[#E0F4FF]" />
            </div>

            <div className="space-y-7">
              {site.menuCategories.map((category) => (
                <MenuSection key={category.id} category={category} />
              ))}
            </div>
          </main>
        ) : (
          /* Trạng thái rỗng khi chưa có menu */
          <main className="px-4 pt-8 pb-10 text-center" id="menu">
            <p className="text-gray-400 text-sm">Thực đơn đang được cập nhật...</p>
          </main>
        )}

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer className="bg-[#0077B6] py-5 text-center">
          <p className="text-white/80 text-xs">
            Tạo bởi{' '}
            <span className="text-white font-bold tracking-wide">WebChoViet</span>
            {' — '}Website miễn phí cho hộ kinh doanh Việt Nam
          </p>
        </footer>
      </div>
    </>
  );
}
