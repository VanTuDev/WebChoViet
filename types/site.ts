// Định nghĩa kiểu dữ liệu dùng chung cho toàn bộ Next.js app

export type BusinessCategory =
  | 'RESTAURANT'
  | 'CAFE'
  | 'GYM'
  | 'SPA'
  | 'FLOWER_SHOP'
  | 'BAR'
  | 'OTHER';

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string | null;     // Tên tiếng Anh (dịch tự động hoặc thủ công)
  price: number;             // Đơn vị: VNĐ
  description: string | null;
  imageUrl: string | null;
  isAvailable: boolean;
  order: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  nameEn: string | null;
  order: number;
  items: MenuItem[];
}

export interface SiteData {
  id: string;
  slug: string;              // Subdomain: "caphe-ongbau" → caphe-ongbau.webchoviet.com
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  category: BusinessCategory;
  cuisine: string | null;    // Ẩm thực chuyên biệt, VD: "Cà phê Việt Nam"
  openingHours: string | null;
  isActive: boolean;
  menuCategories: MenuCategory[];
}
