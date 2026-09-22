import {
  Store,
  RefreshCw,
  ClipboardCheck,
  Coins,
  Receipt,
  CirclePlus,
  Building2,
  Bike,
  Package,
  House,
  HouseWifi,
  CreditCard,
  FileText,
  Wallet,
  Calculator,
  Award,
  BookOpen,
  GraduationCap,
  School,
  Landmark,
  ExternalLink,
} from 'lucide-react';
import {
  ServiceCategoryPage,
  type CategoryService,
  type CategoryOffice,
} from '@/components/ServiceCategoryPage';
import { OnlineServices, type OnlineService } from '@/components/OnlineServices';
import { Container, Section, SectionTitle, StatCard } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';

/* ── Business & Trade ─────────────────────────────────────────────────────── */
const businessServices: CategoryService[] = [
  {
    Icon: Store,
    titleKey: 'biz-permit-new',
    descKey: 'biz-permit-new-desc',
    fee: 'Varies',
    time: '3-5 days',
  },
  {
    Icon: RefreshCw,
    titleKey: 'biz-permit-renew',
    descKey: 'biz-permit-renew-desc',
    fee: 'Varies',
    time: 'Same day',
  },
  {
    Icon: ClipboardCheck,
    titleKey: 'biz-closure',
    descKey: 'biz-closure-desc',
    fee: 'Free',
    time: '1-2 days',
  },
  { Icon: Coins, titleKey: 'biz-cedula', descKey: 'biz-cedula-desc', fee: '₱5+', time: 'Same day' },
];

const businessOnline: OnlineService[] = [
  {
    Icon: Receipt,
    href: 'https://www.filipizen.com/partners/nuevavizcaya_mati/bpls/billing',
    titleKey: 'biz-business-online-billing-payment',
    descKey: 'biz-view-and-pay-your-business-tax-bills-online',
    officeKey: 'biz-bpls-office',
  },
  {
    Icon: CirclePlus,
    href: 'https://www.filipizen.com/partners/nuevavizcaya_mati/bpls/newbusiness',
    titleKey: 'biz-new-business-application',
    descKey: 'biz-apply-for-a-new-business-permit-online',
    officeKey: 'biz-bpls-office',
  },
  {
    Icon: RefreshCw,
    href: 'https://www.filipizen.com/partners/nuevavizcaya_mati/bpls/renewbusiness',
    titleKey: 'biz-business-permit-renewal',
    descKey: 'biz-renew-your-existing-business-permit-online',
    officeKey: 'biz-bpls-office',
  },
];

const businessOffices: CategoryOffice[] = [
  {
    Icon: Building2,
    titleKey: 'biz-business-permits-licensing',
    descKey: 'biz-new-permits-renewals-mayors-clearance-and-other',
    to: '/service-details/business-permits-licensing',
  },
  {
    Icon: Bike,
    titleKey: 'biz-tricycle-franchising-records',
    descKey: 'biz-apply-for-tricycle-franchise-mtof-and-request',
    to: '/service-details/tricycle-franchising',
  },
  {
    Icon: Store,
    titleKey: 'biz-seedo-public-market',
    descKey: 'biz-market-clearance-entrance-fees-vendor-services',
    to: '/service-details/seedo-public-market',
  },
  {
    Icon: Package,
    titleKey: 'biz-seedo-slaughterhouse',
    descKey: 'biz-hog-cattle-goat-and-carabao-slaughter-with-meat',
    to: '/service-details/seedo-slaughterhouse',
  },
];

export function ServicesBusiness() {
  return (
    <ServiceCategoryPage
      path="/services/business"
      seoTitleKey="biz-page-title"
      seoDescription="Business permits, renewals, cedula, and online Filipizen transactions in Mati."
      badgeIcon={Store}
      badgeKey="biz-page-badge"
      titleKey="biz-page-title"
      descKey="biz-page-desc"
      services={businessServices}
      officesTitleKey="section-responsible-offices"
      offices={businessOffices}
    >
      <OnlineServices
        badgeKey="biz-online-badge"
        titleKey="biz-online-title"
        subtitleKey="biz-online-subtitle"
        services={businessOnline}
      />
    </ServiceCategoryPage>
  );
}

/* ── Taxation & Payments ──────────────────────────────────────────────────── */
const taxServices: CategoryService[] = [
  {
    Icon: House,
    titleKey: 'tax-real-property',
    descKey: 'tax-real-property-desc',
    fee: 'Based on value',
    time: 'Same day',
  },
  {
    Icon: Store,
    titleKey: 'tax-business',
    descKey: 'tax-business-desc',
    fee: 'Varies',
    time: 'Same day',
  },
];

const taxOnline: OnlineService[] = [
  {
    Icon: HouseWifi,
    href: 'https://www.filipizen.com/partners/nuevavizcaya_mati/rptis/billing',
    titleKey: 'tax-real-property-tax-billing-payment',
    descKey: 'tax-view-and-pay-your-real-property-tax-amilyar-online',
    officeKey: 'tax-municipal-treasurers-office',
  },
  {
    Icon: CreditCard,
    href: 'https://www.filipizen.com/partners/nuevavizcaya_mati/po/billing',
    titleKey: 'tax-online-payment-order',
    descKey: 'tax-process-payment-orders-for-various-municipal-fees',
    officeKey: 'tax-municipal-treasurers-office',
  },
];

const taxOffices: CategoryOffice[] = [
  {
    Icon: Coins,
    titleKey: 'tax-municipal-treasurers-office',
    descKey: 'tax-tax-collection-cedula-clearances-and-payment',
    to: '/service-details/municipal-treasurer',
  },
  {
    Icon: FileText,
    titleKey: 'tax-municipal-assessors-office',
    descKey: 'tax-property-declaration-tax-assessment-and-land',
    to: '/service-details/municipal-assessor',
  },
  {
    Icon: Wallet,
    titleKey: 'tax-municipal-budget-office',
    descKey: 'tax-obligation-requests-barangay-budget-review-and',
    to: '/service-details/municipal-budget',
  },
  {
    Icon: Calculator,
    titleKey: 'tax-municipal-accounting-office',
    descKey: 'tax-preaudit-of-disbursements-payroll-check-issuance',
    to: '/service-details/municipal-accounting',
  },
];

export function ServicesTaxPayments() {
  return (
    <ServiceCategoryPage
      path="/services/tax-payments"
      seoTitleKey="tax-page-title"
      seoDescription="Real property tax, business tax, and online payment services in Mati."
      badgeIcon={Coins}
      badgeKey="tax-page-badge"
      titleKey="tax-page-title"
      descKey="tax-page-desc"
      services={taxServices}
      officesTitleKey="section-responsible-offices"
      offices={taxOffices}
    >
      <OnlineServices
        badgeKey="biz-online-badge"
        titleKey="tax-online-title"
        subtitleKey="tax-online-subtitle"
        services={taxOnline}
      />
    </ServiceCategoryPage>
  );
}

/* ── Education & Scholarship ──────────────────────────────────────────────── */
const educationServices: CategoryService[] = [
  {
    Icon: Award,
    titleKey: 'edu-scholarship',
    descKey: 'edu-scholarship-desc',
    fee: 'Free',
    time: 'Annual application',
  },
  {
    Icon: BookOpen,
    titleKey: 'edu-training',
    descKey: 'edu-training-desc',
    fee: 'Free',
    time: 'Per semester',
  },
];

const elementary = [
  'edu-aggub-elementary-school',
  'edu-aldersgate-college-elementary-department',
  'edu-bagahabag-elementary-school',
  'edu-bangaan-elementary-school',
  'edu-bangar-elementary-school',
  'edu-bascaran-central-school',
  'edu-calaoagan-elementary-school',
  'edu-concepcion-elementary-school',
  'edu-curifang-elementary-school',
  'edu-dadap-elementary-school',
  'edu-isaiah-christian-academy-of-mati-inc',
  'edu-kids-workshop-learning-center',
  'edu-lactawan-elementary-school',
  'edu-pilar-d-galima-elementary-school',
  'edu-saint-louis-school-elementary-department',
  'edu-san-juan-elementary-school',
  'edu-san-luis-elementary-school',
  'edu-mati-east-central-school',
  'edu-mati-north-elementary-school',
  'edu-mati-south-central-school',
  'edu-mati-west-elementary-school',
  'edu-tucal-elementary-school',
  'edu-uddiawan-elementary-school',
  'edu-wacal-elementary-school',
];

const secondary = [
  'edu-aldersgate-college-high-school-department',
  'edu-bascaran-national-high-school',
  'edu-dalton-high-school',
  'edu-mati-high-school',
  'edu-saint-louis-school-high-school-department',
  'edu-uddiawan-national-high-school',
];

const higher = [
  'edu-aldersgate-college',
  'edu-cagayan-valley-maritime-studies',
  'edu-fuzeko-polytechnic-college',
  'edu-mati-institute-of-technology',
  'edu-nueva-vizcaya-caregiver-academy',
  'edu-nio-jesus-de-praga-learning',
  'edu-saint-louis-college-of-mati-inc',
];

function SchoolList({
  titleKey,
  icon: Icon,
  items,
}: {
  titleKey: string;
  icon: typeof School;
  items: string[];
}) {
  const { t } = useLanguage();
  return (
    <div className="mb-8">
      <SectionTitle className="text-lg">
        <Icon className="size-5 text-primary" aria-hidden="true" />
        {t(titleKey)}
      </SectionTitle>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2">
        {items.map((k) => (
          <div
            key={k}
            className="rounded-r-md border-l-[3px] border-l-primary bg-muted px-3 py-2.5 text-[0.8125rem] font-medium text-foreground"
          >
            {t(k)}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationExtras() {
  const { t } = useLanguage();
  return (
    <>
      {/* Stats */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard value="22" label={t('edu-primary-elementary')} />
            <StatCard value="6" label={t('edu-secondary-schools')} />
            <StatCard value="7" label={t('edu-higher-education')} />
          </div>
        </Container>
      </Section>

      {/* School directories */}
      <Section compact>
        <Container>
          <SchoolList titleKey="edu-primary-elementary" icon={School} items={elementary} />
          <SchoolList titleKey="edu-secondary-schools" icon={GraduationCap} items={secondary} />
          <SchoolList
            titleKey="edu-higher-educational-institutions"
            icon={Landmark}
            items={higher}
          />
        </Container>
      </Section>

      {/* Abakada CTA */}
      <Section compact altBg>
        <Container>
          <div className="flex flex-col items-center gap-4 rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-8 text-center">
            <img
              src="/assets/images/logo/abakada-light.svg"
              alt="Abakada.org"
              className="h-10 w-auto"
              loading="lazy"
            />
            <p className="m-0 max-w-[560px] text-sm text-muted-foreground">
              {t('edu-empowering-filipino-students-and-educators-with')}
            </p>
            <a
              href="https://abakada.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              {t('edu-free-tools-for-education')}
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}

export function ServicesEducation() {
  return (
    <ServiceCategoryPage
      path="/services/education"
      seoTitleKey="edu-page-title"
      seoDescription="Scholarships, training programs, and the school directory for Mati."
      badgeIcon={GraduationCap}
      badgeKey="edu-page-badge"
      titleKey="edu-page-title"
      descKey="edu-page-desc"
      services={educationServices}
    >
      <EducationExtras />
    </ServiceCategoryPage>
  );
}
