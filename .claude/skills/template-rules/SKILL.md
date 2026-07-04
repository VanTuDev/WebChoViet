---
name: FrontEnd-WebChoViet:template-rules
description: Use whenever creating a NEW template under src/data/Template/<category>/<Name>/, or editing/reviewing an EXISTING converted template (has index.tsx). Enforces the checklist that keeps templates sellable and functional — Google Maps embed, full i18n (vi/en/zh/ko), required sections per category, correct lang-prop wiring, inline-edit/analytics attributes. Also triggers on "thêm template", "convert template", "kiểm tra template", "template rules", "validate template".
---

# Quy tắc bắt buộc cho Template WebChoViet

Nguồn gốc: session 2026-07-04, sau khi kiểm tra tay phát hiện phần lớn template
KHÔNG cho user nhúng Google Maps của họ — một tính năng bắt buộc theo yêu cầu
sản phẩm. Đây là bộ quy tắc đầy đủ để việc đó (và các lỗi tương tự) không lặp lại.

**Trước khi coi 1 template là xong, LUÔN chạy:**
```bash
cd FrontEnd-WebChoViet
node scripts/validate-templates.mjs
```
Exit code 0 = đạt. Script quét MỌI template đã convert (có `index.tsx`), không cần chỉ định tên.

## 1. Nhúng Google Maps — BẮT BUỘC, không ngoại lệ

Mọi template, bất kể category, phải có:
- 1 field `mapUrl` trong `i18n/vi.json` (thường trong section `contact`/`location`/`info` — tên section tuỳ template, miễn key con tên là `mapUrl`).
- 1 `<iframe>` trong `index.tsx` render `mapUrl` đó qua `toGoogleMapsEmbedUrl()` (import từ `utils/googleMaps`), với fallback đẹp (ảnh tĩnh hoặc icon 📍 + địa chỉ) khi `mapUrl` rỗng — KHÔNG để trống trắng.
- `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`, `title="Google Maps"`, `allowFullScreen` trên iframe.

**Vì sao dùng `toGoogleMapsEmbedUrl` + `mapUrl` thay vì tự parse URL:** `utils/googleMaps.ts` có `isGoogleMapsEmbedUrl()` validate đúng 2 dạng URL trình duyệt cho phép nhúng (`/maps/embed` hoặc `output=embed`) — link "Chia sẻ" thường của Google Maps bị `X-Frame-Options` chặn, không nhúng được. EditorPanel (FE, ngoài phạm vi thư mục Template) tự động render ô nhập `MapEmbedField` cho MỌI key tên đúng `mapUrl` — không cần code gì thêm ở phía editor, chỉ cần đặt đúng tên key.

Copy hướng dẫn cho user (đặt cạnh field mapUrl trong UI editor, không phải trong code template):
```
1. Mở Google Maps → tìm địa điểm
2. Nhấn Chia sẻ → tab Nhúng bản đồ
3. Nhấn Sao chép HTML rồi dán thẳng vào đây
```

## 2. i18n đủ 4 ngôn ngữ — vi / en / zh / ko

- `i18n/vi.json` là **schema gốc** — mọi ngôn ngữ khác phải khớp CHÍNH XÁC cấu trúc key (không thiếu, không thừa, mảng cùng độ dài). Validator check việc này tự động (`diffKeyStructure`).
- Không được chỉ có vi+en rồi bỏ zh/ko — nền tảng quảng cáo "đa ngôn ngữ" như một tính năng cốt lõi (xem LanguageSwitcher trên PublicSitePage), thiếu 1 ngôn ngữ là tính năng bị hỏng một nửa cho site đó.
- Dịch thật, không dịch máy chung chung — giữ nguyên tên riêng (tên quán, tên món có thương hiệu), địa chỉ Việt Nam giữ nguyên hoặc theo văn phong ngôn ngữ đích (vd tiếng Anh bỏ dấu, tiếng Trung/Hàn dịch nghĩa địa danh phổ thông).

## 3. Section bắt buộc theo category

| Category     | Bắt buộc phải có (1 trong các key) |
|---|---|
| coffee, milk-tea, restaurant | `menu` / `menuSection` / `drinks` |
| gym | `programs` VÀ `membership` |
| spa | `services` |
| wedding | (`events` hoặc `timeline`) VÀ `rsvp` |

Lý do: đây là các section mà khách mua template loại đó luôn kỳ vọng có sẵn —
thiếu menu ở 1 template quán ăn/quán trà sữa nghĩa là template không dùng được
ngay khi mua, phải tự code thêm.

## 4. Lang phải lấy từ prop — không giữ state nội bộ độc lập

**Bug điển hình đã sửa hàng loạt:** `const [lang, setLang] = useState<Lang>(initialLang)` —
khi component mount, `useState` chỉ đọc `initialLang` MỘT LẦN. Sau đó nếu
`PublicSitePage`/`TemplateEditorPage` đổi prop `lang` (vd khách bấm
LanguageSwitcher ở khung ngoài, hoặc editor đổi tab ngôn ngữ), component
KHÔNG re-render theo — vẫn hiển thị ngôn ngữ cũ.

Đúng 2 cách chấp nhận được:

**A. Template đơn giản, không có switcher nội bộ riêng** — nhận thẳng từ prop, không `useState`:
```tsx
interface Props { lang?: string }
export default function MyTemplate({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi','en','zh','ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const t = deepMerge(translations[activeLang], customData) as typeof viJson;
  ...
}
```

**B. Template có `<LanguageSwitcher>` riêng (khách đổi ngôn ngữ ngay trên trang)** — dùng hook dùng chung `useTemplateLang` (từ `src/data/Template/_shared/LanguageSwitcher.tsx`), KHÔNG tự viết `useState` + `useEffect` đồng bộ lại:
```tsx
import LanguageSwitcher, { useTemplateLang } from '../../_shared/LanguageSwitcher';
const { activeLang: lang, setActiveLang: setLang } = useTemplateLang(propLang, ['vi','en','zh','ko'] as const);
```
Hook này tự đồng bộ khi prop đổi (editor luôn thắng) NHƯNG vẫn cho khách bấm đổi tại chỗ.

## 5. Inline-edit & analytics attributes (khuyến nghị, validator chỉ WARN)

- `data-field="path.to.key"` trên mọi text/heading hiển thị trực tiếp nội dung từ `t.*` — cho phép chủ site click-để-sửa ngay trên preview thay vì phải mở panel bên cạnh. Mục tiêu ≥5 field/template.
- `data-section="sectionName"` trên mỗi `<section>`/`<nav>`/`<footer>` lớn — dùng cho việc nhảy nhanh tới section khi sửa. Mục tiêu ≥3 section.
- `data-track="tênHànhĐộng"` trên các CTA có giá trị đo lường chuyển đổi thật (gọi điện, đặt bàn, click Zalo, submit form đặt hàng) — nếu thiếu, chủ site không đo được hiệu quả trang.

## 6. Icon

Cả emoji lẫn Material Symbols (`material-symbols-outlined`, `index.html` đã load font này qua Google Fonts) đều dùng được — không có yêu cầu bắt buộc dùng cái nào. Chỉ tránh: `<img>` icon rời rạc không đồng bộ style với phần còn lại của template.

## 7. Đăng ký vào registry

Template mới PHẢI có entry trong `src/data/templates/categories/<category>.ts`
(import schema `vi.json` + object `TemplateDefinition` với `component: lazy(() => import(...))`)
— xem `src/data/templates/README.md` để biết chi tiết từng bước. Thiếu bước này,
template tồn tại trong code nhưng không hiện ở Marketplace, không mua được.

## Quy trình review nhanh 1 template

1. Đọc `i18n/vi.json` — có `mapUrl` chưa, có section bắt buộc của category chưa.
2. Đọc `index.tsx` — có `<iframe>` dùng `toGoogleMapsEmbedUrl` chưa, `lang` có lấy đúng từ prop không (không còn `initialLang`/`useState<Lang>(initialLang)`).
3. Chạy `node scripts/validate-templates.mjs` — sửa tới khi 0 ERROR (WARN có thể chấp nhận nếu có lý do, nhưng nên sửa nếu rẻ).
4. `pnpm run lint` (tsc --noEmit) + `pnpm run build` để chắc chắn không vỡ build.
