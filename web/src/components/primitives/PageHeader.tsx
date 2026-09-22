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

// Homepage-style hero: solid Pujada navy, left-aligned, font-display title, a mono
// royal eyebrow badge. Matches the bespoke heroes on Home/Statistics/Budget/Government.
export function PageHeader({ title, description, badge, children, className }: PageHeaderProps) {
  return (
    <section className={cn('bg-[#123c7a] py-12 lg:py-16', className)}>
      <Container>
        <div className="max-w-2xl">
          {badge && (
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.08em] text-[#9dc0ff]">
              {badge}
            </span>
          )}
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.75rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-base leading-relaxed text-white/75">{description}</p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
