import type { ReactNode } from 'react';
import { FileText, Heart, Info, Lightbulb, Mail } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/hooks/useLanguage';
import { PageHeader } from '@/components/primitives';
import { LegalLayout } from '@/components/LegalLayout';
import { legal } from '@/components/legalStyles';

type TFn = (key: string) => string;

const PARA = legal.p;

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
    <section id={id} className={legal.section}>
      <h2 className={legal.h2}>{title}</h2>
      {children}
    </section>
  );
}

// Legacy .legal-list: primary-colored bullets, spaced items.
function LegalList({ t, items }: { t: TFn; items: string[] }) {
  return (
    <ul className={legal.list}>
      {items.map((key) => (
        <li key={key} className={legal.listItem}>
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
    <div className={legal.callout}>
      <h3 className={legal.calloutTitle}>
        {icon}
        {t(heading)}
      </h3>
      <ul className="m-0 list-none p-0">
        {items.map((key) => (
          <li key={key} className={legal.calloutItem}>
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

      {/* Hero (legacy .legal-hero) */}
      <PageHeader
        badge={
          <>
            <FileText className="size-4" aria-hidden="true" />
            {t('terms-legal')}
          </>
        }
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: t('terms-terms-of-use') }]}
        title={t('terms-terms-of-use')}
        description={t('terms-guidelines-for-using-bettermatiorg')}
      />

      <LegalLayout
        contentsLabel={t('terms-contents')}
        toc={toc.map((item) => ({ href: item.href, label: t(item.key) }))}
      >
        <LegalSection id="introduction" title={t('terms-introduction')}>
          <p className={PARA}>{t('terms-bettermatiorg-is-a-civic-platform-dedicated-to')}</p>
          <p className={PARA}>{t('terms-while-volunteers-make-every-effort-to-secure')}</p>
          {/* Legacy .legal-highlight */}
          <div className={legal.highlight}>
            <Heart className={legal.highlightIcon} aria-hidden="true" />
            <span className={legal.highlightText}>
              This platform is provided{' '}
              <strong className={legal.strong}>{t('terms-free-of-charge')}</strong> as a public
              service.
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
          <div className={legal.note}>
            <Info className={`size-4 ${legal.noteIcon}`} aria-hidden="true" />
            <p className={legal.noteText}>
              {t('terms-as-a-volunteerrun-initiative-this-website-does')}
            </p>
          </div>
        </LegalSection>

        <LegalSection id="disclaimer" title={t('terms-as-is-disclaimer')}>
          <p className={PARA}>{t('terms-all-information-on-this-website-is-provided-as-is')}</p>
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
          <p className={PARA}>{t('terms-this-limitation-applies-regardless-of-the-form-of')}</p>
        </LegalSection>

        <LegalSection
          id="responsibilities"
          title={t('terms-user-responsibilities-and-research-guidelines')}
        >
          <p className={PARA}>{t('terms-users-share-responsibility-for-promoting-informed')}</p>
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

        <LegalSection id="external-links" title={t('terms-source-links-and-external-references')}>
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
          <p className={PARA}>{t('terms-by-using-this-website-you-agree-to-indemnify-and')}</p>
        </LegalSection>

        <LegalSection id="modifications" title={t('terms-modifications')}>
          <p className={PARA}>{t('terms-these-terms-may-be-updated-or-modified-from-time')}</p>
        </LegalSection>

        <LegalSection id="governing-law" title={t('terms-governing-law')}>
          <p className={PARA}>{t('terms-these-terms-are-governed-by-and-construed-in')}</p>
        </LegalSection>

        <LegalSection id="severability" title={t('terms-severability')}>
          <p className={PARA}>{t('terms-if-any-provision-of-these-terms-is-found-to-be')}</p>
        </LegalSection>

        <LegalSection id="takedown" title={t('terms-content-concerns-and-takedown-requests')}>
          <p className={PARA}>{t('terms-bettermatiorg-values-accuracy-public-safety-and')}</p>
          <p className={PARA}>{t('terms-if-you-believe-that-any-content-on-this-website-is')}</p>
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
            <a href="mailto:volunteer@bettermati.org" className={legal.link}>
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
          <h3 className={legal.h3}>{t('terms-our-response-process')}</h3>
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
          <p className={PARA}>{t('terms-for-questions-about-these-terms-feedback-on-civic')}</p>
          {/* Legacy .legal-contact / .contact-link */}
          <div className="my-6">
            <a href="mailto:volunteer@bettermati.org" className={legal.contactButton}>
              <Mail className="size-[1.125rem]" aria-hidden="true" />
              {t('terms-volunteerbettermatiorg')}
            </a>
          </div>
          <p className={legal.footnote}>{t('terms-bettermatiorg-provides-public-domain')}</p>
        </LegalSection>
      </LegalLayout>
    </>
  );
}
