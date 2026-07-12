/**
 * ─── Template Registry ────────────────────────────────────────────────────────
 *
 * NGUỒN SỰ THẬT DUY NHẤT cho toàn bộ hệ thống template — nhưng bản thân file
 * này chỉ GỘP các category lại, không định nghĩa template trực tiếp.
 *
 * Xem src/data/templates/README.md để biết chi tiết cách thêm category/template mới.
 * Tóm tắt nhanh:
 *
 *   1. Tạo folder:  src/data/Template/<category>/<TemplateName>/
 *      ├── index.tsx        (React component)
 *      └── i18n/vi.json      (+ en/zh/ko tuỳ chọn)
 *
 *   2. Category đã có → thêm 1 object vào categories/<category>.ts
 *      Category mới   → thêm CategoryMeta vào categories/_meta.ts, rồi tạo
 *                        categories/<category>.ts và import vào file này.
 */

import { CATEGORY_REGISTRY } from './categories/_meta';
import { COFFEE_TEMPLATES } from './categories/coffee';
import { MILK_TEA_TEMPLATES } from './categories/milk-tea';
import { RESTAURANT_TEMPLATES } from './categories/restaurant';
import { SPA_TEMPLATES } from './categories/spa';
import { GYM_TEMPLATES } from './categories/gym';
import { WEDDING_TEMPLATES } from './categories/wedding';
import { VILLA_TEMPLATES } from './categories/villa';
import type { ImageSlot, CategoryMeta, Template, TemplateDefinition } from './types';

export type { ImageSlot, CategoryMeta, Template };
export { CATEGORY_REGISTRY };

// ── Gộp tất cả category thành 1 danh sách phẳng ────────────────────────────────
// Thứ tự category mới → thêm vào cuối mảng này.

const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  ...COFFEE_TEMPLATES,
  ...MILK_TEA_TEMPLATES,
  ...RESTAURANT_TEMPLATES,
  ...SPA_TEMPLATES,
  ...GYM_TEMPLATES,
  ...WEDDING_TEMPLATES,
  ...VILLA_TEMPLATES,
];

// ── Derived exports — consumers import những thứ này, không dùng registry trực tiếp ──

/** Danh sách template cho Marketplace (không có runtime fields) */
export const TEMPLATES: Template[] = TEMPLATE_REGISTRY.map(
  ({ component: _c, schema: _s, imageSlots: _i, ...t }) => t,
);

/** Map templateId → lazy React component (dùng ở PublicSitePage + TemplateEditorPage) */
export const COMPONENT_MAP: Record<string, TemplateDefinition['component']> =
  Object.fromEntries(TEMPLATE_REGISTRY.map(t => [t.id, t.component]));

/** Map templateId → vi.json schema object (dùng ở TemplateEditorPage) */
export const SCHEMA_MAP: Record<string, Record<string, unknown>> =
  Object.fromEntries(TEMPLATE_REGISTRY.map(t => [t.id, t.schema]));

/** Map templateId → tên hiển thị (dùng ở TemplateEditorPage) */
export const TEMPLATE_NAME_MAP: Record<string, string> =
  Object.fromEntries(TEMPLATE_REGISTRY.map(t => [t.id, t.name]));

/** Map templateId → image slots (dùng ở TemplateEditorPage) */
export const TEMPLATE_IMAGE_KEYS: Record<string, ImageSlot[]> =
  Object.fromEntries(TEMPLATE_REGISTRY.map(t => [t.id, t.imageSlots]));

/** Map categoryId → heading text (dùng ở MarketplacePage) */
export const CATEGORY_HEADING_MAP: Record<string, { title: string; desc: string }> =
  Object.fromEntries(CATEGORY_REGISTRY.map(c => [c.id, c.heading]));
