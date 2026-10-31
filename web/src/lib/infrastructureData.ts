// Official procurement notices; budgets are not actual spending.
import local from '@data/local-procurement.json';
import national from '@data/dpwh-projects.json';

export const procurementNotices = [...local.projects, ...national.projects];
export type ProcurementNotice = (typeof procurementNotices)[number];
export const procurementCheckedOn = local.checkedOn;

/** Search text for a notice: its plain-English name plus everything printed on it. */
export const noticeSearchText = (p: ProcurementNotice) =>
  [
    p.name,
    p.noticeTitle,
    p.id,
    p.reference,
    p.mode,
    p.classification,
    p.category,
    p.location,
    p.agency,
    p.funding,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
