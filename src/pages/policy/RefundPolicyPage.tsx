import PolicyLayout, { PolicySection, PolicyList } from './_components/PolicyLayout';
import { CONTACT_EMAIL } from '../../config/contact';

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Chính Sách Hoàn Tiền"
      updatedAt="04/07/2026"
      intro="Chính sách này áp dụng cho các giao dịch nâng cấp gói Kinh Doanh WebPro và Thương Hiệu Ultra thanh toán qua cổng PayOS tại webchoviet.com."
    >
      <PolicySection heading="1. Bản chất thanh toán theo chu kỳ">
        <p>Mỗi lần thanh toán kích hoạt trọn 1 chu kỳ (tháng hoặc năm) mà bạn chọn. Hệ thống <strong>không</strong> tự động trừ tiền định kỳ — bạn chủ động quay lại thanh toán khi muốn gia hạn thêm một chu kỳ mới.</p>
      </PolicySection>

      <PolicySection heading="2. Trường hợp được xem xét hoàn tiền">
        <PolicyList
          items={[
            'Bị trừ tiền nhưng gói dịch vụ không được kích hoạt do lỗi hệ thống từ phía WebChoViet, sau khi đã liên hệ hỗ trợ mà vẫn không khắc phục được.',
            'Bị trừ tiền trùng lặp cho cùng một đơn hàng.',
            'Dịch vụ gián đoạn kéo dài, liên tục do lỗi hoàn toàn từ phía WebChoViet trong phần lớn thời gian của chu kỳ đã thanh toán.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="3. Trường hợp không được hoàn tiền">
        <PolicyList
          items={[
            'Đã sử dụng dịch vụ một phần hoặc toàn bộ trong chu kỳ đã thanh toán và đổi ý không muốn tiếp tục.',
            'Tài khoản bị tạm ngưng hoặc chấm dứt do vi phạm Điều Khoản Sử Dụng.',
            'Chọn nhầm gói hoặc chu kỳ thanh toán và giao dịch đã hoàn tất thành công — vui lòng kiểm tra kỹ thông tin trước khi xác nhận thanh toán.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="4. Quy trình yêu cầu hoàn tiền">
        <PolicyList
          items={[
            <>Gửi yêu cầu qua email <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-container hover:underline">{CONTACT_EMAIL}</a> hoặc hotline trong vòng <strong>7 ngày</strong> kể từ ngày giao dịch, kèm theo mã đơn hàng hiển thị trong lịch sử thanh toán tại Dashboard.</>,
            'WebChoViet xác minh và phản hồi yêu cầu trong vòng 3 ngày làm việc.',
            'Nếu yêu cầu được chấp thuận, tiền sẽ được hoàn về đúng phương thức/tài khoản đã dùng để thanh toán qua PayOS trong vòng 5–7 ngày làm việc.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="5. Hủy gói khác với hoàn tiền">
        <p>Hủy tự động gia hạn không đồng nghĩa với việc được hoàn phần phí đã thanh toán cho chu kỳ hiện tại — bạn vẫn được sử dụng đầy đủ quyền lợi của gói cho tới hết chu kỳ đã trả.</p>
      </PolicySection>
    </PolicyLayout>
  );
}
