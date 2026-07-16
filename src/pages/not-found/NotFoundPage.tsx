// Trang 404 — standalone, không dùng AppLayout
import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Home, LayoutDashboard, ArrowLeft, MapPin } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import Wordmark from '../../components/shared/Wordmark';
import HreflangLinks from '../../i18n/HreflangLinks';

export default function NotFoundPage() {
  const { t } = useTranslation('not-found');
  const navigate = useNavigate();
  const location = useLocation();

  const popularLinks = [
    { label: t('links.marketplace'), path: ROUTES.MARKETPLACE },
    { label: t('links.pricing'),     path: ROUTES.PRICING },
    { label: t('links.tutorials'),   path: ROUTES.TUTORIALS },
    { label: t('links.myProjects'),  path: ROUTES.DASHBOARD_PROJECTS },
    { label: t('links.qrcodes'),     path: ROUTES.DASHBOARD_QRCODES },
    { label: t('links.support'),     path: ROUTES.DASHBOARD_SUPPORT },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 font-sans antialiased relative overflow-hidden">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <HreflangLinks path={location.pathname} />

      {/* Ambient glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-orange-200/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-100/25 blur-[150px] pointer-events-none" />

      {/* Content card */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-lg w-full"
        aria-labelledby="nf-heading"
      >

        {/* Big 404 */}
        <div className="relative inline-block mb-6">
          <span className="font-lexend font-black text-[140px] leading-none text-slate-100 select-none" aria-hidden="true">
            404
          </span>
          {/* Icon overlay */}
          <motion.div
            animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity, repeatDelay: 4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100">
              <MapPin className="h-14 w-14 text-primary-container" strokeWidth={1.5} />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
                <span className="text-white text-[10px] font-black">!</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <h1 id="nf-heading" className="font-lexend font-black text-2xl text-slate-900 mb-3">
          {t('heading')}
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-2">
          {t('pathPrefix')}{' '}
          <code className="bg-slate-100 text-rose-600 px-1.5 py-0.5 rounded text-xs font-mono font-bold">
            {location.pathname}
          </code>{' '}
          {t('pathSuffix')}
        </p>
        <p className="text-slate-400 text-xs mb-8">
          {t('hint')}
        </p>

        {/* CTAs — "quay lại" là hành động (button), 2 cái còn lại là link thật */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 bg-white rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('goBack')}
          </button>

          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-primary-container hover:bg-primary rounded-full transition-all shadow-md cursor-pointer active:scale-95"
          >
            <Home className="h-4 w-4" />
            {t('goHome')}
          </Link>

          <Link
            to={ROUTES.DASHBOARD_PROJECTS}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-container border border-primary-container/30 bg-orange-50 hover:bg-orange-100 rounded-full transition-all cursor-pointer active:scale-95"
          >
            <LayoutDashboard className="h-4 w-4" />
            {t('dashboard')}
          </Link>
        </div>

        {/* Quick links */}
        <nav className="mt-10 pt-8 border-t border-slate-100" aria-label={t('popularPages')}>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">{t('popularPages')}</p>
          <ul className="flex flex-wrap justify-center gap-2 list-none">
            {popularLinks.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-xs font-medium text-slate-600 hover:text-primary-container px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-primary-container/30 transition-all cursor-pointer"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.section>

      {/* Footer brand */}
      <footer className="absolute bottom-6 text-xs text-slate-400">
        <Link to={ROUTES.HOME} className="cursor-pointer hover:opacity-80 transition-opacity">
          <Wordmark className="text-sm text-slate-700" />
        </Link>
        {' '}&mdash; {t('brandTagline')}
      </footer>
    </main>
  );
}
