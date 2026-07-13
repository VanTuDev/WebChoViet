// ─── Logo tạm thời dạng chữ "vngoweb", đặt 1 chỗ để dễ đổi khi có bộ nhận diện
// thương hiệu chính thức, không phải sửa nhiều nơi ───

interface WordmarkProps {
  className?: string;
}

export default function Wordmark({ className = '' }: WordmarkProps) {
  return (
    <span className={`font-lexend font-extrabold tracking-tight ${className}`}>
      vngo<span className="text-primary">web</span>
    </span>
  );
}
