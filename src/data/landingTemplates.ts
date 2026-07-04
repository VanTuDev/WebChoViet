// ── Landing Page Template System ────────────────────────────────────────────

export type LandingCategory = 'coffee' | 'spa' | 'restaurant' | 'retail';

// ── Block types ──────────────────────────────────────────────────────────────

export interface HeroBlock {
  type: 'hero';
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaLink: string;
  bgImage: string;
  layout: 'center' | 'left';
}

export interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  image: string;
  link: string;
}

export interface ServicesBlock {
  type: 'services';
  heading: string;
  subheading: string;
  items: ServiceItem[];
  layout: 'grid' | 'list';
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  link: string;
}

export interface GalleryBlock {
  type: 'gallery';
  heading: string;
  images: GalleryImage[];
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'zalo' | 'tiktok' | 'youtube' | 'phone';
  url: string;
}

export interface AboutBlock {
  type: 'about';
  heading: string;
  body: string;
  image: string;
  socials: SocialLink[];
}

export interface ContactBlock {
  type: 'contact';
  heading: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapLink: string;
}

export type PageBlock = HeroBlock | ServicesBlock | GalleryBlock | AboutBlock | ContactBlock;

export type TemplateStyle = 'modern' | 'elegant' | 'bold' | 'minimal' | 'rustic' | 'luxury';

export interface LandingTemplate {
  id: string;
  name: string;
  category: LandingCategory;
  description: string;
  thumbnail: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  style: TemplateStyle;
  blocks: PageBlock[];
}

// ── Helper ───────────────────────────────────────────────────────────────────

const IMG = (id: number, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&auto=format&fit=crop&q=80`;

// ── Templates ────────────────────────────────────────────────────────────────

export const LANDING_TEMPLATES: LandingTemplate[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // COFFEE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'coffee-noir',
    name: 'Cafe Noir',
    category: 'coffee',
    description: 'Phong cách tối giản, tông màu đen và vàng đặc trưng cho quán cà phê nghệ thuật.',
    thumbnail: IMG(1501901, 600, 400),
    primaryColor: '#1a1a1a',
    accentColor: '#d4a017',
    bgColor: '#fafaf7',
    style: 'bold',
    blocks: [
      {
        type: 'hero',
        heading: 'Đắm chìm trong từng giọt\ncà phê thuần túy',
        subheading: 'Không gian yên tĩnh — Hương vị đích thực — Khoảnh khắc chậm lại',
        ctaLabel: 'Xem thực đơn',
        ctaLink: '#menu',
        bgImage: IMG(1501901, 1400, 800),
        layout: 'center',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Thực đơn nổi bật',
        subheading: 'Chọn lọc từ những hạt cà phê thượng hạng, pha chế thủ công từng ly',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Espresso Đen Đặc', desc: 'Chiết xuất cà phê Brazil 100% nguyên chất, không pha trộn', price: '35,000đ', image: IMG(1521927, 400, 300), link: '' },
          { id: 's2', name: 'Bạc Xỉu Sài Gòn', desc: 'Cà phê phin hòa với sữa đặc theo tỷ lệ truyền thống Sài Gòn', price: '29,000đ', image: IMG(1541167760496, 400, 300), link: '' },
          { id: 's3', name: 'Cold Brew 18 Tiếng', desc: 'Ủ lạnh 18 giờ cho vị mượt mà, ít chua, đậm đà đặc biệt', price: '55,000đ', image: IMG(1495474472657, 400, 300), link: '' },
          { id: 's4', name: 'Flat White Thượng Hạng', desc: 'Milk steaming chuẩn barista, phủ lớp microfoam mịn như nhung', price: '65,000đ', image: IMG(1485808191253, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'Không gian của chúng tôi',
        images: [
          { id: 'g1', src: IMG(1442512835329, 600, 450), alt: 'Quầy pha chế', link: '' },
          { id: 'g2', src: IMG(1463797800285, 600, 450), alt: 'Khu ngồi trong', link: '' },
          { id: 'g3', src: IMG(1559056189, 600, 450), alt: 'Góc đọc sách', link: '' },
          { id: 'g4', src: IMG(1509042239860, 600, 450), alt: 'Ngoài trời', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'about',
        heading: 'Câu chuyện của Cafe Noir',
        body: 'Cafe Noir được sinh ra từ tình yêu mãnh liệt với văn hóa cà phê thuần túy. Chúng tôi không chạy theo xu hướng — chúng tôi theo đuổi sự hoàn hảo trong từng giọt espresso, từng lớp microfoam và từng khoảnh khắc lặng yên mà một tách cà phê mang lại.',
        image: IMG(1566984801003, 600, 700),
        socials: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'phone', url: 'tel:0347868656' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Tìm chúng tôi',
        address: '127 Nguyễn Trãi, Quận 5, TP. Hồ Chí Minh',
        phone: '0347 868 656',
        email: 'hello@cafenoir.vn',
        hours: 'Thứ 2 – Chủ Nhật: 07:00 – 22:30',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'coffee-bloom',
    name: 'Bloom Coffee',
    category: 'coffee',
    description: 'Tông màu pastel ấm áp, phong cách Hàn Quốc đương đại cho quán cà phê trẻ trung.',
    thumbnail: IMG(1495474472657, 600, 400),
    primaryColor: '#c4856a',
    accentColor: '#f7e8d8',
    bgColor: '#fffbf8',
    style: 'elegant',
    blocks: [
      {
        type: 'hero',
        heading: 'Bắt đầu ngày mới\nbằng điều ngọt ngào',
        subheading: 'Hương thơm dịu dàng — Không gian Vintage — Từng khoảnh khắc đáng nhớ',
        ctaLabel: 'Đặt bàn ngay',
        ctaLink: 'tel:0347868656',
        bgImage: IMG(1495474472657, 1400, 800),
        layout: 'left',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Menu mùa hè',
        subheading: 'Tươi mát, nhẹ nhàng — Được làm mới mỗi mùa',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Trà Đào Cam Sả', desc: 'Thanh mát ngọt nhẹ, thêm lát cam tươi và sả thơm', price: '45,000đ', image: IMG(1556679343, 400, 300), link: '' },
          { id: 's2', name: 'Matcha Latte Hảo Hạng', desc: 'Bột matcha Uji Nhật Bản, hòa cùng sữa Oat béo ngậy', price: '65,000đ', image: IMG(1573052905, 400, 300), link: '' },
          { id: 's3', name: 'Bánh Croissant Mứt Dâu', desc: 'Nướng tươi mỗi sáng, nhân mứt dâu tây handmade', price: '55,000đ', image: IMG(1555507036, 400, 300), link: '' },
          { id: 's4', name: 'Iced Lavender Latte', desc: 'Hoa oải hương hòa cùng espresso và sữa mát lạnh', price: '70,000đ', image: IMG(1514432324607, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'about',
        heading: 'Về Bloom Coffee',
        body: 'Chúng tôi tin rằng mỗi tách cà phê là một trải nghiệm riêng. Bloom Coffee được xây dựng bởi những người trẻ yêu sáng tạo và yêu hương vị. Không gian nhỏ nhắn, ấm cúng — nơi bạn có thể làm việc, hẹn hò hoặc đơn giản là ngồi một mình với quyển sách yêu thích.',
        image: IMG(1463797800285, 600, 700),
        socials: [
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'tiktok', url: 'https://tiktok.com' },
          { platform: 'phone', url: 'tel:0347868656' },
        ],
      } as AboutBlock,
      {
        type: 'gallery',
        heading: 'Góc ảnh yêu thích',
        images: [
          { id: 'g1', src: IMG(1509042239860, 600, 450), alt: 'Cà phê', link: '' },
          { id: 'g2', src: IMG(1442512835329, 600, 450), alt: 'Bánh ngọt', link: '' },
          { id: 'g3', src: IMG(1559056189, 600, 450), alt: 'Không gian', link: '' },
          { id: 'g4', src: IMG(1485808191253, 600, 450), alt: 'Barista', link: '' },
          { id: 'g5', src: IMG(1521927, 600, 450), alt: 'Espresso', link: '' },
          { id: 'g6', src: IMG(1501901, 600, 450), alt: 'Buổi sáng', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'contact',
        heading: 'Ghé thăm chúng tôi',
        address: '42 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
        phone: '0347 868 656',
        email: 'bloom@coffee.vn',
        hours: 'Thứ 2 – Thứ 6: 07:30 – 21:00 | Cuối tuần: 08:00 – 22:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'coffee-roast',
    name: 'The Roast Room',
    category: 'coffee',
    description: 'Phong cách công nghiệp, tông xanh rêu và gỗ, lý tưởng cho coffee roastery.',
    thumbnail: IMG(1559056189, 600, 400),
    primaryColor: '#3d5a3e',
    accentColor: '#a8c5a0',
    bgColor: '#f5f2ee',
    style: 'rustic',
    blocks: [
      {
        type: 'hero',
        heading: 'Từ hạt xanh đến tách đẳng cấp',
        subheading: 'Rang xay trực tiếp — Nguồn gốc rõ ràng — Trân trọng từng mẻ',
        ctaLabel: 'Khám phá nguồn gốc',
        ctaLink: '#about',
        bgImage: IMG(1442512835329, 1400, 800),
        layout: 'left',
      } as HeroBlock,
      {
        type: 'about',
        heading: 'Roastery của chúng tôi',
        body: 'The Roast Room là không gian rang xay thủ công đầu tiên tại Đà Lạt chuyên về single-origin. Mỗi mẻ rang được kiểm soát nhiệt độ millidegree và ghi chép đầy đủ để đảm bảo tính lặp lại hoàn hảo. Chúng tôi làm việc trực tiếp với nông dân để đảm bảo chất lượng tại nguồn.',
        image: IMG(1566984801003, 600, 700),
        socials: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'youtube', url: 'https://youtube.com' },
          { platform: 'phone', url: 'tel:0347868656' },
        ],
      } as AboutBlock,
      {
        type: 'services',
        heading: 'Cà phê single-origin',
        subheading: 'Mỗi túi đều kể câu chuyện từ vùng đất đặc biệt',
        layout: 'list',
        items: [
          { id: 's1', name: 'Đà Lạt Anaerobic Natural', desc: 'Lên men yếm khí 72 giờ, ghi chú hương dâu rừng và socola đen', price: '180,000đ/250g', image: IMG(1495474472657, 400, 300), link: '' },
          { id: 's2', name: 'Cầu Đất Honey Process', desc: 'Đồi Cầu Đất 1500m, xử lý honey giữ lại vị ngọt tự nhiên của quả', price: '150,000đ/250g', image: IMG(1573052905, 400, 300), link: '' },
          { id: 's3', name: 'Ethiopia Yirgacheffe Washed', desc: 'Nguồn gốc Ethiopia, rửa sạch cho vị sáng, hoa nhài và citrus', price: '220,000đ/250g', image: IMG(1485808191253, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'Quy trình rang xay',
        images: [
          { id: 'g1', src: IMG(1463797800285, 600, 450), alt: 'Hạt cà phê xanh', link: '' },
          { id: 'g2', src: IMG(1521927, 600, 450), alt: 'Máy rang', link: '' },
          { id: 'g3', src: IMG(1509042239860, 600, 450), alt: 'Đóng gói', link: '' },
          { id: 'g4', src: IMG(1559056189, 600, 450), alt: 'Cupping', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'contact',
        heading: 'Tới thăm xưởng rang',
        address: '28B Hùng Vương, Phường 9, Đà Lạt, Lâm Đồng',
        phone: '0347 868 656',
        email: 'hello@roastroom.vn',
        hours: 'Thứ 3 – Chủ Nhật: 08:00 – 17:00 (Thứ 2 nghỉ)',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SPA
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'spa-zen',
    name: 'Zen Sanctuary',
    category: 'spa',
    description: 'Phong cách thiền định, tông màu be và xanh lá nhẹ, không gian spa cao cấp.',
    thumbnail: IMG(1540555700478, 600, 400),
    primaryColor: '#4a7c59',
    accentColor: '#c8dbb6',
    bgColor: '#f9f6f1',
    style: 'elegant',
    blocks: [
      {
        type: 'hero',
        heading: 'Tìm lại sự bình yên\ntrong chính mình',
        subheading: 'Liệu trình chăm sóc toàn thân — Không gian yên tĩnh — Thảo dược thiên nhiên',
        ctaLabel: 'Đặt lịch hẹn',
        ctaLink: 'tel:0347868656',
        bgImage: IMG(1540555700478, 1400, 800),
        layout: 'center',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Liệu trình thư giãn',
        subheading: 'Mỗi liệu trình được cá nhân hóa theo nhu cầu cơ thể bạn',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Massage Đá Nóng', desc: 'Đá bazan tự nhiên nhiệt độ 45°C giúp thư giãn cơ sâu và tăng tuần hoàn', price: '550,000đ/90 phút', image: IMG(1544161515, 400, 300), link: '' },
          { id: 's2', name: 'Chăm Sóc Da Collagen', desc: 'Serum collagen marine kết hợp massage nâng cơ mặt theo phương pháp Hàn Quốc', price: '650,000đ/75 phút', image: IMG(1512290923902, 400, 300), link: '' },
          { id: 's3', name: 'Tắm Ngâm Thảo Dược', desc: 'Bồn ngâm hoa hồng và tinh dầu lavender, thư giãn toàn thân sau ngày dài', price: '350,000đ/45 phút', image: IMG(1519699047748, 400, 300), link: '' },
          { id: 's4', name: 'Gói Couples Spa', desc: 'Trải nghiệm spa dành cho hai người, phòng riêng với rượu sparkling và hoa tươi', price: '1,800,000đ/120 phút', image: IMG(1583212992, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'Không gian của chúng tôi',
        images: [
          { id: 'g1', src: IMG(1540555700478, 600, 450), alt: 'Phòng trị liệu', link: '' },
          { id: 'g2', src: IMG(1544161515, 600, 450), alt: 'Khu thư giãn', link: '' },
          { id: 'g3', src: IMG(1512290923902, 600, 450), alt: 'Sản phẩm thiên nhiên', link: '' },
          { id: 'g4', src: IMG(1519699047748, 600, 450), alt: 'Bể ngâm', link: '' },
          { id: 'g5', src: IMG(1583212992, 600, 450), alt: 'Tinh dầu', link: '' },
          { id: 'g6', src: IMG(1570172631, 600, 450), alt: 'Đá trị liệu', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'about',
        heading: 'Triết lý của Zen Sanctuary',
        body: 'Chúng tôi tin rằng sức khỏe thực sự đến từ sự cân bằng giữa thể chất và tâm trí. Zen Sanctuary được thiết kế như một chốn trú ẩn giữa lòng thành phố — nơi tiếng ồn ào bên ngoài dừng lại và không gian bên trong bắt đầu. Đội ngũ trị liệu sư của chúng tôi được đào tạo bài bản tại Thái Lan và Nhật Bản.',
        image: IMG(1570172631, 600, 700),
        socials: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'zalo', url: 'https://zalo.me' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Đặt lịch hẹn',
        address: '15 Pasteur, Quận 1, TP. Hồ Chí Minh',
        phone: '0347 868 656',
        email: 'booking@zensanctuary.vn',
        hours: 'Thứ 2 – Chủ Nhật: 09:00 – 21:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'spa-rose',
    name: 'Rose & Gold Spa',
    category: 'spa',
    description: 'Sang trọng với tông hồng phấn và vàng gold, phù hợp nail salon và beauty bar.',
    thumbnail: IMG(1512290923902, 600, 400),
    primaryColor: '#b76e79',
    accentColor: '#f8e8e5',
    bgColor: '#fff9f8',
    style: 'luxury',
    blocks: [
      {
        type: 'hero',
        heading: 'Nơi vẻ đẹp của bạn\nđược tôn vinh',
        subheading: 'Nail art thời thượng — Chăm sóc da chuyên sâu — Không gian hạng sang',
        ctaLabel: 'Đặt lịch ngay',
        ctaLink: 'tel:0347868656',
        bgImage: IMG(1570172631, 1400, 800),
        layout: 'left',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Dịch vụ của chúng tôi',
        subheading: 'Được thực hiện bởi những nghệ nhân lành nghề hơn 10 năm kinh nghiệm',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Nail Art Gel Cao Cấp', desc: 'Hơn 300 mẫu nail art, sơn gel nhập khẩu Korea, giữ màu 3-4 tuần', price: '350,000đ', image: IMG(1583212992, 400, 300), link: '' },
          { id: 's2', name: 'Facial Nâng Cơ RF', desc: 'Công nghệ sóng radio frequency kết hợp massage mặt Kobido nâng cơ toàn diện', price: '850,000đ', image: IMG(1512290923902, 400, 300), link: '' },
          { id: 's3', name: 'Wax Toàn Thân', desc: 'Sáp ong mật tự nhiên, không gây kích ứng, làm sạch tận gốc', price: '420,000đ', image: IMG(1519699047748, 400, 300), link: '' },
          { id: 's4', name: 'Gội Đầu Phục Hồi Keratin', desc: 'Keratin treatment Moroccan giúp tóc óng mượt, giảm xù rối sau 1 lần', price: '650,000đ', image: IMG(1544161515, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'about',
        heading: 'Về Rose & Gold',
        body: 'Chúng tôi không chỉ cung cấp dịch vụ làm đẹp — chúng tôi tạo ra trải nghiệm. Từ phòng chờ ướp hương hoa hồng đến từng bước chăm sóc tỉ mỉ của chuyên gia, mỗi lần ghé thăm Rose & Gold là một khoảnh khắc xa hoa dành riêng cho bạn. Khách hàng của chúng tôi là phụ nữ hiện đại coi trọng bản thân.',
        image: IMG(1540555700478, 600, 700),
        socials: [
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'tiktok', url: 'https://tiktok.com' },
          { platform: 'zalo', url: 'https://zalo.me' },
        ],
      } as AboutBlock,
      {
        type: 'gallery',
        heading: 'Tác phẩm của chúng tôi',
        images: [
          { id: 'g1', src: IMG(1583212992, 600, 450), alt: 'Nail art', link: '' },
          { id: 'g2', src: IMG(1570172631, 600, 450), alt: 'Chăm sóc da', link: '' },
          { id: 'g3', src: IMG(1540555700478, 600, 450), alt: 'Không gian', link: '' },
          { id: 'g4', src: IMG(1512290923902, 600, 450), alt: 'Beauty room', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'contact',
        heading: 'Liên hệ đặt lịch',
        address: '88 Lê Lợi, Quận Hải Châu, Đà Nẵng',
        phone: '0347 868 656',
        email: 'hello@rosegoldspa.vn',
        hours: 'Thứ 3 – Chủ Nhật: 09:00 – 20:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'spa-natural',
    name: 'Natural Roots',
    category: 'spa',
    description: 'Mộc mạc, thuần tự nhiên. Tone màu đất và xanh olive cho spa dùng thảo dược bản địa.',
    thumbnail: IMG(1544161515, 600, 400),
    primaryColor: '#5c4a1e',
    accentColor: '#c8ad7f',
    bgColor: '#faf8f3',
    style: 'rustic',
    blocks: [
      {
        type: 'hero',
        heading: 'Chữa lành từ thiên nhiên\nbản địa Việt',
        subheading: 'Thảo dược núi rừng Tây Bắc — Bí quyết truyền đời — Không hóa chất tổng hợp',
        ctaLabel: 'Tìm hiểu liệu trình',
        ctaLink: '#services',
        bgImage: IMG(1519699047748, 1400, 800),
        layout: 'center',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Liệu trình thảo dược',
        subheading: '100% nguyên liệu thiên nhiên thu hoạch từ các vùng núi Việt Nam',
        layout: 'list',
        items: [
          { id: 's1', name: 'Tắm Lá Thuốc Mường', desc: 'Hỗn hợp 15 loại lá thuốc của người Mường: gừng, ngải cứu, lá lốt... giúp thải độc cơ thể', price: '280,000đ/60 phút', image: IMG(1544161515, 400, 300), link: '' },
          { id: 's2', name: 'Xông Hơi Thảo Mộc', desc: 'Hơi nóng hòa quyện tinh dầu sả, bạch đàn và kinh giới — thanh lọc đường thở tức thì', price: '180,000đ/30 phút', image: IMG(1519699047748, 400, 300), link: '' },
          { id: 's3', name: 'Chườm Muối Hồng Himalaya', desc: 'Túi chườm muối hồng nung nóng giúp giảm đau nhức xương khớp và thư giãn cơ sâu', price: '320,000đ/45 phút', image: IMG(1570172631, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'about',
        heading: 'Triết lý chữa lành',
        body: 'Natural Roots ra đời từ hành trình sưu tầm bài thuốc dân gian của người sáng lập sau 15 năm đi khắp các tỉnh miền núi phía Bắc. Chúng tôi hợp tác trực tiếp với các bản làng người dân tộc để thu hái thảo dược đúng mùa, bảo đảm chất lượng và hỗ trợ sinh kế bền vững cho cộng đồng.',
        image: IMG(1540555700478, 600, 700),
        socials: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'youtube', url: 'https://youtube.com' },
          { platform: 'zalo', url: 'https://zalo.me' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Ghé thăm chúng tôi',
        address: '7 Trần Phú, Sa Pa, Lào Cai',
        phone: '0347 868 656',
        email: 'care@naturalroots.vn',
        hours: 'Hàng ngày: 08:00 – 20:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RESTAURANT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'restaurant-bistro',
    name: 'Le Bistro',
    category: 'restaurant',
    description: 'Phong cách bistro Pháp, tông đỏ vang và kem, sang trọng nhưng ấm cúng.',
    thumbnail: IMG(1579871494447, 600, 400),
    primaryColor: '#8b1a1a',
    accentColor: '#f5e6d3',
    bgColor: '#fffdf8',
    style: 'elegant',
    blocks: [
      {
        type: 'hero',
        heading: 'Tinh tế Pháp\ngiữa lòng Việt Nam',
        subheading: 'Ẩm thực Pháp – Việt fusion — Không gian lãng mạn — Rượu vang tuyển chọn',
        ctaLabel: 'Đặt bàn',
        ctaLink: 'tel:0347868656',
        bgImage: IMG(1579871494447, 1400, 800),
        layout: 'center',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Thực đơn Chef\'s Choice',
        subheading: 'Được thay đổi theo mùa — Nguyên liệu tươi nhập hàng ngày',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Foie Gras Poêlé', desc: 'Gan ngỗng sốt pan với mứt cherry và bánh mì brioche nướng giòn', price: '395,000đ', image: IMG(1544025162, 400, 300), link: '' },
          { id: 's2', name: 'Boeuf Bourguignon', desc: 'Bò kho rượu vang đỏ Burgundy kiểu Pháp, ăn kèm mashed potato và rau củ mùa', price: '445,000đ', image: IMG(1544025162, 400, 300), link: '' },
          { id: 's3', name: 'Crevettes à la Provençale', desc: 'Tôm sú sốt cà chua Provence với tỏi, rượu trắng và thảo mộc Địa Trung Hải', price: '385,000đ', image: IMG(1550304943, 400, 300), link: '' },
          { id: 's4', name: 'Crème Brûlée Vani Madagascar', desc: 'Bánh flan pháp bề mặt caramel giòn, nhân custard mịn thơm vani đen Madagascar', price: '145,000đ', image: IMG(1555507036, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'Không gian',
        images: [
          { id: 'g1', src: IMG(1579871494447, 600, 450), alt: 'Phòng ăn chính', link: '' },
          { id: 'g2', src: IMG(1544025162, 600, 450), alt: 'Góc lãng mạn', link: '' },
          { id: 'g3', src: IMG(1550304943, 600, 450), alt: 'Quầy bar', link: '' },
          { id: 'g4', src: IMG(1555507036, 600, 450), alt: 'Bếp mở', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'about',
        heading: 'Câu chuyện của Le Bistro',
        body: 'Chef Thomas Nguyễn học tại Le Cordon Bleu Paris và làm việc 8 năm tại các nhà hàng một sao Michelin trước khi trở về Việt Nam với giấc mơ kết hôn ẩm thực Pháp và nguyên liệu bản địa Việt. Le Bistro là kết quả của hành trình đó — nơi mỗi món ăn là một câu chuyện về hai nền văn hóa.',
        image: IMG(1544025162, 600, 700),
        socials: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'phone', url: 'tel:0347868656' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Đặt bàn',
        address: '23 Lê Thánh Tôn, Quận 1, TP. Hồ Chí Minh',
        phone: '0347 868 656',
        email: 'reservation@lebistro.vn',
        hours: 'Thứ 3 – Chủ Nhật: 11:30 – 14:30 | 18:00 – 22:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'restaurant-pho',
    name: 'Phở Bà Nội',
    category: 'restaurant',
    description: 'Ấm cúng và truyền thống, tông màu vàng nâu đất, dành cho quán ăn Việt đặc sản.',
    thumbnail: IMG(1544025162, 600, 400),
    primaryColor: '#c2652a',
    accentColor: '#fdf0e0',
    bgColor: '#fffcf5',
    style: 'rustic',
    blocks: [
      {
        type: 'hero',
        heading: 'Hương vị ký ức\ncủa bà ngoại',
        subheading: 'Nước dùng xương ninh 12 tiếng — Thịt bò tươi mỗi sáng — Bí quyết gia truyền 3 đời',
        ctaLabel: 'Xem thực đơn',
        ctaLink: '#menu',
        bgImage: IMG(1550304943, 1400, 800),
        layout: 'left',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Thực đơn đặc sản',
        subheading: 'Phở bò, bún bò và các món ăn truyền thống miền Nam',
        layout: 'list',
        items: [
          { id: 's1', name: 'Phở Bò Đặc Biệt', desc: 'Nước dùng xương ống ninh 12 tiếng, thịt bò tái nạm gầu, ăn kèm rau sống và tương hoisin', price: '75,000đ', image: IMG(1550304943, 400, 300), link: '' },
          { id: 's2', name: 'Bún Bò Huế Cay', desc: 'Nước lèo sả mắm ruốc đặc trưng xứ Huế, thêm giò heo và chả tôm béo ngậy', price: '70,000đ', image: IMG(1544025162, 400, 300), link: '' },
          { id: 's3', name: 'Cơm Tấm Sườn Bì Chả', desc: 'Sườn nướng mật ong, bì heo thái chỉ và chả trứng hấp dẻo mịn, kèm nước mắm chua ngọt', price: '65,000đ', image: IMG(1579871494447, 400, 300), link: '' },
          { id: 's4', name: 'Hủ Tiếu Nam Vang', desc: 'Hủ tiếu dai ngon, nước lèo ngọt trong từ xương heo và mực khô, thêm tôm thịt đầy đặn', price: '65,000đ', image: IMG(1555507036, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'about',
        heading: 'Câu chuyện của Bà Nội',
        body: 'Năm 1980, bà Trần Thị Lan bắt đầu bán phở bò trước cổng trường tiểu học Bình Thạnh với một nồi nhỏ. Hơn 40 năm sau, ba thế hệ gia đình vẫn giữ nguyên công thức đó — không bột ngọt, không nước dùng bột, chỉ là xương bò thật và thời gian. Đây là di sản chúng tôi trân trọng mỗi ngày.',
        image: IMG(1544025162, 600, 700),
        socials: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'zalo', url: 'https://zalo.me' },
          { platform: 'phone', url: 'tel:0347868656' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Ghé ăn sáng',
        address: '54 Đinh Tiên Hoàng, Bình Thạnh, TP. Hồ Chí Minh',
        phone: '0347 868 656',
        email: '',
        hours: 'Thứ 2 – Thứ 7: 06:00 – 12:00 (Chủ Nhật nghỉ)',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'restaurant-sushi',
    name: 'Hanami Sushi',
    category: 'restaurant',
    description: 'Tối giản kiểu Nhật, tông đen và trắng với điểm nhấn đỏ, cho nhà hàng Nhật cao cấp.',
    thumbnail: IMG(1550304943, 600, 400),
    primaryColor: '#1a1a2e',
    accentColor: '#e63946',
    bgColor: '#f8f8f8',
    style: 'modern',
    blocks: [
      {
        type: 'hero',
        heading: 'Omakase —\nTin tưởng trao cho đầu bếp',
        subheading: 'Sashimi cá tươi bay thẳng từ Nhật mỗi tuần — Sake tuyển chọn — Trải nghiệm Edomae',
        ctaLabel: 'Đặt bàn Omakase',
        ctaLink: 'tel:0347868656',
        bgImage: IMG(1579871494447, 1400, 800),
        layout: 'center',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'À La Carte',
        subheading: 'Cá tươi nhập Nhật thứ Ba và thứ Sáu hàng tuần',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Otoro Sashimi (5 miếng)', desc: 'Bụng cá ngừ bluefin vân mỡ đẹp, tan chảy trong miệng — thứ hạng A5 của sashimi', price: '890,000đ', image: IMG(1579871494447, 400, 300), link: '' },
          { id: 's2', name: 'Wagyu Sukiyaki', desc: 'Thịt bò Wagyu A5 Miyazaki nhúng lẩu sukiyaki truyền thống, chấm lòng đỏ trứng sống', price: '1,250,000đ', image: IMG(1544025162, 400, 300), link: '' },
          { id: 's3', name: 'Uni Ikura Don', desc: 'Cơm sushi Koshihikari, nhum biển tươi và trứng cá hồi muối Hokkaido, rong biển nori Ariake', price: '650,000đ', image: IMG(1550304943, 400, 300), link: '' },
          { id: 's4', name: 'Tempura Set (6 miếng)', desc: 'Tôm, mực, khoai lang và nấm shiitake tươi chiên bột nhẹ, chấm nước tsuyu Nhật', price: '380,000đ', image: IMG(1555507036, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'Không gian & món ăn',
        images: [
          { id: 'g1', src: IMG(1579871494447, 600, 450), alt: 'Sashimi', link: '' },
          { id: 'g2', src: IMG(1544025162, 600, 450), alt: 'Wagyu', link: '' },
          { id: 'g3', src: IMG(1550304943, 600, 450), alt: 'Sushi counter', link: '' },
          { id: 'g4', src: IMG(1555507036, 600, 450), alt: 'Sake bar', link: '' },
          { id: 'g5', src: IMG(1570172631, 600, 450), alt: 'Dining room', link: '' },
          { id: 'g6', src: IMG(1544025162, 600, 450), alt: 'Chef', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'about',
        heading: 'Tinh tế từ Nhật Bản',
        body: 'Chef Hanami đã học nghề tại Tokyo suốt 12 năm, làm sushi tại Ginza trước khi mang phong cách Edomae authentic về Việt Nam. Mỗi miếng sushi là sự kết hợp của kỹ thuật truyền thống nghiêm ngặt và nguyên liệu được tuyển chọn kỹ lưỡng. Không có đường tắt trong ẩm thực Nhật.',
        image: IMG(1570172631, 600, 700),
        socials: [
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'phone', url: 'tel:0347868656' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Đặt bàn',
        address: '92 Tràng Tiền, Hoàn Kiếm, Hà Nội',
        phone: '0347 868 656',
        email: 'reservation@hanamisg.vn',
        hours: 'Thứ 3 – Chủ Nhật: 11:30 – 14:00 | 18:00 – 22:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RETAIL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'retail-fashion',
    name: 'Mode Studio',
    category: 'retail',
    description: 'Tối giản, trắng và đen, dành cho thương hiệu thời trang local brand hiện đại.',
    thumbnail: IMG(1596755094514, 600, 400),
    primaryColor: '#111111',
    accentColor: '#e5e5e5',
    bgColor: '#ffffff',
    style: 'minimal',
    blocks: [
      {
        type: 'hero',
        heading: 'Phong cách\nkhông cần giải thích',
        subheading: 'Local fashion — Sustainable materials — Designed in Vietnam',
        ctaLabel: 'Khám phá bộ sưu tập',
        ctaLink: '#products',
        bgImage: IMG(1596755094514, 1400, 800),
        layout: 'left',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Bộ sưu tập SS2025',
        subheading: 'Cấu thành từ vải tự nhiên, thiết kế mang tính ứng dụng cao',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Áo Blazer Linen Unisex', desc: 'Chất linen Ý tự nhiên 100%, phom oversized phù hợp mọi vóc dáng, 3 màu trung tính', price: '1,490,000đ', image: IMG(1596755094514, 400, 300), link: '' },
          { id: 's2', name: 'Quần Wide-leg Tencel', desc: 'Vải Tencel tái chế từ gỗ FSC, mát và nhẹ, phom rộng trendy mùa hè', price: '990,000đ', image: IMG(1624378439575, 400, 300), link: '' },
          { id: 's3', name: 'Áo Thun Pima Cotton', desc: 'Cotton Pima Mỹ siêu mềm, dày dặn không bai nhão, cắt may tại xưởng Hội An', price: '590,000đ', image: IMG(1596755094514, 400, 300), link: '' },
          { id: 's4', name: 'Set Đồ Linen Tọa Thiền', desc: 'Co-ord set áo quần linen wash, phom thụng, màu sắc thiên nhiên lấy cảm hứng từ Bắc Việt', price: '1,890,000đ', image: IMG(1624378439575, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'Lookbook',
        images: [
          { id: 'g1', src: IMG(1596755094514, 600, 800), alt: 'Look 1', link: '' },
          { id: 'g2', src: IMG(1624378439575, 600, 800), alt: 'Look 2', link: '' },
          { id: 'g3', src: IMG(1596755094514, 600, 450), alt: 'Detail 1', link: '' },
          { id: 'g4', src: IMG(1624378439575, 600, 450), alt: 'Detail 2', link: '' },
          { id: 'g5', src: IMG(1596755094514, 600, 800), alt: 'Look 3', link: '' },
          { id: 'g6', src: IMG(1624378439575, 600, 800), alt: 'Look 4', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'about',
        heading: 'Về Mode Studio',
        body: 'Mode Studio ra đời năm 2021 với sứ mệnh chứng minh rằng thời trang bền vững không cần phải tẻ nhạt. Chúng tôi thiết kế tại Hà Nội, sản xuất tại các xưởng nhỏ địa phương cam kết điều kiện lao động tốt, và dùng vải tự nhiên hoặc tái chế. Thời trang đẹp hơn khi bạn biết nó đến từ đâu.',
        image: IMG(1596755094514, 600, 700),
        socials: [
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'tiktok', url: 'https://tiktok.com' },
          { platform: 'facebook', url: 'https://facebook.com' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Đến thử đồ',
        address: '7 Nhà Thờ, Hoàn Kiếm, Hà Nội',
        phone: '0347 868 656',
        email: 'hello@modestudio.vn',
        hours: 'Thứ 2 – Thứ 7: 10:00 – 21:00 | Chủ Nhật: 11:00 – 20:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'retail-grocery',
    name: 'Fresh Market',
    category: 'retail',
    description: 'Tươi xanh và năng động, tông màu xanh lá và cam, dành cho cửa hàng thực phẩm sạch.',
    thumbnail: IMG(1624378439575, 600, 400),
    primaryColor: '#2d7a3a',
    accentColor: '#f0f9f1',
    bgColor: '#f9fdf9',
    style: 'modern',
    blocks: [
      {
        type: 'hero',
        heading: 'Thực phẩm sạch\nthẳng từ nông trại',
        subheading: 'Rau củ hữu cơ — Thịt tươi không tẩm — Giao tận nhà trong 2 tiếng',
        ctaLabel: 'Mua ngay hôm nay',
        ctaLink: 'tel:0347868656',
        bgImage: IMG(1624378439575, 1400, 800),
        layout: 'left',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Sản phẩm nổi bật',
        subheading: 'Tươi mỗi ngày, đặt trước 8 giờ tối giao ngay sáng hôm sau',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Rổ Rau Hữu Cơ Tuần', desc: 'Hỗn hợp 8-10 loại rau theo mùa từ trang trại hữu cơ Đà Lạt, không thuốc trừ sâu', price: '280,000đ/tuần', image: IMG(1596755094514, 400, 300), link: '' },
          { id: 's2', name: 'Thịt Heo Rừng Lai', desc: 'Heo rừng lai nuôi thả tự nhiên, thịt săn chắc và thơm, không kháng sinh tăng trọng', price: '180,000đ/kg', image: IMG(1624378439575, 400, 300), link: '' },
          { id: 's3', name: 'Trứng Gà Vườn (12 quả)', desc: 'Gà ta thả vườn ăn ngô và giun tự nhiên, lòng đỏ đậm màu, giàu omega-3', price: '65,000đ/vỉ', image: IMG(1596755094514, 400, 300), link: '' },
          { id: 's4', name: 'Gạo ST25 Sóc Trăng', desc: 'Gạo ngon nhất thế giới 2019, thơm dẻo vừa phải, trồng tại vùng đất Sóc Trăng chính gốc', price: '45,000đ/kg', image: IMG(1624378439575, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'about',
        heading: 'Cam kết của Fresh Market',
        body: 'Fresh Market hợp tác với hơn 50 nông hộ nhỏ trên cả nước để đưa thực phẩm sạch đến tay người tiêu dùng đô thị. Chúng tôi kiểm tra tồn dư thuốc bảo vệ thực vật mỗi lô hàng, truy xuất nguồn gốc rõ ràng bằng QR code và cam kết giá thu mua công bằng cho nông dân. Sạch từ gốc rễ.',
        image: IMG(1624378439575, 600, 700),
        socials: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'zalo', url: 'https://zalo.me' },
          { platform: 'phone', url: 'tel:0347868656' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Đặt hàng & giao nhận',
        address: '33 Trần Não, Quận 2, TP. Hồ Chí Minh',
        phone: '0347 868 656',
        email: 'order@freshmarket.vn',
        hours: 'Thứ 2 – Thứ 7: 07:00 – 19:00 | Chủ Nhật: 07:00 – 14:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'retail-gift',
    name: 'Gift & Co.',
    category: 'retail',
    description: 'Ấm áp và tinh tế, tông màu tím lavender và vàng nhạt, cho cửa hàng quà tặng.',
    thumbnail: IMG(1555507036, 600, 400),
    primaryColor: '#7c5cbf',
    accentColor: '#f0ebff',
    bgColor: '#fdfbff',
    style: 'elegant',
    blocks: [
      {
        type: 'hero',
        heading: 'Những món quà\nkể câu chuyện',
        subheading: 'Handmade gifts — Gói quà miễn phí — Giao tận nơi trong ngày',
        ctaLabel: 'Khám phá quà tặng',
        ctaLink: '#products',
        bgImage: IMG(1555507036, 1400, 800),
        layout: 'center',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Bộ sưu tập quà tặng',
        subheading: 'Mỗi sản phẩm đều có thể khắc tên và lời nhắn theo yêu cầu',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Hộp Quà Tiệc Sinh Nhật', desc: 'Nến thơm handmade, thiệp in tên, gối nhung thêu logo, hộp carton cao cấp màu kraft', price: '450,000đ', image: IMG(1555507036, 400, 300), link: '' },
          { id: 's2', name: 'Bộ Trà Nhật Organic', desc: 'Matcha Uji + trà gạo rang (genmaicha) + bộ dụng cụ pha chuyên dụng ceramic handmade', price: '680,000đ', image: IMG(1556679343, 400, 300), link: '' },
          { id: 's3', name: 'Nến Soy Khắc Tên', desc: 'Nến đậu nành thuần chay, hương tuỳ chọn 12 mùi, khắc tên laser tặng kèm', price: '280,000đ', image: IMG(1573052905, 400, 300), link: '' },
          { id: 's4', name: 'Album Ảnh In Bìa Da', desc: 'In 50 ảnh chọn lọc, bìa da PU khắc tên, giấy matte satin cao cấp, khổ A4 landscape', price: '550,000đ', image: IMG(1514432324607, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'Inspiration',
        images: [
          { id: 'g1', src: IMG(1555507036, 600, 450), alt: 'Gift boxes', link: '' },
          { id: 'g2', src: IMG(1556679343, 600, 450), alt: 'Packaging', link: '' },
          { id: 'g3', src: IMG(1573052905, 600, 450), alt: 'Candles', link: '' },
          { id: 'g4', src: IMG(1514432324607, 600, 450), alt: 'Albums', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'about',
        heading: 'Về Gift & Co.',
        body: 'Gift & Co. ra đời từ niềm tin rằng một món quà đúng nghĩa phải mang theo cảm xúc, không chỉ là vật chất. Chúng tôi chọn từng sản phẩm, thiết kế từng bộ quà với sự tỉ mỉ và tình yêu. Đội ngũ wrap artist của chúng tôi có thể biến bất kỳ sản phẩm nào thành tác phẩm nghệ thuật gói gọn trong giấy kraft và ruy băng.',
        image: IMG(1573052905, 600, 700),
        socials: [
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'tiktok', url: 'https://tiktok.com' },
          { platform: 'zalo', url: 'https://zalo.me' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Đặt quà',
        address: '19 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
        phone: '0347 868 656',
        email: 'order@giftandco.vn',
        hours: 'Thứ 2 – Chủ Nhật: 09:00 – 21:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COFFEE — BỔ SUNG
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'coffee-saigon',
    name: 'Sài Gòn Sáng',
    category: 'coffee',
    description: 'Hồn cà phê vỉa hè Sài Gòn — phin đen, bạc xỉu, ký ức vàng son. Tông nâu ấm và vàng đất.',
    thumbnail: IMG(1541167760496, 600, 400),
    primaryColor: '#5C2D0E',
    accentColor: '#F4C430',
    bgColor: '#FFFDF0',
    style: 'bold',
    blocks: [
      {
        type: 'hero',
        heading: 'Cà phê Sài Gòn —\nMột buổi sáng khác biệt',
        subheading: 'Phin nhỏ giọt chậm rãi — Sữa đặc Ông Thọ — Gió sớm vỉa hè thân quen',
        ctaLabel: 'Xem thực đơn',
        ctaLink: '#menu',
        bgImage: IMG(1541167760496, 1400, 800),
        layout: 'left',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Thực đơn hàng ngày',
        subheading: 'Đơn giản, chân thật, đúng vị Sài Gòn từ những năm 80',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Cà Phê Đen Đá', desc: 'Robusta Buôn Ma Thuột pha phin truyền thống, uống với đá viên to. Vị đắng mạnh, thơm khói', price: '20,000đ', image: IMG(1521927, 400, 300), link: '' },
          { id: 's2', name: 'Bạc Xỉu', desc: 'Sữa đặc ông Thọ trắng 2/3 ly, cà phê phin đổ chậm 1/3. Ngọt béo đặc trưng miền Nam', price: '25,000đ', image: IMG(1495474472657, 400, 300), link: '' },
          { id: 's3', name: 'Cà Phê Sữa Nóng', desc: 'Cà phê phin nguyên chất, khuấy đều với sữa đặc nóng hổi. Uống chậm trong giờ sáng', price: '22,000đ', image: IMG(1514432324607, 400, 300), link: '' },
          { id: 's4', name: 'Sinh Tố Bơ Sữa', desc: 'Bơ Đắk Lắk chín mềm xay nhuyễn cùng sữa đặc và đá. Béo ngậy, no nê cho buổi sáng', price: '35,000đ', image: IMG(1573052905, 400, 300), link: '' },
          { id: 's5', name: 'Bánh Mì Thịt', desc: 'Bánh mì nướng giòn rộp, kẹp chả lụa, pâté, dưa leo, hành ngò và tương ớt tươi', price: '30,000đ', image: IMG(1509042239860, 400, 300), link: '' },
          { id: 's6', name: 'Trà Đá Miễn Phí', desc: 'Với mỗi ly cà phê, khách được 1 ly trà đá miễn phí theo đúng phong cách Sài Gòn xưa', price: 'Miễn phí', image: IMG(1556679343, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'Góc nhỏ Sài Gòn của chúng tôi',
        images: [
          { id: 'g1', src: IMG(1442512835329, 600, 450), alt: 'Quầy pha cà phê', link: '' },
          { id: 'g2', src: IMG(1463797800285, 600, 450), alt: 'Vỉa hè buổi sáng', link: '' },
          { id: 'g3', src: IMG(1559056189, 600, 450), alt: 'Không gian ngồi', link: '' },
          { id: 'g4', src: IMG(1501901, 600, 450), alt: 'Phin cà phê truyền thống', link: '' },
          { id: 'g5', src: IMG(1485808191253, 600, 450), alt: 'Ly cà phê đen đá', link: '' },
          { id: 'g6', src: IMG(1521927, 600, 450), alt: 'Buổi sáng đông khách', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'about',
        heading: 'Hơn 30 năm một góc phố',
        body: 'Cà phê Sài Gòn Sáng mở cửa từ năm 1991 — ba thế hệ gia đình Bà Năm giữ nguyên cách pha phin tay theo kiểu cũ. Không dùng máy pha espresso, không siro, không hương liệu. Chỉ là cà phê Robusta Buôn Ma Thuột thật, phin thép đã dùng hàng chục năm và tấm lòng của người bán hàng biết tên khách quen. Đây là kiểu cà phê mà người Sài Gòn lớn lên với nó.',
        image: IMG(1566984801003, 600, 700),
        socials: [
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'zalo', url: 'https://zalo.me' },
          { platform: 'phone', url: 'tel:0347868656' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Địa chỉ ghé sáng',
        address: '19 Cao Thắng, Phường 2, Quận 3, TP. Hồ Chí Minh',
        phone: '0347 868 656',
        email: '',
        hours: 'Thứ 2 – Thứ 7: 05:30 – 11:30 (hết hàng nghỉ sớm)',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'coffee-ritual',
    name: 'The Ritual',
    category: 'coffee',
    description: 'Specialty coffee tối giản — mỗi tách là một nghi thức. Tông màu đen và hổ phách, phong cách barista cuộc thi.',
    thumbnail: IMG(1485808191253, 600, 400),
    primaryColor: '#0F2027',
    accentColor: '#C9A84C',
    bgColor: '#F9F8F5',
    style: 'minimal',
    blocks: [
      {
        type: 'hero',
        heading: 'Mỗi tách cà phê\nlà một nghi thức',
        subheading: 'Precision brewing — Single origin — Taste the terroir',
        ctaLabel: 'Khám phá thực đơn',
        ctaLink: '#menu',
        bgImage: IMG(1485808191253, 1400, 800),
        layout: 'center',
      } as HeroBlock,
      {
        type: 'about',
        heading: 'Triết lý của The Ritual',
        body: 'The Ritual ra đời từ niềm tin rằng cà phê không phải chỉ là đồ uống — đó là hành trình từ hạt đến tách. Chúng tôi không pha chế theo thói quen, mà theo từng biến số: nhiệt độ nước 93°C, tỷ lệ brew 1:16, thời gian chiết 2:30. Barista của chúng tôi đều đã tham gia ít nhất một kỳ thi World Brewers Cup khu vực. Không có công thức cố định — chỉ có sự chú ý tuyệt đối.',
        image: IMG(1559056189, 600, 700),
        socials: [
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'youtube', url: 'https://youtube.com' },
          { platform: 'phone', url: 'tel:0347868656' },
        ],
      } as AboutBlock,
      {
        type: 'services',
        heading: 'Phương pháp pha chế',
        subheading: 'Chọn phương pháp phù hợp với khẩu vị — Barista tư vấn miễn phí',
        layout: 'list',
        items: [
          { id: 's1', name: 'V60 Pour-over', desc: 'Rót tay theo vòng tròn đồng tâm với 4 lần đổ nước cách nhau 30 giây. Khai thác tối đa hương hoa và citrus của hạt washed Africa', price: '75,000đ', image: IMG(1521927, 400, 300), link: '' },
          { id: 's2', name: 'AeroPress Championship Recipe', desc: 'Công thức đoạt giải World AeroPress Championship 2023 — inverted method, 80°C, 2 phút bloom, vị ngọt mật ong và chocolate milk', price: '80,000đ', image: IMG(1495474472657, 400, 300), link: '' },
          { id: 's3', name: 'Siphon (Vacuum Pot)', desc: 'Pha cà phê bằng nhiệt và áp suất chân không — phương pháp lâu đời nhất, cho thức uống trong vắt và sạch nhất về mùi vị', price: '120,000đ', image: IMG(1514432324607, 400, 300), link: '' },
          { id: 's4', name: 'Espresso Bar', desc: 'La Marzocca Linea PB, tamping lực 25kg, extraction time 26-28 giây. Shot double chuẩn kỹ thuật Ý phục vụ tại quầy', price: '55,000đ', image: IMG(1509042239860, 400, 300), link: '' },
          { id: 's5', name: 'Cold Drip Tower', desc: 'Nhỏ giọt 8 giờ liên tục qua tháp thủy tinh 5 tầng, cho liquor mượt và phức tạp vượt trội cold brew thông thường', price: '95,000đ', image: IMG(1501901, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'Behind the bar',
        images: [
          { id: 'g1', src: IMG(1442512835329, 600, 450), alt: 'Barista đang pha', link: '' },
          { id: 'g2', src: IMG(1463797800285, 600, 450), alt: 'Thiết bị pha chế', link: '' },
          { id: 'g3', src: IMG(1521927, 600, 450), alt: 'Espresso shot', link: '' },
          { id: 'g4', src: IMG(1566984801003, 600, 450), alt: 'Tháp cold drip', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'contact',
        heading: 'Tìm chúng tôi',
        address: '68 Trần Quốc Toản, Quận 3, TP. Hồ Chí Minh',
        phone: '0347 868 656',
        email: 'hello@theritual.coffee',
        hours: 'Thứ 3 – Chủ Nhật: 08:00 – 21:00 | Thứ 2: Nghỉ bảo dưỡng thiết bị',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

  {
    id: 'coffee-cloud',
    name: 'Cà Phê Mây',
    category: 'coffee',
    description: 'Không gian rooftop thoáng đãng, tông xanh bầu trời và trắng kem — điểm check-in chiều hoàng hôn lý tưởng.',
    thumbnail: IMG(1509042239860, 600, 400),
    primaryColor: '#2A6496',
    accentColor: '#B8D8F0',
    bgColor: '#F5FBFF',
    style: 'modern',
    blocks: [
      {
        type: 'hero',
        heading: 'Uống cà phê\ngiữa tầng mây',
        subheading: 'Rooftop tầng 8 — View thành phố 360° — Hoàng hôn cùng ly cà phê yêu thích',
        ctaLabel: 'Đặt chỗ trước',
        ctaLink: 'tel:0347868656',
        bgImage: IMG(1509042239860, 1400, 800),
        layout: 'center',
      } as HeroBlock,
      {
        type: 'services',
        heading: 'Menu của chúng tôi',
        subheading: 'Thức uống phù hợp với từng khoảnh khắc — sáng năng lượng, chiều thư giãn, tối lãng mạn',
        layout: 'grid',
        items: [
          { id: 's1', name: 'Cloud Latte', desc: 'Espresso double + sữa tươi Dalat Milk đánh bọt mịn, trang trí latte art hình mây 3D đặc biệt của chúng tôi', price: '75,000đ', image: IMG(1495474472657, 400, 300), link: '' },
          { id: 's2', name: 'Sky Blue Matcha', desc: 'Bột matcha Kyoto hòa với nước 75°C, đánh kỹ bằng chasen, layered với sữa oat lạnh tạo hiệu ứng chân mây', price: '85,000đ', image: IMG(1573052905, 400, 300), link: '' },
          { id: 's3', name: 'Sunset Cold Brew', desc: 'Cold brew đậm đà ủ 20 tiếng, layer cam vàng tươi và syrup passion fruit — đẹp như hoàng hôn thật', price: '90,000đ', image: IMG(1514432324607, 400, 300), link: '' },
          { id: 's4', name: 'White Cloud Cappuccino', desc: 'Ristretto Arabica + microfoam dày đặc, vẽ lên bề mặt hình đám mây trắng trên nền cà phê nâu', price: '70,000đ', image: IMG(1521927, 400, 300), link: '' },
          { id: 's5', name: 'Cheesecake Mây Bông', desc: 'Cheesecake không nướng (no-bake), lớp cream cheese mềm như mây, topped với berry compote tươi', price: '65,000đ', image: IMG(1555507036, 400, 300), link: '' },
          { id: 's6', name: 'Combo Hoàng Hôn (2 người)', desc: '2 Cold Brew + 1 bánh + chỗ ngồi khu view hoàng hôn từ 16:00 – 18:30, kèm ảnh lưu niệm của staff', price: '250,000đ', image: IMG(1556679343, 400, 300), link: '' },
        ],
      } as ServicesBlock,
      {
        type: 'gallery',
        heading: 'View từ Cà Phê Mây',
        images: [
          { id: 'g1', src: IMG(1442512835329, 600, 450), alt: 'Rooftop ban ngày', link: '' },
          { id: 'g2', src: IMG(1463797800285, 600, 450), alt: 'Hoàng hôn thành phố', link: '' },
          { id: 'g3', src: IMG(1485808191253, 600, 450), alt: 'Cloud Latte', link: '' },
          { id: 'g4', src: IMG(1559056189, 600, 450), alt: 'Không gian tối', link: '' },
          { id: 'g5', src: IMG(1501901, 600, 450), alt: 'Góc ngồi outdoor', link: '' },
          { id: 'g6', src: IMG(1566984801003, 600, 450), alt: 'Bar counter', link: '' },
        ],
      } as GalleryBlock,
      {
        type: 'about',
        heading: 'Câu chuyện Cà Phê Mây',
        body: 'Chúng tôi tìm kiếm một nơi ở Hà Nội mà khi ngồi uống cà phê, bạn có thể nhìn thấy toàn bộ thành phố thay đổi ánh sáng từ chiều đến tối. Tầng 8 của tòa nhà Hoàng Cầu là câu trả lời. Cà Phê Mây không cố gắng cạnh tranh về chất lượng cà phê đơn thuần — chúng tôi bán trải nghiệm: cái cảm giác ngồi cao hơn mọi ồn ào, nhìn mặt trời lặn xuống giữa những tòa nhà và tự nhủ rằng ngày hôm nay như vậy là đủ.',
        image: IMG(1463797800285, 600, 700),
        socials: [
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'tiktok', url: 'https://tiktok.com' },
          { platform: 'zalo', url: 'https://zalo.me' },
        ],
      } as AboutBlock,
      {
        type: 'contact',
        heading: 'Đặt chỗ rooftop',
        address: 'Tầng 8, 27 Hoàng Cầu, Đống Đa, Hà Nội (thang máy lên thẳng tầng 8)',
        phone: '0347 868 656',
        email: 'hello@capheymay.vn',
        hours: 'Thứ 2 – Thứ 6: 14:00 – 23:00 | Thứ 7 – CN: 09:00 – 23:00',
        mapLink: 'https://maps.google.com',
      } as ContactBlock,
    ],
  },

];

export const LANDING_CATEGORIES: { id: LandingCategory | 'all'; label: string }[] = [
  { id: 'all',        label: 'Tất cả' },
  { id: 'coffee',     label: 'Cafe & Đồ Uống' },
  { id: 'spa',        label: 'Spa & Làm Đẹp' },
  { id: 'restaurant', label: 'Nhà Hàng' },
  { id: 'retail',     label: 'Cửa Hàng' },
];

export const getLandingTemplate = (id: string) =>
  LANDING_TEMPLATES.find(t => t.id === id) ?? null;
