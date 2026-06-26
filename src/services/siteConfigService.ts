import type { SiteConfig } from '../types';

// ── API helpers ────────────────────────────────────────────────────────────────

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ── localStorage fallback (offline / pre-API) ──────────────────────────────────

const LS_KEY = 'wcv_site_configs';

function lsRead(): SiteConfig[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]'); } catch { return []; }
}

function lsWrite(all: SiteConfig[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

function lsUpsert(config: SiteConfig) {
  const all = lsRead();
  const idx = all.findIndex(c => c.id === config.id);
  if (idx >= 0) all[idx] = config; else all.unshift(config);
  lsWrite(all);
}

// ── Public service API ─────────────────────────────────────────────────────────

export async function getAllSiteConfigs(): Promise<SiteConfig[]> {
  try {
    return await api<SiteConfig[]>('/sites');
  } catch {
    return lsRead();
  }
}

export async function getSiteConfig(id: string): Promise<SiteConfig | null> {
  try {
    return await api<SiteConfig>(`/sites/${id}`);
  } catch {
    return lsRead().find(c => c.id === id) ?? null;
  }
}

export async function getSiteConfigBySlug(slug: string): Promise<SiteConfig | null> {
  try {
    return await api<SiteConfig>(`/sites/by-slug/${slug}`);
  } catch {
    return lsRead().find(c => c.slug === slug) ?? null;
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<SiteConfig> {
  try {
    const saved = await api<SiteConfig>('/sites', {
      method: 'POST',
      body: JSON.stringify(config),
    });
    lsUpsert(saved); // keep localStorage in sync as cache
    return saved;
  } catch {
    lsUpsert(config);
    return config;
  }
}

export async function deleteSiteConfig(id: string): Promise<void> {
  try {
    await api(`/sites/${id}`, { method: 'DELETE' });
  } catch { /* ignore */ }
  lsWrite(lsRead().filter(c => c.id !== id));
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  try {
    const q = excludeId ? `?excludeId=${encodeURIComponent(excludeId)}` : '';
    const { exists } = await api<{ exists: boolean }>(`/slug-exists/${encodeURIComponent(slug)}${q}`);
    return exists;
  } catch {
    const match = lsRead().find(c => c.slug === slug);
    return !!match && match.id !== excludeId;
  }
}

// ── Slug helpers (pure, no I/O) ────────────────────────────────────────────────

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

export async function generateSlug(name: string, excludeId?: string): Promise<string> {
  const base = slugify(name);
  let slug = base;
  let n = 1;
  while (await slugExists(slug, excludeId)) {
    slug = `${base}-${n++}`;
  }
  return slug;
}
