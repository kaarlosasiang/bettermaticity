import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  House,
  HousePlus,
  Clock,
  Banknote,
  CalendarCheck,
  Phone,
  FileText,
  ArrowLeftRight,
  Award,
  SquarePen,
  Layers,
  UserCheck,
  PlusCircle,
  RefreshCw,
  Files,
  Landmark,
  CircleX,
  AlertTriangle,
  ShieldAlert,
  TreePine,
  Home,
  Store,
  Settings,
  CircleCheck,
  Building2,
  MapPin,
  Mail,
  Link2,
  Info,
  MessageSquare,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

type Item = string | { lit: string };

// Info boxes: value is an i18n key unless { lit }; `sub` is always plain text (no data-i18n).
type InfoBox = { Icon: LucideIcon; label: string; value: Item; sub: string };
type Step = { n: number; title: string; desc: string };

export default function MunicipalAssessor() {
  const { t } = useLanguage();
  const text = (it: Item) => (typeof it === 'string' ? t(it) : it.lit);

  const SectionHead = ({ Icon, title, desc }: { Icon: LucideIcon; title: string; desc: string }) => (
    <div className="mb-4 flex items-start gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">{t(title)}</h2>
        <p className="m-0 text-sm text-muted-foreground">{t(desc)}</p>
      </div>
    </div>
  );

  const InfoBoxRow = ({ boxes }: { boxes: InfoBox[] }) => (
    <div className="mb-5 grid grid-cols-2 gap-2.5 md:grid-cols-4">
      {boxes.map((b) => (
        <div key={b.label} className="rounded-lg border border-border bg-muted/40 p-3 text-center">
          <b.Icon className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
          <h4 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
            {t(b.label)}
          </h4>
          <p className="m-0 text-[0.8125rem] font-semibold text-foreground">{text(b.value)}</p>
          <small className="text-[0.625rem] text-muted-foreground">{b.sub}</small>
        </div>
      ))}
    </div>
  );

  const ProcessSteps = ({ steps }: { steps: Step[] }) => (
    <div className="my-4 space-y-3">
      {steps.map((s) => (
        <div key={s.n} className="flex gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {s.n}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">{t(s.title)}</h4>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(s.desc)}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // Requirement items carry no data-i18n in the legacy markup — rendered verbatim.
  const Requirements = ({ items }: { items: string[] }) => (
    <>
      <h4 className="mt-5 mb-2 text-sm font-semibold text-foreground">
        {t('assessor-required-documents')}
      </h4>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((it) => (
          <div
            key={it}
            className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-[0.8125rem] text-muted-foreground"
          >
            <CircleCheck className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            {it}
          </div>
        ))}
      </div>
    </>
  );

  const ServiceCardBody = ({ children }: { children: ReactNode }) => (
    <div className="rounded-lg border border-border bg-card p-4">{children}</div>
  );

  const stdInfo = (procKey: string, procSub: string, fee: Item, feeSub: string, who: Item, whoSub: string, apptSub: string): InfoBox[] => [
    { Icon: Clock, label: 'assessor-processing-time', value: procKey, sub: procSub },
    { Icon: Banknote, label: 'assessor-fee', value: fee, sub: feeSub },
    { Icon: UserCheck, label: 'assessor-who-can-apply', value: who, sub: whoSub },
    { Icon: CalendarCheck, label: 'assessor-appointment', value: 'assessor-walkin', sub: apptSub },
  ];

  return (
    <>
      <Seo
        title={t('assessor-property-assessment-services')}
        description="Real property assessment, tax declarations, transfer of ownership, certifications, and land records management from the City Assessor's Office of Mati, Davao Oriental."
        canonicalPath="/service-details/municipal-assessor"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('assessor-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('assessor-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/tax-payments" className="hover:text-primary">
            {t('assessor-tax-payments')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">City Assessor's Office</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <House className="size-4" aria-hidden="true" />
            {t('assessor-municipal-assessors-office')}
          </>
        }
        title={t('assessor-property-assessment-services')}
        description={t('assessor-real-property-assessment-tax-declarations-and')}
      />

      {/* Quick stats + nav */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('assessor-processing-time')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('assessor-15-days')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Banknote className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('assessor-fees')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('assessor-varies-by-service')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <CalendarCheck className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('assessor-availability')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">Mon-Fri, 8AM-5PM</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Phone className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('assessor-hotline')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">(087) 326-5017</p>
            </div>
          </div>

          <nav className="mt-3 flex flex-wrap gap-2" aria-label="Assessor Services Navigation">
            {[
              { href: '#assessment', Icon: HousePlus, label: 'assessor-property-assessment' },
              { href: '#declaration', Icon: FileText, label: 'assessor-tax-declaration' },
              { href: '#transfer', Icon: ArrowLeftRight, label: 'assessor-transfer-of-ownership' },
              { href: '#certification', Icon: Award, label: 'assessor-certifications' },
              { href: '#annotation', Icon: SquarePen, label: 'assessor-annotation' },
              { href: '#reclassification', Icon: Layers, label: 'assessor-reclassification' },
            ].map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-[0.8125rem] font-medium text-foreground hover:border-primary hover:text-primary"
              >
                <n.Icon className="size-4" aria-hidden="true" /> {t(n.label)}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {/* Main + sidebar */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              {/* Property Assessment */}
              <div id="assessment" className="scroll-mt-24">
                <SectionHead
                  Icon={HousePlus}
                  title="assessor-property-assessment"
                  desc="assessor-appraisal-and-valuation-of-real-properties-for"
                />
                <ServiceCardBody>
                  <InfoBoxRow
                    boxes={stdInfo(
                      'assessor-35-days',
                      'After inspection',
                      'assessor-varies',
                      'Based on property',
                      'assessor-property-owner',
                      'Or authorized rep',
                      'Inspection scheduled'
                    )}
                  />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t('assessor-about-property-assessment')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('assessor-property-assessment-determines-the-fair-market')}
                  </p>
                  <ProcessSteps
                    steps={[
                      { n: 1, title: 'assessor-submit-application', desc: 'assessor-file-application-at-the-assessors-office-with' },
                      { n: 2, title: 'assessor-property-inspection', desc: 'assessor-assessors-staff-will-conduct-onsite-inspection' },
                      { n: 3, title: 'assessor-valuation-assessment', desc: 'assessor-property-is-appraised-based-on-schedule-of-fair' },
                      { n: 4, title: 'assessor-issuance-of-tax-declaration', desc: 'assessor-new-tax-declaration-is-issued-reflecting-the' },
                    ]}
                  />
                  <Requirements
                    items={[
                      'Transfer Certificate of Title',
                      'Tax Declaration (if existing)',
                      'Building Permit (for new)',
                      'Valid ID of Owner',
                    ]}
                  />
                </ServiceCardBody>
              </div>

              {/* Tax Declaration */}
              <div id="declaration" className="scroll-mt-24">
                <SectionHead
                  Icon={FileText}
                  title="assessor-tax-declaration-services"
                  desc="assessor-issuance-and-management-of-real-property-tax"
                />
                <ServiceCardBody>
                  <InfoBoxRow
                    boxes={stdInfo(
                      'assessor-13-days',
                      'Standard processing',
                      { lit: '₱100-500' },
                      'Depends on type',
                      'assessor-ownerrep',
                      'With authorization',
                      'No appointment needed'
                    )}
                  />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t('assessor-tax-declaration-services')}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t('assessor-tax-declaration-is-an-official-document-showing')}
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { Icon: PlusCircle, title: 'assessor-new-tax-declaration', desc: 'assessor-for-newly-constructed-buildings-improvements-or' },
                      { Icon: RefreshCw, title: 'assessor-revisionupdate', desc: 'assessor-for-changes-in-property-details-corrections-or' },
                      { Icon: Files, title: 'assessor-duplicate-copy', desc: 'assessor-replacement-for-lost-damaged-or-additional-copies' },
                    ].map((c) => (
                      <div key={c.title} className="rounded-lg border border-border bg-muted/40 p-4">
                        <h4 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          <c.Icon className="size-4 text-primary" aria-hidden="true" />
                          {t(c.title)}
                        </h4>
                        <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(c.desc)}</p>
                      </div>
                    ))}
                  </div>
                  <Requirements
                    items={['Application Form', 'Previous Tax Declaration', 'Title/Deed of Sale', 'Valid ID']}
                  />
                </ServiceCardBody>
              </div>

              {/* Transfer of Ownership */}
              <div id="transfer" className="scroll-mt-24">
                <SectionHead
                  Icon={ArrowLeftRight}
                  title="assessor-transfer-of-ownership"
                  desc="assessor-processing-of-property-ownership-transfers-in-tax"
                />
                <ServiceCardBody>
                  <InfoBoxRow
                    boxes={stdInfo(
                      'assessor-35-days',
                      'After complete docs',
                      { lit: '₱200-1,000' },
                      'Plus transfer tax',
                      'assessor-new-owner',
                      'Or authorized rep',
                      'No appointment needed'
                    )}
                  />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t('assessor-transfer-of-property-ownership')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('assessor-when-property-changes-ownership-through-sale')}
                  </p>
                  <ProcessSteps
                    steps={[
                      { n: 1, title: 'assessor-secure-tax-clearance', desc: 'assessor-obtain-tax-clearance-from-treasurers-office' },
                      { n: 2, title: 'assessor-pay-transfer-tax', desc: 'assessor-pay-the-required-transfer-tax-at-the-treasurers' },
                      { n: 3, title: 'assessor-submit-documents', desc: 'assessor-file-application-with-complete-documents-at-the' },
                      { n: 4, title: 'assessor-claim-new-tax-declaration', desc: 'assessor-new-tax-declaration-under-the-new-owners-name' },
                    ]}
                  />
                  <Requirements
                    items={[
                      'Deed of Sale/Donation',
                      'Transfer Certificate of Title',
                      'Tax Clearance',
                      'Transfer Tax Receipt',
                      'CAR/eCAR from BIR',
                      'Valid IDs (Buyer/Seller)',
                    ]}
                  />
                </ServiceCardBody>
              </div>

              {/* Certifications */}
              <div id="certification" className="scroll-mt-24">
                <SectionHead
                  Icon={Award}
                  title="assessor-certifications"
                  desc="assessor-various-certifications-related-to-real-property"
                />
                <ServiceCardBody>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { title: 'assessor-certified-true-copy-of-tax-declaration', desc: 'assessor-official-copy-of-tax-declaration-for-legal-and', fee: '₱100', time: 'Same day' },
                      { title: 'assessor-certificate-of-no-property', desc: 'assessor-certification-that-a-person-has-no-declared', fee: '₱100', time: 'Same day' },
                      { title: 'assessor-certificate-of-property-holdings', desc: 'assessor-list-of-all-properties-declared-under-a-persons', fee: '₱150', time: '1-2 days' },
                      { title: 'assessor-certificate-of-land-area', desc: 'assessor-certification-of-the-total-land-area-based-on-tax', fee: '₱100', time: 'Same day' },
                    ].map((c) => (
                      <div
                        key={c.title}
                        className="rounded-lg border border-border border-l-4 border-l-primary bg-muted/40 p-4"
                      >
                        <h4 className="mb-2 text-sm font-semibold text-foreground">{t(c.title)}</h4>
                        <p className="mb-3 text-[0.8125rem] text-muted-foreground">{t(c.desc)}</p>
                        <div className="text-xs text-muted-foreground">
                          <span className="block">
                            <strong className="text-foreground">{t('assessor-fee')}:</strong> {c.fee}
                          </span>
                          <span className="block">
                            <strong className="text-foreground">{t('assessor-time')}:</strong> {c.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ServiceCardBody>
              </div>

              {/* Annotation */}
              <div id="annotation" className="scroll-mt-24">
                <SectionHead
                  Icon={SquarePen}
                  title="assessor-annotation-services"
                  desc="assessor-recording-of-encumbrances-and-other-notations-on"
                />
                <ServiceCardBody>
                  <InfoBoxRow
                    boxes={stdInfo(
                      'assessor-13-days',
                      'Standard processing',
                      { lit: '₱100-300' },
                      'Per annotation',
                      'assessor-ownercreditor',
                      'Interested party',
                      'No appointment needed'
                    )}
                  />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t('assessor-types-of-annotations')}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t('assessor-annotations-are-official-notations-recorded-on')}
                  </p>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {[
                      { Icon: Landmark, label: 'assessor-mortgage-annotation' },
                      { Icon: CircleX, label: 'assessor-cancellation-of-mortgage' },
                      { Icon: AlertTriangle, label: 'assessor-adverse-claim' },
                      { Icon: ShieldAlert, label: 'assessor-lis-pendens' },
                    ].map((a) => (
                      <div
                        key={a.label}
                        className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/40 p-3"
                      >
                        <a.Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                        <span className="text-sm text-foreground">{t(a.label)}</span>
                      </div>
                    ))}
                  </div>
                  <Requirements
                    items={['Request Letter', 'Supporting Documents', 'Tax Declaration Copy', 'Valid ID']}
                  />
                </ServiceCardBody>
              </div>

              {/* Reclassification */}
              <div id="reclassification" className="scroll-mt-24">
                <SectionHead
                  Icon={Layers}
                  title="assessor-land-reclassification"
                  desc="assessor-change-of-land-classification-for-assessment"
                />
                <ServiceCardBody>
                  <InfoBoxRow
                    boxes={stdInfo(
                      'assessor-515-days',
                      'Requires inspection',
                      'assessor-varies',
                      'Based on area',
                      'assessor-property-owner',
                      'With valid reason',
                      'Inspection scheduled'
                    )}
                  />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {t('assessor-land-classification-categories')}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {t('assessor-land-reclassification-changes-the-category-of')}
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {[
                      { Icon: TreePine, label: 'assessor-agricultural' },
                      { Icon: Home, label: 'assessor-residential' },
                      { Icon: Store, label: 'assessor-commercial' },
                      { Icon: Settings, label: 'assessor-industrial' },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className="rounded-lg border border-border bg-muted/40 p-3 text-center"
                      >
                        <c.Icon className="mx-auto mb-1 size-6 text-primary" aria-hidden="true" />
                        <span className="text-[0.8125rem] font-medium text-foreground">
                          {t(c.label)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Requirements
                    items={[
                      'Application Letter',
                      'Tax Declaration',
                      'Title/Proof of Ownership',
                      'Zoning Clearance',
                      'Barangay Certification',
                      'Valid ID',
                    ]}
                  />
                </ServiceCardBody>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
                  <Building2 className="size-4 text-primary" aria-hidden="true" />
                  {t('assessor-municipal-assessors-office')}
                </h3>
                <ul className="m-0 list-none space-y-3 p-0 text-sm">
                  <li className="flex gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('assessor-location')}</strong>
                      <span className="text-muted-foreground">
                        {t('assessor-municipal-hall-ground-floor-mati-nueva-vizcaya')}
                      </span>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('assessor-phone')}</strong>
                      <a href="tel:0873265017" className="text-primary hover:underline">
                        (087) 326-5017
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('assessor-email')}</strong>
                      <a href="mailto:assessor@mati.gov.ph" className="text-primary hover:underline">
                        {t('assessor-assessormatigovph')}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('assessor-office-hours')}</strong>
                      <span className="text-muted-foreground">Monday - Friday, 8:00 AM - 5:00 PM</span>
                    </span>
                  </li>
                </ul>

                <div className="mt-5 border-t border-border pt-4">
                  <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Link2 className="size-4 text-primary" aria-hidden="true" />
                    {t('assessor-related-services')}
                  </h4>
                  <ul className="m-0 list-none space-y-1.5 p-0 text-sm">
                    <li>
                      <AppLink to="/services/tax-payments" className="text-primary hover:underline">
                        {t('assessor-real-property-tax-payment')}
                      </AppLink>
                    </li>
                    <li>
                      <AppLink to="/government" className="text-primary hover:underline">
                        {t('assessor-treasurers-office')}
                      </AppLink>
                    </li>
                    <li>
                      <AppLink to="/services/business" className="text-primary hover:underline">
                        {t('assessor-business-permits')}
                      </AppLink>
                    </li>
                  </ul>
                </div>

                <div className="mt-5 border-t border-border pt-4">
                  <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Info className="size-4 text-primary" aria-hidden="true" />
                    {t('assessor-important-notes')}
                  </h4>
                  <ul className="m-0 list-disc space-y-1.5 pl-4 text-[0.8125rem] text-muted-foreground">
                    <li>{t('assessor-bring-original-documents')}</li>
                    <li>{t('assessor-pay-real-property-tax-annually')}</li>
                    <li>{t('assessor-update-records-when-property-changes')}</li>
                    <li>{t('assessor-representatives-need-authorization')}</li>
                  </ul>
                </div>

                <AppLink
                  to="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-dark"
                >
                  <MessageSquare className="size-4" aria-hidden="true" /> Contact Us
                </AppLink>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
