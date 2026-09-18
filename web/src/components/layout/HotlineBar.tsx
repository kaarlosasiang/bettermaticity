import type { LucideIcon } from 'lucide-react';
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
      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 whitespace-nowrap text-white no-underline transition hover:-translate-y-px hover:bg-white/30"
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

// Legacy .hotline-bar: red gradient strip. Desktop = static wrapped row; tablet/mobile
// (<lg) = seamless marquee (items duplicated, translateX(-50%) loop, pause on hover).
export default function HotlineBar() {
  return (
    <div className="bg-[linear-gradient(135deg,#ff0000_0%,#cc0000_100%)] text-[0.8125rem] text-white">
      {/* Desktop */}
      <Container className="hidden py-2 lg:block">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {items.map((h) => (
            <HotlineItem key={h.id} {...h} />
          ))}
        </div>
      </Container>
      {/* Tablet / mobile marquee */}
      <div className="overflow-hidden lg:hidden" aria-label="Emergency contacts">
        <div className="flex w-max animate-hotline-scroll gap-4 py-2 text-xs hover:[animation-play-state:paused]">
          {items.map((h) => (
            <HotlineItem key={h.id} {...h} />
          ))}
          {items.map((h) => (
            <HotlineItem key={`clone-${h.id}`} {...h} hidden />
          ))}
        </div>
      </div>
    </div>
  );
}
