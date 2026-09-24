import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RisingProjects } from './RisingProjects';
import { featuredProjects, risingProjects, projectAnchor } from '@/lib/risingProjects';
import { procurementNotices } from '@/lib/infrastructureData';
import en from '@/locales/en.json';
import fil from '@/locales/fil.json';
import ceb from '@/locales/ceb.json';

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({ t: (key: string) => (en as Record<string, string>)[key] ?? key }),
}));

const translate = (key: string) => (en as Record<string, string>)[key];

describe('Rising in Mati evidence and navigation', () => {
  it('links every Home highlight to an existing Budget card with the same title and status', () => {
    const { rerender, container } = render(<RisingProjects preview />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    const links = featuredProjects.map((project) => {
      const link = screen.getByRole('link', { name: new RegExp(translate(project.titleKey)) });
      expect(link).toHaveTextContent(translate(`rising-status-${project.status}`));
      expect(link).toHaveTextContent(project.sourceDate);
      return link.getAttribute('href')!;
    });
    expect(screen.getByRole('link', { name: 'View all projects' })).toHaveAttribute(
      'href',
      '/budget#rising-in-mati'
    );
    rerender(<RisingProjects />);
    expect(screen.getAllByRole('article')).toHaveLength(6);
    for (const [index, href] of links.entries()) {
      const target = container.querySelector(href.slice(href.indexOf('#')))!;
      expect(target).toHaveTextContent(translate(featuredProjects[index].titleKey));
      expect(target).toHaveTextContent(
        translate(`rising-status-${featuredProjects[index].status}`)
      );
    }
  });

  it('distinguishes an appropriation and company claims from actual city spending', () => {
    const { container } = render(<RisingProjects />);
    const airport = within(container.querySelector('#project-mati-airport') as HTMLElement);
    expect(airport.getByText('FY2026 national appropriation')).toBeInTheDocument();
    expect(airport.getByText('₱700,000,000.00')).toBeInTheDocument();
    const details = container.querySelector('#project-mati-airport details') as HTMLDetailsElement;
    expect(details.open).toBe(false);
    fireEvent.click(airport.getByText('Details and sources'));
    expect(details.open).toBe(true);
    expect(airport.getByRole('link')).toHaveAttribute(
      'href',
      expect.stringContaining('GAA2026/VolumeIB/DOTR/A.pdf#page=13')
    );
    fireEvent.click(airport.getByText('Details and sources'));
    expect(details.open).toBe(false);
    const water = within(container.querySelector('#project-macambol-water') as HTMLElement);
    expect(water.getByText('Company-funded · SDMP')).toBeInTheDocument();
    expect(water.getByText('Completion reported by company')).toBeInTheDocument();
    expect(screen.queryByText('Fully Operational')).not.toBeInTheDocument();
    expect(screen.queryByText('Under Construction')).not.toBeInTheDocument();
  });

  it('keeps procurement highlights consistent with their source records', () => {
    for (const project of risingProjects.filter((p) => p.amountKind === 'abc')) {
      const notice = procurementNotices.find((p) => project.id === `notice-${p.reference}`)!;
      expect(project.amount).toBe(notice.abc);
      expect(project.sourceDate).toBe(notice.updatedOn ?? notice.publishedOn);
      expect(project.sources[0].url).toBe(notice.sourceUrl);
      expect(project.status).toBe('awarded');
      expect(notice.completionPercent).toBeNull();
    }
  });

  it('provides dates, unique destinations, official source links and all three translations', () => {
    expect(new Set(risingProjects.map(projectAnchor)).size).toBe(risingProjects.length);
    for (const project of risingProjects) {
      expect(project.sourceDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(project.sources.length).toBeGreaterThan(0);
      for (const source of project.sources)
        expect(new URL(source.url).hostname).toMatch(/\.gov\.ph$/);
      for (const locale of [en, fil, ceb]) {
        for (const key of [
          project.titleKey,
          project.detailKey,
          `rising-status-${project.status}`,
          `rising-scope-${project.scope}`,
          `rising-amount-${project.amountKind}`,
        ]) {
          expect((locale as Record<string, string>)[key]).toBeTruthy();
        }
      }
    }
    for (const key of Object.keys(en).filter((key) => key.startsWith('rising-'))) {
      for (const locale of [fil, ceb]) expect(locale).toHaveProperty(key);
    }
  });
});
