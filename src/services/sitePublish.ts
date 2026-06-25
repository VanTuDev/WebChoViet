import type { LandingTemplate, PageBlock } from '../data/landingTemplates';

export interface PublishedSite {
  slug: string;
  name: string;
  templateId: string;
  template: LandingTemplate;
  blocks: PageBlock[];
  publishedAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'wcv:published';

function readStore(): Record<string, PublishedSite> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, PublishedSite>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function publish(site: Omit<PublishedSite, 'updatedAt'>): PublishedSite {
  const store = readStore();
  const existing = store[site.slug];
  const full: PublishedSite = {
    ...site,
    publishedAt: existing?.publishedAt ?? site.publishedAt,
    updatedAt: new Date().toISOString(),
  };
  store[site.slug] = full;
  writeStore(store);
  return full;
}

export function getPublished(slug: string): PublishedSite | null {
  return readStore()[slug] ?? null;
}

export function listPublished(): PublishedSite[] {
  return Object.values(readStore()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function isSlugTaken(slug: string): boolean {
  return slug in readStore();
}

export function unpublish(slug: string): void {
  const store = readStore();
  delete store[slug];
  writeStore(store);
}

// Chuyển văn bản tiếng Việt thành slug ASCII
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-');
}

export function buildPublicUrl(slug: string): string {
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:8080';
  return `${origin}/p/${slug}`;
}
