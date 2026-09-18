import {
  Network,
  House,
  LayoutGrid,
  Building2,
  Landmark,
  Globe,
  Link2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

type TFn = (key: string) => string;

interface SitemapLink {
  to: string;
  /** i18n key for the label; when omitted, `text` is rendered verbatim. */
  i18n?: string;
  /** Literal label for links that had no data-i18n in the legacy markup. */
  text?: string;
  external?: boolean;
}

interface SitemapSection {
  Icon: LucideIcon;
  /** i18n key for the section heading. */
  title: string;
  /** Optional i18n key for the pill badge beside the heading. */
  badge?: string;
  /** City Offices renders a denser 4-column track. */
  fourCol?: boolean;
  /** Online Services uses the green icon chip. */
  online?: boolean;
  links: SitemapLink[];
}

const sections: SitemapSection[] = [
  {
    Icon: House,
    title: 'sitemap-main-navigation',
    links: [
      { to: '/', i18n: 'sitemap-home' },
      { to: '/services', i18n: 'sitemap-services' },
      { to: '/government', i18n: 'sitemap-government' },
      { to: '/statistics', i18n: 'sitemap-statistics' },
      { to: '/legislative', i18n: 'sitemap-legislative' },
      { to: '/budget', i18n: 'sitemap-transparency' },
      { to: '/contact', i18n: 'sitemap-contact' },
      { to: '/news', i18n: 'sitemap-news' },
      { to: 'https://quiz.bettermati.org/', i18n: 'sitemap-mati-quiz', external: true },
      { to: '/faq', text: 'FAQ' },
      { to: '/accessibility', text: 'Accessibility' },
    ],
  },
  {
    Icon: LayoutGrid,
    title: 'sitemap-service-categories',
    links: [
      { to: '/services/certificates', i18n: 'sitemap-certificates-vital-records' },
      { to: '/services/business', i18n: 'sitemap-business-services' },
      { to: '/services/social-services', i18n: 'sitemap-social-services' },
      { to: '/services/health', i18n: 'sitemap-health-wellness' },
      { to: '/services/tax-payments', i18n: 'sitemap-tax-payments' },
      { to: '/services/agriculture', i18n: 'sitemap-agriculture' },
      { to: '/services/infrastructure', i18n: 'sitemap-infrastructure' },
      { to: '/services/education', i18n: 'sitemap-education' },
      { to: '/services/environment', i18n: 'sitemap-environment' },
      { to: '/services/public-safety', i18n: 'sitemap-public-safety' },
    ],
  },
  {
    Icon: Building2,
    title: 'sitemap-municipal-offices',
    fourCol: true,
    links: [
      { to: '/service-details/civil-registrar', i18n: 'sitemap-local-civil-registrar' },
      { to: '/service-details/municipal-treasurer', i18n: 'sitemap-treasurers-office' },
      { to: '/service-details/municipal-assessor', i18n: 'sitemap-assessors-office' },
      { to: '/service-details/municipal-budget', i18n: 'sitemap-budget-office' },
      { to: '/service-details/municipal-accounting', i18n: 'sitemap-accounting-office' },
      { to: '/service-details/municipal-engineering', i18n: 'sitemap-engineering-office' },
      { to: '/service-details/municipal-planning', i18n: 'sitemap-planning-office' },
      { to: '/service-details/municipal-agriculture', i18n: 'sitemap-agriculture-office' },
      { to: '/service-details/mswdo-services', text: 'CSWDO' },
      { to: '/service-details/business-permits-licensing', i18n: 'sitemap-bpls-office' },
      { to: '/service-details/general-services', i18n: 'sitemap-general-services' },
      { to: '/service-details/human-resource-management', i18n: 'sitemap-hr-management' },
      { to: '/service-details/seedo-public-market', i18n: 'sitemap-seedo-public-market' },
      { to: '/service-details/seedo-slaughterhouse', i18n: 'sitemap-seedo-slaughterhouse' },
      { to: '/service-details/tricycle-franchising', i18n: 'sitemap-tricycle-franchising' },
      { to: '/service-details/property-declaration', i18n: 'sitemap-property-declaration' },
    ],
  },
  {
    Icon: Landmark,
    title: 'sitemap-government-legislative',
    links: [
      { to: '/government', i18n: 'sitemap-government-structure' },
      { to: '/government/officials', i18n: 'sitemap-elected-officials' },
      { to: '/legislative', i18n: 'sitemap-legislative-documents' },
      { to: '/legislative/ordinance-framework', i18n: 'sitemap-ordinance-framework' },
      { to: '/legislative/resolution-framework', i18n: 'sitemap-resolution-framework' },
    ],
  },
  {
    Icon: Globe,
    title: 'sitemap-online-services',
    badge: 'sitemap-via-filipizen',
    online: true,
    links: [
      {
        to: 'https://www.filipizen.com/partners/nuevavizcaya_mati/bpls/billing',
        i18n: 'sitemap-business-billing-payment',
        external: true,
      },
      {
        to: 'https://www.filipizen.com/partners/nuevavizcaya_mati/bpls/newbusiness',
        i18n: 'sitemap-new-business-application',
        external: true,
      },
      {
        to: 'https://www.filipizen.com/partners/nuevavizcaya_mati/bpls/renewbusiness',
        i18n: 'sitemap-business-permit-renewal',
        external: true,
      },
      {
        to: 'https://www.filipizen.com/partners/nuevavizcaya_mati/rptis/billing',
        i18n: 'sitemap-real-property-tax-payment',
        external: true,
      },
      {
        to: 'https://www.filipizen.com/partners/nuevavizcaya_mati/po/billing',
        i18n: 'sitemap-online-payment-order',
        external: true,
      },
    ],
  },
  {
    Icon: Link2,
    title: 'sitemap-external-resources',
    links: [
      { to: 'https://mati.gov.ph', i18n: 'sitemap-official-mati-website', external: true },
      {
        to: 'https://sangguniangbayan.mati.gov.ph/',
        i18n: 'sitemap-sangguniang-bayan',
        external: true,
      },
      {
        to: 'https://www.facebook.com/OfficialLguMatiFanpage/',
        i18n: 'sitemap-facebook-page',
        external: true,
      },
      { to: '/terms', i18n: 'sitemap-terms-of-use' },
      { to: '/privacy', i18n: 'sitemap-privacy-policy' },
    ],
  },
];

// Legacy .sitemap-link-item: white/greyed card row with an accent icon that
// picks up the hover colour (primary for internal, green for external links).
function LinkItem({ link, t }: { link: SitemapLink; t: TFn }) {
  const label = link.i18n ? t(link.i18n) : link.text;

  if (link.external) {
    return (
      <a
        href={link.to}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-lg border border-border bg-muted px-3.5 py-2.5 text-[0.8125rem] font-medium text-foreground transition hover:translate-x-0.5 hover:border-[#06a77d] hover:bg-[#06a77d]/[0.06] hover:text-[#06a77d]"
      >
        <ExternalLink
          className="size-3 shrink-0 text-muted-foreground transition group-hover:text-[#06a77d]"
          aria-hidden="true"
        />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <AppLink
      to={link.to}
      className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2.5 text-[0.8125rem] font-medium text-foreground transition hover:translate-x-0.5 hover:border-primary hover:bg-primary/[0.04] hover:text-primary"
    >
      <ArrowRight
        className="size-3 shrink-0 text-muted-foreground transition group-hover:text-primary"
        aria-hidden="true"
      />
      <span>{label}</span>
    </AppLink>
  );
}

export default function SitemapPage() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('sitemap-sitemap')}
        description="Complete sitemap for BetterMati.org - Navigate all pages, services, and resources of the City of Mati portal."
        canonicalPath="/sitemap"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('sitemap-home')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">{t('sitemap-sitemap')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Network className="size-4" aria-hidden="true" />
            {t('sitemap-navigation')}
          </>
        }
        title={t('sitemap-sitemap')}
        description={t('sitemap-navigate-all-pages-and-services-of-better-mati')}
      />

      <Section>
        <Container>
          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.title}>
                {/* Section header: gradient icon chip + heading + optional badge */}
                <div className="mb-4 flex items-center gap-3 border-b-2 border-muted pb-2">
                  <span
                    className={
                      'flex size-9 shrink-0 items-center justify-center rounded-lg ' +
                      (section.online
                        ? 'bg-[linear-gradient(135deg,#06a77d_0%,#059669_100%)]'
                        : 'bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)]')
                    }
                  >
                    <section.Icon className="size-4 text-white" aria-hidden="true" />
                  </span>
                  <h2 className="m-0 text-lg font-semibold text-foreground">{t(section.title)}</h2>
                  {section.badge && (
                    <span className="inline-flex items-center rounded-full bg-[#e6f4ea] px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.5px] text-[#06a77d] uppercase">
                      {t(section.badge)}
                    </span>
                  )}
                </div>

                {/* Link grid */}
                <div
                  className={
                    'grid gap-2 grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 ' +
                    (section.fourCol ? 'xl:grid-cols-4' : 'lg:grid-cols-4 xl:grid-cols-5')
                  }
                >
                  {section.links.map((link) => (
                    <LinkItem key={link.to} link={link} t={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
