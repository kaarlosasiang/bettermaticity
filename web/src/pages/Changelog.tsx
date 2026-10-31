import { ArrowUpRight, History } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, PageHeader } from '@/components/primitives';
import { entries, formatChangeDate, type ChangeType } from '@/lib/changelog';

const COMMITS_URL = 'https://github.com/kaarlosasiang/bettermaticity/commits/main';

const BADGE: Record<ChangeType, string> = {
  new: 'bg-royal-tint text-royal',
  improved: 'bg-surface-subtle text-heading',
  fixed: 'bg-feel-tint text-feel-text',
};

// Changelog, in the site-index layout: a hero with an "about this log" aside, then one
// ruled row per dated entry (date + version on the left, title and typed changes on the
// right). Entries come from data/changelog.json.
export default function Changelog() {
  const { t, language } = useLanguage();

  return (
    <>
      <Seo
        title={t('changelog-title')}
        description="What has changed on BetterMati.org, newest first: new pages, improvements and fixes."
        canonicalPath="/changelog"
      />

      <PageHeader
        badge={
          <>
            <History className="size-4" aria-hidden="true" />
            {t('changelog-eyebrow')}
          </>
        }
        breadcrumb={[{ label: t('nav-home'), to: '/' }, { label: t('changelog-title') }]}
        title={t('changelog-title')}
        description={t('changelog-lede')}
        meta={[
          t('changelog-count', { count: entries.length }),
          t('changelog-last-updated', { date: formatChangeDate(entries[0].date, language) }),
        ]}
        aside={{
          label: t('changelog-about-label'),
          body: t('changelog-about-body'),
          footer: (
            <a
              href={COMMITS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-royal hover:underline"
            >
              {t('changelog-github')}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ),
        }}
      />

      <section className="bg-white py-10 sm:py-12 lg:py-16" aria-label={t('changelog-title')}>
        <Container>
          <div className="divide-y divide-line border-y border-line">
            {entries.map((entry) => (
              <article
                key={entry.date}
                aria-labelledby={`changelog-${entry.date}`}
                className="py-8 sm:py-10 lg:grid lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3 lg:mb-0 lg:flex-col lg:items-start lg:gap-2">
                  <time dateTime={entry.date} className="text-sm font-bold text-heading">
                    {formatChangeDate(entry.date, language)}
                  </time>
                  {entry.version && (
                    <span className="border border-line px-2 py-0.5 font-mono text-xs text-ink-muted">
                      v{entry.version}
                    </span>
                  )}
                </div>
                <div>
                  <h2
                    id={`changelog-${entry.date}`}
                    className="text-xl font-bold tracking-[-0.02em] text-heading sm:text-2xl"
                  >
                    {entry.title}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {entry.changes.map((change) => (
                      <li key={change.text} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 inline-flex w-[5.75rem] shrink-0 justify-center px-2 py-0.5 font-mono text-[0.6875rem] font-semibold tracking-[0.08em] uppercase ${BADGE[change.type]}`}
                        >
                          {t(`changelog-type-${change.type}`)}
                        </span>
                        <span className="text-sm leading-6 text-ink-soft">{change.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
