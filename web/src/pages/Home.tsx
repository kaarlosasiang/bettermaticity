import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  CalendarCheck,
  UserPlus,
  FileText,
  Store,
  Coins,
  Users,
  HeartPulse,
  LayoutGrid,
  MapPin,
  Award,
  Ruler,
  Thermometer,
  Landmark,
  UserRound,
  Brain,
  Megaphone,
  CalendarDays,
  Radio,
  Phone,
  Mail,
} from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa6';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { ServiceSearch } from '@/components/ServiceSearch';
import VolunteerDialog from '@/components/VolunteerDialog';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, Grid, StatCard } from '@/components/primitives';
import { totalPopulation, barangayCount } from '@/lib/statsData';

const popular: { to: string; Icon: LucideIcon; titleKey: string; descKey: string }[] = [
  { to: '/services/certificates', Icon: FileText, titleKey: 'service-certificates', descKey: 'service-certificates-desc' },
  { to: '/services/business', Icon: Store, titleKey: 'service-business', descKey: 'service-business-desc' },
  { to: '/services/tax-payments', Icon: Coins, titleKey: 'service-tax', descKey: 'service-tax-desc' },
  { to: '/services/social-services', Icon: Users, titleKey: 'service-social', descKey: 'service-social-desc' },
  { to: '/services/health', Icon: HeartPulse, titleKey: 'service-health', descKey: 'service-health-desc' },
];

const history: { year: string; key: string }[] = [
  { year: '1760', key: 'home-history-1760' },
  { year: '1767', key: 'home-history-1767' },
  { year: '1768', key: 'home-history-1768' },
  { year: '1853', key: 'home-history-1853' },
  { year: '1889', key: 'home-history-1889' },
  { year: '1957', key: 'home-history-1957' },
];

const historyHighlights: { titleKey: string; descKey: string }[] = [
  { titleKey: 'home-once-the-largest', descKey: 'home-mati-was-the-largest-municipality-in-the' },
  { titleKey: 'home-urban-planning', descKey: 'home-the-1889-redevelopment-created-a-grid-of-100' },
];

const leadership: { titleKey: string; nameKey: string; email: string; phone: string; tel: string }[] = [
  { titleKey: 'title-mayor', nameKey: 'home-hon-philip-a-dacayo', email: 'mayor@mati.gov.ph', phone: '(087) 326-5002', tel: '0873265002' },
  { titleKey: 'title-vice-mayor', nameKey: 'home-hon-eduardo-d-tiongson', email: 'vicemayor@mati.gov.ph', phone: '(087) 326-5003', tel: '0873265003' },
];

function useMatiWeather() {
  const [temp, setTemp] = useState<string | null>(null);
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=6.9497&longitude=126.2094&current_weather=true')
      .then((r) => r.json())
      .then((d) => {
        if (d?.current_weather?.temperature != null) setTemp(`${Math.round(d.current_weather.temperature)}°C`);
      })
      .catch(() => {});
  }, []);
  return temp;
}

export default function Home() {
  const { t } = useLanguage();
  const temp = useMatiWeather();

  return (
    <>
      <Seo description="Access government services, information, and resources for the people of Mati, Davao Oriental." />

      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] py-16 text-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="mb-4 text-[2.5rem] leading-tight font-bold">{t('hero-welcome')}</h1>
              <p className="mb-6 text-lg text-white/90">{t('hero-subtitle')}</p>
              <div className="flex flex-wrap gap-3">
                <AppLink to="/services" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5">
                  {t('home-browse-services')}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </AppLink>
                <AppLink to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  {t('home-contact-us')}
                </AppLink>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-3 text-base font-semibold text-foreground">{t('home-find-a-service')}</h2>
              <ServiceSearch />
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>{t('home-popular')}:</span>
                <AppLink to="/service-details/birth-certificate" className="rounded-full bg-muted px-3 py-1 text-primary">{t('home-birth-certificate')}</AppLink>
                <AppLink to="/service-details/business-permits-licensing" className="rounded-full bg-muted px-3 py-1 text-primary">{t('home-business-permit')}</AppLink>
                <AppLink to="/service-details/municipal-treasurer" className="rounded-full bg-muted px-3 py-1 text-primary">{t('home-real-property-tax')}</AppLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Appointment CTA */}
      <Section compact altBg>
        <Container>
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="mb-1 text-xl font-bold text-foreground">{t('appointment-cta-heading')}</h2>
              <p className="m-0 text-sm text-muted-foreground">{t('appointment-cta-subtitle')}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href="https://matimayorsoffice-oasys.com/user/auth/login.php" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark">
                <CalendarCheck className="size-4" aria-hidden="true" /> {t('home-schedule-appointment')}
              </a>
              <a href="https://matimayorsoffice-oasys.com/user/auth/register.php" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary">
                <UserPlus className="size-4" aria-hidden="true" /> {t('home-create-account')}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Popular services */}
      <Section>
        <Container>
          <SectionTitle>{t('section-popular')}</SectionTitle>
          <Grid min={250}>
            {popular.map(({ to, Icon, titleKey, descKey }) => (
              <AppLink key={to} to={to} className="group flex flex-col rounded-[10px] border border-border bg-card p-6 no-underline transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
                <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mb-1 text-base font-semibold text-foreground">{t(titleKey)}</h3>
                <p className="m-0 text-sm text-muted-foreground">{t(descKey)}</p>
              </AppLink>
            ))}
            <AppLink to="/services" className="group flex flex-col items-start justify-center rounded-[10px] border border-dashed border-border bg-card p-6 no-underline transition hover:border-primary">
              <LayoutGrid className="mb-3 size-6 text-primary" aria-hidden="true" />
              <h3 className="mb-1 text-base font-semibold text-primary">{t('btn-view-all-services')}</h3>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                {t('home-browse-complete-directory')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </AppLink>
          </Grid>
        </Container>
      </Section>

      {/* Quick stats */}
      <Section compact altBg>
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <SectionTitle className="mb-0">{t('home-mati-at-a-glance')}</SectionTitle>
            <AppLink to="/statistics" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              {t('home-view-statistics')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </AppLink>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard value={totalPopulation.toLocaleString()} label={<><Users className="mr-1 inline size-3.5 text-primary" />{t('home-population')}</>} />
            <StatCard value={barangayCount} label={<><MapPin className="mr-1 inline size-3.5 text-primary" />{t('home-barangays')}</>} />
            <StatCard value={t('home-1st-class')} label={<><Award className="mr-1 inline size-3.5 text-primary" />{t('home-income-classification')}</>} />
            <StatCard value={t('home-16270-km')} label={<><Ruler className="mr-1 inline size-3.5 text-primary" />{t('home-land-area')}</>} />
          </div>
        </Container>
      </Section>

      {/* Weather + map */}
      <Section compact>
        <Container>
          <SectionTitle>{t('home-weather-and-map-of-mati')}</SectionTitle>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center">
              <Thermometer className="mb-2 size-8 text-primary" aria-hidden="true" />
              <span className="text-3xl font-bold text-foreground">{temp ?? '—'}</span>
              <span className="mt-1 text-sm text-muted-foreground">Mati City Hall, Davao Oriental 8200</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-border lg:col-span-2">
              <iframe
                title="Map of Mati"
                className="h-64 w-full"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=126.1894%2C6.9297%2C126.2294%2C6.9697&layer=mapnik&marker=6.9497%2C126.2094"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* History */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <Landmark className="size-5 text-primary" aria-hidden="true" />
            {t('home-brief-history-of-mati')}
          </SectionTitle>
          <ol className="relative ml-3 border-l-2 border-border">
            {history.map((h) => (
              <li key={h.year} className="mb-6 ml-6">
                <span className="absolute -left-[9px] flex size-4 items-center justify-center rounded-full bg-primary" aria-hidden="true" />
                <span className="text-sm font-bold text-primary">{h.year}</span>
                <p className="m-0 mt-1 text-sm text-muted-foreground">{t(h.key)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {historyHighlights.map((h) => (
              <div key={h.titleKey} className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-1 text-base font-semibold text-foreground">{t(h.titleKey)}</h3>
                <p className="m-0 text-sm text-muted-foreground">{t(h.descKey)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Latest Updates — Facebook feed */}
      <Section compact>
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <SectionTitle className="mb-0">{t('section-updates')}</SectionTitle>
            <AppLink to="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              {t('home-view-all')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </AppLink>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <FaFacebookF className="size-3" aria-hidden="true" />
                Official Facebook Page
              </span>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Real-time updates, straight from our page
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Follow the Official LGU Mati Facebook Page for the latest announcements, advisories,
                events, and community updates as they happen.
              </p>
              <ul className="mb-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Megaphone className="size-4 text-primary" aria-hidden="true" /> Official announcements &amp; advisories</li>
                <li className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" aria-hidden="true" /> Events &amp; community programs</li>
                <li className="flex items-center gap-2"><Radio className="size-4 text-primary" aria-hidden="true" /> Posted in real time, as it happens</li>
              </ul>
              <a
                href="https://www.facebook.com/OfficialLGUMati"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition hover:opacity-90"
              >
                <FaFacebookF className="size-4" aria-hidden="true" /> Visit our Facebook Page
              </a>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title="LGU Mati Official Facebook Page — Live Updates"
                className="h-[500px] w-full"
                loading="lazy"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FOfficialLGUMati%2F&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Can't see the feed?{' '}
            <a href="https://www.facebook.com/OfficialLGUMati/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Open it on Facebook
            </a>
          </p>
        </Container>
      </Section>

      {/* Leadership */}
      <Section compact altBg>
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <SectionTitle className="mb-0">{t('section-leadership')}</SectionTitle>
            <AppLink to="/government/officials" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              {t('home-view-all-officials')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </AppLink>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {leadership.map((l) => (
              <div key={l.titleKey} className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-muted">
                  <UserRound className="size-8 text-muted-foreground" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">{t(l.titleKey)}</p>
                  <h3 className="text-base font-semibold text-foreground">{t(l.nameKey)}</h3>
                  <a href={`mailto:${l.email}`} className="block text-sm text-muted-foreground hover:text-primary">{l.email}</a>
                  <a href={`tel:${l.tel}`} className="block text-sm text-muted-foreground hover:text-primary">{l.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Information */}
      <Section compact>
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <SectionTitle className="mb-0">{t('section-contact')}</SectionTitle>
            <AppLink to="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              {t('home-view-all')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </AppLink>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <a href="tel:0878053581" className="flex items-start gap-3 rounded-xl border border-border bg-card p-6 text-foreground no-underline transition hover:-translate-y-0.5 hover:shadow-sm">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">{t('contact-phone')}</h3>
                <p className="m-0 text-base font-semibold text-foreground">(087) 805-3581</p>
                <span className="text-[0.8125rem] text-muted-foreground">{t('contact-hours')}</span>
              </div>
            </a>
            <a href="mailto:lgumatinv@gmail.com" className="flex items-start gap-3 rounded-xl border border-border bg-card p-6 text-foreground no-underline transition hover:-translate-y-0.5 hover:shadow-sm">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">{t('contact-email')}</h3>
                <p className="m-0 text-base font-semibold text-foreground">lgumatinv@gmail.com</p>
                <span className="text-[0.8125rem] text-muted-foreground">{t('contact-response')}</span>
              </div>
            </a>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-6">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">{t('contact-address')}</h3>
                <p className="m-0 text-base font-semibold text-foreground">{t('contact-municipal-hall')}</p>
                <span className="text-[0.8125rem] text-muted-foreground">Mati, Davao Oriental 8200</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quiz CTA */}
      <section className="bg-[linear-gradient(135deg,var(--primary)_0%,var(--brand-secondary)_100%)] py-12 text-white">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <Brain className="size-10" aria-hidden="true" />
            <h2 className="m-0 text-2xl font-bold">{t('home-mati-quiz')}</h2>
            <p className="m-0 text-lg font-semibold text-white">How well do you know Mati, Davao Oriental?</p>
            <p className="m-0 max-w-xl text-white/90">{t('home-evaluate-your-familiarity-with-the-municipalitys')}</p>
            <a href="https://quiz.bettermati.org/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5">
              {t('home-take-the-quiz')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>

      <VolunteerDialog />
    </>
  );
}
