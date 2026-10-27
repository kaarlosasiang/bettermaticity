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
import { Container, Eyebrow } from '@/components/primitives';
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
                ? 'ring-1 ring-amber ring-inset'
                : 'ring-1 ring-royal ring-inset'
              : i < reached
                ? tone === 'dark'
                  ? 'bg-amber'
                  : 'bg-royal'
                : tone === 'dark'
                  ? 'bg-white/15'
                  : 'bg-line'
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
        className="group relative isolate flex min-h-[360px] flex-col overflow-hidden rounded-card bg-navy p-6 text-white sm:p-8"
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
          <span className="flex size-10 items-center justify-center rounded-md bg-amber text-navy">
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
                  className={i < leadStage ? 'font-semibold text-white' : 'text-white/65'}
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
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber">
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
                className="group grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-3 rounded-card border border-line bg-white p-5 text-heading transition-colors hover:border-royal sm:grid-cols-[auto_minmax(0,1fr)_auto]"
              >
                <span className="flex size-10 items-center justify-center rounded-md bg-royal-tint text-royal">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-ink-muted">
                    {t(`rising-scope-${project.scope}`)}
                  </div>
                  <h3 className="mt-1 font-display text-base leading-snug font-bold">
                    {t(project.titleKey)}
                  </h3>
                  <div className="mt-3 max-w-56">
                    <StageTrack status={project.status} tone="light" />
                  </div>
                  <div className="mt-2 text-xs text-ink-muted">
                    <span className="font-semibold text-heading">
                      {t(`rising-status-${project.status}`)}
                    </span>{' '}
                    · <time dateTime={project.sourceDate}>{project.sourceDate}</time>
                  </div>
                </div>
                <div className="col-start-2 sm:col-start-3 sm:row-start-1 sm:max-w-40 sm:text-right">
                  <div className="font-display text-2xl leading-none font-extrabold tracking-[-0.02em] text-royal tabular-nums">
                    {pesoCompact.format(project.amount)}
                  </div>
                  <div className="mt-1.5 text-[0.6875rem] leading-snug text-ink-muted">
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
              <Eyebrow className="inline-flex items-center gap-2">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                {t('rising-eyebrow')}
              </Eyebrow>
              <h2
                id="rising-heading"
                className="mt-2 font-display text-[1.75rem] leading-[1.12] font-extrabold tracking-[-0.03em] text-heading sm:text-4xl"
              >
                {t('rising-title')}
              </h2>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted">
                {t('rising-preview-note')}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-1 md:items-end">
              <a
                href="/budget#rising-in-mati"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal underline decoration-1 underline-offset-[5px] hover:decoration-2"
              >
                {t('rising-view-all')} <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
              <span className="font-mono text-[0.6875rem] text-ink-muted">
                {t('trans-checked')} <time dateTime={projectsCheckedOn}>{projectsCheckedOn}</time>
              </span>
            </div>
          </div>
        ) : (
          <>
            <h2
              id="rising-heading"
              className="flex items-center gap-3 font-display text-2xl font-extrabold tracking-[-0.02em] text-heading"
            >
              <TrendingUp className="size-5 text-royal" aria-hidden="true" />
              {t('rising-title')}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">
              {t('rising-note')}
            </p>
            <p className="mt-2 text-xs text-ink-muted">
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
                  className="flex scroll-mt-28 flex-col rounded-card border border-line bg-surface-subtle p-5 target:ring-2 target:ring-royal"
                >
                  <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-royal">
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        {t(`rising-scope-${project.scope}`)}
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold leading-snug text-heading">
                        {title}
                      </h3>
                    </div>
                    <dl className="sm:max-w-52 sm:text-right">
                      <dt className="text-xs leading-relaxed text-ink-muted">
                        {t(`rising-amount-${project.amountKind}`)}
                      </dt>
                      <dd className="mt-1 font-display text-xl font-bold tabular-nums text-royal">
                        {pesoFull(project.amount)}
                      </dd>
                    </dl>
                  </div>
                  <dl className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-3 text-xs">
                    <div>
                      <dt className="text-ink-muted">{t('rising-status-label')}</dt>
                      <dd className="mt-1 font-semibold text-heading">{status}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">{t('rising-source-date')}</dt>
                      <dd className="mt-1 text-heading">
                        <time dateTime={project.sourceDate}>{project.sourceDate}</time>
                      </dd>
                    </div>
                  </dl>
                  <details className="group mt-4 border-t border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-none pt-3 text-sm font-semibold text-royal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-royal [&::-webkit-details-marker]:hidden">
                      {t('rising-details')}
                      <ChevronDown
                        className="size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="my-4 text-sm leading-relaxed text-ink-muted">
                      {t(project.detailKey)}
                    </p>
                    <div className="space-y-2">
                      {project.sources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-1 text-sm font-semibold text-royal underline underline-offset-4"
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
