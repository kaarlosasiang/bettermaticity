import {
  FileText,
  Heart,
  FileX,
  HouseWifi,
  IdCard,
  ShieldCheck,
  Building2,
  Users,
  Accessibility as AccessibilityIcon,
  Banknote,
  Gift,
  Flower,
  Wrench,
  TrendingUp,
  Trees,
  Hammer,
  House,
  Ruler,
  TriangleAlert,
  CloudRain,
  Megaphone,
  Trash2,
  Recycle,
  HeartPulse,
} from 'lucide-react';
import {
  ServiceCategoryPage,
  type CategoryService,
  type CategoryOffice,
} from '@/components/ServiceCategoryPage';
import { Section, Container, SectionTitle } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';
import { emergencyHotlines, medicalHotlines } from '@/lib/hotlines';

/* ── Public Safety hotline directories (rendered as category page children) ── */
function PublicSafetyHotlines() {
  const { t } = useLanguage();
  return (
    <>
      <Section compact>
        <Container>
          <SectionTitle>
            <TriangleAlert className="size-5 text-primary" aria-hidden="true" />
            {t('contact-hotlines')}
          </SectionTitle>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {emergencyHotlines.map((h) => (
              <a
                key={h.tel}
                href={`tel:${h.tel}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-foreground no-underline transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
              >
                <h.Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">{t(h.key) || h.fallback}</span>
              </a>
            ))}
          </div>
        </Container>
      </Section>
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <HeartPulse className="size-5 text-primary" aria-hidden="true" />
            {t('contact-medical-emergency-hotlines')}
          </SectionTitle>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {medicalHotlines.map((h) => (
              <a
                key={h.tel}
                href={`tel:${h.tel}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-foreground no-underline transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
              >
                <h.Icon className="size-5 shrink-0 text-brand-accent" aria-hidden="true" />
                <span className="text-sm font-medium">{t(h.key) || h.fallback}</span>
              </a>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ── Environment "Key Environmental Services & Initiatives" (page children) ── */
const envInitiatives: { titleKey: string; descKey: string }[] = [
  { titleKey: 'env-drainage-sewerage-management', descKey: 'env-developing-a-comprehensive-system-plan-to' },
  { titleKey: 'env-solid-waste-management', descKey: 'env-implementing-the-10year-plan-including-waste' },
  { titleKey: 'env-flood-control-mitigation', descKey: 'env-declogging-drainage-clearing-waterways-and' },
  { titleKey: 'env-forest-land-use-programs', descKey: 'env-tree-planting-and-reforestation-programs-to' },
  { titleKey: 'env-public-education-awareness', descKey: 'env-iec-campaigns-on-ra-9003-solid-waste-management' },
];

function EnvironmentInitiatives() {
  const { t } = useLanguage();
  return (
    <Section compact altBg>
      <Container>
        <SectionTitle>
          <Trees className="size-5 text-primary" aria-hidden="true" />
          {t('env-key-environmental-services-and-initiatives')}
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {envInitiatives.map((it, i) => (
            <div key={it.titleKey} className="flex gap-3 rounded-xl border border-border bg-card p-5">
              <span className="text-lg font-bold text-primary/40">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="mb-0.5 text-sm font-semibold text-foreground">{t(it.titleKey)}</h3>
                <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(it.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── Certificates ─────────────────────────────────────────────────────────── */
const certificateServices: CategoryService[] = [
  { Icon: FileText, titleKey: 'cert-birth', descKey: 'cert-birth-desc', fee: '₱150', time: '15-30 mins', to: '/service-details/birth-certificate' },
  { Icon: Heart, titleKey: 'cert-marriage', descKey: 'cert-marriage-desc', fee: 'Free (Registration)', time: '5 mins', to: '/service-details/marriage-certificate' },
  { Icon: FileX, titleKey: 'cert-death', descKey: 'cert-death-desc', fee: '₱50-150', time: '~1.5 hrs', to: '/service-details/death-certificate' },
  { Icon: HouseWifi, titleKey: 'cert-brgy-clearance', descKey: 'cert-brgy-clearance-desc', fee: '₱50-100', time: 'Same day' },
  { Icon: IdCard, titleKey: 'cert-brgy-id', descKey: 'cert-brgy-id-desc', fee: 'Free', time: '1-2 days' },
  { Icon: ShieldCheck, titleKey: 'cert-police-clearance', descKey: 'cert-police-clearance-desc', fee: 'Varies', time: '3-5 days' },
];

const certificateOffices: CategoryOffice[] = [
  { Icon: Building2, titleKey: 'cert-office-mcr', descKey: 'cert-office-mcr-desc', to: '/service-details/municipal-civil-registrar' },
  { Icon: Users, titleKey: 'cert-office-hrm', descKey: 'cert-office-hrm-desc', to: '/service-details/human-resource-management' },
];

export function ServicesCertificates() {
  return (
    <ServiceCategoryPage
      path="/services/certificates"
      seoTitleKey="cert-page-title"
      seoDescription="Birth, marriage, and death certificates, clearances, and IDs from LGU Mati."
      badgeIcon={FileText}
      badgeKey="cert-page-badge"
      titleKey="cert-page-title"
      descKey="cert-page-desc"
      homeKey="cert-home"
      servicesKey="cert-services"
      services={certificateServices}
      officesTitleKey="cert-offices-title"
      offices={certificateOffices}
    />
  );
}

/* ── Social Services ──────────────────────────────────────────────────────── */
const socialServices: CategoryService[] = [
  { Icon: IdCard, titleKey: 'social-senior', descKey: 'social-senior-desc', fee: 'Free', time: '1 day' },
  { Icon: AccessibilityIcon, titleKey: 'social-pwd', descKey: 'social-pwd-desc', fee: 'Free', time: '1-2 days' },
  { Icon: Banknote, titleKey: 'social-assistance', descKey: 'social-assistance-desc', fee: 'Free', time: '3-5 days' },
  { Icon: Gift, titleKey: 'social-social-pension', descKey: 'social-fee', fee: 'Free', time: 'Quarterly release' },
];

export function ServicesSocial() {
  return (
    <ServiceCategoryPage
      path="/services/social-services"
      seoTitleKey="social-page-title"
      seoDescription="Senior citizen, PWD, financial assistance, and social pension services in Mati."
      badgeIcon={Users}
      badgeKey="social-page-badge"
      titleKey="social-page-title"
      descKey="social-page-desc"
      services={socialServices}
      officesTitleKey="section-responsible-offices"
      offices={[
        { Icon: Users, titleKey: 'social-mswdo-services', descKey: 'social-social-case-studies-indigency-certificates-aics', to: '/service-details/mswdo-services' },
      ]}
    />
  );
}

/* ── Agriculture ──────────────────────────────────────────────────────────── */
const agricultureServices: CategoryService[] = [
  { Icon: Flower, titleKey: 'agri-seedling', descKey: 'agri-seedling-desc', fee: 'Free', time: 'Seasonal' },
  { Icon: Wrench, titleKey: 'agri-equipment', descKey: 'agri-equipment-desc', fee: 'Subsidized', time: 'By schedule' },
  { Icon: TrendingUp, titleKey: 'agri-livelihood', descKey: 'agri-livelihood-desc', fee: 'Free', time: 'Varies' },
];

export function ServicesAgriculture() {
  return (
    <ServiceCategoryPage
      path="/services/agriculture"
      seoTitleKey="agri-page-title"
      seoDescription="Seedlings, equipment, and livelihood programs from the City Agriculture Office."
      badgeIcon={Trees}
      badgeKey="agri-page-badge"
      titleKey="agri-page-title"
      descKey="agri-page-desc"
      services={agricultureServices}
      officesTitleKey="agri-responsible-offices"
      offices={[
        { Icon: Trees, titleKey: 'agri-office-mao', descKey: 'agri-office-mao-desc', to: '/service-details/municipal-agriculture' },
      ]}
    />
  );
}

/* ── Infrastructure ───────────────────────────────────────────────────────── */
const infrastructureServices: CategoryService[] = [
  { Icon: Hammer, titleKey: 'infra-building', descKey: 'infra-building-desc', fee: 'Varies', time: '7-14 days' },
  { Icon: House, titleKey: 'infra-occupancy-permit', descKey: 'infra-certificate-of-occupancy-for-completed-buildings', fee: 'Varies', time: '3-5 days' },
  { Icon: Ruler, titleKey: 'infra-engineering-services', descKey: 'infra-technical-assistance-and-plan-review', fee: 'Varies', time: 'Varies' },
];

export function ServicesInfrastructure() {
  return (
    <ServiceCategoryPage
      path="/services/infrastructure"
      seoTitleKey="infra-page-title"
      seoDescription="Building permits, occupancy certificates, and engineering services in Mati."
      badgeIcon={Building2}
      badgeKey="infra-page-badge"
      titleKey="infra-page-title"
      descKey="infra-page-desc"
      services={infrastructureServices}
      officesTitleKey="section-responsible-offices"
      offices={[
        { Icon: Ruler, titleKey: 'infra-municipal-engineering-office', descKey: 'infra-building-permits-construction-permits-and', to: '/service-details/municipal-engineering' },
        { Icon: Building2, titleKey: 'infra-municipal-planning-development', descKey: 'infra-zoning-clearance-locational-clearance-and-land', to: '/service-details/municipal-planning' },
        { Icon: Building2, titleKey: 'infra-municipal-general-services-office', descKey: 'infra-property-custodianship-supplies-management', to: '/service-details/municipal-general-services' },
      ]}
    />
  );
}

/* ── Public Safety ────────────────────────────────────────────────────────── */
const safetyServices: CategoryService[] = [
  { Icon: TriangleAlert, titleKey: 'safety-disaster', descKey: 'safety-disaster-desc', time: '24/7' },
  { Icon: CloudRain, titleKey: 'safety-disaster-assistance', descKey: 'safety-relief-goods-and-evacuation-support', fee: 'Free', time: 'MDRRMO' },
  { Icon: Megaphone, titleKey: 'safety-disaster-preparedness', descKey: 'safety-training-and-resources-for-disaster-readiness', fee: 'Free', time: 'MDRRMO' },
];

export function ServicesPublicSafety() {
  return (
    <ServiceCategoryPage
      path="/services/public-safety"
      seoTitleKey="safety-page-title"
      seoDescription="Disaster response, relief assistance, and preparedness programs in Mati."
      badgeIcon={ShieldCheck}
      badgeKey="safety-page-badge"
      titleKey="safety-page-title"
      descKey="safety-page-desc"
      services={safetyServices}
    >
      <PublicSafetyHotlines />
    </ServiceCategoryPage>
  );
}

/* ── Environment ──────────────────────────────────────────────────────────── */
const environmentServices: CategoryService[] = [
  { Icon: Trash2, titleKey: 'env-waste', descKey: 'env-waste-desc', fee: 'Free', time: 'Weekly schedule' },
  { Icon: Recycle, titleKey: 'env-recycling-program', descKey: 'env-segregation-and-recycling-initiatives', fee: 'Free', time: 'Ongoing' },
];

export function ServicesEnvironment() {
  return (
    <ServiceCategoryPage
      path="/services/environment"
      seoTitleKey="env-page-title"
      seoDescription="Waste management, segregation, and recycling programs in Mati."
      badgeIcon={Recycle}
      badgeKey="env-page-badge"
      titleKey="env-page-title"
      descKey="env-page-desc"
      services={environmentServices}
    >
      <EnvironmentInitiatives />
    </ServiceCategoryPage>
  );
}
