import { BookMarked, ScrollText, ArrowRight, Scale, Landmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';

const categories: { to: string; Icon: LucideIcon; titleKey: string; descKey: string; linkKey: string }[] = [
  {
    to: '/legislative/ordinance-framework',
    Icon: BookMarked,
    titleKey: 'leg-ordinance-framework',
    descKey: 'leg-municipal-ordinances-enacted-by-the-sangguniang',
    linkKey: 'leg-browse-ordinances',
  },
  {
    to: '/legislative/resolution-framework',
    Icon: ScrollText,
    titleKey: 'leg-resolution-framework',
    descKey: 'leg-resolutions-passed-by-the-sangguniang-bayan',
    linkKey: 'svc-view-services',
  },
];

export default function Legislative() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('leg-legislative-documents')}
        description="Ordinances and resolutions of the Sangguniang Panlungsod of Mati."
        canonicalPath="/legislative"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">{t('nav-home')}</AppLink>
          <span>/</span>
          <span aria-current="page">{t('nav-legislative')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Landmark className="size-4" aria-hidden="true" />
            {t('leg-sangguniang-bayan')}
          </>
        }
        title={t('leg-legislative-documents')}
        description={t('leg-ordinances-and-resolutions-of-the-sangguniang')}
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map(({ to, Icon, titleKey, descKey, linkKey }) => (
              <AppLink
                key={to}
                to={to}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 no-underline transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-foreground">{t(titleKey)}</h2>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{t(descKey)}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {t(linkKey)}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </AppLink>
            ))}
          </div>
        </Container>
      </Section>

      {/* Understanding local legislation */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <Scale className="size-5 text-primary" aria-hidden="true" />
            {t('leg-understanding-local-legislation')}
          </SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-foreground">
                <BookMarked className="size-5 text-primary" aria-hidden="true" />
                {t('leg-ordinance-framework')}
              </h3>
              <p className="m-0 text-sm text-muted-foreground">
                {t('leg-municipal-ordinances-enacted-by-the-sangguniang')}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-foreground">
                <ScrollText className="size-5 text-primary" aria-hidden="true" />
                {t('leg-resolution-framework')}
              </h3>
              <p className="m-0 text-sm text-muted-foreground">
                {t('leg-resolutions-passed-by-the-sangguniang-bayan')}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
