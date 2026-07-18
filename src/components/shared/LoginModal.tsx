// Modal đăng nhập — CHỈ hỗ trợ Google OAuth. Hệ thống chưa có đăng ký/đăng nhập
// bằng email, nên modal này không có tab hay form email/password.
import { X, ShieldCheck, Check, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getGoogleLoginUrl } from '../../services/authService';
import { ROUTES } from '../../config/routes';
import Wordmark from './Wordmark';

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
    // Không set postLoginRedirect — mặc định đổ về Marketplace sau khi đăng nhập.
    window.location.href = getGoogleLoginUrl();
  };

  const features: string[] = [
    t('login.feat1'),
    t('login.feat2'),
    t('login.feat3'),
  ];

  return (
    <div
      className="fixed inset-0 z-99990 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-190 overflow-hidden relative animate-fade-in flex">

        {/* Close button — absolute top-right của card (nằm trên right panel trắng) */}
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/8 hover:bg-black/12 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── LEFT PANEL — brand / marketing (md+) ─────────────────────── */}
        <div
          className="hidden md:flex flex-col w-[46%] shrink-0 relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #ff6b2c 0%, #e8491f 38%, #b83510 70%, #8b2208 100%)' }}
        >
          {/* Dot matrix pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          />
          {/* Glow blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-red-950/50 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col h-full p-8">
            {/* Wordmark — inline để override màu trên nền tối */}
            <p className="font-lexend font-extrabold tracking-tight text-[22px] text-white leading-none mb-2">
              vngo<span className="text-orange-200">web</span>
            </p>
            <p className="text-white/65 text-[13px] font-light leading-snug mb-8 pr-4">
              {t('login.headline')}
            </p>

            {/* Browser mockup illustration */}
            <div className="flex-1 flex items-center justify-center py-2">
              <div className="w-full max-w-50 rounded-xl overflow-hidden shadow-2xl border border-white/15 select-none">
                {/* Browser chrome */}
                <div className="bg-white/20 px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-red-300/80" />
                    <div className="w-2 h-2 rounded-full bg-amber-300/80" />
                    <div className="w-2 h-2 rounded-full bg-green-300/80" />
                  </div>
                  <div className="flex-1 h-3.5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden px-1">
                    <span className="text-white/50 text-[8px] font-mono truncate">vngoweb.com/your-shop</span>
                  </div>
                </div>
                {/* Page preview */}
                <div className="bg-white/8 p-2.5 space-y-2">
                  {/* Hero section mock */}
                  <div className="h-14 rounded-lg relative overflow-hidden bg-linear-to-r from-orange-400/50 to-amber-300/25">
                    <div className="absolute inset-0 flex items-center px-3">
                      <div className="space-y-1.5">
                        <div className="h-2 w-16 bg-white/80 rounded-full" />
                        <div className="h-1.5 w-10 bg-white/50 rounded-full" />
                        <div className="mt-0.5 h-4 w-14 rounded-full border border-white/40 flex items-center justify-center">
                          <div className="h-1 w-7 bg-white/70 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Cards row */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="h-9 rounded-md bg-white/20 border border-white/10 flex flex-col items-center justify-center gap-1 p-1">
                        <div className="w-4 h-1.5 bg-white/55 rounded-full" />
                        <div className="w-6 h-1 bg-white/30 rounded-full" />
                      </div>
                    ))}
                  </div>
                  {/* Info bar */}
                  <div className="h-5 rounded-md bg-white/15 flex items-center justify-center gap-3 px-2">
                    <div className="w-7 h-1 bg-white/45 rounded-full" />
                    <div className="w-px h-2.5 bg-white/20" />
                    <div className="w-7 h-1 bg-white/45 rounded-full" />
                    <div className="w-px h-2.5 bg-white/20" />
                    <div className="w-7 h-1 bg-white/45 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature list */}
            <ul className="space-y-3 mt-2">
              {features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13px] text-white/82">
                  <span className="w-5 h-5 rounded-full bg-white/20 border border-white/25 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── RIGHT PANEL — action ─────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 bg-[#fff9f3]">

          {/* Mobile: compact brand header */}
          <div className="md:hidden flex flex-col items-center mb-7">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-3 shadow-lg shadow-primary/35">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <Wordmark className="text-2xl" />
          </div>

          {/* Desktop greeting */}
          <div className="hidden md:block mb-7">
            <h2 className="text-[22px] font-bold text-on-surface leading-tight">
              {t('login.ctaHeading')}
            </h2>
            <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              {t('login.subtitle')}
            </p>
          </div>

          {/* Mobile greeting */}
          <div className="md:hidden text-center mb-6">
            <h2 className="text-xl font-bold text-on-surface">{t('login.ctaHeading')}</h2>
            <p className="text-sm text-on-surface-variant mt-1">{t('login.subtitle')}</p>
          </div>

          {/* Google sign-in button */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 h-12 bg-white border-2 border-outline-variant rounded-2xl text-sm font-semibold text-on-surface hover:border-primary hover:shadow-lg hover:shadow-primary/15 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
          >
            <GoogleLogo />
            {t('login.googleButton')}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-outline-variant" />
            <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
            <div className="h-px flex-1 bg-outline-variant" />
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 flex-wrap text-[11px] text-on-surface-variant font-medium mb-6">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
              {t('login.ssl')}
            </span>
            <span className="w-px h-3.5 bg-outline-variant hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
              {t('login.noPassword')}
            </span>
            <span className="w-px h-3.5 bg-outline-variant hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
              {t('login.gdpr')}
            </span>
          </div>

          {/* Terms — <Link> thật để crawler index được, không dùng <button> */}
          <p className="text-center text-[11px] text-on-surface-variant leading-relaxed">
            {t('login.termsPrefix')}{' '}
            <Link to={ROUTES.POLICY_TERMS} onClick={onClose} className="text-primary hover:underline font-medium cursor-pointer">
              {t('login.termsLink')}
            </Link>
            {' '}{t('login.and')}{' '}
            <Link to={ROUTES.POLICY_PRIVACY} onClick={onClose} className="text-primary hover:underline font-medium cursor-pointer">
              {t('login.privacyLink')}
            </Link>
            {' '}{t('login.termsSuffix')}
          </p>
        </div>
      </div>
    </div>
  );
}
