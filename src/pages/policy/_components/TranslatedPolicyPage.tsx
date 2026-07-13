// ─── Trang chính sách data-driven từ i18n namespace ──────────────────────────
// Mỗi trang policy chỉ cần khai báo namespace + path; toàn bộ nội dung (title,
// intro, sections) nằm trong locales/<lang>/policy-*.json — dịch giả sửa 1 file
// JSON là xong 1 trang, không đụng vào code React.

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PolicyLayout, { PolicySection, PolicyList } from './PolicyLayout';
import HreflangLinks from '../../../i18n/HreflangLinks';

export interface PolicySectionData {
  heading: string;
  /** Đoạn văn TRƯỚC danh sách (nếu có) */
  paragraphs?: string[];
  /** Danh sách gạch đầu dòng (nếu có) */
  list?: string[];
  /** Đoạn văn SAU danh sách (nếu có) */
  after?: string[];
}

interface TranslatedPolicyPageProps {
  /** i18n namespace, vd 'policy-terms' */
  namespace: string;
  /** Đường dẫn route, vd ROUTES.POLICY_TERMS */
  path: string;
}

export default function TranslatedPolicyPage({ namespace, path }: TranslatedPolicyPageProps) {
  const { t } = useTranslation(namespace);
  const sections = t('sections', { returnObjects: true }) as PolicySectionData[];

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      <HreflangLinks path={path} />
      <PolicyLayout title={t('title')} updatedAt={t('updatedAt')} intro={t('intro')}>
        {sections.map(section => (
          <PolicySection key={section.heading} heading={section.heading}>
            {section.paragraphs?.map((p, i) => <p key={`p${i}`}>{p}</p>)}
            {section.list && <PolicyList items={section.list} />}
            {section.after?.map((p, i) => <p key={`a${i}`}>{p}</p>)}
          </PolicySection>
        ))}
      </PolicyLayout>
    </>
  );
}
