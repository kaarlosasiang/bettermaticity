import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, Eyebrow, heroClasses } from '@/components/primitives';

// In-app 404 for client-side navigation to an unknown path (and dev/preview hosts).
// Apache serves the static 404.html for direct hits in production; both read alike.
export default function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <Seo title={t('notfound-title')}>
        <meta name="robots" content="noindex" />
      </Seo>
      <section className="border-b border-line bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <Eyebrow>{t('notfound-eyebrow')}</Eyebrow>
          <h1 className={heroClasses.title}>{t('notfound-title')}</h1>
          <p className={`${heroClasses.lede} max-w-xl`}>{t('notfound-lede')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AppLink
              to="/"
              className="inline-flex h-11 items-center gap-2 rounded-btn bg-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              {t('notfound-home')}
            </AppLink>
            <AppLink
              to="/sitemap"
              className="inline-flex h-11 items-center gap-2 rounded-btn border border-line bg-white px-5 text-sm font-semibold text-royal transition-colors hover:border-royal"
            >
              {t('notfound-index')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </AppLink>
          </div>
        </Container>
      </section>
    </>
  );
}
