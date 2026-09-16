// City of Mati fiscal data (FY2025 SRE, ₱ millions). Mirrors the legacy
// transparency-v2.js FINANCIAL_DATA constant.

export interface QuarterFinancials {
  period: string;
  periodLabel: string;
  income: { local: number; external: number; total: number };
  expenditures: { gps: number; social: number; economic: number; debt: number; total: number };
  netIncome: number;
  fundBalance: number;
}

export const financialData: Record<'q1' | 'q2', QuarterFinancials> = {
  q1: {
    period: 'Q1 2025',
    periodLabel: 'Jan - Mar',
    income: { local: 88.85, external: 69.62, total: 158.47 },
    expenditures: { gps: 42.76, social: 13.33, economic: 11.07, debt: 0.35, total: 67.51 },
    netIncome: 90.96,
    fundBalance: 283.29,
  },
  q2: {
    period: 'Q2 2025',
    periodLabel: 'Apr - Jun',
    income: { local: 114.15, external: 139.25, total: 253.4 },
    expenditures: { gps: 88.31, social: 30.56, economic: 20.32, debt: 1.29, total: 140.48 },
    netIncome: 112.92,
    fundBalance: 275.2,
  },
};

/** ₱ millions -> "₱88.85M" */
export function peso(m: number): string {
  return `₱${m.toFixed(2)}M`;
}
