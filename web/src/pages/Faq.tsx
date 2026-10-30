import type { ReactNode } from 'react';
import { ArrowRight, CircleHelp } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Eyebrow, PageHeader } from '@/components/primitives';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

type TFn = (key: string) => string;

interface Faq {
  id: string;
  q: string;
  a: (t: TFn) => ReactNode;
}

interface FaqGroup {
  id: string;
  titleKey: string;
  items: Faq[];
}

const linkClass = 'font-semibold text-royal';

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

const GROUPS: FaqGroup[] = [
  {
    id: 'general',
    titleKey: 'faq-general',
    items: [
      {
        id: 'office-hours',
        q: 'faq-what-are-the-office-hours-of-the-municipal-hall',
        a: (t) => <p>{t('faq-the-municipal-hall-is-open-monday-to-friday-800')}</p>,
      },
      {
        id: 'contact-office',
        q: 'faq-how-can-i-contact-a-specific-municipal-office',
        a: (t) => (
          <p>
            Visit our{' '}
            <AppLink to="/government/offices" className={linkClass}>
              {t('faq-government-directory')}
            </AppLink>{' '}
            page to find contact information for all municipal offices and department heads.
          </p>
        ),
      },
      {
        id: 'online',
        q: 'faq-can-i-request-services-online',
        a: (t) => <p>{t('faq-currently-most-services-require-inperson')}</p>,
      },
    ],
  },
  {
    id: 'certificates',
    titleKey: 'faq-certificates',
    items: [
      {
        id: 'birth-certificate-time',
        q: 'faq-how-long-does-it-take-to-get-a-birth-certificate',
        a: (t) => <p>{t('faq-for-birth-certificates-registered-in-mati-it')}</p>,
      },
      {
        id: 'representative',
        q: 'faq-can-someone-else-request-my-certificate-for-me',
        a: (t) => (
          <>
            <p>{t('faq-yes-but-they-must-bring')}</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('faq-an-authorization-letter-signed-by-you')}</li>
              <li>{t('faq-valid-id-of-both-you-and-the-representative')}</li>
              <li>{t('faq-photocopy-of-your-valid-id')}</li>
            </ul>
          </>
        ),
      },
      {
        id: 'psa-vs-local',
        q: 'faq-what-is-the-difference-between-psa-and-local',
        a: (t) => <p>{t('faq-both-are-certified-true-copies-psa-certificates')}</p>,
      },
    ],
  },
  {
    id: 'business',
    titleKey: 'faq-business',
    items: [
      {
        id: 'permit-renewal',
        q: 'faq-when-should-i-renew-my-business-permit',
        a: (t) => <p>{t('faq-business-permits-must-be-renewed-annually')}</p>,
      },
      {
        id: 'new-business',
        q: 'faq-what-do-i-need-to-start-a-new-business-in-mati',
        a: (t) => (
          <>
            <p>{t('faq-to-start-a-new-business-youll-need')}</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('faq-dti-registration-for-sole-proprietorship-or-sec')}</li>
              <li>{t('faq-barangay-clearance')}</li>
              <li>{t('faq-community-tax-certificate-cedula')}</li>
              <li>{t('faq-location-sketchmap')}</li>
              <li>Contract of Lease (if renting)</li>
            </ul>
            <p>
              Visit our{' '}
              <AppLink to="/services/business" className={linkClass}>
                {t('faq-business-permit-page')}
              </AppLink>{' '}
              for complete details.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'payments',
    titleKey: 'faq-payments',
    items: [
      {
        id: 'payment-methods',
        q: 'faq-what-payment-methods-are-accepted',
        a: (t) => <p>{t('faq-currently-we-accept-cash-payments-at-the')}</p>,
      },
      {
        id: 'property-tax',
        q: 'faq-how-can-i-pay-my-real-property-tax',
        a: (t) => <p>{t('faq-visit-the-municipal-treasurers-office-at-the')}</p>,
      },
    ],
  },
  {
    id: 'social',
    titleKey: 'faq-social',
    items: [
      {
        id: 'senior-id',
        q: 'faq-how-do-i-apply-for-a-senior-citizen-id',
        a: (t) => (
          <>
            <p>{t('faq-go-to-the-municipal-social-welfare-and')}</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t('faq-birth-certificate-or-any-valid-id-showing-your')}</li>
              <li>{t('faq-1x1-id-photo')}</li>
              <li>{t('faq-barangay-residence-certificate')}</li>
            </ul>
            <p>{t('faq-the-id-is-issued-for-free')}</p>
          </>
        ),
      },
      {
        id: 'senior-benefits',
        q: 'faq-what-benefits-do-senior-citizens-receive',
        a: (t) => <p>{t('faq-senior-citizens-enjoy-20-discount-and-vat')}</p>,
      },
    ],
  },
  {
    id: 'technical',
    titleKey: 'faq-technical',
    items: [
      {
        id: 'report-error',
        q: 'faq-i-found-a-broken-link-or-error-on-this-website',
        a: (t) => (
          <p>
            Thank you for helping us improve! Please send us message at{' '}
            <External href="mailto:volunteer@bettermati.org">
              {t('faq-volunteerbettermatiorg')}
            </External>{' '}
            {
              'and write "Website Issue" as the subject. Describe the problem and include the page URL if possible.'
            }
          </p>
        ),
      },
      {
        id: 'mobile',
        q: 'faq-is-this-website-mobilefriendly',
        a: (t) => <p>{t('faq-yes-better-mati-is-fully-responsive-and')}</p>,
      },
    ],
  },
  {
    id: 'developer',
    titleKey: 'faq-about-the-developer',
    items: [
      {
        id: 'who-developed',
        q: 'faq-who-developed-better-mati',
        a: (t) => (
          <>
            <p>
              {t('faq-dev-maintainer-before')}{' '}
              <External href="https://kaarlosasiang.vercel.app/">Kaarlo Sasiang</External>
              {t('faq-dev-maintainer-after')}
            </p>
            <p>
              {t('faq-dev-template-before')}{' '}
              <External href="https://ramonloganjr.com/">{t('faq-ramon-logan-jr')}</External>
              {t('faq-dev-template-after')}{' '}
              <External href="https://abakada.org">{t('faq-abakadaorg')}</External>.
            </p>
            <p>{t('faq-dev-open-source')}</p>
          </>
        ),
      },
    ],
  },
];

// FAQ, in the site's ruled layout: a sticky list of topics on the left and each topic's
// questions as hairline accordions on the right, then a pointer to the Contact page.
export default function Faq() {
  const { t } = useLanguage();
  const total = GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <Seo
        title={t('faq-title')}
        description="Frequently asked questions about Mati municipal services, procedures, requirements, and how to access LGU Mati programs."
        canonicalPath="/faq"
      />

      <PageHeader
        badge={
          <>
            <CircleHelp className="size-4" aria-hidden="true" />
            {t('faq-page-eyebrow')}
          </>
        }
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: 'FAQ' }]}
        title={t('faq-title')}
        description={t('faq-subtitle')}
        meta={[t('faq-page-count', { count: total, topics: GROUPS.length })]}
      />

      <section className="bg-white py-10 sm:py-12 lg:py-16" aria-label={t('faq-title')}>
        <Container className="lg:grid lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12">
          <nav
            aria-label={t('faq-page-topics')}
            className="mb-8 lg:sticky lg:top-[calc(var(--sticky-offset)+1.5rem)] lg:mb-0 lg:self-start"
          >
            <Eyebrow>{t('faq-page-topics')}</Eyebrow>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-0 lg:border-l lg:border-line">
              {GROUPS.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="text-sm font-semibold text-royal hover:underline lg:-ml-px lg:block lg:border-l-2 lg:border-transparent lg:py-1.5 lg:pl-4 lg:font-medium lg:text-ink-soft lg:hover:border-royal lg:hover:text-royal lg:hover:no-underline"
                  >
                    {t(g.titleKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {GROUPS.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`}>
                <h2
                  id={`${g.id}-heading`}
                  className="text-xl font-bold tracking-[-0.02em] text-heading sm:text-2xl"
                >
                  {t(g.titleKey)}
                </h2>
                <Accordion type="multiple" className="mt-4 border-y border-line">
                  {g.items.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-line">
                      <AccordionTrigger className="py-4 text-base font-semibold text-heading hover:text-royal hover:no-underline">
                        {t(item.q)}
                      </AccordionTrigger>
                      <AccordionContent className="max-w-3xl space-y-3 pb-5 text-sm leading-6 text-ink-soft [&_a]:no-underline [&_a]:hover:underline [&_p:not(:last-child)]:mb-0">
                        {item.a(t)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}

            <div className="grid grid-cols-1 gap-5 border border-line bg-surface-subtle p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <Eyebrow>{t('faq-page-more-eyebrow')}</Eyebrow>
                <h2 className="mt-1 text-xl font-bold tracking-[-0.02em] text-heading">
                  {t('faq-still-questions')}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{t('faq-page-more-text')}</p>
              </div>
              <AppLink
                to="/contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-btn bg-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-navy"
              >
                {t('faq-page-more-cta')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </AppLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
