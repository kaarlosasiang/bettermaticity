import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ChevronRight, Info, Landmark, Scale } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { OfficialChannels } from '@/components/OfficialChannels';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, PageHeader, Section, SectionHead } from '@/components/primitives';
import { officials } from '@/lib/govData';
import { departments } from '@/lib/govDirectory';
import { barangayCount } from '@/lib/statsData';

const officialsCount =
  (officials.mayor ? 1 : 0) + (officials.vice_mayor ? 1 : 0) + (officials.councilors?.length ?? 0);

type HubLink = { to: string; key: string; descKey: string };

// Links with a #hash are plain <a> so a full load lands on the anchor.
function HubAnchor({
  to,
  className,
  children,
}: {
  to: string;
  className: string;
  children: ReactNode;
}) {
  return to.includes('#') ? (
    <a href={to} className={className}>
      {children}
    </a>
  ) : (
    <AppLink to={to} className={className}>
      {children}
    </AppLink>
  );
}

const START: HubLink[] = [
  {
    to: '/government/officials',
    key: 'officials-elected-officials',
    descKey: 'nav-desc-officials',
  },
  { to: '/government/offices', key: 'gov-link-offices', descKey: 'gov-link-offices-desc' },
  { to: '/contact', key: 'gov-link-contact', descKey: 'gov-link-contact-desc' },
];

const CITY_GOVERNMENT: HubLink[] = [
  {
    to: '/government/officials',
    key: 'officials-elected-officials',
    descKey: 'nav-desc-officials',
  },
  { to: '/government/offices', key: 'gov-link-offices', descKey: 'gov-link-offices-desc' },
  { to: '/government/barangays', key: 'gov-link-barangays', descKey: 'gov-link-barangays-desc' },
  { to: '/government/links', key: 'links-title', descKey: 'nav-desc-official-links' },
];

const GROUPS: { Icon: LucideIcon; titleKey: string; descKey: string; links: HubLink[] }[] = [
  {
    Icon: Scale,
    titleKey: 'gov-legislation-title',
    descKey: 'gov-legislation-desc',
    links: [
      {
        to: '/legislative',
        key: 'nav-legislative-overview',
        descKey: 'nav-desc-legislative-overview',
      },
      {
        to: '/legislative/ordinance-framework',
        key: 'dropdown-ordinance-framework',
        descKey: 'nav-desc-ordinance-framework',
      },
      {
        to: '/legislative/resolution-framework',
        key: 'dropdown-resolution-framework',
        descKey: 'nav-desc-resolution-framework',
      },
    ],
  },
  {
    Icon: Info,
    titleKey: 'gov-public-title',
    descKey: 'gov-public-desc',
    links: [
      { to: '/contact#hotlines', key: 'gov-link-hotlines', descKey: 'gov-link-hotlines-desc' },
      { to: '/transparency/finance', key: 'nav-public-funds', descKey: 'nav-desc-public-funds' },
      { to: '/statistics', key: 'nav-statistics', descKey: 'gov-link-statistics-desc' },
    ],
  },
];

// Government hub, laid out like BetterSanFernando's /government: a hero with a
// "start with what you need" card, an explore section (City Government panel, then
// Legislation and Public information), and the official-channels band. Officials,
// offices and barangays each have their own page.
export default function Government() {
  const { t } = useLanguage();
  const counts = [
    t('gov-count-officials', { count: officialsCount }),
    t('gov-count-offices', { count: departments.length }),
    t('gov-count-barangays', { count: barangayCount }),
  ];

  return (
    <>
      <Seo
        title={t('nav-government')}
        description="Find City of Mati officials, offices, legislation, barangays and official resources in one place."
        canonicalPath="/government"
      />

      <PageHeader
        badge={
          <>
            <Landmark className="size-4" aria-hidden="true" />
            {t('nav-government')}
          </>
        }
        title={t('gov-hub-title')}
        description={t('gov-hub-lede')}
        ledeTone="strong"
        note={t('gov-hub-note')}
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: t('nav-government') }]}
        meta={counts}
        sidePanel={
          <div className="border border-line bg-surface-subtle p-5">
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-muted uppercase">
              {t('gov-start-title')}
            </p>
            <ol className="mt-2 divide-y divide-line">
              {START.map((s, i) => (
                <li key={s.to}>
                  <AppLink to={s.to} className="group flex items-start gap-3 py-3">
                    <span className="mt-0.5 font-mono text-xs font-semibold text-royal">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-heading group-hover:text-royal">
                        {t(s.key)}
                      </span>
                      <span className="block text-xs leading-5 text-ink-muted">{t(s.descKey)}</span>
                    </span>
                    <ArrowUpRight
                      className="mt-0.5 size-4 shrink-0 text-ink-faint group-hover:text-royal"
                      aria-hidden="true"
                    />
                  </AppLink>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <Section>
        <Container>
          <SectionHead
            eyebrow={t('gov-explore-eyebrow')}
            title={t('gov-explore-title')}
            lede={t('gov-explore-lede')}
          />

          {/* City Government panel */}
          <div className="grid gap-5 border border-line bg-surface-subtle p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:items-center lg:gap-8">
            <div>
              <h3 className="text-lg font-bold text-heading">{t('gov-panel-title')}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{t('gov-panel-desc')}</p>
              <p className="mt-3 text-sm font-semibold text-heading">{counts.join(' · ')}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {CITY_GOVERNMENT.map((l) => (
                <AppLink
                  key={l.to}
                  to={l.to}
                  className="group flex h-full items-start justify-between gap-3 border border-line bg-white p-4 transition-colors hover:border-royal"
                >
                  <span>
                    <span className="block text-sm font-semibold text-heading group-hover:text-royal">
                      {t(l.key)}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-ink-muted">
                      {t(l.descKey)}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-ink-faint group-hover:text-royal"
                    aria-hidden="true"
                  />
                </AppLink>
              ))}
            </div>
          </div>

          {/* Legislation + Public information */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {GROUPS.map(({ Icon, titleKey, descKey, links }) => (
              <div key={titleKey} className="border border-line bg-white">
                <div className="flex items-start gap-3 border-b border-line px-5 py-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-royal" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-bold text-heading">{t(titleKey)}</h3>
                    <p className="mt-0.5 text-sm leading-6 text-ink-muted">{t(descKey)}</p>
                  </div>
                </div>
                <ul className="divide-y divide-line">
                  {links.map((l) => (
                    <li key={l.to}>
                      <HubAnchor
                        to={l.to}
                        className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-subtle"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-heading group-hover:text-royal">
                            {t(l.key)}
                          </span>
                          <span className="block text-xs leading-5 text-ink-muted">
                            {t(l.descKey)}
                          </span>
                        </span>
                        <ChevronRight
                          className="size-4 shrink-0 text-ink-faint group-hover:text-royal"
                          aria-hidden="true"
                        />
                      </HubAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <OfficialChannels />
    </>
  );
}
