import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Coins,
  Building2,
  MapPin,
  Clock,
  CalendarCheck,
  House,
  Store,
  Receipt,
  FileCheck,
  ShieldCheck,
  IdCard,
  LayoutGrid,
  FileText,
  ReceiptText,
  Banknote,
  ClipboardList,
  CalendarRange,
  Printer,
  CalendarDays,
  CircleCheck,
  Info,
  Phone,
  Lightbulb,
  Check,
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

type TFn = (key: string) => string;

/** A meta pill is either a translated key or verbatim plain text (e.g. a price). */
type MetaEntry = { key: string } | { raw: string };

type ServiceCardData = {
  Icon: LucideIcon;
  title: string;
  desc: string;
  meta: MetaEntry[];
};

const businessServices: ServiceCardData[] = [
  {
    Icon: Receipt,
    title: 'treas-business-tax',
    desc: 'treas-annual-business-tax-based-on-gross-salesreceipts',
    meta: [{ key: 'treas-based-on-revenue' }, { key: 'treas-annual' }],
  },
  {
    Icon: FileCheck,
    title: 'treas-mayors-permit-fee',
    desc: 'treas-fee-for-business-permit-issuance-and-renewal',
    meta: [{ key: 'treas-varies-by-business' }, { key: 'treas-annual' }],
  },
  {
    Icon: ShieldCheck,
    title: 'treas-regulatory-fees',
    desc: 'treas-sanitary-fire-safety-and-other-regulatory-fees',
    meta: [{ key: 'treas-per-requirement' }, { key: 'treas-annual' }],
  },
];

const otherServices: ServiceCardData[] = [
  {
    Icon: FileText,
    title: 'treas-tax-clearance',
    desc: 'treas-certificate-of-no-tax-liability-for-property',
    meta: [{ raw: '₱100.00' }, { key: 'treas-same-day' }],
  },
  {
    Icon: ReceiptText,
    title: 'treas-official-receipt',
    desc: 'treas-issuance-of-official-receipts-for-all-payments',
    meta: [{ key: 'treas-free' }, { key: 'treas-immediate' }],
  },
  {
    Icon: Banknote,
    title: 'treas-fee-collection',
    desc: 'treas-collection-of-various-municipal-fees-and-charges',
    meta: [{ key: 'treas-per-schedule' }, { key: 'treas-same-day' }],
  },
  {
    Icon: ClipboardList,
    title: 'treas-tax-assessment-inquiry',
    desc: 'treas-inquiry-on-property-tax-assessment-and-computation',
    meta: [{ key: 'treas-free' }, { key: 'treas-same-day' }],
  },
  {
    Icon: CalendarRange,
    title: 'treas-payment-schedule',
    desc: 'treas-arrangement-for-installment-payment-of-taxes',
    meta: [{ key: 'treas-upon-approval' }, { key: 'treas-quarterly' }],
  },
  {
    Icon: Printer,
    title: 'treas-certification',
    desc: 'treas-issuance-of-tax-payment-certifications',
    meta: [{ raw: '₱50.00' }, { key: 'treas-same-day' }],
  },
];

// Payment deadlines table. `penalty` is translated; `penaltyClass` colors the cell
// (green discount / red penalty) as in the legacy page.
const paymentRows: {
  period: string;
  deadline: string;
  penalty: string;
  penaltyClass?: string;
  notes: string;
}[] = [
  {
    period: 'treas-annual-full-payment',
    deadline: 'treas-january-31',
    penalty: 'treas-10-discount',
    penaltyClass: 'text-brand-success',
    notes: 'treas-best-option-for-savings',
  },
  {
    period: 'treas-1st-quarter',
    deadline: 'treas-march-31',
    penalty: 'treas-no-discountpenalty',
    notes: 'treas-25-of-annual-tax',
  },
  {
    period: 'treas-2nd-quarter',
    deadline: 'treas-june-30',
    penalty: 'treas-no-discountpenalty',
    notes: 'treas-25-of-annual-tax',
  },
  {
    period: 'treas-3rd-quarter',
    deadline: 'treas-september-30',
    penalty: 'treas-no-discountpenalty',
    notes: 'treas-25-of-annual-tax',
  },
  {
    period: 'treas-4th-quarter',
    deadline: 'treas-december-31',
    penalty: 'treas-no-discountpenalty',
    notes: 'treas-25-of-annual-tax',
  },
  {
    period: 'treas-late-payment',
    deadline: 'treas-after-deadline',
    penalty: 'treas-2-per-month',
    penaltyClass: 'text-destructive',
    notes: 'treas-maximum-72-36-months',
  },
];

// Legacy .stat-card: white bordered card, centered; primary icon; uppercase label; value.
function StatBox({ icon, label, value }: { icon: ReactNode; label: ReactNode; value: ReactNode }) {
  return (
    <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
      <div className="mb-1 flex justify-center text-primary">{icon}</div>
      <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </h3>
      <p className="m-0 text-[0.8125rem] font-semibold text-foreground">{value}</p>
    </div>
  );
}

// Legacy .info-box: white bordered card, rounded, 14px padding.
function InfoBox({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
      <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        {heading}
      </h3>
      <ul className="m-0 list-none p-0">{children}</ul>
    </div>
  );
}

// Legacy .req-list li: small flex row with a primary icon and a bottom divider.
function ReqItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 border-b border-border py-1.5 text-xs text-foreground last:border-b-0">
      <span className="mt-0.5 flex shrink-0 text-primary">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

function MetaPills({ t, entries }: { t: TFn; entries: MetaEntry[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {entries.map((e, i) => (
        <span
          key={i}
          className="inline-block rounded bg-primary/[0.06] px-1.5 py-0.5 text-[0.625rem] font-medium text-primary"
        >
          {'raw' in e ? e.raw : t(e.key)}
        </span>
      ))}
    </div>
  );
}

// Legacy .service-card: white bordered card; icon+title, description, meta pills.
function ServiceItem({ t, data }: { t: TFn; data: ServiceCardData }) {
  const { Icon } = data;
  return (
    <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5 transition hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)] hover:shadow-[0_2px_10px_rgba(0,50,160,0.08)]">
      <h3 className="mb-1.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {t(data.title)}
      </h3>
      <p className="mb-2 text-[0.6875rem] leading-relaxed text-muted-foreground">{t(data.desc)}</p>
      <MetaPills t={t} entries={data.meta} />
    </div>
  );
}

export default function MunicipalTreasurer() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('treas-municipal-treasurers-office')}
        description="City Treasurer's Office - guide to tax payments, fees collection, and financial services in Mati, Davao Oriental."
        canonicalPath="/service-details/municipal-treasurer"
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
          <AppLink to="/government" className="hover:text-primary">
            {t('nav-government')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">{t('treas-municipal-treasurers-office')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Coins className="size-4" aria-hidden="true" />
            {t('treas-treasury')}
          </>
        }
        title={t('treas-municipal-treasurers-office')}
        description={t('treas-tax-collection-fee-payments-and-financial')}
      />

      {/* Quick stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <StatBox
              icon={<Building2 className="size-4" aria-hidden="true" />}
              label={t('treas-office')}
              value={t('treas-municipal-treasurer')}
            />
            <StatBox
              icon={<MapPin className="size-4" aria-hidden="true" />}
              label={t('treas-location')}
              value={t('treas-municipal-hall')}
            />
            <StatBox
              icon={<Clock className="size-4" aria-hidden="true" />}
              label={t('treas-hours')}
              value={t('treas-8am-5pm')}
            />
            <StatBox
              icon={<CalendarCheck className="size-4" aria-hidden="true" />}
              label={t('treas-days')}
              value="Monday - Friday"
            />
          </div>
        </Container>
      </Section>

      {/* Real Property Tax */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <House className="size-5 text-primary" aria-hidden="true" />
            {t('treas-real-property-tax-payment')}
          </SectionTitle>
          <SectionSubtitle>{t('treas-annual-tax-payment-for-land-buildings-and')}</SectionSubtitle>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoBox heading={t('treas-requirements')}>
              <ReqItem icon={<CircleCheck className="size-3" aria-hidden="true" />}>
                {t('treas-tax-declaration-assessment')}
              </ReqItem>
              <ReqItem icon={<CircleCheck className="size-3" aria-hidden="true" />}>
                {t('treas-previous-official-receipt-if-renewal')}
              </ReqItem>
              <ReqItem icon={<CircleCheck className="size-3" aria-hidden="true" />}>
                {t('treas-valid-id-of-property-owner')}
              </ReqItem>
              <ReqItem icon={<CircleCheck className="size-3" aria-hidden="true" />}>
                {t('treas-authorization-letter-if-representative')}
              </ReqItem>
            </InfoBox>
            <InfoBox heading={t('treas-payment-details')}>
              <ReqItem icon={<Info className="size-3" aria-hidden="true" />}>
                <strong className="font-semibold">{t('treas-fee')}</strong> Based on assessed value
              </ReqItem>
              <ReqItem icon={<Info className="size-3" aria-hidden="true" />}>
                <strong className="font-semibold">{t('treas-discount')}</strong> 10% if paid in
                January
              </ReqItem>
              <ReqItem icon={<Info className="size-3" aria-hidden="true" />}>
                <strong className="font-semibold">{t('treas-penalty')}</strong> 2% per month for
                late payment
              </ReqItem>
              <ReqItem icon={<Info className="size-3" aria-hidden="true" />}>
                <strong className="font-semibold">{t('treas-processing')}</strong> Same day
              </ReqItem>
            </InfoBox>
          </div>
        </Container>
      </Section>

      {/* Business Tax & Fees */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Store className="size-5 text-primary" aria-hidden="true" />
            {t('treas-business-tax-fees')}
          </SectionTitle>
          <SectionSubtitle>
            {t('treas-tax-payments-for-business-operations-and-permits')}
          </SectionSubtitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {businessServices.map((s) => (
              <ServiceItem key={s.title} t={t} data={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Community Tax Certificate (Cedula) */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <IdCard className="size-5 text-primary" aria-hidden="true" />
            {t('treas-community-tax-certificate-cedula')}
          </SectionTitle>
          <SectionSubtitle>{t('treas-issuance-of-cedula-for-individuals-and')}</SectionSubtitle>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoBox heading={t('treas-individual-cedula')}>
              <ReqItem icon={<CircleCheck className="size-3" aria-hidden="true" />}>
                {t('treas-valid-id')}
              </ReqItem>
              <ReqItem icon={<CircleCheck className="size-3" aria-hidden="true" />}>
                {t('treas-proof-of-income-if-employed')}
              </ReqItem>
              <ReqItem icon={<Info className="size-3" aria-hidden="true" />}>
                <strong className="font-semibold">{t('treas-basic-fee')}</strong> {'₱'}5.00
              </ReqItem>
              <ReqItem icon={<Info className="size-3" aria-hidden="true" />}>
                <strong className="font-semibold">{t('treas-additional')}</strong> {'₱'}1.00 per{' '}
                {'₱'}1,000 income
              </ReqItem>
            </InfoBox>
            <InfoBox heading={t('treas-corporate-cedula')}>
              <ReqItem icon={<CircleCheck className="size-3" aria-hidden="true" />}>
                {t('treas-secdti-registration')}
              </ReqItem>
              <ReqItem icon={<CircleCheck className="size-3" aria-hidden="true" />}>
                {t('treas-business-permit')}
              </ReqItem>
              <ReqItem icon={<Info className="size-3" aria-hidden="true" />}>
                <strong className="font-semibold">{t('treas-basic-fee')}</strong> {'₱'}500.00
              </ReqItem>
              <ReqItem icon={<Info className="size-3" aria-hidden="true" />}>
                <strong className="font-semibold">{t('treas-additional')}</strong> Based on gross
                receipts
              </ReqItem>
            </InfoBox>
          </div>
        </Container>
      </Section>

      {/* Other Treasury Services */}
      <Section compact>
        <Container>
          <SectionTitle>
            <LayoutGrid className="size-5 text-primary" aria-hidden="true" />
            {t('treas-other-treasury-services')}
          </SectionTitle>
          <SectionSubtitle>
            {t('treas-additional-services-offered-by-the-municipal')}
          </SectionSubtitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <ServiceItem key={s.title} t={t} data={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Payment Deadlines & Discounts */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <CalendarDays className="size-5 text-primary" aria-hidden="true" />
            {t('treas-payment-deadlines-discounts')}
          </SectionTitle>
          <SectionSubtitle>{t('treas-important-dates-for-tax-payments')}</SectionSubtitle>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-muted text-foreground">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    {t('treas-payment-period')}
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                    {t('treas-deadline')}
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    {t('treas-discountpenalty')}
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentRows.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">{t(row.period)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {t(row.deadline)}
                    </td>
                    <td className={`px-4 py-3 ${row.penaltyClass ?? 'text-muted-foreground'}`}>
                      {t(row.penalty)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t(row.notes)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Contact & Tips */}
      <Section compact>
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <InfoBox
              heading={
                <>
                  <Building2 className="size-4 text-primary" aria-hidden="true" />
                  {t('treas-office-information')}
                </>
              }
            >
              <ReqItem icon={<MapPin className="size-3" aria-hidden="true" />}>
                {t('treas-ground-floor-municipal-hall-mati-nueva-vizcaya')}
              </ReqItem>
              <ReqItem icon={<Clock className="size-3" aria-hidden="true" />}>
                Monday - Friday: 8:00 AM - 5:00 PM
              </ReqItem>
              <ReqItem icon={<Phone className="size-3" aria-hidden="true" />}>
                <a href="tel:0873265001" className="hover:text-primary">
                  (087) 326-5001
                </a>
              </ReqItem>
            </InfoBox>
            <InfoBox
              heading={
                <>
                  <Lightbulb className="size-4 text-primary" aria-hidden="true" />
                  {t('treas-tips')}
                </>
              }
            >
              <ReqItem icon={<Check className="size-3" aria-hidden="true" />}>
                {t('treas-pay-early-in-january-for-10-discount')}
              </ReqItem>
              <ReqItem icon={<Check className="size-3" aria-hidden="true" />}>
                {t('treas-keep-all-official-receipts-for-records')}
              </ReqItem>
              <ReqItem icon={<Check className="size-3" aria-hidden="true" />}>
                {t('treas-bring-valid-id-for-all-transactions')}
              </ReqItem>
            </InfoBox>
          </div>
        </Container>
      </Section>
    </>
  );
}
