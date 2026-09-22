import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Bike, FileText, Building2, Clock, ListOrdered, FolderOpen, MapPin } from 'lucide-react';
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

// Quick-stat cards. `value` is an i18n key unless `literal` is set — office hours
// carry no data-i18n in the legacy markup, so they render verbatim.
const quickStats: { Icon: LucideIcon; label: string; value: string; literal?: boolean }[] = [
  { Icon: ListOrdered, label: 'tricycle-franchise-steps', value: 'tricycle-15-steps' },
  { Icon: FileText, label: 'tricycle-records-steps', value: 'tricycle-5-steps' },
  { Icon: Building2, label: 'tricycle-office', value: 'tricycle-bpls-vmo-sbo' },
  { Icon: Clock, label: 'tricycle-office-hours', value: '8AM - 5PM', literal: true },
];

// Step numbers are plain text in the legacy markup (rendered verbatim).
const franchiseSteps: { num: string; title: string; desc: string; final?: boolean }[] = [
  {
    num: '01',
    title: 'tricycle-receiving-of-documentary-requirements',
    desc: 'tricycle-submit-documentary-requirements-to-the-bpls',
  },
  {
    num: '02',
    title: 'tricycle-inspection-of-tricycle-unit',
    desc: 'tricycle-bpls-inspector-inspects-the-tricycle-unit',
  },
  {
    num: '03',
    title: 'tricycle-verification-of-records-fees',
    desc: 'tricycle-franchising-staff-verifies-records-and-assessment',
  },
  {
    num: '04',
    title: 'tricycle-receiving-application-form',
    desc: 'tricycle-bpls-inspector-receives-the-franchise-application',
  },
  {
    num: '05',
    title: 'tricycle-mayors-approval',
    desc: 'tricycle-municipal-mayor-approves-the-application-form',
  },
  {
    num: '06',
    title: 'tricycle-collection-of-fees',
    desc: 'tricycle-municipal-treasurers-office-collects-the-fees',
  },
  {
    num: '07',
    title: 'tricycle-receiving-notarized-documents',
    desc: 'tricycle-bpls-receives-notarized-application-and-other',
  },
  {
    num: '08',
    title: 'tricycle-encoding-of-application',
    desc: 'tricycle-bpls-encodes-the-application-into-the-system',
  },
  {
    num: '09',
    title: 'tricycle-preparation-of-transmittal',
    desc: 'tricycle-bpls-prepares-the-transmittal-letter',
  },
  {
    num: '10',
    title: 'tricycle-submission-to-sangguniang-bayan',
    desc: 'tricycle-submit-transmittal-letter-and-franchise',
  },
  {
    num: '11',
    title: 'tricycle-receiving-sorting',
    desc: 'tricycle-franchising-staff-receives-inspects-and-sorts',
  },
  {
    num: '12',
    title: 'tricycle-processing-certification',
    desc: 'tricycle-franchising-staff-processes-application-and',
  },
  {
    num: '13',
    title: 'tricycle-sb-members-approval',
    desc: 'tricycle-sangguniang-bayan-members-approve-the-mtof',
  },
  {
    num: '14',
    title: 'tricycle-official-signing',
    desc: 'tricycle-vice-mayor-and-presiding-officer-sign-the',
  },
  {
    num: '15',
    title: 'tricycle-releasing-of-mtof',
    desc: 'tricycle-franchising-staff-releases-the-mtof-to-the',
    final: true,
  },
];

const recordsSteps: { num: string; title: string; desc: string; final?: boolean }[] = [
  {
    num: '01',
    title: 'tricycle-receiving-letter-of-request',
    desc: 'tricycle-vmosbo-staff-receives-the-letter-of-request',
  },
  {
    num: '02',
    title: 'tricycle-approvaldisapproval',
    desc: 'tricycle-vice-mayor-or-secretary-to-the-sanggunian',
  },
  {
    num: '03',
    title: 'tricycle-review-determination',
    desc: 'tricycle-records-officer-ii-reviews-and-determines',
  },
  {
    num: '04',
    title: 'tricycle-retrieval-reproduction',
    desc: 'tricycle-records-staff-retrieves-and-reproduces-the',
  },
  {
    num: '05',
    title: 'tricycle-releasing-stamping',
    desc: 'tricycle-records-officer-iii-releases-and-stamps-the',
    final: true,
  },
];

function StepGrid({ steps, t }: { steps: typeof franchiseSteps; t: (k: string) => string }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step) => (
        <div
          key={step.num}
          className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5"
        >
          <div
            className={`mb-2 inline-flex size-[26px] items-center justify-center rounded-[5px] text-[0.6875rem] font-bold text-primary-foreground ${
              step.final ? 'bg-brand-success' : 'bg-primary'
            }`}
          >
            {step.num}
          </div>
          <h3 className="mb-1 text-[0.8125rem] font-semibold text-foreground">{t(step.title)}</h3>
          <p className="m-0 text-[0.6875rem] leading-[1.4] text-muted-foreground">{t(step.desc)}</p>
        </div>
      ))}
    </div>
  );
}

export default function TricycleFranchising() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'franchise' | 'records'>('franchise');

  return (
    <>
      <Seo
        title={t('tricycle-tricycle-franchising-and-records-sections')}
        description="Complete guide to tricycle franchise application and records request procedures in Mati, Davao Oriental — step-by-step process, requirements, and responsible offices from LGU Mati."
        canonicalPath="/service-details/tricycle-franchising"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('tricycle-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('tricycle-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/business" className="hover:text-primary">
            {t('tricycle-business')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">Tricycle Franchising &amp; Records</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Bike className="size-4" aria-hidden="true" />
            {t('tricycle-franchising')}
          </>
        }
        title={t('tricycle-tricycle-franchising-and-records-sections')}
        description={t('tricycle-complete-guide-to-tricycle-franchise-application')}
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

      {/* Process flow with tabs */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <ListOrdered className="size-5 text-primary" aria-hidden="true" />
            {t('tricycle-process-flow')}
          </SectionTitle>
          <SectionSubtitle>
            Step-by-step procedures for tricycle franchise and records request
          </SectionSubtitle>

          {/* Tabs */}
          <div
            className="mb-5 flex flex-wrap gap-2"
            role="tablist"
            aria-label={t('tricycle-process-flow')}
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'franchise'}
              onClick={() => setTab('franchise')}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                tab === 'franchise'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]'
              }`}
            >
              <Bike className="size-4" aria-hidden="true" />
              {t('tricycle-tricycle-franchise')}
              <small className="opacity-80">15 Steps</small>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'records'}
              onClick={() => setTab('records')}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
                tab === 'records'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]'
              }`}
            >
              <FolderOpen className="size-4" aria-hidden="true" />
              {t('tricycle-records-request')}
              <small className="opacity-80">5 Steps</small>
            </button>
          </div>

          {tab === 'franchise' ? (
            <StepGrid steps={franchiseSteps} t={t} />
          ) : (
            <StepGrid steps={recordsSteps} t={t} />
          )}
        </Container>
      </Section>

      {/* Contact info */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('tricycle-bpls-office')}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">
                {t('tricycle-business-permits-and-licensing-section-handles')}
              </p>
              <ul className="m-0 list-none p-0 text-[0.8125rem] text-foreground">
                <li className="mb-1.5 flex items-center gap-2">
                  <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('tricycle-municipal-hall-mati-nueva-vizcaya')}
                </li>
                <li className="mb-1.5 flex items-center gap-2">
                  <Clock className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  Mon-Fri: 8:00 AM - 5:00 PM
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
                <FolderOpen className="size-4 text-primary" aria-hidden="true" />
                {t('tricycle-records-section')}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">
                {t('tricycle-vice-mayors-office-sangguniang-bayan-office')}
              </p>
              <ul className="m-0 list-none p-0 text-[0.8125rem] text-foreground">
                <li className="mb-1.5 flex items-center gap-2">
                  <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('tricycle-sangguniang-bayan-municipal-hall')}
                </li>
                <li className="mb-1.5 flex items-center gap-2">
                  <Clock className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  Mon-Fri: 8:00 AM - 5:00 PM
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
