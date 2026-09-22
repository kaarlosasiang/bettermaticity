import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Settings,
  Truck,
  Clock,
  CalendarCheck,
  Phone,
  Wrench,
  Users,
  ShoppingCart,
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

export default function GeneralServices() {
  const { t } = useLanguage();

  const RateBadge = ({ children }: { children: ReactNode }) => (
    <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
      {children}
    </span>
  );
  const TimeBadge = ({ children }: { children: ReactNode }) => (
    <span className="inline-block rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
      {children}
    </span>
  );
  const StepNum = ({ n }: { n: number }) => (
    <span className="mr-1.5 inline-flex size-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-bold text-primary-foreground">
      {n}
    </span>
  );

  const DataTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-muted text-foreground">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 font-semibold whitespace-nowrap">
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

  const SectionCard = ({
    id,
    Icon,
    title,
    desc,
    children,
  }: {
    id: string;
    Icon: LucideIcon;
    title: string;
    desc: string;
    children: ReactNode;
  }) => (
    <div id={id} className="mb-8 scroll-mt-24">
      <div className="mb-4 flex items-start gap-3 rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{t(title)}</h2>
          <p className="m-0 text-sm text-muted-foreground">{t(desc)}</p>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-4">
        {children}
      </div>
    </div>
  );

  return (
    <>
      <Seo
        title={t('gs-municipal-general-services-office')}
        description="Vehicle and equipment rental, property management, and procurement services from the City General Services Office of Mati, Davao Oriental — rates, processes, and requirements."
        canonicalPath="/service-details/general-services"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('gs-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('gs-services')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">General Services Office</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Settings className="size-4" aria-hidden="true" />
            {t('gs-general-services-office')}
          </>
        }
        title={t('gs-municipal-general-services-office')}
        description={t('gs-vehicle-and-equipment-rental-property-management')}
      />

      {/* Quick stats + nav */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <Truck className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('gs-vehicles')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('gs-multiple-units')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('gs-office-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('gs-8am-5pm')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <CalendarCheck className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('gs-availability')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">Mon - Fri</p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <Phone className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('gs-hotline')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">(087) 326-5000</p>
            </div>
          </div>

          <nav className="mt-3 flex flex-wrap gap-2" aria-label="GSO Services Navigation">
            <a
              href="#vehicles"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] px-3 py-2 text-[0.8125rem] font-medium text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)] hover:text-primary"
            >
              <Truck className="size-4" aria-hidden="true" /> {t('gs-vehicle-rental')}
            </a>
            <a
              href="#equipment"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] px-3 py-2 text-[0.8125rem] font-medium text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)] hover:text-primary"
            >
              <Wrench className="size-4" aria-hidden="true" /> {t('gs-equipment')}
            </a>
            <a
              href="#personnel"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] px-3 py-2 text-[0.8125rem] font-medium text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)] hover:text-primary"
            >
              <Users className="size-4" aria-hidden="true" /> {t('gs-personnel')}
            </a>
            <a
              href="#procurement"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] px-3 py-2 text-[0.8125rem] font-medium text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)] hover:text-primary"
            >
              <ShoppingCart className="size-4" aria-hidden="true" /> {t('gs-procurement')}
            </a>
          </nav>
        </Container>
      </Section>

      {/* Main + sidebar */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <div>
              {/* Vehicle rental */}
              <SectionCard
                id="vehicles"
                Icon={Truck}
                title="gs-vehicle-rental-services"
                desc="gs-municipal-vehicles-available-for-official-use-and"
              >
                <h3 className="mb-1.5 text-base font-semibold text-foreground">
                  {t('gs-about-vehicle-rental')}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {t('gs-the-municipal-general-services-office-manages-and')}
                </p>
                <h4 className="mt-4 text-sm font-semibold text-foreground">
                  {t('gs-available-vehicles')}
                </h4>
                <DataTable
                  headers={[
                    t('gs-vehicle-type'),
                    t('gs-plate-number'),
                    t('gs-rental-rate'),
                    t('gs-driver'),
                  ]}
                  rows={[
                    [
                      t('gs-dump-truck'),
                      t('gs-government-plate'),
                      <RateBadge>₱2,500/day</RateBadge>,
                      t('gs-assigned-driver'),
                    ],
                    [
                      t('gs-backhoe-loader'),
                      t('gs-government-plate'),
                      <RateBadge>₱3,500/day</RateBadge>,
                      t('gs-assigned-operator'),
                    ],
                    [
                      t('gs-service-vehicle-van'),
                      t('gs-government-plate'),
                      <RateBadge>₱1,500/day</RateBadge>,
                      t('gs-assigned-driver'),
                    ],
                    [
                      t('gs-ambulance'),
                      t('gs-government-plate'),
                      <RateBadge>{t('gs-free-emergency')}</RateBadge>,
                      t('gs-emtdriver'),
                    ],
                    [
                      t('gs-motorcycle'),
                      t('gs-government-plate'),
                      <RateBadge>₱500/day</RateBadge>,
                      t('gs-selfdrive'),
                    ],
                  ]}
                />
                <h4 className="mt-4 text-sm font-semibold text-foreground">
                  {t('gs-rental-process')}
                </h4>
                <DataTable
                  headers={[
                    t('gs-step'),
                    t('gs-requirements'),
                    t('gs-time'),
                    t('gs-person-responsible'),
                  ]}
                  rows={[
                    [
                      <span>
                        <StepNum n={1} />
                        Submit Request Letter
                      </span>,
                      t('gs-request-letter-addressed-to-the-municipal-mayor'),
                      <TimeBadge>{t('gs-5-mins')}</TimeBadge>,
                      <span>
                        <strong className="text-foreground">{t('gs-gso-staff')}</strong>
                        <br />
                        <span className="text-xs">{t('gs-receiving-clerk')}</span>
                      </span>,
                    ],
                    [
                      <span>
                        <StepNum n={2} />
                        Approval of Request
                      </span>,
                      t('gs-wait-for-approval-from-the-mayors-office'),
                      <TimeBadge>{t('gs-12-days')}</TimeBadge>,
                      <span>
                        <strong className="text-foreground">{t('gs-mayors-office')}</strong>
                        <br />
                        <span className="text-xs">{t('gs-executive-assistant')}</span>
                      </span>,
                    ],
                    [
                      <span>
                        <StepNum n={3} />
                        Pay Rental Fee
                      </span>,
                      t('gs-order-of-payment-from-gso'),
                      <TimeBadge>{t('gs-10-mins')}</TimeBadge>,
                      <span>
                        <strong className="text-foreground">{t('gs-municipal-treasurer')}</strong>
                        <br />
                        <span className="text-xs">{t('gs-collection-officer')}</span>
                      </span>,
                    ],
                    [
                      <span>
                        <StepNum n={4} />
                        Get Trip Ticket
                      </span>,
                      t('gs-official-receipt-approved-request'),
                      <TimeBadge>{t('gs-5-mins')}</TimeBadge>,
                      <span>
                        <strong className="text-foreground">{t('gs-gso-head')}</strong>
                        <br />
                        <span className="text-xs">{t('gs-general-services-officer')}</span>
                      </span>,
                    ],
                  ]}
                />
              </SectionCard>

              {/* Heavy equipment */}
              <SectionCard
                id="equipment"
                Icon={Wrench}
                title="gs-heavy-equipment-services"
                desc="gs-construction-and-agricultural-equipment-for"
              >
                <h3 className="mb-1.5 text-base font-semibold text-foreground">
                  {t('gs-available-equipment')}
                </h3>
                <DataTable
                  headers={[
                    t('gs-equipment'),
                    t('gs-capacityspecs'),
                    t('gs-rental-rate'),
                    t('gs-operator'),
                  ]}
                  rows={[
                    [
                      t('gs-road-grader'),
                      t('gs-heavy-duty'),
                      <RateBadge>₱4,000/day</RateBadge>,
                      t('gs-assigned-operator'),
                    ],
                    [
                      t('gs-road-roller'),
                      t('gs-compactor'),
                      <RateBadge>₱3,000/day</RateBadge>,
                      t('gs-assigned-operator'),
                    ],
                    [
                      t('gs-water-truck'),
                      t('gs-5000-liters'),
                      <RateBadge>₱2,000/day</RateBadge>,
                      t('gs-assigned-driver'),
                    ],
                    [
                      t('gs-generator-set'),
                      t('gs-various-kva'),
                      <RateBadge>₱1,500/day</RateBadge>,
                      t('gs-selfoperate'),
                    ],
                    [
                      t('gs-grass-cutter'),
                      t('gs-industrial'),
                      <RateBadge>₱300/day</RateBadge>,
                      t('gs-selfoperate'),
                    ],
                  ]}
                />
                <h4 className="mt-4 text-sm font-semibold text-foreground">{t('gs-note')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('gs-equipment-rental-is-subject-to-availability-and')}
                </p>
              </SectionCard>

              {/* Personnel */}
              <SectionCard
                id="personnel"
                Icon={Users}
                title="gs-gso-personnel"
                desc="gs-office-staff-and-service-personnel"
              >
                <h3 className="mb-1.5 text-base font-semibold text-foreground">
                  {t('gs-office-personnel')}
                </h3>
                <DataTable
                  headers={[t('gs-name'), t('gs-position'), t('gs-designation')]}
                  rows={[
                    [
                      <strong className="text-foreground">{t('gs-gso-head')}</strong>,
                      t('gs-general-services-officer'),
                      t('gs-department-head'),
                    ],
                    [
                      t('gs-administrative-staff'),
                      t('gs-administrative-aide'),
                      t('gs-recordsclerical'),
                    ],
                    [
                      t('gs-property-custodian'),
                      t('gs-administrative-aide'),
                      t('gs-property-management'),
                    ],
                  ]}
                />
                <h4 className="mt-4 text-sm font-semibold text-foreground">
                  {t('gs-drivers-and-operators')}
                </h4>
                <DataTable
                  headers={[t('gs-position'), t('gs-assignment')]}
                  rows={[
                    [t('gs-heavy-equipment-operator'), t('gs-backhoe-grader-roller')],
                    [t('gs-dump-truck-driver'), t('gs-dump-truck-operations')],
                    [t('gs-light-vehicle-driver'), t('gs-service-vehicles-vans')],
                    [t('gs-ambulance-driveremt'), t('gs-emergency-medical-services')],
                  ]}
                />
              </SectionCard>

              {/* Procurement */}
              <SectionCard
                id="procurement"
                Icon={ShoppingCart}
                title="gs-procurement-services"
                desc="gs-processing-of-purchase-requests-and-supplier"
              >
                <h3 className="mb-1.5 text-base font-semibold text-foreground">
                  {t('gs-about-procurement')}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {t('gs-the-gso-assists-in-the-procurement-process-for')}
                </p>
                <h4 className="mt-4 text-sm font-semibold text-foreground">
                  {t('gs-procurement-process')}
                </h4>
                <DataTable
                  headers={[t('gs-step'), t('gs-activity'), t('gs-time-frame')]}
                  rows={[
                    [
                      <StepNum n={1} />,
                      t('gs-submission-of-purchase-request-pr-from-requesting'),
                      <TimeBadge>{t('gs-1-day')}</TimeBadge>,
                    ],
                    [
                      <StepNum n={2} />,
                      t('gs-review-and-certification-of-availability-of-funds'),
                      <TimeBadge>{t('gs-12-days')}</TimeBadge>,
                    ],
                    [
                      <StepNum n={3} />,
                      t('gs-canvassrequest-for-quotation-from-suppliers'),
                      <TimeBadge>{t('gs-35-days')}</TimeBadge>,
                    ],
                    [
                      <StepNum n={4} />,
                      t('gs-abstract-of-quotations-and-award'),
                      <TimeBadge>{t('gs-12-days')}</TimeBadge>,
                    ],
                    [
                      <StepNum n={5} />,
                      t('gs-issuance-of-purchase-order-po'),
                      <TimeBadge>{t('gs-1-day')}</TimeBadge>,
                    ],
                    [
                      <StepNum n={6} />,
                      t('gs-delivery-and-inspection'),
                      <TimeBadge>{t('gs-varies')}</TimeBadge>,
                    ],
                    [
                      <StepNum n={7} />,
                      t('gs-payment-processing'),
                      <TimeBadge>{t('gs-35-days')}</TimeBadge>,
                    ],
                  ]}
                />
                <h4 className="mt-4 text-sm font-semibold text-foreground">
                  {t('gs-supplier-accreditation-requirements')}
                </h4>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  <li>{t('gs-business-permit')}</li>
                  <li>{t('gs-dtisec-registration')}</li>
                  <li>{t('gs-bir-registration')}</li>
                  <li>{t('gs-philgeps-registration')}</li>
                  <li>{t('gs-mayors-permit')}</li>
                  <li>{t('gs-tax-clearance')}</li>
                </ul>
              </SectionCard>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-5">
                <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
                  <Building2 className="size-4 text-primary" aria-hidden="true" />
                  {t('gs-general-services-office')}
                </h3>
                <ul className="m-0 list-none space-y-3 p-0 text-sm">
                  <li className="flex gap-2">
                    <IdCard className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">
                        {t('gs-general-services-officer')}
                      </strong>
                      <span className="text-muted-foreground">{t('gs-gso-head')}</span>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('gs-location')}</strong>
                      <span className="text-muted-foreground">
                        {t('gs-municipal-hall-ground-floor-mati-nueva-vizcaya')}
                      </span>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('gs-phone')}</strong>
                      <a href="tel:0873265000" className="text-primary hover:underline">
                        (087) 326-5000
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('gs-email')}</strong>
                      <a href="mailto:gso@mati.gov.ph" className="text-primary hover:underline">
                        {t('gs-gsomatigovph')}
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex flex-col">
                      <strong className="text-foreground">{t('gs-office-hours')}</strong>
                      <span className="text-muted-foreground">
                        Monday - Friday, 8:00 AM - 5:00 PM
                      </span>
                    </span>
                  </li>
                </ul>

                <div className="mt-5 border-t border-border pt-4">
                  <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Link2 className="size-4 text-primary" aria-hidden="true" />
                    {t('gs-related-services')}
                  </h4>
                  <ul className="m-0 list-none space-y-1.5 p-0 text-sm">
                    <li>
                      <AppLink
                        to="/service-details/municipal-engineering"
                        className="text-primary hover:underline"
                      >
                        {t('gs-municipal-engineering')}
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        to="/service-details/municipal-accounting"
                        className="text-primary hover:underline"
                      >
                        {t('gs-municipal-accounting')}
                      </AppLink>
                    </li>
                    <li>
                      <AppLink to="/government" className="text-primary hover:underline">
                        {t('gs-government-offices')}
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
