import { useEffect, useState } from 'react';
import { fetchTemplatePrices, type TemplateAccessInfo, type UserPlan } from '../services/templateBillingService';

export interface EffectiveTemplateAccess {
  minPlan: UserPlan;
  price: number;
}

// Cache module-level — nhiều component (Marketplace, TemplatePreview, PublishModal) cùng cần
// giá/gói template nhưng chỉ nên gọi /templates/prices 1 lần mỗi phiên, không phải 1 lần/component.
let cache: Record<string, TemplateAccessInfo> | null = null;
let inflight: Promise<Record<string, TemplateAccessInfo>> | null = null;

function loadPrices(): Promise<Record<string, TemplateAccessInfo>> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetchTemplatePrices()
      .then(data => { cache = data; return data; })
      .catch(() => ({}))
      .finally(() => { inflight = null; });
  }
  return inflight;
}

/**
 * Điều kiện truy cập hiệu lực cho 1 template: override do admin set (nếu có) qua
 * AdminTemplatesPage, else mặc định minPlan 'free' + giá tĩnh từ FE registry
 * (src/data/templates/categories/*.ts) — khớp đúng logic `resolveAccess` phía backend.
 */
export function useTemplateAccess() {
  const [overrides, setOverrides] = useState<Record<string, TemplateAccessInfo>>(cache ?? {});

  useEffect(() => {
    let cancelled = false;
    loadPrices().then(data => { if (!cancelled) setOverrides(data); });
    return () => { cancelled = true; };
  }, []);

  function getEffectiveAccess(templateId: string, staticPrice: number): EffectiveTemplateAccess {
    return overrides[templateId] ?? { minPlan: 'free', price: staticPrice };
  }

  return { getEffectiveAccess };
}
