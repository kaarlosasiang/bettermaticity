import { describe, it, expect } from 'vitest';
import { isMigratedRoute } from './AppLink';

// Reflects web/migrated-routes.json — the single source of truth for which routes
// React owns. Update these expectations as routes migrate.
describe('isMigratedRoute', () => {
  it('is true for migrated routes (with/without trailing slash)', () => {
    expect(isMigratedRoute('/services/health')).toBe(true);
    expect(isMigratedRoute('/services/health/')).toBe(true);
    expect(isMigratedRoute('/services')).toBe(true);
    expect(isMigratedRoute('/contact')).toBe(true);
  });

  it('is true for the now-migrated core routes (migration complete)', () => {
    expect(isMigratedRoute('/government')).toBe(true);
    expect(isMigratedRoute('/')).toBe(true);
    expect(isMigratedRoute('/news')).toBe(true);
  });

  it('is false for paths not in migrated-routes.json', () => {
    expect(isMigratedRoute('/nonexistent-page')).toBe(false);
    expect(isMigratedRoute('/services/does-not-exist')).toBe(false);
  });

  it('is false for external and protocol links', () => {
    expect(isMigratedRoute('https://mati.gov.ph/')).toBe(false);
    expect(isMigratedRoute('mailto:volunteer@bettermati.org')).toBe(false);
    expect(isMigratedRoute('tel:+639985987122')).toBe(false);
  });
});
