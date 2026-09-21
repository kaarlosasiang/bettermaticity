import type { ReactNode } from 'react';
import { Landmark } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { useLanguage } from '@/hooks/useLanguage';
import { Container } from '@/components/primitives';
import {
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
  fadeUp,
  staggerContainer,
  revealViewport,
} from '@/components/motion';
import { OfficialCard } from '@/components/OfficialCard';
import { officials, officialsAreDraft } from '@/lib/govData';

function SectionHead({ children }: { children: ReactNode }) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="mb-[18px] flex items-center gap-3.5"
    >
      <span className="h-[26px] w-1 rounded bg-[#2b62ee]" aria-hidden="true" />
      <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]">
        {children}
      </h2>
    </m.div>
  );
}

export default function GovernmentOfficials() {
  const { t } = useLanguage();

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Seo
          title={t('officials-elected-officials')}
          description="The elected officials of the City of Mati, Davao Oriental."
          canonicalPath="/government/officials"
        />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-[#123c7a] py-12 lg:py-16">
          <Container>
            <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-2xl">
              <m.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.08em] text-[#9dc0ff]"
              >
                <Landmark className="size-3.5" aria-hidden="true" />
                {t('gov-government')}
              </m.span>
              <m.h1
                variants={fadeUp}
                className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.75rem]"
              >
                {t('officials-elected-officials')}
              </m.h1>
              <m.p variants={fadeUp} className="mt-3 text-base leading-relaxed text-white/75">
                {t('gov-subtitle')}
              </m.p>
            </m.div>
          </Container>
        </section>

        {/* ── Executive Branch ─────────────────────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            {officialsAreDraft && (
              <p
                role="note"
                className="mb-6 rounded-xl border-l-[3px] border-[#ffc001] bg-[#fffbef] px-4 py-3 text-sm text-[#8a6200]"
              >
                {t('gov-officials-note')}
              </p>
            )}
            <SectionHead>{t('gov-executive-branch')}</SectionHead>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2"
            >
              {officials.mayor && <OfficialCard official={officials.mayor} role="City Mayor" />}
              {officials.vice_mayor && (
                <OfficialCard official={officials.vice_mayor} role="City Vice Mayor" />
              )}
            </m.div>
          </Container>
        </section>

        {/* ── Sangguniang Panlungsod ───────────────────────────────────────── */}
        {officials.councilors && officials.councilors.length > 0 && (
          <section className="bg-[#f1f6fc] py-12">
            <Container>
              <SectionHead>{t('gov-sb-members')}</SectionHead>
              <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4"
              >
                {officials.councilors.map((c, i) => (
                  <OfficialCard key={`${c.name}-${i}`} official={c} role="City Councilor" />
                ))}
              </m.div>
              <div className="mt-6">
                <AppLink
                  to="/government"
                  className="text-sm font-semibold text-[#2b62ee] hover:underline"
                >
                  ← {t('nav-government')}
                </AppLink>
              </div>
            </Container>
          </section>
        )}
      </MotionConfig>
    </LazyMotion>
  );
}
