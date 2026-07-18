import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './store/AppContext';
import { router } from './router';
import { getTenantSlug } from './utils/tenant';
import './i18n'; // init i18next TRƯỚC khi render — side-effect import, không cần Provider
import './index.css';

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
