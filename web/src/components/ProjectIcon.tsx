import { createElement } from 'react';
import { Building2, Droplets, Plane, Ship, Signpost, type LucideProps } from 'lucide-react';
import type { RisingProject } from '@/lib/risingProjects';

const icons = { airport: Plane, water: Droplets, building: Building2, port: Ship, road: Signpost };

/** The icon for a project's category; buildings for anything unlisted. */
export function ProjectIcon({ project, ...props }: { project: RisingProject } & LucideProps) {
  return createElement(icons[project.category as keyof typeof icons] ?? Building2, props);
}
