import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { ROUTES } from '../../config/routes';
import { getGoogleLoginUrl, setPostLoginRedirect } from '../../services/authService';

type Tab = 'login' | 'register';

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
  defaultTab?: Tab;
}

export default function LoginModal({ onClose, defaultTab = 'login' }: Props) {
  const navigate  = useNavigate();
  const { showSnackbar } = useAppContext();

  const [tab,      setTab]      = useState<Tab>(defaultTab);
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);

  const afterSuccess = (msg: string) => {
    showSnackbar(msg, 'success');
    onClose();
    navigate(ROUTES.MARKETPLACE);
  };

  const handleGoogle = () => {
    setLoading(true);
    setPostLoginRedirect(window.location.pathname + window.location.search);
    window.location.href = getGoogleLoginUrl();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    afterSuccess(
      tab === 'login'
        ? 'Đăng nhập thành công! Chào mừng trở lại.'
        : 'Đăng ký thành công! Chào mừng bạn đến WebChoViet.',
    );
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
        <div className="bg-linear-to-r from-[#003f87] to-[#0056b3] px-8 pt-7 pb-7 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }}
          />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/15 border border-white/25 mb-3 shadow-lg">
              <ShieldCheck className="h-5.5 w-5.5 text-white" />
            </div>
            <h1 className="font-lexend font-bold text-lg text-white mb-0.5">
              web<span className="text-blue-200">choviet</span>
            </h1>
            <p className="text-xs text-blue-200/70">
              {tab === 'login' ? 'Đăng nhập để quản lý cửa hàng' : 'Tạo tài khoản miễn phí ngay'}
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-100">
          {(['login', 'register'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setEmail(''); setPassword(''); setName(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                tab === t
                  ? 'text-primary border-b-2 border-primary -mb-px'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="px-7 py-6 space-y-4">

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 h-11 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer active:scale-[0.98] disabled:opacity-60 shadow-sm"
          >
            <GoogleLogo />
            Tiếp tục với Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[11px] text-slate-400 font-medium">hoặc</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">

            {tab === 'register' && (
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder={tab === 'register' ? 'Tạo mật khẩu (tối thiểu 6 ký tự)' : 'Mật khẩu'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {tab === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs text-primary hover:underline cursor-pointer">
                  Quên mật khẩu?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full h-11 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {tab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>
          </form>

          {/* Terms */}
          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <button className="text-primary hover:underline cursor-pointer">Điều khoản</button>
            {' '}và{' '}
            <button className="text-primary hover:underline cursor-pointer">Chính sách bảo mật</button>
            {' '}của WebChoViet.
          </p>
        </div>

        {/* Trust bar */}
        <div className="flex items-center justify-center gap-4 px-7 pb-5 text-[10px] text-slate-400 font-medium">
          <span>🔒 Bảo mật SSL</span>
          <span className="w-px h-3 bg-slate-200" />
          <span>✓ Không lưu mật khẩu</span>
          <span className="w-px h-3 bg-slate-200" />
          <span>✓ GDPR</span>
        </div>
      </div>
    </div>
  );
}
