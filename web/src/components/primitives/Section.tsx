import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends ComponentProps<'section'> {
  /** Legacy .section-compact: 24px vertical padding instead of 48/64px. */
  compact?: boolean;
  /** Legacy .bg-alt: subtle #f8f9fa background. */
  altBg?: boolean;
}

// Legacy .section: padding 48px 0 (64px 0 at >=768px). .section-compact: 24px 0.
export function Section({ className, compact, altBg, ...props }: SectionProps) {
  return (
    <section
      className={cn(compact ? 'py-6' : 'py-12 md:py-16', altBg && 'bg-[#f1f6fc]', className)}
      {...props}
    />
  );
}
