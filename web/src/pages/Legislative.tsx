import { useState } from 'react';
import { BookMarked, ScrollText, ArrowRight, Landmark, Users, Eye } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Band, PageHeader } from '@/components/primitives';
import { ordinanceSteps, resolutionSteps } from '@/lib/legislativeProcess';

const categories: {
  to: string;
  Icon: LucideIcon;
  titleKey: string;
  descKey: string;
  linkKey: string;
}[] = [
  {
    to: '/legislative/ordinance-framework',
    Icon: BookMarked,
    titleKey: 'leg-ordinance-framework',
    descKey: 'leg-municipal-ordinances-enacted-by-the-sangguniang',
    linkKey: 'leg-browse-ordinances',
  },
  {
    to: '/legislative/resolution-framework',
    Icon: ScrollText,
    titleKey: 'leg-resolution-framework',
    descKey: 'leg-resolutions-passed-by-the-sangguniang-bayan',
    linkKey: 'leg-browse-resolutions',
  },
];

// "Understanding Local Legislation" — the four basics from the legacy page.
const understandingCards: { Icon: LucideIcon; titleKey: string; descKey: string }[] = [
  {
    Icon: BookMarked,
    titleKey: 'leg-ordinances',
    descKey: 'leg-local-laws-with-permanent-and-general-application',
  },
  {
    Icon: ScrollText,
    titleKey: 'leg-resolutions',
    descKey: 'leg-expressions-of-the-legislative-bodys-will-or',
  },
  {
    Icon: Users,
    titleKey: 'leg-public-participation',
    descKey: 'leg-citizens-can-attend-sangguniang-bayan-sessions',
  },
  {
    Icon: Eye,
    titleKey: 'leg-transparency',
    descKey: 'leg-all-enacted-ordinances-and-resolutions-are-made',
  },
];

// Legislative hub in the site's band layout: the two record frameworks as ruled link
// cells, the step-by-step process (ordinances / resolutions tabs), then the basics.
export default function Legislative() {
  const { t } = useLanguage();
  const [flow, setFlow] = useState<'ordinances' | 'resolutions'>('ordinances');
  const steps = flow === 'ordinances' ? ordinanceSteps : resolutionSteps;
  const tabClass = (active: boolean) =>
    active
      ? 'bg-royal px-4 py-2 text-sm font-semibold text-white'
      : 'px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-royal';

  return (
    <>
      <Seo
        title={t('leg-legislative-documents')}
        description="Ordinances and resolutions of the Sangguniang Panlungsod of Mati."
        canonicalPath="/legislative"
      />

      <PageHeader
        badge={
          <>
            <Landmark className="size-4" aria-hidden="true" />
            {t('leg-sangguniang-bayan')}
          </>
        }
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-government'), to: '/government' },
          { label: t('nav-legislative') },
        ]}
        title={t('leg-legislative-documents')}
        description={t('leg-ordinances-and-resolutions-of-the-sangguniang')}
      />

      <Band
        id="records"
        eyebrow={t('leg-page-records-eyebrow')}
        title={t('leg-page-records-title')}
      >
        <div className="mt-6 grid grid-cols-1 border-t border-l border-line md:grid-cols-2">
          {categories.map(({ to, Icon, titleKey, descKey, linkKey }) => (
            <AppLink
              key={to}
              to={to}
              className="group flex flex-col border-r border-b border-line p-5 transition-colors hover:bg-surface-subtle sm:p-6"
            >
              <span className="flex size-9 items-center justify-center bg-surface-subtle text-royal group-hover:bg-white">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="mt-4 text-lg font-bold text-heading group-hover:text-royal">
                {t(titleKey)}
              </span>
              <span className="mt-1 flex-1 text-sm leading-6 text-ink-muted">{t(descKey)}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                {t(linkKey)}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </AppLink>
          ))}
        </div>
      </Band>

      <Band
        id="process"
        eyebrow={t('leg-page-process-eyebrow')}
        title={t('leg-flowchart-for-legislative-proposal')}
        lede={t('leg-stepbystep-process-for-enacting-ordinances-and')}
      >
        <div
          className="mt-6 inline-flex border border-line"
          role="tablist"
          aria-label="Legislative process"
        >
          <button
            type="button"
            role="tab"
            aria-selected={flow === 'ordinances'}
            onClick={() => setFlow('ordinances')}
            className={tabClass(flow === 'ordinances')}
          >
            {t('leg-for-ordinances')} ({ordinanceSteps.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={flow === 'resolutions'}
            onClick={() => setFlow('resolutions')}
            className={`border-l border-line ${tabClass(flow === 'resolutions')}`}
          >
            {t('leg-for-resolutions')} ({resolutionSteps.length})
          </button>
        </div>

        <ol className="mt-6 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.titleKey} className="flex gap-4 border-r border-b border-line p-5">
              <span className="font-mono text-sm font-semibold text-royal tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-sm font-bold text-heading">{t(s.titleKey)}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-muted">{t(s.descKey)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Band>

      <Band
        id="basics"
        eyebrow={t('leg-page-basics-eyebrow')}
        title={t('leg-understanding-local-legislation')}
        last
      >
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {understandingCards.map(({ Icon, titleKey, descKey }) => (
            <div key={titleKey} className="space-y-2">
              <span className="flex size-8 items-center justify-center bg-surface-subtle text-royal">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <h3 className="pt-1 text-base font-bold text-heading">{t(titleKey)}</h3>
              <p className="text-sm leading-6 text-ink-muted">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </Band>
    </>
  );
}
