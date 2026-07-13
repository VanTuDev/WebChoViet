# Category: Villa & Homestay

**Category ID:** `villa`
**Label sidebar:** Homestay & Villa

---

## Dành cho ai

Villa nghỉ dưỡng, homestay, bungalow cho thuê — từ villa view biển, villa núi rừng,
đến homestay mang đậm bản sắc văn hoá vùng miền (Tây Nguyên, Tây Bắc...).

---

## Naming convention

```
Folder:      Villa-1/, Villa-2/, ...
Template ID: villa-1, villa-2, ...
```

---

## Sections thường có trong template villa

| Section | Bắt buộc | Mô tả |
|---------|:--------:|-------|
| **Hero** | ✅ | Ảnh nền villa + tên + tagline + CTA đặt phòng |
| **Rooms / Room types** | ✅ | Danh sách loại phòng/villa: ảnh, tên, giá/đêm, sức chứa (thay cho "menu" ở category ẩm thực) |
| **Amenities / Tiện nghi** | ✅ | Grid icon lucide + nhãn (wifi, hồ bơi, bãi đỗ xe, bếp, an ninh 24/7...) |
| **Gallery** | 🟡 | Ảnh không gian villa |
| **Testimonials / Đánh giá khách** | ✅ | 3 đánh giá khách + rating sao (lucide `Star`) + avatar |
| **Contact** | ✅ | SĐT, địa chỉ, Google Maps embed (`mapUrl`), mạng xã hội |
| **Footer** | ✅ | Logo + link nhanh + copyright |

Lưu ý: category `villa` KHÔNG có trong `REQUIRED_SECTIONS` của
`scripts/validate-templates.mjs` (chỉ coffee/restaurant/gym/spa/wedding
mới bị validator ép buộc section riêng) — nhưng vẫn PHẢI có Rooms + Testimonials
theo bảng trên để đúng kỳ vọng người mua, và `mapUrl` vẫn là bắt buộc chung cho
mọi category (xem `.claude/skills/template-rules/SKILL.md`).

---

## imageSlots điển hình

```ts
imageSlots: [
  { key: 'heroBg',    label: 'Ảnh nền Hero',  defaultUrl: '...' },
  { key: 'room_0',    label: 'Phòng 1',        defaultUrl: '...' },
  { key: 'room_1',    label: 'Phòng 2',        defaultUrl: '...' },
  { key: 'room_2',    label: 'Phòng 3',        defaultUrl: '...' },
  { key: 'gallery_0', label: 'Gallery 1',      defaultUrl: '...' },
  { key: 'gallery_1', label: 'Gallery 2',      defaultUrl: '...' },
  { key: 'gallery_2', label: 'Gallery 3',      defaultUrl: '...' },
  { key: 'avatar_0',  label: 'Avatar khách 1', defaultUrl: '...' },
  { key: 'avatar_1',  label: 'Avatar khách 2', defaultUrl: '...' },
  { key: 'avatar_2',  label: 'Avatar khách 3', defaultUrl: '...' },
]
```

## Templates hiện có

| ID | Tên | Chủ đề |
|----|-----|--------|
| `villa-1` | Serenity Villa | Thiền tối giản Nhật Bản |
| `villa-2` | Serenity Villa Deluxe | Bản mở rộng, nhiều tiện nghi + chính sách đặt phòng |
| `villa-3` | Phong Nha Wilderness Villa | Núi rừng hoang sơ Quảng Bình |
| `villa-4` | Rông Highland Villa | Văn hoá Tây Nguyên |
| `villa-5` | Serenity Sea-View Villa | View biển |
| `villa-6` | H'Mong Cliff Villa | Vách núi Tây Bắc |
| `villa-7` | The Hill Villas | Đồi rừng Phong Nha |
