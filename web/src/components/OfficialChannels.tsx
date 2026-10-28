import { ArrowUpRight } from 'lucide-react';
import { AppLink } from '@/components/AppLink';
import { Container, Eyebrow, Section } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';

const secondary =
  'inline-flex h-10 items-center gap-1.5 rounded-btn border border-line bg-white px-4 text-sm font-semibold text-heading transition-colors hover:border-royal hover:text-royal';

// Closing band on the government pages (BetterSanFernando "Official channels"): send
// people to the City's own channels for anything formal or urgent.
export function OfficialChannels() {
  const { t } = useLanguage();
  return (
    <Section>
      <Container>
        <div className="grid gap-6 border border-line bg-surface-subtle p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
          <div className="max-w-xl">
            <p>
              <Eyebrow>{t('gov-channels-eyebrow')}</Eyebrow>
            </p>
            <h2 className="mt-2 font-display text-xl font-bold tracking-[-0.02em] text-heading sm:text-2xl">
              {t('gov-channels-title')}
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-muted">{t('gov-channels-text')}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:max-w-md">
            <AppLink
              to="/contact"
              className="inline-flex h-10 items-center gap-1.5 rounded-btn bg-royal px-4 text-sm font-semibold text-white transition-colors hover:bg-royal/90"
            >
              {t('gov-channels-contact')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </AppLink>
            {/* Plain <a>: a full load lands on the anchor (client-side links don't scroll to hashes). */}
            <a href="/contact#hotlines" className={secondary}>
              {t('gov-channels-hotlines')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <AppLink to="/legislative" className={secondary}>
              {t('gov-channels-legislative')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </AppLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
