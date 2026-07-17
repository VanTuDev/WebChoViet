import { useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   VietMotifs — bộ SVG motif "Việt Nam đương đại" vẽ tay cho landing page.
   Cảm hứng: lụa đỏ son, vân mây vàng kim, hạc bay, sóng thủy ba, hoa mai,
   đèn lồng (tham chiếu public/BackgroundLandingPage.jpg & con-hac-vector-01.jpg).
   Tất cả đều thuần trang trí: aria-hidden, không chứa text.
═══════════════════════════════════════════════════════════════════════ */

type MotifProps = { className?: string; style?: CSSProperties };

/* ── Vân mây vàng kim (line-art mây cuộn khánh vân) ─────────────────── */
export function GoldCloud({ className, style }: MotifProps) {
  return (
    <svg
      viewBox="0 0 220 90"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#d9a441" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Cụm mây chính — 3 cuộn xoáy nối nhau */}
        <path d="M18 62 C6 58 4 42 14 35 C8 24 20 12 33 16 C36 4 56 2 62 13 C72 4 90 8 92 22 C106 16 120 26 116 40" />
        <path d="M33 47 C27 44 27 36 33 33 C39 30 46 34 46 41" />
        <path d="M70 34 C65 30 66 22 73 20 C80 18 86 24 84 31" />
        {/* Đuôi mây kéo dài */}
        <path d="M116 40 C140 34 158 44 156 58 C176 52 196 60 198 74" />
        <path d="M140 52 C136 48 138 41 144 40" />
        {/* Vệt mây phụ bên dưới */}
        <path d="M52 66 C74 60 96 64 108 74 C126 66 148 70 158 80" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ── Sóng thủy ba — dải vảy cá xếp lớp viền vàng trên nền đỏ ─────────── */
export function ThuyBaWave({
  className,
  fill = '#a4161a',
  stroke = '#d9a441',
}: MotifProps & { fill?: string; stroke?: string }) {
  const R = 46; // bán kính vảy ngoài cùng
  const step = R * 2; // khoảng cách tâm trong 1 hàng
  const width = 1680;
  const cols = Math.ceil(width / step) + 2;

  /* 1 vảy = nửa vòng tròn ngoài (có fill) + 2 cung đồng tâm bên trong */
  const scaleAt = (cx: number, cy: number, key: string) => (
    <g key={key}>
      <path
        d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
      />
      <path
        d={`M ${cx - R * 0.66} ${cy} A ${R * 0.66} ${R * 0.66} 0 0 1 ${cx + R * 0.66} ${cy}`}
        fill="none"
        stroke={stroke}
        strokeWidth="2.2"
        opacity="0.85"
      />
      <path
        d={`M ${cx - R * 0.34} ${cy} A ${R * 0.34} ${R * 0.34} 0 0 1 ${cx + R * 0.34} ${cy}`}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        opacity="0.7"
      />
    </g>
  );

  const rows: ReactNode[] = [];
  /* Vẽ hàng trên trước, hàng dưới đè lên → hiệu ứng vảy xếp lớp */
  for (let i = 0; i < cols; i++) rows.push(scaleAt(i * step, 52, `t${i}`));
  for (let i = 0; i < cols; i++) rows.push(scaleAt(i * step + R, 98, `b${i}`));

  return (
    <svg
      viewBox={`0 0 ${width} 98`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {rows}
    </svg>
  );
}

/* Hạc: KHÔNG vẽ tay nữa — dùng PNG trong suốt tách từ public/chim-hac-vector-2.jpg
   (public/elements/hac-1..4.png, hoa-mau-don.png — xem const EL trong LandingPage). */

/* ── Cành mai vàng — biểu tượng may mắn ─────────────────────────────── */
export function ApricotBranch({ className }: MotifProps) {
  /* Bông mai 5 cánh tại (cx,cy) */
  const blossom = (cx: number, cy: number, r: number, key: string) => (
    <g key={key} transform={`translate(${cx} ${cy})`}>
      {[0, 72, 144, 216, 288].map(deg => (
        <ellipse
          key={deg}
          cx="0"
          cy={-r * 0.62}
          rx={r * 0.42}
          ry={r * 0.66}
          fill="#f7c948"
          stroke="#e0a422"
          strokeWidth="1"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle r={r * 0.26} fill="#b45309" />
      {[30, 150, 270].map(deg => (
        <circle
          key={deg}
          cx={Math.cos((deg * Math.PI) / 180) * r * 0.34}
          cy={Math.sin((deg * Math.PI) / 180) * r * 0.34}
          r={r * 0.07}
          fill="#7c3f06"
        />
      ))}
    </g>
  );

  return (
    <svg
      viewBox="0 0 260 220"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Cành chính + cành phụ */}
      <g stroke="#7c4a2d" strokeLinecap="round" fill="none">
        <path d="M10 210 C 60 170 96 130 128 92 C 152 64 186 40 236 28" strokeWidth="9" />
        <path d="M120 100 C 140 104 158 118 166 138" strokeWidth="6" />
        <path d="M170 52 C 186 62 196 78 198 96" strokeWidth="5" />
      </g>
      {blossom(128, 88, 26, 'b1')}
      {blossom(238, 26, 22, 'b2')}
      {blossom(168, 142, 20, 'b3')}
      {blossom(200, 98, 16, 'b4')}
      {/* Nụ mai */}
      <circle cx="92" cy="128" r="7" fill="#e0a422" />
      <circle cx="152" cy="60" r="6" fill="#e0a422" />
    </svg>
  );
}

/* ── Đèn lồng đỏ viền vàng ──────────────────────────────────────────── */
export function Lantern({ className }: MotifProps) {
  const uid = useId().replace(/:/g, '');
  const gBody = `lanternBody-${uid}`;
  return (
    <svg
      viewBox="0 0 120 210"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={gBody} cx="0.38" cy="0.32" r="0.9">
          <stop offset="0" stopColor="#e8402a" />
          <stop offset="0.6" stopColor="#c1121f" />
          <stop offset="1" stopColor="#8d1e22" />
        </radialGradient>
      </defs>
      {/* Dây treo */}
      <line x1="60" y1="0" x2="60" y2="26" stroke="#d9a441" strokeWidth="3" />
      {/* Nắp trên / đáy */}
      <rect x="40" y="26" width="40" height="12" rx="5" fill="#d9a441" />
      <rect x="44" y="140" width="32" height="10" rx="4" fill="#d9a441" />
      {/* Thân đèn */}
      <ellipse cx="60" cy="90" rx="46" ry="56" fill={`url(#${gBody})`} />
      {/* Gân đèn */}
      <g stroke="#f2c86b" strokeWidth="2" opacity="0.75" fill="none">
        <ellipse cx="60" cy="90" rx="16" ry="56" />
        <ellipse cx="60" cy="90" rx="32" ry="56" />
        <ellipse cx="60" cy="90" rx="45" ry="56" />
      </g>
      {/* Tua rua */}
      <line x1="60" y1="150" x2="60" y2="168" stroke="#d9a441" strokeWidth="3" />
      <circle cx="60" cy="171" r="5" fill="#d9a441" />
      <g stroke="#e8402a" strokeWidth="3" strokeLinecap="round">
        <line x1="54" y1="176" x2="51" y2="205" />
        <line x1="60" y1="176" x2="60" y2="208" />
        <line x1="66" y1="176" x2="69" y2="205" />
      </g>
    </svg>
  );
}

/* ── Cánh mai rơi (dùng rải trong hero) ─────────────────────────────── */
export function MaiPetal({ className, style }: MotifProps) {
  return (
    <svg
      viewBox="0 0 24 26"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 1 C 19 6 20 17 12 25 C 4 17 5 6 12 1 Z"
        fill="#f2c86b"
        stroke="#d9a441"
        strokeWidth="1"
      />
    </svg>
  );
}
