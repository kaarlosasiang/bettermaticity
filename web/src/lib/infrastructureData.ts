// Local infrastructure investments shown on the Transparency (Budget) page.
// Mirrors the legacy budget/index.html "Infrastructure Investments" cards.
// Values are real (Sumbong sa Pangulo flood-control records); rendered as literals.

export interface InfraProject {
  /** i18n key for the project title. */
  titleKey: string;
  year: string;
  /** Location as a literal string (legacy corrected to Davao Oriental). */
  location: string;
  /** i18n key for the "Type of Work" value. */
  typeOfWorkKey: string;
  /** i18n key for the contractor name. */
  contractorKey: string;
  /** Contract cost as a literal peso string. */
  contractCost: string;
  mapUrl: string;
}

export const infraProjects: InfraProject[] = [
  {
    titleKey: 'budget-fcds-package-5-magat-river-flood-control',
    year: '2024',
    location: 'Magat River, [Barangay] Section, Mati, Davao Oriental',
    typeOfWorkKey: 'budget-construction-of-flood-mitigation-structure',
    contractorKey: 'budget-egb-construction-corporation',
    contractCost: '₱144,750,000',
    mapUrl: 'https://sumbongsapangulo.ph/flood-control-map/',
  },
  {
    titleKey: 'budget-repairrehabilitation-of-flood-control-and',
    year: '2021',
    location: 'Magat River, Bangar Section 1, Brgy. Bangar, Mati, Davao Oriental',
    typeOfWorkKey: 'budget-rehabilitation-major-repair-of-flood-control',
    contractorKey: 'budget-shanley-construction',
    contractCost: '₱29,700,000',
    mapUrl: 'https://sumbongsapangulo.ph/flood-control-map/',
  },
  {
    titleKey: 'budget-repairrehabilitation-of-flood-control-and-2',
    year: '2021',
    location: 'Magat River, Bangar Section 2, Brgy. Bangar, Mati, Davao Oriental',
    typeOfWorkKey: 'budget-rehabilitation-major-repair-of-flood-control',
    contractorKey: 'budget-shanley-construction',
    contractCost: '₱29,700,000',
    mapUrl: 'https://sumbongsapangulo.ph/flood-control-map/',
  },
];
