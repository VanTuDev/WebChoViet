import { Template, Project } from './types';

export const STARTER_ITEMS = {
  coffee: [
    { id: 'c1', name: 'Bạc Xỉu Sài Gòn', price: 29000, description: 'Cà phê sữa pha chế theo tỷ lệ nhiều sữa ít cà phê đặc trưng', imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&auto=format&fit=crop&q=60', isAvailable: true },
    { id: 'c2', name: 'Cà Phê Muối Huế', price: 35000, description: 'Vị béo ngậy của kem muối hòa quyện với cà phê phin đậm đà', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=60', isAvailable: true },
    { id: 'c3', name: 'Trà Đào Hồng Đài', price: 39000, description: 'Trà đào thơm ngát kết hợp cùng đào miếng giòn ngọt mát lạnh', imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&auto=format&fit=crop&q=60', isAvailable: true },
    { id: 'c4', name: 'Croissant Trứng Muối', price: 45000, description: 'Bánh sừng bò ngàn lớp thơm bơ với sốt trứng muối chảy béo ngậy', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=60', isAvailable: true }
  ],
  spa: [
    { id: 's1', name: 'Massage Thụy Điển Thư Giãn', price: 350000, description: 'Liệu trình massage body 60 phút giúp giảm áp lực cơ bắp bằng tinh dầu sả chanh', imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&auto=format&fit=crop&q=60', isAvailable: true },
    { id: 's2', name: 'Chăm Sóc Da Mặt Chuyên Sâu', price: 450000, description: 'Làm sạch sâu, cấp ẩm phục hồi kết hợp đắp mặt nạ thảo mộc thiên nhiên', imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=300&auto=format&fit=crop&q=60', isAvailable: true },
    { id: 's3', name: 'Gội Đầu Dưỡng Sinh Thảo Dược', price: 180000, description: 'Gội đầu bồ kết kết hợp massage ấn huyệt cổ vai gáy giúp khí huyết lưu thông', imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&auto=format&fit=crop&q=60', isAvailable: true }
  ],
  restaurant: [
    { id: 'r1', name: 'Sushi Tổng Hợp Cao Cấp', price: 289000, description: 'Khay sushi tổng hợp gồm cá hồi, tương ép, lươn Nhật và tôm ngọt', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&auto=format&fit=crop&q=60', isAvailable: true },
    { id: 'r2', name: 'Bít Tết Sốt Tiêu Đen', price: 350000, description: 'Thăn ngoại bò Mỹ nướng chín vừa mọng nước kết hợp sốt tiêu đen đậm đà', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=60', isAvailable: true },
    { id: 'r3', name: 'Salad Hoàng Đế (Caesar)', price: 120000, description: 'Xà lách tươi giòn, sốt Caesar hảo hạng, thịt xông khói và bánh mì giòn rụm', imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&auto=format&fit=crop&q=60', isAvailable: true }
  ],
  retail: [
    { id: 't1', name: 'Áo Sơ Mi Linen Cổ Tàu', price: 380000, description: 'Chất liệu linen tự nhiên thoáng mát, thiết kế phom rộng đứng dáng hiện đại', imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&auto=format&fit=crop&q=60', isAvailable: true },
    { id: 't2', name: 'Quần Khaki Phom Regular Fit', price: 420000, description: 'Vải cotton dày dặn co giãn nhẹ, phù hợp đi làm, đi chơi hàng ngày', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&auto=format&fit=crop&q=60', isAvailable: true }
  ]
};

export const TEMPLATES: Template[] = [
  // ── Cafe & Đồ Uống — 5 template thật đã chuyển đổi sang TSX ─────────────
  {
    id: 'coffe-1',
    name: 'Garden Oasis',
    description: 'Phong cách vườn xanh mộc mạc. Tông oasis-green #2E4E3F và gỗ ấm áp dành cho quán cà phê sân vườn, trà đạo. Kèm hero glass-panel, gallery bento 4 ảnh và thực đơn Signature đặc sắc.',
    category: 'coffee',
    price: 0,
    priceText: 'Miễn phí',
    tags: ['Sân Vườn', 'Signature Menu', 'Gallery Bento'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNkqsQSsTeYHw1cnpeU4Uf8MH_blw-Fu7MpPh180Fi0B0ENa0grGwofz2i4Kx6-FbVrIAnE1ehmWhby5zlEGg4KI36Q6WrJoHaey7gbVBPY9dRIdT93aw_bKShcmlj3SnS8Opb797Fztt-vD1VVZUJs6kyb7idreLbbqq1czNPDN0Zp7jG91PZTCGE8r0PCllLuPuPPXOfMFrazJZyBMP6b61VbyI29Jw0ch2DFXnJW0vFekGId5arfP0JDJ7-WsaR0dS3_3QGKuU',
    starterItems: STARTER_ITEMS.coffee,
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdLMqjDGSjcg9BNtGMqRZs5DzFzQrtcKw8TgfospemgnfRbUn1awWdCRd2cHi80P4mvgR0vaq7iAAW6AXtYJiqnfAAbqcE6IC84PSdAQEsttEdQl44ckbleKo33pGgJHArDqwfrwk-9XRQRY9ivQHo4aTURIRMhSAic7AADLHIUrp9cMiOR7_-pioCDczuz8OgcUKN3a7EIEO4TBEzLMyz7PXK7xP84w_XqyR0UlWSQxuJHo-7DSh4CD332h8NTGZZKfEobgQy2oc',
    starterItems: STARTER_ITEMS.coffee,
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaIGKuFpa2TTNgzB0NYKf_gM_H-BGiTv-TdhklJBmJ2sXnSHeT3_cA_gztVBTb91bIG9KqhB7Y62KA4ZXx01hqQSw9JrpL0dQ4MTW1Gm38v2HaABOHfLDE9bEsy4uSlkfQBDDs4dJlu5ZrSCMZyLUWxQWrjnSNgkwi2R7WEAqCmOBHfsrNoYqLgCU2XIxTe3Ua5Xj4PZnOEj7gDrw9wzK9FG2TCP8-mxsJXyJVdffTwPbcaQ_6EZK7EU1tbf3kSQuY_Xop9jPlHVs',
    starterItems: STARTER_ITEMS.coffee,
  },
  {
    id: 'coffe-4',
    name: 'Koi Garden',
    description: 'Sang trọng với tông xanh rừng Forest Green đặc trưng. Gallery koi pond hoành tráng, menu 4 tabs (Signature / Cà Phê / Trà / Bánh), testimonials nền tối elegant và contact panel map.',
    category: 'coffee',
    price: 399000,
    priceText: '399,000đ',
    tags: ['Sân Vườn Cao Cấp', 'Gallery Koi', 'Menu 4 Tabs'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvOIF5qB7g9yZ4YveEApHT-KvLuMUaVfyLB5s69wLPgmUs6DPWxmSJNRFVfhwy0R7PyJdWqXv4istAS6Uat-s4glWXsRCHWD7yoNCtgNn6nsYHmvFKqb9GMnEELlB6-65nUFR_vaqO0EcagdW0VguzgxTGgPj7iO0pg__n-lomMnSbuGrJD_S4nOF1_ZzXgiFcBCupxPE-10YOhPSoWOVs-kh2q1mE-IzTsC1JMe_9gSe3sgukxi2tQwEe49IoktE5AI0ip6DfoWo',
    starterItems: STARTER_ITEMS.coffee,
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
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR5n9B0_RVMJxE2RqfpBBcJi60BO0k3wk_GecmGPTjBbXxDaQz_1lIQq9gALjkaSGJQvj_vb3OM0qKp1t36oTPjPi9LLQK9b7YWsNbLO-s-nTBvKBCGxaO_1Z5h8aKSLrfKiqXS1RX3bBHZC9MnXKqQ9SqEpBiX0uRJhVIqp_i7WT9sEV4y9A2Dp8cxSQTYjZ_SL6v0rkCbEoJHK2w8cePMfqyU0Jh5VFcmyeE6bI1bVqRlKHKBPkCZP1JmA6OAHyvf6Toi_TM',
    starterItems: STARTER_ITEMS.coffee,
  },
];

export const INITIAL_PROJECTS: Project[] = [];


export const INITIAL_METRICS = [
  {
    title: 'Số lượt quét QR',
    value: '1,248',
    change: '+12% hôm nay',
    changeType: 'increase' as const
  },
  {
    title: 'Lượt xem Menu',
    value: '3,892',
    change: '+5% hôm nay',
    changeType: 'increase' as const
  },
  {
    title: 'Đánh giá mới',
    value: '45',
    change: 'Chưa đọc',
    changeType: 'neutral' as const
  }
];
