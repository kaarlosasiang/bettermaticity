# BetterMati — Data Acquisition Plan

City of Mati, Davao Oriental (PSGC 1102509000)
Drafted 9 September 2026

---

## Principle

Every dataset that ships in BetterMati must have three things: a named source, a
license that permits our use, and a documented refresh path. If a dataset can't
answer all three, it doesn't go in the app. This rules out the tempting
shortcuts — scraping the LGU Facebook page, copying tables out of a PDF someone
shared, lifting a competitor's POI list — which is worth saying out loud now,
because those shortcuts are exactly what a solo dev under time pressure reaches
for at 2am.

---

## Phase 0 — Foundation (done)

The canonical barangay layer. Everything else in the app joins to this, so it
had to be right before anything else got built.

| Output | What it is |
|---|---|
| `mati_barangays.csv` | 26 barangays: PSGC code, name, urban/rural, 2024 population, area, density, centroid |
| `mati_barangays.geojson` | Same attributes attached to boundary polygons (medium resolution, ~44 KB) |
| `mati_barangays.min.json` | Geometry only, low resolution (~12 KB) for first paint |

**Sources**

- Attributes: PSA Philippine Standard Geographic Code, 2Q 2026 release, with
  2024 POPCEN populations. Licensed **CC BY 4.0** — commercial use is fine with
  attribution.
- Geometry: `faeldon/philippines-json-maps`, 2023 PSGC vintage, derived from
  `altcoder/philippines-psgc-shapefiles`.

**Validation performed**

- All 26 PSGC codes match exactly between the two sources. The build script
  fails loudly if they ever diverge.
- Summed barangay population = 148,672, which matches PSA's published city
  total to the person.

**Two things to know about this data**

1. **The PSGC codes are not contiguous.** They run 001–013 then 015–027; there
   is no `1102509014`. Never generate a barangay code by index or loop counter.
2. **The polygon areas are inflated.** Summed barangay area is 709 km² against
   PSA's official 588.63 km² for the city — about 20% over. The coastal
   polygons appear to extend into municipal waters. Fine for choropleths and
   point-in-polygon lookups; **do not** use `area_km2` for anything land-based
   (land valuation, agricultural yield per hectare, density claims we publish).
   The fix is the CLUP cadastral base from CPDO — see Phase 2.

---

## Phase 1 — Free, no permission needed

These can all be pulled this week without asking anyone.

**OpenStreetMap** — roads, buildings, POIs for Mati. Pull the Geofabrik
Philippines extract and clip to our boundary, or hit the Overpass API for
targeted queries. License is **ODbL**, which is share-alike: if we modify and
publish OSM-derived geometry, that derivative must also be ODbL. Keep OSM
geometry in its own layer, never merged into a proprietary table. Coverage in
the poblacion is decent; the outer barangays are thin, which is itself an
opportunity — contributing back what we survey is cheap goodwill with the OSM PH
community and improves our own basemap.

**GeoRiskPH / HazardHunterPH** — flood, landslide, storm surge, seismic and
fault layers. Free hazard assessment reports; the QGIS plugin `Open Hazards PH`
loads the layers directly. Register for a GeoRiskPH account for the Pro tier
(still free).

**DTI CMCI** — Mati's competitiveness scores by pillar, year over year.
Downloadable, good for any benchmarking or "how is our city doing" view.

**COA Annual Audit Reports** — Mati City's audited financials by year. Public,
downloadable PDFs. Machine-extractable with some effort.

**DILG Full Disclosure Policy Portal** — budgets, procurement, annual reports.

**Open-Meteo / NASA POWER** — free weather APIs, no key, no request process.
Hit them at 6.95°N, 126.22°E. Use these rather than PAGASA for anything the app
displays live; PAGASA's historical station records are better data but they're a
paid request with a turnaround.

---

## Phase 2 — Formal requests

This is where the genuinely valuable Mati-specific data lives, and none of it is
online. Expect weeks, not days.

**Priority 1 — City Planning and Development Office (CPDO)**

Ask for: the current Ecological Profile, the CLUP with its cadastral/land-use
base, and the CDP. The Ecological Profile is the single richest document for
barangay-level socioeconomic data, and the CLUP base is what fixes our area
problem from Phase 0.

Route it as a letter to the City Mayor, copy furnished CPDO, on DOrSU
letterhead. Your position as faculty is a real advantage here, and the LGU
already has an existing MOA relationship with DOrSU — that's a warm door, not a
cold one. State the purpose plainly, say what will be published and what won't,
and offer something back: a copy of whatever we build on top of it, or a
briefing to CPDO staff. LGUs say yes far more often when the ask isn't purely
extractive.

**Priority 2 — depends on BetterMati's core feature**

- City Health Office / DOH RO XI — facilities, services, health indicators
- DepEd Davao Oriental — school directory and enrolment
- City Tourism Office — Dahican and Pujada Bay arrival counts, accredited
  establishments
- City Agriculture Office / BFAR — coconut and fisheries production
- Business Permits and Licensing Office — the registered business list, which is
  the highest-value POI source in the city and the one most likely to require
  negotiation

**Fallback** — FOI requests at foi.gov.ph work on LGUs and national agencies.
Slower and more adversarial in tone than a letter, so use it as a second
attempt, not a first.

---

## Legal and privacy

**Data Privacy Act (RA 10173) applies to us.** Any civic app that collects user
reports, accounts, or location traces is processing personal information, and
the NPC's registration threshold is low. Decide now, before there's data in a
production database:

- What personal data we collect and the lawful basis for each field
- Retention periods, and who can access what
- Whether we need to register a Data Protection Officer with the NPC
- A privacy notice written in plain language — and in Cebuano, not only English,
  if the app is meant for ordinary Matinians

Aggregated LGU data carries no privacy burden. User-generated content carries
all of it. Keep the two architecturally separate from day one; retrofitting that
split later is painful.

**Attribution obligations to honour in-app** — a `/data-sources` page listing
PSA (CC BY 4.0), OpenStreetMap (© OpenStreetMap contributors, ODbL), GeoRiskPH,
and any LGU dataset by office and release date. Cheap to build now, awkward to
add after launch.

---

## Refresh cadence

| Dataset | Cadence | Trigger |
|---|---|---|
| PSGC codes and names | Quarterly | PSA publishes 13 Jan / 13 Apr / 13 Jul / 13 Oct |
| Population | Every census | Next POPCEN |
| Boundaries | On PSGC change | Barangay creation, merger, rename |
| OSM extract | Monthly | Automated |
| Hazard layers | Annually | Or after a major event |
| LGU documents | On new release | Manual check |

The PSGC quarterly release is the one that will actually bite. Barangays get
merged and renamed more often than people expect — Q1 2026 alone merged two
barangays nationally and corrected eight names. The build script's PSGC
integrity check is what catches this; treat a build failure there as a real
signal, not a nuisance.

---

## Immediate next steps

1. Seed the database from `mati_barangays.csv`; use `psgc_code` as the natural
   key, never the barangay name.
2. Draft the CPDO letter — the long pole in the whole plan, so start it first
   even though it feels less productive than writing code.
3. Pull the OSM extract and assess coverage per barangay.
4. Decide the DPA posture before any user data exists.
5. Stand up `/data-sources` as a stub page.