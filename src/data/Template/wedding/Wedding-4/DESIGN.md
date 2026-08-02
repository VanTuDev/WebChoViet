---
name: Lễ Thành Hôn
colors:
  surface: '#fdf9f1'
  surface-dim: '#dddad2'
  surface-bright: '#fdf9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3eb'
  surface-container: '#f1ede5'
  surface-container-high: '#ece8e0'
  surface-container-highest: '#e6e2da'
  on-surface: '#1c1c17'
  on-surface-variant: '#4e4639'
  inverse-surface: '#31302b'
  inverse-on-surface: '#f4f0e8'
  outline: '#7f7667'
  outline-variant: '#d1c5b4'
  surface-tint: '#775a19'
  primary: '#775a19'
  on-primary: '#ffffff'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#e9c176'
  secondary: '#6b5b52'
  on-secondary: '#ffffff'
  secondary-container: '#f1dbd0'
  on-secondary-container: '#705f56'
  tertiary: '#485e8b'
  on-tertiary: '#ffffff'
  tertiary-container: '#8fa5d6'
  on-tertiary-container: '#233a65'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#f4ded3'
  secondary-fixed-dim: '#d7c2b7'
  on-secondary-fixed: '#241912'
  on-secondary-fixed-variant: '#52443b'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#b0c6f9'
  on-tertiary-fixed: '#001a41'
  on-tertiary-fixed-variant: '#304671'
  background: '#fdf9f1'
  on-background: '#1c1c17'
  surface-variant: '#e6e2da'
  parchment: '#F5F1E9'
  antique-gold: '#C5A059'
  ebony-wood: '#6B5B52'
  soft-olive: '#8B8C74'
typography:
  display-wedding:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-wedding-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Source Serif 4
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  margin-safe: 32px
  gutter: 24px
  section-gap: 80px
---

## Brand & Style
The design system centers on the concept of "Timeless Heritage." It is crafted for couples seeking a sophisticated, romantic, and deeply traditional aesthetic for their wedding digital presence and physical stationery.

The style is **Minimalist-Classical**. It prioritizes heavy whitespace (the parchment texture), high-quality serif typography, and delicate botanical motifs. The emotional response should be one of warmth, reverence, and understated luxury. We avoid modern glossy effects in favor of tactile, organic textures and a palette that feels like heirloom paper and gold leaf.

## Colors
The palette is inspired by natural materials and traditional Vietnamese aesthetics. 

- **Primary (Antique Gold):** Used for accents, borders, and decorative illustrations. It represents prosperity and elegance.
- **Secondary (Ebony Wood):** The primary color for all text and structural lines, ensuring high legibility against the cream background while feeling softer than pure black.
- **Neutral (Parchment):** The foundation of the system. This is not a flat hex code but should be implemented with a subtle, non-distracting paper grain texture.
- **Named Color (Soft Olive):** To be used sparingly for botanical illustrations (leaves and stems) to complement the gold and brown.

## Typography
The typography is the soul of this design system. We use a combination of classic serifs to evoke the "Hoàng Nam & Thảo Vy" literary aesthetic.

- **Display & Headlines:** `Libre Caslon Text` provides a refined, historical feel with its elegant curves and high contrast. It should be used for the names of the couple and section headers.
- **Body & Labels:** `Source Serif 4` is used for long-form details, addresses, and logistical information. It is highly legible and maintains the scholarly, traditional atmosphere without being overly ornate.
- **Styling Note:** For the most prominent display text (e.g., the couple's names), use "Antique Gold." All other informational text should remain in "Ebony Wood."

## Layout & Spacing
**Cập nhật (implementation thật, thay cho spec 12-column ban đầu):** Toàn bộ template là
**1 tấm thiệp dọc duy nhất**, khung viền vàng kép (double-border), căn giữa trên nền
trắng thuần — không phải bố cục nhiều section rộng full-bleed. Mọi section (hero,
ceremony, events, rsvp, location, footer) xếp chồng và cuộn liền mạch bên trong đúng
1 khung thiệp đó, ngăn cách bằng đường kẻ mảnh (`border-t border-[#C5A059]/20`) thay
vì mỗi section có khung viền kép riêng.

- **Bề rộng thiệp:** cố định `420px` (`sm:w-105`) trên màn hình ≥640px, `w-full` trên
  mobile. **Bắt buộc dùng đơn vị cố định (px/rem), KHÔNG dùng `vw`/`vh`** — trang preview
  của `TemplateEditorPage` (desktop mode) render qua 1 pane có thể bị co/scale lại để
  vừa layout editor, nên `vw` sẽ tính theo bề ngang cửa sổ trình duyệt thật rồi bị scale
  chồng thêm 1 lần nữa → kích thước hiển thị sai lệch, không đoán trước được giữa các
  nơi hiển thị (marketplace preview / editor / site đã publish).
- **Rhythm:** Đơn vị cơ sở 8px vẫn giữ nguyên, nhưng padding trong thiệp phải nén lại
  đáng kể so với bản 12-column gốc (`px-6` ngang, `pt-10`/`pb-10` giữa các section) vì
  bề rộng nội dung thực tế chỉ còn ~370px (420px trừ padding/border khung).
- **Grid nhiều cột → xếp dọc:** Mọi bố cục nhiều cột kiểu trang rộng (nhà trai/nhà gái
  2 cột, danh sách liên hệ 2 cột...) phải đổi thành xếp dọc 1 cột — ở bề rộng thiệp hẹp,
  2 cột cạnh nhau làm tên riêng/số điện thoại bị vỡ dòng xấu. Ngoại lệ: cặp số liệu ngắn
  (Đón khách/Khai tiệc, giờ/ngày/tháng) vẫn giữ 2 cột vì nội dung đủ ngắn.
- **KHÔNG dùng breakpoint `sm:`/`md:`/`lg:` cho layout BÊN TRONG thiệp** (chỉ dùng ở
  đúng 1 chỗ — khai báo bề rộng thiệp) — các breakpoint này tính theo viewport thật của
  trình duyệt, không phải bề rộng thiệp, nên sẽ kích hoạt sai bất cứ khi nào khung thiệp
  hẹp hơn viewport (luôn luôn đúng như vậy trên desktop).
- **Alignment:** Căn giữa hầu hết nội dung thiệp (đúng tinh thần thiệp giấy vật lý);
  chỉ label form RSVP dùng canh trái.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Subtle Shadows** rather than high-tech blurs.

- **Layers:** Use the Parchment texture as the base. Higher-level cards (like an RSVP modal or a "Save the Date" popup) should use a slightly lighter version of the parchment with a very soft, diffused shadow (15% opacity Ebony Wood, 20px blur) to suggest a physical piece of paper floating slightly above the background.
- **Outlines:** Use thin (1px) solid lines in "Antique Gold" to frame important content. Double-line borders are encouraged for a more "Imperial" Vietnamese look.

## Shapes
This design system utilizes **Sharp** edges for a formal, traditional look. Rectangles and squares mirror the cut of high-quality cardstock. 

Occasional use of organic shapes is permitted only through the botanical illustrations. Interactive elements like buttons should remain perfectly rectangular with thin borders to maintain the architectural integrity of the classic layout.

## Components
- **Buttons:** Rectangular with a 1px Antique Gold border. Background is transparent. Text is "Label-Caps" in Ebony Wood. On hover, the background fills with a very faint tint of Gold.
- **Cards:** Use a double-line border (one thick, one thin) in Antique Gold. The background should always be the parchment texture.
- **Inputs:** Simple bottom-border only in Ebony Wood. Labeling should be in "Source Serif 4" small-caps.
- **Botanical Illustrations:** These should be hand-drawn style, placed in corners or used as dividers between sections. They must be SVG or high-res PNGs with transparency, tinted in Gold or Soft Olive.
- **Dividers:** Use a single horizontal line with a small botanical "leaf" icon in the center rather than a plain rule.