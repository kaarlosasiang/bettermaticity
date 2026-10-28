import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Optional footer row (e.g. fee / processing time). */
  meta?: ReactNode;
  className?: string;
}

// Hairline-bordered card, navy title; the border turns royal on hover.
export function ServiceCard({ icon, title, description, meta, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-line bg-white p-6 transition-colors hover:border-royal',
        className
      )}
    >
      <h3 className="m-0 mb-2 flex items-center gap-2 font-display text-base font-bold text-heading">
        {icon}
        {title}
      </h3>
      {description && <p className="m-0 mb-3 text-sm text-ink-muted">{description}</p>}
      {meta && (
        <div className="flex gap-6 border-t border-line pt-3 text-[0.8125rem] text-ink-muted">
          {meta}
        </div>
      )}
    </div>
  );
}
