import { ScrollText, Info } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
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

      {/* What is a Resolution? */}
      <Section compact>
        <Container>
          <div className="rounded-card bg-white border border-line p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Info className="size-5 text-primary" aria-hidden="true" />
              {t('reso-what-is')}
            </h2>
            <p className="mb-3 text-sm text-muted-foreground">{t('reso-what-is-p1')}</p>
            <p className="m-0 text-sm text-muted-foreground">{t('reso-what-is-p2')}</p>
            <LegislativeLegalSource resolution={true} />
          </div>
        </Container>
      </Section>

      {/* Types of resolutions */}
      <Section compact altBg>
        <Container>
          <SectionTitle>{t('reso-types-title')}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {resolutionTypes.map((k) => (
              <span
                key={k}
                className="rounded-full bg-white border border-line px-3 py-1.5 text-sm font-medium text-foreground"
              >
                {t(k)}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <LegislativeRecords kind="resolutions" rows={resolutions} />
    </>
  );
}
