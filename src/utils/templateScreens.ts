// Quét screenshot full-page của mọi template — dùng chung cho landing carousel &
// marketplace card. Template mới có screen.png tự xuất hiện.
//
// Ưu tiên screen.webp (bản thu nhỏ rộng 600px do scripts/optimize-images.py tạo,
// nhẹ hơn ~10–20 lần): screen.png gốc nặng tới 4 MB/ảnh, carousel trang chủ từng
// tải ~29 MB ảnh làm LCP chậm >10s. Template chưa chạy script → fallback screen.png.
const SCREENSHOTS_PNG = import.meta.glob('../data/Template/*/*/screen.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;
const SCREENSHOTS_WEBP = import.meta.glob('../data/Template/*/*/screen.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** Map templateId (tên folder lowercase) → URL screenshot */
const TEMPLATE_SCREEN_BY_ID_LOWER: Record<string, string> = {};
for (const [path, url] of [...Object.entries(SCREENSHOTS_PNG), ...Object.entries(SCREENSHOTS_WEBP)]) {
  const folder = path.split('/').at(-2);
  if (folder) TEMPLATE_SCREEN_BY_ID_LOWER[folder.toLowerCase()] = url; // webp ghi đè png
}

// Tra không phân biệt hoa/thường: registry id đôi khi khác case với tên thư mục
// (vd id 'dentalClinic-1' vs thư mục 'DentalClinic-1' → 'dentalclinic-1') — dùng
// Proxy để chỗ gọi TEMPLATE_SCREEN_BY_ID[t.id] luôn khớp bất kể id viết hoa/thường.
export const TEMPLATE_SCREEN_BY_ID: Record<string, string> = new Proxy({}, {
  get: (_target, id: string) => TEMPLATE_SCREEN_BY_ID_LOWER[id.toLowerCase()],
}) as Record<string, string>;
