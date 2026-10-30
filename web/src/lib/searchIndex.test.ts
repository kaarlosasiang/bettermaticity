import { describe, expect, it } from 'vitest';
import en from '@/locales/en.json';
import migrated from '../../migrated-routes.json';
import { isMigratedRoute } from '@/lib/migratedRoutes';
import { RESULT_TYPES, buildSearchIndex, createSearcher } from './searchIndex';

const dict = en as Record<string, string>;
const t = (key: string) => dict[key] ?? key;
const index = buildSearchIndex(t);
const search = createSearcher(index);

describe('site-wide search index', () => {
  it('covers every shipped page and links only to shipped pages', () => {
    const pages = new Set(index.map((r) => r.to.split('#')[0]));
    // The home page is the logo, not a search result.
    for (const route of (migrated as string[]).filter((r) => r !== '/'))
      expect(pages.has(route), route).toBe(true);
    for (const r of index) {
      if (r.to.startsWith('http')) continue;
      expect(isMigratedRoute(r.to.split('#')[0]), r.id).toBe(true);
    }
  });

  it('gives every record a translated title, a known type and a unique id', () => {
    expect(new Set(index.map((r) => r.id)).size).toBe(index.length);
    for (const r of index) {
      expect(RESULT_TYPES, r.id).toContain(r.type);
      expect(r.title.trim(), r.id).not.toBe('');
      expect(dict[r.title], `${r.id} shows a raw key`).toBeUndefined();
    }
  });

  it('finds records of each kind by the words people use', () => {
    const types = (q: string) => new Set(search(q).map((r) => r.type));
    expect(types('birth certificate')).toContain('service');
    expect(types('classroom')).toContain('notice');
    expect(types('airport')).toContain('project');
    expect(types('PhilGEPS')).toContain('link');
    expect(types('cash flow')).toContain('document');
  });
});
