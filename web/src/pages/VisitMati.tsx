import { useMemo, useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Info,
  Waves,
  Wind,
  Heart,
  Trees,
  Compass,
  Eye,
  Sunset,
  Store,
  Fish,
  PartyPopper,
  Plane,
  Signpost,
  House,
  ShieldCheck,
  HandHelping,
  Flag,
  CalendarDays,
  CalendarPlus,
  Radio,
  ChevronRight,
  LifeBuoy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { ImageSlot } from '@/components/ImageSlot';
import { Container } from '@/components/primitives';
import {
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
  fadeUp,
  staggerContainer,
  revealViewport,
} from '@/components/motion';
import {
  hero,
  conditions,
  coasts,
  attractions,
  filters,
  months,
  seasons,
  sambuokan,
  plan,
  responsible,
  tourismOffice,
  type Attraction,
  type Coast,
} from '@/lib/tourismData';

const FEEL_MATI_LOGO = '/assets/images/logo/feel-mati.png';

// Shared eyebrow: a short rule + mono label, used above every section heading.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-0.5 w-6 bg-royal" aria-hidden="true" />
      <span className="font-mono text-xs font-semibold tracking-[0.08em] text-royal uppercase">
        {children}
      </span>
    </div>
  );
}

// Icons for the two-coasts activity tags, keyed by tag label.
const TAG_ICONS: Record<string, LucideIcon> = {
  Skimboarding: Waves,
  'Surf lessons': Wind,
  'Turtle conservation': Heart,
  'Mangrove boardwalk': Trees,
  'Island hopping': Compass,
  Snorkelling: Eye,
  'Sleeping Dinosaur view': Sunset,
  'Baywalk food stalls': Store,
};

const SEASON_ICONS: Record<string, LucideIcon> = {
  waves: Waves,
  fish: Fish,
  compass: Compass,
  party: PartyPopper,
};

const PLAN_ICONS: Record<string, LucideIcon> = {
  plane: Plane,
  signpost: Signpost,
  house: House,
};

const COAST_IMAGE_LABEL: Record<string, string> = {
  pacific: 'Drop a Pacific-side photo — Dahican surf',
  bay: 'Drop a bay-side photo — Pujada Island from a boat',
};

function CoastCard({ coast }: { coast: Coast }) {
  const pacific = coast.key === 'pacific';
  return (
    <m.div
      variants={fadeUp}
      className={
        pacific
          ? 'flex flex-col overflow-hidden rounded-2xl bg-navy text-white'
          : 'flex flex-col overflow-hidden rounded-2xl bg-[#eef4fe] text-navy ring-1 ring-[#d9e5fb]'
      }
    >
      <div className="relative aspect-[16/9]">
        <ImageSlot label={COAST_IMAGE_LABEL[coast.key]} src="" />
        <span
          className={
            pacific
              ? 'absolute top-4 left-4 inline-flex h-6 items-center gap-1.5 rounded-full bg-amber px-2.5 text-xs font-bold text-navy'
              : 'absolute top-4 left-4 inline-flex h-6 items-center gap-1.5 rounded-full bg-royal px-2.5 text-xs font-bold text-white'
          }
        >
          {pacific ? (
            <Waves className="size-3" aria-hidden="true" />
          ) : (
            <LifeBuoy className="size-3" aria-hidden="true" />
          )}
          {coast.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div>
          <h3 className="mb-1.5 font-display text-2xl font-extrabold tracking-[-0.02em]">
            {coast.title}
          </h3>
          <p
            className={`text-[0.9375rem] leading-relaxed ${pacific ? 'text-white/85' : 'text-[#4c5c78]'}`}
          >
            {coast.blurb}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {coast.tags.map((tag) => {
            const Icon = TAG_ICONS[tag];
            return (
              <span
                key={tag}
                className={
                  pacific
                    ? 'inline-flex h-[30px] items-center gap-1.5 rounded-lg bg-white/10 px-2.5 text-[0.8125rem] font-medium text-white'
                    : 'inline-flex h-[30px] items-center gap-1.5 rounded-lg bg-white px-2.5 text-[0.8125rem] font-medium text-navy ring-1 ring-[#d9e5fb]'
                }
              >
                {Icon ? (
                  <Icon
                    className={`size-3.5 ${pacific ? 'text-amber' : 'text-royal'}`}
                    aria-hidden="true"
                  />
                ) : null}
                {tag}
              </span>
            );
          })}
        </div>
        <a
          href="#places"
          className={`mt-auto inline-flex items-center gap-1.5 font-display text-[0.9375rem] font-bold ${
            pacific ? 'text-amber' : 'text-royal'
          }`}
        >
          {coast.linkLabel}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </m.div>
  );
}

function PlaceCard({ a }: { a: Attraction }) {
  const inner = (
    <>
      <div className="relative aspect-[4/3] bg-[#e3ebf8]">
        <ImageSlot label={a.imageLabel} src={a.image || undefined} />
        <span className="absolute top-3 left-3 inline-flex h-[22px] items-center rounded-full bg-white/95 px-2.5 text-[0.6875rem] font-bold text-navy">
          {a.filter}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 pb-[18px]">
        <h3 className="font-display text-[1.0625rem] font-extrabold tracking-[-0.015em] text-navy">
          {a.name}
        </h3>
        <p className="text-sm leading-[1.55] text-[#4c5c78]">{a.blurb}</p>
        <div className="mt-auto flex flex-col gap-1.5 pt-2.5 text-xs text-[#4c5c78] shadow-[inset_0_1px_0_#eef1f5]">
          <span className="flex items-center gap-1.5 pt-2">
            <MapPin className="size-3 shrink-0 text-royal" aria-hidden="true" />
            {a.where}
          </span>
          <span className="flex items-center gap-1.5">
            <Info className="size-3 shrink-0 text-royal" aria-hidden="true" />
            {a.note}
          </span>
        </div>
      </div>
    </>
  );

  const className =
    'group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.08),0_4px_14px_rgba(18,60,122,0.05)] transition hover:shadow-[0_0_0_1px_rgba(43,98,238,0.25),0_8px_22px_rgba(18,60,122,0.12)]';

  if (a.featured) {
    return (
      <m.div variants={fadeUp} className="h-full">
        <AppLink to={`/visit-mati/${a.slug}`} className={className}>
          {inner}
        </AppLink>
      </m.div>
    );
  }
  return (
    <m.article variants={fadeUp} className={className}>
      {inner}
    </m.article>
  );
}

function seasonBarClass(state: string): string {
  if (state === 'peak') return 'bg-amber';
  if (state === 'on') return 'bg-royal';
  return 'bg-[#f1f4f8]';
}

export default function VisitMati() {
  const [active, setActive] = useState('All');

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: attractions.length };
    for (const f of filters) {
      if (f === 'All') continue;
      map[f] = attractions.filter((a) => a.filter === f).length;
    }
    return map;
  }, []);

  const visible = useMemo(
    () => (active === 'All' ? attractions : attractions.filter((a) => a.filter === active)),
    [active]
  );

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Seo
          title="Visit Mati"
          description="Two coasts, one city — Pacific surf at Dahican and the protected Pujada Bay. Where to go in Mati, when to come, and how to plan your trip."
          canonicalPath="/visit-mati"
        />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-navy">
          <div className="absolute inset-0 -z-20">
            <ImageSlot
              src="/assets/images/banners/visit-mati-bg.jpg"
              alt=""
              label="Drop a wide hero photo — surfer on a Dahican wave"
            />
          </div>
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(18,60,122,0.94)_0%,rgba(18,60,122,0.78)_44%,rgba(18,60,122,0.35)_80%,rgba(18,60,122,0.2)_100%)]"
            aria-hidden="true"
          />
          <Container>
            <div className="grid min-h-[560px] items-center gap-10 py-14 md:py-16 lg:grid-cols-2">
              <m.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="text-white"
              >
                <m.nav
                  variants={fadeUp}
                  aria-label="Breadcrumb"
                  className="mb-6 flex items-center gap-2.5 text-[0.8125rem] text-white/80"
                >
                  <AppLink to="/" className="text-white/80 hover:text-white">
                    Home
                  </AppLink>
                  <ChevronRight className="size-2.5" aria-hidden="true" />
                  <span className="font-semibold text-white">Visit Mati</span>
                </m.nav>
                <m.img
                  variants={fadeUp}
                  src={FEEL_MATI_LOGO}
                  alt="Feel Mati"
                  className="h-auto w-[200px]"
                />
                <m.h1
                  variants={fadeUp}
                  className="mt-5 mb-3.5 font-display text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-white md:text-6xl"
                >
                  {hero.tagline}
                  <br />
                  <span className="text-amber">{hero.taglineAccent}</span>
                </m.h1>
                <m.p
                  variants={fadeUp}
                  className="max-w-[500px] text-[1.0625rem] leading-relaxed text-white/90"
                >
                  {hero.subtitle}
                </m.p>
                <m.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#plan"
                    className="inline-flex h-[46px] items-center gap-2 rounded-lg bg-amber px-5 font-display text-[0.9375rem] font-bold text-navy transition hover:brightness-105"
                  >
                    Plan your trip
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href="#places"
                    className="inline-flex h-[46px] items-center gap-2 rounded-lg bg-white/10 px-5 font-display text-[0.9375rem] font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/15"
                  >
                    <MapPin className="size-3.5" aria-hidden="true" />
                    See all places
                  </a>
                </m.div>
              </m.div>

              {/* Conditions card — indicative sample data for layout. */}
              <m.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="w-full max-w-[360px] justify-self-start overflow-hidden rounded-xl border-t-[3px] border-amber bg-white shadow-[0_18px_44px_rgba(3,10,30,0.34)] lg:justify-self-end"
              >
                <div className="flex items-center justify-between px-[18px] pt-4 pb-3">
                  <div>
                    <div className="font-mono text-[0.6875rem] tracking-[0.09em] text-[#4c5c78]">
                      {conditions.place.toUpperCase()}
                    </div>
                    <div className="mt-0.5 font-display text-[1.0625rem] font-extrabold text-navy">
                      {conditions.status}
                    </div>
                  </div>
                  {conditions.open ? (
                    <span className="inline-flex h-[22px] items-center gap-1.5 rounded-full bg-[#e6f6ee] px-2.5 text-xs font-bold text-[#11704a]">
                      <span className="size-1.5 rounded-full bg-[#16a34a]" aria-hidden="true" />
                      Open
                    </span>
                  ) : null}
                </div>
                <div className="grid grid-cols-3 shadow-[inset_0_1px_0_#e3e8ef,inset_0_-1px_0_#e3e8ef]">
                  {conditions.metrics.map((metric, i) => (
                    <div
                      key={metric.label}
                      className={`px-[18px] py-3.5 ${i > 0 ? 'shadow-[inset_1px_0_0_#e3e8ef]' : ''}`}
                    >
                      <div className="text-xs text-[#4c5c78]">{metric.label}</div>
                      <div className="mt-0.5 font-display text-xl font-extrabold text-navy">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2.5 px-[18px] py-[11px] text-xs text-[#4c5c78]">
                  <span className="inline-flex items-center gap-1.5">
                    <Radio className="size-3" aria-hidden="true" />
                    Source: {conditions.source}
                  </span>
                  <span>{conditions.updated}</span>
                </div>
              </m.div>
            </div>
          </Container>
        </section>

        {/* ── Two coasts ───────────────────────────────────────────────────── */}
        <section className="bg-white py-14 md:py-16">
          <Container>
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mb-8 max-w-[640px]"
            >
              <Eyebrow>Pick your side — or both</Eyebrow>
              <h2 className="mt-2.5 mb-2.5 font-display text-[2.25rem] font-extrabold tracking-[-0.03em] text-navy">
                The open Pacific, and the sheltered bay
              </h2>
              <p className="text-base leading-relaxed text-[#4c5c78]">
                Mati sits on a peninsula. Its east shore takes the full Pacific swell; its west
                shore wraps around Pujada Bay, one of the calmest protected seascapes in Mindanao.
                Most visitors do both in one trip.
              </p>
            </m.div>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-5 lg:grid-cols-2"
            >
              {coasts.map((coast) => (
                <CoastCard key={coast.key} coast={coast} />
              ))}
            </m.div>
          </Container>
        </section>

        {/* ── Directory ────────────────────────────────────────────────────── */}
        <section id="places" className="scroll-mt-20 bg-[#f1f6fc] py-14 md:py-16">
          <Container>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
              <div>
                <Eyebrow>Places to go</Eyebrow>
                <h2 className="mt-2.5 font-display text-[2rem] font-extrabold tracking-[-0.03em] text-navy">
                  Where to go in Mati
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {filters.map((f) => {
                  const isActive = f === active;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActive(f)}
                      aria-pressed={isActive}
                      className={
                        isActive
                          ? 'inline-flex h-[34px] items-center gap-1.5 rounded-lg bg-navy px-3.5 font-display text-[0.8125rem] font-bold text-white'
                          : 'inline-flex h-[34px] items-center gap-1.5 rounded-lg bg-white px-3.5 font-display text-[0.8125rem] font-semibold text-navy shadow-[0_0_0_1px_#d6dee9] transition hover:bg-[#eef4fe]'
                      }
                    >
                      {f}
                      <span
                        className={`font-mono text-[0.6875rem] ${isActive ? 'text-amber' : 'text-[#4c5c78]'}`}
                      >
                        {counts[f]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <m.div
              key={active}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visible.map((a) => (
                <PlaceCard key={a.slug} a={a} />
              ))}
            </m.div>
          </Container>
        </section>

        {/* ── Season guide ─────────────────────────────────────────────────── */}
        <section className="bg-white py-14 md:py-16">
          <Container>
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mb-6 flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <Eyebrow>When to come</Eyebrow>
                <h2 className="mt-2.5 font-display text-[2rem] font-extrabold tracking-[-0.03em] text-navy">
                  A year on the water
                </h2>
              </div>
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-[#fff6d9] px-2.5 text-xs font-semibold text-[#8a6200] ring-1 ring-[#f5d36b] ring-inset">
                <Info className="size-3" aria-hidden="true" />
                Indicative — to verify with City Tourism Office
              </span>
            </m.div>
            <div className="overflow-x-auto rounded-xl shadow-[0_0_0_1px_#e3e8ef]">
              <div
                className="min-w-[760px]"
                style={{ display: 'grid', gridTemplateColumns: '200px repeat(12, minmax(0, 1fr))' }}
              >
                <div className="bg-[#f7f9fc] px-4 py-3 shadow-[inset_0_-1px_0_#e3e8ef]" />
                {months.map((mo) => (
                  <div
                    key={mo}
                    className="bg-[#f7f9fc] py-3 text-center font-mono text-[0.6875rem] font-semibold tracking-[0.05em] text-[#4c5c78] shadow-[inset_0_-1px_0_#e3e8ef]"
                  >
                    {mo}
                  </div>
                ))}
                {seasons.map((row) => {
                  const Icon = SEASON_ICONS[row.icon] ?? Waves;
                  return (
                    <div key={row.label} className="contents">
                      <div className="flex items-center gap-2.5 px-4 py-3.5 font-display text-sm font-bold text-navy shadow-[inset_0_-1px_0_#eef1f5]">
                        <Icon className="size-4 text-royal" aria-hidden="true" />
                        {row.label}
                      </div>
                      {row.cells.map((state, i) => (
                        <div
                          key={`${row.label}-${i}`}
                          className="flex items-center px-0.5 py-3.5 shadow-[inset_0_-1px_0_#eef1f5]"
                        >
                          <div
                            className={`h-3 w-full rounded-[3px] ${seasonBarClass(state)} ${
                              state === 'off' ? 'ring-1 ring-[#e3e8ef] ring-inset' : ''
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-3.5 flex flex-wrap gap-4 text-[0.8125rem] text-[#4c5c78]">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-[18px] rounded-[3px] bg-amber" aria-hidden="true" />
                Best
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-[18px] rounded-[3px] bg-royal" aria-hidden="true" />
                Good
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2.5 w-[18px] rounded-[3px] bg-[#f1f4f8] ring-1 ring-[#e3e8ef] ring-inset"
                  aria-hidden="true"
                />
                Off-season
              </span>
            </div>
          </Container>
        </section>

        {/* ── Sambuokan ────────────────────────────────────────────────────── */}
        <section className="bg-amber">
          <Container>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid items-center gap-10 py-14 lg:grid-cols-2"
            >
              <m.div variants={fadeUp} className="text-navy">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.09em] uppercase">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {sambuokan.when}
                </div>
                <h2 className="mt-3 mb-3 font-display text-[2rem] leading-[1.04] font-extrabold tracking-[-0.035em] text-navy md:text-5xl">
                  {sambuokan.title}
                </h2>
                <p className="mb-6 max-w-[480px] text-base leading-relaxed text-navy">
                  {sambuokan.blurb}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-navy px-5 font-display text-[0.9375rem] font-bold text-white transition hover:brightness-110"
                  >
                    Festival schedule
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex h-11 items-center gap-2 rounded-lg px-5 font-display text-[0.9375rem] font-semibold text-navy shadow-[inset_0_0_0_1.5px_#123c7a] transition hover:bg-navy/5"
                  >
                    <CalendarPlus className="size-3.5" aria-hidden="true" />
                    Add to calendar
                  </a>
                </div>
              </m.div>
              <m.div
                variants={fadeUp}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f0b400] shadow-[0_18px_40px_rgba(18,60,122,0.22)]"
              >
                <ImageSlot label={sambuokan.imageLabel} />
              </m.div>
            </m.div>
          </Container>
        </section>

        {/* ── Plan ─────────────────────────────────────────────────────────── */}
        <section id="plan" className="scroll-mt-20 bg-white py-14 md:py-16">
          <Container>
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mb-7 max-w-[640px]"
            >
              <Eyebrow>Plan your trip</Eyebrow>
              <h2 className="mt-2.5 font-display text-[2rem] font-extrabold tracking-[-0.03em] text-navy">
                Getting here, getting around
              </h2>
            </m.div>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {plan.map((card) => {
                const Icon = PLAN_ICONS[card.icon] ?? Info;
                return (
                  <m.div
                    key={card.title}
                    variants={fadeUp}
                    className="flex flex-col gap-3 rounded-xl bg-white p-[22px] shadow-[0_0_0_1px_#e3e8ef]"
                  >
                    <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#eef4fe] text-royal">
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-[1.0625rem] font-extrabold text-navy">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4c5c78]">{card.body}</p>
                    {card.linkLabel ? (
                      <a
                        href="#"
                        className="mt-auto inline-flex items-center gap-1.5 font-display text-sm font-bold text-royal"
                      >
                        {card.linkLabel}
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </a>
                    ) : null}
                  </m.div>
                );
              })}
              <m.div
                variants={fadeUp}
                className="flex flex-col gap-3 rounded-xl bg-navy p-[22px] text-white"
              >
                <span className="flex size-10 items-center justify-center rounded-[10px] bg-amber/15 text-amber">
                  <ShieldCheck className="size-[18px]" aria-hidden="true" />
                </span>
                <h3 className="font-display text-[1.0625rem] font-extrabold text-white">
                  {responsible.title}
                </h3>
                <ul className="grid gap-1.5 pl-[18px] text-sm leading-snug text-white/90 [list-style:disc]">
                  {responsible.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </m.div>
            </m.div>

            {/* Tourism office assistance bar */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-xl bg-[#f1f6fc] px-[22px] py-[18px] shadow-[inset_0_0_0_1px_#d9e5fb]"
            >
              <div className="flex items-center gap-3.5">
                <HandHelping className="size-[22px] text-royal" aria-hidden="true" />
                <div>
                  <div className="font-display text-[0.9375rem] font-bold text-navy">
                    {tourismOffice.name}
                  </div>
                  <div className="text-[0.8125rem] text-[#4c5c78]">{tourismOffice.hours}</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-[#fff6d9] px-2.5 text-xs font-semibold text-[#8a6200] ring-1 ring-[#f5d36b] ring-inset">
                  <Info className="size-3" aria-hidden="true" />
                  {tourismOffice.phoneNote}
                </span>
                <AppLink
                  to="/contact"
                  className="inline-flex h-[38px] items-center gap-2 rounded-lg bg-royal px-4 font-display text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <Flag className="size-3.5" aria-hidden="true" />
                  Report a tourism concern
                </AppLink>
              </div>
            </m.div>
          </Container>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
