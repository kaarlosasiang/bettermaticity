import { useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { DirectoryList } from '@/components/DirectoryList';
import { OfficialChannels } from '@/components/OfficialChannels';
import { useLanguage } from '@/hooks/useLanguage';
import { Container, PageHeader, Section } from '@/components/primitives';
import { barangayData, barangayCount, statisticsSources, totalPopulation } from '@/lib/statsData';
import matiBarangays from '@data/mati/dist/mati_barangays.min.json';

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');
const popByName = new Map(barangayData.map((b) => [norm(b.name), b.pop]));

// Canonical names from the PSGC barangay layer, joined to the PSA 2024 populations.
const barangays: { name: string; pop: number | null }[] = (
  matiBarangays as { features: { properties: { barangay: string } }[] }
).features
  .map((f) => f.properties.barangay)
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({ name, pop: popByName.get(norm(name)) ?? null }));

// Barangay directory in the BetterSanFernando directory style.
export default function GovernmentBarangays() {
  const { t } = useLanguage();
  // Client-only filter; starts empty so every barangay is in the prerendered HTML.
  const [query, setQuery] = useState('');
  const q = norm(query);
  const visible = q ? barangays.filter((b) => norm(b.name).includes(q)) : barangays;
  const source = statisticsSources.psgc;

  return (
    <>
      <Seo
        title={t('gov-barangays')}
        description="The barangays of the City of Mati, Davao Oriental, with their 2024 census population."
        canonicalPath="/government/barangays"
      />

      <PageHeader
        badge={
          <>
            <MapPin className="size-4" aria-hidden="true" />
            {t('gov-barangays-eyebrow')}
          </>
        }
        title={t('gov-barangays')}
        description={t('gov-barangays-lede')}
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-government'), to: '/government' },
          { label: t('gov-link-barangays') },
        ]}
        stats={[
          { label: t('gov-stat-barangays'), value: barangayCount },
          { label: t('gov-stat-population'), value: totalPopulation.toLocaleString('en-US') },
          { label: t('gov-stat-source'), value: t('gov-source-value') },
        ]}
      />

      <Section>
        <Container>
          <DirectoryList
            id="barangays"
            eyebrow={t('gov-barangays-dir-eyebrow')}
            title={t('gov-barangays-find')}
            help={t('gov-barangays-help')}
            items={visible}
            total={barangays.length}
            query={query}
            onQueryChange={setQuery}
            searchPlaceholder={t('gov-barangays-search')}
            emptyText={t('gov-barangays-empty')}
            getKey={(b) => b.name}
            layout="grid"
            renderItem={(b) => (
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-semibold text-heading">
                  <MapPin className="size-4 shrink-0 text-royal" aria-hidden="true" />
                  {b.name}
                </span>
                {b.pop != null ? (
                  <span className="font-mono text-sm text-ink-muted tabular-nums">
                    {b.pop.toLocaleString('en-US')}
                    <span className="sr-only"> {t('gov-residents')}</span>
                  </span>
                ) : null}
              </div>
            )}
          />
          <p className="mt-4 text-sm text-ink-muted">
            {t('gov-barangays-source')}{' '}
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-royal underline decoration-royal/40 underline-offset-4 hover:decoration-royal"
            >
              {source.title}
              <ExternalLink className="size-3.5" aria-hidden="true" />
              <span className="sr-only"> ({t('service-new-tab')})</span>
            </a>
          </p>
        </Container>
      </Section>

      <OfficialChannels />
    </>
  );
}
