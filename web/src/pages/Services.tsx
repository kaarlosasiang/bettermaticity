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
import { Container, Section, SectionHead, PageHeader, RuledGrid } from '@/components/primitives';
import { services } from '@/lib/services';
import servicesData from '@data/services.json';

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

      <PageHeader
        badge={
          <>
            <LayoutGrid className="size-4" aria-hidden="true" />
            {t('nav-services')}
          </>
        }
        title={t('services-title')}
        description={t('services-subtitle')}
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: t('services-title') }]}
        meta={[
          t('services-count', { count: services.length }),
          t('services-categories-count', { count: categories.length }),
          t('services-reviewed', { date: servicesData.reviewedOn }),
        ]}
        aside={{
          label: t('services-scope-label'),
          body: servicesData.verificationNote,
        }}
      >
        <div className="max-w-[560px]">
          <ServiceSearch />
        </div>
      </PageHeader>

      <Section>
        <Container>
          <RuledGrid className="sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ Icon, key, descKey, to }) => {
              const id = to.split('/').pop();
              return (
                <AppLink
                  key={to}
                  to={to}
                  className="group grid min-w-0 content-start gap-2 bg-white p-6 transition-colors hover:bg-surface-subtle"
                >
                  <span className="mb-1 flex size-10 items-center justify-center rounded-md bg-royal-tint text-royal">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-heading group-hover:text-royal">
                    {t(key)}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{t(descKey)}</p>
                  <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-muted uppercase">
                    {t('services-count', {
                      count: services.filter((s) => s.categoryId === id).length,
                    })}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-royal underline decoration-1 underline-offset-[5px] group-hover:decoration-2">
                    {t('svc-view-services')}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </AppLink>
              );
            })}
          </RuledGrid>
        </Container>
      </Section>

      {/* Browse by Life Event */}
      <Section compact altBg>
        <Container>
          <SectionHead
            eyebrow={t('nav-services')}
            title={t('life-events-title')}
            lede={t('life-events-subtitle')}
            className="mt-6"
          />
          <RuledGrid className="mb-6 sm:grid-cols-2 lg:grid-cols-4">
            {lifeEvents.map(({ Icon, key, to }) => (
              <AppLink
                key={key}
                to={to}
                className="group flex min-w-0 items-center gap-3 bg-white p-4 transition-colors hover:bg-surface-subtle"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-royal-tint text-royal">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-heading group-hover:text-royal">
                  {t(key)}
                </span>
                <ArrowRight
                  className="ml-auto size-4 shrink-0 text-ink-muted/60 transition-transform group-hover:translate-x-0.5 group-hover:text-royal"
                  aria-hidden="true"
                />
              </AppLink>
            ))}
          </RuledGrid>
        </Container>
      </Section>
      <ServiceSources category="services" />
    </>
  );
}
