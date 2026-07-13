# vngoweb — Frontend

Frontend của **vngoweb** (vngoweb.com) — nền tảng SaaS giúp doanh nghiệp nhỏ tại Việt Nam và quốc tế tạo website chuyên nghiệp trong vài phút, không cần biết lập trình.

Người phát triển: **Nguyễn Văn Tú** — Đại học FPT Đà Nẵng · SĐT 0347 868 656 · hotro@vngoweb.com

---

## Tech stack

- **Vite 6 + React 19 + TypeScript** — SPA thuần (client-side render)
- **react-router-dom v7** — routing, `createBrowserRouter`
- **TailwindCSS 4** — token FnB ấm nóng trong `src/index.css` (`bg-primary`, `fnb-*`)
- **react-i18next** — i18n giao diện hệ thống 6 ngôn ngữ (vi/en/ko/th/zh/lo), lazy-load JSON theo namespace
- **react-helmet-async** — SEO meta/canonical/hreflang/JSON-LD từng trang
- **lucide-react** — icon (quy ước: không dùng emoji trang trí)
- Backend thật: NestJS + MongoDB (repo `../BackEnd-WebChoViet`), gọi qua `VITE_API_URL`

## Hai hệ thống i18n ĐỘC LẬP (đừng nhầm lẫn)

| | UI hệ thống | Nội dung site khách |
|---|---|---|
| Vị trí | `src/i18n/` | `src/constants/languages.ts` + `src/data/Template/*/i18n/` |
| Ngôn ngữ | vi, en, ko, th, zh, lo (`AppLang`) | vi, en, zh, ko (`SiteLang`) |
| Áp dụng | Header/Footer, Landing, Marketplace, Pricing, Tutorials, About, Policy, 404 | Trang public của khách (`/:slug`) + Template Editor |
| Switcher | `src/i18n/LanguageSwitcher.tsx` (cờ SVG trong `FlagIcon.tsx`) | `data/Template/_shared/LanguageSwitcher.tsx` |

Dashboard / Template Editor / Admin (sau đăng nhập) giữ tiếng Việt — không thuộc phạm vi i18n hệ thống.

## Cấu trúc chính

```
src/
├── i18n/                 # i18n hệ thống: init, FlagIcon, LanguageSwitcher, HreflangLinks, locales/{vi,en,ko,th,zh,lo}/
├── config/
│   ├── routes.ts         # Nguồn duy nhất mọi route
│   └── contact.ts        # BRAND_NAME, DOMAIN, CONTACT_*, FOUNDER_* — sửa 1 chỗ áp dụng toàn app
├── components/shared/    # SiteHeader, SiteFooter, Wordmark (logo chữ), LoginModal, PlanBadge
├── pages/
│   ├── landing/  marketplace/  pricing/  tutorials/  about/  policy/  not-found/
│   ├── dashboard/        # projects, analytics, qrcodes, settings, support (cần đăng nhập)
│   ├── template-editor/  # Editor + autosave + PublishModal
│   ├── public-site/      # Render site khách tại /:slug (catch-all)
│   └── admin/            # Portal quản trị riêng
├── data/Template/        # Template bán cho khách (giữ màu riêng, KHÔNG đổi theo theme hệ thống)
├── services/             # Gọi API backend (auth, sites, billing, analytics, uploads, translate...)
└── store/AppContext.tsx  # Global state: user, snackbar, confirm, login modal
```

## Chạy dev

```bash
pnpm install
cp .env.example .env      # điền VITE_API_URL (mặc định backend local :3001)
pnpm dev                  # http://localhost:8080
```

## Lệnh quan trọng

```bash
pnpm build                      # build production
npx tsc --noEmit -p .           # type-check
pnpm run validate:templates     # kiểm tra chuẩn template (i18n đủ 4 lang, mapUrl, data-track...)
```

## Quy tắc bắt buộc khi viết UI

Xem `CLAUDE.md` (rule đầy đủ): 100% Semantic HTML5, không lạm dụng `<div>`, điều hướng nội bộ dùng `<Link>` (không `button+navigate`), mỗi trang public có Helmet + `<HreflangLinks>`, chuẩn SEO/GEO, không emoji trang trí, brand/liên hệ import từ `config/contact.ts`.

Khi thêm/sửa template trong `src/data/Template/`: dùng skill `template-rules` (`.claude/skills/template-rules/SKILL.md`).

## Deploy

Deploy trên **Cloudflare Pages** (SPA rewrite trong `public/_redirects`; 2 route sitemap động rewrite sang backend Render). Hướng dẫn đầy đủ deploy + domain + Google Search Console: `../DEPLOY_SETUP.md`.
