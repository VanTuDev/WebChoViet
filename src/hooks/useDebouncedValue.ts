import { useEffect, useState } from 'react';

/**
 * Trả về `value` sau khi đã "im lặng" (không đổi) trong `delayMs` — dùng cho ô
 * tìm kiếm để không gọi API mỗi lần gõ 1 ký tự. Truyền `delayMs = 0` (có thể
 * tính động, vd `value ? 400 : 0`) để bỏ qua debounce trong 1 số trường hợp
 * (vd xóa hết ô tìm kiếm nên muốn thấy lại toàn bộ danh sách ngay lập tức).
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
