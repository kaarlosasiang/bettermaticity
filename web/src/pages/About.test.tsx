import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import en from '@/locales/en.json';

vi.mock('@/components/Seo', () => ({ Seo: () => null }));
vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    language: 'en',
    t: (key: string) => (en as Record<string, string>)[key] ?? key,
  }),
}));

import About from './About';
import { NAV } from '@/lib/navMenus';
import { services } from '@/lib/services';
import { departments } from '@/lib/govDirectory';
afterEach(cleanup);

describe('about page', () => {
  it('shows coverage counted from the shipped data and links to every directory', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1, name: en['about-title'] })).toBeTruthy();
    const counts = [...container.querySelectorAll('dl dd')].map((dd) => dd.textContent);
    expect(counts).toContain(String(services.length));
    expect(counts).toContain(String(departments.length));
    for (const href of ['/services', '/government', '/legislative', '/transparency', '/statistics'])
      expect(container.querySelector(`a[href="${href}"]`), href).toBeTruthy();
    // Independence is stated plainly; no claimed affiliation the site can't document.
    expect(screen.getByText(en['about-independent-official'])).toBeTruthy();
    expect(container.textContent).not.toMatch(/part of the BetterGov/i);
  });
});

describe('header navigation', () => {
  it('replaces Legislative with About and files legislation under Government', () => {
    const keys = NAV.map((e) => e.key);
    expect(keys).toContain('nav-about');
    expect(keys).not.toContain('nav-legislative');

    const government = NAV.find((e) => e.key === 'nav-government')!;
    const items = government.menu!.groups.flatMap((g) => g.items.map((i) => i.to));
    for (const to of [
      '/legislative',
      '/legislative/ordinance-framework',
      '/legislative/resolution-framework',
    ])
      expect(items).toContain(to);
    expect(government.matches).toContain('/legislative');
  });
});
