// ─── Nguồn duy nhất quản lý tất cả đường dẫn trong ứng dụng ───────────────────
// Thay đổi đường dẫn tại đây → áp dụng ngay toàn bộ app, không sót chỗ nào.

export const ROUTES = {
  // ── Public ──────────────────────────────────────────────────────────────────
  HOME:          '/',
  AUTH_CALLBACK: '/auth/callback', // BE redirect về đây sau khi Google OAuth thành công
  NOT_FOUND:     '*',

  // ── App shell (dùng AppLayout: Navbar + Sidebar) ────────────────────────────
  MARKETPLACE: '/marketplace',
  PRICING:     '/pricing',
  TUTORIALS:   '/tutorials',
  ABOUT:       '/about',

  // ── Thanh toán (PayOS) ───────────────────────────────────────────────────────
  PAYMENT_RESULT: '/payment-result', // returnUrl/cancelUrl PayOS đều trỏ về đây

  // ── Chính sách & pháp lý ─────────────────────────────────────────────────────
  POLICY_PRIVACY: '/policy/privacy',
  POLICY_TERMS:   '/policy/terms',
  POLICY_REFUND:  '/policy/refund',
  POLICY_COOKIES: '/policy/cookies',

  // ── Dashboard group ─────────────────────────────────────────────────────────
  DASHBOARD:            '/dashboard',              // redirect → DASHBOARD_PROJECTS
  DASHBOARD_PROJECTS:   '/dashboard/projects',
  DASHBOARD_ANALYTICS:  '/dashboard/analytics',
  DASHBOARD_QRCODES:    '/dashboard/qrcodes',
  DASHBOARD_SETTINGS:   '/dashboard/settings',
  DASHBOARD_SUPPORT:    '/dashboard/support',

  // ── Standalone (không có Navbar/Sidebar) ────────────────────────────────────
  TEMPLATE_PREVIEW: '/marketplace/preview/:templateId', // xem trước template thật
  TEMPLATE_EDITOR_NEW:  '/template-editor/new',          // tạo site mới từ template
  TEMPLATE_EDITOR_EDIT: '/template-editor/:siteId',      // chỉnh sửa site đã tạo

  // ── Trang công khai đã xuất bản ─────────────────────────────────────────────
  PUBLIC_SITE:        '/:slug',

  // ── Admin portal (luồng riêng biệt) ─────────────────────────────────────────
  ADMIN_LOGIN:        '/admin/login',
  ADMIN_DASHBOARD:    '/admin/dashboard',
  ADMIN_ANALYTICS:    '/admin/analytics',
  ADMIN_USERS:        '/admin/users',
  ADMIN_PAYMENTS:     '/admin/payments',
  ADMIN_TRANSACTIONS: '/admin/transactions',
  ADMIN_TEMPLATES:    '/admin/templates',
} as const;
