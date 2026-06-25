// Custom SVG feature icons — filled duotone style, không dùng lucide

interface IconProps {
  color: string;
  size?: number;
}

/** Tự động dựng website — màn hình + tia sét */
export function IconInstantBuild({ color, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Thân màn hình */}
      <rect x="2" y="3" width="24" height="17" rx="2.5" fill={color} fillOpacity="0.14" />
      <rect x="2" y="3" width="24" height="17" rx="2.5" stroke={color} strokeWidth="1.6" />
      {/* Thanh tiêu đề */}
      <rect x="2" y="3" width="24" height="5.5" rx="2.5" fill={color} fillOpacity="0.22" />
      <circle cx="6"  cy="5.75" r="1.1" fill={color} />
      <circle cx="10" cy="5.75" r="1.1" fill={color} />
      <circle cx="14" cy="5.75" r="1.1" fill={color} fillOpacity="0.4" />
      {/* Tia sét */}
      <path d="M16.5 10L13 16h3.2L14.5 21.5 21 14h-3.8L18.5 10H16.5Z" fill={color} />
      {/* Chân màn hình */}
      <path d="M10 20H18M14 20V23" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Mã QR động — pattern QR thực tế */
export function IconQRCode({ color, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Góc trên trái */}
      <rect x="3" y="3" width="9" height="9" rx="2" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.6" />
      <rect x="5.5" y="5.5" width="4" height="4" rx="0.8" fill={color} />
      {/* Góc trên phải */}
      <rect x="16" y="3" width="9" height="9" rx="2" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.6" />
      <rect x="18.5" y="5.5" width="4" height="4" rx="0.8" fill={color} />
      {/* Góc dưới trái */}
      <rect x="3" y="16" width="9" height="9" rx="2" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.6" />
      <rect x="5.5" y="18.5" width="4" height="4" rx="0.8" fill={color} />
      {/* Data dots vùng dưới phải */}
      <rect x="16" y="16" width="3" height="3" rx="0.6" fill={color} />
      <rect x="20.5" y="16" width="3" height="3" rx="0.6" fill={color} />
      <rect x="16" y="20.5" width="3" height="3" rx="0.6" fill={color} />
      <rect x="20.5" y="20.5" width="3" height="3" rx="0.6" fill={color} fillOpacity="0.5" />
      {/* Scanner line overlay */}
      <path d="M16 13.5h9" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 1.5" />
    </svg>
  );
}

/** Tên miền & SEO — quả địa cầu + cursor */
export function IconGlobeSEO({ color, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Nền tròn */}
      <circle cx="13" cy="14" r="10" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.6" />
      {/* Kinh tuyến đứng giữa */}
      <ellipse cx="13" cy="14" rx="4" ry="10" stroke={color} strokeWidth="1.4" />
      {/* Vĩ tuyến trên dưới */}
      <path d="M3.5 10.5h19" stroke={color} strokeWidth="1.2" strokeOpacity="0.45" />
      <path d="M3.5 17.5h19" stroke={color} strokeWidth="1.2" strokeOpacity="0.45" />
      {/* Cursor mũi tên */}
      <path d="M20 20L23.5 27L21.5 26.2L20.5 28L18.5 22.5Z" fill={color} />
    </svg>
  );
}

/** Bảo mật 24/7 — khiên + ổ khóa */
export function IconSecurity({ color, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Khiên */}
      <path
        d="M14 2.5L4 6.5V14C4 19.5 8.5 24.5 14 26C19.5 24.5 24 19.5 24 14V6.5L14 2.5Z"
        fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.6" strokeLinejoin="round"
      />
      {/* Ổ khóa thân */}
      <rect x="10" y="14" width="8" height="6.5" rx="1.5" fill={color} />
      {/* Ổ khóa vòng cung */}
      <path d="M11 14V12C11 10.3 12.3 9 14 9C15.7 9 17 10.3 17 12V14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Lỗ khóa */}
      <circle cx="14" cy="17" r="1.2" fill="white" fillOpacity="0.7" />
    </svg>
  );
}

/** Xuất bản & tải về — tên lửa */
export function IconRocket({ color, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Thân tên lửa */}
      <path
        d="M14 3C14 3 20 7 20 15L17.5 17.5H10.5L8 15C8 7 14 3 14 3Z"
        fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.6" strokeLinejoin="round"
      />
      {/* Cửa sổ tên lửa */}
      <circle cx="14" cy="12" r="2.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.4" />
      {/* Cánh trái */}
      <path d="M10.5 17.5L7 21.5L10.5 20.5V17.5Z" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      {/* Cánh phải */}
      <path d="M17.5 17.5L21 21.5L17.5 20.5V17.5Z" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      {/* Lửa phụt */}
      <path d="M12 21.5C12 21.5 12.5 24 14 25C15.5 24 16 21.5 16 21.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

/** AI sinh nội dung — não bộ + tia sáng */
export function IconAI({ color, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Não trái */}
      <path
        d="M14 6C10.7 6 8 8.7 8 12C8 13.6 8.6 15.1 9.7 16.2L9 19H15V16.5C16.8 15.7 18 13.9 18 12H20C20 9.2 18 6.8 15.5 6.2C15.1 6.1 14.5 6 14 6Z"
        fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Nếp gấp não */}
      <path d="M10 11C10 11 11 10 12 11C13 12 14 11 14 11" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 14C10 14 11.5 13 13 14" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      {/* Sao lớn */}
      <path d="M21 3L21.7 5.3L24 6L21.7 6.7L21 9L20.3 6.7L18 6L20.3 5.3Z" fill={color} />
      {/* Sao nhỏ */}
      <path d="M22 17L22.5 18.5L24 19L22.5 19.5L22 21L21.5 19.5L20 19L21.5 18.5Z" fill={color} fillOpacity="0.7" />
      {/* Tia sáng */}
      <path d="M18 3.5L18.3 4.7L19.5 5L18.3 5.3L18 6.5L17.7 5.3L16.5 5L17.7 4.7Z" fill={color} fillOpacity="0.5" />
    </svg>
  );
}
