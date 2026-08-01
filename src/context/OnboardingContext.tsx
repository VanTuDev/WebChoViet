// ─── Hướng dẫn sử dụng lần đầu (product tour) — BẮT BUỘC, không thể thoát ──
// Đặt BÊN TRONG cây Router (render ở RootLayout, không phải AppProvider ở
// main.tsx) vì cần useLocation/useNavigate để: (1) biết khi nào người dùng đã
// điều hướng sang bước kế thật sự (họ tự bấm nút/link thật trên trang, không
// phải overlay giả lập), (2) tự lái người dùng về đúng trang khi bấm "Quay
// lại" hoặc mở lại hướng dẫn từ menu trợ giúp.
//
// Cố tình KHÔNG có nút bỏ qua/đóng ở modal chào mừng lẫn overlay tour — mọi
// tài khoản mới đều phải hoàn thành trọn vẹn (finishTour) mới được đánh dấu
// 'done'; nếu họ thoát ngang (đóng tab, back trình duyệt...) thì lần vào lại
// sau sẽ được hỏi lại từ đầu, không có cách nào tắt vĩnh viễn ngoài hoàn tất.
//
// Trạng thái lưu localStorage theo TỪNG user (không theo trình duyệt) — nhiều
// tài khoản dùng chung máy không bị lệch trạng thái của nhau.
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { useAppContext } from '../store/AppContext';
import { TOUR_STEPS, stepMatchesPath, type TourStep } from '../onboarding/steps';
import WelcomeModal from '../components/onboarding/WelcomeModal';
import TourOverlay from '../components/onboarding/TourOverlay';

type OnboardingStatus = 'new' | 'done';

const STORAGE_PREFIX = 'wcv_onboarding_status_v1';

function readStatus(userId: string | null | undefined): OnboardingStatus {
  if (!userId) return 'new';
  try {
    if (localStorage.getItem(`${STORAGE_PREFIX}:${userId}`) === 'done') return 'done';
  } catch {
    // localStorage có thể bị chặn (chế độ ẩn danh nghiêm ngặt) — coi như chưa từng thấy hướng dẫn
  }
  return 'new';
}

function markDone(userId: string | null | undefined) {
  if (!userId) return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}:${userId}`, 'done');
  } catch {
    // Bỏ qua — không có localStorage thì đơn giản là lần sau lại hỏi lại, không nghiêm trọng
  }
}

// Những route KHÔNG được mời hướng dẫn dù user vừa đăng nhập lần đầu — trang
// chuyển tiếp (auth-callback) hoặc luồng hoàn toàn khác (admin) không có các
// phần tử [data-tour] mà tour cần trỏ tới.
function isExcludedFromPrompt(pathname: string): boolean {
  return pathname === ROUTES.AUTH_CALLBACK || pathname.startsWith('/admin');
}

interface OnboardingContextType {
  /** Màn hình chào mừng trước khi vào tour đang mở */
  welcomeOpen: boolean;
  /** Đang trong 1 phiên hướng dẫn từng bước */
  active: boolean;
  stepIndex: number;
  totalSteps: number;
  currentStep: TourStep | null;
  /** Bắt đầu/mở lại hướng dẫn — tự điều hướng về Dashboard nếu cần, dùng cho cả nút chào mừng lẫn nút trợ giúp trên header */
  startTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  finishTour: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const { user, authLoading, showSnackbar } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const hasPromptedRef = useRef(false);

  // Đọc lại giá trị mới nhất qua ref (không phụ thuộc dependency array của effect
  // theo-dõi pathname bên dưới) — tránh tình huống race: gọi navigate() rồi set
  // active/stepIndex trong cùng 1 hàm xử lý sự kiện, nhưng pathname từ router
  // chưa kịp cập nhật ở lần render đó, khiến effect tưởng nhầm là "người dùng vừa
  // rời khỏi bước hiện tại" và thoát hướng dẫn ngay khi vừa bắt đầu.
  const activeRef = useRef(active);
  activeRef.current = active;
  const stepIndexRef = useRef(stepIndex);
  stepIndexRef.current = stepIndex;

  // ── Mời hướng dẫn lần đầu: bất kỳ trang app nào sau khi đăng nhập (KHÔNG chỉ
  // riêng Dashboard — sau OAuth, user thường được đưa thẳng tới /marketplace,
  // xem consumePostLoginRedirect() ở authService), nếu tài khoản này chưa từng
  // hoàn tất thì hỏi 1 lần trong phiên này. ───────────────────────────────────
  useEffect(() => {
    if (authLoading || !user) return;
    if (hasPromptedRef.current) return;
    if (isExcludedFromPrompt(pathname)) return;
    if (readStatus(user._id) !== 'new') return;

    const timer = setTimeout(() => {
      hasPromptedRef.current = true;
      setWelcomeOpen(true);
    }, 700); // chờ trang render xong, tránh giật màn hình
    return () => clearTimeout(timer);
  }, [authLoading, user, pathname]);

  // ── Theo dõi điều hướng thật: tự sang bước kế khi URL khớp route bước kế
  // (người dùng vừa bấm đúng nút/link thật được gợi ý). Overlay che kín màn
  // hình trừ đúng phần tử mục tiêu nên về lý thuyết không còn gì khác để bấm —
  // nhánh dưới chỉ là lưới an toàn cho các lối thoát ngoài tầm overlay (nút
  // back trình duyệt, gõ thẳng URL...), KHÔNG phải nút "bỏ qua" lộ ra ngoài
  // giao diện. Không đánh dấu 'done' — lần vào lại sẽ được hỏi lại từ đầu. ────
  useEffect(() => {
    if (!activeRef.current) return;
    const idx = stepIndexRef.current;
    const step = TOUR_STEPS[idx];
    if (!step) return;
    if (stepMatchesPath(step, pathname)) return; // vẫn đúng trang của bước hiện tại

    if (step.advance === 'route') {
      const next = TOUR_STEPS[idx + 1];
      if (next && stepMatchesPath(next, pathname)) {
        setStepIndex(idx + 1);
        return;
      }
    }

    setActive(false);
    showSnackbar('Hướng dẫn đã tạm dừng do rời khỏi trang. Mở lại từ nút trợ giúp trên thanh menu để tiếp tục.', 'success');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const startTour = useCallback(() => {
    if (pathname !== ROUTES.DASHBOARD_PROJECTS) navigate(ROUTES.DASHBOARD_PROJECTS);
    setWelcomeOpen(false);
    setStepIndex(0);
    setActive(true);
  }, [pathname, navigate]);

  const nextStep = useCallback(() => {
    setStepIndex(i => Math.min(i + 1, TOUR_STEPS.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setStepIndex(i => {
      if (i <= 0) return i;
      const prev = TOUR_STEPS[i - 1];
      if (!stepMatchesPath(prev, pathname)) navigate(prev.route);
      return i - 1;
    });
  }, [pathname, navigate]);

  const finishTour = useCallback(() => {
    setActive(false);
    setStepIndex(0);
    markDone(user?._id);
    showSnackbar('Tuyệt vời! Giờ hãy thử tự tay hoàn thiện website của riêng bạn.', 'success');
  }, [user, showSnackbar]);

  const currentStep = active ? (TOUR_STEPS[stepIndex] ?? null) : null;

  return (
    <OnboardingContext.Provider
      value={{
        welcomeOpen, active, stepIndex, totalSteps: TOUR_STEPS.length, currentStep,
        startTour, nextStep, prevStep, finishTour,
      }}
    >
      {children}
      <WelcomeModal open={welcomeOpen} onStart={startTour} />
      <TourOverlay />
    </OnboardingContext.Provider>
  );
}

export function useOnboarding(): OnboardingContextType {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used inside <OnboardingProvider>');
  return ctx;
}
