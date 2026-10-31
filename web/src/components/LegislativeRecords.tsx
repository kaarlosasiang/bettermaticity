import { ExternalLink } from 'lucide-react';
import { Band } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';
import { formatSessionDate, type Ordinance, type Resolution } from '@/lib/govData';

const charterUrl = 'https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/7810';
const codeUrl = 'https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/53542';
const linkClass = 'font-semibold text-royal underline-offset-4 hover:underline';

export function LegislativeLegalSource({ resolution }: { resolution: boolean }) {
  const { t } = useLanguage();
  return (
    <div className="mt-4 space-y-3 text-sm text-ink-soft">
      <a className={linkClass} href={charterUrl} target="_blank" rel="noopener noreferrer">
        {t('leg-legal-source')}
      </a>
      {resolution && (
        <p>
          {t('leg-budget-rule')}{' '}
          <a className={linkClass} href={codeUrl} target="_blank" rel="noopener noreferrer">
            {t('leg-budget-source')}
          </a>
        </p>
      )}
    </div>
  );
}

export function LegislativeRecords({
  kind,
  rows,
}: {
  kind: 'ordinances' | 'resolutions';
  rows: (Ordinance | Resolution)[];
}) {
  const { t } = useLanguage();
  const prefix = kind === 'ordinances' ? 'ord' : 'reso';
  const sorted = [...rows].sort((a, b) => b.year - a.year);
  return (
    <Band
      id="records"
      eyebrow={t('leg-page-records-eyebrow')}
      title={t('leg-records-heading')}
      last
    >
      <div className="mt-6 mb-5 max-w-3xl space-y-2 border border-line bg-surface-subtle p-5 text-sm leading-6 text-ink-soft">
        <p>{t('leg-records-scope')}</p>
        <p>{t('leg-records-evidence')}</p>
      </div>
      <div
        className="overflow-x-auto border border-line"
        role="region"
        aria-label={t(`${prefix}-page-title`)}
        tabIndex={0}
      >
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            {t(`${prefix}-page-title`)} — {t('leg-records-heading')}
          </caption>
          <thead>
            <tr className="bg-surface-subtle text-heading">
              {[
                `${prefix}-table-number`,
                'leg-records-summary',
                `${prefix}-table-date`,
                'leg-records-source',
              ].map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="px-4 py-3 text-xs font-bold tracking-wider uppercase"
                >
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-muted">
                  {t(`${prefix}-no-${kind}`)}
                </td>
              </tr>
            ) : (
              sorted.map((record) => {
                const number = 'ordinanceNo' in record ? record.ordinanceNo : record.resolutionNo;
                return (
                  <tr
                    key={`${record.issuingBody}-${number}`}
                    className="border-t border-line align-top"
                  >
                    <th scope="row" className="px-4 py-4 font-semibold text-heading">
                      <span className="whitespace-nowrap">{number}</span>
                      <span className="mt-2 block text-xs font-normal text-ink-muted">
                        {record.issuingBody}
                      </span>
                    </th>
                    <td className="min-w-56 px-4 py-4 text-ink-soft">
                      {t(record.summaryKey)}
                      {record.historical && (
                        <p className="mt-2 font-semibold text-heading">
                          {t('leg-records-historical')}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4 text-ink-soft">
                      {record.sessionDate
                        ? formatSessionDate(record.sessionDate)
                        : t('leg-records-unknown-date')}
                    </td>
                    <td className="min-w-52 px-4 py-4 text-ink-soft">
                      <p className="mb-2 text-xs font-medium">{t('leg-records-report')}</p>
                      <a
                        href={record.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {record.sourceTitle}{' '}
                        <ExternalLink className="inline size-3.5" aria-hidden="true" />
                      </a>
                      <p className="mt-2 text-xs">{record.sourcePublisher}</p>
                      <p className="mt-1 text-xs">
                        {t('leg-records-checked')}:{' '}
                        <time dateTime={record.checkedOn}>{record.checkedOn}</time>
                      </p>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <aside className="mt-6 max-w-3xl space-y-3 border border-line p-5 text-sm leading-6 text-ink-soft">
        <h3 className="text-base font-bold text-heading">{t('leg-copy-heading')}</h3>
        <p>{t('leg-copy-body')}</p>
        <a className={linkClass} href={charterUrl} target="_blank" rel="noopener noreferrer">
          {t('leg-copy-source')}
        </a>
        <p>{t('leg-archive-unavailable')}</p>
      </aside>
    </Band>
  );
}
