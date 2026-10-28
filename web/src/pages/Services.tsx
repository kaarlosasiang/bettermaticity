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
  ArrowUpRight,
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
        ledeTone="strong"
        note={servicesData.verificationNote}
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: t('services-title') }]}
        meta={[
          t('services-count', { count: services.length }),
          t('services-categories-count', { count: categories.length }),
          t('services-reviewed', { date: servicesData.reviewedOn }),
        ]}
        sidePanel={
          <div className="border border-line bg-surface-subtle p-5 lg:p-6">
            <h2 className="text-base font-bold text-heading">{t('services-find-title')}</h2>
            <ServiceSearch className="mt-3" placeholder={`${t('nav-search')}…`} />
            <p className="mt-3 text-sm leading-6 text-ink-muted">{t('services-find-help')}</p>
          </div>
        }
      />

      <Section>
        <Container>
          <SectionHead
            eyebrow={t('services-browse-eyebrow')}
            title={t('services-browse-title')}
            lede={t('services-browse-lede')}
          />
          <RuledGrid className="sm:grid-cols-2">
            {categories.map(({ Icon, key, descKey, to }) => {
              const id = to.split('/').pop();
              return (
                <AppLink
                  key={to}
                  to={to}
                  className="group flex min-w-0 items-start gap-4 bg-white p-5 transition-colors hover:bg-surface-subtle md:px-6"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-royal" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-royal">{t(key)}</span>
                    <span className="mt-1 block text-sm leading-6 text-ink-muted">
                      {t(descKey)}
                    </span>
                    <span className="mt-2 block text-xs text-ink-faint">
                      {t('services-count', {
                        count: services.filter((s) => s.categoryId === id).length,
                      })}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="mt-0.5 size-4 shrink-0 text-ink-faint group-hover:text-royal"
                    aria-hidden="true"
                  />
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
