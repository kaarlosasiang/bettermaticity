import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Building2,
  Clock,
  MapPin,
  Info,
  Layers,
  Home,
  Settings,
  Calculator,
  ClipboardCheck,
  CircleCheck,
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

// An item is an i18n key unless wrapped as { lit } — legacy markup carries a few
// plain-text items (no data-i18n) that must render verbatim.
type Item = string | { lit: string };

const quickStats: { Icon: LucideIcon; label: string; value: string }[] = [
  { Icon: Building2, label: 'propdec-office', value: 'propdec-municipal-assessor' },
  { Icon: FileText, label: 'propdec-form-type', value: 'propdec-tax-declaration' },
  { Icon: Clock, label: 'propdec-processing', value: 'propdec-35-working-days' },
  { Icon: MapPin, label: 'propdec-location', value: 'propdec-municipal-hall' },
];

const infoCards: { title: string; items: Item[] }[] = [
  {
    title: 'propdec-owner-information',
    items: [
      'propdec-full-name-of-owner',
      'propdec-address-telephone-no',
      'propdec-tin-tax-identification-number',
      'propdec-administratorbeneficial-user',
    ],
  },
  {
    title: 'propdec-property-location',
    items: ['propdec-barangay', 'propdec-municipality', 'propdec-province', 'propdec-octtctcloa-no'],
  },
  {
    title: 'propdec-assessment-details',
    items: [
      'propdec-property-index-number-pin',
      'propdec-arp-no-assessment-roll',
      'propdec-effectivity-of-assessment',
      'propdec-previous-arp-no',
    ],
  },
];

const declarationTypes: { Icon: LucideIcon; title: string; items: Item[] }[] = [
  {
    Icon: MapPin,
    title: 'propdec-land-declaration',
    items: [
      'propdec-classification-agricultural-commercial-industrial',
      'propdec-area-in-hectaressquare-meters',
      'propdec-market-value-per-unit-area',
      'propdec-actual-use-of-land',
      'propdec-subclass-and-assessment-level',
      'propdec-assessed-value-computation',
    ],
  },
  {
    Icon: Home,
    title: 'propdec-building-declaration',
    items: [
      'propdec-kind-of-building-residential-commercial-etc',
      'propdec-structural-type-and-materials',
      'propdec-building-permit-no-and-date-issued',
      'propdec-date-constructedcompleted',
      'propdec-number-of-storeys-and-floor-area',
      'propdec-core-and-additional-items',
    ],
  },
  {
    Icon: Settings,
    title: 'propdec-machinery-declaration',
    items: [
      'propdec-kind-of-machinery',
      'propdec-brand-and-model',
      'propdec-capacityhorse-power',
      'propdec-date-acquiredinstalled',
      'propdec-condition-new-good-fair-poor',
      'propdec-estimated-economic-life',
    ],
  },
  {
    Icon: Calculator,
    title: 'propdec-assessment-summary',
    items: [
      'propdec-total-market-value',
      'propdec-assessment-level-percentage',
      'propdec-total-assessed-value',
      'propdec-taxableexempt-status',
      'propdec-effectivity-quarter-and-year',
      'propdec-approving-authority-signature',
    ],
  },
];

const requirements: { title: string; items: Item[] }[] = [
  {
    title: 'propdec-for-new-declaration',
    items: [
      'propdec-certified-true-copy-of-title-octtctcloa',
      'propdec-tax-clearance-certificate',
      'propdec-deed-of-saletransfer-documents',
      'propdec-sketch-planlocation-map',
      'propdec-valid-id-of-owner',
    ],
  },
  {
    title: 'propdec-for-building-declaration',
    items: [
      { lit: 'Building Permit' },
      'propdec-occupancy-permit',
      'propdec-building-plansspecifications',
      'propdec-certificate-of-completion',
      'propdec-land-tax-declaration',
    ],
  },
  {
    title: 'propdec-for-machinery-declaration',
    items: [
      'propdec-list-of-machineries-with-specifications',
      'propdec-proof-of-acquisitioninvoice',
      'propdec-installation-permit-if-applicable',
      'propdec-building-tax-declaration',
      'propdec-business-permit',
    ],
  },
];

const notes: string[] = [
  'propdec-declaration-must-be-filed-within-60-days-of',
  'propdec-penalties-apply-for-late-declaration',
  'propdec-keep-copies-of-all-submitted-documents',
];

export default function PropertyDeclaration() {
  const { t } = useLanguage();
  const text = (it: Item) => (typeof it === 'string' ? t(it) : it.lit);

  return (
    <>
      <Seo
        title={t('propdec-declaration-of-land-building-and-machineries')}
        description="Tax declaration form for real property assessment (land, building, machinery) in Mati, Davao Oriental — required information, declaration types, and documentary requirements from the City Assessor."
        canonicalPath="/service-details/property-declaration"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('propdec-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('propdec-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/tax-payments" className="hover:text-primary">
            {t('propdec-tax-payments')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">Property Declaration</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <FileText className="size-4" aria-hidden="true" />
            {t('propdec-municipal-assessor')}
          </>
        }
        title={t('propdec-declaration-of-land-building-and-machineries')}
        description={t('propdec-tax-declaration-form-for-real-property-assessment')}
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
                <p className="m-0 text-[0.8125rem] font-semibold text-foreground">{t(s.value)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Property information required */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <Info className="size-5 text-primary" aria-hidden="true" />
            {t('propdec-property-information-required')}
          </SectionTitle>
          <SectionSubtitle>{t('propdec-details-needed-for-the-tax-declaration-form')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infoCards.map((card) => (
              <div key={card.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2.5 text-sm font-semibold text-foreground">{t(card.title)}</h3>
                <ul className="m-0 list-none p-0">
                  {card.items.map((it, i) => (
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
            ))}
          </div>
        </Container>
      </Section>

      {/* Types of property declaration */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Layers className="size-5 text-primary" aria-hidden="true" />
            {t('propdec-types-of-property-declaration')}
          </SectionTitle>
          <SectionSubtitle>{t('propdec-different-categories-of-real-property-for-tax')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {declarationTypes.map((grp) => (
              <div key={grp.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <grp.Icon className="size-4 text-primary" aria-hidden="true" />
                  {t(grp.title)}
                </h3>
                <ul className="m-0 list-none p-0">
                  {grp.items.map((it, i) => (
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
            ))}
          </div>
        </Container>
      </Section>

      {/* Documentary requirements */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <ClipboardCheck className="size-5 text-primary" aria-hidden="true" />
            {t('propdec-documentary-requirements')}
          </SectionTitle>
          <SectionSubtitle>{t('propdec-documents-needed-for-property-declaration')}</SectionSubtitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {requirements.map((card) => (
              <div key={card.title} className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2.5 text-sm font-semibold text-foreground">{t(card.title)}</h3>
                <ul className="m-0 list-none p-0">
                  {card.items.map((it, i) => (
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
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact + notes */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="mb-3 flex items-center gap-2 text-[0.9375rem] font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('propdec-municipal-assessors-office')}
              </h3>
              <p className="mb-2.5 text-[0.8125rem] text-muted-foreground">
                {t('propdec-handles-property-assessment-tax-declaration-and')}
              </p>
              <ul className="m-0 list-none p-0 text-xs text-foreground">
                <li className="mb-1 flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t('propdec-ground-floor-municipal-hall-mati')}
                </li>
                <li className="mb-1 flex items-center gap-1.5">
                  <Clock className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  Mon-Fri: 8:00 AM - 5:00 PM
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="mb-3 flex items-center gap-2 text-[0.9375rem] font-semibold text-foreground">
                <Info className="size-4 text-primary" aria-hidden="true" />
                {t('propdec-important-notes')}
              </h3>
              <ul className="m-0 list-none p-0 text-xs text-muted-foreground">
                {notes.map((n) => (
                  <li key={n} className="mb-1 flex items-start gap-1.5">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-brand-success" aria-hidden="true" />
                    <span>{t(n)}</span>
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
