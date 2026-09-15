import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServicesHealth from './pages/ServicesHealth';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Accessibility from './pages/Accessibility';
import Faq from './pages/Faq';
import SitemapPage from './pages/SitemapPage';
import Contact from './pages/Contact';
import {
  ServicesCertificates,
  ServicesSocial,
  ServicesAgriculture,
  ServicesInfrastructure,
  ServicesPublicSafety,
  ServicesEnvironment,
} from './pages/categories';
import {
  ServicesBusiness,
  ServicesTaxPayments,
  ServicesEducation,
} from './pages/categories2';
import Government from './pages/Government';
import GovernmentOfficials from './pages/GovernmentOfficials';
import Legislative from './pages/Legislative';
import OrdinanceFramework from './pages/OrdinanceFramework';
import ResolutionFramework from './pages/ResolutionFramework';
import News from './pages/News';
import Budget from './pages/Budget';
import Statistics from './pages/Statistics';
import BirthCertificate from './pages/service-details/BirthCertificate';
import DeathCertificate from './pages/service-details/DeathCertificate';
import MarriageCertificate from './pages/service-details/MarriageCertificate';
import MunicipalTreasurer from './pages/service-details/MunicipalTreasurer';
import TricycleFranchising from './pages/service-details/TricycleFranchising';
import PropertyDeclaration from './pages/service-details/PropertyDeclaration';
import MunicipalPlanning from './pages/service-details/MunicipalPlanning';
import MunicipalEngineering from './pages/service-details/MunicipalEngineering';
import GeneralServices from './pages/service-details/GeneralServices';
import MunicipalAgriculture from './pages/service-details/MunicipalAgriculture';
import BusinessPermitsLicensing from './pages/service-details/BusinessPermitsLicensing';
import CivilRegistrar from './pages/service-details/CivilRegistrar';
import MunicipalAccounting from './pages/service-details/MunicipalAccounting';
import MunicipalGeneralServices from './pages/service-details/MunicipalGeneralServices';
import SeedoPublicMarket from './pages/service-details/SeedoPublicMarket';
import HumanResourceManagement from './pages/service-details/HumanResourceManagement';
import Mswdo from './pages/service-details/Mswdo';
import MswdoServices from './pages/service-details/MswdoServices';
import MunicipalBudget from './pages/service-details/MunicipalBudget';
import MunicipalCivilRegistrar from './pages/service-details/MunicipalCivilRegistrar';
import SeedoSlaughterhouse from './pages/service-details/SeedoSlaughterhouse';
import MunicipalAssessor from './pages/service-details/MunicipalAssessor';

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: Services },
      { path: 'services/health', Component: ServicesHealth },
      { path: 'services/certificates', Component: ServicesCertificates },
      { path: 'services/social-services', Component: ServicesSocial },
      { path: 'services/agriculture', Component: ServicesAgriculture },
      { path: 'services/infrastructure', Component: ServicesInfrastructure },
      { path: 'services/public-safety', Component: ServicesPublicSafety },
      { path: 'services/environment', Component: ServicesEnvironment },
      { path: 'services/business', Component: ServicesBusiness },
      { path: 'services/tax-payments', Component: ServicesTaxPayments },
      { path: 'services/education', Component: ServicesEducation },
      { path: 'privacy', Component: Privacy },
      { path: 'terms', Component: Terms },
      { path: 'accessibility', Component: Accessibility },
      { path: 'faq', Component: Faq },
      { path: 'sitemap', Component: SitemapPage },
      { path: 'contact', Component: Contact },
      { path: 'government', Component: Government },
      { path: 'government/officials', Component: GovernmentOfficials },
      { path: 'legislative', Component: Legislative },
      { path: 'legislative/ordinance-framework', Component: OrdinanceFramework },
      { path: 'legislative/resolution-framework', Component: ResolutionFramework },
      { path: 'news', Component: News },
      { path: 'budget', Component: Budget },
      { path: 'statistics', Component: Statistics },
      { path: 'service-details/birth-certificate', Component: BirthCertificate },
      { path: 'service-details/death-certificate', Component: DeathCertificate },
      { path: 'service-details/marriage-certificate', Component: MarriageCertificate },
      { path: 'service-details/municipal-treasurer', Component: MunicipalTreasurer },
      { path: 'service-details/tricycle-franchising', Component: TricycleFranchising },
      { path: 'service-details/property-declaration', Component: PropertyDeclaration },
      { path: 'service-details/municipal-planning', Component: MunicipalPlanning },
      { path: 'service-details/municipal-engineering', Component: MunicipalEngineering },
      { path: 'service-details/general-services', Component: GeneralServices },
      { path: 'service-details/municipal-agriculture', Component: MunicipalAgriculture },
      { path: 'service-details/business-permits-licensing', Component: BusinessPermitsLicensing },
      { path: 'service-details/civil-registrar', Component: CivilRegistrar },
      { path: 'service-details/municipal-accounting', Component: MunicipalAccounting },
      { path: 'service-details/municipal-general-services', Component: MunicipalGeneralServices },
      { path: 'service-details/seedo-public-market', Component: SeedoPublicMarket },
      { path: 'service-details/human-resource-management', Component: HumanResourceManagement },
      { path: 'service-details/mswdo', Component: Mswdo },
      { path: 'service-details/mswdo-services', Component: MswdoServices },
      { path: 'service-details/municipal-budget', Component: MunicipalBudget },
      { path: 'service-details/municipal-civil-registrar', Component: MunicipalCivilRegistrar },
      { path: 'service-details/seedo-slaughterhouse', Component: SeedoSlaughterhouse },
      { path: 'service-details/municipal-assessor', Component: MunicipalAssessor },
    ],
  },
];
