import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Optional pill above the title (e.g. an icon + label). */
  badge?: ReactNode;
  /** Optional content below the description (e.g. a search box). */
  children?: ReactNode;
  className?: string;
}

// Legacy .page-header: linear-gradient(135deg, primary -> secondary); 48px padding;
// white text; centered content (max 600px); pill badge; 2rem h1; 90%-white desc.
export function PageHeader({ title, description, badge, children, className }: PageHeaderProps) {
  return (
    <section
      className={cn(
        'bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] py-12 text-white',
        className
      )}
    >
      <Container>
        <div className="mx-auto max-w-[600px] text-center">
          {badge && (
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-[0.8125rem] font-medium text-white">
              {badge}
            </span>
          )}
          <h1 className="mb-2 text-[2rem] leading-tight font-bold text-white">{title}</h1>
          {description && <p className="m-0 text-base text-white/90">{description}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
