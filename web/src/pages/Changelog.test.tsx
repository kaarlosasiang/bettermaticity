import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import en from '@/locales/en.json';
import { entries } from '@/lib/changelog';

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

import Changelog from './Changelog';
afterEach(cleanup);

describe('changelog page', () => {
  it('renders one article per entry with typed changes and version chips only where set', () => {
    const { container } = render(
      <MemoryRouter>
        <Changelog />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1, name: en['changelog-title'] })).toBeTruthy();

    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(entries.length);
    entries.forEach((entry, i) => {
      const article = articles[i];
      expect(article.querySelector('h2')!.textContent).toBe(entry.title);
      expect(article.querySelector('time')!.getAttribute('dateTime')).toBe(entry.date);
      expect(article.querySelectorAll('li')).toHaveLength(entry.changes.length);
      const chip = [...article.querySelectorAll('span')].find((s) => /^v\d/.test(s.textContent!));
      expect(Boolean(chip), entry.date).toBe(Boolean(entry.version));
    });

    // No raw i18n keys leak into the page.
    expect(container.textContent).not.toMatch(/changelog-[a-z-]+/);
  });
});
