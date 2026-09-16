import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Clock,
  CalendarCheck,
  Phone,
  UserPlus,
  Heart,
  FileX,
  FileCheck,
  SquarePen,
  UserCheck,
  History,
  Banknote,
  TriangleAlert,
  Info,
  CircleCheck,
  Building2,
  IdCard,
  MapPin,
  Mail,
  Link2,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

export default function CivilRegistrar() {
  const { t } = useLanguage();

  // Legacy .service-info-box: centered card with primary icon, uppercase label, value, small subtext.
  const InfoBox = ({
    icon,
    label,
    value,
    sub,
  }: {
    icon: ReactNode;
    label: ReactNode;
    value: ReactNode;
    sub: ReactNode;
  }) => (
    <div className="rounded-xl border border-border bg-card p-5 text-center">
      <div className="mb-2 flex justify-center text-primary">{icon}</div>
      <h4 className="mb-1 text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </h4>
      <p className="m-0 text-base font-semibold text-foreground">{value}</p>
      <small className="text-[0.7rem] text-muted-foreground">{sub}</small>
    </div>
  );

  // Legacy .fee-badge: green pill.
  const FeeBadge = ({ children }: { children: ReactNode }) => (
    <span className="inline-block rounded bg-brand-success/10 px-2.5 py-1 text-xs font-semibold text-brand-success">
      {children}
    </span>
  );

  // Legacy .fee-table, styled like GeneralServices/OrdinanceFramework DataTable.
  const FeeTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-muted text-foreground">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2 text-xs font-semibold tracking-wide whitespace-nowrap uppercase"
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

  // Legacy .requirements-grid + .requirement-item.
  const ReqGrid = ({ items }: { items: ReactNode[] }) => (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5 text-sm text-foreground"
        >
          <CircleCheck className="size-4 shrink-0 text-brand-success" aria-hidden="true" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );

  // Legacy .section-header-card: colored gradient header with icon.
  const SectionHead = ({
    gradient,
    icon,
    title,
    desc,
  }: {
    gradient: string;
    icon: ReactNode;
    title: ReactNode;
    desc: ReactNode;
  }) => (
    <div
      className="mb-4 flex items-center gap-4 rounded-xl p-5 text-white"
      style={{ backgroundImage: gradient }}
    >
      <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl">
        {icon}
      </div>
      <div>
        <h2 className="m-0 mb-1 text-xl font-semibold text-white">{title}</h2>
        <p className="m-0 text-sm text-white/90">{desc}</p>
      </div>
    </div>
  );

  const infoIcon = (I: LucideIcon) => <I className="size-6" aria-hidden="true" />;

  return (
    <>
      <Seo
        title={t('cr-municipal-civil-registrars-office')}
        description="City Civil Registrar's Office services in Mati, Davao Oriental. Birth certificates, marriage certificates, death certificates, and other vital records services."
        canonicalPath="/service-details/civil-registrar"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('cr-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('cr-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/certificates" className="hover:text-primary">
            {t('cr-certificates')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">Civil Registrar's Office</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <FileText className="size-4" aria-hidden="true" />
            {t('cr-local-civil-registrar')}
          </>
        }
        title={t('cr-municipal-civil-registrars-office')}
        description={t('cr-birth-marriage-death-certificates-and-vital')}
      />

      {/* Quick stats + nav */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <FileText className="mx-auto mb-1 size-5 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('cr-services')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('cr-8-services')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Clock className="mx-auto mb-1 size-5 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('cr-office-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">{t('cr-8am-5pm')}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <CalendarCheck className="mx-auto mb-1 size-5 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('cr-availability')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">Mon - Fri</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Phone className="mx-auto mb-1 size-5 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('cr-hotline')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">(087) 326-5000</p>
            </div>
          </div>

          <nav
            className="mt-3 flex flex-wrap justify-center gap-2"
            aria-label="Civil Registrar Services Navigation"
          >
            {(
              [
                ['#birth', UserPlus, 'cr-birth-certificate'],
                ['#marriage', Heart, 'cr-marriage-certificate'],
                ['#death', FileX, 'cr-death-certificate'],
                ['#cenomar', FileCheck, 'cr-cenomar'],
                ['#correction', SquarePen, 'cr-corrections'],
                ['#legitimation', UserCheck, 'cr-legitimation'],
                ['#delayed', History, 'cr-delayed-registration'],
              ] as [string, LucideIcon, string][]
            ).map(([href, Icon, key]) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" aria-hidden="true" /> {t(key)}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {/* Main + sidebar */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
            <div>
              {/* Birth Certificate */}
              <div id="birth" className="mb-10 scroll-mt-28">
                <SectionHead
                  gradient="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                  icon={infoIcon(UserPlus)}
                  title={t('cr-birth-certificate-services')}
                  desc={t('cr-issuance-of-certified-true-copies-and')}
                />
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
                    <InfoBox
                      icon={infoIcon(Clock)}
                      label={t('cr-processing-time')}
                      value={t('cr-1530-min')}
                      sub="For available records"
                    />
                    <InfoBox
                      icon={infoIcon(Banknote)}
                      label={t('cr-fee')}
                      value="₱150"
                      sub="Per copy"
                    />
                    <InfoBox
                      icon={infoIcon(UserCheck)}
                      label={t('cr-who-can-request')}
                      value={t('cr-ownerrelative')}
                      sub="With authorization"
                    />
                    <InfoBox
                      icon={infoIcon(CalendarCheck)}
                      label={t('cr-appointment')}
                      value={t('cr-walkin')}
                      sub="No appointment needed"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t('cr-about-birth-certificate-services')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('cr-the-local-civil-registrar-issues-certified-true')}
                    </p>

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-types-of-services')}
                    </h4>
                    <FeeTable
                      headers={[t('cr-service'), t('cr-fee'), t('cr-processing-time')]}
                      rows={[
                        [
                          t('cr-certified-true-copy-local'),
                          <FeeBadge>₱150</FeeBadge>,
                          t('cr-1530-minutes'),
                        ],
                        [
                          t('cr-copy-issuance-from-psa'),
                          <FeeBadge>₱365</FeeBadge>,
                          t('cr-35-working-days'),
                        ],
                        [
                          t('cr-authenticationverification'),
                          <FeeBadge>₱50</FeeBadge>,
                          t('cr-same-day'),
                        ],
                      ]}
                    />

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-requirements')}
                    </h4>
                    <ReqGrid
                      items={[
                        'Valid ID of Requestor',
                        'Authorization Letter (if representative)',
                        'ID of Document Owner',
                        'Request Form',
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Marriage Certificate */}
              <div id="marriage" className="mb-10 scroll-mt-28">
                <SectionHead
                  gradient="linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
                  icon={infoIcon(Heart)}
                  title={t('cr-marriage-certificate-services')}
                  desc={t('cr-issuance-of-marriage-certificates-and-marriage')}
                />
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
                    <InfoBox
                      icon={infoIcon(Clock)}
                      label={t('cr-processing-time')}
                      value={t('cr-1530-min')}
                      sub="For certificate copy"
                    />
                    <InfoBox
                      icon={infoIcon(Banknote)}
                      label={t('cr-fee')}
                      value="₱150"
                      sub="Per copy"
                    />
                    <InfoBox
                      icon={infoIcon(UserCheck)}
                      label={t('cr-who-can-request')}
                      value={t('cr-spouserelative')}
                      sub="With authorization"
                    />
                    <InfoBox
                      icon={infoIcon(CalendarCheck)}
                      label={t('cr-license-waiting')}
                      value={t('cr-10-days')}
                      sub="Posting period"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t('cr-about-marriage-certificate-services')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('cr-the-local-civil-registrar-provides')}
                    </p>

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-types-of-services')}
                    </h4>
                    <FeeTable
                      headers={[t('cr-service'), t('cr-fee'), t('cr-processing-time')]}
                      rows={[
                        [
                          t('cr-marriage-license-application'),
                          <FeeBadge>₱300</FeeBadge>,
                          t('cr-10-days-posting'),
                        ],
                        [
                          t('cr-certified-true-copy-local'),
                          <FeeBadge>₱150</FeeBadge>,
                          t('cr-1530-minutes'),
                        ],
                        [
                          t('cr-copy-issuance-from-psa'),
                          <FeeBadge>₱365</FeeBadge>,
                          t('cr-35-working-days'),
                        ],
                      ]}
                    />

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-marriage-license-requirements')}
                    </h4>
                    <ReqGrid
                      items={[
                        'Birth Certificate (PSA)',
                        'CENOMAR (PSA)',
                        'Valid IDs of Both Parties',
                        'Community Tax Certificate',
                        'Pre-Marriage Counseling Certificate',
                        'Parental Consent (if 18-21)',
                        'Parental Advice (if 22-25)',
                        '1x1 ID Photos (4 pcs each)',
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Death Certificate */}
              <div id="death" className="mb-10 scroll-mt-28">
                <SectionHead
                  gradient="linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"
                  icon={infoIcon(FileX)}
                  title={t('cr-death-certificate-services')}
                  desc={t('cr-registration-and-issuance-of-death-certificates')}
                />
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
                    <InfoBox
                      icon={infoIcon(Clock)}
                      label={t('cr-processing-time')}
                      value={t('cr-1530-min')}
                      sub="For available records"
                    />
                    <InfoBox
                      icon={infoIcon(Banknote)}
                      label={t('cr-fee')}
                      value="₱150"
                      sub="Per copy"
                    />
                    <InfoBox
                      icon={infoIcon(UserCheck)}
                      label={t('cr-who-can-request')}
                      value={t('cr-immediate-family')}
                      sub="Or authorized rep"
                    />
                    <InfoBox
                      icon={infoIcon(TriangleAlert)}
                      label={t('cr-registration')}
                      value={t('cr-within-30-days')}
                      sub="From death"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t('cr-about-death-certificate-services')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('cr-the-local-civil-registrar-handles-the')}
                    </p>

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-types-of-services')}
                    </h4>
                    <FeeTable
                      headers={[t('cr-service'), t('cr-fee'), t('cr-processing-time')]}
                      rows={[
                        [
                          t('cr-death-registration-timely'),
                          <FeeBadge>{t('cr-free')}</FeeBadge>,
                          t('cr-same-day'),
                        ],
                        [
                          t('cr-certified-true-copy-local'),
                          <FeeBadge>₱150</FeeBadge>,
                          t('cr-1530-minutes'),
                        ],
                        [
                          t('cr-copy-issuance-from-psa'),
                          <FeeBadge>₱365</FeeBadge>,
                          t('cr-35-working-days'),
                        ],
                      ]}
                    />

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-requirements-for-registration')}
                    </h4>
                    <ReqGrid
                      items={[
                        'Medical Certificate of Death',
                        'Valid ID of Informant',
                        'Burial/Transfer Permit',
                        "Embalmer's Affidavit",
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* CENOMAR */}
              <div id="cenomar" className="mb-10 scroll-mt-28">
                <SectionHead
                  gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                  icon={infoIcon(FileCheck)}
                  title={t('cr-certificate-of-no-marriage-cenomar')}
                  desc={t('cr-certification-of-no-marriage-record-on-file')}
                />
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
                    <InfoBox
                      icon={infoIcon(Clock)}
                      label={t('cr-processing-time')}
                      value={t('cr-35-days')}
                      sub="From PSA"
                    />
                    <InfoBox
                      icon={infoIcon(Banknote)}
                      label={t('cr-fee')}
                      value="₱420"
                      sub="PSA fee"
                    />
                    <InfoBox
                      icon={infoIcon(UserCheck)}
                      label={t('cr-who-can-request')}
                      value={t('cr-document-owner')}
                      sub="Or authorized rep"
                    />
                    <InfoBox
                      icon={infoIcon(Info)}
                      label={t('cr-validity')}
                      value={t('cr-6-months')}
                      sub="From issuance"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t('cr-about-cenomar')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('cr-the-certificate-of-no-marriage-record-cenomar-is')}
                    </p>

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-requirements')}
                    </h4>
                    <ReqGrid
                      items={[
                        'Valid ID of Requestor',
                        'PSA Birth Certificate',
                        'Authorization Letter (if representative)',
                        'ID of Document Owner',
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Corrections */}
              <div id="correction" className="mb-10 scroll-mt-28">
                <SectionHead
                  gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                  icon={infoIcon(SquarePen)}
                  title={t('cr-corrections-and-amendments')}
                  desc={t('cr-clerical-error-corrections-and-change-of-first')}
                />
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t('cr-about-corrections')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('cr-the-local-civil-registrar-processes-petitions-for')}
                    </p>

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-types-of-corrections')}
                    </h4>
                    <FeeTable
                      headers={[t('cr-type'), t('cr-filing-fee'), t('cr-processing-time')]}
                      rows={[
                        [
                          t('cr-clerical-error-correction-ra-9048'),
                          <FeeBadge>₱1,000</FeeBadge>,
                          t('cr-36-months'),
                        ],
                        [
                          t('cr-change-of-first-name-ra-9048'),
                          <FeeBadge>₱3,000</FeeBadge>,
                          t('cr-36-months'),
                        ],
                        [
                          t('cr-correction-of-daymonth-of-birth-ra-10172'),
                          <FeeBadge>₱3,000</FeeBadge>,
                          t('cr-36-months'),
                        ],
                        [
                          t('cr-correction-of-sex-ra-10172'),
                          <FeeBadge>₱3,000</FeeBadge>,
                          t('cr-36-months'),
                        ],
                      ]}
                    />

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-general-requirements')}
                    </h4>
                    <ReqGrid
                      items={[
                        'Petition Form',
                        'PSA Copy of Document',
                        'Supporting Documents',
                        'Valid IDs',
                        'Affidavit of Publication',
                        'NBI Clearance (for CFN)',
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Legitimation */}
              <div id="legitimation" className="mb-10 scroll-mt-28">
                <SectionHead
                  gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  icon={infoIcon(UserCheck)}
                  title={t('cr-legitimation')}
                  desc={t('cr-legal-process-to-legitimize-children-born-out-of')}
                />
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">About Legitimation</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('cr-legitimation-is-the-legal-process-by-which')}
                    </p>

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-requirements')}
                    </h4>
                    <ReqGrid
                      items={[
                        'Affidavit of Legitimation',
                        'Marriage Certificate of Parents (PSA)',
                        'Birth Certificate of Child (PSA)',
                        'Valid IDs of Parents',
                        'CENOMAR of Mother (before marriage)',
                      ]}
                    />

                    <h4 className="mt-5 text-sm font-semibold text-foreground">{t('cr-fees')}</h4>
                    <FeeTable
                      headers={[t('cr-service'), t('cr-fee')]}
                      rows={[[t('cr-legitimation-annotation'), <FeeBadge>₱500</FeeBadge>]]}
                    />
                  </div>
                </div>
              </div>

              {/* Delayed Registration */}
              <div id="delayed" className="mb-10 scroll-mt-28">
                <SectionHead
                  gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                  icon={infoIcon(History)}
                  title={t('cr-delayed-registration')}
                  desc={t('cr-late-registration-of-birth-marriage-or-death')}
                />
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {t('cr-about-delayed-registration')}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t('cr-delayed-registration-is-the-registration-of-vital')}
                    </p>

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-types-of-delayed-registration')}
                    </h4>
                    <FeeTable
                      headers={[t('cr-type'), t('cr-fee'), t('cr-processing-time')]}
                      rows={[
                        [
                          t('cr-delayed-birth-registration'),
                          <FeeBadge>₱500</FeeBadge>,
                          t('cr-12-weeks'),
                        ],
                        [
                          t('cr-delayed-marriage-registration'),
                          <FeeBadge>₱500</FeeBadge>,
                          t('cr-12-weeks'),
                        ],
                        [
                          t('cr-delayed-death-registration'),
                          <FeeBadge>₱500</FeeBadge>,
                          t('cr-12-weeks'),
                        ],
                      ]}
                    />

                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      {t('cr-requirements-for-delayed-birth-registration')}
                    </h4>
                    <ReqGrid
                      items={[
                        'Negative Certification from PSA',
                        'Baptismal Certificate',
                        'School Records',
                        'Affidavit of Two Disinterested Persons',
                        'Marriage Certificate of Parents',
                        'Valid IDs',
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
                  <Building2 className="size-4 text-primary" aria-hidden="true" />
                  {t('cr-civil-registrars-office')}
                </h3>
                <ul className="m-0 list-none space-y-3 p-0 text-sm">
                  <li className="flex gap-3 border-b border-border pb-3">
                    <IdCard className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('cr-municipal-civil-registrar')}</strong>
                      <span className="text-muted-foreground">{t('cr-local-civil-registrar')}</span>
                    </span>
                  </li>
                  <li className="flex gap-3 border-b border-border pb-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('cr-location')}</strong>
                      <span className="text-muted-foreground">
                        City Hall, Ground Floor
                        <br />
                        Mati, Davao Oriental 8200
                      </span>
                    </span>
                  </li>
                  <li className="flex gap-3 border-b border-border pb-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('cr-phone')}</strong>
                      <a href="tel:0873265000" className="text-muted-foreground hover:text-primary">
                        (087) 326-5000
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-3 border-b border-border pb-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('cr-email')}</strong>
                      <a
                        href="mailto:lcr@mati.gov.ph"
                        className="text-muted-foreground hover:text-primary"
                      >
                        {t('cr-lcrmatigovph')}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('cr-office-hours')}</strong>
                      <span className="text-muted-foreground">
                        Monday - Friday
                        <br />
                        8:00 AM - 5:00 PM
                      </span>
                    </span>
                  </li>
                </ul>

                <div className="mt-5 border-t border-border pt-4">
                  <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Link2 className="size-4 text-primary" aria-hidden="true" />
                    {t('cr-related-services')}
                  </h4>
                  <ul className="m-0 list-none space-y-2 p-0 text-sm">
                    <li>
                      <AppLink
                        to="/services/certificates"
                        className="text-primary hover:underline"
                      >
                        {t('cr-certificates-vital-records')}
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        to="/service-details/birth-certificate"
                        className="text-primary hover:underline"
                      >
                        {t('cr-birth-certificate-guide')}
                      </AppLink>
                    </li>
                    <li>
                      <AppLink to="/government" className="text-primary hover:underline">
                        {t('cr-government-offices')}
                      </AppLink>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
