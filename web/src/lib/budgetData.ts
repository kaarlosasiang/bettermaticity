// Transcribed from the Mati row in DBM BESF 2027, Table F.13 (pp. 594–595).
// Values are PHP millions. Keep fiscal year and publication year distinct.
import fiscal from '@data/fiscal_transparency.json';

export const fiscalSource = fiscal.source;
export const annualFinancials = fiscal.fiscal_years.find((record) => record.year === 2025)!;
export const financialOutlook = fiscal.outlook;

/** PHP millions, preserving the source's two-decimal precision. */
export function peso(millions: number): string {
  return `₱${millions.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M`;
}
