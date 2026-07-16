/**
 * Category: coffee — xem src/data/Template/coffee/README.md
 */
import { lazy } from 'react';
import type { TemplateDefinition } from '../types';

import schema_coffe1 from '../../Template/coffee/Coffe-1/i18n/vi.json';
import schema_coffe2 from '../../Template/coffee/Coffe-2/i18n/vi.json';
import schema_coffe3 from '../../Template/coffee/Coffe-3/i18n/vi.json';
import schema_coffe4 from '../../Template/coffee/Coffe-4/i18n/vi.json';
import schema_coffe5 from '../../Template/coffee/Coffe-5/i18n/vi.json';
import schema_coffe6 from '../../Template/coffee/Coffe-6/i18n/vi.json';
import schema_coffee7 from '../../Template/coffee/Coffe-7/i18n/vi.json';
import schema_coffee8 from '../../Template/coffee/Coffe-8/i18n/vi.json';
import img_Coffe1_card from '../../Template/coffee/Coffe-1/images/card.png';
import img_Coffe1_heroBg from '../../Template/coffee/Coffe-1/images/heroBg.png';
import img_Coffe1_heroMain from '../../Template/coffee/Coffe-1/images/heroMain.png';
import img_Coffe1_drink1 from '../../Template/coffee/Coffe-1/images/drink1.png';
import img_Coffe1_drink2 from '../../Template/coffee/Coffe-1/images/drink2.png';
import img_Coffe1_drink3 from '../../Template/coffee/Coffe-1/images/drink3.png';
import img_Coffe1_galleryMain from '../../Template/coffee/Coffe-1/images/galleryMain.png';
import img_Coffe1_gallery2 from '../../Template/coffee/Coffe-1/images/gallery2.png';
import img_Coffe1_gallery4 from '../../Template/coffee/Coffe-1/images/gallery4.png';
import img_Coffe2_card from '../../Template/coffee/Coffe-2/images/card.png';
import img_Coffe2_slide0 from '../../Template/coffee/Coffe-2/images/slide0.png';
import img_Coffe2_slide1 from '../../Template/coffee/Coffe-2/images/slide1.png';
import img_Coffe2_avatar0 from '../../Template/coffee/Coffe-2/images/avatar0.png';
import img_Coffe2_avatar1 from '../../Template/coffee/Coffe-2/images/avatar1.png';
import img_Coffe2_avatar2 from '../../Template/coffee/Coffe-2/images/avatar2.png';
import img_Coffe2_map from '../../Template/coffee/Coffe-2/images/map.png';
import img_Coffe2_space from '../../Template/coffee/Coffe-2/images/space.png';
import img_Coffe3_card from '../../Template/coffee/Coffe-3/images/card.png';
import img_Coffe3_hero from '../../Template/coffee/Coffe-3/images/hero.png';
import img_Coffe3_coffee0 from '../../Template/coffee/Coffe-3/images/coffee0.png';
import img_Coffe3_coffee1 from '../../Template/coffee/Coffe-3/images/coffee1.png';
import img_Coffe3_coffee2 from '../../Template/coffee/Coffe-3/images/coffee2.png';
import img_Coffe3_coffee3 from '../../Template/coffee/Coffe-3/images/coffee3.png';
import img_Coffe3_gallery0 from '../../Template/coffee/Coffe-3/images/gallery0.png';
import img_Coffe3_gallery1 from '../../Template/coffee/Coffe-3/images/gallery1.png';
import img_Coffe3_gallery2 from '../../Template/coffee/Coffe-3/images/gallery2.png';
import img_Coffe4_card from '../../Template/coffee/Coffe-4/images/card.png';
import img_Coffe4_hero from '../../Template/coffee/Coffe-4/images/hero.png';
import img_Coffe4_gallery0 from '../../Template/coffee/Coffe-4/images/gallery0.png';
import img_Coffe4_gallery1 from '../../Template/coffee/Coffe-4/images/gallery1.png';
import img_Coffe4_gallery2 from '../../Template/coffee/Coffe-4/images/gallery2.png';
import img_Coffe4_testimonial0 from '../../Template/coffee/Coffe-4/images/testimonial0.png';
import img_Coffe4_testimonial1 from '../../Template/coffee/Coffe-4/images/testimonial1.png';
import img_Coffe4_testimonial2 from '../../Template/coffee/Coffe-4/images/testimonial2.png';
import img_Coffe4_map from '../../Template/coffee/Coffe-4/images/map.png';
import img_Coffe5_card from '../../Template/coffee/Coffe-5/images/card.jpg';
import img_Coffe5_hero from '../../Template/coffee/Coffe-5/images/hero.jpg';
import img_Coffe5_gallery0 from '../../Template/coffee/Coffe-5/images/gallery0.png';
import img_Coffe5_gallery1 from '../../Template/coffee/Coffe-5/images/gallery1.png';
import img_Coffe5_gallery2 from '../../Template/coffee/Coffe-5/images/gallery2.png';
import img_Coffe5_gallery3 from '../../Template/coffee/Coffe-5/images/gallery3.png';
import img_Coffe5_gallery4 from '../../Template/coffee/Coffe-5/images/gallery4.png';
import img_Coffe5_avatar0 from '../../Template/coffee/Coffe-5/images/avatar0.png';
import img_Coffe5_avatar1 from '../../Template/coffee/Coffe-5/images/avatar1.png';
import img_Coffe5_avatar2 from '../../Template/coffee/Coffe-5/images/avatar2.png';
import img_Coffe5_map from '../../Template/coffee/Coffe-5/images/map.png';
import img_Coffe6_card from '../../Template/coffee/Coffe-6/images/card.png';
import img_Coffe6_heroBg from '../../Template/coffee/Coffe-6/images/heroBg.png';
import img_Coffe6_galleryMain from '../../Template/coffee/Coffe-6/images/galleryMain.png';
import img_Coffe6_gallery2 from '../../Template/coffee/Coffe-6/images/gallery2.png';
import img_Coffe6_gallery4 from '../../Template/coffee/Coffe-6/images/gallery4.png';
import img_Coffe7_card from '../../Template/coffee/Coffe-7/images/card.jpg';
import img_Coffe8_card from '../../Template/coffee/Coffe-8/images/card.jpg';
import img_Coffe7_heroBg from '../../Template/coffee/Coffe-7/images/heroBg.jpg';
import img_Coffe7_menuFeatured from '../../Template/coffee/Coffe-7/images/menuFeatured.jpg';
import img_Coffe7_gallery1 from '../../Template/coffee/Coffe-7/images/gallery1.jpg';
import img_Coffe7_gallery2 from '../../Template/coffee/Coffe-7/images/gallery2.jpg';
import img_Coffe7_gallery3 from '../../Template/coffee/Coffe-7/images/gallery3.jpg';
import img_Coffe7_gallery4 from '../../Template/coffee/Coffe-7/images/gallery4.jpg';
import img_Coffe8_heroBg from '../../Template/coffee/Coffe-8/images/heroBg.jpg';
import img_Coffe8_menuFeatured from '../../Template/coffee/Coffe-8/images/menuFeatured.jpg';
import img_Coffe8_gallery1 from '../../Template/coffee/Coffe-8/images/gallery1.jpg';
import img_Coffe8_gallery2 from '../../Template/coffee/Coffe-8/images/gallery2.jpg';
import img_Coffe8_gallery3 from '../../Template/coffee/Coffe-8/images/gallery3.jpg';
import img_Coffe8_gallery4 from '../../Template/coffee/Coffe-8/images/gallery4.jpg';

export const COFFEE_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'coffe-1',
    name: 'Garden Oasis',
    description: 'Phong cách vườn xanh mộc mạc. Tông oasis-green #2E4E3F và gỗ ấm áp dành cho quán cà phê sân vườn, trà đạo. Kèm hero glass-panel, gallery bento 4 ảnh và thực đơn Signature đặc sắc.',
    category: 'coffee',
    price: 0,
    priceText: 'Miễn phí',
    tags: ['Sân Vườn', 'Signature Menu', 'Gallery Bento'],
    imageUrl: img_Coffe1_card,
    component: lazy(() => import('../../Template/coffee/Coffe-1/index')),
    schema: schema_coffe1 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroBg',      label: 'Ảnh nền Hero',    defaultUrl: img_Coffe1_heroBg },
      { key: 'heroMain',    label: 'Ảnh chính Hero',  defaultUrl: img_Coffe1_heroMain },
      { key: 'drink1',      label: 'Đồ uống 1',       defaultUrl: img_Coffe1_drink1 },
      { key: 'drink2',      label: 'Đồ uống 2',       defaultUrl: img_Coffe1_drink2 },
      { key: 'drink3',      label: 'Đồ uống 3',       defaultUrl: img_Coffe1_drink3 },
      { key: 'galleryMain', label: 'Gallery chính',   defaultUrl: img_Coffe1_galleryMain },
      { key: 'gallery2',    label: 'Gallery 2',       defaultUrl: img_Coffe1_gallery2 },
      { key: 'gallery3',    label: 'Gallery 3',       defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdQFfDbVSGSbbBBZkj4l3cPXiZH_yJssczjPgSZG5o1Yj5b9noIpmuA8xD6T4rJsaWk_qSXNXpv_453CnXn8_Ozn80ACzZ7CrI7NMF2ZlZG3pxsDf4CQv1SY4mJTTskkKtgE3uHGG4XPn4Zuce1m8_70k6pKm5BzTRXjpzTwqlC7XsJ_rEJzbT7MHF6PP0i89iKB2QaLrbgZ4jpeocc2FX53iG8' },
      { key: 'gallery4',    label: 'Gallery 4',       defaultUrl: img_Coffe1_gallery4 },
    ],
  },

  {
    id: 'coffe-2',
    name: 'Tropical Chill',
    description: 'Không khí nhiệt đới tươi mát với hero slider 2 slides, menu tabs 3 loại (Signature / Coffee / Tea), section không gian amenities và FAB giỏ hàng. Trẻ trung, hiện đại.',
    category: 'coffee',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    tags: ['Hero Slider', 'Menu Tabs', 'FAB Cart'],
    imageUrl: img_Coffe2_card,
    component: lazy(() => import('../../Template/coffee/Coffe-2/index')),
    schema: schema_coffe2 as Record<string, unknown>,
    imageSlots: [
      { key: 'slide_0',   label: 'Slide 1',        defaultUrl: img_Coffe2_slide0 },
      { key: 'slide_1',   label: 'Slide 2',        defaultUrl: img_Coffe2_slide1 },
      { key: 'avatar_0',  label: 'Avatar khách 1', defaultUrl: img_Coffe2_avatar0 },
      { key: 'avatar_1',  label: 'Avatar khách 2', defaultUrl: img_Coffe2_avatar1 },
      { key: 'avatar_2',  label: 'Avatar khách 3', defaultUrl: img_Coffe2_avatar2 },
      { key: 'map',       label: 'Bản đồ',         defaultUrl: img_Coffe2_map },
      { key: 'space',     label: 'Không gian',     defaultUrl: img_Coffe2_space },
    ],
  },

  {
    id: 'coffe-3',
    name: 'The Ocean Cafe',
    description: 'Phong cách biển cả thanh lịch. 3 danh mục menu đầy đủ (Cà phê / Trà / Bánh ngọt), gallery bento 4 ảnh, testimonials với đánh giá sao và khu vực liên hệ bản đồ.',
    category: 'coffee',
    price: 499000,
    priceText: '499,000đ',
    badge: 'BÁN CHẠY',
    rating: 4.9,
    tags: ['3 Menu Tab', 'Gallery Bento', 'Đánh Giá Sao'],
    imageUrl: img_Coffe3_card,
    component: lazy(() => import('../../Template/coffee/Coffe-3/index')),
    schema: schema_coffe3 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',      label: 'Ảnh Hero',   defaultUrl: img_Coffe3_hero },
      { key: 'coffee_0',  label: 'Coffee 1',   defaultUrl: img_Coffe3_coffee0 },
      { key: 'coffee_1',  label: 'Coffee 2',   defaultUrl: img_Coffe3_coffee1 },
      { key: 'coffee_2',  label: 'Coffee 3',   defaultUrl: img_Coffe3_coffee2 },
      { key: 'coffee_3',  label: 'Coffee 4',   defaultUrl: img_Coffe3_coffee3 },
      { key: 'gallery_0', label: 'Gallery 1',  defaultUrl: img_Coffe3_gallery0 },
      { key: 'gallery_1', label: 'Gallery 2',  defaultUrl: img_Coffe3_gallery1 },
      { key: 'gallery_2', label: 'Gallery 3',  defaultUrl: img_Coffe3_gallery2 },
    ],
  },

  {
    id: 'coffe-4',
    name: 'Koi Garden',
    description: 'Sang trọng với tông xanh rừng Forest Green đặc trưng. Gallery koi pond hoành tráng, menu 4 tabs (Signature / Cà Phê / Trà / Bánh), testimonials nền tối elegant và contact panel map.',
    category: 'coffee',
    price: 399000,
    priceText: '399,000đ',
    tags: ['Sân Vườn Cao Cấp', 'Gallery Koi', 'Menu 4 Tabs'],
    imageUrl: img_Coffe4_card,
    component: lazy(() => import('../../Template/coffee/Coffe-4/index')),
    schema: schema_coffe4 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',          label: 'Ảnh Hero',           defaultUrl: img_Coffe4_hero },
      { key: 'gallery_0',     label: 'Gallery 1',          defaultUrl: img_Coffe4_gallery0 },
      { key: 'gallery_1',     label: 'Gallery 2',          defaultUrl: img_Coffe4_gallery1 },
      { key: 'gallery_2',     label: 'Gallery 3',          defaultUrl: img_Coffe4_gallery2 },
      { key: 'testimonial_0', label: 'Avatar đánh giá 1',  defaultUrl: img_Coffe4_testimonial0 },
      { key: 'testimonial_1', label: 'Avatar đánh giá 2',  defaultUrl: img_Coffe4_testimonial1 },
      { key: 'testimonial_2', label: 'Avatar đánh giá 3',  defaultUrl: img_Coffe4_testimonial2 },
      { key: 'map',           label: 'Bản đồ',             defaultUrl: img_Coffe4_map },
    ],
  },

  {
    id: 'coffe-5',
    name: 'Mật Ngọt Tea',
    description: 'Thiết kế ấm vàng amber cho tiệm trà sữa thủ công. Carousel 10 sản phẩm cuộn ngang, gallery bento bắt mắt, footer newsletter đặc trưng và contact panel bg-primary sang trọng.',
    category: 'coffee',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    tags: ['Trà Sữa', 'Menu Carousel', 'Newsletter'],
    imageUrl: img_Coffe5_card,
    component: lazy(() => import('../../Template/coffee/Coffe-5/index')),
    schema: schema_coffe5 as Record<string, unknown>,
    imageSlots: [
      { key: 'hero',      label: 'Ảnh Hero',           defaultUrl: img_Coffe5_hero },
      { key: 'gallery_0', label: 'Gallery 1',          defaultUrl: img_Coffe5_gallery0 },
      { key: 'gallery_1', label: 'Gallery 2',          defaultUrl: img_Coffe5_gallery1 },
      { key: 'gallery_2', label: 'Gallery 3',          defaultUrl: img_Coffe5_gallery2 },
      { key: 'gallery_3', label: 'Gallery 4',          defaultUrl: img_Coffe5_gallery3 },
      { key: 'gallery_4', label: 'Gallery 5',          defaultUrl: img_Coffe5_gallery4 },
      { key: 'avatar_0',  label: 'Avatar đánh giá 1', defaultUrl: img_Coffe5_avatar0 },
      { key: 'avatar_1',  label: 'Avatar đánh giá 2', defaultUrl: img_Coffe5_avatar1 },
      { key: 'avatar_2',  label: 'Avatar đánh giá 3', defaultUrl: img_Coffe5_avatar2 },
      { key: 'map',       label: 'Bản đồ',             defaultUrl: img_Coffe5_map },
    ],
  },

  {
    id: 'coffe-6',
    name: 'Oasis Symphony',
    description: 'Bản nâng cấp menu đầy đủ của phong cách sân vườn: 4 nhóm menu × 4 món (Pha Máy / Truyền Thống / Trà / Bánh Ngọt), gallery bento 4 ảnh, cảm nhận khách hàng và khu liên hệ chi tiết. Hỗ trợ sẵn 4 ngôn ngữ Việt/Anh/Trung/Hàn.',
    category: 'coffee',
    price: 349000,
    priceText: '349,000đ',
    badge: 'MỚI',
    tags: ['Menu 16 Món', 'Gallery Bento', '4 Ngôn Ngữ'],
    imageUrl: img_Coffe6_card,
    component: lazy(() => import('../../Template/coffee/Coffe-6/index')),
    schema: schema_coffe6 as Record<string, unknown>,
    imageSlots: [
      { key: 'heroBg',      label: 'Ảnh nền Hero', defaultUrl: img_Coffe6_heroBg },
      { key: 'galleryMain', label: 'Gallery chính', defaultUrl: img_Coffe6_galleryMain },
      { key: 'gallery2',    label: 'Gallery 2', defaultUrl: img_Coffe6_gallery2 },
      { key: 'gallery3',    label: 'Gallery 3', defaultUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdQFfDbVSGSbbBBZkj4l3cPXiZH_yJssczjPgSZG5o1Yj5b9noIpmuA8xD6T4rJsaWk_qSXNXpv_453CnXn8_Ozn80ACzZ7CrI7NMF2ZlZG3pxsDf4CQv1SY4mJTTskkKtgE3uHGG4XPn4Zuce1m8_70k6pKm5BzTRXjpzTwqlC7XsJ_rEJzbT7MHF6PP0i89iKB2QaLrbgZ4jpeocc2FX53iG8' },
      { key: 'gallery4',    label: 'Gallery 4', defaultUrl: img_Coffe6_gallery4 },
    ],
  },
  {
    id: 'coffe-7',
    name: 'Garden Sanctuary',
    description: 'Trải nghiệm không gian sân vườn yên tĩnh ngay giữa lòng thành phố, nơi mỗi tách cà phê là một hành trình tìm về sự tĩnh lặng.',
    category: 'coffee',
    price: 0,
    priceText: 'Miễn phí',
    
    
    tags: ["COFFEE","Thực Đơn","Bản Đồ","Đánh Giá"],
    imageUrl: img_Coffe7_card,
    component: lazy(() => import('../../Template/coffee/Coffe-7/index')),
    schema: schema_coffee7 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": img_Coffe7_heroBg
        },
        {
              "key": "menuFeatured",
              "label": "Ảnh Món Featured",
              "defaultUrl": img_Coffe7_menuFeatured
        },
        {
              "key": "gallery1",
              "label": "Ảnh Gallery 1",
              "defaultUrl": img_Coffe7_gallery1
        },
        {
              "key": "gallery2",
              "label": "Ảnh Gallery 2",
              "defaultUrl": img_Coffe7_gallery2
        },
        {
              "key": "gallery3",
              "label": "Ảnh Gallery 3",
              "defaultUrl": img_Coffe7_gallery3
        },
        {
              "key": "gallery4",
              "label": "Ảnh Gallery 4",
              "defaultUrl": img_Coffe7_gallery4
        },
        {
              "key": "avatar1",
              "label": "Ảnh Đánh Giá 1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLtI_ne1U9Nsu3H4YBzSiooK5BQSogLCPk7t4W31d9iHudjuGq_aBgPiUIAKfyCKmJbyBiAA-0a5i-ZEI_r-3emipT3UhDKcqLgmspeS0aqvNubCt1nC8MCFerm9sJZOCmPdXHncxlYz4PmFR1xehQjw_DTIA3__NDuFs0SgUi-fmqfjSx_pzCtuKXUv0VHRa8VS33P0f9P3g8im8BUTAJQjyGew5xmaujuKTACBqkfXVIzK1OFkiNjryG4"
        },
        {
              "key": "avatar2",
              "label": "Ảnh Đánh Giá 2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLvKom7znxLJXRYK6ogR18f3P1yRDUmhAadVjCYfjm9zk-RQIsJdXZzQjXTxPg3UBMyZB-ZkOnGCY17QMvgLlpcHMmH5KXmIbi5xZClguuiC6OGlsZaoFxfpLNVeqMXx4J49ljJhFq28TB0oaQB8q9dpI-xJlLHKgdJU4IjCgTXna55MsPHLQ6c1kPvmRIUqZZl444y-iXX8HTzmDk1ou7M04nd6UVkbwnC0I5dOrnzy6go8VzUQU6FHZmo"
        },
        {
              "key": "avatar3",
              "label": "Ảnh Đánh Giá 3",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLtnqGi6iEPr_VHu33rdGQXmBeI4Yi4ZgH2doQnqMCYmqdbl5ZQjJouy9NbZz82ORWPUaxjvouZulgWuNuVMUYJWm0KBTksB_FkVNX0ffvN0YhyyCNQL4f_QvdcJ9qE4-HonbuOLxFxv527sjFdzk3Xo77NeaLMNWUzS6qTS9XdgTHKmzf70jsk0T8mV2wOCYtq37L9USQZt30aAYDGoGUMUzjXcfyXwa06vp0ztejAZ0CMECNKbRQqQzs8"
        }
  ],
  },
  {
    id: 'coffe-8',
    name: 'Sage Sanctuary',
    description: 'Tận hưởng hương vị cà phê nguyên bản giữa không gian xanh mướt của một khu vườn nhiệt đới thu nhỏ.',
    category: 'coffee',
    price: 299000,
    priceText: '299,000đ',
    badge: 'MỚI',
    rating: 4.8,
    tags: ["COFFEE","Thực Đơn","Bản Đồ","Đánh Giá"],
    imageUrl: img_Coffe8_card,
    component: lazy(() => import('../../Template/coffee/Coffe-8/index')),
    schema: schema_coffee8 as Record<string, unknown>,
    imageSlots: [
        {
              "key": "heroBg",
              "label": "Ảnh Nền",
              "defaultUrl": img_Coffe8_heroBg
        },
        {
              "key": "menuFeatured",
              "label": "Ảnh Món Featured",
              "defaultUrl": img_Coffe8_menuFeatured
        },
        {
              "key": "gallery1",
              "label": "Ảnh Gallery 1",
              "defaultUrl": img_Coffe8_gallery1
        },
        {
              "key": "gallery2",
              "label": "Ảnh Gallery 2",
              "defaultUrl": img_Coffe8_gallery2
        },
        {
              "key": "gallery3",
              "label": "Ảnh Gallery 3",
              "defaultUrl": img_Coffe8_gallery3
        },
        {
              "key": "gallery4",
              "label": "Ảnh Gallery 4",
              "defaultUrl": img_Coffe8_gallery4
        },
        {
              "key": "avatar1",
              "label": "Ảnh Đánh Giá 1",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLtI_ne1U9Nsu3H4YBzSiooK5BQSogLCPk7t4W31d9iHudjuGq_aBgPiUIAKfyCKmJbyBiAA-0a5i-ZEI_r-3emipT3UhDKcqLgmspeS0aqvNubCt1nC8MCFerm9sJZOCmPdXHncxlYz4PmFR1xehQjw_DTIA3__NDuFs0SgUi-fmqfjSx_pzCtuKXUv0VHRa8VS33P0f9P3g8im8BUTAJQjyGew5xmaujuKTACBqkfXVIzK1OFkiNjryG4"
        },
        {
              "key": "avatar2",
              "label": "Ảnh Đánh Giá 2",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLvKom7znxLJXRYK6ogR18f3P1yRDUmhAadVjCYfjm9zk-RQIsJdXZzQjXTxPg3UBMyZB-ZkOnGCY17QMvgLlpcHMmH5KXmIbi5xZClguuiC6OGlsZaoFxfpLNVeqMXx4J49ljJhFq28TB0oaQB8q9dpI-xJlLHKgdJU4IjCgTXna55MsPHLQ6c1kPvmRIUqZZl444y-iXX8HTzmDk1ou7M04nd6UVkbwnC0I5dOrnzy6go8VzUQU6FHZmo"
        },
        {
              "key": "avatar3",
              "label": "Ảnh Đánh Giá 3",
              "defaultUrl": "https://lh3.googleusercontent.com/aida/AP1WRLtnqGi6iEPr_VHu33rdGQXmBeI4Yi4ZgH2doQnqMCYmqdbl5ZQjJouy9NbZz82ORWPUaxjvouZulgWuNuVMUYJWm0KBTksB_FkVNX0ffvN0YhyyCNQL4f_QvdcJ9qE4-HonbuOLxFxv527sjFdzk3Xo77NeaLMNWUzS6qTS9XdgTHKmzf70jsk0T8mV2wOCYtq37L9USQZt30aAYDGoGUMUzjXcfyXwa06vp0ztejAZ0CMECNKbRQqQzs8"
        }
  ],
  },
];
