import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';
import { resolutions, formatSessionDate, getRecordYear, type Resolution } from '@/lib/govData';

function ResolutionTable({ rows, heading, t }: { rows: Resolution[]; heading: string; t: (k: string) => string }) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{heading}</h2>
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

      <PageHeader title={t('reso-page-title')} description={t('reso-page-desc')} />

      <Section>
        <Container>
          {rows2026.length > 0 && <ResolutionTable rows={rows2026} heading="2026" t={t} />}
          <ResolutionTable rows={rows2025} heading="2025" t={t} />
        </Container>
      </Section>
    </>
  );
}
