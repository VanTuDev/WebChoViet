// ─── Trang Về Chúng Tôi — 100% semantic HTML5, chuẩn SEO + GEO ────────────────
// Thứ tự: Hero → Đội ngũ sáng lập (điểm nhấn: 6 thẻ ngang hàng, 3 trên 3 dưới) → Sứ mệnh →
// Giá trị → Phân biệt thương hiệu → Liên hệ → CTA.
// Nội dung viết dạng câu khẳng định tự đứng vững (AI search trích xuất từng đoạn);
// JSON-LD AboutPage + Person khớp CHÍNH XÁC với text hiển thị (Google đối chiếu).

import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, Code2, Rocket, Languages, BadgeDollarSign,
  Phone, Mail, Globe, Users,
} from 'lucide-react';
import { ROUTES } from '../../config/routes';
import {
  BRAND_NAME, DOMAIN, CONTACT_PHONE, CONTACT_PHONE_RAW, CONTACT_EMAIL,
  FOUNDER_NAME, FOUNDER_SCHOOL, FOUNDER_FACEBOOK, FOUNDER_ZALO,
} from '../../config/contact';
import { TEAM_MEMBERS, FOUNDER_PHOTO_ID, teamPhoto } from '../../config/team';
import HreflangLinks from '../../i18n/HreflangLinks';
import FounderCard, { type FounderCardData } from './_components/FounderCard';

const VALUE_ICONS = [Code2, Rocket, Languages, BadgeDollarSign];

interface ValueItem {
  title: string;
  description: string;
}

export default function AboutUsPage() {
  const { t } = useTranslation('about');
  const pageRef = useRef<HTMLElement>(null);
  const values = t('values.items', { returnObjects: true }) as ValueItem[];

  // Scroll-reveal 3D: thêm `in-view` khi phần tử `.reveal-3d` cuộn vào màn hình
  // (CSS .reveal-3d trong index.css; prefers-reduced-motion đã được xử lý ở đó).
  useEffect(() => {
    const nodes = pageRef.current?.querySelectorAll('.reveal-3d');
    if (!nodes?.length) return;
    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  // 6 thẻ ngang hàng, cùng 1 kiểu: nhà sáng lập (Nguyễn Văn Tú) đứng đầu, 5 đồng sáng lập theo sau
  // → 3 trên 3 dưới. Cả 6 người cùng học Đại học FPT Đà Nẵng nên thẻ nào cũng ghi trường.
  const cofounderLabel = t('team.cofounder');
  const systemDevLabel = t('team.systemDev');
  const cards: FounderCardData[] = [
    {
      id: FOUNDER_PHOTO_ID, name: FOUNDER_NAME, chip: t('team.founderChip'), subtitle: systemDevLabel,
      altRole: `${t('team.founderChip')} — ${systemDevLabel}`, school: FOUNDER_SCHOOL,
    },
    ...TEAM_MEMBERS.map((m) => ({
      id: m.id, name: m.name, chip: cofounderLabel, subtitle: BRAND_NAME,
      altRole: cofounderLabel, school: FOUNDER_SCHOOL,
    })),
  ];

  // JSON-LD: AboutPage → Organization → founder (Person[]) — cùng @id với schema
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
      // disambiguatingDescription: thuộc tính schema.org dùng đúng cho mục đích tách
      // thực thể "VNGOWEB" khỏi "VNG Corporation" (trùng vài ký tự đầu tên gọi).
      disambiguatingDescription: t('disambiguation.body'),
      founder: [
        {
          '@type': 'Person',
          '@id': `https://${DOMAIN}/#founder`,
          name: FOUNDER_NAME,
          jobTitle: systemDevLabel,
          image: `https://${DOMAIN}${teamPhoto(FOUNDER_PHOTO_ID)}`,
          alumniOf: { '@type': 'CollegeOrUniversity', name: FOUNDER_SCHOOL },
          telephone: `+84${CONTACT_PHONE_RAW.slice(1)}`,
          url: `https://${DOMAIN}/about`,
          sameAs: [FOUNDER_FACEBOOK, FOUNDER_ZALO],
        },
        ...TEAM_MEMBERS.map((m) => ({
          '@type': 'Person',
          name: m.name,
          jobTitle: cofounderLabel,
          image: `https://${DOMAIN}${teamPhoto(m.id)}`,
          alumniOf: { '@type': 'CollegeOrUniversity', name: FOUNDER_SCHOOL },
        })),
      ],
    },
  };

  return (
    <article ref={pageRef} className="py-6 px-4 sm:px-6 xl:px-10 w-full">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <HreflangLinks path={ROUTES.ABOUT} />

      <div className="max-w-6xl mx-auto space-y-16">

        {/* ── Hero: tiêu đề gọn để thẻ ảnh đội ngũ lên sát đầu trang ─────────── */}
        <header className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-viet-lacquer via-viet-maroon to-tertiary text-white px-6 py-10 sm:px-12 sm:py-12 text-center">
          <span aria-hidden="true" className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-secondary-container/30 blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-primary-container/40 blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />

          <p className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {t('hero.badge')}
          </p>
          <h1 className="mt-4 text-2xl sm:text-4xl font-display font-extrabold leading-tight max-w-4xl mx-auto">
            {t('hero.title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/75 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </header>

        {/* ── SEO+GEO: Đội ngũ sáng lập — điểm nhấn của trang ────────────────────
         * SEO   : <h2> chứa từ khoá "đồng sáng lập" + brand; ảnh có alt thật (tên — vai trò), width/height
         *         chống CLS, loading=lazy; JSON-LD Organization.founder khớp tên/vai trò hiển thị.
         * GEO B1: Heading nêu thực thể rõ ràng ("Đội ngũ đồng sáng lập VNGOWEB").
         * GEO B2: Đoạn ngay sau heading trả lời trực tiếp: do ai sáng lập, gồm mấy người.
         * GEO B3: 6 người trình bày bằng <ul> các thẻ ngang hàng, không viết đoạn dài.
         * GEO B5: Tên/vai trò là text thật trong HTML (không nằm trong ảnh), nhất quán với JSON-LD.
         * ──────────────────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="about-team"
          className="relative isolate overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-b from-primary-fixed/60 via-white to-tertiary-fixed/40 px-4 py-12 sm:px-10 sm:py-16"
        >
          <span aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary-container/25 blur-3xl" />

          <div className="reveal-3d text-center max-w-3xl mx-auto mb-10">
            <p className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              {BRAND_NAME}
            </p>
            <h2 id="about-team" className="text-3xl sm:text-5xl font-display font-extrabold leading-tight text-gray-900">
              {t('team.heading')}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
              {t('team.intro')}
            </p>
          </div>

          {/* 6 thẻ ngang hàng — desktop 3 trên 3 dưới, tablet 2×3, điện thoại 1 cột */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
            {cards.map((c, i) => (
              <li key={c.id} className="reveal-3d" style={{ transitionDelay: `${(i % 3) * 110}ms` }}>
                <FounderCard data={c} brand={BRAND_NAME} eager={i < 3} />
              </li>
            ))}
          </ul>
        </section>

        {/* ── Sứ mệnh ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="about-mission" className="reveal-3d bg-gradient-to-br from-fnb-cream to-white border border-primary/15 rounded-3xl p-8 sm:p-10">
          <h2 id="about-mission" className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-3">
            {t('mission.heading')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t('mission.body')}
          </p>
        </section>

        {/* ── Giá trị cốt lõi ──────────────────────────────────────────────── */}
        <section aria-labelledby="about-values">
          <h2 id="about-values" className="reveal-3d text-xl sm:text-2xl font-display font-bold text-gray-900 mb-8 text-center">
            {t('values.heading')}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none">
            {values.map((item, i) => {
              const Icon = VALUE_ICONS[i] ?? Code2;
              return (
                <li
                  key={item.title}
                  className="reveal-3d bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── SEO+GEO: Phân biệt thương hiệu ─────────────────────────────────────
         * SEO   : <h2> câu hỏi thật người dùng tìm; JSON-LD disambiguatingDescription
         *         (mainEntity.Organization) khớp đúng nội dung hiển thị bên dưới.
         * GEO B1: Heading là câu hỏi thật ("VNGOWEB có phải là VNG Corporation không?").
         * GEO B2: Câu đầu trả lời trực tiếp "Không." + tự đứng vững, không cần đọc đoạn trước.
         * GEO B5: Nhất quán tên brand "VNGOWEB" + founder "Nguyễn Văn Tú" toàn site (E-E-A-T).
         * ──────────────────────────────────────────────────────────────────────── */}
        <section aria-labelledby="about-disambiguation" className="reveal-3d bg-amber-50 border border-amber-200 rounded-3xl p-8 sm:p-10">
          <h2 id="about-disambiguation" className="text-xl font-display font-bold text-gray-900 mb-3">
            {t('disambiguation.heading')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t('disambiguation.body')}
          </p>
        </section>

        {/* ── Liên hệ ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="about-contact">
          <h2 id="about-contact" className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-2 text-center">
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
              <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{t('contact.phoneLabel')}</span>
              <span className="text-sm font-bold text-gray-900">{CONTACT_PHONE}</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{t('contact.emailLabel')}</span>
              <span className="text-sm font-bold text-gray-900 break-all">{CONTACT_EMAIL}</span>
            </a>
            <span className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-5">
              <Globe className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{t('contact.domainLabel')}</span>
              <span className="text-sm font-bold text-gray-900">{DOMAIN}</span>
            </span>
          </address>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section aria-label={t('cta.title')} className="reveal-3d bg-gradient-to-r from-primary to-tertiary text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-display font-bold mb-2">{t('cta.title')}</h2>
          <p className="text-sm text-white/85 mb-6 max-w-xl mx-auto">{t('cta.description')}</p>
          <Link
            to={ROUTES.MARKETPLACE}
            className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            {t('cta.button')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </article>
  );
}
