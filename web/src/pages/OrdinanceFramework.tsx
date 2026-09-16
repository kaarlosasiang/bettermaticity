import { BookMarked, Info, ExternalLink } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
import { ordinances, formatSessionDate } from '@/lib/govData';

const ordinanceCategories = [
  'ord-cat-revenue',
  'ord-cat-business',
  'ord-cat-safety',
  'ord-cat-environment',
  'ord-cat-traffic',
  'ord-cat-zoning',
];

const SB_ORD_URL = 'https://sangguniangbayan.mati.gov.ph/index.php?page=legislative_framework_ord';

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

      <PageHeader
        badge={
          <>
            <BookMarked className="size-4" aria-hidden="true" />
            {t('nav-legislative')}
          </>
        }
        title={t('ord-page-title')}
        description={t('ord-page-desc')}
      />

      {/* What is an Ordinance? */}
      <Section compact>
        <Container>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Info className="size-5 text-primary" aria-hidden="true" />
              {t('ord-what-is')}
            </h2>
            <p className="mb-3 text-sm text-muted-foreground">{t('ord-what-is-p1')}</p>
            <p className="m-0 text-sm text-muted-foreground">{t('ord-what-is-p2')}</p>
          </div>
        </Container>
      </Section>

      {/* Ordinance categories */}
      <Section compact altBg>
        <Container>
          <SectionTitle>{t('ord-categories-title')}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {ordinanceCategories.map((k) => (
              <span key={k} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground">
                {t(k)}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle>{t('ord-2025-title')}</SectionTitle>
          <p className="-mt-4 mb-5 text-[0.8125rem] text-muted-foreground">{t('ord-2025-subtitle')}</p>
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
          <a
            href={SB_ORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground no-underline transition hover:opacity-90"
          >
            {t('ord-view-all-ordinances-on-sb-website')}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </Container>
      </Section>
    </>
  );
}
