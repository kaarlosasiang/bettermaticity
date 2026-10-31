// Transcribed from the Mati rows in DBM BESF Table F.13, one edition per fiscal year
// (FY2021–FY2025; see docs/research). Values are PHP millions. Keep fiscal year and
// publication year distinct, and never bridge cash across editions.
import fiscal from '@data/fiscal_transparency.json';

export const fiscalSource = fiscal.source;
export const annualFinancials = fiscal.fiscal_years.find((record) => record.year === 2025)!;
export const financialOutlook = fiscal.outlook;

/** Reported years, oldest first. Each carries its own source edition. */
export const fiscalYears = [...fiscal.fiscal_years].sort((a, b) => a.year - b.year);

/** PHP millions, preserving the source's two-decimal precision. */
export function peso(millions: number): string {
  return `₱${millions.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M`;
}
