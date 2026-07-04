import type { SiteConfig } from '../types';
import { getApiBaseUrl, getToken } from './authService';

// ── Backend Site shape (BackEnd-WebChoViet/src/sites/schemas/site.schema.ts) ────

interface BackendSite {
  _id: string;
  slug: string;
  name: string;
  templateId: string;
  lang: SiteConfig['lang'];
  customData: Record<string, unknown>;
  images: Record<string, string>;
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
    images: raw.images,
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
    status: config.status,
  };
}

// ── API helper — gọi thẳng NestJS backend thật ──────────────────────────────────

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string | string[];
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      // Bỏ qua trang cảnh báo interstitial của ngrok free plan khi gọi qua tunnel
      'ngrok-skip-browser-warning': 'true',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  const body: ApiEnvelope<T> | null = await res.json().catch(() => null);
  if (!res.ok || !body?.success) {
    const msg = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new Error(msg || `API ${res.status}: ${path}`);
  }
  return body.data as T;
}

// ── Public service API ─────────────────────────────────────────────────────────

export async function getAllSiteConfigs(): Promise<SiteConfig[]> {
  const raw = await api<BackendSite[]>('/sites/my');
  return raw.map(fromBackend);
}

export async function getSiteConfig(id: string): Promise<SiteConfig | null> {
  try {
    return fromBackend(await api<BackendSite>(`/sites/${id}`));
  } catch {
    return null;
  }
}

export async function getSiteConfigBySlug(slug: string): Promise<SiteConfig | null> {
  try {
    return fromBackend(await api<BackendSite>(`/sites/public/${slug}`));
  } catch {
    return null;
  }
}

/** Tạo mới hoặc cập nhật — backend upsert theo id (xem SitesService.upsert) */
export async function saveSiteConfig(config: SiteConfig): Promise<SiteConfig> {
  const raw = await api<BackendSite>('/sites', {
    method: 'POST',
    body: JSON.stringify(toBackend(config)),
  });
  return fromBackend(raw);
}

export async function deleteSiteConfig(id: string): Promise<void> {
  await api(`/sites/${id}`, { method: 'DELETE' });
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const q = excludeId ? `?excludeId=${encodeURIComponent(excludeId)}` : '';
  const { exists } = await api<{ exists: boolean }>(`/sites/slug-exists/${encodeURIComponent(slug)}${q}`);
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
