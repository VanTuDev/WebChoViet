// ─── Nguồn duy nhất quản lý tất cả đường dẫn trong ứng dụng ───────────────────
// Thay đổi đường dẫn tại đây → áp dụng ngay toàn bộ app, không sót chỗ nào.

export const ROUTES = {
  // ── Public ──────────────────────────────────────────────────────────────────
  HOME:        '/',
  LOGIN:       '/login',
  NOT_FOUND:   '*',

  // ── App shell (dùng AppLayout: Navbar + Sidebar) ────────────────────────────
  MARKETPLACE: '/marketplace',
  PRICING:     '/pricing',
  TUTORIALS:   '/tutorials',

  // ── Dashboard group ─────────────────────────────────────────────────────────
  DASHBOARD:            '/dashboard',              // redirect → DASHBOARD_PROJECTS
  DASHBOARD_PROJECTS:   '/dashboard/projects',
  DASHBOARD_ANALYTICS:  '/dashboard/analytics',
  DASHBOARD_QRCODES:    '/dashboard/qrcodes',
  DASHBOARD_SETTINGS:   '/dashboard/settings',
  DASHBOARD_SUPPORT:    '/dashboard/support',

  // ── Standalone (không có Navbar/Sidebar) ────────────────────────────────────
  EDITOR: '/editor/:projectId',                    // dùng editorPath() để build URL cụ thể
  TEMPLATE_PREVIEW: '/marketplace/preview/:templateId', // xem trước template thật
  TEMPLATE_EDITOR_NEW:  '/template-editor/new',          // tạo site mới từ template
  TEMPLATE_EDITOR_EDIT: '/template-editor/:siteId',      // chỉnh sửa site đã tạo

  // ── Trang công khai đã xuất bản ─────────────────────────────────────────────
  PUBLIC_SITE:        '/:slug',

  // ── Admin portal (luồng riêng biệt) ─────────────────────────────────────────
  ADMIN_LOGIN:        '/admin/login',
  ADMIN_DASHBOARD:    '/admin/dashboard',
  ADMIN_USERS:        '/admin/users',
  ADMIN_PAYMENTS:     '/admin/payments',
  ADMIN_TRANSACTIONS: '/admin/transactions',
} as const;

// ── Helper builders ─────────────────────────────────────────────────────────────

/** Tạo URL editor cho một project cụ thể: editorPath('proj-123') → '/editor/proj-123' */
export const editorPath = (projectId: string) => `/editor/${projectId}` as const;

// ── Type helpers ────────────────────────────────────────────────────────────────

/** Union type của tất cả route values — dùng để type-check navigate() calls */
export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
