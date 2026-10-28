import type { ReactNode } from 'react';
import { Building2, Clock, Info, LayoutGrid, Phone, ReceiptText, Users } from 'lucide-react';
import { ServiceOnlineAction } from '@/components/ServiceOnlineAction';
import { ServiceSources } from '@/components/ServiceSources';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { Container, Eyebrow, Inset, PageHeader } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';
import { NAV } from '@/lib/navMenus';
import {
  serviceGuides,
  serviceText,
  type ServiceRequirement,
  type ServiceText,
} from '@/lib/serviceReferences';
import type { Language } from '@/i18n';

// Guides with an online PSA request alongside the local office.
const PSA_GUIDES = new Set([
  'birth-certificate',
  'marriage-certificate',
  'death-certificate',
  'civil-registrar',
  'municipal-civil-registrar',
]);

// Category route → its translated menu label, e.g. /services/business → "Business & Trade".
const CATEGORY_KEYS = new Map(
  NAV.flatMap((entry) => entry.menu?.groups.flatMap((group) => group.items) ?? []).map(
    (item) => [item.to, item.key] as const
  )
);

function GuideSection({
  id,
  eyebrow,
  title,
  lede,
  first = false,
  children,
}: {
  id: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={first ? undefined : 'mt-12 border-t border-line pt-10'}
    >
      <p>
        <Eyebrow>{eyebrow}</Eyebrow>
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-heading md:text-3xl"
      >
        {title}
      </h2>
      {lede ? <p className="mt-2 text-sm text-ink-muted">{lede}</p> : null}
      {children}
    </section>
  );
}

// Marked placeholder for a section that has no verified City of Mati data yet.
function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <Inset tone="amber" className="mt-6">
      {children}
    </Inset>
  );
}

/** Numbered requirement rows, or a marked placeholder until verified data is added. */
export function ServiceRequirements({
  requirements,
  language,
}: {
  requirements?: ServiceRequirement[];
  language: Language;
}) {
  const { t } = useLanguage();
  if (!requirements?.length) {
    return (
      <PlaceholderNote>
        {t('service-placeholder-requirements')} {t('service-before-visit')}
      </PlaceholderNote>
    );
  }
  return (
    <ol className="mt-6 space-y-6">
      {requirements.map((r, i) => (
        <li key={i} className="grid gap-2 sm:grid-cols-[4rem_minmax(0,1fr)]">
          <span className="text-sm font-bold text-royal">{i + 1}</span>
          <div className="min-w-0">
            {r.appliesOnly ? (
              <p className="mb-2 w-fit border border-amber/60 bg-feel-bg px-3 py-1 text-xs font-semibold text-feel-text">
                {t('service-applies-only')} {serviceText(r.appliesOnly, language)}
              </p>
            ) : null}
            <p className="text-sm leading-6 text-ink">{serviceText(r.item, language)}</p>
            {r.whereToSecure ? (
              <p className="mt-1.5 text-sm leading-6 text-ink-faint">
                {t('service-where-to-secure')} {serviceText(r.whereToSecure, language)}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Numbered application steps, or a marked placeholder until verified data is added. */
export function ServiceSteps({ steps, language }: { steps?: ServiceText[]; language: Language }) {
  const { t } = useLanguage();
  if (!steps?.length) {
    return <PlaceholderNote>{t('service-placeholder-steps')}</PlaceholderNote>;
  }
  return (
    <ol className="mt-6 space-y-5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-7 min-w-7 shrink-0 items-center justify-center bg-royal-tint px-1.5 text-xs font-bold text-royal">
            {i + 1}
          </span>
          <p className="pt-0.5 text-sm leading-7 text-ink">{serviceText(step, language)}</p>
        </li>
      ))}
    </ol>
  );
}

// Service detail page, laid out like BetterSanFernando's: hero with "Service at a glance",
// section tabs, requirements / steps / guidance on the left with an office-contact card on
// the right, then the official-source band.
export function ServiceGuide({ id }: { id: string }) {
  const { language, t } = useLanguage();
  const guide = serviceGuides[id];
  const title = serviceText(guide.title, language);
  const categoryPath = `/services/${guide.category}`;
  const categoryKey = CATEGORY_KEYS.get(categoryPath);
  const categoryLabel = categoryKey ? t(categoryKey) : t('nav-services');
  const hasOnline = PSA_GUIDES.has(id);
  const text = (value?: ServiceText) => (value ? serviceText(value, language) : null);

  const glance: { Icon: typeof Users; label: string; value: string | null }[] = [
    { Icon: Users, label: t('service-glance-who'), value: text(guide.eligibility) },
    { Icon: Clock, label: t('service-glance-time'), value: text(guide.processingTime) },
    { Icon: ReceiptText, label: t('service-glance-fee'), value: text(guide.fee) },
    { Icon: Building2, label: t('service-glance-office'), value: text(guide.office) },
  ];

  const tabs = [
    { href: '#requirements', label: t('service-tab-requirements') },
    { href: '#how-to-apply', label: t('service-tab-steps') },
    { href: '#where-to-start', label: t('service-tab-start') },
    ...(hasOnline ? [{ href: '#online', label: t('service-tab-online') }] : []),
    { href: '#office-contact', label: t('service-tab-contact') },
    { href: '#official-source', label: t('service-tab-source') },
  ];

  return (
    <>
      <Seo
        title={title}
        description={serviceText(guide.summary, language)}
        canonicalPath={`/service-details/${id}`}
      />
      <PageHeader
        eyebrow={categoryLabel}
        title={title}
        description={serviceText(guide.summary, language)}
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-services'), to: '/services' },
          { label: categoryLabel, to: categoryPath },
          { label: title },
        ]}
        below={
          <div className="border border-line bg-surface-subtle px-5 py-5 sm:px-6">
            <p>
              <Eyebrow>{t('service-glance-title')}</Eyebrow>
            </p>
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.7fr)]">
              {glance.map(({ Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-1.5 font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-ink-faint uppercase">
                    <Icon className="size-3.5" aria-hidden="true" />
                    {label}
                  </dt>
                  {value ? (
                    <dd className="mt-1.5 text-sm leading-6 text-ink">{value}</dd>
                  ) : (
                    <dd className="mt-1.5 text-xs font-medium text-feel-text">
                      {t('service-confirm-office')}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <nav aria-label={t('service-tabs-label')} className="border-b border-line bg-white">
        <Container className="flex items-center gap-6 overflow-x-auto py-3 text-sm font-semibold whitespace-nowrap text-ink-muted">
          {tabs.map((tab) => (
            <a key={tab.href} href={tab.href} className="hover:text-royal">
              {tab.label}
            </a>
          ))}
        </Container>
      </nav>

      <Container className="py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-14">
          <div className="min-w-0">
            <GuideSection
              id="requirements"
              first
              eyebrow={t('service-req-eyebrow')}
              title={t('service-requirements')}
              lede={guide.requirements?.length ? t('service-requirements-desc') : undefined}
            >
              <ServiceRequirements requirements={guide.requirements} language={language} />
            </GuideSection>

            <GuideSection
              id="how-to-apply"
              eyebrow={t('service-steps-eyebrow')}
              title={t('service-steps')}
            >
              <ServiceSteps steps={guide.steps} language={language} />
            </GuideSection>

            <GuideSection
              id="where-to-start"
              eyebrow={t('service-start-eyebrow')}
              title={t('service-next-step')}
            >
              <p className="mt-6 text-base leading-7 text-ink">
                {serviceText(guide.ask, language)}
              </p>
              <p className="mt-4 flex gap-3 text-sm leading-6 text-ink-muted">
                <Info className="mt-1 size-4 shrink-0 text-royal" aria-hidden="true" />
                <span>{t('service-before-visit')}</span>
              </p>
            </GuideSection>

            {hasOnline ? (
              <GuideSection
                id="online"
                eyebrow={t('service-online-eyebrow')}
                title={t('service-online-title')}
              >
                <ServiceOnlineAction id="psa" />
              </GuideSection>
            ) : null}
          </div>

          <aside
            id="office-contact"
            aria-labelledby="office-contact-heading"
            className="space-y-6 border border-line bg-surface-subtle p-5 lg:p-6"
          >
            <div>
              <h2 id="office-contact-heading" className="text-lg font-bold text-heading">
                {t('service-office-contact')}
              </h2>
              {guide.office ? (
                <p className="mt-2 text-sm text-ink-soft">{text(guide.office)}</p>
              ) : (
                <p className="mt-2 text-xs font-medium text-feel-text">
                  {t('service-confirm-office')}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 border-b border-line pb-6">
              <AppLink
                to="/contact"
                className="inline-flex h-9 items-center gap-1.5 rounded-btn bg-royal px-3 text-sm font-semibold text-white hover:bg-royal/90"
              >
                <Phone className="size-4" aria-hidden="true" />
                {t('service-contact-link')}
              </AppLink>
              <AppLink
                to={categoryPath}
                className="inline-flex h-9 items-center gap-1.5 rounded-btn border border-line bg-white px-3 text-sm font-semibold text-heading hover:border-royal hover:text-royal"
              >
                <LayoutGrid className="size-4" aria-hidden="true" />
                {t('service-category-link')}
              </AppLink>
            </div>
            <p className="text-sm leading-6 text-ink-muted">{t('service-office-directory-note')}</p>
          </aside>
        </div>
      </Container>

      <ServiceSources sourceIds={guide.sources} />
    </>
  );
}
