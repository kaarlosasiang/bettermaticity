import reports from '@data/rising-projects.json';
import { procurementNotices } from './infrastructureData';

export interface RisingProject {
  id: string;
  category: string;
  titleKey: string;
  scope: string;
  status: string;
  sourceDate: string;
  amount: number;
  amountKind: string;
  detailKey: string;
  sources: { label: string; url: string }[];
}

// Reuse the procurement records so their amounts and dates cannot drift between sections.
const infrastructureReferences = ['11374254', '11439666'];
const noticeProjects: RisingProject[] = procurementNotices
  .filter((notice) => infrastructureReferences.includes(notice.reference))
  .map((notice) => ({
    id: `notice-${notice.reference}`,
    category: notice.reference === '11374254' ? 'water' : 'building',
    titleKey: `trans-project-${notice.reference}`,
    scope: notice.scope,
    status: notice.noticeStatus === 'Awarded' ? 'awarded' : 'notice',
    sourceDate: notice.updatedOn ?? notice.publishedOn,
    amount: notice.abc,
    amountKind: 'abc',
    detailKey: 'rising-procurement-detail',
    sources: [{ label: `${notice.sourceName} · ${notice.reference}`, url: notice.sourceUrl }],
  }));

export const projectsCheckedOn = reports.checkedOn;
export const risingProjects: RisingProject[] = [
  ...reports.projects.slice(0, 2),
  ...noticeProjects,
  ...reports.projects.slice(2),
];
export const featuredProjects = risingProjects.slice(0, 4);
export const projectAnchor = (project: RisingProject) => `project-${project.id}`;

// Where each status sits in a public project's paper trail. This is the stage of the dated
// source record, not a measure of construction progress.
export const stages = ['announced', 'budgeted', 'awarded', 'completed'] as const;
export const stageOf: Record<string, number> = {
  announced: 1,
  appropriated: 2,
  awarded: 3,
  'reported-complete': 4,
};
