// Typed access to the changelog feed (repo-root data/changelog.json, imported at build
// time via the @data alias and baked into the prerendered HTML). Edit the JSON to add
// an entry; this module only gives it types and a stable newest-first order.
import changelog from '@data/changelog.json';

export type ChangeType = 'new' | 'improved' | 'fixed';

export const CHANGE_TYPES: ChangeType[] = ['new', 'improved', 'fixed'];

export interface Change {
  type: ChangeType;
  text: string;
}

export interface ChangelogEntry {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  title: string;
  /** Semver of the release; the newest entry matches the root version.json. */
  version: string;
  changes: Change[];
}

export const entries: ChangelogEntry[] = [...(changelog.entries as ChangelogEntry[])].sort((a, b) =>
  b.date.localeCompare(a.date)
);

const LOCALES: Record<string, string> = { en: 'en-PH', ceb: 'ceb-PH' };

// UTC so the prerendered date and the hydrated one never differ by a day. `medium`
// ("Oct 25, 2026") suits narrow table columns.
export function formatChangeDate(
  date: string,
  language = 'en',
  style: 'long' | 'medium' = 'long'
): string {
  return new Intl.DateTimeFormat(LOCALES[language] ?? 'en-PH', {
    dateStyle: style,
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
