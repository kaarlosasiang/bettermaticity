import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

interface GridProps extends ComponentProps<'div'> {
  /** Min column width for the auto-fit track (legacy .grid-2/3/4 = 300/250/200px). */
  min?: 200 | 250 | 300;
}

const cols: Record<NonNullable<GridProps['min']>, string> = {
  200: 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))]',
  250: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
  300: 'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
};

// Legacy .grid: display grid; gap 24px; auto-fit minmax columns.
export function Grid({ className, min = 250, ...props }: GridProps) {
  return <div className={cn('grid gap-6', cols[min], className)} {...props} />;
}
