import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Users,
  Building2,
  MapPin,
  Clock,
  FileText,
  LayoutGrid,
  FileUser,
  Award,
  CalendarCheck,
  ShieldCheck,
  CalendarMinus,
  CircleCheck,
  Info,
  Banknote,
  Phone,
  Download,
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

type TabId = 'service-record' | 'employment-cert' | 'leave-credits' | 'no-pending' | 'leave-application';

export default function HumanResourceManagement() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<TabId>('service-record');

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

  const InfoTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
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
    <div className={`rounded-lg border border-border bg-card p-3.5${className ? ` ${className}` : ''}`}>
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

  const ProcessingInfo = ({ time, fee }: { time: string; fee: string }) => (
    <div className="mt-3.5 rounded-lg border border-border bg-card p-3.5">
      <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <Info className="size-4 text-primary" aria-hidden="true" />
        {t('hrm-processing-information')}
      </h4>
      <ul className="m-0 list-none p-0">
        <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
          <Clock className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
          <span>{t(time)}</span>
        </li>
        <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
          <Banknote className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
          <span>{t(fee)}</span>
        </li>
      </ul>
    </div>
  );

  const ContentHeader = ({ Icon, title, desc }: { Icon: LucideIcon; title: string; desc: string }) => (
    <div className="mb-5">
      <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {t(title)}
      </h2>
      <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(desc)}</p>
    </div>
  );

  const processHeaders = [t('hrm-step'), t('hrm-activity'), t('hrm-duration'), t('hrm-personnel')];

  const tabs: { id: TabId; label: ReactNode }[] = [
    { id: 'service-record', label: t('hrm-service-record') },
    { id: 'employment-cert', label: 'Employment Certificate' },
    { id: 'leave-credits', label: t('hrm-leave-credits') },
    { id: 'no-pending', label: t('hrm-no-pending-case') },
    { id: 'leave-application', label: t('hrm-leave-application') },
  ];

  return (
    <>
      <Seo
        title={t('hrm-human-resource-management-section')}
        description="Human Resource Management Section - Service records, employment certifications, leave management for LGU Mati employees."
        canonicalPath="/service-details/human-resource-management"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('hrm-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('hrm-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/certificates" className="hover:text-primary">
            {t('hrm-certificates')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">Human Resource Management</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Users className="size-4" aria-hidden="true" />
            {t('hrm-mayors-office')}
          </>
        }
        title={t('hrm-human-resource-management-section')}
        description={t('hrm-service-records-employment-certifications-and')}
      />

      {/* Quick stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Building2 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('hrm-office')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('hrm-mayors-office-hrms')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('hrm-location')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('hrm-municipal-hall')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('hrm-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">{t('hrm-8am-5pm')}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <FileText className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('hrm-services')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('hrm-5-hr-services')}
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
              {t('hrm-hr-management-services')}
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('hrm-select-a-service-to-view-the-detailed-process-and')}
            </p>
          </div>

          <div
            className="mb-5 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label={t('hrm-hr-management-services')}
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
                    : 'border-border bg-card text-foreground hover:border-primary'
                }`}
              >
                {tb.label}
              </button>
            ))}
          </div>

          {/* Service Record */}
          {tab === 'service-record' && (
            <div>
              <ContentHeader
                Icon={FileUser}
                title="hrm-issuance-of-service-record"
                desc="hrm-official-record-of-employment-history-for-lgu"
              />
              <ReqBox
                Icon={FileText}
                title="hrm-requirements"
                className="mb-3.5"
                items={[
                  'hrm-duly-accomplished-request-form',
                  'hrm-valid-governmentissued-id',
                  'hrm-authorization-letter-if-representative',
                ]}
              />
              <ProcessTable
                headers={processHeaders}
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('hrm-submit-request-form-with-requirements'),
                    <TimeTag>{t('hrm-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('hrm-verification-and-preparation-of-service-record'),
                    <TimeTag>{t('hrm-1530-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('hrm-review-and-signing-by-hrmo-head'),
                    <TimeTag>{t('hrm-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('hrm-release-of-service-record'),
                    <TimeTag>2 minutes</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                ]}
              />
              <ProcessingInfo
                time="hrm-total-processing-time-2742-minutes"
                fee="hrm-fee-free-for-current-employees"
              />
            </div>
          )}

          {/* Employment Certificate */}
          {tab === 'employment-cert' && (
            <div>
              <ContentHeader
                Icon={Award}
                title="hrm-issuance-of-certificate-of-employment"
                desc="hrm-official-certification-of-current-or-previous"
              />
              <ReqBox
                Icon={FileText}
                title="hrm-requirements"
                className="mb-3.5"
                items={[
                  'hrm-request-letter-stating-purpose',
                  'hrm-valid-governmentissued-id',
                  'hrm-employee-id-for-current-employees',
                ]}
              />
              <ProcessTable
                headers={processHeaders}
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('hrm-submit-request-letter-and-requirements'),
                    <TimeTag>{t('hrm-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('hrm-verification-of-employment-records'),
                    <TimeTag>{t('hrm-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('hrm-preparation-and-signing-of-certificate'),
                    <TimeTag>{t('hrm-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('hrm-release-of-certificate-of-employment'),
                    <TimeTag>{t('hrm-2-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                ]}
              />
              <ProcessingInfo time="hrm-total-processing-time-27-minutes" fee="hrm-fee-free" />
            </div>
          )}

          {/* Leave Credits */}
          {tab === 'leave-credits' && (
            <div>
              <ContentHeader
                Icon={CalendarCheck}
                title="hrm-issuance-of-certificate-of-leave-credits"
                desc="hrm-official-statement-of-accumulated-leave-credits"
              />
              <ReqBox
                Icon={FileText}
                title="hrm-requirements"
                className="mb-3.5"
                items={['hrm-request-formletter', 'hrm-employee-id']}
              />
              <ProcessTable
                headers={processHeaders}
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('hrm-submit-request-for-leave-credits-certificate'),
                    <TimeTag>{t('hrm-3-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('hrm-computation-and-verification-of-leave-balances'),
                    <TimeTag>{t('hrm-15-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('hrm-preparation-and-signing-of-certificate'),
                    <TimeTag>{t('hrm-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('hrm-release-of-certificate'),
                    <TimeTag>{t('hrm-2-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                ]}
              />
              <ProcessingInfo time="hrm-total-processing-time-25-minutes" fee="hrm-fee-free" />
            </div>
          )}

          {/* No Pending Case */}
          {tab === 'no-pending' && (
            <div>
              <ContentHeader
                Icon={ShieldCheck}
                title="hrm-certificate-of-no-pending-administrative-case"
                desc="hrm-certification-that-employee-has-no-pending"
              />
              <ReqBox
                Icon={FileText}
                title="hrm-requirements"
                className="mb-3.5"
                items={[
                  'hrm-request-letter-stating-purpose',
                  'hrm-valid-governmentissued-id',
                  'hrm-employee-id',
                ]}
              />
              <ProcessTable
                headers={processHeaders}
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('hrm-submit-request-letter-and-requirements'),
                    <TimeTag>{t('hrm-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('hrm-verification-of-administrative-case-records'),
                    <TimeTag>{t('hrm-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('hrm-preparation-and-signing-of-certificate'),
                    <TimeTag>{t('hrm-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('hrm-release-of-certificate'),
                    <TimeTag>{t('hrm-2-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                ]}
              />
              <ProcessingInfo time="hrm-total-processing-time-27-minutes" fee="hrm-fee-free" />
            </div>
          )}

          {/* Leave Application */}
          {tab === 'leave-application' && (
            <div>
              <ContentHeader
                Icon={CalendarMinus}
                title="hrm-application-for-leave"
                desc="hrm-processing-of-vacation-leave-sick-leave-and-other"
              />
              <ReqBox
                Icon={FileText}
                title="hrm-requirements"
                className="mb-3.5"
                items={[
                  'hrm-duly-accomplished-cs-form-no-6-application-for',
                  'hrm-medical-certificate-for-sick-leave-exceeding-5',
                  'hrm-supporting-documents-as-applicable',
                ]}
              />
              <ProcessTable
                headers={processHeaders}
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('hrm-submit-accomplished-leave-application-form'),
                    <TimeTag>{t('hrm-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('hrm-verification-of-leave-credits-and-computation'),
                    <TimeTag>{t('hrm-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('hrm-recommendation-by-department-head'),
                    <TimeTag>1 day</TimeTag>,
                    <PersonnelTag>{t('hrm-department-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('hrm-approval-by-municipal-mayor'),
                    <TimeTag>{t('hrm-12-days')}</TimeTag>,
                    <PersonnelTag>{t('hrm-municipal-mayor')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={5} />,
                    t('hrm-recording-and-release-of-approved-leave'),
                    <TimeTag>{t('hrm-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('hrm-hrmo-staff')}</PersonnelTag>,
                  ],
                ]}
              />
              <InfoTable
                headers={[t('hrm-leave-type'), t('hrm-description')]}
                rows={[
                  [t('hrm-vacation-leave'), t('hrm-for-personal-matters-rest-and-recreation')],
                  [t('hrm-sick-leave'), t('hrm-for-illness-or-medical-reasons')],
                  [t('hrm-maternity-leave'), t('hrm-105-days-for-female-employees')],
                  [t('hrm-paternity-leave'), t('hrm-7-days-for-male-employees')],
                  [t('hrm-special-leave'), t('hrm-for-special-circumstances-as-provided-by-law')],
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
            {t('hrm-office-personnel')}
          </SectionTitle>
          <SectionSubtitle>{t('hrm-key-personnel-handling-human-resource-management')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">{t('hrm-hrmo-head')}</h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">{t('hrm-section-chief')}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">{t('hrm-hr-officer')}</h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('hrm-records-certifications')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('hrm-administrative-staff')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('hrm-leave-processing')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact info */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3.5">
              <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('hrm-office-information')}
              </h4>
              <ul className="m-0 list-none p-0">
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <MapPin className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('hrm-human-resource-management-section-mayors-office')}</span>
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
            <div className="rounded-lg border border-border bg-card p-3.5">
              <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Info className="size-4 text-primary" aria-hidden="true" />
                {t('hrm-important-notes')}
              </h4>
              <ul className="m-0 list-none p-0">
                {[
                  'hrm-services-are-free-for-current-lgu-employees',
                  'hrm-bring-valid-id-for-all-transactions',
                  'hrm-leave-applications-should-be-filed-in-advance',
                  'hrm-representatives-must-have-authorization-letter',
                ].map((k) => (
                  <li key={k} className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                    <CircleCheck className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Downloadable Resources */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Download className="size-5 text-primary" aria-hidden="true" />
            {t('hrm-downloadable-resources')}
          </SectionTitle>
          <SectionSubtitle>{t('hrm-forms-and-documents-for-hr-services')}</SectionSubtitle>
          <div className="rounded-lg border border-border bg-card p-3.5">
            <ul className="m-0 list-none p-0">
              <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                <FileText className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href="https://mati.gov.ph/wp-content/uploads/2021/10/PDS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('hrm-cs-form-no-212-revised-personal-data-sheet-2017')}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
