/**
 * Category: gym — xem src/data/Template/gym/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_gym1 from '../../Template/gym/Gym-1/i18n/vi.json';
import schema_gym2 from '../../Template/gym/Gym-2/i18n/vi.json';
import schema_gym3 from '../../Template/gym/Gym-3/i18n/vi.json';
import schema_gym4 from '../../Template/gym/Gym-4/i18n/vi.json';
import img_Gym1_card from '../../Template/gym/Gym-1/images/card.jpg';
import img_Gym1_hero from '../../Template/gym/Gym-1/images/hero.jpg';
import img_Gym2_card from '../../Template/gym/Gym-2/images/card.jpg';
import img_Gym2_hero from '../../Template/gym/Gym-2/images/hero.jpg';
import img_Gym2_feature from '../../Template/gym/Gym-2/images/feature.jpg';
import img_Gym3_card from '../../Template/gym/Gym-3/images/card.jpg';
import img_Gym3_hero from '../../Template/gym/Gym-3/images/hero.jpg';
import img_Gym3_program0 from '../../Template/gym/Gym-3/images/program0.jpg';
import img_Gym3_program1 from '../../Template/gym/Gym-3/images/program1.jpg';
import img_Gym3_program2 from '../../Template/gym/Gym-3/images/program2.jpg';
import img_Gym4_card from '../../Template/gym/Gym-4/images/card.jpg';
import img_Gym4_hero from '../../Template/gym/Gym-4/images/hero.jpg';
import img_Gym4_tech from '../../Template/gym/Gym-4/images/tech.jpg';
import img_Gym4_nebula from '../../Template/gym/Gym-4/images/nebula.jpg';

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
    imageUrl: img_Gym1_card,
    component: lazy(() => import('../../Template/gym/Gym-1/index')),
    schema: schema_gym1 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: img_Gym1_hero },
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
    imageUrl: img_Gym2_card,
    component: lazy(() => import('../../Template/gym/Gym-2/index')),
    schema: schema_gym2 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: img_Gym2_hero },
      { key: 'feature', label: 'Ảnh Ánh Sáng Sinh Học', defaultUrl: img_Gym2_feature },
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
    imageUrl: img_Gym3_card,
    component: lazy(() => import('../../Template/gym/Gym-3/index')),
    schema: schema_gym3 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: img_Gym3_hero },
      { key: 'program_0', label: 'Ảnh Phòng Gym Hiện Đại', defaultUrl: img_Gym3_program0 },
      { key: 'program_1', label: 'Ảnh Huấn Luyện Cá Nhân', defaultUrl: img_Gym3_program1 },
      { key: 'program_2', label: 'Ảnh Yoga & Tĩnh Tâm', defaultUrl: img_Gym3_program2 },
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
    imageUrl: img_Gym4_card,
    component: lazy(() => import('../../Template/gym/Gym-4/index')),
    schema: schema_gym4 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: img_Gym4_hero },
      { key: 'tech', label: 'Ảnh Công Nghệ Aura-Sense', defaultUrl: img_Gym4_tech },
      { key: 'nebula', label: 'Ảnh Nền Nebula Space', defaultUrl: img_Gym4_nebula },
    ],
  },
];
