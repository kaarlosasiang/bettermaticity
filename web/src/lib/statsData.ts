// City of Mati figures checked 2026-09-24. See docs/research/statistics-verification-2026-09-24.md.

export interface BarangayPop {
  name: string;
  pop: number;
}

export const barangayData: BarangayPop[] = [
  { name: 'Central', pop: 31934 },
  { name: 'Dahican', pop: 18756 },
  { name: 'Matiao', pop: 16719 },
  { name: 'Sainz', pop: 10710 },
  { name: 'Badas', pop: 7154 },
  { name: 'Macambol', pop: 6290 },
  { name: 'Bobon', pop: 5142 },
  { name: 'Don Martin Marundan', pop: 5098 },
  { name: 'Don Salvador Lopez, Sr.', pop: 4832 },
  { name: 'Don Enrique Lopez', pop: 4303 },
  { name: 'Dawan', pop: 4052 },
  { name: 'Buso', pop: 3970 },
  { name: 'Tamisan', pop: 3690 },
  { name: 'Lawigan', pop: 3239 },
  { name: 'Mayo', pop: 3129 },
  { name: 'Libudon', pop: 2513 },
  { name: 'Mamali', pop: 2362 },
  { name: 'Taguibo', pop: 2338 },
  { name: 'Cabuaya', pop: 2197 },
  { name: 'Culian', pop: 1848 },
  { name: 'Tagabakid', pop: 1809 },
  { name: 'Tagbinonga', pop: 1663 },
  { name: 'Sanghay', pop: 1505 },
  { name: 'Luban', pop: 1373 },
  { name: 'Langka', pop: 1271 },
  { name: 'Danao', pop: 775 },
];

export const historicalData = {
  years: [1990, 1995, 2000, 2007, 2010, 2015, 2020, 2024],
  populations: [93023, 93801, 105908, 122046, 126143, 141141, 147547, 148672],
};

// --- Key metrics (legacy "Key Metrics" tiles) ---
export const landAreaKm2 = '588.63';
export const incomeClass = '1st';

export const statisticsCheckedOn = '2026-09-24';
export const populationReferenceDate = '2024-07-01';
export const statisticsSources = {
  psgc: {
    title: 'PSA PSGC — City of Mati, 2024 POPCEN',
    url: 'https://psa.gov.ph/classification/psgc/barangays/1102509000',
  },
  history: {
    title: 'PSA 2015 Census, Davao Oriental — Table 1, pp. 3–4',
    url: 'https://psa.gov.ph/system/files/main-publication/11_Davao%2520Oriental.pdf#page=30',
  },
  census2007: {
    title: 'PSA 2007 Census — Davao Oriental',
    url: 'https://psa.gov.ph/statistics/population-and-housing/node/738',
  },
  area: {
    title: 'PSA population density table — p. 47 (2013 land areas)',
    url: 'https://psa.gov.ph/system/files/phcd/2022-12/2010-2015-2020%2520Population%2520Density_Table%2520A_Using%25202013%2520Land%2520Areas_12%2520July%25202021.pdf#page=47',
  },
  finance: {
    title: 'DBM BESF 2027 — Table F.13, FY2025, pp. 594–595',
    url: 'https://www.dbm.gov.ph/wp-content/uploads/BESF/BESF2027/F13.pdf#page=3',
    publishedOn: '2026-08-11',
  },
  poverty: {
    title: 'PSA 2023 city- and municipal-level poverty estimates',
    url: 'https://psa.gov.ph/content/881-cities-and-municipalities-recorded-poverty-incidence-20-percent-or-lower-2023',
    publishedOn: '2026-02-06',
  },
  povertyArchive: {
    title: 'Archived PSA workbook — Annex 1, Mati row 1376',
    url: 'https://archive.org/details/2-2023-sae-with-psgc-no-huc-06-feb-2026',
  },
  cmci: {
    title: 'DTI CMCI — Mati profile',
    url: 'https://cmci.dti.gov.ph/lgu-profile.php?lgu=Mati',
  },
};

// DBM BESF 2027 F.13: FY2025 actual LIFT submissions, PHP millions.
// NTA is included in external receipts. Non-income receipts include borrowings.
export const municipalFinance = {
  fiscalYear: 2025,
  receipts: { local: 252.55, external: 1837.19, nonIncome: 289.11, total: 2378.85, nta: 1776.97 },
  expenditures: 1672.95,
};
export const ntaShareOfReceipts =
  (municipalFinance.receipts.nta / municipalFinance.receipts.total) * 100;

// PSA Annex 1, PSGC 112509, row 1376. Archived workbook inspected directly.
// Incidence among population; percentages, not fractions. Retain source precision.
export const povertyStats = [
  { year: 2018, rate: 21.51, lower: 18.04, upper: 24.98 },
  { year: 2021, rate: 21.814703, lower: 19.7209598209066, upper: 23.9084461790934 },
  { year: 2023, rate: 30.393506, lower: 28.0017416198823, upper: 32.7852703801177 },
];

// Unverified economic and CMCI values are deliberately excluded from published data.
export const totalPopulation = historicalData.populations[historicalData.populations.length - 1];
export const barangayCount = barangayData.length;
export const populationDensity = totalPopulation / Number(landAreaKm2);
