import data from '@data/services.json';

export interface Service {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  keywords: string[];
  fee?: string;
  processingTime?: string;
  office?: string;
  url: string;
  /** Clean absolute path derived from the legacy `url`. */
  path: string;
}

function toPath(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return (
    '/' +
    url
      .replace(/^(\.\.\/)+/, '')
      .replace(/index\.html$/, '')
      .replace(/\.html$/, '')
      .replace(/^\/+/, '')
  );
}

const raw = (data as { services: Omit<Service, 'path'>[] }).services;

export const services: Service[] = raw.map((s) => ({ ...s, path: toPath(s.url) }));
