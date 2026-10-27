import type { ReactNode } from 'react';
import type { ChartOptions } from 'chart.js';
import { ClientOnly } from 'vite-react-ssg';
import { Doughnut } from 'react-chartjs-2';
import { Info } from 'lucide-react';
import { Seo } from '@/components/Seo';
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
import { annualFinancials as q, fiscalSource, financialOutlook, peso } from '@/lib/budgetData';
import { DpwhProjects } from '@/components/DpwhProjects';
import { RisingProjects } from '@/components/RisingProjects';
import { CHART_COLORS, chartFont } from '@/lib/charts';

const CARD = 'min-w-0 rounded-card bg-white border border-line';

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
  <div className="h-full animate-pulse rounded-lg bg-royal-tint" aria-hidden="true" />
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
    <m.div
      variants={fadeUp}
      className={`${CARD} p-4 sm:p-5`}
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <span
        className="block font-display text-[clamp(1rem,4.5vw,1.875rem)] font-extrabold tracking-[-0.02em]"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span className="mt-0.5 block text-sm font-semibold text-heading">{label}</span>
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
        <span className="text-heading">{label}</span>
        <span className="font-mono text-[0.75rem] tabular-nums text-ink-muted">{value}</span>
      </div>
      <div
        className="h-2.5 overflow-hidden rounded-full bg-line"
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

  const localPct = Math.round((q.receipts.local / q.receipts.total) * 100);
  const externalPct = Math.round((q.receipts.external / q.receipts.total) * 100);
  const nonIncomePct = 100 - localPct - externalPct;

  const incomeData = {
    labels: [t('budget-local-sources'), t('budget-external-sources'), t('trans-non-income')],
    datasets: [
      {
        data: [q.receipts.local, q.receipts.external, q.receipts.nonIncome],
        backgroundColor: [CHART_COLORS[0], CHART_COLORS[1], CHART_COLORS[2]],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const expenditureRows = [
    { label: t('budget-general-public-services'), amount: q.expenditures.gps, color: '#2b62ee' },
    { label: t('budget-social-services'), amount: q.expenditures.social, color: '#06a77d' },
    { label: t('budget-economic-services'), amount: q.expenditures.economic, color: '#f77f00' },
    { label: t('trans-sef'), amount: q.expenditures.sef ?? 0, color: '#b45b16' },
    { label: t('trans-debt-operating'), amount: q.expenditures.debt, color: '#e01b24' },
    { label: t('trans-non-operating'), amount: q.expenditures.nonOperating, color: '#7357b6' },
  ];

  const annualRows: [string, number][] = [
    [t('trans-beginning-cash'), q.beginningCashBalance],
    [t('budget-local-sources'), q.receipts.local],
    [t('budget-external-sources'), q.receipts.external],
    [t('trans-non-income'), q.receipts.nonIncome],
    [t('trans-total-receipts'), q.receipts.total],
    [t('budget-total-expenditures'), q.expenditures.total],
    [t('trans-cash-available'), q.fundCashAvailable],
    [t('trans-prior-payables'), q.priorYearPayables],
    [t('trans-continuing'), q.continuingAppropriation],
    [t('trans-ending-cash'), q.endingCashBalance],
  ];

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Seo
          title={t('budget-title')}
          description={t('trans-description')}
          canonicalPath="/budget"
        />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className={heroClasses.section}>
          <Container>
            <Breadcrumb
              className={heroClasses.breadcrumb}
              items={[{ label: t('nav-home'), to: '/' }, { label: t('nav-transparency') }]}
            />
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <m.div variants={staggerContainer} initial="hidden" animate="show">
                <m.span
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 font-mono text-[0.71875rem] font-semibold tracking-[0.14em] text-royal uppercase"
                >
                  {t('nav-transparency')}
                </m.span>
                <m.h1 variants={fadeUp} className={heroClasses.title}>
                  {t('budget-title')}
                </m.h1>
                <m.p variants={fadeUp} className={heroClasses.lede}>
                  {t('trans-description')}
                </m.p>
                <m.p variants={fadeUp} className={heroClasses.meta}>
                  {t('trans-checked')} {fiscalSource.checkedOn}
                </m.p>
              </m.div>

              {/* Featured figure: annual receipts, including non-income receipts */}
              <m.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="rounded-card border border-line bg-surface-subtle p-6"
              >
                <div className="font-mono text-[0.625rem] tracking-[0.08em] text-ink-muted">
                  {t('trans-total-receipts').toUpperCase()} · {q.period}
                </div>
                <div className="mt-1 font-display text-4xl sm:text-5xl font-extrabold leading-none tracking-[-0.03em] text-royal tabular-nums">
                  {peso(q.receipts.total)}
                </div>
                <div
                  className="mt-4 flex h-2.5 overflow-hidden rounded-full"
                  role="img"
                  aria-label={`${t('trans-receipt-sources')}: ${localPct}% / ${externalPct}% / ${nonIncomePct}%`}
                >
                  <div style={{ width: `${localPct}%`, backgroundColor: '#7aa5ff' }} />
                  <div style={{ width: `${externalPct}%`, backgroundColor: '#2b62ee' }} />
                  <div style={{ width: `${nonIncomePct}%`, backgroundColor: '#06a77d' }} />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.625rem] text-ink-muted">
                  <span>
                    {t('budget-local-sources')} {localPct}%
                  </span>
                  <span>
                    {t('budget-external-sources')} {externalPct}%
                  </span>
                  <span>
                    {t('trans-non-income')} {nonIncomePct}%
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
                value={peso(q.receipts.total)}
                label={t('trans-total-receipts')}
                meta={q.period}
              />
              <MetricCard
                value={peso(q.expenditures.total)}
                label={t('budget-total-expenditures')}
                meta={q.period}
              />
              <MetricCard
                value={peso(q.receipts.nta)}
                label={t('trans-nta')}
                accent="#06a77d"
                meta={q.period}
              />
              <MetricCard
                value={peso(q.endingCashBalance)}
                label={t('trans-ending-cash')}
                meta={q.period}
              />
            </m.div>
          </Container>
        </section>

        <RisingProjects />

        {/* ── Money viz: income donut + expenditure meters ─────────────────── */}
        <section className="bg-surface-subtle py-12">
          <Container>
            <SectionHead>
              {t('trans-receipt-sources')} &amp; {t('budget-expenditure-allocation')} ({q.period})
            </SectionHead>
            <div className="grid gap-5 lg:grid-cols-2">
              {/* Receipts by source (donut) */}
              <div className={`${CARD} p-[22px]`}>
                <span className="mb-3 block text-sm font-semibold text-heading">
                  {t('trans-receipt-sources')}
                </span>
                <div
                  className="relative h-64 min-w-0"
                  role="img"
                  aria-label={`${t('trans-receipt-sources')}, ${q.period}`}
                >
                  <ClientOnly fallback={<ChartFallback />}>
                    {() => <Doughnut data={incomeData} options={doughnutOptions} />}
                  </ClientOnly>
                </div>
                <table className="sr-only">
                  <caption>
                    {t('trans-receipt-sources')}, {q.period}
                  </caption>
                  <tbody>
                    <tr>
                      <td>{t('budget-local-sources')}</td>
                      <td>{peso(q.receipts.local)}</td>
                    </tr>
                    <tr>
                      <td>{t('budget-external-sources')}</td>
                      <td>{peso(q.receipts.external)}</td>
                    </tr>
                    <tr>
                      <td>{t('trans-non-income')}</td>
                      <td>{peso(q.receipts.nonIncome)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Expenditure allocation (meters) */}
              <div className={`${CARD} p-[22px]`}>
                <span className="mb-4 block text-sm font-semibold text-heading">
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
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t('trans-finance-note')}</p>
            <p className="mt-3 text-sm text-ink-muted">
              <Info className="mr-1 inline size-3.5" aria-hidden="true" />
              <a
                href={`${fiscalSource.url}#page=3`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-royal underline underline-offset-4"
              >
                [1] {fiscalSource.label}
              </a>
            </p>
          </Container>
        </section>

        <section className="bg-white py-12">
          <Container>
            <SectionHead>
              {t('trans-annual-summary')} · {q.period}
            </SectionHead>
            <div className={`overflow-x-auto ${CARD}`}>
              <table className="w-full border-collapse text-left text-sm">
                <caption className="px-4 py-3 text-left text-ink-muted">
                  {t('trans-units')} · [1]
                </caption>
                <thead>
                  <tr className="bg-surface-subtle text-heading">
                    <th scope="col" className="px-4 py-2.5">
                      {t('budget-metric')}
                    </th>
                    <th scope="col" className="px-4 py-2.5">
                      {q.period}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {annualRows.map(([label, value]) => (
                    <tr key={label} className="border-t border-line">
                      <th scope="row" className="px-4 py-2.5 font-medium text-heading">
                        {label}
                      </th>
                      <td className="px-4 py-2.5 whitespace-nowrap tabular-nums text-ink-muted">
                        {peso(value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t('trans-cash-note')}</p>
          </Container>
        </section>

        <section className="bg-surface-subtle py-12">
          <Container>
            <SectionHead>{t('trans-outlook-title')}</SectionHead>
            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-ink-muted">
              {t('trans-outlook-note')}
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {financialOutlook.map((record) => (
                <article key={record.year} className={`${CARD} p-5`}>
                  <h3 className="text-lg font-bold text-heading">
                    FY{record.year} · {t('trans-planning')}
                  </h3>
                  <dl className="my-4 space-y-3 text-sm">
                    {[
                      [t('trans-total-receipts'), record.receipts],
                      [t('budget-total-expenditures'), record.expenditures],
                      [t('trans-nta'), record.nta],
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-wrap justify-between gap-2">
                        <dt className="text-ink-muted">{label}</dt>
                        <dd className="font-semibold tabular-nums text-heading">
                          {peso(Number(value))}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href={`${record.source.url}#page=3`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-royal underline underline-offset-4"
                  >
                    {record.source.label}
                  </a>
                </article>
              ))}
            </div>
          </Container>
        </section>
        <DpwhProjects />
        <section className="bg-white py-12">
          <Container>
            <SectionHead>{t('trans-sources-title')}</SectionHead>
            <div className="space-y-4 text-sm leading-relaxed text-ink-muted">
              <p>{t('trans-method')}</p>
              <p>{t('trans-gaps')}</p>
              <p>{t('trans-audit-note')}</p>
              <a
                href="https://www.coa.gov.ph/reports/annual-audit-reports/aar-local-government-units/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-royal underline underline-offset-4"
              >
                {t('trans-coa-directory')}
              </a>
            </div>
          </Container>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
