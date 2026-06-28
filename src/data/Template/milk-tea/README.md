# Category: Trà Sữa & Milk Tea

**Category ID:** `milk-tea`
**Label sidebar:** Trà Sữa

---

## Dành cho ai

Tiệm trà sữa, bubble tea, trà trái cây, smoothie, nước ép đóng gói.
Thương hiệu trẻ trung, màu sắc tươi vui, target khách hàng 16-30 tuổi.

---

## Templates hiện có

> Chưa có template. Xem hướng dẫn thêm template trong `docs/skill-add-template.md`.

---

## Naming convention

```
Folder:      MilkTea-1/, MilkTea-2/, ...
Template ID: milk-tea-1, milk-tea-2, ...
```

---

## Palette màu phổ biến

| Phong cách | Màu chính | Màu phụ | Gợi ý dùng |
|------------|-----------|---------|------------|
| Pastel ngọt | `#F9A8D4` (pink-300) | `#FDF2F8` | Trà sữa nữ tính |
| Tím boba | `#7C3AED` (violet) | `#F5F3FF` | Thương hiệu cao cấp |
| Xanh mint | `#10B981` (emerald) | `#ECFDF5` | Trà trái cây, healthy |
| Cam nhiệt đới | `#F97316` (orange) | `#FFF7ED` | Smoothie, nước trái cây |
| Vàng mật ong | `#EAB308` (yellow) | `#FEFCE8` | Trà mật ong, tự nhiên |

---

## Sections thường có trong template milk-tea

| Section | Bắt buộc | Mô tả |
|---------|:--------:|-------|
| **Hero** | ✅ | Ảnh sản phẩm bắt mắt + slogan ngắn + CTA |
| **Best Sellers** | ✅ | 4-8 sản phẩm nổi bật (carousel hoặc grid) |
| **Menu đầy đủ** | ✅ | Phân loại: Trà sữa / Trà trái cây / Topping |
| **Topping picker** | 🟡 | Bảng chọn topping nếu cửa hàng có nhiều tuỳ chọn |
| **Promotion / Flash sale** | 🟡 | Banner khuyến mãi giới hạn thời gian |
| **About Brand** | 🟡 | Câu chuyện thương hiệu, nguồn gốc nguyên liệu |
| **Gallery** | 🟡 | Ảnh sản phẩm đẹp, behind-the-scenes |
| **Loyalty / App** | 🟡 | QR app tích điểm, thẻ thành viên |
| **Contact** | ✅ | SĐT, địa chỉ, giờ mở cửa, map |
| **Social Proof** | 🟡 | Review từ TikTok/Instagram embed hoặc testimonial |

---

## imageSlots điển hình

```ts
imageSlots: [
  { key: 'heroBg',      label: 'Ảnh nền Hero',     defaultUrl: '...' },
  { key: 'heroProduct', label: 'Sản phẩm Hero',    defaultUrl: '...' },
  { key: 'logo',        label: 'Logo',              defaultUrl: '' },
  { key: 'product_0',   label: 'Sản phẩm 1',       defaultUrl: '...' },
  { key: 'product_1',   label: 'Sản phẩm 2',       defaultUrl: '...' },
  { key: 'product_2',   label: 'Sản phẩm 3',       defaultUrl: '...' },
  { key: 'product_3',   label: 'Sản phẩm 4',       defaultUrl: '...' },
  { key: 'gallery_0',   label: 'Gallery 1',         defaultUrl: '...' },
  { key: 'gallery_1',   label: 'Gallery 2',         defaultUrl: '...' },
  { key: 'promo',       label: 'Banner khuyến mãi', defaultUrl: '...' },
]
```

---

## vi.json skeleton

```json
{
  "meta": {
    "siteName": "Tên Tiệm Trà Sữa",
    "tagline": "Ngọt ngào từng giọt"
  },
  "hero": {
    "title": "Tiêu đề lớn",
    "subtitle": "Mô tả hấp dẫn",
    "ctaText": "Xem menu",
    "badge": "MỚI - Hè 2025"
  },
  "bestsellers": {
    "title": "Best Sellers",
    "subtitle": "Được yêu thích nhất",
    "items": [
      { "name": "Trà Sữa Trân Châu", "price": "45,000đ", "tag": "Best Seller" }
    ]
  },
  "menu": {
    "title": "Thực Đơn Đầy Đủ",
    "categories": ["Trà Sữa", "Trà Trái Cây", "Smoothie"],
    "items": [
      { "name": "Tên món", "price": "45,000đ", "category": "Trà Sữa", "desc": "Mô tả" }
    ]
  },
  "promotion": {
    "title": "Ưu đãi hôm nay",
    "desc": "Mua 2 tặng 1 mọi topping",
    "expiry": "Chỉ đến 31/12"
  },
  "contact": {
    "phone": "0901 234 567",
    "address": "123 Đường ABC, Q.1, TP.HCM",
    "hours": "9:00 - 22:30 hàng ngày",
    "mapUrl": "",
    "facebookUrl": "https://facebook.com/",
    "tiktokUrl": "https://tiktok.com/",
    "instagramUrl": "https://instagram.com/"
  }
}
```

---

## Lưu ý thiết kế

- **Font:** Tròn, dễ thương — Inter, Nunito, hoặc Quicksand
- **Border radius:** Lớn (`rounded-3xl`, `rounded-full`) — phong cách kawaii/friendly
- **Animation:** Nhẹ nhàng, float effect cho sản phẩm hero
- **Mobile first:** 90% khách order qua điện thoại — ưu tiên CTA nổi bật trên màn hình nhỏ
