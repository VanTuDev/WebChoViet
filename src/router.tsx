import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './config/routes';
import { getTenantSlug } from './utils/tenant';
import RouteErrorBoundary from './components/error/RouteErrorBoundary';
import LandingPage from './pages/landing/LandingPage';
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import RootLayout from './layouts/RootLayout';
import AppLayout from './layouts/AppLayout';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import AboutUsPage from './pages/about/AboutUsPage';
import ProjectsPage from './pages/dashboard/projects/ProjectsPage';
import AnalyticsPage from './pages/dashboard/analytics/AnalyticsPage';
import QRCodesPage from './pages/dashboard/qrcodes/QRCodesPage';
import SettingsPage from './pages/dashboard/settings/SettingsPage';
import SupportPage from './pages/dashboard/support/SupportPage';
import PricingPage from './pages/pricing/PricingPage';
import TutorialsPage from './pages/tutorials/TutorialsPage';
import TemplatePreviewPage from './pages/marketplace/TemplatePreviewPage';
import TemplateEditorPage from './pages/template-editor/TemplateEditorPage';
import PaymentResultPage from './pages/payment-result/PaymentResultPage';
import PrivacyPolicyPage from './pages/policy/PrivacyPolicyPage';
import TermsPage from './pages/policy/TermsPage';
import RefundPolicyPage from './pages/policy/RefundPolicyPage';
import CookiePolicyPage from './pages/policy/CookiePolicyPage';
import RequireAuth from './components/auth/RequireAuth';
import RequireAdmin from './components/auth/RequireAdmin';

import AdminLayout from './layouts/AdminLayout';
import AdminLoginPage from './pages/admin/login/AdminLoginPage';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard';
import AdminAnalyticsPage from './pages/admin/analytics/AdminAnalyticsPage';
import UsersPage from './pages/admin/users/UsersPage';
import PaymentsPage from './pages/admin/payments/PaymentsPage';
import TransactionsPage from './pages/admin/transactions/TransactionsPage';
import AdminTemplatesPage from './pages/admin/templates/AdminTemplatesPage';
import PublicSitePage from './pages/public-site/PublicSitePage';

const tenantSlug = getTenantSlug();

// ── Tenant subdomain ({slug}.vngoweb.com) — hostname đã tự xác định đây là site
// công khai của 1 khách hàng, nên MỌI path đều render thẳng PublicSitePage, bỏ qua
// toàn bộ route app chính (marketplace/dashboard/admin...). Route app chính vẫn giữ
// nguyên bên dưới để phục vụ domain gốc vngoweb.com và URL cũ /{slug} (giai đoạn
// chuyển tiếp — xem readmeToDo.md).
export const router = tenantSlug
  ? createBrowserRouter([
      {
        element: <RootLayout />,
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            path: '*',
            element: <PublicSitePage slug={tenantSlug} />,
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
            element: <AuthCallbackPage />,
          },

          // ── App shell — pathless layout: AppLayout bọc Navbar + Sidebar + Outlet ──
          {
            element: <AppLayout />,
            children: [
              { path: ROUTES.MARKETPLACE, element: <MarketplacePage /> },
              { path: ROUTES.PRICING,     element: <PricingPage /> },
              { path: ROUTES.TUTORIALS,   element: <TutorialsPage /> },
              { path: ROUTES.ABOUT,       element: <AboutUsPage /> },

              // Chính sách & pháp lý — công khai, không cần đăng nhập
              { path: ROUTES.POLICY_PRIVACY, element: <PrivacyPolicyPage /> },
              { path: ROUTES.POLICY_TERMS,   element: <TermsPage /> },
              { path: ROUTES.POLICY_REFUND,  element: <RefundPolicyPage /> },
              { path: ROUTES.POLICY_COOKIES, element: <CookiePolicyPage /> },

              // Dashboard — cần đăng nhập vì gọi API có JWT guard (/sites/my...)
              {
                element: <RequireAuth />,
                children: [
                  { path: ROUTES.DASHBOARD,           element: <Navigate to={ROUTES.DASHBOARD_PROJECTS} replace /> },
                  { path: ROUTES.DASHBOARD_PROJECTS,  element: <ProjectsPage /> },
                  { path: ROUTES.DASHBOARD_ANALYTICS, element: <AnalyticsPage /> },
                  { path: ROUTES.DASHBOARD_QRCODES,   element: <QRCodesPage /> },
                  { path: ROUTES.DASHBOARD_SETTINGS,  element: <SettingsPage /> },
                  { path: ROUTES.DASHBOARD_SUPPORT,   element: <SupportPage /> },
                ],
              },
            ],
          },

          // ── Template preview — full-screen, no AppLayout ───────────────────────
          {
            path: ROUTES.TEMPLATE_PREVIEW,
            element: <TemplatePreviewPage />,
          },

          // ── Template editor — full-screen, no AppLayout, cần đăng nhập để lưu (POST /sites) ──
          {
            element: <RequireAuth />,
            children: [
              {
                path: ROUTES.TEMPLATE_EDITOR_NEW,
                element: <TemplateEditorPage />,
                errorElement: (
                  <RouteErrorBoundary
                    title="Trình chỉnh sửa gặp sự cố"
                    message="Không thể tải trình chỉnh sửa. Vui lòng tải lại trang hoặc quay về Marketplace."
                  />
                ),
              },
              {
                path: ROUTES.TEMPLATE_EDITOR_EDIT,
                element: <TemplateEditorPage />,
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
              { path: ROUTES.PAYMENT_RESULT, element: <PaymentResultPage /> },
            ],
          },

          // ── Admin portal — luồng riêng biệt, không dùng AppLayout ──────────────
          {
            path: ROUTES.ADMIN_LOGIN,
            element: <AdminLoginPage />,
          },
          {
            element: <RequireAdmin />,
            children: [
              {
                element: <AdminLayout />,
                children: [
                  { path: ROUTES.ADMIN_DASHBOARD,    element: <AdminDashboard /> },
                  { path: ROUTES.ADMIN_ANALYTICS,    element: <AdminAnalyticsPage /> },
                  { path: ROUTES.ADMIN_USERS,        element: <UsersPage /> },
                  { path: ROUTES.ADMIN_PAYMENTS,     element: <PaymentsPage /> },
                  { path: ROUTES.ADMIN_TRANSACTIONS, element: <TransactionsPage /> },
                  { path: ROUTES.ADMIN_TEMPLATES,    element: <AdminTemplatesPage /> },
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
            element: <PublicSitePage />,
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
            element: <NotFoundPage />,
          },
        ],
      },
    ]);
