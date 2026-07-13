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
