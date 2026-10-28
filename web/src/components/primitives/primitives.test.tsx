import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PageHeader } from './PageHeader';
import { Container } from './Container';
import { SectionHead } from './SectionHead';
import { StatRow } from './StatRow';
import { Breadcrumb } from './Breadcrumb';

describe('primitives', () => {
  it('PageHeader renders title, description, and badge', () => {
    render(
      <PageHeader title="Health Services" description="Programs and clinics" badge="Health" />
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Health Services' })).toBeInTheDocument();
    expect(screen.getByText('Programs and clinics')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
  });

  it('PageHeader renders breadcrumb, meta, aside and stats', () => {
    render(
      <MemoryRouter>
        <PageHeader
          title="Services"
          eyebrow="City services"
          breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
          meta={['52 services', '11 categories']}
          aside={{ label: 'About this directory', body: 'Guidance only.' }}
          stats={[{ label: 'Population', value: '148,672', caption: '2024 POPCEN' }]}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('City services')).toBeInTheDocument();
    expect(screen.getByText('52 services')).toBeInTheDocument();
    expect(screen.getByText('About this directory')).toBeInTheDocument();
    expect(screen.getByText('148,672')).toBeInTheDocument();
    expect(screen.getByText('Services', { selector: '[aria-current="page"]' })).toBeInTheDocument();
  });

  it('Breadcrumb links ancestors and marks the current page', () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Statistics' }]} />
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByText('Statistics')).toHaveAttribute('aria-current', 'page');
  });

  it('SectionHead renders an h2 by default and h3 on request', () => {
    const { rerender } = render(<SectionHead eyebrow="City profile" title="Mati at a Glance" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Mati at a Glance' })).toBeInTheDocument();
    expect(screen.getByText('City profile')).toBeInTheDocument();
    rerender(<SectionHead title="Mati at a Glance" as="h3" />);
    expect(screen.getByRole('heading', { level: 3, name: 'Mati at a Glance' })).toBeInTheDocument();
  });

  it('StatRow renders each label, value and caption', () => {
    render(
      <StatRow
        items={[
          { label: 'Residents', value: '148,672', caption: 'PSA 2024 POPCEN' },
          { label: 'Barangays', value: '26' },
        ]}
      />
    );
    expect(screen.getByText('Residents')).toBeInTheDocument();
    expect(screen.getByText('148,672')).toBeInTheDocument();
    expect(screen.getByText('PSA 2024 POPCEN')).toBeInTheDocument();
    expect(screen.getByText('26')).toBeInTheDocument();
  });

  it('Container renders children', () => {
    render(<Container>hello</Container>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
