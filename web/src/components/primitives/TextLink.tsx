import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { AppLink } from '@/components/AppLink';
import { cn } from '@/lib/utils';

interface TextLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

// Underlined royal link with a trailing arrow ("Browse services →").
export function TextLink({ to, children, className }: TextLinkProps) {
  return (
    <AppLink
      to={to}
      className={cn(
        'inline-flex items-center gap-1.5 text-sm font-semibold text-royal underline decoration-1 underline-offset-[5px] hover:decoration-2',
        className
      )}
    >
      {children} <ArrowRight className="size-3.5" aria-hidden="true" />
    </AppLink>
  );
}
