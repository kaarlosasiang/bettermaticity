import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageHeader } from './PageHeader';
import { Container } from './Container';

describe('primitives', () => {
  it('PageHeader renders title, description, and badge', () => {
    render(<PageHeader title="Health Services" description="Programs and clinics" badge="Health" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Health Services' })).toBeInTheDocument();
    expect(screen.getByText('Programs and clinics')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
  });

  it('Container renders children', () => {
    render(<Container>hello</Container>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
