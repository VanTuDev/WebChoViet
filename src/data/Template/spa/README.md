# Category: Spa & Làm Đẹp

**Category ID:** `spa`
**Label sidebar:** Spa & Làm Đẹp

---

## Dành cho ai

Spa, nail salon, hair salon, thẩm mỹ viện, phòng khám da liễu thẩm mỹ,
massage trị liệu, yoga studio, wellness center.

---

## Templates hiện có

| ID | Tên | Giá | Đặc điểm nổi bật |
|----|-----|-----|-------------------|
| `spa-1` | Aura Clinic | Miễn phí | Phòng khám da liễu trị mụn công nghệ cao, bento điểm mạnh, khu vực tin cậy |
| `spa-2` | Aura Wellness | 299,000đ | Hành trình làm đẹp tự nhiên, gallery không gian, đội ngũ chuyên viên |
| `spa-4` | Luminous Precision Clinic | 299,000đ | Clinic thẩm mỹ công nghệ cao, quy trình lâm sàng, hành trình dịch vụ |
| `spa-5` | Zenith | Miễn phí | Wellness tối giản, dịch vụ thiền/yoga/detox, không gian zen |
| `spa-6` | Ocean Oasis | 299,000đ | Spa chủ đề đại dương, thủy trị liệu, không gian thư giãn |

---

## Naming convention

```
Folder:      Spa-1/, Spa-2/, ...
Template ID: spa-1, spa-2, ...
```

---

## Palette màu phổ biến

| Phong cách | Màu chính | Màu phụ | Gợi ý dùng |
|------------|-----------|---------|------------|
| Trắng - Nude | `#E8D5C4` (nude) | `#FBF8F5` (off-white) | Spa cao cấp, tối giản |
| Hồng pastel | `#F9A8D4` (pink) | `#FDF2F8` | Nail salon, beauty |
| Xanh ngọc | `#0D9488` (teal) | `#F0FDFA` | Spa thiên nhiên, detox |
| Tím lavender | `#8B5CF6` (violet) | `#F5F3FF` | Aromatherapy, wellness |
| Vàng vàng / gold | `#D4AF37` (gold) | `#FFFDF5` | Luxury spa, VIP treatment |
| Đen tối giản | `#1C1917` (near-black) | `#F7F3EE` | High-end, editorial |

---

## Sections thường có trong template spa

| Section | Bắt buộc | Mô tả |
|---------|:--------:|-------|
| **Hero** | ✅ | Ảnh không gian spa + tagline thư giãn + CTA đặt lịch |
| **Dịch vụ** | ✅ | Grid hoặc tab: massage / facial / nail / body / hair |
| **Đặt lịch** | ✅ | Nổi bật nhất — form hoặc link Zalo/phone |
| **Bảng giá** | ✅ | Rõ ràng, đầy đủ, kèm thời gian thực hiện |
| **About / Team** | 🟡 | Chuyên viên kỹ thuật, chứng chỉ, kinh nghiệm |
| **Gallery** | 🟡 | Không gian, kết quả before/after |
| **Testimonials** | 🟡 | Review khách hàng đã dùng dịch vụ |
| **Ưu đãi / Membership** | 🟡 | Gói thành viên, combo tiết kiệm |
| **Blog / Tips** | 🟡 | Bí quyết làm đẹp, chăm sóc da |
| **Contact + Map** | ✅ | SĐT, địa chỉ, giờ phục vụ |

---

## imageSlots điển hình

```ts
imageSlots: [
  { key: 'heroBg',       label: 'Ảnh nền Hero',           defaultUrl: '...' },
  { key: 'logo',         label: 'Logo',                    defaultUrl: '' },
  { key: 'service_0',    label: 'Dịch vụ 1',              defaultUrl: '...' },
  { key: 'service_1',    label: 'Dịch vụ 2',              defaultUrl: '...' },
  { key: 'service_2',    label: 'Dịch vụ 3',              defaultUrl: '...' },
  { key: 'space_0',      label: 'Không gian 1',           defaultUrl: '...' },
  { key: 'space_1',      label: 'Không gian 2',           defaultUrl: '...' },
  { key: 'space_2',      label: 'Không gian 3',           defaultUrl: '...' },
  { key: 'staff_0',      label: 'Chuyên viên 1',          defaultUrl: '...' },
  { key: 'staff_1',      label: 'Chuyên viên 2',          defaultUrl: '...' },
  { key: 'avatar_0',     label: 'Avatar review 1',        defaultUrl: '...' },
  { key: 'avatar_1',     label: 'Avatar review 2',        defaultUrl: '...' },
  { key: 'avatar_2',     label: 'Avatar review 3',        defaultUrl: '...' },
]
```

---

## vi.json skeleton

```json
{
  "meta": {
    "siteName": "Tên Spa",
    "tagline": "Tái sinh năng lượng, tỏa sáng mỗi ngày"
  },
  "hero": {
    "title": "Trải Nghiệm Thư Giãn Đích Thực",
    "subtitle": "Không gian yên tĩnh, dịch vụ chuyên nghiệp",
    "ctaText": "Đặt lịch ngay",
    "ctaLink": "#booking"
  },
  "services": {
    "title": "Dịch Vụ Của Chúng Tôi",
    "subtitle": "Được thiết kế riêng cho bạn",
    "items": [
      {
        "name": "Massage Body Thư Giãn",
        "price": "350,000đ",
        "duration": "60 phút",
        "desc": "Xua tan mệt mỏi, tái tạo năng lượng"
      },
      {
        "name": "Facial Trị Liệu",
        "price": "450,000đ",
        "duration": "90 phút",
        "desc": "Phục hồi và dưỡng sáng làn da"
      }
    ]
  },
  "booking": {
    "title": "Đặt Lịch Hẹn",
    "subtitle": "Chúng tôi sẽ liên hệ xác nhận trong 15 phút",
    "phone": "0901 234 567",
    "zaloUrl": "https://zalo.me/",
    "note": "Khuyến nghị đặt trước 24 giờ"
  },
  "team": {
    "title": "Đội Ngũ Chuyên Viên",
    "subtitle": "Được đào tạo bài bản, kinh nghiệm trên 5 năm",
    "items": [
      { "name": "Nguyễn Thị A", "role": "Chuyên viên Massage", "exp": "7 năm kinh nghiệm" }
    ]
  },
  "testimonials": {
    "title": "Khách Hàng Nói Gì",
    "items": [
      { "name": "Trần Thị B", "text": "Dịch vụ tuyệt vời, không gian rất thư giãn!", "rating": "5" }
    ]
  },
  "contact": {
    "phone": "0901 234 567",
    "address": "123 Đường ABC, Q.1, TP.HCM",
    "hours": "8:00 - 21:00 hàng ngày",
    "mapUrl": "",
    "facebookUrl": "https://facebook.com/",
    "instagramUrl": "https://instagram.com/",
    "zaloUrl": "https://zalo.me/"
  }
}
```

---

## Lưu ý thiết kế

- **Tone:** Nhẹ nhàng, tĩnh lặng — tránh màu quá sặc sỡ hoặc font quá đậm
- **Whitespace:** Nhiều khoảng trống — tạo cảm giác thư giãn ngay từ nhìn đầu tiên
- **Ảnh:** Nhất thiết phải dùng ảnh studio chuyên nghiệp — ảnh mờ/tối giảm mạnh conversion
- **CTA đặt lịch:** Phải xuất hiện ít nhất 3 lần (hero, sau dịch vụ, footer)
- **Chứng nhận:** Nếu có chứng chỉ quốc tế/bộ y tế — hiển thị nổi bật, tăng trust
- **Before/After:** Rất hiệu quả cho thẩm mỹ viện và laser clinic
