import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Store,
  Building2,
  MapPin,
  Clock,
  FileText,
  LayoutGrid,
  BadgeCheck,
  Ticket,
  AlertTriangle,
  CreditCard,
  CircleCheck,
  Info,
  Users,
  Phone,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';

type TabId = 'clearance' | 'entrance' | 'complaints' | 'ctc';

export default function SeedoPublicMarket() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<TabId>('clearance');

  const TimeBadge = ({ children }: { children: ReactNode }) => (
    <span className="text-[0.6875rem] text-muted-foreground">{children}</span>
  );
  const FeeBadge = ({ children }: { children: ReactNode }) => (
    <span className="text-[0.6875rem] font-semibold text-brand-success">{children}</span>
  );
  const StepBadge = ({ n }: { n: number }) => (
    <span className="inline-flex size-5 items-center justify-center rounded bg-primary text-[0.625rem] font-bold text-primary-foreground">
      {n}
    </span>
  );
  const Personnel = ({ children }: { children: ReactNode }) => (
    <span className="my-px inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[0.625rem] font-medium text-primary">
      {children}
    </span>
  );

  const ProcessTable = ({ rows }: { rows: ReactNode[][] }) => (
    <div className="my-3.5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            <th className="px-3 py-2.5 text-[0.6875rem] font-semibold uppercase">
              {t('market-step')}
            </th>
            <th className="px-3 py-2.5 text-[0.6875rem] font-semibold uppercase">
              {t('market-activity')}
            </th>
            <th className="px-3 py-2.5 text-[0.6875rem] font-semibold uppercase">
              {t('market-fee')}
            </th>
            <th className="px-3 py-2.5 text-[0.6875rem] font-semibold uppercase">
              {t('market-duration')}
            </th>
            <th className="px-3 py-2.5 text-[0.6875rem] font-semibold uppercase">
              {t('market-personnel')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-border align-top">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2.5">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const FeeTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
    <div className="mt-3.5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-primary/5 text-foreground">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-[0.6875rem] font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-border">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ReqBox = ({
    Icon,
    title,
    items,
    className,
  }: {
    Icon: LucideIcon;
    title: ReactNode;
    items: ReactNode[];
    className?: string;
  }) => (
    <div
      className={`rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5 ${className ?? ''}`}
    >
      <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {title}
      </h3>
      <ul className="m-0 list-none p-0">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-1.5 py-1 text-xs text-foreground">
            <CircleCheck className="mt-0.5 size-2.5 shrink-0 text-primary" aria-hidden="true" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const SectionHead = ({
    Icon,
    title,
    desc,
  }: {
    Icon: LucideIcon;
    title: ReactNode;
    desc: ReactNode;
  }) => (
    <div className="mb-5">
      <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {title}
      </h2>
      <p className="m-0 text-[0.8125rem] text-muted-foreground">{desc}</p>
    </div>
  );

  const tabs: { id: TabId; label: string }[] = [
    { id: 'clearance', label: 'market-market-clearance' },
    { id: 'entrance', label: 'market-entrance-fees' },
    { id: 'complaints', label: 'market-complaints' },
    { id: 'ctc', label: 'market-community-tax-cedula' },
  ];

  return (
    <>
      <Seo
        title={t('market-economic-enterprise-development-office')}
        description="SEEDO Public Market services — market clearance, entrance fees, vendor services, and community tax certificates in Mati, Davao Oriental."
        canonicalPath="/service-details/seedo-public-market"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('market-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('market-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/business" className="hover:text-primary">
            {t('market-business')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">SEEDO Public Market</span>
        </nav>
      </Container>

      {/* Page header (kept inline to match SEEDO badge) */}
      <PageHeader
        badge={
          <>
            <Store className="size-3.5" aria-hidden="true" /> SEEDO
          </>
        }
        title={t('market-economic-enterprise-development-office')}
        description={t('market-public-market-services-including-clearances')}
      />

      {/* Quick stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <Building2 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('market-office')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('market-seedo-public-market')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('market-location')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('market-public-market')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('market-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('market-6am-6pm')}
              </p>
            </div>
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3 text-center">
              <FileText className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('market-services')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">4 Services</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Service tabs */}
      <Section compact altBg>
        <Container>
          <div className="mb-5 text-center">
            <h2 className="mb-1 flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
              <LayoutGrid className="size-4 text-primary" aria-hidden="true" />
              {t('market-public-market-services')}
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('market-select-a-service-to-view-the-detailed-process-and')}
            </p>
          </div>

          <div className="mb-5 flex flex-col flex-wrap justify-center gap-2 sm:flex-row">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                type="button"
                onClick={() => setTab(tb.id)}
                className={`rounded-md border px-4 py-2 text-xs font-semibold transition-colors ${
                  tab === tb.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)]'
                }`}
              >
                {t(tb.label)}
              </button>
            ))}
          </div>

          {/* Market Clearance */}
          {tab === 'clearance' && (
            <div>
              <SectionHead
                Icon={BadgeCheck}
                title={t('market-issuance-of-market-clearancecertification')}
                desc={t('market-for-vendors-and-stallholders-who-need-clearance')}
              />
              <ReqBox
                Icon={FileText}
                title={t('market-requirements')}
                className="mb-3.5"
                items={[
                  t('market-fill-out-request-slip'),
                  t('market-updated-official-receipt-of-stall-rental'),
                  t('market-valid-id'),
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('market-fill-out-request-slip-and-submit-official-receipt'),
                    '—',
                    <TimeBadge>{t('market-2-minutes')}</TimeBadge>,
                    <span>
                      <Personnel>{t('market-market-supervisor')}</Personnel>
                      <br />
                      <Personnel>{t('market-market-inspector')}</Personnel>
                    </span>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('market-pay-clearance-fee-to-the-municipal-treasurers'),
                    <FeeBadge>{t('market-per-mto')}</FeeBadge>,
                    <TimeBadge>{t('market-5-minutes')}</TimeBadge>,
                    <Personnel>{t('market-treasurers-office')}</Personnel>,
                  ],
                  [
                    <StepBadge n={3} />,
                    t('market-get-the-market-clearancecertification'),
                    '—',
                    <TimeBadge>{t('market-2-minutes')}</TimeBadge>,
                    <Personnel>{t('market-market-supervisor')}</Personnel>,
                  ],
                ]}
              />
              <ReqBox
                Icon={Info}
                title={t('market-processing-information')}
                className="mt-3.5"
                items={[
                  t('market-total-processing-time-9-minutes'),
                  t('market-please-accomplish-client-feedback-form-and-drop'),
                ]}
              />
            </div>
          )}

          {/* Entrance Fees */}
          {tab === 'entrance' && (
            <div>
              <SectionHead
                Icon={Ticket}
                title={t('market-payment-of-entrance-fees-and-issuance-of-cash')}
                desc={t('market-for-vendors-traders-and-individuals-entering-the')}
              />
              <ReqBox
                Icon={Info}
                title={t('market-service-description')}
                className="mb-3.5"
                items={[
                  t('market-any-individual-or-entity-selling-goods-in-the'),
                  t('market-fee-is-being-assessed-by-the-market-collector-to'),
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('market-bring-goodsmerchandiseproducts-for'),
                    '—',
                    <TimeBadge>{t('market-5-minutes')}</TimeBadge>,
                    <span>
                      <Personnel>{t('market-market-collector')}</Personnel>
                      <br />
                      <Personnel>{t('market-market-inspector')}</Personnel>
                      <br />
                      <Personnel>{t('market-market-supervisor')}</Personnel>
                      <br />
                      <Personnel>{t('market-ticket-seller')}</Personnel>
                      <br />
                      <Personnel>{t('market-gate-keeper')}</Personnel>
                      <br />
                      <Personnel>{t('market-utility-worker')}</Personnel>
                    </span>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('market-pay-entrance-fee-and-get-cash-ticket-at-the'),
                    <FeeBadge>{t('market-per-schedule')}</FeeBadge>,
                    <TimeBadge>{t('market-2-minutes')}</TimeBadge>,
                    <span>
                      <Personnel>{t('market-market-collector')}</Personnel>
                      <br />
                      <Personnel>{t('market-ticket-seller')}</Personnel>
                      <br />
                      <Personnel>{t('market-gate-keeper')}</Personnel>
                    </span>,
                  ],
                ]}
              />
              <FeeTable
                headers={[t('market-item-type'), t('market-fee-range')]}
                rows={[
                  [
                    t('market-vegetables-fruits'),
                    <FeeBadge>{t('market-based-on-volume')}</FeeBadge>,
                  ],
                  [t('market-meat-poultry'), <FeeBadge>{t('market-based-on-weight')}</FeeBadge>],
                  [t('market-fish-seafood'), <FeeBadge>{t('market-based-on-weight')}</FeeBadge>],
                  [t('market-dry-goods'), <FeeBadge>{t('market-based-on-quantity')}</FeeBadge>],
                  [t('market-other-merchandise'), <FeeBadge>{t('market-as-assessed')}</FeeBadge>],
                ]}
              />
              <ReqBox
                Icon={Info}
                title={t('market-processing-information')}
                className="mt-3.5"
                items={[
                  t('market-total-processing-time-20-minutes'),
                  t('market-please-accomplish-client-feedback-form-and-drop'),
                ]}
              />
            </div>
          )}

          {/* Complaints */}
          {tab === 'complaints' && (
            <div>
              <SectionHead
                Icon={AlertTriangle}
                title={t('market-complaints-against-violations-of-public-market')}
                desc={t('market-filing-complaints-against-violations-of')}
              />
              <ReqBox
                Icon={Info}
                title={t('market-service-description')}
                className="mb-3.5"
                items={[
                  t('market-any-individual-or-stallholder-may-file-a-formal'),
                  t('market-complaints-may-include-sanitation-issues-illegal'),
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('market-secure-and-fill-out-public-market-complaint-form'),
                    <FeeBadge>{t('market-free')}</FeeBadge>,
                    <TimeBadge>{t('market-10-minutes')}</TimeBadge>,
                    <span>
                      <Personnel>{t('market-market-supervisor')}</Personnel>
                      <br />
                      <Personnel>{t('market-market-inspector')}</Personnel>
                    </span>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('market-verification-and-investigation-of-complaint'),
                    '—',
                    <TimeBadge>{t('market-varies')}</TimeBadge>,
                    <span>
                      <Personnel>{t('market-market-supervisor')}</Personnel>
                      <br />
                      <Personnel>{t('market-seedo-head')}</Personnel>
                    </span>,
                  ],
                ]}
              />
              <ReqBox
                Icon={Info}
                title={t('market-processing-information')}
                className="mt-3.5"
                items={[
                  t('market-total-response-time-6-minutes-initial-filing'),
                  t('market-investigation-and-resolution-time-varies'),
                  t('market-please-accomplish-client-feedback-form-and-drop'),
                ]}
              />
            </div>
          )}

          {/* Community Tax Certificate */}
          {tab === 'ctc' && (
            <div>
              <SectionHead
                Icon={CreditCard}
                title={t('market-issuance-of-community-tax-certificate-cedula')}
                desc={t('market-as-deputized-by-the-municipal-treasurer')}
              />
              <ReqBox
                Icon={FileText}
                title={t('market-requirements')}
                className="mb-3.5"
                items={[
                  t('market-fill-out-ctc-application-slip'),
                  t('market-valid-id'),
                  t('market-previous-years-ctc-if-available'),
                ]}
              />
              <ProcessTable
                rows={[
                  [
                    <StepBadge n={1} />,
                    t('market-fill-out-ctc-application-slip'),
                    '—',
                    <TimeBadge>{t('market-2-minutes')}</TimeBadge>,
                    <Personnel>{t('market-market-supervisor')}</Personnel>,
                  ],
                  [
                    <StepBadge n={2} />,
                    t('market-pay-ctc-fee'),
                    <FeeBadge>₱5.00+</FeeBadge>,
                    <TimeBadge>{t('market-2-minutes')}</TimeBadge>,
                    <Personnel>{t('market-market-supervisor')}</Personnel>,
                  ],
                ]}
              />
              <FeeTable
                headers={[t('market-type'), t('market-basic-fee'), t('market-additional')]}
                rows={[
                  [
                    t('market-individual-basic'),
                    <FeeBadge>₱5.00</FeeBadge>,
                    t('market-100-per-1000-income'),
                  ],
                  [
                    t('market-corporationbusiness'),
                    <FeeBadge>₱500.00</FeeBadge>,
                    t('market-additional-based-on-gross-receipts'),
                  ],
                ]}
              />
              <ReqBox
                Icon={Info}
                title={t('market-processing-information')}
                className="mt-3.5"
                items={[
                  t('market-total-processing-time-5-minutes'),
                  t('market-ctc-is-valid-for-one-calendar-year'),
                  t('market-please-accomplish-client-feedback-form-and-drop'),
                ]}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* Office personnel */}
      <Section compact>
        <Container>
          <SectionHead
            Icon={Users}
            title={t('market-office-personnel')}
            desc={t('market-key-personnel-handling-public-market-services')}
          />
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ['market-seedo-head', 'market-office-head'],
                ['market-market-supervisor', 'market-market-operations'],
                ['market-market-inspector', 'market-inspection-compliance'],
                ['market-market-collector', 'market-fee-collection'],
                ['market-ticket-seller', 'market-cash-ticket-issuance'],
                ['market-gate-keeper', 'market-entry-management'],
              ] as const
            ).map(([name, role]) => (
              <div
                key={name}
                className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3"
              >
                <h3 className="mb-0.5 text-xs font-semibold text-foreground">{t(name)}</h3>
                <p className="m-0 text-[0.6875rem] text-muted-foreground">{t(role)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact + notes */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <div className="rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-3.5">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('market-office-information')}
              </h3>
              <ul className="m-0 list-none p-0">
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <MapPin className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('market-seedo-office-public-market-mati-nueva-vizcaya')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <Clock className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span>Monday - Sunday: 6:00 AM - 6:00 PM</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <Phone className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <a href="tel:0873265001" className="text-primary hover:underline">
                    (087) 326-5001
                  </a>
                </li>
              </ul>
            </div>
            <ReqBox
              Icon={Info}
              title={t('market-important-notes')}
              items={[
                t('market-all-vendors-must-have-valid-stall-rental-receipts'),
                t('market-entrance-fees-are-based-on-goods-being-sold'),
                t('market-complaints-are-handled-confidentially'),
                t('market-ctc-is-available-at-the-market-for-convenience'),
              ]}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
