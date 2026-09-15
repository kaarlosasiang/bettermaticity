import type { ReactNode } from 'react';
import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Heart,
  Clock,
  Banknote,
  UserCheck,
  CalendarCheck,
  Info,
  ListOrdered,
  ClipboardCheck,
  FileText,
  History,
  CircleHelp,
  ChevronDown,
  Building2,
  Phone,
  Users,
  User,
  Link2,
  FileCheck,
  Coins,
  MapPin,
  MessageSquareText,
  TriangleAlert,
  Download,
  CircleCheck,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { Container, Section, SectionTitle, SectionSubtitle, PageHeader } from '@/components/primitives';

// Legacy .stat-card: white bordered card, centered icon + uppercase label + value.
function QuickStat({ icon: Icon, label, value }: { icon: LucideIcon; label: ReactNode; value: ReactNode }) {
  return (
    <div className="rounded-lg border border-black/[0.06] bg-card p-3 text-center">
      <Icon className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
      <h4 className="mb-0.5 text-[0.625rem] font-medium uppercase text-muted-foreground">{label}</h4>
      <p className="m-0 text-[0.8125rem] font-semibold text-foreground">{value}</p>
    </div>
  );
}

// Legacy .process-card: white card, numbered badge, title, description.
function ProcessCard({ n, final, title, desc }: { n: number; final?: boolean; title: ReactNode; desc: ReactNode }) {
  return (
    <div className="rounded-lg border border-black/[0.06] bg-card p-3.5">
      <div
        className={cn(
          'mb-2 inline-flex size-[22px] items-center justify-center rounded-[5px] text-[0.625rem] font-bold text-white',
          final ? 'bg-[#06a77d]' : 'bg-primary'
        )}
      >
        {n}
      </div>
      <h4 className="mb-1 text-[0.8125rem] font-semibold text-foreground">{title}</h4>
      <p className="m-0 text-[0.6875rem] leading-snug text-muted-foreground">{desc}</p>
    </div>
  );
}

// Legacy .req-list li: check-circle bullet + text.
function ReqItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
      <CircleCheck className="mt-[3px] size-2.5 shrink-0 text-primary" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

// Legacy .req-box: white bordered card with an icon heading + list.
function ReqBox({ icon: Icon, title, children }: { icon: LucideIcon; title: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-black/[0.06] bg-card p-3.5">
      <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <Icon className="size-3.5 text-primary" aria-hidden="true" />
        <span>{title}</span>
      </h4>
      <ul className="m-0 list-none p-0">{children}</ul>
    </div>
  );
}

// Legacy .notice-box: soft blue gradient callout.
function NoticeBox({ icon: Icon, title, children }: { icon: LucideIcon; title: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-3.5 rounded-lg border border-[rgba(0,50,160,0.15)] bg-[linear-gradient(135deg,rgba(0,50,160,0.06)_0%,rgba(0,50,160,0.02)_100%)] p-3.5">
      <h4 className="mb-2 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-primary">
        <Icon className="size-3.5" aria-hidden="true" />
        <span>{title}</span>
      </h4>
      <p className="m-0 text-xs leading-relaxed text-foreground">{children}</p>
    </div>
  );
}

// Legacy .sidebar-card: compact white bordered card.
function SidebarCard({ icon: Icon, title, children }: { icon: LucideIcon; title: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-2.5 rounded-lg border border-black/[0.06] bg-card p-3.5">
      <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <Icon className="size-3.5 text-primary" aria-hidden="true" />
        <span>{title}</span>
      </h4>
      {children}
    </div>
  );
}

// Legacy .license-stat: white bordered card, centered block icon + value + label.
function LicenseStat({ icon: Icon, value, label }: { icon: LucideIcon; value: ReactNode; label: ReactNode }) {
  return (
    <div className="rounded-lg border border-black/[0.06] bg-card p-3.5 text-center">
      <Icon className="mx-auto mb-1.5 block size-5 text-primary" aria-hidden="true" />
      <span className="block text-base font-bold text-foreground">{value}</span>
      <span className="text-[0.6875rem] uppercase tracking-[0.3px] text-muted-foreground">{label}</span>
    </div>
  );
}

// Legacy .faq-item: click-to-toggle disclosure.
function FaqItem({ question, answer }: { question: ReactNode; answer: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-2 overflow-hidden rounded-lg border border-black/[0.06] bg-card">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left text-[0.8125rem] font-semibold text-foreground hover:bg-primary/[0.02]"
      >
        <span>{question}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-primary transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && <div className="px-3.5 pb-3 text-xs text-muted-foreground">{answer}</div>}
    </div>
  );
}

// Legacy .process-table cell helpers.
function StepBadge({ n, final }: { n: number; final?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex size-[22px] items-center justify-center rounded-[5px] text-[0.625rem] font-bold text-white',
        final ? 'bg-[#06a77d]' : 'bg-primary'
      )}
    >
      {n}
    </span>
  );
}

function FeeTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded bg-[rgba(6,167,125,0.1)] px-2 py-[3px] text-[0.6875rem] font-semibold text-[#06a77d]">
      {children}
    </span>
  );
}

function TimeTag({ children }: { children: ReactNode }) {
  return <span className="text-[0.6875rem] font-medium text-muted-foreground">{children}</span>;
}

function PersonnelTag({ children }: { children: ReactNode }) {
  return (
    <span className="my-0.5 mr-1 inline-block rounded bg-primary/10 px-2 py-[3px] text-[0.6875rem] font-medium text-primary">
      {children}
    </span>
  );
}

function DocList({ children }: { children: ReactNode }) {
  return <ul className="m-0 list-disc pl-3.5 text-[0.6875rem] text-muted-foreground [&>li]:mb-[3px]">{children}</ul>;
}

const TD = 'border-b border-black/[0.04] px-3.5 py-3 align-top';
const TH = 'bg-primary px-3.5 py-3 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.3px] text-white';

export default function MarriageCertificate() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title="Marriage Certificate Service Guide"
        description="How to register and get a marriage certificate in Mati, Davao Oriental. Complete step-by-step guide with requirements, fees, processing time, and application procedures from LGU Mati."
        canonicalPath="/service-details/marriage-certificate"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">
            {t('mc-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('mc-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/certificates" className="hover:text-primary">
            {t('mc-certificates')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">Marriage Certificate</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Heart className="size-4" aria-hidden="true" />
            {t('mc-certificates')}
          </>
        }
        title={t('mc-marriage-certificate-local-registration')}
        description={t('mc-registration-of-certificate-of-marriage-at-the')}
      />

      {/* Quick Stats */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <QuickStat icon={Clock} label={t('mc-processing')} value={t('mc-5-minutes')} />
            <QuickStat icon={Banknote} label={t('mc-fee')} value={t('mc-free')} />
            <QuickStat icon={UserCheck} label={t('mc-who-can-apply')} value={t('mc-contracting-parties')} />
            <QuickStat icon={CalendarCheck} label={t('mc-appointment')} value="Walk-in" />
          </div>
        </Container>
      </Section>

      {/* Important Notice */}
      <Section altBg>
        <Container>
          <NoticeBox icon={Info} title={t('mc-important-registration-deadlines')}>
            The Certificate of Marriage (COM) of a Civil or Church wedding with Marriage License must be registered
            within <strong>{t('mc-fifteen-15-days')}</strong> after the solemnization of marriage. COM of a Civil or
            Church Wedding under Art. 34 or PD 1083 must be registered within <strong>{t('mc-thirty-30-days')}</strong>{' '}
            after the solemnization of marriage. Registration of marriage certificate is{' '}
            <strong>{t('mc-free-of-charge')}</strong>, pursuant to Section 6 of P.D. No. 651.
          </NoticeBox>
        </Container>
      </Section>

      {/* Step-by-Step Process */}
      <Section>
        <Container>
          <SectionTitle>
            <ListOrdered className="size-5 text-primary" aria-hidden="true" />
            {t('mc-stepbystep-process')}
          </SectionTitle>
          <SectionSubtitle>{t('mc-follow-these-steps-to-register-your-marriage')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            <ProcessCard
              n={1}
              title={t('mc-submit-certificate-of-marriage')}
              desc={t('mc-submit-the-accomplished-certificate-of-marriage')}
            />
            <ProcessCard
              n={2}
              final
              title={t('mc-claim-registered-certificate')}
              desc={t('mc-get-your-copy-of-com-duly-registered-and-signed')}
            />
          </div>
        </Container>
      </Section>

      {/* Requirements & Info */}
      <Section altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[2fr_1fr]">
            <div>
              <SectionTitle>
                <ClipboardCheck className="size-5 text-primary" aria-hidden="true" />
                {t('mc-requirements')}
              </SectionTitle>
              <SectionSubtitle>{t('mc-documents-needed-for-marriage-registration')}</SectionSubtitle>

              <div className="mb-3.5">
                <ReqBox icon={FileText} title={t('mc-for-timely-registration-within-1530-days')}>
                  <ReqItem>{t('mc-certificate-of-marriage-duly-signed-by-the')}</ReqItem>
                  <ReqItem>{t('mc-signature-of-the-solemnizing-officer')}</ReqItem>
                  <ReqItem>{t('mc-signatures-of-at-least-two-2-witnesses')}</ReqItem>
                </ReqBox>
              </div>
              <div className="mb-3.5">
                <ReqBox icon={History} title={t('mc-for-delayed-registration')}>
                  <ReqItem>{t('mc-affidavit-for-delayed-registration-of-marriage-at')}</ReqItem>
                  <ReqItem>{t('mc-psa-negative-certification')}</ReqItem>
                  <ReqItem>{t('mc-affidavit-of-the-solemnizing-officer-or-the')}</ReqItem>
                </ReqBox>
              </div>

              <div className="mt-5">
                <SectionTitle>
                  <CircleHelp className="size-5 text-primary" aria-hidden="true" />
                  {t('mc-frequently-asked-questions')}
                </SectionTitle>
              </div>
              <FaqItem
                question={t('mc-is-there-a-fee-for-marriage-certificate')}
                answer="No. Registration of marriage certificate is free of charge, pursuant to Section 6 of P.D. No. 651."
              />
              <FaqItem
                question={t('mc-what-is-the-deadline-for-registering-a-marriage')}
                answer="For Civil or Church wedding with Marriage License: within 15 days after solemnization. For weddings under Art. 34 or PD 1083: within 30 days after solemnization."
              />
              <FaqItem
                question={t('mc-what-if-i-missed-the-registration-deadline')}
                answer="You will need to file for delayed registration. This requires additional documents including a PSA negative certification and an affidavit explaining the reason for the delay."
              />
              <FaqItem
                question={t('mc-who-should-sign-the-certificate-of-marriage')}
                answer="The Certificate of Marriage must be signed by both contracting parties (bride and groom), the solemnizing officer (priest, judge, or mayor), and at least two witnesses."
              />
              <FaqItem
                question={t('mc-how-long-does-the-registration-process-take')}
                answer="The total response time is approximately 5 minutes for timely registration with complete documents."
              />
            </div>

            <div>
              <SidebarCard icon={Building2} title={t('mc-office-information')}>
                <p className="mb-1.5 text-xs text-muted-foreground">
                  <strong className="text-foreground">{t('mc-local-civil-registrar')}</strong>
                </p>
                <p className="mb-1.5 text-xs text-muted-foreground">
                  {t('mc-municipal-hall-2nd-floor-mati-nueva-vizcaya')}
                </p>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="size-3.5 text-primary" aria-hidden="true" /> (087) 326-5001
                </p>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5 text-primary" aria-hidden="true" /> Mon-Fri: 8AM - 5PM
                </p>
              </SidebarCard>

              <SidebarCard icon={Users} title={t('mc-personnel')}>
                <ul className="m-0 list-none p-0">
                  <li className="flex items-center gap-1.5 py-1 text-xs text-foreground">
                    <User className="size-3 text-primary" aria-hidden="true" />
                    <span>{t('mc-oliver-receiving-officer')}</span>
                  </li>
                  <li className="flex items-center gap-1.5 py-1 text-xs text-foreground">
                    <User className="size-3 text-primary" aria-hidden="true" />
                    <span>{t('mc-bernadette')}</span>
                  </li>
                  <li className="flex items-center gap-1.5 py-1 text-xs text-foreground">
                    <User className="size-3 text-primary" aria-hidden="true" />
                    <span>{t('mc-juvy')}</span>
                  </li>
                  <li className="flex items-center gap-1.5 py-1 text-xs text-foreground">
                    <User className="size-3 text-primary" aria-hidden="true" />
                    <span>{t('mc-edgar-mc')}</span>
                  </li>
                </ul>
              </SidebarCard>

              <SidebarCard icon={Link2} title={t('mc-related-services')}>
                <ul className="m-0 list-none p-0">
                  <li className="py-1 text-xs">
                    <AppLink to="/service-details/birth-certificate" className="text-primary hover:underline">
                      {t('mc-birth-certificate')}
                    </AppLink>
                  </li>
                  <li className="py-1 text-xs">
                    <AppLink to="/services/certificates" className="text-primary hover:underline">
                      {t('mc-death-certificate')}
                    </AppLink>
                  </li>
                  <li className="py-1 text-xs">
                    <AppLink to="/service-details/civil-registrar" className="text-primary hover:underline">
                      {t('mc-civil-registrar-services')}
                    </AppLink>
                  </li>
                </ul>
              </SidebarCard>

              <SidebarCard icon={Info} title={t('mc-need-help')}>
                <p className="mb-1.5 text-xs text-muted-foreground">
                  {t('mc-contact-us-for-assistance-with-this-service')}
                </p>
                <AppLink
                  to="/contact"
                  className="mt-2.5 block rounded-md bg-primary px-4 py-2.5 text-center text-sm font-medium text-white no-underline hover:bg-primary-dark"
                >
                  {t('mc-contact-us')}
                </AppLink>
              </SidebarCard>
            </div>
          </div>
        </Container>
      </Section>

      {/* Marriage License Application */}
      <Section>
        <Container>
          <div className="rounded-t-[10px] bg-[linear-gradient(135deg,var(--primary)_0%,#0044cc_100%)] p-5 text-white">
            <h2 className="mb-1 flex items-center gap-2 text-[1.125rem] font-semibold text-white">
              <FileCheck className="size-4 text-white/80" aria-hidden="true" />
              <span>{t('mc-application-for-marriage-license')}</span>
            </h2>
            <p className="m-0 text-[0.8125rem] text-white/85">
              {t('mc-for-engaged-couples-intending-to-get-married-in')}
            </p>
          </div>
          <div className="mb-3.5 rounded-b-lg border border-t-0 border-[rgba(0,50,160,0.15)] bg-[linear-gradient(135deg,rgba(0,50,160,0.06)_0%,rgba(0,50,160,0.02)_100%)] p-3.5">
            <h4 className="mb-2 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-primary">
              <Info className="size-3.5" aria-hidden="true" />
              <span>{t('mc-important-information')}</span>
            </h4>
            <p className="m-0 text-xs leading-relaxed text-foreground">
              Engaged couples (either one or both of them is a resident of Mati, NV) of legal ages who are intending
              to get married must apply for marriage license at the MCRO. The Marriage License is valid anywhere in
              the Philippines for a period of <strong>{t('mc-120-days')}</strong> from the date of issue.
            </p>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <LicenseStat icon={History} value={t('mc-10-days')} label={t('mc-total-processing')} />
            <LicenseStat icon={Coins} value="₱270.00" label={t('mc-total-fees')} />
            <LicenseStat icon={CalendarCheck} value={t('mc-120-days')} label={t('mc-license-validity')} />
            <LicenseStat icon={MapPin} value={t('mc-nationwide')} label={t('mc-valid-coverage')} />
          </div>

          <SectionTitle>
            <ListOrdered className="size-5 text-primary" aria-hidden="true" />
            {t('mc-stepbystep-process-for-marriage-license')}
          </SectionTitle>
          <SectionSubtitle>{t('mc-complete-guide-to-obtaining-your-marriage-license')}</SectionSubtitle>

          <div className="mb-3.5 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse overflow-hidden rounded-lg border border-black/[0.06] bg-card text-xs">
              <thead>
                <tr>
                  <th className={TH} style={{ width: '5%' }}>
                    {t('mc-step')}
                  </th>
                  <th className={TH} style={{ width: '25%' }}>
                    {t('mc-what-to-do')}
                  </th>
                  <th className={TH} style={{ width: '30%' }}>
                    {t('mc-documents-to-present')}
                  </th>
                  <th className={TH} style={{ width: '15%' }}>
                    {t('mc-fee')}
                  </th>
                  <th className={TH} style={{ width: '12%' }}>
                    {t('mc-duration')}
                  </th>
                  <th className={TH} style={{ width: '13%' }}>
                    {t('mc-personnel')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={TD}>
                    <StepBadge n={1} />
                  </td>
                  <td className={TD}>
                    <strong>{t('mc-present-requirements')}</strong>
                  </td>
                  <td className={TD}>
                    <DocList>
                      <li>{t('mc-birth-certificate')}</li>
                      <li>{t('mc-parental-consent-for-applicants-ages-1821-years')}</li>
                      <li>{t('mc-parental-advice-for-applicants-ages-2224-years-old')}</li>
                    </DocList>
                    <strong className="text-[0.6875rem] text-foreground">{t('mc-others-if-applicable')}</strong>
                    <DocList>
                      <li>{t('mc-certificate-of-legal-capacity-to-contract')}</li>
                      <li>{t('mc-if-previously-married-death-certificate-of-spouse')}</li>
                    </DocList>
                  </td>
                  <td className={TD}>—</td>
                  <td className={TD}>
                    <TimeTag>{t('mc-2-minutes')}</TimeTag>
                  </td>
                  <td className={TD}>
                    <PersonnelTag>{t('mc-bernadette')}</PersonnelTag>
                    <PersonnelTag>{t('mc-juvy')}</PersonnelTag>
                    <PersonnelTag>{t('mc-edgar-mc')}</PersonnelTag>
                  </td>
                </tr>
                <tr>
                  <td className={TD}>
                    <StepBadge n={2} />
                  </td>
                  <td className={TD}>
                    <strong>{t('mc-answer-questions-for-encoding')}</strong> in the Application Form
                  </td>
                  <td className={TD}>—</td>
                  <td className={TD}>—</td>
                  <td className={TD}>
                    <TimeTag>{t('mc-3-minutes')}</TimeTag>
                  </td>
                  <td className={TD}>
                    <PersonnelTag>{t('mc-edgar-mc')}</PersonnelTag>
                  </td>
                </tr>
                <tr>
                  <td className={TD}>
                    <StepBadge n={3} />
                  </td>
                  <td className={TD}>
                    <strong>{t('mc-wait-for-the-printing')}</strong> of the documents
                  </td>
                  <td className={TD}>—</td>
                  <td className={TD}>—</td>
                  <td className={TD}>
                    <TimeTag>{t('mc-2-minutes')}</TimeTag>
                  </td>
                  <td className={TD}>
                    <PersonnelTag>{t('mc-edgar-mc')}</PersonnelTag>
                  </td>
                </tr>
                <tr>
                  <td className={TD}>
                    <StepBadge n={4} />
                  </td>
                  <td className={TD}>
                    <strong>{t('mc-pay-the-required-fees')}</strong> at the MTO
                  </td>
                  <td className={TD}>{t('mc-order-of-payment')}</td>
                  <td className={TD}>
                    <FeeTag>₱268.00</FeeTag>
                    <div className="mt-1 text-[0.625rem] text-muted-foreground">
                      Note: Marriage to be solemnized by the City Mayor shall pay an additional ₱250.00 Solemnization
                      Fee
                    </div>
                  </td>
                  <td className={TD}>
                    <TimeTag>{t('mc-10-minutes')}</TimeTag>
                  </td>
                  <td className={TD}>
                    <PersonnelTag>{t('mc-mto-collection-officer')}</PersonnelTag>
                  </td>
                </tr>
                <tr>
                  <td className={TD}>
                    <StepBadge n={5} />
                  </td>
                  <td className={TD}>
                    <strong>{t('mc-proceed-to-mswdo')}</strong> for the schedule of PMC (Pre-Marriage Counseling)
                  </td>
                  <td className={TD}>
                    <DocList>
                      <li>{t('mc-application-for-marriage-license')}</li>
                      <li>{t('mc-official-receipt')}</li>
                    </DocList>
                  </td>
                  <td className={TD}>—</td>
                  <td className={TD}>
                    <TimeTag>{t('mc-45-minutes')}</TimeTag>
                  </td>
                  <td className={TD}>
                    <PersonnelTag>{t('mc-mswdo-staff')}</PersonnelTag>
                  </td>
                </tr>
                <tr>
                  <td className={TD}>
                    <StepBadge n={6} />
                  </td>
                  <td className={TD}>
                    <strong>{t('mc-attend-the-pmc')}</strong> (every Thursday at 8:00 AM) at the Function Room or any
                    designated room
                  </td>
                  <td className={TD}>
                    <DocList>
                      <li>{t('mc-application-for-marriage-license')}</li>
                      <li>{t('mc-official-receipt')}</li>
                    </DocList>
                  </td>
                  <td className={TD}>—</td>
                  <td className={TD}>
                    <TimeTag>{t('mc-4-hours')}</TimeTag>
                  </td>
                  <td className={TD}>
                    <PersonnelTag>{t('mc-pmc-team')}</PersonnelTag>
                  </td>
                </tr>
                <tr>
                  <td className={TD}>
                    <StepBadge n={7} />
                  </td>
                  <td className={TD}>
                    <strong>{t('mc-after-the-pmc-go-back-to-mcro')}</strong> for the schedule of the issuance of the
                    Marriage License
                  </td>
                  <td className={TD}>
                    <DocList>
                      <li>{t('mc-application-for-marriage-license')}</li>
                      <li>{t('mc-certificate-of-pmc')}</li>
                    </DocList>
                  </td>
                  <td className={TD}>—</td>
                  <td className={TD}>
                    <TimeTag>{t('mc-5-minutes')}</TimeTag>
                  </td>
                  <td className={TD}>
                    <PersonnelTag>{t('mc-edgar-mc')}</PersonnelTag>
                  </td>
                </tr>
                <tr>
                  <td className={TD}>
                    <StepBadge n={8} final />
                  </td>
                  <td className={TD}>
                    <strong>{t('mc-issuance-of-the-marriage-license')}</strong> after the completion of the
                    requirements and period of 10 days posting
                  </td>
                  <td className={TD}>
                    <DocList>
                      <li>{t('mc-application-for-marriage-license-duly-signed-by')}</li>
                      <li>{t('mc-duly-accomplished-parental-consent-or-parental')}</li>
                      <li>{t('mc-premarriage-counseling-certificate')}</li>
                      <li>{t('mc-official-receipt')}</li>
                    </DocList>
                  </td>
                  <td className={TD}>
                    <FeeTag>₱2.00</FeeTag>
                    <div className="mt-0.5 text-[0.625rem] text-muted-foreground">Marriage License Fee</div>
                  </td>
                  <td className={TD}>
                    <TimeTag>{t('mc-3-minutes')}</TimeTag>
                  </td>
                  <td className={TD}>
                    <PersonnelTag>{t('mc-edgar-mc')}</PersonnelTag>
                  </td>
                </tr>
                <tr className="bg-primary/[0.04] font-semibold">
                  <td className={cn(TD, 'border-b-0')} colSpan={3}>
                    <strong>{t('mc-total-response-time')}</strong>
                  </td>
                  <td className={cn(TD, 'border-b-0')}>
                    <strong>₱270.00</strong>
                  </td>
                  <td className={cn(TD, 'border-b-0')} colSpan={2}>
                    <strong>{t('mc-10-days-5-hours-and-10-minutes')}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <NoticeBox icon={MessageSquareText} title={t('mc-client-feedback')}>
            {t('mc-accomplish-client-feedback-form-and-drop-at')}
          </NoticeBox>

          <div className="mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <ReqBox icon={FileText} title={t('mc-basic-requirements')}>
              <ReqItem>{t('mc-birth-certificate-psa-or-local')}</ReqItem>
              <ReqItem>{t('mc-parental-consent-ages-1821')}</ReqItem>
              <ReqItem>{t('mc-parental-advice-ages-2224')}</ReqItem>
              <ReqItem>{t('mc-valid-government-id')}</ReqItem>
              <ReqItem>{t('mc-community-tax-certificate-cedula')}</ReqItem>
            </ReqBox>
            <ReqBox icon={TriangleAlert} title={t('mc-additional-requirements-if-applicable')}>
              <ReqItem>{t('mc-certificate-of-legal-capacity-to-contract')}</ReqItem>
              <ReqItem>{t('mc-death-certificate-of-spouse-if-widowed')}</ReqItem>
              <ReqItem>{t('mc-decree-of-divorce-if-divorced-abroad')}</ReqItem>
              <ReqItem>{t('mc-decree-of-annulment-if-annulled')}</ReqItem>
              <ReqItem>{t('mc-certificate-of-no-marriage-cenomar-from-psa')}</ReqItem>
            </ReqBox>
          </div>

          <div className="mt-6">
            <SectionTitle>
              <Download className="size-5 text-primary" aria-hidden="true" />
              {t('mc-downloadable-resources')}
            </SectionTitle>
            <SectionSubtitle>{t('mc-forms-for-marriage-license-application')}</SectionSubtitle>
          </div>
          <div className="rounded-lg border border-black/[0.06] bg-card p-3.5">
            <ul className="m-0 list-none p-0">
              <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                <FileText className="mt-[3px] size-3 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href="https://mati.gov.ph/wp-content/uploads/2021/10/Application-for-Marriage-License.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('mc-application-for-marriage-license')}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
