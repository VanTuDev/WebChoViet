# Category: Gym & Thể Thao

**Category ID:** `gym`
**Label sidebar:** Gym & Thể Thao

---

## Dành cho ai

Phòng gym, trung tâm fitness, yoga studio, pilates, boxing, võ thuật,
sân bóng, sân tennis, hồ bơi, trung tâm thể thao đa năng.

---

## Templates hiện có

| ID | Tên | Giá | Đặc điểm nổi bật |
|----|-----|-----|-------------------|
| `gym-1` | Iron Zone | Miễn phí | Tông tối accent cam, hero fullscreen tối, grid 6 chương trình tập, bảng giá 3 gói |
| `gym-2` | Crimson Peak | Miễn phí | Tông đen - đỏ crimson, glassmorphism 3D, bento công nghệ độc bản, stat bar hiệu suất |
| `gym-3` | Terra Strength | Miễn phí | Tông bronze ấm áp cao cấp, bento 3 dịch vụ đặc quyền (gym/PT/yoga), tactile neomorphism |
| `gym-4` | Aether Fitness | Miễn phí | Tông đen - cyan - tím vũ trụ tương lai, section công nghệ Aura-Sense, 3 chương trình Nebula Space |

---

## Naming convention

```
Folder:      Gym-1/, Gym-2/, ...
Template ID: gym-1, gym-2, ...
```

---

## Palette màu phổ biến

| Phong cách | Màu chính | Màu phụ | Gợi ý dùng |
|------------|-----------|---------|------------|
| Đen - Đỏ | `#DC2626` (red) | `#0A0A0A` (black) | Gym mạnh mẽ, boxing |
| Đen - Vàng | `#EAB308` (yellow) | `#111827` (gray-900) | Gym cao cấp, premium |
| Xanh dương | `#1D4ED8` (blue) | `#EFF6FF` | Fitness, thể dục chung |
| Xanh lá | `#15803D` (green) | `#F0FDF4` | Yoga, pilates, wellness |
| Cam năng động | `#EA580C` (orange) | `#FFF7ED` | CrossFit, HIIT, năng động |
| Tím | `#7C3AED` (violet) | `#F5F3FF` | Yoga nữ, mindfulness |

---

## Sections thường có trong template gym

| Section | Bắt buộc | Mô tả |
|---------|:--------:|-------|
| **Hero** | ✅ | Full-screen video hoặc ảnh impact + slogan mạnh + CTA đăng ký |
| **Dịch vụ / Lớp học** | ✅ | Grid các chương trình: Yoga / Boxing / HIIT / PT... |
| **Lịch tập** | 🟡 | Bảng lịch theo ngày trong tuần |
| **Đăng ký / Gói tập** | ✅ | Bảng giá các gói: Tháng / Quý / Năm / PT |
| **Facilities** | 🟡 | Thiết bị, không gian, tiện ích (shower, locker...) |
| **Huấn luyện viên** | 🟡 | Hồ sơ PT: ảnh, chuyên môn, chứng chỉ |
| **Transformation** | 🟡 | Before/After thành viên thành công |
| **Gallery** | 🟡 | Không gian phòng tập, thiết bị, buổi tập |
| **Testimonials** | 🟡 | Review thành viên, video testimonial |
| **Trial / Free Pass** | 🟡 | CTA dùng thử miễn phí — rất hiệu quả |
| **Contact + Map** | ✅ | SĐT, địa chỉ, giờ mở cửa (thường 5:00-23:00) |

---

## imageSlots điển hình

```ts
imageSlots: [
  { key: 'heroBg',        label: 'Ảnh nền Hero',           defaultUrl: '...' },
  { key: 'logo',          label: 'Logo',                    defaultUrl: '' },
  { key: 'program_0',     label: 'Chương trình 1',         defaultUrl: '...' },
  { key: 'program_1',     label: 'Chương trình 2',         defaultUrl: '...' },
  { key: 'program_2',     label: 'Chương trình 3',         defaultUrl: '...' },
  { key: 'facility_0',    label: 'Cơ sở vật chất 1',      defaultUrl: '...' },
  { key: 'facility_1',    label: 'Cơ sở vật chất 2',      defaultUrl: '...' },
  { key: 'trainer_0',     label: 'Huấn luyện viên 1',     defaultUrl: '...' },
  { key: 'trainer_1',     label: 'Huấn luyện viên 2',     defaultUrl: '...' },
  { key: 'trainer_2',     label: 'Huấn luyện viên 3',     defaultUrl: '...' },
  { key: 'before_0',      label: 'Ảnh Before 1',          defaultUrl: '...' },
  { key: 'after_0',       label: 'Ảnh After 1',           defaultUrl: '...' },
  { key: 'avatar_0',      label: 'Avatar review 1',       defaultUrl: '...' },
]
```

---

## vi.json skeleton

```json
{
  "meta": {
    "siteName": "Tên Phòng Gym",
    "tagline": "Nơi bắt đầu hành trình thay đổi"
  },
  "hero": {
    "title": "Phá Vỡ Giới Hạn Của Bạn",
    "subtitle": "Huấn luyện viên chuyên nghiệp — Trang thiết bị hiện đại",
    "ctaText": "Tập thử miễn phí",
    "ctaLink": "#trial",
    "badge": "1 buổi tập thử MIỄN PHÍ"
  },
  "programs": {
    "title": "Chương Trình Tập Luyện",
    "items": [
      {
        "name": "Yoga & Mindfulness",
        "desc": "Cân bằng thân tâm, cải thiện linh hoạt",
        "schedule": "T2, T4, T6 — 7:00 & 18:00"
      },
      {
        "name": "HIIT Cardio",
        "desc": "Đốt mỡ cực hiệu quả trong 45 phút",
        "schedule": "T3, T5, T7 — 6:00 & 19:00"
      }
    ]
  },
  "pricing": {
    "title": "Gói Tập",
    "subtitle": "Chọn gói phù hợp với bạn",
    "plans": [
      { "name": "Gói Tháng", "price": "500,000đ/tháng", "features": "Tập không giới hạn, Locker miễn phí" },
      { "name": "Gói Quý", "price": "1,200,000đ/3 tháng", "features": "Tiết kiệm 20%, 1 buổi PT miễn phí", "highlight": "true" },
      { "name": "Gói Năm", "price": "3,600,000đ/năm", "features": "Tiết kiệm 40%, 5 buổi PT miễn phí" }
    ]
  },
  "trainers": {
    "title": "Đội Ngũ Huấn Luyện Viên",
    "items": [
      {
        "name": "Nguyễn Văn A",
        "role": "Head PT — Chuyên gia tăng cơ",
        "cert": "ACE Certified Personal Trainer",
        "exp": "8 năm kinh nghiệm"
      }
    ]
  },
  "stats": {
    "members": "2,500+",
    "trainers": "15",
    "years": "5",
    "area": "1,200m²"
  },
  "trial": {
    "title": "Tập Thử 1 Buổi Miễn Phí",
    "desc": "Không cần cam kết — Trải nghiệm trực tiếp",
    "phone": "0901 234 567",
    "zaloUrl": "https://zalo.me/"
  },
  "contact": {
    "phone": "0901 234 567",
    "address": "123 Đường ABC, Q.1, TP.HCM",
    "hours": "5:30 - 23:00 hàng ngày",
    "parking": "Có bãi đỗ xe",
    "mapUrl": "",
    "facebookUrl": "https://facebook.com/",
    "youtubeUrl": "https://youtube.com/"
  }
}
```

---

## Lưu ý thiết kế

- **Ảnh hero:** Phải mạnh mẽ, năng lượng cao — ảnh người đang tập, không phải thiết bị tĩnh
- **Typography:** Bold, mạnh mẽ — font condensed như Bebas Neue, Barlow Condensed
- **Dark theme:** Gym thường dùng nền tối + accent màu mạnh — khác hoàn toàn cafe/spa
- **Stats section:** Số liệu ấn tượng (số thành viên, năm hoạt động, diện tích) — tăng credibility
- **CTA "tập thử miễn phí":** Conversion tốt nhất cho gym — luôn xuất hiện ít nhất 2 lần
- **Mobile:** Khách xem lịch tập, đặt lịch PT qua điện thoại — responsive hoàn hảo
