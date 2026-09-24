import { ServiceCards } from '@/components/ServiceCards';
import { HeartPulse, Building2, Hospital, ShieldPlus, Heart, Pill } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { Container, Section, PageHeader, SectionTitle } from '@/components/primitives';
import { ServiceSources } from '@/components/ServiceSources';
import {
  HotlineGrid,
  HotlineSourceNote,
  NationalHotlineBanner,
} from '@/components/HotlineDirectory';
import { medicalHotlines } from '@/lib/hotlines';
import { useLanguage } from '@/hooks/useLanguage';

export default function ServicesHealth() {
  const { t } = useLanguage();
  return (
    <>
      <Seo
        title={t('health-page-title')}
        description={t('health-page-desc')}
        canonicalPath="/services/health"
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
          <span aria-current="page">{t('health-page-title')}</span>
        </nav>
      </Container>
      <PageHeader
        badge={
          <>
            <HeartPulse className="size-4" aria-hidden="true" />
            {t('health-page-badge')}
          </>
        }
        title={t('health-page-title')}
        description={t('health-page-desc')}
      />
      <Section>
        <Container>
          <ServiceCards
            services={[
              {
                Icon: Hospital,
                titleKey: 'health-consultation',
                descKey: 'service-health-consultation-desc',
              },
              {
                Icon: ShieldPlus,
                titleKey: 'health-vaccination',
                descKey: 'health-vaccination-desc',
              },
              { Icon: Heart, titleKey: 'health-maternal', descKey: 'health-maternal-desc' },
              {
                Icon: Pill,
                titleKey: 'health-medicine',
                descKey: 'health-medicine-desc',
                to: '/service-details/mswdo-services',
              },
            ]}
          />
        </Container>
      </Section>
      <Section compact>
        <Container>
          <SectionTitle>
            <Building2 className="size-5" aria-hidden="true" />
            {t('health-section-mho')}
          </SectionTitle>
          <p className="max-w-3xl text-muted-foreground">{t('service-health-guidance')}</p>
          <h2 className="mt-6 mb-2 text-xl font-semibold">{t('health-section-bhs')}</h2>
          <p className="max-w-3xl text-muted-foreground">{t('service-health-directory')}</p>
        </Container>
      </Section>
      <Section compact>
        <Container>
          <SectionTitle>
            <Hospital className="size-5" aria-hidden="true" />
            {t('contact-medical-emergency-hotlines')}
          </SectionTitle>
          <NationalHotlineBanner />
          <HotlineGrid hotlines={medicalHotlines} tone="medical" compact />
          <HotlineSourceNote />
        </Container>
      </Section>
      <ServiceSources category="health" />
    </>
  );
}
