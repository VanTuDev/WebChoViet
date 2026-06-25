import { Sparkles } from 'lucide-react';
import TutorialStep from './_components/TutorialStep';
import { useAppContext } from '../../store/AppContext';

const STEPS = [
  {
    num: '01', title: 'Khám Phá & Chọn Mẫu',
    desc: 'Truy cập "Kho Giao Diện", bấm dùng thử mẫu thiết kế bám sát lĩnh vực của bạn như Spa, Cafe, Nhà hàng hay Shop bán lẻ.',
  },
  {
    num: '02', title: 'Chỉnh Sửa Thông Tin Tiệm',
    desc: 'Thay đổi tên cửa hàng, số điện thoại Zalo, logo text, bảng màu phù hợp và sửa thực đơn bảng giá dễ dàng.',
  },
  {
    num: '03', title: 'Nhận Mã QR Code Động',
    desc: 'Hệ thống tự động tạo mã QR cho website. In đề can dán lên bàn để khách hàng quét và xem menu ngay.',
  },
  {
    num: '04', title: 'Giao Dịch Đơn Hàng Tự Động',
    desc: 'Khách duyệt sản phẩm và gửi yêu cầu hoặc thanh toán. Bạn nhận thông báo để kịp thời chuẩn bị món.',
  },
];

export default function TutorialsPage() {
  const { showSnackbar } = useAppContext();
  return (
    <div className="py-10 px-6 xl:px-10 w-full space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
          Hướng Dẫn Số Hóa Cửa Hàng Với WebChoViet
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Dù bạn không biết lập trình, chỉ cần 5 phút để đưa toàn bộ cửa hàng lên môi trường số.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {STEPS.map(step => <TutorialStep key={step.num} {...step} />)}
      </div>

      <div className="bg-[#e3f2fd]/50 border border-blue-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-base font-bold text-gray-900 font-display flex items-center gap-1.5">
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span>Bạn muốn được thiết kế trọn gói hoàn toàn miễn phí?</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Đội ngũ kỹ thuật WebChoViet sẵn sàng hỗ trợ khởi tạo gian hàng, chụp hình sản phẩm và nhập thực đơn trọn gói miễn phí!
          </p>
        </div>
        <button
          onClick={() => showSnackbar('Đang kết nối nhân viên tư vấn Zalo: 0987.654.321 — Vui lòng chờ trong giây lát.', 'success')}
          className="px-6 py-3 bg-[#0056b3] hover:bg-[#003f87] text-white text-xs font-bold rounded-full cursor-pointer whitespace-nowrap active:scale-95 transition-all shadow"
        >
          Liên hệ ngay qua Zalo
        </button>
      </div>
    </div>
  );
}
