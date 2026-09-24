import {
  Store,
  RefreshCw,
  ClipboardCheck,
  Coins,
  Building2,
  Bike,
  Package,
  House,
  FileText,
  Wallet,
  Calculator,
  Award,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import {
  ServiceCategoryPage,
  type CategoryService,
  type CategoryOffice,
} from '@/components/ServiceCategoryPage';

/* ── Business & Trade ─────────────────────────────────────────────────────── */
const businessServices: CategoryService[] = [
  { Icon: FileText, titleKey: 'service-dti-title', descKey: 'service-dti-desc', onlineId: 'dti' },
  {
    Icon: Store,
    titleKey: 'biz-permit-new',
    to: '/service-details/business-permits-licensing',
    descKey: 'biz-permit-new-desc',
  },
  {
    Icon: RefreshCw,
    titleKey: 'biz-permit-renew',
    to: '/service-details/business-permits-licensing',
    descKey: 'biz-permit-renew-desc',
  },
  {
    Icon: ClipboardCheck,
    titleKey: 'biz-closure',
    to: '/service-details/business-permits-licensing',
    descKey: 'biz-closure-desc',
  },
  { Icon: Coins, titleKey: 'biz-cedula', descKey: 'biz-cedula-desc' },
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
      seoDescription="Business permits, renewals, cedula, and business-name registration guidance in Mati."
      badgeIcon={Store}
      badgeKey="biz-page-badge"
      titleKey="biz-page-title"
      descKey="biz-page-desc"
      services={businessServices}
      officesTitleKey="section-responsible-offices"
      offices={businessOffices}
    />
  );
}

/* ── Taxation & Payments ──────────────────────────────────────────────────── */
const taxServices: CategoryService[] = [
  {
    Icon: House,
    titleKey: 'tax-real-property',
    descKey: 'tax-real-property-desc',
  },
  {
    Icon: Store,
    titleKey: 'tax-business',
    descKey: 'tax-business-desc',
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
    />
  );
}

/* ── Education & Scholarship ──────────────────────────────────────────────── */
const educationServices: CategoryService[] = [
  {
    Icon: Award,
    titleKey: 'edu-scholarship',
    descKey: 'edu-scholarship-desc',
  },
  {
    Icon: BookOpen,
    titleKey: 'edu-training',
    onlineId: 'peso',
    descKey: 'edu-training-desc',
  },
];

export function ServicesEducation() {
  return (
    <ServiceCategoryPage
      path="/services/education"
      seoTitleKey="edu-page-title"
      seoDescription="Scholarships, job opportunities and training guidance for Mati."
      badgeIcon={GraduationCap}
      badgeKey="edu-page-badge"
      titleKey="edu-page-title"
      descKey="edu-page-desc"
      services={educationServices}
    />
  );
}
