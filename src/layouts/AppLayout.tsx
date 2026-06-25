// Shell layout: SiteHeader (top) + Sidebar (left) + <Outlet /> (nội dung page) + SiteFooter
import { Outlet } from 'react-router-dom';
import SiteHeader from '../components/shared/SiteHeader';
import SiteFooter from '../components/shared/SiteFooter';
import Sidebar from '../components/Sidebar/Sidebar';
import CreateSiteWizard from '../components/modals/CreateSiteWizard';
import LivePreviewModal from '../components/modals/LivePreviewModal';
import { useAppContext } from '../store/AppContext';

export default function AppLayout() {
  const { showCreateModal, previewingProject, setPreviewingProject } = useAppContext();

  return (
    // h-screen + overflow-hidden: chặn layout đúng tại 100vh, tránh tràn ngoài viewport
    <div className="h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-sans overflow-hidden">

      {/* ── Header chung — shrink-0 để không bị nén bởi flex column ─────── */}
      <SiteHeader variant="app" />

      {/* ── Body: min-h-0 là chìa khóa để flex child có thể co lại dưới content size ── */}
      <div className="flex-1 flex min-h-0">
        <Sidebar />

        <main className="flex-1 min-h-0 overflow-y-auto flex flex-col">
          {/* Outlet render nội dung của route hiện tại */}
          <Outlet />

          {/* ── Footer chung — dán đáy vùng scroll ──────────────────────── */}
          <div className="mt-auto">
            <SiteFooter />
          </div>
        </main>
      </div>

      {/* ── Global Modals (overlay toàn màn hình) ─────────────────────────── */}
      {showCreateModal && <CreateSiteWizard />}
      {previewingProject && (
        <LivePreviewModal
          project={previewingProject}
          onClose={() => setPreviewingProject(null)}
        />
      )}
    </div>
  );
}
