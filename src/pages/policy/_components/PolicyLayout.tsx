import type { ReactNode } from 'react';
import { CONTACT_PHONE, CONTACT_PHONE_RAW, CONTACT_EMAIL, BUSINESS_REG_NUMBER, BUSINESS_REG_AUTHORITY } from '../../../config/contact';

interface PolicyLayoutProps {
  title: string;
  updatedAt: string;
  intro: string;
  children: ReactNode;
}

export default function PolicyLayout({ title, updatedAt, intro, children }: PolicyLayoutProps) {
  return (
    <div className="py-10 px-6 xl:px-10 w-full">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-3 pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">{title}</h1>
          <p className="text-xs text-gray-400">Cập nhật lần cuối: {updatedAt}</p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">{intro}</p>
        </div>

        <div className="space-y-8">{children}</div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 text-xs text-gray-500 leading-relaxed space-y-1">
          <p className="font-bold text-gray-700 text-sm mb-2">Thông tin liên hệ & đơn vị vận hành</p>
          <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-container hover:underline">{CONTACT_EMAIL}</a></p>
          <p>Hotline: <a href={`tel:${CONTACT_PHONE_RAW}`} className="text-primary-container hover:underline">{CONTACT_PHONE}</a></p>
          <p>Đăng ký kinh doanh số {BUSINESS_REG_NUMBER}, cấp bởi {BUSINESS_REG_AUTHORITY}.</p>
        </div>
      </div>
    </div>
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
