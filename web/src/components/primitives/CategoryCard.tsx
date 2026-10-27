import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { AppLink } from '@/components/AppLink';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: ReactNode;
  description?: ReactNode;
  /** Mono count line, e.g. "9 services". */
  count?: ReactNode;
  to: string;
  cta?: string;
  className?: string;
}

// Whole-cell link for a RuledGrid: royal title, description, mono count, "Browse →".
export function CategoryCard({ title, description, count, to, cta, className }: CategoryCardProps) {
  return (
    <AppLink
      to={to}
      className={cn(
        'group grid h-full min-w-0 content-start gap-1.5 bg-white p-6 transition-colors hover:bg-surface-subtle',
        className
      )}
    >
      <span className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-heading group-hover:text-royal">
        {title}
      </span>
      {description ? (
        <span className="text-sm leading-relaxed text-ink-muted">{description}</span>
      ) : null}
      {count ? (
        <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-muted uppercase">
          {count}
        </span>
      ) : null}
      {cta ? (
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-royal underline decoration-1 underline-offset-[5px] group-hover:decoration-2">
          {cta} <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      ) : null}
    </AppLink>
  );
}
