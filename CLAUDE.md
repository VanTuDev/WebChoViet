# Rule bắt buộc khi viết giao diện FrontEnd (vngoweb)

## Semantic HTML5 — 100%, không thỏa hiệp

Khi tạo MỚI hoặc sửa ĐÁNG KỂ bất kỳ component/trang nào:

- Dùng đúng thẻ ngữ nghĩa: `<header>` `<nav>` `<main>` `<section>` `<article>` `<aside>` `<footer>` `<figure>/<figcaption>` `<address>` `<time>` `<mark>` `<details>/<summary>`. **Tuyệt đối không lạm dụng `<div>` vô nghĩa** — `<div>` chỉ dành cho wrapper layout thuần túy khi không có thẻ ngữ nghĩa nào phù hợp.
- Mỗi trang đúng 1 `<h1>`, heading phân cấp tuần tự h1→h2→h3 (không nhảy cấp, không chọn heading theo cỡ chữ — cỡ chữ chỉnh bằng class).
- `<section>` phải có heading (hoặc `aria-label`); danh sách dùng `<ul>/<ol>`, không dùng chuỗi `<div>`.
- **Điều hướng nội bộ dùng `<Link>`/`<a href>` của react-router — KHÔNG dùng `<button onClick={() => navigate(...)}>`**. Button-navigation là anti-pattern SEO nghiêm trọng: crawler không thấy link, không crawl được trang đích, mất toàn bộ internal-link equity. `<button>` chỉ dành cho hành động (submit, toggle, mở modal). Code cũ còn nhiều chỗ vi phạm — sửa dần khi chạm vào file.

## Chuẩn SEO cho mọi trang công khai

- Mỗi trang public phải có `<Helmet>`: `<title>` riêng (≤60 ký tự, chứa từ khóa + brand "vngoweb"), `<meta name="description">` riêng (≤160 ký tự, viết cho người đọc), `<link rel="canonical">`, hreflang alternates (6 ngôn ngữ, qua component `HreflangLinks` dùng chung trong `src/i18n/`).
- JSON-LD (schema.org) cho trang có thực thể rõ ràng: Organization/Person (About), Product/Offer (Pricing), FAQPage (nếu có Q&A), BreadcrumbList cho trang sâu. Structured data phải KHỚP nội dung hiển thị trên trang — Google đối chiếu và phạt lệch.
- Ảnh phải có `alt` mô tả thật (không rỗng trừ ảnh thuần trang trí), `loading="lazy"` cho ảnh dưới màn hình đầu, kích thước rõ (`width/height` hoặc aspect-ratio) chống CLS.

## Chuẩn GEO (Generative Engine Optimization — tối ưu cho AI search: ChatGPT, Perplexity, Google AI Overviews)

Quy trình 5 bước bắt buộc khi viết một mục nội dung có giá trị GEO (FAQ, định nghĩa, so sánh gói, giới thiệu tính năng...):

1. **Heading dạng câu hỏi** — đặt heading là câu hỏi người dùng thực sự gõ vào AI/search ("vngoweb là gì?", "Bảng giá vngoweb bao nhiêu?"), không đặt heading mơ hồ kiểu "Giới thiệu" hay "Tổng quan".
2. **Trả lời ngắn gọn, trực tiếp NGAY sau heading** — câu đầu tiên phải tự đứng vững (self-contained) và trả lời thẳng câu hỏi, chủ ngữ rõ ràng (vd "vngoweb là nền tảng tạo website cho doanh nghiệp nhỏ..." — không bắt đầu bằng "Chúng tôi là..."). AI trích xuất từng đoạn rời, không đọc ngược lên đoạn trước.
3. **Bullet point / bảng so sánh** — sau câu trả lời trực tiếp, liệt kê chi tiết bằng `<ul>/<ol>` hoặc `<table>` thay vì đoạn văn dài, để AI và người đọc quét nhanh.
4. **Dữ liệu có cấu trúc (schema markup)** — kèm JSON-LD phù hợp (`FAQPage`, `Product/Offer`, `Organization`...) khớp đúng nội dung hiển thị trên trang; dữ kiện cụ thể (giá, số liệu, tên, năm) viết dạng text thật trong HTML, không giấu trong ảnh/canvas.
5. **Tăng độ tin cậy E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness) — thông tin nhất quán trên mọi trang: tên thương hiệu "vngoweb", người phát triển "Nguyễn Văn Tú — Đại học FPT Đà Nẵng", SĐT/email lấy từ `src/config/contact.ts` (không hard-code).

FAQ dùng `<details>/<summary>` hoặc heading + đoạn văn theo đúng B1–B2 ở trên.

### Mẫu comment khi viết 1 section nội dung (SEO + GEO)

Khi tạo section nội dung mới có giá trị SEO/GEO (FAQ, so sánh gói, giới thiệu tính năng...), mở đầu bằng 1 comment tóm tắt đã áp dụng đủ 2 chuẩn chưa — copy mẫu dưới, điền lại cho đúng nội dung thật:

```tsx
{/* ── SEO+GEO: [tên section] ────────────────────────────────────────────
 * SEO   : <h2> đúng thứ bậc + chứa từ khóa chính; ảnh có alt thật; JSON-LD khớp nội dung hiển thị.
 * GEO B1: Heading là câu hỏi thật người dùng gõ vào AI/search.
 * GEO B2: Câu đầu ngay sau heading trả lời trực tiếp, tự đứng vững (không cần đọc đoạn trước).
 * GEO B3: Chi tiết trình bày bằng <ul>/<table>, không viết đoạn văn dài.
 * GEO B4: JSON-LD tương ứng (FAQPage/Product/Organization...) khớp đúng nội dung hiển thị.
 * GEO B5: Dữ kiện thật (giá/số liệu/tên/năm) + thông tin nhất quán toàn site (E-E-A-T).
 * ──────────────────────────────────────────────────────────────────────── */}
<section aria-labelledby="pricing-heading">
  <h2 id="pricing-heading">vngoweb có những gói giá nào?</h2>
  <p>vngoweb có 3 gói: Free, Pro (299.000đ/tháng) và Ultra (599.000đ/tháng).</p>
  <table>{/* so sánh chi tiết tính năng từng gói */}</table>
</section>
```

Comment này chỉ cần ở section thật sự có giá trị SEO/GEO (FAQ, pricing, feature explainer...) — không rải vào mọi `<section>` trong app; UI thuần thao tác (dashboard, form nội bộ) không cần.

## Kiến trúc & quy ước sẵn có (không phá)

- Stack: **Vite 6 + React 19 + react-router-dom v7 + TailwindCSS 4** (SPA thuần, KHÔNG phải Next.js — đừng viết cú pháp Next).
- i18n hệ thống (UI app): `src/i18n/` — 6 ngôn ngữ vi/en/ko/th/zh/lo, type `AppLang`. **Tách biệt hoàn toàn** với i18n nội dung template site khách (`src/constants/languages.ts`, `SiteLang` vi/en/zh/ko) — không trộn lẫn 2 hệ thống.
- Không dùng emoji trang trí trong UI (kể cả emoji cờ — Windows không render); icon dùng lucide-react, cờ quốc gia dùng SVG trong `src/i18n/FlagIcon.tsx`.
- Brand/liên hệ: import từ `src/config/contact.ts` (`BRAND_NAME`, `DOMAIN`, `CONTACT_*`, `FOUNDER_*`). Logo hiện là wordmark chữ: `src/components/shared/Wordmark.tsx`.
- Màu hệ thống: token FnB trong `src/index.css` (`bg-primary`, `text-on-surface`, `fnb-*`) — không đưa màu xanh dương vào UI hệ thống; template trong `src/data/Template/**` giữ màu riêng, không đụng.
