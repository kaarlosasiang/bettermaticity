import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: ReactNode;
  label: ReactNode;
  className?: string;
}

// Homepage-style stat tile: hairline ring + royal top-border, font-display royal number.
export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-t-[3px] border-[#2b62ee] bg-white px-3 py-4 text-center shadow-[0_0_0_1px_rgba(18,60,122,0.07)]',
        className
      )}
    >
      <span className="mb-1 block font-display text-[1.75rem] leading-none font-extrabold text-[#2b62ee]">
        {value}
      </span>
      <span className="text-xs leading-tight text-[#4c5c78]">{label}</span>
    </div>
  );
}
