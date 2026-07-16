/**
 * Category: restaurant — xem src/data/Template/restaurant/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_restaurant1 from '../../Template/restaurant/Restaurant-1/i18n/vi.json';
import schema_restaurant2 from '../../Template/restaurant/Restaurant-2/i18n/vi.json';
import schema_restaurant3 from '../../Template/restaurant/Restaurant-3/i18n/vi.json';
import schema_restaurant4 from '../../Template/restaurant/Restaurant-4/i18n/vi.json';
import schema_restaurant5 from '../../Template/restaurant/Restaurant-5/i18n/vi.json';
import schema_restaurant6 from '../../Template/restaurant/Restaurant-6/i18n/vi.json';
import schema_restaurant7 from '../../Template/restaurant/Restaurant-7/i18n/vi.json';
import img_Restaurant1_card from '../../Template/restaurant/Restaurant-1/images/card.jpg';
import img_Restaurant1_hero from '../../Template/restaurant/Restaurant-1/images/hero.jpg';
import img_Restaurant2_card from '../../Template/restaurant/Restaurant-2/images/card.png';
import img_Restaurant2_hero from '../../Template/restaurant/Restaurant-2/images/hero.png';
import img_Restaurant2_about from '../../Template/restaurant/Restaurant-2/images/about.png';
import img_Restaurant2_menu0 from '../../Template/restaurant/Restaurant-2/images/menu0.png';
import img_Restaurant2_menu1 from '../../Template/restaurant/Restaurant-2/images/menu1.png';
import img_Restaurant2_menu2 from '../../Template/restaurant/Restaurant-2/images/menu2.png';
import img_Restaurant2_menu3 from '../../Template/restaurant/Restaurant-2/images/menu3.png';
import img_Restaurant2_avatar0 from '../../Template/restaurant/Restaurant-2/images/avatar0.png';
import img_Restaurant2_avatar1 from '../../Template/restaurant/Restaurant-2/images/avatar1.png';
import img_Restaurant2_avatar2 from '../../Template/restaurant/Restaurant-2/images/avatar2.png';
import img_Restaurant2_map from '../../Template/restaurant/Restaurant-2/images/map.png';
import img_Restaurant3_card from '../../Template/restaurant/Restaurant-3/images/card.jpg';
import img_Restaurant4_card from '../../Template/restaurant/Restaurant-4/images/card.jpg';
import img_Restaurant5_card from '../../Template/restaurant/Restaurant-5/images/card.jpg';
import img_Restaurant6_card from '../../Template/restaurant/Restaurant-6/images/card.jpg';
import img_Restaurant3_hero from '../../Template/restaurant/Restaurant-3/images/hero.jpg';
import img_Restaurant3_broth from '../../Template/restaurant/Restaurant-3/images/broth.jpg';
import img_Restaurant3_wagyu from '../../Template/restaurant/Restaurant-3/images/wagyu.jpg';
import img_Restaurant3_seafood from '../../Template/restaurant/Restaurant-3/images/seafood.jpg';
import img_Restaurant3_private from '../../Template/restaurant/Restaurant-3/images/private.jpg';
import img_Restaurant3_group from '../../Template/restaurant/Restaurant-3/images/group.jpg';
import img_Restaurant3_terrace from '../../Template/restaurant/Restaurant-3/images/terrace.jpg';
import img_Restaurant3_map from '../../Template/restaurant/Restaurant-3/images/map.jpg';
import img_Restaurant4_heroBg from '../../Template/restaurant/Restaurant-4/images/heroBg.jpg';
import img_Restaurant4_menuFeatured from '../../Template/restaurant/Restaurant-4/images/menuFeatured.jpg';
import img_Restaurant4_spaceMain from '../../Template/restaurant/Restaurant-4/images/spaceMain.jpg';
import img_Restaurant4_spaceWok from '../../Template/restaurant/Restaurant-4/images/spaceWok.jpg';
import img_Restaurant4_spaceTea from '../../Template/restaurant/Restaurant-4/images/spaceTea.jpg';
import img_Restaurant4_spaceDecor from '../../Template/restaurant/Restaurant-4/images/spaceDecor.jpg';
import img_Restaurant4_mapImg from '../../Template/restaurant/Restaurant-4/images/mapImg.jpg';
import img_Restaurant5_heroBg from '../../Template/restaurant/Restaurant-5/images/heroBg.jpg';
import img_Restaurant5_bentoFlavor from '../../Template/restaurant/Restaurant-5/images/bentoFlavor.jpg';
import img_Restaurant5_bentoSpace from '../../Template/restaurant/Restaurant-5/images/bentoSpace.jpg';
import img_Restaurant5_menu1 from '../../Template/restaurant/Restaurant-5/images/menu1.jpg';
import img_Restaurant5_menu2 from '../../Template/restaurant/Restaurant-5/images/menu2.jpg';
import img_Restaurant5_menu3 from '../../Template/restaurant/Restaurant-5/images/menu3.jpg';
import img_Restaurant5_paymentVisa from '../../Template/restaurant/Restaurant-5/images/paymentVisa.jpg';
import img_Restaurant5_paymentMc from '../../Template/restaurant/Restaurant-5/images/paymentMc.jpg';
import img_Restaurant6_heroBg from '../../Template/restaurant/Restaurant-6/images/heroBg.jpg';
import img_Restaurant6_cat0 from '../../Template/restaurant/Restaurant-6/images/cat0.jpg';
import img_Restaurant6_cat1 from '../../Template/restaurant/Restaurant-6/images/cat1.jpg';
import img_Restaurant6_cat2 from '../../Template/restaurant/Restaurant-6/images/cat2.jpg';
import img_Restaurant6_signature from '../../Template/restaurant/Restaurant-6/images/signature.jpg';
import img_Restaurant6_chef0 from '../../Template/restaurant/Restaurant-6/images/chef0.jpg';
import img_Restaurant6_chef1 from '../../Template/restaurant/Restaurant-6/images/chef1.jpg';
import img_Restaurant6_chef2 from '../../Template/restaurant/Restaurant-6/images/chef2.jpg';
import img_Restaurant6_map from '../../Template/restaurant/Restaurant-6/images/map.jpg';
import img_Restaurant7_menuHighlight from '../../Template/restaurant/Restaurant-7/images/menuHighlight.jpg';
import img_Restaurant7_mapFallback from '../../Template/restaurant/Restaurant-7/images/mapFallback.jpg';

export const RESTAURANT_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'restaurant-1',
    name: 'Phố Ẩm Thực',
    description: 'Giao diện ấm cúng tông nâu gỗ cho nhà hàng Việt Nam truyền thống. Hero fullscreen với overlay, menu 6 món đặc sắc dạng card, info bar nâu sang trọng. Phù hợp quán ăn, nhà hàng gia đình.',
    category: 'restaurant',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Nhà Hàng', 'Ẩm Thực Việt', 'Đặt Bàn'],
    imageUrl: img_Restaurant1_card,
    component: lazy(() => import('../../Template/restaurant/Restaurant-1/index')),
    schema: schema_restaurant1 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero', label: 'Ảnh Hero', defaultUrl: img_Restaurant1_hero },
    ],
  },

  {
    id: 'restaurant-2',
    name: 'Bếp Việt Premium',
    description: 'Nhà hàng cao cấp phong cách corporate hiện đại. Hero fullscreen thanh lịch, menu bento 4 món đặc sắc, đánh giá khách hàng dạng glassmorphism, form đặt bàn đầy đủ kèm bản đồ. Hỗ trợ sẵn 4 ngôn ngữ Việt/Anh/Trung/Hàn.',
    category: 'restaurant',
    price: 399000,
    priceText: '399,000đ',
    badge: 'MỚI',
    tags: ['Nhà Hàng Cao Cấp', 'Form Đặt Bàn', '4 Ngôn Ngữ'],
    imageUrl: img_Restaurant2_card,
    component: lazy(() => import('../../Template/restaurant/Restaurant-2/index')),
    schema: schema_restaurant2 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',     label: 'Ảnh nền Hero',      defaultUrl: img_Restaurant2_hero },
      { key: 'about',    label: 'Ảnh giới thiệu',    defaultUrl: img_Restaurant2_about },
      { key: 'menu_0',   label: 'Món 1 (Phở Bò)',    defaultUrl: img_Restaurant2_menu0 },
      { key: 'menu_1',   label: 'Món 2 (Gỏi Cuốn)',  defaultUrl: img_Restaurant2_menu1 },
      { key: 'menu_2',   label: 'Món 3 (Chả Cá)',    defaultUrl: img_Restaurant2_menu2 },
      { key: 'menu_3',   label: 'Món 4 (Chè Sen)',   defaultUrl: img_Restaurant2_menu3 },
      { key: 'avatar_0', label: 'Avatar đánh giá 1', defaultUrl: img_Restaurant2_avatar0 },
      { key: 'avatar_1', label: 'Avatar đánh giá 2', defaultUrl: img_Restaurant2_avatar1 },
      { key: 'avatar_2', label: 'Avatar đánh giá 3', defaultUrl: img_Restaurant2_avatar2 },
      { key: 'map',      label: 'Ảnh bản đồ',        defaultUrl: img_Restaurant2_map },
    ],
  },
  {
    id: 'restaurant-3',
    name: 'Sizzling Hearth',
    description: 'Trải nghiệm hương vị lẩu truyền thống tinh tế trong không gian hiện đại và ấm cúng.',
    category: 'restaurant',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá","Đặt Lịch"],
    imageUrl: img_Restaurant3_card,
    component: lazy(() => import('../../Template/restaurant/Restaurant-3/index')),
    schema: schema_restaurant3 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "hero",
              "label": "Ảnh Hero",
              "defaultUrl": img_Restaurant3_hero
        },
        {
              "key": "broth",
              "label": "broth",
              "defaultUrl": img_Restaurant3_broth
        },
        {
              "key": "wagyu",
              "label": "wagyu",
              "defaultUrl": img_Restaurant3_wagyu
        },
        {
              "key": "seafood",
              "label": "seafood",
              "defaultUrl": img_Restaurant3_seafood
        },
        {
              "key": "private",
              "label": "private",
              "defaultUrl": img_Restaurant3_private
        },
        {
              "key": "group",
              "label": "group",
              "defaultUrl": img_Restaurant3_group
        },
        {
              "key": "terrace",
              "label": "terrace",
              "defaultUrl": img_Restaurant3_terrace
        },
        {
              "key": "map",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": img_Restaurant3_map
        }
  ],
  },
  {
    id: 'restaurant-4',
    name: 'Siam Street Food',
    description: 'Đưa bạn đến những con hẻm rực rỡ ánh đèn neon tại Bangkok, nơi những chảo hủ tiếu nghi ngút khói và hương vị cay nồng quyến rũ.',
    category: 'restaurant',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá"],
    imageUrl: img_Restaurant4_card,
    component: lazy(() => import('../../Template/restaurant/Restaurant-4/index')),
    schema: schema_restaurant4 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": img_Restaurant4_heroBg
        },
        {
              "key": "menuFeatured",
              "label": "Ảnh Món Featured",
              "defaultUrl": img_Restaurant4_menuFeatured
        },
        {
              "key": "spaceMain",
              "label": "spaceMain",
              "defaultUrl": img_Restaurant4_spaceMain
        },
        {
              "key": "spaceWok",
              "label": "spaceWok",
              "defaultUrl": img_Restaurant4_spaceWok
        },
        {
              "key": "spaceTea",
              "label": "spaceTea",
              "defaultUrl": img_Restaurant4_spaceTea
        },
        {
              "key": "spaceDecor",
              "label": "spaceDecor",
              "defaultUrl": img_Restaurant4_spaceDecor
        },
        {
              "key": "mapImg",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": img_Restaurant4_mapImg
        }
  ],
  },
  {
    id: 'restaurant-5',
    name: 'Golden Lotus Dining',
    description: 'Nơi nghệ thuật ẩm thực Thái Lan giao thoa với sự thanh tao của không gian hiện đại. Trải nghiệm hương vị tinh hoa được chế tác từ nguyên liệu thuần khiết nhất.',
    category: 'restaurant',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá","Đặt Lịch"],
    imageUrl: img_Restaurant5_card,
    component: lazy(() => import('../../Template/restaurant/Restaurant-5/index')),
    schema: schema_restaurant5 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": img_Restaurant5_heroBg
        },
        {
              "key": "bentoFlavor",
              "label": "bentoFlavor",
              "defaultUrl": img_Restaurant5_bentoFlavor
        },
        {
              "key": "bentoSpace",
              "label": "bentoSpace",
              "defaultUrl": img_Restaurant5_bentoSpace
        },
        {
              "key": "menu1",
              "label": "Ảnh Món 1",
              "defaultUrl": img_Restaurant5_menu1
        },
        {
              "key": "menu2",
              "label": "Ảnh Món 2",
              "defaultUrl": img_Restaurant5_menu2
        },
        {
              "key": "menu3",
              "label": "Ảnh Món 3",
              "defaultUrl": img_Restaurant5_menu3
        },
        {
              "key": "paymentVisa",
              "label": "paymentVisa",
              "defaultUrl": img_Restaurant5_paymentVisa
        },
        {
              "key": "paymentMc",
              "label": "paymentMc",
              "defaultUrl": img_Restaurant5_paymentMc
        }
  ],
  },
  {
    id: 'restaurant-6',
    name: 'Siam Teak House',
    description: 'Trải nghiệm không gian sang trọng với nội thất gỗ Teak chạm khắc thủ công, nơi mỗi món ăn là một tác phẩm nghệ thuật truyền thống.',
    category: 'restaurant',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá","Đặt Lịch"],
    imageUrl: img_Restaurant6_card,
    component: lazy(() => import('../../Template/restaurant/Restaurant-6/index')),
    schema: schema_restaurant6 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": img_Restaurant6_heroBg
        },
        {
              "key": "cat_0",
              "label": "cat_0",
              "defaultUrl": img_Restaurant6_cat0
        },
        {
              "key": "cat_1",
              "label": "cat_1",
              "defaultUrl": img_Restaurant6_cat1
        },
        {
              "key": "cat_2",
              "label": "cat_2",
              "defaultUrl": img_Restaurant6_cat2
        },
        {
              "key": "signature",
              "label": "signature",
              "defaultUrl": img_Restaurant6_signature
        },
        {
              "key": "chef_0",
              "label": "chef_0",
              "defaultUrl": img_Restaurant6_chef0
        },
        {
              "key": "chef_1",
              "label": "chef_1",
              "defaultUrl": img_Restaurant6_chef1
        },
        {
              "key": "chef_2",
              "label": "chef_2",
              "defaultUrl": img_Restaurant6_chef2
        },
        {
              "key": "map",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": img_Restaurant6_map
        }
  ],
  },
  {
    id: 'restaurant-7',
    name: 'Crimson Sushi',
    description: 'Mỗi miếng sushi tại Crimson là một tác phẩm điêu khắc tinh vi, nơi sự tươi ngon của đại dương hòa quyện cùng kỹ thuật bậc thầy của các nghệ nhân.',
    category: 'restaurant',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["RESTAURANT","Thực Đơn","Bản Đồ","Đánh Giá"],
    imageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLvWGLzS4GDNPNs6dtEzfgiEs2NLzqNcAm2-St4v1GXWLoNVEfZFNi6kmeMxOy83S_jlLOdaqOkfkJOkEmu919gm3YQXfqv1Sgm1xv0IhA5Ke_Hx6M4Bi9Qm25HAuZ_34SnpQ6fU4hVUvMI3T36GoBL82qjMxYGoytkEYcKfFQjnK1pJOPJIwtOuKykL7d5EmHe4SV5PBnJHQIk5LPXxK4WzdWQXue0tia-vTPsbxG0qTzfddtdk0-wI_A',
    component: lazy(() => import('../../Template/restaurant/Restaurant-7/index')),
    schema: schema_restaurant7 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "hero",
              "label": "Ảnh Hero",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLvWGLzS4GDNPNs6dtEzfgiEs2NLzqNcAm2-St4v1GXWLoNVEfZFNi6kmeMxOy83S_jlLOdaqOkfkJOkEmu919gm3YQXfqv1Sgm1xv0IhA5Ke_Hx6M4Bi9Qm25HAuZ_34SnpQ6fU4hVUvMI3T36GoBL82qjMxYGoytkEYcKfFQjnK1pJOPJIwtOuKykL7d5EmHe4SV5PBnJHQIk5LPXxK4WzdWQXue0tia-vTPsbxG0qTzfddtdk0-wI_A"
        },
        {
              "key": "story",
              "label": "story",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLsk1-akQjPqvE_eK92bQiR4DflPO8rjkzLPWw2LcmOVhYtPDClh2rXkvhhk29X0aPMBoPuvsAxBbYdOjXSsTWXsJxwtxziK6bMiInWyS_cdjKohapRreKfRn2pqviKIDJUR_fB8l3N4By503vZsO3fPlwWIB_BqBNUgrK72F5tUP-1SlKOY6C-qW6JAqgV5-YYTaBZry16MSTcNzP7uGFf-JHG6GCMmlc1kKE-Wm7fWgsc3cobg2UyNVQI"
        },
        {
              "key": "menuHighlight",
              "label": "Ảnh Món Highlight",
              "defaultUrl": img_Restaurant7_menuHighlight
        },
        {
              "key": "mapFallback",
              "label": "Ảnh Bản Đồ",
              "defaultUrl": img_Restaurant7_mapFallback
        }
  ],
  },
];
