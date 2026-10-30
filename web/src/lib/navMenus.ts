import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Globe,
  Store,
  Coins,
  Users,
  HeartPulse,
  Trees,
  Building2,
  GraduationCap,
  ShieldCheck,
  Recycle,
  BookMarked,
  ScrollText,
  Landmark,
  UserRound,
  Newspaper,
  MapPin,
  Phone,
  BarChart3,
  Database,
  HardHat,
  FileSpreadsheet,
  FolderOpen,
  BookOpenCheck,
} from 'lucide-react';

/**
 * Header navigation, shared by the desktop mega menus and the mobile drawer.
 * Every label/description is an i18n key (flat kebab-case, see web/src/i18n.ts).
 */
export type NavMenuItem = { to: string; key: string; descKey: string; Icon: LucideIcon };
export type NavMenuGroup = { key: string; items: NavMenuItem[] };
export type NavMenu = { id: string; groups: NavMenuGroup[] };
export type NavEntry = {
  to: string;
  key: string;
  menu?: NavMenu;
  highlight?: boolean;
  /** Extra path prefixes that also mark this entry active (e.g. /legislative under Government). */
  matches?: string[];
};

const SERVICES: NavMenu = {
  id: 'services',
  groups: [
    {
      key: 'nav-group-records-payments',
      items: [
        {
          to: '/services/certificates',
          key: 'dropdown-certificates',
          descKey: 'nav-desc-certificates',
          Icon: FileText,
        },
        {
          to: '/services/tax-payments',
          key: 'dropdown-tax-payments',
          descKey: 'nav-desc-tax-payments',
          Icon: Coins,
        },
      ],
    },
    {
      key: 'nav-group-business-livelihood',
      items: [
        {
          to: '/services/business',
          key: 'dropdown-business',
          descKey: 'nav-desc-business',
          Icon: Store,
        },
        {
          to: '/services/agriculture',
          key: 'dropdown-agriculture',
          descKey: 'nav-desc-agriculture',
          Icon: Trees,
        },
        {
          to: '/services/education',
          key: 'dropdown-education',
          descKey: 'nav-desc-education',
          Icon: GraduationCap,
        },
      ],
    },
    {
      key: 'nav-group-health-social',
      items: [
        {
          to: '/services/health',
          key: 'dropdown-health',
          descKey: 'nav-desc-health',
          Icon: HeartPulse,
        },
        {
          to: '/services/social-services',
          key: 'dropdown-social-services',
          descKey: 'nav-desc-social-services',
          Icon: Users,
        },
      ],
    },
    {
      key: 'nav-group-safety-environment',
      items: [
        {
          to: '/services/public-safety',
          key: 'dropdown-public-safety',
          descKey: 'nav-desc-public-safety',
          Icon: ShieldCheck,
        },
        {
          to: '/services/infrastructure',
          key: 'dropdown-infrastructure',
          descKey: 'nav-desc-infrastructure',
          Icon: Building2,
        },
        {
          to: '/services/environment',
          key: 'dropdown-environment',
          descKey: 'nav-desc-environment',
          Icon: Recycle,
        },
      ],
    },
  ],
};

const GOVERNMENT: NavMenu = {
  id: 'government',
  groups: [
    {
      key: 'nav-group-city-government',
      items: [
        {
          to: '/government/officials',
          key: 'nav-officials',
          descKey: 'nav-desc-officials',
          Icon: UserRound,
        },
        {
          to: '/government/offices',
          key: 'gov-link-offices',
          descKey: 'gov-link-offices-desc',
          Icon: Building2,
        },
        {
          to: '/government/barangays',
          key: 'gov-link-barangays',
          descKey: 'gov-link-barangays-desc',
          Icon: MapPin,
        },
        {
          to: '/government/links',
          key: 'links-title',
          descKey: 'nav-desc-official-links',
          Icon: Globe,
        },
      ],
    },
    {
      key: 'nav-group-legislation',
      items: [
        {
          to: '/legislative',
          key: 'nav-legislative-overview',
          descKey: 'nav-desc-legislative-overview',
          Icon: Landmark,
        },
        {
          to: '/legislative/ordinance-framework',
          key: 'dropdown-ordinance-framework',
          descKey: 'nav-desc-ordinance-framework',
          Icon: BookMarked,
        },
        {
          to: '/legislative/resolution-framework',
          key: 'dropdown-resolution-framework',
          descKey: 'nav-desc-resolution-framework',
          Icon: ScrollText,
        },
      ],
    },
    {
      key: 'nav-group-public-information',
      items: [
        {
          to: '/contact',
          key: 'gov-link-hotlines',
          descKey: 'gov-link-hotlines-desc',
          Icon: Phone,
        },
        {
          to: '/transparency/finance',
          key: 'nav-public-funds',
          descKey: 'nav-desc-public-funds',
          Icon: Coins,
        },
        {
          to: '/statistics',
          key: 'nav-statistics',
          descKey: 'gov-link-statistics-desc',
          Icon: BarChart3,
        },
        { to: '/news', key: 'nav-news', descKey: 'nav-desc-news', Icon: Newspaper },
      ],
    },
  ],
};

const TRANSPARENCY: NavMenu = {
  id: 'transparency',
  groups: [
    {
      key: 'nav-group-money',
      items: [
        {
          to: '/transparency/finance',
          key: 'finance-page-name',
          descKey: 'transparency-find-finance',
          Icon: Coins,
        },
        {
          to: '/transparency/projects',
          key: 'projects-page-name',
          descKey: 'transparency-find-projects',
          Icon: HardHat,
        },
        {
          to: '/transparency/full-disclosure',
          key: 'fdp-page-name',
          descKey: 'transparency-find-fdp',
          Icon: FileSpreadsheet,
        },
      ],
    },
    {
      key: 'nav-group-records',
      items: [
        {
          to: '/transparency/documents',
          key: 'docs-page-name',
          descKey: 'transparency-find-docs',
          Icon: FolderOpen,
        },
        {
          to: '/legislative',
          key: 'nav-legislative-overview',
          descKey: 'transparency-find-legislation',
          Icon: Landmark,
        },
      ],
    },
    {
      key: 'nav-group-about-data',
      items: [
        {
          to: '/transparency/sources',
          key: 'sources-page-name',
          descKey: 'nav-desc-sources',
          Icon: Database,
        },
        {
          to: '/transparency/methodology',
          key: 'method-page-name',
          descKey: 'transparency-find-method',
          Icon: BookOpenCheck,
        },
      ],
    },
  ],
};

export const NAV: NavEntry[] = [
  { to: '/', key: 'nav-home' },
  { to: '/services', key: 'nav-services', menu: SERVICES },
  { to: '/government', key: 'nav-government', menu: GOVERNMENT, matches: ['/legislative'] },
  { to: '/statistics', key: 'nav-statistics' },
  { to: '/transparency', key: 'nav-transparency', menu: TRANSPARENCY },
  { to: '/about', key: 'nav-about' },
  { to: '/visit-mati', key: 'nav-visit-mati', highlight: true },
];
