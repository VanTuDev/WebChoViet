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

- Nội dung viết dạng **câu khẳng định trực tiếp, tự đứng vững** (self-contained): AI trích xuất từng đoạn rời — mỗi đoạn phải hiểu được không cần đọc đoạn trước.
- Câu trả lời/định nghĩa quan trọng đặt NGAY sau heading, không vòng vo ("vngoweb là nền tảng tạo website cho doanh nghiệp nhỏ..." — chủ ngữ rõ ràng, không bắt đầu bằng "Chúng tôi là...").
- Dữ kiện cụ thể (giá, số liệu, tên người sáng lập, năm) viết dạng text thật trong HTML — không giấu trong ảnh/canvas.
- FAQ dùng `<details>/<summary>` hoặc heading + đoạn văn, kèm JSON-LD `FAQPage` khi phù hợp.
- Thông tin nhất quán trên mọi trang: tên thương hiệu "vngoweb", người phát triển "Nguyễn Văn Tú — Đại học FPT Đà Nẵng", SĐT/email lấy từ `src/config/contact.ts` (không hard-code).

## Kiến trúc & quy ước sẵn có (không phá)

- Stack: **Vite 6 + React 19 + react-router-dom v7 + TailwindCSS 4** (SPA thuần, KHÔNG phải Next.js — đừng viết cú pháp Next).
- i18n hệ thống (UI app): `src/i18n/` — 6 ngôn ngữ vi/en/ko/th/zh/lo, type `AppLang`. **Tách biệt hoàn toàn** với i18n nội dung template site khách (`src/constants/languages.ts`, `SiteLang` vi/en/zh/ko) — không trộn lẫn 2 hệ thống.
- Không dùng emoji trang trí trong UI (kể cả emoji cờ — Windows không render); icon dùng lucide-react, cờ quốc gia dùng SVG trong `src/i18n/FlagIcon.tsx`.
- Brand/liên hệ: import từ `src/config/contact.ts` (`BRAND_NAME`, `DOMAIN`, `CONTACT_*`, `FOUNDER_*`). Logo hiện là wordmark chữ: `src/components/shared/Wordmark.tsx`.
- Màu hệ thống: token FnB trong `src/index.css` (`bg-primary`, `text-on-surface`, `fnb-*`) — không đưa màu xanh dương vào UI hệ thống; template trong `src/data/Template/**` giữ màu riêng, không đụng.
