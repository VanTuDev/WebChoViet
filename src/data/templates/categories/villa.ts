import { lazy } from 'react';
import type { TemplateDefinition } from '../types';
import villa1Schema from '../../Template/villa/Villa-1/i18n/vi.json';
import villa2Schema from '../../Template/villa/Villa-2/i18n/vi.json';
import villa3Schema from '../../Template/villa/Villa-3/i18n/vi.json';
import villa4Schema from '../../Template/villa/Villa-4/i18n/vi.json';
import villa5Schema from '../../Template/villa/Villa-5/i18n/vi.json';
import villa6Schema from '../../Template/villa/Villa-6/i18n/vi.json';
import villa7Schema from '../../Template/villa/Villa-7/i18n/vi.json';
import img_Villa1_card from '../../Template/villa/Villa-1/images/card.jpg';
import img_Villa1_heroBg from '../../Template/villa/Villa-1/images/heroBg.jpg';
import img_Villa1_roomZenGarden from '../../Template/villa/Villa-1/images/roomZenGarden.jpg';
import img_Villa1_roomPoolSuite from '../../Template/villa/Villa-1/images/roomPoolSuite.jpg';
import img_Villa1_roomFamilyVilla from '../../Template/villa/Villa-1/images/roomFamilyVilla.jpg';
import img_Villa1_roomSkyLoft from '../../Template/villa/Villa-1/images/roomSkyLoft.jpg';
import img_Villa1_galleryExterior from '../../Template/villa/Villa-1/images/galleryExterior.jpg';
import img_Villa1_galleryInterior from '../../Template/villa/Villa-1/images/galleryInterior.jpg';
import img_Villa1_galleryArchitecture from '../../Template/villa/Villa-1/images/galleryArchitecture.jpg';
import img_Villa1_galleryPoolNight from '../../Template/villa/Villa-1/images/galleryPoolNight.jpg';
import img_Villa1_welcomeTray from '../../Template/villa/Villa-1/images/welcomeTray.jpg';
import img_Villa1_avatar1 from '../../Template/villa/Villa-1/images/avatar1.jpg';
import img_Villa1_avatar2 from '../../Template/villa/Villa-1/images/avatar2.jpg';
import img_Villa1_avatar3 from '../../Template/villa/Villa-1/images/avatar3.jpg';
import img_Villa2_card from '../../Template/villa/Villa-2/images/card.jpg';
import img_Villa2_heroBg from '../../Template/villa/Villa-2/images/heroBg.jpg';
import img_Villa2_introMain from '../../Template/villa/Villa-2/images/introMain.jpg';
import img_Villa2_introSecondary from '../../Template/villa/Villa-2/images/introSecondary.jpg';
import img_Villa2_highlight1 from '../../Template/villa/Villa-2/images/highlight1.jpg';
import img_Villa2_highlight2 from '../../Template/villa/Villa-2/images/highlight2.jpg';
import img_Villa2_room1 from '../../Template/villa/Villa-2/images/room1.jpg';
import img_Villa2_room2 from '../../Template/villa/Villa-2/images/room2.jpg';
import img_Villa2_room3 from '../../Template/villa/Villa-2/images/room3.jpg';
import img_Villa2_gallery1 from '../../Template/villa/Villa-2/images/gallery1.jpg';
import img_Villa2_gallery2 from '../../Template/villa/Villa-2/images/gallery2.jpg';
import img_Villa2_gallery3 from '../../Template/villa/Villa-2/images/gallery3.jpg';
import img_Villa2_gallery4 from '../../Template/villa/Villa-2/images/gallery4.jpg';
import img_Villa2_avatar1 from '../../Template/villa/Villa-2/images/avatar1.jpg';
import img_Villa2_avatar2 from '../../Template/villa/Villa-2/images/avatar2.jpg';
import img_Villa2_avatar3 from '../../Template/villa/Villa-2/images/avatar3.jpg';
import img_Villa3_card from '../../Template/villa/Villa-3/images/card.jpg';
import img_Villa3_heroBg from '../../Template/villa/Villa-3/images/heroBg.jpg';
import img_Villa3_storyImg from '../../Template/villa/Villa-3/images/storyImg.jpg';
import img_Villa3_room1 from '../../Template/villa/Villa-3/images/room1.jpg';
import img_Villa3_room2 from '../../Template/villa/Villa-3/images/room2.jpg';
import img_Villa3_room3 from '../../Template/villa/Villa-3/images/room3.jpg';
import img_Villa3_room4 from '../../Template/villa/Villa-3/images/room4.jpg';
import img_Villa3_gallery1 from '../../Template/villa/Villa-3/images/gallery1.jpg';
import img_Villa3_gallery2 from '../../Template/villa/Villa-3/images/gallery2.jpg';
import img_Villa3_gallery3 from '../../Template/villa/Villa-3/images/gallery3.jpg';
import img_Villa3_gallery4 from '../../Template/villa/Villa-3/images/gallery4.jpg';
import img_Villa3_avatar1 from '../../Template/villa/Villa-3/images/avatar1.jpg';
import img_Villa3_avatar2 from '../../Template/villa/Villa-3/images/avatar2.jpg';
import img_Villa3_avatar3 from '../../Template/villa/Villa-3/images/avatar3.jpg';
import img_Villa4_card from '../../Template/villa/Villa-4/images/card.jpg';
import img_Villa4_heroBg from '../../Template/villa/Villa-4/images/heroBg.jpg';
import img_Villa4_heritageImg from '../../Template/villa/Villa-4/images/heritageImg.jpg';
import img_Villa4_fireplaceImg from '../../Template/villa/Villa-4/images/fireplaceImg.jpg';
import img_Villa4_room1 from '../../Template/villa/Villa-4/images/room1.jpg';
import img_Villa4_room2 from '../../Template/villa/Villa-4/images/room2.jpg';
import img_Villa4_room3 from '../../Template/villa/Villa-4/images/room3.jpg';
import img_Villa4_room4 from '../../Template/villa/Villa-4/images/room4.jpg';
import img_Villa4_gallery1 from '../../Template/villa/Villa-4/images/gallery1.jpg';
import img_Villa4_gallery2 from '../../Template/villa/Villa-4/images/gallery2.jpg';
import img_Villa4_gallery3 from '../../Template/villa/Villa-4/images/gallery3.jpg';
import img_Villa4_gallery4 from '../../Template/villa/Villa-4/images/gallery4.jpg';
import img_Villa4_avatar1 from '../../Template/villa/Villa-4/images/avatar1.jpg';
import img_Villa4_avatar2 from '../../Template/villa/Villa-4/images/avatar2.jpg';
import img_Villa4_avatar3 from '../../Template/villa/Villa-4/images/avatar3.jpg';
import img_Villa5_card from '../../Template/villa/Villa-5/images/card.jpg';
import img_Villa5_heroBg from '../../Template/villa/Villa-5/images/heroBg.jpg';
import img_Villa5_room1 from '../../Template/villa/Villa-5/images/room1.jpg';
import img_Villa5_room2 from '../../Template/villa/Villa-5/images/room2.jpg';
import img_Villa5_room3 from '../../Template/villa/Villa-5/images/room3.jpg';
import img_Villa5_gallery1 from '../../Template/villa/Villa-5/images/gallery1.jpg';
import img_Villa5_gallery2 from '../../Template/villa/Villa-5/images/gallery2.jpg';
import img_Villa5_gallery3 from '../../Template/villa/Villa-5/images/gallery3.jpg';
import img_Villa5_gallery4 from '../../Template/villa/Villa-5/images/gallery4.jpg';
import img_Villa5_avatar1 from '../../Template/villa/Villa-5/images/avatar1.jpg';
import img_Villa5_avatar2 from '../../Template/villa/Villa-5/images/avatar2.jpg';
import img_Villa5_avatar3 from '../../Template/villa/Villa-5/images/avatar3.jpg';
import img_Villa6_card from '../../Template/villa/Villa-6/images/card.jpg';
import img_Villa6_heroBg from '../../Template/villa/Villa-6/images/heroBg.jpg';
import img_Villa6_aboutImg from '../../Template/villa/Villa-6/images/aboutImg.jpg';
import img_Villa6_room1 from '../../Template/villa/Villa-6/images/room1.jpg';
import img_Villa6_room2 from '../../Template/villa/Villa-6/images/room2.jpg';
import img_Villa6_room3 from '../../Template/villa/Villa-6/images/room3.jpg';
import img_Villa6_room4 from '../../Template/villa/Villa-6/images/room4.jpg';
import img_Villa6_gallery1 from '../../Template/villa/Villa-6/images/gallery1.jpg';
import img_Villa6_gallery2 from '../../Template/villa/Villa-6/images/gallery2.jpg';
import img_Villa6_gallery3 from '../../Template/villa/Villa-6/images/gallery3.jpg';
import img_Villa6_gallery4 from '../../Template/villa/Villa-6/images/gallery4.jpg';
import img_Villa6_avatar1 from '../../Template/villa/Villa-6/images/avatar1.jpg';
import img_Villa6_avatar2 from '../../Template/villa/Villa-6/images/avatar2.jpg';
import img_Villa6_avatar3 from '../../Template/villa/Villa-6/images/avatar3.jpg';
import img_Villa7_card from '../../Template/villa/Villa-7/images/card.jpg';
import img_Villa7_heroBg from '../../Template/villa/Villa-7/images/heroBg.jpg';
import img_Villa7_introImg from '../../Template/villa/Villa-7/images/introImg.jpg';
import img_Villa7_roomFeatured from '../../Template/villa/Villa-7/images/roomFeatured.jpg';
import img_Villa7_room1 from '../../Template/villa/Villa-7/images/room1.jpg';
import img_Villa7_room2 from '../../Template/villa/Villa-7/images/room2.jpg';
import img_Villa7_room3 from '../../Template/villa/Villa-7/images/room3.jpg';
import img_Villa7_amenitiesImg from '../../Template/villa/Villa-7/images/amenitiesImg.jpg';
import img_Villa7_gallery1 from '../../Template/villa/Villa-7/images/gallery1.jpg';
import img_Villa7_gallery2 from '../../Template/villa/Villa-7/images/gallery2.jpg';
import img_Villa7_gallery3 from '../../Template/villa/Villa-7/images/gallery3.jpg';
import img_Villa7_gallery4 from '../../Template/villa/Villa-7/images/gallery4.jpg';
import img_Villa7_avatar1 from '../../Template/villa/Villa-7/images/avatar1.jpg';
import img_Villa7_avatar2 from '../../Template/villa/Villa-7/images/avatar2.jpg';
import img_Villa7_avatar3 from '../../Template/villa/Villa-7/images/avatar3.jpg';

export const VILLA_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'villa-1',
    name: 'Serenity Villa',
    description: 'Villa nghỉ dưỡng phong cách zen tối giản tại Phú Quốc, với hồ bơi vô cực, 4 loại phòng và khu vườn nhiệt đới yên tĩnh.',
    category: 'villa',
    price: 0,
    priceText: 'Miễn phí',
    badge: 'MỚI',
    rating: 4.8,
    tags: ['villa', 'homestay', 'zen', 'nghỉ dưỡng', 'Phú Quốc'],
    imageUrl: img_Villa1_card,
    component: lazy(() => import('../../Template/villa/Villa-1/index')),
    schema: villa1Schema,
    imageSlots: [
      { key: 'heroBg', label: 'Ảnh nền Hero', defaultUrl: img_Villa1_heroBg },
      { key: 'roomZenGarden', label: 'Phòng Zen Garden', defaultUrl: img_Villa1_roomZenGarden },
      { key: 'roomPoolSuite', label: 'Phòng Pool Suite', defaultUrl: img_Villa1_roomPoolSuite },
      { key: 'roomFamilyVilla', label: 'Phòng Family Villa', defaultUrl: img_Villa1_roomFamilyVilla },
      { key: 'roomSkyLoft', label: 'Phòng Sky Loft', defaultUrl: img_Villa1_roomSkyLoft },
      { key: 'galleryExterior', label: 'Gallery — Ngoại thất', defaultUrl: img_Villa1_galleryExterior },
      { key: 'galleryInterior', label: 'Gallery — Nội thất', defaultUrl: img_Villa1_galleryInterior },
      { key: 'galleryArchitecture', label: 'Gallery — Kiến trúc', defaultUrl: img_Villa1_galleryArchitecture },
      { key: 'galleryPoolNight', label: 'Gallery — Hồ bơi đêm', defaultUrl: img_Villa1_galleryPoolNight },
      { key: 'welcomeTray', label: 'Ảnh khay chào đón', defaultUrl: img_Villa1_welcomeTray },
      { key: 'avatar1', label: 'Avatar khách 1', defaultUrl: img_Villa1_avatar1 },
      { key: 'avatar2', label: 'Avatar khách 2', defaultUrl: img_Villa1_avatar2 },
      { key: 'avatar3', label: 'Avatar khách 3', defaultUrl: img_Villa1_avatar3 },
    ],
  },
  {
    id: 'villa-2',
    name: 'Serenity Villa Deluxe',
    description: 'Mẫu website villa/homestay cao cấp phong cách zen tối giản, đầy đủ hạng phòng, tiện nghi, chính sách lưu trú và bản đồ đặt phòng.',
    category: 'villa',
    price: 299000,
    priceText: '299,000đ',
    rating: 4.7,
    tags: ['villa', 'homestay', 'nghỉ dưỡng', 'zen', 'cao cấp'],
    imageUrl: img_Villa2_card,
    component: lazy(() => import('../../Template/villa/Villa-2/index')),
    schema: villa2Schema,
    imageSlots: [
      { key: 'heroBg', label: 'Ảnh nền Hero', defaultUrl: img_Villa2_heroBg },
      { key: 'introMain', label: 'Ảnh giới thiệu chính', defaultUrl: img_Villa2_introMain },
      { key: 'introSecondary', label: 'Ảnh giới thiệu phụ', defaultUrl: img_Villa2_introSecondary },
      { key: 'highlight1', label: 'Điểm nhấn 1', defaultUrl: img_Villa2_highlight1 },
      { key: 'highlight2', label: 'Điểm nhấn 2', defaultUrl: img_Villa2_highlight2 },
      { key: 'room1', label: 'Phòng 1', defaultUrl: img_Villa2_room1 },
      { key: 'room2', label: 'Phòng 2', defaultUrl: img_Villa2_room2 },
      { key: 'room3', label: 'Phòng 3', defaultUrl: img_Villa2_room3 },
      { key: 'gallery1', label: 'Gallery 1', defaultUrl: img_Villa2_gallery1 },
      { key: 'gallery2', label: 'Gallery 2', defaultUrl: img_Villa2_gallery2 },
      { key: 'gallery3', label: 'Gallery 3', defaultUrl: img_Villa2_gallery3 },
      { key: 'gallery4', label: 'Gallery 4', defaultUrl: img_Villa2_gallery4 },
      { key: 'avatar1', label: 'Avatar khách 1', defaultUrl: img_Villa2_avatar1 },
      { key: 'avatar2', label: 'Avatar khách 2', defaultUrl: img_Villa2_avatar2 },
      { key: 'avatar3', label: 'Avatar khách 3', defaultUrl: img_Villa2_avatar3 },
    ],
  },
  {
    id: 'villa-3',
    name: 'Zenith Wilderness — Phong Nha',
    description: 'Villa biệt lập giữa rừng nguyên sinh Phong Nha, phong cách tối giản sinh thái với dịch vụ trekking, spa thảo mộc và tầm nhìn núi đá vôi hùng vĩ.',
    category: 'villa',
    price: 349000,
    priceText: '349,000đ',
    rating: 4.9,
    tags: ['villa', 'homestay', 'Phong Nha', 'du lịch sinh thái', 'trekking'],
    imageUrl: img_Villa3_card,
    component: lazy(() => import('../../Template/villa/Villa-3/index')),
    schema: villa3Schema,
    imageSlots: [
      { key: 'heroBg', label: 'Ảnh nền Hero', defaultUrl: img_Villa3_heroBg },
      { key: 'storyImg', label: 'Ảnh câu chuyện thương hiệu', defaultUrl: img_Villa3_storyImg },
      { key: 'room1', label: 'Phòng 1 — Forest View Bungalow', defaultUrl: img_Villa3_room1 },
      { key: 'room2', label: 'Phòng 2 — Karst Valley Suite', defaultUrl: img_Villa3_room2 },
      { key: 'room3', label: 'Phòng 3 — Riverside Villa', defaultUrl: img_Villa3_room3 },
      { key: 'room4', label: 'Phòng 4 — Cave Explorer Family Room', defaultUrl: img_Villa3_room4 },
      { key: 'gallery1', label: 'Gallery 1', defaultUrl: img_Villa3_gallery1 },
      { key: 'gallery2', label: 'Gallery 2', defaultUrl: img_Villa3_gallery2 },
      { key: 'gallery3', label: 'Gallery 3', defaultUrl: img_Villa3_gallery3 },
      { key: 'gallery4', label: 'Gallery 4', defaultUrl: img_Villa3_gallery4 },
      { key: 'avatar1', label: 'Avatar khách 1', defaultUrl: img_Villa3_avatar1 },
      { key: 'avatar2', label: 'Avatar khách 2', defaultUrl: img_Villa3_avatar2 },
      { key: 'avatar3', label: 'Avatar khách 3', defaultUrl: img_Villa3_avatar3 },
    ],
  },
  {
    id: 'villa-4',
    name: 'Rông Homestay',
    description: 'Homestay/villa lấy cảm hứng từ kiến trúc nhà Rông Tây Nguyên, kết hợp không gian núi rừng, lò sưởi đá và văn hoá cồng chiêng với tiện nghi hiện đại.',
    category: 'villa',
    price: 349000,
    priceText: '349,000đ',
    rating: 4.7,
    tags: ['villa', 'homestay', 'Tây Nguyên', 'nhà Rông', 'nghỉ dưỡng núi rừng'],
    imageUrl: img_Villa4_card,
    component: lazy(() => import('../../Template/villa/Villa-4/index')),
    schema: villa4Schema,
    imageSlots: [
      { key: 'heroBg', label: 'Ảnh nền Hero', defaultUrl: img_Villa4_heroBg },
      { key: 'heritageImg', label: 'Ảnh di sản văn hoá', defaultUrl: img_Villa4_heritageImg },
      { key: 'fireplaceImg', label: 'Ảnh lửa trại', defaultUrl: img_Villa4_fireplaceImg },
      { key: 'room1', label: 'Phòng 1 — Rông Bungalow Đơn', defaultUrl: img_Villa4_room1 },
      { key: 'room2', label: 'Phòng 2 — Villa Đôi Gia Đình', defaultUrl: img_Villa4_room2 },
      { key: 'room3', label: 'Phòng 3 — Suite Thác Nước', defaultUrl: img_Villa4_room3 },
      { key: 'room4', label: 'Phòng 4 — Nhà Dài Cộng Đồng', defaultUrl: img_Villa4_room4 },
      { key: 'gallery1', label: 'Gallery 1', defaultUrl: img_Villa4_gallery1 },
      { key: 'gallery2', label: 'Gallery 2', defaultUrl: img_Villa4_gallery2 },
      { key: 'gallery3', label: 'Gallery 3', defaultUrl: img_Villa4_gallery3 },
      { key: 'gallery4', label: 'Gallery 4', defaultUrl: img_Villa4_gallery4 },
      { key: 'avatar1', label: 'Avatar khách 1', defaultUrl: img_Villa4_avatar1 },
      { key: 'avatar2', label: 'Avatar khách 2', defaultUrl: img_Villa4_avatar2 },
      { key: 'avatar3', label: 'Avatar khách 3', defaultUrl: img_Villa4_avatar3 },
    ],
  },
  {
    id: 'villa-5',
    name: 'Serenity Sea-View Villa',
    description: 'Mẫu website villa/homestay hướng biển sang trọng với phòng nghỉ đa dạng, tiện nghi đầy đủ, thư viện ảnh, đánh giá khách hàng và bản đồ đặt phòng tích hợp.',
    category: 'villa',
    price: 399000,
    priceText: '399,000đ',
    badge: 'BÁN CHẠY',
    rating: 4.9,
    tags: ['villa', 'homestay', 'nghỉ dưỡng', 'view biển', 'đặt phòng online'],
    imageUrl: img_Villa5_card,
    component: lazy(() => import('../../Template/villa/Villa-5/index')),
    schema: villa5Schema,
    imageSlots: [
      { key: 'heroBg', label: 'Ảnh nền Hero', defaultUrl: img_Villa5_heroBg },
      { key: 'room1', label: 'Phòng 1 — Deluxe Garden Villa', defaultUrl: img_Villa5_room1 },
      { key: 'room2', label: 'Phòng 2 — Ocean Master Suite', defaultUrl: img_Villa5_room2 },
      { key: 'room3', label: 'Phòng 3 — Grand Presidential Suite', defaultUrl: img_Villa5_room3 },
      { key: 'gallery1', label: 'Gallery 1', defaultUrl: img_Villa5_gallery1 },
      { key: 'gallery2', label: 'Gallery 2', defaultUrl: img_Villa5_gallery2 },
      { key: 'gallery3', label: 'Gallery 3', defaultUrl: img_Villa5_gallery3 },
      { key: 'gallery4', label: 'Gallery 4', defaultUrl: img_Villa5_gallery4 },
      { key: 'avatar1', label: 'Avatar khách 1', defaultUrl: img_Villa5_avatar1 },
      { key: 'avatar2', label: 'Avatar khách 2', defaultUrl: img_Villa5_avatar2 },
      { key: 'avatar3', label: 'Avatar khách 3', defaultUrl: img_Villa5_avatar3 },
    ],
  },
  {
    id: 'villa-6',
    name: "H'Mong Cliff Villa",
    description: "Villa nghỉ dưỡng vách đá phong cách H'Mông giữa cao nguyên đá Đồng Văn, với hồ bơi vô cực và trekking bản địa.",
    category: 'villa',
    price: 399000,
    priceText: '399,000đ',
    rating: 4.8,
    tags: ['villa', 'homestay', 'Hà Giang', 'nghỉ dưỡng núi', 'trekking'],
    imageUrl: img_Villa6_card,
    component: lazy(() => import('../../Template/villa/Villa-6/index')),
    schema: villa6Schema,
    imageSlots: [
      { key: 'heroBg', label: 'Ảnh nền Hero', defaultUrl: img_Villa6_heroBg },
      { key: 'aboutImg', label: 'Ảnh giới thiệu', defaultUrl: img_Villa6_aboutImg },
      { key: 'room1', label: "Phòng 1 — H'Mong Suite", defaultUrl: img_Villa6_room1 },
      { key: 'room2', label: 'Phòng 2 — Valley View Room', defaultUrl: img_Villa6_room2 },
      { key: 'room3', label: 'Phòng 3 — Cliff Bungalow', defaultUrl: img_Villa6_room3 },
      { key: 'room4', label: 'Phòng 4 — Cloud Terrace Family', defaultUrl: img_Villa6_room4 },
      { key: 'gallery1', label: 'Gallery 1', defaultUrl: img_Villa6_gallery1 },
      { key: 'gallery2', label: 'Gallery 2', defaultUrl: img_Villa6_gallery2 },
      { key: 'gallery3', label: 'Gallery 3', defaultUrl: img_Villa6_gallery3 },
      { key: 'gallery4', label: 'Gallery 4', defaultUrl: img_Villa6_gallery4 },
      { key: 'avatar1', label: 'Avatar khách 1', defaultUrl: img_Villa6_avatar1 },
      { key: 'avatar2', label: 'Avatar khách 2', defaultUrl: img_Villa6_avatar2 },
      { key: 'avatar3', label: 'Avatar khách 3', defaultUrl: img_Villa6_avatar3 },
    ],
  },
  {
    id: 'villa-7',
    name: 'The Hill Villas',
    description: 'Villa đồi rừng Phong Nha với kiến trúc gỗ ấm cúng, bể bơi vô cực và trải nghiệm hoà mình vào đại ngàn xanh thẳm.',
    category: 'villa',
    price: 349000,
    priceText: '349,000đ',
    rating: 4.8,
    tags: ['villa', 'homestay', 'nghỉ dưỡng', 'Phong Nha', 'đồi rừng'],
    imageUrl: img_Villa7_card,
    component: lazy(() => import('../../Template/villa/Villa-7/index')),
    schema: villa7Schema,
    imageSlots: [
      { key: 'heroBg', label: 'Ảnh nền Hero', defaultUrl: img_Villa7_heroBg },
      { key: 'introImg', label: 'Ảnh giới thiệu', defaultUrl: img_Villa7_introImg },
      { key: 'roomFeatured', label: 'Phòng nổi bật — Deluxe', defaultUrl: img_Villa7_roomFeatured },
      { key: 'room1', label: 'Phòng 1 — Standard', defaultUrl: img_Villa7_room1 },
      { key: 'room2', label: 'Phòng 2 — Family', defaultUrl: img_Villa7_room2 },
      { key: 'room3', label: 'Phòng 3 — Nguyên villa', defaultUrl: img_Villa7_room3 },
      { key: 'amenitiesImg', label: 'Ảnh tiện nghi', defaultUrl: img_Villa7_amenitiesImg },
      { key: 'gallery1', label: 'Gallery 1', defaultUrl: img_Villa7_gallery1 },
      { key: 'gallery2', label: 'Gallery 2', defaultUrl: img_Villa7_gallery2 },
      { key: 'gallery3', label: 'Gallery 3', defaultUrl: img_Villa7_gallery3 },
      { key: 'gallery4', label: 'Gallery 4', defaultUrl: img_Villa7_gallery4 },
      { key: 'avatar1', label: 'Avatar khách 1', defaultUrl: img_Villa7_avatar1 },
      { key: 'avatar2', label: 'Avatar khách 2', defaultUrl: img_Villa7_avatar2 },
      { key: 'avatar3', label: 'Avatar khách 3', defaultUrl: img_Villa7_avatar3 },
    ],
  },
];
