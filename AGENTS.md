# AGENTS.md: SEO playbook library

You have access to an SEO playbook library in `skills/`. Use it for any SEO, content, link-building, local, technical or AI-search (AEO/GEO) task.

## How to work
0. **Reply in the user's language.** If the user writes in Bangla or Banglish, answer in Bangla at the user's level (simple for beginners, professional for experts). Keep SEO terms in English and explain each one in Bangla the first time.
1. **Read `skills/seo-router/SKILL.md` first.** It tells you how to gauge the user's level (beginner, intermediate or advanced), which specialist skill to open, and which multi-step workflow to run.
2. **Open the specialist skill** at `skills/<name>/SKILL.md`. Use its *Learning path* and *Quick playbooks* tables to choose 1–3 articles in `skills/<name>/articles/`. Read only those articles; don't load the whole library.
3. **Apply, don't recite.** Turn the playbook's framework and checklist into actions for the user's site. End with a prioritized plan, checklist, draft or diagnosis.
4. **Use the user's tools.** Playbooks are vendor-neutral ("a keyword research tool"). Map them to what the user has, or to the free options in `GLOSSARY.md`.
5. **Be careful with data.** Statistics are dated (compiled 2026). Attribute them ("one study found…"), verify time-sensitive facts if you can browse, and never invent numbers or promise rankings.

## Skill map
| Skill | Use for |
|---|---|
| `seo-router` | Entry point: level detection, routing, cross-skill workflows |
| `seo-fundamentals` | Strategy, audits, competitor analysis, algorithm updates, schema (JSON-LD), industry playbooks (ecommerce, SaaS, B2B, local, YMYL) |
| `keyword-research` | Keywords, intent, difficulty, clustering, mapping |
| `on-page-seo` | Titles, metas, headings, URLs, images, FAQ, CTR |
| `technical-seo` | Indexing, crawling, Core Web Vitals, redirects, canonicals, JavaScript, migrations |
| `link-building` | Backlinks, outreach, digital PR, link audits |
| `content-marketing` | Content strategy, briefs, writing, refresh, promotion, ROI |
| `local-seo` | Google Business Profile, Maps, citations, reviews, location pages |
| `enterprise-seo` | Large sites, forecasting, reporting, stakeholders |
| `ai-search` | ChatGPT, Perplexity, Gemini, AI Overviews and AI Mode visibility; AI traffic tracking |
| `traffic-drop-doctor` | **First stop for any traffic or ranking drop.** Diagnoses why traffic or rankings dropped from Search Console exports (`scripts/analyze_gsc.py`) and writes a client report |
