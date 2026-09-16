// DPWH national-government infrastructure projects for the Transparency page.
// Build-time import (crawlable/SSG). NOTE: data/dpwh-projects.json is currently a
// `_status: "draft"` placeholder (zero summary + one PLACEHOLDER row), so this
// section renders placeholder content until verified City of Mati data lands —
// matching the legacy runtime behavior. Mirrors legacy assets/js/dpwh-projects.js.
import dpwhJson from '@data/dpwh-projects.json';

export interface DpwhProject {
  id: string;
  name: string;
  location: string;
  category: string;
  contractor: string;
  contractorId: string;
  cost: number;
  /** Percent complete, 0–100. */
  status: number;
  completionDate: string | null;
}

export interface DpwhSummary {
  totalProjects: number;
  totalCost: number;
  completedProjects: number;
  ongoingProjects: number;
  implementingAgency: string;
}

interface DpwhData {
  summary: DpwhSummary;
  projects: DpwhProject[];
}

const data = dpwhJson as unknown as DpwhData;

export const dpwhSummary: DpwhSummary = data.summary;
export const dpwhProjects: DpwhProject[] = data.projects ?? [];

/** Filter categories mirror the legacy substring buckets. */
export type DpwhFilter = 'all' | 'buildings' | 'roads' | 'flood' | 'water';

export function dpwhCategoryKey(category: string): Exclude<DpwhFilter, 'all'> {
  if (category.includes('Flood')) return 'flood';
  if (category.includes('Road')) return 'roads';
  if (category.includes('Water')) return 'water';
  return 'buildings';
}

export function dpwhCategoryLabel(category: string): string {
  if (category.includes('Flood')) return 'Flood Control';
  if (category.includes('Road')) return 'Roads';
  if (category.includes('Water')) return 'Water';
  return 'Buildings';
}

/** "₱1,234,567.00" — matches legacy formatCurrency. */
export function pesoFull(amount: number): string {
  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** "2024-01-15" -> "Jan 15, 2024" (stable for SSG); null -> "—". */
export function dpwhDate(iso: string | null): string {
  if (!iso) return '—';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const mon = months[Number(m[2]) - 1];
  return mon ? `${mon} ${Number(m[3])}, ${m[1]}` : iso;
}
