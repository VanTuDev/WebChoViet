/**
 * ─── Schema gốc (i18n/vi.json) của mọi template — CHỈ Template Editor dùng ─────
 *
 * Tách khỏi registry.ts: trước đây mỗi categories/<category>.ts import tĩnh vi.json
 * vào TemplateDefinition, nên Landing/Marketplace (chỉ cần TEMPLATES để hiện danh
 * sách) cũng kéo theo ~150 KB JSON của toàn bộ template vào bundle trang chủ.
 * Module này chỉ được TemplateEditorPage import → JSON nằm trong chunk của editor.
 *
 * Template mới tự có schema, không cần đăng ký: tra theo tên thư mục viết thường,
 * cùng quy ước id ↔ thư mục với utils/templateScreens.ts (scripts/validate-templates
 * kiểm tra id viết thường khớp thư mục).
 */

const SCHEMA_FILES = import.meta.glob('../Template/*/*/i18n/vi.json', {
  eager: true,
  import: 'default',
}) as Record<string, Record<string, unknown>>;

/** Map tên thư mục template (lowercase) → schema vi.json */
const SCHEMA_BY_ID_LOWER: Record<string, Record<string, unknown>> = {};
for (const [path, schema] of Object.entries(SCHEMA_FILES)) {
  const folder = path.split('/').at(-3); // ../Template/<category>/<Folder>/i18n/vi.json
  if (folder) SCHEMA_BY_ID_LOWER[folder.toLowerCase()] = schema;
}

/** Schema vi.json của template — không phân biệt hoa/thường của id; {} nếu không có */
export function getTemplateSchema(templateId: string): Record<string, unknown> {
  return SCHEMA_BY_ID_LOWER[templateId.toLowerCase()] ?? {};
}
