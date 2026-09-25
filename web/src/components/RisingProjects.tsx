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
  type RisingProject,
} from '@/lib/risingProjects';

const icons = { airport: Plane, water: Droplets, building: Building2, port: Ship, road: Signpost };
const iconFor = (project: RisingProject) =>
  icons[project.category as keyof typeof icons] ?? Building2;

// Where each status sits in a public project's paper trail. This is the stage of the dated
// source record, not a measure of construction progress.
const stages = ['announced', 'budgeted', 'awarded', 'completed'] as const;
const stageOf: Record<string, number> = {
  announced: 1,
  appropriated: 2,
  awarded: 3,
  'reported-complete': 4,
};

const pesoCompact = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  notation: 'compact',
  maximumFractionDigits: 1,
});

function StageTrack({ status, tone }: { status: string; tone: 'dark' | 'light' }) {
  const reached = stageOf[status] ?? 0;
  // A company's own completion claim is drawn as an outline, not a solid "done" segment.
  const claimed = status === 'reported-complete';
  return (
    <span className="flex gap-1" aria-hidden="true">
      {stages.map((stage, i) => (
        <span
          key={stage}
          className={`h-1.5 flex-1 rounded-full ${
            claimed && i === reached - 1
              ? tone === 'dark'
                ? 'ring-1 ring-[#ffc001] ring-inset'
                : 'ring-1 ring-[#2b62ee] ring-inset'
              : i < reached
                ? tone === 'dark'
                  ? 'bg-[#ffc001]'
                  : 'bg-[#2b62ee]'
                : tone === 'dark'
                  ? 'bg-white/15'
                  : 'bg-[#e3e8ef]'
          }`}
        />
      ))}
    </span>
  );
}

// Home page highlight: one lead project on a blueprint-grid panel, the rest as a ledger.
function RisingPreview({ t }: { t: (key: string) => string }) {
  const [lead, ...rest] = featuredProjects;
  const LeadIcon = iconFor(lead);
  const leadStage = stageOf[lead.status] ?? 0;

  return (
    <div className="mt-7 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <a
        href={`/budget#${projectAnchor(lead)}`}
        className="group relative isolate flex min-h-[360px] flex-col overflow-hidden rounded-2xl bg-[#123c7a] p-6 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b62ee] sm:p-8"
      >
        <span
          className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]"
          aria-hidden="true"
        />
        <LeadIcon
          className="absolute -right-6 -bottom-8 -z-10 size-56 text-white/[0.07] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none"
          strokeWidth={1.25}
          aria-hidden="true"
        />
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#ffc001] text-[#123c7a]">
            <LeadIcon className="size-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold text-white/80">
            {t(`rising-scope-${lead.scope}`)}
          </span>
        </div>

        <div className="mt-auto pt-10">
          <div className="font-display text-5xl leading-none font-extrabold tracking-[-0.03em] tabular-nums sm:text-6xl">
            {pesoCompact.format(lead.amount)}
          </div>
          <div className="mt-2 text-sm text-white/70">{t(`rising-amount-${lead.amountKind}`)}</div>
          <h3 className="mt-5 max-w-md font-display text-2xl leading-tight font-extrabold tracking-[-0.02em]">
            {t(lead.titleKey)}
          </h3>

          <div className="mt-6 max-w-md">
            <StageTrack status={lead.status} tone="dark" />
            <ol className="mt-2 grid grid-cols-4 gap-1 text-[0.6875rem]" aria-hidden="true">
              {stages.map((stage, i) => (
                <li
                  key={stage}
                  className={i < leadStage ? 'font-semibold text-white' : 'text-white/45'}
                >
                  {t(`rising-stage-${stage}`)}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 text-sm">
            <span>
              <span className="font-semibold">{t(`rising-status-${lead.status}`)}</span>
              <span className="text-white/60">
                {' '}
                · <time dateTime={lead.sourceDate}>{lead.sourceDate}</time>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#ffc001]">
              {t('rising-details')}
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </a>

      <ul className="grid gap-3">
        {rest.map((project) => {
          const Icon = iconFor(project);
          return (
            <li key={project.id} className="flex">
              <a
                href={`/budget#${projectAnchor(project)}`}
                className="group grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-3 rounded-2xl bg-white p-5 text-[#123c7a] ring-1 ring-[#e3e8ef] transition hover:ring-[#2b62ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b62ee] sm:grid-cols-[auto_minmax(0,1fr)_auto]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#eef4fe] text-[#2b62ee]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#4c5c78]">
                    {t(`rising-scope-${project.scope}`)}
                  </div>
                  <h3 className="mt-1 font-display text-base leading-snug font-bold">
                    {t(project.titleKey)}
                  </h3>
                  <div className="mt-3 max-w-56">
                    <StageTrack status={project.status} tone="light" />
                  </div>
                  <div className="mt-2 text-xs text-[#4c5c78]">
                    <span className="font-semibold text-[#123c7a]">
                      {t(`rising-status-${project.status}`)}
                    </span>{' '}
                    · <time dateTime={project.sourceDate}>{project.sourceDate}</time>
                  </div>
                </div>
                <div className="col-start-2 sm:col-start-3 sm:row-start-1 sm:max-w-40 sm:text-right">
                  <div className="font-display text-2xl leading-none font-extrabold tracking-[-0.02em] text-[#2b62ee] tabular-nums">
                    {pesoCompact.format(project.amount)}
                  </div>
                  <div className="mt-1.5 text-[0.6875rem] leading-snug text-[#4c5c78]">
                    {t(`rising-amount-${project.amountKind}`)}
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function RisingProjects({ preview = false }: { preview?: boolean }) {
  const { t } = useLanguage();

  return (
    <section
      id="rising-in-mati"
      aria-labelledby="rising-heading"
      className="scroll-mt-28 bg-white py-12 lg:py-14"
    >
      <Container>
        {preview ? (
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2
                id="rising-heading"
                className="flex items-center gap-3 font-display text-3xl font-extrabold tracking-[-0.025em] text-[#123c7a]"
              >
                <TrendingUp className="size-7 text-[#2b62ee]" aria-hidden="true" />
                {t('rising-title')}
              </h2>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-[#4c5c78]">
                {t('rising-preview-note')}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-1 md:items-end">
              <a
                href="/budget#rising-in-mati"
                className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[#2b62ee]"
              >
                {t('rising-view-all')} <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
              <span className="text-xs text-[#4c5c78]">
                {t('trans-checked')} <time dateTime={projectsCheckedOn}>{projectsCheckedOn}</time>
              </span>
            </div>
          </div>
        ) : (
          <>
            <h2
              id="rising-heading"
              className="flex items-center gap-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]"
            >
              <TrendingUp className="size-5 text-[#2b62ee]" aria-hidden="true" />
              {t('rising-title')}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4c5c78]">
              {t('rising-note')}
            </p>
            <p className="mt-2 text-xs text-[#4c5c78]">
              {t('trans-checked')} <time dateTime={projectsCheckedOn}>{projectsCheckedOn}</time>
            </p>
          </>
        )}
        {preview ? (
          <RisingPreview t={t} />
        ) : (
          <div className="mt-5 grid items-start gap-4 lg:grid-cols-2">
            {risingProjects.map((project) => {
              const Icon = iconFor(project);
              const status = t(`rising-status-${project.status}`);
              const title = t(project.titleKey);
              return (
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
        )}
      </Container>
    </section>
  );
}
