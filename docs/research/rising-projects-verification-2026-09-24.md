# Rising in Mati verification — 24 September 2026

## Outcome

The four original Home cards were hard-coded with no citations. None of their exact project-name/current-status pairs was established by the sources reviewed. This is a limitation of this check, not proof that the projects do not exist. Replace those cards with four sourced highlights and show six selected records on Budget. Home and Budget use the same project data and translation keys. Source dates are historical evidence dates, not the date of verification or a live progress feed.

## Original claims

| Original card                                          | Finding and decision                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dahican Coastal Road Rehabilitation — Finishing Stages | No evidence established this exact name and progress. DPWH's indexed plans identify rehabilitation of the Dahican–Lawigan–Bobon–Dahican road, but the document could not be retrieved beyond its access challenge. Do not equate these projects or infer finishing progress.                                                                                                   |
| Central Public Market Annex — Under Construction       | No matching official record found in the searches reviewed. Omit pending a project-specific notice or accomplishment report.                                                                                                                                                                                                                                                   |
| Barangay Mayo Water System — Fully Operational         | An indexed JICA historical report describes a Mayo system completed in 2003; this cannot establish operation in 2026. The separately reported 2022 Mayo River bulk-water proposal also does not substantiate the card. Omit the current operational claim. Badas and Macambol are separately named projects, not corrections to Mayo's location.                               |
| Baywalk & Boulevard Extension — Under Construction     | A 2023 government news report describes funding for a fish-port access/coastal road. It does not establish this exact card or current construction. A 2019 baywalk contract cancellation and a third-party mirror of 2026 planning posts concern other records and cannot prove construction. Omit the unsupported card; name the sourced coastal-road announcement precisely. |

Research leads excluded from the published project data:

- [DPWH Dahican road plans](https://www.dpwh.gov.ph/dpwh/sites/default/files/webform/civil_works/advertisement/5lg0032_-_ded.pdf): access challenge; search-index excerpt only.
- [Historical JICA water-system report](https://openjicareport.jica.go.jp/pdf/11858362_02.pdf): indexed historical description, not inspected as a current project record.
- [PNA baywalk contract termination, 7 October 2019](https://www.pna.gov.ph/articles/1082440): different project/contract; not evidence of present status.

## Published records

1. **Mati Airport development:** [DBM GAA FY2026, DOTr Office of the Secretary, printed p. 343 / PDF p. 13](https://www.dbm.gov.ph/wp-content/uploads/GAA/GAA2026/VolumeIB/DOTR/A.pdf#page=13), dated 5 January 2026. Downloaded and visually inspected the Mati Airport row: PHP700,000,000. Label as a FY2026 national appropriation, not a contract award, disbursement, total project cost or completion. No opening date or physical progress is asserted. The repeated NCR/Central Office lines describe the administering office, not the airport's location.
2. **Macambol Level III water system:** [PNA, 20 January 2026](https://www.pna.gov.ph/articles/1267356), government news report of Hallmark Mining Corp.'s statement. PHP1.2 million, Silad–Banluton connection, approximately 250 households. Explicitly label company-funded SDMP and company-reported completion, not independent government certification or city expenditure.
3. **Badas Level II potable water:** [PhilGEPS 11374254](https://notices.philgeps.gov.ph/GEPSNONPILOT/Tender/PrintableBidNoticeAbstractUI.aspx?refid=11374254), directly opened. Published 18 October 2024; updated 17 February 2025; status Awarded; ABC PHP2.5 million. Reuse the existing procurement record. Completion and current operation are unverified.
4. **Dahican cultural and sports center completion works:** [PhilGEPS 11439666 / 25LG0021](https://notices.philgeps.gov.ph/GEPSNONPILOT/Tender/PrintableBidNoticeAbstractUI.aspx?refid=11439666), directly opened. Published 6 November 2024; updated 18 February 2025; status Awarded; ABC PHP6.93 million. Reuse the existing procurement record. “Completion” describes the contracted work, not a verified accomplishment.
5. **Mati Fish Port Complex Phase 2:** [PNA, 4 February 2023](https://www.pna.gov.ph/articles/1194397). The city announced PHP150 million additional funding for Phase 2. Keep the 2023 date prominent; do not infer current completion or merge budgets from different phases.
6. **Fish port access road and coastal highway:** same PNA report, 4 February 2023. PHP2 billion announced for 2.25 km linking Mati Park/Baywalk, the fish port and Sitio Bilawan, with DPWH coordination. Label announced funding and explicitly leave current progress unverified. It does not authenticate the former Baywalk & Boulevard Extension card.

PNA direct opens returned HTTP 403, but the search tool returned the article bodies from its index. Their government publication and attributed statements were reviewed through that access path. PIA links found for airport development redirected to its homepage; the published airport amount instead uses the directly retrieved DBM document. Do not represent inaccessible pages as directly inspected.

## Data and presentation rules

- New report records live in `data/rising-projects.json`; procurement highlights are derived from existing records in `web/src/lib/risingProjects.ts`.
- Four selected highlights appear on Home; all six appear in Budget's Rising in Mati section. Native fragment links navigate to the section or individual cards, including on a direct production page load.
- Procurement ceilings, appropriations, announced funding and reported company costs are labeled individually and never summed or added to the annual fiscal totals.
- All new UI copy and explanations have English, Filipino and Cebuano translations. Source labels retain their agency names and document references.
- The existing detailed procurement section remains available, including the rice-assistance record, which is not described as infrastructure.

## Validation

- TypeScript passes with Node 20.20.2; focused lint and formatting pass. Repository-wide lint exits successfully with existing warnings outside this change.
- All 56 Vitest tests pass on the installed Node 26 runtime, including four new evidence/navigation checks. Node 20 cannot start the existing jsdom/undici test workers (`webidl.util.markAsUncloneable is not a function`); no tests execute in that run. No dependency or runtime configuration changes were made for this task.
- `bash build.sh --no-bump` passes with Node 20.20.2 and prerenders all 48 routes. Version remains 1.2.0; the existing bundle-size warning remains.
- Production preview checked at 1440px and 390px: four Home highlights, six Budget cards, all four individual fragment destinations, View all destination, English/Filipino/Cebuano, and no page errors with the normal service worker enabled. Screenshots reviewed for desktop and mobile. The existing first-visit volunteer dialog was dismissed for the checks.

## Layout follow-up — 25 September 2026

Budget now shows two columns of horizontal project cards on desktop and one column on mobile. Each card keeps its amount, status and source date visible; a native keyboard-accessible disclosure expands the explanation and citations. Home's land-area warning was replaced with the shared PSA citation and its 2013 land-area basis, matching Statistics.

Validation: four focused project tests, Node 20 TypeScript, formatting and the 48-route production build pass. Browser checks pass for two-column placement, independent disclosure expansion with Enter/Space, source visibility, 390px/320px layouts and the Home PSA link. Lint could not run because the installed Oxlint package is missing its native binding; dependencies were not changed in this follow-up.
