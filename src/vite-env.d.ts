/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

// Mảng hàng đợi của script adsbygoogle.js (Google AdSense) — khai báo ở đây để
// AdSenseLoader.tsx/AdUnit.tsx dùng `window.adsbygoogle` không cần `as any`.
// Đúng kiểu thật của thư viện là mảng object cấu hình, nhưng ta chỉ push `{}`
// nên `unknown[]` là đủ, không cần cài @types/google.ads.
interface Window {
  adsbygoogle?: unknown[];
}
