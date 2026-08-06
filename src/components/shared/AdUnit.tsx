// AdUnit — 1 ô quảng cáo AdSense đặt thủ công tại vị trí cụ thể trong trang
// (khác với Auto Ads, vốn tự chọn chỗ chèn quảng cáo trên toàn trang).
//
// Yêu cầu: AdSenseLoader phải render TRƯỚC (đã đứng sẵn ở RootLayout) — component
// này không tự tải adsbygoogle.js, chỉ "push" vào hàng đợi window.adsbygoogle.
// Đó là cơ chế chính thức của thư viện: gọi push() TRƯỚC cả khi script tải xong
// vẫn an toàn, adsbygoogle.js tự xử lý hàng đợi này ngay khi tải xong.
//
// Cách lấy `slot`: AdSense → Quảng cáo → Theo đơn vị quảng cáo → Tạo đơn vị mới
// → copy giá trị data-ad-slot. KHÔNG bịa số — quảng cáo sẽ không hiển thị. Và vì
// tài khoản đang ở trạng thái "Sắp sẵn sàng" (chưa duyệt xong), dù đúng slot vẫn
// CHƯA có quảng cáo thật để hiển thị cho tới khi Google duyệt xong — bình thường,
// không phải lỗi. Cách kiểm tra đúng ở giai đoạn này là xem console log của
// AdSenseLoader (script đã tải thành công chưa), không phải "có thấy quảng cáo".
import { useEffect, useRef } from 'react';

const ADSENSE_CLIENT_ID = 'ca-pub-2084765620543624';

interface AdUnitProps {
  /** data-ad-slot lấy từ AdSense dashboard — bắt buộc, không có giá trị mặc định hợp lệ */
  slot: string;
  format?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

export default function AdUnit({ slot, format = 'auto', fullWidthResponsive = true, className }: AdUnitProps) {
  // StrictMode (dev) chạy effect 2 lần khi mount — chặn push trùng cho cùng 1 lần
  // mount thật, tránh log/console nhiễu và tránh adsbygoogle.js cảnh báo duplicate.
  const pushedOnce = useRef(false);

  useEffect(() => {
    if (pushedOnce.current) return;
    pushedOnce.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
      if (import.meta.env.DEV) console.log(`[AdSense] Đã push ad unit slot="${slot}"`);
    } catch (err) {
      if (import.meta.env.DEV) console.warn(`[AdSense] Push ad unit slot="${slot}" thất bại:`, err);
    }
  }, [slot]);

  return (
    <ins
      className={`adsbygoogle ${className ?? ''}`}
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
    />
  );
}
