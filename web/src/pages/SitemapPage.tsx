import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Network } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink, isMigratedRoute } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Eyebrow, PageHeader } from '@/components/primitives';
import { attractions } from '@/lib/tourismData';

interface IndexLink {
  to: string;
  /** i18n key for the label; `text` is rendered verbatim instead (data-driven names). */
  key?: string;
  text?: string;
  /** i18n key for the one-line description; `descText` is rendered verbatim instead. */
  desc?: string;
  descText?: string;
}

interface IndexGroup {
  id: string;
  title: string;
  desc: string;
  links: IndexLink[];
}

const PRIMARY: IndexLink[] = [
  { to: '/services', key: 'nav-services', desc: 'sitemap-dest-services-desc' },
  { to: '/government', key: 'nav-government', desc: 'sitemap-dest-government-desc' },
  { to: '/budget', key: 'nav-transparency', desc: 'sitemap-dest-transparency-desc' },
  { to: '/statistics', key: 'nav-statistics', desc: 'sitemap-dest-statistics-desc' },
  { to: '/visit-mati', key: 'nav-visit-mati', desc: 'sitemap-dest-visit-desc' },
];

const SERVICE_CATEGORIES = [
  'certificates',
  'tax-payments',
  'business',
  'agriculture',
  'education',
  'health',
  'social-services',
  'public-safety',
  'infrastructure',
  'environment',
];

const SERVICE_GUIDES: [string, string][] = [
  ['/service-details/civil-registrar', 'sitemap-local-civil-registrar'],
  ['/service-details/municipal-treasurer', 'sitemap-treasurers-office'],
  ['/service-details/municipal-assessor', 'sitemap-assessors-office'],
  ['/service-details/municipal-budget', 'sitemap-budget-office'],
  ['/service-details/municipal-accounting', 'sitemap-accounting-office'],
  ['/service-details/municipal-engineering', 'sitemap-engineering-office'],
  ['/service-details/municipal-planning', 'sitemap-planning-office'],
  ['/service-details/municipal-agriculture', 'sitemap-agriculture-office'],
  ['/service-details/mswdo-services', 'sitemap-cswdo'],
  ['/service-details/business-permits-licensing', 'sitemap-bpls-office'],
  ['/service-details/general-services', 'sitemap-general-services'],
  ['/service-details/human-resource-management', 'sitemap-hr-management'],
  ['/service-details/seedo-public-market', 'sitemap-seedo-public-market'],
  ['/service-details/seedo-slaughterhouse', 'sitemap-seedo-slaughterhouse'],
  ['/service-details/tricycle-franchising', 'sitemap-tricycle-franchising'],
  ['/service-details/property-declaration', 'sitemap-property-declaration'],
];

const GROUPS: IndexGroup[] = [
  {
    id: 'services',
    title: 'nav-services',
    desc: 'sitemap-group-services-desc',
    links: [
      { to: '/services', key: 'nav-services', desc: 'sitemap-dest-services-desc' },
      ...SERVICE_CATEGORIES.map((c) => ({
        to: `/services/${c}`,
        key: `dropdown-${c}`,
        desc: `nav-desc-${c}`,
      })),
    ],
  },
  {
    id: 'service-guides',
    title: 'sitemap-group-guides',
    desc: 'sitemap-group-guides-desc',
    links: SERVICE_GUIDES.map(([to, key]) => ({ to, key })),
  },
  {
    id: 'government',
    title: 'nav-government',
    desc: 'sitemap-group-government-desc',
    links: [
      { to: '/government', key: 'nav-government', desc: 'sitemap-dest-government-desc' },
      { to: '/government/officials', key: 'nav-officials', desc: 'nav-desc-officials' },
      { to: '/government/offices', key: 'gov-link-offices', desc: 'gov-link-offices-desc' },
      { to: '/government/barangays', key: 'gov-link-barangays', desc: 'gov-link-barangays-desc' },
      { to: '/contact', key: 'gov-link-contact', desc: 'gov-link-contact-desc' },
      { to: '/contact#hotlines', key: 'gov-channels-hotlines', desc: 'sitemap-item-hotlines-desc' },
    ],
  },
  {
    id: 'legislation',
    title: 'nav-group-legislation',
    desc: 'sitemap-group-legislation-desc',
    links: [
      {
        to: '/legislative',
        key: 'nav-legislative-overview',
        desc: 'nav-desc-legislative-overview',
      },
      {
        to: '/legislative/ordinance-framework',
        key: 'dropdown-ordinance-framework',
        desc: 'nav-desc-ordinance-framework',
      },
      {
        to: '/legislative/resolution-framework',
        key: 'dropdown-resolution-framework',
        desc: 'nav-desc-resolution-framework',
      },
    ],
  },
  {
    id: 'transparency',
    title: 'sitemap-group-transparency',
    desc: 'sitemap-group-transparency-desc',
    links: [
      { to: '/budget', key: 'nav-public-funds', desc: 'nav-desc-public-funds' },
      { to: '/statistics', key: 'nav-statistics', desc: 'gov-link-statistics-desc' },
      { to: '/news', key: 'nav-news', desc: 'nav-desc-news' },
    ],
  },
  {
    id: 'visit-mati',
    title: 'nav-visit-mati',
    desc: 'sitemap-group-visit-desc',
    links: [
      { to: '/visit-mati', key: 'nav-visit-mati', desc: 'sitemap-dest-visit-desc' },
      // Only attractions that have their own prerendered page.
      ...attractions
        .filter((a) => isMigratedRoute(`/visit-mati/${a.slug}`))
        .map((a) => ({ to: `/visit-mati/${a.slug}`, text: a.name, descText: a.tagline })),
    ],
  },
  {
    id: 'about-site',
    title: 'sitemap-group-about',
    desc: 'sitemap-group-about-desc',
    links: [
      { to: '/about', key: 'nav-about', desc: 'sitemap-item-about-desc' },
      { to: '/faq', key: 'footer-faq', desc: 'sitemap-item-faq-desc' },
      {
        to: '/accessibility',
        key: 'footer-accessibility',
        desc: 'sitemap-item-accessibility-desc',
      },
      { to: '/privacy', key: 'footer-privacy', desc: 'sitemap-item-privacy-desc' },
      { to: '/terms', key: 'footer-terms', desc: 'sitemap-item-terms-desc' },
      { to: '/changelog', key: 'changelog-title', desc: 'sitemap-item-changelog-desc' },
      {
        to: 'https://mati.gov.ph/',
        key: 'footer-lgu-portal',
        desc: 'sitemap-item-lgu-portal-desc',
      },
      {
        to: 'https://sangguniangbayan.mati.gov.ph/',
        key: 'sitemap-sangguniang-bayan',
        desc: 'sitemap-item-sp-desc',
      },
    ],
  },
];

// Absolute URLs open in a new tab; #hash links are plain <a> so a full load lands on
// the anchor; everything else goes through AppLink.
function IndexAnchor({
  to,
  className,
  children,
}: {
  to: string;
  className: string;
  children: ReactNode;
}) {
  if (to.startsWith('http'))
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  if (to.includes('#'))
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  return (
    <AppLink to={to} className={className}>
      {children}
    </AppLink>
  );
}

// Site index, laid out like BetterSanFernando's /sitemap: a hero with an "about this
// index" aside, primary destination cards, a jump-to row, then one ruled row per
// directory group (title + description on the left, a two-column link list on the right).
export default function SitemapPage() {
  const { t } = useLanguage();
  const label = (l: IndexLink) => l.text ?? t(l.key!);
  const desc = (l: IndexLink) => l.descText ?? (l.desc ? t(l.desc) : null);

  return (
    <>
      <Seo
        title={t('sitemap-title')}
        description="Browse every published section of BetterMati.org — services, government, legislation, transparency, statistics and Visit Mati."
        canonicalPath="/sitemap"
      />

      <PageHeader
        badge={
          <>
            <Network className="size-4" aria-hidden="true" />
            {t('sitemap-eyebrow')}
          </>
        }
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: t('sitemap-title') }]}
        title={t('sitemap-title')}
        description={t('sitemap-lede')}
        aside={{
          label: t('sitemap-about-label'),
          body: t('sitemap-about-body'),
          footer: (
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-royal hover:underline"
            >
              {t('sitemap-xml')}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ),
        }}
      />

      {/* Primary destinations */}
      <section
        className="border-b border-line bg-white py-8 sm:py-10"
        aria-labelledby="primary-heading"
      >
        <Container>
          <Eyebrow>{t('sitemap-start-eyebrow')}</Eyebrow>
          <h2
            id="primary-heading"
            className="mt-1.5 text-xl font-bold tracking-[-0.02em] text-heading sm:text-2xl"
          >
            {t('sitemap-primary-title')}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PRIMARY.map((l) => (
              <AppLink
                key={l.to}
                to={l.to}
                className="group flex flex-col justify-between border border-line bg-white p-4 transition-colors hover:border-royal hover:bg-surface-subtle"
              >
                <div>
                  <h3 className="text-sm font-bold text-heading transition-colors group-hover:text-royal">
                    {label(l)}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">{desc(l)}</p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-royal">
                  {t('sitemap-explore')}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </AppLink>
            ))}
          </div>
        </Container>
      </section>

      {/* Jump to */}
      <nav
        aria-label={t('sitemap-jump-label')}
        className="border-b border-line bg-white py-4 sm:py-5"
      >
        <Container>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm">
            <span className="font-bold tracking-wider text-ink-faint uppercase">
              {t('sitemap-jump-to')}
            </span>
            {GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex items-center gap-1 font-semibold text-royal hover:underline"
              >
                {t(g.title)}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {/* Directory groups */}
      <section className="bg-white py-10 sm:py-12 lg:py-16" aria-labelledby="groups-heading">
        <Container>
          <h2 id="groups-heading" className="sr-only">
            {t('sitemap-groups-title')}
          </h2>
          <div className="divide-y divide-line border-y border-line">
            {GROUPS.map((g) => (
              <div
                key={g.id}
                id={g.id}
                className="py-8 sm:py-10 lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-12"
              >
                <div className="mb-6 lg:mb-0">
                  <h3 className="text-xl font-bold tracking-[-0.02em] text-heading sm:text-2xl">
                    {t(g.title)}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
                    {t(g.desc)}
                  </p>
                </div>
                <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {g.links.map((l) => {
                    const external = l.to.startsWith('http');
                    const d = desc(l);
                    return (
                      <li key={l.to}>
                        <IndexAnchor
                          to={l.to}
                          className="group -mx-2.5 block p-2.5 transition-colors hover:bg-surface-subtle"
                        >
                          <span className="flex items-center gap-1.5 text-sm font-bold text-royal">
                            {label(l)}
                            {external ? (
                              <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
                            ) : (
                              <ArrowRight
                                className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                          {d && (
                            <span className="mt-1 block text-xs leading-relaxed text-ink-muted">
                              {d}
                            </span>
                          )}
                        </IndexAnchor>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
