import { useState } from 'react';
import { ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/primitives';
import { m, fadeUp, revealViewport } from '@/components/motion';
import { procurementNotices, type ProcurementNotice } from '@/lib/infrastructureData';
import { pesoFull } from '@/lib/dpwhData';

/** A single procurement record. Details are collapsed by default. */
function ProcurementCard({ notice: p, index }: { notice: ProcurementNotice; index: number }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const detailId = `procurement-detail-${p.reference}`;

  return (
    <m.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="rounded-card bg-white p-5 border border-line"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-royal">
        {t(p.scope === 'local' ? 'trans-local-procurement' : 'budget-national-government-projects')}
      </p>
      <h3 className="mt-2 font-display text-lg font-bold text-heading">
        {t(`trans-project-${p.reference}`)}
      </h3>
      <p className="mt-2 flex items-start gap-1 text-sm text-ink-muted">
        <MapPin className="size-4 shrink-0" aria-hidden="true" />
        {p.location}
      </p>
      <p className="mt-3 font-mono text-xs text-ink-muted">
        {p.id} · {p.sourceName} {p.reference}
      </p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={detailId}
        className="mt-4 flex w-full items-center justify-between gap-2 border-t border-line pt-4 text-sm font-semibold text-royal"
      >
        <span>{t(open ? 'trans-hide-details' : 'trans-show-details')}</span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={detailId}
        className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-ink-muted">{t('trans-procuring-entity')}</dt>
              <dd className="font-semibold text-heading">{p.agency}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">{t('trans-funding')}</dt>
              <dd className="text-heading">{p.funding ?? t('trans-not-stated')}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">{t('trans-abc')}</dt>
              <dd className="font-display text-2xl font-bold tabular-nums text-royal">
                {pesoFull(p.abc)}
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted">{t('trans-notice-status')}</dt>
              <dd className="text-heading">
                {t(p.noticeStatus === 'Awarded' ? 'trans-awarded' : 'trans-closed-expired')}
                {p.updatedOn && ` · ${p.updatedOn}`}
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted">{t('trans-published')}</dt>
              <dd className="text-heading">{p.publishedOn}</dd>
            </div>
            {p.closingOn && (
              <div>
                <dt className="text-ink-muted">{t('trans-closing')}</dt>
                <dd className="text-heading">{p.closingOn}</dd>
              </div>
            )}
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {t('trans-project-unknowns')}
          </p>
          <a
            href={p.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal underline underline-offset-4"
          >
            [{index + 2}] {t('trans-read-notice')} · {p.reference}
            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </m.article>
  );
}

/** Selected local and national procurement records, with document-level citations. */
export function DpwhProjects() {
  const { t } = useLanguage();
  return (
    <section className="bg-surface-subtle py-12">
      <Container>
        <h2 className="border-l-4 border-royal pl-4 font-display text-2xl font-extrabold tracking-[-0.02em] text-heading">
          {t('trans-procurement-title')}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
          {t('trans-procurement-note')}
        </p>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {procurementNotices.map((p, index) => (
            <ProcurementCard key={p.reference} notice={p} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
