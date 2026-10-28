import data from '@data/service-references.json';
import type { Language } from '@/i18n';

export type ServiceText = Record<Language, string>;
export interface ServiceReference {
  title: string;
  url: string;
  scope: string;
  claim: ServiceText;
  checkedOn: string | null;
}
export interface ServiceRequirement {
  item: ServiceText;
  whereToSecure?: ServiceText;
  /** Condition shown as an "Applies only" flag, e.g. "For corporations". */
  appliesOnly?: ServiceText;
}
export interface ServiceGuideData {
  title: ServiceText;
  category: string;
  summary: ServiceText;
  ask: ServiceText;
  sources: string[];
  /* Optional, fill only from a verified City of Mati source (e.g. the Citizen's Charter).
     While absent, the detail page shows a marked [Placeholder] or "Confirm with office". */
  requirements?: ServiceRequirement[];
  steps?: ServiceText[];
  eligibility?: ServiceText;
  processingTime?: ServiceText;
  fee?: ServiceText;
  office?: ServiceText;
}
export const serviceReferences: Record<string, ServiceReference> = data.sources;
export const serviceGuides: Record<string, ServiceGuideData> = data.guides;
export const serviceCategoryReferences: Record<string, string[]> = data.categories;
export const serviceReviewDate = data.reviewedOn;
export function serviceText(value: ServiceText, language: Language): string {
  return value[language] ?? value.en;
}
