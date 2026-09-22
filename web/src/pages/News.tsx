import { Newspaper, ArrowRight, ExternalLink } from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa6';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Section, SectionTitle, PageHeader } from '@/components/primitives';
import {
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
  fadeUp,
  staggerContainer,
  revealViewport,
} from '@/components/motion';
import { useNews, formatNewsDate, safeNewsUrl, type NewsBadge } from '@/hooks/useNews';

const badgeClass: Record<NewsBadge, string> = {
  info: 'bg-[#eef4fe] text-[#2b62ee]',
  success: 'bg-[#06a77d]/10 text-[#06a77d]',
  warning: 'bg-[#f77f00]/10 text-[#a37400]',
};

export default function News() {
  const { t } = useLanguage();
  const { items, loading } = useNews();

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Seo
          title={t('news-news-updates')}
          description="Latest news, advisories, and announcements from the City of Mati."
          canonicalPath="/news"
        />

        <Container>
          <nav
            className="flex items-center gap-2 py-4 text-sm text-[#4c5c78]"
            aria-label="Breadcrumb"
          >
            <AppLink to="/" className="hover:text-[#2b62ee]">
              {t('nav-home')}
            </AppLink>
            <span>/</span>
            <span aria-current="page">{t('news-news-updates')}</span>
          </nav>
        </Container>

        <PageHeader
          badge={
            <>
              <Newspaper className="size-3.5" aria-hidden="true" />
              {t('news-news-updates')}
            </>
          }
          title={t('news-news-updates')}
          description={t('news-updates-subtitle')}
        />

        <Section>
          <Container>
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-44 animate-pulse rounded-xl bg-[#eef4fe]" />
                ))}
              </div>
            ) : items && items.length > 0 ? (
              <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {items.map((a) => {
                  const url = safeNewsUrl(a.url);
                  return (
                    <m.article
                      key={a.id}
                      variants={fadeUp}
                      className="flex flex-col rounded-xl border-t-[3px] border-[#2b62ee] bg-white p-6 shadow-[0_0_0_1px_rgba(18,60,122,0.07)]"
                    >
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass[a.badge] ?? badgeClass.info}`}
                        >
                          {a.category}
                        </span>
                        <span className="font-mono text-[0.6875rem] text-[#4c5c78]">
                          {formatNewsDate(a.date)}
                        </span>
                      </div>
                      <h3 className="mb-2 font-display text-base font-bold text-[#123c7a]">
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#2b62ee]"
                          >
                            {a.title}
                          </a>
                        ) : (
                          a.title
                        )}
                      </h3>
                      <p className="mb-4 flex-1 text-sm text-[#4c5c78]">{a.summary}</p>
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b62ee] hover:underline"
                        >
                          {a.source || t('news-read-more')}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </a>
                      )}
                    </m.article>
                  );
                })}
              </m.div>
            ) : (
              <div className="rounded-xl bg-white p-10 text-center shadow-[0_0_0_1px_rgba(18,60,122,0.07)]">
                <Newspaper className="mx-auto mb-3 size-8 text-[#4c5c78]" aria-hidden="true" />
                <h3 className="font-display text-base font-bold text-[#123c7a]">
                  {t('news-no-updates-yet')}
                </h3>
                <p className="text-sm text-[#4c5c78]">{t('news-check-back')}</p>
              </div>
            )}
          </Container>
        </Section>

        {/* From our Facebook Page */}
        <Section compact altBg>
          <Container>
            <SectionTitle>
              <FaFacebookF className="size-4 text-[#2b62ee]" aria-hidden="true" />
              {t('news-from-our-facebook')}
            </SectionTitle>
            <p className="-mt-3 mb-5 text-[0.8125rem] text-[#4c5c78]">{t('news-latest-posts')}</p>
            <div className="overflow-hidden rounded-xl shadow-[0_0_0_1px_rgba(18,60,122,0.07)]">
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
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b62ee] hover:underline"
            >
              {t('news-visit-facebook')}
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </Container>
        </Section>
      </MotionConfig>
    </LazyMotion>
  );
}
