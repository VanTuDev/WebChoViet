import { Link } from 'react-router-dom';
import PolicyLayout, { PolicySection, PolicyList } from './_components/PolicyLayout';
import { ROUTES } from '../../config/routes';

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Điều Khoản Sử Dụng"
      updatedAt="04/07/2026"
      intro="Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng WebChoViet. Việc tạo tài khoản hoặc sử dụng dịch vụ đồng nghĩa bạn đã đọc, hiểu và đồng ý với toàn bộ nội dung."
    >
      <PolicySection heading="1. Chấp nhận điều khoản">
        <p>Bằng việc đăng ký, đăng nhập hoặc sử dụng bất kỳ tính năng nào của WebChoViet, bạn xác nhận đồng ý chịu sự ràng buộc của Điều Khoản Sử Dụng này cùng Chính Sách Bảo Mật liên quan.</p>
      </PolicySection>

      <PolicySection heading="2. Mô tả dịch vụ">
        <p>WebChoViet là nền tảng SaaS giúp hộ kinh doanh, doanh nghiệp nhỏ tại Việt Nam tự tạo website qua tên miền phụ dạng <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">*.webchoviet.com</code>, bao gồm kho mẫu giao diện, trình chỉnh sửa kéo thả, mã QR động và công cụ phân tích truy cập.</p>
      </PolicySection>

      <PolicySection heading="3. Tài khoản người dùng">
        <p>Tài khoản WebChoViet được tạo và xác thực thông qua Google OAuth — mỗi tài khoản Google tương ứng 1 tài khoản WebChoViet. Bạn chịu trách nhiệm bảo mật quyền truy cập tài khoản Google của mình; mọi hoạt động diễn ra dưới tài khoản đó được xem là do bạn thực hiện.</p>
      </PolicySection>

      <PolicySection heading="4. Nội dung do người dùng đăng tải">
        <p>Bạn chịu hoàn toàn trách nhiệm với nội dung, hình ảnh, thông tin đăng tải lên website của mình. Nghiêm cấm đăng tải nội dung:</p>
        <PolicyList
          items={[
            'Vi phạm pháp luật Việt Nam hoặc thuần phong mỹ tục.',
            'Xâm phạm quyền sở hữu trí tuệ, quyền riêng tư của bên thứ ba.',
            'Lừa đảo, gây hiểu nhầm hoặc quảng bá hàng hóa/dịch vụ bị cấm kinh doanh.',
          ]}
        />
        <p>WebChoViet có quyền gỡ bỏ, tạm khóa hoặc xóa website vi phạm mà không cần báo trước.</p>
      </PolicySection>

      <PolicySection heading="5. Gói dịch vụ & thanh toán">
        <p>WebChoViet cung cấp 3 gói: Miễn phí, Kinh Doanh WebPro và Thương Hiệu Ultra — giá niêm yết bằng VND tại trang <Link to={ROUTES.PRICING} className="text-primary-container hover:underline">Bảng Giá</Link>, thanh toán qua cổng PayOS.</p>
        <p>Mỗi lần thanh toán kích hoạt <strong>trọn 1 chu kỳ</strong> (tháng hoặc năm) — hệ thống <strong>không</strong> tự động trừ tiền định kỳ. Khi hết chu kỳ mà bạn không thanh toán gia hạn, tài khoản sẽ tự động chuyển về gói Miễn phí; những website vượt hạn mức của gói Miễn phí sẽ tạm thời không hiển thị công khai (dữ liệu vẫn được giữ nguyên, không xóa) cho tới khi bạn nâng cấp lại hoặc xóa bớt website khác.</p>
      </PolicySection>

      <PolicySection heading="6. Hủy gói">
        <p>Bạn có thể hủy tự động gia hạn bất kỳ lúc nào tại trang Bảng Giá. Sau khi hủy, bạn vẫn được sử dụng đầy đủ quyền lợi của gói tới hết chu kỳ đã thanh toán.</p>
      </PolicySection>

      <PolicySection heading="7. Giới hạn trách nhiệm">
        <p>Dịch vụ được cung cấp theo nguyên trạng ("as is"). WebChoViet nỗ lực đảm bảo hệ thống hoạt động ổn định nhưng không cam kết không gián đoạn hay không có lỗi tuyệt đối. WebChoViet không chịu trách nhiệm với thiệt hại gián tiếp phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.</p>
      </PolicySection>

      <PolicySection heading="8. Sở hữu trí tuệ">
        <p>Bạn giữ toàn quyền sở hữu đối với nội dung mình tạo ra. Bằng việc đăng tải nội dung lên WebChoViet, bạn cấp cho chúng tôi quyền lưu trữ và hiển thị nội dung đó nhằm mục đích duy nhất là vận hành dịch vụ cho bạn. Mã nguồn nền tảng, mẫu giao diện và thương hiệu WebChoViet thuộc quyền sở hữu của WebChoViet.</p>
      </PolicySection>

      <PolicySection heading="9. Chấm dứt dịch vụ">
        <p>WebChoViet có quyền tạm ngưng hoặc chấm dứt tài khoản vi phạm Điều Khoản Sử Dụng. Bạn có thể ngừng sử dụng và yêu cầu xóa tài khoản của mình bất kỳ lúc nào.</p>
      </PolicySection>

      <PolicySection heading="10. Luật áp dụng">
        <p>Điều khoản này chịu sự điều chỉnh của pháp luật Việt Nam. Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết qua thương lượng; nếu không đạt được thỏa thuận, tranh chấp sẽ được đưa ra cơ quan có thẩm quyền tại TP. Hồ Chí Minh.</p>
      </PolicySection>
    </PolicyLayout>
  );
}
