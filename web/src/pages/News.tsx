import { Newspaper, ArrowRight, ExternalLink } from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa6';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
import { useNews, formatNewsDate, safeNewsUrl, type NewsBadge } from '@/hooks/useNews';

const badgeClass: Record<NewsBadge, string> = {
  info: 'bg-primary/10 text-primary',
  success: 'bg-brand-success/10 text-brand-success',
  warning: 'bg-brand-accent/10 text-brand-accent',
};

export default function News() {
  const { t } = useLanguage();
  const { items, loading } = useNews();

  return (
    <>
      <Seo
        title={t('news-news-updates')}
        description="Latest news, advisories, and announcements from the City of Mati."
        canonicalPath="/news"
      />

      <Container>
        <nav className="flex items-center gap-2 py-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <AppLink to="/" className="hover:text-primary">{t('nav-home')}</AppLink>
          <span>/</span>
          <span aria-current="page">{t('news-news-updates')}</span>
        </nav>
      </Container>

      <PageHeader
        badge={
          <>
            <Newspaper className="size-4" aria-hidden="true" />
            {t('news-news-updates')}
          </>
        }
        title={t('news-news-updates')}
        description="Latest advisories and announcements from the City of Mati."
      />

      <Section>
        <Container>
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-44 animate-pulse rounded-xl border border-border bg-muted" />
              ))}
            </div>
          ) : items && items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => {
                const url = safeNewsUrl(a.url);
                return (
                  <article key={a.id} className="flex flex-col rounded-xl border border-border bg-card p-6">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass[a.badge] ?? badgeClass.info}`}>
                        {a.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatNewsDate(a.date)}</span>
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-foreground">
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                          {a.title}
                        </a>
                      ) : (
                        a.title
                      )}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{a.summary}</p>
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                      >
                        {a.source || 'Read more'}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <Newspaper className="mx-auto mb-3 size-8 text-muted-foreground" aria-hidden="true" />
              <h3 className="text-base font-semibold text-foreground">No updates yet</h3>
              <p className="text-sm text-muted-foreground">
                Check back soon for the latest news and advisories from Mati.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* From our Facebook Page */}
      <Section compact altBg>
        <Container>
          <SectionTitle>
            <FaFacebookF className="size-4 text-primary" aria-hidden="true" />
            From our Facebook Page
          </SectionTitle>
          <p className="-mt-4 mb-5 text-[0.8125rem] text-muted-foreground">
            The latest posts published by the Official LGU Mati Facebook Page.
          </p>
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="LGU Mati Facebook"
              className="h-[500px] w-full"
              loading="lazy"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FOfficialLGUMati%2F&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
            />
          </div>
          <a
            href="https://www.facebook.com/OfficialLGUMati/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Visit the Official LGU Mati Facebook Page
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </Container>
      </Section>
    </>
  );
}
