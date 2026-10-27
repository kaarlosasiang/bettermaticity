import { ServiceCards, type CategoryService } from '@/components/ServiceCards';
import { ServiceSources } from '@/components/ServiceSources';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';

export type { CategoryService } from '@/components/ServiceCards';

export interface CategoryOffice {
  Icon: LucideIcon;
  titleKey: string;
  descKey: string;
  to: string;
}

export interface ServiceCategoryPageProps {
  /** Route path for canonical/SEO, e.g. "/services/certificates". */
  path: string;
  seoTitleKey: string;
  seoDescription: string;
  badgeIcon: LucideIcon;
  badgeKey: string;
  titleKey: string;
  descKey: string;
  /** Breadcrumb i18n keys (fall back to the shared nav-* keys). */
  homeKey?: string;
  servicesKey?: string;
  services: CategoryService[];
  officesTitleKey?: string;
  offices?: CategoryOffice[];
  /** Page-specific sections rendered after the service cards. */
  children?: ReactNode;
}

/**
 * Shared shell for the /services/:category pages. They all follow the same legacy
 * shape — breadcrumbs, gradient PageHeader, a grid of service-item cards, and an
 * "offices" grid — with a few page-specific extras passed as children.
 */
export function ServiceCategoryPage({
  path,
  seoTitleKey,
  seoDescription,
  badgeIcon: BadgeIcon,
  badgeKey,
  titleKey,
  descKey,
  homeKey = 'nav-home',
  servicesKey = 'nav-services',
  services,
  officesTitleKey,
  offices,
  children,
}: ServiceCategoryPageProps) {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t(seoTitleKey)} description={seoDescription} canonicalPath={path} />

      <PageHeader
        badge={
          <>
            <BadgeIcon className="size-4" aria-hidden="true" />
            {t(badgeKey)}
          </>
        }
        title={t(titleKey)}
        description={t(descKey)}
        breadcrumb={[
          { label: t(homeKey), to: '/' },
          { label: t(servicesKey), to: '/services' },
          { label: t(titleKey) },
        ]}
        meta={services.length > 0 ? [t('services-count', { count: services.length })] : undefined}
      />

      {services.length > 0 && (
        <Section>
          <Container>
            <ServiceCards services={services} />
          </Container>
        </Section>
      )}

      <ServiceSources category={path.split('/').at(-1)} />

      {children}

      {offices && offices.length > 0 && (
        <Section compact altBg>
          <Container>
            {officesTitleKey && (
              <SectionTitle>
                <Building2 className="size-5 text-primary" aria-hidden="true" />
                {t(officesTitleKey)}
              </SectionTitle>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {offices.map((o) => (
                <AppLink
                  key={o.to}
                  to={o.to}
                  className="group flex items-center gap-4 rounded-card bg-white border border-line p-4 no-underline transition hover:border-royal"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <o.Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-0.5 text-sm font-semibold text-foreground">
                      {t(o.titleKey)}
                    </h3>
                    <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(o.descKey)}</p>
                  </div>
                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </AppLink>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
