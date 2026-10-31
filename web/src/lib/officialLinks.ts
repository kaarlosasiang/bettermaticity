// Official online destinations for the City of Mati, each opened on its check date.
import feed from '@data/official-links.json';

export type LinkKind = 'website' | 'service' | 'social' | 'national';
export const LINK_KINDS: LinkKind[] = ['website', 'service', 'social', 'national'];

export interface OfficialLink {
  id: string;
  kind: LinkKind;
  name: string;
  owner: string;
  purpose: string;
  url: string;
  note: string | null;
  checkedOn: string;
}

export const officialLinks = feed.links as OfficialLink[];
export const officialLinksCheckedOn = feed.checkedOn;

/** The bare host shown under each link, e.g. mati.gov.ph. */
export const linkHost = (url: string) => new URL(url).hostname.replace(/^www\./, '');
