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

// Homepage-style card: hairline ring + royal top-border accent, navy title.
export function ServiceCard({ icon, title, description, meta, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-t-[3px] border-[#2b62ee] bg-white p-6 shadow-[0_0_0_1px_rgba(18,60,122,0.07)] transition hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]',
        className
      )}
    >
      <h3 className="m-0 mb-2 flex items-center gap-2 font-display text-base font-bold text-[#123c7a]">
        {icon}
        {title}
      </h3>
      {description && <p className="m-0 mb-3 text-sm text-[#4c5c78]">{description}</p>}
      {meta && (
        <div className="flex gap-6 border-t border-[#e3e8ef] pt-3 text-[0.8125rem] text-[#4c5c78]">
          {meta}
        </div>
      )}
    </div>
  );
}
