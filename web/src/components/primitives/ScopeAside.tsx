import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScopeAsideProps {
  /** Mono label, e.g. "About this directory" or "Data scope". */
  label: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  /** Small mono footer, e.g. "Checked 2026-09-24". */
  footer?: ReactNode;
  className?: string;
}

// Grey bordered box beside a page title that states where the data comes from and its limits.
export function ScopeAside({ label, title, children, footer, className }: ScopeAsideProps) {
  return (
    <aside
      className={cn(
        'grid content-start gap-2 rounded-card border border-line bg-surface-subtle px-6 py-5',
        className
      )}
    >
      <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-muted uppercase">
        {label}
      </p>
      {title ? <p className="text-base font-bold text-heading">{title}</p> : null}
      {children ? <div className="text-sm leading-relaxed text-ink-muted">{children}</div> : null}
      {footer ? (
        <p className="mt-1 border-t border-line pt-2.5 font-mono text-[0.6875rem] text-ink-muted">
          {footer}
        </p>
      ) : null}
    </aside>
  );
}
