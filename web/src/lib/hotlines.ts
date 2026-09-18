import type { LucideIcon } from 'lucide-react';
import {
  TriangleAlert,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldHalf,
  Heart,
  Flame,
  Hospital,
  Ambulance,
  Anchor,
  Bomb,
  TrafficCone,
  CirclePlus,
  Siren,
} from 'lucide-react';
import hotlinesJson from '@data/emergency-hotlines.json';

/**
 * Emergency hotlines — single source of truth is `data/emergency-hotlines.json`,
 * transcribed from the City DRRMO's official hotline graphic (see `_source_url`
 * in that file). Imported at build time, so the numbers are baked into the
 * prerendered HTML and are readable without JavaScript.
 *
 * NEVER hard-code an emergency number in a component. Add it to the JSON and let
 * it flow here; `hotlines.data.test.ts` fails the build if a surface drifts.
 */

export type NumberType = 'landline' | 'mobile' | 'shortcode';

export interface HotlineNumber {
  /** Human-readable form, e.g. "(087) 388-3426". */
  display: string;
  /** Normalised dialable value for `tel:` — E.164, or a bare shortcode. */
  tel: string;
  type: NumberType;
  /** Exact grouping printed on the source graphic, when it differs from `display`. */
  source_display?: string;
}

export interface Hotline {
  id: string;
  /** i18n key for the office name; falls back to `name`. */
  nameKey: string;
  /** English office name, as printed on the source graphic. */
  name: string;
  /** Acronym / short label for the compact hotline bar. */
  short: string;
  /** i18n key for `short`, when the label is a word rather than an acronym. */
  shortKey?: string;
  category: 'emergency' | 'medical';
  icon: string;
  /** Present (and lower = more urgent) for the numbers shown in the hotline bar. */
  priority?: number;
  numbers: HotlineNumber[];
}

export interface HotlineProvenance {
  status: string;
  source: string;
  sourceTitle: string;
  sourceUrl: string;
  verifiedOn: string;
  approvedBy: string | null;
}

const icons: Record<string, LucideIcon> = {
  'triangle-alert': TriangleAlert,
  shield: Shield,
  'shield-check': ShieldCheck,
  'shield-alert': ShieldAlert,
  'shield-half': ShieldHalf,
  heart: Heart,
  flame: Flame,
  hospital: Hospital,
  ambulance: Ambulance,
  anchor: Anchor,
  bomb: Bomb,
  'traffic-cone': TrafficCone,
  'circle-plus': CirclePlus,
  siren: Siren,
};

/** Icon for a hotline's `icon` slug. Unknown slugs degrade to a generic alert. */
export function hotlineIcon(slug: string): LucideIcon {
  return icons[slug] ?? TriangleAlert;
}

/**
 * Offices keep the number order printed on the source graphic. A directory that
 * lists every line (/contact, /services/public-safety, offline.html) reads in the
 * same sequence as the official poster, so a resident comparing the two — and the
 * approver signing the dataset off — sees no rearrangement.
 *
 * Surfaces with room for only one number are the exception: see `primaryNumber`.
 */

/** The 911 national emergency hotline — rendered ahead of every local number. */
export const nationalHotline = hotlinesJson.national as Omit<Hotline, 'category'>;

export const allHotlines = hotlinesJson.hotlines as Hotline[];

/** Police, fire, disaster, social welfare, security. */
export const emergencyHotlines: Hotline[] = allHotlines.filter((h) => h.category === 'emergency');

/** Medical response and health offices. */
export const medicalHotlines: Hotline[] = allHotlines.filter((h) => h.category === 'medical');

/**
 * The short list for the always-visible hotline bar: 911 plus the flagged
 * offices, most urgent first.
 */
export const priorityHotlines: Hotline[] = allHotlines
  .filter((h) => typeof h.priority === 'number')
  .sort((a, b) => (a.priority as number) - (b.priority as number));

/** Provenance for the "verified against" footnote shown under each directory. */
export const hotlineProvenance: HotlineProvenance = {
  status: hotlinesJson._status,
  source: hotlinesJson._source,
  sourceTitle: hotlinesJson._source_title,
  sourceUrl: hotlinesJson._source_url,
  verifiedOn: hotlinesJson._verified_on,
  approvedBy: hotlinesJson._approved_by,
};

/** "(087) 388-3426 · 0912-345-4666" — every number for an office, in one line. */
export function joinNumbers(h: Hotline | Omit<Hotline, 'category'>): string {
  return h.numbers.map((n) => n.display).join(' · ');
}

/**
 * The one number to dial when a surface has room for a single line — the red
 * hotline bar, a service page's sidebar, the government directory.
 *
 * Prefers a mobile. A landline is the first thing to drop in a typhoon or a power
 * cut, and the shortcodes (911, 160) route to national desks rather than to the
 * Mati station, so neither is a good sole point of contact. Falls back to the first
 * published line for an office that has no cell number (911 itself).
 *
 * This does NOT reorder the full directories — those follow the poster.
 */
export function primaryNumber(h: Hotline | Omit<Hotline, 'category'>): HotlineNumber {
  return h.numbers.find((n) => n.type === 'mobile') ?? h.numbers[0];
}

/** Look up one office by id. Throws at build time if the id is gone from the JSON. */
export function hotlineById(id: string): Hotline {
  const found = allHotlines.find((h) => h.id === id);
  if (!found) throw new Error(`Unknown hotline id: ${id}`);
  return found;
}
