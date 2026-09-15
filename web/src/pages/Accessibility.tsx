import {
  Accessibility as AccessibilityIcon,
  CircleCheck,
  Keyboard,
  Eye,
  Type,
  Palette,
  Smartphone,
  Hourglass,
  CircleAlert,
  Mail,
  Heart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

const features: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Keyboard,
    title: 'a11y-keyboard-navigation',
    desc: 'a11y-all-functionality-available-using-only-a-keyboard',
  },
  {
    Icon: Eye,
    title: 'a11y-screen-reader-support',
    desc: 'a11y-compatible-with-jaws-nvda-and-voiceover',
  },
  {
    Icon: Type,
    title: 'a11y-text-alternatives',
    desc: 'a11y-all-images-have-descriptive-alt-text',
  },
  {
    Icon: Palette,
    title: 'a11y-color-contrast',
    desc: 'a11y-meets-wcag-aa-contrast-requirements',
  },
  {
    Icon: Smartphone,
    title: 'a11y-responsive-design',
    desc: 'a11y-works-on-all-devices-and-screen-sizes',
  },
  {
    Icon: Hourglass,
    title: 'a11y-no-time-limits',
    desc: 'a11y-no-time-limits-on-reading-or-interacting',
  },
];

const limitations = [
  'a11y-some-pdf-documents-may-not-be-fully-accessible-to',
  'a11y-some-thirdparty-embedded-content-may-have',
];

// Tech stack chips. ARIA is a literal in the legacy markup (no data-i18n key).
const techTags: { key?: string; label?: string }[] = [
  { key: 'a11y-html5' },
  { key: 'a11y-css3' },
  { key: 'a11y-javascript' },
  { key: 'a11y-react' },
  { key: 'a11y-typescript' },
  { label: 'ARIA' },
];

export default function Accessibility() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('access-title')}
        description="Accessibility statement for BetterMati.org. Our commitment to making municipal services accessible to all citizens of Mati, Davao Oriental through WCAG compliance."
        canonicalPath="/accessibility"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('a11y-home')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">{t('a11y-accessibility')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <AccessibilityIcon className="size-4" aria-hidden="true" />
            {t('a11y-accessibility')}
          </>
        }
        title={t('access-title')}
        description={t('access-subtitle')}
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-[820px]">
            {/* Conformance Badge */}
            <div className="mb-12 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-xl bg-[linear-gradient(135deg,var(--brand-success)_0%,#05c793_100%)] px-6 py-4 text-white">
                <CircleCheck className="size-8" aria-hidden="true" />
                <div>
                  <span className="block text-xs uppercase tracking-[1px] opacity-90">
                    {t('a11y-wcag-21-level-aa')}
                  </span>
                  <span className="block text-xl font-bold">{t('a11y-conformant')}</span>
                </div>
              </div>
            </div>

            {/* Commitment */}
            <div className="mb-12">
              <h2 className="mb-6 border-b-2 border-muted pb-4 text-xl font-semibold text-foreground">
                {t('access-commitment')}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {t('a11y-better-mati-is-committed-to-ensuring-digital')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="mb-12">
              <h2 className="mb-6 border-b-2 border-muted pb-4 text-xl font-semibold text-foreground">
                {t('access-features')}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {features.map(({ Icon, title, desc }) => (
                  <div key={title} className="rounded-lg bg-muted p-6 text-center">
                    <Icon className="mx-auto mb-2 size-6 text-primary" aria-hidden="true" />
                    <h3 className="m-0 mb-1 text-sm text-foreground">{t(title)}</h3>
                    <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(desc)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Known Limitations */}
            <div className="mb-12">
              <h2 className="mb-6 border-b-2 border-muted pb-4 text-xl font-semibold text-foreground">
                {t('access-limitations')}
              </h2>
              <ul className="list-none p-0">
                {limitations.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 border-b border-border py-3 text-muted-foreground last:border-b-0"
                  >
                    <CircleAlert
                      className="mt-0.5 size-4 shrink-0 text-brand-accent"
                      aria-hidden="true"
                    />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternative Access */}
            <div className="mb-12">
              <h2 className="mb-6 border-b-2 border-muted pb-4 text-xl font-semibold text-foreground">
                {t('access-alternative')}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {t('a11y-if-you-encounter-difficulty-accessing-any')}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <a
                  href="mailto:volunteer@bettermati.org"
                  className="group flex items-center gap-3 rounded-lg bg-muted p-4 text-foreground no-underline transition-colors hover:bg-primary hover:text-white"
                >
                  <Mail
                    className="size-5 text-primary transition-colors group-hover:text-white"
                    aria-hidden="true"
                  />
                  <span className="text-[0.9375rem] font-medium">
                    {t('a11y-volunteerbettermatiorg')}
                  </span>
                </a>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mb-12">
              <h2 className="mb-6 border-b-2 border-muted pb-4 text-xl font-semibold text-foreground">
                {t('access-technical')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {techTags.map(({ key, label }) => (
                  <span
                    key={key ?? label}
                    className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {key ? t(key) : label}
                  </span>
                ))}
              </div>
            </div>

            {/* Promise Card */}
            <div className="mt-12 flex flex-col items-start gap-6 rounded-xl bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] p-8 text-white md:flex-row md:text-left max-md:text-center max-md:items-center">
              <Heart className="size-6 shrink-0 opacity-80" aria-hidden="true" />
              <div>
                <h3 className="m-0 mb-2 text-lg text-white">{t('access-promise')}</h3>
                <p className="m-0 text-white/90">
                  {t('a11y-better-mati-is-committed-to-ensuring-that-our')}
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {t('a11y-last-updated-november-29-2025')}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
