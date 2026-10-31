import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import en from '@/locales/en.json';
import { isMigratedRoute } from '@/lib/migratedRoutes';
import { fiscalYears } from '@/lib/budgetData';
import { fdpRecords, officialDocuments } from '@/lib/transparencyData';
import { procurementNotices } from '@/lib/infrastructureData';
import { risingProjects } from '@/lib/risingProjects';

vi.mock('@/components/Seo', () => ({ Seo: () => null }));
// Charts draw on a canvas jsdom doesn't have; their data is covered by budgetData tests.
vi.mock('react-chartjs-2', () => ({ Bar: () => null, Doughnut: () => null }));
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

import TransparencyHub from './TransparencyHub';
import Finance from './Finance';
import FullDisclosure from './FullDisclosure';
import Documents from './Documents';
import Projects from './Projects';
afterEach(cleanup);

const renderAt = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);
const PAGES = [
  '/transparency/finance',
  '/transparency/projects',
  '/transparency/full-disclosure',
  '/transparency/documents',
  '/transparency/sources',
  '/transparency/methodology',
];

describe('transparency hub', () => {
  it('links every Transparency page, all of which ship', () => {
    const { container } = renderAt(<TransparencyHub />);
    for (const to of PAGES) {
      expect(container.querySelector(`a[href="${to}"]`), to).toBeTruthy();
      expect(isMigratedRoute(to), to).toBe(true);
    }
    expect(isMigratedRoute('/transparency')).toBe(true);
  });
});

describe('city finances', () => {
  it('shows one column per reported fiscal year', () => {
    renderAt(<Finance />);
    const table = screen.getByRole('region', { name: en['finance-summary-title'] });
    for (const y of fiscalYears)
      expect(within(table).getByRole('columnheader', { name: y.period })).toBeTruthy();
  });
});

describe('Full Disclosure archive', () => {
  it('lists every record and narrows with search', () => {
    const { container } = renderAt(<FullDisclosure />);
    const archive = () => container.querySelector('#archive')!;
    expect(archive().querySelectorAll('li')).toHaveLength(fdpRecords.length);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'cash flow' } });
    const shown = archive().querySelectorAll('li').length;
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(fdpRecords.length);
  });
});

describe('official documents', () => {
  it('never links a document that no longer opens', () => {
    const { container } = renderAt(<Documents />);
    for (const d of officialDocuments.filter((x) => x.status === 'unavailable')) {
      expect(container.querySelector(`a[href="${d.url}"]`), d.id).toBeNull();
      expect(
        within(container.querySelector(`#${d.id}`) as HTMLElement).getByText(
          en['docs-not-available']
        )
      ).toBeTruthy();
    }
  });
});

describe('projects and procurement', () => {
  it('shows every project and the first page of notices, none left invisible', () => {
    const { container } = renderAt(<Projects />);
    expect(container.querySelectorAll('#project-ledger > li')).toHaveLength(risingProjects.length);
    const table = within(container.querySelector('#procurement') as HTMLElement).getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(
      Math.min(10, procurementNotices.length) + 1
    );
    // The old procurement cards were motion elements stuck at their initial opacity 0.
    expect(container.querySelector('[style*="opacity: 0"]')).toBeNull();
  });
});
