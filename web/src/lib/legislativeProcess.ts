// Legislative process flowchart steps, mirroring the legacy legislative/index.html
// "Flowchart for Legislative Proposal" tabs. Titles/descriptions are i18n keys.

export interface ProcessStep {
  titleKey: string;
  descKey: string;
}

export const ordinanceSteps: ProcessStep[] = [
  { titleKey: 'leg-file-proposed-ordinance', descKey: 'leg-submit-the-proposed-ordinance-to-the-sangguniang' },
  { titleKey: 'leg-first-reading-referral-to-committee', descKey: 'leg-initial-reading-and-assignment-to-the-relevant' },
  { titleKey: 'leg-public-hearing-committee-action', descKey: 'leg-committee-conducts-public-hearing-and-deliberates' },
  { titleKey: 'leg-committee-report', descKey: 'leg-committee-submits-findings-and-recommendations-to' },
  { titleKey: 'leg-second-reading', descKey: 'leg-detailed-discussion-and-debate-on-the-proposed' },
  { titleKey: 'leg-third-and-final-reading', descKey: 'leg-final-voting-on-the-proposed-ordinance-by-the' },
  { titleKey: 'leg-10day-mayors-approval', descKey: 'leg-mayor-reviews-and-approves-the-enacted-ordinance' },
  { titleKey: 'leg-3day-submission-to-sp', descKey: 'leg-submit-approved-ordinance-to-sangguniang' },
  { titleKey: 'leg-sp-review-period', descKey: 'leg-60day-review-for-appropriation-ordinances-30day' },
  { titleKey: 'leg-posting-publication', descKey: 'leg-public-posting-and-publication-of-the-approved' },
  { titleKey: 'leg-implementation', descKey: 'leg-ordinance-takes-effect-and-is-enforced-within-the' },
];

export const resolutionSteps: ProcessStep[] = [
  { titleKey: 'leg-file-proposed-resolution', descKey: 'leg-submit-the-proposed-resolution-to-the-sangguniang' },
  { titleKey: 'leg-inclusion-in-session-agenda', descKey: 'leg-resolution-is-scheduled-for-inclusion-in-the' },
  { titleKey: 'leg-committee-meeting-approval', descKey: 'leg-committee-reviews-and-approves-the-proposed' },
  { titleKey: 'leg-final-draft-printing', descKey: 'leg-legislative-staff-prepares-and-prints-the-final' },
  { titleKey: 'leg-official-signing', descKey: 'leg-secretary-to-the-sanggunian-and-presiding-officer' },
  { titleKey: 'leg-posting-transmittal', descKey: 'leg-resolution-is-posted-publicly-and-transmitted-to' },
];
