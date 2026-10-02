import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './store/AppContext';
import { router } from './router';
import { getTenantSlug } from './utils/tenant';
import './i18n'; // init i18next TRƯỚC khi render — side-effect import, không cần Provider
import './index.css';

// Sau mỗi lần deploy, Cloudflare Pages chỉ còn asset của bản mới: tab đang mở từ bản cũ
// khi chuyển trang sẽ import chunk mang hash cũ (route lazy, template, file dịch) → nhận về
// index.html qua SPA fallback → "Failed to fetch dynamically imported module". Tải lại trang
// để lấy bản mới — tối đa 1 lần/10s (cờ sessionStorage) để lỗi thật (mất mạng...) không gây
// vòng lặp reload; khi đó lỗi đi tiếp tới RouteErrorBoundary như bình thường.
window.addEventListener('vite:preloadError', event => {
  const RELOAD_KEY = 'wcv_stale_chunk_reload_at';
  try {
    if (Date.now() - Number(sessionStorage.getItem(RELOAD_KEY) ?? 0) < 10_000) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    return; // không có sessionStorage → không chống lặp được, để lỗi hiển thị
  }
  event.preventDefault();
  // Route lazy tải chunk TRƯỚC khi đổi URL — đang chuyển trang thì vào thẳng trang đích,
  // không thì reload() sẽ đưa người dùng về lại trang cũ họ vừa bấm rời đi.
  const pending = router.state.navigation.location;
  if (pending) window.location.assign(pending.pathname + pending.search + pending.hash);
  else window.location.reload();
});

// PWA app chính: đăng ký SW scope gốc để đủ điều kiện installable (manifest ở
// site.webmanifest). Tenant subdomain KHÔNG đăng ký ở đây — PublicSitePage tự
// đăng ký theo scope riêng của từng site khách.
if ('serviceWorker' in navigator && !getTenantSlug()) {
  navigator.serviceWorker.register('/sw.js').catch(() => {
    /* không chặn app nếu đăng ký SW thất bại (trình duyệt cũ, chặn quyền...) */
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      {/* AppProvider bọc toàn bộ app — state có thể truy cập ở mọi route */}
      <AppProvider>
        {/* Suspense: useTranslation() suspend trong lúc lazy-load file dịch JSON */}
        <Suspense fallback={null}>
          <RouterProvider router={router} />
        </Suspense>
      </AppProvider>
    </HelmetProvider>
  </StrictMode>,
);
