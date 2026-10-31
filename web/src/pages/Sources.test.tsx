import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import en from '@/locales/en.json';
import { allDatasets } from '@/lib/sourceRegistry';

vi.mock('@/components/Seo', () => ({ Seo: () => null }));
vi.mock('@/hooks/useLanguage', () => {
  const dict = en as Record<string, string>;
  // Minimal i18next stand-in: {{var}} interpolation.
  const t = (key: string, opts?: Record<string, unknown>) => {
    const s = dict[key] ?? key;
    return opts ? s.replace(/\{\{(\w+)\}\}/g, (_, n: string) => String(opts[n] ?? '')) : s;
  };
  return { useLanguage: () => ({ language: 'en', t }) };
});

import Sources from './Sources';
afterEach(cleanup);

describe('data sources page', () => {
  it('lists published datasets in the registry and drafts under "not yet verified"', () => {
    const { container } = render(
      <MemoryRouter>
        <Sources />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1, name: en['sources-title'] })).toBeTruthy();

    const registry = container.querySelector('#registry')!;
    const awaiting = container.querySelector('#awaiting')!;
    for (const d of allDatasets) {
      const home = d.status === 'draft' ? awaiting : registry;
      expect(home.querySelector(`[id="${d.id}"]`), d.id).toBeTruthy();
    }
    // A draft is never presented as a published, sourced dataset.
    for (const d of allDatasets.filter((x) => x.status === 'draft'))
      expect(registry.querySelector(`[id="${d.id}"]`), d.id).toBeNull();

    expect(container.textContent).not.toMatch(/sources-[a-z-]+/);
  });
});
