import {
  CircleHelp,
  Info,
  FileText,
  Store,
  Coins,
  Users,
  Settings,
  Contact,
  MessageCircle,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export default function Faq() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('faq-title')}
        description="Frequently asked questions about Mati municipal services, procedures, requirements, and how to access LGU Mati programs."
        canonicalPath="/faq"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('faq-home')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">FAQ</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <CircleHelp className="size-4" aria-hidden="true" />
            FAQ
          </>
        }
        title={t('faq-title')}
        description={t('faq-subtitle')}
      />

      <Section>
        <Container>
          <div className="mx-auto w-full max-w-[820px] space-y-10">
            {/* General Questions */}
            <div>
              <SectionTitle>
                <Info className="size-5 text-primary" aria-hidden="true" />
                {t('faq-general')}
              </SectionTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-what-are-the-office-hours-of-the-municipal-hall')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-the-municipal-hall-is-open-monday-to-friday-800')}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-how-can-i-contact-a-specific-municipal-office')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      Visit our{' '}
                      <AppLink to="/government" className="text-primary">
                        {t('faq-government-directory')}
                      </AppLink>{' '}
                      page to find contact information for all municipal offices and department
                      heads.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-can-i-request-services-online')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-currently-most-services-require-inperson')}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Certificates & Documents */}
            <div>
              <SectionTitle>
                <FileText className="size-5 text-primary" aria-hidden="true" />
                {t('faq-certificates')}
              </SectionTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-how-long-does-it-take-to-get-a-birth-certificate')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-for-birth-certificates-registered-in-mati-it')}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-can-someone-else-request-my-certificate-for-me')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-yes-but-they-must-bring')}</p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>{t('faq-an-authorization-letter-signed-by-you')}</li>
                      <li>{t('faq-valid-id-of-both-you-and-the-representative')}</li>
                      <li>{t('faq-photocopy-of-your-valid-id')}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-what-is-the-difference-between-psa-and-local')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-both-are-certified-true-copies-psa-certificates')}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Business & Permits */}
            <div>
              <SectionTitle>
                <Store className="size-5 text-primary" aria-hidden="true" />
                {t('faq-business')}
              </SectionTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-when-should-i-renew-my-business-permit')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-business-permits-must-be-renewed-annually')}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-what-do-i-need-to-start-a-new-business-in-mati')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
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
                      <AppLink to="/services/business" className="text-primary">
                        {t('faq-business-permit-page')}
                      </AppLink>{' '}
                      for complete details.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Payments & Fees */}
            <div>
              <SectionTitle>
                <Coins className="size-5 text-primary" aria-hidden="true" />
                {t('faq-payments')}
              </SectionTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-what-payment-methods-are-accepted')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-currently-we-accept-cash-payments-at-the')}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-how-can-i-pay-my-real-property-tax')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-visit-the-municipal-treasurers-office-at-the')}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Social Services */}
            <div>
              <SectionTitle>
                <Users className="size-5 text-primary" aria-hidden="true" />
                {t('faq-social')}
              </SectionTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-11">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-how-do-i-apply-for-a-senior-citizen-id')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-go-to-the-municipal-social-welfare-and')}</p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>{t('faq-birth-certificate-or-any-valid-id-showing-your')}</li>
                      <li>{t('faq-1x1-id-photo')}</li>
                      <li>{t('faq-barangay-residence-certificate')}</li>
                    </ul>
                    <p>{t('faq-the-id-is-issued-for-free')}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-what-benefits-do-senior-citizens-receive')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-senior-citizens-enjoy-20-discount-and-vat')}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Technical Questions */}
            <div>
              <SectionTitle>
                <Settings className="size-5 text-primary" aria-hidden="true" />
                {t('faq-technical')}
              </SectionTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-13">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-i-found-a-broken-link-or-error-on-this-website')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      Thank you for helping us improve! Please send us message at{' '}
                      <a
                        href="mailto:volunteer@bettermati.org"
                        className="text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('faq-volunteerbettermatiorg')}
                      </a>{' '}
                      {
                        'and write "Website Issue" as the subject. Describe the problem and include the page URL if possible.'
                      }
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-14">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-is-this-website-mobilefriendly')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>{t('faq-yes-better-mati-is-fully-responsive-and')}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* About the Developer */}
            <div>
              <SectionTitle>
                <Contact className="size-5 text-primary" aria-hidden="true" />
                {t('faq-about-the-developer')}
              </SectionTitle>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-15">
                  <AccordionTrigger className="text-foreground">
                    {t('faq-who-developed-better-mati')}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>
                      <a
                        href="https://ramonloganjr.com/"
                        className="text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('faq-ramon-logan-jr')}
                      </a>{' '}
                      is the developer behind{' '}
                      <a
                        href="https://abakada.org"
                        className="text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('faq-abakadaorg')}
                      </a>{' '}
                      and BetterMati.org, a community-driven initiative building a digital bridge
                      between the residents of Mati and the local government of Mati. Based in the
                      United Arab Emirates, he works in IT and practices full-stack development,
                      helping build practical digital solutions in web development, design, cloud
                      services, and cybersecurity.
                    </p>
                    <p>
                      He also started{' '}
                      <a
                        href="https://hellopinas.com"
                        className="text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('faq-hellopinascom')}
                      </a>
                      , a small cloud-based solutions initiative. Ramon contributes to{' '}
                      <a
                        href="https://bettergov.ph"
                        className="text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('faq-bettergovph')}
                      </a>
                      , a volunteer-driven civic-tech effort focused on improving access to local
                      government information and services in the Philippines.
                    </p>
                    <p>
                      He is also an individual participant of the{' '}
                      <a
                        href="https://openjsf.org/"
                        className="text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('faq-openjs-foundation')}
                      </a>
                      , a nonprofit supporting open-source JavaScript communities worldwide.
                    </p>
                    <p>{t('faq-ramon-has-made-the-mati-project-open-source')}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Still Have Questions CTA */}
            <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-muted p-6 text-center sm:flex-row sm:text-left">
              <MessageCircle className="size-8 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <h3 className="m-0 mb-1 text-lg font-semibold text-foreground">
                  {t('faq-still-questions')}
                </h3>
                <p className="m-0 text-sm text-muted-foreground">{t('faq-contact-help')}</p>
              </div>
              <AppLink
                to="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                {t('faq-contact-us')}
              </AppLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
