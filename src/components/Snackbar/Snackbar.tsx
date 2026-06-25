// Snackbar toàn cục — slide từ dưới lên, tự tắt sau 3.5s, dark-glass style
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export interface SnackbarState {
  id: number;
  message: string;
  type: 'success' | 'error';
}

interface SnackbarProps {
  snackbar: SnackbarState;
  onDismiss: () => void;
}

export default function Snackbar({ snackbar, onDismiss }: SnackbarProps) {
  // Tự đóng sau 3.5 giây — reset khi có snackbar mới (id thay đổi)
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [snackbar.id, onDismiss]);

  const isSuccess = snackbar.type === 'success';

  return (
    <motion.div
      key={snackbar.id}
      initial={{ y: 64, opacity: 0, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 64, opacity: 0, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      // bottom-12 = 48px từ lề dưới
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-slate-800/80 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/30 border border-white/10 min-w-[280px] max-w-md"
      role="alert"
      aria-live="polite"
    >
      {isSuccess
        ? <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
        : <XCircle    className="h-5 w-5 text-rose-400    shrink-0" />
      }

      <span className="text-sm font-medium leading-snug flex-1">{snackbar.message}</span>

      <button
        onClick={onDismiss}
        className="ml-2 shrink-0 text-white/40 hover:text-white/90 transition-colors cursor-pointer"
        aria-label="Đóng thông báo"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
