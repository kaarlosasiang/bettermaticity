import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { FilterPanel, FilterSelect, Pager, SearchField } from '@/components/primitives';
import { StageTrack } from '@/components/RisingProjects';
import { ProjectIcon } from '@/components/ProjectIcon';
import { pesoFull } from '@/lib/dpwhData';
import { formatChangeDate } from '@/lib/changelog';
import { risingProjects, projectAnchor, stageOf, type RisingProject } from '@/lib/risingProjects';

const PAGE_SIZE = 10;
type Sort = 'newest' | 'oldest' | 'amount-high' | 'amount-low';

const sorters: Record<Sort, (a: RisingProject, b: RisingProject) => number> = {
  newest: (a, b) => b.sourceDate.localeCompare(a.sourceDate),
  oldest: (a, b) => a.sourceDate.localeCompare(b.sourceDate),
  'amount-high': (a, b) => b.amount - a.amount,
  'amount-low': (a, b) => a.amount - b.amount,
};

const unique = (values: string[]) => [...new Set(values)];

// Status chip tone follows the stage of the paper trail: announced and company claims
// stay neutral, money in a budget or an award reads as royal.
function StatusChip({ status, label }: { status: string; label: string }) {
  const firm = (stageOf[status] ?? 0) >= 2 && status !== 'reported-complete';
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[0.6875rem] font-semibold',
        firm ? 'bg-royal-tint text-royal' : 'bg-surface-subtle text-ink-soft ring-1 ring-line'
      )}
    >
      {label}
    </span>
  );
}

// Searchable list of the major projects in Mati, laid out like BetterSanFernando's
// /projects/city-projects: a filter box, a count, then ruled rows with status, place and
// amount. Each row keeps its #project-… anchor for the Home page highlights.
export function ProjectLedger() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [scope, setScope] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<Sort>('newest');
  const [page, setPage] = useState(1);
  const resultsTop = useRef<HTMLHeadingElement>(null);
  // A new page starts at the top of the results, not at the pager.
  const goToPage = (n: number) => {
    setPage(n);
    resultsTop.current?.scrollIntoView?.({ block: 'start' });
  };

  const filtersOn = Boolean(query || status || scope || category);
  const reset = () => {
    setQuery('');
    setStatus('');
    setScope('');
    setCategory('');
    setPage(1);
  };
  // Any filter change returns to the first page.
  const on =
    <V,>(set: (v: V) => void) =>
    (v: V) => {
      set(v);
      setPage(1);
    };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return risingProjects
      .filter(
        (p) =>
          (!status || p.status === status) &&
          (!scope || p.scope === scope) &&
          (!category || p.category === category) &&
          (!q ||
            [
              t(p.titleKey),
              t(p.detailKey),
              t(`rising-status-${p.status}`),
              t(`rising-scope-${p.scope}`),
              t(`projects-type-${p.category}`),
              ...p.sources.map((s) => s.label),
            ]
              .join(' ')
              .toLowerCase()
              .includes(q))
      )
      .sort(sorters[sort]);
  }, [query, status, scope, category, sort, t]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const from = filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0;

  return (
    <div className="mt-8">
      <FilterPanel
        title={t('projects-filter-projects')}
        action={
          filtersOn ? (
            <button
              type="button"
              onClick={reset}
              className="text-xs font-semibold text-royal hover:underline"
            >
              {t('projects-clear-filters')}
            </button>
          ) : null
        }
      >
        <SearchField
          value={query}
          onChange={(e) => on(setQuery)(e.target.value)}
          placeholder={t('projects-search-projects')}
          aria-label={t('projects-search-projects')}
          aria-controls="project-ledger"
        />
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            id="project-status"
            label={t('projects-filter-status')}
            value={status}
            onChange={on(setStatus)}
            options={[
              { value: '', label: t('projects-all-statuses') },
              ...unique(risingProjects.map((p) => p.status)).map((s) => ({
                value: s,
                label: t(`rising-status-${s}`),
              })),
            ]}
          />
          <FilterSelect
            id="project-scope"
            label={t('projects-filter-funding')}
            value={scope}
            onChange={on(setScope)}
            options={[
              { value: '', label: t('projects-all-funding') },
              ...unique(risingProjects.map((p) => p.scope)).map((s) => ({
                value: s,
                label: t(`rising-scope-${s}`),
              })),
            ]}
          />
          <FilterSelect
            id="project-type"
            label={t('projects-filter-type')}
            value={category}
            onChange={on(setCategory)}
            options={[
              { value: '', label: t('projects-all-types') },
              ...unique(risingProjects.map((p) => p.category)).map((c) => ({
                value: c,
                label: t(`projects-type-${c}`),
              })),
            ]}
          />
          <FilterSelect
            id="project-sort"
            label={t('projects-sort')}
            value={sort}
            onChange={on(setSort)}
            options={(Object.keys(sorters) as Sort[]).map((s) => ({
              value: s,
              label: t(`projects-sort-${s}`),
            }))}
          />
        </div>
      </FilterPanel>

      <div className="mt-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h3 ref={resultsTop} className="scroll-mt-32 text-xl font-bold text-heading">
          {t('projects-count', { count: filtered.length })}
        </h3>
        <p className="text-sm text-ink-muted" aria-live="polite">
          {t('projects-showing-range', {
            from,
            to: from ? from + shown.length - 1 : 0,
            total: filtered.length,
          })}
        </p>
      </div>

      {shown.length === 0 ? (
        <p className="mt-4 border border-line bg-white px-6 py-10 text-center text-sm text-ink-muted">
          {t('projects-no-match')}
        </p>
      ) : (
        <ul id="project-ledger" className="mt-4 divide-y divide-line border-y border-line">
          {shown.map((p) => {
            return (
              <li
                key={p.id}
                id={projectAnchor(p)}
                className="scroll-mt-32 py-5 target:bg-royal-tint/50 sm:px-2"
              >
                <div className="grid gap-x-8 gap-y-4 md:grid-cols-[minmax(0,1fr)_15rem]">
                  <div className="min-w-0">
                    <StatusChip status={p.status} label={t(`rising-status-${p.status}`)} />
                    <h4 className="mt-2 text-lg leading-snug font-bold text-heading">
                      {t(p.titleKey)}
                    </h4>
                    <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm text-ink-muted">
                      <ProjectIcon
                        project={p}
                        className="size-3.5 shrink-0 text-royal"
                        aria-hidden="true"
                      />
                      {t(`rising-scope-${p.scope}`)} · {p.sourceDate.slice(0, 4)} ·{' '}
                      {t(`projects-type-${p.category}`)}
                    </p>
                    <p className="mt-3 text-sm">
                      <span className="text-ink-faint">{t(`rising-amount-${p.amountKind}`)}</span>{' '}
                      <span className="font-semibold text-heading tabular-nums">
                        {pesoFull(p.amount)}
                      </span>
                    </p>
                  </div>
                  <div className="md:pt-1">
                    <StageTrack status={p.status} tone="light" />
                    <p className="mt-2 text-xs text-ink-muted">
                      {t('rising-source-date')}{' '}
                      <time dateTime={p.sourceDate} className="font-medium text-heading">
                        {formatChangeDate(p.sourceDate, language)}
                      </time>
                    </p>
                  </div>
                </div>
                <details className="group mt-3">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-royal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal [&::-webkit-details-marker]:hidden">
                    {t('rising-details')}
                    <ChevronDown
                      className="size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="mt-3 max-w-3xl border-l-2 border-line pl-4">
                    <p className="text-sm leading-relaxed text-ink-muted">{t(p.detailKey)}</p>
                    <ul className="mt-3 space-y-2">
                      {p.sources.map((source) => (
                        <li key={source.url}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-start gap-1 text-sm font-semibold text-royal underline underline-offset-4"
                          >
                            {t('rising-read-source')} · {source.label}
                            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      )}

      <Pager
        page={page}
        pageCount={pageCount}
        onPage={goToPage}
        label={t('projects-pages-projects')}
      />
    </div>
  );
}
