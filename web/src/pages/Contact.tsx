import type { LucideIcon } from 'lucide-react';
import {
  Mail,
  Smartphone,
  Phone,
  Clock,
  CircleCheck,
  CirclePause,
  CircleX,
  TriangleAlert,
  Hospital,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';
import { emergencyHotlines as emergency, medicalHotlines as medical } from '@/lib/hotlines';
import { HotlineGrid, NationalHotlineBanner, HotlineSourceNote } from '@/components/HotlineDirectory';

const contactCards: { Icon: LucideIcon; href: string; titleKey: string; value: string; noteKey: string }[] = [
  { Icon: Mail, href: 'mailto:lgumatinv@gmail.com', titleKey: 'contact-email', value: 'lgumatinv@gmail.com', noteKey: 'contact-response' },
  { Icon: Smartphone, href: 'tel:09175951931', titleKey: 'contact-mobile', value: '0917-595-1931', noteKey: 'contact-hours' },
  { Icon: Phone, href: 'tel:0878053581', titleKey: 'contact-phone', value: '(087) 805-3581', noteKey: 'contact-hours' },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('contact-title')}
        description="Contact LGU Mati — email, phone, office hours, and emergency hotlines."
        canonicalPath="/contact"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">
            {t('contact-home')}
          </AppLink>
          <span>/</span>
          <span aria-current="page">{t('contact-contact')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Mail className="size-4" aria-hidden="true" />
            {t('contact-contact')}
          </>
        }
        title={t('contact-title')}
        description={t('contact-subtitle')}
      />

      {/* Contact info cards */}
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((c) => (
              <a
                key={c.titleKey}
                href={c.href}
                className="flex overflow-hidden rounded-xl border border-border bg-card text-foreground no-underline transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex w-14 shrink-0 items-center justify-center bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] text-xl text-white">
                  <c.Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="p-5">
                  <h3 className="mb-1 text-sm font-semibold text-muted-foreground">{t(c.titleKey)}</h3>
                  <p className="m-0 mb-1 text-base font-semibold text-foreground">{c.value}</p>
                  <span className="text-[0.8125rem] text-muted-foreground">{t(c.noteKey)}</span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Office hours */}
      <Section compact>
        <Container>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4 bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] px-8 py-6 text-white">
              <Clock className="size-5" aria-hidden="true" />
              <h2 className="m-0 text-lg font-semibold">{t('contact-office-hours')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { day: 'Monday - Friday', time: '8:00 AM - 5:00 PM', Icon: CircleCheck, status: t('contact-open'), tone: 'text-brand-success' },
                { day: t('contact-lunch-break'), time: '12:00 PM - 1:00 PM', Icon: CirclePause, status: t('contact-break'), tone: 'text-brand-accent' },
                { day: 'Saturday & Sunday', time: t('contact-closed'), Icon: CircleX, status: t('contact-closed'), tone: 'text-destructive' },
                { day: t('contact-national-local-holidays'), time: t('contact-closed'), Icon: CircleX, status: t('contact-closed'), tone: 'text-destructive' },
              ].map((o, i) => (
                <div key={i} className="flex flex-col items-center gap-1 border-border p-6 text-center not-last:border-r [&:not(:nth-child(1))]:border-t sm:[&:nth-child(2)]:border-t-0 lg:border-t-0">
                  <span className="text-sm font-semibold text-foreground">{o.day}</span>
                  <span className="text-sm text-muted-foreground">{o.time}</span>
                  <span className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${o.tone}`}>
                    <o.Icon className="size-3.5" aria-hidden="true" />
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Emergency hotlines */}
      <Section>
        <Container>
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef2f2] px-3 py-1 text-xs font-semibold text-[#dc2626]">
                <TriangleAlert className="size-3.5" aria-hidden="true" />
                {t('contact-emergency')}
              </span>
              <h2 className="m-0 text-[1.375rem] font-semibold text-foreground">{t('contact-hotlines')}</h2>
            </div>
            <p className="m-0 text-sm text-muted-foreground">{t('contact-hotlines-desc')}</p>
          </div>
          <NationalHotlineBanner />
          <HotlineGrid hotlines={emergency} tone="emergency" />
          <HotlineSourceNote />
        </Container>
      </Section>

      {/* Medical emergency hotlines */}
      <Section altBg>
        <Container>
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(255,46,81,0.1)] px-3 py-1 text-xs font-semibold text-[#c4123f]">
                <Hospital className="size-3.5" aria-hidden="true" />
                {t('contact-medical')}
              </span>
              <h2 className="m-0 text-[1.375rem] font-semibold text-foreground">
                {t('contact-medical-emergency-hotlines')}
              </h2>
            </div>
            <p className="m-0 text-sm text-muted-foreground">
              {t('contact-for-medical-emergencies-and-hospital-inquiries')}
            </p>
          </div>
          <HotlineGrid hotlines={medical} tone="medical" />
        </Container>
      </Section>
    </>
  );
}
