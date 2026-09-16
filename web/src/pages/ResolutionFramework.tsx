import { ScrollText, Info, ExternalLink } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
import { resolutions, formatSessionDate, getRecordYear, type Resolution } from '@/lib/govData';

const resolutionTypes = [
  'reso-type-commendation',
  'reso-type-request',
  'reso-type-support',
  'reso-type-condolence',
  'reso-type-authorization',
  'reso-type-appropriation',
];

const SB_RESO_URL = 'https://sangguniangbayan.mati.gov.ph/index.php?page=legislative_framework_reso';

function ResolutionTable({
  rows,
  heading,
  subtitle,
  t,
}: {
  rows: Resolution[];
  heading: string;
  subtitle: string;
  t: (k: string) => string;
}) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-lg font-semibold text-foreground">{heading}</h2>
      <p className="mb-4 text-[0.8125rem] text-muted-foreground">{subtitle}</p>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-muted text-foreground">
              <th scope="col" className="px-4 py-3 font-semibold">{t('reso-table-number')}</th>
              <th scope="col" className="px-4 py-3 font-semibold">{t('reso-table-title')}</th>
              <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">{t('reso-table-date')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  No resolutions available yet.
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={`${r.resolutionNo}-${i}`} className="border-t border-border">
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-foreground">{r.resolutionNo}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{formatSessionDate(r.sessionDate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <a
        href={SB_RESO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground no-underline transition hover:opacity-90"
      >
        {t('reso-view-all-resolutions-on-sb-website')}
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function ResolutionFramework() {
  const { t } = useLanguage();

  const sorted = [...resolutions].sort((a, b) => b.sessionDate.localeCompare(a.sessionDate));
  const rows2026 = sorted.filter((r) => getRecordYear(r.resolutionNo) === 2026);
  const rows2025 = sorted.filter((r) => getRecordYear(r.resolutionNo) !== 2026);

  return (
    <>
      <Seo
        title={t('reso-page-title')}
        description="Resolutions adopted by the Sangguniang Panlungsod of Mati."
        canonicalPath="/legislative/resolution-framework"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">{t('nav-home')}</AppLink>
          <span>/</span>
          <AppLink to="/legislative" className="hover:text-primary">{t('nav-legislative')}</AppLink>
          <span>/</span>
          <span aria-current="page">{t('reso-page-title')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <ScrollText className="size-4" aria-hidden="true" />
            {t('nav-legislative')}
          </>
        }
        title={t('reso-page-title')}
        description={t('reso-page-desc')}
      />

      {/* What is a Resolution? */}
      <Section compact>
        <Container>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Info className="size-5 text-primary" aria-hidden="true" />
              {t('reso-what-is')}
            </h2>
            <p className="mb-3 text-sm text-muted-foreground">{t('reso-what-is-p1')}</p>
            <p className="m-0 text-sm text-muted-foreground">{t('reso-what-is-p2')}</p>
          </div>
        </Container>
      </Section>

      {/* Types of resolutions */}
      <Section compact altBg>
        <Container>
          <SectionTitle>{t('reso-types-title')}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {resolutionTypes.map((k) => (
              <span key={k} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground">
                {t(k)}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {rows2026.length > 0 && (
            <ResolutionTable rows={rows2026} heading={t('reso-2026-title')} subtitle={t('reso-2026-subtitle')} t={t} />
          )}
          <ResolutionTable rows={rows2025} heading={t('reso-2025-title')} subtitle={t('reso-2025-subtitle')} t={t} />
        </Container>
      </Section>
    </>
  );
}
