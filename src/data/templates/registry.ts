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

import { CATEGORY_REGISTRY as ALL_CATEGORIES } from './categories/_meta';
import { COFFEE_TEMPLATES } from './categories/coffee';
import { RESTAURANT_TEMPLATES } from './categories/restaurant';
import { SPA_TEMPLATES } from './categories/spa';
import { GYM_TEMPLATES } from './categories/gym';
import { WEDDING_TEMPLATES } from './categories/wedding';
import { VILLA_TEMPLATES } from './categories/villa';
import { DENTAL_CLINIC_TEMPLATES } from './categories/dentalClinic';
import type { ImageSlot, Template, TemplateDefinition } from './types';

export type { ImageSlot, Template };

// ── Category TẠM ẨN ───────────────────────────────────────────────────────────
// Category đang làm lại (giao diện chưa đạt) — ẩn khỏi MỌI chỗ người dùng khám
// phá/tạo mới: Landing, Marketplace, Sidebar, trang xem trước, tạo site mới, Admin.
// Code template giữ nguyên ở src/data/Template/<category>/. Site khách ĐÃ tạo từ
// template ẩn vẫn hiển thị + chỉnh sửa bình thường (COMPONENT_MAP, ALL_TEMPLATES...
// vẫn đủ). Hiện lại: xoá id khỏi set này.
export const HIDDEN_CATEGORIES: ReadonlySet<string> = new Set(['wedding']);

/** Category hiển thị cho người dùng (đã loại category tạm ẩn) */
export const CATEGORY_REGISTRY = ALL_CATEGORIES.filter(c => !HIDDEN_CATEGORIES.has(c.id));

// ── Gộp tất cả category thành 1 danh sách phẳng ────────────────────────────────
// Thứ tự category mới → thêm vào cuối mảng này.

const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  ...COFFEE_TEMPLATES,
  ...RESTAURANT_TEMPLATES,
  ...SPA_TEMPLATES,
  ...GYM_TEMPLATES,
  ...WEDDING_TEMPLATES,
  ...VILLA_TEMPLATES,
  ...DENTAL_CLINIC_TEMPLATES,
];

// ── Derived exports — consumers import những thứ này, không dùng registry trực tiếp ──

/**
 * MỌI template kể cả category tạm ẩn (không có runtime fields) — CHỈ dùng để tra
 * cứu theo id cho site ĐÃ tạo (giá, category...). Hiển thị danh sách dùng TEMPLATES.
 */
export const ALL_TEMPLATES: Template[] = TEMPLATE_REGISTRY.map(
  ({ component: _c, imageSlots: _i, ...t }) => t,
);

/** Template hiển thị cho người dùng (Landing/Marketplace/xem trước/tạo mới) — đã loại category tạm ẩn */
export const TEMPLATES: Template[] = ALL_TEMPLATES.filter(t => !HIDDEN_CATEGORIES.has(t.category));

/** Map templateId → lazy React component (dùng ở PublicSitePage + TemplateEditorPage) */
export const COMPONENT_MAP: Record<string, TemplateDefinition['component']> =
  Object.fromEntries(TEMPLATE_REGISTRY.map(t => [t.id, t.component]));

// Schema vi.json (TemplateEditorPage) → getTemplateSchema() trong schemas.ts, KHÔNG
// export từ đây: registry nằm trong bundle trang chủ, schema thì không cần ở đó.

/** Map templateId → tên hiển thị (dùng ở TemplateEditorPage) */
export const TEMPLATE_NAME_MAP: Record<string, string> =
  Object.fromEntries(TEMPLATE_REGISTRY.map(t => [t.id, t.name]));

/** Map templateId → image slots (dùng ở TemplateEditorPage) */
export const TEMPLATE_IMAGE_KEYS: Record<string, ImageSlot[]> =
  Object.fromEntries(TEMPLATE_REGISTRY.map(t => [t.id, t.imageSlots]));

/** Map categoryId → heading text (dùng ở MarketplacePage) */
export const CATEGORY_HEADING_MAP: Record<string, { title: string; desc: string }> =
  Object.fromEntries(CATEGORY_REGISTRY.map(c => [c.id, c.heading]));
