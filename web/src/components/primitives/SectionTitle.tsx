import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Legacy .section-title: 1.375rem, weight 600, text color, mb 24px, flex+gap for icon.
export function SectionTitle({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'mb-6 flex items-center gap-2 text-[1.375rem] font-semibold text-foreground',
        className
      )}
      {...props}
    />
  );
}

// Legacy .section-subtitle: 0.8125rem, text-light, margin -8px 0 16px.
export function SectionSubtitle({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cn('-mt-2 mb-4 text-[0.8125rem] text-muted-foreground', className)} {...props} />
  );
}
