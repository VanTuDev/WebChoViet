export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  isAvailable: boolean;
}

export type TemplateCategory = 'all' | 'coffee' | 'spa' | 'restaurant' | 'retail';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  price: number; // 0 for free
  priceText: string; // e.g. "750,000đ" or "Miễn phí"
  badge?: 'BÁN CHẠY' | 'PREMIUM' | 'MỚI';
  rating?: number;
  tags: string[];
  imageUrl: string;
  starterItems: MenuItem[];
}

export interface Project {
  id: string;
  templateId: string;
  storeName: string;
  description: string;
  lastUpdated: string;
  status: 'Active' | 'Draft';
  themeColor: string; // hex code or tailwind style code
  phone: string;
  logoText: string;
  items: MenuItem[];
  qrCodeUrl: string;
}

export interface Metric {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
}

// ── Template-based site config (customised by a user) ─────────────────────────

export type SiteTemplateId = 'coffe-1' | 'coffe-2' | 'coffe-3' | 'coffe-4' | 'coffe-5';
export type SiteLang = 'vi' | 'en' | 'zh' | 'ko';

export interface SiteConfig {
  id: string;
  templateId: SiteTemplateId;
  slug: string;           // URL: /p/:slug
  name: string;           // display name in dashboard
  lang: SiteLang;
  /** Deep-partial overrides of the template's i18n JSON, keyed by lang */
  customData: Record<string, unknown>;
  /** imageKey → dataURL or uploaded URL */
  images: Record<string, string>;
  status: 'draft' | 'published';
  createdBy?: string;     // persistent user ID from localStorage
  createdAt: string;
  updatedAt: string;
}
