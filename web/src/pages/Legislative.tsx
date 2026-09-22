import { useState } from 'react';
import {
  BookMarked,
  ScrollText,
  ArrowRight,
  Scale,
  Landmark,
  Users,
  Eye,
  GitBranch,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
import {
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
  fadeUp,
  staggerContainer,
  revealViewport,
} from '@/components/motion';
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

// "Understanding Local Legislation" — 4 cards from the legacy page.
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

export default function Legislative() {
  const { t } = useLanguage();
  const [flow, setFlow] = useState<'ordinances' | 'resolutions'>('ordinances');
  const steps = flow === 'ordinances' ? ordinanceSteps : resolutionSteps;

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Seo
          title={t('leg-legislative-documents')}
          description="Ordinances and resolutions of the Sangguniang Panlungsod of Mati."
          canonicalPath="/legislative"
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
            <span aria-current="page">{t('nav-legislative')}</span>
          </nav>
        </Container>

        <PageHeader
          badge={
            <>
              <Landmark className="size-4" aria-hidden="true" />
              {t('leg-sangguniang-bayan')}
            </>
          }
          title={t('leg-legislative-documents')}
          description={t('leg-ordinances-and-resolutions-of-the-sangguniang')}
        />

        <Section>
          <Container>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-6 md:grid-cols-2"
            >
              {categories.map(({ to, Icon, titleKey, descKey, linkKey }) => (
                <m.div key={to} variants={fadeUp}>
                  <AppLink
                    to={to}
                    className="group flex h-full flex-col rounded-xl border-t-[3px] border-[#2b62ee] bg-white p-6 no-underline shadow-[0_0_0_1px_rgba(18,60,122,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]"
                  >
                    <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-[#eef4fe] text-[#2b62ee]">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <h2 className="mb-2 font-display text-lg font-bold text-[#123c7a]">
                      {t(titleKey)}
                    </h2>
                    <p className="mb-4 flex-1 text-sm text-[#4c5c78]">{t(descKey)}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b62ee]">
                      {t(linkKey)}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </AppLink>
                </m.div>
              ))}
            </m.div>
          </Container>
        </Section>

        {/* Legislative process flowchart */}
        <Section compact>
          <Container>
            <SectionTitle>
              <GitBranch className="size-5 text-primary" aria-hidden="true" />
              {t('leg-flowchart-for-legislative-proposal')}
            </SectionTitle>
            <p className="-mt-3 mb-5 text-[0.8125rem] text-[#4c5c78]">
              {t('leg-stepbystep-process-for-enacting-ordinances-and')}
            </p>

            <div
              className="mb-6 inline-flex rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-1"
              role="tablist"
              aria-label="Legislative process"
            >
              <button
                type="button"
                role="tab"
                aria-selected={flow === 'ordinances'}
                onClick={() => setFlow('ordinances')}
                className={
                  flow === 'ordinances'
                    ? 'rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground'
                    : 'rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-primary'
                }
              >
                {t('leg-for-ordinances')} ({ordinanceSteps.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={flow === 'resolutions'}
                onClick={() => setFlow('resolutions')}
                className={
                  flow === 'resolutions'
                    ? 'rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground'
                    : 'rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-primary'
                }
              >
                {t('leg-for-resolutions')} ({resolutionSteps.length})
              </button>
            </div>

            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s, i) => (
                <li
                  key={s.titleKey}
                  className="flex gap-3 rounded-xl bg-white p-4 shadow-[0_0_0_1px_rgba(18,60,122,0.07)]"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eef4fe] text-sm font-semibold text-[#2b62ee]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="mb-0.5 font-display text-sm font-bold text-[#123c7a]">
                      {t(s.titleKey)}
                    </h3>
                    <p className="m-0 text-[0.8125rem] text-[#4c5c78]">{t(s.descKey)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* Understanding local legislation */}
        <Section compact altBg>
          <Container>
            <SectionTitle>
              <Scale className="size-5 text-[#2b62ee]" aria-hidden="true" />
              {t('leg-understanding-local-legislation')}
            </SectionTitle>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-4 md:grid-cols-2"
            >
              {understandingCards.map(({ Icon, titleKey, descKey }) => (
                <m.div
                  key={titleKey}
                  variants={fadeUp}
                  className="rounded-xl bg-white p-6 shadow-[0_0_0_1px_rgba(18,60,122,0.07)]"
                >
                  <h3 className="mb-2 flex items-center gap-2 font-display text-base font-bold text-[#123c7a]">
                    <Icon className="size-5 text-[#2b62ee]" aria-hidden="true" />
                    {t(titleKey)}
                  </h3>
                  <p className="m-0 text-sm text-[#4c5c78]">{t(descKey)}</p>
                </m.div>
              ))}
            </m.div>
          </Container>
        </Section>
      </MotionConfig>
    </LazyMotion>
  );
}
