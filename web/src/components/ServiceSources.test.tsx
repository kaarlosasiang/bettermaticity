import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ServiceSources } from './ServiceSources';
import {
  serviceCategoryReferences,
  serviceGuides,
  serviceReferences,
} from '@/lib/serviceReferences';
import serviceData from '@data/services.json';
import migratedRoutes from '../../migrated-routes.json';
import en from '@/locales/en.json';
import fil from '@/locales/fil.json';
import ceb from '@/locales/ceb.json';

vi.mock('@/hooks/useLanguage', () => ({
  useLanguage: () => ({
    language: 'en',
    t: (key: string) => (en as Record<string, string>)[key] ?? key,
  }),
}));
afterEach(cleanup);

describe('service evidence and navigation', () => {
  it('covers every service category and detail route with resolvable evidence', () => {
    for (const path of migratedRoutes) {
      const route = path.replace(/^\//, '');
      const ids = route.startsWith('service-details/')
        ? serviceGuides[route.slice('service-details/'.length)]?.sources
        : route === 'services' || route.startsWith('services/')
          ? serviceCategoryReferences[route.split('/').at(-1)!]
          : null;
      if (!route.startsWith('service')) continue;
      expect(ids, route).toBeTruthy();
      expect(ids!.length, route).toBeGreaterThan(0);
      for (const id of ids!) {
        expect(serviceReferences[id], `${route}: ${id}`).toBeTruthy();
        expect(new URL(serviceReferences[id].url).protocol).toBe('https:');
      }
    }
  });

  it('keeps search destinations on live routes and removes unsupported fee promises', () => {
    const routes = new Set(migratedRoutes.map((route) => '/' + route.replace(/^\//, '')));
    for (const service of serviceData.services) {
      expect(routes.has(service.url), service.id).toBe(true);
      expect(service).not.toHaveProperty('fee');
      expect(service).not.toHaveProperty('processingTime');
      expect(service.url).not.toContain('nuevavizcaya');
      for (const id of service.sourceIds) expect(serviceReferences[id]).toBeTruthy();
    }
  });

  it('distinguishes supported guidance from unconfirmed local transaction details', () => {
    render(<ServiceSources category="education" />);
    expect(
      screen.getByRole('link', { name: 'DOrSU — Scholarships and Grants' }).getAttribute('href')
    ).toBe('https://dorsu.edu.ph/scholarships-grants/');
    expect(screen.getByText(/listing does not confirm open slots/)).toBeTruthy();
    expect(screen.getByText(/Current Mati fees, complete requirements/)).toBeTruthy();
  });

  it('does not claim a fresh health-registry verification', () => {
    render(<ServiceSources category="health" />);
    expect(screen.getByText(/Live data not rechecked/)).toBeTruthy();
    expect(serviceReferences.health.checkedOn).toBeNull();
  });

  it('provides all new guidance and labels in three languages', () => {
    const texts = [
      ...Object.values(serviceReferences).map((source) => source.claim),
      ...Object.values(serviceGuides).flatMap((guide) => [guide.title, guide.summary, guide.ask]),
    ];
    for (const text of texts)
      for (const language of ['en', 'fil', 'ceb'] as const) expect(text[language]).toBeTruthy();
    for (const key of Object.keys(en).filter((key) => key.startsWith('service-'))) {
      expect((fil as Record<string, string>)[key], key).toBeTruthy();
      expect((ceb as Record<string, string>)[key], key).toBeTruthy();
    }
  });
});
