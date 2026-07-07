// Quét screenshot full-page (screen.png) của mọi template — dùng chung cho
// landing carousel & marketplace card. Template mới có screen.png tự xuất hiện.
const SCREENSHOTS = import.meta.glob('../data/Template/*/*/screen.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** Map templateId (tên folder lowercase) → URL screenshot */
export const TEMPLATE_SCREEN_BY_ID: Record<string, string> = {};
for (const [path, url] of Object.entries(SCREENSHOTS)) {
  const folder = path.split('/').at(-2);
  if (folder) TEMPLATE_SCREEN_BY_ID[folder.toLowerCase()] = url;
}
