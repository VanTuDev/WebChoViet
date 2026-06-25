import type { SiteConfig } from '../types';

const STORAGE_KEY = 'wcv_site_configs';

function readAll(): SiteConfig[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as SiteConfig[];
  } catch {
    return [];
  }
}

function writeAll(configs: SiteConfig[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
}

export async function getAllSiteConfigs(): Promise<SiteConfig[]> {
  return readAll();
}

export async function getSiteConfig(id: string): Promise<SiteConfig | null> {
  return readAll().find(c => c.id === id) ?? null;
}

export async function getSiteConfigBySlug(slug: string): Promise<SiteConfig | null> {
  return readAll().find(c => c.slug === slug) ?? null;
}

export async function saveSiteConfig(config: SiteConfig): Promise<SiteConfig> {
  const all = readAll();
  const idx = all.findIndex(c => c.id === config.id);
  if (idx >= 0) {
    all[idx] = config;
  } else {
    all.unshift(config);
  }
  writeAll(all);
  return config;
}

export async function deleteSiteConfig(id: string): Promise<void> {
  writeAll(readAll().filter(c => c.id !== id));
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const match = readAll().find(c => c.slug === slug);
  return !!match && match.id !== excludeId;
}

/** Convert a name to a URL-safe slug (sync, no uniqueness check) */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[àáảãạăắặẳẵặâấầẩẫậ]/g, 'a')
    .replace(/[èéẻẽẹêếềểễệ]/g, 'e')
    .replace(/[ìíỉĩị]/g, 'i')
    .replace(/[òóỏõọôốồổỗộơớờởỡợ]/g, 'o')
    .replace(/[ùúủũụưứừửữự]/g, 'u')
    .replace(/[ýỳỷỹỵ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

/** Generate a unique slug from a name (appends -2, -3 … on collision) */
export async function generateSlug(name: string, excludeId?: string): Promise<string> {
  const base = slugify(name);
  let slug = base;
  let counter = 1;
  while (await slugExists(slug, excludeId)) {
    slug = `${base}-${counter++}`;
  }
  return slug;
}
