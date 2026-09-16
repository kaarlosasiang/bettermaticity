import type { ReactNode } from 'react';
import { FileText, List, Heart, Info, Lightbulb, Mail } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

type TFn = (key: string) => string;

const PARA = 'mb-4 text-[0.9375rem] leading-relaxed text-muted-foreground';

// Table of contents: legacy .legal-toc sidebar, rendered inline atop the column.
const toc: { href: string; key: string }[] = [
  { href: '#introduction', key: 'terms-introduction' },
  { href: '#acceptance', key: 'terms-acceptance-of-terms' },
  { href: '#public-domain', key: 'terms-public-domain-content' },
  { href: '#disclaimer', key: 'terms-as-is-disclaimer' },
  { href: '#limitation', key: 'terms-limitation-of-liability' },
  { href: '#responsibilities', key: 'terms-user-responsibilities' },
  { href: '#no-advice', key: 'terms-no-professional-advice' },
  { href: '#external-links', key: 'terms-external-references' },
  { href: '#availability', key: 'terms-website-availability' },
  { href: '#indemnification', key: 'terms-indemnification' },
  { href: '#modifications', key: 'terms-modifications' },
  { href: '#governing-law', key: 'terms-governing-law' },
  { href: '#severability', key: 'terms-severability' },
  { href: '#takedown', key: 'terms-content-concerns' },
  { href: '#contact', key: 'terms-contact-information' },
];

// Legacy .legal-section: divider between sections + h2 with a primary underline.
function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="mb-12 scroll-mt-24 border-b border-border pb-12 last:mb-0 last:border-0 last:pb-0"
    >
      <h2 className="mb-4 inline-block border-b-2 border-primary pb-3 text-2xl font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

// Legacy .legal-list: primary-colored bullets, spaced items.
function LegalList({ t, items }: { t: TFn; items: string[] }) {
  return (
    <ul className="my-4 list-disc space-y-2.5 pl-5 marker:text-primary">
      {items.map((key) => (
        <li key={key} className="text-[0.9375rem] leading-relaxed text-muted-foreground">
          {t(key)}
        </li>
      ))}
    </ul>
  );
}

// Legacy .legal-callout: bordered card, primary heading, arrow-marker list.
function Callout({
  t,
  icon,
  heading,
  items,
}: {
  t: TFn;
  icon: ReactNode;
  heading: string;
  items: string[];
}) {
  return (
    <div className="my-6 rounded-[10px] border border-border bg-card p-5">
      <h3 className="mb-3 flex items-center gap-2 text-[0.9375rem] font-semibold text-primary">
        {icon}
        {t(heading)}
      </h3>
      <ul className="m-0 list-none p-0">
        {items.map((key) => (
          <li
            key={key}
            className="relative mb-2 pl-5 text-[0.875rem] leading-relaxed text-foreground last:mb-0 before:absolute before:left-0 before:text-primary before:content-['→']"
          >
            {t(key)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Terms() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('terms-terms-of-use')}
        description="Terms of Use for BetterMati.org - A civic platform dedicated to empowering the people of Mati with transparent access to municipal services and public funds of LGU Mati, Davao Oriental."
        canonicalPath="/terms"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('terms-home')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">{t('terms-terms-of-use')}</span>
        </nav>
      </Container>

      {/* Hero (legacy .legal-hero) */}
      <PageHeader
        badge={
          <>
            <FileText className="size-4" aria-hidden="true" />
            {t('terms-legal')}
          </>
        }
        title={t('terms-terms-of-use')}
        description={t('terms-guidelines-for-using-bettermatiorg')}
      />

      {/* Content */}
      <Section>
        <Container>
          <div className="mx-auto max-w-[820px]">
            {/* Table of Contents */}
            <nav
              aria-label={t('terms-contents')}
              className="mb-10 rounded-xl border border-border bg-card p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <h2 className="mb-4 flex items-center gap-2 border-b border-border pb-3 text-sm font-semibold text-foreground">
                <List className="size-4 text-primary" aria-hidden="true" />
                {t('terms-contents')}
              </h2>
              <div className="grid gap-1 sm:grid-cols-2">
                {toc.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-[0.8125rem] text-muted-foreground transition hover:bg-muted hover:text-primary"
                  >
                    {t(item.key)}
                  </a>
                ))}
              </div>
            </nav>

            <article>
              <LegalSection id="introduction" title={t('terms-introduction')}>
                <p className={PARA}>{t('terms-bettermatiorg-is-a-civic-platform-dedicated-to')}</p>
                <p className={PARA}>{t('terms-while-volunteers-make-every-effort-to-secure')}</p>
                {/* Legacy .legal-highlight */}
                <div className="my-5 flex items-center gap-3 rounded-r-lg border-l-4 border-l-[#06a77d] bg-[linear-gradient(135deg,rgba(6,167,125,0.1)_0%,rgba(6,167,125,0.05)_100%)] px-5 py-4">
                  <Heart className="size-5 shrink-0 text-[#06a77d]" aria-hidden="true" />
                  <span className="text-[0.9375rem] text-foreground">
                    This platform is provided{' '}
                    <strong className="font-semibold">{t('terms-free-of-charge')}</strong> as a
                    public service.
                  </span>
                </div>
              </LegalSection>

              <LegalSection id="acceptance" title={t('terms-acceptance-of-terms')}>
                <p className={PARA}>{t('terms-by-accessing-and-using-this-website-you')}</p>
              </LegalSection>

              <LegalSection
                id="public-domain"
                title={t('terms-public-domain-content-and-volunteer-operation')}
              >
                <p className={PARA}>{t('terms-this-website-and-its-content-are-provided-as-a')}</p>
                <p className={PARA}>{t('terms-public-domain-content-may-be-freely-used-copied')}</p>
                {/* Legacy .legal-note */}
                <div className="my-5 flex gap-3 rounded-lg bg-muted px-5 py-4">
                  <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <p className="m-0 text-[0.875rem] leading-relaxed text-muted-foreground">
                    {t('terms-as-a-volunteerrun-initiative-this-website-does')}
                  </p>
                </div>
              </LegalSection>

              <LegalSection id="disclaimer" title={t('terms-as-is-disclaimer')}>
                <p className={PARA}>
                  {t('terms-all-information-on-this-website-is-provided-as-is')}
                </p>
                <LegalList
                  t={t}
                  items={[
                    'terms-warranties-of-merchantability',
                    'terms-fitness-for-a-particular-purpose',
                    'terms-noninfringement-of-intellectual-property-rights',
                    'terms-accuracy-completeness-or-reliability-of',
                    'terms-freedom-from-errors-viruses-or-other-harmful',
                  ]}
                />
                <p className={PARA}>{t('terms-users-should-treat-all-content-as-informational')}</p>
              </LegalSection>

              <LegalSection id="limitation" title={t('terms-limitation-of-liability')}>
                <p className={PARA}>{t('terms-to-the-fullest-extent-permitted-by-law-the')}</p>
                <LegalList
                  t={t}
                  items={[
                    'terms-your-use-of-or-reliance-on-this-website-or-its',
                    'terms-any-errors-omissions-or-outdated-information',
                    'terms-any-interruption-suspension-or-cessation-of',
                    'terms-any-bugs-viruses-or-other-harmful-components',
                    'terms-any-loss-corruption-or-disclosure-of-data-or',
                  ]}
                />
                <p className={PARA}>
                  {t('terms-this-limitation-applies-regardless-of-the-form-of')}
                </p>
              </LegalSection>

              <LegalSection
                id="responsibilities"
                title={t('terms-user-responsibilities-and-research-guidelines')}
              >
                <p className={PARA}>
                  {t('terms-users-share-responsibility-for-promoting-informed')}
                </p>
                <LegalList
                  t={t}
                  items={[
                    'terms-independently-verifying-all-information-obtained',
                    'terms-reviewing-and-visiting-original-source-links-and',
                    'terms-crosschecking-information-with-multiple-reliable',
                    'terms-determining-whether-the-information-is-suitable',
                    'terms-complying-with-all-applicable-laws-regulations',
                    'terms-accepting-any-consequences-that-may-arise-from',
                  ]}
                />
                <Callout
                  t={t}
                  icon={<Lightbulb className="size-4" aria-hidden="true" />}
                  heading="terms-you-are-strongly-encouraged-to"
                  items={[
                    'terms-use-the-source-links-and-references-on-each-page',
                    'terms-conduct-additional-research-beyond-what-is',
                    'terms-consult-official-government-websites-offices-and',
                    'terms-verify-dates-figures-and-other-details-through',
                  ]}
                />
              </LegalSection>

              <LegalSection id="no-advice" title={t('terms-no-professional-advice')}>
                <p className={PARA}>{t('terms-the-information-on-this-website-is-provided-for')}</p>
                <p className={PARA}>{t('terms-users-should-consult-qualified-professionals-or')}</p>
              </LegalSection>

              <LegalSection
                id="external-links"
                title={t('terms-source-links-and-external-references')}
              >
                <p className={PARA}>{t('terms-this-website-may-provide-links-to-official')}</p>
                <LegalList
                  t={t}
                  items={[
                    'terms-click-through-and-review-all-source-links-provided',
                    'terms-access-primary-documents-and-official',
                    'terms-verify-information-directly-from-original-and',
                    'terms-check-for-updates-amendments-or-corrections-to',
                  ]}
                />
                <p className={PARA}>{t('terms-the-continued-availability-accuracy-and')}</p>
              </LegalSection>

              <LegalSection id="availability" title={t('terms-website-availability')}>
                <p className={PARA}>{t('terms-although-volunteers-aim-to-keep-the-website')}</p>
                <LegalList
                  t={t}
                  items={[
                    'terms-available-or-accessible-at-all-times',
                    'terms-errorfree-or-uninterrupted',
                    'terms-free-from-technical-problems-vulnerabilities-or',
                    'terms-fully-compatible-with-all-devices-browsers-or',
                  ]}
                />
                <p className={PARA}>{t('terms-users-are-encouraged-to-report-technical-issues')}</p>
              </LegalSection>

              <LegalSection id="indemnification" title={t('terms-indemnification')}>
                <p className={PARA}>
                  {t('terms-by-using-this-website-you-agree-to-indemnify-and')}
                </p>
              </LegalSection>

              <LegalSection id="modifications" title={t('terms-modifications')}>
                <p className={PARA}>
                  {t('terms-these-terms-may-be-updated-or-modified-from-time')}
                </p>
              </LegalSection>

              <LegalSection id="governing-law" title={t('terms-governing-law')}>
                <p className={PARA}>{t('terms-these-terms-are-governed-by-and-construed-in')}</p>
              </LegalSection>

              <LegalSection id="severability" title={t('terms-severability')}>
                <p className={PARA}>{t('terms-if-any-provision-of-these-terms-is-found-to-be')}</p>
              </LegalSection>

              <LegalSection id="takedown" title={t('terms-content-concerns-and-takedown-requests')}>
                <p className={PARA}>{t('terms-bettermatiorg-values-accuracy-public-safety-and')}</p>
                <p className={PARA}>
                  {t('terms-if-you-believe-that-any-content-on-this-website-is')}
                </p>
                <LegalList
                  t={t}
                  items={[
                    'terms-factually-incorrect-or-misleading',
                    'terms-potentially-harmful-or-dangerous',
                    'terms-in-violation-of-applicable-laws-or-regulations',
                    'terms-containing-personal-information-that-should-not',
                    'terms-infringing-upon-legitimate-rights-or-interests',
                  ]}
                />
                <p className={PARA}>
                  Please contact us at:{' '}
                  <a
                    href="mailto:volunteer@bettermati.org"
                    className="text-primary hover:underline"
                  >
                    {t('terms-volunteerbettermatiorg')}
                  </a>
                </p>
                <Callout
                  t={t}
                  icon={<Mail className="size-4" aria-hidden="true" />}
                  heading="terms-when-reaching-out-kindly-include"
                  items={[
                    'terms-the-specific-url-or-page-location',
                    'terms-a-clear-description-of-your-concern',
                    'terms-supporting-documentation-or-evidence-where',
                    'terms-your-contact-information-for-followup',
                  ]}
                />
                <h3 className="mt-6 mb-3 text-lg font-semibold text-foreground">
                  {t('terms-our-response-process')}
                </h3>
                <LegalList
                  t={t}
                  items={[
                    'terms-legitimate-concerns-will-be-reviewed-in-good',
                    'terms-response-times-may-vary-due-to-the-volunteer',
                    'terms-content-may-be-removed-corrected-updated-or',
                    'terms-editorial-decisions-about-content-rest-with-the',
                    'terms-knowingly-false-malicious-or-frivolous-complaints',
                  ]}
                />
              </LegalSection>

              <LegalSection id="contact" title={t('terms-contact-information')}>
                <p className={PARA}>
                  {t('terms-for-questions-about-these-terms-feedback-on-civic')}
                </p>
                {/* Legacy .legal-contact / .contact-link */}
                <div className="my-6">
                  <a
                    href="mailto:volunteer@bettermati.org"
                    className="inline-flex items-center gap-2.5 rounded-lg bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] px-6 py-3.5 text-[0.9375rem] font-medium text-white transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,50,160,0.25)]"
                  >
                    <Mail className="size-[1.125rem]" aria-hidden="true" />
                    {t('terms-volunteerbettermatiorg')}
                  </a>
                </div>
                <p className="mt-6 border-t border-border pt-6 text-[0.9375rem] leading-relaxed text-muted-foreground italic">
                  {t('terms-bettermatiorg-provides-public-domain')}
                </p>
              </LegalSection>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
