import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Store,
  Users,
  HeartPulse,
  Coins,
  Trees,
  Building2,
  GraduationCap,
  ShieldCheck,
  Globe,
  ArrowRight,
  LayoutGrid,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { ServiceSearch } from '@/components/ServiceSearch';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader, Grid } from '@/components/primitives';

const categories: { Icon: LucideIcon; key: string; descKey: string; to: string }[] = [
  { Icon: FileText, key: 'cat-certificates', descKey: 'cat-certificates-desc', to: '/services/certificates' },
  { Icon: Store, key: 'cat-business', descKey: 'cat-business-desc', to: '/services/business' },
  { Icon: Users, key: 'cat-social', descKey: 'cat-social-desc', to: '/services/social-services' },
  { Icon: HeartPulse, key: 'cat-health', descKey: 'cat-health-desc', to: '/services/health' },
  { Icon: Coins, key: 'cat-tax', descKey: 'cat-tax-desc', to: '/services/tax-payments' },
  { Icon: Trees, key: 'cat-agriculture', descKey: 'cat-agriculture-desc', to: '/services/agriculture' },
  { Icon: Building2, key: 'cat-infrastructure', descKey: 'cat-infrastructure-desc', to: '/services/infrastructure' },
  { Icon: GraduationCap, key: 'cat-education', descKey: 'cat-education-desc', to: '/services/education' },
  { Icon: ShieldCheck, key: 'cat-safety', descKey: 'cat-safety-desc', to: '/services/public-safety' },
  { Icon: Globe, key: 'cat-environment', descKey: 'cat-environment-desc', to: '/services/environment' },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('services-title')}
        description="Browse and search LGU Mati government services by category."
        canonicalPath="/services"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">
            {t('nav-home')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">{t('services-title')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <LayoutGrid className="size-4" aria-hidden="true" />
            {t('nav-services')}
          </>
        }
        title={t('services-title')}
        description={t('services-subtitle')}
      >
        <div className="mx-auto max-w-[500px]">
          <ServiceSearch />
        </div>
      </PageHeader>

      <Section>
        <Container>
          <Grid min={300}>
            {categories.map(({ Icon, key, descKey, to }) => (
              <AppLink
                key={to}
                to={to}
                className="group flex flex-col rounded-[10px] border border-border bg-card p-6 no-underline transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{t(key)}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{t(descKey)}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {t('svc-view-services')}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </AppLink>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}
