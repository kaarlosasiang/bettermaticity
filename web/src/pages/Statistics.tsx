import type { ReactNode } from 'react';
import type { ChartOptions } from 'chart.js';
import { ClientOnly } from 'vite-react-ssg';
import { Line, Bar } from 'react-chartjs-2';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/hooks/useLanguage';
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
import { CHART_COLORS, chartFont } from '@/lib/charts';

const CARD = 'rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)]';

const ChartFallback = () => (
  <div className="h-full animate-pulse rounded-lg bg-[#eef4fe]" aria-hidden="true" />
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
    x: { ticks: { font: chartFont }, grid: { display: false } },
    y: { ticks: { font: chartFont, callback: thousands }, grid: { color: 'rgba(18,60,122,0.08)' } },
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
      ticks: { font: chartFont, autoSkip: false, maxRotation: 60, minRotation: 45 },
      grid: { display: false },
    },
    y: { ticks: { font: chartFont, callback: thousands }, grid: { color: 'rgba(18,60,122,0.08)' } },
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
      <span className="h-[26px] w-1 rounded bg-[#2b62ee]" aria-hidden="true" />
      <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]">
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
  metaClass = 'text-[#4c5c78]',
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
      <span className="mt-0.5 block text-sm font-semibold text-[#123c7a]">{label}</span>
      {meta && <span className={`mt-1 block font-mono text-[0.6875rem] ${metaClass}`}>{meta}</span>}
    </m.div>
  );
}

function SourceLink({ source }: { source: { title: string; url: string } }) {
  return (
    <a className="underline underline-offset-4 hover:text-[#2b62ee]" href={source.url}>
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
        borderColor: '#9dc0ff',
        backgroundColor: 'rgba(157,192,255,0.20)',
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
        borderRadius: 4,
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
        <section className="bg-[#123c7a] py-12 lg:py-16">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <m.div variants={staggerContainer} initial="hidden" animate="show">
                <m.span
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.08em] text-[#9dc0ff]"
                >
                  <span className="h-0.5 w-6 bg-[#2b62ee]" aria-hidden="true" />
                  {t('nav-statistics')}
                </m.span>
                <m.h1
                  variants={fadeUp}
                  className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.75rem]"
                >
                  {t('stats-title')}
                </m.h1>
                <m.p
                  variants={fadeUp}
                  className="mt-3 max-w-xl text-base leading-relaxed text-white/75"
                >
                  {t('stats-verified-intro')}
                  <span className="mt-2 block text-sm">
                    {t('stats-checked-on', { date: statisticsCheckedOn })}
                  </span>
                </m.p>
              </m.div>

              {/* Featured figure + population sparkline */}
              <m.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="rounded-xl bg-white/[0.06] p-6 ring-1 ring-white/15"
              >
                <div className="font-mono text-[0.625rem] tracking-[0.08em] text-white/60">
                  {t('stats-population-label').toUpperCase()} · {t('stats-population-source')}
                </div>
                <div className="mt-1 font-display text-5xl font-extrabold leading-none tracking-[-0.03em] text-white">
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
                <div className="mt-2 flex items-center justify-between font-mono text-[0.625rem] text-white/50">
                  <span>{firstYear}</span>
                  <span className="text-[#9dc0ff]">
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
        <section className="bg-[#f1f6fc] py-12">
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
              {/* Screen-reader alternative for the line chart */}
              <table className="sr-only">
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
              <p className="mt-3 font-mono text-[0.6875rem] text-[#4c5c78]">
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
            <p className="mb-4 text-sm text-[#4c5c78]">
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
              <summary className="cursor-pointer px-[22px] py-3.5 text-sm font-semibold text-[#123c7a]">
                All {barangayCount} barangays
              </summary>
              <div className="overflow-x-auto border-t border-[#e3e8ef]">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-[#f1f6fc] text-[#123c7a]">
                      <th className="px-4 py-2.5 font-semibold">Barangay</th>
                      <th className="px-4 py-2.5 font-semibold">
                        {t('stats-population-label')} (2024)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {barangayData.map((b) => (
                      <tr key={b.name} className="border-t border-[#e3e8ef]">
                        <td className="px-4 py-2 text-[#123c7a]">{b.name}</td>
                        <td className="px-4 py-2 tabular-nums text-[#4c5c78]">
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

        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <SectionHead>
              {t('stats-finance-heading')} (FY {municipalFinance.fiscalYear})
            </SectionHead>
            <p className="mb-4 text-sm text-[#4c5c78]">{t('stats-finance-period')}</p>
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
                <caption className="px-4 py-3 text-left font-semibold text-[#123c7a]">
                  {t('stats-receipt-breakdown')}
                </caption>
                <thead>
                  <tr className="bg-[#f1f6fc]">
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
                    <tr key={key} className="border-t border-[#e3e8ef]">
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
              <p className="px-4 py-3 text-sm text-[#4c5c78]">{t('stats-receipts-note')}</p>
            </div>
            <p className="mt-3 text-xs text-[#4c5c78]">
              {t('stats-source')}: <SourceLink source={statisticsSources.finance} />
            </p>
          </Container>
        </section>

        <section className="bg-white py-12">
          <Container>
            <SectionHead>{t('stats-poverty-statistics')}</SectionHead>
            <p className="mb-4 max-w-3xl text-sm text-[#4c5c78]">{t('stats-poverty-definition')}</p>
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
            <p className="mt-4 text-sm text-[#4c5c78]">{t('stats-poverty-release')}</p>
            <p className="mt-3 text-xs text-[#4c5c78]">
              {t('stats-source')}: <SourceLink source={statisticsSources.poverty} /> ·{' '}
              <SourceLink source={statisticsSources.povertyArchive} />
            </p>
          </Container>
        </section>

        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <SectionHead>{t('stats-data-availability')}</SectionHead>
            <div className="grid gap-4 md:grid-cols-2">
              <div className={`${CARD} p-5`}>
                <h3 className="font-semibold text-[#123c7a]">{t('stats-economic-indicators')}</h3>
                <p className="mt-2 text-sm text-[#4c5c78]">{t('stats-economic-unverified')}</p>
              </div>
              <div className={`${CARD} p-5`}>
                <h3 className="font-semibold text-[#123c7a]">
                  {t('stats-mati-competitive-index')}
                </h3>
                <p className="mt-2 text-sm text-[#4c5c78]">{t('stats-cmci-unverified')}</p>
                <p className="mt-3 text-xs text-[#4c5c78]">
                  <SourceLink source={statisticsSources.cmci} />
                </p>
              </div>
            </div>
          </Container>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
