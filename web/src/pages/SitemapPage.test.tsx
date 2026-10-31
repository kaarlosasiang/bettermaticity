import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import en from '@/locales/en.json';
import { isMigratedRoute } from '@/lib/migratedRoutes';

vi.mock('@/components/Seo', () => ({ Seo: () => null }));
vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    language: 'en',
    t: (key: string) => (en as Record<string, string>)[key] ?? key,
  }),
}));

import SitemapPage from './SitemapPage';
afterEach(cleanup);

describe('site index', () => {
  it('links only to pages that ship, with every label translated', () => {
    const { container } = render(
      <MemoryRouter>
        <SitemapPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1, name: en['sitemap-title'] })).toBeTruthy();

    const internal = [...container.querySelectorAll('a')]
      .map((a) => a.getAttribute('href')!)
      .filter((href) => href.startsWith('/') && href !== '/sitemap.xml');
    expect(internal.length).toBeGreaterThan(40);
    for (const href of internal) expect(isMigratedRoute(href.split('#')[0]), href).toBe(true);

    // A missing key would render as the raw kebab-case key.
    for (const a of container.querySelectorAll('a'))
      expect(a.textContent, a.getAttribute('href')!).not.toMatch(/^[a-z]+(-[a-z]+)+$/);

    // Each jump link has a matching group.
    for (const a of container.querySelectorAll('a[href^="#"]'))
      expect(container.querySelector(a.getAttribute('href')!)).toBeTruthy();
  });
});
