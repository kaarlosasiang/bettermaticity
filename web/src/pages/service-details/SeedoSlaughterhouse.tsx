import { useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Package,
  Building2,
  MapPin,
  Clock,
  FileText,
  LayoutGrid,
  CircleCheck,
  Info,
  Users,
  Phone,
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

type TabId = 'hog' | 'cattle' | 'goat' | 'carabao';

export default function SeedoSlaughterhouse() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<TabId>('hog');

  const StepBadge = ({ n }: { n: number }) => (
    <span className="inline-flex size-5 items-center justify-center rounded bg-primary text-[0.625rem] font-bold text-primary-foreground">
      {n}
    </span>
  );
  const TimeTag = ({ children }: { children: ReactNode }) => (
    <span className="text-[0.6875rem] text-muted-foreground">{children}</span>
  );
  const PersonnelTag = ({ children }: { children: ReactNode }) => (
    <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[0.625rem] font-medium text-primary">
      {children}
    </span>
  );
  const FeeTag = ({ children }: { children: ReactNode }) => (
    <span className="text-[0.6875rem] font-semibold text-brand-success">{children}</span>
  );

  const ProcessTable = ({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) => (
    <div className="my-3.5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2.5 text-[0.6875rem] font-semibold tracking-wide uppercase"
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
                <td key={ci} className="px-3 py-2.5 text-foreground">
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
          <tr className="bg-muted text-foreground">
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
                <td key={ci} className="px-3 py-2 text-foreground">
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
    title: string;
    items: ReactNode[];
    className?: string;
  }) => (
    <div
      className={`rounded-lg border border-border bg-card p-3.5${className ? ` ${className}` : ''}`}
    >
      <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <Icon className="size-4 text-primary" aria-hidden="true" />
        {t(title)}
      </h4>
      <ul className="m-0 list-none p-0">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-1.5 py-1 text-xs text-foreground">
            <CircleCheck className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const ContentHeader = ({ title, desc }: { title: string; desc: string }) => (
    <div className="mb-5">
      <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
        <Package className="size-4 text-primary" aria-hidden="true" />
        {t(title)}
      </h2>
      <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(desc)}</p>
    </div>
  );

  const InfoBox = ({ items }: { items: { Icon: LucideIcon; content: ReactNode }[] }) => (
    <div className="mt-3.5 rounded-lg border border-border bg-card p-3.5">
      <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
        <Info className="size-4 text-primary" aria-hidden="true" />
        {t('slaughter-processing-information')}
      </h4>
      <ul className="m-0 list-none p-0">
        {items.map(({ Icon, content }, i) => (
          <li key={i} className="flex items-start gap-1.5 py-1 text-xs text-foreground">
            <Icon className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
            <span>{content}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const feeHeaders = [
    t('slaughter-category'),
    t('slaughter-weight-range'),
    t('slaughter-slaughter-fee'),
  ];
  const processHeaders = [
    t('slaughter-step'),
    t('slaughter-activity'),
    t('slaughter-fee'),
    t('slaughter-duration'),
    t('slaughter-personnel'),
  ];

  const meatInspector = <PersonnelTag>{t('slaughter-meat-inspector')}</PersonnelTag>;
  const supervisor = <PersonnelTag>{t('slaughter-slaughterhouse-supervisor')}</PersonnelTag>;
  const butcher = <PersonnelTag>{t('slaughter-butcher')}</PersonnelTag>;
  const dash = '—';
  const seeFee = <FeeTag>{t('slaughter-see-fee-schedule')}</FeeTag>;
  const presentStep = t('slaughter-present-shipping-permit-certificate-of-ownership');
  const feedbackNote = {
    Icon: Info,
    content: t('slaughter-please-accomplish-client-feedback-form-and-drop'),
  };

  return (
    <>
      <Seo
        title="SEEDO Slaughterhouse"
        description="SEEDO Slaughterhouse Services - Hog, cattle, goat, and carabao slaughter services with ante-mortem and post-mortem inspection in Mati, Davao Oriental."
        canonicalPath="/service-details/seedo-slaughterhouse"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('slaughter-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('slaughter-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/business" className="hover:text-primary">
            {t('slaughter-business')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">SEEDO Slaughterhouse</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Package className="size-4" aria-hidden="true" />
            SEEDO
          </>
        }
        title={t('slaughter-economic-enterprise-development-office')}
        description={t('slaughter-slaughterhouse-services-including-hog-cattle-goat')}
      />

      {/* Quick stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Building2 className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('slaughter-office')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('slaughter-seedo-slaughterhouse')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <MapPin className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('slaughter-location')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('slaughter-municipal-slaughterhouse')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <Clock className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('slaughter-hours')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('slaughter-247-operations')}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <FileText className="mx-auto mb-1 size-4 text-primary" aria-hidden="true" />
              <h3 className="mb-0.5 text-[0.625rem] font-medium tracking-wide text-muted-foreground uppercase">
                {t('slaughter-services')}
              </h3>
              <p className="m-0 text-[0.8125rem] font-semibold text-foreground">
                {t('slaughter-4-services')}
              </p>
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
              {t('slaughter-slaughterhouse-services')}
            </h2>
            <p className="m-0 text-[0.8125rem] text-muted-foreground">
              {t('slaughter-select-a-service-to-view-the-detailed-process')}
            </p>
          </div>

          <div
            className="mb-5 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label={t('slaughter-slaughterhouse-services')}
          >
            {(
              [
                { id: 'hog', label: 'slaughter-slaughter-of-hog' },
                { id: 'cattle', label: 'slaughter-slaughter-of-cattle' },
                { id: 'goat', label: 'slaughter-slaughter-of-goat' },
                { id: 'carabao', label: 'slaughter-slaughter-of-carabao' },
              ] as { id: TabId; label: string }[]
            ).map((tb) => (
              <button
                key={tb.id}
                type="button"
                role="tab"
                aria-selected={tab === tb.id}
                onClick={() => setTab(tb.id)}
                className={`rounded-md border px-4 py-2 text-xs font-semibold transition ${
                  tab === tb.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary'
                }`}
              >
                {t(tb.label)}
              </button>
            ))}
          </div>

          {/* Slaughter of Hog */}
          {tab === 'hog' && (
            <div>
              <ContentHeader
                title="slaughter-slaughter-of-hog"
                desc="slaughter-hog-slaughter-service-with-antemortem-and"
              />
              <ReqBox
                Icon={FileText}
                title="slaughter-requirements"
                className="mb-3.5"
                items={[
                  t('slaughter-shipping-permit-certificate-of-ownership'),
                  t('slaughter-veterinary-health-certificate'),
                ]}
              />
              <ProcessTable
                headers={processHeaders}
                rows={[
                  [<StepBadge n={1} />, presentStep, dash, <TimeTag>{t('slaughter-2-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={2} />, t('slaughter-antemortem-inspection-of-hog'), dash, <TimeTag>{t('slaughter-5-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={3} />, t('slaughter-pay-slaughter-fee-at-the-slaughterhouse-office'), seeFee, <TimeTag>{t('slaughter-3-minutes')}</TimeTag>, supervisor],
                  [<StepBadge n={4} />, t('slaughter-slaughter-of-hog'), dash, <TimeTag>{t('slaughter-30-minutes')}</TimeTag>, butcher],
                  [<StepBadge n={5} />, t('slaughter-postmortem-inspection'), dash, <TimeTag>{t('slaughter-5-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={6} />, 'Issuance of Meat Inspection Certificate', dash, <TimeTag>{t('slaughter-2-minutes')}</TimeTag>, meatInspector],
                ]}
              />
              <FeeTable
                headers={feeHeaders}
                rows={[
                  [t('slaughter-small'), t('slaughter-below-50-kg'), <FeeTag>₱80.00</FeeTag>],
                  [t('slaughter-medium'), t('slaughter-50-80-kg'), <FeeTag>₱100.00</FeeTag>],
                  [t('slaughter-large'), t('slaughter-above-80-kg'), <FeeTag>₱120.00</FeeTag>],
                ]}
              />
              <InfoBox
                items={[
                  { Icon: Clock, content: t('slaughter-total-processing-time-47-minutes') },
                  feedbackNote,
                ]}
              />
            </div>
          )}

          {/* Slaughter of Cattle */}
          {tab === 'cattle' && (
            <div>
              <ContentHeader
                title="slaughter-slaughter-of-cattle"
                desc="slaughter-cattle-slaughter-service-with-antemortem-and"
              />
              <ReqBox
                Icon={FileText}
                title="slaughter-requirements"
                className="mb-3.5"
                items={[
                  t('slaughter-shipping-permit-certificate-of-ownership'),
                  t('slaughter-veterinary-health-certificate'),
                  t('slaughter-large-cattle-registration-certificate'),
                ]}
              />
              <ProcessTable
                headers={processHeaders}
                rows={[
                  [<StepBadge n={1} />, presentStep, dash, <TimeTag>{t('slaughter-3-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={2} />, t('slaughter-antemortem-inspection-of-cattle'), dash, <TimeTag>{t('slaughter-10-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={3} />, t('slaughter-pay-slaughter-fee-at-the-slaughterhouse-office'), seeFee, <TimeTag>{t('slaughter-3-minutes')}</TimeTag>, supervisor],
                  [<StepBadge n={4} />, t('slaughter-slaughter-of-cattle'), dash, <TimeTag>{t('slaughter-45-minutes')}</TimeTag>, butcher],
                  [<StepBadge n={5} />, t('slaughter-postmortem-inspection'), dash, <TimeTag>{t('slaughter-10-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={6} />, t('slaughter-issuance-of-meat-inspection-certificate'), dash, <TimeTag>{t('slaughter-2-minutes')}</TimeTag>, meatInspector],
                ]}
              />
              <FeeTable
                headers={feeHeaders}
                rows={[
                  [t('slaughter-small'), t('slaughter-below-200-kg'), <FeeTag>₱200.00</FeeTag>],
                  [t('slaughter-medium'), t('slaughter-200-350-kg'), <FeeTag>₱250.00</FeeTag>],
                  [t('slaughter-large'), t('slaughter-above-350-kg'), <FeeTag>₱300.00</FeeTag>],
                ]}
              />
              <InfoBox
                items={[
                  { Icon: Clock, content: t('slaughter-total-processing-time-1-hour-13-minutes') },
                  feedbackNote,
                ]}
              />
            </div>
          )}

          {/* Slaughter of Goat */}
          {tab === 'goat' && (
            <div>
              <ContentHeader
                title="slaughter-slaughter-of-goat"
                desc="slaughter-goat-slaughter-service-with-antemortem-and"
              />
              <ReqBox
                Icon={FileText}
                title="slaughter-requirements"
                className="mb-3.5"
                items={[
                  t('slaughter-shipping-permit-certificate-of-ownership'),
                  t('slaughter-veterinary-health-certificate'),
                ]}
              />
              <ProcessTable
                headers={processHeaders}
                rows={[
                  [<StepBadge n={1} />, presentStep, dash, <TimeTag>{t('slaughter-2-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={2} />, t('slaughter-antemortem-inspection-of-goat'), dash, <TimeTag>{t('slaughter-5-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={3} />, t('slaughter-pay-slaughter-fee-at-the-slaughterhouse-office'), seeFee, <TimeTag>{t('slaughter-3-minutes')}</TimeTag>, supervisor],
                  [<StepBadge n={4} />, t('slaughter-slaughter-of-goat'), dash, <TimeTag>{t('slaughter-20-minutes')}</TimeTag>, butcher],
                  [<StepBadge n={5} />, t('slaughter-postmortem-inspection'), dash, <TimeTag>{t('slaughter-5-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={6} />, t('slaughter-issuance-of-meat-inspection-certificate'), dash, <TimeTag>{t('slaughter-2-minutes')}</TimeTag>, meatInspector],
                ]}
              />
              <FeeTable
                headers={feeHeaders}
                rows={[
                  [t('slaughter-small'), t('slaughter-below-15-kg'), <FeeTag>₱40.00</FeeTag>],
                  [t('slaughter-medium'), t('slaughter-15-25-kg'), <FeeTag>₱50.00</FeeTag>],
                  [t('slaughter-large'), t('slaughter-above-25-kg'), <FeeTag>₱60.00</FeeTag>],
                ]}
              />
              <InfoBox
                items={[
                  { Icon: Clock, content: t('slaughter-total-processing-time-37-minutes') },
                  feedbackNote,
                ]}
              />
            </div>
          )}

          {/* Slaughter of Carabao */}
          {tab === 'carabao' && (
            <div>
              <ContentHeader
                title="slaughter-slaughter-of-carabao"
                desc="slaughter-carabao-slaughter-service-with-antemortem-and"
              />
              <ReqBox
                Icon={FileText}
                title="slaughter-requirements"
                className="mb-3.5"
                items={[
                  t('slaughter-shipping-permit-certificate-of-ownership'),
                  t('slaughter-veterinary-health-certificate'),
                  t('slaughter-large-cattle-registration-certificate'),
                  t('slaughter-slaughter-permit-from-the-municipal-agriculturist'),
                ]}
              />
              <ProcessTable
                headers={processHeaders}
                rows={[
                  [<StepBadge n={1} />, presentStep, dash, <TimeTag>{t('slaughter-5-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={2} />, t('slaughter-antemortem-inspection-of-carabao'), dash, <TimeTag>{t('slaughter-10-minutes')}</TimeTag>, meatInspector],
                  [<StepBadge n={3} />, t('slaughter-pay-slaughter-fee-at-the-slaughterhouse-office'), seeFee, <TimeTag>{t('slaughter-3-minutes')}</TimeTag>, supervisor],
                  [<StepBadge n={4} />, t('slaughter-slaughter-of-carabao'), dash, <TimeTag>{t('slaughter-1-hour')}</TimeTag>, butcher],
                  [<StepBadge n={5} />, t('slaughter-postmortem-inspection'), dash, <TimeTag>{t('slaughter-10-minutes')}</TimeTag>, <PersonnelTag>Meat Inspector</PersonnelTag>],
                  [<StepBadge n={6} />, t('slaughter-issuance-of-meat-inspection-certificate'), dash, <TimeTag>{t('slaughter-2-minutes')}</TimeTag>, meatInspector],
                ]}
              />
              <FeeTable
                headers={feeHeaders}
                rows={[
                  [t('slaughter-small'), t('slaughter-below-250-kg'), <FeeTag>₱250.00</FeeTag>],
                  [t('slaughter-medium'), t('slaughter-250-400-kg'), <FeeTag>₱300.00</FeeTag>],
                  [t('slaughter-large'), t('slaughter-above-400-kg'), <FeeTag>₱350.00</FeeTag>],
                ]}
              />
              <InfoBox
                items={[
                  { Icon: Clock, content: t('slaughter-total-processing-time-1-hour-30-minutes') },
                  {
                    Icon: Info,
                    content: t('slaughter-carabao-slaughter-requires-special-permit-from'),
                  },
                  feedbackNote,
                ]}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* Office personnel */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Users className="size-5 text-primary" aria-hidden="true" />
            {t('slaughter-office-personnel')}
          </SectionTitle>
          <SectionSubtitle>
            {t('slaughter-key-personnel-handling-slaughterhouse-services')}
          </SectionSubtitle>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ['slaughter-seedo-head', 'slaughter-office-head'],
                ['slaughter-slaughterhouse-supervisor', 'slaughter-operations-management'],
                ['slaughter-meat-inspector', 'slaughter-antepostmortem-inspection'],
                ['slaughter-butcher', 'slaughter-slaughter-operations'],
                ['slaughter-utility-worker', 'slaughter-facility-maintenance'],
              ] as [string, string][]
            ).map(([title, role]) => (
              <div key={title} className="rounded-lg border border-border bg-card p-3">
                <h4 className="mb-0.5 text-xs font-semibold text-foreground">{t(title)}</h4>
                <p className="m-0 text-[0.6875rem] text-muted-foreground">{t(role)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact info */}
      <Section compact altBg>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3.5">
              <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('slaughter-office-information')}
              </h4>
              <ul className="m-0 list-none p-0">
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <MapPin className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('slaughter-seedo-slaughterhouse-mati-nueva-vizcaya')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <Clock className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span>{t('slaughter-247-operations')}</span>
                </li>
                <li className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                  <Phone className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
                  <span>(087) 326-5001</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-3.5">
              <h4 className="mb-2.5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-foreground">
                <Info className="size-4 text-primary" aria-hidden="true" />
                {t('slaughter-important-notes')}
              </h4>
              <ul className="m-0 list-none p-0">
                {[
                  'slaughter-all-animals-must-pass-antemortem-inspection',
                  'slaughter-meat-inspection-certificate-is-required-for-meat',
                  'slaughter-carabao-slaughter-requires-special-permit-from',
                  'slaughter-fees-are-based-on-animal-weight-category',
                ].map((k) => (
                  <li key={k} className="flex items-start gap-1.5 py-1 text-xs text-foreground">
                    <CircleCheck
                      className="mt-0.5 size-3 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{t(k)}</span>
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
