# Services content audit — 24 September 2026

## Coverage and evidence limits

Reviewed `/services`, all ten category routes and all 22 `/service-details/*` routes, plus the shared search catalogue. Existing URLs remain unchanged. The central evidence register is `data/service-references.json`; it supplies visible citations, source scope, multilingual summaries and specific preparation guidance. Each route has evidence coverage tests.

This is a source-backed guidance edition, **not a verified current Mati Citizen’s Charter**. No current city charter or revenue schedule could be retrieved. The main city website (https://mati.gov.ph/ and its www and /make-it-mati/ variants) was inaccessible to the research tool. Consequently current local fees, detailed application checklists, release times, individual staff assignments, room locations, office email addresses and rental inventories are not asserted.

## Corrections

- Removed unsubstantiated fees and processing-time promises from category cards, detail pages and search data.
- Replaced long uncited detail pages with office/service guidance, specific questions to ask, and scoped citations. This removes inherited personnel names, contacts, rental vehicle inventories, rental rates and application instructions that could not be tied to Mati evidence. Alias pages remain available with consistent content.
- Removed five Filipizen links containing `nuevavizcaya_mati`. No replacement payment service has been endorsed: https://cityofmati.app/ describes itself as a city portal, but an independent link from an accessible official city source was not established. Its business service was also marked “coming soon.”
- Removed the education page’s inherited school list (including Aldersgate, Saint Louis and placeholder barangay names) and its unsupported school counts. Added DOrSU scholarship and city PESO references instead; these do not imply a complete school directory or currently open scholarship slots.
- Withheld health totals and the unarchived BHS list because the live DOH registry could not be rechecked. The previous source comment claimed a 16 September retrieval, but no underlying extract accompanied the page. This does not establish that the old records were false. Retained the central, previously sourced medical hotline directory and its existing provenance; numbers were not test-dialled or newly verified in this audit.
- Removed unverified local environmental project descriptions and weekly collection claims; added EMB XI guidance, with collection schedules referred to the barangay.
- Removed the health page’s unsupported third-party “DOH-verified” promotion and facility total.
- Corrected shared search URLs such as `certificates.html`, which previously resolved to `/certificates` instead of `/services/certificates`. Search entries now point to existing prerendered routes.
- Added English, Filipino and Cebuano evidence notes and preparation guidance. Existing unrelated working-tree edits were retained.

## Sources and scope

| Reference                                                                                                                                                                     | What it supports                                                | What it does not establish                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| [RA 9408, City of Mati Charter](https://lawphil.net/statutes/repacts/ra2007/ra_9408_2007.html)                                                                                | City status and statutory office responsibilities               | Current staffing, contacts, local fees or service deadlines |
| [PSA civil registry requests](https://psa.gov.ph/civilregistration/requesting-civil-registry-document) and [birth certificate guidance](https://psa.gov.ph/birth-certificate) | PSA document channels and birth-request information             | Mati registration fees or local release times               |
| [PNP clearance system](https://pnpclearance.ph/)                                                                                                                              | National clearance application channel                          | Appointment availability at a specific Mati station         |
| [DSWD XI AICS](https://fo11.dswd.gov.ph/aicsinfo/)                                                                                                                            | Regional crisis-assistance guidance                             | Automatic approval or Mati city assistance procedures       |
| [NCDA AO 001 (2021)](https://ncda.gov.ph/disability-laws/administrative-orders/ncda-administrative-order-no-001-series-of-2021/)                                              | National PWD ID guidance                                        | A locally confirmed submission checklist                    |
| [DSWD social pension qualifications](https://www.dswd.gov.ph/dswd-reiterates-guidelines-qualifications-for-social-pension-of-indigent-senior-citizens/)                       | Eligibility and assessment context                              | A confirmed Mati payout date                                |
| [DA XI RSBSA](https://ictsdavao.da.gov.ph/rsbsa)                                                                                                                              | Free registration through city/municipal agriculture offices    | Guaranteed benefits, supplies or rental availability        |
| [DTI business-name guide](https://bnrs.dti.gov.ph/resources/registration-guide)                                                                                               | National business-name registration guidance                    | A city permit or verified Mati online permit service        |
| [DOrSU scholarships](https://dorsu.edu.ph/scholarships-grants/)                                                                                                               | Published listing of Asenso sa Edukasyon – LGU Mati Scholarship | Open applications, available slots or current grant amounts |
| [Mati PESO TrabaWHO](https://www.trabawho.mati.gov.ph/)                                                                                                                       | City employment and training portal                             | Guaranteed placements or funded training slots              |
| [EMB XI programs](https://r11.emb.gov.ph/programs-2/)                                                                                                                         | Regional waste-management guidance                              | Mati collection days or locally implemented projects        |
| [DPWH building-permit rules](https://www.dpwh.gov.ph/DPWH/sites/default/files/issuances/DO_222_S2002.pdf)                                                                     | National building-permit context                                | An exhaustive current local checklist or current city rates |
| [CSC forms](https://www.csc.gov.ph/downloads/forms)                                                                                                                           | Agency source for personnel forms                               | Local HR staffing or release times                          |
| [DOH NHFR](https://nhfr.doh.gov.ph/VActivefacilitiesList)                                                                                                                     | Reference destination only; live data could not be rechecked    | Fresh verification of health facility totals                |

The register’s `checkedOn` means the source content was inspected through web retrieval/search, not that an agency approved the site or a transaction was completed. NHFR has `checkedOn: null`. Preparation questions are editorial guidance, explicitly separated from official application requirements. Search records carry `guidance-only-local-details-unconfirmed` status.

## Remaining data needed

Obtain a current signed Mati Citizen’s Charter and revenue schedule, dated office contact directory, active permit/payment links endorsed by the city, a fresh DOH facility export, and a current DepEd Mati school directory. These are required before restoring precise local fees, turnaround times, school/facility totals or staff contacts.

## Validation

- TypeScript check passed.
- Full Vitest suite: 61 tests across 10 files passed on the available Node 26 runtime; five new tests cover evidence coverage, valid search routes, translation coverage, local-verification limits and the unrechecked health registry.
- Oxlint 1.79.0 passed with four existing warnings outside the changed service code. The repository installation lacked its native binding; the same-version lint runtime was installed under `/tmp` without changing dependency manifests or lockfiles.
- Node 20.20.2 was obtained in `/tmp` to honor `.nvmrc`. The installed jsdom/undici dependencies fail before tests execute (`webidl.util.markAsUncloneable is not a function`). This dependency/runtime incompatibility remains unresolved; no dependency upgrade was folded into the content change.
- `npm --prefix web run build` passed on Node 26; all 48 routes prerendered. All 33 service-route HTML files contain citations and no obsolete Nueva Vizcaya transaction URL.
- `bash build.sh --no-bump` was interrupted at its dependency-install step. Production assembly then used stages 4–5 of that script against the successful Vite output, without a version bump.
- Playwright against assembled `dist`: all 33 service routes returned HTTP 200 and rendered one main heading plus citations, with no page errors. Desktop detail-page and mobile education-page screenshots were inspected; no horizontal overflow. Cebuano persisted-language hydration passed.
- Additional certificate-specific guidance uses [PSA marriage certificate information](https://psa.gov.ph/marriage-certificate) and [PSA death certificate information](https://psa.gov.ph/death-certificate).
