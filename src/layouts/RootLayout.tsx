// Root pathless layout — đứng ngay dưới RouterProvider, bọc toàn bộ route tree.
// Global overlay UI (Snackbar, ConfirmDialog, LoginModal) render ở đây, không ở AppProvider,
// vì LoginModal dùng <Link> — cần Router context, chỉ tồn tại trong cây route.
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Snackbar from '../components/Snackbar/Snackbar';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import LoginModal from '../components/shared/LoginModal';
import { useAppContext } from '../store/AppContext';

export default function RootLayout() {
  const { snackbar, dismissSnackbar, confirmDialog, dismissConfirm, loginModalOpen, closeLoginModal } = useAppContext();

  return (
    <>
      <Outlet />

      <AnimatePresence>
        {snackbar && <Snackbar snackbar={snackbar} onDismiss={dismissSnackbar} />}
      </AnimatePresence>

      <ConfirmDialog dialog={confirmDialog} onCancel={dismissConfirm} />

      {loginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </>
  );
}
