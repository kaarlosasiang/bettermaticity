import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Accessibility as AccessibilityIcon,
  ArrowRight,
  ArrowUpRight,
  Contrast,
  Keyboard,
  Languages,
  LayoutList,
  Mail,
  MousePointerClick,
  ImageIcon,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Eyebrow, PageHeader } from '@/components/primitives';

const WCAG_URL = 'https://www.w3.org/WAI/standards-guidelines/wcag/';
const ISSUE_URL = `https://github.com/kaarlosasiang/bettermaticity/issues/new?title=${encodeURIComponent(
  'Accessibility issue: '
)}`;

const MEASURES: { Icon: LucideIcon; key: string }[] = [
  { Icon: LayoutList, key: 'semantic' },
  { Icon: Keyboard, key: 'keyboard' },
  { Icon: ImageIcon, key: 'alt' },
  { Icon: Contrast, key: 'contrast' },
  { Icon: MousePointerClick, key: 'motion' },
  { Icon: Languages, key: 'languages' },
];

const LIMITATIONS = ['pdf', 'external', 'translations'];

// One titled band per topic, separated by hairlines (BetterSanFernando pattern).
function Band({
  id,
  eyebrow,
  title,
  children,
  last,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section
      className={
        'border-b border-line bg-white py-10 sm:py-12 lg:py-14' +
        (last ? ' pb-16 sm:pb-20 lg:pb-24' : '')
      }
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            id={`${id}-heading`}
            className="mt-2 text-2xl font-bold tracking-[-0.02em] text-heading md:text-3xl"
          >
            {title}
          </h2>
        </div>
        {children}
      </Container>
    </section>
  );
}

function Item({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-bold text-heading sm:text-lg">{title}</h3>
      <p className="text-sm leading-6 text-ink-soft">{children}</p>
    </div>
  );
}

// Accessibility statement, laid out like BetterSanFernando's /accessibility: a hero
// with the working standard, then approach, measures, known limitations and a
// feedback box. It states a working goal, not a certified conformance level.
export default function Accessibility() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('a11y-accessibility')}
        description="How BetterMati.org approaches accessibility: WCAG 2.1 Level AA as a working goal, the measures in place, known limitations, and how to report a problem."
        canonicalPath="/accessibility"
      />

      <PageHeader
        badge={
          <>
            <AccessibilityIcon className="size-4" aria-hidden="true" />
            {t('a11y-page-eyebrow')}
          </>
        }
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: t('a11y-accessibility') }]}
        title={t('a11y-accessibility')}
        description={t('a11y-page-lede')}
        aside={{
          label: t('a11y-page-standard-label'),
          title: 'WCAG 2.1 Level AA',
          body: t('a11y-page-standard-body'),
          footer: (
            <a
              href={WCAG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-royal hover:underline"
            >
              {t('a11y-page-wcag-link')}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ),
        }}
      />

      <Band
        id="approach"
        eyebrow={t('a11y-page-approach-eyebrow')}
        title={t('a11y-page-approach-title')}
      >
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-heading sm:text-lg">
              {t('a11y-page-standard-label')}
            </h3>
            <p className="text-sm leading-6 text-ink-soft">{t('a11y-page-approach-standard')}</p>
            <div className="pt-2">
              <a
                href={WCAG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal hover:underline"
              >
                {t('a11y-page-wcag-link')}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <Item title={t('a11y-page-approach-means-title')}>{t('a11y-page-approach-means')}</Item>
        </div>
      </Band>

      <Band
        id="measures"
        eyebrow={t('a11y-page-measures-eyebrow')}
        title={t('a11y-page-measures-title')}
      >
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {MEASURES.map(({ Icon, key }) => (
            <div key={key} className="space-y-2">
              <span className="flex size-8 items-center justify-center bg-surface-subtle text-royal">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <h3 className="pt-1 text-base font-bold text-heading">
                {t(`a11y-page-measure-${key}`)}
              </h3>
              <p className="text-sm leading-6 text-ink-muted">
                {t(`a11y-page-measure-${key}-desc`)}
              </p>
            </div>
          ))}
        </div>
      </Band>

      <Band
        id="limitations"
        eyebrow={t('a11y-page-limits-eyebrow')}
        title={t('a11y-page-limits-title')}
      >
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {LIMITATIONS.map((key) => (
            <Item key={key} title={t(`a11y-page-limit-${key}`)}>
              {t(`a11y-page-limit-${key}-desc`)}
            </Item>
          ))}
        </div>
        <div className="mt-8 border-t border-line pt-4">
          <p className="text-sm leading-6 text-ink-muted">{t('a11y-page-limits-note')}</p>
        </div>
      </Band>

      <section
        className="bg-white py-10 pb-16 sm:py-12 sm:pb-20 lg:py-14 lg:pb-24"
        aria-labelledby="feedback-heading"
      >
        <Container>
          <div className="border border-line bg-surface-subtle p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="max-w-2xl">
                <Eyebrow>{t('a11y-page-feedback-eyebrow')}</Eyebrow>
                <h2
                  id="feedback-heading"
                  className="mt-1 text-xl font-bold tracking-[-0.02em] text-heading sm:text-2xl"
                >
                  {t('a11y-page-feedback-title')}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  {t('a11y-page-feedback-text')}
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
                <a
                  href={ISSUE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-btn bg-royal px-4 text-sm font-semibold text-white transition-colors hover:bg-navy"
                >
                  <FaGithub className="size-4" aria-hidden="true" />
                  {t('a11y-page-feedback-github')}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
                <a
                  href="mailto:volunteer@bettermati.org?subject=Accessibility%20issue"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-btn border border-line bg-white px-4 text-sm font-semibold text-heading transition-colors hover:border-royal hover:text-royal"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  volunteer@bettermati.org
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-sm">
            <AppLink
              to="/sitemap"
              className="inline-flex items-center gap-1 font-semibold text-royal hover:underline"
            >
              {t('a11y-page-site-index')}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </AppLink>
          </div>
        </Container>
      </section>
    </>
  );
}
