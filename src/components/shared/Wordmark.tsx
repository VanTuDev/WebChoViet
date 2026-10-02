// ─── Logo chính thức VNGOWEB — wordmark "VNGOWEB" (biểu tượng ghim vị trí lồng
// chữ W, gradient lam ngọc → xanh dương → tím, nguồn: design/Logo/logo_VNGOWEB-01.png).
// PNG độ phân giải cao thay vì SVG — chưa có nguồn vector thật (chỉ có .ai/.psd gốc),
// nét vẫn sắc nét ở mọi cỡ hiển thị thực tế (navbar/sidebar/footer). Cao theo em nên
// chỉnh cỡ bằng class text-* như chữ thường. Nền tối truyền `inverted` để đổi sang bản
// trắng 1 màu (lọc CSS brightness-0 invert — hoạt động trên PNG có alpha như ảnh thường);
// `icon` hiện thêm biểu tượng ghim vị trí đứng riêng trước chữ. ───

interface WordmarkProps {
  className?: string;
  /** Hiện biểu tượng ghim vị trí (pin) đứng riêng trước phần chữ */
  icon?: boolean;
  /** Bản trắng 1 màu cho nền tối */
  inverted?: boolean;
}

export default function Wordmark({ className = '', icon = false, inverted = false }: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-[0.3em] ${className}`}>
      {icon && (
        <img
          src="/logo-icon.webp"
          alt=""
          className="h-[1.5em] w-auto select-none"
          width={199}
          height={144}
        />
      )}
      {/* .webp thu nhỏ từ PNG gốc (scripts/optimize-images.py) — PNG gốc 1400px/967px
          nặng 72–163 KB trong khi chỉ hiển thị cao ~24–45px. */}
      <img
        src="/logo-wordmark.webp"
        alt="VNGOWEB"
        width={614}
        height={96}
        className={`h-[0.78em] w-auto select-none ${inverted ? 'brightness-0 invert' : ''}`}
      />
    </span>
  );
}
