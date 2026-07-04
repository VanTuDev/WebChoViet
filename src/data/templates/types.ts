/**
 * ─── Types dùng chung cho hệ thống template ───────────────────────────────────
 * Xem src/data/templates/README.md để biết cách thêm category/template mới.
 */
import type { ComponentType, LazyExoticComponent } from 'react';

export interface ImageSlot {
  key: string;
  label: string;
  defaultUrl: string;
}

/** Metadata của một category — dùng cho Marketplace heading + filters */
export interface CategoryMeta {
  id: string;
  label: string; // Nhãn ngắn cho filter/nav
  heading: {
    title: string;
    desc: string;
  };
}

/** Template hiển thị trong Marketplace (không có runtime fields) */
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  priceText: string;
  badge?: 'BÁN CHẠY' | 'PREMIUM' | 'MỚI';
  rating?: number;
  tags: string[];
  imageUrl: string;
}

/** Template đầy đủ với runtime fields — 1 object này = 1 entry trong 1 file category */
export interface TemplateDefinition extends Template {
  component: LazyExoticComponent<ComponentType<{ lang?: string }>>;
  schema: Record<string, unknown>;
  imageSlots: ImageSlot[];
}
