import PricingCard from './_components/PricingCard';

const PLANS = [
  {
    name: 'Khởi Nghiệp (Miễn phí)',
    price: '0đ', period: 'mãi mãi', color: '#475569',
    desc: 'Giải pháp hoàn hảo để bắt đầu số hóa thực đơn & quầy bán lẻ nhỏ.',
    features: [
      'Khởi tạo tối đa 2 website',
      'Tên miền phụ dạng: .webchoviet.com',
      'Hỗ trợ Mã QR động không giới hạn',
      'Trình quản lý thực đơn kéo thả căn bản',
      'Quảng cáo WebChoViet hiển thị ở góc',
    ],
    cta: 'Hiện đang sử dụng', popular: false,
  },
  {
    name: 'Kinh Doanh WebPro',
    price: '199,000đ', period: 'tháng', color: '#0056b3',
    desc: 'Dành cho các chủ quán, chủ thương hiệu bứt tốc doanh số bán hàng.',
    features: [
      'Khởi tạo không giới hạn website',
      'Hỗ trợ gắn Tên Miền Riêng (.vn, .com, .net)',
      'Xóa bỏ hoàn toàn logo & watermark WebChoViet',
      'Tính năng thanh toán VietQR tự động',
      'Phân tích dữ liệu quét sâu theo tuần',
      'Băng thông không giới hạn cực nhanh',
      'SSL trọn đời miễn phí',
      'Hỗ trợ riêng qua Zalo 24/7',
    ],
    cta: 'Nâng cấp ngay', popular: true,
  },
  {
    name: 'Chuỗi Hệ Thống Enterprise',
    price: 'Liên hệ', period: 'tùy chỉnh', color: '#1e293b',
    desc: 'Thiết kế riêng cho các thương hiệu ẩm thực nhượng quyền lớn.',
    features: [
      'Phân quyền nhân viên đa Chi Nhánh',
      'Tích hợp hệ thống Kế toán / POS (KiotViet)',
      'Báo cáo thống kê chuyên biệt',
      'Đội ngũ chăm sóc vận hành Premium tận nơi',
    ],
    cta: 'Liên hệ tư vấn', popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-10 px-6 xl:px-10 w-full space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
          Bảng Giá Dịch Vụ WebChoViet
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Không phát sinh chi phí ẩn. Hỗ trợ thay đổi hoặc hủy gói bất kỳ lúc nào.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {PLANS.map((plan, i) => (
          <PricingCard key={i} plan={plan} />
        ))}
      </div>
    </div>
  );
}
