import type { ReactNode } from 'react';
import { ArrowRight, Landmark, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
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
import { departments } from '@/lib/govDirectory';
import { barangayData, barangayCount, totalPopulation } from '@/lib/statsData';
import matiBarangays from '@data/mati/dist/mati_barangays.min.json';

const CARD = 'rounded-xl bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)]';

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');
const popByName = new Map(barangayData.map((b) => [norm(b.name), b.pop]));

const barangays: { name: string; pop: number | null }[] = (
  matiBarangays as { features: { properties: { barangay: string } }[] }
).features
  .map((f) => f.properties.barangay)
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({ name, pop: popByName.get(norm(name)) ?? null }));

function SectionHead({ eyebrow, children }: { eyebrow?: ReactNode; children: ReactNode }) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="mb-[18px] flex items-center gap-3.5"
    >
      <span className="h-[26px] w-1 rounded bg-[#2b62ee]" aria-hidden="true" />
      <div>
        {eyebrow && (
          <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.06em] text-[#2b62ee]">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-[#123c7a]">
          {children}
        </h2>
      </div>
    </m.div>
  );
}

function DraftNote({ children }: { children: ReactNode }) {
  return (
    <p
      role="note"
      className="mb-6 rounded-xl border-l-[3px] border-[#ffc001] bg-[#fffbef] px-4 py-3 text-sm text-[#8a6200]"
    >
      {children}
    </p>
  );
}

export default function Government() {
  const { t } = useLanguage();

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <Seo
          title={t('gov-title')}
          description="Government structure and officials of the City of Mati, Davao Oriental."
          canonicalPath="/government"
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
                {t('gov-title')}
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
            <SectionHead eyebrow={t('gov-executive-branch')}>{t('gov-executive')}</SectionHead>
            {officialsAreDraft && <DraftNote>{t('gov-officials-note')}</DraftNote>}
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

        {/* ── Sangguniang Panlungsod (real councilors) ─────────────────────── */}
        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <SectionHead eyebrow={t('gov-legislative-branch')}>{t('gov-sb-members')}</SectionHead>
            <p className="-mt-2 mb-5 text-[0.8125rem] text-[#4c5c78]">{t('gov-sb-subtitle')}</p>
            {officials.councilors && officials.councilors.length > 0 && (
              <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {officials.councilors.map((c, i) => (
                  <OfficialCard key={`${c.name}-${i}`} official={c} role="City Councilor" />
                ))}
              </m.div>
            )}
            <div className="mt-6">
              <AppLink
                to="/government/officials"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b62ee] hover:underline"
              >
                {t('officials-elected-officials')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </AppLink>
            </div>
          </Container>
        </section>

        {/* ── Department Heads & Key Offices ───────────────────────────────── */}
        <section className="bg-white py-12">
          <Container>
            <SectionHead eyebrow={t('gov-municipal-offices')}>{t('gov-departments')}</SectionHead>
            <p className="-mt-2 mb-5 text-[0.8125rem] text-[#4c5c78]">{t('gov-dept-subtitle')}</p>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {departments.map((d) => (
                <m.div
                  key={(d.titleKey ?? d.title) + d.descKey}
                  variants={fadeUp}
                  className={`flex flex-col ${CARD} p-5`}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#eef4fe] text-[#2b62ee]">
                      <d.Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-[#123c7a]">
                      {d.titleKey ? t(d.titleKey) : d.title}
                    </h3>
                  </div>
                  <p className="mb-3 flex-1 text-[0.8125rem] text-[#4c5c78]">{t(d.descKey)}</p>
                  <div className="flex flex-col gap-1 text-[0.8125rem] text-[#4c5c78]">
                    <a href={`tel:${d.tel}`} className="inline-flex items-center gap-1.5 hover:text-[#2b62ee]">
                      <Phone className="size-3.5" aria-hidden="true" /> {d.phone}
                    </a>
                    {d.emailKey && (
                      <a
                        href={`mailto:${t(d.emailKey)}`}
                        className="inline-flex items-center gap-1.5 hover:text-[#2b62ee]"
                      >
                        <Mail className="size-3.5" aria-hidden="true" /> {t(d.emailKey)}
                      </a>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-4 border-t border-[#e3e8ef] pt-3">
                    <AppLink
                      to={d.to}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b62ee] hover:underline"
                    >
                      {t('gov-view-services')}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </AppLink>
                    {d.jobUrl && (
                      <a
                        href={d.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2b62ee] hover:underline"
                      >
                        {t('gov-view-job-vacancies')}
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </m.div>
              ))}
            </m.div>
          </Container>
        </section>

        {/* ── Barangays ────────────────────────────────────────────────────── */}
        <section className="bg-[#f1f6fc] py-12">
          <Container>
            <SectionHead eyebrow={t('gov-barangay-units')}>{t('gov-barangays')}</SectionHead>
            <p className="-mt-2 mb-5 text-[0.8125rem] text-[#4c5c78]">
              {barangayCount} {t('gov-barangays')} · {totalPopulation.toLocaleString()}{' '}
              {t('gov-residents')}
            </p>
            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5"
            >
              {barangays.map((b) => (
                <m.div
                  key={b.name}
                  variants={fadeUp}
                  className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2.5 shadow-[0_0_0_1px_rgba(18,60,122,0.07)]"
                >
                  <span className="flex items-center gap-2 text-[0.8125rem] font-medium text-[#123c7a]">
                    <MapPin className="size-3.5 shrink-0 text-[#2b62ee]" aria-hidden="true" />
                    {b.name}
                  </span>
                  {b.pop != null && (
                    <span className="font-mono text-[0.6875rem] tabular-nums text-[#4c5c78]">
                      {b.pop.toLocaleString()}
                    </span>
                  )}
                </m.div>
              ))}
            </m.div>
          </Container>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}
