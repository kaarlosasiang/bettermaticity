import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, FileSpreadsheet } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Band, PageHeader, SearchField } from '@/components/primitives';
import { formatChangeDate } from '@/lib/changelog';
import {
  fdpCheckedOn,
  fdpDocumentTypes,
  fdpPortal,
  fdpRecords,
  recordYear,
  type FdpRecord,
} from '@/lib/transparencyData';

const years = fdpRecords.map((r) => recordYear(r.period)).filter((y): y is number => y !== null);
const FIRST = Math.min(...years);
const LAST = Math.max(...years);
const typesFound = new Set(fdpRecords.map((r) => r.type)).size;

function RecordRow({ record }: { record: FdpRecord }) {
  const { t, language } = useLanguage();
  return (
    <li className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
      <div className="min-w-0">
        <p className="font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-royal uppercase">
          {record.type}
        </p>
        <h4 className="mt-1 text-base font-bold text-heading">{record.title}</h4>
        <p className="mt-1 text-sm text-ink-soft">
          {record.period} · {t('fdp-pages', { count: record.pages })} · {record.issuer}
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          {t('fdp-archived-on', { date: formatChangeDate(record.archivedOn, language) })}
        </p>
      </div>
      <div className="sm:text-right">
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-royal hover:underline"
        >
          {t('fdp-open-archived')}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </li>
  );
}

// Full Disclosure reports, after BetterSanFernando's /transparency/full-disclosure: what
// the 14 required reports are, a searchable archive grouped by year, and how to read it.
// Records are archived copies of what the City once posted, each opened and checked.
export default function FullDisclosure() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fdpRecords;
    return fdpRecords.filter((r) => `${r.type} ${r.title} ${r.period}`.toLowerCase().includes(q));
  }, [query]);

  const groups = useMemo(() => {
    const byYear = new Map<string, FdpRecord[]>();
    for (const r of filtered) {
      const y = recordYear(r.period);
      const key = y === null ? t('fdp-year-unstated') : String(y);
      byYear.set(key, [...(byYear.get(key) ?? []), r]);
    }
    // Newest year first; records with no printed year go last.
    const rank = (k: string) => (/^\d{4}$/.test(k) ? Number(k) : 0);
    return [...byYear.entries()].sort((a, b) => rank(b[0]) - rank(a[0]));
  }, [filtered, t]);

  const countByType = (name: string) => fdpRecords.filter((r) => r.type === name).length;

  return (
    <>
      <Seo
        title={t('fdp-page-name')}
        description="Full Disclosure Policy reports of the City of Mati: budgets, fund utilization, procurement and cash flow reports, each linked to an archived copy."
        canonicalPath="/transparency/full-disclosure"
      />

      <PageHeader
        badge={
          <>
            <FileSpreadsheet className="size-4" aria-hidden="true" />
            {t('fdp-eyebrow')}
          </>
        }
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-transparency'), to: '/transparency' },
          { label: t('fdp-page-name') },
        ]}
        title={t('fdp-page-name')}
        description={t('fdp-lede')}
        meta={[
          t('fdp-count', { count: fdpRecords.length }),
          `${FIRST}–${LAST}`,
          t('fdp-types-found', { found: typesFound, total: fdpDocumentTypes.length }),
        ]}
        aside={{
          label: t('fdp-about-label'),
          title: t('fdp-about-title'),
          body: t('fdp-about-body', { from: FIRST, to: LAST }),
          footer: (
            <a
              href={fdpPortal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-royal hover:underline"
            >
              {t('fdp-portal-link')}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ),
        }}
      />

      <Band
        id="report-types"
        eyebrow={t('fdp-types-eyebrow')}
        title={t('fdp-types-title', { total: fdpDocumentTypes.length })}
        lede={t('fdp-types-lede')}
      >
        <ul className="mt-6 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {fdpDocumentTypes.map((d) => {
            const n = countByType(d.name);
            return (
              <li key={d.name} className="border-r border-b border-line p-5">
                <h3 className="text-sm font-bold text-heading">{d.name}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-muted">{d.meaning}</p>
                <p className={`mt-2 font-mono text-xs ${n ? 'text-royal' : 'text-ink-faint'}`}>
                  {n ? t('fdp-in-archive', { count: n }) : t('fdp-none-yet')}
                </p>
              </li>
            );
          })}
        </ul>
      </Band>

      <Band id="archive" eyebrow={t('fdp-archive-eyebrow')} title={t('fdp-archive-title')}>
        <div className="mt-6 max-w-xl">
          <SearchField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('fdp-search')}
            aria-label={t('fdp-search')}
          />
          <p className="mt-2 text-sm text-ink-muted" aria-live="polite">
            {t('gov-directory-showing', { count: filtered.length, total: fdpRecords.length })}
          </p>
        </div>

        {groups.length === 0 ? (
          <p className="mt-8 text-sm text-ink-muted">{t('fdp-no-match')}</p>
        ) : (
          groups.map(([year, records]) => (
            <section key={year} className="mt-8" aria-labelledby={`fdp-${year}`}>
              <h3
                id={`fdp-${year}`}
                className="border-b-2 border-heading pb-2 text-xl font-bold text-heading"
              >
                {year}
              </h3>
              <ul className="divide-y divide-line">
                {records.map((r) => (
                  <RecordRow key={r.url} record={r} />
                ))}
              </ul>
            </section>
          ))
        )}
      </Band>

      <Band id="understanding" eyebrow={t('fdp-read-eyebrow')} title={t('fdp-read-title')}>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {['verification', 'coverage', 'archive'].map((k) => (
            <div key={k} className="space-y-2">
              <h3 className="text-base font-bold text-heading">{t(`fdp-read-${k}`)}</h3>
              <p className="text-sm leading-6 text-ink-soft">{t(`fdp-read-${k}-desc`)}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 border-t border-line pt-4 text-sm text-ink-muted">
          {t('sources-checked')}: {formatChangeDate(fdpCheckedOn, language)}
        </p>
      </Band>

      <Band
        id="related"
        eyebrow={t('transparency-related-eyebrow')}
        title={t('transparency-related-title')}
        last
      >
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {[
            ['/transparency/finance', 'finance-page-name'],
            ['/transparency/documents', 'docs-page-name'],
            ['/transparency/sources', 'sources-page-name'],
            ['/transparency/methodology', 'method-page-name'],
          ].map(([to, key]) => (
            <li key={to}>
              <AppLink
                to={to}
                className="inline-flex items-center gap-1 font-semibold text-royal hover:underline"
              >
                {t(key)}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </AppLink>
            </li>
          ))}
        </ul>
      </Band>
    </>
  );
}
