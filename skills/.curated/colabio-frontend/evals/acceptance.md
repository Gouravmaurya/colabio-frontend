# Acceptance tests (run in a fresh session before a release)

Restart Claude Code so the disabled duplicate skills drop out, then run each case. A case
passes only when every "Pass if" line is observably true; mark anything not observed as
"not checked". Keep results in the table at the end. These are manual tests of behaviour; the
repository's `npm test` covers packaging only.

## Preflight
1. `/colabio-frontend` is discoverable and no other frontend design skill triggers beside it
   (impeccable, taste, hallmark, ui-ux-pro-max, animate and similar are disabled).
2. `node scripts/palette-lab.mjs --validate`, `node scripts/select-build.mjs --brief "tea shop"`
   and `node scripts/finish-gate.mjs templates/portfolio-index` run without errors.
3. `SKILL.md` is under 16 KB and every file it names exists (`npm test`).

## A. New site from a thin idea
**Prompt:** `/colabio-frontend a landing page for a small-batch coffee roaster, cinematic`
**Pass if**
- It writes an Understanding Sheet (users, device and light, decision, proof, vocabulary and materials, defaults to avoid) before choosing colour.
- It asks at most one round of questions, or states assumptions.
- It runs `select-build.mjs` and `palette-lab.mjs`, compares real candidates, and names the material behind each colour; no navy + yellow, neon on black, purple glow or cream ground unless justified.
- It saves `design-brief.md` with all 12 sections.
- The built page works with real events (primary action, form invalid and valid), has no console errors, has a reduced-motion path and a no-library path.
- `finish-gate.mjs` output is shown; no FAIL left.
- It ends with a "next time say" prompt and states what was not checked.

## B. critique of an existing page
**Prompt:** `/colabio-frontend critique D:\Coding\selvage-floor` (or any built page)
**Pass if**
- It inspects the page rendered before reading guides.
- It follows `references/commands.md`: no attempt to run Impeccable's launcher, `critique-storage`, `live-server` or `.impeccable/` writes.
- The report has: method line, heuristic scores with evidence and an applicable maximum, specificity verdict, what is working, 3-5 prioritised issues with a suggested Colabio command, persona red flags, evidence limits.
- It changes no files unless asked.

## C. redesign without regression
**Prompt:** `/colabio-frontend redesign <a real live URL or local page>`
**Pass if**
- It records a baseline (what the visitor understands, proof, action, brand elements, strengths to keep) before choosing a direction.
- It compares before and after at matching widths and lists gains and regressions; a regression blocks an upgrade claim.

## D. polish or harden a component
**Prompt:** `/colabio-frontend harden <a form or dialog>`
**Pass if**
- It drives empty, loading, error, long-content and keyboard states with real events and fixes what fails.
- It reports which gates ran.

## E. Understanding-first colour
**Prompt:** `/colabio-frontend colorize <a page with a navy or cream default>`
**Pass if**
- It runs `palette-lab.mjs --check`, explains the flag, proposes domain-grounded candidates, and justifies light or dark from the use context rather than a style word.

## F. Installation
**Pass if** `npx skills add .../tree/main/skills/.curated/colabio-frontend --skill colabio-frontend -a claude-code --copy -y` in a clean project yields the same folder as the repository (checked by `npm run test:standalone` and `npm run test:npx`).

## Results

| Case | Date | Result | Not checked | Notes / fixes |
| --- | --- | --- | --- | --- |
| Preflight | | | | |
| A new | | | | |
| B critique | | | | |
| C redesign | | | | |
| D harden | | | | |
| E colorize | | | | |
| F install | | | | |
