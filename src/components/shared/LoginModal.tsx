// Modal đăng nhập cho Landing Page — CHỈ hỗ trợ Google OAuth, giống hệt luồng thật ở
// LoginPage.tsx (/login). Hệ thống chưa có đăng ký/đăng nhập bằng email, nên modal này
// không có tab hay form email/password.
import { X, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getGoogleLoginUrl } from '../../services/authService';
import { ROUTES } from '../../config/routes';

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const { t } = useTranslation('common');
  const handleGoogle = () => {
    // Không set postLoginRedirect — mặc định đổ về Marketplace sau khi đăng nhập
    // (xem authService.ts), kể cả khi mở modal này từ Landing Page ("/").
    window.location.href = getGoogleLoginUrl();
  };

  return (
    <div
      className="fixed inset-0 z-[99990] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative animate-fade-in">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header strip */}
        <div className="bg-linear-to-r from-primary to-primary-container px-8 pt-7 pb-7 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/15 border border-white/25 mb-3 shadow-lg">
              <ShieldCheck className="h-5.5 w-5.5 text-white" />
            </div>
            <h1 className="font-lexend font-bold text-lg text-white mb-0.5">
              vngo<span className="text-orange-200">web</span>
            </h1>
            <p className="text-xs text-orange-200/70">{t('login.subtitle')}</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-6 space-y-4">
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2.5 h-11 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer active:scale-[0.98] shadow-sm"
          >
            <GoogleLogo />
            {t('login.googleButton')}
          </button>

          {/* Terms — <Link> thật (crawler đọc được), thay cho <button> không dẫn đi đâu trước đây */}
          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            {t('login.termsPrefix')}{' '}
            <Link to={ROUTES.POLICY_TERMS} onClick={onClose} className="text-primary hover:underline cursor-pointer">{t('login.termsLink')}</Link>
            {' '}{t('login.and')}{' '}
            <Link to={ROUTES.POLICY_PRIVACY} onClick={onClose} className="text-primary hover:underline cursor-pointer">{t('login.privacyLink')}</Link>
            {' '}{t('login.termsSuffix')}
          </p>
        </div>

        {/* Trust bar */}
        <div className="flex items-center justify-center gap-4 px-7 pb-5 text-[10px] text-slate-400 font-medium">
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> {t('login.ssl')}</span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> {t('login.noPassword')}</span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> {t('login.gdpr')}</span>
        </div>
      </div>
    </div>
  );
}
