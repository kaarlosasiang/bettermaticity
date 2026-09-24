import { ServiceOnlineAction } from '@/components/ServiceOnlineAction';
import { FileText } from 'lucide-react';
import { AppLink } from '@/components/AppLink';
import { Seo } from '@/components/Seo';
import { Container, Section, PageHeader } from '@/components/primitives';
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
      <Container>
        <nav
          aria-label={t('service-breadcrumb')}
          className="flex flex-wrap gap-2 py-4 text-sm text-muted-foreground"
        >
          <AppLink to="/">{t('nav-home')}</AppLink>
          <span aria-hidden="true">/</span>
          <AppLink to="/services">{t('nav-services')}</AppLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
      </Container>
      <PageHeader
        badge={
          <>
            <FileText className="size-4" aria-hidden="true" />
            {t('nav-services')}
          </>
        }
        title={title}
        description={serviceText(guide.summary, language)}
      />
      <Section compact>
        <Container>
          <div className="max-w-3xl rounded-xl border border-border bg-card p-6">
            <h2 className="mb-3 text-xl font-semibold">{t('service-next-step')}</h2>
            <p className="leading-relaxed">{serviceText(guide.ask, language)}</p>
            <p className="mt-4 text-sm text-muted-foreground">{t('service-before-visit')}</p>
            {[
              'birth-certificate',
              'marriage-certificate',
              'death-certificate',
              'civil-registrar',
              'municipal-civil-registrar',
            ].includes(id) && <ServiceOnlineAction id="psa" />}
            <div className="mt-5 flex flex-wrap gap-5">
              <AppLink to={`/services/${guide.category}`} className="text-primary underline">
                {t('service-category-link')}
              </AppLink>
              <AppLink to="/contact" className="text-primary underline">
                {t('service-contact-link')}
              </AppLink>
            </div>
          </div>
        </Container>
      </Section>
      <ServiceSources sourceIds={guide.sources} />
    </>
  );
}
