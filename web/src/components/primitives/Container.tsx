import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Page container: max-width 1400px, centred, 16/24px gutters.
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-350 px-4 sm:px-6', className)} {...props} />;
}
