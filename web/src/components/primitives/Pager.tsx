import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface PagerProps {
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
  /** Accessible name for the pagination landmark. */
  label: string;
}

const button =
  'inline-flex h-9 items-center justify-center gap-1 border border-line bg-white px-3 text-sm font-medium text-heading enabled:cursor-pointer enabled:hover:border-royal enabled:hover:text-royal disabled:cursor-not-allowed disabled:text-ink-faint';

// Previous / numbered pages / Next under a paged record list. Renders nothing for a
// single page. Phones get "Page x of y" instead of the number buttons.
export function Pager({ page, pageCount, onPage, label }: PagerProps) {
  const { t } = useLanguage();
  if (pageCount <= 1) return null;
  return (
    <nav
      aria-label={label}
      className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5"
    >
      <button
        type="button"
        className={button}
        disabled={page === 1}
        onClick={() => onPage(page - 1)}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        {t('pager-previous')}
      </button>
      <p className="text-sm text-ink-muted sm:hidden">
        {t('pager-page-of', { page, total: pageCount })}
      </p>
      <ul className="hidden items-center gap-1.5 sm:flex">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <button
              type="button"
              aria-current={n === page ? 'page' : undefined}
              aria-label={t('pager-page', { page: n })}
              onClick={() => onPage(n)}
              className={cn(
                button,
                'min-w-9 px-2',
                n === page && 'border-royal bg-royal text-white enabled:hover:text-white'
              )}
            >
              {n}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={button}
        disabled={page === pageCount}
        onClick={() => onPage(page + 1)}
      >
        {t('pager-next')}
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
