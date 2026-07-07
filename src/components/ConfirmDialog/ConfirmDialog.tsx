// Dialog xác nhận hành động — thay thế window.confirm(), có animation
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export interface ConfirmDialogState {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
  onConfirm: () => void;
}

interface ConfirmDialogProps {
  dialog: ConfirmDialogState | null;
  onCancel: () => void;
}

export default function ConfirmDialog({ dialog, onCancel }: ConfirmDialogProps) {
  if (!dialog) return null;

  const isDanger = dialog.variant === 'danger';

  const handleConfirm = () => {
    dialog.onConfirm();
    onCancel();
  };

  return (
    <AnimatePresence>
      {dialog && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[9990]"
            onClick={onCancel}
          />

          {/* Dialog box */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="fixed inset-0 z-[9991] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/15 border border-slate-100 w-full max-w-sm pointer-events-auto overflow-hidden">

              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mr-3 ${isDanger ? 'bg-rose-50' : 'bg-orange-50'}`}>
                  {isDanger
                    ? <Trash2 className="h-5 w-5 text-rose-500" />
                    : <AlertTriangle className="h-5 w-5 text-primary-container" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[15px] text-slate-900 leading-snug">{dialog.title}</h3>
                </div>
                <button
                  onClick={onCancel}
                  className="ml-3 shrink-0 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <p className="px-6 pb-6 text-sm text-slate-500 leading-relaxed">{dialog.message}</p>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 p-4">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  {dialog.cancelLabel ?? 'Hủy'}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all cursor-pointer active:scale-95 ${
                    isDanger
                      ? 'bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/25'
                      : 'bg-primary-container hover:bg-[#c93d18] shadow-md shadow-primary-container/25'
                  }`}
                >
                  {dialog.confirmLabel ?? 'Xác nhận'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
