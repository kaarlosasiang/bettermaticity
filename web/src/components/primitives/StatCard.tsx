import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: ReactNode;
  label: ReactNode;
  className?: string;
}

// Legacy .health-stat-card: white bordered card, centered; big primary number.
export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card px-3 py-4 text-center transition hover:shadow-sm',
        className
      )}
    >
      <span className="mb-1 block text-[1.75rem] leading-none font-bold text-primary">{value}</span>
      <span className="text-xs leading-tight text-muted-foreground">{label}</span>
    </div>
  );
}
