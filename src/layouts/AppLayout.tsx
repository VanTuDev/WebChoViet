// Shell layout: SiteHeader (top) + Sidebar (left, md+) + <Outlet /> (nội dung page) + SiteFooter
// Mobile (<md): sidebar dọc ẩn đi, thay bằng MobileSidebarNav — thanh chip cuộn ngang
// dính đầu vùng nội dung, không chiếm bề ngang màn hình nhỏ.
import { Outlet } from 'react-router-dom';
import SiteHeader from '../components/shared/SiteHeader';
import SiteFooter from '../components/shared/SiteFooter';
import Sidebar, { MobileSidebarNav } from '../components/Sidebar/Sidebar';

export default function AppLayout() {
  return (
    <div className="h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-sans overflow-hidden">
      <SiteHeader variant="app" />

      <div className="flex-1 flex min-h-0">
        <Sidebar />

        <main className="flex-1 min-h-0 overflow-y-auto flex flex-col">
          <MobileSidebarNav />
          <Outlet />
          <div className="mt-auto">
            <SiteFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
