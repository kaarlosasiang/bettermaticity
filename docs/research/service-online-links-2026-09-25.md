# Service cards and online links — 25 September 2026

The service cards retain the requested icon/title/description layout and fee/time rows, with three columns on wide screens. Unconfirmed local amounts and timelines read “Confirm with office.” Health cards have also been restored. Links to local service guides remain separate from external transaction links.

## Published links

- Birth, marriage and death cards, and civil-registry detail guides: [PSAHelpline](https://psahelpline.ph/), explicitly linked by [PSA’s civil registry request page](https://psa.gov.ph/civilregistration/requesting-civil-registry-document). These links order PSA-issued copies; they do not register an event or request a local certified copy.
- Police clearance: [PNP National Police Clearance System](https://pnpclearance.ph/). The portal publishes registration/login and appearance/non-appearance instructions. The card notes that an in-person visit may be needed.
- A separate business-name card: [DTI BNRS registration](https://bnrs.dti.gov.ph/registration). City permit cards retain their local guides, keeping the two transactions distinct.
- Skills training: [Mati PESO TrabaWHO](https://www.trabawho.mati.gov.ph/), which provides account registration, job listings and training opportunities. The action is labelled “Open Mati PESO portal” and does not promise a training slot.

These destinations and the supporting public pages were inspected on 25 September 2026. No account was created, application submitted or payment attempted. No online transaction link was established for the remaining local services; their cards stay available without invented destinations. All new action labels and scope notes are translated into English, Filipino and Cebuano.

## Validation

TypeScript, changed-file Oxlint, the production Vite build, and eight focused card/source tests passed on the available Node 26 runtime. The tests cover separate local and online links, missing-data labels, no fabricated barangay portal, source references and translations.

Playwright checks passed for certificates, business, education and health cards. Desktop (1440px) and mobile (390px) certificate-page screenshots were inspected; no horizontal overflow, nested links or browser errors were detected. Local-guide navigation and the PSA action on the destination detail page also passed. Production preview was refreshed at `http://localhost:8957/services/certificates`.
