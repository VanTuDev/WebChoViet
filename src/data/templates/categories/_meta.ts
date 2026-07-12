/**
 * ─── Category Registry ─────────────────────────────────────────────────────────
 * Thêm category mới → thêm 1 object vào đây + tạo file `categories/<id>.ts`
 * export mảng TemplateDefinition[], rồi gộp vào `registry.ts`.
 */
import type { CategoryMeta } from '../types';

export const CATEGORY_REGISTRY: CategoryMeta[] = [
  {
    id: 'coffee',
    label: 'Cafe & Đồ Uống',
    heading: {
      title: 'Kho Giao Diện: Cafe & Đồ Uống',
      desc: 'Trưng bày menu cà phê, trà sữa đẹp mắt. Hỗ trợ gọi món quét QR tại bàn thông minh.',
    },
  },
  {
    id: 'milk-tea',
    label: 'Trà Sữa',
    heading: {
      title: 'Kho Giao Diện: Trà Sữa & Bubble Tea',
      desc: 'Giao diện hiện đại cho tiệm trà sữa handmade. Trưng bày menu, topping và khuyến mãi thu hút khách.',
    },
  },
  {
    id: 'restaurant',
    label: 'Nhà Hàng & Quán Ăn',
    heading: {
      title: 'Kho Giao Diện: Nhà Hàng & Quán Ăn',
      desc: 'Thiết kế sang trọng cho nhà hàng, quán ăn Việt Nam. Tối ưu đặt bàn và hiển thị thực đơn.',
    },
  },
  {
    id: 'spa',
    label: 'Spa & Làm Đẹp',
    heading: {
      title: 'Kho Giao Diện: Spa & Làm Đẹp',
      desc: 'Giao diện tinh tế cho spa, thẩm mỹ viện. Trưng bày dịch vụ và hỗ trợ đặt lịch trực tuyến.',
    },
  },
  {
    id: 'gym',
    label: 'Gym & Thể Thao',
    heading: {
      title: 'Kho Giao Diện: Gym & Fitness',
      desc: 'Giao diện năng động cho phòng gym, yoga, thể thao. Hiển thị chương trình tập và gói thành viên.',
    },
  },
  {
    id: 'wedding',
    label: 'Thiệp Cưới',
    heading: {
      title: 'Kho Giao Diện: Thiệp Cưới Online',
      desc: 'Thiệp cưới kỹ thuật số đẹp và tinh tế. Chia sẻ thông tin lễ cưới và nhận RSVP từ khách mời.',
    },
  },
  {
    id: 'villa',
    label: 'Homestay & Villa',
    heading: {
      title: 'Kho Giao Diện: Homestay & Villa',
      desc: 'Giao diện ấm cúng cho homestay, villa cho thuê. Trưng bày phòng, tiện nghi và hỗ trợ đặt phòng trực tuyến.',
    },
  },
];
