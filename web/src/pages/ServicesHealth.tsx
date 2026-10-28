import { HeartPulse, Building2, Hospital, ShieldPlus, Heart, Pill } from 'lucide-react';
import { Container, Section, SectionTitle } from '@/components/primitives';
import { ServiceCategoryPage, type CategoryService } from '@/components/ServiceCategoryPage';
import {
  HotlineGrid,
  HotlineSourceNote,
  NationalHotlineBanner,
} from '@/components/HotlineDirectory';
import { medicalHotlines } from '@/lib/hotlines';
import { useLanguage } from '@/hooks/useLanguage';

const healthServices: CategoryService[] = [
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
];

// Health shares the category shell; its office guidance and medical hotlines follow the
// service list as page-specific sections.
export default function ServicesHealth() {
  const { t } = useLanguage();
  return (
    <ServiceCategoryPage
      path="/services/health"
      seoTitleKey="health-page-title"
      seoDescription={t('health-page-desc')}
      badgeIcon={HeartPulse}
      titleKey="health-page-title"
      descKey="health-page-desc"
      services={healthServices}
    >
      <Section className="border-t border-line">
        <Container>
          <SectionTitle>
            <Building2 className="size-5" aria-hidden="true" />
            {t('health-section-mho')}
          </SectionTitle>
          <p className="max-w-3xl text-ink-muted">{t('service-health-guidance')}</p>
          <h2 className="mt-6 mb-2 text-xl font-semibold text-heading">
            {t('health-section-bhs')}
          </h2>
          <p className="max-w-3xl text-ink-muted">{t('service-health-directory')}</p>
        </Container>
      </Section>
      <Section className="border-t border-line">
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
    </ServiceCategoryPage>
  );
}
