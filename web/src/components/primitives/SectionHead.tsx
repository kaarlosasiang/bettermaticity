import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';

interface SectionHeadProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  /** Heading level; sections under a page's h1 are h2. */
  as?: 'h2' | 'h3';
  /** Right-aligned slot beside the heading (e.g. a "View all" TextLink). */
  action?: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

// Eyebrow + bold heading + optional lede, with an optional action on the right.
export function SectionHead({
  eyebrow,
  title,
  lede,
  id,
  as: Tag = 'h2',
  action,
  tone = 'light',
  className,
}: SectionHeadProps) {
  const dark = tone === 'dark';
  return (
    <div
      className={cn(
        'mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className="grid max-w-2xl gap-2">
        {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        <Tag
          id={id}
          className={cn(
            'font-display text-[1.75rem] leading-[1.12] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl',
            dark ? 'text-white' : 'text-heading'
          )}
        >
          {title}
        </Tag>
        {lede ? (
          <p className={cn('text-base leading-relaxed', dark ? 'text-white/75' : 'text-ink-muted')}>
            {lede}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
