import { ClientOnly } from 'vite-react-ssg';
import { Doughnut } from 'react-chartjs-2';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader, StatCard } from '@/components/primitives';
import { financialData, peso } from '@/lib/budgetData';
import { CHART_COLORS, chartFont } from '@/lib/charts';

const q = financialData.q2; // latest quarter headline
const quarters = [financialData.q1, financialData.q2];

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' as const, labels: { font: chartFont, padding: 16 } },
    tooltip: {
      callbacks: {
        label: (ctx: { label: string; parsed: number }) => `${ctx.label}: ${peso(ctx.parsed)}`,
      },
    },
  },
  cutout: '58%',
};

const ChartFallback = () => (
  <div className="h-72 animate-pulse rounded-lg bg-muted" aria-hidden="true" />
);

export default function Budget() {
  const { t } = useLanguage();

  const incomeData = {
    labels: ['Local Sources', 'External Sources'],
    datasets: [
      {
        data: [q.income.local, q.income.external],
        backgroundColor: [CHART_COLORS[0], CHART_COLORS[1]],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const expenseData = {
    labels: ['General Public Services', 'Social Services', 'Economic Services', 'Debt Service'],
    datasets: [
      {
        data: [q.expenditures.gps, q.expenditures.social, q.expenditures.economic, q.expenditures.debt],
        backgroundColor: [CHART_COLORS[0], CHART_COLORS[1], CHART_COLORS[2], CHART_COLORS[3]],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  return (
    <>
      <Seo
        title={t('budget-title')}
        description="Statement of receipts and expenditures and fiscal transparency for the City of Mati."
        canonicalPath="/budget"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">{t('nav-home')}</AppLink>
          <span>/</span>
          <span aria-current="page">{t('budget-title')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={<><Wallet className="size-4" aria-hidden="true" /> {t('nav-transparency')}</>}
        title={t('budget-title')}
        description={`${t('budget-statement-of-receipts-expenditures')} — ${q.period}`}
      />

      {/* KPI tiles (prerendered, crawlable) */}
      <Section>
        <Container>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard value={peso(q.income.total)} label={<><TrendingUp className="mr-1 inline size-3.5 text-brand-success" />Total Income ({q.period})</>} />
            <StatCard value={peso(q.expenditures.total)} label={<><TrendingDown className="mr-1 inline size-3.5 text-destructive" />Total Expenditures</>} />
            <StatCard value={peso(q.netIncome)} label="Net Income" />
            <StatCard value={peso(q.fundBalance)} label={<><PiggyBank className="mr-1 inline size-3.5 text-primary" />Fund Balance</>} />
          </div>
        </Container>
      </Section>

      {/* Doughnut charts (client-only; canvas can't prerender) */}
      <Section compact>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <SectionTitle className="text-lg">Income by Source ({q.period})</SectionTitle>
              <div className="h-72">
                <ClientOnly fallback={<ChartFallback />}>{() => <Doughnut data={incomeData} options={doughnutOptions} />}</ClientOnly>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <SectionTitle className="text-lg">Expenditures by Sector ({q.period})</SectionTitle>
              <div className="h-72">
                <ClientOnly fallback={<ChartFallback />}>{() => <Doughnut data={expenseData} options={doughnutOptions} />}</ClientOnly>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quarterly table (prerendered relief for the charts) */}
      <Section compact altBg>
        <Container>
          <SectionTitle>Quarterly Summary (FY2025, ₱ millions)</SectionTitle>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-muted text-foreground">
                  <th className="px-4 py-3 font-semibold">Metric</th>
                  {quarters.map((qtr) => (
                    <th key={qtr.period} className="px-4 py-3 font-semibold whitespace-nowrap">
                      {qtr.period}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([
                  ['Total Income', (x) => x.income.total],
                  ['Local Sources', (x) => x.income.local],
                  ['External Sources', (x) => x.income.external],
                  ['Total Expenditures', (x) => x.expenditures.total],
                  ['Net Income', (x) => x.netIncome],
                  ['Fund Balance', (x) => x.fundBalance],
                ] as [string, (x: typeof financialData.q1) => number][]).map(([label, get]) => (
                  <tr key={label} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">{label}</td>
                    {quarters.map((qtr) => (
                      <td key={qtr.period} className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {peso(get(qtr))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
    </>
  );
}
