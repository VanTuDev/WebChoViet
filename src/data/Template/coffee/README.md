# Category: Coffee & Đồ Uống

**Category ID:** `coffee`
**Label sidebar:** Cafe & Đồ Uống

---

## Dành cho ai

Quán cà phê, trà sữa, nước ép, bubble tea, tiệm trà, bar đồ uống thủ công.
Từ quán nhỏ vỉa hè đến chuỗi coffee shop sang trọng.

---

## Templates hiện có

| ID | Tên | Giá | Đặc điểm nổi bật |
|----|-----|-----|-------------------|
| `coffe-1` | Garden Oasis | Miễn phí | Sân vườn mộc mạc, gallery bento, menu Signature |
| `coffe-2` | Tropical Chill | 299,000đ | Hero slider, menu 3 tabs, FAB giỏ hàng |
| `coffe-3` | The Ocean Cafe | 499,000đ | Phong cách biển, 3 danh mục menu, testimonials sao |
| `coffe-4` | Koi Garden | 399,000đ | Tông Forest Green, gallery koi, menu 4 tabs |
| `coffe-5` | Mật Ngọt Tea | Miễn phí | Trà sữa amber, carousel sản phẩm, newsletter |
| `coffe-6` | Oasis Symphony | 349,000đ | Menu đầy đủ 4 nhóm × 4 món, gallery bento, 4 ngôn ngữ Việt/Anh/Trung/Hàn |

---

## Naming convention

```
Folder:    Coffe-6/, Coffe-7/, ...
Template ID: coffe-6, coffe-7, ...
```

> Giữ nguyên typo "Coffe" (thiếu chữ e) để nhất quán với các template cũ.

---

## Palette màu phổ biến

| Phong cách | Màu chính | Màu phụ | Gợi ý dùng |
|------------|-----------|---------|------------|
| Sân vườn / mộc | `#2E4E3F` (oasis-green) | `#F5E6D0` (warm cream) | Quán vườn, trà đạo |
| Nhiệt đới / trẻ | `#00C896` (tropical) | `#FFF9F0` | Milk tea, nước ép |
| Đại dương / thanh | `#1A4A6B` (ocean) | `#E8F4FD` | Café sang trọng |
| Koi / Forest | `#1B4332` (forest) | `#D8F3DC` | Cao cấp, yên tĩnh |
| Amber / ấm | `#B7791F` (amber) | `#FFFBEB` | Trà sữa thủ công |

---

## Sections thường có trong template coffee

| Section | Bắt buộc | Mô tả |
|---------|:--------:|-------|
| **Hero** | ✅ | Ảnh nền + tên quán + tagline + CTA |
| **Menu / Sản phẩm** | ✅ | Tab hoặc grid, có ảnh + giá |
| **About / Story** | 🟡 | Câu chuyện thương hiệu |
| **Gallery** | 🟡 | Bento grid 4-6 ảnh không gian quán |
| **Testimonials** | 🟡 | 3 đánh giá khách hàng + avatar |
| **Contact** | ✅ | SĐT, địa chỉ, Google Maps embed, mạng xã hội |
| **Footer** | ✅ | Logo + link nhanh + copyright |
| **FAB** | 🟡 | Nút gọi nhanh / đặt hàng nổi |

---

## imageSlots điển hình

```ts
imageSlots: [
  { key: 'heroBg',      label: 'Ảnh nền Hero',    defaultUrl: '...' },
  { key: 'heroMain',    label: 'Ảnh chính Hero',  defaultUrl: '...' },  // nếu có 2 ảnh hero
  { key: 'logo',        label: 'Logo quán',        defaultUrl: '' },
  { key: 'drink_0',     label: 'Đồ uống 1',       defaultUrl: '...' },
  { key: 'drink_1',     label: 'Đồ uống 2',       defaultUrl: '...' },
  { key: 'gallery_0',   label: 'Gallery 1',        defaultUrl: '...' },
  { key: 'gallery_1',   label: 'Gallery 2',        defaultUrl: '...' },
  { key: 'gallery_2',   label: 'Gallery 3',        defaultUrl: '...' },
  { key: 'avatar_0',    label: 'Avatar khách 1',   defaultUrl: '...' },
  { key: 'avatar_1',    label: 'Avatar khách 2',   defaultUrl: '...' },
  { key: 'avatar_2',    label: 'Avatar khách 3',   defaultUrl: '...' },
]
```

---

## vi.json skeleton

```json
{
  "meta": {
    "siteName": "Tên Quán Cafe",
    "tagline": "Nơi thư giãn lý tưởng"
  },
  "hero": {
    "title": "Tiêu đề lớn",
    "subtitle": "Mô tả ngắn",
    "ctaText": "Xem thực đơn",
    "ctaLink": "#menu"
  },
  "menu": {
    "title": "Thực Đơn",
    "tabs": ["Signature", "Cà Phê", "Trà"],
    "items": [
      { "name": "Tên món", "price": "55,000đ", "desc": "Mô tả" }
    ]
  },
  "gallery": {
    "title": "Không Gian Quán"
  },
  "testimonials": {
    "title": "Khách Hàng Nói Gì",
    "items": [
      { "name": "Nguyễn Văn A", "role": "Khách thường xuyên", "text": "Nội dung review...", "rating": "5" }
    ]
  },
  "contact": {
    "phone": "0901 234 567",
    "address": "123 Đường ABC, Q.1, TP.HCM",
    "hours": "7:00 - 22:00 hàng ngày",
    "mapUrl": "",
    "facebookUrl": "https://facebook.com/",
    "instagramUrl": "https://instagram.com/",
    "zaloUrl": "https://zalo.me/"
  }
}
```
