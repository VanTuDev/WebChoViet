import { Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import TutorialStep from './_components/TutorialStep';
import { useAppContext } from '../../store/AppContext';
import { ROUTES } from '../../config/routes';
import { CONTACT_PHONE, DOMAIN } from '../../config/contact';
import HreflangLinks from '../../i18n/HreflangLinks';

interface StepData {
  num: string;
  title: string;
  desc: string;
}

export default function TutorialsPage() {
  const { t } = useTranslation('tutorials');
  const { showSnackbar } = useAppContext();
  const steps = t('steps', { returnObjects: true }) as StepData[];

  // HowTo JSON-LD — khớp đúng 4 bước hiển thị trên trang, không bịa thêm dữ liệu
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('heading'),
    description: t('subheading'),
    url: `https://${DOMAIN}${ROUTES.TUTORIALS}`,
    step: steps.map(step => ({
      '@type': 'HowToStep',
      position: Number(step.num),
      name: step.title,
      text: step.desc,
    })),
  };

  return (
    <article className="py-10 px-6 xl:px-10 w-full space-y-8">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <HreflangLinks path={ROUTES.TUTORIALS} />
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
          {t('heading')}
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          {t('subheading')}
        </p>
      </header>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 list-none">
        {steps.map(step => (
          <li key={step.num}>
            <TutorialStep {...step} />
          </li>
        ))}
      </ol>

      <aside className="bg-[#ffe9dc]/50 border border-orange-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-base font-bold text-gray-900 font-display flex items-center gap-1.5">
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span>{t('support.title')}</span>
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('support.desc')}
          </p>
        </div>
        <button
          onClick={() => showSnackbar(t('support.connecting', { phone: CONTACT_PHONE }), 'success')}
          className="px-6 py-3 bg-primary-container hover:bg-primary text-white text-xs font-bold rounded-full cursor-pointer whitespace-nowrap active:scale-95 transition-all shadow"
        >
          {t('support.cta')}
        </button>
      </aside>
    </article>
  );
}
