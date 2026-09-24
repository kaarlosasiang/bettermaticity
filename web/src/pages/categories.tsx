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
import {
  HotlineGrid,
  NationalHotlineBanner,
  HotlineSourceNote,
} from '@/components/HotlineDirectory';

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
          <NationalHotlineBanner />
          <HotlineGrid hotlines={emergencyHotlines} tone="emergency" compact />
          <HotlineSourceNote />
        </Container>
      </Section>
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <HeartPulse className="size-5 text-primary" aria-hidden="true" />
            {t('contact-medical-emergency-hotlines')}
          </SectionTitle>
          <HotlineGrid hotlines={medicalHotlines} tone="medical" compact />
        </Container>
      </Section>
    </>
  );
}

/* ── Certificates ─────────────────────────────────────────────────────────── */
const certificateServices: CategoryService[] = [
  {
    Icon: FileText,
    titleKey: 'cert-birth',
    onlineId: 'psa',
    descKey: 'cert-birth-desc',
    to: '/service-details/birth-certificate',
  },
  {
    Icon: Heart,
    titleKey: 'cert-marriage',
    onlineId: 'psa',
    descKey: 'cert-marriage-desc',
    to: '/service-details/marriage-certificate',
  },
  {
    Icon: FileX,
    titleKey: 'cert-death',
    onlineId: 'psa',
    descKey: 'cert-death-desc',
    to: '/service-details/death-certificate',
  },
  {
    Icon: HouseWifi,
    titleKey: 'cert-brgy-clearance',
    descKey: 'cert-brgy-clearance-desc',
  },
  {
    Icon: IdCard,
    titleKey: 'cert-brgy-id',
    descKey: 'cert-brgy-id-desc',
  },
  {
    Icon: ShieldCheck,
    titleKey: 'cert-police-clearance',
    onlineId: 'police',
    descKey: 'cert-police-clearance-desc',
  },
];

const certificateOffices: CategoryOffice[] = [
  {
    Icon: Building2,
    titleKey: 'cert-office-mcr',
    descKey: 'cert-office-mcr-desc',
    to: '/service-details/municipal-civil-registrar',
  },
  {
    Icon: Users,
    titleKey: 'cert-office-hrm',
    descKey: 'cert-office-hrm-desc',
    to: '/service-details/human-resource-management',
  },
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
  {
    Icon: IdCard,
    titleKey: 'social-senior',
    descKey: 'social-senior-desc',
  },
  {
    Icon: AccessibilityIcon,
    titleKey: 'social-pwd',
    descKey: 'social-pwd-desc',
  },
  {
    Icon: Banknote,
    titleKey: 'social-assistance',
    descKey: 'social-assistance-desc',
  },
  {
    Icon: Gift,
    titleKey: 'social-social-pension',
    descKey: 'social-fee',
  },
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
        {
          Icon: Users,
          titleKey: 'social-mswdo-services',
          descKey: 'social-social-case-studies-indigency-certificates-aics',
          to: '/service-details/mswdo-services',
        },
      ]}
    />
  );
}

/* ── Agriculture ──────────────────────────────────────────────────────────── */
const agricultureServices: CategoryService[] = [
  {
    Icon: Flower,
    titleKey: 'agri-seedling',
    descKey: 'agri-seedling-desc',
  },
  {
    Icon: Wrench,
    titleKey: 'agri-equipment',
    descKey: 'agri-equipment-desc',
  },
  {
    Icon: TrendingUp,
    titleKey: 'agri-livelihood',
    descKey: 'agri-livelihood-desc',
  },
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
        {
          Icon: Trees,
          titleKey: 'agri-office-mao',
          descKey: 'agri-office-mao-desc',
          to: '/service-details/municipal-agriculture',
        },
      ]}
    />
  );
}

/* ── Infrastructure ───────────────────────────────────────────────────────── */
const infrastructureServices: CategoryService[] = [
  {
    Icon: Hammer,
    titleKey: 'infra-building',
    descKey: 'infra-building-desc',
  },
  {
    Icon: House,
    titleKey: 'infra-occupancy-permit',
    descKey: 'infra-certificate-of-occupancy-for-completed-buildings',
  },
  {
    Icon: Ruler,
    titleKey: 'infra-engineering-services',
    descKey: 'infra-technical-assistance-and-plan-review',
  },
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
        {
          Icon: Ruler,
          titleKey: 'infra-municipal-engineering-office',
          descKey: 'infra-building-permits-construction-permits-and',
          to: '/service-details/municipal-engineering',
        },
        {
          Icon: Building2,
          titleKey: 'infra-municipal-planning-development',
          descKey: 'infra-zoning-clearance-locational-clearance-and-land',
          to: '/service-details/municipal-planning',
        },
        {
          Icon: Building2,
          titleKey: 'infra-municipal-general-services-office',
          descKey: 'infra-property-custodianship-supplies-management',
          to: '/service-details/municipal-general-services',
        },
      ]}
    />
  );
}

/* ── Public Safety ────────────────────────────────────────────────────────── */
const safetyServices: CategoryService[] = [
  {
    Icon: TriangleAlert,
    titleKey: 'safety-disaster',
    descKey: 'safety-disaster-desc',
  },
  {
    Icon: CloudRain,
    titleKey: 'safety-disaster-assistance',
    descKey: 'safety-relief-goods-and-evacuation-support',
  },
  {
    Icon: Megaphone,
    titleKey: 'safety-disaster-preparedness',
    descKey: 'safety-training-and-resources-for-disaster-readiness',
  },
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
  {
    Icon: Trash2,
    titleKey: 'env-waste',
    descKey: 'env-waste-desc',
  },
  {
    Icon: Recycle,
    titleKey: 'env-recycling-program',
    descKey: 'env-segregation-and-recycling-initiatives',
  },
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
    ></ServiceCategoryPage>
  );
}
