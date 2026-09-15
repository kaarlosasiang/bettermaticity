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

  it('is false for un-migrated legacy routes', () => {
    expect(isMigratedRoute('/government')).toBe(false);
    expect(isMigratedRoute('/')).toBe(false); // home not migrated yet (Wave 8)
    expect(isMigratedRoute('/news')).toBe(false);
  });

  it('is false for external and protocol links', () => {
    expect(isMigratedRoute('https://mati.gov.ph/')).toBe(false);
    expect(isMigratedRoute('mailto:volunteer@bettermati.org')).toBe(false);
    expect(isMigratedRoute('tel:09274008033')).toBe(false);
  });
});
