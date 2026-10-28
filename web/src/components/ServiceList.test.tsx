import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FileText, IdCard } from 'lucide-react';
import { ServiceList } from './ServiceList';
import { serviceOnlineActions } from '@/lib/serviceOnlineActions';
import { serviceReferences } from '@/lib/serviceReferences';
import en from '@/locales/en.json';
import ceb from '@/locales/ceb.json';

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({ t: (key: string) => (en as Record<string, string>)[key] ?? key }),
}));
afterEach(cleanup);

describe('service list', () => {
  it('keeps time/fee rows and separate local-guide and online-order links', () => {
    const { container } = render(
      <MemoryRouter>
        <ServiceList
          title="Services"
          services={[
            {
              Icon: FileText,
              titleKey: 'cert-birth',
              descKey: 'cert-birth-desc',
              to: '/service-details/birth-certificate',
              onlineId: 'psa',
            },
          ]}
        />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Confirm with office')).toHaveLength(2);
    expect(screen.getByText('Fee:')).toBeTruthy();
    expect(screen.getByText('Processing time:')).toBeTruthy();
    expect(screen.getByText('Online option')).toBeTruthy();
    const online = screen.getByRole('link', { name: /Request PSA copy online/ });
    expect(online.getAttribute('href')).toBe('https://psahelpline.ph/');
    expect(online.getAttribute('rel')).toContain('noopener');
    expect(screen.getByRole('link', { name: /View service guide/ }).getAttribute('href')).toBe(
      '/service-details/birth-certificate'
    );
    expect(
      screen.getByText(/Local registration and local certified copies are handled separately/)
    ).toBeTruthy();
    expect(container.querySelector('a a')).toBeNull();
  });

  it('does not fabricate an online option or guide link', () => {
    render(
      <ServiceList
        title="Services"
        services={[{ Icon: IdCard, titleKey: 'cert-brgy-id', descKey: 'cert-brgy-id-desc' }]}
      />
    );
    expect(screen.getByRole('heading', { name: 'Barangay ID' })).toBeTruthy();
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.queryByText('Online option')).toBeNull();
  });

  it('shows the empty-state text instead of rows when nothing matches', () => {
    render(<ServiceList title="Services" services={[]} emptyText="No services match." />);
    expect(screen.getByText('No services match.')).toBeTruthy();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  it('all online destinations have evidence and translated action labels and scope notes', () => {
    for (const action of Object.values(serviceOnlineActions)) {
      expect(new URL(action.href).protocol).toBe('https:');
      expect(serviceReferences[action.sourceId]).toBeTruthy();
      for (const locale of [en, ceb]) {
        for (const key of [action.labelKey, action.noteKey])
          expect((locale as Record<string, string>)[key]).toBeTruthy();
      }
    }
  });
});
