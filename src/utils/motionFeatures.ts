// Tính năng animation của motion, tải bất đồng bộ qua <LazyMotion> ở RootLayout.
// App chỉ dùng m.div với initial/animate/exit (dialog, snackbar, onboarding) →
// domAnimation là đủ; bỏ được projection/layout/drag (~2/3 thư viện) khỏi bundle đầu.
export { domAnimation as default } from 'motion/react';
