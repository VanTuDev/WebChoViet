import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SiteConfig } from '../types';
import Snackbar, { type SnackbarState } from '../components/Snackbar/Snackbar';
import ConfirmDialog, { type ConfirmDialogState } from '../components/ConfirmDialog/ConfirmDialog';
import { getAllSiteConfigs, deleteSiteConfig as apiDeleteSiteConfig } from '../services/siteConfigService';
import { getUserId } from '../utils/userId';

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
}

// ── Context ────────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
  const snackbarCounter = useRef(0);

  // ── SiteConfig state ────────────────────────────────────────────────────────
  const [siteConfigs, setSiteConfigs] = useState<SiteConfig[]>([]);
  const [siteConfigsLoaded, setSiteConfigsLoaded] = useState(false);

  const loadSiteConfigs = async () => {
    try {
      const userId = getUserId();
      const all = await getAllSiteConfigs();
      const mine = all.filter(c => !c.createdBy || c.createdBy === userId);
      setSiteConfigs(mine);
    } catch {
      setSiteConfigs([]);
    } finally {
      setSiteConfigsLoaded(true);
    }
  };

  useEffect(() => { loadSiteConfigs(); }, []);

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
