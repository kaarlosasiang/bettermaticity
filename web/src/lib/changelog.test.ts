import { describe, expect, it } from 'vitest';
import siteVersion from '../../../version.json';
import { CHANGE_TYPES, entries, formatChangeDate } from './changelog';

describe('changelog feed', () => {
  it('has well-formed, uniquely dated entries newest first', () => {
    expect(entries.length).toBeGreaterThan(0);
    const dates = entries.map((e) => e.date);
    expect(new Set(dates).size).toBe(dates.length);
    expect([...dates].sort().reverse()).toEqual(dates);

    for (const e of entries) {
      expect(e.date, e.title).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(e.date)), e.date).toBe(false);
      expect(e.title.trim(), e.date).not.toBe('');
      expect(e.changes.length, e.date).toBeGreaterThan(0);
      for (const c of e.changes) {
        expect(CHANGE_TYPES, `${e.date}: ${c.text}`).toContain(c.type);
        expect(c.text.trim(), e.date).not.toBe('');
      }
    }
  });

  it('versions every entry, newest first, with the newest matching version.json', () => {
    const parse = (v: string) => v.split('.').map(Number);
    const cmp = (a: string, b: string) => {
      const [x, y] = [parse(a), parse(b)];
      return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
    };
    for (const e of entries) expect(e.version, e.date).toMatch(/^\d+\.\d+\.\d+$/);
    for (let i = 1; i < entries.length; i++)
      expect(cmp(entries[i - 1].version, entries[i].version), entries[i].date).toBeGreaterThan(0);
    // The footer shows version.json. build.sh bumps its patch on every deploy, so only
    // the release (major.minor) has to match; a minor/major bump needs a new entry.
    const site = siteVersion.version;
    const release = (v: string) => parse(v).slice(0, 2).join('.');
    expect(release(site), `version.json ${site} has no changelog entry`).toBe(
      release(entries[0].version)
    );
    expect(cmp(site, entries[0].version)).toBeGreaterThanOrEqual(0);
  });

  it('has no unedited drafts from npm run release', () => {
    for (const e of entries) {
      expect(e.title, `${e.date}: rewrite the drafted title`).not.toMatch(/\bTODO\b/);
      for (const c of e.changes)
        expect(c.text, `${e.date}: rewrite or delete this drafted line`).not.toMatch(/\bTODO\b/);
    }
  });

  it('formats dates in UTC so prerender and hydration agree', () => {
    expect(formatChangeDate('2026-08-17')).toBe('August 17, 2026');
  });
});
