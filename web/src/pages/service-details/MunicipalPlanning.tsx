import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  MapPin,
  Clock,
  CalendarCheck,
  Map,
  FileText,
  Info,
  CircleCheck,
  Banknote,
  Calendar,
  User,
  LayoutGrid,
  FileCheck,
  Signpost,
  ClipboardList,
  House,
  Receipt,
  Phone,
  Lightbulb,
  Check,
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

type Item = string | { lit: string };

const quickStats: { Icon: LucideIcon; label: string; value: Item }[] = [
  { Icon: Building2, label: 'mpdo-office', value: { lit: 'MPDO' } },
  { Icon: MapPin, label: 'mpdo-location', value: 'mpdo-municipal-hall' },
  { Icon: Clock, label: 'mpdo-hours', value: 'mpdo-8am-5pm' },
  { Icon: CalendarCheck, label: 'mpdo-processing', value: { lit: '1-3 Days' } },
];

// Detail rows: bold i18n label + verbatim literal value (values carry no data-i18n).
type DetailRow = { Icon: LucideIcon; label: string; value: string };

const zoningReqs: string[] = [
  'mpdo-duly-accomplished-application-form',
  'mpdo-photocopy-of-tax-declarationtitle',
  'mpdo-photocopy-of-latest-real-property-tax-receipt',
  'mpdo-vicinity-maplocation-plan',
  'mpdo-barangay-clearance',
  'mpdo-contract-of-lease-if-applicable',
];
const zoningDetails: DetailRow[] = [
  { Icon: Banknote, label: 'mpdo-fee', value: '₱100.00 - ₱500.00 (based on floor area)' },
  { Icon: Clock, label: 'mpdo-processing', value: '1-2 working days' },
  { Icon: Calendar, label: 'mpdo-validity', value: '1 year' },
  { Icon: User, label: 'mpdo-who-can-apply', value: 'Property owner or authorized representative' },
];

const locationalReqs: string[] = [
  'mpdo-duly-accomplished-application-form',
  'mpdo-certified-true-copy-of-land-titletax-declaration',
  'mpdo-latest-real-property-tax-receipt',
  'mpdo-site-development-plan',
  'mpdo-building-plans-and-specifications',
  'mpdo-lot-plan-with-technical-description',
  'mpdo-barangay-clearance',
  'mpdo-environmental-compliance-certificate-if-required',
];
const locationalDetails: DetailRow[] = [
  { Icon: Banknote, label: 'mpdo-fee', value: 'Based on project cost and floor area' },
  { Icon: Clock, label: 'mpdo-processing', value: '2-3 working days' },
  { Icon: Calendar, label: 'mpdo-validity', value: 'Duration of construction' },
  { Icon: Building2, label: 'mpdo-for', value: 'New construction, renovation, expansion' },
];

const otherServices: {
  Icon: LucideIcon;
  title: string;
  desc: Item;
  meta: [Item, Item];
}[] = [
  {
    Icon: FileCheck,
    title: 'mpdo-development-permit',
    desc: 'mpdo-for-subdivision-land-conversion-and-development',
    meta: ['mpdo-based-on-area', 'mpdo-510-days'],
  },
  {
    Icon: Signpost,
    title: 'mpdo-land-use-reclassification',
    desc: 'mpdo-change-of-land-classification-from-agricultural',
    meta: ['mpdo-per-application', 'mpdo-30-days'],
  },
  {
    Icon: ClipboardList,
    title: 'mpdo-project-monitoring',
    desc: { lit: 'Monitoring of ongoing development projects in the municipality' },
    meta: ['mpdo-free', 'mpdo-ongoing'],
  },
  {
    Icon: Map,
    title: 'mpdo-clup-certification',
    desc: 'mpdo-certification-on-comprehensive-land-use-plan',
    meta: [{ lit: '₱100.00' }, 'mpdo-12-days'],
  },
  {
    Icon: House,
    title: 'mpdo-building-line-verification',
    desc: 'mpdo-verification-of-setback-requirements-and-building',
    meta: [{ lit: '₱50.00' }, 'mpdo-same-day'],
  },
  {
    Icon: FileText,
    title: 'mpdo-planning-certification',
    desc: 'mpdo-various-certifications-related-to-land-use-and',
    meta: [{ lit: '₱50.00 - ₱100.00' }, 'mpdo-12-days'],
  },
];

const feeCards: { title: string; amount: string; note: string }[] = [
  {
    title: 'mpdo-zoning-clearance-residential',
    amount: '₱100.00 - ₱200.00',
    note: 'mpdo-based-on-floor-area',
  },
  {
    title: 'mpdo-zoning-clearance-commercial',
    amount: '₱200.00 - ₱500.00',
    note: 'mpdo-based-on-floor-area-and-type',
  },
  { title: 'mpdo-locational-clearance', amount: '₱500.00+', note: 'mpdo-based-on-project-cost' },
  { title: 'mpdo-certifications', amount: '₱50.00 - ₱100.00', note: 'mpdo-per-document' },
];

const officeInfo: { Icon: LucideIcon; value: Item }[] = [
  { Icon: MapPin, value: 'mpdo-2nd-floor-municipal-hall-mati-nueva-vizcaya' },
  { Icon: Clock, value: { lit: 'Monday - Friday: 8:00 AM - 5:00 PM' } },
  { Icon: Phone, value: { lit: '(087) 326-5001' } },
];

const notes: string[] = [
  'mpdo-secure-zoning-clearance-before-applying-for',
  'mpdo-locational-clearance-is-required-before-building',
  'mpdo-bring-original-documents-for-verification',
];

const downloads: { href: string; key: string }[] = [
  {
    href: 'https://mati.gov.ph/wp-content/uploads/2025/10/APPLICATION-FOR-FINAL-APPROVAL-DEVELOPMENT-PERMIT-OF-RESIDENTIAL-SUBDIVISION-PROJECT.pdf',
    key: 'mpdo-application-for-final-approval-development-permit',
  },
  {
    href: 'https://mati.gov.ph/wp-content/uploads/2025/10/APPLICATION-FOR-LOCATIONAL-CLEARANCE-CERTIFICATE-OF-ZONING-COMPLIANCE.pdf',
    key: 'mpdo-application-for-locational-clearance-certificate',
  },
  {
    href: 'https://mati.gov.ph/wp-content/uploads/2025/10/APPLICATION-FOR-PRELIMINARY-APPROVAL-AND-LOCATIONAL-CLEARANCE-FOR-RESIDENTIAL-SUBDIVISION-PROJECT.pdf',
    key: 'mpdo-application-for-preliminary-approval-and',
  },
  {
    href: 'https://mati.gov.ph/wp-content/uploads/2025/10/APPLICATION-FORM-FOR-ZONING-CERTIFICATION.pdf',
    key: 'mpdo-application-form-for-zoning-certification',
  },
];

export default function MunicipalPlanning() {
  const { t } = useLanguage();
  const text = (it: Item) => (typeof it === 'string' ? t(it) : it.lit);

  const ReqBox = ({ title, Icon, items }: { title: string; Icon: LucideIcon; items: string[] }) => (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {t(title)}
      </h3>
      <ul className="m-0 list-none p-0">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-start gap-1.5 py-1 text-[0.8125rem] text-muted-foreground"
          >
            <CircleCheck className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
            <span>{t(it)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const DetailBox = ({ rows }: { rows: DetailRow[] }) => (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Info className="size-4 text-primary" aria-hidden="true" />
        {t('mpdo-details')}
      </h3>
      <ul className="m-0 list-none p-0">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex items-start gap-1.5 py-1 text-[0.8125rem] text-muted-foreground"
          >
            <r.Icon className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <strong className="text-foreground">{t(r.label)}:</strong> {r.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Seo
        title={t('mpdo-municipal-planning-and-development-office')}
        description="Zoning clearance, locational clearance, and development planning services from the City Planning and Development Office of Mati, Davao Oriental — requirements, fees, and downloadable forms."
        canonicalPath="/service-details/municipal-planning"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('mpdo-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('mpdo-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/infrastructure" className="hover:text-primary">
            {t('mpdo-infrastructure')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">City Planning &amp; Development</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Building2 className="size-4" aria-hidden="true" />
            {t('mpdo-planning')}
          </>
        }
        title={t('mpdo-municipal-planning-and-development-office')}
        description={t('mpdo-zoning-clearance-locational-clearance-and')}
      />

      {/* Quick stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            {quickStats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-card p-3 text-center">
                <s.Icon className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
                <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                  {t(s.label)}
                </h3>
                <p className="m-0 text-[0.8125rem] font-semibold text-foreground">{text(s.value)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Zoning clearance */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <Map className="size-5 text-primary" aria-hidden="true" />
            {t('mpdo-issuance-of-zoning-clearancecertification')}
          </SectionTitle>
          <SectionSubtitle>{t('mpdo-required-for-business-permit-applications-and')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <ReqBox title="mpdo-requirements" Icon={FileText} items={zoningReqs} />
            <DetailBox rows={zoningDetails} />
          </div>
        </Container>
      </Section>

      {/* Locational clearance */}
      <Section compact>
        <Container>
          <SectionTitle>
            <MapPin className="size-5 text-primary" aria-hidden="true" />
            {t('mpdo-issuance-of-locational-clearance')}
          </SectionTitle>
          <SectionSubtitle>{t('mpdo-required-for-building-permit-applications-and')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <ReqBox title="mpdo-requirements" Icon={FileText} items={locationalReqs} />
            <DetailBox rows={locationalDetails} />
          </div>
        </Container>
      </Section>

      {/* Other services */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <LayoutGrid className="size-5 text-primary" aria-hidden="true" />
            {t('mpdo-other-mpdo-services')}
          </SectionTitle>
          <SectionSubtitle>{t('mpdo-additional-planning-and-development-services')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <div key={s.title} className="flex flex-col rounded-lg border border-border bg-card p-4">
                <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <s.Icon className="size-4 text-primary" aria-hidden="true" />
                  {t(s.title)}
                </h3>
                <p className="mb-3 grow text-[0.8125rem] text-muted-foreground">{text(s.desc)}</p>
                <div className="flex items-center justify-between gap-2 border-t border-border pt-2.5 text-[0.6875rem] font-medium text-primary">
                  <span>{text(s.meta[0])}</span>
                  <span>{text(s.meta[1])}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Fee schedule */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Receipt className="size-5 text-primary" aria-hidden="true" />
            {t('mpdo-fee-schedule')}
          </SectionTitle>
          <SectionSubtitle>{t('mpdo-standard-fees-for-mpdo-services')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {feeCards.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-border bg-card p-4 text-center"
              >
                <h3 className="mb-2 text-[0.8125rem] font-semibold text-foreground">{t(f.title)}</h3>
                <div className="mb-1 text-lg font-bold text-primary">{f.amount}</div>
                <p className="m-0 text-xs text-muted-foreground">{t(f.note)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact + notes */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('mpdo-office-information')}
              </h3>
              <ul className="m-0 list-none p-0">
                {officeInfo.map((o, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-1.5 py-1 text-[0.8125rem] text-muted-foreground"
                  >
                    <o.Icon className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{text(o.value)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Lightbulb className="size-4 text-primary" aria-hidden="true" />
                {t('mpdo-important-notes')}
              </h3>
              <ul className="m-0 list-none p-0">
                {notes.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-1.5 py-1 text-[0.8125rem] text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-brand-success" aria-hidden="true" />
                    <span>{t(n)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Downloadable resources */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Download className="size-5 text-primary" aria-hidden="true" />
            {t('mpdo-downloadable-resources')}
          </SectionTitle>
          <SectionSubtitle>{t('mpdo-application-forms-and-documents-for-mpdo-services')}</SectionSubtitle>
          <div className="rounded-lg border border-border bg-card p-4">
            <ul className="m-0 list-none p-0">
              {downloads.map((d) => (
                <li key={d.href} className="flex items-start gap-2 py-1.5 text-[0.8125rem]">
                  <FileText className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    {t(d.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
