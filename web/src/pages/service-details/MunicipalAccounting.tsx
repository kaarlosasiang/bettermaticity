import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Calculator,
  Building2,
  MapPin,
  Clock,
  CalendarCheck,
  LayoutGrid,
  FileCheck,
  FileSpreadsheet,
  Users,
  CreditCard,
  NotebookText,
  History,
  CircleCheck,
  Info,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

export default function MunicipalAccounting() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('preaudit');

  const TimeBadge = ({ children }: { children: ReactNode }) => (
    <span className="text-[0.6875rem] text-muted-foreground">{children}</span>
  );
  const StepNum = ({ n }: { n: number }) => (
    <span className="inline-flex size-5 items-center justify-center rounded bg-primary text-[0.625rem] font-bold text-primary-foreground">
      {n}
    </span>
  );
  const Person = ({ name, role }: { name: string; role: string }) => (
    <span>
      <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[0.625rem] font-medium text-primary">
        {t(name)}
      </span>
      <br />
      <span className="text-[0.625rem] text-muted-foreground">{t(role)}</span>
    </span>
  );

  const DataTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
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
                <td key={ci} className="px-3 py-2.5 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const SectionCard = ({
    Icon,
    title,
    desc,
    children,
  }: {
    Icon: LucideIcon;
    title: string;
    desc: string;
    children: ReactNode;
  }) => (
    <div>
      <div className="mb-5">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
          <Icon className="size-4 text-primary" aria-hidden="true" />
          {t(title)}
        </h2>
        <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(desc)}</p>
      </div>
      {children}
    </div>
  );

  const TotalTimeBox = ({ line1, note }: { line1: string; note: string }) => (
    <div className="mt-3.5 rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
      <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <History className="size-4 text-primary" aria-hidden="true" />
        {t('acct-total-processing-time')}
      </h3>
      <ul className="m-0 list-none p-0">
        <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
          <CircleCheck className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
          <span>{t(line1)}</span>
        </li>
        <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
          <span>{t(note)}</span>
        </li>
      </ul>
    </div>
  );

  const tabs: { id: string; label: ReactNode }[] = [
    { id: 'preaudit', label: t('acct-preaudit-disbursements') },
    { id: 'reports', label: 'Monthly Reports' },
    { id: 'payroll', label: t('acct-payroll-preparation') },
    { id: 'checks', label: t('acct-check-issuance') },
    { id: 'jev', label: t('acct-jev-financial-statements') },
  ];

  return (
    <>
      <Seo
        title={t('acct-municipal-accounting-office')}
        description="City Accounting Office - Pre-audit of disbursements, payroll preparation, check issuance, and financial reporting in Mati, Davao Oriental."
        canonicalPath="/service-details/municipal-accounting"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('acct-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('acct-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/tax-payments" className="hover:text-primary">
            {t('acct-tax-payments')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">City Accounting Office</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Calculator className="size-3.5" aria-hidden="true" />
            {t('acct-accounting')}
          </>
        }
        title={t('acct-municipal-accounting-office')}
        description={t('acct-preaudit-of-disbursements-payroll-preparation')}
      />

      {/* Quick stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <Building2 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('acct-office')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('acct-mun-accounting')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('acct-location')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('acct-municipal-hall')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('acct-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('acct-8am-5pm')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <CalendarCheck className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('acct-days')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">Monday - Friday</p>
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
              {t('acct-accounting-office-services')}
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('acct-select-a-service-to-view-the-detailed-process')}
            </p>
          </div>

          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md border px-4 py-2 text-xs font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* A. Pre-Audit of Disbursement Vouchers */}
          {activeTab === 'preaudit' && (
            <SectionCard
              Icon={FileCheck}
              title="acct-preaudit-of-disbursement-vouchers"
              desc="acct-the-municipal-accounting-office-preaudits"
            >
              <DataTable
                headers={[
                  t('acct-step'),
                  t('acct-activity'),
                  t('acct-documents-required'),
                  t('acct-duration'),
                  t('acct-personnel'),
                ]}
                rows={[
                  [
                    <StepNum n={1} />,
                    t('acct-receive-and-log-disbursement-voucher'),
                    <ul className="m-0 list-disc pl-3 text-[0.6875rem]">
                      <li>{t('acct-disbursement-voucher-with-complete-supporting')}</li>
                      <li>{t('acct-obligation-request-obr')}</li>
                      <li>{t('acct-purchase-requestorder')}</li>
                    </ul>,
                    <TimeBadge>{t('acct-5-minutes')}</TimeBadge>,
                    <Person name="acct-rosalinda-m-fernandez" role="acct-administrative-aide-vi" />,
                  ],
                  [
                    <StepNum n={2} />,
                    t('acct-review-and-verify-completeness-of-supporting'),
                    t('acct-all-supporting-documents-per-coa-requirements'),
                    <TimeBadge>{t('acct-1530-minutes')}</TimeBadge>,
                    <Person name="acct-jocelyn-l-gatan" role="acct-administrative-officer-v" />,
                  ],
                  [
                    <StepNum n={3} />,
                    t('acct-compute-taxes-and-other-deductions'),
                    t('acct-tax-computation-worksheet'),
                    <TimeBadge>{t('acct-10-minutes')}</TimeBadge>,
                    <Person name="acct-mary-jane-c-salvador" role="acct-accountant-iii" />,
                  ],
                  [
                    <StepNum n={4} />,
                    t('acct-certify-box-a-of-disbursement-voucher'),
                    t('acct-preaudited-dv'),
                    <TimeBadge>{t('acct-5-minutes')}</TimeBadge>,
                    <Person name="acct-evangeline-b-ramos" role="acct-municipal-accountant" />,
                  ],
                  [
                    <StepNum n={5} />,
                    t('acct-forward-to-municipal-mayor-for-approval'),
                    t('acct-certified-dv'),
                    <TimeBadge>{t('acct-3-minutes')}</TimeBadge>,
                    <Person name="acct-rosalinda-m-fernandez" role="acct-administrative-aide-vi" />,
                  ],
                ]}
              />
              <TotalTimeBox
                line1="acct-approximately-3853-minutes-for-complete-processing"
                note="acct-processing-time-may-vary-depending-on-document"
              />
            </SectionCard>
          )}

          {/* B. Monthly Reports */}
          {activeTab === 'reports' && (
            <SectionCard
              Icon={FileSpreadsheet}
              title="acct-preparation-of-monthly-reports"
              desc="acct-preparation-and-submission-of-monthly-financial"
            >
              <DataTable
                headers={[
                  t('acct-step'),
                  t('acct-activity'),
                  t('acct-output'),
                  t('acct-duration'),
                  t('acct-personnel'),
                ]}
                rows={[
                  [
                    <StepNum n={1} />,
                    t('acct-gather-and-consolidate-financial-data-from-all'),
                    t('acct-consolidated-data'),
                    <TimeBadge>{t('acct-12-days')}</TimeBadge>,
                    <Person name="acct-mary-jane-c-salvador" role="acct-accountant-iii" />,
                  ],
                  [
                    <StepNum n={2} />,
                    t('acct-prepare-monthly-trial-balance-and-financial'),
                    t('acct-trial-balance-financial-statements'),
                    <TimeBadge>{t('acct-23-days')}</TimeBadge>,
                    <Person name="acct-jocelyn-l-gatan" role="acct-administrative-officer-v" />,
                  ],
                  [
                    <StepNum n={3} />,
                    t('acct-review-and-certify-reports'),
                    t('acct-certified-reports'),
                    <TimeBadge>{t('acct-1-day')}</TimeBadge>,
                    <Person name="acct-evangeline-b-ramos" role="acct-municipal-accountant" />,
                  ],
                  [
                    <StepNum n={4} />,
                    t('acct-submit-to-coa-dbm-and-other-oversight-agencies'),
                    t('acct-submitted-reports'),
                    <TimeBadge>{t('acct-1-day')}</TimeBadge>,
                    <Person name="acct-rosalinda-m-fernandez" role="acct-administrative-aide-vi" />,
                  ],
                ]}
              />
            </SectionCard>
          )}

          {/* C. Payroll Preparation */}
          {activeTab === 'payroll' && (
            <SectionCard
              Icon={Users}
              title="acct-preparation-of-payroll"
              desc="acct-processing-of-salaries-wages-and-other"
            >
              <DataTable
                headers={[
                  t('acct-step'),
                  t('acct-activity'),
                  t('acct-documents'),
                  t('acct-duration'),
                  t('acct-personnel'),
                ]}
                rows={[
                  [
                    <StepNum n={1} />,
                    t('acct-receive-daily-time-records-dtr-and-other-payroll'),
                    t('acct-dtr-leave-forms-ot-authorization'),
                    <TimeBadge>{t('acct-30-minutes')}</TimeBadge>,
                    <Person name="acct-rosalinda-m-fernandez" role="acct-administrative-aide-vi" />,
                  ],
                  [
                    <StepNum n={2} />,
                    t('acct-compute-salaries-deductions-gsis-philhealth'),
                    t('acct-payroll-computation-sheet'),
                    <TimeBadge>{t('acct-12-days')}</TimeBadge>,
                    <Person name="acct-mary-jane-c-salvador" role="acct-accountant-iii" />,
                  ],
                  [
                    <StepNum n={3} />,
                    t('acct-prepare-payroll-register-and-individual-pay-slips'),
                    t('acct-payroll-register'),
                    <TimeBadge>{t('acct-1-day')}</TimeBadge>,
                    <Person name="acct-jocelyn-l-gatan" role="acct-administrative-officer-v" />,
                  ],
                  [
                    <StepNum n={4} />,
                    t('acct-review-and-certify-payroll'),
                    t('acct-certified-payroll'),
                    <TimeBadge>{t('acct-30-minutes')}</TimeBadge>,
                    <Person name="acct-evangeline-b-ramos" role="acct-municipal-accountant" />,
                  ],
                ]}
              />
            </SectionCard>
          )}

          {/* D. Check Issuance */}
          {activeTab === 'checks' && (
            <SectionCard
              Icon={CreditCard}
              title="acct-preparation-and-issuance-of-checks"
              desc="acct-processing-of-checks-for-approved-disbursements"
            >
              <DataTable
                headers={[
                  t('acct-step'),
                  t('acct-activity'),
                  t('acct-documents'),
                  t('acct-duration'),
                  t('acct-personnel'),
                ]}
                rows={[
                  [
                    <StepNum n={1} />,
                    t('acct-receive-approved-disbursement-voucher-from-mayors'),
                    t('acct-approved-dv-with-complete-documents'),
                    <TimeBadge>{t('acct-5-minutes')}</TimeBadge>,
                    <Person name="acct-rosalinda-m-fernandez" role="acct-administrative-aide-vi" />,
                  ],
                  [
                    <StepNum n={2} />,
                    t('acct-prepare-check-based-on-approved-dv'),
                    t('acct-check'),
                    <TimeBadge>{t('acct-10-minutes')}</TimeBadge>,
                    <Person name="acct-mary-jane-c-salvador" role="acct-accountant-iii" />,
                  ],
                  [
                    <StepNum n={3} />,
                    t('acct-review-check-details-and-countersign'),
                    t('acct-reviewed-check'),
                    <TimeBadge>{t('acct-5-minutes')}</TimeBadge>,
                    <Person name="acct-evangeline-b-ramos" role="acct-municipal-accountant" />,
                  ],
                  [
                    <StepNum n={4} />,
                    t('acct-forward-to-municipal-treasurer-for-signature-and'),
                    t('acct-signed-check'),
                    <TimeBadge>{t('acct-5-minutes')}</TimeBadge>,
                    <Person name="acct-rosalinda-m-fernandez" role="acct-administrative-aide-vi" />,
                  ],
                ]}
              />
              <TotalTimeBox
                line1="acct-approximately-25-minutes-per-check"
                note="acct-bulk-processing-may-take-longer"
              />
            </SectionCard>
          )}

          {/* E. JEV & Financial Statements */}
          {activeTab === 'jev' && (
            <SectionCard
              Icon={NotebookText}
              title="acct-preparation-of-jev-and-financial-statements"
              desc="acct-recording-of-financial-transactions-and"
            >
              <DataTable
                headers={[
                  t('acct-step'),
                  t('acct-activity'),
                  t('acct-output'),
                  t('acct-duration'),
                  t('acct-personnel'),
                ]}
                rows={[
                  [
                    <StepNum n={1} />,
                    t('acct-gather-source-documents-dvs-ors-jvs-etc'),
                    t('acct-source-documents'),
                    <TimeBadge>{t('acct-ongoing')}</TimeBadge>,
                    <Person name="acct-rosalinda-m-fernandez" role="acct-administrative-aide-vi" />,
                  ],
                  [
                    <StepNum n={2} />,
                    t('acct-prepare-journal-entry-vouchers-jev'),
                    'JEV',
                    <TimeBadge>{t('acct-daily')}</TimeBadge>,
                    <Person name="acct-mary-jane-c-salvador" role="acct-accountant-iii" />,
                  ],
                  [
                    <StepNum n={3} />,
                    t('acct-post-entries-to-general-and-subsidiary-ledgers'),
                    t('acct-updated-ledgers'),
                    <TimeBadge>{t('acct-daily')}</TimeBadge>,
                    <Person name="acct-jocelyn-l-gatan" role="acct-administrative-officer-v" />,
                  ],
                  [
                    <StepNum n={4} />,
                    t('acct-prepare-trial-balance'),
                    t('acct-trial-balance'),
                    <TimeBadge>Monthly</TimeBadge>,
                    <Person name="acct-mary-jane-c-salvador" role="acct-accountant-iii" />,
                  ],
                  [
                    <StepNum n={5} />,
                    t('acct-prepare-financial-statements-statement-of'),
                    t('acct-financial-statements'),
                    <TimeBadge>{t('acct-quarterlyannual')}</TimeBadge>,
                    <Person name="acct-evangeline-b-ramos" role="acct-municipal-accountant" />,
                  ],
                ]}
              />
            </SectionCard>
          )}
        </Container>
      </Section>

      {/* Staff */}
      <Section compact>
        <Container>
          <div className="mb-5">
            <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Users className="size-4 text-primary" aria-hidden="true" />
              {t('acct-office-personnel')}
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('acct-key-personnel-handling-accounting-services')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3">
              <h3 className="mb-0.5 text-[0.75rem] font-semibold text-foreground">
                {t('acct-evangeline-b-ramos')}
              </h3>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('acct-municipal-accountant')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3">
              <h3 className="mb-0.5 text-[0.75rem] font-semibold text-foreground">
                {t('acct-mary-jane-c-salvador')}
              </h3>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('acct-accountant-iii')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3">
              <h3 className="mb-0.5 text-[0.75rem] font-semibold text-foreground">
                {t('acct-jocelyn-l-gatan')}
              </h3>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('acct-administrative-officer-v')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3">
              <h3 className="mb-0.5 text-[0.75rem] font-semibold text-foreground">
                {t('acct-rosalinda-m-fernandez')}
              </h3>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('acct-administrative-aide-vi')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('acct-office-information')}
              </h3>
              <ul className="m-0 list-none p-0">
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('acct-municipal-accounting-office-municipal-hall-mati')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <Clock className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>Monday - Friday: 8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <Info className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <a href="tel:0873265001" className="text-primary hover:underline">
                    (087) 326-5001
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Info className="size-4 text-primary" aria-hidden="true" />
                {t('acct-important-notes')}
              </h3>
              <ul className="m-0 list-none p-0">
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <CircleCheck
                    className="mt-0.5 size-2.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{t('acct-all-disbursements-require-complete-supporting')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <CircleCheck
                    className="mt-0.5 size-2.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{t('acct-payroll-cutoff-is-every-10th-and-25th-of-the-month')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <CircleCheck
                    className="mt-0.5 size-2.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{t('acct-check-releases-are-on-scheduled-dates')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <CircleCheck
                    className="mt-0.5 size-2.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{t('acct-financial-reports-are-submitted-monthly-to-coa')}</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
