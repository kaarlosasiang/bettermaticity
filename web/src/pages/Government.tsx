import {
  UserRound,
  ArrowRight,
  Landmark,
  MapPin,
  Mail,
  Phone,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
import { officials, officialsAreDraft, type Official } from '@/lib/govData';
import { departments, spMembers } from '@/lib/govDirectory';
import matiBarangays from '@data/mati/dist/mati_barangays.min.json';

const barangays: string[] = (matiBarangays as { features: { properties: { barangay: string } }[] }).features
  .map((f) => f.properties.barangay)
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b));

function ExecutiveCard({ official, role }: { official: Official; role: string }) {
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
      <p className="mb-3 font-semibold text-primary">{official.title || role}</p>
      <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
        {official.email && (
          <a href={`mailto:${official.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
            <Mail className="size-3.5" aria-hidden="true" /> {official.email}
          </a>
        )}
        {official.phone && (
          <a href={`tel:${official.tel ?? official.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary">
            <Phone className="size-3.5" aria-hidden="true" /> {official.phone}
          </a>
        )}
        {official.hours && (
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" /> {official.hours}
          </span>
        )}
      </div>
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

      {/* Executive Branch */}
      <Section>
        <Container>
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t('gov-executive-branch')}
          </span>
          <SectionTitle>{t('gov-executive')}</SectionTitle>
          <p className="-mt-4 mb-6 text-[0.8125rem] text-muted-foreground">
            The executive officials leading Mati's governance
          </p>
          {officialsAreDraft && (
            <p className="mb-6 rounded-md border border-brand-accent/30 bg-brand-accent/5 px-4 py-3 text-sm text-muted-foreground">
              Placeholder data — to be replaced with the current officials of the City of Mati.
            </p>
          )}
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {officials.mayor && <ExecutiveCard official={officials.mayor} role="City Mayor" />}
            {officials.vice_mayor && <ExecutiveCard official={officials.vice_mayor} role="City Vice Mayor" />}
          </div>
        </Container>
      </Section>

      {/* Sangguniang Panlungsod */}
      <Section compact altBg>
        <Container>
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t('gov-legislative-branch')}
          </span>
          <SectionTitle>{t('gov-sb-members')}</SectionTitle>
          <p className="-mt-4 mb-6 text-[0.8125rem] text-muted-foreground">{t('gov-sb-subtitle')}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spMembers.map((m) => (
              <div key={m.nameKey} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">{t(m.nameKey)}</h3>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                  {m.roleKey ? t(m.roleKey) : m.role ?? t('gov-sb-member')}
                </p>
                <p className="m-0 text-[0.8125rem] text-muted-foreground">{t(m.committeesKey)}</p>
              </div>
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

      {/* Department Heads & Key Offices */}
      <Section compact>
        <Container>
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t('gov-municipal-offices')}
          </span>
          <SectionTitle>{t('gov-departments')}</SectionTitle>
          <p className="-mt-4 mb-6 text-[0.8125rem] text-muted-foreground">{t('gov-dept-subtitle')}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <div key={(d.titleKey ?? d.title) + d.descKey} className="flex flex-col rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <d.Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{d.titleKey ? t(d.titleKey) : d.title}</h3>
                </div>
                <p className="mb-3 flex-1 text-[0.8125rem] text-muted-foreground">{t(d.descKey)}</p>
                <div className="flex flex-col gap-1 text-[0.8125rem] text-muted-foreground">
                  <a href={`tel:${d.tel}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                    <Phone className="size-3.5" aria-hidden="true" /> {d.phone}
                  </a>
                  {d.emailKey && (
                    <a href={`mailto:${t(d.emailKey)}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                      <Mail className="size-3.5" aria-hidden="true" /> {t(d.emailKey)}
                    </a>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-4 border-t border-border pt-3">
                  <AppLink to={d.to} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {t('gov-view-services')}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </AppLink>
                  {d.jobUrl && (
                    <a href={d.jobUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {t('gov-view-job-vacancies')}
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Barangays */}
      <Section compact altBg>
        <Container>
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t('gov-barangay-units')}
          </span>
          <SectionTitle>{t('gov-barangays')}</SectionTitle>
          <p className="-mt-4 mb-6 text-[0.8125rem] text-muted-foreground">
            {barangays.length} barangays comprise the City of Mati.
          </p>
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
