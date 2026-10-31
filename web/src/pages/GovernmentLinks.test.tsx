import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
// Imported before the page: the useLanguage mock reads it when the page loads.
import en from '@/locales/en.json';
import { isMigratedRoute } from '@/lib/migratedRoutes';
import { LINK_KINDS, officialLinks } from '@/lib/officialLinks';

vi.mock('@/components/Seo', () => ({ Seo: () => null }));
vi.mock('@/hooks/useLanguage', () => {
  const dict = en as Record<string, string>;
  // Minimal i18next stand-in: plural _one/_other keys and {{var}} interpolation.
  const t = (key: string, opts?: Record<string, unknown>) => {
    let k = key;
    if (opts && typeof opts.count === 'number') {
      const plural = `${key}_${opts.count === 1 ? 'one' : 'other'}`;
      if (dict[plural]) k = plural;
    }
    const s = dict[k] ?? key;
    return opts ? s.replace(/\{\{(\w+)\}\}/g, (_, n: string) => String(opts[n] ?? '')) : s;
  };
  return { useLanguage: () => ({ language: 'en', t }) };
});

import GovernmentLinks from './GovernmentLinks';
afterEach(cleanup);

const ISO = /^\d{4}-\d{2}-\d{2}$/;

describe('official links', () => {
  it('keeps every link typed, https, dated and unique', () => {
    expect(new Set(officialLinks.map((l) => l.id)).size).toBe(officialLinks.length);
    expect(new Set(officialLinks.map((l) => l.url)).size).toBe(officialLinks.length);
    for (const l of officialLinks) {
      expect(LINK_KINDS, l.id).toContain(l.kind);
      expect(new URL(l.url).protocol, l.id).toBe('https:');
      expect(l.checkedOn, l.id).toMatch(ISO);
      expect(l.purpose.trim(), l.id).not.toBe('');
      // City pages live on the City's own domain; the old council subdomain does not exist.
      if (l.kind === 'website') expect(new URL(l.url).hostname, l.id).toBe('mati.gov.ph');
      expect(l.url, l.id).not.toContain('sangguniangbayan.mati.gov.ph');
    }
    expect(isMigratedRoute('/government/links')).toBe(true);
  });

  it('lists every link and narrows by search and kind', () => {
    const { container } = render(
      <MemoryRouter>
        <GovernmentLinks />
      </MemoryRouter>
    );
    const items = () => container.querySelectorAll('#link-list > li');
    expect(items()).toHaveLength(officialLinks.length);
    for (const l of officialLinks)
      expect(container.querySelector(`a[href="${l.url}"]`), l.id).toHaveAttribute(
        'target',
        '_blank'
      );
    fireEvent.change(screen.getByLabelText('Kind of destination'), {
      target: { value: 'national' },
    });
    expect(items()).toHaveLength(officialLinks.filter((l) => l.kind === 'national').length);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'nothing like this' } });
    expect(screen.getByText(en['links-empty'])).toBeInTheDocument();
  });
});
