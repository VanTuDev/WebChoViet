/**
 * Category: gym — xem src/data/Template/gym/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_gym1 from '../../Template/gym/Gym-1/i18n/vi.json';

export const GYM_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'gym-1',
    name: 'Iron Zone',
    description: 'Giao diện mạnh mẽ tông tối với accent cam cho phòng gym, fitness. Hero fullscreen tối với overlay, grid 6 chương trình tập, bảng giá 3 gói thành viên, info bar cam năng động.',
    category: 'gym',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Gym', 'Fitness', 'Bảng Giá'],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/gym/Gym-1/index')),
    schema: schema_gym1 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=70' },
    ],
  },
];
