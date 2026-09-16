import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Wallet,
  Building2,
  MapPin,
  Clock,
  CalendarCheck,
  LayoutGrid,
  FileCheck,
  Landmark,
  GraduationCap,
  History,
  CircleCheck,
  Info,
  TriangleAlert,
  FileText,
  Users,
  Phone,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

export default function MunicipalBudget() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('obligation');

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

  const tabs: { id: string; label: ReactNode }[] = [
    { id: 'obligation', label: t('mbudget-obligation-request') },
    { id: 'barangay', label: t('mbudget-barangay-budget') },
    { id: 'sef', label: t('mbudget-sef-budget') },
  ];

  return (
    <>
      <Seo
        title={t('mbudget-municipal-budget-office')}
        description="City Budget Office - Obligation request processing, barangay budget review, and SEF budget preparation in Mati, Davao Oriental."
        canonicalPath="/service-details/municipal-budget"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('mbudget-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('mbudget-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/tax-payments" className="hover:text-primary">
            {t('mbudget-tax-payments')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">City Budget Office</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Wallet className="size-4" aria-hidden="true" />
            {t('mbudget-budget')}
          </>
        }
        title={t('mbudget-municipal-budget-office')}
        description={t('mbudget-obligation-request-processing-barangay-budget')}
      />

      {/* Quick stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Building2 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mbudget-office')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mbudget-mun-budget')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mbudget-location')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mbudget-municipal-hall')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mbudget-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mbudget-8am-5pm')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <CalendarCheck className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mbudget-days')}
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
              {t('mbudget-budget-office-services')}
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('mbudget-select-a-service-to-view-the-detailed-process')}
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
                    : 'border-border bg-card text-foreground hover:border-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* A. Processing of Obligation Request */}
          {activeTab === 'obligation' && (
            <SectionCard
              Icon={FileCheck}
              title="mbudget-processing-of-obligation-request"
              desc="mbudget-the-municipal-budget-office-processes"
            >
              <DataTable
                headers={[
                  t('mbudget-step'),
                  t('mbudget-activity'),
                  t('mbudget-documents-required'),
                  t('mbudget-duration'),
                  t('mbudget-personnel'),
                ]}
                rows={[
                  [
                    <StepNum n={1} />,
                    t('mbudget-submit-obligation-request'),
                    t('mbudget-obligation-request'),
                    <TimeBadge>{t('mbudget-3-minutes')}</TimeBadge>,
                    <Person name="mbudget-darby-gold-abalos" role="mbudget-administrative-officer-ii" />,
                  ],
                  [
                    <StepNum n={2} />,
                    t('mbudget-checkingvalidating-of-the-availability-of'),
                    '—',
                    <TimeBadge>{t('mbudget-3-minutes')}</TimeBadge>,
                    <Person name="mbudget-melisa-claire-leal" role="mbudget-administrative-officer-v" />,
                  ],
                  [
                    <StepNum n={3} />,
                    t('mbudget-assign-account-code'),
                    t('mbudget-checkedvalidated-obligation-request-obr'),
                    <TimeBadge>{t('mbudget-2-minutes')}</TimeBadge>,
                    <Person name="mbudget-darby-gold-abalos" role="mbudget-administrative-officer-ii" />,
                  ],
                  [
                    <StepNum n={4} />,
                    t('mbudget-certification-by-the-mbo-of-the-availability-of'),
                    t('mbudget-obr-with-assigned-account-code'),
                    <TimeBadge>{t('mbudget-2-minutes')}</TimeBadge>,
                    <Person name="mbudget-marcial-l-ramos-cpa" role="mbudget-municipal-budget-officer" />,
                  ],
                  [
                    <StepNum n={5} />,
                    t('mbudget-assign-obr-number'),
                    t('mbudget-obr-duly-signed-by-the-municipal-budget-officer'),
                    <TimeBadge>{t('mbudget-3-minutes')}</TimeBadge>,
                    <Person name="mbudget-darby-gold-abalos" role="mbudget-administrative-officer-ii" />,
                  ],
                  [
                    <StepNum n={6} />,
                    t('mbudget-posting-of-processed-obr-at-the-logbook'),
                    '—',
                    <TimeBadge>—</TimeBadge>,
                    '—',
                  ],
                  [
                    <StepNum n={7} />,
                    t('mbudget-release-of-obr'),
                    t('mbudget-official-receipt'),
                    <TimeBadge>{t('mbudget-2-minutes')}</TimeBadge>,
                    '—',
                  ],
                ]}
              />
              <div className="mt-3.5 rounded-lg border border-border bg-card p-3.5">
                <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                  <History className="size-4 text-primary" aria-hidden="true" />
                  {t('mbudget-total-processing-time')}
                </h3>
                <ul className="m-0 list-none p-0">
                  <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                    <CircleCheck className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{t('mbudget-approximately-15-minutes-for-complete-processing')}</span>
                  </li>
                  <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                    <Info className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{t('mbudget-processing-time-may-vary-depending-on-document')}</span>
                  </li>
                </ul>
              </div>
            </SectionCard>
          )}

          {/* B. Barangay Budget */}
          {activeTab === 'barangay' && (
            <SectionCard
              Icon={Landmark}
              title="mbudget-preparation-review-and-endorsement-of-barangay"
              desc="mbudget-the-municipal-budget-office-assists-barangays-in"
            >
              <div className="mb-3.5 rounded-lg border border-border bg-card p-3.5">
                <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                  <Info className="size-4 text-primary" aria-hidden="true" />
                  {t('mbudget-important-note')}
                </h3>
                <ul className="m-0 list-none p-0">
                  <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                    <TriangleAlert className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{t('mbudget-within-ten-days-10-from-the-approval-of-the')}</span>
                  </li>
                </ul>
              </div>
              <DataTable
                headers={[
                  t('mbudget-step'),
                  t('mbudget-activity'),
                  t('mbudget-documents-required'),
                  t('mbudget-duration'),
                  t('mbudget-personnel'),
                ]}
                rows={[
                  [
                    <StepNum n={1} />,
                    t('mbudget-submit-barangay-budget-for-review-and-evaluation'),
                    <ul className="m-0 list-none p-0">
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-annual-barangay-budget')}</span>
                      </li>
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-transmittal-letter-of-the-barangay-secretary')}</span>
                      </li>
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-budget-message-of-the-punong-barangay')}</span>
                      </li>
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-the-authorized-expenditure-program-for-the-budget')}</span>
                      </li>
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-budget-of-expenditures-and-sources-of-financing')}</span>
                      </li>
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-barangay-development-plan-and-barangay-annual')}</span>
                      </li>
                    </ul>,
                    <TimeBadge>{t('mbudget-3-minutes')}</TimeBadge>,
                    <Person name="mbudget-marcial-l-ramos-cpa" role="mbudget-municipal-budget-officer" />,
                  ],
                  [
                    <StepNum n={2} />,
                    t('mbudget-review-and-evaluation-of-barangay-budget'),
                    '—',
                    <TimeBadge>{t('mbudget-1-day')}</TimeBadge>,
                    <span>
                      <Person
                        name="mbudget-marcial-l-ramos-cpa"
                        role="mbudget-municipal-budget-officer"
                      />
                      <br />
                      <br />
                      <Person
                        name="mbudget-darby-gold-abalos"
                        role="mbudget-administrative-officer-ii"
                      />
                    </span>,
                  ],
                ]}
              />
            </SectionCard>
          )}

          {/* C. SEF Budget */}
          {activeTab === 'sef' && (
            <SectionCard
              Icon={GraduationCap}
              title="mbudget-preparation-and-implementation-of-special"
              desc="mbudget-the-municipal-budget-office-assists-the-different"
            >
              <DataTable
                headers={[
                  t('mbudget-step'),
                  t('mbudget-activity'),
                  t('mbudget-documents-required'),
                  t('mbudget-duration'),
                  t('mbudget-personnel'),
                ]}
                rows={[
                  [
                    <StepNum n={1} />,
                    t('mbudget-submit-sef-budget-for-review-and-evaluation'),
                    <ul className="m-0 list-none p-0">
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-annual-sef-budget')}</span>
                      </li>
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-transmittal-letter-of-the-sef-secretary')}</span>
                      </li>
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-income-and-expenditure-estimates')}</span>
                      </li>
                      <li className="flex items-start gap-1.5 py-0.5 text-[0.6875rem]">
                        <FileText className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                        <span>{t('mbudget-local-school-board-ordinance')}</span>
                      </li>
                    </ul>,
                    <TimeBadge>{t('mbudget-3-minutes')}</TimeBadge>,
                    <span>
                      <Person
                        name="mbudget-marcial-l-ramos-cpa"
                        role="mbudget-municipal-budget-officer"
                      />
                      <br />
                      <br />
                      <Person
                        name="mbudget-darby-gold-abalos"
                        role="mbudget-administrative-officer-ii"
                      />
                    </span>,
                  ],
                  [
                    <StepNum n={2} />,
                    t('mbudget-review-and-evaluation-of-sef-budget'),
                    '—',
                    <TimeBadge>{t('mbudget-1-day')}</TimeBadge>,
                    <span>
                      <Person
                        name="mbudget-marcial-l-ramos-cpa"
                        role="mbudget-municipal-budget-officer"
                      />
                      <br />
                      <br />
                      <Person
                        name="mbudget-darby-gold-abalos"
                        role="mbudget-administrative-officer-ii"
                      />
                    </span>,
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
              {t('mbudget-office-personnel')}
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('mbudget-key-personnel-handling-budget-office-services')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-0.5 text-[0.75rem] font-semibold text-foreground">
                {t('mbudget-marcial-l-ramos-cpa')}
              </h3>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mbudget-municipal-budget-officer')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-0.5 text-[0.75rem] font-semibold text-foreground">
                {t('mbudget-melisa-claire-leal')}
              </h3>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mbudget-administrative-officer-v')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-0.5 text-[0.75rem] font-semibold text-foreground">
                {t('mbudget-darby-gold-abalos')}
              </h3>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mbudget-administrative-officer-ii')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3.5">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('mbudget-office-information')}
              </h3>
              <ul className="m-0 list-none p-0">
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('mbudget-municipal-budget-office-municipal-hall-mati')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <Clock className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>Monday - Friday: 8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <Phone className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <a href="tel:0873265001" className="text-primary hover:underline">
                    (087) 326-5001
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-3.5">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Info className="size-4 text-primary" aria-hidden="true" />
                {t('mbudget-important-notes')}
              </h3>
              <ul className="m-0 list-none p-0">
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <CircleCheck className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('mbudget-ensure-all-documents-are-complete-before')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <CircleCheck className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('mbudget-barangay-budgets-must-be-submitted-within-10-days')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <CircleCheck className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('mbudget-sef-budgets-require-municipal-school-board')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-muted-foreground">
                  <CircleCheck className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('mbudget-processing-times-may-vary-based-on-workload')}</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
