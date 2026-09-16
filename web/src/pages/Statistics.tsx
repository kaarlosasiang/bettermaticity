import { ClientOnly } from 'vite-react-ssg';
import { Line, Bar } from 'react-chartjs-2';
import { BarChart3, Users, MapPin, Trophy, Ruler, Award, Wallet, TrendingUp } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader, StatCard } from '@/components/primitives';
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

const ChartFallback = () => <div className="h-72 animate-pulse rounded-lg bg-muted" aria-hidden="true" />;

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { font: chartFont }, grid: { display: false } },
    y: { ticks: { font: chartFont }, grid: { color: 'rgba(0,0,0,0.06)' } },
  },
};

export default function Statistics() {
  const { t } = useLanguage();
  const top10 = barangayData.slice(0, 10);

  const populationLine = {
    labels: historicalData.years,
    datasets: [
      {
        label: 'Population',
        data: historicalData.populations,
        borderColor: CHART_COLORS[0],
        backgroundColor: 'rgba(37,99,235,0.12)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: CHART_COLORS[0],
      },
    ],
  };

  const barangayBar = {
    labels: top10.map((b) => b.name),
    datasets: [
      { label: 'Population', data: top10.map((b) => b.pop), backgroundColor: CHART_COLORS[0], borderRadius: 4 },
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
    <>
      <Seo
        title={t('stats-title')}
        description="Population, demographics, and competitiveness statistics for the City of Mati."
        canonicalPath="/statistics"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">{t('nav-home')}</AppLink>
          <span>/</span>
          <span aria-current="page">{t('stats-title')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={<><BarChart3 className="size-4" aria-hidden="true" /> {t('nav-statistics')}</>}
        title={t('stats-title')}
        description="Population, demographics, and competitiveness data for the City of Mati."
      />

      {/* Metric tiles (prerendered) */}
      <Section>
        <Container>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <StatCard value={totalPopulation.toLocaleString()} label={<><Users className="mr-1 inline size-3.5 text-primary" />Population (2024 POPCEN)</>} />
            <StatCard value={barangayCount} label={<><MapPin className="mr-1 inline size-3.5 text-primary" />Barangays</>} />
            <StatCard value={`${landAreaKm2} km²`} label={<><Ruler className="mr-1 inline size-3.5 text-primary" />Land Area</>} />
            <StatCard value={incomeClass} label={<><Award className="mr-1 inline size-3.5 text-primary" />Income Class</>} />
            <StatCard value={`#${cmciData.overall.rank}`} label={<><Trophy className="mr-1 inline size-3.5 text-primary" />CMCI Rank ({cmciData.year})</>} />
          </div>
        </Container>
      </Section>

      {/* Population trend */}
      <Section compact>
        <Container>
          <SectionTitle>{t('stats-population-trends')}</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="h-72">
              <ClientOnly fallback={<ChartFallback />}>{() => <Line data={populationLine} options={baseOptions} />}</ClientOnly>
            </div>
          </div>
        </Container>
      </Section>

      {/* Top barangays */}
      <Section compact altBg>
        <Container>
          <SectionTitle>{t('stats-population-by-barangay')}</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="h-80">
              <ClientOnly fallback={<ChartFallback />}>{() => <Bar data={barangayBar} options={baseOptions} />}</ClientOnly>
            </div>
          </div>
          <details className="mt-4 rounded-lg border border-border bg-card">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground">
              All {barangayCount} barangays (table)
            </summary>
            <div className="overflow-x-auto border-t border-border">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th className="px-4 py-2 font-semibold">Barangay</th>
                    <th className="px-4 py-2 font-semibold">Population (2024)</th>
                  </tr>
                </thead>
                <tbody>
                  {barangayData.map((b) => (
                    <tr key={b.name} className="border-t border-border">
                      <td className="px-4 py-2 text-foreground">{b.name}</td>
                      <td className="px-4 py-2 text-muted-foreground">{b.pop.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </Container>
      </Section>

      {/* Municipal Finance (FY2023) */}
      <Section compact>
        <Container>
          <SectionTitle>
            <Wallet className="size-5 text-primary" aria-hidden="true" />
            City Income &amp; Municipal Finance (FY {municipalFinance.fiscalYear})
          </SectionTitle>
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="block text-2xl font-bold text-primary">{municipalFinance.annualIncome.display}</span>
              <span className="text-sm font-medium text-foreground">Annual Income</span>
              <span className="mt-1 block text-xs text-muted-foreground">{municipalFinance.annualIncome.detail}</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="block text-2xl font-bold text-primary">{municipalFinance.iraShare.display}</span>
              <span className="text-sm font-medium text-foreground">IRA Share</span>
              <span className="mt-1 block text-xs text-muted-foreground">{municipalFinance.iraShare.detail}</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="block text-2xl font-bold text-primary">{municipalFinance.iraDependency.display}</span>
              <span className="text-sm font-medium text-foreground">IRA Dependency</span>
              <span className="mt-1 block text-xs text-muted-foreground">{municipalFinance.iraDependency.detail}</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="mb-2 block text-sm font-medium text-foreground">Income Composition</span>
            <div className="flex h-5 overflow-hidden rounded-full">
              <div className="flex items-center justify-center bg-primary text-[10px] font-semibold text-primary-foreground" style={{ width: `${municipalFinance.composition.ira}%` }}>
                IRA {municipalFinance.composition.ira}%
              </div>
              <div className="flex items-center justify-center bg-brand-success text-[10px] font-semibold text-white" style={{ width: `${municipalFinance.composition.local}%` }}>
                Local {municipalFinance.composition.local}%
              </div>
            </div>
            <span className="mt-2 block text-xs text-muted-foreground">Source: BLGF 2023 Statement of Receipts and Expenditures</span>
          </div>
        </Container>
      </Section>

      {/* Economic Indicators (real) */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <TrendingUp className="size-5 text-primary" aria-hidden="true" />
            Economic Indicators
          </SectionTitle>
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="block text-2xl font-bold text-primary">{economicIndicators.registeredBusinesses.value}</span>
              <span className="text-sm font-medium text-foreground">Registered Businesses</span>
              <span className="mt-1 block text-xs text-brand-success">{economicIndicators.registeredBusinesses.trend}</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="block text-2xl font-bold text-primary">{economicIndicators.agriculturalLand.value}</span>
              <span className="text-sm font-medium text-foreground">Agricultural Land</span>
              <span className="mt-1 block text-xs text-muted-foreground">{economicIndicators.agriculturalLand.note}</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="block text-2xl font-bold text-primary">{economicIndicators.employmentRate.value}</span>
              <span className="text-sm font-medium text-foreground">Employment Rate</span>
              <span className="mt-1 block text-xs text-muted-foreground">{economicIndicators.employmentRate.note}</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <span className="mb-3 block text-sm font-medium text-foreground">Economic Sectors</span>
            <div className="space-y-2">
              {economicIndicators.sectors.map((s) => (
                <div key={s.name}>
                  <div className="mb-0.5 flex justify-between text-xs text-muted-foreground">
                    <span>{s.name}</span>
                    <span>{s.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <span className="mt-3 block text-xs text-muted-foreground">Source: BLGF 2023</span>
          </div>
        </Container>
      </Section>

      {/* Poverty Statistics */}
      <Section compact>
        <Container>
          <SectionTitle>Poverty Statistics</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="block text-2xl font-bold text-primary">{povertyStats.y2018.rate}%</span>
              <span className="text-sm font-medium text-foreground">2018 Poverty Incidence</span>
              <span className="mt-1 block text-xs text-muted-foreground">{povertyStats.y2018.ci}</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="block text-2xl font-bold text-primary">{povertyStats.y2021.rate}%</span>
              <span className="text-sm font-medium text-foreground">2021 Poverty Incidence</span>
              <span className="mt-1 block text-xs text-muted-foreground">{povertyStats.y2021.ci}</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <span className="block text-2xl font-bold text-brand-success">{povertyStats.change}</span>
              <span className="text-sm font-medium text-foreground">Change (2018 → 2021)</span>
              <span className="mt-1 block text-xs text-brand-success">Improved</span>
            </div>
          </div>
          <span className="mt-2 block text-xs text-muted-foreground">Source: PSA 2021 City &amp; Municipal-Level Poverty Estimates</span>
        </Container>
      </Section>

      {/* CMCI */}
      <Section compact altBg>
        <Container>
          <SectionTitle>Competitive Index (CMCI {cmciData.year})</SectionTitle>
          <p className="mb-4 text-sm text-muted-foreground">
            DTI Cities and Municipalities Competitiveness Index {cmciData.year} — overall score{' '}
            {cmciData.overall.score.toFixed(2)} (rank #{cmciData.overall.rank}).
          </p>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="h-72">
              <ClientOnly fallback={<ChartFallback />}>{() => <Bar data={cmciBar} options={baseOptions} />}</ClientOnly>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-muted text-foreground">
                  <th className="px-4 py-2 font-semibold">Pillar</th>
                  <th className="px-4 py-2 font-semibold">Score</th>
                  <th className="px-4 py-2 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {cmciData.pillars.map((p) => (
                  <tr key={p.label} className="border-t border-border">
                    <td className="px-4 py-2 text-foreground">{p.label}</td>
                    <td className="px-4 py-2 text-muted-foreground">{p.score.toFixed(4)}</td>
                    <td className="px-4 py-2">
                      <span
                        className={
                          p.trend.dir === 'up'
                            ? 'text-xs font-medium text-brand-success'
                            : p.trend.dir === 'down'
                              ? 'text-xs font-medium text-destructive'
                              : 'text-xs font-medium text-muted-foreground'
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
              <div key={p.label} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">{p.label}</h3>
                  <span className="text-sm font-semibold text-primary">{p.score.toFixed(4)}</span>
                </div>
                <div className="space-y-2">
                  {p.indicators.map((ind) => (
                    <div key={ind.name}>
                      <div className="mb-0.5 flex justify-between text-xs text-muted-foreground">
                        <span>{ind.name}</span>
                        <span className="tabular-nums">{ind.value}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(ind.fill, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Source: DTI Cities and Municipalities Competitiveness Index {cmciData.year}</p>
        </Container>
      </Section>
    </>
  );
}
