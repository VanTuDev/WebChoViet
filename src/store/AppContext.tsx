import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SiteConfig } from '../types';
import Snackbar, { type SnackbarState } from '../components/Snackbar/Snackbar';
import ConfirmDialog, { type ConfirmDialogState } from '../components/ConfirmDialog/ConfirmDialog';
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
  // Snackbar — replaces window.alert
  showSnackbar: (message: string, type?: 'success' | 'error') => void;
  // ConfirmDialog — replaces window.confirm
  showConfirm: (dialog: ConfirmDialogState) => void;
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

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
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

  return (
    <AppContext.Provider
      value={{
        siteConfigs, siteConfigsLoaded, loadSiteConfigs,
        upsertSiteConfig, removeSiteConfig,
        showSnackbar,
        showConfirm,
        user, authLoading, isAuthenticated: !!user,
        login, logout, refreshUser,
      }}
    >
      {children}

      <AnimatePresence>
        {snackbar && <Snackbar snackbar={snackbar} onDismiss={() => setSnackbar(null)} />}
      </AnimatePresence>

      <ConfirmDialog dialog={confirmDialog} onCancel={() => setConfirmDialog(null)} />
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside <AppProvider>');
  return ctx;
}
