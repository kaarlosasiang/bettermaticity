import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  FileX,
  Clock,
  Banknote,
  UserCheck,
  CalendarCheck,
  Info,
  ListOrdered,
  MessageSquareText,
  ClipboardCheck,
  Hospital,
  House,
  History,
  CircleCheck,
  CircleHelp,
  ChevronDown,
  Building2,
  Phone,
  Users,
  User,
  Coins,
  Link2,
  Download,
  FileText,
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

// ---- Legacy .dc-* style helpers, expressed as Tailwind class strings ----
const cardCls = 'rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5';
const noticeCls =
  'mb-3.5 rounded-lg border border-[rgba(0,50,160,0.15)] bg-[linear-gradient(135deg,rgba(0,50,160,0.06)_0%,rgba(0,50,160,0.02)_100%)] p-3.5';
const noticeH4Cls = 'mb-2 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-primary';
const noticePCls = 'm-0 text-xs leading-relaxed text-foreground';
const cardH4Cls = 'mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground';
const reqListCls = 'm-0 list-none p-0';
const reqItemCls = 'flex items-start gap-1.5 py-1 text-xs text-foreground';
const reqIconCls = 'mt-[3px] size-2.5 shrink-0 text-primary';
const thCls =
  'bg-primary px-3.5 py-3 text-left text-[0.6875rem] font-semibold uppercase text-white';
const tdCls = 'border-b border-border px-3.5 py-3 align-top';
const badgeCls =
  'inline-flex size-[22px] items-center justify-center rounded-[5px] bg-primary text-[0.625rem] font-bold text-white';
const badgeFinalCls =
  'inline-flex size-[22px] items-center justify-center rounded-[5px] bg-brand-success text-[0.625rem] font-bold text-white';
const personnelTagCls =
  'my-0.5 inline-block rounded bg-primary/10 px-2 py-[3px] text-[0.6875rem] font-medium text-primary';
const timeTagCls = 'text-[0.6875rem] font-medium text-muted-foreground';
const feeTagCls =
  'rounded bg-brand-success/10 px-2 py-[3px] text-[0.6875rem] font-semibold text-brand-success';

function ReqItem({ children }: { children: React.ReactNode }) {
  return (
    <li className={reqItemCls}>
      <CircleCheck className={reqIconCls} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function PersonnelTag({ children }: { children: React.ReactNode }) {
  return <span className={personnelTagCls}>{children}</span>;
}

// Steps 2-4 are identical across both scenarios.
function SharedSteps({ t }: { t: (key: string) => string }) {
  return (
    <>
      <tr className="hover:bg-primary/[0.02]">
        <td className={tdCls}>
          <span className={badgeCls}>2</span>
        </td>
        <td className={tdCls}>
          <strong className="font-semibold">{t('dc-proceed-to-the-embalmer')}</strong> for signature
          of the Certification of Embalmer
        </td>
        <td className={tdCls}>{t('dc-accomplished-death-certificate')}</td>
        <td className={tdCls}>—</td>
        <td className={tdCls}>
          <span className={timeTagCls}>{t('dc-1-hour')}</span>
        </td>
        <td className={tdCls}>
          <PersonnelTag>{t('dc-embalmer')}</PersonnelTag>
        </td>
      </tr>
      <tr className="hover:bg-primary/[0.02]">
        <td className={tdCls}>
          <span className={badgeCls}>3</span>
        </td>
        <td className={tdCls}>
          <strong className="font-semibold">{t('dc-proceed-to-mho')}</strong> for the review and
          certification of the cause of death by the City Health Officer
        </td>
        <td className={tdCls}>{t('dc-accomplished-death-certificate')}</td>
        <td className={tdCls}>—</td>
        <td className={tdCls}>
          <span className={timeTagCls}>{t('dc-10-minutes')}</span>
        </td>
        <td className={tdCls}>
          <PersonnelTag>{t('dc-municipal-health-officer')}</PersonnelTag>
        </td>
      </tr>
      <tr className="hover:bg-primary/[0.02]">
        <td className={tdCls}>
          <span className={badgeCls}>4</span>
        </td>
        <td className={tdCls}>
          <strong className="font-semibold">{t('dc-pay-the-burial-permit-fee-at-the-mto')}</strong>{' '}
          if the deceased will be buried in any Cemetery in Mati, otherwise, transfer permit shall
          be paid. Go back to MCRO for the registration of the COD.
        </td>
        <td className={tdCls}>{t('dc-accomplished-death-certificate-and-order-of')}</td>
        <td className={tdCls}>
          <span className={feeTagCls}>₱50.00</span> Burial Permit
          <br />
          <span className={feeTagCls}>₱100.00</span> Transfer Permit
        </td>
        <td className={tdCls}>
          <span className={timeTagCls}>{t('dc-10-minutes')}</span>
        </td>
        <td className={tdCls}>
          <PersonnelTag>{t('dc-mto-collection-officer')}</PersonnelTag>
        </td>
      </tr>
    </>
  );
}

function TableHead({ t }: { t: (key: string) => string }) {
  return (
    <thead>
      <tr>
        <th className={thCls}>{t('dc-step')}</th>
        <th className={thCls}>{t('dc-what-to-do')}</th>
        <th className={thCls}>{t('dc-documents-to-present')}</th>
        <th className={thCls}>{t('dc-fee')}</th>
        <th className={thCls}>{t('dc-duration')}</th>
        <th className={thCls}>{t('dc-personnel')}</th>
      </tr>
    </thead>
  );
}

const tableCls =
  'w-full border-collapse overflow-hidden rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] text-xs text-foreground';
const totalTdCls = 'bg-primary/[0.04] px-3.5 py-3 font-semibold';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group mb-2 overflow-hidden rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)]">
      <summary className="flex cursor-pointer list-none items-center justify-between px-3.5 py-3 text-[0.8125rem] font-semibold text-foreground marker:content-none hover:bg-primary/[0.02] [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <ChevronDown
          className="size-4 shrink-0 text-primary transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-3.5 pb-3 text-xs text-muted-foreground">{answer}</div>
    </details>
  );
}

const quickStats: { Icon: LucideIcon; label: string; value: React.ReactNode }[] = [
  { Icon: Clock, label: 'dc-processing', value: 'dc-1-hr-3538-mins' },
  { Icon: Banknote, label: 'dc-fee', value: '₱50-150' },
  { Icon: UserCheck, label: 'dc-who-can-apply', value: 'dc-informantfamily' },
  { Icon: CalendarCheck, label: 'dc-deadline', value: 'Within 30 Days' },
];

export default function DeathCertificate() {
  const { t } = useLanguage();
  const [scenario, setScenario] = useState<'hospital' | 'home'>('hospital');

  // Quick-stat values: some are i18n keys, some are literal (fee / deadline).
  const statValue = (v: React.ReactNode) =>
    v === 'dc-1-hr-3538-mins' || v === 'dc-informantfamily' ? t(v as string) : v;

  const tabBase =
    'cursor-pointer rounded-lg border-2 px-[18px] py-2.5 text-[0.8125rem] font-semibold transition';
  const tabActive = 'border-primary bg-primary text-white';
  const tabIdle =
    'border-border bg-card text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)] hover:text-primary';

  return (
    <>
      <Seo
        title={t('dc-registration-of-death-certificate')}
        description="How to register a death certificate in Mati, Davao Oriental. Complete step-by-step guide with requirements, fees, processing time, and application procedures from LGU Mati."
        canonicalPath="/service-details/death-certificate"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('nav-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('nav-services')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">{t('dc-registration-of-death-certificate')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <FileX className="size-3.5" aria-hidden="true" />
            {t('dc-certificates')}
          </>
        }
        title={t('dc-registration-of-death-certificate')}
        description={t('dc-registration-of-certificate-of-death-at-the-local')}
      />

      {/* Quick Stats */}
      <Section className="py-10">
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            {quickStats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center"
              >
                <s.Icon className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
                <h4 className="mb-0.5 text-[0.625rem] font-medium uppercase text-muted-foreground">
                  {t(s.label)}
                </h4>
                <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                  {statValue(s.value)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Important Notice */}
      <Section altBg className="py-10">
        <Container>
          <div className={noticeCls}>
            <h4 className={noticeH4Cls}>
              <Info className="size-4" aria-hidden="true" />
              {t('dc-important-registration-information')}
            </h4>
            <p className={noticePCls}>
              The registration of Death Certificate (DC) at the MCRO within{' '}
              <strong>{t('dc-thirty-30-days')}</strong> is mandatory. Delayed registration of death
              must be filed following the lapse of the prescribed period of 30 calendar days from
              the death of a person. Registration of death certificate is{' '}
              <strong>{t('dc-free-of-charge')}</strong>, pursuant to Section 6 of P.D. No. 651.
            </p>
          </div>
        </Container>
      </Section>

      {/* Step-by-Step Process */}
      <Section className="py-10">
        <Container>
          <SectionTitle className="mb-1 text-lg">
            <ListOrdered className="size-4 text-primary" aria-hidden="true" />
            {t('dc-stepbystep-process')}
          </SectionTitle>
          <SectionSubtitle>
            {t('dc-select-the-scenario-that-applies-to-your-situation')}
          </SectionSubtitle>

          <div className="mb-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setScenario('hospital')}
              className={`${tabBase} ${scenario === 'hospital' ? tabActive : tabIdle}`}
            >
              {t('dc-death-in-hospitalclinic')}
            </button>
            <button
              type="button"
              onClick={() => setScenario('home')}
              className={`${tabBase} ${scenario === 'home' ? tabActive : tabIdle}`}
            >
              {t('dc-death-at-home')}
            </button>
          </div>

          {/* Scenario A: Death in Hospital/Clinic */}
          {scenario === 'hospital' && (
            <div className="overflow-x-auto">
              <table className={tableCls}>
                <TableHead t={t} />
                <tbody>
                  <tr className="hover:bg-primary/[0.02]">
                    <td className={tdCls}>
                      <span className={badgeCls}>{t('dc-1a')}</span>
                    </td>
                    <td className={tdCls}>
                      <strong className="font-semibold">
                        {t('dc-present-the-certificate-of-death-for-review')}
                      </strong>
                      <br />
                      <br />
                      If delayed registration, the Affidavit for Delayed Registration of Death at
                      the back of the document shall be accomplished.
                    </td>
                    <td className={tdCls}>{t('dc-certificate-of-death-duly-signed-by-the')}</td>
                    <td className={tdCls}>—</td>
                    <td className={tdCls}>
                      <span className={timeTagCls}>{t('dc-5-minutes')}</span>
                    </td>
                    <td className={tdCls}>
                      <PersonnelTag>{t('dc-bernadette')}</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-juvy')}</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-edgar-mc')}</PersonnelTag>
                    </td>
                  </tr>
                  <SharedSteps t={t} />
                  <tr className="hover:bg-primary/[0.02]">
                    <td className={tdCls}>
                      <span className={badgeFinalCls}>5</span>
                    </td>
                    <td className={tdCls}>
                      <strong className="font-semibold">{t('dc-get-your-copy-of-cod')}</strong> duly
                      registered and signed by the Receiving Officer and MCR or any authorized
                      signatory.
                    </td>
                    <td className={tdCls}>—</td>
                    <td className={tdCls}>—</td>
                    <td className={tdCls}>
                      <span className={timeTagCls}>{t('dc-1-minute')}</span>
                    </td>
                    <td className={tdCls}>
                      <PersonnelTag>Oliver</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-bernadette')}</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-juvy')}</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-edgar-mc')}</PersonnelTag>
                    </td>
                  </tr>
                  <tr>
                    <td className={totalTdCls} colSpan={4}>
                      <strong>TOTAL RESPONSE TIME (Death in Hospital/Clinic)</strong>
                    </td>
                    <td className={totalTdCls} colSpan={2}>
                      <strong>{t('dc-1-hour-38-minutes')}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Scenario B: Death at Home */}
          {scenario === 'home' && (
            <div className="overflow-x-auto">
              <table className={tableCls}>
                <TableHead t={t} />
                <tbody>
                  <tr className="hover:bg-primary/[0.02]">
                    <td className={tdCls}>
                      <span className={badgeCls}>{t('dc-1b')}</span>
                    </td>
                    <td className={tdCls}>
                      <strong className="font-semibold">
                        {t('dc-death-not-in-hospitalclinic-unattended-by-a')}
                      </strong>
                      <br />
                      <br />
                      &gt; The facts of death encoded to PHILCRIS as provided by the informant.
                      <br />
                      <br />
                      &gt; If delayed registration, the Affidavit for Delayed Registration of Death
                      at the back of the document shall be accomplished.
                      <br />
                      <br />
                      &gt; The informant review the encoded information provided. If all entries are
                      correct, wait for the printing of the document.
                      <br />
                      <br />
                      &gt; The informant and Preparer sign the Certificate of Death.
                    </td>
                    <td className={tdCls}>—</td>
                    <td className={tdCls}>—</td>
                    <td className={tdCls}>
                      <span className={timeTagCls}>{t('dc-3-minutes')}</span>
                      <br />
                      <span className={timeTagCls}>{t('dc-10-minutes')}</span>
                    </td>
                    <td className={tdCls}>
                      <PersonnelTag>{t('dc-bernadette')}</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-juvy')}</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-edgar-mc')}</PersonnelTag>
                    </td>
                  </tr>
                  <SharedSteps t={t} />
                  <tr className="hover:bg-primary/[0.02]">
                    <td className={tdCls}>
                      <span className={badgeFinalCls}>5</span>
                    </td>
                    <td className={tdCls}>
                      <strong className="font-semibold">{t('dc-get-your-copy-of-cod')}</strong> duly
                      registered and signed by the Receiving Officer and MCR or any authorized
                      signatory.
                    </td>
                    <td className={tdCls}>—</td>
                    <td className={tdCls}>—</td>
                    <td className={tdCls}>
                      <span className={timeTagCls}>1 minute</span>
                    </td>
                    <td className={tdCls}>
                      <PersonnelTag>{t('dc-oliver')}</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-bernadette')}</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-juvy')}</PersonnelTag>{' '}
                      <PersonnelTag>{t('dc-edgar-mc')}</PersonnelTag>
                    </td>
                  </tr>
                  <tr>
                    <td className={totalTdCls} colSpan={4}>
                      <strong>{t('dc-total-response-time-death-at-home')}</strong>
                    </td>
                    <td className={totalTdCls} colSpan={2}>
                      <strong>{t('dc-1-hour-35-minutes')}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className={`${noticeCls} mt-3.5 mb-0`}>
            <h4 className={noticeH4Cls}>
              <MessageSquareText className="size-4" aria-hidden="true" />
              {t('dc-client-feedback')}
            </h4>
            <p className={noticePCls}>{t('dc-accomplish-client-feedback-form-and-drop-at')}</p>
          </div>
        </Container>
      </Section>

      {/* Requirements & Info */}
      <Section altBg className="py-10">
        <Container>
          <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-[2fr_1fr]">
            {/* Left column */}
            <div>
              <SectionTitle className="mb-1 text-lg">
                <ClipboardCheck className="size-4 text-primary" aria-hidden="true" />
                {t('dc-requirements')}
              </SectionTitle>
              <SectionSubtitle>{t('dc-documents-needed-for-death-certificate')}</SectionSubtitle>

              <div className={`${cardCls} mb-3.5`}>
                <h4 className={cardH4Cls}>
                  <Hospital className="size-4 text-primary" aria-hidden="true" />
                  {t('dc-for-death-in-hospitalclinic')}
                </h4>
                <ul className={reqListCls}>
                  <ReqItem>{t('dc-certificate-of-death-duly-signed-by-attending')}</ReqItem>
                  <ReqItem>{t('dc-valid-id-of-informant')}</ReqItem>
                  <ReqItem>{t('dc-embalmers-certification')}</ReqItem>
                </ul>
              </div>

              <div className={`${cardCls} mb-3.5`}>
                <h4 className={cardH4Cls}>
                  <House className="size-4 text-primary" aria-hidden="true" />
                  {t('dc-for-death-at-home-unattended')}
                </h4>
                <ul className={reqListCls}>
                  <ReqItem>{t('dc-information-about-the-deceased-full-name-date-of')}</ReqItem>
                  <ReqItem>{t('dc-valid-id-of-informant')}</ReqItem>
                  <ReqItem>{t('dc-embalmers-certification')}</ReqItem>
                  <ReqItem>{t('dc-mho-certification-of-cause-of-death')}</ReqItem>
                </ul>
              </div>

              <div className={`${cardCls} mb-3.5`}>
                <h4 className={cardH4Cls}>
                  <History className="size-4 text-primary" aria-hidden="true" />
                  {t('dc-for-delayed-registration-after-30-days')}
                </h4>
                <ul className={reqListCls}>
                  <ReqItem>{t('dc-affidavit-for-delayed-registration-of-death')}</ReqItem>
                  <ReqItem>{t('dc-psa-negative-certification')}</ReqItem>
                  <ReqItem>{t('dc-supporting-documents-hospital-records-burial')}</ReqItem>
                </ul>
              </div>

              <SectionTitle className="mt-5 mb-3 text-lg">
                <CircleHelp className="size-4 text-primary" aria-hidden="true" />
                {t('dc-frequently-asked-questions')}
              </SectionTitle>
              <FaqItem
                question={t('dc-is-there-a-fee-for-death-certificate-registration')}
                answer="Registration of death certificate is free of charge, pursuant to Section 6 of P.D. No. 651. However, you need to pay for the Burial Permit (₱50.00) or Transfer Permit (₱100.00)."
              />
              <FaqItem
                question={t('dc-what-is-the-deadline-for-registering-a-death')}
                answer="The death certificate must be registered within 30 calendar days from the date of death. After this period, it will be considered delayed registration and will require additional documents."
              />
              <FaqItem
                question={t('dc-what-is-the-difference-between-burial-permit-and')}
                answer="A Burial Permit (₱50.00) is required if the deceased will be buried in any cemetery in Mati. A Transfer Permit (₱100.00) is required if the remains will be transferred to another municipality for burial."
              />
              <FaqItem
                question={t('dc-who-can-be-the-informant-for-death-registration')}
                answer="The informant is usually a family member or relative of the deceased who has knowledge of the facts of death. For hospital deaths, the attending physician provides the medical information."
              />
              <FaqItem
                question={t('dc-how-long-does-the-registration-process-take')}
                answer="For death in hospital/clinic: approximately 1 hour and 38 minutes. For death at home: approximately 1 hour and 35 minutes. This includes time for embalmer certification and MHO review."
              />
            </div>

            {/* Right column (sidebar) */}
            <div>
              <div className={`${cardCls} mb-2.5`}>
                <h4 className={cardH4Cls}>
                  <Building2 className="size-4 text-primary" aria-hidden="true" />
                  {t('dc-office-information')}
                </h4>
                <p className="mb-1.5 text-xs text-muted-foreground">
                  <strong className="text-foreground">{t('dc-local-civil-registrar')}</strong>
                </p>
                <p className="mb-1.5 text-xs text-muted-foreground">
                  {t('dc-municipal-hall-2nd-floor-mati-nueva-vizcaya')}
                </p>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="size-3 text-primary" aria-hidden="true" /> (087) 326-5001
                </p>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3 text-primary" aria-hidden="true" /> Mon-Fri: 8AM - 5PM
                </p>
              </div>

              <div className={`${cardCls} mb-2.5`}>
                <h4 className={cardH4Cls}>
                  <Users className="size-4 text-primary" aria-hidden="true" />
                  {t('dc-personnel')}
                </h4>
                <ul className={reqListCls}>
                  <li className={reqItemCls}>
                    <User className={reqIconCls} aria-hidden="true" />
                    <span>{t('dc-oliver-receiving-officer')}</span>
                  </li>
                  <li className={reqItemCls}>
                    <User className={reqIconCls} aria-hidden="true" />
                    <span>{t('dc-bernadette')}</span>
                  </li>
                  <li className={reqItemCls}>
                    <User className={reqIconCls} aria-hidden="true" />
                    <span>Juvy</span>
                  </li>
                  <li className={reqItemCls}>
                    <User className={reqIconCls} aria-hidden="true" />
                    <span>{t('dc-edgar-mc')}</span>
                  </li>
                </ul>
              </div>

              <div className={`${cardCls} mb-2.5`}>
                <h4 className={cardH4Cls}>
                  <Coins className="size-4 text-primary" aria-hidden="true" />
                  {t('dc-fee-summary')}
                </h4>
                <ul className={reqListCls}>
                  <ReqItem>
                    Registration: <strong className="text-foreground">{t('dc-free')}</strong>
                  </ReqItem>
                  <ReqItem>
                    Burial Permit: <strong className="text-foreground">₱50.00</strong>
                  </ReqItem>
                  <ReqItem>
                    Transfer Permit: <strong className="text-foreground">₱100.00</strong>
                  </ReqItem>
                </ul>
              </div>

              <div className={`${cardCls} mb-2.5`}>
                <h4 className={cardH4Cls}>
                  <Link2 className="size-4 text-primary" aria-hidden="true" />
                  {t('dc-related-services')}
                </h4>
                <ul className={reqListCls}>
                  <li className={reqItemCls}>
                    <AppLink
                      to="/service-details/birth-certificate"
                      className="text-primary hover:underline"
                    >
                      {t('dc-birth-certificate')}
                    </AppLink>
                  </li>
                  <li className={reqItemCls}>
                    <AppLink
                      to="/service-details/marriage-certificate"
                      className="text-primary hover:underline"
                    >
                      {t('dc-marriage-certificate')}
                    </AppLink>
                  </li>
                  <li className={reqItemCls}>
                    <AppLink
                      to="/service-details/civil-registrar"
                      className="text-primary hover:underline"
                    >
                      {t('dc-civil-registrar-services')}
                    </AppLink>
                  </li>
                </ul>
              </div>

              <div className={`${cardCls} mb-2.5`}>
                <h4 className={cardH4Cls}>
                  <Info className="size-4 text-primary" aria-hidden="true" />
                  {t('dc-need-help')}
                </h4>
                <p className="mb-1.5 text-xs text-muted-foreground">
                  {t('dc-contact-us-for-assistance-with-this-service')}
                </p>
                <AppLink
                  to="/contact"
                  className="mt-2.5 block rounded-md bg-primary px-4 py-2.5 text-center font-medium text-white no-underline hover:bg-primary-dark"
                >
                  {t('dc-contact-us')}
                </AppLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Downloadable Resources */}
      <Section className="py-10">
        <Container>
          <SectionTitle className="mb-1 text-lg">
            <Download className="size-4 text-primary" aria-hidden="true" />
            {t('dc-downloadable-resources')}
          </SectionTitle>
          <SectionSubtitle>{t('dc-forms-and-documents-for-death-certificate')}</SectionSubtitle>
          <div className={cardCls}>
            <ul className={reqListCls}>
              <li className={reqItemCls}>
                <FileText className={reqIconCls} aria-hidden="true" />
                <a
                  href="https://mati.gov.ph/wp-content/uploads/2021/10/Death-Certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('dc-certificate-of-death-form')}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
