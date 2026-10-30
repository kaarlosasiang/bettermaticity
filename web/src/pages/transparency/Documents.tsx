import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, FolderOpen } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Band, PageHeader, SearchField } from '@/components/primitives';
import { cn } from '@/lib/utils';
import { formatChangeDate } from '@/lib/changelog';
import {
  documentsCheckedOn,
  officialDocuments,
  type DocumentStatus,
  type OfficialDocument,
} from '@/lib/transparencyData';

const STATUS_CLASS: Record<DocumentStatus, string> = {
  current: 'border-green-200 bg-green-50 text-green-800',
  archived: 'border-feel-text/25 bg-feel-tint text-feel-text',
  unavailable: 'border-line bg-surface-subtle text-ink-muted',
};

function DocumentRow({ doc }: { doc: OfficialDocument }) {
  const { t, language } = useLanguage();
  const unavailable = doc.status === 'unavailable';
  return (
    <li id={doc.id} className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
      <div className="min-w-0">
        <span
          className={cn(
            'inline-flex w-fit items-center border px-2 py-0.5 font-mono text-[0.6875rem] font-semibold tracking-[0.08em] uppercase',
            STATUS_CLASS[doc.status]
          )}
        >
          {t(`docs-status-${doc.status}`)}
        </span>
        <h4 className="mt-2 text-base font-bold text-heading">{doc.title}</h4>
        <p className="mt-1 text-sm text-ink-soft">
          {doc.issuer} · {doc.edition}
          {doc.pages ? ` · ${t('fdp-pages', { count: doc.pages })}` : ''}
        </p>
        <p className="mt-1 text-sm leading-6 text-ink-muted">{doc.note}</p>
        {doc.archivedOn && (
          <p className="mt-1 text-xs text-ink-muted">
            {t('fdp-archived-on', { date: formatChangeDate(doc.archivedOn, language) })}
          </p>
        )}
      </div>
      <div className="sm:text-right">
        {unavailable ? (
          <span className="text-sm text-ink-faint">{t('docs-not-available')}</span>
        ) : doc.parts ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:max-w-56 sm:justify-end">
            {doc.parts.map((p) => (
              <li key={p.url}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-royal hover:underline"
                >
                  {p.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-royal hover:underline"
          >
            {t(doc.status === 'archived' ? 'fdp-open-archived' : 'docs-open')}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </li>
  );
}

// Official documents, after BetterSanFernando's /transparency/documents: a small,
// verified index grouped by kind. Archived copies are labelled as such, and a document
// that no longer opens is listed as unavailable rather than silently dropped.
export default function Documents() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return officialDocuments;
    return officialDocuments.filter((d) =>
      `${d.title} ${d.type} ${d.issuer} ${d.edition}`.toLowerCase().includes(q)
    );
  }, [query]);

  const groups = useMemo(() => {
    const byType = new Map<string, OfficialDocument[]>();
    for (const d of filtered) byType.set(d.type, [...(byType.get(d.type) ?? []), d]);
    return [...byType.entries()];
  }, [filtered]);

  return (
    <>
      <Seo
        title={t('docs-page-name')}
        description="Official documents about the City of Mati: its charter, ordinances and application forms, each opened and checked."
        canonicalPath="/transparency/documents"
      />

      <PageHeader
        badge={
          <>
            <FolderOpen className="size-4" aria-hidden="true" />
            {t('docs-eyebrow')}
          </>
        }
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-transparency'), to: '/transparency' },
          { label: t('docs-page-name') },
        ]}
        title={t('docs-page-name')}
        description={t('docs-lede')}
        meta={[t('docs-count', { count: officialDocuments.length })]}
        aside={{
          label: t('docs-about-label'),
          title: t('docs-about-title'),
          body: t('docs-about-body'),
        }}
      />

      <Band id="library" eyebrow={t('docs-library-eyebrow')} title={t('docs-library-title')}>
        <div className="mt-6 max-w-xl">
          <SearchField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('docs-search')}
            aria-label={t('docs-search')}
          />
          <p className="mt-2 text-sm text-ink-muted" aria-live="polite">
            {t('gov-directory-showing', {
              count: filtered.length,
              total: officialDocuments.length,
            })}
          </p>
        </div>
        {groups.length === 0 ? (
          <p className="mt-8 text-sm text-ink-muted">{t('fdp-no-match')}</p>
        ) : (
          groups.map(([type, docs]) => (
            <section key={type} className="mt-8" aria-label={type}>
              <h3 className="border-b-2 border-heading pb-2 text-xl font-bold text-heading">
                {type}
              </h3>
              <ul className="divide-y divide-line">
                {docs.map((d) => (
                  <DocumentRow key={d.id} doc={d} />
                ))}
              </ul>
            </section>
          ))
        )}
      </Band>

      <Band id="how-to-read" eyebrow={t('docs-read-eyebrow')} title={t('docs-read-title')}>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {['verification', 'currency', 'coverage'].map((k) => (
            <div key={k} className="space-y-2">
              <h3 className="text-base font-bold text-heading">{t(`docs-read-${k}`)}</h3>
              <p className="text-sm leading-6 text-ink-soft">{t(`docs-read-${k}-desc`)}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 border-t border-line pt-4 text-sm text-ink-muted">
          {t('sources-checked')}: {formatChangeDate(documentsCheckedOn, language)}
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
            ['/legislative', 'nav-legislative-overview'],
            ['/transparency/full-disclosure', 'fdp-page-name'],
            ['/transparency/projects', 'projects-page-name'],
            ['/services', 'nav-services'],
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
