import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LegislativeRecords } from './LegislativeRecords';
import { ordinances, resolutions } from '@/lib/govData';
import en from '@/locales/en.json';
import fil from '@/locales/fil.json';
import ceb from '@/locales/ceb.json';

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({ t: (key: string) => (en as Record<string, string>)[key] ?? key }),
}));

describe('legislative reference evidence', () => {
  it('shows historical issuing authority, unknown session date and the supporting report', () => {
    render(<LegislativeRecords kind="resolutions" rows={resolutions} />);
    const row = screen.getByRole('row', { name: /365, s. 2005/ });
    expect(within(row).getByText('Sangguniang Bayan of Mati')).toBeTruthy();
    expect(within(row).getByText(en['leg-records-historical'])).toBeTruthy();
    expect(within(row).getByText(en['leg-records-unknown-date'])).toBeTruthy();
    expect(within(row).getByRole('link').getAttribute('href')).toBe(
      'https://www.pna.gov.ph/articles/1082093'
    );
    expect(screen.queryByRole('heading', { name: '2025 Resolutions' })).toBeNull();
  });

  it('does not turn news references into signed instruments or invent legislative dates', () => {
    for (const record of [...ordinances, ...resolutions]) {
      expect(record.verificationStatus).toBe('government-report-reference');
      expect(record.sessionDate).toBeNull();
      expect(record.officialTitle).toBeNull();
      expect(record.fullTextUrl).toBeNull();
      expect(new URL(record.sourceUrl).hostname).toBe('www.pna.gov.ph');
      for (const locale of [en, fil, ceb]) {
        expect((locale as Record<string, string>)[record.summaryKey]).toBeTruthy();
      }
    }
  });
});
