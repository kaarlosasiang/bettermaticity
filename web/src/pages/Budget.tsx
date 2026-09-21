import type { ReactNode } from 'react';
import type { ChartOptions } from 'chart.js';
import { ClientOnly } from 'vite-react-ssg';
import { Doughnut } from 'react-chartjs-2';
import { Building2, MapPin, ArrowUpRight, Info } from 'lucide-react';
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
import { financialData, peso } from '@/lib/budgetData';
import { infraProjects } from '@/lib/infrastructureData';
import { DpwhProjects } from '@/components/DpwhProjects';
import { CHART_COLORS, chartFont } from '@/lib/charts';

const CARD = 'rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)]';

const q = financialData.q2; // latest quarter headline
const quarters = [financialData.q1, financialData.q2];

const doughnutOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: chartFont, padding: 16 } },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.label}: ${peso(ctx.parsed)}`,
      },
    },
  },
  cutout: '58%',
};

const ChartFallback = () => (
  <div className="h-full animate-pulse rounded-lg bg-[#eef4fe]" aria-hidden="true" />
);

// ── Homepage idioms (mirrors the rebuilt Statistics page) ──────────────────────
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

export default function Budget() {
  const { t } = useLanguage();

  const localPct = Math.round((q.income.local / q.income.total) * 100);
  const externalPct = 100 - localPct;

  const incomeData = {
    labels: [t('budget-local-sources'), t('budget-external-sources')],
    datasets: [
      {
        data: [q.income.local, q.income.external],
        backgroundColor: [CHART_COLORS[0], CHART_COLORS[1]],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const expenditureRows = [
    { label: t('budget-general-public-services'), amount: q.expenditures.gps, color: '#2b62ee' },
    { label: t('budget-social-services'), amount: q.expenditures.social, color: '#06a77d' },
    { label: t('budget-economic-services'), amount: q.expenditures.economic, color: '#f77f00' },
    { label: t('budget-debt-service'), amount: q.expenditures.debt, color: '#e01b24' },
  ];

  const quarterRows: [string, (x: typeof financialData.q1) => number][] = [
    [t('budget-total-income'), (x) => x.income.total],
    [t('budget-local-sources'), (x) => x.income.local],
    [t('budget-external-sources'), (x) => x.income.external],
    [t('budget-total-expenditures'), (x) => x.expenditures.total],
    [t('budget-net-operating-income'), (x) => x.netIncome],
    [t('budget-fund-balance'), (x) => x.fundBalance],
  ];

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Seo
          title={t('budget-title')}
          description="Statement of receipts and expenditures and fiscal transparency for the City of Mati."
          canonicalPath="/budget"
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
                  {t('nav-transparency')}
                </m.span>
                <m.h1
                  variants={fadeUp}
                  className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.75rem]"
                >
                  {t('budget-title')}
                </m.h1>
                <m.p
                  variants={fadeUp}
                  className="mt-3 max-w-xl text-base leading-relaxed text-white/75"
                >
                  {t('budget-statement-of-receipts-expenditures')} — {q.period}.
                </m.p>
              </m.div>

              {/* Featured figure: latest quarter income + local/external split */}
              <m.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="rounded-xl bg-white/[0.06] p-6 ring-1 ring-white/15"
              >
                <div className="font-mono text-[0.625rem] tracking-[0.08em] text-white/60">
                  {t('budget-total-income').toUpperCase()} · {q.period}
                </div>
                <div className="mt-1 font-display text-5xl font-extrabold leading-none tracking-[-0.03em] text-white">
                  {peso(q.income.total)}
                </div>
                <div
                  className="mt-4 flex h-2.5 overflow-hidden rounded-full"
                  role="img"
                  aria-label={`Income sources: ${t('budget-local-sources')} ${localPct}%, ${t('budget-external-sources')} ${externalPct}%`}
                >
                  <div style={{ width: `${localPct}%`, backgroundColor: '#9dc0ff' }} />
                  <div style={{ width: `${externalPct}%`, backgroundColor: '#2b62ee' }} />
                </div>
                <div className="mt-2 flex items-center justify-between font-mono text-[0.625rem] text-white/60">
                  <span>
                    {t('budget-local-sources')} {localPct}%
                  </span>
                  <span>
                    {t('budget-external-sources')} {externalPct}%
                  </span>
                </div>
              </m.div>
            </div>
          </Container>
        </section>

        {/* ── KPI tiles ────────────────────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid grid-cols-2 gap-4 lg:grid-cols-4"
            >
              <MetricCard
                value={peso(q.income.total)}
                label={t('budget-total-income')}
                meta={q.period}
              />
              <MetricCard
                value={peso(q.expenditures.total)}
                label={t('budget-total-expenditures')}
                meta={q.period}
              />
              <MetricCard
                value={peso(q.netIncome)}
                label={t('budget-net-operating-income')}
                accent="#06a77d"
              />
              <MetricCard value={peso(q.fundBalance)} label={t('budget-fund-balance')} />
            </m.div>
          </Container>
        </section>

        {/* ── Money viz: income donut + expenditure meters ─────────────────── */}
        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <SectionHead>
              {t('budget-income-sources')} &amp; {t('budget-expenditure-allocation')} ({q.period})
            </SectionHead>
            <div className="grid gap-5 lg:grid-cols-2">
              {/* Income by source (donut) */}
              <div className={`${CARD} p-[22px]`}>
                <span className="mb-3 block text-sm font-semibold text-[#123c7a]">
                  {t('budget-income-sources')}
                </span>
                <div
                  className="h-64"
                  role="img"
                  aria-label={`Income by source for ${q.period}: ${t('budget-local-sources')} ${peso(q.income.local)}, ${t('budget-external-sources')} ${peso(q.income.external)}`}
                >
                  <ClientOnly fallback={<ChartFallback />}>
                    {() => <Doughnut data={incomeData} options={doughnutOptions} />}
                  </ClientOnly>
                </div>
                <table className="sr-only">
                  <caption>Income by source, {q.period}</caption>
                  <tbody>
                    <tr>
                      <td>{t('budget-local-sources')}</td>
                      <td>{peso(q.income.local)}</td>
                    </tr>
                    <tr>
                      <td>{t('budget-external-sources')}</td>
                      <td>{peso(q.income.external)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Expenditure allocation (meters) */}
              <div className={`${CARD} p-[22px]`}>
                <span className="mb-4 block text-sm font-semibold text-[#123c7a]">
                  {t('budget-expenditure-allocation')}
                </span>
                <div className="grid gap-3.5">
                  {expenditureRows.map((row) => (
                    <Meter
                      key={row.label}
                      label={row.label}
                      value={peso(row.amount)}
                      pct={(row.amount / q.expenditures.total) * 100}
                      color={row.color}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1.5 font-mono text-[0.6875rem] text-[#4c5c78]">
              <Info className="size-3.5" aria-hidden="true" />
              Source:{' '}
              <a
                href="https://blgf.gov.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2b62ee] hover:underline"
              >
                {t('budget-bureau-of-local-government-finance-blgf')}
              </a>
            </p>
          </Container>
        </section>

        {/* ── Quarterly summary table ──────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <SectionHead>{t('budget-quarterly-summary')} (FY2025, ₱ millions)</SectionHead>
            <div className={`overflow-x-auto ${CARD}`}>
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">
                  {t('budget-fy-2025-quarterly-financial-performance')}
                </caption>
                <thead>
                  <tr className="bg-[#f1f6fc] text-[#123c7a]">
                    <th className="px-4 py-2.5 font-semibold">{t('budget-metric')}</th>
                    {quarters.map((qtr) => (
                      <th key={qtr.period} className="px-4 py-2.5 font-semibold whitespace-nowrap">
                        {qtr.period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {quarterRows.map(([label, get]) => (
                    <tr key={label} className="border-t border-[#e3e8ef]">
                      <td className="px-4 py-2.5 font-medium text-[#123c7a]">{label}</td>
                      {quarters.map((qtr) => (
                        <td
                          key={qtr.period}
                          className="px-4 py-2.5 whitespace-nowrap tabular-nums text-[#4c5c78]"
                        >
                          {peso(get(qtr))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* ── Infrastructure investments (real flood-control projects) ─────── */}
        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <SectionHead>{t('budget-infrastructure-investments')}</SectionHead>
            <m.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="-mt-2 mb-5 flex items-center gap-1.5 font-mono text-[0.6875rem] font-semibold tracking-[0.06em] text-[#2b62ee]"
            >
              <Building2 className="size-3.5" aria-hidden="true" />
              {t('budget-public-works')} ·{' '}
              {t('budget-major-development-projects-serving-the-community')}
            </m.p>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-4"
            >
              {infraProjects.map((p) => (
                <m.div
                  key={p.titleKey + p.location}
                  variants={fadeUp}
                  className={`${CARD} p-5`}
                  style={{ borderTop: '3px solid #2b62ee' }}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#eef4fe] px-2 py-0.5 font-mono text-xs font-medium text-[#123c7a]">
                      {p.year}
                    </span>
                    <span className="rounded-full bg-[#eef4fe] px-2 py-0.5 text-xs font-medium text-[#2b62ee]">
                      {t('budget-flood-control')}
                    </span>
                  </div>
                  <h3 className="mb-1 font-display text-base font-bold text-[#123c7a]">
                    {t(p.titleKey)}
                  </h3>
                  <p className="mb-4 flex items-center gap-1 text-sm text-[#4c5c78]">
                    <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                    {p.location}
                  </p>

                  <div className="grid gap-4 border-t border-[#e3e8ef] pt-4 sm:grid-cols-3">
                    <div>
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.06em] text-[#4c5c78]">
                        {t('budget-type-of-work')}
                      </span>
                      <span className="text-sm font-medium text-[#123c7a]">
                        {t(p.typeOfWorkKey)}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.06em] text-[#4c5c78]">
                        {t('budget-contractor')}
                      </span>
                      <span className="text-sm font-medium text-[#123c7a]">
                        {t(p.contractorKey)}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.06em] text-[#4c5c78]">
                        {t('budget-contract-cost')}
                      </span>
                      <span className="text-sm font-semibold text-[#2b62ee]">{p.contractCost}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#e3e8ef] pt-3">
                    <span className="flex items-center gap-1 font-mono text-[0.6875rem] text-[#4c5c78]">
                      <Info className="size-3.5" aria-hidden="true" />
                      {t('budget-source-sumbong-sa-pangulo')}
                    </span>
                    <a
                      href={p.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-[#2b62ee] hover:underline"
                    >
                      {t('budget-view-on-map')}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </m.div>
              ))}
            </m.div>
          </Container>
        </section>

        {/* ── DPWH national-government projects (placeholder data) ─────────── */}
        <DpwhProjects />
      </MotionConfig>
    </LazyMotion>
  );
}
