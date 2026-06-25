import axios from 'axios';
import type { SiteConfig } from '../types';

// Create configured Axios instance for performance & error handling
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cache map to store configurations and avoid redundant network calls (optimizes concurrent rendering)
const configCache: Record<string, SiteConfig> = {};

export async function getAllSiteConfigs(): Promise<SiteConfig[]> {
  try {
    const res = await api.get<SiteConfig[]>('/site-config');
    const configs = res.data;
    // Populate local cache
    configs.forEach(c => {
      configCache[c.id] = c;
    });
    return configs;
  } catch (error) {
    console.error('Failed to get all site configs:', error);
    return [];
  }
}

export async function getSiteConfig(id: string): Promise<SiteConfig | null> {
  // Return cached copy if available to prevent lag and double fetching
  if (configCache[id]) {
    return configCache[id];
  }
  try {
    const res = await api.get<SiteConfig | null>('/site-config', {
      params: { id },
    });
    const config = res.data;
    if (config) {
      configCache[id] = config;
    }
    return config;
  } catch (error) {
    console.error(`Failed to get site config for ID ${id}:`, error);
    return null;
  }
}

export async function getSiteConfigBySlug(slug: string): Promise<SiteConfig | null> {
  // Search cache first
  const cached = Object.values(configCache).find(c => c.slug === slug);
  if (cached) {
    return cached;
  }
  try {
    const res = await api.get<SiteConfig | null>('/site-config', {
      params: { slug },
    });
    const config = res.data;
    if (config) {
      configCache[config.id] = config;
    }
    return config;
  } catch (error) {
    console.error(`Failed to get site config for slug ${slug}:`, error);
    return null;
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<SiteConfig> {
  try {
    const res = await api.post<SiteConfig>('/site-config', config);
    const saved = res.data;
    // Update local cache
    configCache[saved.id] = saved;
    return saved;
  } catch (error) {
    console.error('Failed to save site config:', error);
    throw error;
  }
}

export async function deleteSiteConfig(id: string): Promise<void> {
  try {
    await api.delete('/site-config', {
      params: { id },
    });
    // Invalidate cache
    delete configCache[id];
  } catch (error) {
    console.error(`Failed to delete site config for ID ${id}:`, error);
    throw error;
  }
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  try {
    const res = await api.get<SiteConfig | null>('/site-config', {
      params: { slug },
    });
    const site = res.data;
    return !!site && site.id !== excludeId;
  } catch {
    return false;
  }
}

/** Generate a unique slug from a name */
export async function generateSlug(name: string): Promise<string> {
  const base = name
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
  let slug = base;
  let counter = 1;
  while (await slugExists(slug)) {
    slug = `${base}-${counter++}`;
  }
  return slug;
}

