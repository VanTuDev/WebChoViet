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
  /** Liên hệ nhanh cho thanh nổi (Gọi điện / Zalo / Facebook) — độc lập với nội dung template, hiện trên mọi trang */
  contact?: {
    phone?: string;
    zalo?: string;
    facebook?: string;
  };
  status: 'draft' | 'published';
  isPending?: boolean;
  /** Vượt giới hạn gói Free sau khi hạ gói — không hiển thị public tới khi nâng cấp lại hoặc xóa bớt site */
  planLocked?: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}
