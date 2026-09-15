import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';
import { ordinances, formatSessionDate } from '@/lib/govData';

export default function OrdinanceFramework() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('ord-page-title')}
        description="City ordinances enacted by the Sangguniang Panlungsod of Mati."
        canonicalPath="/legislative/ordinance-framework"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">{t('nav-home')}</AppLink>
          <span>/</span>
          <AppLink to="/legislative" className="hover:text-primary">{t('nav-legislative')}</AppLink>
          <span>/</span>
          <span aria-current="page">{t('ord-page-title')}</span>
        </nav>
      </Container>

      <PageHeader title={t('ord-page-title')} description={t('ord-page-desc')} />

      <Section>
        <Container>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-muted text-foreground">
                  <th scope="col" className="px-4 py-3 font-semibold">{t('ord-table-number')}</th>
                  <th scope="col" className="px-4 py-3 font-semibold">{t('ord-table-title')}</th>
                  <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">{t('ord-table-date')}</th>
                </tr>
              </thead>
              <tbody>
                {ordinances.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                      No ordinances available yet.
                    </td>
                  </tr>
                ) : (
                  ordinances.map((o, i) => (
                    <tr key={`${o.ordinanceNo}-${i}`} className="border-t border-border">
                      <td className="px-4 py-3 font-medium whitespace-nowrap text-foreground">{o.ordinanceNo}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{formatSessionDate(o.sessionDate)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
    </>
  );
}
