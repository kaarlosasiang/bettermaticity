import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: ReactNode;
  label: ReactNode;
  /** Optional mono source line under the label. */
  caption?: ReactNode;
  className?: string;
}

// Hairline-bordered stat tile: mono label, royal figure, optional mono caption.
export function StatCard({ value, label, caption, className }: StatCardProps) {
  return (
    <div className={cn('rounded-card border border-line bg-white px-4 py-4', className)}>
      <span className="block font-mono text-[0.6875rem] tracking-[0.1em] text-ink-muted uppercase">
        {label}
      </span>
      <span className="mt-1 block font-display text-[1.75rem] leading-none font-extrabold tracking-[-0.02em] text-royal tabular-nums">
        {value}
      </span>
      {caption ? (
        <span className="mt-1 block font-mono text-[0.6875rem] text-ink-muted">{caption}</span>
      ) : null}
    </div>
  );
}
