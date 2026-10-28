import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Eyebrow, SearchField } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';

interface DirectoryListProps<T> {
  /** Section id; the heading gets `${id}-heading`. */
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  help?: ReactNode;
  /** Items already filtered by the caller. */
  items: T[];
  /** Size of the unfiltered list, for "Showing N of M". */
  total: number;
  query?: string;
  onQueryChange?: (value: string) => void;
  searchPlaceholder?: string;
  emptyText: ReactNode;
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  /** `rows`: one hairline-divided column. `grid`: a ruled 2-column grid for short entries. */
  layout?: 'rows' | 'grid';
}

// Searchable directory (BetterSanFernando "Find an office"): eyebrow, heading and help,
// an optional search field, a live "Showing N of M" line, then a bordered hairline list.
export function DirectoryList<T>({
  id,
  eyebrow,
  title,
  help,
  items,
  total,
  query,
  onQueryChange,
  searchPlaceholder,
  emptyText,
  getKey,
  renderItem,
  layout = 'rows',
}: DirectoryListProps<T>) {
  const { t } = useLanguage();
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId}>
      {eyebrow ? (
        <p>
          <Eyebrow>{eyebrow}</Eyebrow>
        </p>
      ) : null}
      <h2
        id={headingId}
        className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-heading md:text-3xl"
      >
        {title}
      </h2>
      {help ? <p className="mt-2 text-sm leading-6 text-ink-muted">{help}</p> : null}
      {onQueryChange ? (
        <SearchField
          className="mt-6"
          value={query ?? ''}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-labelledby={headingId}
          aria-controls={`${id}-list`}
        />
      ) : null}
      <p className="mt-4 text-sm text-ink-muted" aria-live="polite">
        {t('gov-directory-showing', { count: items.length, total })}
      </p>
      {items.length === 0 ? (
        <p className="mt-3 border border-line bg-white px-6 py-10 text-center text-sm text-ink-muted">
          {emptyText}
        </p>
      ) : (
        <ul
          id={`${id}-list`}
          className={cn(
            'mt-3 border border-line',
            layout === 'grid'
              ? 'grid gap-px overflow-hidden bg-line sm:grid-cols-2'
              : 'divide-y divide-line bg-white'
          )}
        >
          {items.map((item) => (
            <li key={getKey(item)} className="bg-white px-4 py-5 md:px-6">
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
