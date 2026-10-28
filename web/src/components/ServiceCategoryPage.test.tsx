import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FileText, IdCard, Store } from 'lucide-react';
import en from '@/locales/en.json';

// <Seo> needs vite-react-ssg's HelmetProvider, which unit tests don't mount.
vi.mock('@/components/Seo', () => ({ Seo: () => null }));
vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    language: 'en',
    t: (key: string) => (en as Record<string, string>)[key] ?? key,
  }),
}));

import { ServiceCategoryPage } from './ServiceCategoryPage';
afterEach(cleanup);

const renderPage = () =>
  render(
    <MemoryRouter>
      <ServiceCategoryPage
        path="/services/certificates"
        seoTitleKey="cert-page-title"
        seoDescription="Certificates"
        badgeIcon={FileText}
        titleKey="cert-page-title"
        descKey="cert-page-desc"
        services={[
          { Icon: FileText, titleKey: 'cert-birth', descKey: 'cert-birth-desc' },
          { Icon: IdCard, titleKey: 'cert-brgy-id', descKey: 'cert-brgy-id-desc' },
          { Icon: Store, titleKey: 'biz-cedula', descKey: 'biz-cedula-desc' },
        ]}
      />
    </MemoryRouter>
  );

describe('service category page', () => {
  it('lists every service before any search (so the prerender has them all)', () => {
    renderPage();
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('filters the list in place and shows the empty state when nothing matches', () => {
    renderPage();
    const search = screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'barangay' } });
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Barangay ID' })).toBeTruthy();

    fireEvent.change(search, { target: { value: 'zzz-no-such-service' } });
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.getByText(en['service-search-empty'])).toBeTruthy();

    fireEvent.change(search, { target: { value: '' } });
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('ends with the official-source band', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: en['service-source-title'] })).toBeTruthy();
  });
});
