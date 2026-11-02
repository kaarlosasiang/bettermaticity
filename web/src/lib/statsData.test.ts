import { describe, expect, it } from 'vitest';
import {
  barangayData,
  barangayCount,
  historicalData,
  povertyStats,
  totalPopulation,
} from './statsData';

describe('verified Mati statistics', () => {
  it('reconciles the complete barangay census to the city total', () => {
    expect(barangayCount).toBe(26);
    expect(new Set(barangayData.map((b) => b.name)).size).toBe(barangayCount);
    expect(barangayData.reduce((sum, b) => sum + b.pop, 0)).toBe(totalPopulation);
    expect(historicalData.years).toHaveLength(historicalData.populations.length);
    expect(historicalData.years.at(-1)).toBe(2024);
  });

  it('keeps poverty reference years and uncertainty intervals consistent', () => {
    expect(povertyStats.map((p) => p.year)).toEqual([2018, 2021, 2023]);
    for (const p of povertyStats) {
      expect(p.lower).toBeLessThan(p.rate);
      expect(p.upper).toBeGreaterThan(p.rate);
      expect(p.upper).toBeLessThanOrEqual(100);
    }
  });
});
