import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Droplets,
  ChevronDown,
  Plane,
  Ship,
  Signpost,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/primitives';
import { pesoFull } from '@/lib/dpwhData';
import {
  featuredProjects,
  risingProjects,
  projectsCheckedOn,
  projectAnchor,
} from '@/lib/risingProjects';

const icons = { airport: Plane, water: Droplets, building: Building2, port: Ship, road: Signpost };

export function RisingProjects({ preview = false }: { preview?: boolean }) {
  const { t } = useLanguage();
  const projects = preview ? featuredProjects : risingProjects;

  return (
    <section
      id="rising-in-mati"
      aria-labelledby="rising-heading"
      className="scroll-mt-28 bg-white py-12"
    >
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2
            id="rising-heading"
            className={
              preview
                ? 'flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[#2b62ee]'
                : 'flex items-center gap-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]'
            }
          >
            <TrendingUp className="size-5 text-[#2b62ee]" aria-hidden="true" />
            {t('rising-title')}
          </h2>
          {preview && (
            <a
              href="/budget#rising-in-mati"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b62ee]"
            >
              {t('rising-view-all')} <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4c5c78]">
          {t(preview ? 'rising-preview-note' : 'rising-note')}
        </p>
        {!preview && (
          <p className="mt-2 text-xs text-[#4c5c78]">
            {t('trans-checked')} <time dateTime={projectsCheckedOn}>{projectsCheckedOn}</time>
          </p>
        )}
        <div
          className={`mt-5 grid items-start gap-4 ${preview ? 'sm:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-2'}`}
        >
          {projects.map((project) => {
            const Icon = icons[project.category as keyof typeof icons] ?? Building2;
            const status = t(`rising-status-${project.status}`);
            const title = t(project.titleKey);
            return preview ? (
              <a
                key={project.id}
                href={`/budget#${projectAnchor(project)}`}
                className="flex min-h-[190px] flex-col rounded-xl p-[18px] text-[#123c7a] ring-1 ring-[#e3e8ef] transition hover:ring-[#2b62ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b62ee]"
              >
                <Icon className="size-[18px] text-[#2b62ee]" aria-hidden="true" />
                <h3 className="mt-3 font-display text-[0.9375rem] leading-[1.35] font-bold">
                  {title}
                </h3>
                <span className="mt-auto pt-5 text-xs text-[#4c5c78]">{status}</span>
                <time
                  className="mt-1 font-mono text-[0.6875rem] text-[#4c5c78]"
                  dateTime={project.sourceDate}
                >
                  {project.sourceDate}
                </time>
              </a>
            ) : (
              <article
                key={project.id}
                id={projectAnchor(project)}
                className="flex scroll-mt-28 flex-col rounded-xl border border-[#e3e8ef] bg-[#f8faff] p-5 target:ring-2 target:ring-[#2b62ee]"
              >
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#2b62ee]">
                      <Icon className="size-4 shrink-0" aria-hidden="true" />
                      {t(`rising-scope-${project.scope}`)}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[#123c7a]">
                      {title}
                    </h3>
                  </div>
                  <dl className="sm:max-w-52 sm:text-right">
                    <dt className="text-xs leading-relaxed text-[#4c5c78]">
                      {t(`rising-amount-${project.amountKind}`)}
                    </dt>
                    <dd className="mt-1 font-display text-xl font-bold tabular-nums text-[#2b62ee]">
                      {pesoFull(project.amount)}
                    </dd>
                  </dl>
                </div>
                <dl className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-3 text-xs">
                  <div>
                    <dt className="text-[#4c5c78]">{t('rising-status-label')}</dt>
                    <dd className="mt-1 font-semibold text-[#123c7a]">{status}</dd>
                  </div>
                  <div>
                    <dt className="text-[#4c5c78]">{t('rising-source-date')}</dt>
                    <dd className="mt-1 text-[#123c7a]">
                      <time dateTime={project.sourceDate}>{project.sourceDate}</time>
                    </dd>
                  </div>
                </dl>
                <details className="group mt-4 border-t border-[#e3e8ef]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded pt-3 text-sm font-semibold text-[#2b62ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b62ee] [&::-webkit-details-marker]:hidden">
                    {t('rising-details')}
                    <ChevronDown
                      className="size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="my-4 text-sm leading-relaxed text-[#4c5c78]">
                    {t(project.detailKey)}
                  </p>
                  <div className="space-y-2">
                    {project.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-1 text-sm font-semibold text-[#2b62ee] underline underline-offset-4"
                      >
                        <span>
                          {t('rising-read-source')} · {source.label}
                        </span>
                        <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </details>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
