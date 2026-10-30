# Transparency section verification — 29 October 2026

Extends the city finance series from FY2024–FY2025 (see
`transparency-verification-2026-09-24.md`) back to FY2021, and records what could and could
not be reached for the new Full Disclosure and Documents pages.

## FY2021–FY2023 city finances

Each figure comes from DBM's Budget of Expenditures and Sources of Financing (BESF), Table
F.13 _Statement of Receipts and Expenditures, By Cities_. Each edition reports the year two
years earlier. Mati is the fourth Region XI row (after Davao, Digos and Island Garden City
of Samal) on the facing pages.

The 2023 and 2024 editions are image scans without a text layer. Every column was read from
pages rendered with `pdftoppm` at 260 dpi and cropped to the Region XI rows and to the
column headers. The 2025 edition has text, but its two facing pages do not align line for
line, so it was also checked visually. Header order was confirmed per edition: General,
Economic, Social and Debt services, then non-operating expenditures.

| FY   | Edition                                                                           | Printed pp. | Receipts (PHP M) | Expenditures (PHP M) | Allotment (PHP M) | Ending cash (PHP M) |
| ---- | --------------------------------------------------------------------------------- | ----------- | ---------------: | -------------------: | ----------------- | ------------------: |
| 2023 | [BESF 2025 F.13](https://www.dbm.gov.ph/wp-content/uploads/BESF/BESF2025/F13.pdf) | 578–579     |         1,908.24 |             1,523.20 | NTA 1,412.06      |              363.09 |
| 2022 | [BESF 2024 F.13](https://www.dbm.gov.ph/wp-content/uploads/BESF/BESF2024/F13.pdf) | 568–569     |         2,297.15 |             1,825.29 | NTA 1,654.86      |              501.51 |
| 2021 | [BESF 2023 F.13](https://www.dbm.gov.ph/wp-content/uploads/BESF/BESF2023/F13.pdf) | 600–601     |         1,751.29 |             1,432.36 | IRA 1,210.16      |              284.67 |

All three are PDF pages 3–4 of their files.

### Transcription checks

- **FY2023:** receipts 161.17 local + 1,423.61 external + 323.47 non-income = 1,908.25;
  published total 1,908.24 (0.01 rounding). Expenditures 997.14 + 91.28 + 247.35 + 71.91 +
  115.52 = 1,523.20. Cash: 501.51 + 1,908.24 − 1,523.20 = 886.55; less 162.36 prior-year
  payables and 361.10 continuing appropriation = 363.09.
- **FY2022:** receipts 135.56 + 1,669.37 + 492.22 = 2,297.15. Expenditures 1,115.76 +
  106.38 + 281.49 + 44.57 + 277.09 = 1,825.29. Cash 765.28 available; ending 501.50 by
  arithmetic, 501.51 published (0.01 rounding).
- **FY2021:** receipts 127.95 + 1,215.33 + 408.01 = 1,751.29. Expenditures sum to
  1,432.35; published 1,432.36. Cash available 574.82 by arithmetic, 574.83 published;
  ending 284.68 by arithmetic, 284.67 published. All differences are 0.01 rounding.
- Non-income receipts are mostly loans: FY2021 405.02, FY2022 485.57, FY2023 312.70 from
  "Acquisition of Loans". They are receipts, not revenue.
- FY2021 still reports the **Internal Revenue Allotment (IRA)**; the NTA label applies from
  FY2022 (Mandanas–Garcia). The record carries `allotmentLabel: "IRA"`.
- These editions have no separate Special Education Fund expenditure column, so `sef` is
  null, not zero.

### Cross-edition cash bridges

| From   | Ending cash | To     | Opening cash | Bridges?  |
| ------ | ----------: | ------ | -----------: | --------- |
| FY2021 |      284.67 | FY2022 |       293.42 | No (8.75) |
| FY2022 |      501.51 | FY2023 |       501.51 | Yes       |
| FY2023 |      363.09 | FY2024 |       363.09 | Yes       |
| FY2024 |      411.26 | FY2025 |         3.41 | No        |

Each edition's figures are kept as published. No year is adjusted to make a bridge close.

## Full Disclosure Policy reports

The [DILG Full Disclosure Policy Portal](https://fdpp.dilg.gov.ph/fdpp/report) lists postings
publicly and offers per-document downloads (`/fdpp/report/document-download?id=…`). Its
Region → Province → City filters load provinces through a POST request that redirected
(HTTP 302) when driven from the research browser, so Mati's postings could not be listed.
The 14 document types were read from the portal's own filter. Current postings are therefore not indexed; the site links to the portal. The
reports it does list come from the Internet Archive (next section).

## Archived City documents (Internet Archive)

The Wayback Machine's CDX index lists **242** PDFs that the City posted under
`mati.gov.ph/wp-content/uploads/2016/09/`, captured between October 2016 and January 2017.
About 150 are individual requests for quotation and abstracts of bids; these were set
aside. Of the 68 remaining candidates, 46 downloaded as valid PDFs from their archived
copies. Each was opened: text-layer files were read with `pdftotext`, and image scans were
rendered with `pdftoppm` and read visually. Titles and periods on the site are as printed
on each document, never inferred from the filename.

- `data/full-disclosure.json` holds **22** records (2013–2014) across 12 of the 14 FDP
  document types: budget, receipts and expenditures, indebtedness, cash flow, procurement
  plans, bid results, 20% IRA, SEF, LDRRMF and trust fund utilization, unliquidated cash
  advances, and GAD.
- `data/official-documents.json` holds the Investment Incentives Code (Ordinance No. 75,
  s. 2011), the 1993 Revised Tax Code of the then-Municipality (8 parts), and two BPLO
  application forms, plus RA 9408 from lawphil.
- **Left out:** two files labelled as the Mayor's Office budget, whose first page names
  the Public Market instead; a City Engineer personnel schedule that is only part of a
  budget; duplicates (a second Q1 2014 trust-fund scan, a second FY2013 GAD report, a
  file named "Trust Fund" that is actually the December 2013 SEF report); a draft "Proposed
  Tax Ordinance"; and profile pages (agriculture, demography).
- The debt statement prints only the dates its loans were contracted (2005, 2007), so its
  period is recorded as "Not stated on the document".
- **Citizen's Charter:** the 21 October 2025 PDF linked from the site's footer returns HTTP
  404, the City's media library now holds no PDFs, and no archived copy exists. The site
  lists it as unavailable and the footer link is removed.

## Procurement notices (PhilGEPS)

- **Where:** PhilGEPS Open Opportunities → View By Agency → letter C, page 6: "CITY OF MATI,
  PROVINCE OF DAVAO ORIENTAL" (orgID 50396), 12 opportunities, all status Active. Each was
  read from its printable abstract,
  `notices.philgeps.gov.ph/GEPSNONPILOT/Tender/PrintableBidNoticeAbstractUI.aspx?refid=…`.
- **Recorded per notice:** title as printed (`noticeTitle`), solicitation number,
  PhilGEPS reference, mode, classification, category, ABC, published, last-updated and
  closing dates. `name` is a plain-English rendering of the title; the printed titles keep
  their typos ("BASKETBALL BAL", "IMPROVEMENT OF IMPROVEMENT OF").
- **Not a purchase:** refid 13305708 is a sale of unserviceable City equipment (sixth
  auction). Its ABC field holds the minimum bid, so the record carries `sale: true` and is
  left out of the "ABC open for bids" total.
- **Older records re-read:** 11374254 (Badas water, City) and 11439666 (Dahican, DPWH) are
  still marked Awarded; their closing dates (19 and 26 November 2024) and mode,
  classification and category were added. The DA FFEDIS rice notice (Ref 1713) reads
  "Negotiated Procurement - Sagip Saka", Goods, Food Stuff, and is still Closed / Expired
  with no Notice of Award uploaded.
- **Status is a snapshot:** every Active notice closes between 3 and 17 November 2026.
  `noticeStatus` is not updated automatically; re-check and re-date the records after those
  dates.

## Other sources tried

- `mati.gov.ph` exposes five pages (home, Mayor, Sangguniang Panlungsod, Departments and
  Offices, a placeholder) and no document library or Full Disclosure section. The Citizen's
  Charter PDF is reachable only by its direct link.
- COA's LGU audit report directory is behind a Cloudflare bot check and was not accessed.

Both are listed in the LGU data checklist for manual collection.
