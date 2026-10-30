import type { ReactNode } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  title: ReactNode;
  /** Right side of the header row, e.g. a "Clear filters" button. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

// Tinted filter box above a searchable record list (BetterSanFernando "Filter bid
// results"): a small uppercase header, then the search field and filter selects.
export function FilterPanel({ title, action, children, className }: FilterPanelProps) {
  return (
    <div className={cn('border border-line bg-surface-subtle p-4 sm:p-5', className)}>
      <div className="mb-3 flex min-h-6 items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-heading uppercase">
          <SlidersHorizontal className="size-3.5" aria-hidden="true" />
          {title}
        </p>
        {action}
      </div>
      {children}
    </div>
  );
}

interface FilterSelectProps<V extends string> {
  id: string;
  label: ReactNode;
  value: V;
  onChange: (value: V) => void;
  options: { value: V; label: string }[];
}

// Labelled native select for a FilterPanel grid.
export function FilterSelect<V extends string>({
  id,
  label,
  value,
  onChange,
  options,
}: FilterSelectProps<V>) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-ink-soft">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as V)}
        className="h-11 w-full border border-line bg-white px-3 text-sm text-ink transition-[border-color,box-shadow] focus:border-royal focus:ring-3 focus:ring-royal/20 focus-visible:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
