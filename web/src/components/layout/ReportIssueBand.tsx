import { useLocation } from 'react-router-dom';
import { ExternalLink, Flag } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Container, Eyebrow } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';

const REPO = 'https://github.com/kaarlosasiang/bettermaticity';

// Site-wide closing band above the footer (BetterSanFernando pattern). The issue link
// carries only the current path, which is fixed per prerendered page, so the static
// HTML and the hydrated page agree.
export default function ReportIssueBand() {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const issueUrl = `${REPO}/issues/new?title=${encodeURIComponent(`Data issue: ${pathname}`)}`;
  return (
    <section className="bg-royal text-white" aria-labelledby="report-band-title">
      <Container className="flex flex-col gap-6 py-11 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <Eyebrow tone="dark">{t('report-band-eyebrow')}</Eyebrow>
          <h2
            id="report-band-title"
            className="mt-1.5 font-display text-2xl font-extrabold tracking-[-0.02em] sm:text-[1.75rem]"
          >
            {t('report-band-title')}
          </h2>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-white/85">
            {t('report-band-lede')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-btn bg-white px-4 text-sm font-semibold text-royal transition-colors hover:bg-royal-tint"
          >
            <Flag className="size-4" aria-hidden="true" /> {t('report-band-cta-issue')}
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-btn border border-white/40 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <FaGithub className="size-4" aria-hidden="true" /> {t('report-band-cta-github')}
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
