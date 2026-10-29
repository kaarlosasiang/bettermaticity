import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Page container: the stepped `container` (capped at 1200px from xl, 1320px from 2xl; see
// index.css), centred, 16px gutters.
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('container mx-auto px-4', className)} {...props} />;
}
