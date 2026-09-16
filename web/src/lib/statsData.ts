// City of Mati statistics (real data — PSA CPH / 2024 POPCEN, DTI CMCI 2024).

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

// --- Municipal Finance (FY2023, BLGF 2023 SRE) ---
export const municipalFinance = {
  fiscalYear: '2023',
  annualIncome: { display: '₱371.33M', detail: '₱371,329,918.71' },
  iraShare: { display: '₱220.77M', detail: 'Internal Revenue Allotment' },
  iraDependency: { display: '59.45%', detail: 'National Tax Share' },
  // Income composition (stacked): must sum to 100.
  composition: { ira: 59.45, local: 40.55 },
};

// --- Economic Indicators (REAL — BLGF 2023) ---
export interface EconomicSector {
  name: string;
  pct: number;
}

export const economicIndicators = {
  registeredBusinesses: { value: '1,200', trend: '+8% from last year' },
  agriculturalLand: { value: '8,500 ha', note: 'Rice & Corn Production' },
  employmentRate: { value: '94.2%', note: 'Labor Force Participation' },
  sectors: [
    { name: 'Agriculture', pct: 45 },
    { name: 'Trade & Commerce', pct: 30 },
    { name: 'Services', pct: 20 },
    { name: 'Industry', pct: 5 },
  ] as EconomicSector[],
};

// --- Poverty Statistics (PSA 2021 City & Municipal-Level Poverty Estimates) ---
export const povertyStats = {
  y2018: { rate: '7.0', ci: '90% CI: 4.7% - 9.2%', width: 7 },
  y2021: { rate: '6.4', ci: '90% CI: 4.7% - 8.1%', width: 6.4 },
  change: '-0.6%',
};

// --- CMCI (DTI Cities and Municipalities Competitiveness Index, 2024) ---
export interface CmciIndicator {
  name: string;
  value: string; // preserve legacy decimal formatting verbatim
  fill: number; // bar width percentage (legacy data-value)
}

export interface CmciPillar {
  label: string;
  score: number;
  // Legacy pillar-trend badge on the overview cards.
  trend: { label: string; dir: 'up' | 'down' | 'stable' };
  indicators: CmciIndicator[];
}

export const cmciData: {
  year: string;
  overall: { rank: number; score: number };
  pillars: CmciPillar[];
} = {
  year: '2024',
  overall: { rank: 55, score: 38.2894 },
  pillars: [
    {
      label: 'Economic Dynamism',
      score: 3.3009,
      trend: { label: '+13%', dir: 'up' },
      indicators: [
        { name: 'Local Economy Size', value: '0.0126', fill: 0.5 },
        { name: 'Local Economy Growth', value: '0.0018', fill: 0.07 },
        { name: 'Active Establishments', value: '0.1895', fill: 7.58 },
        { name: 'Safety Compliant Business', value: '0.1548', fill: 6.19 },
        { name: 'Employment Generation', value: '0.0124', fill: 0.5 },
        { name: 'Cost of Living', value: '0.9014', fill: 36.06 },
        { name: 'Cost of Doing Business', value: '1.6116', fill: 64.46 },
        { name: 'Financial Deepening', value: '0.3169', fill: 12.68 },
        { name: 'Productivity', value: '0.0178', fill: 0.71 },
        { name: 'Business & Professional Orgs', value: '0.0821', fill: 3.28 },
      ],
    },
    {
      label: 'Government Efficiency',
      score: 10.6206,
      trend: { label: '+14%', dir: 'up' },
      indicators: [
        { name: "Compliance to Nat'l Directives", value: '2.0000', fill: 80.0 },
        { name: 'Investment Promotion Unit', value: '1.9048', fill: 76.19 },
        { name: 'ARTA Citizens Charter', value: '2.0000', fill: 80.0 },
        { name: 'Generate Local Resource', value: '0.1942', fill: 7.77 },
        { name: 'Health Services Capacity', value: '0.1777', fill: 7.11 },
        { name: 'School Services Capacity', value: '0.4508', fill: 18.03 },
        { name: 'Recognition of Performance', value: '0.3582', fill: 14.33 },
        { name: 'Getting Business Permits', value: '2.0000', fill: 80.0 },
        { name: 'Peace and Order', value: '0.0709', fill: 2.84 },
        { name: 'Social Protection', value: '1.4640', fill: 58.56 },
      ],
    },
    {
      label: 'Infrastructure',
      score: 4.2019,
      trend: { label: '-18%', dir: 'down' },
      indicators: [
        { name: 'Road Network', value: '0.0021', fill: 0.08 },
        { name: 'Distance to Ports', value: '1.9369', fill: 77.48 },
        { name: 'Basic Utilities', value: '1.2365', fill: 49.46 },
        { name: 'Transportation Vehicles', value: '0.0442', fill: 1.77 },
        { name: 'Education', value: '0.3035', fill: 12.14 },
        { name: 'Health', value: '0.2061', fill: 8.24 },
        { name: 'LGU Investment', value: '0.0214', fill: 0.86 },
        { name: 'Accommodation Capacity', value: '0.2043', fill: 8.17 },
        { name: 'IT Capacity', value: '0.1784', fill: 7.14 },
        { name: 'FinTech Capacity', value: '0.0685', fill: 2.74 },
      ],
    },
    {
      label: 'Resiliency',
      score: 11.5266,
      trend: { label: 'Stable', dir: 'stable' },
      indicators: [
        { name: 'Land Use Plan', value: '1.9828', fill: 79.31 },
        { name: 'DRR Plan', value: '1.9545', fill: 78.18 },
        { name: 'Annual Disaster Drill', value: '1.0227', fill: 40.91 },
        { name: 'Early Warning System', value: '1.0089', fill: 40.36 },
        { name: 'DRRMP Budget', value: '0.0570', fill: 2.28 },
        { name: 'Local Risk Assessments', value: '2.0000', fill: 80.0 },
        { name: 'Emergency Infrastructure', value: '0.4062', fill: 16.25 },
        { name: 'Utilities', value: '1.5058', fill: 60.23 },
        { name: 'Employed Population', value: '0.0827', fill: 3.31 },
        { name: 'Sanitary System', value: '1.5060', fill: 60.24 },
      ],
    },
    {
      label: 'Innovation',
      score: 8.6394,
      trend: { label: '-5%', dir: 'down' },
      indicators: [
        { name: 'ICT Plan', value: '2.0001', fill: 80.0 },
        { name: 'R&D Expenditures', value: '0.0025', fill: 0.1 },
        { name: 'E-BPLS Software', value: '2.0000', fill: 80.0 },
        { name: 'Online Payment Facilities', value: '2.0000', fill: 80.0 },
        { name: 'STEM Graduates', value: '0.1440', fill: 5.76 },
        { name: 'IP Registration', value: '0.1476', fill: 5.9 },
        { name: 'Internet Capability', value: '1.0025', fill: 40.1 },
        { name: 'Basic Internet Service', value: '1.0407', fill: 41.63 },
        { name: 'Startup & Innovation Facilities', value: '0.3002', fill: 12.01 },
        { name: 'New Technology', value: '0.0018', fill: 0.07 },
      ],
    },
  ],
};

export const totalPopulation = historicalData.populations[historicalData.populations.length - 1];
export const barangayCount = barangayData.length;
