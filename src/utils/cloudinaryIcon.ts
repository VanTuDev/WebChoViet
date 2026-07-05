/**
 * Chèn transformation của Cloudinary (`c_fill,g_auto,w_<n>,h_<n>`) vào URL ảnh đã upload
 * để lấy icon vuông đúng kích thước cho PWA manifest — không cần xử lý ảnh phía server.
 * Nếu `url` không phải URL Cloudinary hợp lệ (vd ảnh mặc định của template, chưa đổi),
 * trả về nguyên `url` — trình duyệt vẫn dùng được, chỉ không đảm bảo đúng tỉ lệ vuông.
 */
export function cloudinarySquareIcon(url: string, size: number): string {
  const marker = '/upload/';
  const i = url.indexOf(marker);
  if (!url.includes('res.cloudinary.com') || i === -1) return url;
  const insertAt = i + marker.length;
  return `${url.slice(0, insertAt)}c_fill,g_auto,w_${size},h_${size}/${url.slice(insertAt)}`;
}
