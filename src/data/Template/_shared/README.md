# `_shared/` — Component dùng chung giữa các template

Folder này chứa những mảnh UI **mọi template đều có thể dùng lại**.
Khác với `src/components/` (UI của app vngoweb), code ở đây render
**bên trong trang web của khách hàng** (template), nên phải:

- Tự chứa (self-contained), không phụ thuộc store/router của app.
- Styling trung tính để đặt vừa mọi design system của từng template.
- Không hard-code text tiếng Việt trong UI khách thấy (trừ tooltip song ngữ).

## Component hiện có

| File | Công dụng |
|------|-----------|
| `LanguageSwitcher.tsx` | Nút 🌐 chuyển ngôn ngữ trên header + hook `useTemplateLang` |
| `Reveal.tsx` | Hiệu ứng xuất hiện/ẩn đi theo viewport (scroll reveal 2 chiều, stagger, tôn trọng `prefers-reduced-motion`) — KHÔNG bọc quanh phần tử chứa con `fixed`/`sticky` |
| `useCalendarMonth.ts` | Tự tính lưới lịch tháng (ô trống đầu bảng, số ngày, thứ trong tuần) từ năm+tháng — dùng cho khối lịch mini "Save the Date" thay vì tự nhẩm tay |

## Cách dùng `LanguageSwitcher`

```tsx
import LanguageSwitcher, { useTemplateLang } from '../../_shared/LanguageSwitcher';

const SUPPORTED_LANGS = ['vi', 'en', 'zh', 'ko'] as const; // khớp các file trong i18n/

export default function MyTemplate({ lang = 'vi' }: Props) {
  const { activeLang, setActiveLang } = useTemplateLang(lang, SUPPORTED_LANGS);
  const t = translations[activeLang];

  return (
    <nav>
      ...
      <LanguageSwitcher value={activeLang} onChange={setActiveLang} languages={SUPPORTED_LANGS} />
    </nav>
  );
}
```

Quy tắc:

- `languages` chỉ liệt kê ngôn ngữ template **thực sự có file i18n** — thiếu file
  nào thì bỏ code đó ra.
- Prop `lang` từ editor luôn thắng: khi editor đổi ngôn ngữ preview, hook tự
  reset lựa chọn nội bộ của khách.
- Template chỉ có 1 ngôn ngữ → component tự ẩn, không cần điều kiện bên ngoài.

## Cách dùng `useCalendarMonth`

```tsx
import { useCalendarMonth } from '../../_shared/useCalendarMonth';

// Đổi ngày cưới → chỉ sửa 2 số này, hook tự tính lại đúng thứ + số ô trống,
// KHÔNG tự nhẩm tay "ngày 1 rơi vào thứ mấy" như trước.
const WEDDING_YEAR = 2026;
const WEDDING_MONTH = 1; // 1–12

const { cells } = useCalendarMonth({ year: WEDDING_YEAR, month: WEDDING_MONTH });

// cells: (number | null)[] — null là ô trống đầu bảng, render đúng thứ tự 7 cột
<div className="grid grid-cols-7">
  {cells.map((day, i) =>
    day === null ? <span key={i} /> : <span key={i}>{day}</span>,
  )}
</div>
```

Quy tắc:

- `month` nhận 1–12 như người thật hay nói (KHÔNG phải 0–11 kiểu `Date` gốc của JS).
- Tự xử lý năm nhuận và số ngày thật của từng tháng — không cần tự tra bảng.
- Ngày highlight (ngày cưới) vẫn là `Number` từ i18n như cũ (vd `Number(t.events.day)`),
  hook chỉ lo phần vẽ lưới; không trộn logic hiển thị/dịch vào hook.
