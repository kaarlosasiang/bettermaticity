import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { ServiceList, type CategoryService } from '@/components/ServiceList';
import { ServiceSources } from '@/components/ServiceSources';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Container,
  Eyebrow,
  PageHeader,
  SearchField,
  Section,
  SectionHead,
} from '@/components/primitives';
import { serviceReviewDate } from '@/lib/serviceReferences';

export type { CategoryService } from '@/components/ServiceList';

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
  /** Kept for existing callers; the eyebrow now reads "Services" on every category. */
  badgeKey?: string;
  titleKey: string;
  descKey: string;
  /** Breadcrumb i18n keys (fall back to the shared nav-* keys). */
  homeKey?: string;
  servicesKey?: string;
  services: CategoryService[];
  officesTitleKey?: string;
  offices?: CategoryOffice[];
  /** Page-specific sections rendered after the service list. */
  children?: ReactNode;
}

/**
 * Shared shell for the /services/:category pages, laid out like BetterSanFernando's
 * category pages: hero → "find a service in this category" search band → one bordered
 * service list (filtered in place) → page-specific extras → responsible offices →
 * official-source band.
 */
export function ServiceCategoryPage({
  path,
  seoTitleKey,
  seoDescription,
  badgeIcon: BadgeIcon,
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
  // Client-only filter; starts empty so the prerendered HTML lists every service.
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const visible = q
    ? services.filter((s) => `${t(s.titleKey)} ${t(s.descKey)}`.toLowerCase().includes(q))
    : services;

  return (
    <>
      <Seo title={t(seoTitleKey)} description={seoDescription} canonicalPath={path} />

      <PageHeader
        badge={
          <>
            <BadgeIcon className="size-4" aria-hidden="true" />
            {t(servicesKey)}
          </>
        }
        title={t(titleKey)}
        description={t(descKey)}
        ledeTone="strong"
        note={t('services-category-note')}
        breadcrumb={[
          { label: t(homeKey), to: '/' },
          { label: t(servicesKey), to: '/services' },
          { label: t(titleKey) },
        ]}
        meta={[
          ...(services.length > 0 ? [t('services-count', { count: services.length })] : []),
          t('services-guidance-only'),
          t('services-reviewed', { date: serviceReviewDate }),
        ]}
      />

      {services.length > 0 && (
        <>
          <section aria-labelledby="service-finder-heading" className="bg-white">
            <Container className="py-8 sm:py-10 lg:py-12">
              <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,13fr)] xl:items-end xl:gap-10">
                <div className="min-w-0">
                  <p>
                    <Eyebrow>{t('service-search-eyebrow')}</Eyebrow>
                  </p>
                  <h2
                    id="service-finder-heading"
                    className="mt-2 font-display text-xl font-bold text-heading"
                  >
                    {t('service-search-title')}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">
                    {t('service-search-help')}
                  </p>
                  <p className="mt-3 text-xs font-medium text-ink-faint">
                    {t('services-count', { count: services.length })}
                  </p>
                </div>
                <SearchField
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('service-search-placeholder')}
                  aria-labelledby="service-finder-heading"
                  aria-controls="services-list"
                />
              </div>
            </Container>
          </section>

          <section aria-labelledby="services-list-heading" id="services-list">
            <Container className="pb-8 sm:pb-12 lg:pb-16">
              <ServiceList
                services={visible}
                title={t('service-list-title')}
                lede={t('service-list-desc')}
                emptyText={t('service-search-empty')}
              />
            </Container>
          </section>
        </>
      )}

      {children}

      {offices && offices.length > 0 && (
        <Section className="border-t border-line">
          <Container>
            {officesTitleKey && (
              <SectionHead eyebrow={t('nav-government')} title={t(officesTitleKey)} />
            )}
            <ul className="divide-y divide-line border border-line bg-white">
              {offices.map((o) => (
                <li key={o.to}>
                  <AppLink
                    to={o.to}
                    className="group flex items-start gap-4 px-4 py-5 transition-colors hover:bg-surface-subtle md:px-6"
                  >
                    <o.Icon className="mt-0.5 size-5 shrink-0 text-royal" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-heading group-hover:text-royal">
                        {t(o.titleKey)}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-ink-muted">
                        {t(o.descKey)}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="mt-0.5 size-4 shrink-0 text-ink-faint group-hover:text-royal"
                      aria-hidden="true"
                    />
                  </AppLink>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <ServiceSources category={path.split('/').at(-1)} />
    </>
  );
}
