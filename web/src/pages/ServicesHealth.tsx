import type { ReactNode } from 'react';
import {
  HeartPulse,
  Hospital,
  ShieldPlus,
  Heart,
  Pill,
  Building2,
  CircleCheck,
  CirclePlus,
  MapPin,
  ShieldCheck,
  Phone,
  BadgeCheck,
  ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Container,
  Section,
  SectionTitle,
  SectionSubtitle,
  PageHeader,
  Grid,
  StatCard,
  ServiceCard,
} from '@/components/primitives';

type TFn = (key: string) => string;

const services: { Icon: LucideIcon; title: string; desc: string; fee: string; time: string }[] = [
  {
    Icon: Hospital,
    title: 'health-consultation',
    desc: 'health-consultation-desc',
    fee: 'label-free',
    time: 'label-walk-in',
  },
  {
    Icon: ShieldPlus,
    title: 'health-vaccination',
    desc: 'health-vaccination-desc',
    fee: 'label-free',
    time: 'label-schedule-varies',
  },
  {
    Icon: Heart,
    title: 'health-maternal',
    desc: 'health-maternal-desc',
    fee: 'label-free',
    time: 'label-by-appointment',
  },
  {
    Icon: Pill,
    title: 'health-medicine',
    desc: 'health-medicine-desc',
    fee: 'label-free-subsidy',
    time: 'label-1-3-days',
  },
];

const stats: [string, string][] = [
  ['54', 'health-stat-facilities'],
  ['2', 'health-stat-hospitals'],
  ['34', 'health-stat-bhs'],
  ['1', 'health-stat-mho'],
];

// Facilities per DOH National Health Facility Registry (active, City of Mati),
// retrieved 16 September 2026. Literal text — corrected from Solano-template data.
const hospitals: { badge: string; title: string; desc: string; loc: string }[] = [
  {
    badge: 'Government Hospital',
    title: 'Davao Oriental Provincial Medical Center',
    desc: 'The government hospital serving Mati and the wider province of Davao Oriental.',
    loc: 'City of Mati, Davao Oriental',
  },
  {
    badge: 'Private Hospital',
    title: 'St. Camillus Hospital of Mati Foundation, Inc.',
    desc: 'A private hospital providing inpatient and outpatient care in the City of Mati.',
    loc: 'City of Mati, Davao Oriental',
  },
];

const NHFR_URL = 'https://nhfr.doh.gov.ph/VActivefacilitiesList';
const NHFR_RETRIEVED =
  '— active facilities registered in the City of Mati, retrieved 16 September 2026';

// 34 Barangay Health Stations (DOH NHFR). Literal names — corrected from Solano leftovers.
const bhs: string[] = [
  'Badas BHS',
  'Bobon BHS',
  'Buso BHS',
  'Cabuaya BHS',
  'Culian BHS',
  'Dahican A BHS',
  'Dahican B BHS',
  'Dahican C BHS',
  'Danao BHS',
  'Dawan BHS',
  'Don Enrique Lopez BHS',
  'Don Martin Marundan BHS',
  'Don Salvador Lopez, Sr. BHS',
  'Langka BHS',
  'Lawigan BHS',
  'Libudon BHS',
  'Luban BHS',
  'Macambol BHS',
  'Mamali BHS',
  'Matiao A BHS',
  'Matiao B BHS',
  'Mayo BHS',
  'Poblacion 1 BHS',
  'Poblacion 2 BHS',
  'Poblacion 3 BHS',
  'Poblacion 4 BHS',
  'Poblacion 5 BHS',
  'Poblacion 6 BHS',
  'Sainz BHS',
  'Sanghay BHS',
  'Tagabakid BHS',
  'Tagbinonga BHS',
  'Taguibo BHS',
  'Tamisan BHS',
];

const mhoServices = [
  'health-service-lying-in',
  'health-service-laboratory',
  'health-service-immunization',
  'health-service-prenatal',
  'health-service-family-planning',
  'health-service-tb-dots',
];

// Legacy .health-facility-card: white card with a primary left rule.
function FacilityCard({
  badge,
  title,
  description,
  location,
}: {
  badge: string;
  title: ReactNode;
  description: ReactNode;
  location: ReactNode;
}) {
  return (
    <div className="rounded-r-lg border border-l-[3px] border-border border-l-primary bg-card p-4 transition hover:border-l-primary-dark hover:shadow-[0_2px_8px_rgba(0,50,160,0.08)]">
      <span className="mb-2 inline-block rounded bg-primary/10 px-2 py-[3px] text-[0.625rem] font-semibold text-primary">
        {badge}
      </span>
      <h3 className="m-0 mb-2 text-base font-semibold text-foreground">{title}</h3>
      <p className="m-0 mb-2.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3 text-primary" aria-hidden="true" />
          {location}
        </span>
      </div>
    </div>
  );
}

function serviceMeta(t: TFn, fee: string, time: string) {
  return (
    <>
      <span>
        <strong className="font-semibold">{t('label-fee')}</strong> {t(fee)}
      </span>
      <span>
        <strong className="font-semibold">{t('label-time')}</strong> {t(time)}
      </span>
    </>
  );
}

export default function ServicesHealth() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('health-page-title')}
        description="Medical consultations, vaccinations, and health programs in Mati, Davao Oriental."
        canonicalPath="/services/health"
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
          <AppLink to="/services" className="hover:text-primary">
            {t('nav-services')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">{t('health-page-title')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <HeartPulse className="size-4" aria-hidden="true" />
            {t('health-page-badge')}
          </>
        }
        title={t('health-page-title')}
        description={t('health-page-desc')}
      />

      {/* Service cards */}
      <Section>
        <Container>
          <Grid min={250}>
            {services.map((s) => (
              <ServiceCard
                key={s.title}
                icon={<s.Icon className="size-5 text-primary" aria-hidden="true" />}
                title={t(s.title)}
                description={t(s.desc)}
                meta={serviceMeta(t, s.fee, s.time)}
              />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Facility statistics */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map(([value, label]) => (
              <StatCard key={label} value={value} label={t(label)} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Hospitals directory */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Hospital className="size-5 text-primary" aria-hidden="true" />
            {t('health-section-hospitals')}
          </SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((h) => (
              <FacilityCard
                key={h.title}
                badge={h.badge}
                title={h.title}
                description={h.desc}
                location={h.loc}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Source:{' '}
            <a
              href={NHFR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              DOH National Health Facility Registry
            </a>{' '}
            {NHFR_RETRIEVED}
          </p>
        </Container>
      </Section>

      {/* City Health Office */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <Building2 className="size-5 text-primary" aria-hidden="true" />
            {t('health-section-mho')}
          </SectionTitle>
          <div className="rounded-r-lg border border-l-[3px] border-border border-l-primary bg-card p-5">
            <h3 className="m-0 mb-2 text-base font-semibold text-foreground">
              {t('health-mho-title')}
            </h3>
            <p className="m-0 mb-3.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {t('health-mho-desc')}
            </p>
            <div className="flex flex-wrap gap-2">
              {mhoServices.map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded bg-muted px-2.5 py-1.5 text-xs text-foreground"
                >
                  <CircleCheck className="size-3 text-primary" aria-hidden="true" />
                  {t(key)}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Barangay Health Stations */}
      <Section compact>
        <Container>
          <SectionTitle>
            <CirclePlus className="size-5 text-primary" aria-hidden="true" />
            {t('health-section-bhs')}
          </SectionTitle>
          <SectionSubtitle>{t('health-bhs-subtitle')}</SectionSubtitle>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
            {bhs.map((name) => (
              <div
                key={name}
                className="rounded-r-md border-l-[3px] border-l-primary bg-muted px-3 py-2.5 text-[0.8125rem] font-medium text-foreground"
              >
                {name}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Source:{' '}
            <a
              href={NHFR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              DOH National Health Facility Registry
            </a>{' '}
            {NHFR_RETRIEVED}
          </p>
        </Container>
      </Section>

      {/* HIV Care Philippines CTA */}
      <section
        className="bg-[radial-gradient(circle,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-muted [background-size:20px_20px] py-12 md:py-16"
        aria-label="HIV Care Philippines facility directory"
      >
        <Container>
          <div className="mx-auto flex w-full flex-col items-center gap-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,46,81,0.08)] px-4 py-1.5 text-[0.8125rem] font-bold tracking-[0.02em] text-[#c4123f] uppercase">
              <ShieldCheck className="size-4" aria-hidden="true" />
              {t('health-hivcare-cta-eyebrow')}
            </span>
            <img
              src="/assets/images/logo/hivcareph-logo.svg"
              alt="HIV Care Philippines"
              className="my-1 h-11 w-auto object-contain"
              width={168}
              height={50}
              loading="lazy"
            />
            <h2 className="m-0 text-[1.75rem] leading-tight font-extrabold text-foreground">
              {t('health-hivcare-cta-heading')}
            </h2>
            <p className="m-0 max-w-[560px] text-base leading-relaxed text-muted-foreground">
              {t('health-hivcare-cta-desc')}
            </p>
            <div className="my-1 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-semibold text-foreground">
              <span className="inline-flex items-center gap-2">
                <Hospital className="size-[1.0625rem] text-[#ff2e51]" aria-hidden="true" />
                <strong className="text-[1.0625rem] font-extrabold text-[#ff2e51]">338</strong>
                {t('health-hivcare-cta-stat-facilities')}
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="size-[1.0625rem] text-[#ff2e51]" aria-hidden="true" />
                {t('health-hivcare-cta-stat-mobile')}
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="size-[1.0625rem] text-[#ff2e51]" aria-hidden="true" />
                {t('health-hivcare-cta-stat-verified')}
              </span>
            </div>
            <a
              href="https://hivcareph.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2.5 rounded-[10px] bg-[#ff2e51] px-9 py-4 text-base font-semibold text-white shadow-[0_4px_16px_rgba(255,46,81,0.25)] transition hover:-translate-y-0.5 hover:bg-[#e0193c] hover:shadow-[0_6px_20px_rgba(255,46,81,0.4)]"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              {t('health-hivcare-cta-btn')}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
