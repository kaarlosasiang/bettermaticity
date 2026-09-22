import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Store,
  Building2,
  MapPin,
  Clock,
  CalendarCheck,
  LayoutGrid,
  PlusCircle,
  FileText,
  CircleCheck,
  History,
  Info,
  RefreshCw,
  BadgeCheck,
  Briefcase,
  File,
  ClipboardList,
  Truck,
  Music,
  CircleX,
  Users,
  Phone,
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

type TabId = 'new' | 'renewal' | 'clearance' | 'other';

export default function BusinessPermitsLicensing() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<TabId>('new');

  const StepBadge = ({ n }: { n: number }) => (
    <span className="inline-flex size-5 items-center justify-center rounded bg-primary text-[0.625rem] font-bold text-primary-foreground">
      {n}
    </span>
  );
  const TimeTag = ({ children }: { children: ReactNode }) => (
    <span className="text-[0.6875rem] text-muted-foreground">{children}</span>
  );
  const PersonnelTag = ({ children }: { children: ReactNode }) => (
    <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[0.625rem] font-medium text-primary">
      {children}
    </span>
  );
  const FeeTag = ({ children }: { children: ReactNode }) => (
    <span className="text-[0.6875rem] font-semibold text-brand-success">{children}</span>
  );

  const ProcessTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
    <div className="my-3.5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2.5 text-[0.6875rem] font-semibold tracking-wide uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-border align-top">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2.5 text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const FeeTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
    <div className="mt-3.5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-muted text-foreground">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-[0.6875rem] font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-border">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ReqBox = ({
    Icon,
    title,
    items,
    className,
  }: {
    Icon: LucideIcon;
    title: string;
    items: string[];
    className?: string;
  }) => (
    <div
      className={`rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5${className ? ` ${className}` : ''}`}
    >
      <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {t(title)}
      </h4>
      <ul className="m-0 list-none p-0">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-1.5 py-1 text-xs text-foreground">
            <CircleCheck className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
            <span>{t(it)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const ContentHeader = ({
    Icon,
    title,
    desc,
  }: {
    Icon: LucideIcon;
    title: string;
    desc: string;
  }) => (
    <div className="mb-5">
      <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {t(title)}
      </h2>
      <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(desc)}</p>
    </div>
  );

  const tabs: { id: TabId; label: string }[] = [
    { id: 'new', label: 'bpl-new-business-permit' },
    { id: 'renewal', label: 'bpl-permit-renewal' },
    { id: 'clearance', label: 'bpl-mayors-clearance' },
    { id: 'other', label: 'bpl-other-permits' },
  ];

  return (
    <>
      <Seo
        title={t('bpl-business-permits-licensing-section')}
        description="Business Permits and Licensing Section - New business permit, renewal, Mayor's clearance, and other business permits in Mati, Davao Oriental."
        canonicalPath="/service-details/business-permits-licensing"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('bpl-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('bpl-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/business" className="hover:text-primary">
            {t('bpl-business')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">Business Permits &amp; Licensing</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Store className="size-4" aria-hidden="true" />
            {t('bpl-business')}
          </>
        }
        title={t('bpl-business-permits-licensing-section')}
        description={t('bpl-new-business-permits-renewals-mayors-clearance')}
      />

      {/* Quick stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <Building2 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('bpl-office')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('bpl-mayors-office-bpls')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('bpl-location')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('bpl-municipal-hall')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('bpl-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('bpl-8am-5pm')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <CalendarCheck className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('bpl-renewal')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('bpl-jan-1-jan-20')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Service tabs */}
      <Section compact altBg>
        <Container>
          <div className="mb-5 text-center">
            <h2 className="mb-1 flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
              <LayoutGrid className="size-4 text-primary" aria-hidden="true" />
              {t('bpl-business-permit-services')}
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('bpl-select-a-service-to-view-the-detailed-process-and')}
            </p>
          </div>

          <div
            className="mb-5 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label={t('bpl-business-permit-services')}
          >
            {tabs.map((tb) => (
              <button
                key={tb.id}
                type="button"
                role="tab"
                aria-selected={tab === tb.id}
                onClick={() => setTab(tb.id)}
                className={`rounded-md border px-4 py-2 text-xs font-semibold transition ${
                  tab === tb.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]'
                }`}
              >
                {t(tb.label)}
              </button>
            ))}
          </div>

          {/* New Business Permit */}
          {tab === 'new' && (
            <div>
              <ContentHeader
                Icon={PlusCircle}
                title="bpl-issuance-of-new-business-permit"
                desc="bpl-application-for-new-business-permit-for"
              />
              <ReqBox
                Icon={FileText}
                title="bpl-requirements-for-new-business"
                className="mb-3.5"
                items={[
                  'bpl-duly-accomplished-application-form',
                  'bpl-dti-certificate-of-business-name-registration-for',
                  'bpl-sec-registration-for-corporationpartnership',
                  'bpl-cda-registration-for-cooperatives',
                  'bpl-barangay-business-clearance',
                  'bpl-zoning-clearance-from-mpdo',
                  'bpl-sanitary-permit-from-mho',
                  'bpl-fire-safety-inspection-certificate-from-bfp',
                  'bpl-locational-clearance-if-applicable',
                  'bpl-contract-of-lease-land-title-proof-of-business',
                  'bpl-community-tax-certificate-cedula',
                  'bpl-valid-id-of-ownerauthorized-representative',
                ]}
              />
              <ProcessTable
                headers={[
                  t('bpl-step'),
                  t('bpl-activity'),
                  t('bpl-documents'),
                  t('bpl-duration'),
                  t('bpl-personnel'),
                ]}
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('bpl-submit-application-form-and-complete-requirements'),
                    t('bpl-application-form-all-requirements'),
                    <TimeTag>{t('bpl-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('bpl-verification-and-assessment-of-documents'),
                    '—',
                    <TimeTag>{t('bpl-1530-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('bpl-computation-of-fees-and-taxes'),
                    t('bpl-assessment-sheet'),
                    <TimeTag>{t('bpl-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('bpl-payment-of-fees-at-treasurers-office'),
                    t('bpl-order-of-payment'),
                    <TimeTag>{t('bpl-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-treasurers-office')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={5} />,
                    t('bpl-issuance-of-business-permit'),
                    t('bpl-official-receipt'),
                    <TimeTag>{t('bpl-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                ]}
              />
              <div className="mt-3.5 rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
                <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                  <History className="size-4 text-primary" aria-hidden="true" />
                  {t('bpl-processing-information')}
                </h4>
                <ul className="m-0 list-none p-0">
                  <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                    <CircleCheck
                      className="mt-0.5 size-3 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{t('bpl-total-processing-time-55-minutes-to-1-hour-if')}</span>
                  </li>
                  <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                    <Info className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                    <span>{t('bpl-fees-vary-based-on-business-type-capitalization')}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Permit Renewal */}
          {tab === 'renewal' && (
            <div>
              <ContentHeader
                Icon={RefreshCw}
                title="bpl-renewal-of-business-permit"
                desc="bpl-annual-renewal-of-existing-business-permit"
              />
              <ReqBox
                Icon={FileText}
                title="bpl-requirements-for-renewal"
                className="mb-3.5"
                items={[
                  'bpl-previous-years-business-permit',
                  'bpl-barangay-business-clearance-current-year',
                  'bpl-sanitary-permit-from-mho-current-year',
                  'bpl-fire-safety-inspection-certificate-from-bfp',
                  'bpl-community-tax-certificate-cedula',
                  'bpl-sworn-statement-of-gross-salesreceipts',
                  'bpl-financial-statements-for-corporations',
                ]}
              />
              <ProcessTable
                headers={[
                  t('bpl-step'),
                  t('bpl-activity'),
                  t('bpl-documents'),
                  t('bpl-duration'),
                  t('bpl-personnel'),
                ]}
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('bpl-submit-renewal-application-and-requirements'),
                    t('bpl-previous-permit-clearances'),
                    <TimeTag>{t('bpl-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('bpl-verification-and-assessment'),
                    t('bpl-gross-sales-declaration'),
                    <TimeTag>{t('bpl-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('bpl-payment-of-fees-at-treasurers-office'),
                    t('bpl-order-of-payment'),
                    <TimeTag>{t('bpl-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-treasurers-office')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('bpl-issuance-of-renewed-business-permit'),
                    t('bpl-official-receipt'),
                    <TimeTag>{t('bpl-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                ]}
              />
              <FeeTable
                headers={[t('bpl-renewal-period'), t('bpl-surcharge')]}
                rows={[
                  [t('bpl-january-120'), <FeeTag>{t('bpl-no-surcharge')}</FeeTag>],
                  [
                    t('bpl-january-21-onwards'),
                    <span className="text-[#dc3545]">{t('bpl-25-surcharge-2-interestmonth')}</span>,
                  ],
                ]}
              />
            </div>
          )}

          {/* Mayor's Clearance */}
          {tab === 'clearance' && (
            <div>
              <ContentHeader
                Icon={BadgeCheck}
                title="bpl-issuance-of-mayors-clearancepermit"
                desc="bpl-mayors-clearance-for-various-purposes-including"
              />
              <div className="mb-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <ReqBox
                  Icon={Briefcase}
                  title="bpl-for-employment"
                  items={[
                    'bpl-barangay-clearance',
                    'bpl-police-clearance',
                    'bpl-nbi-clearance',
                    'bpl-community-tax-certificate-cedula',
                    'bpl-2x2-id-photo',
                    'bpl-valid-id',
                  ]}
                />
                <ReqBox
                  Icon={File}
                  title="bpl-for-other-purposes"
                  items={[
                    'bpl-barangay-clearance',
                    'bpl-community-tax-certificate-cedula',
                    'bpl-valid-id',
                    'bpl-supporting-documents-as-applicable',
                  ]}
                />
              </div>
              <ProcessTable
                headers={[t('bpl-step'), t('bpl-activity'), t('bpl-duration'), t('bpl-personnel')]}
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('bpl-submit-requirements-and-fill-out-application-form'),
                    <TimeTag>{t('bpl-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('bpl-verification-of-documents'),
                    <TimeTag>{t('bpl-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('bpl-payment-of-fee-at-treasurers-office'),
                    <TimeTag>{t('bpl-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-treasurers-office')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('bpl-issuance-of-mayors-clearance'),
                    <TimeTag>{t('bpl-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('bpl-bpls-staff')}</PersonnelTag>,
                  ],
                ]}
              />
              <FeeTable
                headers={[t('bpl-type-of-clearance'), t('bpl-fee')]}
                rows={[
                  [t('bpl-mayors-clearance-employment'), <FeeTag>₱50.00</FeeTag>],
                  [t('bpl-mayors-clearance-other-purposes'), <FeeTag>₱30.00</FeeTag>],
                ]}
              />
            </div>
          )}

          {/* Other Permits */}
          {tab === 'other' && (
            <div>
              <ContentHeader
                Icon={ClipboardList}
                title="bpl-other-permits-and-clearances"
                desc="bpl-additional-permits-and-clearances-issued-by-the"
              />
              <div className="mb-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <ReqBox
                  Icon={Truck}
                  title="bpl-delivery-permit"
                  items={[
                    'bpl-request-letter',
                    'bpl-business-permit-of-supplier',
                    'bpl-vehicle-registration-orcr',
                    'bpl-drivers-license',
                  ]}
                />
                <ReqBox
                  Icon={Music}
                  title="bpl-special-permit-events"
                  items={[
                    'bpl-request-letter-stating-purpose',
                    'bpl-barangay-clearance',
                    'bpl-valid-id-of-applicant',
                    'bpl-list-of-activitiesprogram',
                  ]}
                />
                <ReqBox
                  Icon={CircleX}
                  title="bpl-closure-of-business"
                  items={[
                    'bpl-affidavit-of-closure',
                    'bpl-original-business-permit',
                    'bpl-tax-clearance-from-treasurer',
                    'bpl-bir-certificate-of-closure',
                  ]}
                />
                <ReqBox
                  Icon={MapPin}
                  title="bpl-transfer-of-business-location"
                  items={[
                    'bpl-letter-of-intent',
                    'bpl-current-business-permit',
                    'bpl-new-barangay-clearance',
                    'bpl-new-zoning-clearance',
                  ]}
                />
              </div>
              <FeeTable
                headers={[t('bpl-permit-type'), t('bpl-fee'), t('bpl-processing-time')]}
                rows={[
                  [t('bpl-delivery-permit'), <FeeTag>₱100.00</FeeTag>, t('bpl-same-day')],
                  [
                    t('bpl-special-permit-events'),
                    <FeeTag>₱200.00 - ₱500.00</FeeTag>,
                    t('bpl-13-days'),
                  ],
                  [
                    t('bpl-business-closure-certificate'),
                    <FeeTag>₱100.00</FeeTag>,
                    t('bpl-same-day'),
                  ],
                  [t('bpl-transfer-of-location'), <FeeTag>₱200.00</FeeTag>, t('bpl-12-days')],
                ]}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* Office personnel */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Users className="size-5 text-primary" aria-hidden="true" />
            {t('bpl-office-personnel')}
          </SectionTitle>
          <SectionSubtitle>{t('bpl-key-personnel-handling-business-permits-and')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">{t('bpl-bpls-head')}</h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">{t('bpl-section-chief')}</p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('bpl-licensing-officer')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('bpl-permit-processing')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('bpl-administrative-staff')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('bpl-records-assessment')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact info */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
              <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('bpl-office-information')}
              </h4>
              <ul className="m-0 list-none p-0">
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <MapPin className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('bpl-business-permits-licensing-section-municipal-hall')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <Clock className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span>Monday - Friday: 8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <Phone className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span>(087) 326-5001</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
              <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Info className="size-4 text-primary" aria-hidden="true" />
                {t('bpl-important-notes')}
              </h4>
              <ul className="m-0 list-none p-0">
                {[
                  'bpl-business-permit-renewal-deadline-january-20',
                  'bpl-late-renewal-incurs-25-surcharge-2-monthly',
                  'bpl-all-clearances-must-be-current-year',
                  'bpl-bring-original-documents-for-verification',
                ].map((k) => (
                  <li key={k} className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                    <CircleCheck
                      className="mt-0.5 size-3 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
