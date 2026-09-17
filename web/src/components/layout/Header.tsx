import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import type { Language } from '@/i18n';

type NavEntry = { to: string; key: string; children?: [string, string][] };

const SERVICES: [string, string][] = [
  ['/services/certificates', 'dropdown-certificates'],
  ['/services/business', 'dropdown-business'],
  ['/services/tax-payments', 'dropdown-tax-payments'],
  ['/services/social-services', 'dropdown-social-services'],
  ['/services/health', 'dropdown-health'],
  ['/services/agriculture', 'dropdown-agriculture'],
  ['/services/infrastructure', 'dropdown-infrastructure'],
  ['/services/education', 'dropdown-education'],
  ['/services/public-safety', 'dropdown-public-safety'],
  ['/services/environment', 'dropdown-environment'],
];

const LEGISLATIVE: [string, string][] = [
  ['/legislative/ordinance-framework', 'dropdown-ordinance-framework'],
  ['/legislative/resolution-framework', 'dropdown-resolution-framework'],
];

const NAV: NavEntry[] = [
  { to: '/', key: 'nav-home' },
  { to: '/services', key: 'nav-services', children: SERVICES },
  { to: '/government', key: 'nav-government' },
  { to: '/statistics', key: 'nav-statistics' },
  { to: '/legislative', key: 'nav-legislative', children: LEGISLATIVE },
  { to: '/budget', key: 'nav-transparency' },
  { to: '/contact', key: 'nav-contact' },
];

const LANGS: { code: Language; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fil', label: 'FIL', name: 'Filipino' },
  { code: 'ceb', label: 'CEB', name: 'Cebuano' },
];

function isMobileNav(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrollYRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const lockBodyScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
    const b = document.body.style;
    b.position = 'fixed';
    b.top = `-${scrollYRef.current}px`;
    b.width = '100%';
    b.overflow = 'hidden';
  }, []);

  const unlockBodyScroll = useCallback(() => {
    const b = document.body.style;
    b.position = '';
    b.top = '';
    b.width = '';
    b.overflow = '';
    window.scrollTo(0, scrollYRef.current);
  }, []);

  const closeMenu = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    unlockBodyScroll();
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 320);
  }, [unlockBodyScroll]);

  const toggleDropdown = useCallback((key: string, e: React.MouseEvent) => {
    if (isMobileNav()) {
      e.preventDefault();
      setOpenDropdown((prev) => (prev === key ? null : key));
    }
  }, []);

  // Close menu on route change.
  useEffect(() => {
    isAnimatingRef.current = false;
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Cleanup scroll lock on unmount.
  useEffect(() => {
    return () => {
      const b = document.body.style;
      b.position = '';
      b.top = '';
      b.width = '';
      b.overflow = '';
    };
  }, []);

  // Click outside to close.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        closeMenu();
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen, closeMenu]);

  // Escape to close.
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, closeMenu]);

  // Close on resize to desktop (debounced).
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isMobileNav() && mobileMenuOpen) {
          isAnimatingRef.current = false;
          closeMenu();
        }
      }, 150);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen, closeMenu]);

  // Inactive: small, medium-weight, muted. Desktop links become rounded pills with a
  // subtle hover fill. Active pill = tinted primary bg + semibold (see linkActive).
  const linkBase =
    'block rounded-lg py-3 text-[0.9375rem] font-medium text-foreground transition select-none hover:text-primary lg:px-3.5 lg:py-2 lg:hover:bg-muted';
  const linkActive = 'font-semibold text-primary lg:bg-primary/10 lg:hover:bg-primary/10';

  return (
    <header className="sticky top-0 z-[1000] bg-white py-1.5 shadow-sm">
      <div className="mx-auto flex min-h-12 w-full max-w-[1200px] flex-wrap items-center justify-between px-6">
        {/* Logo */}
        <AppLink to="/" className="order-first flex items-center" aria-label="Better Mati home">
          <img
            src="/assets/images/logo/better-mati-logo.png"
            alt="Better Mati Logo"
            className="h-10 w-auto lg:h-[68px]"
          />
        </AppLink>

        {/* Nav */}
        <nav
          ref={navRef}
          aria-label="Main Navigation"
          className={cn(
            'order-4 w-full overflow-hidden transition-all duration-300',
            mobileMenuOpen
              ? 'visible mt-4 max-h-[80vh] overflow-y-auto border-t border-border pt-4 opacity-100'
              : 'invisible max-h-0 opacity-0',
            'lg:visible lg:order-none lg:mt-0 lg:max-h-none lg:w-auto lg:overflow-visible lg:border-0 lg:pt-0 lg:opacity-100'
          )}
        >
          <ul className="flex flex-col gap-0 lg:flex-row lg:items-center lg:gap-1">
            {NAV.map((entry) => {
              const active =
                entry.to === '/' ? pathname === '/' : pathname.startsWith(entry.to);
              if (!entry.children) {
                return (
                  <li key={entry.to}>
                    <AppLink
                      to={entry.to}
                      onClick={closeMenu}
                      className={cn(linkBase, active && linkActive)}
                    >
                      {t(entry.key)}
                    </AppLink>
                  </li>
                );
              }
              const open = openDropdown === entry.to;
              return (
                <li key={entry.to} className="group relative">
                  <AppLink
                    to={entry.to}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={(e) => toggleDropdown(entry.to, e)}
                    className={cn(
                      linkBase,
                      'flex items-center justify-between gap-1 lg:justify-start',
                      active && linkActive
                    )}
                  >
                    {t(entry.key)}
                    <ChevronDown
                      className={cn(
                        'size-4 shrink-0 transition-transform lg:group-hover:rotate-180',
                        open && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </AppLink>
                  <ul
                    className={cn(
                      'flex flex-col overflow-hidden transition-all duration-200',
                      open ? 'max-h-[500px] py-1 pl-4' : 'max-h-0',
                      'lg:invisible lg:absolute lg:left-0 lg:top-full lg:z-[1001] lg:min-w-[220px] lg:max-h-none lg:translate-y-2 lg:rounded-lg lg:bg-white lg:py-2 lg:pl-0 lg:opacity-0 lg:shadow-md',
                      'lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100',
                      open && 'lg:visible lg:translate-y-0 lg:opacity-100'
                    )}
                  >
                    {entry.children.map(([to, key]) => (
                      <li key={to}>
                        <AppLink
                          to={to}
                          onClick={closeMenu}
                          className="block px-4 py-2.5 text-[0.9375rem] text-muted-foreground transition-colors hover:bg-muted hover:text-primary lg:py-2 lg:text-sm lg:whitespace-nowrap lg:text-foreground"
                        >
                          {t(key)}
                        </AppLink>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Language selector */}
        <div className="order-3 flex items-center gap-1 lg:order-none">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => void setLanguage(l.code)}
              aria-label={`Switch to ${l.name}`}
              className={cn(
                'rounded-md border px-2.5 py-1.5 text-xs font-semibold transition',
                language === l.code
                  ? 'border-primary bg-primary text-white'
                  : 'border-border text-foreground opacity-70 hover:opacity-100'
              )}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => {
            if (isAnimatingRef.current) return;
            if (mobileMenuOpen) {
              closeMenu();
            } else {
              isAnimatingRef.current = true;
              setMobileMenuOpen(true);
              lockBodyScroll();
              setTimeout(() => {
                isAnimatingRef.current = false;
              }, 320);
            }
          }}
          aria-label="Toggle Navigation"
          aria-expanded={mobileMenuOpen}
          className="order-2 mx-auto flex size-9 items-center justify-center text-primary lg:hidden"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
    </header>
  );
}
