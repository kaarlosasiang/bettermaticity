import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Building2,
  MapPin,
  Clock,
  CalendarCheck,
  LayoutGrid,
  UserPlus,
  FileX,
  Heart,
  Files,
  SquarePen,
  TriangleAlert,
  CircleCheck,
  Download,
  UserX,
  Globe,
  Pencil,
  IdCard,
  VenusAndMars,
  Users,
  Info,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

export default function MunicipalCivilRegistrar() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('birth');

  // Legacy .fee-tag: green fee text.
  const FeeTag = ({ children }: { children: ReactNode }) => (
    <span className="font-semibold text-brand-success">{children}</span>
  );

  // Legacy .step-badge: small square number chip.
  const StepBadge = ({ n }: { n: number }) => (
    <span className="inline-flex size-5 items-center justify-center rounded bg-primary text-[0.625rem] font-bold text-primary-foreground">
      {n}
    </span>
  );

  // Legacy .personnel-tag: primary-tinted pill.
  const PersonnelTag = ({ children }: { children: ReactNode }) => (
    <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[0.625rem] font-medium text-primary">
      {children}
    </span>
  );

  // Legacy .req-box.
  const ReqBox = ({
    icon,
    title,
    items,
    className,
  }: {
    icon: ReactNode;
    title: ReactNode;
    items: ReactNode[];
    className?: string;
  }) => (
    <div className={`rounded-lg border border-border bg-card p-3.5 ${className ?? ''}`}>
      <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <span className="text-primary">{icon}</span>
        <span>{title}</span>
      </h4>
      <ul className="m-0 list-none p-0">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-1.5 py-1 text-xs text-foreground">
            <CircleCheck className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  // Legacy .fee-table.
  const FeeTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
    <div className="mt-3.5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-primary/5 text-foreground">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-[0.6875rem] font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-border">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Legacy .process-table.
  const ProcessTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2.5 text-[0.6875rem] font-semibold tracking-wide whitespace-nowrap uppercase"
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

  // Legacy .section-header for a service block.
  const SectionHead = ({ icon, title, desc }: { icon: ReactNode; title: ReactNode; desc: ReactNode }) => (
    <div className="mb-5">
      <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
        <span className="text-primary">{icon}</span>
        <span>{title}</span>
      </h2>
      <p className="m-0 text-[0.8125rem] text-muted-foreground">{desc}</p>
    </div>
  );

  // Legacy .download-resource.
  const DownloadResource = ({
    href,
    label,
    sub,
  }: {
    href: string;
    label: ReactNode;
    sub: ReactNode;
  }) => (
    <div className="mt-3.5 flex items-center gap-2.5 rounded-lg bg-primary/[0.04] px-3.5 py-3">
      <FileText className="size-5 text-primary" aria-hidden="true" />
      <div className="flex-1">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.8125rem] font-semibold text-primary no-underline hover:underline"
        >
          {label}
        </a>
        <p className="m-0 mt-0.5 text-[0.6875rem] text-muted-foreground">{sub}</p>
      </div>
      <Download className="size-4 text-muted-foreground" aria-hidden="true" />
    </div>
  );

  const svcIcon = (I: LucideIcon) => <I className="size-4" aria-hidden="true" />;

  const tabs: [string, string, LucideIcon][] = [
    ['birth', 'mcr-birth-registration', UserPlus],
    ['death', 'mcr-death-registration', FileX],
    ['marriage', 'mcr-marriage-registration', Heart],
    ['copies', 'mcr-certified-true-copies', Files],
    ['corrections', 'mcr-corrections-annotations', SquarePen],
  ];

  return (
    <>
      <Seo
        title="City Civil Registrar's Office"
        description="City Civil Registrar's Office - Birth, death, marriage registration, and certified true copies of civil registry documents in Mati, Davao Oriental."
        canonicalPath="/service-details/municipal-civil-registrar"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('mcr-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('mcr-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/certificates" className="hover:text-primary">
            {t('mcr-certificates')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">City Civil Registrar's Office</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <FileText className="size-4" aria-hidden="true" />
            {t('mcr-civil-registry')}
          </>
        }
        title={t('mcr-municipal-civil-registrars-office')}
        description={t('mcr-birth-death-marriage-registration-and-certified')}
      />

      {/* Quick Stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Building2 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h4 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mcr-office')}
              </h4>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mcr-civil-registrar')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h4 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mcr-location')}
              </h4>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mcr-municipal-hall-2f')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h4 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mcr-hours')}
              </h4>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">{t('mcr-8am-5pm')}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <CalendarCheck className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h4 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mcr-days')}
              </h4>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">Monday - Friday</p>
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
              <span>{t('mcr-civil-registry-services')}</span>
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('mcr-select-a-service-to-view-the-detailed-process-and')}
            </p>
          </div>

          <div className="mb-5 flex flex-col flex-wrap justify-center gap-2 sm:flex-row">
            {tabs.map(([id, key, Icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`inline-flex items-center justify-center gap-1.5 rounded-md border px-4 py-2 text-xs font-semibold transition-colors ${
                  activeTab === id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary'
                }`}
              >
                <Icon className="size-4" aria-hidden="true" /> {t(key)}
              </button>
            ))}
          </div>

          {/* Birth Registration */}
          {activeTab === 'birth' && (
            <div>
              <SectionHead
                icon={svcIcon(UserPlus)}
                title={t('mcr-registration-of-live-birth')}
                desc={t('mcr-registration-of-birth-for-children-born-in-mati')}
              />
              <div className="mb-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <ReqBox
                  icon={svcIcon(Clock)}
                  title={t('mcr-timely-registration-within-30-days')}
                  items={[
                    t('mcr-certificate-of-live-birth-4-copies'),
                    t('mcr-affidavit-of-acknowledgmentadmission-of-paternity'),
                    t('mcr-marriage-certificate-of-parents-if-legitimate'),
                    t('mcr-valid-ids-of-parents'),
                  ]}
                />
                <ReqBox
                  icon={svcIcon(TriangleAlert)}
                  title={t('mcr-delayed-registration-after-30-days')}
                  items={[
                    t('mcr-certificate-of-live-birth-4-copies'),
                    t('mcr-negative-certification-from-psa'),
                    t('mcr-affidavit-of-delayed-registration'),
                    t('mcr-two-2-documentary-evidences'),
                    t('mcr-valid-ids-of-parents-and-informant'),
                  ]}
                />
              </div>
              <FeeTable
                headers={[t('mcr-service'), t('mcr-fee'), t('mcr-processing-time')]}
                rows={[
                  [t('mcr-timely-registration'), <FeeTag>FREE</FeeTag>, t('mcr-1530-minutes')],
                  [
                    t('mcr-delayed-registration'),
                    <FeeTag>₱100.00</FeeTag>,
                    t('mcr-12-weeks-posting-required'),
                  ],
                ]}
              />
            </div>
          )}

          {/* Death Registration */}
          {activeTab === 'death' && (
            <div>
              <SectionHead
                icon={svcIcon(FileX)}
                title={t('mcr-registration-of-death')}
                desc={t('mcr-registration-of-death-for-persons-who-died-in')}
              />
              <div className="mb-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <ReqBox
                  icon={svcIcon(Clock)}
                  title={t('mcr-timely-registration-within-30-days')}
                  items={[
                    t('mcr-certificate-of-death-4-copies'),
                    t('mcr-medical-certificate-if-attended-by-physician'),
                    t('mcr-affidavit-of-death-if-unattended'),
                    t('mcr-valid-id-of-informant'),
                  ]}
                />
                <ReqBox
                  icon={svcIcon(TriangleAlert)}
                  title={t('mcr-delayed-registration-after-30-days')}
                  items={[
                    t('mcr-certificate-of-death-4-copies'),
                    t('mcr-negative-certification-from-psa'),
                    t('mcr-affidavit-of-delayed-registration'),
                    t('mcr-burialcremation-permit'),
                    t('mcr-two-2-documentary-evidences'),
                  ]}
                />
              </div>
              <FeeTable
                headers={[t('mcr-service'), t('mcr-fee'), t('mcr-processing-time')]}
                rows={[
                  [t('mcr-timely-registration'), <FeeTag>FREE</FeeTag>, t('mcr-1530-minutes')],
                  [
                    t('mcr-delayed-registration'),
                    <FeeTag>₱100.00</FeeTag>,
                    t('mcr-12-weeks-posting-required'),
                  ],
                  [t('mcr-burial-permit'), <FeeTag>₱50.00</FeeTag>, t('mcr-same-day')],
                ]}
              />
              <DownloadResource
                href="https://mati.gov.ph/wp-content/uploads/2021/10/Death-Certificate.pdf"
                label={t('mcr-certificate-of-death-form')}
                sub="Download the official death certificate form"
              />
            </div>
          )}

          {/* Marriage Registration */}
          {activeTab === 'marriage' && (
            <div>
              <SectionHead
                icon={svcIcon(Heart)}
                title={t('mcr-registration-of-marriage')}
                desc={t('mcr-marriage-license-application-and-registration-of')}
              />
              <ReqBox
                className="mb-3.5"
                icon={svcIcon(FileText)}
                title={t('mcr-marriage-license-requirements')}
                items={[
                  t('mcr-application-for-marriage-license'),
                  t('mcr-certificate-of-no-marriage-cenomar-from-psa'),
                  t('mcr-birth-certificate-psa-copy'),
                  t('mcr-certificate-of-attendance-premarriage-counseling'),
                  t('mcr-community-tax-certificate-cedula'),
                  t('mcr-valid-ids-of-both-parties'),
                  t('mcr-parental-consent-if-1821-years-old'),
                  t('mcr-parental-advice-if-2225-years-old'),
                  t('mcr-1x1-id-photos-4-copies-each'),
                ]}
              />
              <div className="mb-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <ReqBox
                  icon={svcIcon(UserX)}
                  title={t('mcr-if-previously-married')}
                  items={[
                    t('mcr-death-certificate-of-former-spouse-or'),
                    t('mcr-court-decree-of-annulmentnullity'),
                    t('mcr-certificate-of-finality'),
                  ]}
                />
                <ReqBox
                  icon={svcIcon(Globe)}
                  title={t('mcr-if-foreign-national')}
                  items={[
                    t('mcr-legal-capacity-to-contract-marriage-from-embassy'),
                    t('mcr-valid-passport'),
                    t('mcr-birth-certificate-authenticated'),
                  ]}
                />
              </div>
              <FeeTable
                headers={[t('mcr-service'), t('mcr-fee'), t('mcr-processing-time')]}
                rows={[
                  [
                    t('mcr-marriage-license'),
                    <FeeTag>₱300.00</FeeTag>,
                    t('mcr-10-days-posting-period'),
                  ],
                  [
                    t('mcr-marriage-certificate-registration'),
                    <FeeTag>FREE</FeeTag>,
                    t('mcr-1530-minutes'),
                  ],
                  [
                    t('mcr-delayed-marriage-registration'),
                    <FeeTag>₱100.00</FeeTag>,
                    t('mcr-12-weeks'),
                  ],
                ]}
              />
              <DownloadResource
                href="https://mati.gov.ph/wp-content/uploads/2021/10/Application-for-Marriage-License.pdf"
                label={t('mcr-application-for-marriage-license')}
                sub={t('mcr-download-the-marriage-license-application-form')}
              />
            </div>
          )}

          {/* Certified True Copies */}
          {activeTab === 'copies' && (
            <div>
              <SectionHead
                icon={svcIcon(Files)}
                title={t('mcr-issuance-of-certified-true-copies')}
                desc={t('mcr-request-for-certified-true-copies-of-civil')}
              />
              <ProcessTable
                headers={[
                  t('mcr-step'),
                  t('mcr-activity'),
                  t('mcr-requirements'),
                  t('mcr-duration'),
                  t('mcr-personnel'),
                ]}
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('mcr-fill-out-request-form-and-submit-requirements'),
                    t('mcr-valid-id-authorization-letter-if-representative'),
                    <span className="text-[0.6875rem] text-muted-foreground">{t('mcr-5-minutes')}</span>,
                    <PersonnelTag>{t('mcr-registration-officer')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('mcr-search-and-retrieve-record-from-registry-books'),
                    '—',
                    <span className="text-[0.6875rem] text-muted-foreground">{t('mcr-510-minutes')}</span>,
                    <PersonnelTag>{t('mcr-registration-officer')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('mcr-pay-the-required-fee-at-treasurers-office'),
                    t('mcr-order-of-payment'),
                    <span className="text-[0.6875rem] text-muted-foreground">{t('mcr-5-minutes')}</span>,
                    <PersonnelTag>{t('mcr-treasurers-office')}</PersonnelTag>,
                  ],
                  [
                    <StepBadge n={4} />,
                    t('mcr-present-official-receipt-and-claim-document'),
                    t('mcr-official-receipt'),
                    <span className="text-[0.6875rem] text-muted-foreground">{t('mcr-510-minutes')}</span>,
                    <PersonnelTag>{t('mcr-civil-registrar')}</PersonnelTag>,
                  ],
                ]}
              />
              <FeeTable
                headers={[t('mcr-document-type'), t('mcr-fee-per-copy')]}
                rows={[
                  [t('mcr-birth-certificate'), <FeeTag>₱150.00</FeeTag>],
                  [t('mcr-death-certificate'), <FeeTag>₱150.00</FeeTag>],
                  [t('mcr-marriage-certificate'), <FeeTag>₱150.00</FeeTag>],
                  [t('mcr-certificate-of-no-record'), <FeeTag>₱100.00</FeeTag>],
                ]}
              />
            </div>
          )}

          {/* Corrections & Annotations */}
          {activeTab === 'corrections' && (
            <div>
              <SectionHead
                icon={svcIcon(SquarePen)}
                title={t('mcr-corrections-and-annotations')}
                desc={t('mcr-petition-for-correction-of-clerical-errors-and')}
              />
              <div className="mb-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <ReqBox
                  icon={svcIcon(Pencil)}
                  title={t('mcr-ra-9048-clerical-error-correction')}
                  items={[
                    t('mcr-petition-form'),
                    t('mcr-psa-copy-of-document-to-be-corrected'),
                    t('mcr-at-least-two-2-public-documents-showing-correct'),
                    t('mcr-nbipolice-clearance'),
                    t('mcr-valid-ids'),
                  ]}
                />
                <ReqBox
                  icon={svcIcon(IdCard)}
                  title={t('mcr-ra-9048-change-of-first-name')}
                  items={[
                    t('mcr-petition-form'),
                    t('mcr-psa-birth-certificate'),
                    t('mcr-newspaper-publication-3-consecutive-weeks'),
                    t('mcr-nbipolice-clearance'),
                    t('mcr-affidavit-of-publication'),
                  ]}
                />
              </div>
              <ReqBox
                className="mb-3.5"
                icon={svcIcon(VenusAndMars)}
                title={t('mcr-ra-10172-correction-of-sexday-month-of-birth')}
                items={[
                  t('mcr-petition-form'),
                  t('mcr-psa-birth-certificate'),
                  t('mcr-medical-certificate-for-sex-correction'),
                  t('mcr-at-least-four-4-public-documents-showing-correct'),
                  t('mcr-nbipolice-clearance'),
                  t('mcr-newspaper-publication'),
                ]}
              />
              <FeeTable
                headers={[t('mcr-service'), t('mcr-fee'), t('mcr-processing-time')]}
                rows={[
                  [
                    t('mcr-clerical-error-correction-ra-9048'),
                    <FeeTag>₱1,000.00</FeeTag>,
                    t('mcr-23-months'),
                  ],
                  [
                    t('mcr-change-of-first-name-ra-9048'),
                    <FeeTag>₱3,000.00</FeeTag>,
                    t('mcr-34-months'),
                  ],
                  [
                    t('mcr-sexdob-correction-ra-10172'),
                    <FeeTag>₱3,000.00</FeeTag>,
                    t('mcr-34-months'),
                  ],
                  [
                    t('mcr-annotation-of-court-order'),
                    <FeeTag>₱500.00</FeeTag>,
                    t('mcr-12-weeks'),
                  ],
                ]}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* Staff Section */}
      <Section compact>
        <Container>
          <div className="mb-5">
            <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Users className="size-4 text-primary" aria-hidden="true" />
              <span>{t('mcr-office-personnel')}</span>
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('mcr-key-personnel-handling-civil-registry-services')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('mcr-municipal-civil-registrar')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">{t('mcr-office-head')}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('mcr-registration-officer-i')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mcr-birthdeath-registration')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h4 className="mb-0.5 text-xs font-semibold text-foreground">
                {t('mcr-registration-officer-ii')}
              </h4>
              <p className="m-0 text-[0.6875rem] text-muted-foreground">
                {t('mcr-marriagecorrections')}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <ReqBox
              icon={svcIcon(Building2)}
              title={t('mcr-office-information')}
              items={[
                t('mcr-municipal-civil-registrars-office-2nd-floor'),
                'Monday - Friday: 8:00 AM - 5:00 PM',
                '(087) 326-5001',
              ]}
            />
            <ReqBox
              icon={svcIcon(Info)}
              title={t('mcr-important-notes')}
              items={[
                t('mcr-register-births-and-deaths-within-30-days-to'),
                t('mcr-marriage-license-is-valid-for-120-days-from'),
                t('mcr-bring-original-documents-for-verification'),
                t('mcr-representatives-must-have-authorization-letter'),
              ]}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
