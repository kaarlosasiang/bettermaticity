import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { services, type Service } from '@/lib/services';

// Fuzzy index over the service directory (mirrors the legacy search.js weighting).
const fuse = new Fuse(services, {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'keywords', weight: 2 },
    { name: 'category', weight: 1 },
    { name: 'office', weight: 1 },
    { name: 'description', weight: 1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
});

interface ServiceSearchProps {
  placeholder?: string;
  className?: string;
}

// Reused by the Services landing and the home hero. shadcn Command drives keyboard
// nav + a11y; Fuse.js drives fuzzy matching (Command's own filter is disabled).
export function ServiceSearch({ placeholder, className }: ServiceSearchProps) {
  const [query, setQuery] = useState('');
  const results: Service[] = useMemo(
    () =>
      query.trim().length >= 2
        ? fuse
            .search(query)
            .slice(0, 8)
            .map((r) => r.item)
        : [],
    [query]
  );
  const showList = query.trim().length >= 2;

  return (
    <Command
      shouldFilter={false}
      className={cn(
        'overflow-visible rounded-lg bg-white shadow-[0_0_0_1px_rgba(18,60,122,0.07)] text-left',
        className
      )}
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder={placeholder || 'Search services (e.g., birth certificate, business permit)'}
      />
      {showList && (
        <CommandList className="max-h-80">
          {results.length === 0 && <CommandEmpty>No services found.</CommandEmpty>}
          {results.map((s) => (
            <CommandItem
              key={s.id}
              value={s.id}
              onSelect={() => {
                window.location.href = s.path;
              }}
              className="flex flex-col items-start gap-0.5"
            >
              <span className="font-medium text-foreground">{s.title}</span>
              <span className="text-xs text-muted-foreground">
                {s.category}
                {s.office ? ` · ${s.office}` : ''}
              </span>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
}
