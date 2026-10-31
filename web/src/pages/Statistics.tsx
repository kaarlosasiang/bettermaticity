import type { ReactNode } from 'react';
import type { ChartOptions } from 'chart.js';
import { ClientOnly } from 'vite-react-ssg';
import { Line, Bar } from 'react-chartjs-2';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Breadcrumb, Container, heroClasses } from '@/components/primitives';
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
  barangayData,
  historicalData,
  totalPopulation,
  barangayCount,
  landAreaKm2,
  incomeClass,
  municipalFinance,
  povertyStats,
  statisticsSources,
  statisticsCheckedOn,
  populationDensity,
  ntaShareOfReceipts,
} from '@/lib/statsData';
import { CHART_COLORS, CHART_GRID, chartMonoFont } from '@/lib/charts';

const CARD = 'rounded-card bg-white border border-line';

const ChartFallback = () => (
  <div className="h-full animate-pulse rounded-lg bg-royal-tint" aria-hidden="true" />
);

// ── Chart options ─────────────────────────────────────────────────────────────
const thousands = (v: number | string) => Number(v).toLocaleString();

const lineOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (c) => thousands(c.parsed.y ?? 0) } },
  },
  scales: {
    x: { ticks: { font: chartMonoFont }, grid: { display: false } },
    y: { ticks: { font: chartMonoFont, callback: thousands }, grid: { color: CHART_GRID } },
  },
};

const barOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (c) => thousands(c.parsed.y ?? 0) } },
  },
  scales: {
    x: {
      ticks: { font: chartMonoFont, autoSkip: false, maxRotation: 60, minRotation: 45 },
      grid: { display: false },
    },
    y: { ticks: { font: chartMonoFont, callback: thousands }, grid: { color: CHART_GRID } },
  },
};

// Minimal hero sparkline — no axes, no points, just the growth curve.
const sparkOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 } },
};

// ── Small building blocks (homepage idioms) ────────────────────────────────────
function SectionHead({ children }: { children: ReactNode }) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="mb-[18px] flex items-center gap-3.5"
    >
      <span className="h-[26px] w-1 rounded-none bg-royal" aria-hidden="true" />
      <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-heading">
        {children}
      </h2>
    </m.div>
  );
}

function MetricCard({
  value,
  label,
  meta,
  accent = '#2b62ee',
  metaClass = 'text-ink-muted',
}: {
  value: ReactNode;
  label: ReactNode;
  meta?: ReactNode;
  accent?: string;
  metaClass?: string;
}) {
  return (
    <m.div variants={fadeUp} className={`${CARD} p-5`} style={{ borderTop: `3px solid ${accent}` }}>
      <span
        className="block font-display text-[1.875rem] font-extrabold tracking-[-0.02em]"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span className="mt-0.5 block text-sm font-semibold text-heading">{label}</span>
      {meta && <span className={`mt-1 block font-mono text-[0.6875rem] ${metaClass}`}>{meta}</span>}
    </m.div>
  );
}

function SourceLink({ source }: { source: { title: string; url: string } }) {
  return (
    <a className="underline underline-offset-4 hover:text-royal" href={source.url}>
      {source.title}
    </a>
  );
}

export default function Statistics() {
  const { t } = useLanguage();
  const top10 = [...barangayData].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const money = (value: number) =>
    `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M`;

  const firstYear = historicalData.years[0];
  const lastYear = historicalData.years[historicalData.years.length - 1];
  const firstPop = historicalData.populations[0];
  const lastPop = historicalData.populations[historicalData.populations.length - 1];
  const growthPct = Math.round(((lastPop - firstPop) / firstPop) * 100);

  const populationLine = {
    labels: historicalData.years,
    datasets: [
      {
        label: 'Population',
        data: historicalData.populations,
        borderColor: CHART_COLORS[0],
        backgroundColor: 'rgba(43,98,238,0.12)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: CHART_COLORS[0],
      },
    ],
  };

  const sparkData = {
    labels: historicalData.years,
    datasets: [
      {
        data: historicalData.populations,
        borderColor: '#2b62ee',
        backgroundColor: 'rgba(43,98,238,0.12)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const barangayBar = {
    labels: top10.map((b) => b.name),
    datasets: [
      {
        label: 'Population',
        data: top10.map((b) => b.pop),
        backgroundColor: CHART_COLORS[0],
        borderRadius: 0,
      },
    ],
  };

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Seo
          title={t('stats-title')}
          description={t('stats-verified-intro')}
          canonicalPath="/statistics"
        />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className={heroClasses.section}>
          <Container>
            <Breadcrumb
              className={heroClasses.breadcrumb}
              items={[{ label: t('nav-home'), to: '/' }, { label: t('nav-statistics') }]}
            />
            <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <m.div
                className="min-w-0"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                <m.span variants={fadeUp} className={heroClasses.eyebrow}>
                  {t('nav-statistics')}
                </m.span>
                <m.h1 variants={fadeUp} className={heroClasses.title}>
                  {t('stats-title')}
                </m.h1>
                <m.p variants={fadeUp} className={heroClasses.lede}>
                  {t('stats-verified-intro')}
                </m.p>
                <m.p variants={fadeUp} className={heroClasses.meta}>
                  {t('stats-checked-on', { date: statisticsCheckedOn })}
                </m.p>
              </m.div>

              {/* Featured figure + population sparkline */}
              <m.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="min-w-0 rounded-card border border-line bg-surface-subtle p-6"
              >
                <div className="font-mono text-[0.625rem] tracking-[0.08em] text-ink-muted">
                  {t('stats-population-label').toUpperCase()} · {t('stats-population-source')}
                </div>
                <div className="mt-1 font-display text-5xl font-extrabold leading-none tracking-[-0.03em] text-royal tabular-nums">
                  {totalPopulation.toLocaleString()}
                </div>
                <div
                  className="mt-4 h-16"
                  role="img"
                  aria-label={`Population growth from ${firstPop.toLocaleString()} in ${firstYear} to ${lastPop.toLocaleString()} in ${lastYear}`}
                >
                  <ClientOnly fallback={<div className="h-16" aria-hidden="true" />}>
                    {() => <Line data={sparkData} options={sparkOptions} />}
                  </ClientOnly>
                </div>
                <div className="mt-2 flex items-center justify-between font-mono text-[0.625rem] text-ink-muted">
                  <span>{firstYear}</span>
                  <span className="text-royal">
                    +{growthPct}% since {firstYear}
                  </span>
                  <span>{lastYear}</span>
                </div>
              </m.div>
            </div>
          </Container>
        </section>

        {/* ── Key figures ──────────────────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
              <MetricCard
                value={totalPopulation.toLocaleString()}
                label={t('stats-population-label')}
                meta={<SourceLink source={statisticsSources.psgc} />}
              />
              <MetricCard
                value={barangayCount}
                label={t('stats-barangays')}
                meta={<SourceLink source={statisticsSources.psgc} />}
              />
              <MetricCard
                value={`${landAreaKm2} km²`}
                label={t('stats-land-area')}
                meta={<SourceLink source={statisticsSources.area} />}
              />
              <MetricCard
                value={incomeClass}
                label={t('stats-income-class')}
                meta={<SourceLink source={statisticsSources.psgc} />}
              />
              <MetricCard
                value={Math.round(populationDensity)}
                label={t('stats-density')}
                meta={t('stats-density-method')}
              />
            </m.div>
          </Container>
        </section>

        {/* ── Population trend ──────────────────────────────────────────────── */}
        <section className="bg-surface-subtle py-12">
          <Container>
            <SectionHead>{t('stats-population-trends')}</SectionHead>
            <div className={`${CARD} p-[22px]`}>
              <div
                className="h-72"
                role="img"
                aria-label={`Line chart of Mati's population from ${firstYear} to ${lastYear}`}
              >
                <ClientOnly fallback={<ChartFallback />}>
                  {() => <Line data={populationLine} options={lineOptions} />}
                </ClientOnly>
              </div>
              {/* Screen-reader alternative for the line chart.
                  sr-only on a <div> wrapper (not the <table>) so the table's
                  intrinsic width is clipped and cannot widen the page on mobile. */}
              <div className="sr-only">
                <table>
                  <caption>Population of the City of Mati by census year</caption>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Population</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.years.map((y, i) => (
                      <tr key={y}>
                        <td>{y}</td>
                        <td>{historicalData.populations[i].toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-mono text-[0.6875rem] text-ink-muted">
                {t('stats-source')}: <SourceLink source={statisticsSources.history} /> ·{' '}
                <SourceLink source={statisticsSources.census2007} /> ·{' '}
                <SourceLink source={statisticsSources.area} /> ·{' '}
                <SourceLink source={statisticsSources.psgc} />
              </p>
            </div>
          </Container>
        </section>

        {/* ── Population by barangay ────────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <SectionHead>{t('stats-population-by-barangay')} (2024)</SectionHead>
            <p className="mb-4 text-sm text-ink-muted">
              {t('stats-census-date')} · <SourceLink source={statisticsSources.psgc} />
            </p>
            <div className={`${CARD} p-[22px]`}>
              <div
                className="h-80"
                role="img"
                aria-label="Bar chart of the ten most populous barangays"
              >
                <ClientOnly fallback={<ChartFallback />}>
                  {() => <Bar data={barangayBar} options={barOptions} />}
                </ClientOnly>
              </div>
            </div>
            <details className={`mt-4 ${CARD}`}>
              <summary className="cursor-pointer px-[22px] py-3.5 text-sm font-semibold text-heading">
                All {barangayCount} barangays
              </summary>
              <div className="overflow-x-auto border-t border-line">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-surface-subtle text-heading">
                      <th className="px-4 py-2.5 font-semibold">Barangay</th>
                      <th className="px-4 py-2.5 font-semibold">
                        {t('stats-population-label')} (2024)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {barangayData.map((b) => (
                      <tr key={b.name} className="border-t border-line">
                        <td className="px-4 py-2 text-heading">{b.name}</td>
                        <td className="px-4 py-2 tabular-nums text-ink-muted">
                          {b.pop.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </Container>
        </section>

        <section className="bg-surface-subtle py-12">
          <Container>
            <SectionHead>
              {t('stats-finance-heading')} (FY {municipalFinance.fiscalYear})
            </SectionHead>
            <p className="mb-4 text-sm text-ink-muted">{t('stats-finance-period')}</p>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-4 sm:grid-cols-3"
            >
              <MetricCard
                value={money(municipalFinance.receipts.total)}
                label={t('stats-total-receipts')}
              />
              <MetricCard value={money(municipalFinance.receipts.nta)} label={t('stats-nta')} />
              <MetricCard
                value={`${ntaShareOfReceipts.toFixed(2)}%`}
                label={t('stats-nta-receipts-share')}
                meta={t('stats-nta-method')}
              />
            </m.div>
            <div className={`mt-4 ${CARD} overflow-x-auto`}>
              <table className="w-full text-left text-sm">
                <caption className="px-4 py-3 text-left font-semibold text-heading">
                  {t('stats-receipt-breakdown')}
                </caption>
                <thead>
                  <tr className="bg-surface-subtle">
                    <th scope="col" className="px-4 py-2">
                      {t('stats-category')}
                    </th>
                    <th scope="col" className="px-4 py-2">
                      {t('stats-php-millions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(['local', 'external', 'nonIncome'] as const).map((key) => (
                    <tr key={key} className="border-t border-line">
                      <th scope="row" className="px-4 py-2 font-normal">
                        {t(`stats-receipts-${key}`)}
                      </th>
                      <td className="px-4 py-2 tabular-nums">
                        {money(municipalFinance.receipts[key])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-4 py-3 text-sm text-ink-muted">{t('stats-receipts-note')}</p>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              {t('stats-source')}: <SourceLink source={statisticsSources.finance} />
            </p>
          </Container>
        </section>

        <section className="bg-white py-12">
          <Container>
            <SectionHead>{t('stats-poverty-statistics')}</SectionHead>
            <p className="mb-4 max-w-3xl text-sm text-ink-muted">{t('stats-poverty-definition')}</p>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-4 sm:grid-cols-3"
            >
              {povertyStats.map((p) => (
                <MetricCard
                  key={p.year}
                  value={`${p.rate.toFixed(2)}%`}
                  label={String(p.year)}
                  meta={t('stats-confidence-interval', {
                    lower: p.lower.toFixed(2),
                    upper: p.upper.toFixed(2),
                  })}
                />
              ))}
            </m.div>
            <p className="mt-4 text-sm text-ink-muted">{t('stats-poverty-release')}</p>
            <p className="mt-3 text-xs text-ink-muted">
              {t('stats-source')}: <SourceLink source={statisticsSources.poverty} /> ·{' '}
              <SourceLink source={statisticsSources.povertyArchive} />
            </p>
          </Container>
        </section>

        <section className="bg-surface-subtle py-12">
          <Container>
            <SectionHead>{t('stats-data-availability')}</SectionHead>
            <div className="grid gap-4 md:grid-cols-2">
              <div className={`${CARD} p-5`}>
                <h3 className="font-semibold text-heading">{t('stats-economic-indicators')}</h3>
                <p className="mt-2 text-sm text-ink-muted">{t('stats-economic-unverified')}</p>
              </div>
              <div className={`${CARD} p-5`}>
                <h3 className="font-semibold text-heading">{t('stats-mati-competitive-index')}</h3>
                <p className="mt-2 text-sm text-ink-muted">{t('stats-cmci-unverified')}</p>
                <p className="mt-3 text-xs text-ink-muted">
                  <SourceLink source={statisticsSources.cmci} />
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm">
              <AppLink
                to="/transparency/sources"
                className="inline-flex items-center gap-1 font-semibold text-royal hover:underline"
              >
                {t('sources-see-all')}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </AppLink>
            </p>
          </Container>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
