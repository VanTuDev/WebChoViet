import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { CONTACT_PHONE, CONTACT_PHONE_RAW, CONTACT_EMAIL, DOMAIN, BRAND_NAME, FOUNDER_NAME } from '../../config/contact';
import Wordmark from './Wordmark';

interface SiteFooterProps {
  variant?: 'landing' | 'app';
}

// labelKey trong namespace common (footer.links.*)
const PRODUCT_LINKS = [
  { labelKey: 'footer.links.marketplace', path: ROUTES.MARKETPLACE },
  { labelKey: 'footer.links.pricing',     path: ROUTES.PRICING },
  { labelKey: 'footer.links.tutorials',   path: ROUTES.TUTORIALS },
  { labelKey: 'footer.links.about',       path: ROUTES.ABOUT },
  { labelKey: 'footer.links.myProjects',  path: ROUTES.DASHBOARD_PROJECTS },
];

const POLICY_LINKS = [
  { labelKey: 'footer.links.privacy', path: ROUTES.POLICY_PRIVACY },
  { labelKey: 'footer.links.terms',   path: ROUTES.POLICY_TERMS },
  { labelKey: 'footer.links.refund',  path: ROUTES.POLICY_REFUND },
  { labelKey: 'footer.links.cookies', path: ROUTES.POLICY_COOKIES },
];

export default function SiteFooter({ variant = 'app' }: SiteFooterProps) {
  const { t } = useTranslation('common');

  /* ── Landing variant — simple horizontal bar ───────────────────────── */
  if (variant === 'landing') {
    return (
      <footer className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-outline-variant/30 bg-surface-container-high">
        {/* Logo */}
        <div className="flex items-center gap-1.5 opacity-70">
          <Wordmark className="text-xl text-on-surface" />
        </div>

        {/* Copyright */}
        <p className="font-inter text-sm text-on-surface-variant text-center md:text-left">
          © {new Date().getFullYear()} {BRAND_NAME}. {t('footer.landingCopyright')}
        </p>

        {/* Links */}
        <nav className="flex items-center gap-6" aria-label={t('footer.policyHeading')}>
          {[
            { labelKey: 'footer.links.termsShort',     path: ROUTES.POLICY_TERMS },
            { labelKey: 'footer.links.privacyShort',   path: ROUTES.POLICY_PRIVACY },
            { labelKey: 'footer.links.contact',        path: ROUTES.ABOUT },
            { labelKey: 'footer.links.tutorialsShort', path: ROUTES.TUTORIALS },
          ].map(({ labelKey, path }) => (
            <Link
              key={labelKey}
              to={path}
              className="font-inter font-medium text-sm text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100 cursor-pointer"
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>
      </footer>
    );
  }

  /* ── App variant — full rich footer ────────────────────────────────── */
  return (
    <footer className="border-t border-slate-100 bg-white shrink-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">

          <section className="md:col-span-5 space-y-5" aria-label={BRAND_NAME}>
            <div>
              <Link
                to={ROUTES.HOME}
                className="flex items-center gap-2 text-2xl text-slate-900 cursor-pointer leading-none"
              >
                <Wordmark />
              </Link>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-400">{DOMAIN}</span>
              </div>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>

            <address className="space-y-2.5 not-italic">
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-primary-container transition-colors group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-container/8 text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="block font-semibold">{CONTACT_PHONE}</span>
                  <span className="text-[11px] text-slate-400">{t('footer.phoneSupportHours')}</span>
                </span>
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
                <span>
                  <span className="block font-semibold">{t('footer.zalo')}</span>
                  <span className="text-[11px] text-slate-400">{t('footer.zaloResponse')}</span>
                </span>
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
            </address>
          </section>

          <nav className="md:col-span-3 space-y-3" aria-label={t('footer.productHeading')}>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 pb-2 border-b border-slate-100">
              {t('footer.productHeading')}
            </p>
            {PRODUCT_LINKS.map(({ labelKey, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-sm text-slate-500 hover:text-primary-container transition-colors cursor-pointer text-left"
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>

          <nav className="md:col-span-4 space-y-3" aria-label={t('footer.policyHeading')}>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 pb-2 border-b border-slate-100">
              {t('footer.policyHeading')}
            </p>
            {POLICY_LINKS.map(({ labelKey, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-sm text-slate-500 hover:text-primary-container transition-colors cursor-pointer text-left"
              >
                {t(labelKey)}
              </Link>
            ))}

            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t('footer.operatedBy', { name: FOUNDER_NAME })}
              </p>
            </div>
          </nav>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-semibold text-slate-500">{DOMAIN}</span>
            {' '}— {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <Link
              to={ROUTES.POLICY_PRIVACY}
              className="hover:text-slate-700 transition-colors cursor-pointer"
            >
              {t('footer.links.privacyShort')}
            </Link>
            <span className="w-px h-3 bg-slate-200" />
            <Link
              to={ROUTES.POLICY_TERMS}
              className="hover:text-slate-700 transition-colors cursor-pointer"
            >
              {t('footer.links.termsShort')}
            </Link>
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
