import PolicyLayout, { PolicySection, PolicyList } from './_components/PolicyLayout';

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Chính Sách Bảo Mật"
      updatedAt="04/07/2026"
      intro="WebChoViet cam kết bảo vệ thông tin cá nhân của bạn. Chính sách này giải thích chúng tôi thu thập, sử dụng và bảo vệ dữ liệu như thế nào khi bạn sử dụng nền tảng."
    >
      <PolicySection heading="1. Thông tin chúng tôi thu thập">
        <PolicyList
          items={[
            <>Thông tin tài khoản: khi đăng nhập bằng Google, chúng tôi nhận họ tên, địa chỉ email và ảnh đại diện từ Google — WebChoViet không yêu cầu và không lưu trữ mật khẩu riêng.</>,
            <>Nội dung website bạn tạo: văn bản, hình ảnh, thông tin liên hệ bạn nhập vào Trình Chỉnh Sửa Mẫu để hiển thị trên website công khai.</>,
            <>Dữ liệu thanh toán: khi nâng cấp gói, giao dịch được xử lý bởi đối tác cổng thanh toán PayOS. WebChoViet không lưu trữ số thẻ hay thông tin tài khoản ngân hàng của bạn — chỉ lưu mã đơn hàng, số tiền, gói dịch vụ và trạng thái giao dịch.</>,
            <>Dữ liệu truy cập & phân tích: khi khách ghé thăm website bạn tạo, hệ thống ghi nhận lượt xem, lượt click, thời lượng phiên và loại thiết bị (di động/máy tính) kèm một mã phiên ẩn danh để phục vụ báo cáo thống kê. Chúng tôi <strong>không</strong> thu thập tên, email hay bất kỳ thông tin định danh nào của khách truy cập website công khai.</>,
            <>Dữ liệu từ tính năng "Tạo từ Google Maps": nếu bạn dùng tính năng nhập tự động thông tin cửa hàng, hệ thống truy xuất dữ liệu công khai (tên, địa chỉ, hình ảnh, đánh giá) của địa điểm theo đường link bạn cung cấp.</>,
          ]}
        />
      </PolicySection>

      <PolicySection heading="2. Mục đích sử dụng thông tin">
        <PolicyList
          items={[
            'Vận hành và duy trì tài khoản, website của bạn.',
            'Xử lý thanh toán và kích hoạt gói dịch vụ tương ứng.',
            'Gửi thông báo liên quan tới dịch vụ (xác nhận thanh toán, cảnh báo hết hạn gói...).',
            'Phân tích và cải thiện chất lượng sản phẩm.',
            'Hỗ trợ khách hàng khi có yêu cầu.',
          ]}
        />
        <p>WebChoViet <strong>không</strong> bán hay cho thuê thông tin cá nhân của bạn cho bên thứ ba vì mục đích quảng cáo.</p>
      </PolicySection>

      <PolicySection heading="3. Chia sẻ thông tin với bên thứ ba">
        <p>Để vận hành dịch vụ, chúng tôi làm việc với một số đối tác công nghệ — mỗi bên chỉ nhận phần dữ liệu tối thiểu cần thiết để thực hiện đúng chức năng, tuân theo chính sách bảo mật riêng của họ:</p>
        <PolicyList
          items={[
            <><strong>Google</strong> — xác thực đăng nhập (OAuth).</>,
            <><strong>PayOS</strong> — xử lý thanh toán nâng cấp gói.</>,
            <><strong>Cloudinary</strong> — lưu trữ hình ảnh bạn tải lên cho website.</>,
            <><strong>Google Gemini</strong> — dịch nội dung đa ngôn ngữ khi bạn chủ động bấm "Dịch tự động".</>,
            <><strong>Apify</strong> — thu thập dữ liệu công khai khi bạn dùng tính năng nhập từ Google Maps.</>,
          ]}
        />
        <p>Chúng tôi có thể tiết lộ thông tin nếu pháp luật Việt Nam yêu cầu hoặc theo quyết định của cơ quan nhà nước có thẩm quyền.</p>
      </PolicySection>

      <PolicySection heading="4. Thời gian lưu trữ dữ liệu">
        <PolicyList
          items={[
            'Thông tin tài khoản và website: lưu trữ trong suốt thời gian bạn sử dụng dịch vụ, tới khi bạn yêu cầu xóa.',
            'Dữ liệu phân tích truy cập thô: tự động xóa sau tối đa 180 ngày.',
            'Lịch sử giao dịch thanh toán: lưu trữ lâu dài để phục vụ đối soát, khiếu nại và nghĩa vụ kế toán/thuế.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="5. Quyền của bạn">
        <PolicyList
          items={[
            'Truy cập, chỉnh sửa thông tin tài khoản bất kỳ lúc nào.',
            'Yêu cầu xóa tài khoản và toàn bộ website liên quan.',
            'Yêu cầu cung cấp bản sao dữ liệu cá nhân đang được lưu trữ.',
            'Liên hệ qua email/hotline ở cuối trang để thực hiện các quyền trên.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="6. Bảo mật dữ liệu">
        <p>Toàn bộ kết nối được mã hóa qua HTTPS, phiên đăng nhập xác thực bằng JWT, quyền quản trị hệ thống chỉ được cấp thủ công cho nhân sự được ủy quyền. Khóa bí mật và thông tin nhạy cảm không bao giờ được lưu trữ ở phía trình duyệt.</p>
      </PolicySection>

      <PolicySection heading="7. Đối tượng sử dụng">
        <p>Dịch vụ dành cho tổ chức, cá nhân kinh doanh có đủ năng lực hành vi dân sự theo pháp luật Việt Nam. WebChoViet không nhắm tới và không cố ý thu thập thông tin của trẻ em dưới 16 tuổi.</p>
      </PolicySection>

      <PolicySection heading="8. Thay đổi chính sách">
        <p>WebChoViet có thể cập nhật chính sách này theo thời gian. Thay đổi quan trọng sẽ được thông báo qua email hoặc hiển thị trên website trước khi có hiệu lực.</p>
      </PolicySection>
    </PolicyLayout>
  );
}
