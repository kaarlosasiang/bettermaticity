import { Phone, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  hotlineIcon,
  hotlineProvenance,
  nationalHotline,
  primaryNumber,
  type Hotline,
} from '@/lib/hotlines';

type Tone = 'emergency' | 'medical';

const toneClass: Record<Tone, string> = {
  emergency: 'text-primary',
  medical: 'text-brand-accent',
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
      className={`flex gap-3 rounded-lg border border-border bg-card text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm ${
        compact ? 'p-4' : 'p-6'
      }`}
    >
      <Icon className={`mt-0.5 size-5 shrink-0 ${toneClass[tone]}`} aria-hidden="true" />
      <div className="min-w-0">
        <h3 className="m-0 text-sm font-semibold text-balance">
          {t(hotline.nameKey, { defaultValue: hotline.name })}
        </h3>
        <ul className="m-0 mt-1.5 flex list-none flex-col gap-0.5 p-0">
          {hotline.numbers.map((n) => (
            <li key={n.tel}>
              <a
                href={`tel:${n.tel}`}
                className="text-sm font-medium text-muted-foreground tabular-nums no-underline hover:text-primary hover:underline"
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
      className={`grid gap-4 ${
        compact
          ? 'grid-cols-[repeat(auto-fit,minmax(260px,1fr))]'
          : 'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'
      }`}
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
      className="mb-6 flex items-center gap-4 rounded-xl border border-[#dc2626] bg-[#fef2f2] p-5 text-[#7f1d1d] no-underline transition hover:shadow-sm"
    >
      <Phone className="size-6 shrink-0" aria-hidden="true" />
      <span className="text-sm font-semibold">
        {t(nationalHotline.nameKey, { defaultValue: nationalHotline.name })}
      </span>
      <span className="ml-auto text-2xl font-bold tabular-nums">{n.display}</span>
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
    <p className="mt-6 text-xs text-muted-foreground">
      {t('hotline-source-prefix', { defaultValue: 'Source:' })}{' '}
      <a
        href={hotlineProvenance.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-primary"
      >
        {hotlineProvenance.sourceTitle}
      </a>{' '}
      — {hotlineProvenance.source}. {t('hotline-source-checked', { defaultValue: 'Checked' })}{' '}
      {hotlineProvenance.verifiedOn}.
    </p>
  );
}
