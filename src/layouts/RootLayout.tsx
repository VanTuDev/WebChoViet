// Root pathless layout — đứng ngay dưới RouterProvider, bọc toàn bộ route tree.
// Global overlay UI (Snackbar, ConfirmDialog, LoginModal) render ở đây, không ở AppProvider,
// vì LoginModal dùng <Link> — cần Router context, chỉ tồn tại trong cây route.
import { Outlet } from 'react-router-dom';
import { AnimatePresence, LazyMotion } from 'motion/react';
import Snackbar from '../components/Snackbar/Snackbar';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import LoginModal from '../components/shared/LoginModal';
import AdSenseLoader from '../components/shared/AdSenseLoader';
import { useAppContext } from '../store/AppContext';
import { OnboardingProvider } from '../context/OnboardingContext';

// Animation dùng m.* (không phải motion.*) + tải tính năng animation sau, tách khỏi
// bundle đầu — xem utils/motionFeatures.ts.
const loadMotionFeatures = () => import('../utils/motionFeatures').then(mod => mod.default);

export default function RootLayout() {
  const { snackbar, dismissSnackbar, confirmDialog, dismissConfirm, loginModalOpen, closeLoginModal } = useAppContext();

  return (
    // OnboardingProvider (hướng dẫn sử dụng lần đầu) đặt ở đây — cần Router context
    // (useLocation/useNavigate) để tự lái người dùng qua từng trang trong tour, và
    // tự render UI overlay của nó (Router context không có ở AppProvider, xem
    // comment phía trên).
    <LazyMotion features={loadMotionFeatures}>
      <OnboardingProvider>
        <AdSenseLoader />
        <Outlet />

        <AnimatePresence>
          {snackbar && <Snackbar snackbar={snackbar} onDismiss={dismissSnackbar} />}
        </AnimatePresence>

        <ConfirmDialog dialog={confirmDialog} onCancel={dismissConfirm} />

        {loginModalOpen && <LoginModal onClose={closeLoginModal} />}
      </OnboardingProvider>
    </LazyMotion>
  );
}
