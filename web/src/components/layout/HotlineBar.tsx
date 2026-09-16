import type { LucideIcon } from 'lucide-react';
import { Shield, Heart, Flame, Building2, TriangleAlert, Truck } from 'lucide-react';
import { Container } from '@/components/primitives';

interface Hotline {
  Icon: LucideIcon;
  label: string;
  number: string;
  tel: string;
}

const hotlines: Hotline[] = [
  { Icon: Shield, label: 'Police', number: '0927 400 8033', tel: '09274008033' },
  { Icon: Heart, label: 'MSWDO', number: '0916 284 0885', tel: '09162840885' },
  { Icon: Flame, label: 'Fire', number: '0936 062 0305', tel: '09360620305' },
  { Icon: Building2, label: 'DILG', number: '0906 188 086', tel: '0906188086' },
  { Icon: TriangleAlert, label: 'MDRRMO', number: '0926 383 3744', tel: '09263833744' },
  { Icon: Truck, label: 'R2TMC', number: '0906 819 5569', tel: '09068195569' },
];

function HotlineItem({ Icon, label, number, tel, hidden }: Hotline & { hidden?: boolean }) {
  return (
    <a
      href={`tel:${tel}`}
      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 whitespace-nowrap text-white no-underline transition hover:-translate-y-px hover:bg-white/30"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <Icon className="size-3" aria-hidden="true" />
      <span>
        {label}: {number}
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
          {hotlines.map((h) => (
            <HotlineItem key={h.tel} {...h} />
          ))}
        </div>
      </Container>
      {/* Tablet / mobile marquee */}
      <div className="overflow-hidden lg:hidden" aria-label="Emergency contacts">
        <div className="flex w-max animate-hotline-scroll gap-4 py-2 text-xs hover:[animation-play-state:paused]">
          {hotlines.map((h) => (
            <HotlineItem key={h.tel} {...h} />
          ))}
          {hotlines.map((h) => (
            <HotlineItem key={`clone-${h.tel}`} {...h} hidden />
          ))}
        </div>
      </div>
    </div>
  );
}
