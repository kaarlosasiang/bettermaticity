import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';

interface BandProps {
  /** Anchor id for the section; the heading gets `${id}-heading`. */
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  /** Extra bottom padding for the last band before the footer. */
  last?: boolean;
  className?: string;
}

// One titled content band, separated from the next by a hairline (BetterSanFernando's
// page sections): eyebrow, bold h2 and an optional lede, then the band's content.
export function Band({ id, eyebrow, title, lede, children, last, className }: BandProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        'border-b border-line bg-white py-10 sm:py-12 lg:py-14',
        last && 'pb-16 sm:pb-20 lg:pb-24',
        className
      )}
    >
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2
            id={`${id}-heading`}
            className="mt-2 text-2xl font-bold tracking-[-0.02em] text-heading md:text-3xl"
          >
            {title}
          </h2>
          {lede ? (
            <p className="mt-2 text-sm leading-6 text-ink-muted sm:text-base">{lede}</p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
