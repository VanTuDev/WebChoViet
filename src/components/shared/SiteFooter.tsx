import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import { CONTACT_PHONE, CONTACT_PHONE_RAW, CONTACT_EMAIL, DOMAIN, BUSINESS_REG_NUMBER, BUSINESS_REG_AUTHORITY } from '../../config/contact';

interface SiteFooterProps {
  variant?: 'landing' | 'app';
}

const PRODUCT_LINKS = [
  { label: 'Kho Giao Diện',  path: ROUTES.MARKETPLACE },
  { label: 'Bảng Giá',       path: ROUTES.PRICING },
  { label: 'Hướng Dẫn',      path: ROUTES.TUTORIALS },
  { label: 'Quản Lý Dự Án',  path: ROUTES.DASHBOARD_PROJECTS },
];

const POLICY_LINKS = [
  { label: 'Chính Sách Bảo Mật',   path: ROUTES.POLICY_PRIVACY },
  { label: 'Điều Khoản Sử Dụng',   path: ROUTES.POLICY_TERMS },
  { label: 'Chính Sách Hoàn Tiền', path: ROUTES.POLICY_REFUND },
  { label: 'Quy Định Cookie',       path: ROUTES.POLICY_COOKIES },
];

export default function SiteFooter({ variant = 'app' }: SiteFooterProps) {
  const navigate = useNavigate();

  /* ── Landing variant — simple horizontal bar matching the HTML ────── */
  if (variant === 'landing') {
    return (
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-outline-variant/30 bg-surface-container-high">
        {/* Logo */}
        <div className="flex items-center gap-1.5 opacity-70">
          <img src="/logo/logo-mark.png" alt="" className="h-6 w-6 object-contain" />
          <span className="font-lexend font-extrabold text-xl text-on-surface">
            web<span className="text-primary">choviet</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="font-inter text-sm text-on-surface-variant text-center md:text-left">
          © 2024 webchoviet. Nâng tầm thương hiệu Việt.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          {[
            { label: 'Điều khoản', path: ROUTES.POLICY_TERMS },
            { label: 'Bảo mật',   path: ROUTES.POLICY_PRIVACY },
            { label: 'Liên hệ',   path: ROUTES.DASHBOARD_SUPPORT },
            { label: 'Hướng dẫn', path: ROUTES.TUTORIALS },
          ].map(({ label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="font-inter font-medium text-sm text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      </footer>
    );
  }

  /* ── App variant — full rich footer ────────────────────────────────── */
  return (
    <footer className="border-t border-slate-100 bg-white shrink-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">

          <div className="md:col-span-5 space-y-5">
            <div>
              <button
                onClick={() => navigate(ROUTES.HOME)}
                className="flex items-center gap-2 font-lexend font-extrabold text-2xl text-slate-900 cursor-pointer leading-none"
              >
                <img src="/logo/logo-mark.png" alt="" className="h-8 w-8 object-contain" />
                web<span className="text-primary-container">choviet</span>
              </button>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-400">{DOMAIN}</span>
              </div>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Nền tảng tạo website & menu QR số hóa dành riêng cho hộ kinh doanh và doanh nghiệp nhỏ tại Việt Nam.
            </p>

            <div className="space-y-2.5">
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-primary-container transition-colors group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-container/8 text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="block font-semibold">{CONTACT_PHONE}</span>
                  <span className="text-[11px] text-slate-400">Hỗ trợ 8:00 – 22:00 hàng ngày</span>
                </div>
              </a>

              <a
                href={`https://zalo.me/${CONTACT_PHONE_RAW}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-primary-container transition-colors group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-container/8 text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all shrink-0">
                  <MessageCircle className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="block font-semibold">Nhắn qua Zalo</span>
                  <span className="text-[11px] text-slate-400">Phản hồi trong vòng 15 phút</span>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-primary-container transition-colors group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-container/8 text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <span className="font-medium">{CONTACT_EMAIL}</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 pb-2 border-b border-slate-100">
              Sản Phẩm
            </p>
            {PRODUCT_LINKS.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="block text-sm text-slate-500 hover:text-primary-container transition-colors cursor-pointer text-left"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 pb-2 border-b border-slate-100">
              Chính Sách & Pháp Lý
            </p>
            {POLICY_LINKS.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="block text-sm text-slate-500 hover:text-primary-container transition-colors cursor-pointer text-left"
              >
                {label}
              </button>
            ))}

            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Đăng ký kinh doanh số <span className="font-medium text-slate-500">{BUSINESS_REG_NUMBER}</span>
                <br />cấp bởi {BUSINESS_REG_AUTHORITY}.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-semibold text-slate-500">{DOMAIN}</span>
            {' '}— Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <button
              onClick={() => navigate(ROUTES.POLICY_PRIVACY)}
              className="hover:text-slate-700 transition-colors cursor-pointer"
            >
              Bảo mật
            </button>
            <span className="w-px h-3 bg-slate-200" />
            <button
              onClick={() => navigate(ROUTES.POLICY_TERMS)}
              className="hover:text-slate-700 transition-colors cursor-pointer"
            >
              Điều khoản
            </button>
            <span className="w-px h-3 bg-slate-200" />
            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="hover:text-primary-container transition-colors font-semibold"
            >
              {CONTACT_PHONE}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
