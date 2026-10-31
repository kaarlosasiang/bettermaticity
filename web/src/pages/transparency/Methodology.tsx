import { ArrowRight, BookOpenCheck } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { StatusBadge } from '@/components/SourceStatusBadge';
import { useLanguage } from '@/hooks/useLanguage';
import { Band, PageHeader } from '@/components/primitives';
import { SOURCE_STATUSES } from '@/lib/sourceRegistry';

const RULES = ['source', 'missing', 'periods', 'combine', 'ceilings', 'checked'];
const STEPS = ['find', 'verify', 'record', 'publish'];

// How BetterMati publishes data, after BetterSanFernando's /transparency/methodology:
// the rules every page follows, the process, what evidence can establish, the status
// labels, the privacy boundary, and how corrections and versions work.
export default function Methodology() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('method-page-name')}
        description="The rules BetterMati.org follows when it publishes public data: named sources, check dates, no combined sources, and clear limits on what records prove."
        canonicalPath="/transparency/methodology"
      />

      <PageHeader
        badge={
          <>
            <BookOpenCheck className="size-4" aria-hidden="true" />
            {t('method-eyebrow')}
          </>
        }
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-transparency'), to: '/transparency' },
          { label: t('method-page-name') },
        ]}
        title={t('method-page-name')}
        description={t('method-lede')}
      />

      <Band id="rules" eyebrow={t('method-rules-eyebrow')} title={t('method-rules-title')}>
        <ol className="mt-6 grid grid-cols-1 border-t border-l border-line md:grid-cols-2 lg:grid-cols-3">
          {RULES.map((k, i) => (
            <li key={k} className="border-r border-b border-line p-5 sm:p-6">
              <p className="font-mono text-xs font-semibold text-royal">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-base font-bold text-heading">{t(`method-rule-${k}`)}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-muted">{t(`method-rule-${k}-desc`)}</p>
            </li>
          ))}
        </ol>
      </Band>

      <Band id="process" eyebrow={t('method-process-eyebrow')} title={t('method-process-title')}>
        <ol className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((k, i) => (
            <li key={k} className="border-t-2 border-heading pt-4">
              <p className="font-mono text-xs font-semibold text-royal">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 text-base font-bold text-heading">{t(`method-step-${k}`)}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{t(`method-step-${k}-desc`)}</p>
            </li>
          ))}
        </ol>
      </Band>

      <Band id="evidence" eyebrow={t('method-evidence-eyebrow')} title={t('method-evidence-title')}>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {(['can', 'cannot'] as const).map((side) => (
            <div key={side} className="border border-line p-5 sm:p-6">
              <h3 className="text-base font-bold text-heading">{t(`method-${side}-title`)}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft marker:text-royal">
                {[1, 2, 3].map((n) => (
                  <li key={n}>{t(`method-${side}-${n}`)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Band>

      <Band id="statuses" eyebrow={t('method-status-eyebrow')} title={t('sources-status-title')}>
        <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
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

      <Band id="privacy" eyebrow={t('method-privacy-eyebrow')} title={t('method-privacy-title')}>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {['published', 'withheld'].map((k) => (
            <div key={k} className="space-y-2">
              <h3 className="text-base font-bold text-heading">{t(`method-privacy-${k}`)}</h3>
              <p className="text-sm leading-6 text-ink-soft">{t(`method-privacy-${k}-desc`)}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band
        id="corrections"
        eyebrow={t('method-corrections-eyebrow')}
        title={t('method-corrections-title')}
        last
      >
        <p className="mt-4 max-w-3xl text-[0.9375rem] leading-7 text-ink-soft">
          {t('method-corrections-text')}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {[
            ['/transparency/sources', 'sources-page-name'],
            ['/changelog', 'changelog-title'],
            ['/accessibility', 'a11y-accessibility'],
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
