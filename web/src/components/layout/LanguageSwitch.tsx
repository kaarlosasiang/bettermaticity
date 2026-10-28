import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { LANGS } from '@/lib/languages';

// Compact EN/CEB toggle for the info bar (BetterSanFernando pattern): a divider, a globe,
// then a bordered two-button group. Phones and tablets use the header dropdown instead.
export function LanguageSwitch({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={cn('flex items-center gap-1.5 border-l border-line pl-3', className)}>
      <Globe className="size-3.5 text-ink-muted" aria-hidden="true" />
      <div
        role="group"
        aria-label="Language"
        className="flex items-center gap-0.5 border border-line bg-white p-0.5"
      >
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            onClick={() => void setLanguage(l.code)}
            aria-pressed={language === l.code}
            aria-label={l.name}
            className={cn(
              'px-2 py-0.5 font-sans font-semibold transition-colors',
              language === l.code ? 'bg-royal-tint text-royal' : 'text-ink-muted hover:text-ink'
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
