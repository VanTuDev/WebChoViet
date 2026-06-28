# Category: Thiệp Cưới Online

**Category ID:** `wedding`
**Label sidebar:** Thiệp Cưới

---

## Dành cho ai

Cặp đôi muốn tạo thiệp cưới kỹ thuật số (digital wedding invitation) để chia sẻ qua Zalo/Facebook.
Thay thế hoàn toàn thiệp giấy — tiết kiệm, hiện đại, có thể cập nhật thông tin thực tế.

---

## Templates hiện có

> Chưa có template. Xem hướng dẫn thêm template trong `docs/skill-add-template.md`.

---

## Naming convention

```
Folder:      Wedding-1/, Wedding-2/, ...
Template ID: wedding-1, wedding-2, ...
```

---

## Palette màu phổ biến

| Phong cách | Màu chính | Màu phụ | Gợi ý dùng |
|------------|-----------|---------|------------|
| Trắng - Vàng gold | `#B8860B` (dark-goldenrod) | `#FFFFF5` | Classic, sang trọng |
| Hồng nude pastel | `#D4A5A5` (rose) | `#FDF8F8` | Lãng mạn, nữ tính |
| Xanh dương nhạt | `#93C5FD` (blue-300) | `#F0F9FF` | Biển, mùa hè |
| Xanh lá sage | `#86EFAC` (green-300) | `#F0FDF4` | Garden wedding, tự nhiên |
| Tím lavender | `#C4B5FD` (violet-300) | `#F5F3FF` | Lãng mạn, fairy tale |
| Đen trắng tối giản | `#1C1917` | `#FAFAF9` | Hiện đại, editorial |

---

## Sections thường có trong template wedding

| Section | Bắt buộc | Mô tả |
|---------|:--------:|-------|
| **Cover / Hero** | ✅ | Ảnh đôi + tên cô dâu chú rể + ngày cưới |
| **Đếm ngược** | ✅ | Countdown timer đến ngày cưới (dùng JS) |
| **Lời mời** | ✅ | Nội dung thiệp mời trang trọng |
| **Thông tin tiệc** | ✅ | Ngày giờ, địa điểm, địa chỉ |
| **Bản đồ đường đi** | ✅ | Google Maps embed đến địa điểm tổ chức |
| **Gallery ảnh đôi** | 🟡 | Pre-wedding photos |
| **Timeline** | 🟡 | Chương trình buổi lễ, tiệc |
| **RSVP / Xác nhận** | 🟡 | Form xác nhận tham dự (link Google Form hoặc số điện thoại) |
| **Lời cảm ơn** | 🟡 | Lời nhắn từ cô dâu chú rể |
| **Tài khoản ngân hàng** | 🟡 | Nếu muốn nhận mừng cưới chuyển khoản |
| **Nhạc nền** | 🟡 | Autoplay nhạc khi mở thiệp |

---

## imageSlots điển hình

```ts
imageSlots: [
  { key: 'cover',       label: 'Ảnh bìa thiệp',          defaultUrl: '...' },
  { key: 'couple_0',    label: 'Ảnh đôi 1',              defaultUrl: '...' },
  { key: 'couple_1',    label: 'Ảnh đôi 2',              defaultUrl: '...' },
  { key: 'couple_2',    label: 'Ảnh đôi 3',              defaultUrl: '...' },
  { key: 'couple_3',    label: 'Ảnh đôi 4',              defaultUrl: '...' },
  { key: 'couple_4',    label: 'Ảnh đôi 5',              defaultUrl: '...' },
  { key: 'venue',       label: 'Ảnh địa điểm',           defaultUrl: '...' },
  { key: 'bride',       label: 'Ảnh cô dâu riêng',       defaultUrl: '...' },
  { key: 'groom',       label: 'Ảnh chú rể riêng',       defaultUrl: '...' },
]
```

---

## vi.json skeleton

```json
{
  "meta": {
    "siteName": "Thiệp Cưới — Anh & Em",
    "tagline": "Trân trọng kính mời"
  },
  "cover": {
    "groomName": "Văn Anh",
    "brideName": "Thúy Em",
    "weddingDate": "2025-12-25",
    "weddingDateDisplay": "Thứ Năm, ngày 25 tháng 12 năm 2025",
    "tagline": "Hãy cùng chúng tôi chứng kiến ngày hạnh phúc này"
  },
  "invitation": {
    "title": "Trân Trọng Kính Mời",
    "body": "Với tất cả tình cảm trân trọng nhất, gia đình chúng tôi trân trọng kính mời Quý khách đến dự lễ thành hôn của con/cháu chúng tôi."
  },
  "ceremony": {
    "title": "Lễ Thành Hôn",
    "time": "8:00 sáng",
    "date": "Thứ Năm, 25/12/2025",
    "venue": "Nhà hàng Tiệc Cưới ABC",
    "address": "123 Đường XYZ, Quận 1, TP.HCM",
    "note": "Kính mời quý khách đến trước 7:45",
    "mapUrl": ""
  },
  "reception": {
    "title": "Tiệc Cưới",
    "time": "11:00 sáng",
    "date": "Thứ Năm, 25/12/2025",
    "venue": "Nhà hàng Tiệc Cưới ABC",
    "address": "123 Đường XYZ, Quận 1, TP.HCM",
    "mapUrl": ""
  },
  "rsvp": {
    "title": "Xác Nhận Tham Dự",
    "deadline": "Trước ngày 15/12/2025",
    "groomPhone": "0901 111 222",
    "bridePhone": "0901 333 444",
    "groomZalo": "https://zalo.me/0901111222",
    "brideZalo": "https://zalo.me/0901333444"
  },
  "bankTransfer": {
    "title": "Mừng Cưới Chuyển Khoản",
    "groomBank": "Vietcombank",
    "groomAccount": "1234567890",
    "groomName": "NGUYEN VAN ANH",
    "brideBank": "Techcombank",
    "brideAccount": "9876543210",
    "brideName": "TRAN THI THUY EM"
  },
  "message": {
    "title": "Lời Nhắn",
    "body": "Sự hiện diện của bạn sẽ là món quà ý nghĩa nhất trong ngày đặc biệt của chúng tôi. Chúng tôi rất mong được gặp bạn!"
  }
}
```

---

## Lưu ý thiết kế đặc biệt cho Wedding

- **Countdown timer:** Bắt buộc phải có — tính từ `Date.now()` đến `weddingDate` trong vi.json
- **Nhạc nền:** Optional nhưng rất được yêu thích — nên có nút bật/tắt rõ ràng
- **Floral decoration:** Dùng SVG hoặc PNG hoa lá trang trí góc — đặc trưng của thiệp cưới
- **Animation nhẹ:** Fade-in, float, confetti — tạo cảm xúc khi mở thiệp lần đầu
- **Print-friendly:** Một số user muốn in ra — tránh nền tối, background ảnh lớn
- **Font:** Serif lãng mạn (Cormorant Garamond, Playfair Display, Great Vibes cho tên đôi)
- **Responsive:** 100% khách xem trên mobile qua Zalo — tối ưu 360px-430px trước hết
- **Không cần auth:** Thiệp cưới là public URL — không cần đăng nhập để xem

---

## Khác biệt so với các category khác

Wedding template **không có** phần chỉnh sửa kinh doanh (menu, dịch vụ, giá cả).
Thay vào đó tập trung vào:

1. **Thông tin cố định** — tên đôi, ngày giờ, địa điểm
2. **Cảm xúc** — ảnh đẹp, nhạc, animation
3. **Hành động khách** — RSVP, xem bản đồ, chuyển khoản mừng cưới

Đây là category có **vòng đời ngắn** (dùng 1-2 tháng quanh ngày cưới) nhưng **conversion cao** vì nhu cầu rõ ràng và cụ thể.
