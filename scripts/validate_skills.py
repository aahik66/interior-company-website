#!/usr/bin/env python3
"""Validate an SEO skill library.

Usage: python validate_skills.py <skills_root> [--strict]

Checks per skill:
  1. Frontmatter passes the Agent Skills spec (name/description rules)
  2. name matches folder name
  3. SKILL.md body under 500 lines (warning)
  4. All relative markdown links resolve (SKILL.md, ARTICLES.md, articles/*)
  5. Every article file is reachable from SKILL.md or ARTICLES.md (no orphans)
  6. Every ✅ entry in ARTICLES.md links to an existing file
  7. Article structure: TL;DR, checklist, mistakes, principles sections
  8. No raw URLs; no tool/vendor brand names (library policy)
  9. Files are non-empty UTF-8
"""
import re
import sys
from pathlib import Path

import yaml

BRANDS = [
    "ahrefs", "semrush", "moz", "screaming frog", "yoast", "rank math", "surfer",
    "clearscope", "marketmuse", "similarweb", "majestic", "ubersuggest", "spyfu",
    "serpstat", "sistrix", "conductor", "brightedge", "botify", "lumar", "deepcrawl",
    "sitebulb", "hubspot", "buzzsumo", "hunter.io", "pitchbox", "brightlocal",
    "whitespark", "yext", "frase", "jasper", "profound", "otterly", "seoclarity",
    "searchmetrics", "contentking", "oncrawl", "jetoctopus", "wordlift",
    "keywords everywhere", "answerthepublic", "answer the public", "alsoasked",
    "mangools", "kwfinder", "se ranking", "accuranker", "stat search", "siteliner",
    "keyword insights", "featured.com", "cision", "qwoted", "profnet", "onepitch", "roxhill",
    "muck rack", "sourcebottle", "logflare", "bigquery", "cloudflare", "grammarly", "wordable",
    "looker studio", "colab", "zapier", "upworthy", "sparktoro", "peec", "tableau", "power bi",
    "trello", "jira", "confluence", "tim soulo", "joshua hardwick", "patrick stox", "russ jones",
    "brett farmiloe", "cyrus shepard", "ryan law", "glen allsopp", "brian dean", "backlinko",
    "engineroom", "mamamia", "xtend barre", "f45", "awt", "page explorer",
    "batch analysis", "ai content helper", "普通人",
]
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")
URL_RE = re.compile(r"https?://", re.I)
REQUIRED_ARTICLE_SECTIONS = {
    "tl;dr": re.compile(r"^#+\s*tl;?dr", re.I | re.M),
    "checklist": re.compile(r"^#+\s*.*checklist", re.I | re.M),
    "mistakes": re.compile(r"^#+\s*.*mistake", re.I | re.M),
    "principles": re.compile(r"^#+\s*.*principle", re.I | re.M),
}


def frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        return None, "missing/invalid frontmatter"
    try:
        fm = yaml.safe_load(m.group(1))
    except yaml.YAMLError as e:
        return None, f"bad YAML: {e}"
    return fm, None


def check_fm(fm, folder):
    errs = []
    allowed = {"name", "description", "license", "allowed-tools", "metadata", "compatibility"}
    extra = set(fm) - allowed
    if extra:
        errs.append(f"unexpected frontmatter keys {sorted(extra)}")
    name = str(fm.get("name", "")).strip()
    desc = str(fm.get("description", "")).strip()
    if not name:
        errs.append("missing name")
    elif not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", name) or len(name) > 64:
        errs.append(f"invalid name '{name}'")
    if name != folder:
        errs.append(f"name '{name}' != folder '{folder}'")
    if not desc:
        errs.append("missing description")
    if "<" in desc or ">" in desc:
        errs.append("description has angle brackets")
    if len(desc) > 1024:
        errs.append(f"description too long ({len(desc)})")
    return errs


def validate(skill: Path, strict: bool):
    errors, warns = [], []
    sk = skill / "SKILL.md"
    if not sk.exists():
        return ["SKILL.md missing"], []
    if len(list(skill.rglob("SKILL.md"))) > 1:
        errors.append("more than one SKILL.md")
    text = sk.read_text("utf-8")
    fm, err = frontmatter(text)
    if err:
        errors.append(err)
    else:
        errors += check_fm(fm, skill.name)
    n = text.count("\n")
    if n > 500:
        warns.append(f"SKILL.md is {n} lines (>500)")

    md_files = sorted(skill.rglob("*.md"))
    reachable = set()
    for f in md_files:
        raw = f.read_bytes()
        if not raw.strip():
            errors.append(f"empty file {f.relative_to(skill)}")
            continue
        try:
            t = raw.decode("utf-8")
        except UnicodeDecodeError:
            errors.append(f"non-UTF8 {f.relative_to(skill)}")
            continue
        for link in LINK_RE.findall(t):
            if link.startswith(("http", "#", "mailto:")):
                continue
            target = (f.parent / link.split("#")[0]).resolve()
            if not target.exists():
                errors.append(f"broken link in {f.relative_to(skill)} -> {link}")
            elif f.name in ("SKILL.md", "ARTICLES.md"):
                reachable.add(target)
        if re.search(r"https?://(?!(www\.)?(example\.com|domain\.com|yourdomain\.com|yoursite\.com)|[a-z0-9.-]+\.example\b|search\.google\.com|schema\.org|www\.facebook\.com/your|www\.linkedin\.com/company/your)", t):
            warns.append(f"raw URL in {f.relative_to(skill)}")
        low = t.lower().replace("reasonable surfer", "").replace("reasonable-surfer", "")
        for b in BRANDS:
            if re.search(r"(?<![a-z])" + re.escape(b) + r"(?![a-z])", low):
                warns.append(f"brand '{b}' in {f.relative_to(skill)}")
        if f.parent.name == "articles":
            missing = [k for k, rx in REQUIRED_ARTICLE_SECTIONS.items() if not rx.search(t)]
            if missing:
                (errors if strict else warns).append(
                    f"{f.relative_to(skill)} missing sections: {', '.join(missing)}")

    for f in md_files:
        if f.parent.name in ("articles", "references") and f.resolve() not in reachable:
            errors.append(f"orphan (not linked from SKILL.md/ARTICLES.md): {f.relative_to(skill)}")

    idx = skill / "ARTICLES.md"
    if idx.exists():
        for line in idx.read_text("utf-8").splitlines():
            if "✅" in line and not line.startswith("Status") and not LINK_RE.search(line):
                errors.append(f"✅ entry without link: {line[:80]}")
    return errors, warns


def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_skills.py <skills_root> [--strict]")
        sys.exit(1)
    root = Path(sys.argv[1])
    strict = "--strict" in sys.argv
    skills = sorted(p.parent for p in root.glob("*/SKILL.md"))
    total_err = 0
    for s in skills:
        e, w = validate(s, strict)
        total_err += len(e)
        arts = len(list((s / "articles").glob("*.md"))) if (s / "articles").exists() else 0
        status = "PASS" if not e else "FAIL"
        print(f"[{status}] {s.name}  ({arts} articles, {len(e)} errors, {len(w)} warnings)")
        for x in e:
            print(f"    ERROR {x}")
        for x in w:
            print(f"    warn  {x}")
    print(f"\n{len(skills)} skills checked, {total_err} errors")
    sys.exit(1 if total_err else 0)


if __name__ == "__main__":
    main()
