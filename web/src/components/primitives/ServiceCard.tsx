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

// Legacy .service-item-card: white bordered card; icon+title, description, meta row.
export function ServiceCard({ icon, title, description, meta, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'rounded-[10px] border border-border bg-card p-6 transition hover:border-primary hover:shadow-sm',
        className
      )}
    >
      <h3 className="m-0 mb-2 flex items-center gap-2 text-base font-semibold text-foreground">
        {icon}
        {title}
      </h3>
      {description && <p className="m-0 mb-3 text-sm text-muted-foreground">{description}</p>}
      {meta && (
        <div className="flex gap-6 border-t border-border pt-3 text-[0.8125rem] text-muted-foreground">
          {meta}
        </div>
      )}
    </div>
  );
}
