import type { LucideIcon } from 'lucide-react';
import {
  Heart,
  Users,
  Clock,
  CalendarCheck,
  Phone,
  ShieldCheck,
  HeartPulse,
  CupSoda,
  Smile,
  Briefcase,
  Gift,
  Store,
  Banknote,
  UserCheck,
  User,
  MapPin,
  Coins,
  CircleCheck,
  CalendarDays,
  GraduationCap,
  TrendingUp,
  Percent,
  PhoneIncoming,
  House,
  MessageCircleHeart,
  FileText,
  HeartHandshake,
  BookOpen,
  RefreshCw,
  EggFried,
  ClipboardPlus,
  Hospital,
  Flower2,
  Bus,
  Building2,
  IdCard,
  Mail,
  Link as LinkIcon,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';
import { hotlineById, primaryNumber } from '@/lib/hotlines';

// Social-welfare hotline comes from the verified emergency-hotline dataset.
const cswdo = hotlineById('cswdo');

type TFn = (key: string) => string;

/** A value that is either a translated key (string) or verbatim plain text ({ lit }). */
type Item = string | { lit: string };

type InfoBoxData = { Icon: LucideIcon; label: string; value: Item; small: string };

type CardData = { Icon: LucideIcon; title: string; desc: string };

type Body =
  | { kind: 'about'; heading: string; text: string }
  | { kind: 'list'; heading: string; items: string[] }
  | { kind: 'cards'; heading?: string; cards: CardData[] }
  | { kind: 'reqs'; heading: string; items: string[] };

type ServiceSection = {
  id: string;
  gradient: string;
  Icon: LucideIcon;
  title: string;
  subtitle: Item;
  infoBoxes: InfoBoxData[];
  body: Body[];
};

const sections: ServiceSection[] = [
  {
    id: 'protective',
    gradient: 'from-red-500 to-red-600',
    Icon: ShieldCheck,
    title: 'mswdo-protective-services-for-individuals-and-families',
    subtitle: 'mswdo-support-and-intervention-for-vulnerable',
    infoBoxes: [
      {
        Icon: Clock,
        label: 'mswdo-processing-time',
        value: 'mswdo-immediate',
        small: 'Emergency cases',
      },
      { Icon: Banknote, label: 'mswdo-fee', value: 'mswdo-free', small: 'No charges' },
      {
        Icon: UserCheck,
        label: 'mswdo-who-can-apply',
        value: 'mswdo-anyone-in-need',
        small: 'Individuals/Families',
      },
      {
        Icon: CalendarCheck,
        label: 'mswdo-availability',
        value: { lit: '24/7' },
        small: 'Emergency hotline',
      },
    ],
    body: [
      {
        kind: 'about',
        heading: 'mswdo-about-protective-services',
        text: 'mswdo-provides-immediate-intervention-and-support-for',
      },
      {
        kind: 'list',
        heading: 'mswdo-beneficiaries',
        items: [
          'mswdo-victims-of-abuse-neglect-and-exploitation',
          'mswdo-children-in-conflict-with-the-law-cicl',
          'mswdo-women-in-especially-difficult-circumstances',
          'mswdo-abandoned-and-neglected-children',
          'mswdo-families-in-crisis-situations',
          'mswdo-victims-of-trafficking',
        ],
      },
      {
        kind: 'cards',
        heading: 'mswdo-services-provided',
        cards: [
          {
            Icon: PhoneIncoming,
            title: 'mswdo-crisis-intervention',
            desc: 'mswdo-immediate-response-and-intervention-for-emergency',
          },
          {
            Icon: House,
            title: 'mswdo-temporary-shelter',
            desc: 'mswdo-safe-shelter-for-victims-needing-immediate',
          },
          {
            Icon: MessageCircleHeart,
            title: 'mswdo-counseling-services',
            desc: 'mswdo-psychosocial-support-and-counseling-for-affected',
          },
          {
            Icon: FileText,
            title: 'mswdo-legal-assistance',
            desc: 'mswdo-referral-and-coordination-for-legal-aid-services',
          },
        ],
      },
    ],
  },
  {
    id: 'rehabilitation',
    gradient: 'from-violet-500 to-violet-600',
    Icon: HeartPulse,
    title: 'mswdo-rehabilitation-services',
    subtitle: 'mswdo-recovery-and-reintegration-programs-for',
    infoBoxes: [
      {
        Icon: Clock,
        label: 'mswdo-processing-time',
        value: 'mswdo-varies',
        small: 'Case-dependent',
      },
      { Icon: Banknote, label: 'mswdo-fee', value: 'mswdo-free', small: 'No charges' },
      {
        Icon: UserCheck,
        label: 'mswdo-who-can-apply',
        value: 'mswdo-referred-clients',
        small: 'Assessment required',
      },
      {
        Icon: CalendarCheck,
        label: 'mswdo-availability',
        value: { lit: 'Mon-Fri' },
        small: '8AM - 5PM',
      },
    ],
    body: [
      {
        kind: 'about',
        heading: 'mswdo-about-rehabilitation-services',
        text: 'mswdo-comprehensive-rehabilitation-programs-designed-to',
      },
      {
        kind: 'cards',
        cards: [
          {
            Icon: HeartHandshake,
            title: 'mswdo-psychosocial-rehabilitation',
            desc: 'mswdo-counseling-and-therapy-sessions-for-emotional-and',
          },
          {
            Icon: Users,
            title: 'mswdo-family-reintegration',
            desc: 'mswdo-programs-to-reunite-and-strengthen-family',
          },
          {
            Icon: BookOpen,
            title: 'mswdo-skills-training',
            desc: 'mswdo-vocational-and-life-skills-training-for',
          },
          {
            Icon: RefreshCw,
            title: 'mswdo-aftercare-services',
            desc: 'mswdo-followup-support-and-monitoring-after',
          },
        ],
      },
    ],
  },
  {
    id: 'feeding',
    gradient: 'from-amber-500 to-amber-600',
    Icon: CupSoda,
    title: 'mswdo-supplementary-feeding-program',
    subtitle: 'mswdo-nutrition-support-for-malnourished-children-and',
    infoBoxes: [
      { Icon: Clock, label: 'mswdo-duration', value: 'mswdo-120-days', small: 'Feeding cycle' },
      { Icon: Banknote, label: 'mswdo-fee', value: 'mswdo-free', small: 'No charges' },
      {
        Icon: UserCheck,
        label: 'mswdo-beneficiaries',
        value: 'mswdo-children-05',
        small: 'Malnourished',
      },
      {
        Icon: CalendarCheck,
        label: 'mswdo-schedule',
        value: 'mswdo-daily',
        small: 'During program',
      },
    ],
    body: [
      {
        kind: 'about',
        heading: 'mswdo-about-the-feeding-program',
        text: 'mswdo-the-supplementary-feeding-program-aims-to-improve',
      },
      {
        kind: 'cards',
        heading: 'mswdo-program-components',
        cards: [
          {
            Icon: EggFried,
            title: 'mswdo-hot-meals',
            desc: 'mswdo-nutritious-hot-meals-provided-daily-to',
          },
          {
            Icon: ClipboardPlus,
            title: 'mswdo-growth-monitoring',
            desc: 'mswdo-regular-weighing-and-height-measurement-to-track',
          },
          {
            Icon: GraduationCap,
            title: 'mswdo-nutrition-education',
            desc: 'mswdo-parent-education-on-proper-nutrition-and-child',
          },
        ],
      },
      {
        kind: 'reqs',
        heading: 'mswdo-requirements',
        items: [
          'Birth Certificate',
          'Barangay Certificate',
          'Nutritional Assessment',
          'Parent/Guardian ID',
        ],
      },
    ],
  },
  {
    id: 'daycare',
    gradient: 'from-emerald-500 to-emerald-600',
    Icon: Smile,
    title: 'mswdo-day-care-services',
    subtitle: 'mswdo-early-childhood-care-and-development-program',
    infoBoxes: [
      { Icon: Clock, label: 'mswdo-schedule', value: { lit: 'Mon-Fri' }, small: 'School year' },
      { Icon: Banknote, label: 'mswdo-fee', value: 'mswdo-free', small: 'No tuition' },
      {
        Icon: UserCheck,
        label: 'mswdo-age-group',
        value: 'mswdo-34-years',
        small: 'Pre-school age',
      },
      {
        Icon: MapPin,
        label: 'mswdo-centers',
        value: 'mswdo-22-barangays',
        small: 'Municipal-wide',
      },
    ],
    body: [
      {
        kind: 'about',
        heading: 'mswdo-about-day-care-services',
        text: 'mswdo-the-day-care-service-program-provides-early',
      },
      {
        kind: 'cards',
        heading: 'mswdo-program-features',
        cards: [
          {
            Icon: BookOpen,
            title: 'mswdo-early-learning',
            desc: 'mswdo-ageappropriate-educational-activities-and',
          },
          {
            Icon: Users,
            title: 'mswdo-socialization',
            desc: 'mswdo-group-activities-to-develop-social-skills-and',
          },
          {
            Icon: Heart,
            title: 'mswdo-health-monitoring',
            desc: 'mswdo-regular-health-checkups-and-growth-monitoring',
          },
          {
            Icon: CupSoda,
            title: 'mswdo-feeding',
            desc: 'mswdo-nutritious-snacks-and-meals-during-day-care-hours',
          },
        ],
      },
      {
        kind: 'reqs',
        heading: 'mswdo-enrollment-requirements',
        items: [
          'Birth Certificate (PSA)',
          'Immunization Record',
          '2x2 ID Photo',
          'Parent/Guardian ID',
        ],
      },
    ],
  },
  {
    id: 'assistance',
    gradient: 'from-blue-500 to-blue-600',
    Icon: Briefcase,
    title: 'mswdo-selfemployment-assistance-kaunlaran-seak',
    subtitle: 'mswdo-capital-assistance-for-microenterprise-development',
    infoBoxes: [
      {
        Icon: Clock,
        label: 'mswdo-processing',
        value: 'mswdo-1530-days',
        small: 'After assessment',
      },
      {
        Icon: Banknote,
        label: 'mswdo-loan-amount',
        value: { lit: '₱5,000-₱10,000' },
        small: 'Per beneficiary',
      },
      {
        Icon: UserCheck,
        label: 'mswdo-who-can-apply',
        value: 'mswdo-lowincome',
        small: 'Families/Individuals',
      },
      {
        Icon: Percent,
        label: 'mswdo-interest',
        value: 'mswdo-low-interest',
        small: 'Subsidized rate',
      },
    ],
    body: [
      {
        kind: 'about',
        heading: 'mswdo-about-seak-program',
        text: 'mswdo-the-selfemployment-assistance-kaunlaran-seak',
      },
      {
        kind: 'list',
        heading: 'mswdo-eligible-beneficiaries',
        items: [
          'mswdo-lowincome-families-and-individuals',
          'mswdo-unemployed-or-underemployed-residents',
          'mswdo-solo-parents',
          'mswdo-persons-with-disabilities-pwds',
          'mswdo-senior-citizens-with-viable-projects',
        ],
      },
      {
        kind: 'reqs',
        heading: 'mswdo-requirements',
        items: [
          'Application Form',
          'Barangay Certificate',
          'Valid ID',
          'Business Plan',
          'Certificate of Indigency',
          '1x1 ID Photo',
        ],
      },
    ],
  },
  {
    id: 'pension',
    gradient: 'from-pink-500 to-pink-600',
    Icon: Gift,
    title: 'mswdo-social-pension-for-indigent-senior-citizens',
    subtitle: { lit: 'Monthly stipend for qualified elderly citizens' },
    infoBoxes: [
      {
        Icon: Coins,
        label: 'mswdo-amount',
        value: { lit: '₱1,000/month' },
        small: 'Quarterly release',
      },
      { Icon: User, label: 'mswdo-age-requirement', value: 'mswdo-60-years', small: 'And above' },
      {
        Icon: CircleCheck,
        label: 'mswdo-status',
        value: 'mswdo-indigent',
        small: 'DSWD validated',
      },
      {
        Icon: CalendarDays,
        label: 'mswdo-payout',
        value: 'mswdo-quarterly',
        small: '₱3,000 per quarter',
      },
    ],
    body: [
      {
        kind: 'about',
        heading: 'mswdo-about-social-pension',
        text: 'mswdo-the-social-pension-program-provides-monthly',
      },
      {
        kind: 'list',
        heading: 'mswdo-eligibility-criteria',
        items: [
          'mswdo-filipino-citizen-60-years-old-and-above',
          'mswdo-frail-sickly-or-with-disability',
          'mswdo-no-pension-from-government-or-private-agencies',
          'mswdo-no-permanent-source-of-income',
          'mswdo-no-regular-support-from-family',
        ],
      },
      {
        kind: 'reqs',
        heading: 'mswdo-requirements-for-application',
        items: [
          'Senior Citizen ID',
          'Birth Certificate/Baptismal',
          'Certificate of Indigency',
          'Barangay Certificate',
          '1x1 ID Photo',
          'Medical Certificate (if applicable)',
        ],
      },
    ],
  },
  {
    id: 'livelihood',
    gradient: 'from-cyan-500 to-cyan-600',
    Icon: Store,
    title: 'mswdo-sustainable-livelihood-program-slp',
    subtitle: 'mswdo-communitybased-capacity-building-and-livelihood',
    infoBoxes: [
      {
        Icon: Users,
        label: 'mswdo-target',
        value: 'mswdo-4ps-members',
        small: 'Priority beneficiaries',
      },
      {
        Icon: Banknote,
        label: 'mswdo-assistance',
        value: { lit: '₱10,000-₱15,000' },
        small: 'Seed capital',
      },
      {
        Icon: GraduationCap,
        label: 'mswdo-training',
        value: 'mswdo-skills-devt',
        small: 'Included',
      },
      { Icon: TrendingUp, label: 'mswdo-track', value: 'mswdo-2-tracks', small: 'ME or EF' },
    ],
    body: [
      {
        kind: 'about',
        heading: 'mswdo-about-slp',
        text: 'mswdo-the-sustainable-livelihood-program-is-a',
      },
      {
        kind: 'cards',
        heading: 'mswdo-program-tracks',
        cards: [
          {
            Icon: Store,
            title: 'mswdo-microenterprise-development-md',
            desc: 'mswdo-for-participants-who-want-to-start-or-expand',
          },
          {
            Icon: Briefcase,
            title: 'mswdo-employment-facilitation-ef',
            desc: 'mswdo-for-participants-seeking-employment-includes',
          },
        ],
      },
      {
        kind: 'reqs',
        heading: 'mswdo-requirements',
        items: [
          '4Ps ID/Certificate',
          'Valid Government ID',
          'Barangay Certificate',
          'Business Proposal (for MD)',
        ],
      },
    ],
  },
  {
    id: 'aics',
    gradient: 'from-lime-500 to-lime-600',
    Icon: Banknote,
    title: 'mswdo-assistance-to-individuals-in-crisis-situation-aics',
    subtitle: 'mswdo-emergency-financial-assistance-for-various-needs',
    infoBoxes: [
      { Icon: Clock, label: 'mswdo-processing', value: 'mswdo-13-days', small: 'Upon assessment' },
      { Icon: Banknote, label: 'mswdo-amount', value: 'mswdo-varies', small: 'Based on need' },
      {
        Icon: UserCheck,
        label: 'mswdo-who-can-apply',
        value: 'mswdo-indigent',
        small: 'Residents',
      },
      {
        Icon: CalendarCheck,
        label: 'mswdo-availability',
        value: { lit: 'Mon-Fri' },
        small: '8AM - 5PM',
      },
    ],
    body: [
      {
        kind: 'about',
        heading: 'mswdo-about-aics',
        text: 'mswdo-aics-provides-emergency-assistance-to-individuals',
      },
      {
        kind: 'cards',
        heading: 'mswdo-types-of-assistance',
        cards: [
          {
            Icon: Hospital,
            title: 'mswdo-medical-assistance',
            desc: 'mswdo-financial-aid-for-hospitalization-medicines',
          },
          {
            Icon: Flower2,
            title: 'mswdo-burial-assistance',
            desc: 'mswdo-financial-support-for-funeral-and-burial-expenses',
          },
          {
            Icon: BookOpen,
            title: 'mswdo-educational-assistance',
            desc: 'mswdo-support-for-school-fees-supplies-and-other',
          },
          {
            Icon: Bus,
            title: 'mswdo-transportation-assistance',
            desc: 'mswdo-travel-assistance-for-medical-referrals-and',
          },
        ],
      },
      {
        kind: 'reqs',
        heading: 'mswdo-general-requirements',
        items: [
          'Request Letter',
          'Certificate of Indigency',
          'Valid ID',
          'Barangay Certificate',
          'Supporting Documents',
          'Medical Abstract (for medical)',
        ],
      },
    ],
  },
];

const quickStats: { Icon: LucideIcon; label: string; value: Item }[] = [
  { Icon: Users, label: 'mswdo-programs', value: 'mswdo-8-services' },
  { Icon: Clock, label: 'mswdo-office-hours', value: 'mswdo-8am-5pm' },
  { Icon: CalendarCheck, label: 'mswdo-availability', value: { lit: 'Mon - Fri' } },
  { Icon: Phone, label: 'mswdo-hotline', value: { lit: primaryNumber(cswdo).display } },
];

const quickNav: { href: string; Icon: LucideIcon; label: Item }[] = [
  { href: '#protective', Icon: ShieldCheck, label: 'mswdo-protective-services' },
  { href: '#rehabilitation', Icon: HeartPulse, label: 'mswdo-rehabilitation' },
  { href: '#feeding', Icon: CupSoda, label: 'mswdo-feeding-program' },
  { href: '#daycare', Icon: Smile, label: 'mswdo-day-care' },
  { href: '#assistance', Icon: Briefcase, label: 'mswdo-selfemployment' },
  { href: '#pension', Icon: Gift, label: 'mswdo-social-pension' },
  { href: '#livelihood', Icon: Store, label: 'mswdo-livelihood' },
  { href: '#aics', Icon: Banknote, label: { lit: 'AICS' } },
];

function BodyBlock({ t, block }: { t: TFn; block: Body }) {
  if (block.kind === 'about') {
    return (
      <div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{t(block.heading)}</h3>
        <p className="m-0 text-sm leading-relaxed text-muted-foreground">{t(block.text)}</p>
      </div>
    );
  }
  if (block.kind === 'list') {
    return (
      <div>
        <h4 className="mb-2 text-base font-semibold text-foreground">{t(block.heading)}</h4>
        <ul className="m-0 list-none p-0">
          {block.items.map((it) => (
            <li
              key={it}
              className="flex items-center gap-2.5 border-b border-border py-2 text-[0.9375rem] text-foreground last:border-b-0"
            >
              <CircleCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{t(it)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.kind === 'cards') {
    return (
      <div>
        {block.heading && (
          <h4 className="mb-3 text-base font-semibold text-foreground">{t(block.heading)}</h4>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {block.cards.map((c) => (
            <div key={c.title} className="rounded-lg border-l-4 border-primary bg-muted p-4">
              <h4 className="mb-2 flex items-center gap-2 text-base font-semibold text-foreground">
                <c.Icon className="size-4 text-primary" aria-hidden="true" />
                {t(c.title)}
              </h4>
              <p className="m-0 text-sm text-muted-foreground">{t(c.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // reqs — items are verbatim plain text
  return (
    <div>
      <h4 className="mb-3 text-base font-semibold text-foreground">{t(block.heading)}</h4>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {block.items.map((it) => (
          <div
            key={it}
            className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5 text-sm text-foreground"
          >
            <CircleCheck className="size-4 shrink-0 text-brand-success" aria-hidden="true" />
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Mswdo() {
  const { t } = useLanguage();
  const text = (it: Item) => (typeof it === 'string' ? t(it) : it.lit);

  return (
    <>
      <Seo
        title={t('mswdo-municipal-social-welfare-and-development-office')}
        description="City Social Welfare and Development Office (CSWDO) services in Mati, Davao Oriental — protective services, rehabilitation, day care, social pension, livelihood programs, and assistance for vulnerable sectors."
        canonicalPath="/service-details/mswdo"
      />

      {/* Breadcrumbs */}
      <Container>
        <nav
          className="flex flex-wrap items-center gap-2 py-4 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <AppLink to="/" className="hover:text-primary">
            {t('mswdo-home')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services" className="hover:text-primary">
            {t('mswdo-services')}
          </AppLink>
          <span>/</span>
          <AppLink to="/services/social-services" className="hover:text-primary">
            {t('mswdo-social-services')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">CSWDO</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Heart className="size-4" aria-hidden="true" />
            CSWDO
          </>
        }
        title={t('mswdo-municipal-social-welfare-and-development-office')}
        description={t('mswdo-comprehensive-social-welfare-programs-and')}
      />

      {/* Quick stats + navigation */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {quickStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-4 text-center"
              >
                <s.Icon className="mx-auto mb-2 size-8 text-primary" aria-hidden="true" />
                <h4 className="mb-1 text-xs tracking-wide text-muted-foreground uppercase">
                  {t(s.label)}
                </h4>
                <p className="m-0 text-lg font-semibold text-foreground">{text(s.value)}</p>
              </div>
            ))}
          </div>

          <nav
            className="mt-6 flex flex-wrap justify-center gap-2 rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-4"
            aria-label="CSWDO Services Navigation"
          >
            {quickNav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition hover:shadow-[0_0_0_1px_rgba(43,98,238,0.35)] hover:bg-primary hover:text-primary-foreground"
              >
                <n.Icon className="size-4" aria-hidden="true" />
                <span>{text(n.label)}</span>
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {/* Main content + sidebar */}
      <Section compact>
        <Container>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_300px]">
            {/* Main */}
            <div className="flex flex-col gap-12">
              {sections.map((sec) => (
                <div key={sec.id} id={sec.id} className="scroll-mt-28">
                  {/* Section header */}
                  <div
                    className={`mb-4 flex items-center gap-4 rounded-xl bg-linear-to-br ${sec.gradient} p-5 text-white`}
                  >
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl">
                      <sec.Icon className="size-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="mb-1 text-xl font-bold text-white">{t(sec.title)}</h2>
                      <p className="m-0 text-sm text-white/90">{text(sec.subtitle)}</p>
                    </div>
                  </div>

                  {/* Detail card */}
                  <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)]">
                    {/* Info boxes */}
                    <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
                      {sec.infoBoxes.map((box, i) => (
                        <div key={i} className="bg-card p-4 text-center">
                          <box.Icon
                            className="mx-auto mb-2 size-6 text-primary"
                            aria-hidden="true"
                          />
                          <h4 className="mb-1 text-xs tracking-wide text-muted-foreground uppercase">
                            {t(box.label)}
                          </h4>
                          <p className="m-0 text-base font-semibold text-foreground">
                            {text(box.value)}
                          </p>
                          <small className="text-xs text-muted-foreground">{box.small}</small>
                        </div>
                      ))}
                    </div>

                    {/* Body */}
                    <div className="flex flex-col gap-6 p-6">
                      {sec.body.map((block, i) => (
                        <BodyBlock key={i} t={t} block={block} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] p-6 lg:sticky lg:top-24">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Building2 className="size-5 text-primary" aria-hidden="true" />
                CSWDO
              </h3>

              <div className="flex items-start gap-3 border-b border-border py-3">
                <IdCard className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <strong className="block text-sm text-foreground">
                    {t('mswdo-municipal-social-welfare-officer')}
                  </strong>
                  <span className="text-[0.8125rem] text-muted-foreground">
                    {t('mswdo-mswdo-head')}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-b border-border py-3">
                <MapPin className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <strong className="block text-sm text-foreground">{t('mswdo-location')}</strong>
                  <span className="text-[0.8125rem] text-muted-foreground">
                    City Hall, Ground Floor
                    <br />
                    Mati, Davao Oriental 8200
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-b border-border py-3">
                <Phone className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <strong className="block text-sm text-foreground">
                    {t('mswdo-phonehotline')}
                  </strong>
                  {cswdo.numbers.map((n) => (
                    <a
                      key={n.tel}
                      href={`tel:${n.tel}`}
                      className="block text-[0.8125rem] text-muted-foreground hover:text-primary"
                    >
                      {n.display}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 border-b border-border py-3">
                <Mail className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <strong className="block text-sm text-foreground">{t('mswdo-email')}</strong>
                  <a
                    href="mailto:mswdo@mati.gov.ph"
                    className="text-[0.8125rem] text-muted-foreground hover:text-primary"
                  >
                    {t('mswdo-mswdomatigovph')}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 py-3">
                <Clock className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <strong className="block text-sm text-foreground">
                    {t('mswdo-office-hours')}
                  </strong>
                  <span className="text-[0.8125rem] text-muted-foreground">
                    Monday - Friday
                    <br />
                    8:00 AM - 5:00 PM
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <h4 className="mb-2 flex items-center gap-2 text-[0.9375rem] font-semibold text-foreground">
                  <LinkIcon className="size-4 text-primary" aria-hidden="true" />
                  {t('mswdo-related-services')}
                </h4>
                <ul className="m-0 list-none space-y-2 p-0 text-[0.8125rem]">
                  <li>
                    <AppLink
                      to="/services/social-services"
                      className="flex items-center gap-1.5 text-primary hover:underline"
                    >
                      {t('mswdo-social-services')}
                    </AppLink>
                  </li>
                  <li>
                    <AppLink
                      to="/services/health"
                      className="flex items-center gap-1.5 text-primary hover:underline"
                    >
                      {t('mswdo-health-services')}
                    </AppLink>
                  </li>
                  <li>
                    <AppLink
                      to="/government"
                      className="flex items-center gap-1.5 text-primary hover:underline"
                    >
                      {t('mswdo-government-offices')}
                    </AppLink>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
