import { ArrowLeft, ArrowRight, Check, MapPin } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { AppLink } from '@/components/AppLink';
import { ImageSlot } from '@/components/ImageSlot';
import { Container, Section } from '@/components/primitives';
import { getAttraction } from '@/lib/tourismData';

// OpenStreetMap embed centred on the attraction (same approach as Home's map).
function osmEmbed(lat: number, lng: number): string {
  const d = 0.03;
  const bbox = [lng - d, lat - d, lng + d, lat + d].join('%2C');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

/**
 * Shared renderer for a single Visit Mati attraction, resolved from the tourism
 * feed by slug. Mirrors the service-details/* -> ServiceGuide delegation pattern:
 * each attraction page is a one-liner that calls <AttractionDetail slug="..." />.
 */
export function AttractionDetail({ slug }: { slug: string }) {
  const a = getAttraction(slug);

  if (!a) {
    return (
      <Section>
        <Container>
          <p className="text-muted-foreground">Attraction not found.</p>
          <AppLink to="/visit-mati" className="mt-4 inline-block text-[#2b62ee] underline">
            Back to Visit Mati
          </AppLink>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <Seo
        title={`${a.name} · Visit Mati`}
        description={a.blurb}
        canonicalPath={`/visit-mati/${a.slug}`}
        type="article"
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[52vh] flex-col justify-end overflow-hidden bg-[#123c7a] text-white">
        <div className="absolute inset-0 -z-10">
          <ImageSlot label={a.imageLabel} src={a.image || undefined} />
        </div>
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,60,122,0.35)_0%,rgba(18,60,122,0.5)_45%,rgba(18,60,122,0.95)_100%)]"
          aria-hidden="true"
        />
        <Container>
          <div className="max-w-[720px] pt-24 pb-10">
            {a.badge ? (
              <span className="inline-flex h-[24px] items-center rounded-full bg-[#ffc001] px-3 text-xs font-bold text-[#123c7a]">
                {a.badge}
              </span>
            ) : (
              <span className="text-[0.8125rem] font-semibold text-[#ffc001]">{a.category}</span>
            )}
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-5xl">
              {a.name}
            </h1>
            <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-white/85">{a.tagline}</p>
          </div>
        </Container>
      </section>

      {/* Breadcrumb */}
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap gap-2 py-4 text-sm text-muted-foreground"
        >
          <AppLink to="/">Home</AppLink>
          <span aria-hidden="true">/</span>
          <AppLink to="/visit-mati">Visit Mati</AppLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{a.name}</span>
        </nav>
      </Container>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <Section compact>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Prose */}
            <div className="max-w-[68ch]">
              <p className="text-lg leading-relaxed text-[#4c5c78]">{a.blurb}</p>
              {a.sections.map((s) => (
                <div key={s.heading} className="mt-8">
                  <h2 className="mb-2 font-display text-2xl font-bold tracking-[-0.02em] text-[#123c7a]">
                    {s.heading}
                  </h2>
                  <p className="leading-relaxed text-[#4c5c78]">{s.body}</p>
                </div>
              ))}
            </div>

            {/* Aside: highlights + map */}
            <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
              <div className="rounded-xl border-t-2 border-[#ffc001] bg-white p-5 ring-1 ring-[#123c7a]/8">
                <h2 className="mb-3 font-display text-lg font-bold text-[#123c7a]">Highlights</h2>
                <ul className="space-y-2.5 text-sm leading-relaxed text-[#4c5c78]">
                  {a.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#2b62ee]" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {a.coords ? (
                <div className="overflow-hidden rounded-xl ring-1 ring-[#123c7a]/8">
                  <div className="flex items-center gap-2 bg-white px-4 py-3 text-sm font-semibold text-[#123c7a]">
                    <MapPin className="size-4 text-[#2b62ee]" aria-hidden="true" />
                    On the map
                  </div>
                  <iframe
                    title={`Map of ${a.name}`}
                    className="block h-56 w-full border-0"
                    loading="lazy"
                    src={osmEmbed(a.coords.lat, a.coords.lng)}
                  />
                </div>
              ) : null}
            </aside>
          </div>

          {/* Footer nav */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <AppLink
              to="/visit-mati"
              className="inline-flex items-center gap-2 font-display text-sm font-bold text-[#2b62ee]"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All attractions
            </AppLink>
            <AppLink
              to="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#123c7a] px-5 font-display text-sm font-bold text-white transition hover:brightness-110"
            >
              Plan your visit
              <ArrowRight className="size-4" aria-hidden="true" />
            </AppLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
