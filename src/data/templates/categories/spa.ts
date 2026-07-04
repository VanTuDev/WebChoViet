/**
 * Category: spa — xem src/data/Template/spa/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_spa1 from '../../Template/spa/Spa-1/i18n/vi.json';

export const SPA_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'spa-1',
    name: 'Lotus Spa',
    description: 'Thiết kế tinh tế tông xanh sage cho spa và thẩm mỹ viện cao cấp. Hero fullscreen overlay xanh mướt, grid 6 dịch vụ với icon, info bar emerald sang trọng. Phù hợp nail salon, massage.',
    category: 'spa',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Spa', 'Thẩm Mỹ', 'Massage'],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/spa/Spa-1/index')),
    schema: schema_spa1 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=70' },
    ],
  },
];
