/**
 * Category: wedding — xem src/data/Template/wedding/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_wedding1 from '../../Template/wedding/Wedding-1/i18n/vi.json';
import schema_wedding2 from '../../Template/wedding/Wedding-2/i18n/vi.json';
import schema_wedding3 from '../../Template/wedding/Wedding-3/i18n/vi.json';
import img_Wedding1_card from '../../Template/wedding/Wedding-1/images/card.jpg';
import img_Wedding1_hero from '../../Template/wedding/Wedding-1/images/hero.jpg';
import img_Wedding2_card from '../../Template/wedding/Wedding-2/images/card.jpg';
import img_Wedding2_hero from '../../Template/wedding/Wedding-2/images/hero.jpg';
import img_Wedding2_gallery0 from '../../Template/wedding/Wedding-2/images/gallery0.jpg';
import img_Wedding2_gallery2 from '../../Template/wedding/Wedding-2/images/gallery2.jpg';
import img_Wedding3_card from '../../Template/wedding/Wedding-3/images/card.png';
import img_Wedding3_hero from '../../Template/wedding/Wedding-3/images/hero.png';
import img_Wedding3_gallery0 from '../../Template/wedding/Wedding-3/images/gallery0.jpg';
import img_Wedding3_gallery1 from '../../Template/wedding/Wedding-3/images/gallery1.png';

export const WEDDING_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'wedding-1',
    name: 'Thiệp Hồng',
    description: 'Thiệp cưới online lãng mạn tông vàng gold. Hero cặp đôi fullscreen, phần câu chuyện tình yêu, timeline sự kiện, form RSVP tương tác, info bar gold sang trọng. Phù hợp mọi phong cách đám cưới.',
    category: 'wedding',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Thiệp Cưới', 'RSVP', 'Lãng Mạn'],
    imageUrl: img_Wedding1_card,
    component: lazy(() => import('../../Template/wedding/Wedding-1/index')),
    schema: schema_wedding1 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Cặp Đôi', defaultUrl: img_Wedding1_hero },
    ],
  },

  {
    id: 'wedding-2',
    name: 'Ánh Bạc',
    description: 'Thiệp cưới Navy & Gold sang trọng. Hero fullscreen tối, countdown timer đếm ngược thực tế, gallery 4 ảnh hover-reveal, timeline sự kiện với icon, RSVP trên nền tối. Phong cách cổ điển, formal.',
    category: 'wedding',
    price: 299000,
    priceText: '299,000đ',
    tags: ['Thiệp Cưới', 'Countdown', 'Gallery', 'Navy Gold'],
    imageUrl: img_Wedding2_card,
    component: lazy(() => import('../../Template/wedding/Wedding-2/index')),
    schema: schema_wedding2 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',      label: 'Ảnh Hero Cặp Đôi', defaultUrl: img_Wedding2_hero },
      { key: 'gallery_0', label: 'Album 1',            defaultUrl: img_Wedding2_gallery0 },
      { key: 'gallery_1', label: 'Album 2',            defaultUrl: 'https://images.unsplash.com/photo-1501967786-f47cf5c70756?w=600&auto=format&fit=crop&q=70' },
      { key: 'gallery_2', label: 'Album 3',            defaultUrl: img_Wedding2_gallery2 },
      { key: 'gallery_3', label: 'Album 4',            defaultUrl: 'https://images.unsplash.com/photo-1524824267900-2b6acd5e8726?w=600&auto=format&fit=crop&q=70' },
    ],
  },

  {
    id: 'wedding-3',
    name: 'Thành Hỷ',
    description: 'Thiệp cưới phong cách cổ điển sang trọng tông kem-vàng gold, khung viền ornament tinh xảo. Save-the-date dạng lịch tháng, gallery bento, timeline nghi lễ dọc, sổ lưu bút RSVP. Hỗ trợ song ngữ Việt/Anh.',
    category: 'wedding',
    price: 249000,
    priceText: '249,000đ',
    badge: 'MỚI',
    tags: ['Thiệp Cưới', 'Cổ Điển', 'Save The Date'],
    imageUrl: img_Wedding3_card,
    component: lazy(() => import('../../Template/wedding/Wedding-3/index')),
    schema: schema_wedding3 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',      label: 'Ảnh Hero Cặp Đôi', defaultUrl: img_Wedding3_hero },
      { key: 'gallery_0', label: 'Album 1',            defaultUrl: img_Wedding3_gallery0 },
      { key: 'gallery_1', label: 'Album 2',            defaultUrl: img_Wedding3_gallery1 },
    ],
  },
];
