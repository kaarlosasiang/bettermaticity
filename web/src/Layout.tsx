import { Outlet } from 'react-router-dom';
import HotlineBar from '@/components/layout/HotlineBar';
import Header from '@/components/layout/Header';
import InfoBar from '@/components/layout/InfoBar';
import Footer from '@/components/layout/Footer';
import PWAManager from '@/components/PWAManager';
import { Analytics } from '@/components/Analytics';
import { Seo } from '@/components/Seo';
import { useSyncStoredLanguage } from '@/hooks/useLanguage';

// Persistent chrome shared by every route.
export default function Layout() {
  useSyncStoredLanguage();
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
      <HotlineBar />
      <Header />
      <InfoBar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <PWAManager />
      <Analytics />
    </>
  );
}
