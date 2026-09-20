# LGU Synchronization Protocol

**LGU Name:** City of Mati, Davao Oriental
**Last Sync Date:** 2026-02-03

## Roles & Responsibilities

### 1. Developer Team (Code Maintainers)

- **Lead Maintainer:** Ramon Logan Jr. (ramonloganjr) - Responsible for merge requests and deployment.
- **Frontend Dev:** [Name] - Responsible for UI/UX and Accessibility updates.

### 2. Data Custodians (Source of Truth)

- **Designation:** City Planning & Development Coordinator (MPDC)
- **Responsibility:** Provides the raw CSV/Excel files for the Citizen's Charter and Annual Budget.
- **Contact Protocol:** Email submission by the 5th of every month.

### 3. Content Approvers (Gatekeepers)

- **Designation:** Information Officer / Mayor's Chief of Staff
- **Responsibility:** Verifies that the data on the staging site matches the official hard copies before production deployment.

---

## Emergency Information Verification

Hotlines are **not** maintained in this document. The single source of truth is
[`data/emergency-hotlines.json`](../../data/emergency-hotlines.json); every surface
(hotline bar, /contact, /services/public-safety, offline.html) renders from it, and
`web/src/lib/hotlines.data.test.ts` fails the build if any of them drift.

To change a number, edit that JSON, update `_verified_on`, and run `npm test` in `web/`.

**Current source:** City Disaster Risk Reduction and Management Office - City of Mati (official Facebook page) — <https://www.facebook.com/photo/?fbid=994546650191399&set=a.211377321841673>
**Last checked:** 2026-09-18
**Approver sign-off:** _pending_
**Re-check cadence:** Re-check against the CDRRMO page every 6 months, and immediately after any LGU reorganisation or telco renumbering.

Snapshot at the last check (for offline cross-reference only), in the order the
source graphic prints them:

| Office                                          | Number(s)                                       |
| ----------------------------------------------- | ----------------------------------------------- |
| National Emergency Hotline                      | 911                                             |
| Disaster Risk Reduction and Management Office   | (087) 388-3426 / 0912-345-4666                  |
| Mati City Police Station                        | 0998-598-7122                                   |
| Mati Fire Station                               | 160 / 0951-812-6593 / 0965-782-8090             |
| CHO - EMS Emergency Medical Service             | 0951-840-9073 / 0953-213-1206                   |
| City Health Office                              | (087) 388-4428 / (087) 388-4429 / 0981-339-1408 |
| City Social Welfare and Development Office      | (087) 388-3326 / 0975-358-2876                  |
| Philippine Red Cross - Davao Oriental Chapter   | (087) 388-4022 / 0965-084-9924 / 0905-277-5186  |
| Philippine Coast Guard - Davao Oriental Station | 0966-837-0536                                   |
| 66th Infantry Battalion, Philippine Army        | 0917-156-9461                                   |
| EOD K9 Unit, PNP PECU Davao Oriental            | 0969-118-4775                                   |
| City Traffic Management Office (CTMO)           | 0962-776-8980                                   |
| City Public Safety and Security Office (CPSSO)  | (087) 388-4095 / 0962-178-9893                  |
| City Civil Security Unit (CCSU)                 | 0975-123-9194 / 0970-451-0796                   |

The City Hall landline and per-office numbers are service contacts, not emergency
lines, and are verified separately against the Citizen's Charter.

---

## Data Sync Schedule

### Officials Directory

- **Source:** LGU Mati Human Resources / Election results
- **Frequency:** After every election cycle, or when appointments change
- **File to update:** `data/officials.json`
- **Approver:** Information Officer

### Service Directory (Citizen's Charter)

- **Source:** Citizen's Charter document from each department head
- **Frequency:** Annually, or when fees/requirements change
- **File to update:** `data/services.json`
- **Approver:** MPDC

### Legislative Data (Ordinances & Resolutions)

- **Source:** Sangguniang Panlungsod records
- **Frequency:** After each Sangguniang Panlungsod session
- **Files to update:** `data/ordinances.json`, `data/resolutions.json`
- **Approver:** SB Secretary

### Competitive Index

- **Source:** CMCI DTI Portal (cmci.dti.gov.ph)
- **Frequency:** Annually (after CMCI release, typically Q2)
- **File to update:** `data/competitive-index.json`
- **Approver:** Lead Maintainer

### DPWH Infrastructure Projects

- **Source:** DPWH Regional Office / data.gov.ph
- **Frequency:** Quarterly or after new project listings
- **File to update:** `data/dpwh-projects.json`
- **Approver:** Lead Maintainer

### Budget & Fiscal Transparency

- **Source:** BLGF portal (blgf.gov.ph), LGU Budget Officer
- **Frequency:** Annually (after budget approval) + quarterly updates
- **Files to update:** Budget section pages, `data/fiscal_transparency.json`
- **Approver:** City Accountant / Budget Officer

### Demographics

- **Source:** Philippine Statistics Authority (PSA)
- **Frequency:** After census releases or official population updates
- **File to update:** `data/demographics.json`
- **Approver:** MPDC

---

## Pre-Deployment Sign-Off Checklist

- [ ] All emergency hotline numbers verified against official records
- [ ] Officials directory matches current elected/appointed officials
- [ ] Service fees and processing times verified with department heads
- [ ] Legislative data reflects latest SB sessions
- [ ] Budget/fiscal data matches official documents
- [ ] Lighthouse accessibility audit score >= 90
- [ ] Content reviewed by Information Officer
- [ ] Staging site approved by Content Approver

---

## Change Management Log

| Date       | Change                       | Verified By     |
| ---------- | ---------------------------- | --------------- |
| 2026-02-03 | Initial TEAM_SYNC.md created | Ramon Logan Jr. |
