// Typed access to the Full Disclosure archive and the official documents index
// (repo-root data/full-disclosure.json and data/official-documents.json). Each record
// was opened and checked; titles and periods are as printed on the document.
import fdp from '@data/full-disclosure.json';
import docs from '@data/official-documents.json';

export interface FdpRecord {
  type: string;
  title: string;
  period: string;
  issuer: string;
  url: string;
  originalUrl: string;
  archivedOn: string;
  pages: number;
  checkedOn: string;
}

export interface FdpDocumentType {
  name: string;
  meaning: string;
}

export type DocumentStatus = 'current' | 'archived' | 'unavailable';

export interface OfficialDocument {
  id: string;
  title: string;
  type: string;
  issuer: string;
  edition: string;
  status: DocumentStatus;
  url: string;
  originalUrl?: string;
  archivedOn?: string;
  pages?: number;
  parts?: { label: string; url: string; pages: number }[];
  note: string;
  checkedOn: string;
}

export const fdpPortal = fdp.portal;
export const fdpCheckedOn = fdp.checkedOn;
export const fdpDocumentTypes: FdpDocumentType[] = fdp.documentTypes;
export const fdpRecords: FdpRecord[] = fdp.records;

/** The first four-digit year printed in a period, or null ("Not stated on the document"). */
export function recordYear(period: string): number | null {
  const m = period.match(/\b(19|20)\d{2}\b/);
  return m ? Number(m[0]) : null;
}

export const officialDocuments = docs.documents as OfficialDocument[];
export const documentsCheckedOn = docs.checkedOn;
