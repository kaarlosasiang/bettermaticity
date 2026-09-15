import { UserRound } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, PageHeader } from '@/components/primitives';
import { officials, officialsAreDraft, type Official } from '@/lib/govData';

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

export default function GovernmentOfficials() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title="Elected Officials"
        description="The elected officials of the City of Mati, Davao Oriental."
        canonicalPath="/government/officials"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">{t('nav-home')}</AppLink>
          <span>/</span>
          <AppLink to="/government" className="hover:text-primary">{t('nav-government')}</AppLink>
          <span>/</span>
          <span aria-current="page">{t('officials-elected-officials')}</span>
        </nav>
      </Container>

      <PageHeader
        title={t('officials-elected-officials')}
        description="The elected leadership of the City of Mati, Davao Oriental."
      />

      <Section>
        <Container>
          {officialsAreDraft && (
            <p className="mb-6 rounded-md border border-brand-accent/30 bg-brand-accent/5 px-4 py-3 text-sm text-muted-foreground">
              Placeholder data — to be replaced with the current elected officials of the City of Mati.
            </p>
          )}

          <div className="mx-auto mb-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {officials.mayor && <OfficialCard official={officials.mayor} role="City Mayor" />}
            {officials.vice_mayor && <OfficialCard official={officials.vice_mayor} role="City Vice Mayor" />}
          </div>

          {officials.councilors && officials.councilors.length > 0 && (
            <>
              <h2 className="mb-6 text-center text-[1.375rem] font-semibold text-foreground">
                Sangguniang Panlungsod Members
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
                {officials.councilors.map((c, i) => (
                  <OfficialCard key={`${c.name}-${i}`} official={c} role="SP Member" />
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
