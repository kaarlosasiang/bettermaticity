// Selected official procurement notices; budgets are not actual spending.
import local from '@data/local-procurement.json';
import national from '@data/dpwh-projects.json';

export const procurementNotices = [...local.projects, ...national.projects];
export type ProcurementNotice = (typeof procurementNotices)[number];
