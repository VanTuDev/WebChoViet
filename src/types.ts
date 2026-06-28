// Template types đã chuyển vào registry — import từ đó nếu cần Template interface.
// File này chỉ giữ các type runtime của SiteConfig.

export type SiteLang = 'vi' | 'en' | 'zh' | 'ko';

export interface SiteConfig {
  id: string;
  templateId: string;       // string mở — không cần cập nhật union khi thêm template
  slug: string;
  name: string;
  lang: SiteLang;
  /** Deep-partial overrides của i18n JSON, key theo lang */
  customData: Record<string, unknown>;
  /** imageKey → dataURL hoặc uploaded URL */
  images: Record<string, string>;
  status: 'draft' | 'published';
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}
