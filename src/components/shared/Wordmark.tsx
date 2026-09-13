// ─── Logo chính thức vngoweb — wordmark "VNGOWEB" (biểu tượng ghim vị trí lồng
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
          src="/logo-icon.png"
          alt=""
          className="h-[1.5em] w-auto select-none"
          width={967}
          height={700}
        />
      )}
      <img
        src="/logo-wordmark.png"
        alt="vngoweb"
        className={`h-[0.78em] w-auto select-none ${inverted ? 'brightness-0 invert' : ''}`}
      />
    </span>
  );
}
