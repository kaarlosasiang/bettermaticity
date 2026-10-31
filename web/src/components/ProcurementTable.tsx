import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { FilterPanel, FilterSelect, Pager, SearchField, StatRow } from '@/components/primitives';
import { pesoCompact, pesoFull } from '@/lib/dpwhData';
import { formatChangeDate } from '@/lib/changelog';
import {
  noticeSearchText,
  procurementCheckedOn,
  procurementNotices,
  type ProcurementNotice,
} from '@/lib/infrastructureData';

const PAGE_SIZE = 10;
type Sort = 'newest' | 'oldest' | 'abc-high' | 'abc-low';

const sorters: Record<Sort, (a: ProcurementNotice, b: ProcurementNotice) => number> = {
  newest: (a, b) => b.publishedOn.localeCompare(a.publishedOn) || b.abc - a.abc,
  oldest: (a, b) => a.publishedOn.localeCompare(b.publishedOn) || b.abc - a.abc,
  'abc-high': (a, b) => b.abc - a.abc,
  'abc-low': (a, b) => a.abc - b.abc,
};

const STATUS_KEYS: Record<string, string> = {
  Active: 'projects-status-active',
  Awarded: 'trans-awarded',
  'Closed Expired': 'trans-closed-expired',
};

const unique = (values: string[]) => [...new Set(values)];
const notices = procurementNotices;

type Translate = ReturnType<typeof useLanguage>['t'];
// The three records first published with a translated title keep it; the rest show the
// plain-English name written from the notice.
const displayName = (p: ProcurementNotice, t: Translate) => {
  const key = `trans-project-${p.reference}`;
  const translated = t(key);
  return translated === key ? p.name : translated;
};
const active = notices.filter((p) => p.noticeStatus === 'Active');

function StatusChip({ status }: { status: string }) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-[0.6875rem] font-semibold whitespace-nowrap',
        status === 'Active' && 'bg-royal-tint text-royal',
        status === 'Awarded' && 'bg-navy text-white',
        status !== 'Active' &&
          status !== 'Awarded' &&
          'bg-surface-subtle text-ink-soft ring-1 ring-line'
      )}
    >
      {t(STATUS_KEYS[status] ?? status)}
    </span>
  );
}

// Procurement notices as a searchable, sortable table, after BetterSanFernando's
// /procurement/bid-results: summary figures, a filter box, a table on wide screens and
// stacked records on phones, then pages of ten. Every row links its official notice.
export function ProcurementTable() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [sort, setSort] = useState<Sort>('newest');
  const [page, setPage] = useState(1);
  const resultsTop = useRef<HTMLHeadingElement>(null);
  // A new page starts at the top of the results, not at the pager.
  const goToPage = (n: number) => {
    setPage(n);
    resultsTop.current?.scrollIntoView?.({ block: 'start' });
  };

  const date = (iso: string | null) =>
    iso ? (
      <time dateTime={iso}>{formatChangeDate(iso, language, 'medium')}</time>
    ) : (
      <span className="text-ink-faint">{t('projects-not-stated')}</span>
    );
  const title = (p: ProcurementNotice) => displayName(p, t);

  const filtersOn = Boolean(query || status || type || year);
  const reset = () => {
    setQuery('');
    setStatus('');
    setType('');
    setYear('');
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
    return notices
      .filter(
        (p) =>
          (!status || p.noticeStatus === status) &&
          (!type || p.classification === type) &&
          (!year || p.publishedOn.startsWith(year)) &&
          (!q || `${noticeSearchText(p)} ${displayName(p, t)}`.toLowerCase().includes(q))
      )
      .sort(sorters[sort]);
  }, [query, status, type, year, sort, t]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const from = filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0;

  const purchases = active.filter((p) => !p.sale);
  const checked = formatChangeDate(procurementCheckedOn, language);

  return (
    <>
      <StatRow
        className="mt-8"
        items={[
          {
            label: t('projects-stat-notices'),
            value: notices.length,
            caption: t('projects-stat-notices-caption', {
              city: notices.filter((p) => p.scope === 'local').length,
              national: notices.filter((p) => p.scope === 'national').length,
            }),
          },
          {
            label: t('projects-stat-active'),
            value: active.length,
            caption: t('projects-stat-active-caption', { date: checked }),
          },
          {
            label: t('projects-stat-awarded'),
            value: notices.filter((p) => p.noticeStatus === 'Awarded').length,
            caption: t('projects-stat-awarded-caption'),
          },
          {
            label: t('projects-stat-abc'),
            value: pesoCompact(purchases.reduce((sum, p) => sum + p.abc, 0)),
            caption: t('projects-stat-abc-caption', { count: purchases.length }),
          },
        ]}
      />

      <FilterPanel
        className="mt-8"
        title={t('projects-filter-notices')}
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
          placeholder={t('projects-search-notices')}
          aria-label={t('projects-search-notices')}
        />
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            id="notice-status"
            label={t('projects-filter-status')}
            value={status}
            onChange={on(setStatus)}
            options={[
              { value: '', label: t('projects-all-statuses') },
              ...unique(notices.map((p) => p.noticeStatus)).map((s) => ({
                value: s,
                label: t(STATUS_KEYS[s] ?? s),
              })),
            ]}
          />
          <FilterSelect
            id="notice-type"
            label={t('projects-filter-classification')}
            value={type}
            onChange={on(setType)}
            options={[
              { value: '', label: t('projects-all-classifications') },
              ...unique(notices.map((p) => p.classification))
                .sort()
                .map((c) => ({ value: c, label: c })),
            ]}
          />
          <FilterSelect
            id="notice-year"
            label={t('projects-filter-year')}
            value={year}
            onChange={on(setYear)}
            options={[
              { value: '', label: t('projects-all-years') },
              ...unique(notices.map((p) => p.publishedOn.slice(0, 4)))
                .sort()
                .reverse()
                .map((y) => ({ value: y, label: y })),
            ]}
          />
          <FilterSelect
            id="notice-sort"
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
          {t('projects-notice-count', { count: filtered.length })}
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
        <>
          {/* Wide screens: the table. */}
          <div className="mt-4 hidden border border-line bg-white lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{t('projects-notices-title')}</caption>
              <thead>
                <tr className="border-b border-line bg-surface-subtle text-xs font-semibold text-ink-soft">
                  <th scope="col" className="w-[31%] px-4 py-3">
                    {t('projects-col-notice')}
                  </th>
                  <th scope="col" className="w-[16%] px-4 py-3">
                    {t('projects-col-reference')}
                  </th>
                  <th scope="col" className="w-[10%] px-4 py-3">
                    {t('projects-col-published')}
                  </th>
                  <th scope="col" className="w-[10%] px-4 py-3">
                    {t('projects-col-closing')}
                  </th>
                  <th scope="col" className="w-[12%] px-4 py-3 text-right">
                    <abbr title={t('trans-abc')} className="no-underline">
                      ABC
                    </abbr>
                  </th>
                  <th scope="col" className="w-[9%] px-4 py-3">
                    {t('projects-col-status')}
                  </th>
                  <th scope="col" className="w-[12%] px-4 py-3 text-right">
                    {t('projects-col-source')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-sm">
                {shown.map((p) => (
                  <tr
                    key={p.reference}
                    className="align-top transition-colors hover:bg-surface-subtle/60"
                  >
                    <td className="px-4 py-3">
                      <span className="font-semibold text-heading">{title(p)}</span>
                      <span className="mt-0.5 block text-xs text-ink-muted">
                        {p.classification} · {p.mode}
                      </span>
                      {p.scope === 'national' ? (
                        <span className="mt-0.5 block text-xs text-ink-muted">{p.agency}</span>
                      ) : null}
                      {p.funding ? (
                        <span className="mt-0.5 block text-xs text-ink-muted">
                          {t('projects-funding', { source: p.funding })}
                        </span>
                      ) : null}
                      {p.sale ? (
                        <span className="mt-1 block text-xs font-medium text-feel-text">
                          {t('projects-sale-note')}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <span className="block font-mono text-xs font-medium break-words text-heading">
                        {p.id}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.6875rem] text-ink-faint">
                        {p.sourceName} {p.reference}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap text-ink-soft">
                      {date(p.publishedOn)}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap text-ink-soft">
                      {date(p.closingOn)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold whitespace-nowrap text-heading tabular-nums">
                      {pesoFull(p.abc)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusChip status={p.noticeStatus} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={p.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('projects-open-notice', { title: title(p) })}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-royal hover:underline"
                      >
                        {t('projects-official-notice')}
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                      <span className="mt-0.5 block text-[0.6875rem] whitespace-nowrap text-ink-faint">
                        {t('projects-checked-on', {
                          date: formatChangeDate(p.checkedOn, language, 'medium'),
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phones and tablets: one stacked record per notice. */}
          <ol className="mt-4 divide-y divide-line border border-line bg-white lg:hidden">
            {shown.map((p) => (
              <li key={p.reference} className="space-y-3 p-4 sm:p-5">
                <div>
                  <StatusChip status={p.noticeStatus} />
                  <p className="mt-2 leading-snug font-bold text-heading">{title(p)}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {p.classification} · {p.mode}
                  </p>
                  {p.scope === 'national' ? (
                    <p className="mt-0.5 text-xs text-ink-muted">{p.agency}</p>
                  ) : null}
                  {p.funding ? (
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {t('projects-funding', { source: p.funding })}
                    </p>
                  ) : null}
                  {p.sale ? (
                    <p className="mt-1 text-xs font-medium text-feel-text">
                      {t('projects-sale-note')}
                    </p>
                  ) : null}
                </div>
                <dl className="grid grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2">
                    <dt className="font-medium text-ink-muted">{t('projects-col-reference')}</dt>
                    <dd className="mt-0.5 font-mono font-medium break-words text-heading">
                      {p.id} · {p.sourceName} {p.reference}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink-muted">{t('projects-col-published')}</dt>
                    <dd className="mt-0.5 font-medium text-heading">{date(p.publishedOn)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink-muted">{t('projects-col-closing')}</dt>
                    <dd className="mt-0.5 font-medium text-heading">{date(p.closingOn)}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-medium text-ink-muted">{t('trans-abc')}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-heading tabular-nums">
                      {pesoFull(p.abc)}
                    </dd>
                  </div>
                </dl>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3 text-xs">
                  <span className="text-ink-faint">
                    {t('projects-checked-on', {
                      date: formatChangeDate(p.checkedOn, language, 'medium'),
                    })}
                  </span>
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('projects-open-notice', { title: title(p) })}
                    className="inline-flex items-center gap-1 font-semibold text-royal hover:underline"
                  >
                    {t('projects-official-notice')}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      <Pager
        page={page}
        pageCount={pageCount}
        onPage={goToPage}
        label={t('projects-pages-notices')}
      />

      <p className="mt-6 max-w-3xl text-xs leading-5 text-ink-muted">
        {t('projects-notices-footnote')} {t('trans-project-unknowns')}
      </p>
    </>
  );
}
