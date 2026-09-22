import { useState } from 'react';
import { Pause, Play, type LucideIcon } from 'lucide-react';
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
// data/emergency-hotlines.json — never hard-code a number here.
const items: BarItem[] = [toItem(nationalHotline), ...priorityHotlines.map(toItem)];

// Hover/focus darkens rather than lightens: white text over the bar needs 4.5:1,
// and lightening the pill pushes it under (bg-white/30 lands at 3.8:1).
const pillClass =
  'inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 ' +
  'whitespace-nowrap text-white no-underline transition hover:-translate-y-px hover:bg-black/20 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ' +
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0';

function HotlineItem({
  label,
  labelKey,
  number,
  tel,
  Icon,
  hidden,
}: BarItem & { hidden?: boolean }) {
  const { t } = useLanguage();
  const text = labelKey ? t(labelKey, { defaultValue: label }) : label;
  return (
    <a
      href={`tel:${tel}`}
      className={cn(pillClass, hidden && 'motion-reduce:hidden')}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <Icon className="size-3" aria-hidden="true" />
      <span>
        {text}: {number}
      </span>
    </a>
  );
}

// Emergency strip above the header. Desktop = static wrapped row; below lg the items
// scroll as a seamless marquee (duplicated once, translateX(-50%) loop).
//
// WCAG 2.2.2 requires a way to pause motion that auto-starts and runs past 5s. The
// original bar paused on hover only — which does not exist on the touch devices this
// variant targets — so there is an explicit pause button, and prefers-reduced-motion
// drops the animation for a manually scrollable row instead.
export default function HotlineBar() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(true);

  return (
    <div className="bg-[linear-gradient(135deg,#b91c1c_0%,#991b1b_100%)] text-[0.8125rem] text-white">
      {/* Desktop: everything visible at once, no motion needed */}
      <Container className="hidden py-2 lg:block">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {items.map((h) => (
            <HotlineItem key={h.id} {...h} />
          ))}
        </div>
      </Container>

      {/* Tablet / mobile marquee */}
      <div className="relative lg:hidden">
        <div
          role="region"
          aria-label={t('hotline-bar-label', { defaultValue: 'Emergency contacts' })}
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-56px),transparent)] motion-reduce:overflow-x-auto"
        >
          <div
            className={cn(
              'flex w-max animate-hotline-scroll gap-4 py-2 pr-14 pl-4 text-xs',
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
