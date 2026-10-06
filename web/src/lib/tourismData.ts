// Typed access to the placeholder tourism feed (repo-root data/tourism.json,
// imported at build time via the @data alias and baked into the prerendered HTML).
// Mirrors the govData.ts pattern: JSON is the source of truth, this module gives
// it types and a single import point for the Visit Mati page + attraction details.
import tourism from '@data/tourism.json';

export interface AttractionSection {
  heading: string;
  body: string;
}

export interface Attraction {
  slug: string;
  name: string;
  category: string;
  /** Short category used for the directory filter chips. */
  filter: string;
  /** Which shore the place sits on — Pacific, bay, mountain or city. */
  coast: string;
  /** Optional pill shown on the card / hero. */
  badge?: string;
  tagline: string;
  blurb: string;
  /** One-line location shown on the directory card. */
  where: string;
  /** One-line practical note shown on the directory card. */
  note: string;
  /** Prompt shown in the ImageSlot placeholder until a photo is supplied. */
  imageLabel: string;
  /** Public-path image URL; empty string renders the ImageSlot placeholder. */
  image: string;
  /** Featured attractions get a dedicated detail page and a linked card. */
  featured: boolean;
  highlights: string[];
  sections: AttractionSection[];
  coords?: { lat: number; lng: number };
}

export interface HeroCopy {
  tagline: string;
  taglineAccent: string;
  subtitle: string;
}

export interface Conditions {
  place: string;
  status: string;
  open: boolean;
  metrics: { label: string; value: string }[];
  source: string;
  updated: string;
}

export interface Coast {
  key: string;
  badge: string;
  title: string;
  blurb: string;
  tags: string[];
  linkLabel: string;
}

export interface SeasonRow {
  label: string;
  icon: string;
  /** 12 entries, one per month: 'peak' | 'on' | 'off'. */
  cells: string[];
}

export interface Sambuokan {
  when: string;
  title: string;
  blurb: string;
  imageLabel: string;
}

export interface PlanCard {
  icon: string;
  title: string;
  body: string;
  linkLabel?: string;
}

export interface Responsible {
  title: string;
  items: string[];
}

export interface TourismOffice {
  name: string;
  hours: string;
  phoneNote: string;
}

export interface Festival {
  name: string;
  when: string;
  blurb: string;
  imageLabel: string;
}

export interface PlanYourTrip {
  gettingThere: string;
  bestTime: string;
  whereToStay: string[];
  localFood: string[];
  tips: string[];
}

export interface GalleryItem {
  imageLabel: string;
  image: string;
}

export const intro: string = tourism.intro;
export const hero: HeroCopy = tourism.hero as HeroCopy;
export const conditions: Conditions = tourism.conditions as Conditions;
export const coasts: Coast[] = tourism.coasts as Coast[];
export const attractions: Attraction[] = tourism.attractions as Attraction[];
export const filters: string[] = tourism.filters as string[];
export const months: string[] = tourism.months as string[];
export const seasons: SeasonRow[] = tourism.seasons as SeasonRow[];
export const sambuokan: Sambuokan = tourism.sambuokan as Sambuokan;
export const plan: PlanCard[] = tourism.plan as PlanCard[];
export const responsible: Responsible = tourism.responsible as Responsible;
export const tourismOffice: TourismOffice = tourism.tourismOffice as TourismOffice;
export const festivals: Festival[] = tourism.festivals as Festival[];
export const planYourTrip: PlanYourTrip = tourism.planYourTrip as PlanYourTrip;
export const gallery: GalleryItem[] = tourism.gallery as GalleryItem[];

/** Attractions that get a dedicated detail page, in feed order. */
export const featuredAttractions: Attraction[] = attractions.filter((a) => a.featured);

export function getAttraction(slug: string): Attraction | undefined {
  return attractions.find((a) => a.slug === slug);
}
