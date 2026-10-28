import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Page container: Tailwind's stepped `container` (1280px from xl, 1536px from 2xl), centred,
// 16px gutters — the same as BetterSanFernando.
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('container mx-auto px-4', className)} {...props} />;
}
