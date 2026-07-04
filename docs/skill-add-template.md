# Skill: Thêm Template / Category mới vào WebChoViet

> **Dành cho AI:** Đọc file này khi nhận lệnh liên quan đến "thêm template", "tạo template mới",
> "thêm category", "làm giao diện [tên ngành]". Đây là nguồn sự thật duy nhất cho hệ thống template.

---

## 1. Tổng quan dự án

| Mục | Giá trị |
|-----|---------|
| Framework | Vite + React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Router | React Router v7 |
| State | Context API (`src/store/AppContext.tsx`) |
| Backend | Express API dưới dạng Vite plugin (`api/routes.ts`) |
| DB | JSON file (`data/db.json`, `data/sites/[slug].json`) |

**Working directory:** `E:\Project\Webchoviet\FrontEnd-WebChoViet`

---

## 2. Kiến trúc Template Registry

### Nguyên lý cốt lõi

**1 nguồn sự thật duy nhất** = `src/data/templates/registry.ts` — nhưng file này chỉ
**gộp** dữ liệu lại. Dữ liệu thật của từng template nằm trong
`src/data/templates/categories/<category>.ts` (1 file/category, xem
`src/data/templates/README.md` để hiểu vì sao tách vậy).

Toàn bộ hệ thống (Marketplace, Editor, PublicSite, Analytics) đều import từ
`registry.ts` (không import thẳng `categories/*.ts`). Không có file nào khác
giữ danh sách template hay category.

### Luồng dữ liệu

```
registry.ts
    │
    ├── TEMPLATES          → MarketplacePage, TemplatePreviewPage
    ├── COMPONENT_MAP      → PublicSitePage, TemplateEditorPage, TemplatePreviewPage
    ├── SCHEMA_MAP         → TemplateEditorPage (EditorPanel)
    ├── TEMPLATE_NAME_MAP  → TemplateEditorPage (header, publish modal)
    ├── TEMPLATE_IMAGE_KEYS→ TemplateEditorPage (EditorPanel image slots)
    └── CATEGORY_HEADING_MAP → MarketplacePage (heading theo category)
```

Tất cả các map trên được **tự sinh** bằng `.map()` và `Object.fromEntries()` — không cần sửa tay.

---

## 3. Cấu trúc thư mục

```
src/data/
├── templates/
│   ├── types.ts                  ← Type dùng chung (Template, TemplateDefinition, ImageSlot, CategoryMeta)
│   ├── registry.ts                ← Chỉ GỘP category lại + export các Map — hiếm khi cần sửa
│   └── categories/
│       ├── _meta.ts               ← CATEGORY_REGISTRY — SỬA FILE NÀY khi thêm category mới
│       ├── coffee.ts              ← SỬA FILE NÀY khi thêm template vào category coffee
│       ├── milk-tea.ts
│       ├── restaurant.ts
│       ├── spa.ts
│       ├── gym.ts
│       └── wedding.ts
│
└── Template/
    ├── coffee/
    │   ├── Coffe-1/
    │   │   ├── index.tsx        ← React component
    │   │   └── i18n/
    │   │       ├── vi.json      ← Schema + nội dung mặc định (BẮT BUỘC)
    │   │       ├── en.json      ← (tuỳ chọn)
    │   │       └── zh.json      ← (tuỳ chọn)
    │   ├── Coffe-2/ ... Coffe-5/
    │
    ├── milk-tea/                ← Tạo khi làm category mới
    │   └── MilkTea-1/
    │       ├── index.tsx
    │       └── i18n/vi.json
    │
    ├── spa/
    ├── gym/
    ├── restaurant/
    └── wedding/
```

### Quy tắc đặt tên folder

| Category | Folder name | Ví dụ template |
|----------|-------------|----------------|
| coffee | `coffee/` | `Coffe-1`, `Coffe-2` |
| milk-tea | `milk-tea/` | `MilkTea-1`, `MilkTea-2` |
| restaurant | `restaurant/` | `Restaurant-1` |
| spa | `spa/` | `Spa-1` |
| gym | `gym/` | `Gym-1` |
| wedding | `wedding/` | `Wedding-1` |

---

## 4. Thêm template mới — Step by step

### Bước 1: Tạo folder và file

```
src/data/Template/<category>/<TemplateName>/
├── index.tsx
└── i18n/
    └── vi.json
```

Ví dụ template mới cho category `spa`:
```
src/data/Template/spa/Spa-1/
├── index.tsx
└── i18n/vi.json
```

---

### Bước 2: Viết `index.tsx`

**QUAN TRỌNG — Import paths:** Template nằm 4 cấp sâu so với `src/`, nên dùng `../../../../`:

```tsx
// ✅ ĐÚNG — 4 cấp lên (src/data/Template/<category>/<Name>/ → src/)
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';

// ❌ SAI — chỉ 3 cấp (path cũ trước khi có subfolder category)
import { useTemplateCustom } from '../../../context/TemplateCustomContext';
```

**Skeleton component:**

```tsx
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import defaultData from './i18n/vi.json';

interface Props {
  lang?: string;
}

export default function Spa1({ lang: _lang }: Props) {
  const { customData, images } = useTemplateCustom();
  const data = deepMerge(defaultData, customData) as typeof defaultData;

  return (
    <div>
      {/* UI template ở đây */}
      <h1>{data.hero.title}</h1>
    </div>
  );
}
```

---

### Bước 3: Viết `i18n/vi.json`

File này có 2 vai trò:
1. **Nội dung mặc định** — hiển thị khi user chưa tuỳ chỉnh
2. **Schema cho Editor** — EditorPanel đọc keys để tạo form tự động

```json
{
  "hero": {
    "title": "Spa Thư Giãn Cao Cấp",
    "subtitle": "Trải nghiệm thư giãn đỉnh cao",
    "ctaText": "Đặt lịch ngay"
  },
  "services": {
    "title": "Dịch vụ của chúng tôi",
    "items": [
      { "name": "Massage Body", "price": "350,000đ", "duration": "60 phút" },
      { "name": "Facial Trị liệu", "price": "450,000đ", "duration": "90 phút" }
    ]
  },
  "contact": {
    "phone": "0901 234 567",
    "address": "123 Đường Thư Giãn, Q.1, TP.HCM",
    "mapUrl": "",
    "facebookUrl": "https://facebook.com/spathuGian",
    "zaloUrl": "https://zalo.me/0901234567"
  }
}
```

**Quy tắc schema:**
- Key tên `mapUrl` → tự động render Google Maps embed field
- Key kết thúc `Url` hoặc `Link` → tự động render URL input
- Array of objects → tự động render list editor (thêm/xoá item)
- String thường → text input (< 60 ký tự) hoặc textarea (≥ 60 ký tự)

---

### Bước 4: Thêm vào `categories/<category>.ts`

Mở `src/data/templates/categories/<category>.ts` (ví dụ `categories/spa.ts`) và làm 2 việc.
**Không sửa `registry.ts`** — file đó chỉ gộp các category lại.

**4a. Thêm import schema ở đầu file (sau các import schema hiện có):**

```ts
import schema_spa1 from '../../Template/spa/Spa-1/i18n/vi.json';
```

> Lưu ý độ sâu: từ `categories/<category>.ts` lên `Template/` là `../../` (2 cấp),
> khác với `../Template/` khi registry.ts từng nằm phẳng ở 1 file.

**4b. Thêm object vào mảng `<TEN>_TEMPLATES` export ở cuối file (ví dụ `SPA_TEMPLATES`):**

```ts
{
  // ── Metadata (hiển thị Marketplace) ─────────────────────────────────────
  id: 'spa-1',                    // kebab-case, UNIQUE trong toàn bộ hệ thống
  name: 'Zen Garden Spa',         // Tên hiển thị
  description: 'Thiết kế sang trọng tông trắng-vàng cho spa cao cấp. Hero toàn màn hình, bảng dịch vụ, testimonials và đặt lịch online.',
  category: 'spa',                // phải trùng với id trong CATEGORY_REGISTRY
  price: 399000,                  // đơn vị VNĐ, 0 = miễn phí
  priceText: '399,000đ',          // hiển thị trên card
  badge: 'MỚI',                   // 'BÁN CHẠY' | 'PREMIUM' | 'MỚI' | undefined
  rating: 4.8,                    // 0-5, undefined nếu chưa có review
  tags: ['Spa', 'Sang Trọng', 'Đặt Lịch Online'],
  imageUrl: 'https://...',        // ảnh thumbnail trên marketplace (tỉ lệ 4:3 hoặc 16:9)

  // ── Runtime (chỉ registry biết) ──────────────────────────────────────────
  component: lazy(() => import('../../Template/spa/Spa-1/index')),
  schema: schema_spa1 as Record<string, unknown>,
  imageSlots: [
    // Mỗi slot = 1 ảnh user có thể thay thế trong Editor
    { key: 'heroBg',    label: 'Ảnh nền Hero',    defaultUrl: 'https://...' },
    { key: 'logo',      label: 'Logo',             defaultUrl: '' },
    { key: 'service_0', label: 'Dịch vụ 1',       defaultUrl: 'https://...' },
    { key: 'service_1', label: 'Dịch vụ 2',       defaultUrl: 'https://...' },
  ],
},
```

**Xong. Không cần sửa file nào khác.**

---

## 5. Thêm category mới — Step by step

Cần làm **4 việc** (thay vì 1 khi thêm template vào category đã có):

### Bước 1: Thêm vào `CATEGORY_REGISTRY` trong `categories/_meta.ts`

```ts
// src/data/templates/categories/_meta.ts
export const CATEGORY_REGISTRY: CategoryMeta[] = [
  { id: 'coffee', ... },  // đã có

  // Thêm vào đây:
  {
    id: 'spa',
    label: 'Spa & Làm Đẹp',           // Nhãn ngắn cho sidebar filter
    heading: {
      title: 'Kho Giao Diện: Spa & Làm Đẹp',
      desc: 'Thiết kế sang trọng, tinh tế dành cho spa, nail salon, thẩm mỹ viện. Tích hợp đặt lịch online.',
    },
  },
];
```

### Bước 2: Tạo `categories/<category-moi>.ts`

Copy cấu trúc từ 1 category có 1 template (ví dụ `categories/spa.ts`), export
`<TEN>_TEMPLATES: TemplateDefinition[]` chứa template đầu tiên của category này
(xem Bước 3-4 ở mục 4 phía trên để viết `TemplateDefinition`).

### Bước 3: Import + gộp vào `registry.ts`

```ts
// src/data/templates/registry.ts
import { SPA_TEMPLATES } from './categories/spa';   // thêm dòng import

const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  ...COFFEE_TEMPLATES,
  ...SPA_TEMPLATES,   // thêm vào mảng gộp
  ...
];
```

### Bước 4: Thêm 1 dòng vào `Sidebar.tsx`

File: `src/components/Sidebar/Sidebar.tsx`

Tìm array `MARKETPLACE_CATEGORIES` và thêm:

```ts
const MARKETPLACE_CATEGORIES: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'all',     label: 'Tất cả giao diện',  icon: <LayoutGrid className="h-4 w-4" /> },
  { id: 'coffee',  label: 'Cafe & Đồ uống',    icon: <Coffee className="h-4 w-4" /> },

  // Thêm vào đây — import icon từ lucide-react:
  { id: 'spa',     label: 'Spa & Làm đẹp',     icon: <Sparkles className="h-4 w-4" /> },
  { id: 'gym',     label: 'Gym & Thể Thao',    icon: <Dumbbell className="h-4 w-4" /> },
  { id: 'restaurant', label: 'Nhà Hàng & Ăn Uống', icon: <Utensils className="h-4 w-4" /> },
  { id: 'wedding', label: 'Thiệp Cưới Online', icon: <Heart className="h-4 w-4" /> },
];
```

Nhớ import icon mới ở đầu file nếu chưa có:
```ts
import { LayoutGrid, Coffee, Sparkles, Dumbbell, Utensils, Heart, ... } from 'lucide-react';
```

---

## 6. Bảng tóm tắt — files cần sửa

| Việc | categories/\<cat\>.ts | categories/_meta.ts | registry.ts | Sidebar.tsx |
|------|:---:|:---:|:---:|:---:|
| Thêm template mới (category đã có) | ✅ | ❌ | ❌ | ❌ |
| Thêm template mới (category mới) | ✅ (file mới) | ✅ | ✅ (thêm import+spread) | ✅ |
| Đổi tên/giá template | ✅ | ❌ | ❌ | ❌ |

---

## 7. ID conventions

```
coffee    → coffe-1, coffe-2, coffe-3, ...   (giữ typo "coffe" cho nhất quán với data cũ)
milk-tea  → milk-tea-1, milk-tea-2, ...
restaurant→ restaurant-1, restaurant-2, ...
spa       → spa-1, spa-2, ...
gym       → gym-1, gym-2, ...
wedding   → wedding-1, wedding-2, ...
```

**Không được trùng ID** — TypeScript sẽ không báo lỗi nhưng template sau sẽ ghi đè template trước trong map.

---

## 8. Các pitfall thường gặp

### 8.1 Import path sai độ sâu

```
src/data/Template/coffee/Coffe-1/index.tsx
         ^        ^       ^       ^
         1        2       3       4  cấp thư mục
```

→ Từ `index.tsx`, muốn lên đến `src/` cần `../../../../`

```tsx
// ✅
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import viData from './i18n/vi.json';

// ❌ (chỉ 3 cấp — đường dẫn cũ trước khi có subfolder category)
import { useTemplateCustom } from '../../../context/TemplateCustomContext';
```

### 8.2 Category id không khớp

```ts
// Trong CATEGORY_REGISTRY:
{ id: 'spa', ... }

// Trong TEMPLATE_REGISTRY:
{ id: 'spa-1', category: 'spa', ... }  // ✅ category phải bằng đúng id của category
{ id: 'spa-1', category: 'Spa', ... }  // ❌ case sensitive!
```

### 8.3 Quên `as Record<string, unknown>` cho schema

```ts
import schema_spa1 from '../Template/spa/Spa-1/i18n/vi.json';

// ✅
schema: schema_spa1 as Record<string, unknown>,

// ❌ TypeScript lỗi — JSON import có type cứng
schema: schema_spa1,
```

### 8.4 imageSlot key trùng nhau trong 1 template

```ts
imageSlots: [
  { key: 'hero', label: 'Ảnh Hero', defaultUrl: '...' },
  { key: 'hero', label: 'Logo', defaultUrl: '...' },  // ❌ trùng key!
]
```

Key trong `imageSlots` phải **unique trong phạm vi 1 template** — nó là key trong `images: Record<string, string>` của SiteConfig.

### 8.5 Schema dùng boolean/number

```json
{
  "showPromo": true,   // ❌ Editor không hỗ trợ boolean field
  "count": 3           // ❌ Editor không hỗ trợ number field
}
```

EditorPanel chỉ render `string`, `string[]`, `object`, `Array<object>`.
Dùng string nếu cần user sửa: `"showPromo": "true"`.

---

## 9. Kiểm tra sau khi thêm template

```bash
# 1. TypeScript check — zero errors mới được
npx tsc --noEmit

# 2. Chạy dev server và kiểm tra:
npm run dev

# 3. Kiểm tra các điểm:
# - /marketplace → card mới xuất hiện trong đúng category filter
# - /marketplace/preview/<template-id> → render đúng template
# - /template-editor/new?template=<template-id> → editor load đúng schema + image slots
# - Publish → /[slug] → render đúng với customData đã lưu
```

---

## 10. Key files reference

| File | Vai trò |
|------|---------|
| `src/data/templates/registry.ts` | Gộp mọi category + export các Map (`TEMPLATES`, `COMPONENT_MAP`, ...) |
| `src/data/templates/types.ts` | Type dùng chung: `Template`, `TemplateDefinition`, `ImageSlot`, `CategoryMeta` |
| `src/data/templates/categories/_meta.ts` | `CATEGORY_REGISTRY` — sửa khi thêm category mới |
| `src/data/templates/categories/<category>.ts` | **Sửa file này** để thêm/sửa template của 1 category |
| `src/data/templates/README.md` | Giải thích chi tiết cấu trúc `templates/` + lý do tách theo category |
| `src/components/Sidebar/Sidebar.tsx` | Sidebar filter marketplace — sửa khi thêm category |
| `src/data/Template/<cat>/<Name>/index.tsx` | React component của template |
| `src/data/Template/<cat>/<Name>/i18n/vi.json` | Schema + nội dung mặc định |
| `src/pages/public-site/PublicSitePage.tsx` | Render template ra public URL |
| `src/pages/marketplace/MarketplacePage.tsx` | Grid + filter marketplace |
| `src/pages/marketplace/TemplatePreviewPage.tsx` | Preview toàn màn hình |
| `src/pages/template-editor/TemplateEditorPage.tsx` | Editor + publish |
| `src/pages/template-editor/_components/EditorPanel.tsx` | Form chỉnh nội dung + ảnh |
| `src/context/TemplateCustomContext.tsx` | Context cung cấp customData + images cho template |
| `src/utils/deepMerge.ts` | Merge customData lên schema mặc định |
