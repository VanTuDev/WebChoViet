/**
 * Category: milk-tea — xem src/data/Template/milk-tea/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_milktea1 from '../../Template/milk-tea/MilkTea-1/i18n/vi.json';

export const MILK_TEA_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'milk-tea-1',
    name: 'Boba Station',
    description: 'Thiết kế tươi sáng tông hồng-tím cho tiệm trà sữa handmade. Menu 6 món nổi bật dạng card, hero gradient pastel, info bar nổi bật. Phù hợp chuỗi trà sữa, bubble tea Đài Loan.',
    category: 'milk-tea',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Trà Sữa', 'Bubble Tea', 'Handmade'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/milk-tea/MilkTea-1/index')),
    schema: schema_milktea1 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=70' },
    ],
  },
];
