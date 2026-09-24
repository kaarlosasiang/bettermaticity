import { BookMarked, Info } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
import { ordinances } from '@/lib/govData';
import { LegislativeRecords, LegislativeLegalSource } from '@/components/LegislativeRecords';

const ordinanceCategories = [
  'ord-cat-revenue',
  'ord-cat-business',
  'ord-cat-safety',
  'ord-cat-environment',
  'ord-cat-traffic',
  'ord-cat-zoning',
];

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
        <nav
          className="flex items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('nav-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/legislative" className="hover:text-primary">
            {t('nav-legislative')}
          </AppLink>
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
          <div className="rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Info className="size-5 text-primary" aria-hidden="true" />
              {t('ord-what-is')}
            </h2>
            <p className="mb-3 text-sm text-muted-foreground">{t('ord-what-is-p1')}</p>
            <p className="m-0 text-sm text-muted-foreground">{t('ord-what-is-p2')}</p>
            <LegislativeLegalSource resolution={false} />
          </div>
        </Container>
      </Section>

      {/* Ordinance categories */}
      <Section compact altBg>
        <Container>
          <SectionTitle>{t('ord-categories-title')}</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {ordinanceCategories.map((k) => (
              <span
                key={k}
                className="rounded-full bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] px-3 py-1.5 text-sm font-medium text-foreground"
              >
                {t(k)}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <LegislativeRecords kind="ordinances" rows={ordinances} />
    </>
  );
}
