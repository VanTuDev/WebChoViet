/**
 * Category: gym — xem src/data/Template/gym/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_gym1 from '../../Template/gym/Gym-1/i18n/vi.json';
import schema_gym2 from '../../Template/gym/Gym-2/i18n/vi.json';
import schema_gym3 from '../../Template/gym/Gym-3/i18n/vi.json';
import schema_gym4 from '../../Template/gym/Gym-4/i18n/vi.json';

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
  {
    id: 'gym-2',
    name: 'Crimson Peak',
    description: 'Phòng gym công nghệ 3.0 tông đen - đỏ crimson, hiệu ứng glassmorphism 3D. Bento grid công nghệ độc bản (thiết bị AI, ánh sáng sinh học, xông hơi hồng ngoại), stat bar hiệu suất, 3 gói thành viên, testimonial hội viên.',
    category: 'gym',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Gym', 'Công Nghệ', 'Tông Tối'],
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/gym/Gym-2/index')),
    schema: schema_gym2 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&auto=format&fit=crop&q=70' },
      { key: 'feature', label: 'Ảnh Ánh Sáng Sinh Học', defaultUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=70' },
    ],
  },
  {
    id: 'gym-3',
    name: 'Terra Strength',
    description: 'Phòng gym boutique cao cấp tông bronze - ấm áp, phong cách tactile neomorphism. Bento 3 dịch vụ đặc quyền (gym hiện đại, PT cá nhân, yoga tĩnh tâm), stat bar độ chính xác, bảng giá 3 gói, testimonial học viên.',
    category: 'gym',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Gym', 'Cao Cấp', 'Yoga'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/gym/Gym-3/index')),
    schema: schema_gym3 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&auto=format&fit=crop&q=70' },
      { key: 'program_0', label: 'Ảnh Phòng Gym Hiện Đại', defaultUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&auto=format&fit=crop&q=70' },
      { key: 'program_1', label: 'Ảnh Huấn Luyện Cá Nhân', defaultUrl: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=700&auto=format&fit=crop&q=70' },
      { key: 'program_2', label: 'Ảnh Yoga & Tĩnh Tâm', defaultUrl: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=700&auto=format&fit=crop&q=70' },
    ],
  },
  {
    id: 'gym-4',
    name: 'Aether Fitness',
    description: 'Phòng gym vũ trụ tương lai tông đen - cyan - tím nebula, glassmorphism công nghệ cao. Section công nghệ Aura-Sense, 3 chương trình Nebula Space (thiền, yoga, sound bath), 3 gói phi hành gia, testimonial cộng đồng.',
    category: 'gym',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Gym', 'Futuristic', 'Yoga'],
    imageUrl: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/gym/Gym-4/index')),
    schema: schema_gym4 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1400&auto=format&fit=crop&q=70' },
      { key: 'tech', label: 'Ảnh Công Nghệ Aura-Sense', defaultUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&auto=format&fit=crop&q=70' },
      { key: 'nebula', label: 'Ảnh Nền Nebula Space', defaultUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1400&auto=format&fit=crop&q=70' },
    ],
  },
];
