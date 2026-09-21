import { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/primitives';
import { m, fadeUp, staggerContainer, revealViewport } from '@/components/motion';
import {
  dpwhProjects,
  dpwhSummary,
  dpwhCategoryKey,
  dpwhCategoryLabel,
  pesoFull,
  dpwhDate,
  type DpwhFilter,
} from '@/lib/dpwhData';

const CARD = 'rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)]';

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
 * Rendered inside Budget's <LazyMotion> so the `m.*` primitives work here.
 */
export function DpwhProjects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<DpwhFilter>('all');

  const counts = useMemo(() => {
    const c: Record<DpwhFilter, number> = {
      all: dpwhProjects.length,
      buildings: 0,
      roads: 0,
      flood: 0,
      water: 0,
    };
    for (const p of dpwhProjects) c[dpwhCategoryKey(p.category)]++;
    return c;
  }, []);

  const completed = useMemo(() => dpwhProjects.filter((p) => p.status === 100).length, []);

  const rows = useMemo(
    () =>
      filter === 'all'
        ? dpwhProjects
        : dpwhProjects.filter((p) => dpwhCategoryKey(p.category) === filter),
    [filter]
  );

  const tiles = [
    { value: String(dpwhSummary.totalProjects), label: t('budget-projects-count') },
    {
      value: `₱${(dpwhSummary.totalCost / 1_000_000).toFixed(1)}M`,
      label: t('budget-total-investment'),
    },
    { value: String(completed), label: t('budget-completed') },
    { value: String(dpwhSummary.totalProjects - completed), label: t('budget-ongoing') },
  ];

  return (
    <section className="bg-white py-12">
      <Container>
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mb-[18px] flex items-center gap-3.5"
        >
          <span className="h-[26px] w-1 rounded bg-[#2b62ee]" aria-hidden="true" />
          <div>
            <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.06em] text-[#2b62ee]">
              {t('budget-national-government-projects')}
            </span>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]">
              {t('budget-dpwh-infrastructure-projects-in-mati')}
            </h2>
          </div>
        </m.div>
        <p className="-mt-2 mb-5 text-[0.8125rem] text-[#4c5c78]">
          {`Implementing Agency: ${dpwhSummary.implementingAgency}`}
        </p>

        {/* Summary tiles */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {tiles.map((tile) => (
            <m.div
              key={tile.label}
              variants={fadeUp}
              className={`${CARD} p-5`}
              style={{ borderTop: '3px solid #2b62ee' }}
            >
              <span className="block font-display text-[1.875rem] font-extrabold tracking-[-0.02em] text-[#2b62ee]">
                {tile.value}
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-[#123c7a]">
                {tile.label}
              </span>
            </m.div>
          ))}
        </m.div>

        {/* Category filter tabs */}
        <div
          className="mb-4 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTERS.filter((f) => f.key !== 'water' || counts.water > 0).map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="dpwh-projects-panel"
                onClick={() => setFilter(f.key)}
                className={
                  active
                    ? 'rounded-full bg-[#2b62ee] px-3.5 py-1.5 text-sm font-semibold text-white'
                    : 'rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-[#4c5c78] shadow-[0_0_0_1px_rgba(18,60,122,0.07)] transition hover:text-[#2b62ee]'
                }
              >
                {f.label} <span className="opacity-70">{counts[f.key]}</span>
              </button>
            );
          })}
        </div>

        {/* Projects table */}
        <div id="dpwh-projects-panel" role="tabpanel" className={`overflow-x-auto ${CARD}`}>
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#f1f6fc] text-[#123c7a]">
                <th className="px-4 py-2.5 font-semibold">{t('budget-contract-description')}</th>
                <th className="px-4 py-2.5 font-semibold">{t('budget-contractor')}</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">{t('budget-cost')}</th>
                <th className="px-4 py-2.5 font-semibold">{t('budget-status')}</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">
                  {t('budget-completed')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr className="border-t border-[#e3e8ef]">
                  <td colSpan={5} className="px-4 py-6 text-center text-[#4c5c78]">
                    No projects in this category yet.
                  </td>
                </tr>
              ) : (
                rows.map((p) => (
                  <tr key={p.id} className="border-t border-[#e3e8ef] align-top">
                    <td className="px-4 py-3">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-mono text-xs text-[#4c5c78]">{p.id}</span>
                        <span className="rounded-full bg-[#eef4fe] px-1.5 py-0.5 text-xs font-medium text-[#2b62ee]">
                          {dpwhCategoryLabel(p.category)}
                        </span>
                      </div>
                      <span className="block font-medium text-[#123c7a]">{p.name}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-[#4c5c78]">
                        <MapPin className="size-3" aria-hidden="true" />
                        {p.location}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#4c5c78]">
                      <span className="block text-[#123c7a]">{p.contractor}</span>
                      <span className="text-xs">#{p.contractorId}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap tabular-nums text-[#4c5c78]">
                      {pesoFull(p.cost)}
                    </td>
                    <td className="px-4 py-3">
                      {p.status === 100 ? (
                        <span className="rounded-full bg-[#06a77d]/15 px-2 py-0.5 text-xs font-medium text-[#06a77d]">
                          {t('budget-completed')}
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#eef4fe] px-2 py-0.5 text-xs font-medium text-[#2b62ee]">
                          {p.status.toFixed(0)}%
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-[#4c5c78]">
                      {dpwhDate(p.completionDate)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 font-mono text-[0.6875rem] text-[#4c5c78]">
          Source:{' '}
          <a
            href="https://transparency.dpwh.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2b62ee] hover:underline"
          >
            {t('budget-dpwh-transparency-portal')}
          </a>
        </p>
      </Container>
    </section>
  );
}
