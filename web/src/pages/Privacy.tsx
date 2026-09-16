import type { ReactNode } from 'react';
import { ShieldCheck, List, Info, Settings, UserCheck, Mail, Building2 } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

// Legacy legal.css inline anchor styling (primary link).
const inlineLink = 'font-medium text-primary underline underline-offset-2 hover:opacity-80';

// Legacy .legal-section: 48px bottom margin/padding with a hairline divider (none on the last).
function LegalSection({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="mb-12 scroll-mt-28 border-b border-border pb-12 last:mb-0 last:border-b-0 last:pb-0"
    >
      {children}
    </section>
  );
}

// Legacy .legal-section h2: 1.5rem, primary 2px underline, inline-block.
function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 inline-block border-b-2 border-primary pb-3 text-2xl font-semibold text-foreground">
      {children}
    </h2>
  );
}

// Legacy .legal-section h3: 1.125rem, spaced above.
function LegalH3({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 mb-3 text-lg font-semibold text-foreground">{children}</h3>;
}

// Legacy .legal-section p: 0.9375rem, relaxed leading.
function LegalP({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[0.9375rem] leading-relaxed text-muted-foreground last:mb-0">
      {children}
    </p>
  );
}

// Legacy .legal-list: custom primary dot bullets.
function LegalList({ children }: { children: ReactNode }) {
  return <ul className="my-4 space-y-2.5">{children}</ul>;
}

function LegalLi({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-6 text-[0.9375rem] leading-relaxed text-muted-foreground before:absolute before:top-[0.55em] before:left-0 before:size-1.5 before:rounded-full before:bg-primary before:content-['']">
      {children}
    </li>
  );
}

// Bold inline label inside list items (legacy <strong>).
function Label({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

// Legacy .legal-note: muted box with an accent icon.
function LegalNote({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="my-5 flex gap-3 rounded-lg bg-muted px-5 py-4">
      <span className="mt-0.5 shrink-0 text-primary" aria-hidden="true">
        {icon}
      </span>
      <p className="m-0 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

// Legacy .legal-callout: bordered card with a primary heading.
function LegalCallout({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="my-6 rounded-[10px] border border-border bg-card p-5">
      <h4 className="mb-3 flex items-center gap-2 text-[0.9375rem] font-semibold text-primary">
        {icon}
        {title}
      </h4>
      {children}
    </div>
  );
}

// Legacy .legal-callout li: arrow (→) bullets.
function CalloutLi({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-5 text-sm leading-relaxed text-foreground before:absolute before:left-0 before:text-primary before:content-['→']">
      {children}
    </li>
  );
}

export default function Privacy() {
  const { t } = useLanguage();

  const toc: { href: string; label: string }[] = [
    { href: '#introduction', label: t('privacy-introduction') },
    { href: '#legal-basis', label: t('privacy-legal-basis') },
    { href: '#information-collected', label: t('privacy-information-we-collect') },
    { href: '#how-we-use', label: t('privacy-how-we-use-information') },
    { href: '#cookies', label: t('privacy-cookies-analytics') },
    { href: '#data-sharing', label: t('privacy-data-sharing') },
    { href: '#data-security', label: t('privacy-data-security') },
    { href: '#data-retention', label: t('privacy-data-retention') },
    { href: '#your-rights', label: t('privacy-your-rights') },
    { href: '#childrens-privacy', label: t('privacy-childrens-privacy') },
    { href: '#third-party', label: t('privacy-thirdparty-links') },
    { href: '#changes', label: 'Policy Changes' },
    { href: '#contact', label: t('privacy-contact-us') },
  ];

  return (
    <>
      <Seo
        title={t('privacy-title')}
        description="Privacy Policy for BetterMati.org - Learn how we collect, use, and protect your personal information in compliance with the Philippine Data Privacy Act of 2012 (RA 10173)."
        canonicalPath="/privacy"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <a href="/" className="hover:text-primary">
            {t('privacy-home')}
          </a>
          <span>/</span>
          <span aria-current="page">{t('privacy-privacy-policy')}</span>
        </nav>
      </Container>

      {/* Hero */}
      <PageHeader
        badge={
          <>
            <ShieldCheck className="size-4" aria-hidden="true" />
            {t('privacy-privacy')}
          </>
        }
        title={t('privacy-privacy-policy')}
        description={t('privacy-how-we-collect-use-and-protect-your-information')}
      />

      {/* Content */}
      <Section>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[240px_1fr]">
            {/* Table of Contents */}
            <aside className="sticky top-[100px] hidden self-start rounded-xl border border-border bg-card p-5 shadow-sm lg:block">
              <h4 className="mb-4 flex items-center gap-2 border-b border-border pb-3 text-sm font-semibold text-foreground">
                <List className="size-4 text-primary" aria-hidden="true" />
                {t('privacy-contents')}
              </h4>
              <nav className="flex flex-col gap-1">
                {toc.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-[0.8125rem] text-muted-foreground transition hover:bg-muted hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Article */}
            <article className="max-w-[800px]">
              <LegalSection id="introduction">
                <LegalH2>{t('privacy-introduction')}</LegalH2>
                <LegalP>{t('privacy-bettermatiorg-we-us-or-our-is-committed-to')}</LegalP>
                <LegalP>
                  This policy is designed to comply with the{' '}
                  <Label>{t('privacy-data-privacy-act-of-2012-republic-act-no-10173')}</Label> of the
                  Philippines and its Implementing Rules and Regulations (IRR).
                </LegalP>
                <div className="my-5 flex items-center gap-3 rounded-r-lg border-l-4 border-emerald-500 bg-emerald-500/10 px-5 py-4">
                  <ShieldCheck className="size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span className="text-[0.9375rem] text-foreground">
                    We are committed to <Label>{t('privacy-transparency')}</Label> and{' '}
                    <Label>{t('privacy-data-minimization')}</Label> — we only collect what is
                    necessary.
                  </span>
                </div>
              </LegalSection>

              <LegalSection id="legal-basis">
                <LegalH2>{t('privacy-legal-basis-for-processing')}</LegalH2>
                <LegalP>{t('privacy-under-the-data-privacy-act-of-2012-we-process')}</LegalP>
                <LegalList>
                  <LegalLi>
                    <Label>{t('privacy-consent')}</Label> When you voluntarily provide information
                    through contact forms or email communications
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-legitimate-interest')}</Label> To improve our website, ensure
                    security, and provide better civic services
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-legal-obligation')}</Label> When required by Philippine law or
                    government authorities
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-public-interest')}</Label> To promote transparency and civic
                    engagement in local governance
                  </LegalLi>
                </LegalList>
              </LegalSection>

              <LegalSection id="information-collected">
                <LegalH2>{t('privacy-information-we-collect')}</LegalH2>
                <LegalP>{t('privacy-we-collect-minimal-information-necessary-to')}</LegalP>

                <LegalH3>{t('privacy-information-you-provide-voluntarily')}</LegalH3>
                <LegalList>
                  <LegalLi>{t('privacy-email-address-when-you-contact-us-or-submit')}</LegalLi>
                  <LegalLi>{t('privacy-name-if-provided-in-correspondence')}</LegalLi>
                  <LegalLi>{t('privacy-message-content-and-inquiries')}</LegalLi>
                </LegalList>

                <LegalH3>{t('privacy-information-collected-automatically')}</LegalH3>
                <LegalList>
                  <LegalLi>{t('privacy-ip-address-anonymized-where-possible')}</LegalLi>
                  <LegalLi>{t('privacy-browser-type-and-version')}</LegalLi>
                  <LegalLi>{t('privacy-device-type-and-operating-system')}</LegalLi>
                  <LegalLi>{t('privacy-pages-visited-and-time-spent-on-pages')}</LegalLi>
                  <LegalLi>{t('privacy-referring-website-or-source')}</LegalLi>
                  <LegalLi>{t('privacy-general-geographic-location-countryregion-level')}</LegalLi>
                </LegalList>

                <LegalNote icon={<Info className="size-4" aria-hidden="true" />}>
                  We do <Label>{t('privacy-not')}</Label> collect sensitive personal information such
                  as government-issued ID numbers, financial information, health records, or
                  biometric data through this website.
                </LegalNote>
              </LegalSection>

              <LegalSection id="how-we-use">
                <LegalH2>{t('privacy-how-we-use-your-information')}</LegalH2>
                <LegalP>{t('privacy-we-use-the-information-we-collect-for-the')}</LegalP>
                <LegalList>
                  <LegalLi>{t('privacy-to-respond-to-your-inquiries-and-feedback')}</LegalLi>
                  <LegalLi>{t('privacy-to-improve-website-functionality-and-user')}</LegalLi>
                  <LegalLi>{t('privacy-to-analyze-website-traffic-and-usage-patterns')}</LegalLi>
                  <LegalLi>{t('privacy-to-ensure-website-security-and-prevent-abuse')}</LegalLi>
                  <LegalLi>{t('privacy-to-comply-with-legal-obligations')}</LegalLi>
                  <LegalLi>{t('privacy-to-maintain-and-improve-civic-services-information')}</LegalLi>
                </LegalList>
              </LegalSection>

              <LegalSection id="cookies">
                <LegalH2>{t('privacy-cookies-and-analytics')}</LegalH2>
                <LegalP>{t('privacy-we-use-cookies-and-similar-technologies-to')}</LegalP>

                <LegalH3>{t('privacy-types-of-cookies-we-use')}</LegalH3>
                <LegalList>
                  <LegalLi>
                    <Label>{t('privacy-essential-cookies')}</Label> Required for basic website
                    functionality (e.g., language preferences)
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-analytics-cookies')}</Label> Help us understand how visitors
                    interact with our website
                  </LegalLi>
                </LegalList>

                <LegalH3>{t('privacy-google-analytics')}</LegalH3>
                <LegalP>{t('privacy-we-use-google-analytics-to-collect-anonymized')}</LegalP>
                <LegalList>
                  <LegalLi>{t('privacy-number-of-visitors-and-page-views')}</LegalLi>
                  <LegalLi>{t('privacy-traffic-sources-and-user-flow')}</LegalLi>
                  <LegalLi>{t('privacy-device-and-browser-information')}</LegalLi>
                  <LegalLi>{t('privacy-geographic-location-countrycity-level')}</LegalLi>
                </LegalList>

                <LegalCallout
                  icon={<Settings className="size-[1.0625rem]" aria-hidden="true" />}
                  title={t('privacy-managing-cookies')}
                >
                  <ul className="space-y-2">
                    <CalloutLi>{t('privacy-you-can-disable-cookies-through-your-browser')}</CalloutLi>
                    <CalloutLi>
                      You can opt out of Google Analytics by installing the{' '}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={inlineLink}
                      >
                        {t('privacy-google-analytics-optout-browser-addon')}
                      </a>
                    </CalloutLi>
                    <CalloutLi>{t('privacy-disabling-cookies-may-affect-some-website')}</CalloutLi>
                  </ul>
                </LegalCallout>
              </LegalSection>

              <LegalSection id="data-sharing">
                <LegalH2>{t('privacy-data-sharing-and-disclosure')}</LegalH2>
                <LegalP>{t('privacy-we-do-not-sell-trade-or-rent-your-personal')}</LegalP>
                <LegalList>
                  <LegalLi>
                    <Label>{t('privacy-service-providers')}</Label> With trusted third-party services
                    (e.g., web hosting, analytics) that assist in operating our website, subject to
                    confidentiality agreements
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-legal-requirements')}</Label> When required by law, court
                    order, or government authority under Philippine jurisdiction
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-protection-of-rights')}</Label> To protect the rights,
                    property, or safety of BetterMati.org, our users, or the public
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-consent')}</Label> With your explicit consent for any other
                    purpose
                  </LegalLi>
                </LegalList>
              </LegalSection>

              <LegalSection id="data-security">
                <LegalH2>{t('privacy-data-security')}</LegalH2>
                <LegalP>{t('privacy-we-implement-appropriate-technical-and')}</LegalP>
                <LegalList>
                  <LegalLi>{t('privacy-ssltls-encryption-for-data-transmission')}</LegalLi>
                  <LegalLi>{t('privacy-secure-hosting-infrastructure')}</LegalLi>
                  <LegalLi>{t('privacy-regular-security-assessments')}</LegalLi>
                  <LegalLi>{t('privacy-access-controls-and-authentication')}</LegalLi>
                  <LegalLi>{t('privacy-regular-software-updates-and-patches')}</LegalLi>
                </LegalList>
                <LegalP>{t('privacy-while-we-strive-to-protect-your-information-no')}</LegalP>
              </LegalSection>

              <LegalSection id="data-retention">
                <LegalH2>{t('privacy-data-retention')}</LegalH2>
                <LegalP>{t('privacy-we-retain-personal-information-only-for-as-long')}</LegalP>
                <LegalList>
                  <LegalLi>
                    <Label>{t('privacy-contact-information')}</Label> Retained for the duration needed
                    to respond to inquiries, then deleted within 1 year of last contact
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-analytics-data')}</Label> Aggregated and anonymized data may be
                    retained indefinitely for statistical purposes
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-server-logs')}</Label> Automatically deleted after 90 days
                  </LegalLi>
                </LegalList>
              </LegalSection>

              <LegalSection id="your-rights">
                <LegalH2>{t('privacy-your-rights-under-the-data-privacy-act')}</LegalH2>
                <LegalP>{t('privacy-under-the-data-privacy-act-of-2012-you-have-the')}</LegalP>
                <LegalList>
                  <LegalLi>
                    <Label>{t('privacy-right-to-be-informed')}</Label> To be informed of the
                    collection and processing of your personal data
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-right-to-access')}</Label> To request access to your personal
                    data held by us
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-right-to-object')}</Label> To object to the processing of your
                    personal data
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-right-to-erasure-or-blocking')}</Label> To request deletion or
                    blocking of your personal data
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-right-to-rectification')}</Label> To request correction of
                    inaccurate or incomplete personal data
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-right-to-data-portability')}</Label> To obtain your personal
                    data in a structured, commonly used format
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-right-to-file-a-complaint')}</Label> To file a complaint with
                    the National Privacy Commission (NPC)
                  </LegalLi>
                  <LegalLi>
                    <Label>{t('privacy-right-to-damages')}</Label> To be indemnified for damages
                    sustained due to inaccurate, incomplete, outdated, false, unlawfully obtained, or
                    unauthorized use of personal data
                  </LegalLi>
                </LegalList>

                <LegalCallout
                  icon={<UserCheck className="size-[1.0625rem]" aria-hidden="true" />}
                  title={t('privacy-exercising-your-rights')}
                >
                  <p className="m-0 text-sm leading-relaxed text-foreground">
                    To exercise any of these rights, please contact us at{' '}
                    <a href="mailto:volunteer@bettermati.org" className={inlineLink}>
                      {t('privacy-volunteerbettermatiorg')}
                    </a>
                    . We will respond to your request within 30 days as required by law.
                  </p>
                </LegalCallout>
              </LegalSection>

              <LegalSection id="childrens-privacy">
                <LegalH2>{t('privacy-childrens-privacy')}</LegalH2>
                <LegalP>{t('privacy-bettermatiorg-is-a-general-audience-website')}</LegalP>
                <LegalP>
                  If you are a parent or guardian and believe your child has provided us with
                  personal information, please contact us immediately at{' '}
                  <a href="mailto:volunteer@bettermati.org" className={inlineLink}>
                    {t('privacy-volunteerbettermatiorg')}
                  </a>
                  , and we will take steps to delete such information.
                </LegalP>
              </LegalSection>

              <LegalSection id="third-party">
                <LegalH2>{t('privacy-thirdparty-links')}</LegalH2>
                <LegalP>{t('privacy-our-website-may-contain-links-to-external')}</LegalP>
                <LegalP>{t('privacy-we-encourage-you-to-review-the-privacy-policies')}</LegalP>
              </LegalSection>

              <LegalSection id="changes">
                <LegalH2>{t('privacy-changes-to-this-privacy-policy')}</LegalH2>
                <LegalP>{t('privacy-we-may-update-this-privacy-policy-from-time-to')}</LegalP>
                <LegalList>
                  <LegalLi>{t('privacy-the-last-updated-date-at-the-bottom-of-this-page')}</LegalLi>
                  <LegalLi>{t('privacy-material-changes-may-be-announced-on-our-website')}</LegalLi>
                  <LegalLi>{t('privacy-your-continued-use-of-the-website-after-changes')}</LegalLi>
                </LegalList>
              </LegalSection>

              <LegalSection id="contact">
                <LegalH2>{t('privacy-contact-us')}</LegalH2>
                <LegalP>{t('privacy-if-you-have-questions-about-this-privacy-policy')}</LegalP>
                <div className="my-6">
                  <a
                    href="mailto:volunteer@bettermati.org"
                    className="inline-flex items-center gap-2.5 rounded-lg bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] px-6 py-3.5 text-[0.9375rem] font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,50,160,0.25)]"
                  >
                    <Mail className="size-[1.125rem]" aria-hidden="true" />
                    {t('privacy-volunteerbettermatiorg')}
                  </a>
                </div>

                <LegalH3>{t('privacy-national-privacy-commission')}</LegalH3>
                <LegalP>{t('privacy-you-may-also-file-a-complaint-with-the-national')}</LegalP>
                <LegalNote icon={<Building2 className="size-4" aria-hidden="true" />}>
                  <Label>{t('privacy-national-privacy-commission')}</Label>
                  <br />
                  3rd Floor, Core G, GSIS Headquarters Building
                  <br />
                  Financial Center, Pasay City 1308
                  <br />
                  Website:{' '}
                  <a
                    href="https://www.privacy.gov.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={inlineLink}
                  >
                    www.privacy.gov.ph
                  </a>
                </LegalNote>

                <p className="mt-6 border-t border-border pt-6 text-[0.9375rem] text-muted-foreground italic">
                  {t('privacy-last-updated-december-2-2025')}
                </p>
              </LegalSection>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
