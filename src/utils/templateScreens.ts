// Quét screenshot full-page (screen.png) của mọi template — dùng chung cho
// landing carousel & marketplace card. Template mới có screen.png tự xuất hiện.
const SCREENSHOTS = import.meta.glob('../data/Template/*/*/screen.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** Map templateId (tên folder lowercase) → URL screenshot */
const TEMPLATE_SCREEN_BY_ID_LOWER: Record<string, string> = {};
for (const [path, url] of Object.entries(SCREENSHOTS)) {
  const folder = path.split('/').at(-2);
  if (folder) TEMPLATE_SCREEN_BY_ID_LOWER[folder.toLowerCase()] = url;
}

// Tra không phân biệt hoa/thường: registry id đôi khi khác case với tên thư mục
// (vd id 'dentalClinic-1' vs thư mục 'DentalClinic-1' → 'dentalclinic-1') — dùng
// Proxy để chỗ gọi TEMPLATE_SCREEN_BY_ID[t.id] luôn khớp bất kể id viết hoa/thường.
export const TEMPLATE_SCREEN_BY_ID: Record<string, string> = new Proxy({}, {
  get: (_target, id: string) => TEMPLATE_SCREEN_BY_ID_LOWER[id.toLowerCase()],
}) as Record<string, string>;
