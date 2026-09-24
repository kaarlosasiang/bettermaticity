import { Container, Section } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';
import {
  serviceCategoryReferences,
  serviceReferences,
  serviceReviewDate,
  serviceText,
} from '@/lib/serviceReferences';

export function ServiceSources({
  category,
  sourceIds,
}: {
  category?: string;
  sourceIds?: string[];
}) {
  const { language, t } = useLanguage();
  const ids = sourceIds ?? serviceCategoryReferences[category ?? 'services'] ?? [];
  return (
    <Section compact altBg>
      <Container>
        <h2 className="mb-2 text-xl font-semibold">{t('service-sources-title')}</h2>
        <p className="text-sm text-muted-foreground">
          {t('service-reviewed')} <time dateTime={serviceReviewDate}>{serviceReviewDate}</time>
        </p>
        <p className="mb-5 max-w-3xl text-sm text-muted-foreground">
          {t('service-local-confirmation')}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {ids.map((id) => {
            const source = serviceReferences[id];
            return (
              <article key={id} className="rounded-lg border border-border bg-card p-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  {t(`service-scope-${source.scope}`)}
                  {!source.checkedOn && ` · ${t('service-not-rechecked')}`}
                </p>
                <h3 className="mb-2 text-base font-semibold">
                  <a href={source.url} className="text-primary underline underline-offset-4">
                    {source.title}
                  </a>
                </h3>
                <p className="m-0 text-sm leading-relaxed text-muted-foreground">
                  {serviceText(source.claim, language)}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
