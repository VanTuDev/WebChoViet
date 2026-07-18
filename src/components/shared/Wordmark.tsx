// ─── Logo chính thức vngoweb — wordmark "VNGOWEB" dạng SVG vector (bộ nhận diện
// chim hạc đỏ-cam). Cao theo em nên chỉnh cỡ bằng class text-* như chữ thường.
// Nền tối truyền `inverted` để đổi sang bản trắng 1 màu; `icon` hiện thêm chim hạc. ───

interface WordmarkProps {
  className?: string;
  /** Hiện biểu tượng chim hạc trước phần chữ */
  icon?: boolean;
  /** Bản trắng 1 màu cho nền tối */
  inverted?: boolean;
}

export default function Wordmark({ className = '', icon = false, inverted = false }: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-[0.3em] ${className}`}>
      {icon && (
        <img
          src="/pwa-192.png"
          alt=""
          className="h-[1.5em] w-auto select-none"
          width={192}
          height={192}
        />
      )}
      <img
        src="/logo-wordmark.svg"
        alt="vngoweb"
        className={`h-[0.78em] w-auto select-none ${inverted ? 'brightness-0 invert' : ''}`}
      />
    </span>
  );
}
