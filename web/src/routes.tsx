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
    ],
  },
];
