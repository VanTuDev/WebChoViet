/**
 * Category: spa — xem src/data/Template/spa/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_spa1 from '../../Template/spa/Spa-1/i18n/vi.json';
import schema_spa2 from '../../Template/spa/Spa-2/i18n/vi.json';
import schema_spa4 from '../../Template/spa/Spa-4/i18n/vi.json';
import schema_spa5 from '../../Template/spa/Spa-5/i18n/vi.json';
import schema_spa6 from '../../Template/spa/Spa-6/i18n/vi.json';
import img_Spa1_card from '../../Template/spa/Spa-1/images/card.jpg';
import img_Spa1_heroBg from '../../Template/spa/Spa-1/images/heroBg.jpg';
import img_Spa1_bentoImg from '../../Template/spa/Spa-1/images/bentoImg.jpg';
import img_Spa1_gallery1 from '../../Template/spa/Spa-1/images/gallery1.jpg';
import img_Spa1_gallery2 from '../../Template/spa/Spa-1/images/gallery2.jpg';
import img_Spa1_gallery3 from '../../Template/spa/Spa-1/images/gallery3.jpg';
import img_Spa2_card from '../../Template/spa/Spa-2/images/card.jpg';
import img_Spa4_card from '../../Template/spa/Spa-4/images/card.jpg';
import img_Spa5_card from '../../Template/spa/Spa-5/images/card.jpg';
import img_Spa6_card from '../../Template/spa/Spa-6/images/card.jpg';
import img_Spa2_heroImg from '../../Template/spa/Spa-2/images/heroImg.jpg';
import img_Spa2_acneImg from '../../Template/spa/Spa-2/images/acneImg.jpg';
import img_Spa2_skinCareImg from '../../Template/spa/Spa-2/images/skinCareImg.jpg';
import img_Spa2_bodyTherapyImg from '../../Template/spa/Spa-2/images/bodyTherapyImg.jpg';
import img_Spa2_teamPortrait1 from '../../Template/spa/Spa-2/images/teamPortrait1.jpg';
import img_Spa2_teamPortrait2 from '../../Template/spa/Spa-2/images/teamPortrait2.jpg';
import img_Spa4_heroBg from '../../Template/spa/Spa-4/images/heroBg.jpg';
import img_Spa4_journey0 from '../../Template/spa/Spa-4/images/journey0.jpg';
import img_Spa4_journey1 from '../../Template/spa/Spa-4/images/journey1.jpg';
import img_Spa4_journey2 from '../../Template/spa/Spa-4/images/journey2.jpg';
import img_Spa5_heroBg from '../../Template/spa/Spa-5/images/heroBg.jpg';
import img_Spa5_categoryMeditation from '../../Template/spa/Spa-5/images/categoryMeditation.jpg';
import img_Spa5_categoryYoga from '../../Template/spa/Spa-5/images/categoryYoga.jpg';
import img_Spa5_categoryHotStone from '../../Template/spa/Spa-5/images/categoryHotStone.jpg';
import img_Spa5_categoryOil from '../../Template/spa/Spa-5/images/categoryOil.jpg';
import img_Spa5_categoryDetox from '../../Template/spa/Spa-5/images/categoryDetox.jpg';
import img_Spa5_categoryFootBath from '../../Template/spa/Spa-5/images/categoryFootBath.jpg';
import img_Spa5_spaceLobby from '../../Template/spa/Spa-5/images/spaceLobby.jpg';
import img_Spa5_spaceRoom from '../../Template/spa/Spa-5/images/spaceRoom.jpg';
import img_Spa5_spaceFacial from '../../Template/spa/Spa-5/images/spaceFacial.jpg';
import img_Spa5_spaceZenGarden from '../../Template/spa/Spa-5/images/spaceZenGarden.jpg';
import img_Spa6_heroBg from '../../Template/spa/Spa-6/images/heroBg.jpg';
import img_Spa6_highlight1 from '../../Template/spa/Spa-6/images/highlight1.jpg';
import img_Spa6_highlight2 from '../../Template/spa/Spa-6/images/highlight2.jpg';
import img_Spa6_highlight3 from '../../Template/spa/Spa-6/images/highlight3.jpg';
import img_Spa6_atmosphere1 from '../../Template/spa/Spa-6/images/atmosphere1.jpg';
import img_Spa6_atmosphere2 from '../../Template/spa/Spa-6/images/atmosphere2.jpg';
import img_Spa6_locationMap from '../../Template/spa/Spa-6/images/locationMap.jpg';

export const SPA_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'spa-1',
    name: 'Aura Clinic',
    description: 'Phòng khám da liễu thẩm mỹ chuyên trị mụn công nghệ cao. Hero với bằng chứng xã hội (1,200+ khách hàng), bento 4 điểm mạnh, gallery không gian, bảng dịch vụ chi tiết và khu vực tin cậy (chứng chỉ, bác sĩ).',
    category: 'spa',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Trị Mụn', 'Da Liễu', 'Công Nghệ Cao'],
    imageUrl: img_Spa1_card,
    component: lazy(() => import('../../Template/spa/Spa-1/index')),
    schema: schema_spa1 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroBg',  label: 'Ảnh nền Hero', defaultUrl: img_Spa1_heroBg },
      { key: 'bentoImg', label: 'Ảnh bento nổi bật', defaultUrl: img_Spa1_bentoImg },
      { key: 'gallery1', label: 'Không gian 1',   defaultUrl: img_Spa1_gallery1 },
      { key: 'gallery2', label: 'Không gian 2',   defaultUrl: img_Spa1_gallery2 },
      { key: 'gallery3', label: 'Không gian 3',   defaultUrl: img_Spa1_gallery3 },
    ],
  },
  {
    id: 'spa-2',
    name: 'Aura Wellness',
    description: 'Tại Aura Wellness, chúng tôi kết hợp khoa học trị liệu làn da chuyên sâu với không gian nghỉ dưỡng tĩnh lặng, mang lại trải nghiệm phục hồi toàn diện.',
    category: 'spa',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["SPA","Bản Đồ"],
    imageUrl: img_Spa2_card,
    component: lazy(() => import('../../Template/spa/Spa-2/index')),
    schema: schema_spa2 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroImg",
              "label": "Ảnh Hero",
              "defaultUrl": img_Spa2_heroImg
        },
        {
              "key": "acneImg",
              "label": "acneImg",
              "defaultUrl": img_Spa2_acneImg
        },
        {
              "key": "skinCareImg",
              "label": "skinCareImg",
              "defaultUrl": img_Spa2_skinCareImg
        },
        {
              "key": "bodyTherapyImg",
              "label": "bodyTherapyImg",
              "defaultUrl": img_Spa2_bodyTherapyImg
        },
        {
              "key": "teamPortrait1",
              "label": "teamPortrait1",
              "defaultUrl": img_Spa2_teamPortrait1
        },
        {
              "key": "teamPortrait2",
              "label": "teamPortrait2",
              "defaultUrl": img_Spa2_teamPortrait2
        }
  ],
  },
  {
    id: 'spa-4',
    name: 'Luminous Precision Clinic',
    description: 'Trải nghiệm công nghệ thẩm mỹ hiện đại kết hợp với quy trình lâm sàng chuẩn y khoa. Chúng tôi mang đến giải pháp cá nhân hóa cho vẻ đẹp bền vững.',
    category: 'spa',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["SPA","Bản Đồ"],
    imageUrl: img_Spa4_card,
    component: lazy(() => import('../../Template/spa/Spa-4/index')),
    schema: schema_spa4 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": img_Spa4_heroBg
        },
        {
              "key": "journey_0",
              "label": "journey_0",
              "defaultUrl": img_Spa4_journey0
        },
        {
              "key": "journey_1",
              "label": "journey_1",
              "defaultUrl": img_Spa4_journey1
        },
        {
              "key": "journey_2",
              "label": "journey_2",
              "defaultUrl": img_Spa4_journey2
        }
  ],
  },
  {
    id: 'spa-5',
    name: 'Zenith',
    description: 'Một không gian tinh tuyển được thiết kế để thanh lọc tâm trí và hồi phục cơ thể thông qua nghệ thuật tối giản.',
    category: 'spa',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["SPA","Bản Đồ","Đánh Giá"],
    imageUrl: img_Spa5_card,
    component: lazy(() => import('../../Template/spa/Spa-5/index')),
    schema: schema_spa5 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": img_Spa5_heroBg
        },
        {
              "key": "categoryMeditation",
              "label": "categoryMeditation",
              "defaultUrl": img_Spa5_categoryMeditation
        },
        {
              "key": "categoryYoga",
              "label": "categoryYoga",
              "defaultUrl": img_Spa5_categoryYoga
        },
        {
              "key": "categoryHotStone",
              "label": "categoryHotStone",
              "defaultUrl": img_Spa5_categoryHotStone
        },
        {
              "key": "categoryOil",
              "label": "categoryOil",
              "defaultUrl": img_Spa5_categoryOil
        },
        {
              "key": "categoryDetox",
              "label": "categoryDetox",
              "defaultUrl": img_Spa5_categoryDetox
        },
        {
              "key": "categoryFootBath",
              "label": "categoryFootBath",
              "defaultUrl": img_Spa5_categoryFootBath
        },
        {
              "key": "spaceLobby",
              "label": "spaceLobby",
              "defaultUrl": img_Spa5_spaceLobby
        },
        {
              "key": "spaceRoom",
              "label": "spaceRoom",
              "defaultUrl": img_Spa5_spaceRoom
        },
        {
              "key": "spaceFacial",
              "label": "spaceFacial",
              "defaultUrl": img_Spa5_spaceFacial
        },
        {
              "key": "spaceZenGarden",
              "label": "spaceZenGarden",
              "defaultUrl": img_Spa5_spaceZenGarden
        }
  ],
  },
  {
    id: 'spa-6',
    name: 'Ocean Oasis',
    description: 'Đắm mình trong không gian tĩnh lặng, nơi tiếng sóng vỗ và liệu pháp thủy trị liệu mang lại sự cân bằng tuyệt đối cho thân, tâm và trí.',
    category: 'spa',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["SPA","Bản Đồ","Đặt Lịch"],
    imageUrl: img_Spa6_card,
    component: lazy(() => import('../../Template/spa/Spa-6/index')),
    schema: schema_spa6 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": img_Spa6_heroBg
        },
        {
              "key": "highlight1",
              "label": "highlight1",
              "defaultUrl": img_Spa6_highlight1
        },
        {
              "key": "highlight2",
              "label": "highlight2",
              "defaultUrl": img_Spa6_highlight2
        },
        {
              "key": "highlight3",
              "label": "highlight3",
              "defaultUrl": img_Spa6_highlight3
        },
        {
              "key": "atmosphere1",
              "label": "atmosphere1",
              "defaultUrl": img_Spa6_atmosphere1
        },
        {
              "key": "atmosphere2",
              "label": "atmosphere2",
              "defaultUrl": img_Spa6_atmosphere2
        },
        {
              "key": "locationMap",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": img_Spa6_locationMap
        }
  ],
  },
];
