import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InsetProps {
  tone?: 'amber' | 'royal' | 'neutral';
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const tones = {
  amber: 'border-amber bg-feel-bg',
  royal: 'border-royal bg-royal-tint',
  neutral: 'border-ink-muted bg-surface-subtle',
};

// Callout with a thick left rule (GOV.UK-style inset).
export function Inset({ tone = 'royal', title, children, className }: InsetProps) {
  return (
    <div className={cn('grid gap-1 rounded-r-card border-l-4 px-6 py-5', tones[tone], className)}>
      {title ? <p className="text-base font-bold text-heading">{title}</p> : null}
      {children ? <div className="text-sm leading-relaxed text-ink-muted">{children}</div> : null}
    </div>
  );
}
