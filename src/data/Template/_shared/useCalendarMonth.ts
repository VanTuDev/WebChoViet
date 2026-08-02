/**
 * ─── useCalendarMonth — tự tính lưới lịch tháng từ 1 ngày cụ thể ─────────────────
 *
 * Dùng khi template cần vẽ 1 khối lịch mini (kiểu "Save the Date" / lịch tháng
 * highlight ngày cưới) — chỉ cần truyền năm + tháng, hook tự tính đúng:
 *   - Ô trống cần chèn trước ngày 1 (để cột "Thứ" thẳng hàng)
 *   - Số ngày thật của tháng đó (28-31, tự xử lý năm nhuận)
 *   - Thứ trong tuần của bất kỳ ngày nào trong tháng
 *
 * Trước đây các template tự nhẩm tay 2 hằng số này (vd `CALENDAR_LEAD_OFFSET = 3`
 * kèm comment giải thích "ngày 1 rơi vào Thứ Năm...") — dễ tính sai khi đổi ngày
 * cưới và không ai kiểm chứng lại. Hook này thay hoàn toàn phần tính tay đó bằng
 * `Date` chuẩn của JS.
 *
 * Cách dùng:
 *   const { cells } = useCalendarMonth({ year: 2026, month: 1 }); // tháng 1-12
 *   {cells.map((day, i) => day === null ? <span key={i} /> : <span key={i}>{day}</span>)}
 */
import { useMemo } from 'react';

export interface CalendarMonthOptions {
  /** Năm đầy đủ, vd 2026 */
  year: number;
  /** Tháng 1–12 (KHÔNG phải 0–11 kiểu `Date` gốc của JS — cố ý để gọi hook cho tự nhiên) */
  month: number;
  /** 1 = tuần bắt đầu Thứ Hai (chuẩn lịch Việt Nam, mặc định). 0 = tuần bắt đầu Chủ Nhật. */
  weekStartsOn?: 0 | 1;
}

export interface CalendarMonthResult {
  /** Số ngày thật của tháng (đã tự xử lý năm nhuận) */
  daysInMonth: number;
  /** Số ô trống cần chèn trước ngày 1 để đúng cột thứ trong tuần */
  leadOffset: number;
  /** Toàn bộ ô lịch theo đúng thứ tự hiển thị (7 cột/hàng) — `null` = ô trống đầu bảng */
  cells: (number | null)[];
  /** Thứ trong tuần (0=Chủ Nhật..6=Thứ Bảy, chuẩn `Date.getDay()`) của 1 ngày trong tháng này */
  weekdayOf: (day: number) => number;
}

export function useCalendarMonth({
  year,
  month,
  weekStartsOn = 1,
}: CalendarMonthOptions): CalendarMonthResult {
  return useMemo(() => {
    const firstWeekday = new Date(year, month - 1, 1).getDay(); // 0=CN..6=T7
    const daysInMonth = new Date(year, month, 0).getDate(); // ngày 0 của tháng sau = ngày cuối tháng này
    const leadOffset = weekStartsOn === 1 ? (firstWeekday + 6) % 7 : firstWeekday;

    const cells: (number | null)[] = [
      ...Array.from({ length: leadOffset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const weekdayOf = (day: number) => new Date(year, month - 1, day).getDay();

    return { daysInMonth, leadOffset, cells, weekdayOf };
  }, [year, month, weekStartsOn]);
}
