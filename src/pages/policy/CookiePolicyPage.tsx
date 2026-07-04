import PolicyLayout, { PolicySection, PolicyList } from './_components/PolicyLayout';

export default function CookiePolicyPage() {
  return (
    <PolicyLayout
      title="Quy Định Cookie"
      updatedAt="04/07/2026"
      intro="WebChoViet sử dụng cookie và các công nghệ lưu trữ tương tự (localStorage, sessionStorage) để vận hành dịch vụ. Trang này giải thích chúng được dùng như thế nào."
    >
      <PolicySection heading="1. Cookie là gì">
        <p>Cookie là tệp dữ liệu nhỏ được lưu trên trình duyệt của bạn khi truy cập một website. WebChoViet cũng sử dụng các công nghệ lưu trữ tương tự trên trình duyệt (localStorage) để ghi nhớ phiên đăng nhập giữa các lần truy cập.</p>
      </PolicySection>

      <PolicySection heading="2. Các loại dữ liệu lưu trữ WebChoViet sử dụng">
        <PolicyList
          items={[
            <><strong>Cần thiết</strong> — lưu token đăng nhập để giữ bạn đăng nhập giữa các lần truy cập, bắt buộc để sử dụng Dashboard và Trình Chỉnh Sửa Mẫu.</>,
            <><strong>Phân tích</strong> — mã phiên ẩn danh gắn với mỗi lượt truy cập website công khai, dùng để đo lường lượt xem/tương tác. Mã này không dùng để theo dõi cá nhân giữa các website hay dịch vụ khác.</>,
            <><strong>Tùy chọn</strong> — ghi nhớ ngôn ngữ hiển thị bạn chọn khi xem một website công khai trên nền tảng.</>,
          ]}
        />
      </PolicySection>

      <PolicySection heading="3. Những gì WebChoViet không sử dụng">
        <p>WebChoViet <strong>không</strong> sử dụng cookie quảng cáo hay công cụ theo dõi xuyên trang của bên thứ ba (không có Google Ads, Facebook Pixel hay các nền tảng quảng cáo tương tự).</p>
      </PolicySection>

      <PolicySection heading="4. Kiểm soát cookie">
        <p>Bạn có thể xóa hoặc chặn cookie/dữ liệu lưu trữ trong phần cài đặt trình duyệt bất kỳ lúc nào. Lưu ý: chặn hoặc xóa dữ liệu cần thiết sẽ khiến bạn bị đăng xuất khỏi tài khoản và một số tính năng của nền tảng có thể ngừng hoạt động cho tới khi đăng nhập lại.</p>
      </PolicySection>

      <PolicySection heading="5. Thay đổi quy định">
        <p>WebChoViet có thể cập nhật quy định này khi bổ sung tính năng mới có sử dụng dữ liệu lưu trữ trên trình duyệt. Phiên bản mới nhất luôn được đăng tại trang này.</p>
      </PolicySection>
    </PolicyLayout>
  );
}
