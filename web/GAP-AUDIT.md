# Content-Parity Audit — React (`web/`) vs Legacy `main`

Cross-check of every migrated route in `web/` against the legacy vanilla-HTML site
(git branch `main`, since the legacy files were deleted on `feat/react-migration`).
Comparison basis: legacy content via `git show main:<path>`; migrated content = the
`web/src/pages/*.tsx` component + its imported primitives/components + `web/src/lib/*`
data modules + i18n keys in `web/src/locales/*.json`. Only **content** (sections, cards,
lists, links, data, contact info) was compared — not styling/markup.

**Global chrome** (hotline bar, header nav, live info bar, footer) is shared layout in
`web/src/components/layout/` and is excluded from per-page comparison.

## Result summary

| Route | Component | Verdict |
|-------|-----------|---------|
| `/budget` (**Transparency**) | `Budget.tsx` | **GAP** — Infrastructure Investments, DPWH table, BLGF link |
| `/statistics` | `Statistics.tsx` | **GAP** — Municipal Finance, real Economic Indicators, Poverty Stats, CMCI detail, 2 tiles |
| `/government` | `Government.tsx` | **GAP** — exec contacts, 3 special SP members + committees, 6 depts + contacts, barangay captains/phones |
| `/legislative` | `Legislative.tsx` | **GAP** — process flowchart (11+6 steps), 2 of 4 "Understanding" cards |
| `/legislative/ordinance-framework` | `OrdinanceFramework.tsx` | **GAP** — explainer card, 6 category tags, heading/subtitle, "View All on SB" button, badge |
| `/legislative/resolution-framework` | `ResolutionFramework.tsx` | **GAP** — explainer card, 6 type tags, subtitles, 2× "View All on SB" buttons, badge |
| `/` (Home) | `Home.tsx` | **GAP** — Contact Info section, leadership phones, history items+cards, FB intro block, stat sublabels, weather address, quiz subtitle |
| `/services` | `Services.tsx` | **GAP** — "Browse by Life Event" 8-card section |
| `/services/public-safety` | `categories.tsx` | **GAP** — 11 emergency + 6 medical hotlines |
| `/services/environment` | `categories.tsx` | **GAP** — "Key Environmental Services & Initiatives" 5-item section + fee |
| `/services/infrastructure` | `categories.tsx` | **GAP** — 2 of 3 responsible offices + fee |
| `/government/officials` | `GovernmentOfficials.tsx` | **GAP** — exec emails/phones, "Executive Branch" subheading |
| `/news` | `News.tsx` | **GAP** — "From our Facebook Page" section |
| `/services/{certificates,social-services,agriculture,business,tax-payments,education}` | `categories.tsx`/`categories2.tsx` | **MINOR** — dropped fee/time labels, office relabels, certificate detail links, online-section ordering |
| `/contact` | `Contact.tsx` | **PARITY** |
| `/services/health` | `ServicesHealth.tsx` | **PARITY** |
| `/faq` | `Faq.tsx` | **PARITY** (15 Q&A) |
| `/privacy` | `Privacy.tsx` | **PARITY** (13 sections) |
| `/terms` | `Terms.tsx` | **PARITY** (15 sections) |
| `/accessibility` | `Accessibility.tsx` | **PARITY** |
| `/sitemap` | `SitemapPage.tsx` | **PARITY** (52 links) |
| `/service-details/*` (22 pages) | `service-details/*.tsx` | **PARITY** — all requirements, fees, steps, tabs, downloadable forms, contact blocks reproduced |

---

## Detailed gaps

### `/budget` — Transparency (legacy `budget/index.html`)
The "Transparency" nav points here (title "Budget & Financial Transparency"). Migration kept
the receipts/expenditures figures, doughnut charts, and quarterly table but dropped:
- **Infrastructure Investments** — 3 real flood-control project cards: FCDS Package 5 – Magat
  River (2024, EGB Construction Corporation, ₱144,750,000); Repair/Rehab Section 1 & Section 2
  (2021, Shanley Construction, ₱29,700,000 each). Source: Sumbong sa Pangulo + "View on Map".
- **DPWH Infrastructure Projects in Mati** — summary bar, category filter tabs
  (All/Buildings/Roads/Flood Control/Water), and a projects table (backed by
  `data/dpwh-projects.json`, currently a `_status:"draft"` placeholder). Source: DPWH
  Transparency Portal.
- **BLGF source link** under the receipts/expenditures/charts block (`https://blgf.gov.ph/`).

### `/statistics` (legacy `statistics/index.html`)
Migrated page draws from `web/src/lib/statsData.ts`. Where sections were carried over the
numbers are faithful, but four whole sections + 2 tiles are missing:
- **Municipal Finance (FY2023)** — Annual Income ₱371.33M (₱371,329,918.71), IRA Share
  ₱220.77M, IRA Dependency 59.45%, Income Composition bar (IRA 59.45% / Local 40.55%); BLGF.
- **Economic Indicators (real)** — Registered Businesses 1,200 (+8%), Agricultural Land
  8,500 ha, Employment Rate 94.2%; Economic Sectors (Agriculture 45 / Trade 30 / Services 20 /
  Industry 5). NOTE: the section currently labeled "Economic Indicators" actually renders CMCI.
- **Poverty Statistics** — 2018 7.0% (CI 4.7–9.2), 2021 6.4% (CI 4.7–8.1), −0.6% "Improved".
- **CMCI per-indicator detail** — 5 pillar panels with ~50 indicator values + per-pillar trend
  badges (Economic Dynamism +13%, Government Efficiency +14%, Infrastructure −18%, Resiliency
  Stable, Innovation −5%). Migrated shows only the 5 top-line pillar scores.
- **Metric tiles** — Land Area (588.63 km²) and Income Class (1st) dropped (legacy had 4 tiles).

### `/government` (legacy `government/index.html`)
Several gaps trace to thin `data/officials.json` (8 placeholder councilors, no special members,
thin contact fields) as well as the component:
- **Executive Branch** — mayor/vice-mayor cards omit email (`mayor@`/`vicemayor@mati.gov.ph`),
  phone ((087) 326-5002 / 5003), office hours; "Executive Branch" badge + subtitle dropped.
- **Sangguniang Panlungsod** — only 8 of 11 members; missing Liga ng mga Barangay President,
  SK Federation President, IPMR; all per-councilor committee assignments dropped.
- **Departments** — 11 of 17 offices; missing City Engineering, City Agriculture, City General
  Services, Business Permits & Licensing, HR Management, PESO (incl. 0917-155-1043 + FB job
  link); remaining cards lost descriptions, phones, emails, "View Services" label.
- **Barangays** — per-barangay captain ("Kap. …") and phone numbers dropped (name-only chips).

### `/legislative` (legacy `legislative/index.html`)
- **Legislative Process Flowchart** — entire section gone: tabbed "For Ordinances (11 Steps)" /
  "For Resolutions (6 Steps)" with all 17 numbered step cards.
- **Understanding Local Legislation** — reduced from 4 cards to 2; missing "Public
  Participation" and "Transparency" cards; remaining cards re-titled with category copy.

### `/legislative/ordinance-framework`
Missing: "What is an Ordinance?" info card (2 paragraphs + subjects list); Ordinance Categories
(6 tags); "2025 Ordinances" heading + subtitle; "View All Ordinances on SB Website" button;
PageHeader "Legislative" badge. (Ordinance data table itself at parity.)

### `/legislative/resolution-framework`
Missing: "What is a Resolution?" info card; Types of Resolutions (6 tags); year-section
subtitles; both "View All Resolutions on SB Website" buttons; PageHeader "Legislative" badge.
(Resolution data table itself at parity.)

### `/` — Home (legacy `index.html`)
- **Contact Information section** — entirely missing (Phone (087) 805-3581, Email
  `lgumatinv@gmail.com`, Address "City Hall / Mati, Davao Oriental 8200", "View All").
- **City Leadership** — leader cards omit phones ((087) 326-5002 / 5003).
- **Brief History** — timeline 5 items vs legacy 7; 2 history highlight cards dropped.
- **Latest Updates** — FB intro block dropped (eyebrow "Official Facebook Page", title, 3
  bullet points, "Visit our Facebook Page" CTA, fallback link) + section "View All" → news.
- **Quick Stats** — source sublabels dropped (2024 Census / Administrative Units / Income
  Classification / Total City Area).
- **Weather & Map** — address caption "Mati City Hall, Davao Oriental 8200" dropped.
- **Quiz CTA** — subtitle "How well do you know Mati, Davao Oriental?" dropped.
- Minor: "Real Property Tax" popular tag links to property-declaration (legacy → treasurer).

### `/services` — index (legacy `services/index.html`)
Missing **"Browse by Life Event"** section: 8 shortcut cards (Starting a Business, Getting
Married, Having a Baby, Need Financial Help, Senior Citizen Services, Person with Disability,
Building/Home Improvement, Got in Trouble).

### `/services/public-safety`
Both hotline directories missing (17 numbers): **Emergency Hotlines (11)** — MDRRMO, PNP,
MSWDO, KABALIKAT Civicom, NUVELCO, Mayor's Office, DILG, SEEDO Public Market, MAGRO, PDRRMO
N. Vizcaya, BFP; **Medical Emergency Hotlines (6)** — RHU, R2TMC, PLT, MMG, Salubris, Red Cross.

### `/services/environment`
Missing "Key Environmental Services & Initiatives" numbered 5-item section (Drainage & Sewerage,
Solid Waste, Flood Control & Mitigation, Forest & Land Use, Public Education & Awareness).
Garbage Collection fee "Free" dropped.

### `/services/infrastructure`
2 of 3 responsible offices missing (City Planning & Development, City General Services Office);
remaining office relabeled generically instead of "City Engineering Office". Building Permit
fee "Varies" dropped.

### `/government/officials` (legacy `government/officials.html`)
Executive cards omit email/phone; "Executive Branch" sub-heading dropped. (Councilor count 8=8
at parity.)

### `/news` (legacy `news/index.html`)
Missing "From our Facebook Page" section: H2 + description + Facebook Page-plugin iframe
(`OfficialLGUMati`) + "Visit the Official LGU Mati Facebook Page" fallback link. (Article grid
at data-parity via `useNews`.)

### Service-category fee/time meta & links (minor)
Dropped literal fee/time labels: Social Services (Senior, PWD, Financial Assistance), Agriculture
(all 3), Education (Scholarship, Training), Infrastructure (Building Permit fee), Environment
(Garbage fee), Business (Cedula fee), Certificates (Barangay Clearance time). Office relabels:
Social Services ("MSWDO Services" → generic), Infrastructure (→ generic). Certificates
birth/marriage/death cards no longer link to their `/service-details` pages. Business & Tax
"Online Transactions" moved from above to below the service grid.

---

## Judgment calls

- **Placeholder data**: `dpwh-projects.json`, `fiscal_transparency.json`, and officials
  committee/contact fields are placeholders on `main` too. Parity means reproducing the legacy
  *structure*; where legacy hardcoded real values (finance, CMCI, hotlines, infrastructure
  projects) those real values are ported. Placeholder-backed sections render placeholder rows
  until verified City of Mati data lands.
- **Not treated as content gaps** (optional polish): service-detail breadcrumb wording, a few
  hardcoded-English literals not wrapped in `t()`, and the redundant global sticky hotline strip
  (its numbers already appear in the Contact/Public-Safety grids).
