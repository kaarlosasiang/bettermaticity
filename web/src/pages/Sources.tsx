import type { ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Database, Download } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Band, PageHeader } from '@/components/primitives';
import { formatChangeDate } from '@/lib/changelog';
import { StatusBadge } from '@/components/SourceStatusBadge';
import {
  SOURCE_STATUSES,
  allDatasets,
  latestCheck,
  notPublished,
  sourceGroups,
  type Dataset,
} from '@/lib/sourceRegistry';

const SHOWN_SOURCES = 3;

// Links with a #hash are plain <a> so a full load lands on the anchor.
function PageLink({ to, children }: { to: string; children: ReactNode }) {
  const cls = 'inline-flex items-center gap-1 text-sm font-semibold text-royal hover:underline';
  return to.includes('#') ? (
    <a href={to} className={cls}>
      {children}
    </a>
  ) : (
    <AppLink to={to} className={cls}>
      {children}
    </AppLink>
  );
}

function SourceLinks({ dataset }: { dataset: Dataset }) {
  const { t } = useLanguage();
  if (dataset.sources.length === 0)
    return <p className="text-sm text-ink-muted">{t('sources-no-link')}</p>;
  const item = (s: { label: string; url: string }) => (
    <li key={s.url}>
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-start gap-1 text-sm leading-6 text-royal hover:underline"
      >
        <span>{s.label}</span>
        <ArrowUpRight className="mt-1 size-3.5 shrink-0" aria-hidden="true" />
      </a>
    </li>
  );
  const shown = dataset.sources.slice(0, SHOWN_SOURCES);
  const rest = dataset.sources.slice(SHOWN_SOURCES);
  return (
    <>
      <ul className="space-y-1">{shown.map(item)}</ul>
      {rest.length > 0 && (
        <details className="mt-1">
          <summary className="cursor-pointer text-sm font-semibold text-ink-soft hover:text-royal">
            {t('sources-more', { count: dataset.sources.length })}
          </summary>
          <ul className="mt-1 space-y-1">{rest.map(item)}</ul>
        </details>
      )}
    </>
  );
}

function DatasetRow({ dataset }: { dataset: Dataset }) {
  const { t, language } = useLanguage();
  const facts = [
    { label: t('sources-publisher'), value: dataset.publisher },
    { label: t('sources-period'), value: dataset.period },
    {
      label: t('sources-checked'),
      value: dataset.checkedOn
        ? formatChangeDate(dataset.checkedOn, language)
        : t('sources-not-checked'),
    },
  ];
  return (
    <article
      id={dataset.id}
      aria-labelledby={`${dataset.id}-title`}
      className="grid gap-5 border-b border-line py-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-10"
    >
      <div>
        <h4 id={`${dataset.id}-title`} className="text-base font-bold text-heading">
          {dataset.title}
        </h4>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-heading tabular-nums">
            {dataset.count.toLocaleString('en-PH')}
          </span>
          <span className="text-xs font-semibold tracking-wider text-ink-muted uppercase">
            {dataset.unit}
          </span>
        </p>
        <div className="mt-3">
          <StatusBadge status={dataset.status} />
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-sm leading-6 text-ink-soft">{dataset.summary}</p>
        <div className="mt-3 border-l-2 border-line pl-4">
          <p className="text-xs font-bold tracking-wider text-ink-muted uppercase">
            {t('sources-coverage')}
          </p>
          <p className="mt-1 text-sm leading-6 text-ink-soft">{dataset.coverage}</p>
        </div>

        <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs font-bold tracking-wider text-ink-muted uppercase">
                {f.label}
              </dt>
              <dd className="mt-0.5 text-sm text-heading">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-wider text-ink-muted uppercase">
              {t('sources-official')}
            </p>
            <div className="mt-1">
              <SourceLinks dataset={dataset} />
            </div>
          </div>
          <div className="space-y-2 sm:text-right">
            <PageLink to={dataset.page.to}>
              {dataset.page.label}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </PageLink>
            {dataset.downloads?.map((d) => (
              <a
                key={d.href}
                href={d.href}
                download
                className="flex items-center gap-1.5 font-mono text-xs text-ink-soft hover:text-royal sm:justify-end"
              >
                <Download className="size-3.5" aria-hidden="true" />
                {d.label}
              </a>
            ))}
          </div>
        </div>

        {dataset.confirmWith && (
          <p className="mt-4 text-sm text-ink-muted">
            {t('sources-confirm')}:{' '}
            <span className="font-semibold text-heading">{dataset.confirmWith}</span>
          </p>
        )}
      </div>
    </article>
  );
}

// Source registry, after BetterSanFernando's /transparency/sources: how sourcing works,
// every published dataset with its authority, coverage, period and last check, then
// what is still a draft and what the site leaves out. Built from lib/sourceRegistry.
export default function Sources() {
  const { t, language } = useLanguage();
  const published = sourceGroups
    .map((g) => ({ ...g, datasets: g.datasets.filter((d) => d.status !== 'draft') }))
    .filter((g) => g.datasets.length > 0);
  const drafts = allDatasets.filter((d) => d.status === 'draft');
  const verified = allDatasets.filter((d) => d.status === 'verified').length;
  const lastChecked = latestCheck();

  const glance = [
    { label: t('sources-glance-datasets'), value: String(allDatasets.length) },
    { label: t('sources-glance-verified'), value: String(verified) },
    { label: t('sources-glance-awaiting'), value: String(allDatasets.length - verified) },
    {
      label: t('sources-glance-checked'),
      value: lastChecked ? formatChangeDate(lastChecked, language) : '—',
    },
  ];

  return (
    <>
      <Seo
        title={t('sources-page-name')}
        description="Every dataset on BetterMati.org: who stands behind it, what it covers, when it was last checked, and where to read the original source."
        canonicalPath="/transparency/sources"
      />

      <PageHeader
        badge={
          <>
            <Database className="size-4" aria-hidden="true" />
            {t('sources-eyebrow')}
          </>
        }
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-transparency'), to: '/transparency' },
          { label: t('sources-page-name') },
        ]}
        title={t('sources-title')}
        description={t('sources-lede')}
        sidePanel={
          <div className="border border-line bg-surface-subtle p-5">
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-muted uppercase">
              {t('sources-glance')}
            </p>
            <dl className="mt-2 divide-y divide-line">
              {glance.map((g) => (
                <div key={g.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-sm text-ink-muted">{g.label}</dt>
                  <dd className="text-sm font-bold text-heading tabular-nums">{g.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#registry"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-royal hover:underline"
            >
              {t('sources-browse')}
              <ArrowDown className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        }
      />

      <Band id="how" eyebrow={t('sources-how-eyebrow')} title={t('sources-how-title')}>
        <ol className="mt-6 grid grid-cols-1 border-t border-l border-line md:grid-cols-3">
          {['fact', 'authority', 'link'].map((k, i) => (
            <li key={k} className="border-r border-b border-line p-5 sm:p-6">
              <p className="font-mono text-xs font-semibold text-royal">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-base font-bold text-heading">{t(`sources-step-${k}`)}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-muted">{t(`sources-step-${k}-desc`)}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-10 text-lg font-bold text-heading">{t('sources-status-title')}</h3>
        <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {SOURCE_STATUSES.map((s) => (
            <div key={s} className="flex items-start gap-3">
              <dt className="w-28 shrink-0">
                <StatusBadge status={s} />
              </dt>
              <dd className="text-sm leading-6 text-ink-soft">{t(`sources-status-${s}-desc`)}</dd>
            </div>
          ))}
        </dl>
      </Band>

      <Band
        id="registry"
        eyebrow={t('sources-registry-eyebrow')}
        title={t('sources-registry-title')}
        lede={t('sources-registry-lede')}
      >
        <nav
          aria-label={t('sources-registry-title')}
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        >
          <span className="font-bold tracking-wider text-ink-faint uppercase">
            {t('sources-jump')}
          </span>
          {published.map((g) => (
            <a
              key={g.id}
              href={`#group-${g.id}`}
              className="font-semibold text-royal hover:underline"
            >
              {g.title}
            </a>
          ))}
        </nav>

        {published.map((g) => (
          <section
            key={g.id}
            id={`group-${g.id}`}
            aria-labelledby={`group-${g.id}-title`}
            className="mt-10"
          >
            <div className="border-b-2 border-heading pb-3">
              <h3 id={`group-${g.id}-title`} className="text-xl font-bold text-heading">
                {g.title}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">{g.summary}</p>
            </div>
            {g.datasets.map((d) => (
              <DatasetRow key={d.id} dataset={d} />
            ))}
          </section>
        ))}
      </Band>

      <Band
        id="awaiting"
        eyebrow={t('sources-awaiting-eyebrow')}
        title={t('sources-awaiting-title')}
        lede={t('sources-awaiting-lede')}
      >
        <div className="mt-6 grid grid-cols-1 border-t border-l border-line md:grid-cols-3">
          {drafts.map((d) => (
            <article
              key={d.id}
              id={d.id}
              className="flex flex-col border-r border-b border-line p-5"
            >
              <StatusBadge status={d.status} />
              <h3 className="mt-3 text-base font-bold text-heading">{d.title}</h3>
              <p className="mt-1 flex-1 text-sm leading-6 text-ink-soft">{d.coverage}</p>
              {d.confirmWith && (
                <p className="mt-3 text-sm text-ink-muted">
                  {t('sources-confirm')}:{' '}
                  <span className="font-semibold text-heading">{d.confirmWith}</span>
                </p>
              )}
              <div className="mt-3">
                <PageLink to={d.page.to}>
                  {d.page.label}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </PageLink>
              </div>
            </article>
          ))}
        </div>
      </Band>

      <Band
        id="not-published"
        eyebrow={t('sources-not-published-eyebrow')}
        title={t('sources-not-published-title')}
        last
      >
        <ul className="mt-6 max-w-3xl divide-y divide-line border-y border-line">
          {notPublished.map((n) => (
            <li key={n.title} className="py-4">
              <h3 className="text-base font-bold text-heading">{n.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{n.reason}</p>
            </li>
          ))}
        </ul>
      </Band>
    </>
  );
}
