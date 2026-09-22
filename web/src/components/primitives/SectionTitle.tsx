import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Homepage-style section title: royal vertical bar + navy font-display heading.
// The `children` (any caller-passed icon + text) render after the bar.
export function SectionTitle({ className, children, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'mb-[18px] flex items-center gap-3.5 font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]',
        className
      )}
      {...props}
    >
      <span className="h-[26px] w-1 shrink-0 rounded bg-[#2b62ee]" aria-hidden="true" />
      {children}
    </h2>
  );
}

// Legacy .section-subtitle: 0.8125rem, text-light, margin -8px 0 16px.
export function SectionSubtitle({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cn('-mt-2 mb-4 text-[0.8125rem] text-muted-foreground', className)} {...props} />
  );
}
