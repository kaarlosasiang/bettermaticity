# Mati City reference data

Canonical geographic and demographic data for the City of Mati (PSGC
`1102509000`). Lives in `data/mati/`.

## Files

| File | Use |
|---|---|
| `dist/mati_barangays.csv` | Seed the database from this |
| `dist/mati_barangays.geojson` | Choropleths, point-in-polygon lookups (~44 KB) |
| `dist/mati_barangays.min.json` | Geometry only, first paint (~12 KB) |
| `build_barangays.py` | Regenerates all three from source |
| `psa_psgc_mati_2q2026.csv` | PSA source table, hand-transcribed |

`dist/` is generated. Never hand-edit it — change `psa_psgc_mati_2q2026.csv` or
the script and re-run `python3 build_barangays.py`.

## Rules

**`psgc_code` is the natural key.** Join on it, index on it, use it in URLs and
foreign keys. Never key on `barangay` — PSA renames barangays and the name
`Don Salvador Lopez, Sr.` contains a comma and a period that will bite string
handling somewhere.

**PSGC codes are NOT contiguous.** They run `1102509001`–`1102509013`, then
`1102509015`–`1102509027`. There is no `1102509014`. Do not generate codes from
a loop index, do not assume `count == max - min + 1`, and do not "fix" the gap.
There are 26 barangays.

**`area_km2` is not land area.** Summed barangay area is 709 km² against PSA's
official 588.63 km² for the city — roughly 20% over, because the coastal
polygons extend into municipal waters. Safe for relative comparison and
rendering. NOT safe for anything per-hectare: land valuation, agricultural
yield, or any density figure the app publishes as fact. `density_per_km2` in the
CSV inherits this problem — treat it as indicative only. The real fix is the
CLUP cadastral base from the City Planning and Development Office, not yet
obtained.

**Population is 2024 POPCEN**, summing to 148,672, which matches PSA's published
city total exactly. If a change to this pipeline breaks that sum, the change is
wrong.

## Regenerating

```bash
python3 build_barangays.py
```

The script asserts that PSGC codes in the PSA table and the boundary file match
exactly, and exits with a diff if they don't. **A failure there is a real signal,
not a flaky build.** It means PSA created, merged, or renamed a barangay and the
boundary file (pinned to the 2023 PSGC vintage) has fallen behind. Resolve it
deliberately — do not delete the check or force the build through.

PSA publishes PSGC updates quarterly: 13 January, 13 April, 13 July, 13 October.

## Attribution — required, not optional

These obligations are load-bearing and must appear on a user-visible page:

- **PSA PSGC / POPCEN** — CC BY 4.0. Commercial use fine, attribution required.
- **Boundary geometry** — `faeldon/philippines-json-maps`, derived from
  `altcoder/philippines-psgc-shapefiles`.

If OpenStreetMap data is added later it is **ODbL**, which is share-alike. Keep
OSM-derived geometry in its own layer and never merge it into a table that ships
under different terms.

## Coordinate system

WGS84 / EPSG:4326, lon/lat order in the GeoJSON. Note that the upstream repo's
README claims EPSG:32651 — that is wrong for these files; the coordinates are
decimal degrees. City centroid is roughly 6.95°N, 126.22°E.
