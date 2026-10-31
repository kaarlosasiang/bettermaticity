import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Band,
  Container,
  FilterPanel,
  FilterSelect,
  PageHeader,
  SearchField,
} from '@/components/primitives';
import { formatChangeDate } from '@/lib/changelog';
import {
  LINK_KINDS,
  linkHost,
  officialLinks,
  officialLinksCheckedOn,
  type LinkKind,
} from '@/lib/officialLinks';

type Sort = 'kind' | 'name';
const count = (kind: LinkKind) => officialLinks.filter((l) => l.kind === kind).length;

// Official online destinations, after BetterSanFernando's /government/links: what kinds of
// destination there are, then a searchable directory. Every link was opened on its check
// date; one that no longer opens is removed rather than shown.
export default function GovernmentLinks() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<LinkKind | ''>('');
  const [sort, setSort] = useState<Sort>('kind');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = officialLinks.filter(
      (l) =>
        (!kind || l.kind === kind) &&
        (!q || `${l.name} ${l.owner} ${l.purpose} ${l.url}`.toLowerCase().includes(q))
    );
    // "kind" keeps the data's order inside each kind: the main site first.
    return sort === 'name'
      ? [...rows].sort((a, b) => a.name.localeCompare(b.name))
      : [...rows].sort((a, b) => LINK_KINDS.indexOf(a.kind) - LINK_KINDS.indexOf(b.kind));
  }, [query, kind, sort]);

  const checked = formatChangeDate(officialLinksCheckedOn, language, 'medium');

  return (
    <>
      <Seo
        title={t('links-title')}
        description="The City of Mati's official websites, online services and social media, plus the national portals that cover Mati, each checked."
        canonicalPath="/government/links"
      />

      <PageHeader
        badge={
          <>
            <Globe className="size-4" aria-hidden="true" />
            {t('links-eyebrow')}
          </>
        }
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-government'), to: '/government' },
          { label: t('links-title') },
        ]}
        title={t('links-title')}
        description={t('links-lede')}
        aside={{ label: t('links-about-label'), body: t('links-about-body') }}
        stats={[
          {
            label: t('links-stat-total'),
            value: officialLinks.length,
            caption: t('projects-checked-on', { date: checked }),
          },
          {
            label: t('links-stat-city'),
            value: officialLinks.length - count('national'),
            caption: t('links-stat-city-caption'),
          },
          {
            label: t('links-stat-national'),
            value: count('national'),
            caption: t('links-stat-national-caption'),
          },
        ]}
      />

      <Band id="kinds" eyebrow={t('links-kinds-eyebrow')} title={t('links-kinds-title')}>
        <ul className="mt-6 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {LINK_KINDS.map((k) => (
            <li key={k} className="border-r border-b border-line p-5">
              <h3 className="text-sm font-bold text-heading">{t(`links-kind-${k}`)}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-muted">{t(`links-kind-${k}-desc`)}</p>
              <p className="mt-2 font-mono text-xs text-royal">
                {t('links-kind-count', { count: count(k) })}
              </p>
            </li>
          ))}
        </ul>
      </Band>

      <Band
        id="directory"
        eyebrow={t('links-dir-eyebrow')}
        title={t('links-dir-title')}
        lede={t('links-dir-lede')}
      >
        <FilterPanel
          className="mt-6"
          title={t('links-filter')}
          action={
            query || kind ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setKind('');
                }}
                className="text-xs font-semibold text-royal hover:underline"
              >
                {t('projects-clear-filters')}
              </button>
            ) : null
          }
        >
          <SearchField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('links-search')}
            aria-label={t('links-search')}
            aria-controls="link-list"
          />
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FilterSelect
              id="link-kind"
              label={t('links-filter-kind')}
              value={kind}
              onChange={setKind}
              options={[
                { value: '' as const, label: t('links-all-kinds') },
                ...LINK_KINDS.map((k) => ({ value: k, label: t(`links-kind-${k}`) })),
              ]}
            />
            <FilterSelect
              id="link-sort"
              label={t('projects-sort')}
              value={sort}
              onChange={setSort}
              options={[
                { value: 'kind', label: t('links-sort-kind') },
                { value: 'name', label: t('links-sort-name') },
              ]}
            />
          </div>
        </FilterPanel>

        <p className="mt-6 text-sm text-ink-muted" aria-live="polite">
          {t('gov-directory-showing', { count: visible.length, total: officialLinks.length })}
        </p>

        {visible.length === 0 ? (
          <p className="mt-3 border border-line bg-white px-6 py-10 text-center text-sm text-ink-muted">
            {t('links-empty')}
          </p>
        ) : (
          <ul id="link-list" className="mt-3 divide-y divide-line border-y border-line">
            {visible.map((l) => (
              <li
                key={l.id}
                id={l.id}
                className="grid gap-3 py-5 sm:px-2 md:grid-cols-[minmax(0,1fr)_13rem] md:gap-8"
              >
                <div className="min-w-0">
                  <span
                    className={cn(
                      'inline-flex px-2 py-0.5 text-[0.6875rem] font-semibold',
                      l.kind === 'national'
                        ? 'bg-surface-subtle text-ink-soft ring-1 ring-line'
                        : 'bg-royal-tint text-royal'
                    )}
                  >
                    {t(`links-kind-${l.kind}`)}
                  </span>
                  <h3 className="mt-2 text-lg leading-snug font-bold text-heading">{l.name}</h3>
                  <p className="mt-0.5 text-sm text-ink-muted">{l.owner}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-ink">{l.purpose}</p>
                  {l.note ? (
                    <p className="mt-2 max-w-2xl text-xs leading-5 text-feel-text">{l.note}</p>
                  ) : null}
                </div>
                <div className="flex flex-col items-start gap-1 md:items-end md:pt-7 md:text-right">
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('links-open', { name: l.name })}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-royal hover:underline"
                  >
                    {linkHost(l.url)}
                    <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                  </a>
                  <span className="font-mono text-[0.6875rem] text-ink-faint">
                    {t('projects-checked-on', {
                      date: formatChangeDate(l.checkedOn, language, 'medium'),
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Band>

      <Band id="coverage" eyebrow={t('links-coverage-eyebrow')} title={t('links-coverage-title')}>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold text-heading">{t('links-coverage-verified')}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-muted">
              {t('links-coverage-verified-body')}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-heading">{t('links-coverage-missing')}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-muted">
              {t('links-coverage-missing-body')}
            </p>
          </div>
        </div>
      </Band>

      <section className="border-b border-line bg-white py-10">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <AppLink
            to="/government/offices"
            className="inline-flex items-center gap-1 font-semibold text-royal hover:underline"
          >
            {t('gov-link-offices')}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </AppLink>
          <AppLink
            to="/contact"
            className="inline-flex items-center gap-1 font-semibold text-royal hover:underline"
          >
            {t('gov-link-contact')}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </AppLink>
        </Container>
      </section>
    </>
  );
}
