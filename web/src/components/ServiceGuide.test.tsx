import { cleanup, render, screen, within } from '@testing-library/react';
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

import { ServiceGuide, ServiceRequirements, ServiceSteps } from './ServiceGuide';
import { serviceGuides } from '@/lib/serviceReferences';
afterEach(cleanup);

const text = (en: string) => ({ en, fil: en, ceb: en });

describe('service detail page', () => {
  it('marks requirements and steps as placeholders while no verified data exists', () => {
    expect(serviceGuides['birth-certificate'].requirements).toBeUndefined();
    render(
      <MemoryRouter>
        <ServiceGuide id="birth-certificate" />
      </MemoryRouter>
    );
    const requirements = document.getElementById('requirements')!;
    const steps = document.getElementById('how-to-apply')!;
    expect(within(requirements).getByText(/^\[Placeholder\]/)).toBeTruthy();
    expect(within(steps).getByText(/^\[Placeholder\]/)).toBeTruthy();
    // Nothing invented at a glance either: all four facts defer to the office.
    expect(screen.getAllByText('Confirm with office').length).toBeGreaterThanOrEqual(4);
  });

  it('links the breadcrumb and sections to the guide category and anchors', () => {
    render(
      <MemoryRouter>
        <ServiceGuide id="business-permits-licensing" />
      </MemoryRouter>
    );
    const crumbs = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(crumbs).getByRole('link', { name: en['dropdown-business'] })).toHaveAttribute(
      'href',
      '/services/business'
    );
    const tabs = screen.getByRole('navigation', { name: en['service-tabs-label'] });
    for (const id of ['requirements', 'how-to-apply', 'office-contact', 'official-source']) {
      expect(document.getElementById(id), id).toBeTruthy();
      expect(tabs.querySelector(`a[href="#${id}"]`), id).toBeTruthy();
    }
    // The PSA online section only appears on civil-registry guides.
    expect(tabs.querySelector('a[href="#online"]')).toBeNull();
  });

  it('renders verified requirements and steps as numbered lists once data is added', () => {
    render(
      <>
        <ServiceRequirements
          language="en"
          requirements={[
            { item: text('Application form'), whereToSecure: text('Business permit office') },
            { item: text('Lease contract'), appliesOnly: text('For rented premises') },
          ]}
        />
        <ServiceSteps language="en" steps={[text('Submit the form'), text('Pay the fees')]} />
      </>
    );
    expect(screen.queryByText(/\[Placeholder\]/)).toBeNull();
    expect(screen.getByText('Application form')).toBeTruthy();
    expect(screen.getByText(/Where to secure: Business permit office/)).toBeTruthy();
    expect(screen.getByText(/Applies only: For rented premises/)).toBeTruthy();
    expect(screen.getByText('Pay the fees')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });
});
