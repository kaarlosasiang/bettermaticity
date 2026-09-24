import { describe, expect, it } from 'vitest';
import { annualFinancials as q, fiscalSource, financialOutlook } from './budgetData';
import { procurementNotices } from './infrastructureData';
import en from '../locales/en.json';
import fil from '../locales/fil.json';
import ceb from '../locales/ceb.json';

describe('transparency data integrity', () => {
  it('reconciles receipts and expenditure categories, including non-operating amounts', () => {
    expect(q.receipts.local + q.receipts.external + q.receipts.nonIncome).toBeCloseTo(
      q.receipts.total,
      2
    );
    const { total, ...categories } = q.expenditures;
    expect(
      Math.abs(
        Object.values(categories).reduce<number>((sum, amount) => sum + (amount ?? 0), 0) - total
      )
    ).toBeLessThanOrEqual(0.011);
    expect(q.receipts.nta).toBeLessThanOrEqual(q.receipts.external);
  });

  it('reconciles ending cash after prior-year payments and continuing appropriations', () => {
    // Independently rounded source columns can differ by PHP 0.01 million.
    const availableCash = q.beginningCashBalance + q.receipts.total - q.expenditures.total;
    expect(Math.abs(availableCash - q.fundCashAvailable)).toBeLessThanOrEqual(0.011);
    const endingCash = q.fundCashAvailable - q.priorYearPayables - q.continuingAppropriation;
    expect(Math.abs(endingCash - q.endingCashBalance)).toBeLessThanOrEqual(0.011);
  });

  it('keeps the fiscal year distinct from the source publication year', () => {
    expect(q.year).toBe(2025);
    expect(q.status).toBe('reported');
    expect(fiscalSource.url).toContain('/BESF2027/F13.pdf');
    expect(fiscalSource.pages).toEqual([594, 595]);
  });

  it('keeps current and future year planning figures separate from reported results', () => {
    expect(financialOutlook.map((r) => r.year)).toEqual([2026, 2027]);
    for (const record of financialOutlook) {
      expect(record.status).toBe('planning');
      expect(record.year).toBeGreaterThan(q.year);
      expect(record.nta).toBeLessThan(record.receipts);
      expect(record.source.url).toContain('/BESF2027/');
    }
  });

  it('keeps procurement ceilings separate from unknown awards and completion', () => {
    expect(new Set(procurementNotices.map((p) => p.reference)).size).toBe(
      procurementNotices.length
    );
    for (const p of procurementNotices) {
      expect(p.abc).toBeGreaterThan(0);
      expect(p.awardAmount).toBeNull();
      expect(p.completionPercent).toBeNull();
      expect(p.contractor).toBeNull();
      const url = new URL(p.sourceUrl);
      if (p.sourceName === 'PhilGEPS') {
        expect(url.hostname).toBe('notices.philgeps.gov.ph');
        expect(url.searchParams.get('refid')).toBe(p.reference);
      } else {
        expect(url.hostname).toBe('ffedis.da.gov.ph');
        expect(p.noticeStatus).toBe('Closed Expired');
        expect(p.updatedOn).toBeNull();
        expect(p.publishedOn).toBe('2026-07-14');
      }
    }
    expect(new Set(procurementNotices.map((p) => p.scope))).toEqual(new Set(['local', 'national']));
  });

  it('provides transparency explanations in every supported language', () => {
    for (const key of Object.keys(en).filter((key) => key.startsWith('trans-'))) {
      for (const locale of [fil, ceb]) expect(locale).toHaveProperty(key);
    }
  });
});
