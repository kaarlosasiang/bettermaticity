import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface StatRowItem {
  label: ReactNode;
  value: ReactNode;
  caption?: ReactNode;
}

interface StatRowProps {
  items: StatRowItem[];
  /** `light` on white bands; `brand` on navy/royal. */
  tone?: 'light' | 'brand';
  className?: string;
}

// Hairline-divided row of figures: mono label, big number, mono caption.
export function StatRow({ items, tone = 'light', className }: StatRowProps) {
  const brand = tone === 'brand';
  return (
    <dl
      className={cn(
        'grid grid-cols-2 border-t lg:grid-cols-4',
        brand ? 'border-white/20' : 'border-line',
        className
      )}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            'flex min-w-0 flex-col gap-0.5 py-4 pr-4',
            i % 2 === 1 && 'border-l pl-4',
            i >= 2 && 'border-t lg:border-t-0',
            i % 2 === 0 && i > 0 && 'lg:border-l lg:pl-5',
            i % 2 === 1 && 'lg:pl-5',
            brand ? 'border-white/20' : 'border-line'
          )}
        >
          <dt
            className={cn(
              'font-mono text-[0.6875rem] tracking-[0.1em] uppercase',
              brand ? 'text-white/70' : 'text-ink-muted'
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              'font-display text-[1.75rem] leading-tight font-extrabold tracking-[-0.03em] tabular-nums sm:text-4xl',
              brand ? 'text-white' : 'text-royal'
            )}
          >
            {item.value}
          </dd>
          {item.caption ? (
            <dd
              className={cn(
                'font-mono text-[0.6875rem]',
                brand ? 'text-white/70' : 'text-ink-muted'
              )}
            >
              {item.caption}
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
