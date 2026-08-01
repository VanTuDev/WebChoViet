// Tải script AdSense CÓ ĐIỀU KIỆN — chỉ trên các trang nội dung thật của
// vngoweb.com (Landing/About/Pricing/Tutorials/Policy). Trước đây script này
// nhúng TĨNH trong index.html nên tải trên MỌI route của SPA — kể cả Dashboard/
// Template Editor/Admin (màn hình app nội bộ, không có nội dung) và mọi website
// khách hàng tại /:slug (hàng loạt trang mẫu lặp cấu trúc, chỉ khác tên/ảnh) —
// Google AdSense review đã từ chối vì "Nội dung có giá trị thấp", rất có thể vì
// gắn cùng 1 tài khoản quảng cáo với những trang thiếu nội dung/lặp mẫu đó.
// Giới hạn phạm vi tải giúp lần review sau chỉ còn xét đúng các trang marketing
// thật sự có nội dung.
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
    if (document.getElementById(SCRIPT_ID)) return; // đã tải rồi trong phiên này

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [location.pathname]);

  return null;
}
