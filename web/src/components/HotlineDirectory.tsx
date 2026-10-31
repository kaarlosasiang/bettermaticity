import { Phone, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import {
  hotlineIcon,
  hotlineProvenance,
  nationalHotline,
  primaryNumber,
  type Hotline,
} from '@/lib/hotlines';

type Tone = 'emergency' | 'medical';

const toneClass: Record<Tone, string> = {
  emergency: 'text-red-700',
  medical: 'text-royal',
};

/**
 * One office: its name and every number published for it. Each number is its own
 * `tel:` link, so a caller can try the next line when the first is busy — which
 * is the normal case during an actual emergency.
 */
function HotlineCard({
  hotline,
  Icon,
  tone,
  compact,
}: {
  hotline: Hotline;
  Icon: LucideIcon;
  tone: Tone;
  compact?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        'flex min-w-0 gap-3 border-r border-b border-line bg-white',
        compact ? 'p-4' : 'p-5'
      )}
    >
      <Icon className={cn('mt-0.5 size-5 shrink-0', toneClass[tone])} aria-hidden="true" />
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-balance text-heading">
          {t(hotline.nameKey, { defaultValue: hotline.name })}
        </h3>
        <ul className="mt-1.5 flex flex-col gap-0.5">
          {hotline.numbers.map((n) => (
            <li key={n.tel}>
              <a
                href={`tel:${n.tel}`}
                className="font-mono text-sm text-ink-soft tabular-nums hover:text-royal hover:underline"
              >
                {n.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// A hairline grid of offices: the grid draws the top and left edges and each cell its
// right and bottom, so a short last row leaves no filled gap.
export function HotlineGrid({
  hotlines,
  tone,
  compact,
}: {
  hotlines: Hotline[];
  tone: Tone;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'grid border-t border-l border-line',
        compact
          ? 'grid-cols-[repeat(auto-fill,minmax(260px,1fr))]'
          : 'grid-cols-[repeat(auto-fill,minmax(280px,1fr))]'
      )}
    >
      {hotlines.map((h) => (
        <HotlineCard
          key={h.id}
          hotline={h}
          Icon={hotlineIcon(h.icon)}
          tone={tone}
          compact={compact}
        />
      ))}
    </div>
  );
}

/** 911 — shown above every hotline directory, since it reaches all services. */
export function NationalHotlineBanner() {
  const { t } = useLanguage();
  const n = primaryNumber(nationalHotline);

  return (
    <a
      href={`tel:${n.tel}`}
      className="mb-6 flex items-center gap-4 border border-red-200 bg-red-50/60 p-5 text-red-950 transition-colors hover:border-red-400"
    >
      <Phone className="size-5 shrink-0 text-red-700" aria-hidden="true" />
      <span className="text-sm font-bold">
        {t(nationalHotline.nameKey, { defaultValue: nationalHotline.name })}
      </span>
      <span className="ml-auto text-2xl font-extrabold tracking-tight tabular-nums">
        {n.display}
      </span>
    </a>
  );
}

/**
 * Where these numbers came from and when they were checked. Emergency numbers are
 * safety-critical, so the provenance ships with them rather than living only in
 * the repository.
 */
export function HotlineSourceNote() {
  const { t } = useLanguage();

  return (
    <p className="mt-4 text-xs leading-5 text-ink-muted">
      {t('hotline-source-prefix', { defaultValue: 'Source:' })}{' '}
      <a
        href={hotlineProvenance.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-royal"
      >
        {hotlineProvenance.sourceTitle}
      </a>{' '}
      — {hotlineProvenance.source}. {t('hotline-source-checked', { defaultValue: 'Checked' })}{' '}
      {hotlineProvenance.verifiedOn}.
    </p>
  );
}
