# Statistics page verification — 24 September 2026

The page uses the newest reference period verified for each indicator. Publication year is separate from reference year. Searches included 2025/2026 releases, PSA's newer SAE release, DTI's Mati profile and DBM's BESF 2027 (released 11 August 2026).

## Retained population and geography

- [PSA PSGC, City of Mati](https://psa.gov.ph/classification/psgc/barangays/1102509000): **148,672** people in the 2024 POPCEN, **26** barangays and **1st** income class. All 26 barangay rows match the existing dataset, and sum to 148,672. The profile dates its barangay count to 31 July 2025. The census reference date is **1 July 2024**. No later census count was verified; do not relabel the population as 2025 or 2026.
- [PSA 2015 Census, Davao Oriental, Table 1, printed pp. 3–4](https://psa.gov.ph/system/files/main-publication/11_Davao%2520Oriental.pdf#page=30): 1990 **93,023**, 1995 **93,801**, 2000 **105,908**, 2010 **126,143**, 2015 **141,141**.
- [PSA 2007 Census release](https://psa.gov.ph/statistics/population-and-housing/node/738): 2007 **122,046**.
- [PSA population density Table A, p. 47](https://psa.gov.ph/system/files/phcd/2022-12/2010-2015-2020%2520Population%2520Density_Table%2520A_Using%25202013%2520Land%2520Areas_12%2520July%25202021.pdf#page=47): 2020 **147,547**, land area **588.63 km²** (2013 land-area basis). Density on the page is a derived value: 2024 population divided by this land area, rounded to whole people/km².

## Finance updated to FY2025 actual receipts

[DBM BESF 2027, Table F.13](https://www.dbm.gov.ph/wp-content/uploads/BESF/BESF2027/F13.pdf#page=3), printed pp. **594–595**, PDF pages **3–4**. [Publication page](https://www.dbm.gov.ph/index.php/2027/budget-of-expenditures-and-sources-of-financing-fy-2027) dated **11 August 2026**. Downloaded PDF and visually inspected both facing pages and the aligned Region XI / Mati row. Units: **PHP millions**.

| Measure                         |   FY2025 |
| ------------------------------- | -------: |
| Local sources                   |   252.55 |
| External sources (includes NTA) | 1,837.19 |
| NTA                             | 1,776.97 |
| Non-income receipts             |   289.11 |
| Total receipts                  | 2,378.85 |
| Total expenditures              | 1,672.95 |

The footnote identifies actual data submitted by local treasurers through LIFT and supplied by DOF-BLGF. This is not an approved budget or a COA audit opinion. Local + external + non-income receipts reconcile to the total. NTA must not be added again. The displayed NTA percentage is NTA / **total receipts**, including non-income receipts; it must not be called the BLGF income-dependency ratio. No FY2026 full-year actuals are claimed. FY2026/2027 forward tables are not substituted for actual data.

Replaced the unsupported FY2023 ₱371,329,918.71 income, ₱220.77M IRA, 59.45% dependency and 40.55% local share. The page's finance data is independent of the existing FY2024 budget-page data; that page was already being edited when this work started.

## Poverty: newer 2026 release, archived workbook provenance

[PSA release 2026-43, 6 February 2026](https://psa.gov.ph/content/881-cities-and-municipalities-recorded-poverty-incidence-20-percent-or-lower-2023) establishes the **2023 city- and municipal-level SAE** release and methodology. This is incidence **among population**, not families. PSA combines census, FIES/LFS, establishments and other data using small area estimation.

The PSA attachment download failed and the direct site returned a browser challenge. Values were read from an [Internet Archive copy of the PSA workbook](https://archive.org/details/2-2023-sae-with-psgc-no-huc-06-feb-2026), uploaded by a third party. **This provenance limitation is disclosed on the page**, with links to both the official release and the archive. The archived file was not byte-matched to PSA's currently hosted attachment. Do not describe this as a successful direct-source workbook download.

File: `2_2023 SAE_with PSGC_noHUC_06Feb2026.xlsx`. Sheet: `2023_NoHUC_Maguindanao grouped`, Annex 1. Mati row **1376**, PSGC **112509**, in Davao Oriental. Header years verified at row 5. Rates in D:F; 90% confidence limits in M:R.

| Year | Incidence (%) |        90% lower |        90% upper |
| ---- | ------------: | ---------------: | ---------------: |
| 2018 |         21.51 |            18.04 |            24.98 |
| 2021 |     21.814703 | 19.7209598209066 | 23.9084461790934 |
| 2023 |     30.393506 | 28.0017416198823 | 32.7852703801177 |

Source precision is retained in code, with two decimals displayed. Removed the prior 7.0%/6.4% figures, confidence intervals and “improved” badge. Do not infer statistical significance merely from point estimates or apply provincial FIES statistics to Mati. A future update should compare this transcription against the live official workbook when available.

## Withheld claims

- Economic indicators: 1,200 registered businesses, +8% growth, 8,500 ha agricultural land, 94.2% employment and sector shares 45/30/20/5 lacked a dated city-specific official source. BLGF attribution alone did not substantiate these. Employment rate and labor force participation are different measures. No verified newer city-level replacement was obtained; provincial and regional figures were not substituted.
- CMCI: the DTI Mati profile returned HTTP 403 / retrieval errors; browser navigation also timed out. No verified 2025/2026 results were found. The previous 2024 rank 55, score 38.2894, five pillar scores, trend badges and 50 detailed indicator values are withheld, not declared false. Rankings require the **Component City** comparison group. Arbitrary indicator bar normalization was removed.
- Existing `data/competitive-index.json` explicitly identifies its separate series as template placeholders; it was not used as verification evidence.

## Update rule

Prefer newer, comparable official data. Preserve reference year, geography, statistical population, units, uncertainty and actual/estimate status. A newer publication date does not make its observations current-year data. Keep unavailable values distinct from zero.
