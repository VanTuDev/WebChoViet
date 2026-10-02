import type { ComponentType } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './config/routes';
import { getTenantSlug } from './utils/tenant';
import RouteErrorBoundary from './components/error/RouteErrorBoundary';
import LandingPage from './pages/landing/LandingPage';
import RootLayout from './layouts/RootLayout';
import RequireAuth from './components/auth/RequireAuth';
import RequireAdmin from './components/auth/RequireAdmin';

// ── Code-splitting theo route ─────────────────────────────────────────────────
// Chỉ Landing (trang vào nhiều nhất, quyết định LCP) + layout/guard nhỏ nằm trong
// bundle đầu. Mọi trang khác tải chunk riêng khi cần — trước đây import tĩnh hết
// nên trang chủ phải tải cả Admin/Template Editor/Dashboard (bundle ~1.1 MB).
// Dùng `lazy` của react-router (không phải React.lazy): router tải xong chunk rồi
// mới chuyển trang, trang cũ vẫn hiển thị trong lúc chờ — không nháy màn trắng.
const lazyPage = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

// Lần tải đầu vào thẳng 1 route lazy (vd mở link /pricing): render trống tới khi
// chunk về — giống fallback={null} của Suspense ở main.tsx, và tránh warning
// "No HydrateFallback element provided" của react-router.
const EmptyFallback = () => null;

const tenantSlug = getTenantSlug();

// ── Tenant subdomain ({slug}.vngoweb.com) — hostname đã tự xác định đây là site
// công khai của 1 khách hàng, nên MỌI path đều render thẳng PublicSitePage, bỏ qua
// toàn bộ route app chính (marketplace/dashboard/admin...). Route app chính vẫn giữ
// nguyên bên dưới để phục vụ domain gốc vngoweb.com và URL cũ /{slug} (giai đoạn
// chuyển tiếp).
export const router = tenantSlug
  ? createBrowserRouter([
      {
        element: <RootLayout />,
        errorElement: <RouteErrorBoundary />,
        HydrateFallback: EmptyFallback,
        children: [
          {
            path: '*',
            lazy: async () => {
              const { default: PublicSitePage } = await import('./pages/public-site/PublicSitePage');
              return { element: <PublicSitePage slug={tenantSlug} /> };
            },
            errorElement: (
              <RouteErrorBoundary
                title="Trang này đang gặp sự cố"
                message="Website này đang gặp sự cố hiển thị. Vui lòng thử tải lại trang sau ít phút."
              />
            ),
          },
        ],
      },
    ])
  : createBrowserRouter([
      // ── Root — pathless, chỉ để gắn errorElement DÙNG CHUNG cho toàn bộ route bên
      // dưới. Trước đây KHÔNG có bất kỳ error boundary nào trong app: 1 lỗi render
      // bất kỳ (vd template đọc field lạ trong customData) làm React unmount toàn
      // bộ cây → cả SPA sập trắng, phải tải lại tay. Route con nào cần thông báo lỗi
      // rõ ràng hơn (vd trang site khách xem) có errorElement RIÊNG, ưu tiên hơn cái này.
      {
        element: <RootLayout />,
        errorElement: <RouteErrorBoundary />,
        HydrateFallback: EmptyFallback,
        children: [
          // ── Public — không dùng AppLayout ──────────────────────────────────────
          {
            path: ROUTES.HOME,
            element: <LandingPage />,
          },
          {
            path: '/landing',
            element: <Navigate to={ROUTES.HOME} replace />,
          },
          {
            // Không có trang /login riêng — đăng nhập dùng LoginModal (mở qua AppContext.openLoginModal).
            path: '/login',
            element: <Navigate to={ROUTES.HOME} replace />,
          },
          {
            path: ROUTES.AUTH_CALLBACK,
            lazy: lazyPage(() => import('./pages/auth-callback/AuthCallbackPage')),
          },

          // ── App shell — pathless layout: AppLayout bọc Navbar + Sidebar + Outlet ──
          {
            lazy: lazyPage(() => import('./layouts/AppLayout')),
            children: [
              { path: ROUTES.MARKETPLACE, lazy: lazyPage(() => import('./pages/marketplace/MarketplacePage')) },
              { path: ROUTES.PRICING,     lazy: lazyPage(() => import('./pages/pricing/PricingPage')) },
              { path: ROUTES.TUTORIALS,   lazy: lazyPage(() => import('./pages/tutorials/TutorialsPage')) },
              { path: ROUTES.ABOUT,       lazy: lazyPage(() => import('./pages/about/AboutUsPage')) },

              // Chính sách & pháp lý — công khai, không cần đăng nhập
              { path: ROUTES.POLICY_PRIVACY, lazy: lazyPage(() => import('./pages/policy/PrivacyPolicyPage')) },
              { path: ROUTES.POLICY_TERMS,   lazy: lazyPage(() => import('./pages/policy/TermsPage')) },
              { path: ROUTES.POLICY_REFUND,  lazy: lazyPage(() => import('./pages/policy/RefundPolicyPage')) },
              { path: ROUTES.POLICY_COOKIES, lazy: lazyPage(() => import('./pages/policy/CookiePolicyPage')) },

              // Dashboard — cần đăng nhập vì gọi API có JWT guard (/sites/my...)
              {
                element: <RequireAuth />,
                children: [
                  { path: ROUTES.DASHBOARD,           element: <Navigate to={ROUTES.DASHBOARD_PROJECTS} replace /> },
                  { path: ROUTES.DASHBOARD_PROJECTS,  lazy: lazyPage(() => import('./pages/dashboard/projects/ProjectsPage')) },
                  { path: ROUTES.DASHBOARD_ANALYTICS, lazy: lazyPage(() => import('./pages/dashboard/analytics/AnalyticsPage')) },
                  { path: ROUTES.DASHBOARD_QRCODES,   lazy: lazyPage(() => import('./pages/dashboard/qrcodes/QRCodesPage')) },
                  { path: ROUTES.DASHBOARD_SETTINGS,  lazy: lazyPage(() => import('./pages/dashboard/settings/SettingsPage')) },
                  { path: ROUTES.DASHBOARD_SUPPORT,   lazy: lazyPage(() => import('./pages/dashboard/support/SupportPage')) },
                ],
              },
            ],
          },

          // ── Template preview — full-screen, no AppLayout ───────────────────────
          {
            path: ROUTES.TEMPLATE_PREVIEW,
            lazy: lazyPage(() => import('./pages/marketplace/TemplatePreviewPage')),
          },

          // ── Template editor — full-screen, no AppLayout, cần đăng nhập để lưu (POST /sites) ──
          {
            element: <RequireAuth />,
            children: [
              {
                path: ROUTES.TEMPLATE_EDITOR_NEW,
                lazy: lazyPage(() => import('./pages/template-editor/TemplateEditorPage')),
                errorElement: (
                  <RouteErrorBoundary
                    title="Trình chỉnh sửa gặp sự cố"
                    message="Không thể tải trình chỉnh sửa. Vui lòng tải lại trang hoặc quay về Marketplace."
                  />
                ),
              },
              {
                path: ROUTES.TEMPLATE_EDITOR_EDIT,
                lazy: lazyPage(() => import('./pages/template-editor/TemplateEditorPage')),
                errorElement: (
                  <RouteErrorBoundary
                    title="Trình chỉnh sửa gặp sự cố"
                    message="Không thể tải trình chỉnh sửa. Vui lòng tải lại trang hoặc quay về Marketplace."
                  />
                ),
              },
            ],
          },

          // ── Kết quả thanh toán PayOS — full-screen, cần đăng nhập để đối soát đơn hàng ──
          {
            element: <RequireAuth />,
            children: [
              { path: ROUTES.PAYMENT_RESULT, lazy: lazyPage(() => import('./pages/payment-result/PaymentResultPage')) },
            ],
          },

          // ── Admin portal — luồng riêng biệt, không dùng AppLayout ──────────────
          {
            path: ROUTES.ADMIN_LOGIN,
            lazy: lazyPage(() => import('./pages/admin/login/AdminLoginPage')),
          },
          {
            element: <RequireAdmin />,
            children: [
              {
                lazy: lazyPage(() => import('./layouts/AdminLayout')),
                children: [
                  { path: ROUTES.ADMIN_DASHBOARD,    lazy: lazyPage(() => import('./pages/admin/dashboard/AdminDashboard')) },
                  { path: ROUTES.ADMIN_ANALYTICS,    lazy: lazyPage(() => import('./pages/admin/analytics/AdminAnalyticsPage')) },
                  { path: ROUTES.ADMIN_USERS,        lazy: lazyPage(() => import('./pages/admin/users/UsersPage')) },
                  { path: ROUTES.ADMIN_PAYMENTS,     lazy: lazyPage(() => import('./pages/admin/payments/PaymentsPage')) },
                  { path: ROUTES.ADMIN_TRANSACTIONS, lazy: lazyPage(() => import('./pages/admin/transactions/TransactionsPage')) },
                  { path: ROUTES.ADMIN_TEMPLATES,    lazy: lazyPage(() => import('./pages/admin/templates/AdminTemplatesPage')) },
                ],
              },
            ],
          },

          // ── Trang công khai đã xuất bản — không dùng AppLayout ─────────────────
          // errorElement RIÊNG: đây là trang khách hàng thật xem, quan trọng nhất
          // trong toàn bộ app — 1 site có customData hỏng không được kéo sập cả
          // app, và thông báo cũng không nên nhắc tới "trình chỉnh sửa"/thuật ngữ
          // nội bộ.
          {
            path: ROUTES.PUBLIC_SITE,
            lazy: lazyPage(() => import('./pages/public-site/PublicSitePage')),
            errorElement: (
              <RouteErrorBoundary
                title="Trang này đang gặp sự cố"
                message="Website này đang gặp sự cố hiển thị. Vui lòng thử tải lại trang sau ít phút."
              />
            ),
          },

          // ── Catch-all 404 — phải đặt cuối cùng ──────────────────────────────────
          {
            path: ROUTES.NOT_FOUND,
            lazy: lazyPage(() => import('./pages/not-found/NotFoundPage')),
          },
        ],
      },
    ]);
