import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { ServiceSearch } from '@/components/ServiceSearch';
import { Container } from '@/components/primitives';
import { cn } from '@/lib/utils';
import { totalPopulation, barangayCount, landAreaKm2, incomeClass } from '@/lib/statsData';
import { annualFinancials, fiscalSource } from '@/lib/budgetData';
import { officials } from '@/lib/govData';
import { featuredAttractions } from '@/lib/tourismData';
import { nationalHotline, hotlineById, primaryNumber } from '@/lib/hotlines';
import { useNews, safeNewsUrl } from '@/hooks/useNews';

/**
 * DESIGN PROTOTYPE — "neo-Swiss civic" direction for the homepage.
 *
 * Dev-only (registered in routes.tsx behind import.meta.env.DEV, and not in
 * migrated-routes.json), so it is never prerendered or shipped. The live homepage
 * is pages/Home.tsx. Content comes from the same data modules Home uses; only the
 * visual language changes:
 *   - square corners, no shadows, 1px hairline grids whose cells share borders
 *   - every section opens with a heavy black rule + a mono index number (01, 02 …)
 *   - tracked uppercase eyebrows, big tight display headings, quiet grey body copy
 *   - navigation as numbered rows with a trailing arrow instead of icon cards
 *   - GOV.UK-style inset callouts (thick left border) and underlined text links
 */

const NAVY = 'bg-[#0b2a5e]';

const NAV: { to: string; label: string }[] = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/government', label: 'Government' },
  { to: '/statistics', label: 'Statistics' },
  { to: '/legislative', label: 'Legislative' },
  { to: '/budget', label: 'Transparency' },
  { to: '/visit-mati', label: 'Visit Mati' },
];

const RESIDENT_TASKS: { to: string; title: string; desc: string }[] = [
  {
    to: '/services/certificates',
    title: 'Get a certificate',
    desc: 'Birth, marriage and death certificates from the City Civil Registrar.',
  },
  {
    to: '/services/business',
    title: 'Start or renew a business',
    desc: 'Permits, renewals and market stalls through the BPLO.',
  },
  {
    to: '/services/tax-payments',
    title: 'Pay taxes and fees',
    desc: "Real property and business tax at the Treasurer's Office.",
  },
  {
    to: '/government/officials',
    title: 'Meet your officials',
    desc: 'The mayor, vice mayor and the Sangguniang Panlungsod.',
  },
  {
    to: '/budget',
    title: 'See where the money goes',
    desc: 'Receipts and spending from the latest statement.',
  },
];

const SERVICES: { to: string; title: string; desc: string; tone?: 'danger' | 'feel' }[] = [
  {
    to: '/services/certificates',
    title: 'Civil Registry',
    desc: 'Birth, marriage and death certificates from the City Civil Registrar.',
  },
  {
    to: '/services/business',
    title: 'Business & Livelihood',
    desc: 'Permits, renewals, market stalls and trade support through the BPLO.',
  },
  {
    to: '/services/tax-payments',
    title: 'Taxes & Payments',
    desc: "Real property and business tax assessment at the Treasurer's Office.",
  },
  {
    to: '/services/health',
    title: 'Health Services',
    desc: 'Check-ups, vaccines and medicines through the City Health Office.',
  },
  {
    to: '/services/social-services',
    title: 'Social Welfare',
    desc: 'Assistance for seniors, PWDs, solo parents and indigent families.',
  },
  {
    to: '/services/agriculture',
    title: 'Agriculture & Fisheries',
    desc: 'Seedlings, coconut and fishery support from the City Agriculture Office.',
  },
  {
    to: '/services/public-safety',
    title: 'Disaster Preparedness',
    desc: 'Evacuation routes, typhoon advisories and CDRRMO programs.',
    tone: 'danger',
  },
  {
    to: '/visit-mati',
    title: 'Tourism',
    desc: 'Dahican, Pujada Bay, Sambuokan Festival, accredited guides and homestays.',
    tone: 'feel',
  },
];

const TRANSPARENCY: { heading: string; links: { href: string; label: string; sub: string }[] }[] = [
  {
    heading: 'On BetterMati',
    links: [
      { href: '/budget', label: 'Public funds', sub: 'Receipts and expenditures, FY2025' },
      {
        href: '/legislative',
        label: 'Ordinances & resolutions',
        sub: 'Sangguniang Panlungsod records',
      },
      { href: '/statistics', label: 'City statistics', sub: 'Population and land area' },
      { href: '/government', label: 'City government', sub: 'Offices and departments' },
    ],
  },
  {
    heading: 'Check nationally',
    links: [
      {
        href: 'https://www.philgeps.gov.ph/',
        label: 'PhilGEPS',
        sub: 'Procurement notices and awards',
      },
      {
        href: 'https://www.foi.gov.ph/',
        label: 'Freedom of Information',
        sub: 'Request records from any agency',
      },
      {
        href: 'https://data.gov.ph',
        label: 'Open Data Philippines',
        sub: 'Datasets published by government',
      },
      {
        href: 'https://www.coa.gov.ph/reports/annual-audit-reports/aar-local-government-units/',
        label: 'Commission on Audit',
        sub: 'Annual audit reports for LGUs',
      },
    ],
  },
  {
    heading: 'Civic tools',
    links: [
      {
        href: 'https://bettergov.ph',
        label: 'BetterGov.ph',
        sub: 'The national civic-tech portal',
      },
      { href: '/contact', label: 'Emergency hotlines', sub: 'Every number, as published' },
      { href: '/faq', label: 'Questions & answers', sub: 'How this portal works' },
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, '0');
const M = (n: number) => `₱${n.toFixed(2)}M`;
const isExternal = (href: string) => /^https?:\/\//.test(href);

// Initials for the leadership tiles, e.g. "Hon. Joel Mayo Z. Almario" -> "JA".
function initials(name: string): string {
  const parts = name
    .replace(/^Hon\.\s*/i, '')
    .replace(/["'.]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return '—';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';
  return (first + last).toUpperCase() || '—';
}

// ── Prototype primitives ──────────────────────────────────────────────────────

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'text-[0.6875rem] font-semibold tracking-[0.16em] text-[#4c5c78] uppercase',
        className
      )}
    >
      {children}
    </div>
  );
}

/** Heavy rule + mono index + display heading, with an optional right-aligned lede. */
function SectionHead({
  n,
  title,
  lede,
  id,
}: {
  n: number;
  title: string;
  lede?: string;
  id: string;
}) {
  return (
    <header className="mb-8 border-t-2 border-[#111827] pt-4">
      <div className="font-mono text-xs font-semibold tracking-[0.12em] text-[#2b62ee]">
        {pad(n)}
      </div>
      <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2
          id={id}
          className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#111827] sm:text-4xl"
        >
          {title}
        </h2>
        {lede ? (
          <p className="max-w-md text-base leading-relaxed text-[#4c5c78] md:text-right">{lede}</p>
        ) : null}
      </div>
    </header>
  );
}

/** Hairline grid whose cells share borders (the grid draws top/left, cells right/bottom). */
function RuledGrid({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('grid border-t border-l border-[#d6dee9]', className)}>{children}</div>;
}

function Cell({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('border-r border-b border-[#d6dee9] p-6', className)}>{children}</div>;
}

function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <AppLink
      to={to}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b62ee] underline decoration-1 underline-offset-[5px] hover:decoration-2"
    >
      {children} <ArrowRight className="size-3.5" aria-hidden="true" />
    </AppLink>
  );
}

function Inset({ tone = 'amber', children }: { tone?: 'amber' | 'royal'; children: ReactNode }) {
  return (
    <div
      className={cn(
        'border-l-[5px] px-6 py-5',
        tone === 'amber' ? 'border-[#ffc001] bg-[#fffbef]' : 'border-[#2b62ee] bg-[#eef4fe]'
      )}
    >
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomeSwiss() {
  const q = annualFinancials;
  const spending = [
    { label: 'General public services', v: q.expenditures.gps },
    { label: 'Social services', v: q.expenditures.social },
    { label: 'Economic services', v: q.expenditures.economic },
    { label: 'Special Education Fund', v: q.expenditures.sef ?? 0 },
    { label: 'Debt services (operating)', v: q.expenditures.debt },
    { label: 'Non-operating', v: q.expenditures.nonOperating },
  ].map((r) => ({ ...r, per100: (r.v / q.expenditures.total) * 100 }));

  const cdrrmo = hotlineById('cdrrmo');
  const police = hotlineById('pnp-mati');
  const leaders = [
    { role: 'City Mayor', name: officials.mayor?.name ?? 'Hon. [to be confirmed]' },
    {
      role: 'Vice Mayor · Presiding Officer',
      name: officials.vice_mayor?.name ?? 'Hon. [to be confirmed]',
    },
  ];
  const councilors = officials.councilors ?? [];

  const { items: news } = useNews();

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <Seo
        title="Homepage prototype"
        description="Design prototype of the BetterMati homepage in a neo-Swiss civic style."
      />
      <a
        href="#proto-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#ffc001] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#111827]"
      >
        Skip to main content
      </a>

      {/* ── Prototype notice ───────────────────────────────────────────────── */}
      <div className="bg-[#ffc001] text-[#111827]">
        <Container className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-[0.8125rem]">
          <span className="border border-[#111827] px-1.5 py-0.5 text-[0.625rem] font-bold tracking-[0.14em] uppercase">
            Prototype
          </span>
          <span>Design direction for the homepage. Not the live site.</span>
          <AppLink to="/" className="ml-auto font-semibold underline underline-offset-4">
            Current homepage
          </AppLink>
        </Container>
      </div>

      {/* ── Utility bar ────────────────────────────────────────────────────── */}
      <div className={cn(NAVY, 'text-[0.8125rem] text-white/80')}>
        <Container className="flex items-center gap-4 overflow-x-auto py-2 whitespace-nowrap">
          <span className="font-semibold text-white">BetterMati.org</span>
          <span className="hidden text-white/55 sm:inline">
            · Community-run portal for the City of Mati
          </span>
          <nav aria-label="Utility" className="ml-auto flex items-center gap-5">
            <AppLink to="/contact" className="hover:text-white">
              Hotlines
            </AppLink>
            <AppLink to="/budget" className="hover:text-white">
              Transparency
            </AppLink>
            <a href="https://data.gov.ph" className="hover:text-white">
              Open Data
            </a>
            <a href="https://www.foi.gov.ph/" className="hover:text-white">
              FOI
            </a>
          </nav>
        </Container>
      </div>

      {/* ── Masthead ───────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-[#d6dee9] bg-white">
        <img
          src="/bg-matigov_hero.jpg"
          alt=""
          className="absolute inset-y-0 right-0 hidden h-full w-[60%] object-cover md:block"
        />
        <div
          className="absolute inset-y-0 right-0 hidden w-[60%] bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.75)_35%,rgba(255,255,255,0)_100%)] md:block"
          aria-hidden="true"
        />
        <Container className="relative flex items-center gap-4 py-6 sm:gap-5 sm:py-8">
          <img
            src="/assets/images/logo/better-mati-logo.svg"
            alt=""
            className="size-14 shrink-0 sm:size-16"
          />
          <div>
            <Eyebrow>Province of Davao Oriental</Eyebrow>
            <div className="mt-1 font-display text-2xl font-extrabold tracking-[-0.025em] sm:text-3xl">
              City of Mati
            </div>
            <div className="mt-0.5 text-sm text-[#4c5c78] italic">
              More adventures, truly incredible.
            </div>
          </div>
        </Container>
      </div>

      {/* ── Primary navigation ─────────────────────────────────────────────── */}
      <nav aria-label="Primary" className="bg-[#2b62ee] text-white">
        <Container className="flex overflow-x-auto">
          {NAV.map(({ to, label }) => {
            const active = to === '/';
            return (
              <AppLink
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'shrink-0 border-b-4 px-4 py-4 text-[0.9375rem] font-semibold whitespace-nowrap first:-ml-4 hover:bg-white/10',
                  active ? 'border-[#ffc001]' : 'border-transparent'
                )}
              >
                {label}
              </AppLink>
            );
          })}
        </Container>
      </nav>

      <main id="proto-main">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className={cn(NAVY, 'text-white')} aria-labelledby="proto-hero-title">
          <Container className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="py-14 lg:py-20 lg:pr-14">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#ffc001]" aria-hidden="true" />
                <span className="text-[0.6875rem] font-semibold tracking-[0.18em] text-[#ffc001] uppercase">
                  City of Mati · Davao Oriental
                </span>
              </div>
              <h1
                id="proto-hero-title"
                className="mt-6 font-display text-[2.75rem] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-7xl"
              >
                Everything the city does, in one place.
              </h1>
              <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-white/75">
                Government services, public funds, and the coast that makes this place worth the
                trip.
              </p>

              <div className="mt-8 max-w-[520px]">
                <div className="mb-2 text-[0.6875rem] font-semibold tracking-[0.16em] text-white/60 uppercase">
                  Search services
                </div>
                <ServiceSearch
                  placeholder="e.g. birth certificate, business permit"
                  className="rounded-none! border-l-[5px] border-[#ffc001] shadow-none [&_[data-slot=command-input-wrapper]]:p-0 [&_[data-slot=input-group]]:h-12! [&_[data-slot=input-group]]:rounded-none! [&_[data-slot=input-group]]:border-0 [&_[data-slot=input-group]]:bg-white"
                />
              </div>

              <div className="mt-10 flex flex-col gap-1 border-t border-white/15 pt-6 sm:flex-row sm:gap-6">
                <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-[#ffc001] uppercase sm:pt-1">
                  Featured
                </span>
                <div>
                  <div className="font-semibold">Sambuokan Festival · every October</div>
                  <AppLink
                    to="/visit-mati"
                    className="mt-1 inline-flex items-center gap-1.5 text-white/75 underline-offset-4 hover:text-white hover:underline"
                  >
                    Festival guide <ArrowRight className="size-3.5" aria-hidden="true" />
                  </AppLink>
                </div>
              </div>
            </div>

            <div className="border-white/15 pb-14 lg:border-l lg:py-20 lg:pl-14">
              <div className="flex items-center justify-between">
                <span className="text-[0.6875rem] font-semibold tracking-[0.18em] text-white/70 uppercase">
                  For residents
                </span>
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-white/50">
                  {RESIDENT_TASKS.length} ENTRIES
                </span>
              </div>
              <ol className="mt-4 border-t border-white/15">
                {RESIDENT_TASKS.map((t, i) => (
                  <li key={t.to} className="border-b border-white/15">
                    <AppLink
                      to={t.to}
                      className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 py-5"
                    >
                      <span className="font-mono text-sm font-semibold text-[#ffc001]">
                        {pad(i + 1)}
                      </span>
                      <span>
                        <span className="block text-lg font-semibold group-hover:underline group-hover:underline-offset-4">
                          {t.title}
                        </span>
                        <span className="mt-1 block text-sm text-white/65">{t.desc}</span>
                      </span>
                      <ArrowRight
                        className="size-4 text-white/60 transition-transform group-hover:translate-x-1 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </AppLink>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* ── Hotline strip ────────────────────────────────────────────────── */}
        <section aria-label="Emergency hotlines" className="bg-[#e01b24] text-white">
          <Container className="grid sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`tel:${primaryNumber(nationalHotline).tel}`}
              className="-mx-4 block bg-[#b3151c] px-4 py-5 sm:mx-0 sm:px-6"
            >
              <Eyebrow className="text-white/80">Emergency</Eyebrow>
              <div className="mt-1 font-display text-4xl font-extrabold tracking-[-0.03em]">
                {primaryNumber(nationalHotline).display}{' '}
                <span className="text-base font-semibold">24/7</span>
              </div>
            </a>
            {[cdrrmo, police].map((h) => {
              const num = primaryNumber(h);
              return (
                <a
                  key={h.id}
                  href={`tel:${num.tel}`}
                  className="block border-white/20 py-5 sm:px-6 lg:border-l"
                >
                  <Eyebrow className="text-white/80">{h.short}</Eyebrow>
                  <div className="mt-2 font-display text-2xl font-bold tracking-[-0.01em]">
                    {num.display}
                  </div>
                </a>
              );
            })}
            <AppLink to="/contact" className="block border-white/20 py-5 sm:px-6 lg:border-l">
              <div className="inline-flex items-center gap-1.5 text-lg font-bold">
                All hotlines <ArrowRight className="size-4" aria-hidden="true" />
              </div>
              <div className="mt-1 text-sm text-white/80">
                Police, fire, medical and rescue for Mati
              </div>
            </AppLink>
          </Container>
        </section>

        <Container className="space-y-24 py-20">
          {/* ── 01 Mati at a glance ──────────────────────────────────────────── */}
          <section aria-labelledby="proto-glance">
            <SectionHead
              n={1}
              id="proto-glance"
              title="Mati at a glance"
              lede="The city in four numbers, from the Philippine Statistics Authority."
            />
            <RuledGrid className="grid-cols-2 lg:grid-cols-4">
              {[
                {
                  v: totalPopulation.toLocaleString(),
                  label: 'Residents',
                  meta: 'PSA 2024 POPCEN',
                },
                { v: String(barangayCount), label: 'Barangays', meta: 'Administrative villages' },
                { v: `${incomeClass} class`, label: 'Component city', meta: 'Income class' },
                { v: landAreaKm2, label: 'km² land area', meta: 'PSA 2013 basis' },
              ].map((s) => (
                <Cell key={s.label} className="p-5 sm:p-6">
                  <div className="font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                    {s.v}
                  </div>
                  <div className="mt-2 text-sm font-semibold">{s.label}</div>
                  <div className="mt-0.5 font-mono text-[0.6875rem] tracking-[0.06em] text-[#4c5c78] uppercase">
                    {s.meta}
                  </div>
                </Cell>
              ))}
            </RuledGrid>
            <div className="mt-5">
              <TextLink to="/statistics">Full city profile</TextLink>
            </div>
          </section>

          {/* ── 02 City services ─────────────────────────────────────────────── */}
          <section aria-labelledby="proto-services">
            <SectionHead
              n={2}
              id="proto-services"
              title="City services"
              lede="From certificates and permits to health, welfare and disaster preparedness."
            />
            <RuledGrid className="sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s, i) => (
                <Cell
                  key={s.title}
                  className={cn('flex flex-col', s.tone === 'feel' && 'bg-[#fffbef]')}
                >
                  <div className="font-mono text-xs text-[#4c5c78]">{pad(i + 1)}</div>
                  <h3
                    className={cn(
                      'mt-5 font-display text-lg font-bold tracking-[-0.01em]',
                      s.tone === 'danger' && 'text-[#b3151c]'
                    )}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 mb-6 text-sm leading-relaxed text-[#4c5c78]">{s.desc}</p>
                  <div className="mt-auto">
                    <TextLink to={s.to}>Open</TextLink>
                  </div>
                </Cell>
              ))}
            </RuledGrid>
          </section>

          {/* ── 03 Public funds ──────────────────────────────────────────────── */}
          <section aria-labelledby="proto-funds">
            <SectionHead
              n={3}
              id="proto-funds"
              title="Public funds"
              lede={`Where the city's money came from and where it went, FY${q.year}.`}
            />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <Eyebrow>Total receipts, FY{q.year}</Eyebrow>
                <div className="mt-3 font-display text-5xl leading-none font-extrabold tracking-[-0.04em] text-[#2b62ee] sm:text-6xl">
                  {M(q.receipts.total)}
                </div>
                <dl className="mt-6 border-t border-[#d6dee9]">
                  {[
                    ['Local sources', q.receipts.local],
                    ['External sources', q.receipts.external],
                    ['Non-income receipts', q.receipts.nonIncome],
                  ].map(([k, v]) => (
                    <div
                      key={k as string}
                      className="flex justify-between border-b border-[#d6dee9] py-3 text-sm"
                    >
                      <dt className="text-[#4c5c78]">{k}</dt>
                      <dd className="font-mono">{M(v as number)}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={`${fiscalSource.url}#page=3`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs text-[#4c5c78] underline underline-offset-4 hover:text-[#2b62ee]"
                >
                  Source: {fiscalSource.label}{' '}
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>
              </div>

              <div>
                <Eyebrow>Where every ₱100 of spending went</Eyebrow>
                <ul className="mt-3 border-t border-[#111827]">
                  {spending.map((r) => (
                    <li
                      key={r.label}
                      className="grid grid-cols-[1fr_4rem] items-center gap-x-4 gap-y-2 border-b border-[#d6dee9] py-3 text-sm sm:grid-cols-[13rem_1fr_4rem]"
                    >
                      <span>{r.label}</span>
                      <span className="order-last col-span-2 h-2 bg-[#eef4fe] sm:order-none sm:col-span-1">
                        <span
                          className="block h-2 bg-[#2b62ee]"
                          style={{ width: `${r.per100}%` }}
                        />
                      </span>
                      <span className="text-right font-mono">₱{r.per100.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#4c5c78]">
                  <span>
                    SPENT {M(q.expenditures.total)} · ENDING CASH {M(q.endingCashBalance)}
                  </span>
                  <TextLink to="/budget">Full statement</TextLink>
                </div>
              </div>
            </div>
          </section>

          {/* ── 04 City leadership ───────────────────────────────────────────── */}
          <section aria-labelledby="proto-leaders">
            <SectionHead
              n={4}
              id="proto-leaders"
              title="Your local officials"
              lede="The people elected to serve Mati."
            />
            <RuledGrid className="md:grid-cols-2 lg:grid-cols-3">
              {leaders.map((l, i) => (
                <Cell key={l.role}>
                  <div className="flex items-start justify-between">
                    <span className="flex size-14 items-center justify-center bg-[#0b2a5e] font-display text-lg font-bold text-white">
                      {initials(l.name)}
                    </span>
                    <span className="font-mono text-xs text-[#4c5c78]">{pad(i + 1)}</span>
                  </div>
                  <div className="mt-6 font-display text-lg font-bold">{l.name}</div>
                  <div className="mt-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-[#2b62ee] uppercase">
                    {l.role}
                  </div>
                </Cell>
              ))}
              {councilors.length > 0 ? (
                <Cell className="md:col-span-2 lg:col-span-1">
                  <div className="flex items-baseline justify-between">
                    <Eyebrow>Sangguniang Panlungsod</Eyebrow>
                    <span className="font-mono text-xs text-[#4c5c78]">
                      {councilors.length} COUNCILORS
                    </span>
                  </div>
                  <ol className="mt-4 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
                    {councilors.map((c, i) => (
                      <li
                        key={c.name}
                        className="flex gap-3 border-b border-[#eef1f5] py-1.5 text-sm last:border-b-0"
                      >
                        <span className="font-mono text-xs leading-5 text-[#4c5c78]">
                          {pad(i + 1)}
                        </span>
                        {c.name.replace(/^Hon\.\s*/i, '')}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4">
                    <TextLink to="/government/officials">Full council</TextLink>
                  </div>
                </Cell>
              ) : null}
            </RuledGrid>
          </section>

          {/* ── 05 Discover Mati ─────────────────────────────────────────────── */}
          <section aria-labelledby="proto-discover">
            <SectionHead
              n={5}
              id="proto-discover"
              title="Discover Mati"
              lede="The skimboarding capital, a protected bay, and a mountain the world agreed to protect."
            />
            <RuledGrid className="sm:grid-cols-2 lg:grid-cols-3">
              {featuredAttractions.map((a, i) => (
                <Cell key={a.slug} className={cn('flex flex-col', i === 0 && 'bg-[#eef4fe]')}>
                  <div className="text-[0.6875rem] font-semibold tracking-[0.14em] text-[#2b62ee] uppercase">
                    {a.category}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-[-0.015em]">
                    {a.name}
                  </h3>
                  <p className="mt-2 mb-6 line-clamp-3 text-sm leading-relaxed text-[#4c5c78]">
                    {a.blurb}
                  </p>
                  <div className="mt-auto">
                    <TextLink to={`/visit-mati/${a.slug}`}>Read</TextLink>
                  </div>
                </Cell>
              ))}
              <Cell className="flex flex-col justify-between bg-[#0b2a5e] text-white">
                <img
                  src="/assets/images/logo/feel-mati.png"
                  alt="Feel Mati"
                  className="h-auto w-36"
                />
                <AppLink
                  to="/visit-mati"
                  className="mt-8 inline-flex items-center gap-1.5 text-lg font-bold text-[#ffc001] underline-offset-4 hover:underline"
                >
                  Plan your visit <ArrowRight className="size-4" aria-hidden="true" />
                </AppLink>
              </Cell>
            </RuledGrid>

            <div className="mt-10">
              <Inset>
                <div className="font-semibold">Hanap ay trabaho? TrabaWho.</div>
                <p className="mt-1 text-[#4c5c78]">City job openings, in one list.</p>
                <div className="mt-3">
                  <TextLink to="/government">See openings</TextLink>
                </div>
              </Inset>
            </div>
          </section>

          {/* ── 06 News ──────────────────────────────────────────────────────── */}
          <section aria-labelledby="proto-news">
            <SectionHead n={6} id="proto-news" title="News and updates" />
            <ul className="border-t border-[#d6dee9]">
              {news === null ? (
                <li className="py-6 text-sm text-[#4c5c78]">Loading news…</li>
              ) : news.length === 0 ? (
                <li className="py-6 text-sm text-[#4c5c78]">No news yet.</li>
              ) : (
                news.slice(0, 4).map((n) => {
                  const href = safeNewsUrl(n.url) || '/news';
                  return (
                    <li key={n.id} className="border-b border-[#d6dee9]">
                      <AppLink
                        to={href}
                        className="group grid gap-x-10 gap-y-1 py-6 sm:grid-cols-[8rem_1fr_auto]"
                      >
                        <span className="font-mono text-xs leading-6 text-[#4c5c78]">{n.date}</span>
                        <span>
                          <span className="block font-semibold group-hover:underline group-hover:underline-offset-4">
                            {n.title}
                          </span>
                          <span className="mt-1 line-clamp-2 block text-sm text-[#4c5c78]">
                            {n.summary}
                          </span>
                        </span>
                        <ArrowRight
                          className="hidden size-4 text-[#4c5c78] transition-transform group-hover:translate-x-1 sm:block"
                          aria-hidden="true"
                        />
                      </AppLink>
                    </li>
                  );
                })
              )}
            </ul>
            <div className="mt-5">
              <TextLink to="/news">All news</TextLink>
            </div>
          </section>

          {/* ── 07 Transparency ──────────────────────────────────────────────── */}
          <section aria-labelledby="proto-transparency">
            <SectionHead
              n={7}
              id="proto-transparency"
              title="Transparency and accountability"
              lede="What the city publishes, plus the national portals that keep every LGU honest."
            />
            <div className="grid gap-10 md:grid-cols-3 md:gap-12">
              {TRANSPARENCY.map((col) => (
                <div key={col.heading}>
                  <Eyebrow className="border-b border-[#111827] pb-3">{col.heading}</Eyebrow>
                  <ul>
                    {col.links.map((l) => {
                      const ext = isExternal(l.href);
                      const inner = (
                        <>
                          <span className="inline-flex items-center gap-1 font-semibold group-hover:underline group-hover:underline-offset-4">
                            {l.label}
                            {ext ? <ArrowUpRight className="size-3.5" aria-hidden="true" /> : null}
                          </span>
                          <span className="mt-0.5 block text-sm text-[#4c5c78]">{l.sub}</span>
                        </>
                      );
                      return (
                        <li key={l.href} className="border-b border-[#d6dee9]">
                          {ext ? (
                            <a
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block py-3.5"
                            >
                              {inner}
                            </a>
                          ) : (
                            <AppLink to={l.href} className="group block py-3.5">
                              {inner}
                            </AppLink>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Inset tone="royal">
                Cost to build this site to date: <strong>₱400+</strong>. Cost to the People of Mati:{' '}
                <strong className="font-display text-xl text-[#0b2a5e]">₱0</strong>
              </Inset>
            </div>
          </section>
        </Container>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className={cn(NAVY, 'border-t-4 border-[#ffc001] text-sm text-white/70')}>
        <Container className="flex flex-col gap-3 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-lg font-bold text-white">BetterMati.org</div>
            <div className="mt-1">Community-run portal for the City of Mati, Davao Oriental.</div>
          </div>
          <AppLink to="/" className="font-semibold text-white underline underline-offset-4">
            Back to the current homepage
          </AppLink>
        </Container>
      </footer>
    </div>
  );
}
