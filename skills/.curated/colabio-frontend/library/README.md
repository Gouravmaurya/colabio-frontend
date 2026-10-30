# library/: reviewed upstream guidance inside one skill

`library/` holds guides from other frontend skills (Impeccable, Hallmark, Taste Skill,
UI/UX Pro Max data, Emil Kowalski's design-engineering guides, GSAP official skills, Scroll
Craft, Three.js rules and others), bundled with their licenses so Colabio is a single
package. Nothing here is a separate skill: entry files are named `GUIDE.md`, and
`INDEX.md` says which guide to open for which job.

## Precedence (when guides disagree)

1. The user's request, existing brand and constraints.
2. Colabio's own order and gates: understand the product, plan, derive the theme
   (`references/product-understanding.md`), anti-clone rule, rendered gates, finish gate.
3. One primary style recipe (`references/styles.md`), at most two borrowed details.
4. Library guides: **reference material for a phase**, never a second workflow.

## Rules of use

- Open at most about three library files per phase. Read the one that answers the question.
- Skip upstream setup that does not apply here: launcher commands (`impeccable context`,
  `impeccable live`), hooks, `init`/`document` file generation, install steps, registry
  setup and telemetry. Colabio's `design-brief.md` is the context file; create a
  `DESIGN.md` only if the user asks for a design-system document.
- Upstream style defaults (Taste dials, Hallmark themes, Impeccable's bold stance) are
  inputs, not mandates. Do not mix palettes, radii or motion grammars from different recipes.
- If a guide's relative links point to a file that is not bundled (demo sites, large
  catalogues, fonts, icon sets, binaries were left out), ignore the link.
- Known unresolved links (about 24): Hallmark examples and test pages (`site/examples`, `site/_tests`) and a few files referenced by one Motion.dev research note were not bundled. The Hallmark token file (`hallmark/site/css/tokens.css`) is bundled and its links were repaired. Ignore the rest.
- Upstream licenses stay with the files; see `NOTICE.md`. Do not strip them.
- MotionSites uses `modules/motionsites-web-builder/GUIDE.md` as its adapter.
  Its example prompts and media are excluded from redistribution; skip upstream
  shelf/example prerequisites, promotional instructions, fixed scores and stack defaults.
- If a library recommendation conflicts with a Colabio gate (contrast, reduced motion,
  fail-open, anti-clone), the gate wins and the reason goes in the delivery notes.
