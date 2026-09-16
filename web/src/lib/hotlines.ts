import type { LucideIcon } from 'lucide-react';
import {
  TriangleAlert,
  Shield,
  Heart,
  Radio,
  Zap,
  Building2,
  Store,
  Trees,
  TrafficCone,
  Flame,
  Hospital,
  Truck,
  CirclePlus,
} from 'lucide-react';

export type Hotline = { Icon: LucideIcon; tel: string; key: string; fallback: string };

/** Emergency hotlines — shared by the Contact and Public Safety pages. */
export const emergencyHotlines: Hotline[] = [
  { Icon: TriangleAlert, tel: '09263833744', key: 'contact-mdrrmo-mati-0926-383-3744', fallback: 'MDRRMO Mati 0926 383 3744' },
  { Icon: Shield, tel: '09274008033', key: 'contact-pnp-mati-0927-400-8033', fallback: 'PNP Mati 0927 400 8033' },
  { Icon: Heart, tel: '09162840885', key: 'contact-mswdo-mati-0916-284-0885', fallback: 'MSWDO Mati 0916 284 0885' },
  { Icon: Radio, tel: '09054471061', key: 'contact-kabalikat-civicom-0905-447-1061', fallback: 'KABALIKAT Civicom 0905 447 1061' },
  { Icon: Zap, tel: '09358121081', key: 'contact-nuvelco-mati-0935-812-1081', fallback: 'NUVELCO Mati 0935 812 1081' },
  { Icon: Building2, tel: '09175951931', key: 'contact-mayors-office-0917-595-1931', fallback: "Mayor's Office 0917 595 1931" },
  { Icon: Building2, tel: '09061880868', key: 'contact-dilg-mati-0906-188-0868', fallback: 'DILG Mati 0906 188 0868' },
  { Icon: Store, tel: '09171345511', key: 'contact-seedo-public-market-0917-134-5511', fallback: 'SEEDO Public Market 0917 134 5511' },
  { Icon: Trees, tel: '09161744979', key: 'contact-magro-mati-0916-174-4979', fallback: 'MAGRO Mati 0916 174 4979' },
  { Icon: TrafficCone, tel: '09171227150', key: 'contact-pdrrmo-n-vizcaya-0917-122-7150', fallback: 'PDRRMO N. Vizcaya 0917 122 7150' },
  { Icon: Flame, tel: '09360620305', key: 'contact-bfp-mati-0936-062-0305', fallback: 'BFP Mati 0936 062 0305' },
];

/** Medical emergency hotlines — shared by the Contact and Public Safety pages. */
export const medicalHotlines: Hotline[] = [
  { Icon: Hospital, tel: '09679103054', key: 'contact-rhu-mati-0967-910-3054', fallback: 'RHU Mati 0967 910 3054' },
  { Icon: Truck, tel: '09068195569', key: 'contact-r2tmc-former-vrh-0906-819-5569', fallback: 'R2TMC (Former VRH) 0906 819 5569' },
  { Icon: Hospital, tel: '09208335766', key: 'contact-plt-hospital-0920-833-5766', fallback: 'PLT Hospital 0920 833 5766' },
  { Icon: Hospital, tel: '09474981746', key: 'contact-mmg-hospital-0947-498-1746', fallback: 'MMG Hospital 0947 498 1746' },
  { Icon: Hospital, tel: '09171080452', key: 'contact-salubris-hospital-0917-108-0452', fallback: 'Salubris Hospital 0917 108 0452' },
  { Icon: CirclePlus, tel: '09175079950', key: 'contact-red-cross-0917-507-9950', fallback: 'Red Cross 0917 507 9950' },
];
