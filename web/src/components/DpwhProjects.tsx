import { ArrowUpRight, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/primitives';
import { m, fadeUp, revealViewport } from '@/components/motion';
import { procurementNotices } from '@/lib/infrastructureData';
import { pesoFull } from '@/lib/dpwhData';

/** Selected local and national procurement records, with document-level citations. */
export function DpwhProjects() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#f1f6fc] py-12">
      <Container>
        <h2 className="border-l-4 border-[#2b62ee] pl-4 font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]">
          {t('trans-procurement-title')}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#4c5c78]">
          {t('trans-procurement-note')}
        </p>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {procurementNotices.map((p, index) => (
            <m.article
              key={p.reference}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="rounded-xl border-t-[3px] border-[#2b62ee] bg-white p-5 shadow-[0_0_0_1px_rgba(18,60,122,0.07)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#2b62ee]">
                {t(
                  p.scope === 'local'
                    ? 'trans-local-procurement'
                    : 'budget-national-government-projects'
                )}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-[#123c7a]">
                {t(`trans-project-${p.reference}`)}
              </h3>
              <p className="mt-2 flex items-start gap-1 text-sm text-[#4c5c78]">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {p.location}
              </p>
              <p className="mt-3 font-mono text-xs text-[#4c5c78]">
                {p.id} · {p.sourceName} {p.reference}
              </p>
              <dl className="mt-4 space-y-3 border-t border-[#e3e8ef] pt-4 text-sm">
                <div>
                  <dt className="text-[#4c5c78]">{t('trans-procuring-entity')}</dt>
                  <dd className="font-semibold text-[#123c7a]">{p.agency}</dd>
                </div>
                <div>
                  <dt className="text-[#4c5c78]">{t('trans-funding')}</dt>
                  <dd className="text-[#123c7a]">{p.funding ?? t('trans-not-stated')}</dd>
                </div>
                <div>
                  <dt className="text-[#4c5c78]">{t('trans-abc')}</dt>
                  <dd className="font-display text-2xl font-bold tabular-nums text-[#2b62ee]">
                    {pesoFull(p.abc)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#4c5c78]">{t('trans-notice-status')}</dt>
                  <dd className="text-[#123c7a]">
                    {t(p.noticeStatus === 'Awarded' ? 'trans-awarded' : 'trans-closed-expired')}
                    {p.updatedOn && ` · ${p.updatedOn}`}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#4c5c78]">{t('trans-published')}</dt>
                  <dd className="text-[#123c7a]">{p.publishedOn}</dd>
                </div>
                {p.closingOn && (
                  <div>
                    <dt className="text-[#4c5c78]">{t('trans-closing')}</dt>
                    <dd className="text-[#123c7a]">{p.closingOn}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-[#4c5c78]">
                {t('trans-project-unknowns')}
              </p>
              <a
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2b62ee] underline underline-offset-4"
              >
                [{index + 2}] {t('trans-read-notice')} · {p.reference}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </m.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
