import { Fragment } from 'react';
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
    <nav aria-label={label} className={cn('text-[0.8125rem]', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li className={dark ? 'text-white/75' : 'text-ink-muted'}>
                {item.to && !last ? (
                  <AppLink
                    to={item.to}
                    className={cn(
                      'hover:underline',
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
                <li aria-hidden="true" className={dark ? 'text-white/40' : 'text-line'}>
                  /
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
