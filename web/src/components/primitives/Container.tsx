import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

// Legacy .container: width 100%; max-width 1200px; margin 0 auto; padding 0 24px.
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-300 px-6', className)} {...props} />;
}
