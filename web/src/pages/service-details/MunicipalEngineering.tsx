import type { LucideIcon } from 'lucide-react';
import {
  Hammer,
  Building2,
  Clock,
  Calendar,
  AlertTriangle,
  FileCheck,
  LayoutGrid,
  Columns2,
  Blocks,
  Droplet,
  Droplets,
  Zap,
  Settings,
  Cpu,
  Milestone,
  Fence,
  Signpost,
  FileText,
  Folder,
  Users,
  Info,
  CircleCheck,
  MapPin,
  Phone,
  ClipboardCheck,
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
  { Icon: Building2, label: 'eng-office', value: 'eng-mun-engineering' },
  { Icon: Clock, label: 'eng-processing', value: 'eng-57-days' },
  { Icon: Calendar, label: 'eng-validity', value: 'eng-1-year' },
  { Icon: AlertTriangle, label: 'eng-expiry-note', value: { lit: '120 Days Inactive' } },
];

// Step numbers and meta times are plain text in the legacy markup (rendered verbatim).
const steps: { num: string; title: string; desc: string; meta: string; final?: boolean }[] = [
  {
    num: '1',
    title: 'eng-sign-logbook-secure-forms',
    desc: 'eng-sign-client-logbook-and-secure-application-forms',
    meta: '3 minutes',
  },
  {
    num: '2',
    title: 'eng-submit-application-plans',
    desc: 'eng-submit-application-form-and-requirements-for',
    meta: '15 minutes',
  },
  {
    num: '3',
    title: 'eng-get-order-of-payment',
    desc: 'eng-receive-order-of-payment-one-day-after-date-of',
    meta: '3 minutes',
  },
  {
    num: '4',
    title: 'eng-pay-fees-at-treasurers-office',
    desc: 'eng-pay-building-permit-fee-and-other-fees-at-the',
    meta: '10 minutes',
  },
  {
    num: '5',
    title: 'eng-get-first-endorsement',
    desc: 'eng-secure-first-endorsement-with-official-receipt',
    meta: '3 minutes',
  },
  {
    num: '6',
    title: 'eng-get-building-permit',
    desc: 'eng-claim-building-permit-5-days-after-payment-with',
    meta: '3 minutes',
    final: true,
  },
];

const permits: { Icon: LucideIcon; title: string }[] = [
  { Icon: Building2, title: 'eng-building-permit' },
  { Icon: Columns2, title: 'eng-architectural-permit' },
  { Icon: Blocks, title: 'eng-civilstructural-permit' },
  { Icon: Droplet, title: 'eng-sanitary-permit' },
  { Icon: Droplets, title: 'eng-plumbing-permit' },
  { Icon: Zap, title: 'eng-electrical-permit' },
  { Icon: Settings, title: 'eng-mechanical-permit' },
  { Icon: Cpu, title: 'eng-electronics-permit' },
  { Icon: Milestone, title: 'eng-sidewalk-dev-permit' },
  { Icon: Fence, title: 'eng-fencing-permit' },
  { Icon: Signpost, title: 'eng-sign-permit' },
  { Icon: Hammer, title: 'eng-demolition-permit' },
];

const plansReqs: Item[] = [
  'eng-architectural-plans',
  'eng-structural-plans',
  'eng-electrical-plans',
  'eng-sanitary-plans',
  'eng-plumbing-plans',
  { lit: 'Mechanical Plans' },
  'eng-electronics-plans',
  'eng-5-sets-duly-filledup-application-forms',
];

const supportingReqs: Item[] = [
  'eng-2-sets-bill-of-materials',
  'eng-5-sets-specifications',
  'eng-2-sets-design-analysis',
  'eng-2-sets-boringsoil-test-report-3-storey',
  'eng-certified-true-copy-of-octtct',
  'eng-tax-declaration',
  'eng-latest-real-property-tax-receipt',
  'eng-brgy-clearance-zoning-clearance',
];

const staff: { name: string; role: string }[] = [
  { name: 'eng-jonathan-t-castillo', role: 'eng-engineering-aide' },
  { name: 'eng-engr-bryan-n-tolentino', role: 'eng-engineer-iii' },
  { name: 'eng-engr-antonio-a-valdez', role: 'eng-municipal-engineer' },
];

const notes: string[] = [
  'eng-permit-becomes-null-and-void-if-work-does-not',
  'eng-permit-is-suspended-or-abandoned-if-work-stops',
  'eng-zoning-clearance-must-be-secured-from-the-zoning',
  'eng-fees-depend-on-rates-stated-in-revenue-code-and',
];

const officeInfo: { Icon: LucideIcon; value: Item }[] = [
  { Icon: MapPin, value: 'eng-municipal-engineering-office-municipal-hall-mati' },
  { Icon: Clock, value: { lit: 'Monday - Friday: 8:00 AM - 5:00 PM' } },
  { Icon: Phone, value: { lit: '(087) 326-5001' } },
];

export default function MunicipalEngineering() {
  const { t } = useLanguage();
  const text = (it: Item) => (typeof it === 'string' ? t(it) : it.lit);

  const ReqBox = ({ title, Icon, items }: { title: string; Icon: LucideIcon; items: Item[] }) => (
    <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-4">
      <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {t(title)}
      </h3>
      <ul className="m-0 list-none p-0">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-start gap-1.5 py-1 text-[0.8125rem] text-muted-foreground"
          >
            <CircleCheck className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
            <span>{text(it)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Seo
        title={t('eng-municipal-engineering-office')}
        description="Building permit issuance, construction permits, and engineering services from the City Engineering Office of Mati, Davao Oriental — process, permit types, and documentary requirements."
        canonicalPath="/service-details/municipal-engineering"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('eng-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('eng-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/infrastructure" className="hover:text-primary">
            {t('eng-infrastructure')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">City Engineering Office</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Hammer className="size-4" aria-hidden="true" />
            {t('eng-engineering')}
          </>
        }
        title={t('eng-municipal-engineering-office')}
        description={t('eng-building-permit-issuance-construction-permits-and')}
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
                  {text(s.value)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Building permit process */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <FileCheck className="size-5 text-primary" aria-hidden="true" />
            {t('eng-issuance-of-building-permit')}
          </SectionTitle>
          <SectionSubtitle>{t('eng-a-building-permit-is-required-prior-to')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5"
              >
                <div
                  className={`mb-2 inline-flex size-[22px] items-center justify-center rounded-[5px] text-[0.625rem] font-bold text-primary-foreground ${
                    step.final ? 'bg-brand-success' : 'bg-primary'
                  }`}
                >
                  {step.num}
                </div>
                <h3 className="mb-1 text-[0.8125rem] font-semibold text-foreground">
                  {t(step.title)}
                </h3>
                <p className="mb-2 text-[0.6875rem] leading-[1.4] text-muted-foreground">
                  {t(step.desc)}
                </p>
                <div className="flex items-center gap-1 text-[0.625rem] font-medium text-primary">
                  <Clock className="size-3" aria-hidden="true" /> {step.meta}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Permit types */}
      <Section compact>
        <Container>
          <SectionTitle>
            <LayoutGrid className="size-5 text-primary" aria-hidden="true" />
            {t('eng-types-of-permits-available')}
          </SectionTitle>
          <SectionSubtitle>{t('eng-various-permit-types-issued-by-the-municipal')}</SectionSubtitle>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {permits.map((p) => (
              <div
                key={p.title}
                className="flex items-center gap-2 rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3"
              >
                <p.Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <h3 className="text-[0.8125rem] font-medium text-foreground">{t(p.title)}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Documentary requirements */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <ClipboardCheck className="size-5 text-primary" aria-hidden="true" />
            {t('eng-documentary-requirements')}
          </SectionTitle>
          <SectionSubtitle>
            {t('eng-complete-list-of-requirements-for-building-permit')}
          </SectionSubtitle>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <ReqBox title="eng-plans-documents-5-sets-each" Icon={FileText} items={plansReqs} />
            <ReqBox title="eng-supporting-documents" Icon={Folder} items={supportingReqs} />
          </div>
        </Container>
      </Section>

      {/* Office personnel */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Users className="size-5 text-primary" aria-hidden="true" />
            {t('eng-office-personnel')}
          </SectionTitle>
          <SectionSubtitle>{t('eng-key-personnel-handling-building-permit')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {staff.map((p) => (
              <div
                key={p.name}
                className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-4 text-center"
              >
                <h3 className="text-sm font-semibold text-foreground">{t(p.name)}</h3>
                <p className="m-0 text-xs text-muted-foreground">{t(p.role)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Notes + office info */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-4">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <AlertTriangle className="size-4 text-primary" aria-hidden="true" />
                {t('eng-important-notes')}
              </h3>
              <ul className="m-0 list-none p-0">
                {notes.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-1.5 py-1 text-[0.8125rem] text-muted-foreground"
                  >
                    <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                    <span>{t(n)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-4">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('eng-office-information')}
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
          </div>
        </Container>
      </Section>
    </>
  );
}
