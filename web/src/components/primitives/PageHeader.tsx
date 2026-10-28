import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb';
import { ScopeAside } from './ScopeAside';
import { StatRow, type StatRowItem } from './StatRow';
import { heroClasses } from './hero';

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** `strong` = larger medium-weight lede (services pages). */
  ledeTone?: 'default' | 'strong';
  /** Small faint line under the lede. */
  note?: ReactNode;
  /** Mono kicker above the title. */
  eyebrow?: ReactNode;
  /** @deprecated Alias for `eyebrow`, kept for existing callers. */
  badge?: ReactNode;
  breadcrumb?: BreadcrumbItem[];
  /** Inline facts under the description, e.g. ["52 services", "11 categories"]. */
  meta?: ReactNode[];
  /** Buttons / links under the description. */
  actions?: ReactNode;
  /** Provenance box in the right column. */
  aside?: { label: ReactNode; title?: ReactNode; body?: ReactNode; footer?: ReactNode };
  /** Any other right-column content (e.g. a search card); used instead of `aside`. */
  sidePanel?: ReactNode;
  /** Full-width content under the title block (e.g. a "Service at a glance" box). */
  below?: ReactNode;
  /** Hairline stat row under the header. */
  stats?: StatRowItem[];
  /** `light` (default): white BetterSanFernando-style header. `brand`: the old navy band. */
  tone?: 'light' | 'brand';
  /** Optional content below the description (e.g. a search box). */
  children?: ReactNode;
  className?: string;
}

// Page title block: breadcrumb → eyebrow → large heading → lede → meta/actions, with an
// optional provenance aside on the right and a stat row underneath.
export function PageHeader({
  title,
  description,
  ledeTone = 'default',
  note,
  eyebrow,
  badge,
  breadcrumb,
  meta,
  actions,
  aside,
  sidePanel,
  below,
  stats,
  tone = 'light',
  children,
  className,
}: PageHeaderProps) {
  const brand = tone === 'brand';
  const kicker = eyebrow ?? badge;
  const side =
    sidePanel ??
    (aside ? (
      <ScopeAside label={aside.label} title={aside.title} footer={aside.footer}>
        {aside.body}
      </ScopeAside>
    ) : null);
  return (
    <section className={cn(brand ? 'bg-navy py-12 lg:py-16' : heroClasses.section, className)}>
      <Container>
        {breadcrumb ? (
          <Breadcrumb
            items={breadcrumb}
            tone={brand ? 'dark' : 'light'}
            className={heroClasses.breadcrumb}
          />
        ) : null}
        <div
          className={cn(
            'grid items-start gap-6 lg:gap-10',
            side && 'lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16'
          )}
        >
          <div className="max-w-3xl">
            {kicker ? (
              <Eyebrow tone={brand ? 'dark' : 'light'} className="flex items-center gap-2">
                {kicker}
              </Eyebrow>
            ) : null}
            <h1 className={cn(heroClasses.title, brand && 'text-white')}>{title}</h1>
            {description ? (
              <p
                className={cn(
                  ledeTone === 'strong' ? heroClasses.ledeStrong : heroClasses.lede,
                  brand && 'text-white/85'
                )}
              >
                {description}
              </p>
            ) : null}
            {note ? <p className={cn(heroClasses.note, brand && 'text-white/70')}>{note}</p> : null}
            {meta && meta.length > 0 ? (
              <ul className={cn(heroClasses.facts, brand && 'text-white/70')}>
                {meta.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            ) : null}
            {actions ? (
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">{actions}</div>
            ) : null}
            {children ? <div className="mt-6">{children}</div> : null}
          </div>
          {side}
        </div>
        {below ? <div className="mt-8">{below}</div> : null}
        {stats ? (
          <StatRow items={stats} tone={brand ? 'brand' : 'light'} className="mt-10" />
        ) : null}
      </Container>
    </section>
  );
}
