import { ExternalLink } from 'lucide-react';
import { Container, Section, SectionTitle } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';
import { formatSessionDate, type Ordinance, type Resolution } from '@/lib/govData';

const charterUrl = 'https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/7810';
const codeUrl = 'https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/53542';
const linkClass = 'text-primary underline underline-offset-4 hover:no-underline';

export function LegislativeLegalSource({ resolution }: { resolution: boolean }) {
  const { t } = useLanguage();
  return (
    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
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
    <Section>
      <Container>
        <SectionTitle>{t('leg-records-heading')}</SectionTitle>
        <div className="mb-5 space-y-2 rounded-xl bg-muted p-5 text-sm text-muted-foreground">
          <p>{t('leg-records-scope')}</p>
          <p>{t('leg-records-evidence')}</p>
        </div>
        <div
          className="overflow-x-auto rounded-lg border border-border"
          role="region"
          aria-label={t(`${prefix}-page-title`)}
          tabIndex={0}
        >
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              {t(`${prefix}-page-title`)} — {t('leg-records-heading')}
            </caption>
            <thead>
              <tr className="bg-muted text-foreground">
                {[
                  `${prefix}-table-number`,
                  'leg-records-summary',
                  `${prefix}-table-date`,
                  'leg-records-source',
                ].map((key) => (
                  <th key={key} scope="col" className="px-4 py-3 font-semibold">
                    {t(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    {t(`${prefix}-no-${kind}`)}
                  </td>
                </tr>
              ) : (
                sorted.map((record) => {
                  const number = 'ordinanceNo' in record ? record.ordinanceNo : record.resolutionNo;
                  return (
                    <tr
                      key={`${record.issuingBody}-${number}`}
                      className="border-t border-border align-top"
                    >
                      <th scope="row" className="px-4 py-4 font-medium text-foreground">
                        <span className="whitespace-nowrap">{number}</span>
                        <span className="mt-2 block text-xs font-normal text-muted-foreground">
                          {record.issuingBody}
                        </span>
                      </th>
                      <td className="min-w-56 px-4 py-4 text-muted-foreground">
                        {t(record.summaryKey)}
                        {record.historical && (
                          <p className="mt-2 font-medium text-foreground">
                            {t('leg-records-historical')}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {record.sessionDate
                          ? formatSessionDate(record.sessionDate)
                          : t('leg-records-unknown-date')}
                      </td>
                      <td className="min-w-52 px-4 py-4 text-muted-foreground">
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
        <aside className="mt-6 space-y-3 rounded-xl border border-border p-5 text-sm text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">{t('leg-copy-heading')}</h2>
          <p>{t('leg-copy-body')}</p>
          <a className={linkClass} href={charterUrl} target="_blank" rel="noopener noreferrer">
            {t('leg-copy-source')}
          </a>
          <p>{t('leg-archive-unavailable')}</p>
        </aside>
      </Container>
    </Section>
  );
}
