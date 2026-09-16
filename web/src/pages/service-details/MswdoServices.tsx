import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Heart,
  Building2,
  MapPin,
  Clock,
  FileText,
  LayoutGrid,
  FileHeart,
  FileCheck,
  ThumbsUp,
  Accessibility,
  IdCard,
  Venus,
  Smile,
  Users,
  Info,
  CircleCheck,
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

type TabId = 'case-study' | 'indigency' | 'aics' | 'pwd' | 'senior' | 'women' | 'children';

export default function MswdoServices() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<TabId>('case-study');

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

  const ProcessTable = ({ rows }: { rows: ReactNode[][] }) => (
    <div className="my-3.5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            {[
              t('mswdosvc-step'),
              t('mswdosvc-activity'),
              t('mswdosvc-fee'),
              t('mswdosvc-duration'),
              t('mswdosvc-personnel'),
            ].map((h, i) => (
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

  const InfoBox = ({
    title,
    items,
    className,
  }: {
    title: string;
    items: { Icon: LucideIcon; content: ReactNode }[];
    className?: string;
  }) => (
    <div className={`rounded-lg border border-border bg-card p-3.5${className ? ` ${className}` : ''}`}>
      <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <Info className="size-4 text-primary" aria-hidden="true" />
        {t(title)}
      </h4>
      <ul className="m-0 list-none p-0">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-1.5 py-1 text-xs text-foreground">
            <it.Icon className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
            <span>{it.content}</span>
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

  const tabs: { id: TabId; label: ReactNode }[] = [
    { id: 'case-study', label: t('mswdosvc-social-case-study') },
    { id: 'indigency', label: t('mswdosvc-certificate-of-indigency') },
    { id: 'aics', label: 'AICS' },
    { id: 'pwd', label: t('mswdosvc-pwd-assistance') },
    { id: 'senior', label: t('mswdosvc-senior-citizens') },
    { id: 'women', label: t('mswdosvc-womens-welfare') },
    { id: 'children', label: t('mswdosvc-childrens-welfare') },
  ];

  return (
    <>
      <Seo
        title={t('mswdosvc-municipal-social-welfare-development-office')}
        description="City Social Welfare and Development Office (MSWDO) Services - Social case studies, indigency certificates, AICS, PWD assistance, senior citizen services, and welfare programs in Mati, Davao Oriental."
        canonicalPath="/service-details/mswdo-services"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('mswdosvc-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('mswdosvc-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/social-services" className="hover:text-primary">
            {t('mswdosvc-social-services')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">MSWDO Services</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Heart className="size-4" aria-hidden="true" />
            MSWDO
          </>
        }
        title={t('mswdosvc-municipal-social-welfare-development-office')}
        description={t('mswdosvc-social-welfare-programs-assistance-and-support')}
      />

      {/* Quick Stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Building2 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mswdosvc-office')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">MSWDO</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mswdosvc-location')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mswdosvc-municipal-hall-2nd-floor')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mswdosvc-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mswdosvc-8am-5pm-monfri')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <FileText className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mswdosvc-services')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mswdosvc-7-services')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Service Tabs */}
      <Section compact altBg>
        <Container>
          <div className="mb-5 text-center">
            <h2 className="mb-1 flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
              <LayoutGrid className="size-4 text-primary" aria-hidden="true" />
              {t('mswdosvc-mswdo-services')}
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('mswdosvc-select-a-service-to-view-the-detailed-process-and')}
            </p>
          </div>

          <div
            className="mb-5 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label={t('mswdosvc-mswdo-services')}
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

          {/* Social Case Study Report */}
          {tab === 'case-study' && (
            <div>
              <ContentHeader
                Icon={FileHeart}
                title="mswdosvc-issuance-of-social-case-study-report"
                desc="mswdosvc-for-medical-educational-burial-and-other"
              />
              <ReqBox
                Icon={FileText}
                title="mswdosvc-requirements"
                className="mb-3.5"
                items={[
                  'mswdosvc-barangay-certificate-of-indigency',
                  'mswdosvc-valid-id-of-clientpatient',
                  'mswdosvc-medical-certificateabstract-for-medical-assistance',
                  'mswdosvc-hospital-billstatement-of-account-for-medical',
                  'mswdosvc-death-certificate-for-burial-assistance',
                  'mswdosvc-funeral-contract-for-burial-assistance',
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('mswdosvc-submit-complete-requirements-to-mswdo'),
                    '—',
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-welfare-assistant')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('mswdosvc-interview-and-assessment-of-client'),
                    '—',
                    <TimeTag>{t('mswdosvc-15-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('mswdosvc-preparation-of-social-case-study-report'),
                    '—',
                    <TimeTag>{t('mswdosvc-30-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('mswdosvc-review-and-approval-by-mswdo-head'),
                    '—',
                    <TimeTag>{t('mswdosvc-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-mswdo-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={5} />,
                    t('mswdosvc-release-of-social-case-study-report'),
                    <FeeTag>{t('mswdosvc-free')}</FeeTag>,
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-welfare-assistant')}</PersonnelTag>,
                  ],
                ]}
              />
              <InfoBox
                title="mswdosvc-processing-information"
                items={[
                  { Icon: Clock, content: t('mswdosvc-total-processing-time-1-hour-5-minutes') },
                  {
                    Icon: Info,
                    content: t('mswdosvc-home-visitation-may-be-conducted-for-verification'),
                  },
                  {
                    Icon: Info,
                    content: t('mswdosvc-please-accomplish-client-feedback-form-and-drop'),
                  },
                ]}
                className="mt-3.5"
              />
            </div>
          )}

          {/* Certificate of Indigency */}
          {tab === 'indigency' && (
            <div>
              <ContentHeader
                Icon={FileCheck}
                title="mswdosvc-issuance-of-certificate-of-indigency"
                desc="mswdosvc-for-indigent-residents-requiring-certification"
              />
              <ReqBox
                Icon={FileText}
                title="mswdosvc-requirements"
                className="mb-3.5"
                items={[
                  'mswdosvc-barangay-certificate-of-indigency',
                  'mswdosvc-valid-id',
                  'mswdosvc-1x1-or-2x2-id-photo-2-copies',
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('mswdosvc-submit-requirements-and-fill-out-application-form'),
                    '—',
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-welfare-assistant')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('mswdosvc-verification-and-assessment'),
                    '—',
                    <TimeTag>{t('mswdosvc-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('mswdosvc-preparation-and-signing-of-certificate'),
                    '—',
                    <TimeTag>{t('mswdosvc-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-mswdo-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('mswdosvc-release-of-certificate-of-indigency'),
                    <FeeTag>{t('mswdosvc-free')}</FeeTag>,
                    <TimeTag>{t('mswdosvc-3-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-welfare-assistant')}</PersonnelTag>,
                  ],
                ]}
              />
              <InfoBox
                title="mswdosvc-processing-information"
                items={[
                  { Icon: Clock, content: t('mswdosvc-total-processing-time-28-minutes') },
                  {
                    Icon: Info,
                    content: t('mswdosvc-certificate-is-valid-for-specific-purpose-only'),
                  },
                  {
                    Icon: Info,
                    content: t('mswdosvc-please-accomplish-client-feedback-form-and-drop'),
                  },
                ]}
                className="mt-3.5"
              />
            </div>
          )}

          {/* AICS */}
          {tab === 'aics' && (
            <div>
              <ContentHeader
                Icon={ThumbsUp}
                title="mswdosvc-assistance-to-individuals-in-crisis-situation-aics"
                desc="mswdosvc-financial-and-material-assistance-for-individuals"
              />
              <ReqBox
                Icon={FileText}
                title="mswdosvc-requirements"
                className="mb-3.5"
                items={[
                  'mswdosvc-barangay-certificate-of-indigency',
                  'mswdosvc-valid-id-of-client',
                  'mswdosvc-medical-certificatehospital-bill-for-medical',
                  'mswdosvc-death-certificate-and-funeral-contract-for-burial',
                  'mswdosvc-school-registrationenrollment-form-for',
                  'mswdosvc-police-reportincident-report-for-victims-of',
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('mswdosvc-submit-complete-requirements'),
                    '—',
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-welfare-assistant')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('mswdosvc-interview-and-assessment-of-clients-situation'),
                    '—',
                    <TimeTag>{t('mswdosvc-20-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('mswdosvc-preparation-of-social-case-study-report'),
                    '—',
                    <TimeTag>{t('mswdosvc-30-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('mswdosvc-evaluation-and-approval-of-assistance'),
                    '—',
                    <TimeTag>{t('mswdosvc-15-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-mswdo-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={5} />,
                    t('mswdosvc-release-of-financialmaterial-assistance'),
                    <FeeTag>{t('mswdosvc-free')}</FeeTag>,
                    <TimeTag>{t('mswdosvc-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-welfare-assistant')}</PersonnelTag>,
                  ],
                ]}
              />
              <InfoBox
                title="mswdosvc-processing-information"
                items={[
                  { Icon: Clock, content: t('mswdosvc-total-processing-time-1-hour-20-minutes') },
                  {
                    Icon: Info,
                    content: t('mswdosvc-assistance-amount-depends-on-availability-of'),
                  },
                  {
                    Icon: Info,
                    content: t('mswdosvc-home-visitation-may-be-conducted-for-verification'),
                  },
                ]}
                className="mt-3.5"
              />
            </div>
          )}

          {/* PWD Assistance */}
          {tab === 'pwd' && (
            <div>
              <ContentHeader
                Icon={Accessibility}
                title="mswdosvc-assistance-to-persons-with-disability-pwd"
                desc="mswdosvc-services-and-assistance-for-persons-with"
              />
              <ReqBox
                Icon={FileText}
                title="mswdosvc-requirements-for-pwd-id"
                className="mb-3.5"
                items={[
                  'mswdosvc-barangay-certificate',
                  'mswdosvc-medical-certificate-indicating-type-of-disability',
                  'mswdosvc-1x1-id-photo-2-copies',
                  'mswdosvc-valid-id-of-applicant-or-guardian',
                  'mswdosvc-birth-certificate-photocopy',
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('mswdosvc-submit-requirements-and-fill-out-pwd-application'),
                    '—',
                    <TimeTag>{t('mswdosvc-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-pwd-focal-person')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('mswdosvc-assessment-and-verification-of-disability'),
                    '—',
                    <TimeTag>{t('mswdosvc-15-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('mswdosvc-encoding-and-processing-of-pwd-id'),
                    '—',
                    <TimeTag>{t('mswdosvc-20-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-pwd-focal-person')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('mswdosvc-approval-and-signing-by-mswdo-head'),
                    '—',
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-mswdo-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={5} />,
                    t('mswdosvc-release-of-pwd-id'),
                    <FeeTag>{t('mswdosvc-free')}</FeeTag>,
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-pwd-focal-person')}</PersonnelTag>,
                  ],
                ]}
              />
              <InfoBox
                title="mswdosvc-processing-information"
                items={[
                  { Icon: Clock, content: t('mswdosvc-total-processing-time-55-minutes') },
                  { Icon: Info, content: t('mswdosvc-pwd-id-is-valid-for-3-years') },
                  {
                    Icon: Info,
                    content: t('mswdosvc-pwd-id-entitles-holder-to-20-discount-on-goods'),
                  },
                ]}
                className="mt-3.5"
              />
            </div>
          )}

          {/* Senior Citizens */}
          {tab === 'senior' && (
            <div>
              <ContentHeader
                Icon={IdCard}
                title="mswdosvc-assistance-to-senior-citizens"
                desc="mswdosvc-services-and-programs-for-citizens-60-years-old"
              />
              <ReqBox
                Icon={FileText}
                title="mswdosvc-requirements-for-senior-citizen-id"
                className="mb-3.5"
                items={[
                  'mswdosvc-barangay-certificate',
                  'mswdosvc-birth-certificate-or-any-valid-id-showing-date-of',
                  'mswdosvc-1x1-id-photo-2-copies',
                  'mswdosvc-proof-of-residence-in-mati',
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('mswdosvc-submit-requirements-and-fill-out-senior-citizen'),
                    '—',
                    <TimeTag>{t('mswdosvc-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-osca-focal-person')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('mswdosvc-verification-of-age-and-residency'),
                    '—',
                    <TimeTag>{t('mswdosvc-10-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-osca-focal-person')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('mswdosvc-encoding-and-processing-of-senior-citizen-id'),
                    '—',
                    <TimeTag>{t('mswdosvc-15-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-osca-focal-person')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('mswdosvc-approval-and-signing'),
                    '—',
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-mswdo-head')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={5} />,
                    t('mswdosvc-release-of-senior-citizen-id'),
                    <FeeTag>{t('mswdosvc-free')}</FeeTag>,
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-osca-focal-person')}</PersonnelTag>,
                  ],
                ]}
              />
              <InfoBox
                title="mswdosvc-processing-information"
                items={[
                  { Icon: Clock, content: t('mswdosvc-total-processing-time-45-minutes') },
                  {
                    Icon: Info,
                    content: t('mswdosvc-senior-citizen-id-entitles-holder-to-20-discount'),
                  },
                  {
                    Icon: Info,
                    content: t('mswdosvc-social-pension-available-for-indigent-senior'),
                  },
                ]}
                className="mt-3.5"
              />
            </div>
          )}

          {/* Women's Welfare */}
          {tab === 'women' && (
            <div>
              <ContentHeader
                Icon={Venus}
                title="mswdosvc-assistance-to-women"
                desc="mswdosvc-programs-and-services-for-womens-welfare-and"
              />
              <ReqBox
                Icon={FileText}
                title="mswdosvc-services-available"
                className="mb-3.5"
                items={[
                  'mswdosvc-solo-parent-id-and-benefits',
                  'mswdosvc-vawc-violence-against-women-and-children',
                  'mswdosvc-temporary-shelter-and-protection',
                  'mswdosvc-counseling-and-psychosocial-support',
                  'mswdosvc-livelihood-assistance-programs',
                  'mswdosvc-legal-assistance-referral',
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('mswdosvc-reportseek-assistance-at-mswdo'),
                    '—',
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-welfare-assistant')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('mswdosvc-interview-and-assessment-of-situation'),
                    '—',
                    <TimeTag>{t('mswdosvc-30-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('mswdosvc-provision-of-immediate-interventionassistance'),
                    '—',
                    <TimeTag>{t('mswdosvc-varies')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('mswdosvc-referral-to-appropriate-agencies-if-needed'),
                    <FeeTag>{t('mswdosvc-free')}</FeeTag>,
                    <TimeTag>{t('mswdosvc-15-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-mswdo-head')}</PersonnelTag>,
                  ],
                ]}
              />
              <InfoBox
                title="mswdosvc-processing-information"
                items={[
                  { Icon: Clock, content: t('mswdosvc-initial-response-time-50-minutes') },
                  {
                    Icon: Info,
                    content: t('mswdosvc-vawc-cases-are-given-priority-and-immediate'),
                  },
                  { Icon: Info, content: t('mswdosvc-all-information-is-treated-with-strict') },
                ]}
                className="mt-3.5"
              />
            </div>
          )}

          {/* Children's Welfare */}
          {tab === 'children' && (
            <div>
              <ContentHeader
                Icon={Smile}
                title="mswdosvc-assistance-to-children"
                desc="mswdosvc-child-welfare-and-protection-services"
              />
              <ReqBox
                Icon={FileText}
                title="mswdosvc-services-available"
                className="mb-3.5"
                items={[
                  'mswdosvc-child-abuseneglect-intervention',
                  'mswdosvc-children-in-conflict-with-the-law-cicl-assistance',
                  'mswdosvc-foster-care-and-adoption-services',
                  'mswdosvc-day-care-services',
                  'mswdosvc-supplemental-feeding-program',
                  'mswdosvc-educational-assistance',
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('mswdosvc-reportreferral-received-at-mswdo'),
                    '—',
                    <TimeTag>{t('mswdosvc-5-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-welfare-assistant')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('mswdosvc-initial-assessment-and-investigation'),
                    '—',
                    <TimeTag>{t('mswdosvc-30-minutes')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    'Case conference and intervention planning',
                    '—',
                    <TimeTag>{t('mswdosvc-1-hour')}</TimeTag>,
                    <span>
                      <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>
                      <br />
                      <PersonnelTag>{t('mswdosvc-mswdo-head')}</PersonnelTag>
                    </span>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('mswdosvc-implementation-of-interventionassistance'),
                    <FeeTag>{t('mswdosvc-free')}</FeeTag>,
                    <TimeTag>{t('mswdosvc-varies')}</TimeTag>,
                    <PersonnelTag>{t('mswdosvc-social-worker')}</PersonnelTag>,
                  ],
                ]}
              />
              <InfoBox
                title="mswdosvc-processing-information"
                items={[
                  { Icon: Clock, content: t('mswdosvc-initial-response-time-1-hour-35-minutes') },
                  {
                    Icon: Info,
                    content: t('mswdosvc-child-abuse-cases-are-given-immediate-priority'),
                  },
                  {
                    Icon: Info,
                    content: t('mswdosvc-coordination-with-pnp-dswd-and-other-agencies-as'),
                  },
                ]}
                className="mt-3.5"
              />
            </div>
          )}
        </Container>
      </Section>

      {/* Office Personnel */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Users className="size-5 text-primary" aria-hidden="true" />
            {t('mswdosvc-office-personnel')}
          </SectionTitle>
          <SectionSubtitle>{t('mswdosvc-key-personnel-handling-social-welfare-services')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('mswdosvc-mswdo-head')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mswdosvc-office-head-social-welfare-officer')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('mswdosvc-social-worker')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mswdosvc-case-management-assessment')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('mswdosvc-social-welfare-assistant')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mswdosvc-client-services-documentation')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('mswdosvc-osca-focal-person')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mswdosvc-senior-citizen-affairs')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('mswdosvc-pwd-focal-person')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mswdosvc-pwd-affairs-services')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('mswdosvc-day-care-worker')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mswdosvc-child-development-services')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <InfoBox
              title="mswdosvc-office-information"
              items={[
                { Icon: MapPin, content: t('mswdosvc-mswdo-office-2nd-floor-municipal-hall-mati') },
                { Icon: Clock, content: 'Monday - Friday: 8:00 AM - 5:00 PM' },
                { Icon: Phone, content: '0916 284 0885' },
              ]}
            />
            <InfoBox
              title="mswdosvc-important-notes"
              items={[
                { Icon: CircleCheck, content: t('mswdosvc-all-services-are-free-of-charge') },
                {
                  Icon: CircleCheck,
                  content: t('mswdosvc-bring-complete-requirements-to-avoid-delays'),
                },
                { Icon: CircleCheck, content: t('mswdosvc-emergency-cases-are-given-priority') },
                {
                  Icon: CircleCheck,
                  content: t('mswdosvc-all-information-is-treated-with-confidentiality'),
                },
              ]}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
