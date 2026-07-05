import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Bắt sự kiện `beforeinstallprompt` (Chrome/Edge/Android) để tự hiện nút "Cài đặt"
 * riêng thay vì chờ trình duyệt tự quyết định có hiện gợi ý cài hay không. Safari/iOS
 * không bắn sự kiện này (Add to Home Screen ở đó là thao tác tay qua nút Share) —
 * `canInstall` sẽ luôn `false` trên iOS, đúng với giới hạn thật của nền tảng.
 */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return { canInstall: !!deferredPrompt && !installed, promptInstall };
}
