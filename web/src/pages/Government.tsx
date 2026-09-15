import type { LucideIcon } from 'lucide-react';
import {
  UserRound,
  ArrowRight,
  Landmark,
  FileText,
  Coins,
  Users,
  ClipboardList,
  House,
  Calculator,
  PiggyBank,
  HeartPulse,
  TriangleAlert,
  Store,
  Package,
  MapPin,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
import { officials, officialsAreDraft, type Official } from '@/lib/govData';
import matiBarangays from '@data/mati/dist/mati_barangays.min.json';

const barangays: string[] = (matiBarangays as { features: { properties: { barangay: string } }[] }).features
  .map((f) => f.properties.barangay)
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b));

const departments: { to: string; Icon: LucideIcon; titleKey: string; title?: string }[] = [
  { to: '/service-details/municipal-civil-registrar', Icon: FileText, titleKey: 'gov-municipal-civil-registrar' },
  { to: '/service-details/municipal-treasurer', Icon: Coins, titleKey: 'gov-municipal-treasurers-office' },
  { to: '/service-details/mswdo-services', Icon: Users, titleKey: '', title: 'City Social Welfare & Development Office' },
  { to: '/service-details/municipal-planning', Icon: ClipboardList, titleKey: 'gov-municipal-planning-development' },
  { to: '/service-details/municipal-assessor', Icon: House, titleKey: 'gov-municipal-assessors-office' },
  { to: '/service-details/municipal-accounting', Icon: Calculator, titleKey: 'gov-municipal-accounting-office' },
  { to: '/service-details/municipal-budget', Icon: PiggyBank, titleKey: 'gov-municipal-budget-office' },
  { to: '/services/health', Icon: HeartPulse, titleKey: 'gov-municipal-health-office' },
  { to: '/services/public-safety', Icon: TriangleAlert, titleKey: '', title: 'MDRRMO & Public Safety' },
  { to: '/service-details/seedo-public-market', Icon: Store, titleKey: 'gov-seedo-public-market' },
  { to: '/service-details/seedo-slaughterhouse', Icon: Package, titleKey: 'gov-seedo-slaughterhouse' },
];

function OfficialCard({ official, role }: { official: Official; role: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center transition hover:shadow-sm">
      <div className="mx-auto mb-4 flex size-24 items-center justify-center overflow-hidden rounded-full bg-muted">
        {official.image ? (
          <img src={`/${official.image.replace(/^\/+/, '')}`} alt={official.name} className="size-full object-cover" loading="lazy" />
        ) : (
          <UserRound className="size-12 text-muted-foreground" aria-hidden="true" />
        )}
      </div>
      <h3 className="text-base font-semibold text-foreground">{official.name}</h3>
      <p className="font-semibold text-primary">{official.title || role}</p>
    </div>
  );
}

export default function Government() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('gov-title')}
        description="Government structure and officials of the City of Mati, Davao Oriental."
        canonicalPath="/government"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">{t('nav-home')}</AppLink>
          <span>/</span>
          <span aria-current="page">{t('gov-government')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Landmark className="size-4" aria-hidden="true" />
            {t('gov-government')}
          </>
        }
        title={t('gov-title')}
        description={t('gov-subtitle')}
      />

      {/* City Leadership */}
      <Section>
        <Container>
          <SectionTitle>{t('gov-executive')}</SectionTitle>
          {officialsAreDraft && (
            <p className="mb-6 rounded-md border border-brand-accent/30 bg-brand-accent/5 px-4 py-3 text-sm text-muted-foreground">
              Placeholder data — to be replaced with the current officials of the City of Mati.
            </p>
          )}
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {officials.mayor && <OfficialCard official={officials.mayor} role="City Mayor" />}
            {officials.vice_mayor && <OfficialCard official={officials.vice_mayor} role="City Vice Mayor" />}
          </div>
        </Container>
      </Section>

      {/* Sangguniang Panlungsod */}
      {officials.councilors && officials.councilors.length > 0 && (
        <Section compact altBg>
          <Container>
            <SectionTitle>{t('gov-sb-members')}</SectionTitle>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
              {officials.councilors.map((c, i) => (
                <OfficialCard key={`${c.name}-${i}`} official={c} role="SP Member" />
              ))}
            </div>
            <div className="mt-6">
              <AppLink to="/government/officials" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {t('officials-elected-officials')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </AppLink>
            </div>
          </Container>
        </Section>
      )}

      {/* Departments */}
      <Section compact>
        <Container>
          <SectionTitle>{t('gov-departments')}</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <AppLink
                key={d.to}
                to={d.to}
                className="group flex items-center gap-4 rounded-[10px] border border-border bg-card p-4 no-underline transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <d.Icon className="size-5" aria-hidden="true" />
                </div>
                <span className="flex-1 text-sm font-semibold text-foreground">
                  {d.titleKey ? t(d.titleKey) : d.title}
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
              </AppLink>
            ))}
          </div>
        </Container>
      </Section>

      {/* Barangays */}
      <Section compact altBg>
        <Container>
          <SectionTitle>{t('gov-barangays')}</SectionTitle>
          <p className="mb-4 text-sm text-muted-foreground">{barangays.length} barangays comprise the City of Mati.</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
            {barangays.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-r-md border-l-[3px] border-l-primary bg-card px-3 py-2.5 text-[0.8125rem] font-medium text-foreground"
              >
                <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                {name}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
