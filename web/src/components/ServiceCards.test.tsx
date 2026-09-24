import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FileText, IdCard } from 'lucide-react';
import { ServiceCards } from './ServiceCards';
import { serviceOnlineActions } from '@/lib/serviceOnlineActions';
import { serviceReferences } from '@/lib/serviceReferences';
import en from '@/locales/en.json';
import fil from '@/locales/fil.json';
import ceb from '@/locales/ceb.json';

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({ t: (key: string) => (en as Record<string, string>)[key] ?? key }),
}));
afterEach(cleanup);

describe('service cards', () => {
  it('keeps fee/time rows and separate local-guide and online-order links', () => {
    const { container } = render(
      <MemoryRouter>
        <ServiceCards
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
    expect(screen.getByText('Time:')).toBeTruthy();
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

  it('does not fabricate an online option for barangay services', () => {
    render(
      <ServiceCards
        services={[{ Icon: IdCard, titleKey: 'cert-brgy-id', descKey: 'cert-brgy-id-desc' }]}
      />
    );
    expect(screen.getByRole('heading', { name: 'Barangay ID' })).toBeTruthy();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('all online destinations have evidence and translated action labels and scope notes', () => {
    for (const action of Object.values(serviceOnlineActions)) {
      expect(new URL(action.href).protocol).toBe('https:');
      expect(serviceReferences[action.sourceId]).toBeTruthy();
      for (const locale of [en, fil, ceb]) {
        for (const key of [action.labelKey, action.noteKey])
          expect((locale as Record<string, string>)[key]).toBeTruthy();
      }
    }
  });
});
