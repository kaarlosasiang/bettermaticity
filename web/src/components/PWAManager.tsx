import { useEffect, useRef, useState, useCallback } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Registers /sw.js, surfaces the install prompt and update banner, and reloads
// seamlessly on controllerchange. Logic mirrors the legacy main.js SW flow.
export default function PWAManager() {
  const [showInstall, setShowInstall] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const waitingWorker = useRef<ServiceWorker | null>(null);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt.current) return;
    await deferredPrompt.current.prompt();
    await deferredPrompt.current.userChoice;
    deferredPrompt.current = null;
    setShowInstall(false);
  }, []);

  const handleUpdate = useCallback(() => {
    waitingWorker.current?.postMessage({ type: 'SKIP_WAITING' });
    setShowUpdate(false);
  }, []);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as unknown as { standalone?: boolean }).standalone;
      if (!isStandalone && !sessionStorage.getItem('pwa-install-dismissed')) {
        setShowInstall(true);
      }
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        setInterval(() => void reg.update(), 30 * 60 * 1000);
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              waitingWorker.current = newWorker;
              setShowUpdate(true);
            }
          });
        });
      });

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    }

    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  return (
    <>
      {showInstall && (
        <div
          role="alert"
          aria-live="polite"
          className="fixed inset-x-4 bottom-4 z-[2000] mx-auto flex max-w-md items-center justify-between gap-3 rounded-lg border border-border bg-white p-3 shadow-md"
        >
          <span className="flex items-center gap-2 text-sm text-foreground">
            <Download className="size-4 text-primary" aria-hidden="true" />
            Install BetterMati for quick access to services.
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleInstall}
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white"
              aria-label="Install BetterMati app"
            >
              Install
            </button>
            <button
              onClick={() => {
                sessionStorage.setItem('pwa-install-dismissed', '1');
                setShowInstall(false);
              }}
              className="p-1 text-muted-foreground hover:text-foreground"
              aria-label="Dismiss install prompt"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
      {showUpdate && (
        <div
          role="alert"
          aria-live="polite"
          className="fixed inset-x-4 bottom-4 z-[2000] mx-auto flex max-w-md items-center justify-between gap-3 rounded-lg bg-primary p-3 text-white shadow-md"
        >
          <span className="text-sm">A new version is available.</span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleUpdate}
              className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-primary"
              aria-label="Update now"
            >
              Update
            </button>
            <button
              onClick={() => setShowUpdate(false)}
              className="p-1 text-white/80 hover:text-white"
              aria-label="Dismiss update notice"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
