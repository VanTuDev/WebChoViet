/**
 * ─── SEO helpers cho trang public site ─────────────────────────────────────
 *
 * Mỗi template đặt tên section khác nhau (contact/location/info...) nhưng đều
 * quy ước dùng chung tên key con: address/phone/hours/subtitle (xem
 * .claude/skills/template-rules/SKILL.md). Thay vì hard-code từng category,
 * dò sâu theo tên key — cùng cách tiếp cận với `hasKeyDeep` trong
 * scripts/validate-templates.mjs.
 */

const MAX_DEPTH = 6;

function findDeepString(obj: unknown, keyNames: string[], depth = 0): string | undefined {
  if (obj == null || depth > MAX_DEPTH) return undefined;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = findDeepString(item, keyNames, depth + 1);
      if (found) return found;
    }
    return undefined;
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    // Ưu tiên key khớp trực tiếp ở cấp hiện tại trước khi đi sâu hơn —
    // tránh việc "desc" của 1 món trong menu bị nhặt nhầm thay vì hero.subtitle.
    for (const [k, v] of entries) {
      if (keyNames.includes(k) && typeof v === 'string' && v.trim()) return v.trim();
    }
    for (const [, v] of entries) {
      const found = findDeepString(v, keyNames, depth + 1);
      if (found) return found;
    }
  }

  return undefined;
}

export interface SeoFacts {
  address?: string;
  phone?: string;
  hours?: string;
  /** Tagline/mô tả ngắn lấy từ nội dung thật của site — dùng cho meta description */
  tagline?: string;
}

/** Trích xuất các thông tin SEO cốt lõi từ customData của 1 site (không phụ thuộc category). */
export function extractSeoFacts(customData: Record<string, unknown>): SeoFacts {
  return {
    address: findDeepString(customData, ['address']),
    phone: findDeepString(customData, ['phone', 'phoneNumber']),
    hours: findDeepString(customData, ['hours', 'openingHours']),
    tagline: findDeepString(customData, ['subtitle', 'tagline', 'description']),
  };
}

/** Map categoryId (từ Template.category) → schema.org @type phù hợp nhất. */
const CATEGORY_SCHEMA_TYPE: Record<string, string> = {
  coffee: 'CafeOrCoffeeShop',
  restaurant: 'Restaurant',
  spa: 'DaySpa',
  gym: 'ExerciseGym',
  // Thiệp cưới luôn có section địa điểm tổ chức lễ (venue) — EventVenue là subtype
  // hợp lệ của LocalBusiness trong schema.org, sát nghĩa hơn LocalBusiness chung chung.
  wedding: 'EventVenue',
  villa: 'LodgingBusiness',
};

function schemaTypeForCategory(category?: string): string {
  return (category && CATEGORY_SCHEMA_TYPE[category]) || 'LocalBusiness';
}

/** Map SiteLang → mã locale og:locale chuẩn Open Graph */
const OG_LOCALE: Record<string, string> = {
  vi: 'vi_VN',
  en: 'en_US',
  zh: 'zh_CN',
  ko: 'ko_KR',
};

export function ogLocaleForLang(lang: string): string {
  return OG_LOCALE[lang] ?? 'vi_VN';
}

/** Build JSON-LD LocalBusiness (hoặc subtype phù hợp) cho 1 site đã publish. */
export function buildLocalBusinessJsonLd(params: {
  name: string;
  url: string;
  category?: string;
  image?: string;
  facts: SeoFacts;
}): Record<string, unknown> {
  const { name, url, category, image, facts } = params;
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaTypeForCategory(category),
    name,
    url,
  };
  if (image) jsonLd.image = image;
  if (facts.address) jsonLd.address = { '@type': 'PostalAddress', streetAddress: facts.address };
  if (facts.phone) jsonLd.telephone = facts.phone;
  if (facts.hours) jsonLd.openingHours = facts.hours;
  return jsonLd;
}
