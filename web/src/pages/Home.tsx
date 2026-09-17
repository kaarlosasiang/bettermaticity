import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Compass,
  FileText,
  Store,
  Coins,
  HeartPulse,
  Users,
  Waves,
  Signpost,
  Building2,
  Droplets,
  TrendingUp,
  Sun,
  CalendarDays,
  Sprout,
  ShieldAlert,
  Briefcase,
  Mail,
  MapPin,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { ServiceSearch } from '@/components/ServiceSearch';
import { ImageSlot } from '@/components/ImageSlot';
import { Container } from '@/components/primitives';
import VolunteerDialog from '@/components/VolunteerDialog';
import {
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
  useReducedMotion,
  fadeUp,
  staggerContainer,
  revealViewport,
} from '@/components/motion';
import { totalPopulation, barangayCount, landAreaKm2, incomeClass } from '@/lib/statsData';
import { financialData } from '@/lib/budgetData';

const FEEL_MATI_LOGO = '/assets/images/logo/feel-mati.png';

// Easing for the funds-bar width fill (width isn't a transform, so it needs its own
// transition — reducedMotion is handled by rendering a static bar instead).
const barEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Content models ──────────────────────────────────────────────────────────

const popular: { to: string; Icon: LucideIcon; label: string; color: string; feel?: boolean }[] = [
  { to: '/services/certificates', Icon: FileText, label: 'Certificates', color: '#2b62ee' },
  { to: '/services/business', Icon: Store, label: 'Business Permits', color: '#0077be' },
  { to: '/services/tax-payments', Icon: Coins, label: 'Taxes & Fees', color: '#06a77d' },
  { to: '/services/health', Icon: HeartPulse, label: 'Health Services', color: '#e01b24' },
  { to: '/services/social-services', Icon: Users, label: 'Social Welfare', color: '#7c4dff' },
  { to: '/services', Icon: Waves, label: 'Tourism', color: '#8a6200', feel: true },
];

type Status = { text: string; dot: string };
const rising: { to: string; Icon: LucideIcon; title: string; status: Status }[] = [
  {
    to: '/budget',
    Icon: Signpost,
    title: 'Dahican Coastal Road Rehabilitation',
    status: { text: 'Finishing Stages', dot: '#0077be' },
  },
  {
    to: '/budget',
    Icon: Store,
    title: 'Central Public Market Annex',
    status: { text: 'Under Construction', dot: '#ffc001' },
  },
  {
    to: '/budget',
    Icon: Droplets,
    title: 'Barangay Mayo Water System',
    status: { text: 'Fully Operational', dot: '#06a77d' },
  },
  {
    to: '/budget',
    Icon: Building2,
    title: 'Baywalk & Boulevard Extension',
    status: { text: 'Under Construction', dot: '#ffc001' },
  },
];

const tourism: { title: string; blurb: string; slot: string; badge?: string; large?: boolean }[] = [
  {
    title: 'Dahican Beach',
    blurb:
      'Seven kilometres of white sand on the Pacific side. Skimboarders at sunrise, surf through the amihan season, and sea-turtle nesting grounds watched by the Amihan sa Dahican volunteers.',
    slot: 'Drop a Dahican Beach photo — skimboarder at sunrise',
    badge: 'Surf & skimboard',
    large: true,
  },
  {
    title: 'Pujada Bay',
    blurb:
      'A protected seascape of coral reefs, dugongs and dolphins — with island hopping out to Pujada Island.',
    slot: 'Drop a Pujada Bay photo',
  },
  {
    title: 'Sleeping Dinosaur',
    blurb: 'The ridge across the bay, best watched from the Baywalk and Boulevard at golden hour.',
    slot: 'Drop a Sleeping Dinosaur / Baywalk photo',
  },
];

const services: {
  to: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  tone: 'default' | 'danger' | 'feel';
}[] = [
  {
    to: '/services/certificates',
    Icon: FileText,
    title: 'Civil Registry',
    desc: 'Birth, marriage and death certificates from the City Civil Registrar.',
    tag: 'Services',
    tone: 'default',
  },
  {
    to: '/services/business',
    Icon: Store,
    title: 'Business & Livelihood',
    desc: 'Permits, renewals, market stalls and trade support through the BPLO.',
    tag: 'Services',
    tone: 'default',
  },
  {
    to: '/services/tax-payments',
    Icon: Coins,
    title: 'Taxes & Payments',
    desc: "Real property and business tax assessment at the Treasurer's Office.",
    tag: 'Services',
    tone: 'default',
  },
  {
    to: '/services/health',
    Icon: HeartPulse,
    title: 'Health Services',
    desc: 'Check-ups, vaccines and medicines through the City Health Office.',
    tag: 'Services',
    tone: 'default',
  },
  {
    to: '/services/social-services',
    Icon: Users,
    title: 'Social Welfare',
    desc: 'Assistance for seniors, PWDs, solo parents and indigent families.',
    tag: 'Services',
    tone: 'default',
  },
  {
    to: '/services/agriculture',
    Icon: Sprout,
    title: 'Agriculture & Fisheries',
    desc: 'Seedlings, coconut and fishery support from the City Agriculture Office.',
    tag: 'Services',
    tone: 'default',
  },
  {
    to: '/services/public-safety',
    Icon: ShieldAlert,
    title: 'Disaster Preparedness',
    desc: 'Evacuation routes, typhoon advisories and MDRRMO programs.',
    tag: 'Services',
    tone: 'danger',
  },
  {
    to: '/services',
    Icon: Waves,
    title: 'Tourism',
    desc: 'Dahican, Pujada Bay, Sambuokan Festival, accredited guides and homestays.',
    tag: 'Feel Mati',
    tone: 'feel',
  },
];

// ── Public funds, derived from the real FY2025 SRE (budgetData) ──────────────

function useFunds() {
  const { q1, q2 } = financialData;
  const sum = (a: number, b: number) => a + b;
  const incomeTotal = sum(q1.income.total, q2.income.total);
  const local = sum(q1.income.local, q2.income.local);
  const external = sum(q1.income.external, q2.income.external);
  const spendTotal = sum(q1.expenditures.total, q2.expenditures.total);
  const per100 = (v: number) => (v / spendTotal) * 100;
  const rows = [
    { label: 'General public services', v: sum(q1.expenditures.gps, q2.expenditures.gps), color: '#2b62ee' },
    { label: 'Social services', v: sum(q1.expenditures.social, q2.expenditures.social), color: '#0077be' },
    { label: 'Economic services', v: sum(q1.expenditures.economic, q2.expenditures.economic), color: '#06a77d' },
    { label: 'Debt service', v: sum(q1.expenditures.debt, q2.expenditures.debt), color: '#e01b24' },
  ].map((r) => ({ ...r, per100: per100(r.v) }));
  return {
    incomeTotal,
    local,
    external,
    spendTotal,
    rows,
    net: sum(q1.netIncome, q2.netIncome),
    balance: q2.fundBalance,
  };
}

const M = (n: number) => `₱${n.toFixed(2)}M`;

function useMatiWeather() {
  const [temp, setTemp] = useState<string | null>(null);
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=6.9497&longitude=126.2094&current_weather=true')
      .then((r) => r.json())
      .then((d) => {
        if (d?.current_weather?.temperature != null) setTemp(`${Math.round(d.current_weather.temperature)}°C`);
      })
      .catch(() => {});
  }, []);
  return temp;
}

// Small shared eyebrow: mono kicker with a short royal rule.
function Eyebrow({ children, icon: Icon }: { children: React.ReactNode; icon?: LucideIcon }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-0.5 w-6 bg-[#2b62ee]" aria-hidden="true" />
      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.08em] text-[#2b62ee]">
        {Icon ? <Icon className="size-3.5" aria-hidden="true" /> : null}
        {children}
      </span>
    </div>
  );
}

export default function Home() {
  const temp = useMatiWeather();
  const funds = useFunds();
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      {/* reducedMotion="user" drops movement (transform/y) but keeps opacity fades when the
          OS "Reduce Motion" setting is on — applied once for the whole page. */}
      <MotionConfig reducedMotion="user">
        <Seo description="Everything the City of Mati does, in one place — government services, public funds, and the coast that makes this place worth the trip." />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-[#123c7a]">
          <div className="absolute inset-0 -z-10">
            <ImageSlot label="Dahican / coastline photo" />
          </div>
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(18,60,122,0.95)_0%,rgba(18,60,122,0.82)_46%,rgba(18,60,122,0.55)_78%,rgba(18,60,122,0.42)_100%)]"
            aria-hidden="true"
          />
          <Container>
            <div className="grid items-stretch gap-8 py-12 lg:grid-cols-2 lg:gap-10 lg:py-16">
              {/* Left — staggered entrance on mount */}
              <m.div
                className="flex flex-col justify-center text-white"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                <m.img variants={fadeUp} src={FEEL_MATI_LOGO} alt="Feel Mati" className="mb-6 h-auto w-52 sm:w-64" />
                <m.h1
                  variants={fadeUp}
                  className="mb-3.5 font-display text-4xl leading-[1.08] font-extrabold tracking-[-0.03em] text-white sm:text-[2.75rem]"
                >
                  Everything the city does,
                  <br />
                  in one place.
                </m.h1>
                <m.p variants={fadeUp} className="mb-6 max-w-[440px] text-base leading-relaxed text-white/75">
                  A community-powered portal for the City of Mati, Davao Oriental — government services,
                  public funds, and the coast that makes this place worth the trip.
                </m.p>
                <m.div variants={fadeUp} className="flex flex-wrap gap-2.5">
                  <AppLink
                    to="/services"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#ffc001] px-5 font-display text-[0.9375rem] font-bold text-[#123c7a] transition hover:brightness-105"
                  >
                    Browse Services <ArrowRight className="size-3.5" aria-hidden="true" />
                  </AppLink>
                  <AppLink
                    to="/services/environment"
                    className="inline-flex h-11 items-center gap-2 rounded-lg px-5 font-display text-[0.9375rem] font-semibold text-white ring-1 ring-white/35 transition hover:bg-white/10"
                  >
                    <Compass className="size-3.5" aria-hidden="true" /> Plan a visit
                  </AppLink>
                </m.div>
              </m.div>

              {/* Right — search card */}
              <div className="flex items-center">
                <m.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="w-full overflow-hidden rounded-xl border-t-[3px] border-[#2b62ee] bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.08),0_18px_44px_rgba(3,10,30,0.34)]"
                >
                  <div className="p-5 pb-0">
                    <div className="font-display text-[1.0625rem] font-bold text-[#123c7a]">Search Services</div>
                  </div>
                  <div className="p-5 pt-3.5">
                    <ServiceSearch placeholder="Search for a service…" />
                    <div className="mt-4 mb-2.5 font-mono text-[0.6875rem] tracking-[0.06em] text-[#4c5c78]">
                      POPULAR SERVICES
                    </div>
                    <m.div
                      className="grid grid-cols-3 gap-2.5"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                    >
                      {popular.map(({ to, Icon, label, color, feel }) => (
                        <m.div key={label} variants={fadeUp} className="h-full">
                          <AppLink
                            to={to}
                            className={`flex h-full flex-col items-center gap-2 rounded-[10px] p-4 text-center text-[#123c7a] transition ${
                              feel
                                ? 'bg-[#fffbef] ring-1 ring-[#ffc001]'
                                : 'ring-1 ring-[#e3e8ef] hover:ring-[#2b62ee]'
                            }`}
                          >
                            <Icon className="size-5" style={{ color }} aria-hidden="true" />
                            <span className="text-[0.8125rem] leading-tight font-medium">{label}</span>
                          </AppLink>
                        </m.div>
                      ))}
                    </m.div>
                  </div>
                </m.div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Rising in Mati ───────────────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <m.div
              className="mb-5 flex items-center justify-between"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              <Eyebrow icon={TrendingUp}>RISING IN MATI</Eyebrow>
              <AppLink
                to="/budget"
                className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[#2b62ee]"
              >
                View all <ArrowRight className="size-3.5" aria-hidden="true" />
              </AppLink>
            </m.div>
            <m.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              {rising.map(({ to, Icon, title, status }) => (
                <m.div key={title} variants={fadeUp} className="h-full">
                  <AppLink
                    to={to}
                    className="flex h-full min-h-[150px] flex-col justify-between rounded-xl p-[18px] text-[#123c7a] ring-1 ring-[#e3e8ef] transition hover:ring-[#2b62ee]"
                  >
                    <div>
                      <Icon className="size-[18px] text-[#2b62ee]" aria-hidden="true" />
                      <div className="mt-3 font-display text-[0.9375rem] leading-[1.35] font-bold">{title}</div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#4c5c78]">
                      <span className="size-[7px] rounded-full" style={{ background: status.dot }} aria-hidden="true" />
                      {status.text}
                    </span>
                  </AppLink>
                </m.div>
              ))}
            </m.div>
          </Container>
        </section>

        {/* ── Mati at a Glance ─────────────────────────────────────────────── */}
        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <m.div
              className="mb-6 flex items-end justify-between gap-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              <div>
                <Eyebrow>CITY PROFILE</Eyebrow>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.025em] text-[#123c7a]">
                  Mati at a Glance
                </h2>
              </div>
              <AppLink
                to="/statistics"
                className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[#2b62ee]"
              >
                View City Profile <ArrowRight className="size-3.5" aria-hidden="true" />
              </AppLink>
            </m.div>

            <m.div
              className="grid grid-cols-2 gap-4 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              {[
                { v: totalPopulation.toLocaleString(), label: 'Residents', meta: 'PSA 2024 POPCEN', amber: false },
                { v: String(barangayCount), label: 'Barangays', meta: 'ADMINISTRATIVE VILLAGES', amber: false },
                { v: `${incomeClass} Class`, label: 'Component City', meta: 'INCOME CLASSIFICATION', amber: false },
                { v: landAreaKm2, label: 'km² land area', meta: 'NEEDS VERIFICATION', amber: true },
              ].map((s) => (
                <m.div
                  key={s.label}
                  variants={fadeUp}
                  className={`rounded-xl bg-white p-5 shadow-[0_0_0_1px_rgba(18,60,122,0.07)] ${
                    s.amber ? 'border-t-[3px] border-[#ffc001]' : 'border-t-[3px] border-[#2b62ee]'
                  }`}
                >
                  <div className="font-display text-[1.875rem] font-extrabold tracking-[-0.02em] text-[#2b62ee]">
                    {s.v}
                  </div>
                  <div className="mt-1.5 text-sm font-semibold text-[#123c7a]">{s.label}</div>
                  <div className={`mt-0.5 font-mono text-[0.6875rem] ${s.amber ? 'text-[#8a6200]' : 'text-[#4c5c78]'}`}>
                    {s.meta}
                  </div>
                </m.div>
              ))}
            </m.div>

            <m.div
              className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.9fr]"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              {/* Weather card */}
              <div className="flex flex-col justify-between rounded-xl bg-[linear-gradient(160deg,#2b62ee_0%,#7aa5ff_100%)] p-6 text-white">
                <div>
                  <div className="flex items-center gap-2 font-display text-[0.9375rem] font-bold">
                    <Sun className="size-4" aria-hidden="true" /> Weather
                  </div>
                  <div className="mt-3.5 text-[0.8125rem] text-white/75">
                    City of Mati, Davao Oriental
                    <br />
                    6.9497° N, 126.2094° E
                  </div>
                </div>
                <div className="mt-6">
                  <div className="font-display text-5xl leading-none font-extrabold tracking-[-0.03em]">
                    {temp ?? '—'}
                  </div>
                  <div className="mt-1.5 text-sm font-semibold">Current conditions</div>
                  <div className="mt-3 text-xs text-white/70">Province of Davao Oriental</div>
                </div>
              </div>
              {/* Map */}
              <div className="relative min-h-[240px] overflow-hidden rounded-xl bg-[#eef4fe] shadow-[0_0_0_1px_rgba(18,60,122,0.07)]">
                <iframe
                  title="Map of the City of Mati"
                  className="size-full min-h-[240px]"
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=126.1694%2C6.9097%2C126.2494%2C6.9897&layer=mapnik&marker=6.9497%2C126.2094"
                />
                <span className="pointer-events-none absolute bottom-2.5 left-3 rounded-md bg-white/90 px-2 py-1 font-mono text-xs text-[#4c5c78]">
                  Mati 6.9497, 126.2094
                </span>
              </div>
            </m.div>
          </Container>
        </section>

        {/* ── Feel Mati — tourism ──────────────────────────────────────────── */}
        <section className="bg-[#123c7a] py-14">
          <Container>
            <m.div
              className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              <div>
                <img src={FEEL_MATI_LOGO} alt="Feel Mati" className="h-auto w-40" />
                <h2 className="mt-4 mb-2 font-display text-3xl font-extrabold tracking-[-0.025em] text-white">
                  More adventures, truly incredible
                </h2>
                <p className="max-w-[560px] text-[0.9375rem] leading-relaxed text-white/70">
                  The skimboarding capital of the Philippines, a protected bay of coral and dugongs, and a
                  ridge the whole city knows by silhouette.
                </p>
              </div>
              <AppLink
                to="/services/environment"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-[#ffc001] px-5 font-display text-[0.9375rem] font-bold text-[#123c7a] transition hover:brightness-105"
              >
                Plan your visit <ArrowRight className="size-3.5" aria-hidden="true" />
              </AppLink>
            </m.div>

            <m.div
              className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              {tourism.map((tp) => (
                <m.article
                  key={tp.title}
                  variants={fadeUp}
                  className="relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-xl bg-[#123c7a] p-[22px] text-white"
                >
                  <div className="absolute inset-0">
                    <ImageSlot label={tp.slot} />
                  </div>
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,60,122,0)_32%,rgba(18,60,122,0.88)_78%,rgba(18,60,122,0.94)_100%)]"
                    aria-hidden="true"
                  />
                  {tp.badge ? (
                    <span className="absolute top-4 left-4 inline-flex h-[22px] items-center rounded-full bg-[#ffc001] px-2.5 text-xs font-bold text-[#123c7a]">
                      {tp.badge}
                    </span>
                  ) : null}
                  <div className="relative">
                    <h3
                      className={`mb-1.5 font-display font-extrabold tracking-[-0.02em] ${
                        tp.large ? 'text-2xl' : 'text-xl'
                      }`}
                    >
                      {tp.title}
                    </h3>
                    <p className="max-w-[380px] text-sm leading-relaxed text-white/85">{tp.blurb}</p>
                  </div>
                </m.article>
              ))}
            </m.div>

            <m.div
              className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl bg-[rgba(255,192,1,0.1)] px-[22px] py-[18px] shadow-[inset_0_0_0_1px_rgba(255,192,1,0.3)] sm:flex-row sm:items-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              <div className="flex items-center gap-3.5">
                <CalendarDays className="size-5 text-[#ffc001]" aria-hidden="true" />
                <div>
                  <div className="font-display text-[0.9375rem] font-bold text-white">
                    Sambuokan Festival · every October
                  </div>
                  <div className="text-[0.8125rem] text-white/70">
                    The city&apos;s founding celebration — &ldquo;sambuok&rdquo;, to gather as one.
                  </div>
                </div>
              </div>
              <AppLink
                to="/services/environment"
                className="inline-flex shrink-0 items-center gap-1.5 font-display text-sm font-bold text-[#ffc001]"
              >
                Festival guide <ArrowRight className="size-3.5" aria-hidden="true" />
              </AppLink>
            </m.div>
          </Container>
        </section>

        {/* ── City Services ────────────────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
              <div className="mb-2 flex items-center gap-3.5">
                <span className="h-[30px] w-1 rounded bg-[#2b62ee]" aria-hidden="true" />
                <h2 className="font-display text-3xl font-extrabold tracking-[-0.025em] text-[#123c7a]">City Services</h2>
              </div>
              <p className="mb-6 ml-[18px] max-w-[540px] text-[0.9375rem] leading-relaxed text-[#4c5c78]">
                Find the right service for your need — from certificates and permits to health, welfare and
                disaster preparedness.
              </p>
            </m.div>
            <m.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              {services.map(({ to, Icon, title, desc, tag, tone }) => {
                const feel = tone === 'feel';
                const danger = tone === 'danger';
                return (
                  <m.div key={title} variants={fadeUp} className="h-full">
                    <AppLink
                      to={to}
                      className={`flex h-full flex-col gap-3 rounded-xl p-5 text-[#4c5c78] transition ${
                        feel ? 'bg-[#fffbef] ring-1 ring-[#ffc001]' : 'ring-1 ring-[#e3e8ef] hover:ring-[#2b62ee]'
                      }`}
                    >
                      <span
                        className={`flex size-[38px] items-center justify-center rounded-[10px] ${
                          danger
                            ? 'bg-[#fdecec] text-[#e01b24]'
                            : feel
                              ? 'bg-[#fdf0c8] text-[#a37400]'
                              : 'bg-[#eef4fe] text-[#2b62ee]'
                        }`}
                      >
                        <Icon className="size-[17px]" aria-hidden="true" />
                      </span>
                      <div className="font-display text-[0.9375rem] font-bold text-[#123c7a]">{title}</div>
                      <p className="text-[0.8125rem] leading-relaxed">{desc}</p>
                      <span
                        className={`inline-flex h-[22px] w-fit items-center rounded-full px-2.5 text-xs font-semibold ${
                          danger
                            ? 'bg-[#fdecec] text-[#b3151c]'
                            : feel
                              ? 'bg-[#fdf0c8] text-[#8a6200]'
                              : 'bg-[#eef4fe] text-[#2b62ee]'
                        }`}
                      >
                        {tag}
                      </span>
                    </AppLink>
                  </m.div>
                );
              })}
            </m.div>
          </Container>
        </section>

        {/* ── Public Funds + City Leadership ───────────────────────────────── */}
        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <div className="grid items-start gap-5 lg:grid-cols-[1.15fr_1fr]">
              {/* Public Funds */}
              <m.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
                <div className="mb-[18px] flex items-end justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <span className="h-[26px] w-1 rounded bg-[#2b62ee]" aria-hidden="true" />
                    <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]">
                      Public Funds
                    </h2>
                  </div>
                  <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-white px-2.5 font-mono text-[0.6875rem] text-[#4c5c78] shadow-[0_0_0_1px_#d6dee9]">
                    <span className="size-1.5 rounded-full bg-[#06a77d]" aria-hidden="true" /> BLGF SRE · RETRIEVED
                    2026-09-12
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)]">
                  <div className="p-[22px] pb-0">
                    <div className="text-sm text-[#4c5c78]">Income received, Jan–Jun 2025</div>
                    <div className="mt-1.5 mb-1 font-display text-5xl leading-none font-extrabold tracking-[-0.03em] text-[#2b62ee]">
                      {M(funds.incomeTotal)}
                    </div>
                    <div className="font-mono text-xs text-[#4c5c78]">
                      LOCAL {M(funds.local)} · NATIONAL TRANSFERS {M(funds.external)}
                    </div>
                  </div>
                  <div className="p-[22px]">
                    <div className="font-mono text-[0.6875rem] tracking-[0.06em] text-[#4c5c78]">
                      WHERE EVERY ₱100 OF SPENDING WENT
                    </div>
                    <div className="mt-3.5 grid gap-3">
                      {funds.rows.map((r) => (
                        <div
                          key={r.label}
                          className="grid grid-cols-[130px_1fr_56px] items-center gap-3 text-[0.8125rem] text-[#123c7a] sm:grid-cols-[170px_1fr_62px]"
                        >
                          <span>{r.label}</span>
                          <span className="h-2.5 rounded-full bg-[#e3e8ef]">
                            {reduce ? (
                              <span
                                className="block h-2.5 rounded-full"
                                style={{ width: `${r.per100}%`, background: r.color }}
                              />
                            ) : (
                              <m.span
                                className="block h-2.5 rounded-full"
                                style={{ background: r.color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${r.per100}%` }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ duration: 0.9, ease: barEase }}
                              />
                            )}
                          </span>
                          <span className="text-right font-mono">₱{r.per100.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#f7f9fc] px-[22px] py-3.5 font-mono text-[0.6875rem] text-[#4c5c78] shadow-[inset_0_1px_0_#e3e8ef]">
                    <span>
                      SPENT {M(funds.spendTotal)} · NET {M(funds.net)} · BALANCE {M(funds.balance)}
                    </span>
                    <AppLink to="/budget" className="text-[#2b62ee]">
                      FULL SRE →
                    </AppLink>
                  </div>
                </div>
              </m.div>

              {/* City Leadership */}
              <div>
                <div className="mb-[18px] flex items-center gap-3.5">
                  <span className="h-[26px] w-1 rounded bg-[#2b62ee]" aria-hidden="true" />
                  <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]">
                    City Leadership
                  </h2>
                </div>
                <m.div
                  className="grid gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={revealViewport}
                >
                  {[
                    { role: 'Elected Mayor', sub: 'City Mayor · City of Mati' },
                    { role: 'Elected Vice Mayor', sub: 'City Vice Mayor · Sangguniang Panlungsod' },
                  ].map((l) => (
                    <m.div
                      key={l.role}
                      variants={fadeUp}
                      className="flex items-center gap-3.5 rounded-xl border-t-[3px] border-[#2b62ee] bg-white p-[18px] shadow-[0_0_0_1px_rgba(18,60,122,0.07)]"
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#eef4fe] font-display text-[0.9375rem] font-bold text-[#2b62ee]">
                        —
                      </span>
                      <div>
                        <span className="inline-flex h-5 items-center rounded-full bg-[#eef4fe] px-2.5 text-[0.6875rem] font-semibold text-[#2b62ee]">
                          {l.role}
                        </span>
                        <div className="mt-1.5 font-display text-[0.9375rem] font-bold text-[#123c7a]">
                          Hon. [to be confirmed]
                        </div>
                        <div className="text-[0.8125rem] text-[#4c5c78]">{l.sub}</div>
                      </div>
                    </m.div>
                  ))}

                  <m.div
                    variants={fadeUp}
                    className="grid gap-2.5 rounded-xl bg-white p-[18px] shadow-[0_0_0_1px_rgba(18,60,122,0.07)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-[#eef4fe] text-[#2b62ee]">
                        <MapPin className="size-[15px]" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="font-mono text-[0.625rem] tracking-[0.06em] text-[#4c5c78]">CITY HALL</div>
                        <div className="text-sm font-semibold text-[#123c7a]">
                          Nazareno St., City of Mati, Davao Oriental
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-[#eaf7f2] text-[#06a77d]">
                        <Mail className="size-[15px]" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="font-mono text-[0.625rem] tracking-[0.06em] text-[#4c5c78]">EMAIL</div>
                        <a
                          href="mailto:cio.cityofmati@gmail.com"
                          className="text-sm font-semibold text-[#2b62ee] hover:underline"
                        >
                          cio.cityofmati@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-[#fdf0c8] text-[#a37400]">
                        <Briefcase className="size-[15px]" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="font-mono text-[0.625rem] tracking-[0.06em] text-[#4c5c78]">JOBS</div>
                        <AppLink to="/government" className="text-sm font-semibold text-[#2b62ee] hover:underline">
                          TrabaWho — city job openings
                        </AppLink>
                      </div>
                    </div>
                  </m.div>
                </m.div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── ₱0 cost banner (signature line; site-wide Footer follows below) ─── */}
        <section className="bg-[#123c7a] py-10">
          <Container>
            <m.div
              className="rounded-xl bg-[rgba(43,98,238,0.16)] p-[18px] text-center text-[0.9375rem] leading-relaxed text-[#cfe0ff] shadow-[inset_0_0_0_1px_rgba(43,98,238,0.45)]"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
            >
              Cost to build this site to date: <strong className="font-bold text-white">₱400+</strong>. Cost to
              the People of Mati:{' '}
              <strong className="align-[-0.08em] font-display text-[1.375rem] font-extrabold text-[#ffc001]">
                ₱0
              </strong>
            </m.div>
          </Container>
        </section>

        <VolunteerDialog />
      </MotionConfig>
    </LazyMotion>
  );
}
