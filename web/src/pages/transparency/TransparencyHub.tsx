import { ArrowRight, Scale } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Band, PageHeader } from '@/components/primitives';
import { allDatasets, notPublished } from '@/lib/sourceRegistry';
import { fiscalYears } from '@/lib/budgetData';
import { fdpRecords, officialDocuments } from '@/lib/transparencyData';

const FIND: { to: string; key: string; descKey: string }[] = [
  { to: '/transparency/finance', key: 'finance-page-name', descKey: 'transparency-find-finance' },
  {
    to: '/transparency/projects',
    key: 'projects-page-name',
    descKey: 'transparency-find-projects',
  },
  { to: '/transparency/full-disclosure', key: 'fdp-page-name', descKey: 'transparency-find-fdp' },
  { to: '/transparency/documents', key: 'docs-page-name', descKey: 'transparency-find-docs' },
  { to: '/legislative', key: 'nav-legislative-overview', descKey: 'transparency-find-legislation' },
  { to: '/statistics', key: 'nav-statistics', descKey: 'transparency-find-statistics' },
];

const ABOUT_DATA: { to: string; key: string; descKey: string }[] = [
  { to: '/transparency/sources', key: 'sources-page-name', descKey: 'nav-desc-sources' },
  { to: '/transparency/methodology', key: 'method-page-name', descKey: 'transparency-find-method' },
];

function LinkCell({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <AppLink
      to={to}
      className="group flex flex-col border-r border-b border-line p-5 transition-colors hover:bg-surface-subtle sm:p-6"
    >
      <span className="text-base font-bold text-heading group-hover:text-royal">{title}</span>
      <span className="mt-1 flex-1 text-sm leading-6 text-ink-muted">{desc}</span>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-royal">
        {title}
        <ArrowRight
          className="size-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </AppLink>
  );
}

// Transparency hub, after BetterSanFernando's /transparency: what the site publishes,
// where each kind of record lives, where the data comes from, and the known gaps.
export default function TransparencyHub() {
  const { t } = useLanguage();
  const verified = allDatasets.filter((d) => d.status === 'verified').length;
  const drafts = allDatasets.filter((d) => d.status === 'draft');

  const snapshot = [
    {
      label: t('transparency-snap-years'),
      value: `FY${fiscalYears[0].year}–FY${fiscalYears[fiscalYears.length - 1].year}`,
    },
    { label: t('transparency-snap-fdp'), value: String(fdpRecords.length) },
    { label: t('transparency-snap-docs'), value: String(officialDocuments.length) },
    { label: t('transparency-snap-datasets'), value: `${verified} / ${allDatasets.length}` },
  ];

  return (
    <>
      <Seo
        title={t('nav-transparency')}
        description="City of Mati finances, projects, Full Disclosure reports and official documents, each traced to its official source."
        canonicalPath="/transparency"
      />

      <PageHeader
        badge={
          <>
            <Scale className="size-4" aria-hidden="true" />
            {t('nav-transparency')}
          </>
        }
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: t('nav-transparency') }]}
        title={t('transparency-title')}
        description={t('transparency-lede')}
        ledeTone="strong"
        note={t('transparency-note')}
        sidePanel={
          <div className="border border-line bg-surface-subtle p-5">
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-muted uppercase">
              {t('transparency-snap-label')}
            </p>
            <dl className="mt-2 divide-y divide-line">
              {snapshot.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-sm text-ink-muted">{s.label}</dt>
                  <dd className="text-sm font-bold text-heading tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <Band id="find" eyebrow={t('transparency-find-eyebrow')} title={t('transparency-find-title')}>
        <div className="mt-6 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {FIND.map((f) => (
            <LinkCell key={f.to} to={f.to} title={t(f.key)} desc={t(f.descKey)} />
          ))}
        </div>
      </Band>

      <Band id="data" eyebrow={t('transparency-data-eyebrow')} title={t('transparency-data-title')}>
        <div className="mt-6 grid grid-cols-1 border-t border-l border-line md:grid-cols-2">
          {ABOUT_DATA.map((f) => (
            <LinkCell key={f.to} to={f.to} title={t(f.key)} desc={t(f.descKey)} />
          ))}
        </div>
      </Band>

      <Band
        id="gaps"
        eyebrow={t('transparency-gaps-eyebrow')}
        title={t('transparency-gaps-title')}
        lede={t('transparency-gaps-lede')}
      >
        <ul className="mt-6 max-w-3xl divide-y divide-line border-y border-line">
          <li className="py-4">
            <h3 className="text-base font-bold text-heading">{t('transparency-gap-fdp')}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">{t('transparency-gap-fdp-desc')}</p>
          </li>
          <li className="py-4">
            <h3 className="text-base font-bold text-heading">{t('transparency-gap-audit')}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              {t('transparency-gap-audit-desc')}
            </p>
          </li>
          {drafts.map((d) => (
            <li key={d.id} className="py-4">
              <h3 className="text-base font-bold text-heading">{d.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{d.coverage}</p>
            </li>
          ))}
          {notPublished.slice(0, 2).map((n) => (
            <li key={n.title} className="py-4">
              <h3 className="text-base font-bold text-heading">{n.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{n.reason}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band
        id="how-to-read"
        eyebrow={t('transparency-read-eyebrow')}
        title={t('transparency-read-title')}
        last
      >
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {['complete', 'interchangeable', 'archived'].map((k) => (
            <div key={k} className="space-y-2">
              <h3 className="text-base font-bold text-heading">{t(`transparency-read-${k}`)}</h3>
              <p className="text-sm leading-6 text-ink-soft">{t(`transparency-read-${k}-desc`)}</p>
            </div>
          ))}
        </div>
      </Band>
    </>
  );
}
