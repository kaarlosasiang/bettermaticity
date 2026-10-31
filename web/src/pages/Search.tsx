import { useMemo, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, Search as SearchIcon } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Band, PageHeader, SearchField } from '@/components/primitives';
import {
  RESULT_TYPES,
  buildSearchIndex,
  createSearcher,
  type SearchRecord,
} from '@/lib/searchIndex';

// The query lives in the URL (?q=), so a search can be shared or reloaded. The server
// snapshot is empty: the prerendered page is the empty state and hydrates as such.
const QUERY_EVENT = 'bettermati:search-query';
function subscribeQuery(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  window.addEventListener(QUERY_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(QUERY_EVENT, onChange);
  };
}
const readQuery = () => new URLSearchParams(window.location.search).get('q') ?? '';
function writeQuery(value: string) {
  const url = new URL(window.location.href);
  if (value) url.searchParams.set('q', value);
  else url.searchParams.delete('q');
  window.history.replaceState(window.history.state, '', url);
  window.dispatchEvent(new Event(QUERY_EVENT));
}

const SUGGESTIONS = ['business permit', 'birth certificate', 'hotlines', 'budget', 'Dahican'];
const PER_GROUP = 8;

function ResultLink({ r }: { r: SearchRecord }) {
  const external = r.to.startsWith('http');
  const className = 'font-semibold text-heading hover:text-royal hover:underline';
  if (external)
    return (
      <a href={r.to} target="_blank" rel="noopener noreferrer" className={className}>
        {r.title}
        <ArrowUpRight className="ml-1 inline size-3.5 align-[-2px]" aria-hidden="true" />
      </a>
    );
  // #anchors need a full load to land on the anchor.
  if (r.to.includes('#'))
    return (
      <a href={r.to} className={className}>
        {r.title}
      </a>
    );
  return (
    <AppLink to={r.to} className={className}>
      {r.title}
    </AppLink>
  );
}

// Site-wide search, after BetterSanFernando's /search: one field over every page and
// published record, results grouped by kind. The query lives in ?q= so a search can be
// shared or reloaded.
export default function Search() {
  const { t } = useLanguage();
  const query = useSyncExternalStore(subscribeQuery, readQuery, () => '');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const update = (value: string) => {
    writeQuery(value);
    setExpanded(new Set());
  };

  const search = useMemo(() => createSearcher(buildSearchIndex(t)), [t]);
  const results = useMemo(() => (query.trim().length >= 2 ? search(query) : []), [query, search]);
  const groups = RESULT_TYPES.map((type) => ({
    type,
    items: results.filter((r) => r.type === type),
  })).filter((g) => g.items.length > 0);
  const searching = query.trim().length >= 2;

  return (
    <>
      <Seo
        title={t('search-title')}
        description="Search every page, service, office, project, procurement notice, document and official link on BetterMati.org."
        canonicalPath="/search"
      />

      <PageHeader
        badge={
          <>
            <SearchIcon className="size-4" aria-hidden="true" />
            {t('search-eyebrow')}
          </>
        }
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: t('search-title') }]}
        title={t('search-title')}
        description={t('search-lede')}
      />

      <Band id="results" title={t('search-results-title')} last>
        <div className="mt-6 max-w-2xl">
          <SearchField
            value={query}
            onChange={(e) => update(e.target.value)}
            placeholder={t('search-placeholder')}
            aria-label={t('search-placeholder')}
            aria-controls="search-results"
            autoFocus
          />
          <p className="mt-3 text-sm text-ink-muted" aria-live="polite">
            {searching ? t('search-count', { count: results.length, query: query.trim() }) : ''}
          </p>
          {!searching ? (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-ink-muted">{t('search-try')}</span>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => update(s)}
                  className="border border-line bg-white px-3 py-1 text-ink-soft transition-colors hover:border-royal hover:text-royal"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div id="search-results" className="mt-8">
          {searching && results.length === 0 ? (
            <p className="border border-line bg-white px-6 py-10 text-center text-sm text-ink-muted">
              {t('search-empty')}{' '}
              <AppLink to="/sitemap" className="font-semibold text-royal hover:underline">
                {t('footer-sitemap')}
              </AppLink>
            </p>
          ) : null}
          {groups.map(({ type, items }) => {
            const open = expanded.has(type);
            const shown = open ? items : items.slice(0, PER_GROUP);
            return (
              <section key={type} className="mt-8 first:mt-0" aria-labelledby={`results-${type}`}>
                <h3
                  id={`results-${type}`}
                  className="flex items-baseline justify-between gap-3 border-b-2 border-heading pb-2 text-lg font-bold text-heading"
                >
                  {t(`search-type-${type}`)}
                  <span className="font-mono text-xs font-medium text-ink-muted">
                    {items.length}
                  </span>
                </h3>
                <ul className="divide-y divide-line">
                  {shown.map((r) => (
                    <li key={r.id} className="py-3">
                      <ResultLink r={r} />
                      {r.desc ? (
                        <p className="mt-0.5 line-clamp-2 text-sm text-ink-muted">{r.desc}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                {items.length > PER_GROUP && !open ? (
                  <button
                    type="button"
                    onClick={() => setExpanded(new Set([...expanded, type]))}
                    className="mt-2 text-sm font-semibold text-royal hover:underline"
                  >
                    {t('search-show-all', { count: items.length })}
                  </button>
                ) : null}
              </section>
            );
          })}
        </div>
      </Band>
    </>
  );
}
