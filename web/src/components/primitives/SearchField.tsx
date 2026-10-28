import type { ComponentProps } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFieldProps extends Omit<ComponentProps<'input'>, 'type'> {
  /** Classes for the wrapper; the input keeps its own fixed styling. */
  className?: string;
}

// Tall search input with an inset icon (BetterSanFernando service finder). Focus shows on
// the field itself: royal border plus a soft ring, instead of the global focus halo.
export function SearchField({ className, ...props }: SearchFieldProps) {
  return (
    <div className={cn('relative min-w-0', className)}>
      <Search
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-faint"
        aria-hidden="true"
      />
      <input
        type="search"
        className="h-[52px] w-full rounded-btn border border-line bg-white pr-4 pl-12 text-base text-ink transition-[border-color,box-shadow] placeholder:text-ink-faint focus:border-royal focus:ring-3 focus:ring-royal/20 focus-visible:outline-none"
        {...props}
      />
    </div>
  );
}
