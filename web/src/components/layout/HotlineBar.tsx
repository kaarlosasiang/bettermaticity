import { useState } from 'react';
import { ArrowRight, Pause, Play, TriangleAlert, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/primitives';
import { useLanguage } from '@/hooks/useLanguage';
import {
  hotlineIcon,
  nationalHotline,
  primaryNumber,
  priorityHotlines,
  type Hotline,
} from '@/lib/hotlines';

interface BarItem {
  id: string;
  label: string;
  labelKey?: string;
  number: string;
  tel: string;
  Icon: LucideIcon;
}

const toItem = (h: Hotline | Omit<Hotline, 'category'>): BarItem => {
  const n = primaryNumber(h);
  return {
    id: h.id,
    label: h.short,
    labelKey: h.shortKey,
    number: n.display,
    tel: n.tel,
    Icon: hotlineIcon(h.icon),
  };
};

// 911 first, then the flagged offices in priority order. Sourced from
// data/emergency-hotlines.json — never hard-code a number here. The bar already carries an
// "Emergency" title, so 911 is labelled "National" here instead of its short "Emergency".
const items: BarItem[] = [
  { ...toItem(nationalHotline), label: 'National', labelKey: 'hotline-bar-national' },
  ...priorityHotlines.map(toItem),
];

// Plain text links with an underline on hover (BetterSanFernando strip), no pill.
const linkClass =
  'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-white decoration-white/70 ' +
  'underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-white';

function EmergencyTitle({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-2 font-semibold', className)}>
      <TriangleAlert className="size-4" aria-hidden="true" />
      {t('hotline-emergency', { defaultValue: 'Emergency' })}
    </span>
  );
}

function HotlineItem({
  label,
  labelKey,
  number,
  tel,
  Icon,
  hidden,
  showIcon = true,
}: BarItem & { hidden?: boolean; showIcon?: boolean }) {
  const { t } = useLanguage();
  const text = labelKey ? t(labelKey, { defaultValue: label }) : label;
  return (
    <a
      href={`tel:${tel}`}
      className={cn(linkClass, hidden && 'motion-reduce:hidden')}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      {showIcon ? <Icon className="size-3 opacity-90" aria-hidden="true" /> : null}
      <span className="font-medium">{text}</span> <span className="font-mono">{number}</span>
    </a>
  );
}

// Emergency strip above the header: "Emergency" title on the left, then the numbers.
// Desktop (xl, where the header nav also appears) = static row divided by hairlines, with
// a "View all hotlines" link on the right; below xl the numbers scroll as a seamless
// marquee (duplicated once, translateX(-50%) loop).
//
// WCAG 2.2.2 requires a way to pause motion that auto-starts and runs past 5s. The
// original bar paused on hover only — which does not exist on the touch devices this
// variant targets — so there is an explicit pause button, and prefers-reduced-motion
// drops the animation for a manually scrollable row instead.
export default function HotlineBar() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(true);

  return (
    <div className="bg-navy text-[0.8125rem] text-white">
      {/* Desktop: everything visible at once, no motion needed. Item icons are dropped here
          so the row stays on one line with room to spare at the narrowest desktop
          container (1280px). */}
      <Container className="hidden xl:block">
        <div className="flex items-center gap-5 py-2.5 text-xs">
          <EmergencyTitle />
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-y-1 divide-x divide-white/30">
            {items.map((h) => (
              <li key={h.id} className="px-3">
                <HotlineItem {...h} showIcon={false} />
              </li>
            ))}
          </ul>
          {/* Plain <a>: a full load lands on the anchor (client-side links don't scroll to
              hashes). */}
          <a href="/contact#hotlines" className={cn(linkClass, 'font-semibold')}>
            {t('hotline-view-all', { defaultValue: 'View all hotlines' })}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </Container>

      {/* Tablet / mobile: fixed title, scrolling numbers */}
      <div className="relative flex items-center xl:hidden">
        <EmergencyTitle className="z-10 border-r border-white/30 py-2 pr-3 pl-4 text-xs" />
        <div
          role="region"
          aria-label={t('hotline-bar-label', { defaultValue: 'Emergency contacts' })}
          className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-56px),transparent)] motion-reduce:overflow-x-auto"
        >
          <div
            className={cn(
              'flex w-max animate-hotline-scroll gap-6 py-2 pr-14 pl-4 text-xs',
              'hover:[animation-play-state:paused] motion-reduce:animate-none',
              !playing && '[animation-play-state:paused]'
            )}
          >
            {items.map((h) => (
              <HotlineItem key={h.id} {...h} />
            ))}
            {/* Second copy makes the -50% loop seamless. Hidden from assistive tech
                and the tab order; dropped entirely when the animation is off, so a
                reduced-motion user scrolling manually does not hit duplicates. */}
            {items.map((h) => (
              <HotlineItem key={`clone-${h.id}`} {...h} hidden />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={!playing}
          aria-label={
            playing
              ? t('hotline-pause', { defaultValue: 'Pause scrolling emergency contacts' })
              : t('hotline-resume', { defaultValue: 'Resume scrolling emergency contacts' })
          }
          className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white transition hover:bg-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hidden"
        >
          {playing ? (
            <Pause className="size-3.5" aria-hidden="true" />
          ) : (
            <Play className="size-3.5" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
