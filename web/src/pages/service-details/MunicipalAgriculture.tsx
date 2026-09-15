import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  MapPin,
  Clock,
  CalendarCheck,
  LayoutGrid,
  IdCard,
  FileText,
  RefreshCw,
  CircleCheck,
  Banknote,
  History,
  Award,
  FileCheck,
  BadgeCheck,
  Flower,
  Droplet,
  Droplets,
  Truck,
  ClipboardList,
  Info,
  Flower2,
  Cog,
  GraduationCap,
  Coins,
  ShieldCheck,
  Package,
  Trees,
  Sprout,
  Settings2,
  Book,
  TrendingUp,
  PiggyBank,
  HeartPulse,
  Dna,
  Egg,
  ClipboardPlus,
  FileHeart,
  Waves,
  Box,
  Wrench,
  Shield,
  Leaf,
  Recycle,
  Store,
  Users,
  Phone,
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

type Item = string | { lit: string };

type ReqBox = { title: string; Icon: LucideIcon; items: string[] };
type Card = { Icon: LucideIcon; title: string; desc: Item; meta: Item[] };
type Program = {
  id: string;
  label: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  reqBoxesTop?: ReqBox[];
  cards: Card[];
  reqBoxBottom?: ReqBox;
};

const quickStats: { Icon: LucideIcon; label: string; value: Item }[] = [
  { Icon: Building2, label: 'magri-office', value: 'magri-mun-agriculture' },
  { Icon: MapPin, label: 'magri-location', value: 'magri-municipal-hall' },
  { Icon: Clock, label: 'magri-hours', value: 'magri-8am-5pm' },
  { Icon: CalendarCheck, label: 'magri-days', value: { lit: 'Monday - Friday' } },
];

const programs: Program[] = [
  {
    id: 'rsbsa',
    label: 'magri-rsbsa-registration',
    Icon: IdCard,
    title: 'magri-rsbsa-registration-farm-registration',
    subtitle: 'magri-registry-system-for-basic-sectors-in-agriculture',
    reqBoxesTop: [
      {
        title: 'magri-requirements-for-new-registration',
        Icon: FileText,
        items: [
          'magri-valid-id-any-governmentissued-id',
          'magri-barangay-certification',
          'magri-land-title-tax-declaration-lease-contract',
          'magri-1x1-or-2x2-id-photo',
          'magri-sketch-of-farm-location',
        ],
      },
      {
        title: 'magri-requirements-for-updaterenewal',
        Icon: RefreshCw,
        items: [
          'magri-old-rsbsa-form-reference-number',
          'magri-valid-id',
          'magri-updated-land-documents-if-changed',
          'magri-recent-1x1-or-2x2-photo',
        ],
      },
    ],
    cards: [
      {
        Icon: Banknote,
        title: 'magri-fee',
        desc: 'magri-free-of-charge-for-all-farmers',
        meta: ['magri-no-payment-required'],
      },
      {
        Icon: History,
        title: 'magri-processing-time',
        desc: 'magri-same-day-registration-upon-complete-submission',
        meta: ['magri-1530-minutes'],
      },
      {
        Icon: Award,
        title: 'magri-benefits',
        desc: 'magri-access-to-government-subsidies-insurance-and',
        meta: [{ lit: 'RCEF' }, { lit: 'PCIC' }, 'magri-da-programs'],
      },
    ],
  },
  {
    id: 'certifications',
    label: 'magri-certifications',
    Icon: FileCheck,
    title: 'magri-agricultural-certifications',
    subtitle: 'magri-official-certifications-issued-by-the-municipal',
    cards: [
      {
        Icon: BadgeCheck,
        title: 'magri-farmer-certification',
        desc: 'magri-certification-that-individual-is-a-registered',
        meta: ['magri-free', 'magri-same-day'],
      },
      {
        Icon: MapPin,
        title: 'magri-farm-location-certification',
        desc: 'magri-certification-of-farm-location-and-area-cultivated',
        meta: ['magri-free', 'magri-same-day'],
      },
      {
        Icon: Flower,
        title: 'magri-crop-certification',
        desc: 'magri-certification-of-crops-planted-and-production-data',
        meta: ['magri-free', 'magri-same-day'],
      },
      {
        Icon: Droplet,
        title: 'magri-calamity-certification',
        desc: 'magri-certification-for-crop-damage-due-to-natural',
        meta: ['magri-free', 'magri-after-validation'],
      },
      {
        Icon: Truck,
        title: 'magri-transport-permit',
        desc: 'magri-permit-for-transporting-agricultural-products',
        meta: ['magri-free', 'magri-same-day'],
      },
      {
        Icon: ClipboardList,
        title: 'magri-production-data-certification',
        desc: 'magri-official-production-records-for-loan-and',
        meta: ['magri-free', 'magri-12-days'],
      },
    ],
    reqBoxBottom: {
      title: 'magri-general-requirements-for-certifications',
      Icon: Info,
      items: [
        'magri-valid-id',
        'magri-rsbsa-registration-if-applicable',
        'magri-barangay-certification',
        'magri-purpose-of-certification',
      ],
    },
  },
  {
    id: 'rice',
    label: 'magri-rice-program',
    Icon: Droplets,
    title: 'magri-rice-program',
    subtitle: 'magri-support-programs-for-rice-farmers-under-the-rice',
    cards: [
      {
        Icon: Flower2,
        title: 'magri-certified-seeds-distribution',
        desc: 'magri-free-certified-inbred-rice-seeds-for-registered',
        meta: ['magri-free', 'magri-seasonal', { lit: 'RCEF' }],
      },
      {
        Icon: Cog,
        title: 'magri-farm-machinery-services',
        desc: 'magri-access-to-tractors-harvesters-and-other-farm',
        meta: ['magri-subsidized', 'magri-by-schedule'],
      },
      {
        Icon: GraduationCap,
        title: 'magri-farmers-field-school',
        desc: 'magri-training-on-modern-rice-farming-techniques-and',
        meta: ['magri-free', 'magri-scheduled'],
      },
      {
        Icon: Coins,
        title: 'magri-credit-assistance',
        desc: 'magri-loan-facilitation-for-rice-production-through',
        meta: ['magri-low-interest', { lit: 'ACPC' }],
      },
      {
        Icon: ShieldCheck,
        title: 'magri-crop-insurance-pcic',
        desc: 'magri-insurance-coverage-for-rice-crops-against-natural',
        meta: ['magri-subsidized', 'magri-per-cropping'],
      },
      {
        Icon: Package,
        title: 'magri-postharvest-facilities',
        desc: 'magri-access-to-drying-facilities-and-storage-warehouses',
        meta: ['magri-freesubsidized', 'magri-available'],
      },
    ],
  },
  {
    id: 'corn',
    label: 'magri-corn-program',
    Icon: Trees,
    title: 'magri-corn-program',
    subtitle: 'magri-support-programs-for-corn-farmers-in-mati',
    cards: [
      {
        Icon: Sprout,
        title: 'magri-corn-seeds-distribution',
        desc: 'magri-distribution-of-certified-corn-seeds-opv-and',
        meta: ['magri-freesubsidized', 'magri-seasonal'],
      },
      {
        Icon: Droplet,
        title: 'magri-fertilizer-support',
        desc: 'magri-subsidized-fertilizer-for-corn-production',
        meta: ['magri-subsidized', 'magri-per-cropping'],
      },
      {
        Icon: Settings2,
        title: 'magri-mechanization-support',
        desc: 'magri-access-to-corn-planters-shellers-and-other',
        meta: ['magri-subsidized', 'magri-by-schedule'],
      },
      {
        Icon: Book,
        title: 'magri-technical-assistance',
        desc: 'magri-onsite-technical-support-and-farm-visits',
        meta: ['magri-free', 'magri-on-request'],
      },
      {
        Icon: ShieldCheck,
        title: 'magri-crop-insurance',
        desc: 'magri-pcic-insurance-coverage-for-corn-crops',
        meta: ['magri-subsidized', 'magri-per-cropping'],
      },
      {
        Icon: TrendingUp,
        title: 'magri-market-linkage',
        desc: 'magri-connection-to-buyers-and-market-information',
        meta: ['magri-free', 'magri-ongoing'],
      },
    ],
  },
  {
    id: 'livestock',
    label: 'magri-livestock',
    Icon: PiggyBank,
    title: 'magri-livestock-program',
    subtitle: 'magri-support-services-for-livestock-and-poultry-raisers',
    cards: [
      {
        Icon: HeartPulse,
        title: 'magri-animal-health-services',
        desc: 'magri-vaccination-deworming-and-veterinary-consultations',
        meta: ['magri-freesubsidized', 'magri-scheduled'],
      },
      {
        Icon: Dna,
        title: 'magri-artificial-insemination',
        desc: 'magri-ai-services-for-cattle-and-swine-breeding',
        meta: ['magri-subsidized', 'magri-on-request'],
      },
      {
        Icon: Egg,
        title: 'magri-dispersal-program',
        desc: 'magri-distribution-of-livestock-swine-goats-poultry-to',
        meta: ['magri-free', 'magri-by-application'],
      },
      {
        Icon: ClipboardPlus,
        title: 'magri-disease-surveillance',
        desc: { lit: 'Monitoring and prevention of animal diseases (ASF, AI, etc.)' },
        meta: ['magri-free', 'magri-ongoing'],
      },
      {
        Icon: GraduationCap,
        title: 'magri-livestock-training',
        desc: 'magri-training-on-proper-animal-husbandry-and-management',
        meta: ['magri-free', 'magri-scheduled'],
      },
      {
        Icon: FileHeart,
        title: 'magri-livestock-registration',
        desc: 'magri-registration-of-livestock-for-monitoring-and',
        meta: ['magri-free', 'magri-same-day'],
      },
    ],
  },
  {
    id: 'fishery',
    label: 'magri-fishery',
    Icon: Waves,
    title: 'magri-fishery-program',
    subtitle: 'magri-support-services-for-fisherfolk-and-aquaculture',
    cards: [
      {
        Icon: Droplet,
        title: 'magri-fingerlings-distribution',
        desc: 'magri-distribution-of-tilapia-carp-and-other-fingerlings',
        meta: ['magri-freesubsidized', 'magri-seasonal'],
      },
      {
        Icon: Box,
        title: 'magri-aquaculture-inputs',
        desc: 'magri-fish-feeds-and-pond-supplies-support',
        meta: ['magri-subsidized', 'magri-by-application'],
      },
      {
        Icon: Wrench,
        title: 'magri-fishing-equipment',
        desc: 'magri-distribution-of-fishing-gear-and-equipment',
        meta: ['magri-free', 'magri-by-application'],
      },
      {
        Icon: Book,
        title: 'magri-technical-training',
        desc: 'magri-training-on-fish-culture-and-pond-management',
        meta: ['magri-free', 'magri-scheduled'],
      },
      {
        Icon: IdCard,
        title: 'magri-fisherfolk-registration',
        desc: 'magri-registration-in-the-fisherfolk-registry-fishr',
        meta: ['magri-free', 'magri-same-day'],
      },
      {
        Icon: Shield,
        title: 'magri-fishery-insurance',
        desc: 'magri-insurance-coverage-for-aquaculture-operations',
        meta: ['magri-subsidized', { lit: 'PCIC' }],
      },
    ],
  },
  {
    id: 'organic',
    label: 'magri-organic-agriculture',
    Icon: Leaf,
    title: 'magri-organic-agriculture-program',
    subtitle: 'magri-support-for-organic-farming-practices-and',
    cards: [
      {
        Icon: Recycle,
        title: 'magri-organic-inputs',
        desc: { lit: 'Distribution of organic fertilizers and bio-pesticides' },
        meta: ['magri-freesubsidized', 'magri-available'],
      },
      {
        Icon: BadgeCheck,
        title: 'magri-organic-certification-assistance',
        desc: 'magri-support-for-pgs-and-thirdparty-organic',
        meta: ['magri-free', 'magri-by-application'],
      },
      {
        Icon: GraduationCap,
        title: 'magri-organic-farming-training',
        desc: 'magri-training-on-organic-production-methods-and',
        meta: ['magri-free', 'magri-scheduled'],
      },
      {
        Icon: Store,
        title: 'magri-market-access',
        desc: 'magri-linkage-to-organic-markets-and-buyers',
        meta: ['magri-free', 'magri-ongoing'],
      },
      {
        Icon: Flower,
        title: 'magri-organic-seeds',
        desc: 'magri-distribution-of-organic-and-heirloom-seeds',
        meta: ['magri-free', 'magri-seasonal'],
      },
      {
        Icon: Users,
        title: 'magri-farmers-organization',
        desc: 'magri-support-for-organic-farmers-groups-and',
        meta: ['magri-free', 'magri-ongoing'],
      },
    ],
  },
];

const officeInfo: { Icon: LucideIcon; value: Item }[] = [
  { Icon: MapPin, value: 'magri-municipal-agriculture-office-municipal-hall' },
  { Icon: Clock, value: { lit: 'Monday - Friday: 8:00 AM - 5:00 PM' } },
  { Icon: Phone, value: { lit: '(087) 326-5001' } },
];

const notes: string[] = [
  'All services require valid ID and RSBSA registration',
  'Program availability subject to budget allocation',
  'Priority given to small-scale farmers',
  'Bring supporting documents for faster processing',
];

export default function MunicipalAgriculture() {
  const { t } = useLanguage();
  const text = (it: Item) => (typeof it === 'string' ? t(it) : it.lit);
  const [activeTab, setActiveTab] = useState('rsbsa');

  const ReqBoxView = ({ box }: { box: ReqBox }) => (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <box.Icon className="size-4 text-primary" aria-hidden="true" />
        {t(box.title)}
      </h3>
      <ul className="m-0 list-none p-0">
        {box.items.map((it) => (
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

  const CardView = ({ card }: { card: Card }) => (
    <div className="flex flex-col rounded-lg border border-border bg-card p-4">
      <h3 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <card.Icon className="size-4 text-primary" aria-hidden="true" />
        {t(card.title)}
      </h3>
      <p className="mb-3 grow text-[0.8125rem] text-muted-foreground">{text(card.desc)}</p>
      <div className="flex flex-wrap gap-1.5 border-t border-border pt-2.5">
        {card.meta.map((m, i) => (
          <span
            key={i}
            className="rounded bg-muted px-1.5 py-0.5 text-[0.6875rem] font-medium text-primary"
          >
            {text(m)}
          </span>
        ))}
      </div>
    </div>
  );

  const activeProgram = programs.find((p) => p.id === activeTab) ?? programs[0];

  return (
    <>
      <Seo
        title={t('magri-municipal-agriculture-office')}
        description="Farm registration (RSBSA), agricultural certifications, and rice, corn, livestock, fishery, and organic programs from the City Agriculture Office of Mati, Davao Oriental."
        canonicalPath="/service-details/municipal-agriculture"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('magri-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('magri-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/agriculture" className="hover:text-primary">
            {t('magri-agriculture')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">City Agriculture Office</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Trees className="size-4" aria-hidden="true" />
            {t('magri-agriculture')}
          </>
        }
        title={t('magri-municipal-agriculture-office')}
        description={t('magri-farm-registration-certifications-and-agricultural')}
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

      {/* Programs */}
      <Section compact altBg>
        <Container>
          <div className="mb-5 text-center">
            <SectionTitle className="justify-center">
              <LayoutGrid className="size-5 text-primary" aria-hidden="true" />
              {t('magri-agricultural-programs-services')}
            </SectionTitle>
            <SectionSubtitle>{t('magri-select-a-program-category-to-view-details')}</SectionSubtitle>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {programs.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveTab(p.id)}
                aria-pressed={activeTab === p.id}
                className={`rounded-md border px-4 py-2 text-xs font-semibold transition-colors ${
                  activeTab === p.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary'
                }`}
              >
                {t(p.label)}
              </button>
            ))}
          </div>

          {/* Active program */}
          <SectionTitle>
            <activeProgram.Icon className="size-5 text-primary" aria-hidden="true" />
            {t(activeProgram.title)}
          </SectionTitle>
          <SectionSubtitle>{t(activeProgram.subtitle)}</SectionSubtitle>

          {activeProgram.reqBoxesTop && (
            <div className="mb-5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
              {activeProgram.reqBoxesTop.map((box) => (
                <ReqBoxView key={box.title} box={box} />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeProgram.cards.map((card) => (
              <CardView key={card.title} card={card} />
            ))}
          </div>

          {activeProgram.reqBoxBottom && (
            <div className="mt-3.5">
              <ReqBoxView box={activeProgram.reqBoxBottom} />
            </div>
          )}
        </Container>
      </Section>

      {/* Contact + notes */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                {t('magri-office-information')}
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
                <Info className="size-4 text-primary" aria-hidden="true" />
                {t('magri-important-notes')}
              </h3>
              <ul className="m-0 list-none p-0">
                {notes.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-1.5 py-1 text-[0.8125rem] text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-brand-success" aria-hidden="true" />
                    <span>{n}</span>
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
