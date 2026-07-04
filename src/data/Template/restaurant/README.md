# Category: Nhà Hàng & Quán Ăn

**Category ID:** `restaurant`
**Label sidebar:** Nhà Hàng

---

## Dành cho ai

Nhà hàng, quán ăn gia đình, quán cơm văn phòng, buffet, quán lẩu, quán nhậu, 
quán ăn đặc sản vùng miền, fast food, food court.

---

## Templates hiện có

| ID | Tên | Giá | Đặc điểm nổi bật |
|----|-----|-----|-------------------|
| `restaurant-1` | Phố Ẩm Thực | Miễn phí | Tông nâu gỗ ấm cúng, hero fullscreen overlay, menu 6 món dạng card |
| `restaurant-2` | Bếp Việt Premium | 399,000đ | Corporate hiện đại, menu bento, đánh giá glassmorphism, 4 ngôn ngữ Việt/Anh/Trung/Hàn |

---

## Naming convention

```
Folder:      Restaurant-1/, Restaurant-2/, ...
Template ID: restaurant-1, restaurant-2, ...
```

---

## Palette màu phổ biến

| Phong cách | Màu chính | Màu phụ | Gợi ý dùng |
|------------|-----------|---------|------------|
| Đỏ ấm / truyền thống | `#DC2626` (red) | `#FEF2F2` | Quán lẩu, nhà hàng Á |
| Nâu đất / rustic | `#92400E` (amber-800) | `#FDF8F0` | Quán ăn gia đình, truyền thống |
| Xanh lá / tươi | `#15803D` (green) | `#F0FDF4` | Quán chay, healthy food |
| Đen vàng / sang | `#1C1C1C` (near-black) | `#F5C842` (gold) | Fine dining, nhà hàng cao cấp |
| Cam đất / Mediterranean | `#C2410C` (orange-700) | `#FFF7ED` | Quán pizza, pasta, Tây |

---

## Sections thường có trong template restaurant

| Section | Bắt buộc | Mô tả |
|---------|:--------:|-------|
| **Hero** | ✅ | Ảnh món ăn đẹp + tên quán + giờ mở cửa + CTA đặt bàn |
| **Thực đơn** | ✅ | Phân theo danh mục, có ảnh + giá + mô tả |
| **Đặt bàn / Đặt món** | ✅ | Form hoặc link Zalo/phone đặt trước |
| **Món nổi bật** | ✅ | 4-6 món signature với ảnh lớn |
| **About / Story** | 🟡 | Lịch sử quán, triết lý ẩm thực |
| **Gallery không gian** | 🟡 | Ảnh bên trong, phòng VIP, không gian |
| **Khuyến mãi** | 🟡 | Combo, set lunch, happy hour |
| **Testimonials** | 🟡 | Review khách hàng + rating |
| **Chứng nhận** | 🟡 | VSATTP, Michelin Bib Gourmand nếu có |
| **Contact + Map** | ✅ | SĐT, địa chỉ, giờ mở cửa theo ngày, parking |

---

## imageSlots điển hình

```ts
imageSlots: [
  { key: 'heroBg',       label: 'Ảnh nền Hero',         defaultUrl: '...' },
  { key: 'logo',         label: 'Logo',                  defaultUrl: '' },
  { key: 'signature_0',  label: 'Món Signature 1',      defaultUrl: '...' },
  { key: 'signature_1',  label: 'Món Signature 2',      defaultUrl: '...' },
  { key: 'signature_2',  label: 'Món Signature 3',      defaultUrl: '...' },
  { key: 'gallery_0',    label: 'Không gian 1',         defaultUrl: '...' },
  { key: 'gallery_1',    label: 'Không gian 2',         defaultUrl: '...' },
  { key: 'gallery_2',    label: 'Không gian 3',         defaultUrl: '...' },
  { key: 'avatar_0',     label: 'Avatar review 1',      defaultUrl: '...' },
  { key: 'avatar_1',     label: 'Avatar review 2',      defaultUrl: '...' },
]
```

---

## vi.json skeleton

```json
{
  "meta": {
    "siteName": "Tên Nhà Hàng",
    "tagline": "Hương vị đậm đà, không gian ấm cúng"
  },
  "hero": {
    "title": "Tên Nhà Hàng",
    "subtitle": "Ẩm thực truyền thống Việt Nam",
    "ctaText": "Đặt bàn ngay",
    "ctaLink": "#contact",
    "hours": "10:00 - 22:00 | Thứ 2 - Chủ nhật"
  },
  "menu": {
    "title": "Thực Đơn",
    "categories": ["Khai Vị", "Món Chính", "Tráng Miệng", "Đồ Uống"],
    "items": [
      {
        "name": "Tên món",
        "price": "125,000đ",
        "desc": "Mô tả ngắn về món ăn",
        "category": "Món Chính"
      }
    ]
  },
  "signature": {
    "title": "Món Đặc Biệt",
    "subtitle": "Tinh hoa ẩm thực của chúng tôi",
    "items": [
      { "name": "Tên món", "price": "250,000đ", "desc": "Mô tả" }
    ]
  },
  "booking": {
    "title": "Đặt Bàn Trước",
    "subtitle": "Chúng tôi sẽ chuẩn bị tốt nhất cho bạn",
    "phone": "0901 234 567",
    "zaloUrl": "https://zalo.me/",
    "note": "Đặt trước ít nhất 2 tiếng"
  },
  "contact": {
    "phone": "0901 234 567",
    "address": "123 Đường ABC, Q.1, TP.HCM",
    "hours": "10:00 - 22:00 hàng ngày",
    "parking": "Có bãi đỗ xe miễn phí",
    "mapUrl": "",
    "facebookUrl": "https://facebook.com/"
  }
}
```

---

## Lưu ý thiết kế

- **Ảnh món ăn:** Phải rõ nét, ánh sáng tốt — là yếu tố quyết định conversion
- **CTA đặt bàn:** Luôn sticky hoặc hiển thị nổi bật, đặc biệt trên mobile
- **Giờ mở cửa:** Hiển thị rõ ràng ngay trên hero — khách cần biết ngay
- **Font:** Serif hoặc semi-serif cho tone sang trọng (Playfair Display, Lora)
- **Ảnh gallery không gian:** Quan trọng để khách biết không gian trước khi đến
