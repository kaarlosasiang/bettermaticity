import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
// Imported before the components: the useLanguage mock reads it when they load.
import en from '@/locales/en.json';
import { ProcurementTable } from './ProcurementTable';
import { procurementNotices } from '@/lib/infrastructureData';

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

const PAGE = 10;
// Plain selectors: role queries over a whole table are slow enough to time out in CI.
const rows = () => [...document.querySelectorAll<HTMLTableRowElement>('table tbody tr')];
const link = (row: HTMLElement) => row.querySelector('a')!;
const byNewest = [...procurementNotices].sort(
  (a, b) => b.publishedOn.localeCompare(a.publishedOn) || b.abc - a.abc
);

describe('procurement table', () => {
  it('pages through every notice, newest first, each linked to its official notice', () => {
    render(<ProcurementTable />);
    const seen: string[] = [];
    const pages = Math.ceil(procurementNotices.length / PAGE);
    for (let page = 1; page <= pages; page++) {
      if (page > 1) fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      for (const row of rows()) {
        expect(link(row)).toHaveAttribute('target', '_blank');
        seen.push(link(row).getAttribute('href')!);
      }
    }
    expect(seen).toEqual(byNewest.map((p) => p.sourceUrl));
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('searches the printed notice title and solicitation number', () => {
    render(<ProcurementTable />);
    const search = screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'CLASSROOMS' } });
    expect(rows()).toHaveLength(2);
    fireEvent.change(search, { target: { value: 'ITB No. 2024' } });
    expect(rows()).toHaveLength(1);
    expect(rows()[0]).toHaveTextContent(en['trans-project-11374254']);
    fireEvent.change(search, { target: { value: 'no such notice' } });
    expect(screen.queryByRole('table')).toBeNull();
    expect(screen.getByText(en['projects-no-match'])).toBeInTheDocument();
  });

  it('filters by status and type, and sorts by ABC', () => {
    render(<ProcurementTable />);
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'Awarded' } });
    const awarded = procurementNotices.filter((p) => p.noticeStatus === 'Awarded');
    expect(rows()).toHaveLength(awarded.length);
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'Civil Works' } });
    fireEvent.change(screen.getByLabelText('Sort order'), { target: { value: 'abc-high' } });
    const civil = procurementNotices
      .filter((p) => p.classification === 'Civil Works')
      .sort((a, b) => b.abc - a.abc);
    expect(rows().map((r) => link(r).getAttribute('href'))).toEqual(
      civil.slice(0, PAGE).map((p) => p.sourceUrl)
    );
  });

  it('flags a sale of City property instead of counting it as a purchase', () => {
    render(<ProcurementTable />);
    const sales = procurementNotices.filter((p) => p.sale);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: sales[0].reference } });
    expect(rows()[0]).toHaveTextContent(en['projects-sale-note']);
    const purchases = procurementNotices.filter((p) => p.noticeStatus === 'Active' && !p.sale);
    expect(screen.getByText(`${purchases.length} active purchases · not money spent`)).toBeTruthy();
  });
});
