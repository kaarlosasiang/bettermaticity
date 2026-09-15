import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

// GA4 measurement ID — override via VITE_GA_ID; defaults to the live property.
const GA_ID = (import.meta.env.VITE_GA_ID as string) || 'G-8777S9SP9X';

// Injects gtag once, client-side, in production only. Consolidates the 33
// hand-copied gtag snippets from the legacy pages into one component.
export function Analytics() {
  useEffect(() => {
    if (!GA_ID || import.meta.env.DEV) return;
    if (document.getElementById('ga-gtag')) return;

    const s = document.createElement('script');
    s.id = 'ga-gtag';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_ID);
  }, []);

  return null;
}
