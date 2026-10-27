import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';

interface SectionTitleProps extends ComponentProps<'h2'> {
  /** Optional mono kicker rendered above the heading. */
  eyebrow?: ReactNode;
}

// Section heading: bold navy text, optional mono eyebrow. Any caller-passed icon renders inline.
export function SectionTitle({ className, children, eyebrow, ...props }: SectionTitleProps) {
  const heading = (
    <h2
      className={cn(
        'mb-[18px] flex items-center gap-3 font-display text-2xl font-extrabold tracking-[-0.025em] text-heading',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
  if (!eyebrow) return heading;
  return (
    <div className="grid gap-2">
      <Eyebrow>{eyebrow}</Eyebrow>
      {heading}
    </div>
  );
}

// Legacy .section-subtitle: 0.8125rem, text-light, margin -8px 0 16px.
export function SectionSubtitle({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('-mt-2 mb-4 text-[0.8125rem] text-ink-muted', className)} {...props} />;
}
