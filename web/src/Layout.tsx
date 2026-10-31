import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import HotlineBar from '@/components/layout/HotlineBar';
import Header from '@/components/layout/Header';
import InfoBar from '@/components/layout/InfoBar';
import Footer from '@/components/layout/Footer';
import ReportIssueBand from '@/components/layout/ReportIssueBand';
import PWAManager from '@/components/PWAManager';
// import { Analytics } from '@/components/Analytics';
import { Seo } from '@/components/Seo';
import { useSyncStoredLanguage } from '@/hooks/useLanguage';
import { Analytics } from "@vercel/analytics/next"


// Persistent chrome shared by every route.
export default function Layout() {
  useSyncStoredLanguage();
  // Neutral greys for page content everywhere but the homepage (see .tone-neutral in index.css).
  const { pathname } = useLocation();
  const tone = pathname === '/' ? undefined : 'tone-neutral';

  // The hotline strip, info bar and header are pinned together. Publish their combined
  // height as --sticky-offset so anchor jumps and keyboard focus (scroll-padding-top in
  // index.css), sticky asides and the mega menu all clear it at every width.
  const chromeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = chromeRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const publish = () =>
      document.documentElement.style.setProperty('--sticky-offset', `${el.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Site-wide default metadata; pages override via their own <Seo>. */}
      <Seo description="BetterMati.org — your digital gateway to LGU Mati services, information, and public funds." />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[3000] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <div ref={chromeRef} className="sticky top-0 z-[1000]">
        <HotlineBar />
        <InfoBar />
        <Header />
      </div>
      <main id="main-content" className={tone}>
        <Outlet />
      </main>
      <ReportIssueBand />
      <Footer />
      {/* Client-side navigations start at the top (or at the #hash target); Back/Forward
          return to the previous scroll position. Renders nothing in the prerender. */}
      <ScrollRestoration />
      <PWAManager />
      <Analytics />
    </>
  );
}
