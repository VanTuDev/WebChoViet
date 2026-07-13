// ─── Cờ quốc gia dạng SVG inline cho LanguageSwitcher ────────────────────────
// KHÔNG dùng emoji cờ: Windows không render được (hiện thành 2 chữ cái "VN"),
// đây là bug đã ghi nhận 2 lần trong codebase (constants/languages.ts,
// Template/_shared/LanguageSwitcher.tsx). Tự vẽ SVG đơn giản hoá — đủ nhận diện
// ở cỡ icon 20-24px, không phụ thuộc asset/thư viện ngoài.

import type { AppLang } from './types';

/** Sinh points cho ngôi sao 5 cánh (dùng cho cờ VN, TQ) */
function starPoints(cx: number, cy: number, outer: number, rotateDeg = -90): string {
  const inner = outer * 0.382;
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = ((rotateDeg + i * 36) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return pts.join(' ');
}

const FLAG_SVGS: Record<AppLang, React.ReactNode> = {
  // Việt Nam — nền đỏ, sao vàng 5 cánh
  vi: (
    <>
      <rect width="24" height="16" fill="#da251d" />
      <polygon points={starPoints(12, 8, 4.5)} fill="#ffff00" />
    </>
  ),

  // English (Union Jack — bản giản lược) — quy ước phổ biến: cờ Anh đại diện
  // "ngôn ngữ tiếng Anh" (không gắn với 1 quốc gia nói tiếng Anh cụ thể)
  en: (
    <>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#ffffff" strokeWidth="3.2" />
      <path d="M0,0 L24,16 M24,0 L0,16" stroke="#c8102e" strokeWidth="1.3" />
      <path d="M12,0 V16 M0,8 H24" stroke="#ffffff" strokeWidth="5" />
      <path d="M12,0 V16 M0,8 H24" stroke="#c8102e" strokeWidth="3" />
    </>
  ),

  // Hàn Quốc — nền trắng, thái cực đỏ/xanh (lược bỏ 4 quẻ — quá nhỏ ở cỡ icon)
  ko: (
    <>
      <rect width="24" height="16" fill="#ffffff" />
      <circle cx="12" cy="8" r="4.2" fill="#0047a0" />
      <path d="M7.8,8 A4.2,4.2 0 0 1 16.2,8 A2.1,2.1 0 0 1 12,8 A2.1,2.1 0 1 0 7.8,8 Z" fill="#cd2e3a" />
      {/* 4 quẻ giản lược thành vạch chéo ở 4 góc */}
      <g stroke="#000000" strokeWidth="0.9">
        <path d="M3.2,2.6 L6.4,4.7 M2.8,3.3 L6,5.4 M2.4,4 L5.6,6.1" />
        <path d="M17.6,9.9 L20.8,12 M17.2,10.6 L20.4,12.7 M16.8,11.3 L20,13.4" />
        <path d="M6.4,11.3 L3.2,13.4 M6,10.6 L2.8,12.7 M5.6,9.9 L2.4,12" />
        <path d="M20.8,4 L17.6,6.1 M20.4,3.3 L17.2,5.4 M20,2.6 L16.8,4.7" />
      </g>
    </>
  ),

  // Thái Lan — 5 sọc ngang đỏ/trắng/xanh(đôi)/trắng/đỏ
  th: (
    <>
      <rect width="24" height="16" fill="#a51931" />
      <rect y="2.67" width="24" height="10.66" fill="#f4f5f8" />
      <rect y="5.33" width="24" height="5.34" fill="#2d2a4a" />
    </>
  ),

  // Trung Quốc — nền đỏ, 1 sao lớn + 4 sao nhỏ
  zh: (
    <>
      <rect width="24" height="16" fill="#de2910" />
      <polygon points={starPoints(4.5, 4.5, 2.6)} fill="#ffde00" />
      <polygon points={starPoints(9.5, 1.7, 0.9)} fill="#ffde00" />
      <polygon points={starPoints(11, 3.8, 0.9)} fill="#ffde00" />
      <polygon points={starPoints(11, 6.6, 0.9)} fill="#ffde00" />
      <polygon points={starPoints(9.5, 8.7, 0.9)} fill="#ffde00" />
    </>
  ),

  // Lào — đỏ/xanh(đôi)/đỏ, vòng tròn trắng giữa
  lo: (
    <>
      <rect width="24" height="16" fill="#ce1126" />
      <rect y="4" width="24" height="8" fill="#002868" />
      <circle cx="12" cy="8" r="3" fill="#ffffff" />
    </>
  ),
};

interface FlagIconProps {
  lang: AppLang;
  className?: string;
}

export default function FlagIcon({ lang, className = 'h-4 w-6' }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`${className} rounded-[2px] shrink-0 border border-black/10`}
      aria-hidden="true"
      focusable="false"
    >
      {FLAG_SVGS[lang]}
    </svg>
  );
}
