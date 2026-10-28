import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Container, Section } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';
import {
  serviceCategoryReferences,
  serviceReferences,
  serviceReviewDate,
  serviceText,
} from '@/lib/serviceReferences';

// "Official source and verification" band (BetterSanFernando service pages): a centred
// summary of when the guidance was reviewed and what it can't confirm, then every source
// with its scope and the claim it supports.
export function ServiceSources({
  category,
  sourceIds,
  id = 'official-source',
}: {
  category?: string;
  sourceIds?: string[];
  id?: string;
}) {
  const { language, t } = useLanguage();
  const ids = sourceIds ?? serviceCategoryReferences[category ?? 'services'] ?? [];
  return (
    <Section>
      <Container>
        <section
          id={id}
          aria-labelledby={`${id}-heading`}
          className="border border-line bg-surface-subtle p-6 sm:p-8"
        >
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="size-6 shrink-0 text-royal" aria-hidden="true" />
              <h2
                id={`${id}-heading`}
                className="font-display text-2xl font-bold tracking-[-0.02em] text-heading md:text-3xl"
              >
                {t('service-source-title')}
              </h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              {t('service-reviewed')} <time dateTime={serviceReviewDate}>{serviceReviewDate}</time>.{' '}
              {t('service-independent-note')} {t('service-local-confirmation')}
            </p>
          </div>
          <ul className="mx-auto mt-6 max-w-3xl divide-y divide-line border border-line bg-white">
            {ids.map((sourceId) => {
              const source = serviceReferences[sourceId];
              return (
                <li key={sourceId} className="px-5 py-4">
                  <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
                    {t(`service-scope-${source.scope}`)}
                    {!source.checkedOn && ` · ${t('service-not-rechecked')}`}
                  </p>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal"
                  >
                    {source.title}
                    <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="sr-only"> ({t('service-new-tab')})</span>
                  </a>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">
                    {serviceText(source.claim, language)}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
    </Section>
  );
}
