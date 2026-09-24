/** Destinations inspected 2026-09-25. sourceId refers to the evidence register. */
export const serviceOnlineActions = {
  psa: {
    href: 'https://psahelpline.ph/',
    labelKey: 'service-online-psa',
    noteKey: 'service-online-psa-note',
    sourceId: 'psa',
  },
  police: {
    href: 'https://pnpclearance.ph/',
    labelKey: 'service-online-police',
    noteKey: 'service-online-police-note',
    sourceId: 'police',
  },
  dti: {
    href: 'https://bnrs.dti.gov.ph/registration',
    labelKey: 'service-online-dti',
    noteKey: 'service-online-dti-note',
    sourceId: 'dti',
  },
  peso: {
    href: 'https://www.trabawho.mati.gov.ph/',
    labelKey: 'service-online-peso',
    noteKey: 'service-online-peso-note',
    sourceId: 'peso',
  },
} as const;
export type OnlineActionId = keyof typeof serviceOnlineActions;
