import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Hairline grid whose cells share borders: a 1px gap over a line-coloured background,
// inside a hairline border. Pass the column classes (e.g. `sm:grid-cols-2 lg:grid-cols-3`).
export function RuledGrid({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'grid gap-px overflow-hidden rounded-card border border-line bg-line',
        className
      )}
      {...props}
    />
  );
}
