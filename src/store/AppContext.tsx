import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Project, Metric, SiteConfig } from '../types';
import { INITIAL_PROJECTS, INITIAL_METRICS } from '../data';
import Snackbar, { type SnackbarState } from '../components/Snackbar/Snackbar';
import ConfirmDialog, { type ConfirmDialogState } from '../components/ConfirmDialog/ConfirmDialog';
import { getAllSiteConfigs, deleteSiteConfig as apiDeleteSiteConfig } from '../services/siteConfigService';
import { getUserId } from '../utils/userId';

// ── Types ──────────────────────────────────────────────────────────────────────

interface AppContextType {
  // Data
  projects: Project[];
  metrics: Metric[];
  // Template-editor sites
  siteConfigs: SiteConfig[];
  siteConfigsLoaded: boolean;
  loadSiteConfigs: () => Promise<void>;
  upsertSiteConfig: (config: SiteConfig) => void;
  removeSiteConfig: (id: string) => Promise<void>;
  // Preview modal
  previewingProject: Project | null;
  setPreviewingProject: (project: Project | null) => void;
  // Create wizard modal
  showCreateModal: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  // CRUD
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  toggleProjectStatus: (id: string) => void;
  // Metrics helper
  bumpMetric: (index: number, delta: number) => void;
  // Snackbar toàn cục — thay thế window.alert
  showSnackbar: (message: string, type?: 'success' | 'error') => void;
  // ConfirmDialog toàn cục — thay thế window.confirm
  showConfirm: (dialog: ConfirmDialogState) => void;
}

// ── Context ────────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [metrics, setMetrics] = useState<Metric[]>(INITIAL_METRICS);
  const [previewingProject, setPreviewingProject] = useState<Project | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
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
      // Show only configs belonging to this user (or all if no createdBy yet)
      const mine = all.filter(c => !c.createdBy || c.createdBy === userId);
      setSiteConfigs(mine);
    } catch {
      setSiteConfigs([]);
    } finally {
      setSiteConfigsLoaded(true);
    }
  };

  // Load once on app start
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

  // ── Old Project CRUD ────────────────────────────────────────────────────────
  const addProject = (project: Project) =>
    setProjects(prev => [project, ...prev]);

  const updateProject = (updated: Project) =>
    setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));

  const deleteProject = (id: string) =>
    setProjects(prev => prev.filter(p => p.id !== id));

  const toggleProjectStatus = (id: string) =>
    setProjects(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === 'Active' ? 'Draft' : 'Active' }
          : p,
      ),
    );

  const bumpMetric = (index: number, delta: number) =>
    setMetrics(prev =>
      prev.map((m, i) => {
        if (i !== index) return m;
        const current = parseInt(m.value.replace(/[,.]/g, ''), 10) || 0;
        return { ...m, value: (current + delta).toLocaleString('vi-VN') };
      }),
    );

  const showSnackbar = (message: string, type: 'success' | 'error' = 'success') =>
    setSnackbar({ id: ++snackbarCounter.current, message, type });

  const showConfirm = (dialog: ConfirmDialogState) => setConfirmDialog(dialog);
  const dismissConfirm = () => setConfirmDialog(null);
  const dismissSnackbar = () => setSnackbar(null);

  return (
    <AppContext.Provider
      value={{
        projects, metrics, previewingProject, setPreviewingProject,
        siteConfigs, siteConfigsLoaded, loadSiteConfigs,
        upsertSiteConfig, removeSiteConfig,
        showCreateModal,
        openCreateModal: () => setShowCreateModal(true),
        closeCreateModal: () => setShowCreateModal(false),
        addProject, updateProject, deleteProject, toggleProjectStatus, bumpMetric,
        showSnackbar,
        showConfirm,
      }}
    >
      {children}

      {/* Snackbar — thay window.alert, slide từ dưới lên */}
      <AnimatePresence>
        {snackbar && <Snackbar snackbar={snackbar} onDismiss={dismissSnackbar} />}
      </AnimatePresence>

      {/* ConfirmDialog — thay window.confirm, modal có animation */}
      <ConfirmDialog dialog={confirmDialog} onCancel={dismissConfirm} />
    </AppContext.Provider>
  );
}

// Hook an toàn — throw khi dùng ngoài Provider
export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside <AppProvider>');
  return ctx;
}
