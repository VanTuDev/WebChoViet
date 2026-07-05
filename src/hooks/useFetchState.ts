import { useEffect, useRef, useState, type DependencyList } from 'react';

interface UseFetchStateResult<T> {
  data: T | null;
  loading: boolean;
  error: string;
  /** Cập nhật `data` cục bộ (vd sau khi toggle/xóa 1 item) mà không cần gọi lại API */
  setData: React.Dispatch<React.SetStateAction<T | null>>;
}

/**
 * Chạy `fetcher()` mỗi khi 1 phần tử trong `deps` đổi (kể cả lần mount đầu
 * tiên) — tự quản lý `loading`/`error`, và tự bỏ qua response nào về SAU khi
 * đã có 1 request mới hơn bắt đầu (đánh số thứ tự request) để tránh hiển thị
 * nhầm kết quả cũ khi người dùng gõ tìm kiếm/đổi trang liên tục trước khi
 * response trước đó kịp về.
 */
export function useFetchState<T>(
  fetcher: () => Promise<T>,
  deps: DependencyList,
  errorFallback = 'Không tải được dữ liệu.',
): UseFetchStateResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const requestSeq = useRef(0);

  useEffect(() => {
    const seq = ++requestSeq.current;
    setLoading(true);
    setError('');
    fetcher()
      .then(result => {
        if (seq !== requestSeq.current) return; // đã có request mới hơn — bỏ qua kết quả cũ
        setData(result);
      })
      .catch(err => {
        if (seq !== requestSeq.current) return;
        setError(err instanceof Error ? err.message : errorFallback);
      })
      .finally(() => {
        if (seq === requestSeq.current) setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, setData };
}
