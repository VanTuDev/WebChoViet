import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { SiteConfig } from '../types';
import { type SnackbarState } from '../components/Snackbar/Snackbar';
import { type ConfirmDialogState } from '../components/ConfirmDialog/ConfirmDialog';
import { getAllSiteConfigs, deleteSiteConfig as apiDeleteSiteConfig } from '../services/siteConfigService';
import { type AuthUser, fetchMe, getToken, setToken, logoutRequest } from '../services/authService';

// ── Types ──────────────────────────────────────────────────────────────────────

interface AppContextType {
  // Template-editor sites
  siteConfigs: SiteConfig[];
  siteConfigsLoaded: boolean;
  loadSiteConfigs: () => Promise<void>;
  upsertSiteConfig: (config: SiteConfig) => void;
  removeSiteConfig: (id: string) => Promise<void>;
  // Snackbar — replaces window.alert. State + dismiss được render ở RootLayout
  // (bên trong RouterProvider, không phải ở đây — xem ghi chú tại AppProvider bên dưới).
  snackbar: SnackbarState | null;
  showSnackbar: (message: string, type?: 'success' | 'error') => void;
  dismissSnackbar: () => void;
  // ConfirmDialog — replaces window.confirm
  confirmDialog: ConfirmDialogState | null;
  showConfirm: (dialog: ConfirmDialogState) => void;
  dismissConfirm: () => void;
  // LoginModal — thay cho trang /login riêng, mở được từ bất kỳ đâu trong app
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  // Auth — Google OAuth session
  user: AuthUser | null;
  authLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ── Context ────────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

// AppProvider CHỈ cung cấp state/actions, KHÔNG tự render Snackbar/ConfirmDialog/LoginModal.
// Lý do: ở main.tsx, AppProvider bọc NGOÀI <RouterProvider>, nên bất kỳ JSX nào render
// trực tiếp ở đây đều nằm NGOÀI cây Router (createBrowserRouter/RouterProvider = data
// router, tự dựng context riêng chỉ trong route tree của nó). LoginModal dùng <Link> —
// component cần Router context — nên trước đây bị crash toàn bộ app với lỗi
// "Cannot destructure property 'basename' of useContext(...) as it is null" mỗi khi mở
// modal đăng nhập. Overlay UI được render ở RootLayout (src/layouts/RootLayout.tsx),
// đứng trong route tree, nơi Link hoạt động bình thường.
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const snackbarCounter = useRef(0);

  // ── Auth state ──────────────────────────────────────────────────────────────
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) { setAuthLoading(false); return; }
    fetchMe()
      .then(setUser)
      .finally(() => setAuthLoading(false));
  }, []);

  const login = async (token: string) => {
    setToken(token);
    setAuthLoading(true);
    const me = await fetchMe();
    setUser(me);
    setAuthLoading(false);
  };

  /** Gọi lại /auth/me — dùng sau khi gói thay đổi (vd vừa thanh toán xong) để cập nhật user.plan ngay. */
  const refreshUser = async () => {
    setUser(await fetchMe());
  };

  const logout = async () => {
    await logoutRequest(); // đã tự xoá token phía client bên trong
    setUser(null);
    setSiteConfigs([]);
    setSiteConfigsLoaded(false);
  };

  // ── SiteConfig state ────────────────────────────────────────────────────────
  // Backend scope sẵn theo owner qua JWT (GET /sites/my) — không cần lọc phía client.
  const [siteConfigs, setSiteConfigs] = useState<SiteConfig[]>([]);
  const [siteConfigsLoaded, setSiteConfigsLoaded] = useState(false);

  const loadSiteConfigs = async () => {
    try {
      setSiteConfigs(await getAllSiteConfigs());
    } catch {
      setSiteConfigs([]);
    } finally {
      setSiteConfigsLoaded(true);
    }
  };

  // Chỉ load site sau khi biết chắc trạng thái đăng nhập — /sites/my cần JWT hợp lệ.
  useEffect(() => {
    if (authLoading) return;
    if (!user) { setSiteConfigs([]); setSiteConfigsLoaded(true); return; }
    loadSiteConfigs();
  }, [authLoading, user]); // eslint-disable-line react-hooks/exhaustive-deps

  const upsertSiteConfig = (config: SiteConfig) => {
    setSiteConfigs(prev => {
      const idx = prev.findIndex(c => c.id === config.id);
      if (idx >= 0) return prev.map((c, i) => (i === idx ? config : c));
      return [config, ...prev];
    });
  };

  const removeSiteConfig = async (id: string) => {
    await apiDeleteSiteConfig(id);
    setSiteConfigs(prev => prev.filter(c => c.id !== id));
  };

  const showSnackbar = (message: string, type: 'success' | 'error' = 'success') =>
    setSnackbar({ id: ++snackbarCounter.current, message, type });

  const showConfirm = (dialog: ConfirmDialogState) => setConfirmDialog(dialog);
  const openLoginModal = () => setLoginModalOpen(true);

  return (
    <AppContext.Provider
      value={{
        siteConfigs, siteConfigsLoaded, loadSiteConfigs,
        upsertSiteConfig, removeSiteConfig,
        snackbar, showSnackbar, dismissSnackbar: () => setSnackbar(null),
        confirmDialog, showConfirm, dismissConfirm: () => setConfirmDialog(null),
        loginModalOpen, openLoginModal, closeLoginModal: () => setLoginModalOpen(false),
        user, authLoading, isAuthenticated: !!user,
        login, logout, refreshUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside <AppProvider>');
  return ctx;
}
