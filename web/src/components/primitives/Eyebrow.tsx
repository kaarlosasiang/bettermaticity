import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: ReactNode;
  /** `light` sits on white/pale bands; `dark` on navy/royal bands. */
  tone?: 'light' | 'dark';
  className?: string;
}

// Mono, tracked, uppercase kicker above a heading (BetterSanFernando pattern).
export function Eyebrow({ children, tone = 'light', className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'font-mono text-[0.71875rem] font-semibold tracking-[0.14em] uppercase',
        tone === 'dark' ? 'text-[#a9c3ff]' : 'text-royal',
        className
      )}
    >
      {children}
    </span>
  );
}
