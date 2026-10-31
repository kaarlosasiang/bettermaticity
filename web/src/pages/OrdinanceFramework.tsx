import { BookMarked } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { useLanguage } from '@/hooks/useLanguage';
import { Band, PageHeader } from '@/components/primitives';
import { ordinances } from '@/lib/govData';
import { LegislativeRecords, LegislativeLegalSource } from '@/components/LegislativeRecords';

const ordinanceCategories = [
  'ord-cat-revenue',
  'ord-cat-business',
  'ord-cat-safety',
  'ord-cat-environment',
  'ord-cat-traffic',
  'ord-cat-zoning',
];

export default function OrdinanceFramework() {
  const { t } = useLanguage();

  return (
    <>
      <Seo
        title={t('ord-page-title')}
        description="City ordinances enacted by the Sangguniang Panlungsod of Mati."
        canonicalPath="/legislative/ordinance-framework"
      />

      <PageHeader
        badge={
          <>
            <BookMarked className="size-4" aria-hidden="true" />
            {t('nav-legislative')}
          </>
        }
        breadcrumb={[
          { label: t('nav-home'), to: '/' },
          { label: t('nav-government'), to: '/government' },
          { label: t('nav-legislative'), to: '/legislative' },
          { label: t('ord-page-title') },
        ]}
        title={t('ord-page-title')}
        description={t('ord-page-desc')}
      />

      <Band id="what-is" eyebrow={t('nav-legislative')} title={t('ord-what-is')}>
        <div className="mt-4 max-w-3xl space-y-3 text-[0.9375rem] leading-7 text-ink-soft">
          <p>{t('ord-what-is-p1')}</p>
          <p>{t('ord-what-is-p2')}</p>
        </div>
        <LegislativeLegalSource resolution={false} />
      </Band>

      <Band id="categories" title={t('ord-categories-title')}>
        <ul className="mt-5 flex flex-wrap gap-2">
          {ordinanceCategories.map((k) => (
            <li
              key={k}
              className="border border-line bg-surface-subtle px-3 py-1.5 text-sm font-medium text-heading"
            >
              {t(k)}
            </li>
          ))}
        </ul>
      </Band>

      <LegislativeRecords kind="ordinances" rows={ordinances} />
    </>
  );
}
