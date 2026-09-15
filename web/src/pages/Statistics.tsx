import { ClientOnly } from 'vite-react-ssg';
import { Line, Bar } from 'react-chartjs-2';
import { BarChart3, Users, MapPin, Trophy } from 'lucide-react';
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard value={totalPopulation.toLocaleString()} label={<><Users className="mr-1 inline size-3.5 text-primary" />Population (2024 POPCEN)</>} />
            <StatCard value={barangayCount} label={<><MapPin className="mr-1 inline size-3.5 text-primary" />Barangays</>} />
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

      {/* CMCI */}
      <Section compact>
        <Container>
          <SectionTitle>{t('stats-economic-indicators')}</SectionTitle>
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
                </tr>
              </thead>
              <tbody>
                {cmciData.pillars.map((p) => (
                  <tr key={p.label} className="border-t border-border">
                    <td className="px-4 py-2 text-foreground">{p.label}</td>
                    <td className="px-4 py-2 text-muted-foreground">{p.score.toFixed(4)}</td>
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
