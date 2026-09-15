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

export interface CmciPillar {
  label: string;
  score: number;
}

export const cmciData: {
  year: string;
  overall: { rank: number; score: number };
  pillars: CmciPillar[];
} = {
  year: '2024',
  overall: { rank: 55, score: 38.2894 },
  pillars: [
    { label: 'Economic Dynamism', score: 3.3009 },
    { label: 'Government Efficiency', score: 10.6206 },
    { label: 'Infrastructure', score: 4.2019 },
    { label: 'Resiliency', score: 11.5266 },
    { label: 'Innovation', score: 8.6394 },
  ],
};

export const totalPopulation = historicalData.populations[historicalData.populations.length - 1];
export const barangayCount = barangayData.length;
