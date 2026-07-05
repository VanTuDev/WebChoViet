// Service worker tối giản — CHỈ để thỏa điều kiện "installable" (Add to Home Screen) của
// trình duyệt cho các trang site công khai (xem PublicSitePage.tsx đăng ký scope riêng
// theo từng slug). KHÔNG cache bất kỳ request nào — chủ quán có thể sửa nội dung bất cứ
// lúc nào, cache sai sẽ khiến khách xem thấy nội dung cũ.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Có handler 'fetch' (dù không respondWith) là điều kiện installability trên 1 số trình
// duyệt — để request đi thẳng ra mạng như bình thường, không can thiệp.
self.addEventListener('fetch', () => {});
