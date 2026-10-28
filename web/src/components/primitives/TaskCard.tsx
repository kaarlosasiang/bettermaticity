import type { ReactNode } from 'react';
import { TextLink } from './TextLink';

interface TaskCardProps {
  /** Short mono tag above the title, e.g. "Services" or a step number. */
  tag?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  cta: string;
  to: string;
}

// A RuledGrid cell's content: tag, title, one-line description, arrow link.
export function TaskCard({ tag, title, description, cta, to }: TaskCardProps) {
  return (
    <div className="grid h-full content-start gap-2">
      {tag ? (
        <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-royal uppercase">
          {tag}
        </span>
      ) : null}
      <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-heading">{title}</h3>
      {description ? <p className="text-sm leading-relaxed text-ink-muted">{description}</p> : null}
      <TextLink to={to} className="mt-1.5">
        {cta}
      </TextLink>
    </div>
  );
}
