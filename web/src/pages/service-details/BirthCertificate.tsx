import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Clock,
  Banknote,
  UserCheck,
  CalendarCheck,
  ListOrdered,
  ClipboardCheck,
  CircleHelp,
  User,
  Users,
  CircleCheck,
  Building2,
  Phone,
  Link2,
  Info,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Container,
  Section,
  SectionTitle,
  SectionSubtitle,
  PageHeader,
} from '@/components/primitives';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

// Quick-stat cards. `value` is an i18n key unless `literal` is set — fees and
// walk-in status carry no data-i18n in the legacy markup, so they render verbatim.
const quickStats: { Icon: LucideIcon; label: string; value: string; literal?: boolean }[] = [
  { Icon: Clock, label: 'bc-processing', value: 'bc-1530-minutes' },
  { Icon: Banknote, label: 'bc-fee', value: '₱150/copy', literal: true },
  { Icon: UserCheck, label: 'bc-who-can-apply', value: 'bc-ownerrepresentative' },
  { Icon: CalendarCheck, label: 'bc-appointment', value: 'Walk-in', literal: true },
];

// Step numbers are plain text in the legacy markup (rendered verbatim).
const steps: { num: string; title: string; desc: string; final?: boolean }[] = [
  { num: '1', title: 'bc-check-eligibility', desc: 'bc-you-can-request-if-you-are-the-owner' },
  {
    num: '2',
    title: 'bc-prepare-documents',
    desc: 'bc-bring-valid-governmentissued-id-if-representative',
  },
  {
    num: '3',
    title: 'bc-visit-civil-registrar',
    desc: 'bc-go-to-the-local-civil-registrar-office-at-2nd',
  },
  {
    num: '4',
    title: 'bc-fill-out-request-form',
    desc: 'bc-complete-the-request-form-with-full-name-date-of',
  },
  { num: '5', title: 'bc-pay-the-fee', desc: 'bc-pay-150-per-certified-copy-at-the-municipal' },
  {
    num: '6',
    title: 'bc-claim-certificate',
    desc: 'bc-return-to-civil-registrar-with-official-receipt',
    final: true,
  },
];

const requirementSections: { Icon: LucideIcon; title: string; items: string[] }[] = [
  {
    Icon: User,
    title: 'bc-if-you-are-the-owner',
    items: ['bc-valid-governmentissued-id-original-photocopy', 'bc-payment-150-cash-per-copy'],
  },
  {
    Icon: Users,
    title: 'bc-if-you-are-a-representative',
    items: [
      'bc-authorization-letter-signed-by-the-owner',
      'bc-valid-id-of-the-owner-photocopy',
      'bc-valid-id-of-the-representative-original-photocopy',
      'bc-payment-150-cash-per-copy',
    ],
  },
];

// FAQ answers carry no data-i18n in the legacy markup, so they render verbatim.
const faqs: { q: string; a: string }[] = [
  {
    q: 'bc-can-i-get-a-birth-certificate-registered-in',
    a: "No. The Mati Civil Registrar only has records for births registered in Mati. For other municipalities, request from that municipality's Civil Registrar or from PSA.",
  },
  {
    q: 'bc-what-if-i-dont-know-the-exact-date-of-birth',
    a: 'Provide an approximate year and month. The staff will help search the records, but this may take longer.',
  },
  {
    q: 'bc-can-i-request-through-email-or-online',
    a: 'Currently, requests must be made in person. Online services are being planned for the future.',
  },
  {
    q: 'bc-whats-the-difference-between-local-copy-and-psa',
    a: 'Both are certified true copies. PSA copies are nationally-recognized and required for passport/visa applications. Local copies are accepted for most local transactions and school enrollment.',
  },
];

export default function BirthCertificate() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('bc-birth-certificate-local-copy')}
        description="How to get a birth certificate copy in Mati, Davao Oriental. Complete step-by-step guide with requirements, fees, processing time, and application procedures from LGU Mati."
        canonicalPath="/service-details/birth-certificate"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('bc-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('bc-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/certificates" className="hover:text-primary">
            {t('bc-certificates')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">Birth Certificate</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <FileText className="size-4" aria-hidden="true" />
            {t('bc-certificates')}
          </>
        }
        title={t('bc-birth-certificate-local-copy')}
        description={t('bc-official-certified-copy-of-birth-certificate')}
      />

      {/* Quick stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            {quickStats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center"
              >
                <s.Icon className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
                <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                  {t(s.label)}
                </h3>
                <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                  {s.literal ? s.value : t(s.value)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Step-by-step process */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <ListOrdered className="size-5 text-primary" aria-hidden="true" />
            {t('bc-stepbystep-process')}
          </SectionTitle>
          <SectionSubtitle>{t('bc-follow-these-steps-to-request-your-birth')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5"
              >
                <div
                  className={`mb-2 inline-flex size-[22px] items-center justify-center rounded-[5px] text-[0.625rem] font-bold text-primary-foreground ${
                    step.final ? 'bg-brand-success' : 'bg-primary'
                  }`}
                >
                  {step.num}
                </div>
                <h3 className="mb-1 text-[0.8125rem] font-semibold text-foreground">
                  {t(step.title)}
                </h3>
                <p className="m-0 text-[0.6875rem] leading-[1.4] text-muted-foreground">
                  {t(step.desc)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Requirements, FAQ and office info */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            {/* Left column: requirements + FAQ */}
            <div>
              <SectionTitle>
                <ClipboardCheck className="size-5 text-primary" aria-hidden="true" />
                {t('bc-requirements')}
              </SectionTitle>
              <SectionSubtitle>{t('bc-documents-needed-for-your-application')}</SectionSubtitle>

              {requirementSections.map((box) => (
                <div
                  key={box.title}
                  className="mb-3.5 rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5"
                >
                  <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                    <box.Icon className="size-4 text-primary" aria-hidden="true" />
                    {t(box.title)}
                  </h3>
                  <ul className="m-0 list-none p-0">
                    {box.items.map((item, i) => (
                      <li
                        key={`${box.title}-${i}`}
                        className="flex items-start gap-1.5 py-1 text-xs text-foreground"
                      >
                        <CircleCheck
                          className="mt-0.5 size-3 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <SectionTitle className="mt-8">
                <CircleHelp className="size-5 text-primary" aria-hidden="true" />
                {t('bc-frequently-asked-questions')}
              </SectionTitle>
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem key={faq.q} value={`faq-${i}`}>
                    <AccordionTrigger className="text-foreground">{t(faq.q)}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>{faq.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right column: sidebar cards */}
            <div className="space-y-2.5">
              <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
                <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                  <Building2 className="size-4 text-primary" aria-hidden="true" />
                  {t('bc-office-information')}
                </h3>
                <p className="mb-1.5 text-xs text-foreground">
                  <strong className="font-semibold">{t('bc-local-civil-registrar')}</strong>
                </p>
                <p className="mb-1.5 text-xs text-muted-foreground">
                  {t('bc-municipal-hall-2nd-floor-mati-nueva-vizcaya')}
                </p>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="size-3 shrink-0 text-primary" aria-hidden="true" />
                  (087) 326-5001
                </p>
                <p className="m-0 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3 shrink-0 text-primary" aria-hidden="true" />
                  Mon-Fri: 8AM - 5PM
                </p>
              </div>

              <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
                <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                  <Link2 className="size-4 text-primary" aria-hidden="true" />
                  {t('bc-related-services')}
                </h3>
                <ul className="m-0 list-none space-y-1.5 p-0">
                  <li>
                    <AppLink
                      to="/service-details/marriage-certificate"
                      className="text-xs text-primary hover:underline"
                    >
                      {t('bc-marriage-certificate')}
                    </AppLink>
                  </li>
                  <li>
                    <AppLink
                      to="/services/certificates"
                      className="text-xs text-primary hover:underline"
                    >
                      {t('bc-death-certificate')}
                    </AppLink>
                  </li>
                  <li>
                    <AppLink
                      to="/services/certificates"
                      className="text-xs text-primary hover:underline"
                    >
                      {t('bc-barangay-clearance')}
                    </AppLink>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
                <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                  <Info className="size-4 text-primary" aria-hidden="true" />
                  {t('bc-need-help')}
                </h3>
                <p className="m-0 text-xs text-muted-foreground">
                  {t('bc-contact-us-for-assistance-with-this-service')}
                </p>
                <AppLink
                  to="/contact"
                  className="mt-2.5 block rounded-md bg-primary px-4 py-2.5 text-center text-xs font-medium text-primary-foreground transition hover:bg-primary-dark"
                >
                  {t('bc-contact-us')}
                </AppLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
