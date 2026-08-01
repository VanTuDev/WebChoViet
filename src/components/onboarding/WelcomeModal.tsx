// Màn hình chào mừng lần đầu — mở đầu cho hướng dẫn BẮT BUỘC (xem
// OnboardingContext). Cố tình KHÔNG có nút đóng, không bấm nền để tắt, không
// ESC — chỉ có 1 lối duy nhất là bấm bắt đầu.
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Bot, LayoutTemplate, Wand2, Rocket, Sparkles } from 'lucide-react';

interface Props {
  open: boolean;
  onStart: () => void;
}

const FEATURE_ICONS = [LayoutTemplate, Wand2, Rocket];

export default function WelcomeModal({ open, onStart }: Props) {
  const { t } = useTranslation('onboarding');

  const features = t('welcome.features', { returnObjects: true }) as string[];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="onboarding-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/55 backdrop-blur-sm z-[9995]"
          />

          <motion.div
            key="onboarding-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-welcome-title"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="fixed inset-0 z-[9996] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden shadow-2xl shadow-fnb-red/20 pointer-events-auto bg-white">

              {/* ── Hero: nhân vật Trợ lý AI ─────────────────────────────────── */}
              <div className="relative overflow-hidden bg-gradient-to-br from-fnb-red via-fnb-orange to-fnb-amber px-6 pt-8 pb-10 text-center">
                {/* Đốm sáng trang trí phía sau — tạo chiều sâu kiểu "AI glow" */}
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full bg-white/15 blur-3xl" aria-hidden="true" />

                <div className="relative inline-flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm">
                  <Sparkles className="h-3 w-3" />
                  {t('welcome.badge')}
                </div>

                <div className="relative mx-auto mb-4 w-18 h-18 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-white/25 tour-avatar-pulse" aria-hidden="true" />
                  <span className="absolute inset-1.5 rounded-full bg-white/25 tour-avatar-pulse [animation-delay:0.6s]" aria-hidden="true" />
                  <div className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Bot className="h-7 w-7 text-fnb-red" />
                  </div>
                </div>

                <h2 id="onboarding-welcome-title" className="relative text-xl sm:text-2xl font-display font-extrabold text-white leading-snug">
                  {t('welcome.title')}
                </h2>
                <p className="relative mt-2 text-sm text-white/90 leading-relaxed max-w-xs mx-auto">
                  {t('welcome.subtitle')}
                </p>
              </div>

              {/* ── Nội dung: điểm nhanh những gì sẽ được hướng dẫn ─────────── */}
              <div className="px-6 pt-5 pb-6 space-y-4">
                <ul className="space-y-2.5">
                  {features.map((label, i) => {
                    const Icon = FEATURE_ICONS[i] ?? Sparkles;
                    return (
                      <li key={label} className="flex items-center gap-3 text-sm text-gray-700">
                        <span className="shrink-0 w-8 h-8 rounded-xl bg-fnb-cream text-fnb-orange flex items-center justify-center">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-medium">{label}</span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={onStart}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-fnb-red to-fnb-orange text-white text-sm font-bold shadow-lg shadow-fnb-red/30 hover:shadow-xl hover:shadow-fnb-red/40 transition-all cursor-pointer active:scale-95"
                >
                  <Sparkles className="h-4 w-4" />
                  {t('welcome.accept')}
                </button>

                <p className="text-center text-[11px] text-gray-400 leading-relaxed">
                  {t('welcome.footnote')}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
