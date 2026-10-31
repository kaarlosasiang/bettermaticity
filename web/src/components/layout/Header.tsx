import type { PointerEvent as ReactPointerEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { ChevronDown, ChevronRight, Globe, Home, Menu, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppLink } from '@/components/AppLink';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/hooks/useLanguage';
import { NAV, type NavEntry, type NavMenu } from '@/lib/navMenus';
import type { Language } from '@/i18n';
import { LANGS } from '@/lib/languages';

// Highlighted tabs (Visit Mati) get only their first word in Feel-Mati amber;
// the rest of the label keeps the normal nav styling.
function renderNavLabel(label: string, highlight?: boolean): React.ReactNode {
  if (!highlight) return label;
  const [first, ...rest] = label.split(' ');
  return (
    <>
      <span className="font-semibold text-yellow-500">{first}</span>
      <span className="font-semibold text-navy">{rest.length ? ` ${rest.join(' ')}` : null}</span>
    </>
  );
}

const pad = (i: number) => String(i + 1).padStart(2, '0');

function GroupNumber({ i }: { i: number }) {
  return (
    <span
      className="rounded-none bg-royal-tint px-1.5 py-0.5 font-mono text-[11px] font-semibold text-royal"
      aria-hidden="true"
    >
      {pad(i)}
    </span>
  );
}

function isActive(entry: NavEntry, pathname: string): boolean {
  if (entry.to === '/') return pathname === '/';
  return [entry.to, ...(entry.matches ?? [])].some((prefix) => pathname.startsWith(prefix));
}

// Desktop mega panel (BetterSanFernando pattern): one column per group, each item an
// icon tile + title + one-line description + chevron.
function MegaPanel({
  menu,
  label,
  onPointerEnter,
  onPointerLeave,
}: {
  menu: NavMenu;
  label: string;
  onPointerEnter?: (e: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerLeave?: (e: ReactPointerEvent<HTMLDivElement>) => void;
}) {
  const { t } = useLanguage();
  return (
    <div
      id={`desktop-mega-${menu.id}`}
      className="absolute inset-x-0 top-full hidden px-4 pt-2 pb-4 xl:block"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div
        role="region"
        aria-label={label}
        className="container mx-auto grid max-h-[calc(100vh-var(--sticky-offset)-2rem)] animate-in items-start gap-5 overflow-y-auto rounded-xl bg-white p-6 shadow-[0_0_0_1px_#e9ecef,0_18px_48px_rgba(15,23,42,0.16)] duration-150 fade-in-0 slide-in-from-top-1 motion-reduce:animate-none"
        style={{ gridTemplateColumns: `repeat(${menu.groups.length}, minmax(0, 1fr))` }}
      >
        {menu.groups.map((group, gi) => (
          <div key={group.key} className="min-w-0">
            <div className="mb-3 flex items-center gap-2 border-b border-line pb-3">
              <GroupNumber i={gi} />
              <h2 className="text-sm font-semibold text-heading">{t(group.key)}</h2>
            </div>
            <ul className="grid gap-1">
              {group.items.map(({ to, key, descKey, Icon }) => (
                <li key={to}>
                  <AppLink
                    to={to}
                    className="group flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2.5 text-ink transition-colors duration-200 hover:bg-royal-tint hover:text-navy"
                  >
                    <span className="flex min-w-0 items-start">
                      <span className="mt-0.5 mr-2.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-royal-tint text-royal transition-colors duration-200 group-hover:bg-[#d9e5fd] group-hover:text-navy">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm leading-5 font-semibold transition-colors duration-200 group-hover:text-royal">
                          {t(key)}
                        </span>
                        <span className="mt-0.5 block text-xs leading-4 text-ink-muted">
                          {t(descKey)}
                        </span>
                      </span>
                    </span>
                    <ChevronRight
                      className="size-4 shrink-0 text-ink-muted/60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-royal"
                      aria-hidden="true"
                    />
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mobile drawer section: a button that expands the menu's groups in place.
function DrawerSection({
  entry,
  active,
}: {
  entry: NavEntry & { menu: NavMenu };
  active: boolean;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(active);
  const label = t(entry.key);
  const panelId = `mobile-mega-${entry.menu.id}`;
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex min-h-[50px] w-full items-center justify-between rounded-md px-3.5 py-3 text-left text-[15px] font-medium transition-colors duration-200 hover:bg-surface-subtle',
          active ? 'text-royal' : 'text-ink'
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-ink-muted/60 transition-transform duration-200 motion-reduce:transition-none',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-[250ms] motion-reduce:transition-none',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-4 pt-1 pr-1 pb-3 pl-3.5">
            <AppLink
              to={entry.to}
              className="group flex min-h-[44px] items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold text-navy transition-colors duration-150 hover:bg-royal-tint"
            >
              <span>{t('nav-view-overview', { menu: label })}</span>
              <ChevronRight
                className="size-4 text-royal transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </AppLink>
            {entry.menu.groups.map((group, gi) => (
              <div key={group.key} className="space-y-1">
                <div className="flex items-center gap-2 border-b border-line px-3 pt-2 pb-1.5">
                  <GroupNumber i={gi} />
                  <h2 className="text-xs font-semibold text-heading">{t(group.key)}</h2>
                </div>
                <ul className="space-y-0.5">
                  {group.items.map(({ to, key }) => (
                    <li key={to}>
                      <AppLink
                        to={to}
                        className="group flex min-h-[44px] w-full items-center justify-between rounded-md px-3 py-2 text-sm text-ink-muted transition-colors duration-150 hover:bg-surface-subtle hover:text-ink"
                      >
                        <span className="leading-snug">{t(key)}</span>
                        <ChevronRight
                          className="size-4 shrink-0 text-ink-muted/50"
                          aria-hidden="true"
                        />
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { pathname } = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // Hover opens a menu (mouse only; touch and keyboard use the chevron). A short close
  // delay lets the pointer travel from the nav item down into the panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const hoverOpen = (id: string) => (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    cancelClose();
    if (openMenu !== id) openedByHover.current = true;
    setOpenMenu(id);
  };
  const hoverClose = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse' || !openedByHover.current) return;
    cancelClose();
    closeTimer.current = setTimeout(() => {
      openedByHover.current = false;
      setOpenMenu(null);
    }, 200);
  };
  useEffect(() => cancelClose, []);

  // Close everything on route change (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setDrawerOpen(false);
  }

  // Desktop mega menu: Escape closes and returns focus to its chevron; a pointer
  // press outside the header closes it.
  useEffect(() => {
    if (!openMenu) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      const trigger = openMenu ? triggerRefs.current[openMenu] : null;
      setOpenMenu(null);
      trigger?.focus();
    }
    function onPointer(e: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [openMenu]);

  const pill =
    'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200';
  const pillIdle = 'text-ink hover:bg-surface-subtle';
  const pillActive = 'bg-royal-tint font-semibold text-royal';
  const openEntry = NAV.find((e) => e.menu && e.menu.id === openMenu);

  return (
    <header ref={headerRef} className="relative border-b border-line bg-white">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 xl:h-[72px]">
        <AppLink to="/" className="flex shrink-0 items-center" aria-label="Better Mati home">
          <img
            src="/assets/images/logo/better-mati-logo.png"
            alt="Better Mati Logo"
            className="h-8.5 w-auto xl:h-11"
          />
        </AppLink>

        {/* Desktop nav */}
        <nav aria-label="Main Navigation" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((entry) => {
              const active = isActive(entry, pathname);
              const label = t(entry.key);
              if (!entry.menu) {
                return (
                  <li key={entry.to}>
                    <AppLink
                      to={entry.to}
                      aria-current={active ? 'page' : undefined}
                      className={cn(pill, active ? pillActive : pillIdle)}
                    >
                      {renderNavLabel(label, entry.highlight)}
                    </AppLink>
                  </li>
                );
              }
              const id = entry.menu.id;
              const open = openMenu === id;
              return (
                <li key={entry.to} onPointerEnter={hoverOpen(id)} onPointerLeave={hoverClose}>
                  <div className={cn(pill, active || open ? pillActive : pillIdle)}>
                    <AppLink
                      to={entry.to}
                      aria-current={active ? 'page' : undefined}
                      className="rounded-md"
                    >
                      {label}
                    </AppLink>
                    <button
                      ref={(el) => {
                        triggerRefs.current[id] = el;
                      }}
                      type="button"
                      aria-expanded={open}
                      aria-controls={`desktop-mega-${id}`}
                      aria-label={t(open ? 'nav-close-menu' : 'nav-open-menu', { menu: label })}
                      onClick={() => {
                        // A click on a hover-opened menu pins it open instead of closing it.
                        cancelClose();
                        const pin = open && openedByHover.current;
                        openedByHover.current = false;
                        setOpenMenu(open && !pin ? null : id);
                      }}
                      className="rounded-md p-0.5 text-inherit"
                    >
                      <ChevronDown
                        className={cn(
                          'size-3.5 opacity-75 transition-transform duration-200 motion-reduce:transition-none',
                          open && 'rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 xl:ml-0">
          <AppLink
            to="/search"
            aria-label={t('nav-search')}
            className="hidden size-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-royal-tint hover:text-royal xl:flex"
          >
            <Search className="size-[18px]" aria-hidden="true" />
          </AppLink>

          {/* Phones/tablets: compact language dropdown (desktop uses the info bar toggle) */}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Change language"
              className="flex h-10 items-center gap-1 rounded-lg px-2.5 text-xs font-semibold text-foreground transition hover:bg-muted xl:hidden"
            >
              <Globe className="size-4" aria-hidden="true" />
              {language.toUpperCase()}
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-auto min-w-[10rem]">
              <DropdownMenuRadioGroup
                value={language}
                onValueChange={(v) => void setLanguage(v as Language)}
              >
                {LANGS.map((l) => (
                  <DropdownMenuRadioItem key={l.code} value={l.code} className="py-2 pl-2">
                    {l.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile drawer: Radix Dialog gives the focus trap, scroll lock, Escape and
              backdrop-click handling, and returns focus to this trigger on close. */}
          <DialogPrimitive.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DialogPrimitive.Trigger
              aria-label={t('nav-open-main-menu')}
              aria-controls="mobile-navigation"
              className="inline-flex size-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-royal-tint hover:text-royal xl:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-[1100] bg-slate-900/40 duration-[250ms] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none xl:hidden" />
              <DialogPrimitive.Content
                id="mobile-navigation"
                aria-describedby={undefined}
                className="fixed inset-y-0 right-0 z-[1101] flex w-full flex-col bg-white shadow-[-12px_0_40px_rgba(15,23,42,0.14)] duration-[250ms] data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right motion-reduce:animate-none sm:w-[min(92vw,420px)] xl:hidden"
              >
                <DialogPrimitive.Title className="sr-only">
                  {t('nav-main-menu')}
                </DialogPrimitive.Title>
                <div className="flex items-center justify-between border-b border-line py-3 pr-3 pl-4">
                  <img
                    src="/assets/images/logo/better-mati-logo.png"
                    alt="Better Mati Logo"
                    className="h-8.5 w-auto"
                  />
                  <DialogPrimitive.Close
                    aria-label={t('nav-close-main-menu')}
                    className="inline-flex size-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-royal-tint hover:text-royal"
                  >
                    <X className="size-6" aria-hidden="true" />
                  </DialogPrimitive.Close>
                </div>
                <nav aria-label="Main Navigation" className="flex-1 overflow-y-auto p-4">
                  <AppLink
                    to="/search"
                    className="group mb-4 flex min-h-[48px] items-center justify-between rounded-md border border-line bg-surface-subtle px-3.5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Search className="size-[17px]" aria-hidden="true" />
                      {t('nav-search')}
                    </span>
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </AppLink>
                  <ul className="grid gap-0.5">
                    {NAV.map((entry) => {
                      const active = isActive(entry, pathname);
                      if (entry.menu) {
                        return (
                          <li key={entry.to}>
                            <DrawerSection
                              entry={entry as NavEntry & { menu: NavMenu }}
                              active={active}
                            />
                          </li>
                        );
                      }
                      return (
                        <li key={entry.to}>
                          <AppLink
                            to={entry.to}
                            aria-current={active ? 'page' : undefined}
                            className={cn(
                              'flex min-h-[50px] items-center gap-3 rounded-md px-3.5 py-3 text-[15px] font-medium transition-colors duration-200',
                              active
                                ? 'bg-royal-tint font-semibold text-royal'
                                : 'text-ink hover:bg-surface-subtle'
                            )}
                          >
                            {entry.to === '/' ? (
                              <Home className="size-[18px] text-ink-muted" aria-hidden="true" />
                            ) : null}
                            {renderNavLabel(t(entry.key), entry.highlight)}
                          </AppLink>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="m-4 mt-3 grid gap-1 rounded-md bg-royal px-[18px] py-4 text-white">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-white/80 uppercase">
                    BetterMati.org
                  </span>
                  <span className="text-base font-bold">{t('nav-drawer-tagline')}</span>
                  <span className="text-[13px] text-white/80">{t('nav-drawer-place')}</span>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>

      {openEntry?.menu ? (
        <MegaPanel
          menu={openEntry.menu}
          label={t(openEntry.key)}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') cancelClose();
          }}
          onPointerLeave={hoverClose}
        />
      ) : null}
    </header>
  );
}
