import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Settings,
  Building2,
  MapPin,
  Clock,
  CalendarCheck,
  LayoutGrid,
  Archive,
  Zap,
  Droplet,
  Phone,
  Info,
  CheckCircle2,
  Truck,
  Car,
  Construction,
  Bike,
  Wrench,
  Package,
  ClipboardCheck,
  Users,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

export default function MunicipalGeneralServices() {
  const { t } = useLanguage();

  const TimeBadge = ({ children }: { children: ReactNode }) => (
    <span className="inline-block rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
      {children}
    </span>
  );
  const Tag = ({ children }: { children: ReactNode }) => (
    <span className="mr-1 mb-1 inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
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
      <div className="mb-4 flex items-start gap-3 rounded-lg border border-border bg-card p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{t(title)}</h2>
          <p className="m-0 text-sm text-muted-foreground">{t(desc)}</p>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">{children}</div>
    </div>
  );

  const reqRequirements = t('mgs-requisition-and-issue-slip-ris-approved-purchase');

  return (
    <>
      <Seo
        title={t('mgs-municipal-general-services-office')}
        description="City General Services Office of Mati, Davao Oriental — property custodianship, supplies management, vehicle services, and utility management."
        canonicalPath="/service-details/municipal-general-services"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('mgs-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('mgs-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/infrastructure" className="hover:text-primary">
            {t('mgs-infrastructure')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">City General Services Office</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Settings className="size-4" aria-hidden="true" />
            {t('mgs-general-services')}
          </>
        }
        title={t('mgs-municipal-general-services-office')}
        description={t('mgs-property-custodianship-supplies-management')}
      />

      {/* Quick stats + nav */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Building2 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mgs-office')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mgs-general-services')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mgs-location')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('mgs-municipal-hall')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mgs-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">{t('mgs-8am-5pm')}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <CalendarCheck className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('mgs-days')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">Monday - Friday</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <h2 className="flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
              <LayoutGrid className="size-4 text-primary" aria-hidden="true" />
              {t('mgs-general-services-office-functions')}
            </h2>
            <p className="m-0 text-sm text-muted-foreground">
              {t('mgs-select-a-service-category-to-view-details')}
            </p>
          </div>

          <nav className="mt-3 flex flex-wrap gap-2" aria-label="GSO Services Navigation">
            <a
              href="#property"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-[0.8125rem] font-medium text-foreground hover:border-primary hover:text-primary"
            >
              <Archive className="size-4" aria-hidden="true" /> {t('mgs-property-custodianship')}
            </a>
            <a
              href="#utility"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-[0.8125rem] font-medium text-foreground hover:border-primary hover:text-primary"
            >
              <Zap className="size-4" aria-hidden="true" /> {t('mgs-utility-services')}
            </a>
            <a
              href="#vehicle"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-[0.8125rem] font-medium text-foreground hover:border-primary hover:text-primary"
            >
              <Truck className="size-4" aria-hidden="true" /> {t('mgs-vehicle-equipment')}
            </a>
            <a
              href="#supplies"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-[0.8125rem] font-medium text-foreground hover:border-primary hover:text-primary"
            >
              <Package className="size-4" aria-hidden="true" /> {t('mgs-supplies-procurement')}
            </a>
          </nav>
        </Container>
      </Section>

      {/* Main content */}
      <Section compact>
        <Container>
          {/* Property Custodianship */}
          <SectionCard
            id="property"
            Icon={Archive}
            title="mgs-property-custodianship"
            desc="mgs-the-municipal-general-services-office-takes"
          >
            <DataTable
              headers={[
                t('mgs-step'),
                t('mgs-clientenduser'),
                t('mgs-agency-actionactivity'),
                t('mgs-duration'),
                t('mgs-fees'),
                t('mgs-personnel'),
              ]}
              rows={[
                [
                  <StepNum n={1} />,
                  <span>
                    <strong className="text-foreground">
                      {t('mgs-request-for-issuance-of-supplies')}
                    </strong>
                    <br />
                    <span className="text-xs">{reqRequirements}</span>
                  </span>,
                  t('mgs-issuance-of-supplies'),
                  <TimeBadge>{t('mgs-10-min')}</TimeBadge>,
                  t('mgs-none'),
                  <span>
                    <Tag>{t('mgs-storekeeper')}</Tag>
                    <Tag>{t('mgs-supply-officer')}</Tag>
                  </span>,
                ],
                [
                  <StepNum n={2} />,
                  <span>
                    <strong className="text-foreground">
                      {t('mgs-request-for-issuance-of-equipment')}
                    </strong>
                    <br />
                    <span className="text-xs">{reqRequirements}</span>
                  </span>,
                  t('mgs-issuance-of-equipment'),
                  <TimeBadge>{t('mgs-10-min')}</TimeBadge>,
                  t('mgs-none'),
                  <span>
                    <Tag>{t('mgs-storekeeper')}</Tag>
                    <Tag>{t('mgs-supply-officer')}</Tag>
                  </span>,
                ],
                [
                  <StepNum n={3} />,
                  <span>
                    <strong className="text-foreground">
                      {t('mgs-request-for-issuance-of-semiexpendable')}
                    </strong>
                    <br />
                    <span className="text-xs">{reqRequirements}</span>
                  </span>,
                  t('mgs-issuance-of-semiexpendable'),
                  <TimeBadge>{t('mgs-10-min')}</TimeBadge>,
                  t('mgs-none'),
                  <span>
                    <Tag>{t('mgs-storekeeper')}</Tag>
                    <Tag>{t('mgs-supply-officer')}</Tag>
                  </span>,
                ],
                [
                  <StepNum n={4} />,
                  <span>
                    <strong className="text-foreground">
                      {t('mgs-request-for-issuance-of-fuel')}
                    </strong>
                    <br />
                    <span className="text-xs">{reqRequirements}</span>
                  </span>,
                  t('mgs-issuance-of-fuel'),
                  <TimeBadge>{t('mgs-10-min')}</TimeBadge>,
                  t('mgs-none'),
                  <span>
                    <Tag>{t('mgs-storekeeper')}</Tag>
                    <Tag>{t('mgs-supply-officer')}</Tag>
                  </span>,
                ],
              ]}
            />
          </SectionCard>

          {/* Utility Services */}
          <SectionCard
            id="utility"
            Icon={Zap}
            title="mgs-utility-services-management"
            desc="mgs-management-and-monitoring-of-municipal-utility"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Zap className="size-4 text-primary" aria-hidden="true" />
                  {t('mgs-electricity')}
                </h4>
                <div className="text-xs text-muted-foreground">Provider: NUVELCO</div>
                <div className="text-sm font-medium text-foreground">City Hall &amp; Facilities</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Droplet className="size-4 text-primary" aria-hidden="true" />
                  {t('mgs-water')}
                </h4>
                <div className="text-xs text-muted-foreground">Provider: Mati Water District</div>
                <div className="text-sm font-medium text-foreground">City Hall &amp; Facilities</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Phone className="size-4 text-primary" aria-hidden="true" />
                  {t('mgs-telephone')}
                </h4>
                <div className="text-xs text-muted-foreground">Provider: PLDT/Globe</div>
                <div className="text-sm font-medium text-foreground">City Hall Lines</div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-border bg-card p-4">
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Info className="size-4 text-primary" aria-hidden="true" />
                {t('mgs-utility-management-functions')}
              </h4>
              <ul className="m-0 list-none space-y-1.5 p-0 text-sm text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-processing-of-utility-bills-for-payment')}
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  Monitoring of utility consumption
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-coordination-with-utility-providers')}
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-reporting-of-utility-issues-and-concerns')}
                </li>
              </ul>
            </div>
          </SectionCard>

          {/* Vehicle & Equipment */}
          <SectionCard
            id="vehicle"
            Icon={Truck}
            title="mgs-vehicle-equipment-services"
            desc="mgs-management-and-maintenance-of-municipal-vehicles"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Car className="size-4 text-primary" aria-hidden="true" />
                  {t('mgs-light-vehicles')}
                </h4>
                <p className="m-0 text-xs text-muted-foreground">
                  {t('mgs-service-vehicles-patrol-cars-and-administrative')}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Construction className="size-4 text-primary" aria-hidden="true" />
                  {t('mgs-heavy-equipment')}
                </h4>
                <p className="m-0 text-xs text-muted-foreground">
                  {t('mgs-dump-trucks-backhoes-graders-and-construction')}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Bike className="size-4 text-primary" aria-hidden="true" />
                  {t('mgs-motorcycles')}
                </h4>
                <p className="m-0 text-xs text-muted-foreground">
                  {t('mgs-service-motorcycles-for-field-operations')}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Wrench className="size-4 text-primary" aria-hidden="true" />
                  {t('mgs-maintenance')}
                </h4>
                <p className="m-0 text-xs text-muted-foreground">
                  {t('mgs-regular-maintenance-and-repair-coordination')}
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-border bg-card p-4">
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <ClipboardCheck className="size-4 text-primary" aria-hidden="true" />
                {t('mgs-vehicle-request-requirements')}
              </h4>
              <ul className="m-0 list-none space-y-1.5 p-0 text-sm text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-approved-trip-ticket')}
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-purpose-of-traveluse')}
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-destination-and-estimated-duration')}
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-authorized-driver-assignment')}
                </li>
              </ul>
            </div>
          </SectionCard>

          {/* Supplies Procurement */}
          <SectionCard
            id="supplies"
            Icon={Package}
            title="mgs-procurement-of-commonuse-supplies"
            desc="mgs-procurement-and-distribution-of-commonuse"
          >
            <DataTable
              headers={[
                t('mgs-step'),
                t('mgs-activity'),
                t('mgs-documents-required'),
                t('mgs-duration'),
                t('mgs-personnel'),
              ]}
              rows={[
                [
                  <StepNum n={1} />,
                  t('mgs-consolidation-of-purchase-requests-from-different'),
                  t('mgs-approved-purchase-requests-pr'),
                  <TimeBadge>{t('mgs-varies')}</TimeBadge>,
                  <Tag>{t('mgs-supply-officer')}</Tag>,
                ],
                [
                  <StepNum n={2} />,
                  t('mgs-preparation-of-agency-procurement-request-apr'),
                  t('mgs-consolidated-prs-app'),
                  <TimeBadge>{t('mgs-1-day')}</TimeBadge>,
                  <Tag>{t('mgs-supply-officer')}</Tag>,
                ],
                [
                  <StepNum n={3} />,
                  t('mgs-submission-to-psdbm-for-commonuse-supplies'),
                  t('mgs-apr-supporting-documents'),
                  <TimeBadge>{t('mgs-varies')}</TimeBadge>,
                  <Tag>{t('mgs-supply-officer')}</Tag>,
                ],
                [
                  <StepNum n={4} />,
                  t('mgs-receipt-and-inspection-of-delivered-supplies'),
                  t('mgs-delivery-receipt-invoice'),
                  <TimeBadge>{t('mgs-30-min')}</TimeBadge>,
                  <span>
                    <Tag>{t('mgs-storekeeper')}</Tag>
                    <Tag>{t('mgs-inspection-committee')}</Tag>
                  </span>,
                ],
                [
                  <StepNum n={5} />,
                  t('mgs-recording-and-storage-of-supplies'),
                  t('mgs-stock-cards-inventory-reports'),
                  <TimeBadge>{t('mgs-15-min')}</TimeBadge>,
                  <Tag>{t('mgs-storekeeper')}</Tag>,
                ],
                [
                  <StepNum n={6} />,
                  t('mgs-distribution-to-requesting-offices'),
                  t('mgs-ris-acknowledgment-receipt'),
                  <TimeBadge>{t('mgs-10-min')}</TimeBadge>,
                  <Tag>{t('mgs-storekeeper')}</Tag>,
                ],
              ]}
            />
          </SectionCard>

          {/* Office Personnel */}
          <SectionCard
            id="personnel"
            Icon={Users}
            title="mgs-office-personnel"
            desc="mgs-key-personnel-handling-general-services-operations"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-0.5 text-sm font-semibold text-foreground">
                  {t('mgs-ma-theresa')}
                </h4>
                <p className="m-0 text-xs text-muted-foreground">{t('mgs-gso-head')}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-0.5 text-sm font-semibold text-foreground">
                  {t('mgs-light-vehicle')}
                </h4>
                <p className="m-0 text-xs text-muted-foreground">{t('mgs-drivers-pool')}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-0.5 text-sm font-semibold text-foreground">
                  {t('mgs-heavy-equipment')}
                </h4>
                <p className="m-0 text-xs text-muted-foreground">{t('mgs-operators-pool')}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-0.5 text-sm font-semibold text-foreground">
                  {t('mgs-utility-workers')}
                </h4>
                <p className="m-0 text-xs text-muted-foreground">{t('mgs-maintenance-staff')}</p>
              </div>
            </div>
          </SectionCard>

          {/* Contact */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('mgs-office-information')}
              </h4>
              <ul className="m-0 list-none space-y-1.5 p-0 text-sm text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-municipal-general-services-office-municipal-hall')}
                </li>
                <li className="flex items-start gap-1.5">
                  <Clock className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  Monday - Friday: 8:00 AM - 5:00 PM
                </li>
                <li className="flex items-start gap-1.5">
                  <Phone className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <a href="tel:0873265001" className="text-primary hover:underline">
                    (087) 326-5001
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Info className="size-4 text-primary" aria-hidden="true" />
                {t('mgs-important-notes')}
              </h4>
              <ul className="m-0 list-none space-y-1.5 p-0 text-sm text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-all-requests-must-have-approved-supporting')}
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-vehicle-requests-require-advance-booking')}
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-supplies-issuance-follows-fifo-method')}
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('mgs-equipment-accountability-is-strictly-enforced')}
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
