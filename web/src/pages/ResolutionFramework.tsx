import { ScrollText } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/hooks/useLanguage';
import { Band, PageHeader } from '@/components/primitives';
import { resolutions } from '@/lib/govData';
import { LegislativeRecords, LegislativeLegalSource } from '@/components/LegislativeRecords';

const resolutionTypes = [
  'reso-type-commendation',
  'reso-type-request',
  'reso-type-support',
  'reso-type-condolence',
  'reso-type-authorization',
  'reso-type-planning',
];

export default function ResolutionFramework() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('reso-page-title')}
        description="Resolutions adopted by the Sangguniang Panlungsod of Mati."
        canonicalPath="/legislative/resolution-framework"
      />

      <PageHeader
        badge={
          <>
            <ScrollText className="size-4" aria-hidden="true" />
            {t('nav-legislative')}
          </>
        }
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-government'), to: '/government' },
          { label: t('nav-legislative'), to: '/legislative' },
          { label: t('reso-page-title') },
        ]}
        title={t('reso-page-title')}
        description={t('reso-page-desc')}
      />

      <Band id="what-is" eyebrow={t('nav-legislative')} title={t('reso-what-is')}>
        <div className="mt-4 max-w-3xl space-y-3 text-[0.9375rem] leading-7 text-ink-soft">
          <p>{t('reso-what-is-p1')}</p>
          <p>{t('reso-what-is-p2')}</p>
        </div>
        <LegislativeLegalSource resolution={true} />
      </Band>

      <Band id="categories" title={t('reso-types-title')}>
        <ul className="mt-5 flex flex-wrap gap-2">
          {resolutionTypes.map((k) => (
            <li
              key={k}
              className="border border-line bg-surface-subtle px-3 py-1.5 text-sm font-medium text-heading"
            >
              {t(k)}
            </li>
          ))}
        </ul>
      </Band>

      <LegislativeRecords kind="resolutions" rows={resolutions} />
    </>
  );
}
