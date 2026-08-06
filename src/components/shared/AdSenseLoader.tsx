// Tải script AdSense CÓ ĐIỀU KIỆN — chỉ trên các trang nội dung thật của
// vngoweb.com (Landing/About/Pricing/Tutorials/Policy). Trước đây script này
// nhúng TĨNH trong index.html nên tải trên MỌI route của SPA — kể cả Dashboard/
// Template Editor/Admin (màn hình app nội bộ, không có nội dung) và mọi website
// khách hàng tại /:slug (hàng loạt trang mẫu lặp cấu trúc, chỉ khác tên/ảnh) —
// Google AdSense review đã từ chối vì "Nội dung có giá trị thấp", rất có thể vì
// gắn cùng 1 tài khoản quảng cáo với những trang thiếu nội dung/lặp mẫu đó.
// Giới hạn phạm vi tải giúp lần review sau chỉ còn xét đúng các trang marketing
// thật sự có nội dung.
//
// LƯU Ý: xác minh quyền sở hữu site (<meta name="google-adsense-account"> +
// /ads.txt) đặt TĨNH trong index.html, KHÔNG qua component này — bot review
// phải thấy được ngay ở tầng HTML nguồn, không phụ thuộc JS đã chạy xong hay
// chưa. Component này chỉ lo tải script phục vụ hiển thị quảng cáo thật.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { getTenantSlug } from '../../utils/tenant';

const ADSENSE_CLIENT_ID = 'ca-pub-2084765620543624';
const SCRIPT_ID = 'adsbygoogle-loader';

// Chỉ những route có nội dung marketing/biên tập thật — KHÔNG bao gồm Dashboard,
// Template Editor, Admin, hay website khách hàng (/:slug — không nằm trong danh
// sách hằng số này nên tự động bị loại trừ).
const ADSENSE_ROUTES: readonly string[] = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.PRICING,
  ROUTES.TUTORIALS,
  ROUTES.POLICY_PRIVACY,
  ROUTES.POLICY_TERMS,
  ROUTES.POLICY_REFUND,
  ROUTES.POLICY_COOKIES,
];

export default function AdSenseLoader() {
  const location = useLocation();

  useEffect(() => {
    // Subdomain khách hàng ({slug}.vngoweb.com) có path "/" trùng ROUTES.HOME của
    // app chính — chặn thêm ở đây để không bao giờ tải nhầm trên site khách.
    if (getTenantSlug()) return;
    if (!ADSENSE_ROUTES.includes(location.pathname)) return;

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      // Đã tải rồi trong phiên này (vd chuyển route qua lại giữa 2 trang đều
      // nằm trong ADSENSE_ROUTES) — không tải lại, chỉ log trạng thái hiện tại.
      if (import.meta.env.DEV) {
        console.log(
          `[AdSense] Script đã có sẵn cho route "${location.pathname}". window.adsbygoogle:`,
          window.adsbygoogle,
        );
      }
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    script.crossOrigin = 'anonymous';

    if (import.meta.env.DEV) {
      console.log(`[AdSense] Bắt đầu tải script cho route "${location.pathname}"...`);

      script.onload = () => {
        console.log('[AdSense] ✅ Script tải thành công.', {
          adsbygoogle: window.adsbygoogle,
          route: location.pathname,
        });
      };

      script.onerror = () => {
        // Lý do phổ biến nhất KHÔNG phải lỗi cấu hình: trình duyệt/extension
        // chặn quảng cáo (uBlock, AdBlock, Brave shields...) chặn thẳng domain
        // pagead2.googlesyndication.com trước khi request kịp gửi đi. Thử tắt
        // ad-blocker hoặc mở tab ẩn danh không cài extension trước khi nghi ngờ
        // code sai.
        console.warn(
          '[AdSense] ❌ Script tải THẤT BẠI — kiểm tra ad-blocker (uBlock/AdBlock/Brave Shields) trước khi nghi ngờ code. Thử lại ở tab ẩn danh không cài extension.',
        );
      };
    }

    document.head.appendChild(script);
  }, [location.pathname]);

  return null;
}
