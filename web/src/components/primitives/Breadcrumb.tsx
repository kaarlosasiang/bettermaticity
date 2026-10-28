import { Fragment } from 'react';
import { ChevronRight, House } from 'lucide-react';
import { AppLink } from '@/components/AppLink';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current page (last item). */
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Accessible name for the nav landmark. */
  label?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export function Breadcrumb({
  items,
  label = 'Breadcrumb',
  tone = 'light',
  className,
}: BreadcrumbProps) {
  const dark = tone === 'dark';
  return (
    <nav aria-label={label} className={cn('text-xs', className)}>
      {/* BetterSanFernando breadcrumb: house icon, › separators, current page darker. */}
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li
                className={cn(
                  'inline-flex items-center gap-1',
                  dark ? 'text-white/75' : 'text-ink-faint'
                )}
              >
                {i === 0 ? <House className="size-4" aria-hidden="true" /> : null}
                {item.to && !last ? (
                  <AppLink
                    to={item.to}
                    className={cn(
                      'transition-colors',
                      dark ? 'hover:text-white' : 'hover:text-royal'
                    )}
                  >
                    {item.label}
                  </AppLink>
                ) : (
                  <span
                    aria-current={last ? 'page' : undefined}
                    className={cn('font-medium', dark ? 'text-white' : 'text-ink')}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!last ? (
                <li aria-hidden="true" className={dark ? 'text-white/40' : 'text-ink-faint/45'}>
                  <ChevronRight className="size-4" />
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
