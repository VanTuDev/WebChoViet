import type { SiteConfig } from '../types';
import { apiFetch } from './apiClient';
import { TEMPLATES } from '../data/templates/registry';

// ── Backend Site shape (BackEnd-WebChoViet/src/sites/schemas/site.schema.ts) ────

interface BackendSite {
  _id: string;
  slug: string;
  name: string;
  templateId: string;
  lang: SiteConfig['lang'];
  customData: Record<string, unknown>;
  images: Record<string, string>;
  contact?: SiteConfig['contact'];
  status: SiteConfig['status'];
  isPending?: boolean;
  planLocked?: boolean;
  createdAt: string;
  updatedAt: string;
}

function fromBackend(raw: BackendSite): SiteConfig {
  return {
    id: raw._id,
    templateId: raw.templateId,
    slug: raw.slug,
    name: raw.name,
    lang: raw.lang,
    customData: raw.customData,
    images: raw.images || {},
    contact: raw.contact,
    status: raw.status,
    isPending: raw.isPending,
    planLocked: raw.planLocked,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function toBackend(config: SiteConfig) {
  return {
    id: config.id,
    templateId: config.templateId,
    slug: config.slug,
    name: config.name,
    lang: config.lang,
    customData: config.customData,
    images: config.images,
    contact: config.contact,
    status: config.status,
    // Giá tĩnh từ registry — backend chỉ dùng làm fallback khi admin CHƯA set override riêng
    // cho templateId này (xem BackEnd-WebChoViet/src/templates/templates.service.ts resolveAccess).
    templatePrice: TEMPLATES.find(t => t.id === config.templateId)?.price ?? 0,
  };
}

// ── Public service API ─────────────────────────────────────────────────────────

export async function getAllSiteConfigs(): Promise<SiteConfig[]> {
  const raw = await apiFetch<BackendSite[]>('/sites/my');
  return raw.map(fromBackend);
}

export async function getSiteConfig(id: string): Promise<SiteConfig | null> {
  try {
    return fromBackend(await apiFetch<BackendSite>(`/sites/${id}`));
  } catch {
    return null;
  }
}

export async function getSiteConfigBySlug(slug: string): Promise<SiteConfig | null> {
  try {
    return fromBackend(await apiFetch<BackendSite>(`/sites/public/${slug}`));
  } catch {
    return null;
  }
}

/** Tạo mới hoặc cập nhật — backend upsert theo id (xem SitesService.upsert) */
export async function saveSiteConfig(config: SiteConfig): Promise<SiteConfig> {
  const raw = await apiFetch<BackendSite>('/sites', {
    method: 'POST',
    data: toBackend(config),
  });
  return fromBackend(raw);
}

export async function deleteSiteConfig(id: string): Promise<void> {
  await apiFetch(`/sites/${id}`, { method: 'DELETE' });
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const q = excludeId ? `?excludeId=${encodeURIComponent(excludeId)}` : '';
  const { exists } = await apiFetch<{ exists: boolean }>(`/sites/slug-exists/${encodeURIComponent(slug)}${q}`);
  return exists;
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
