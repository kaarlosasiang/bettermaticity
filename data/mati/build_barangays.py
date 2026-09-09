#!/usr/bin/env python3
"""
Build BetterMati's canonical barangay dataset for the City of Mati.

Joins:
  - PSA PSGC barangay table (names, codes, urban/rural, 2024 POPCEN population)
  - faeldon/philippines-json-maps barangay boundary polygons (WGS84)

Outputs:
  dist/mati_barangays.csv       flat reference table (seed your DB from this)
  dist/mati_barangays.geojson   boundaries + attributes, medium resolution
  dist/mati_barangays.min.json  boundaries only, low resolution (map rendering)

Run: python3 build_barangays.py
"""

import csv
import json
import os
import urllib.request

PSGC_CITY = "1102509000"
SRC_TEMPLATE = (
    "https://raw.githubusercontent.com/faeldon/philippines-json-maps/master/"
    "2023/geojson/municities/{res}/bgysubmuns-municity-{city}.{suffix}.json"
)
RESOLUTIONS = {"hires": "0.1", "medres": "0.01", "lowres": "0.001"}

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")
DIST = os.path.join(HERE, "dist")


def fetch_boundaries(res):
    """Download one resolution of the barangay boundary file, cached locally."""
    path = os.path.join(DATA, f"mati_brgy_{res}.json")
    if not os.path.exists(path):
        url = SRC_TEMPLATE.format(res=res, city=PSGC_CITY, suffix=RESOLUTIONS[res])
        os.makedirs(DATA, exist_ok=True)
        urllib.request.urlretrieve(url, path)
    with open(path) as f:
        return json.load(f)


def load_psa():
    """Load the PSA PSGC table, keyed by 10-digit code."""
    # Committed input, alongside this script — not the download cache (DATA).
    path = os.path.join(HERE, "psa_psgc_mati_2q2026.csv")
    with open(path) as f:
        return {row["psgc_10digit"]: row for row in csv.DictReader(f)}


def centroid(geometry):
    """Area-weighted centroid of the outer ring(s). Good enough for map pins."""
    polys = (
        [geometry["coordinates"]]
        if geometry["type"] == "Polygon"
        else geometry["coordinates"]
    )
    total_area = 0.0
    cx = cy = 0.0
    for poly in polys:
        ring = poly[0]
        a = sx = sy = 0.0
        for i in range(len(ring) - 1):
            x0, y0 = ring[i]
            x1, y1 = ring[i + 1]
            cross = x0 * y1 - x1 * y0
            a += cross
            sx += (x0 + x1) * cross
            sy += (y0 + y1) * cross
        a *= 0.5
        if a == 0:
            continue
        total_area += abs(a)
        cx += (sx / (6 * a)) * abs(a)
        cy += (sy / (6 * a)) * abs(a)
    if total_area == 0:
        return None, None
    return round(cx / total_area, 6), round(cy / total_area, 6)


def main():
    psa = load_psa()
    os.makedirs(DIST, exist_ok=True)

    med = fetch_boundaries("medres")
    low = fetch_boundaries("lowres")

    # --- integrity check: the two sources must describe the same 26 barangays
    geo_codes = {str(f["properties"]["adm4_psgc"]) for f in med["features"]}
    psa_codes = set(psa)
    if geo_codes != psa_codes:
        raise SystemExit(
            "PSGC mismatch between boundary file and PSA table.\n"
            f"  only in boundaries: {sorted(geo_codes - psa_codes)}\n"
            f"  only in PSA table:  {sorted(psa_codes - geo_codes)}\n"
            "Boundaries are pinned to the 2023 PSGC vintage; re-check for "
            "barangay creations, mergers, or renamings before proceeding."
        )

    rows = []
    for feat in med["features"]:
        props = feat["properties"]
        code = str(props["adm4_psgc"])
        rec = psa[code]
        lon, lat = centroid(feat["geometry"])
        area = round(props["area_crs"] / 1_000_000, 3)
        pop = int(rec["pop_2024_popcen"])

        row = {
            "psgc_code": code,
            "barangay": rec["barangay"],
            "urban_rural": rec["urban_rural"],
            "population_2024": pop,
            "area_km2": area,
            "density_per_km2": round(pop / area, 1) if area else None,
            "centroid_lat": lat,
            "centroid_lon": lon,
        }
        rows.append(row)

        # attach the same attributes to the geometry
        feat["properties"] = dict(row)

    rows.sort(key=lambda r: r["barangay"])

    with open(os.path.join(DIST, "mati_barangays.csv"), "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)

    med["features"].sort(key=lambda f: f["properties"]["barangay"])
    with open(os.path.join(DIST, "mati_barangays.geojson"), "w") as f:
        json.dump(med, f)

    # lowres: geometry + minimal identity, for fast client-side rendering
    for feat in low["features"]:
        code = str(feat["properties"]["adm4_psgc"])
        feat["properties"] = {"psgc_code": code, "barangay": psa[code]["barangay"]}
    with open(os.path.join(DIST, "mati_barangays.min.json"), "w") as f:
        json.dump(low, f, separators=(",", ":"))

    total = sum(r["population_2024"] for r in rows)
    print(f"{len(rows)} barangays | total population {total:,}")
    print(f"wrote {DIST}/mati_barangays.csv, .geojson, .min.json")


if __name__ == "__main__":
    main()
