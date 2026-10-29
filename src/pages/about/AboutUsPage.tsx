// ─── Trang Về Chúng Tôi — 100% semantic HTML5, chuẩn SEO + GEO ────────────────
// Nội dung viết dạng câu khẳng định tự đứng vững (AI search trích xuất từng đoạn);
// JSON-LD AboutPage + Person khớp CHÍNH XÁC với text hiển thị (Google đối chiếu).

import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, ArrowUpRight, Check, Cog, Code2, Rocket, Languages, BadgeDollarSign,
  Megaphone, Phone, Mail, Globe, Users,
} from 'lucide-react';
import { ROUTES } from '../../config/routes';
import {
  BRAND_NAME, DOMAIN, CONTACT_PHONE, CONTACT_PHONE_RAW, CONTACT_EMAIL,
  FOUNDER_NAME, FOUNDER_SCHOOL, FOUNDER_FACEBOOK, FOUNDER_ZALO,
} from '../../config/contact';
import { TEAM_MEMBERS, FOUNDER_PHOTO_ID, teamPhoto, type TeamGroupId } from '../../config/team';
import HreflangLinks from '../../i18n/HreflangLinks';

const VALUE_ICONS = [Code2, Rocket, Languages, BadgeDollarSign];

interface ValueItem {
  title: string;
  description: string;
}

/** Class Tailwind phải viết nguyên văn (không nối chuỗi) để Tailwind quét được */
const GROUP_STYLE: Record<TeamGroupId, {
  icon: typeof Cog;
  frame: string;      // viền gradient quanh thẻ thành viên
  tile: string;       // nền thẻ giới thiệu nhóm
  chip: string;       // nhãn nhóm trên ảnh
  check: string;      // icon gạch đầu dòng phụ trách
}> = {
  ops: {
    icon: Cog,
    frame: 'from-secondary-container via-primary-container to-primary',
    tile: 'from-secondary to-primary',
    chip: 'bg-secondary-container text-on-secondary-container',
    check: 'bg-white/20 text-white',
  },
  marketing: {
    icon: Megaphone,
    frame: 'from-primary-container via-primary to-tertiary',
    tile: 'from-primary to-tertiary',
    chip: 'bg-tertiary-container text-on-tertiary-container',
    check: 'bg-white/20 text-white',
  },
};

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

  const founderRole = t('founder.role');
  const members = TEAM_MEMBERS.map((m) => ({
    ...m,
    role: t(`team.members.${m.id}.role`),
    bio: t(`team.members.${m.id}.bio`),
  }));

  // JSON-LD: AboutPage → Organization → founder + employee (Person) — cùng @id với schema
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
      founder: {
        '@type': 'Person',
        '@id': `https://${DOMAIN}/#founder`,
        name: FOUNDER_NAME,
        jobTitle: 'Founder & Developer',
        image: `https://${DOMAIN}${teamPhoto(FOUNDER_PHOTO_ID)}`,
        alumniOf: { '@type': 'CollegeOrUniversity', name: FOUNDER_SCHOOL },
        telephone: `+84${CONTACT_PHONE_RAW.slice(1)}`,
        url: `https://${DOMAIN}/about`,
        sameAs: [FOUNDER_FACEBOOK, FOUNDER_ZALO],
      },
      employee: members.map((m) => ({
        '@type': 'Person',
        name: m.name,
        jobTitle: m.role,
        image: `https://${DOMAIN}${teamPhoto(m.id)}`,
        worksFor: { '@id': `https://${DOMAIN}/#organization` },
      })),
    },
  };

  const groups: TeamGroupId[] = ['ops', 'marketing'];

  return (
    <article ref={pageRef} className="py-6 px-4 sm:px-6 xl:px-10 w-full">
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <HreflangLinks path={ROUTES.ABOUT} />

      <div className="max-w-6xl mx-auto space-y-20">

        {/* ── Hero: nền gradient thương hiệu + dải chân dung cả đội ───────────── */}
        <header className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-viet-lacquer via-viet-maroon to-tertiary text-white px-6 py-14 sm:px-12 sm:py-20 text-center">
          <span aria-hidden="true" className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-secondary-container/30 blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-primary-container/40 blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />

          <p className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {t('hero.badge')}
          </p>
          <h1 className="mt-5 text-3xl sm:text-5xl font-display font-extrabold leading-tight max-w-4xl mx-auto">
            {t('hero.title')}
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/75 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Dải avatar cả đội — ảnh thật, alt = tên + vai trò */}
          <figure className="mt-10 flex flex-col items-center gap-3">
            <ul className="flex items-center justify-center list-none">
              {[{ id: FOUNDER_PHOTO_ID, name: FOUNDER_NAME, role: founderRole }, ...members].map((p, i) => (
                <li key={p.id} className={i === 0 ? '' : '-ml-3 sm:-ml-4'}>
                  <img
                    src={teamPhoto(p.id, 480)}
                    alt={`${p.name} — ${p.role}`}
                    width={480}
                    height={600}
                    className="h-14 w-14 sm:h-20 sm:w-20 rounded-full object-cover object-top ring-4 ring-viet-lacquer bg-slate-300 hover:-translate-y-1.5 hover:scale-110 transition-transform duration-300"
                  />
                </li>
              ))}
            </ul>
            <figcaption className="text-xs sm:text-sm font-semibold tracking-wide text-white/80">
              {t('team.stackLabel')}
            </figcaption>
          </figure>
        </header>

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

        {/* ── Người sáng lập — text hiển thị khớp JSON-LD Person ──────────── */}
        <section aria-labelledby="about-founder" className="reveal-3d relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-viet-lacquer to-inverse-surface text-white p-6 sm:p-10">
          <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-tertiary/40 blur-3xl" />
          <div className="grid gap-8 md:grid-cols-[minmax(0,300px)_1fr] items-center">
            <figure className="mx-auto w-full max-w-[300px] rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <div className="rounded-[1.75rem] p-1 bg-gradient-to-br from-secondary-container via-primary-container to-tertiary-container shadow-2xl shadow-primary/30">
                <img
                  src={teamPhoto(FOUNDER_PHOTO_ID)}
                  srcSet={`${teamPhoto(FOUNDER_PHOTO_ID, 480)} 480w, ${teamPhoto(FOUNDER_PHOTO_ID)} 800w`}
                  sizes="(min-width: 768px) 300px, 80vw"
                  alt={`${FOUNDER_NAME} — ${founderRole}, ${BRAND_NAME}`}
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/5] object-cover object-top rounded-[1.5rem] bg-slate-300"
                />
              </div>
            </figure>

            <div className="space-y-4">
              <h2 id="about-founder" className="text-sm font-semibold uppercase tracking-widest text-secondary-container">
                {t('founder.heading')}
              </h2>
              <p className="text-3xl sm:text-4xl font-display font-extrabold">{FOUNDER_NAME}</p>
              <p className="inline-flex flex-wrap items-center gap-2 text-sm">
                <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1">{founderRole}</span>
                <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1">{FOUNDER_SCHOOL}</span>
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {t('founder.bio')}
              </p>
              <ul className="flex flex-wrap gap-3 list-none pt-1">
                {[
                  { label: 'Facebook', href: FOUNDER_FACEBOOK },
                  { label: 'Zalo', href: FOUNDER_ZALO },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white text-viet-lacquer text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform"
                    >
                      {s.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── SEO+GEO: Đội ngũ sản phẩm ───────────────────────────────────────────
         * SEO   : <h2> chứa từ khoá "đội ngũ" + brand; ảnh có alt thật (tên — vai trò), width/height
         *         chống CLS, loading=lazy; JSON-LD Organization.employee khớp tên/vai trò hiển thị.
         * GEO B1: Heading nêu thực thể rõ ràng ("Đội ngũ sản phẩm VNGOWEB").
         * GEO B2: Đoạn ngay sau heading trả lời trực tiếp: gồm bao nhiêu người, chia mảng nào.
         * GEO B3: Phụ trách từng mảng + từng thành viên trình bày bằng <ul>, không viết đoạn dài.
         * GEO B5: Tên/vai trò là text thật trong HTML (không nằm trong ảnh), nhất quán với JSON-LD.
         * ──────────────────────────────────────────────────────────────────────── */}
        <section aria-labelledby="about-team">
          <div className="reveal-3d text-center max-w-3xl mx-auto mb-12">
            <p className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              {BRAND_NAME}
            </p>
            <h2 id="about-team" className="text-2xl sm:text-4xl font-display font-extrabold text-gray-900">
              {t('team.heading')}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
              {t('team.intro')}
            </p>
          </div>

          <div className="space-y-14">
            {groups.map((g) => {
              const style = GROUP_STYLE[g];
              const GroupIcon = style.icon;
              const groupMembers = members.filter((m) => m.group === g);
              const duties = t(`team.groups.${g}.duties`, { returnObjects: true }) as string[];
              // Nhóm 2 người: thẻ giới thiệu chiếm 2 cột; nhóm 3 người: chiếm 1 cột → luôn đủ 4 cột
              const tileSpan = groupMembers.length === 2 ? 'lg:col-span-2' : 'lg:col-span-1';
              return (
                <section key={g} aria-labelledby={`team-${g}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    <header
                      className={`reveal-3d relative isolate overflow-hidden rounded-3xl bg-gradient-to-br ${style.tile} text-white p-7 sm:col-span-2 ${tileSpan} flex flex-col justify-between gap-6`}
                    >
                      <span aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur" aria-hidden="true">
                        <GroupIcon className="h-6 w-6" />
                      </span>
                      <div className="space-y-3">
                        <h3 id={`team-${g}`} className="text-2xl font-display font-extrabold">
                          {t(`team.groups.${g}.title`)}
                        </h3>
                        <p className="text-sm text-white/85 leading-relaxed">
                          {t(`team.groups.${g}.description`)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70 mb-2">
                          {t('team.dutiesLabel')}
                        </p>
                        <ul className="space-y-2 list-none">
                          {duties.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-sm">
                              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${style.check}`} aria-hidden="true">
                                <Check className="h-3 w-3" />
                              </span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </header>

                    <ul className="contents list-none">
                      {groupMembers.map((m, i) => (
                        <li key={m.id} className="reveal-3d" style={{ transitionDelay: `${(i + 1) * 110}ms` }}>
                          <article className={`group card-3d h-full rounded-3xl p-[3px] bg-gradient-to-br ${style.frame} shadow-lg shadow-primary/10`}>
                            <div className="h-full flex flex-col overflow-hidden rounded-[1.35rem] bg-white">
                              <figure className="relative aspect-[4/5] overflow-hidden bg-slate-300">
                                <img
                                  src={teamPhoto(m.id)}
                                  srcSet={`${teamPhoto(m.id, 480)} 480w, ${teamPhoto(m.id)} 800w`}
                                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 90vw"
                                  alt={`${m.name} — ${m.role}, ${BRAND_NAME}`}
                                  width={800}
                                  height={1000}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold shadow ${style.chip}`}>
                                  {t(`team.groups.${g}.title`)}
                                </span>
                                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-viet-lacquer/95 via-viet-lacquer/70 to-transparent px-4 pb-4 pt-12 text-white">
                                  <h4 className="text-lg font-display font-extrabold leading-tight">{m.name}</h4>
                                  <p className="mt-0.5 text-xs font-medium text-white/85">{m.role}</p>
                                </figcaption>
                              </figure>
                              <p className="p-4 text-xs text-gray-500 leading-relaxed">{m.bio}</p>
                            </div>
                          </article>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
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
