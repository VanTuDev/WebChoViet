# `src/data/templates/` — Registry hệ thống template

Đây là nơi khai báo **metadata** của mọi template bán trên Marketplace (giá,
tag, ảnh preview, image slots...). Code React thật của từng template nằm ở
`src/data/Template/<category>/<TemplateName>/` (xem README ở đó).

## Cấu trúc

```
templates/
├── types.ts               Type dùng chung: Template, TemplateDefinition, ImageSlot, CategoryMeta
├── registry.ts             Điểm vào duy nhất — gộp mọi category + export các Map dùng ở runtime
├── schemas.ts              getTemplateSchema() — schema i18n/vi.json, CHỈ Template Editor import
├── categories/
│   ├── _meta.ts            CATEGORY_REGISTRY — danh sách category (label, heading Marketplace)
│   ├── coffee.ts            TemplateDefinition[] của category "coffee"
│   ├── restaurant.ts
│   ├── spa.ts
│   ├── gym.ts
│   └── wedding.ts
└── README.md               (file này)
```

Mọi nơi khác trong app **chỉ import từ `registry.ts`** (hoặc `src/data.ts` —
re-export lại `TEMPLATES`), không import thẳng từ `categories/*`.

## Thêm 1 template vào category đã có

1. Tạo code template thật ở `src/data/Template/<category>/<TenTemplate>/`
   (xem README của category đó, hoặc README gốc `src/data/Template/`).
2. Mở `categories/<category>.ts`, thêm 1 object `TemplateDefinition` vào mảng
   export — copy 1 entry có sẵn làm mẫu,
   `component: lazy(() => import('../../Template/<category>/<TenTemplate>/index'))`.
   `id` phải là tên thư mục viết thường (vd `Coffe-1` → `coffe-1`).
3. Chạy `python scripts/optimize-images.py` để tạo `screen.webp` (bản nhẹ của
   `screen.png` cho carousel trang chủ + card Marketplace).

Không cần sửa `registry.ts` hay bất kỳ file nào khác. Schema `i18n/vi.json` KHÔNG
import trong `categories/*` — `schemas.ts` tự quét theo tên thư mục, chỉ Template
Editor dùng (để ~150 KB JSON không nằm trong bundle trang chủ).

## Thêm 1 category hoàn toàn mới

1. Thêm 1 `CategoryMeta` vào `categories/_meta.ts` (id, label, heading Marketplace).
2. Tạo `categories/<category-moi>.ts`, export `<TEN>_TEMPLATES: TemplateDefinition[]`
   (copy cấu trúc từ `categories/spa.ts` — category chỉ có 1 template — làm mẫu đơn giản nhất).
3. Trong `registry.ts`: import mảng đó và thêm vào `TEMPLATE_REGISTRY` (spread `...`).
4. Tạo `src/data/Template/<category-moi>/README.md` mô tả category (đối tượng dùng,
   palette màu gợi ý, sections thường có — xem README của category khác làm mẫu).

## Tạm ẩn 1 category

Thêm id category vào `HIDDEN_CATEGORIES` trong `registry.ts`. `TEMPLATES` và
`CATEGORY_REGISTRY` tự loại category đó → ẩn khỏi Landing, Marketplace, Sidebar, trang
xem trước, tạo site mới, Admin. Site khách đã tạo vẫn chạy: tra cứu theo id của site đã
có (giá, category) dùng `ALL_TEMPLATES`, còn `COMPONENT_MAP`/`TEMPLATE_NAME_MAP`/
`TEMPLATE_IMAGE_KEYS` vẫn chứa mọi template. Hiện tại đang ẩn: `wedding`.

## Vì sao tách theo category thay vì 1 file duy nhất?

File `registry.ts` gốc từng chứa toàn bộ ~13 template (rất nhiều ảnh URL dài)
trong 1 file >450 dòng — khó tìm, khó review diff khi thêm template mới, và
mọi PR thêm template đều đụng cùng 1 file gây conflict. Tách theo category:

- Mỗi category là 1 file độc lập, review/diff gọn theo đúng phạm vi thay đổi.
- `registry.ts` chỉ còn phần gộp + derived exports (`TEMPLATES`, `COMPONENT_MAP`,
  `SCHEMA_MAP`, `TEMPLATE_NAME_MAP`, `TEMPLATE_IMAGE_KEYS`, `CATEGORY_HEADING_MAP`) —
  logic này không đổi khi thêm template, nên hiếm khi cần sửa.
- Category mới chỉ cần 1 file mới + 1 dòng import/spread ở `registry.ts`, không
  đụng tới template của category khác.
