import { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Section, Container, StatCard } from '@/components/primitives';
import {
  dpwhProjects,
  dpwhSummary,
  dpwhCategoryKey,
  dpwhCategoryLabel,
  pesoFull,
  dpwhDate,
  type DpwhFilter,
} from '@/lib/dpwhData';

const FILTERS: { key: DpwhFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'buildings', label: 'Buildings' },
  { key: 'roads', label: 'Roads' },
  { key: 'flood', label: 'Flood Control' },
  { key: 'water', label: 'Water' },
];

/**
 * "DPWH Infrastructure Projects in Mati" — national-government projects table.
 * Mirrors legacy assets/js/dpwh-projects.js: summary bar, category filter tabs,
 * and a sortable/filterable table. Data is placeholder-draft until real records land.
 */
export function DpwhProjects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<DpwhFilter>('all');

  const counts = useMemo(() => {
    const c: Record<DpwhFilter, number> = { all: dpwhProjects.length, buildings: 0, roads: 0, flood: 0, water: 0 };
    for (const p of dpwhProjects) c[dpwhCategoryKey(p.category)]++;
    return c;
  }, []);

  const completed = useMemo(() => dpwhProjects.filter((p) => p.status === 100).length, []);

  const rows = useMemo(
    () => (filter === 'all' ? dpwhProjects : dpwhProjects.filter((p) => dpwhCategoryKey(p.category) === filter)),
    [filter]
  );

  return (
    <Section compact>
      <Container>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {t('budget-national-government-projects')}
        </p>
        <h2 className="mb-1 text-[1.375rem] font-semibold text-foreground">
          {t('budget-dpwh-infrastructure-projects-in-mati')}
        </h2>
        <p className="mb-6 text-[0.8125rem] text-muted-foreground">
          {`Implementing Agency: ${dpwhSummary.implementingAgency}`}
        </p>

        {/* Summary tiles */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard value={String(dpwhSummary.totalProjects)} label="Projects" />
          <StatCard value={`₱${(dpwhSummary.totalCost / 1_000_000).toFixed(1)}M`} label="Total Investment" />
          <StatCard value={String(completed)} label="Completed" />
          <StatCard value={String(dpwhSummary.totalProjects - completed)} label="Ongoing" />
        </div>

        {/* Category filter tabs */}
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          {FILTERS.filter((f) => f.key !== 'water' || counts.water > 0).map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className={
                  active
                    ? 'rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground'
                    : 'rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:border-primary hover:text-primary'
                }
              >
                {f.label} <span className="opacity-70">{counts[f.key]}</span>
              </button>
            );
          })}
        </div>

        {/* Projects table */}
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-muted text-foreground">
                <th className="px-4 py-3 font-semibold">Contract Description</th>
                <th className="px-4 py-3 font-semibold">Contractor</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Cost</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Completed</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr className="border-t border-border">
                  <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                    No projects in this category yet.
                  </td>
                </tr>
              ) : (
                rows.map((p) => (
                  <tr key={p.id} className="border-t border-border align-top">
                    <td className="px-4 py-3">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">{p.id}</span>
                        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                          {dpwhCategoryLabel(p.category)}
                        </span>
                      </div>
                      <span className="block font-medium text-foreground">{p.name}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" aria-hidden="true" />
                        {p.location}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="block text-foreground">{p.contractor}</span>
                      <span className="text-xs">#{p.contractorId}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{pesoFull(p.cost)}</td>
                    <td className="px-4 py-3">
                      {p.status === 100 ? (
                        <span className="rounded-full bg-brand-success/15 px-2 py-0.5 text-xs font-medium text-brand-success">
                          Completed
                        </span>
                      ) : (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {p.status.toFixed(0)}%
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{dpwhDate(p.completionDate)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Source:{' '}
          <a
            href="https://transparency.dpwh.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {t('budget-dpwh-transparency-portal')}
          </a>
        </p>
      </Container>
    </Section>
  );
}
