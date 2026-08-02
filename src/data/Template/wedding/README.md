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
- **Nhạc nền:** Optional nhưng rất được yêu thích. Ưu tiên kiểu **list nhạc cho khách tự
  chọn bài** (xem `Wedding-4/index.tsx` — nút tròn nổi mở panel liệt kê track, bấm 1 bài
  để phát/dừng) thay vì chỉ 1 bài autoplay cố định — sinh động hơn và khách có thể đổi
  bài nếu không thích bài đang phát. `src` từng bài để trống sẵn trong `i18n/*.json`, chủ
  tiệc tự điền link file mp3 sau qua panel tùy chỉnh (giống hệt cơ chế `mapUrl`, không
  cần thêm capability upload nào mới). Nút nổi đặt góc **dưới-TRÁI** (`fixed bottom-5
  left-5`) — góc dưới-phải đã bị badge "Made with vngoweb" của `PublicSitePage.tsx` chiếm
  cố định trên MỌI site đã publish (`fixed bottom-5 right-5`), đặt cùng chỗ sẽ đè lên nhau.
- **Floral decoration:** Dùng SVG hoặc PNG hoa lá trang trí góc — đặc trưng của thiệp cưới
- **Animation nhẹ:** Fade-in, float, confetti — tạo cảm xúc khi mở thiệp lần đầu
- **Print-friendly:** Một số user muốn in ra — tránh nền tối, background ảnh lớn
- **Font — chỉ dùng 2 font đã load sẵn toàn cục ở `index.html` gốc, đã tự kiểm tra tận
  mắt (chụp màn hình phóng to @2x, dấu thanh/dấu mũ tiếng Việt không vỡ, không tofu) nên
  yên tâm dùng cho MỌI template wedding tiếp theo:**
  - `font-display` (Playfair Display) — cho tên đôi/tiêu đề lớn, chỉ load sẵn 2 style:
    normal weight 600/700/800/900 và **italic CHỈ ở weight 700**. Dùng `italic` mà không
    ép `font-bold`/`font-normal` cụ thể là an toàn (trình duyệt tự khớp về weight 700
    italic có sẵn); đừng ép `font-weight` nhẹ hơn cho chữ `italic` vì face đó không tồn
    tại, trình duyệt sẽ phải chọn lại theo thuật toán riêng, không kiểm soát được.
  - `font-sans` / `font-inter` (Be Vietnam Pro) — cho toàn bộ phần thân, font thiết kế
    riêng cho tiếng Việt nên luôn an toàn ở mọi weight đã load (400/500/600/700).
  - **TUYỆT ĐỐI không tự thêm `<link>` Google Fonts khác** (Cormorant Garamond, Great
    Vibes, Dancing Script, Alex Brush, Sacramento, Parisienne, Playball...) trong
    `index.tsx` dù trông "sang" hơn cho thiệp cưới — React component không có chỗ nào
    đáng tin cậy để inject vào `<head>` (không xuất hiện khi site đã publish), và phần
    lớn font script/cursive kiểu Tây trên Google Fonts **không có bảng chữ Việt** (chỉ
    hỗ trợ Latin cơ bản) → chữ có dấu sẽ tự động rớt xuống font dự phòng giữa chừng, vỡ
    layout ngay chỗ chữ có dấu. Nếu thật sự cần thêm 1 font mới cho cả hệ thống, phải
    thêm vào `<link>` chung ở `index.html` gốc VÀ tự kiểm tra bằng cách chụp màn hình
    phóng to như trên trước khi coi là xong — không suy đoán qua tên font.
  - **Số liệu lớn (giờ, ngày, năm — vd "09:00", "18:00", "2026") dùng `font-sans` +
    `font-bold` + `tabular-nums`, KHÔNG dùng `font-display`.** Bộ số của Playfair Display
    có nét trang trí đặc trưng (high-contrast, chân serif cách điệu) rất đẹp cho CHỮ
    nhưng nhìn không "chuẩn"/dễ đọc khi đứng riêng một mình làm số hiển thị lớn — người
    dùng đã phản hồi trực tiếp về việc này ở `Wedding-4`. Be Vietnam Pro có bộ số hình
    học rõ ràng, `tabular-nums` giữ các chữ số cùng độ rộng (đẹp khi xếp cạnh nhau kiểu
    "03 | Tháng 01"). Chỉ dùng `font-display` cho CHỮ (tên đôi, tiêu đề, tên riêng),
    không bao giờ dùng cho khối hiển thị thuần số.
- **Lịch mini "Save the Date":** dùng hook dùng chung `useCalendarMonth` (`_shared/`,
  xem `_shared/README.md` mục "Cách dùng `useCalendarMonth`") để tính ô trống đầu bảng +
  số ngày trong tháng — KHÔNG tự nhẩm tay bằng hằng số cố định như `Wedding-4` bản đầu
  (dễ tính sai khi đổi ngày cưới, không ai kiểm chứng lại).
- **Bản đồ đường đi — BẮT BUỘC, không phải optional dù bảng "Sections" bên dưới đánh dấu
  ✅:** khách đọc thiệp cần biết đường tới nơi tổ chức thật. Nhúng Google Maps qua
  `toGoogleMapsEmbedUrl` (xem `.claude/skills/template-rules/SKILL.md` mục 1) với fallback
  đẹp khi `mapUrl` rỗng — không để trống trắng, tối thiểu phải có địa chỉ dạng chữ +
  nút "chỉ đường" mở Google Maps search theo địa chỉ đó.
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
   (`Wedding-4` dùng `sm:w-120` = 480px, đã tăng từ 420px ban đầu theo phản hồi "nhìn vẫn
   nhỏ") cho kết quả nhất quán ở mọi nơi.
2. **Không dùng breakpoint `sm:`/`md:`/`lg:` cho layout BÊN TRONG khung thiệp** — các
   breakpoint này tính theo viewport thật của trình duyệt chứ không phải bề rộng khung
   thiệp, nên sẽ kích hoạt sai (vd bật `grid-cols-2` cho desktop) ngay cả khi khung thiệp
   vẫn đang hẹp ~400px. Chỉ dùng breakpoint đúng 1 chỗ duy nhất: khai báo bề rộng khung.
3. **Khối "2 nhà thông gia" (Nhà Trai/Nhà Gái) LUÔN LUÔN là lưới 2 cột đối xứng — kể cả
   trên mobile.** Đây là yêu cầu rõ ràng, đã sửa lại từ 1 bản nháp trước đó lỡ gộp về
   1 cột (tưởng nhầm là áp dụng chung quy tắc "gộp cột cho grid hẹp" bên dưới) — 2 nhà
   đứng lệch cao thấp nhìn rất xấu, đối xứng mới đúng tinh thần thiệp cưới truyền thống.
   Cứ để tên dài tự xuống dòng trong cột của nó (`grid grid-cols-2 gap-3`, text-sm trở
   xuống), không ép về 1 cột chỉ vì cột hẹp.
   Các grid nhiều cột KHÁC không mang tính "cặp đối xứng" (vd danh sách liên hệ rời rạc,
   grid ảnh...) thì vẫn áp dụng quy tắc chung: đổi về xếp dọc 1 cột nếu bề rộng cột quá
   hẹp để đọc thoải mái. Cặp số liệu thật ngắn (giờ/ngày, đón khách/khai tiệc) vẫn giữ
   2 cột bình thường vì đủ ngắn để không vỡ dòng.

---

## Khác biệt so với các category khác

Wedding template **không có** phần chỉnh sửa kinh doanh (menu, dịch vụ, giá cả).
Thay vào đó tập trung vào:

1. **Thông tin cố định** — tên đôi, ngày giờ, địa điểm
2. **Cảm xúc** — ảnh đẹp, nhạc, animation
3. **Hành động khách** — RSVP, xem bản đồ, chuyển khoản mừng cưới

Đây là category có **vòng đời ngắn** (dùng 1-2 tháng quanh ngày cưới) nhưng **conversion cao** vì nhu cầu rõ ràng và cụ thể.
