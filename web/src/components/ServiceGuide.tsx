import { ServiceOnlineAction } from '@/components/ServiceOnlineAction';
import { FileText } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Container, Section, PageHeader, TextLink } from '@/components/primitives';
import { ServiceSources } from '@/components/ServiceSources';
import { useLanguage } from '@/hooks/useLanguage';
import { serviceGuides, serviceText } from '@/lib/serviceReferences';

export function ServiceGuide({ id }: { id: string }) {
  const { language, t } = useLanguage();
  const guide = serviceGuides[id];
  const title = serviceText(guide.title, language);
  return (
    <>
      <Seo
        title={title}
        description={serviceText(guide.summary, language)}
        canonicalPath={`/service-details/${id}`}
      />
      <PageHeader
        badge={
          <>
            <FileText className="size-4" aria-hidden="true" />
            {t('nav-services')}
          </>
        }
        title={title}
        description={serviceText(guide.summary, language)}
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-services'), to: '/services' },
          { label: title },
        ]}
      />
      <Section compact>
        <Container>
          <div className="max-w-3xl rounded-card border border-line bg-white p-6">
            <h2 className="mb-3 font-display text-xl font-extrabold tracking-[-0.02em] text-heading">
              {t('service-next-step')}
            </h2>
            <p className="leading-relaxed">{serviceText(guide.ask, language)}</p>
            <p className="mt-4 text-sm text-ink-muted">{t('service-before-visit')}</p>
            {[
              'birth-certificate',
              'marriage-certificate',
              'death-certificate',
              'civil-registrar',
              'municipal-civil-registrar',
            ].includes(id) && <ServiceOnlineAction id="psa" />}
            <div className="mt-5 flex flex-wrap gap-5">
              <TextLink to={`/services/${guide.category}`}>{t('service-category-link')}</TextLink>
              <TextLink to="/contact">{t('service-contact-link')}</TextLink>
            </div>
          </div>
        </Container>
      </Section>
      <ServiceSources sourceIds={guide.sources} />
    </>
  );
}
