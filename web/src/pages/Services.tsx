import { ServiceSources } from '@/components/ServiceSources';
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
  Baby,
  HeartHandshake,
  Accessibility as AccessibilityIcon,
  Hammer,
  Siren,
  Heart,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { ServiceSearch } from '@/components/ServiceSearch';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader, Grid } from '@/components/primitives';

const lifeEvents: { Icon: LucideIcon; key: string; to: string }[] = [
  { Icon: Store, key: 'svc-starting-a-business', to: '/services/business' },
  { Icon: Heart, key: 'svc-getting-married', to: '/services/certificates' },
  { Icon: Baby, key: 'svc-having-a-baby', to: '/services/certificates' },
  { Icon: HeartHandshake, key: 'svc-need-financial-help', to: '/services/social-services' },
  { Icon: Users, key: 'svc-senior-citizen-services', to: '/services/social-services' },
  { Icon: AccessibilityIcon, key: 'svc-person-with-disability', to: '/services/social-services' },
  { Icon: Hammer, key: 'svc-buildinghome-improvement', to: '/services/infrastructure' },
  { Icon: Siren, key: 'svc-got-in-trouble', to: '/services/public-safety' },
];

const categories: { Icon: LucideIcon; key: string; descKey: string; to: string }[] = [
  {
    Icon: FileText,
    key: 'cat-certificates',
    descKey: 'cat-certificates-desc',
    to: '/services/certificates',
  },
  { Icon: Store, key: 'cat-business', descKey: 'cat-business-desc', to: '/services/business' },
  { Icon: Users, key: 'cat-social', descKey: 'cat-social-desc', to: '/services/social-services' },
  { Icon: HeartPulse, key: 'cat-health', descKey: 'cat-health-desc', to: '/services/health' },
  { Icon: Coins, key: 'cat-tax', descKey: 'cat-tax-desc', to: '/services/tax-payments' },
  {
    Icon: Trees,
    key: 'cat-agriculture',
    descKey: 'cat-agriculture-desc',
    to: '/services/agriculture',
  },
  {
    Icon: Building2,
    key: 'cat-infrastructure',
    descKey: 'cat-infrastructure-desc',
    to: '/services/infrastructure',
  },
  {
    Icon: GraduationCap,
    key: 'cat-education',
    descKey: 'cat-education-desc',
    to: '/services/education',
  },
  {
    Icon: ShieldCheck,
    key: 'cat-safety',
    descKey: 'cat-safety-desc',
    to: '/services/public-safety',
  },
  {
    Icon: Globe,
    key: 'cat-environment',
    descKey: 'cat-environment-desc',
    to: '/services/environment',
  },
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
        <nav
          className="flex items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
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
                className="group flex flex-col rounded-[10px] bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-6 no-underline transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{t(key)}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{t(descKey)}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {t('svc-view-services')}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </AppLink>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Browse by Life Event */}
      <Section compact altBg>
        <Container>
          <SectionTitle>{t('life-events-title')}</SectionTitle>
          <p className="-mt-4 mb-5 text-[0.8125rem] text-muted-foreground">
            {t('life-events-subtitle')}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lifeEvents.map(({ Icon, key, to }) => (
              <AppLink
                key={key}
                to={to}
                className="group flex items-center gap-3 rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-4 no-underline transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-foreground">{t(key)}</span>
                <ArrowRight
                  className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  aria-hidden="true"
                />
              </AppLink>
            ))}
          </div>
        </Container>
      </Section>
      <ServiceSources category="services" />
    </>
  );
}
