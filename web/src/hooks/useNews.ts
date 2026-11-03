import { useState, useEffect } from 'react';

export type NewsBadge = 'info' | 'success' | 'warning';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  badge: NewsBadge;
  summary: string;
  url?: string | null;
  source?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatNewsDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return dateStr;
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * The href for a news item's "Read more" link, or '' for none. Absolute http(s) links are
 * allowed on purpose: items link to the original post, usually on Facebook, and the feed
 * is curated by maintainers, so other sites are not allowlisted. A link that looks
 * relative must stay on this site: it is resolved the way a browser resolves it
 * (backslashes act as slashes, tabs and newlines are dropped), which rejects "//host",
 * "/\host" and "/<tab>/host" as well as javascript:, data: and other schemes.
 */
export function safeNewsUrl(url?: string | null): string {
  if (!url) return '';
  const u = url.trim();
  if (/^https?:\/\//i.test(u)) return u;
  if (!u.startsWith('/') && !u.startsWith('#')) return '';
  const site = 'https://bettermati.invalid';
  try {
    return new URL(u, site).origin === site ? u : '';
  } catch {
    return '';
  }
}

function sortByDateDesc(items: NewsItem[]): NewsItem[] {
  return [...items].sort((a, b) => {
    const ta = new Date((a.date || '') + 'T00:00:00').getTime();
    const tb = new Date((b.date || '') + 'T00:00:00').getTime();
    return (isNaN(tb) ? -Infinity : tb) - (isNaN(ta) ? -Infinity : ta);
  });
}

/**
 * Runtime fetch of /data/news.json. News is the one dataset kept out-of-band
 * (FTPS Facebook sync writes it directly to production), so it is fetched at
 * runtime rather than imported at build time. Returns { items, loading, error };
 * `items` is null while loading.
 */
export function useNews() {
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/data/news.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('news fetch failed'))))
      .then((data: { news?: NewsItem[] }) => {
        if (alive) setItems(sortByDateDesc(data.news ?? []));
      })
      .catch(() => {
        if (alive) {
          setError(true);
          setItems([]);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  return { items, loading: items === null, error };
}
