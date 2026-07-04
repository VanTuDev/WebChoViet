/**
 * Category: wedding — xem src/data/Template/wedding/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_wedding1 from '../../Template/wedding/Wedding-1/i18n/vi.json';
import schema_wedding2 from '../../Template/wedding/Wedding-2/i18n/vi.json';
import schema_wedding3 from '../../Template/wedding/Wedding-3/i18n/vi.json';

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
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/wedding/Wedding-1/index')),
    schema: schema_wedding1 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Cặp Đôi', defaultUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=70' },
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
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&auto=format&fit=crop&q=70',
    component: lazy(() => import('../../Template/wedding/Wedding-2/index')),
    schema: schema_wedding2 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',      label: 'Ảnh Hero Cặp Đôi', defaultUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&auto=format&fit=crop&q=75' },
      { key: 'gallery_0', label: 'Album 1',            defaultUrl: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&auto=format&fit=crop&q=70' },
      { key: 'gallery_1', label: 'Album 2',            defaultUrl: 'https://images.unsplash.com/photo-1501967786-f47cf5c70756?w=600&auto=format&fit=crop&q=70' },
      { key: 'gallery_2', label: 'Album 3',            defaultUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop&q=70' },
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhA_hTI6n8Eny8ykuqqT9nigsfgaE53fwSpOMTTPE6qbJcYu_Y1UnmSSac8gyVr6HCsS2_lvRvwf7-CJaSP5qNYGhlWoCe-eSNcb_WATav_n-LYSYzTckTR-PhRnWj3znJD9f8bK77j4LtM0CIfxjkkxxSFUFn7qXoBZHayf4e1RMSv6i3jEFEaTLgBBkuXFDT8htikojB7ztsXH0qamDlqz7ivgdqcwFRdW21Kj5FXwPlVsfvB3xu4kNoC_Fhzs8aUX_j14uv5UY',
    component: lazy(() => import('../../Template/wedding/Wedding-3/index')),
    schema: schema_wedding3 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',      label: 'Ảnh Hero Cặp Đôi', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhA_hTI6n8Eny8ykuqqT9nigsfgaE53fwSpOMTTPE6qbJcYu_Y1UnmSSac8gyVr6HCsS2_lvRvwf7-CJaSP5qNYGhlWoCe-eSNcb_WATav_n-LYSYzTckTR-PhRnWj3znJD9f8bK77j4LtM0CIfxjkkxxSFUFn7qXoBZHayf4e1RMSv6i3jEFEaTLgBBkuXFDT8htikojB7ztsXH0qamDlqz7ivgdqcwFRdW21Kj5FXwPlVsfvB3xu4kNoC_Fhzs8aUX_j14uv5UY' },
      { key: 'gallery_0', label: 'Album 1',            defaultUrl: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=70' },
      { key: 'gallery_1', label: 'Album 2',            defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWBXCiCfNQMpA9nwOtKfUIm8LPpysQvoaIixt6LyhLfL8aCkND82L9fHSBbj-yQxBTrgnLy2GCAPahhKq361G_h3EBAIRhWusdGDiQxezk4DXLr7QDIoLQ9RpIle0dCqDYUYat4RYoc0Vf4jaQvVVntVHReJxyDJCta8MdBVKvZBsnScWwPhUjBSyuRn9euqLUAVtbWhhzazNthXxdwqHGp5bS_QpfYeK66XzmvVtY6eVemyKSX5G77-gyiMTKyppVdvfDEl-i634' },
    ],
  },
];
