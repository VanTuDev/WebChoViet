import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CONTACT_PHONE, CONTACT_PHONE_RAW, CONTACT_EMAIL, FOUNDER_NAME } from '../../../config/contact';

interface PolicyLayoutProps {
  title: string;
  updatedAt: string;
  intro: string;
  children: ReactNode;
}

export default function PolicyLayout({ title, updatedAt, intro, children }: PolicyLayoutProps) {
  const { t } = useTranslation('common');
  return (
    <article className="py-10 px-6 xl:px-10 w-full">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center space-y-3 pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">{title}</h1>
          <p className="text-xs text-gray-400">{t('policy.lastUpdated', { date: updatedAt })}</p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">{intro}</p>
        </header>

        <div className="space-y-8">{children}</div>

        <footer className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 text-xs text-gray-500 leading-relaxed space-y-1">
          <p className="font-bold text-gray-700 text-sm mb-2">{t('policy.contactHeading')}</p>
          <address className="not-italic space-y-1">
            <p>{t('policy.email')}: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-container hover:underline">{CONTACT_EMAIL}</a></p>
            <p>{t('policy.hotline')}: <a href={`tel:${CONTACT_PHONE_RAW}`} className="text-primary-container hover:underline">{CONTACT_PHONE}</a></p>
            <p>{t('policy.operatedByLine', { name: FOUNDER_NAME })}</p>
          </address>
        </footer>
      </div>
    </article>
  );
}

export function PolicySection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h2 className="text-base font-bold font-display text-gray-900">{heading}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-2.5">{children}</div>
    </section>
  );
}

export function PolicyList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 marker:text-gray-300">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}
