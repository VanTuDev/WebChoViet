// Các hàm truy vấn dữ liệu từ mock DB hoặc PostgreSQL qua Prisma — dùng trong Server Components
import type { SiteData } from '@/types/site';
import { getSiteBySlugFromMock } from './db';

/**
 * Tìm site theo slug subdomain và trả về toàn bộ dữ liệu menu.
 * Hỗ trợ fallback từ mock DB (lib/dbMock.json) cho môi trường dev/AI Studio.
 */
export async function getSiteBySlug(slug: string): Promise<SiteData | null> {
  // 1. Thử tìm trong mock database trước (site xuất bản từ Template Editor)
  try {
    const mockSite = await getSiteBySlugFromMock(slug);
    if (mockSite) {
      return mockSite;
    }
  } catch (error) {
    console.error('Error finding site in mock DB:', error);
  }

  // 2. Fallback sang Prisma PostgreSQL (nếu có connection và DB active)
  try {
    const { prisma } = await import('./prisma');
    return (await prisma.site.findUnique({
      where: { slug, isActive: true },
      include: {
        menuCategories: {
          orderBy: { order: 'asc' },
          include: {
            items: {
              where: { isAvailable: true },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    })) as SiteData | null;
  } catch (error) {
    console.warn('Prisma query bypassed or database offline. Subdomain lookup complete.');
    return null;
  }
}
