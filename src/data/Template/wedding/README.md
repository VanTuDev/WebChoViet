# Category: Thiệp Cưới Online

**Category ID:** `wedding`
**Label sidebar:** Thiệp Cưới

---

## Dành cho ai

Cặp đôi muốn tạo thiệp cưới kỹ thuật số (digital wedding invitation) để chia sẻ qua Zalo/Facebook.
Thay thế hoàn toàn thiệp giấy — tiết kiệm, hiện đại, có thể cập nhật thông tin thực tế.

---

## Templates hiện có

| ID | Tên | Giá | Đặc điểm nổi bật |
|----|-----|-----|-------------------|
| `wedding-1` | Thiệp Hồng | Miễn phí | Tông vàng gold, câu chuyện tình yêu, timeline, RSVP tương tác |
| `wedding-2` | Ánh Bạc | 299,000đ | Navy & Gold, countdown timer thực, gallery hover-reveal |
| `wedding-3` | Thành Hỷ | 249,000đ | Cổ điển kem-vàng, khung ornament, save-the-date dạng lịch, song ngữ Việt/Anh |
| `wedding-4` | Di Sản Vĩnh Cửu | 249,000đ | "Timeless Heritage" tối giản — trình bày dạng **1 tấm thiệp dọc duy nhất** căn giữa nền trắng (xem mục [Layout dạng thiệp đơn](#layout-dạng-thiệp-đơn-single-card) bên dưới), hoạ tiết hoa lá vector viền tay tự vector hoá từ ảnh line-art, RSVP có nút gọi/Zalo trực tiếp |

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
- **Font:** Chỉ dùng font đã load sẵn toàn cục ở `index.html` gốc — `font-display` (Playfair
  Display, serif sang trọng, đủ dấu tiếng Việt) cho tên đôi/tiêu đề, `font-sans`/`font-inter`
  (Be Vietnam Pro) cho phần thân. KHÔNG tự thêm `<link>` Google Fonts khác (Cormorant Garamond,
  Great Vibes...) trong `index.tsx` — React component không có chỗ nào đáng tin cậy để inject
  vào `<head>`, và mỗi font thêm riêng cho 1 template sẽ không xuất hiện khi site đã publish.
- **Responsive:** 100% khách xem trên mobile qua Zalo — tối ưu 360px-430px trước hết
- **Không cần auth:** Thiệp cưới là public URL — không cần đăng nhập để xem

---

## Layout dạng thiệp đơn (single-card)

`wedding-4` giới thiệu 1 kiểu trình bày khác hẳn `wedding-1/2/3` (vốn là trang landing
nhiều section rộng full-bleed): toàn bộ nội dung nằm trong **đúng 1 khung thiệp dọc**,
căn giữa trên nền trắng, mô phỏng 1 tấm thiệp giấy vật lý đặt trên bàn. Dùng kiểu này khi
brief yêu cầu cảm giác "thiệp mời" cổ điển thay vì "website cưới" hiện đại nhiều block.

Rút kinh nghiệm từ session làm `wedding-4` — 3 quy tắc bắt buộc nếu làm thêm template theo
hướng này (xem chi tiết + rationale đầy đủ ở `Wedding-4/DESIGN.md` mục "Layout & Spacing"):

1. **Bề rộng khung thiệp phải cố định bằng px/rem, KHÔNG dùng `vw`.** `TemplateEditorPage`
   render preview desktop qua 1 pane có thể bị co/scale để vừa layout editor — `vw` sẽ tính
   theo bề ngang cửa sổ trình duyệt thật rồi bị scale chồng thêm lần nữa, ra kích thước sai
   khác nhau giữa marketplace preview / editor / site đã publish. Dùng 1 giá trị cố định
   (vd `sm:w-105` = 420px) cho kết quả nhất quán ở mọi nơi.
2. **Không dùng breakpoint `sm:`/`md:`/`lg:` cho layout BÊN TRONG khung thiệp** — các
   breakpoint này tính theo viewport thật của trình duyệt chứ không phải bề rộng khung
   thiệp, nên sẽ kích hoạt sai (vd bật `grid-cols-2` cho desktop) ngay cả khi khung thiệp
   vẫn đang hẹp ~400px. Chỉ dùng breakpoint đúng 1 chỗ duy nhất: khai báo bề rộng khung.
3. **Grid nhiều cột kiểu trang rộng phải đổi thành xếp dọc 1 cột** (nhà trai/nhà gái, danh
   sách liên hệ...) — ở bề rộng ~370-400px sau khi trừ padding, 2 cột cạnh nhau làm tên
   riêng/số điện thoại vỡ dòng xấu. Chỉ giữ 2 cột cho cặp số liệu thật ngắn (giờ/ngày).

---

## Khác biệt so với các category khác

Wedding template **không có** phần chỉnh sửa kinh doanh (menu, dịch vụ, giá cả).
Thay vào đó tập trung vào:

1. **Thông tin cố định** — tên đôi, ngày giờ, địa điểm
2. **Cảm xúc** — ảnh đẹp, nhạc, animation
3. **Hành động khách** — RSVP, xem bản đồ, chuyển khoản mừng cưới

Đây là category có **vòng đời ngắn** (dùng 1-2 tháng quanh ngày cưới) nhưng **conversion cao** vì nhu cầu rõ ràng và cụ thể.
