/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import en from '@/locales/en.json';
import hotlinesJson from '@data/emergency-hotlines.json';
import {
  allHotlines,
  emergencyHotlines,
  hotlineIcon,
  hotlineProvenance,
  medicalHotlines,
  nationalHotline,
  primaryNumber,
  priorityHotlines,
  type Hotline,
  type HotlineNumber,
} from './hotlines';

/**
 * Emergency numbers are the one kind of content on this site where being wrong is
 * dangerous rather than embarrassing. These tests fail the build if a surface drifts
 * from the verified dataset, if a number stops being dialable, or if a retired
 * template number reappears.
 */

// Repo root, relative to vitest's cwd (web/). Plain path joins rather than
// `new URL(..., import.meta.url)`, which Vite would try to resolve as an asset.
const repoFile = (rel: string) => readFileSync(resolve(process.cwd(), '..', rel), 'utf-8');

const everyNumber: { hotline: string; n: HotlineNumber }[] = [
  ...[nationalHotline as Omit<Hotline, 'category'>, ...allHotlines].flatMap((h) =>
    h.numbers.map((n) => ({ hotline: h.id, n }))
  ),
];

/** Numbers carried over from the LGU Solano template. None may ever ship again. */
const RETIRED_NUMBERS = [
  '09263833744',
  '0926 383 3744',
  '0926-383-3744', // MDRRMO Solano
  '09274008033',
  '0927 400 8033',
  '0927-400-8033', // PNP Solano
  '09162840885',
  '0916 284 0885',
  '0916-284-0885', // MSWDO Solano
  '09054471061',
  '09358121081',
  '09171345511',
  '09161744979',
  '09171227150',
  '09360620305',
  '0936 062 0305', // BFP Solano
  '0906188086',
  '09061880868',
  '0906 188 086', // DILG Solano (also digit-truncated)
  '09679103054',
  '09068195569',
  '0906 819 5569',
  '09208335766',
  '09474981746',
  '09171080452',
  '09175079950',
];

describe('emergency hotline dataset', () => {
  it('carries a named source and a verification date', () => {
    expect(hotlineProvenance.source).toMatch(/City of Mati/);
    expect(hotlineProvenance.sourceUrl).toMatch(/^https:\/\//);
    expect(hotlineProvenance.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // Not "verified" until a City of Mati approver signs off — see _status_note.
    expect(['sourced', 'verified']).toContain(hotlineProvenance.status);
    if (hotlineProvenance.status === 'verified') {
      expect(hotlineProvenance.approvedBy).toBeTruthy();
    }
  });

  it('has a unique id, a resolvable icon and at least one number per office', () => {
    const ids = allHotlines.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const h of [nationalHotline as Omit<Hotline, 'category'>, ...allHotlines]) {
      expect(h.numbers.length, `${h.id} has no number`).toBeGreaterThan(0);
      expect(hotlineIcon(h.icon), `${h.id} icon`).toBeDefined();
      expect(h.name.trim()).not.toBe('');
      expect(h.short.trim()).not.toBe('');
    }
  });

  it('splits every office into exactly one category', () => {
    expect(emergencyHotlines.length + medicalHotlines.length).toBe(allHotlines.length);
    for (const h of allHotlines) {
      expect(['emergency', 'medical']).toContain(h.category);
    }
  });

  it('keeps each directory in the order the source graphic prints it', () => {
    // The full listings must not be rearranged: a resident holding the poster and
    // the approver signing the dataset off should both read the same sequence.
    const raw = hotlinesJson as unknown as {
      national: { numbers: { tel: string }[] };
      hotlines: { id: string; numbers: { tel: string }[] }[];
    };
    expect(nationalHotline.numbers.map((n) => n.tel)).toEqual(
      raw.national.numbers.map((n) => n.tel)
    );
    for (const h of allHotlines) {
      const source = raw.hotlines.find((x) => x.id === h.id);
      expect(
        h.numbers.map((n) => n.tel),
        `${h.id} was reordered`
      ).toEqual(source?.numbers.map((n) => n.tel));
    }
  });

  it('exposes priority offices in ascending urgency for the hotline bar', () => {
    expect(priorityHotlines.length).toBeGreaterThanOrEqual(4);
    const order = priorityHotlines.map((h) => h.priority as number);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });
});

describe('the one number a compact surface dials', () => {
  it('is a mobile whenever the office publishes one', () => {
    // The red hotline bar, the government directory card and the service-page
    // sidebars all show a single line. A landline dies in a typhoon and 911/160
    // route to national desks, so neither is an acceptable sole contact.
    for (const h of allHotlines) {
      if (!h.numbers.some((n) => n.type === 'mobile')) continue;
      expect(primaryNumber(h).type, `${h.id}'s lead number`).toBe('mobile');
    }
  });

  it('falls back to the only published line when there is no mobile', () => {
    expect(primaryNumber(nationalHotline).tel).toBe('911');
  });

  it("never leaves a shortcode as a priority office's sole displayed number", () => {
    for (const h of priorityHotlines) {
      if (h.numbers.some((n) => n.type === 'mobile')) {
        expect(primaryNumber(h).type, `${h.id} in the hotline bar`).toBe('mobile');
      }
    }
  });
});

describe('dialable values', () => {
  it('normalises every tel: to E.164 or a bare shortcode', () => {
    for (const { hotline, n } of everyNumber) {
      if (n.type === 'shortcode') {
        expect(n.tel, `${hotline} shortcode`).toMatch(/^\d{3}$/);
      } else {
        expect(n.tel, `${hotline} ${n.display}`).toMatch(/^\+63\d{9,10}$/);
      }
    }
  });

  it('keeps the displayed number and the dialed number in agreement', () => {
    for (const { hotline, n } of everyNumber) {
      const shown = n.display.replace(/\D/g, '');
      // Displayed local form: 0XXXXXXXXXX (mobile) or 087XXXXXXX (landline with
      // the area code in parentheses). Dialing drops the trunk 0 and adds +63.
      const dialed = n.tel.startsWith('+63') ? n.tel.slice(3) : n.tel;
      const expected = n.type === 'shortcode' ? dialed : `0${dialed}`;
      expect(shown, `${hotline}: "${n.display}" vs ${n.tel}`).toBe(expected);
    }
  });

  it('gives mobile numbers 11 local digits and landlines the 087 area code', () => {
    for (const { hotline, n } of everyNumber) {
      const local = n.display.replace(/\D/g, '');
      if (n.type === 'mobile') {
        expect(local, `${hotline} ${n.display}`).toMatch(/^09\d{9}$/);
      } else if (n.type === 'landline') {
        expect(local, `${hotline} ${n.display}`).toMatch(/^087\d{7}$/);
      }
    }
  });
});

describe('translations', () => {
  const dict = en as Record<string, string>;

  it('has an English label for every office and short label', () => {
    for (const h of [nationalHotline as Omit<Hotline, 'category'>, ...allHotlines]) {
      expect(dict[h.nameKey], `missing en key ${h.nameKey}`).toBeTruthy();
      if (h.shortKey) expect(dict[h.shortKey], `missing en key ${h.shortKey}`).toBeTruthy();
    }
    expect(dict['hotline-source-prefix']).toBeTruthy();
    expect(dict['hotline-source-checked']).toBeTruthy();
  });

  it('never bakes a phone number into a translation key or value', () => {
    for (const [key, value] of Object.entries(dict)) {
      if (!key.startsWith('hotline-')) continue;
      expect(key, `${key} embeds a number`).not.toMatch(/\d{3,}/);
      expect(value, `${key} embeds a number`).not.toMatch(/\d{3}[\s-]?\d{3,}/);
    }
  });
});

describe('offline.html mirrors the dataset', () => {
  const html = repoFile('offline.html');
  const tels = [...html.matchAll(/href="tel:([^"]+)"/g)].map((m) => m[1]);
  const shown = [...html.matchAll(/class="hotline-number">([^<]+)</g)].map((m) => m[1].trim());

  it('links only numbers that exist in the dataset', () => {
    const known = new Set(everyNumber.map(({ n }) => n.tel));
    expect(tels.length).toBeGreaterThan(0);
    for (const tel of tels) expect(known, `offline.html dials unknown ${tel}`).toContain(tel);
  });

  it('displays only numbers that exist in the dataset', () => {
    const known = new Set(everyNumber.map(({ n }) => n.display));
    for (const s of shown) expect(known, `offline.html shows unknown ${s}`).toContain(s);
  });

  it('lists each office in dataset order', () => {
    for (const id of ['cdrrmo', 'bfp-mati', 'cho-ems', 'cho', 'cswdo']) {
      const h = allHotlines.find((x) => x.id === id) as Hotline;
      const positions = h.numbers.map((n) => tels.indexOf(n.tel));
      for (const [i, pos] of positions.entries()) {
        expect(pos, `offline.html omits ${id} ${h.numbers[i].display}`).toBeGreaterThanOrEqual(0);
      }
      expect(positions, `offline.html lists ${id} out of order`).toEqual(
        [...positions].sort((a, b) => a - b)
      );
    }
  });

  it('shows 911 and the disaster, police and fire lines', () => {
    for (const id of ['cdrrmo', 'pnp-mati', 'bfp-mati']) {
      const h = allHotlines.find((x) => x.id === id) as Hotline;
      expect(tels, `offline.html is missing ${id}`).toContain(h.numbers[0].tel);
    }
    expect(tels).toContain(nationalHotline.numbers[0].tel);
  });

  it('cites its source', () => {
    expect(html).toContain(hotlinesJson._verified_on);
    expect(html).toMatch(/Source:/);
  });
});

describe('retired LGU Solano numbers', () => {
  const surfaces: [string, string][] = [
    ['offline.html', repoFile('offline.html')],
    ['data/emergency-hotlines.json', repoFile('data/emergency-hotlines.json')],
    ['web/src/lib/govDirectory.ts', repoFile('web/src/lib/govDirectory.ts')],
    ['web/src/pages/Contact.tsx', repoFile('web/src/pages/Contact.tsx')],
    ['web/src/pages/categories.tsx', repoFile('web/src/pages/categories.tsx')],
    [
      'web/src/components/layout/HotlineBar.tsx',
      repoFile('web/src/components/layout/HotlineBar.tsx'),
    ],
    ['web/src/locales/en.json', repoFile('web/src/locales/en.json')],
    ['web/src/locales/fil.json', repoFile('web/src/locales/fil.json')],
    ['web/src/locales/ceb.json', repoFile('web/src/locales/ceb.json')],
  ];

  it.each(surfaces)('%s is free of retired numbers', (_name, content) => {
    // This spec is excluded — it is the list of forbidden numbers.
    const haystack = content;
    for (const bad of RETIRED_NUMBERS) {
      expect(haystack, `retired number ${bad} is back`).not.toContain(bad);
    }
  });
});
