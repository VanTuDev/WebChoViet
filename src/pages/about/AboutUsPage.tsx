// ─── Trang Về Chúng Tôi — 100% semantic HTML5, chuẩn SEO + GEO ────────────────
// Nội dung viết dạng câu khẳng định tự đứng vững (AI search trích xuất từng đoạn);
// JSON-LD AboutPage + Person khớp CHÍNH XÁC với text hiển thị (Google đối chiếu).

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Code2, Rocket, Languages, BadgeDollarSign, Phone, Mail, Globe, GraduationCap } from 'lucide-react';
import { ROUTES } from '../../config/routes';
import {
  BRAND_NAME, DOMAIN, CONTACT_PHONE, CONTACT_PHONE_RAW, CONTACT_EMAIL,
  FOUNDER_NAME, FOUNDER_SCHOOL,
} from '../../config/contact';
import HreflangLinks from '../../i18n/HreflangLinks';

const VALUE_ICONS = [Code2, Rocket, Languages, BadgeDollarSign];

interface ValueItem {
  title: string;
  description: string;
}

export default function AboutUsPage() {
  const { t } = useTranslation('about');
  const values = t('values.items', { returnObjects: true }) as ValueItem[];

  // JSON-LD: AboutPage → Organization → founder Person — cùng @id với schema
  // Organization trong index.html để Google gộp thành 1 thực thể duy nhất.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `https://${DOMAIN}/about`,
    name: t('meta.title'),
    mainEntity: {
      '@type': 'Organization',
      '@id': `https://${DOMAIN}/#organization`,
      name: BRAND_NAME,
      url: `https://${DOMAIN}/`,
      telephone: `+84${CONTACT_PHONE_RAW.slice(1)}`,
      email: CONTACT_EMAIL,
      founder: {
        '@type': 'Person',
        '@id': `https://${DOMAIN}/#founder`,
        name: FOUNDER_NAME,
        jobTitle: 'Founder & Developer',
        alumniOf: { '@type': 'CollegeOrUniversity', name: FOUNDER_SCHOOL },
        telephone: `+84${CONTACT_PHONE_RAW.slice(1)}`,
        url: `https://${DOMAIN}/about`,
      },
    },
  };

  return (
    <article className="py-10 px-6 xl:px-10 w-full">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <HreflangLinks path={ROUTES.ABOUT} />

      <div className="max-w-4xl mx-auto space-y-16">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <header className="text-center space-y-4 pt-4">
          <p className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold">
            {t('hero.badge')}
          </p>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 leading-tight max-w-3xl mx-auto">
            {t('hero.title')}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </header>

        {/* ── Sứ mệnh ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="about-mission" className="bg-gradient-to-br from-fnb-cream to-white border border-fnb-orange/20 rounded-3xl p-8 sm:p-10">
          <h2 id="about-mission" className="text-xl font-display font-bold text-gray-900 mb-3">
            {t('mission.heading')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t('mission.body')}
          </p>
        </section>

        {/* ── Giá trị cốt lõi ──────────────────────────────────────────────── */}
        <section aria-labelledby="about-values">
          <h2 id="about-values" className="text-xl font-display font-bold text-gray-900 mb-6 text-center">
            {t('values.heading')}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 list-none">
            {values.map((item, i) => {
              const Icon = VALUE_ICONS[i] ?? Code2;
              return (
                <li key={item.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── Người sáng lập — text hiển thị khớp JSON-LD Person ──────────── */}
        <section aria-labelledby="about-founder" className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10">
          <h2 id="about-founder" className="text-xl font-display font-bold mb-6">
            {t('founder.heading')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary shrink-0" aria-hidden="true">
              <GraduationCap className="h-8 w-8" />
            </span>
            <div className="space-y-2">
              <p className="text-lg font-bold">{FOUNDER_NAME}</p>
              <p className="text-sm text-slate-300">
                {t('founder.role')} · {FOUNDER_SCHOOL}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                {t('founder.bio')}
              </p>
            </div>
          </div>
        </section>

        {/* ── Liên hệ ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="about-contact">
          <h2 id="about-contact" className="text-xl font-display font-bold text-gray-900 mb-2 text-center">
            {t('contact.heading')}
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6 max-w-xl mx-auto">
            {t('contact.description')}
          </p>
          <address className="not-italic grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{t('contact.phoneLabel')}</span>
              <span className="text-sm font-bold text-gray-900">{CONTACT_PHONE}</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{t('contact.emailLabel')}</span>
              <span className="text-sm font-bold text-gray-900 break-all">{CONTACT_EMAIL}</span>
            </a>
            <span className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-5">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{t('contact.domainLabel')}</span>
              <span className="text-sm font-bold text-gray-900">{DOMAIN}</span>
            </span>
          </address>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section aria-label={t('cta.title')} className="bg-gradient-to-r from-fnb-red to-fnb-orange text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-display font-bold mb-2">{t('cta.title')}</h2>
          <p className="text-sm text-white/85 mb-6 max-w-xl mx-auto">{t('cta.description')}</p>
          <Link
            to={ROUTES.MARKETPLACE}
            className="inline-flex items-center gap-2 bg-white text-fnb-red font-bold text-sm px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            {t('cta.button')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </article>
  );
}
