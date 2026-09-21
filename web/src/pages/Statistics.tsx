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
  cmciData,
  totalPopulation,
  barangayCount,
  landAreaKm2,
  incomeClass,
  municipalFinance,
  economicIndicators,
  povertyStats,
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

function Meter({
  label,
  value,
  pct,
  color = '#2b62ee',
}: {
  label: string;
  value: string;
  pct: number;
  color?: string;
}) {
  const width = Math.max(0, Math.min(pct, 100));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-[0.8125rem]">
        <span className="text-[#123c7a]">{label}</span>
        <span className="font-mono text-[0.75rem] tabular-nums text-[#4c5c78]">{value}</span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-[#e3e8ef]"
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${label}: ${value}`}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function Statistics() {
  const { t } = useLanguage();
  const top10 = barangayData.slice(0, 10);

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

  const cmciBar = {
    labels: cmciData.pillars.map((p) => p.label),
    datasets: [
      {
        label: 'Pillar Score',
        data: cmciData.pillars.map((p) => p.score),
        backgroundColor: cmciData.pillars.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderRadius: 4,
      },
    ],
  };

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Seo
          title={t('stats-title')}
          description="Population, demographics, and competitiveness statistics for the City of Mati."
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
                  Population, finance, and competitiveness data for the City of Mati — sourced from
                  the PSA, BLGF, and DTI.
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
                meta={t('stats-population-source')}
              />
              <MetricCard value={barangayCount} label={t('stats-barangays')} />
              <MetricCard value={`${landAreaKm2} km²`} label={t('stats-land-area')} />
              <MetricCard value={incomeClass} label={t('stats-income-class')} />
              <MetricCard
                value={`#${cmciData.overall.rank}`}
                label={`${t('stats-cmci-rank')} (${cmciData.year})`}
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
                Source: PSA Census of Population ({firstYear}–{lastYear})
              </p>
            </div>
          </Container>
        </section>

        {/* ── Population by barangay ────────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <SectionHead>{t('stats-population-by-barangay')}</SectionHead>
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

        {/* ── City income & finance ────────────────────────────────────────── */}
        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <SectionHead>
              {t('stats-city-income-finance')} (FY {municipalFinance.fiscalYear})
            </SectionHead>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mb-4 grid gap-4 sm:grid-cols-3"
            >
              <MetricCard
                value={municipalFinance.annualIncome.display}
                label={t('stats-annual-income')}
                meta={municipalFinance.annualIncome.detail}
              />
              <MetricCard
                value={municipalFinance.iraShare.display}
                label={t('stats-ira-share')}
                meta={municipalFinance.iraShare.detail}
              />
              <MetricCard
                value={municipalFinance.iraDependency.display}
                label={t('stats-ira-dependency')}
                meta={municipalFinance.iraDependency.detail}
              />
            </m.div>
            <div className={`${CARD} p-[22px]`}>
              <span className="mb-3 block text-sm font-semibold text-[#123c7a]">
                {t('stats-income-composition')}
              </span>
              <div
                className="flex h-6 overflow-hidden rounded-full"
                role="img"
                aria-label={`Income composition: IRA ${municipalFinance.composition.ira}%, Local ${municipalFinance.composition.local}%`}
              >
                <div
                  className="flex items-center justify-center bg-[#2b62ee] text-[10px] font-semibold text-white"
                  style={{ width: `${municipalFinance.composition.ira}%` }}
                >
                  IRA {municipalFinance.composition.ira}%
                </div>
                <div
                  className="flex items-center justify-center bg-[#06a77d] text-[10px] font-semibold text-white"
                  style={{ width: `${municipalFinance.composition.local}%` }}
                >
                  Local {municipalFinance.composition.local}%
                </div>
              </div>
              <p className="mt-3 font-mono text-[0.6875rem] text-[#4c5c78]">
                Source: BLGF 2023 Statement of Receipts and Expenditures
              </p>
            </div>
          </Container>
        </section>

        {/* ── Economic indicators ──────────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <SectionHead>{t('stats-economic-indicators')}</SectionHead>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mb-4 grid gap-4 sm:grid-cols-3"
            >
              <MetricCard
                value={economicIndicators.registeredBusinesses.value}
                label={t('stats-registered-businesses')}
                meta={economicIndicators.registeredBusinesses.trend}
                metaClass="text-[#06a77d]"
              />
              <MetricCard
                value={economicIndicators.agriculturalLand.value}
                label={t('stats-agricultural-land')}
                meta={economicIndicators.agriculturalLand.note}
              />
              <MetricCard
                value={economicIndicators.employmentRate.value}
                label={t('stats-employment-rate')}
                meta={economicIndicators.employmentRate.note}
              />
            </m.div>
            <div className={`${CARD} p-[22px]`}>
              <span className="mb-3 block text-sm font-semibold text-[#123c7a]">
                {t('stats-economic-sectors')}
              </span>
              <div className="grid gap-3">
                {economicIndicators.sectors.map((s) => (
                  <Meter key={s.name} label={s.name} value={`${s.pct}%`} pct={s.pct} />
                ))}
              </div>
              <p className="mt-3 font-mono text-[0.6875rem] text-[#4c5c78]">Source: BLGF 2023</p>
            </div>
          </Container>
        </section>

        {/* ── Poverty ──────────────────────────────────────────────────────── */}
        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <SectionHead>{t('stats-poverty-statistics')}</SectionHead>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-4 sm:grid-cols-3"
            >
              <MetricCard
                value={`${povertyStats.y2018.rate}%`}
                label={t('stats-2018-poverty-incidence')}
                meta={povertyStats.y2018.ci}
              />
              <MetricCard
                value={`${povertyStats.y2021.rate}%`}
                label={t('stats-2021-poverty-incidence')}
                meta={povertyStats.y2021.ci}
              />
              <MetricCard
                value={povertyStats.change}
                label={t('stats-change-2018-2021')}
                meta={t('stats-improved')}
                accent="#06a77d"
                metaClass="text-[#06a77d]"
              />
            </m.div>
            <p className="mt-3 font-mono text-[0.6875rem] text-[#4c5c78]">
              Source: PSA 2021 City &amp; Municipal-Level Poverty Estimates
            </p>
          </Container>
        </section>

        {/* ── Competitiveness (CMCI) ───────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <SectionHead>
              {t('stats-mati-competitive-index')} ({cmciData.year})
            </SectionHead>
            <p className="mb-4 max-w-2xl text-[0.9375rem] leading-relaxed text-[#4c5c78]">
              DTI Cities and Municipalities Competitiveness Index {cmciData.year} — overall score{' '}
              {cmciData.overall.score.toFixed(2)} (rank #{cmciData.overall.rank} nationwide). The
              indicator bars below are normalized to a 0–100 scale.
            </p>
            <div className={`${CARD} p-[22px]`}>
              <div
                className="h-72"
                role="img"
                aria-label="Bar chart of the five CMCI pillar scores"
              >
                <ClientOnly fallback={<ChartFallback />}>
                  {() => <Bar data={cmciBar} options={barOptions} />}
                </ClientOnly>
              </div>
            </div>

            <div className={`mt-4 overflow-x-auto ${CARD}`}>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#f1f6fc] text-[#123c7a]">
                    <th className="px-4 py-2.5 font-semibold">Pillar</th>
                    <th className="px-4 py-2.5 font-semibold">Score</th>
                    <th className="px-4 py-2.5 font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {cmciData.pillars.map((p) => (
                    <tr key={p.label} className="border-t border-[#e3e8ef]">
                      <td className="px-4 py-2 text-[#123c7a]">{p.label}</td>
                      <td className="px-4 py-2 tabular-nums text-[#4c5c78]">
                        {p.score.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            p.trend.dir === 'up'
                              ? 'text-xs font-semibold text-[#06a77d]'
                              : p.trend.dir === 'down'
                                ? 'text-xs font-semibold text-[#e01b24]'
                                : 'text-xs font-semibold text-[#4c5c78]'
                          }
                        >
                          {p.trend.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Per-pillar indicator detail */}
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {cmciData.pillars.map((p) => (
                <div key={p.label} className={`${CARD} p-5`}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-[#123c7a]">{p.label}</h3>
                    <span className="font-display text-sm font-bold tabular-nums text-[#2b62ee]">
                      {p.score.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid gap-2.5">
                    {p.indicators.map((ind) => (
                      <Meter
                        key={ind.name}
                        label={ind.name}
                        value={String(ind.value)}
                        pct={Math.min(ind.fill, 100)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[0.6875rem] text-[#4c5c78]">
              Source: DTI Cities and Municipalities Competitiveness Index {cmciData.year}
            </p>
          </Container>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
