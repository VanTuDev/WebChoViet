import fs from 'fs/promises';
import path from 'path';
import type { SiteConfig } from '@/src/types';
import type { SiteData, MenuItem, MenuCategory } from '@/types/site';

const DB_PATH = path.join(process.cwd(), 'lib', 'dbMock.json');

// ── Shared Memory Cache via globalThis to survive Next.js HMR & hot reloads ──
const globalRef = globalThis as any;

if (!globalRef.__initQueue) {
  globalRef.__initQueue = [];
}
if (globalRef.__isInitializing === undefined) {
  globalRef.__isInitializing = false;
}
if (!globalRef.__writeQueuePromise) {
  globalRef.__writeQueuePromise = Promise.resolve();
}
if (globalRef.__dbCache === undefined) {
  globalRef.__dbCache = null;
}

// Thread-safe memory cache initializer (eliminates disk bottlenecks under 1000+ concurrent requests)
export async function initDbCache(): Promise<SiteConfig[]> {
  if (globalRef.__dbCache !== null) {
    return globalRef.__dbCache;
  }
  if (globalRef.__isInitializing) {
    return new Promise<SiteConfig[]>(resolve => {
      globalRef.__initQueue.push(() => resolve(globalRef.__dbCache!));
    });
  }
  globalRef.__isInitializing = true;
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8');
    globalRef.__dbCache = JSON.parse(raw) as SiteConfig[];
  } catch (error) {
    console.error('Error reading mock DB, initializing with empty array:', error);
    globalRef.__dbCache = [];
  } finally {
    globalRef.__isInitializing = false;
    while (globalRef.__initQueue.length > 0) {
      const resolve = globalRef.__initQueue.shift();
      if (resolve) resolve();
    }
  }
  return globalRef.__dbCache!;
}

// Enqueue write operation to serialize disk writes and avoid file corruption
export function enqueueWrite(data: SiteConfig[]): void {
  globalRef.__writeQueuePromise = globalRef.__writeQueuePromise.then(async () => {
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to write dbMock to disk:', error);
    }
  });
}

// Fetch all site configs
export async function getSiteConfigs(): Promise<SiteConfig[]> {
  return initDbCache();
}

// Save or update site config
export async function saveSiteConfig(config: SiteConfig): Promise<SiteConfig> {
  const db = await initDbCache();
  const now = new Date().toISOString();
  const existingIndex = db.findIndex(c => c.id === config.id);

  const updatedConfig = {
    ...config,
    updatedAt: now,
  };

  if (existingIndex >= 0) {
    db[existingIndex] = updatedConfig;
  } else {
    updatedConfig.createdAt = now;
    db.unshift(updatedConfig);
  }

  enqueueWrite(db);
  return updatedConfig;
}

// Delete site config
export async function deleteSiteConfig(id: string): Promise<boolean> {
  const db = await initDbCache();
  const filtered = db.filter(c => c.id !== id);
  if (db.length === filtered.length) {
    return false;
  }
  globalRef.__dbCache = filtered;
  enqueueWrite(filtered);
  return true;
}

// ── Mapping function: transforms SiteConfig to SiteData ────────────────────
export async function getSiteBySlugFromMock(slug: string): Promise<SiteData | null> {
  const db = await initDbCache();
  const config = db.find(c => c.slug === slug && c.status === 'published');
  if (!config) return null;

  const viData = (config.customData?.vi || {}) as Record<string, any>;
  const enData = (config.customData?.en || {}) as Record<string, any>;

  // SĐT and Address fallback
  const phone = (viData.footer?.phone || viData.contact?.phone || config.customData?.phone || null) as string | null;
  const address = (viData.footer?.address || viData.contact?.address || config.customData?.address || null) as string | null;

  // Logo and Cover fallback
  const logoUrl = config.images?.logo || config.images?.logoUrl || null;
  const coverImageUrl = config.images?.hero || config.images?.cover || null;

  // Extract menu items using template-agnostic parser
  const items: MenuItem[] = [];

  function parsePrice(priceStr: any): number {
    if (!priceStr) return 0;
    const cleaned = String(priceStr).replace(/[^0-9]/g, '');
    const val = parseInt(cleaned, 10);
    if (isNaN(val)) return 0;
    return String(priceStr).toLowerCase().includes('k') ? val * 1000 : (val < 1000 ? val * 1000 : val);
  }

  function addArrayItems(arr: any[], enArr: any[] = []) {
    if (!Array.isArray(arr)) return;
    arr.forEach((item, index) => {
      if (item && typeof item === 'object') {
        const enItem = (Array.isArray(enArr) ? enArr[index] : {}) || {};
        items.push({
          id: `item-${items.length}`,
          name: item.name || 'Sản phẩm',
          nameEn: enItem.name || null,
          price: parsePrice(item.price),
          description: item.desc || item.description || null,
          imageUrl: null,
          isAvailable: true,
          order: items.length,
        });
      }
    });
  }

  // Case 1: drinks.items (coffe-1)
  if (viData.drinks?.items) {
    addArrayItems(viData.drinks.items, enData.drinks?.items);
  }

  // Case 2: menuSection.items (coffe-2, coffe-4, coffe-5)
  const viMenuSecItems = viData.menuSection?.items;
  const enMenuSecItems = enData.menuSection?.items;
  if (viMenuSecItems) {
    if (Array.isArray(viMenuSecItems)) {
      addArrayItems(viMenuSecItems, enMenuSecItems);
    } else if (typeof viMenuSecItems === 'object') {
      Object.keys(viMenuSecItems).forEach(key => {
        const arr = viMenuSecItems[key];
        const enArr = enMenuSecItems ? enMenuSecItems[key] : [];
        if (Array.isArray(arr)) {
          addArrayItems(arr, enArr);
        }
      });
    }
  }

  // Case 3: menu.coffee.items, menu.tea.items, menu.pastries.items (coffe-3)
  const viMenu = viData.menu;
  const enMenu = enData.menu;
  if (viMenu && typeof viMenu === 'object') {
    Object.keys(viMenu).forEach(key => {
      const cat = viMenu[key];
      const enCat = enMenu ? enMenu[key] : null;
      if (cat && typeof cat === 'object' && Array.isArray(cat.items)) {
        addArrayItems(cat.items, enCat?.items);
      }
    });
  }

  const menuCategories: MenuCategory[] = [];
  if (items.length > 0) {
    menuCategories.push({
      id: 'cat-drinks',
      name: viData.drinks?.sectionTitle || viData.menuSection?.sectionTitle || viData.menu?.sectionTitle || 'Đồ uống',
      nameEn: enData.drinks?.sectionTitle || enData.menuSection?.sectionTitle || enData.menu?.sectionTitle || 'Drinks',
      order: 0,
      items,
    });
  }

  return {
    id: config.id,
    slug: config.slug,
    name: config.name,
    description: viData.hero?.subtitle || null,
    address,
    phone,
    logoUrl,
    coverImageUrl,
    category: 'CAFE',
    cuisine: viData.hero?.badge || 'Cà phê',
    openingHours: viData.location?.hours || '07:00 - 22:00',
    isActive: true,
    menuCategories,
  };
}
