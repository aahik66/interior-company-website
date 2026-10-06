#!/usr/bin/env python3
"""Traffic Drop Doctor: analyze Google Search Console exports and diagnose a traffic drop.

Standard library only (Python 3.8+). If matplotlib is installed, a timeline chart is added.

INPUT (any combination; more files means a better diagnosis)
  A) A Search Console "Compare" export folder or .zip (Performance → Date: Compare → Export).
     It contains Queries.csv, Pages.csv, Devices.csv and Countries.csv, each with
     "<period> Clicks / Impressions / CTR / Position" columns for both periods.
  B) A daily Dates.csv from a NON-compare export covering 6–16 months, for the timeline
     and drop-date detection. Pass it with --dates.
  C) Or before/after files without compare columns: --before-queries/--after-queries,
     --before-pages/--after-pages.

USAGE
  python analyze_gsc.py --export ./gsc_compare_export.zip --dates ./Dates.csv \
      --brand "acme,acme corp" --events events.csv --out ./report

OUTPUT (in --out)
  report.md      client-ready diagnosis draft (the agent should refine the wording)
  findings.json  machine-readable results for the agent
  losers_queries.csv, losers_pages.csv, sections.csv
  timeline.png   (only if matplotlib is available and --dates was given)
"""
import argparse
import csv
import io
import json
import math
import os
import re
import sys
import zipfile
from collections import defaultdict
from datetime import date, datetime, timedelta

METRICS = ("Clicks", "Impressions", "CTR", "Position")
INFO_RE = re.compile(r"^(how|what|why|when|where|who|which|is|are|can|does|do|should|will|guide|tutorial|ways|tips|ideas|examples?|meaning|definition)\b|\?|\b(vs|versus|meaning|definition|examples?)\b", re.I)


# ----------------------------------------------------------------------------- parsing
def num(v):
    if v is None:
        return 0.0
    v = str(v).strip().replace(",", "")
    if v in ("", "-", "—"):
        return 0.0
    pct = v.endswith("%")
    v = v.rstrip("%")
    try:
        x = float(v)
    except ValueError:
        return 0.0
    return x / 100.0 if pct else x


def read_csv_text(text):
    text = text.lstrip("﻿")
    return list(csv.DictReader(io.StringIO(text)))


def load_export(path):
    """Return {lower_filename_stem: rows} from a folder or zip."""
    out = {}
    if path is None:
        return out
    if zipfile.is_zipfile(path):
        with zipfile.ZipFile(path) as z:
            for n in z.namelist():
                if n.lower().endswith(".csv"):
                    stem = os.path.splitext(os.path.basename(n))[0].lower()
                    out[stem] = read_csv_text(z.read(n).decode("utf-8", "replace"))
    elif os.path.isdir(path):
        for n in os.listdir(path):
            if n.lower().endswith(".csv"):
                with open(os.path.join(path, n), encoding="utf-8", errors="replace") as f:
                    out[os.path.splitext(n)[0].lower()] = read_csv_text(f.read())
    else:
        sys.exit(f"--export must be a folder or .zip: {path}")
    return out


def read_file(p):
    if not p:
        return None
    with open(p, encoding="utf-8", errors="replace") as f:
        return read_csv_text(f.read())


def split_compare(rows, after_label=None):
    """Detect compare-format columns. Return (key_col, after_label, before_label) or None."""
    if not rows:
        return None
    cols = list(rows[0].keys())
    labels = []
    for c in cols:
        m = re.match(r"^(.*\S)\s+(Clicks|Impressions|CTR|Position)$", c.strip())
        if m and m.group(1) not in labels:
            labels.append(m.group(1))
    if len(labels) < 2:
        return None
    key = cols[0]
    if after_label and after_label in labels:
        a = after_label
        b = [l for l in labels if l != a][0]
    else:
        # Search Console lists the current period first; "Previous"/"prior" marks the old one.
        prev = [l for l in labels if re.search(r"previous|prior|before|last year", l, re.I)]
        if prev:
            b = prev[0]
            a = [l for l in labels if l != b][0]
        else:
            a, b = labels[0], labels[1]
    return key, a, b


def to_pairs(rows, after_label=None):
    """Compare-format rows -> {key: {'b': {...}, 'a': {...}}}."""
    sc = split_compare(rows, after_label)
    if not sc:
        return None, None
    key, a, b = sc
    out = {}
    for r in rows:
        k = (r.get(key) or "").strip()
        if not k:
            continue
        out[k] = {
            "b": {m.lower(): num(r.get(f"{b} {m}")) for m in METRICS},
            "a": {m.lower(): num(r.get(f"{a} {m}")) for m in METRICS},
        }
    return out, {"after": a, "before": b, "key": key}


def merge_before_after(before_rows, after_rows):
    def index(rows):
        if not rows:
            return {}, None
        key = list(rows[0].keys())[0]
        d = {}
        for r in rows:
            k = (r.get(key) or "").strip()
            if k:
                d[k] = {m.lower(): num(r.get(m) or r.get(m.lower())) for m in METRICS}
        return d, key
    b, kb = index(before_rows)
    a, ka = index(after_rows)
    out = {}
    zero = {"clicks": 0.0, "impressions": 0.0, "ctr": 0.0, "position": 0.0}
    for k in set(b) | set(a):
        out[k] = {"b": b.get(k, dict(zero)), "a": a.get(k, dict(zero))}
    return out, {"after": "after", "before": "before", "key": kb or ka}


# ----------------------------------------------------------------------------- analysis
def totals(pairs, side):
    c = sum(v[side]["clicks"] for v in pairs.values())
    i = sum(v[side]["impressions"] for v in pairs.values())
    wp = sum(v[side]["position"] * v[side]["impressions"] for v in pairs.values() if v[side]["impressions"])
    return {"clicks": c, "impressions": i, "ctr": (c / i if i else 0.0), "position": (wp / i if i else 0.0)}


def pct(a, b):
    return ((a - b) / b * 100.0) if b else (0.0 if a == 0 else 100.0)


def decompose(tb, ta):
    """Split the click change into an impressions effect and a CTR effect."""
    d = ta["clicks"] - tb["clicks"]
    imp_eff = (ta["impressions"] - tb["impressions"]) * tb["ctr"]
    ctr_eff = (ta["ctr"] - tb["ctr"]) * ta["impressions"]
    s = imp_eff + ctr_eff
    if s:  # scale to the exact delta
        imp_eff, ctr_eff = imp_eff * d / s, ctr_eff * d / s
    return {"click_change": d, "from_impressions": imp_eff, "from_ctr": ctr_eff}


def classify(v, min_clicks=1):
    b, a = v["b"], v["a"]
    dc = a["clicks"] - b["clicks"]
    if b["clicks"] < min_clicks and dc >= 0:
        return "stable_or_up"
    if dc >= 0:
        return "stable_or_up"
    if b["impressions"] > 0 and a["impressions"] == 0:
        return "disappeared"
    pb, pa = b["position"], a["position"]
    if pb and pa and pa - pb >= 3:
        return "ranking_loss"
    if pb and pa and pa - pb >= 1.5 and pb <= 10:
        return "ranking_loss"
    ctr_b = b["clicks"] / b["impressions"] if b["impressions"] else 0
    ctr_a = a["clicks"] / a["impressions"] if a["impressions"] else 0
    imp_ch = pct(a["impressions"], b["impressions"])
    if abs(pa - pb) < 1.5 and ctr_b > 0 and ctr_a < ctr_b * 0.75 and imp_ch > -30:
        return "ctr_loss"
    if imp_ch <= -30 and abs(pa - pb) < 1.5:
        return "demand_loss"
    return "mixed"


def loser_table(pairs, n=25):
    rows = []
    for k, v in pairs.items():
        dc = v["a"]["clicks"] - v["b"]["clicks"]
        if dc < 0:
            rows.append({
                "key": k, "click_change": dc,
                "clicks_before": v["b"]["clicks"], "clicks_after": v["a"]["clicks"],
                "impr_before": v["b"]["impressions"], "impr_after": v["a"]["impressions"],
                "pos_before": round(v["b"]["position"], 1), "pos_after": round(v["a"]["position"], 1),
                "ctr_before": round(v["b"]["clicks"] / v["b"]["impressions"] * 100, 2) if v["b"]["impressions"] else 0,
                "ctr_after": round(v["a"]["clicks"] / v["a"]["impressions"] * 100, 2) if v["a"]["impressions"] else 0,
                "pattern": classify(v),
            })
    rows.sort(key=lambda r: r["click_change"])
    return rows, rows[:n]


def driver_shares(all_losers):
    tot = sum(-r["click_change"] for r in all_losers) or 1
    agg = defaultdict(float)
    for r in all_losers:
        agg[r["pattern"]] += -r["click_change"]
    return {k: round(v / tot * 100, 1) for k, v in sorted(agg.items(), key=lambda x: -x[1])}


def section_of(url):
    m = re.match(r"^[a-z]+://[^/]+(/[^?#]*)?", url.strip(), re.I)
    path = (m.group(1) if m else url) or "/"
    parts = [p for p in path.split("/") if p]
    return "/" + parts[0] + "/" if len(parts) > 1 else ("/" if not parts else "/(top-level pages)")


def sections(pages):
    agg = defaultdict(lambda: {"b": defaultdict(float), "a": defaultdict(float), "n": 0, "zeroed": 0})
    for url, v in pages.items():
        s = agg[section_of(url)]
        s["n"] += 1
        if v["b"]["impressions"] > 0 and v["a"]["impressions"] == 0:
            s["zeroed"] += 1
        for side in ("b", "a"):
            s[side]["clicks"] += v[side]["clicks"]
            s[side]["impressions"] += v[side]["impressions"]
            s[side]["wpos"] += v[side]["position"] * v[side]["impressions"]
    out = []
    for name, s in agg.items():
        pb = s["b"]["wpos"] / s["b"]["impressions"] if s["b"]["impressions"] else 0
        pa = s["a"]["wpos"] / s["a"]["impressions"] if s["a"]["impressions"] else 0
        out.append({
            "section": name, "pages": s["n"], "pages_lost_all_impressions": s["zeroed"],
            "clicks_before": s["b"]["clicks"], "clicks_after": s["a"]["clicks"],
            "click_change": s["a"]["clicks"] - s["b"]["clicks"],
            "click_change_pct": round(pct(s["a"]["clicks"], s["b"]["clicks"]), 1),
            "impr_change_pct": round(pct(s["a"]["impressions"], s["b"]["impressions"]), 1),
            "pos_before": round(pb, 1), "pos_after": round(pa, 1),
        })
    out.sort(key=lambda r: r["click_change"])
    return out


def slug_of(url):
    parts = [p for p in re.sub(r"^[a-z]+://[^/]+", "", url.strip(), flags=re.I).split("?")[0].split("/") if p]
    return parts[-1].lower() if parts else ""


def detect_migration(pages, secs):
    """Find sections that collapsed while other sections appeared or grew from ~0, and pair URLs by slug."""
    gone = [s for s in secs if s["clicks_before"] > 0 and s["impr_change_pct"] <= -60]
    grown = [s for s in secs if s["click_change"] > 0 and s["clicks_before"] <= 0.2 * max(1, s["clicks_after"])]
    if not gone or not grown:
        return None
    gain = sum(s["click_change"] for s in grown)
    loss = sum(s["click_change"] for s in gone)
    if gain < 0.15 * -loss:
        return None
    gone_names = {s["section"] for s in gone}
    grown_names = {s["section"] for s in grown}
    new_slugs = {slug_of(u) for u, v in pages.items() if section_of(u) in grown_names and v["a"]["impressions"] > 0}
    old = [(u, v) for u, v in pages.items() if section_of(u) in gone_names]
    unmatched = [(u, v) for u, v in old if slug_of(u) not in new_slugs]
    return {"from_sections": sorted(gone_names), "to_sections": sorted(grown_names),
            "old_click_change": loss, "new_click_change": gain,
            "old_click_change_before": sum(s["clicks_before"] for s in gone), "net_click_change": loss + gain,
            "old_pages": len(old), "matched": len(old) - len(unmatched), "unmatched": len(unmatched),
            "unmatched_lost_clicks": sum(v["b"]["clicks"] - v["a"]["clicks"] for u, v in unmatched),
            "unmatched_urls": [u for u, v in sorted(unmatched, key=lambda x: -x[1]["b"]["clicks"])[:25]]}


def brand_split(queries, brand_terms):
    if not brand_terms:
        return None
    rx = re.compile("|".join(re.escape(t.strip().lower()) for t in brand_terms if t.strip()))
    br = {k: v for k, v in queries.items() if rx.search(k.lower())}
    nb = {k: v for k, v in queries.items() if not rx.search(k.lower())}
    res = {}
    for name, d in (("brand", br), ("non_brand", nb)):
        tb, ta = totals(d, "b"), totals(d, "a")
        res[name] = {"queries": len(d), "clicks_before": tb["clicks"], "clicks_after": ta["clicks"],
                     "click_change_pct": round(pct(ta["clicks"], tb["clicks"]), 1),
                     "impr_change_pct": round(pct(ta["impressions"], tb["impressions"]), 1),
                     "ctr_before": round(tb["ctr"] * 100, 2), "ctr_after": round(ta["ctr"] * 100, 2),
                     "pos_before": round(tb["position"], 1), "pos_after": round(ta["position"], 1)}
    return res


def informational_ctr(queries):
    """CTR change at roughly stable position: informational vs other queries (AI Overview signal)."""
    groups = {"informational": [], "other": []}
    for k, v in queries.items():
        b, a = v["b"], v["a"]
        if b["impressions"] < 20 or a["impressions"] < 20:
            continue
        if not b["position"] or abs(a["position"] - b["position"]) >= 1.5:
            continue
        groups["informational" if INFO_RE.search(k) else "other"].append(v)
    res = {}
    for g, items in groups.items():
        if not items:
            continue
        cb = sum(x["b"]["clicks"] for x in items); ib = sum(x["b"]["impressions"] for x in items)
        ca = sum(x["a"]["clicks"] for x in items); ia = sum(x["a"]["impressions"] for x in items)
        ctrb, ctra = (cb / ib if ib else 0), (ca / ia if ia else 0)
        res[g] = {"queries": len(items), "ctr_before": round(ctrb * 100, 2), "ctr_after": round(ctra * 100, 2),
                  "ctr_change_pct": round(pct(ctra, ctrb), 1)}
    return res


def segment_table(pairs):
    if not pairs:
        return None
    out = []
    for k, v in pairs.items():
        out.append({"segment": k, "clicks_before": v["b"]["clicks"], "clicks_after": v["a"]["clicks"],
                    "click_change": v["a"]["clicks"] - v["b"]["clicks"],
                    "click_change_pct": round(pct(v["a"]["clicks"], v["b"]["clicks"]), 1),
                    "pos_before": round(v["b"]["position"], 1), "pos_after": round(v["a"]["position"], 1)})
    out.sort(key=lambda r: r["click_change"])
    return out


# ----------------------------------------------------------------------------- timeline
def parse_date(s):
    s = s.strip()
    for fmt in ("%Y-%m-%d", "%m/%d/%Y", "%d/%m/%Y", "%b %d, %Y", "%Y/%m/%d"):
        try:
            return datetime.strptime(s, fmt).date()
        except ValueError:
            pass
    return None


def timeline(rows):
    if not rows:
        return None
    if split_compare(rows):
        return {"note": "Dates.csv is in compare format; export a non-compare daily Dates.csv (6–16 months) for drop-date detection."}
    key = list(rows[0].keys())[0]
    series = []
    for r in rows:
        d = parse_date(r.get(key, ""))
        if d:
            series.append((d, num(r.get("Clicks")), num(r.get("Impressions")), num(r.get("Position"))))
    series.sort()
    if len(series) < 35:
        return {"note": "Need at least ~5 weeks of daily data for drop-date detection.", "days": len(series)}
    clicks = [s[1] for s in series]
    zero_days = [s[0].isoformat() for s in series if s[1] == 0 and s[2] == 0]
    best = None
    w = 14
    for i in range(w, len(series) - w):
        before = sum(clicks[i - w:i]) / w
        after = sum(clicks[i:i + w]) / w
        if before <= 0:
            continue
        ch = (after - before) / before
        if best is None or ch < best[1]:
            best = (i, ch)
    res = {"days": len(series), "start": series[0][0].isoformat(), "end": series[-1][0].isoformat(),
           "zero_days": zero_days[:20]}
    if best:
        i, ch = best
        # sudden vs gradual: share of the 4-week change that happens in the first 7 days
        pre = sum(clicks[i - 7:i]) / 7
        post7 = sum(clicks[i:i + 7]) / 7
        post28 = sum(clicks[i:i + 28]) / max(1, len(clicks[i:i + 28]))
        tot = pre - post28
        speed = (pre - post7) / tot if tot > 0 else 0
        res.update({"drop_date": series[i][0].isoformat(), "change_14d_pct": round(ch * 100, 1),
                    "shape": "sudden step-down" if speed >= 0.6 else "gradual decline",
                    "first_week_share_of_drop": round(speed * 100)})
        # recovery check: last 14 days vs the 14 days right after the drop
        last = sum(clicks[-14:]) / 14
        before = sum(clicks[i - w:i]) / w
        after = sum(clicks[i:i + w]) / w
        if before > after:
            r = (last - after) / (before - after) * 100
            res["recovered_pct_of_loss"] = max(0, round(r))
            res["recovery_state"] = ("still declining" if r < -10 else "no recovery yet" if r < 10 else
                                     "partial recovery" if r < 80 else "mostly recovered")
        # year-over-year on 28-day windows around the drop (364 days back keeps weekdays aligned)
        dd = series[i][0]
        idx = {s[0]: s[1] for s in series}
        def wsum(start, n):
            vals = [idx.get(start + timedelta(days=k)) for k in range(n)]
            return None if any(v is None for v in vals) else sum(vals)
        n_after = min(28, (series[-1][0] - dd).days + 1)
        ty_b, ty_a = wsum(dd - timedelta(days=28), 28), wsum(dd, n_after)
        ly_b, ly_a = wsum(dd - timedelta(days=364 + 28), 28), wsum(dd - timedelta(days=364), n_after)
        if ty_b and ty_a is not None:
            ty = (ty_a / n_after) / (ty_b / 28) - 1
            res["window_change_pct"] = round(ty * 100, 1)
            if ly_b and ly_a is not None:
                ly = (ly_a / n_after) / (ly_b / 28) - 1
                res["same_period_last_year_change_pct"] = round(ly * 100, 1)
                res["seasonally_adjusted_change_pct"] = round(((1 + ty) / (1 + ly) - 1) * 100, 1)
                if ty < 0:
                    res["seasonal_share_of_drop_pct"] = round(min(1, max(0, ly / ty)) * 100) if ly < 0 else 0
        stale = (date.today() - series[-1][0]).days
        if stale > 10:
            res["data_stale_days"] = stale
    res["_series"] = [(s[0].isoformat(), s[1]) for s in series]
    return res


WARNINGS = []


def load_events(p):
    ev = []
    if not p:
        return ev
    if not os.path.isfile(p):
        WARNINGS.append(f"Events file not found: {p}. Continuing without events (check the path; the bundled file is references/google-updates.csv).")
        return ev
    for n, r in enumerate(read_file(p) or [], start=2):
        if None in r:
            WARNINGS.append(f"events.csv line {n}: too many columns (a comma inside a name?). Wrap the name in quotes. Row skipped.")
            continue
        s = parse_date(r.get("start", "") or r.get("date", ""))
        if not s:
            WARNINGS.append(f"events.csv line {n}: unreadable start date '{r.get('start', '')}' (use YYYY-MM-DD). Row skipped.")
            continue
        e = parse_date(r.get("end", "") or r.get("start", "") or r.get("date", ""))
        if s:
            ev.append({"name": r.get("name", "event"), "type": r.get("type", ""), "start": s, "end": e or s})
    return ev


def match_events(drop_date, events, slack=7):
    if not drop_date:
        return []
    d = date.fromisoformat(drop_date)
    hits = []
    for e in events:
        if e["start"] - timedelta(days=slack) <= d <= e["end"] + timedelta(days=slack):
            hits.append({"name": e["name"], "type": e["type"], "start": e["start"].isoformat(), "end": e["end"].isoformat()})
    return hits


# ----------------------------------------------------------------------------- hypotheses
def hypotheses(f):
    """Score root-cause hypotheses from the evidence. Confidence: High / Medium / Low."""
    H = []
    t = f.get("timeline") or {}
    dec = f.get("decomposition") or {}
    drivers = f.get("query_drivers") or f.get("page_drivers") or {}
    secs = f.get("sections") or []
    total_drop = -min(0, dec.get("click_change", 0)) or 1
    ev = f.get("matching_events") or []

    # 1 Tracking / data problem
    if t.get("zero_days"):
        H.append(("Tracking or data problem, or the whole site deindexed", "High",
                  f"{len(t['zero_days'])} day(s) with zero clicks AND zero impressions (e.g. {t['zero_days'][0]}). Check Search Console verification, robots.txt, sitewide noindex, server outages."))

    # 2a URL migration / restructure: a section collapses while another appears or grows from ~0
    mig = f.get("migration")
    mig_secs = set()
    if mig:
        mig_secs = set(mig["from_sections"])
        net_share = round(mig["net_click_change"] / -total_drop * 100) if total_drop else 0
        ly = (f.get("timeline") or {}).get("same_period_last_year_change_pct")
        adj_txt = ""
        if ly is not None and ly < 0:
            seasonal_part = -mig["old_click_change_before"] * ly / 100  # clicks those pages would have lost anyway
            adj = max(0, -mig["net_click_change"] - seasonal_part)
            mig["seasonally_adjusted_net_loss"] = round(adj)
            adj_txt = f" Adjusted for seasonality ({ly}% last year), the migration itself costs ≈{fmt(adj)} clicks (≈{round(adj / total_drop * 100)}% of the drop)."
        ev_mig = [e for e in ev if e["type"].lower() in ("migration", "redesign", "deploy", "site")]
        if ev_mig:
            adj_txt += f" Timing matches '{ev_mig[0]['name']}' ({ev_mig[0]['start']})."
        H.append((f"URL migration or restructure ({', '.join(mig['from_sections'])} → {', '.join(mig['to_sections'])})", "High",
                  f"{', '.join(mig['from_sections'])} lost {fmt(-mig['old_click_change'])} clicks while {', '.join(mig['to_sections'])} gained {fmt(mig['new_click_change'])}, a net loss of {fmt(-mig['net_click_change'])} clicks (≈{abs(net_share)}% of the drop). {mig['matched']} of {mig['old_pages']} old URLs have a new equivalent (matched by slug); {mig['unmatched']} have none, and those carry {fmt(mig['unmatched_lost_clicks'])} lost clicks. Crawl the old URL list: every old URL should 301 in one hop to its closest new page.{adj_txt}"))

    # 2 Section-specific technical/indexing issue
    idx_secs = []
    for s in secs[:8]:
        share = -s["click_change"] / total_drop
        zeroed = s["pages_lost_all_impressions"] >= max(2, 0.5 * s["pages"])
        collapsed = s["impr_change_pct"] <= -60 and abs(s["pos_after"] - s["pos_before"]) < 1.5
        if (zeroed or collapsed) and share >= 0.08 and s["section"] not in mig_secs:
            idx_secs.append(s["section"])
            how = (f"{s['pages_lost_all_impressions']}/{s['pages']} pages went to zero impressions" if zeroed else
                   f"impressions fell {abs(s['impr_change_pct'])}% while average position held ({s['pos_before']} → {s['pos_after']}). Pages that rank where they did but almost never appear usually dropped out of the index partway through the period")
            H.append((f"Indexing or technical problem in {s['section']}", "High",
                      f"In {s['section']}: {how}. This section explains {round(share * 100)}% of the click loss. URL-inspect a few pages; check noindex, robots.txt, canonicals, 404s/redirects and recent deploys for this template."))
    f["_index_sections"] = idx_secs
    rank_secs = [s["section"] for s in secs if s["pos_after"] - s["pos_before"] >= 2 and s["click_change"] < 0 and s["section"] not in idx_secs]
    ctr_secs = [s["section"] for s in secs if abs(s["pos_after"] - s["pos_before"]) < 1 and s["impr_change_pct"] > -20 and s["click_change_pct"] <= -25]

    # 3 Algorithm update
    if ev and t.get("shape") == "sudden step-down":
        algo = [e for e in ev if "update" in (e["name"] + e["type"]).lower() or e["type"].lower() in ("core", "spam", "algorithm")]
        if algo and drivers.get("ranking_loss", 0) >= 25:
            H.append(("Google algorithm update", "High" if drivers.get("ranking_loss", 0) >= 40 else "Medium",
                      f"Drop on {t.get('drop_date')} matches {algo[0]['name']} ({algo[0]['start']}–{algo[0]['end']}); {drivers.get('ranking_loss')}% of lost clicks come from ranking losses" + (f", concentrated in {', '.join(rank_secs)}" if rank_secs else "") + ". Don't change anything until the rollout has finished, then audit the affected pages against Google's helpful-content questions."))
    own = [e for e in ev if e["type"].lower() in ("site", "deploy", "migration", "redesign", "content", "internal")]
    if own and not mig:
        H.append(("Your own site change (deploy, migration, redesign, content change)", "High" if t.get("shape") == "sudden step-down" else "Medium",
                  f"Drop on {t.get('drop_date')} is near '{own[0]['name']}' ({own[0]['start']})" + (f"; the indexing problem in {', '.join(idx_secs)} fits this timing" if idx_secs else "") + ". Diff before/after crawls; check redirects, canonicals, noindex, removed pages and internal links."))

    # 4 CTR / SERP-feature loss (AI Overviews etc.)
    ctr_share = drivers.get("ctr_loss", 0)
    info = (f.get("informational_ctr") or {}).get("informational")
    other = (f.get("informational_ctr") or {}).get("other")
    if ctr_share >= 25 or (dec.get("from_ctr", 0) < 0 and -dec["from_ctr"] / total_drop >= 0.4):
        extra = ""
        if info and other and info["ctr_change_pct"] < other["ctr_change_pct"] - 10:
            extra = f" Informational queries lost {abs(info['ctr_change_pct'])}% CTR at stable positions vs {abs(other['ctr_change_pct'])}% for others: a typical AI Overview pattern."
        H.append(("SERP change: AI Overviews or new SERP features taking clicks (rankings held)", "High" if ctr_share >= 40 else "Medium",
                  f"{ctr_share}% of lost clicks come from queries whose position held but CTR fell; {round(-dec.get('from_ctr', 0) / total_drop * 100)}% of the total drop is a CTR effect.{extra}" + (f" Affected sections: {', '.join(ctr_secs)}." if ctr_secs else "") + " Confirm by checking whether the losing queries now show an AI Overview or other features."))

    # 5 Ranking loss without event (competitors / content decay)
    if drivers.get("ranking_loss", 0) >= 30 and not any("algorithm" in h[0].lower() for h in H):
        rs = f" Concentrated in {', '.join(rank_secs)}." if rank_secs else ""
        H.append(("Ranking losses to competitors, or content decay", "Medium" if t.get("shape") != "sudden step-down" else "Low",
                  f"{drivers['ranking_loss']}% of lost clicks come from position drops.{rs} Compare current top-ranking pages for the biggest losers: freshness, depth, intent match, links."))

    # 6 Demand / seasonality
    yoy = t.get("same_period_last_year_change_pct")
    sshare = t.get("seasonal_share_of_drop_pct")
    if (drivers.get("demand_loss", 0) >= 25 and not idx_secs and not mig) or (yoy is not None and yoy <= -10):
        if yoy is not None:
            ev_txt = (f"The same weeks last year fell {yoy}% (this year: {t.get('window_change_pct')}%), so seasonality explains roughly {sshare}% of the drop. "
                      f"Seasonally adjusted, the drop is about {t.get('seasonally_adjusted_change_pct')}%; that remainder is what other causes must explain.")
        else:
            ev_txt = f"{drivers.get('demand_loss', 0)}% of lost clicks come from queries where impressions fell but position held. Compare year-over-year to confirm seasonality."
        H.append(("Lower search demand (seasonality or market shift)", "High" if (yoy is not None and yoy <= -15) else "Medium", ev_txt))

    # 7 Brand demand (only if it falls more than seasonality explains)
    b = (f.get("brand_split") or {}).get("brand")
    if b and b["click_change_pct"] <= -20 and (yoy is None or b["click_change_pct"] < yoy - 15):
        H.append(("Branded demand fell (marketing, PR or reputation, not SEO)", "Medium" if yoy is not None else "Low",
                  f"Branded clicks changed {b['click_change_pct']}% (impressions {b['impr_change_pct']}%)" + (f", worse than the seasonal pattern ({yoy}%)." if yoy is not None else ". Rule out seasonality first (no year-over-year data was provided).")))

    # 8 Disappeared queries/pages
    if drivers.get("disappeared", 0) >= 20 and not mig and not any("indexing" in h[0].lower() for h in H):
        H.append(("Pages or queries dropped out of the index", "Medium",
                  f"{drivers['disappeared']}% of lost clicks come from queries or pages with zero impressions after. Check URL Inspection for the top ones (noindex, 404, redirect, canonical to another URL)."))

    order = {"High": 0, "Medium": 1, "Low": 2}
    H.sort(key=lambda h: order[h[1]])
    always = ("Manual action or security issue", "Check", "Can't be detected from performance data. Open Search Console → Security & Manual Actions. It takes 30 seconds, so always check.")
    return [{"cause": h[0], "confidence": h[1], "evidence": h[2]} for h in H] + [{"cause": always[0], "confidence": always[1], "evidence": always[2]}]


# ----------------------------------------------------------------------------- report
def fmt(n):
    return f"{n:,.0f}"


def _cell(v):
    if isinstance(v, float) and v.is_integer() and abs(v) >= 10:
        return f"{int(v):,}"
    if isinstance(v, float):
        return f"{v:,.1f}" if abs(v) >= 10 else f"{v:g}"
    return str(v).replace("|", "/")


def md_table(rows, cols, headers=None, n=15):
    if not rows:
        return "_No data._\n"
    headers = headers or cols
    out = "| " + " | ".join(headers) + " |\n|" + "---|" * len(cols) + "\n"
    for r in rows[:n]:
        out += "| " + " | ".join(_cell(r.get(c, "")) for c in cols) + " |\n"
    return out


ACTIONS = [
    ("Tracking", ("Verify Search Console property and analytics tags; check robots.txt, sitewide noindex and server logs for outage days", "High", "Low")),
    ("migration", ("Crawl every old URL; add single-hop 301s to the closest new page for unmatched URLs; fix chains; update internal links, canonicals and sitemaps; keep redirects 1+ year", "High", "Low–Med")),
    ("Indexing or technical", ("Fix the section: remove noindex/robots blocks, restore or 301 removed URLs, correct canonicals, request reindexing", "High", "Low–Med")),
    ("algorithm", ("Let the rollout finish (check its end date on the Google Search Status Dashboard), then audit top losing pages against helpful-content questions; improve depth, originality, E-E-A-T", "High", "Med–High")),
    ("own site", ("Diff crawls before/after the change; roll back or fix redirects, canonicals and internal links", "High", "Low–Med")),
    ("SERP change", ("Rewrite titles/metas for the affected queries; add answer-first sections, schema and original data; shift effort to queries AI can't fully answer; track AI citations", "Med", "Med")),
    ("competitors", ("Refresh the top 10 losing pages: match current intent, add missing subtopics, update data, strengthen internal links, earn links", "High", "Med")),
    ("Branded", ("Escalate to marketing/brand; check PR, reviews and competitor ads on brand terms", "Med", "Low")),
    ("seasonality", ("No SEO fix: report it as seasonal, judge performance year-over-year, and publish seasonal content 6–8 weeks before the next peak", "Low", "Low")),
    ("index", ("URL-inspect the top lost pages; fix the cause and request indexing", "High", "Low")),
    ("Manual", ("Check Security & Manual Actions; if present, fix and file a reconsideration request", "High", "Varies")),
]


def action_for(cause):
    for k, v in ACTIONS:
        if k.lower() in cause.lower():
            return v
    return ("Investigate further", "Med", "Med")


def write_report(f, out_dir, site):
    tb, ta = f["totals_before"], f["totals_after"]
    dec = f["decomposition"]
    t = f.get("timeline") or {}
    L = []
    L.append(f"# Traffic Drop Diagnosis{(' — ' + site) if site else ''}\n")
    L.append(f"_Periods compared: **{f['periods']['before']}** (before) vs **{f['periods']['after']}** (after). Source: Google Search Console. Generated {date.today().isoformat()}._\n")
    L.append("## Executive summary\n")
    L.append(f"- Organic clicks went from **{fmt(tb['clicks'])} → {fmt(ta['clicks'])} ({pct(ta['clicks'], tb['clicks']):+.1f}%)**. Impressions changed {pct(ta['impressions'], tb['impressions']):+.1f}%, CTR moved {tb['ctr']*100:.2f}% → {ta['ctr']*100:.2f}%, and average position moved {tb['position']:.1f} → {ta['position']:.1f}.")
    if dec["click_change"] < 0:
        parts = []
        for val, what, why in ((dec["from_impressions"], "impressions", "visibility or demand"), (dec["from_ctr"], "CTR", "clicks per view")):
            parts.append(f"**{fmt(-val)} come from lower {what}** ({why})" if val < 0 else f"{what} actually helped (**+{fmt(val)}** clicks)")
        L.append(f"- Of the {fmt(-dec['click_change'])} lost clicks, about " + " and ".join(parts) + ".")
    if t.get("drop_date"):
        L.append(f"- The drop started around **{t['drop_date']}** and looks like a **{t['shape']}** ({t['change_14d_pct']}% over 14 days).")
    if t.get("same_period_last_year_change_pct") is not None:
        y = t["same_period_last_year_change_pct"]
        L.append(f"- Same 28 days last year: {y:+.1f}%, so " + (f"**seasonality explains roughly {t.get('seasonal_share_of_drop_pct')}% of the drop** (seasonally adjusted change: {t.get('seasonally_adjusted_change_pct')}%)." if y <= -10 else "this is **not** a normal seasonal dip."))
    if t.get("recovery_state"):
        L.append(f"- Recovery so far: {t['recovery_state']} ({t['recovered_pct_of_loss']}% of the lost daily traffic is back).")
    if f.get("matching_events"):
        L.append("- Events near the drop date: " + "; ".join(f"{e['name']} ({e['start']}{'–' + e['end'] if e['end'] != e['start'] else ''})" for e in f["matching_events"]) + ".")
    elif t.get("drop_date"):
        L.append("- No known event (Google update or site change) within 7 days of the drop date. If you have one, add it to events.csv.")
    hyp = f["hypotheses"]
    top = [h for h in hyp if h["confidence"] in ("High", "Medium")][:3]
    if top:
        L.append("- Most likely causes: " + "; ".join(f"**{h['cause']}** ({h['confidence']})" for h in top) + ".")
    L.append("")
    L.append("## Likely causes, ranked\n")
    L.append("_Shares of the drop can overlap (seasonality, for example, affects every section), so don't add them up._\n")
    for i, h in enumerate(hyp, 1):
        L.append(f"{i}. **{h['cause']}** (confidence: {h['confidence']})  \n   Evidence: {h['evidence']}")
    L.append("")
    L.append("## Recommended action plan\n")
    L.append("| # | Action | Addresses | Impact | Effort |\n|---|---|---|---|---|")
    for i, h in enumerate(hyp, 1):
        a, imp, eff = action_for(h["cause"])
        L.append(f"| {i} | {a} | {h['cause']} | {imp} | {eff} |")
    L.append("")
    if f.get("query_drivers"):
        L.append("## Where the lost clicks went (query patterns)\n")
        names = {"ranking_loss": "Ranking loss (position dropped)", "ctr_loss": "CTR loss (position held, fewer clicks)",
                 "demand_loss": "Impressions loss at stable position (less demand, or pages dropping out of the index)", "disappeared": "Disappeared (zero impressions after)", "mixed": "Mixed / unclear"}
        L.append("| Pattern | Share of lost clicks |\n|---|---|")
        for k, v in f["query_drivers"].items():
            L.append(f"| {names.get(k, k)} | {v}% |")
        L.append("")
    if f.get("brand_split"):
        b = f["brand_split"]
        L.append("## Brand vs non-brand\n")
        L.append(md_table([dict(segment=k, **v) for k, v in b.items()],
                          ["segment", "clicks_before", "clicks_after", "click_change_pct", "impr_change_pct", "ctr_before", "ctr_after", "pos_before", "pos_after"],
                          ["Segment", "Clicks before", "Clicks after", "Clicks Δ%", "Impr. Δ%", "CTR before", "CTR after", "Pos. before", "Pos. after"]))
    if f.get("informational_ctr"):
        L.append("## CTR at stable positions (AI Overview check)\n")
        L.append(md_table([dict(group=k, **v) for k, v in f["informational_ctr"].items()],
                          ["group", "queries", "ctr_before", "ctr_after", "ctr_change_pct"],
                          ["Query type", "Queries", "CTR before %", "CTR after %", "CTR Δ%"]))
    if f.get("sections"):
        L.append("## Site sections\n")
        L.append(md_table(f["sections"], ["section", "pages", "pages_lost_all_impressions", "clicks_before", "clicks_after", "click_change_pct", "impr_change_pct", "pos_before", "pos_after"],
                          ["Section", "Pages", "Pages → 0 impr.", "Clicks before", "Clicks after", "Clicks Δ%", "Impr. Δ%", "Pos. before", "Pos. after"], n=10))
    if f.get("top_losing_queries"):
        L.append("## Top losing queries\n")
        L.append(md_table(f["top_losing_queries"], ["key", "click_change", "pos_before", "pos_after", "ctr_before", "ctr_after", "pattern"],
                          ["Query", "Clicks Δ", "Pos. before", "Pos. after", "CTR before %", "CTR after %", "Pattern"]))
    if f.get("top_losing_pages"):
        L.append("## Top losing pages\n")
        L.append(md_table(f["top_losing_pages"], ["key", "click_change", "pos_before", "pos_after", "impr_before", "impr_after", "pattern"],
                          ["Page", "Clicks Δ", "Pos. before", "Pos. after", "Impr. before", "Impr. after", "Pattern"]))
    for seg in ("devices", "countries"):
        if f.get(seg):
            L.append(f"## {seg.title()}\n")
            L.append(md_table(f[seg], ["segment", "clicks_before", "clicks_after", "click_change_pct", "pos_before", "pos_after"],
                              ["Segment", "Clicks before", "Clicks after", "Clicks Δ%", "Pos. before", "Pos. after"], n=8))
    if os.path.exists(os.path.join(out_dir, "timeline.png")):
        L.append("## Timeline\n\n![Daily organic clicks](timeline.png)\n")
    warns = list(f.get("warnings") or [])
    if t.get("data_stale_days"):
        warns.append(f"The daily data ends {t['end']}, {t['data_stale_days']} days ago. Export fresh data before sending this report.")
    if warns:
        L.append("## Data warnings\n")
        L += [f"- {w}" for w in warns]
        L.append("")
    L.append("## Not visible in this data (check manually)\n")
    L.append("- Manual actions and security issues (Search Console)\n- Crawl diff before vs after the drop (site audit crawler)\n- Whether losing queries now show AI Overviews or new SERP features (search them, or use a rank tracker with SERP features)\n- Competitors that gained the positions you lost\n- Backlinks lost around the drop date\n")
    L.append("---\n_Method: clicks are split into an impressions effect and a CTR effect. Each losing query and page is labeled by pattern, then scored against root-cause rules. This diagnosis is evidence-based but probabilistic, so confirm the top causes with the manual checks above before acting._\n")
    with open(os.path.join(out_dir, "report.md"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(L))


def write_csv(path, rows):
    if not rows:
        return
    with open(path, "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)


def chart(series, drop_date, events, out_dir):
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except Exception:
        return
    series = series[-180:]  # last ~6 months keeps the drop readable
    ds = [date.fromisoformat(s[0]) for s in series]
    cs = [s[1] for s in series]
    roll = [sum(cs[max(0, i - 6):i + 1]) / len(cs[max(0, i - 6):i + 1]) for i in range(len(cs))]
    fig, ax = plt.subplots(figsize=(10, 3.8), dpi=150)
    ax.plot(ds, cs, color="#9aa5b1", lw=0.8, label="Daily clicks")
    ax.plot(ds, roll, color="#1f5fbf", lw=2, label="7-day average")
    lo, hi = ds[0], ds[-1]
    top = max(cs) * 1.12
    k = 0
    for e in events:
        if e["end"] >= lo and e["start"] <= hi:
            ax.axvspan(max(e["start"], lo), max(min(e["end"], hi), max(e["start"], lo) + timedelta(days=1)), color="#f2b134", alpha=0.22)
            ax.annotate(e["name"], xy=(max(e["start"], lo), top * (0.97 - 0.08 * k)), fontsize=7, ha="right", va="top", color="#7a5300")
            k += 1
    ax.set_ylim(0, top)
    if drop_date:
        ax.axvline(date.fromisoformat(drop_date), color="#c0392b", ls="--", lw=1.2, label="Detected drop")
    ax.set_ylabel("Clicks"); ax.spines[["top", "right"]].set_visible(False)
    ax.legend(loc="lower left", fontsize=8, frameon=False)
    fig.tight_layout(); fig.savefig(os.path.join(out_dir, "timeline.png")); plt.close(fig)


# ----------------------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser(description="Diagnose a Search Console traffic drop.")
    ap.add_argument("--export", help="Compare-mode export folder or .zip")
    ap.add_argument("--dates", help="Daily (non-compare) Dates.csv for timeline")
    ap.add_argument("--before-queries"); ap.add_argument("--after-queries")
    ap.add_argument("--before-pages"); ap.add_argument("--after-pages")
    ap.add_argument("--after-label", help="Exact period label of the AFTER period, if auto-detection is wrong")
    ap.add_argument("--brand", help="Comma-separated brand terms")
    ap.add_argument("--events", help="CSV: name,type,start,end (algorithm updates, deploys, migrations)")
    ap.add_argument("--site", help="Site name for the report title")
    ap.add_argument("--out", default="tdd_report")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)

    ex = load_export(a.export) if a.export else {}
    def get(name):
        return ex.get(name) or ex.get(name.rstrip("s"))
    queries = pages = None; periods = None
    if get("queries"):
        queries, periods = to_pairs(get("queries"), a.after_label)
    if get("pages"):
        pages, p2 = to_pairs(get("pages"), a.after_label); periods = periods or p2
    if a.before_queries and a.after_queries:
        queries, periods = merge_before_after(read_file(a.before_queries), read_file(a.after_queries))
    if a.before_pages and a.after_pages:
        pages, p2 = merge_before_after(read_file(a.before_pages), read_file(a.after_pages)); periods = periods or p2
    if not queries and not pages:
        sys.exit("No usable data. Provide a compare-mode export (--export) or before/after files.")
    devices = to_pairs(get("devices"), a.after_label)[0] if get("devices") else None
    countries = to_pairs(get("countries"), a.after_label)[0] if get("countries") else None

    base = queries or pages
    f = {"periods": periods}
    # Totals: prefer pages (queries exclude anonymized queries), else queries
    tsrc = pages or queries
    f["totals_before"], f["totals_after"] = totals(tsrc, "b"), totals(tsrc, "a")
    f["totals_source"] = "pages" if pages else "queries"
    f["decomposition"] = decompose(f["totals_before"], f["totals_after"])
    if queries:
        allq, topq = loser_table(queries)
        f["query_drivers"] = driver_shares(allq)
        f["top_losing_queries"] = topq
        f["informational_ctr"] = informational_ctr(queries)
        f["brand_split"] = brand_split(queries, (a.brand or "").split(",") if a.brand else None)
        write_csv(os.path.join(a.out, "losers_queries.csv"), allq)
    if pages:
        allp, topp = loser_table(pages)
        f["page_drivers"] = driver_shares(allp)
        f["top_losing_pages"] = topp
        f["sections"] = sections(pages)
        lost = sum(-r["click_change"] for r in allp) or 1
        f["top10_pages_share_of_loss_pct"] = round(sum(-r["click_change"] for r in allp[:10]) / lost * 100, 1)
        write_csv(os.path.join(a.out, "losers_pages.csv"), allp)
        write_csv(os.path.join(a.out, "sections.csv"), f["sections"])
    if pages:
        f["migration"] = detect_migration(pages, f["sections"])
    for name, d in (("Pages", pages), ("Queries", queries)):
        if d and len(d) >= 999:
            WARNINGS.append(f"{name} export has {len(d)} rows, which is the Search Console UI limit, so it's probably truncated. Filter by section or use the API/bulk export for full coverage.")
    f["devices"] = segment_table(devices)
    f["countries"] = segment_table(countries)
    events = load_events(a.events)
    tl = timeline(read_file(a.dates)) if a.dates else None
    series = tl.pop("_series", None) if tl else None
    f["timeline"] = tl
    f["matching_events"] = match_events((tl or {}).get("drop_date"), events)
    if events and (tl or {}).get("drop_date"):
        newest = max(e["end"] for e in events)
        if date.fromisoformat(tl["drop_date"]) - newest > timedelta(days=60):
            WARNINGS.append(f"The newest event in events.csv ends {newest.isoformat()}, well before the drop ({tl['drop_date']}). Add recent Google updates from the Google Search Status Dashboard and your own site changes, then re-run.")
    f["warnings"] = WARNINGS
    for w_ in WARNINGS:
        print("WARNING:", w_, file=sys.stderr)
    f["hypotheses"] = hypotheses(f)
    f.pop("_index_sections", None)
    if series:
        chart(series, tl.get("drop_date"), events, a.out)
    write_report(f, a.out, a.site)
    with open(os.path.join(a.out, "findings.json"), "w", encoding="utf-8") as fh:
        json.dump(f, fh, indent=2, default=str)
    print(f"Report: {os.path.join(a.out, 'report.md')}")
    print("Top causes:")
    for h in f["hypotheses"][:4]:
        print(f"  - [{h['confidence']}] {h['cause']}")


if __name__ == "__main__":
    main()
