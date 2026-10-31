import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import type { SourceStatus } from '@/lib/sourceRegistry';

const STATUS_CLASS: Record<SourceStatus, string> = {
  verified: 'border-green-200 bg-green-50 text-green-800',
  sourced: 'border-royal/25 bg-royal-tint text-royal',
  partial: 'border-feel-text/25 bg-feel-tint text-feel-text',
  draft: 'border-line bg-surface-subtle text-ink-muted',
};

// The registry's verification status as a small mono tag (Sources, Transparency pages).
export function StatusBadge({ status }: { status: SourceStatus }) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center border px-2 py-0.5 font-mono text-[0.6875rem] font-semibold tracking-[0.08em] uppercase',
        STATUS_CLASS[status]
      )}
    >
      {t(`sources-status-${status}`)}
    </span>
  );
}
