# Colabio Frontend v1.6.0 (main; no release tag created)

- Adds six content-led cinematic recipes: editorial portrait, product close-up,
  software walkthrough, project screening room, film-title sequence, process study.
- Adds a live reference study of the owner's published portfolio (2026-10-26),
  distinguishing observed desktop/mobile behavior from untested claims. No source
  or image assets are redistributed. The study transfers mechanisms, not identity.
- Requires baseline inspection before direction, an accepted representative slice,
  and dimension-by-dimension final comparison. Visual regressions/unverified rows
  block upgrade claims; two review rounds do not excuse unresolved weaknesses.
- Adds a read-only visual-record verifier with PNG/viewport checks, chronology,
  cinematic checkpoints, responsive comparisons and explicit finding rechecks.
  Passing it verifies records, not aesthetic quality or screenshot provenance.
- Fixes motion examples: removable ticker callbacks, scoped media cleanup, no
  global ScrollTrigger kill, and measured horizontal-track travel.
- Adds an explicit direction-picker style constraint and preserves requested
  themes during mood fallback. Standalone and full-bundle entries share the gates.
- Adds regression tests for the portfolio-v2 failure mode and installation checks
  for every bundled reference/script. Packaging tests do not certify future designs.

## v1.5.0

### Intake, site types, verification and templates

Preserves the incoming brief intake, type playbooks, preview/contrast helpers,
brief-aware picker, three working starter examples and intake evaluation cases.
Starters remain optional and now obey the strict rendered acceptance contract.

## Main update: palette selection and rendered review

Open color briefs now compare two materially different palettes with evidence
from the actual project before choosing. Kit output and generic adjectives do
not establish fit. Rendered review checks dominant surfaces, neutral tints, CTA
area, interaction states, and unexplained reuse; unsupported palette choices
remain findings even when contrast passes. Existing brand colors and small-fix
scope are preserved. No color family is banned. These rules apply to both the
standalone skill and the preserved bundle. Installation docs now describe the
current standalone folder, including its references and scripts. No release tag
or published version is changed.

Adds a product-led decision protocol: understand the audience and use case, ask one focused discovery round when material choices remain, compare meaningful directions and palette families, and derive component anatomy from the visitor's task.

- Separates quiet minimal, editorial premium, and expressive flagship character from quality or price claims.
- Strengthens component depth: minor hover polish does not satisfy the signature-component requirement.
- Adds read-only evidence-record validation for missing checks/artifacts, responsive screenshots, and reported performance-budget overruns. The helper is not a browser runner or independent visual assessment.
- Adds original MIT-licensed offline mechanism analyses and three cross-brief evaluation inputs, with observation versus hypothesis explicitly labeled.
- Requires measured performance methods/budgets, fallback checks, findings/rechecks, and honest unverified gates; recommends deferred heavy rendering when appropriate.
- Reduces conflicting style defaults: High-end Visual Design is a candidate lens rather than automatically selected for every full build.

Install/update for Claude Code and Codex:

    npx skills add Gouravmaurya/colabio-frontend --skill colabio-frontend -a claude-code -a codex --copy -g -y

Omit -g for project-local installation. This release updates the skill and verification workflow; it does not rebuild websites. Three-brief rendered evaluation of v1.5.0 is not yet completed and must not be inferred from packaging tests.

## Pending: incumbent comparison gate

Substantial redesigns now inspect the rendered incumbent, preserve product identity, define concrete advances, and compare the final result at equivalent viewports. Tests, dependency counts, and completed records cannot establish visual superiority. No new published tag is implied by this working-copy update.

## Main: standalone core and design council

The default installation now selects a self-contained `SKILL.md` with pinned,
on-demand specialist routes and a coordinated council for major frontend work.
Redesigns retain recognizable brand strengths and compare the full visitor
journey. The README documents user/project installation, individual assistant
targets, manual installation, invocation, specialist scope, and updates.
All original skills and the full-bundle installer remain available. No existing
tag is changed and no new release tag is created by this merge.

## Unreleased: one-pass premium build

- Adds `references/agency-playbook.md`: brief lock, seeded direction, spec, assets, vertical slice, library mining, build, and a required screenshot-critique loop scored on Design/Usability/Creativity/Content.
- Adds `references/design-kit.json` (8 styles, 14 font pairs, 11 contrast-checked palettes, signature mechanisms, hero compositions) and `scripts/pick-direction.mjs` to force variety on open briefs.
- Adds `scripts/slop-lint.mjs` to flag template tells in source, `references/asset-and-copy.md`, and `references/craft-defaults.md`.
- Caps style guides at one primary plus two supporting; adds a library-website mining protocol (shadcn directory, 21st.dev, Magic UI, Aceternity, React Bits, Motion Primitives, Codrops and more).
- The standalone curated `SKILL.md` carries a self-contained "Premium one-pass build" section.
- The default curated skill is now fully standalone: it ships `references/` (playbook, style recipes, design kit, craft defaults, asset/copy gate, motion recipes, library mining) and `scripts/` (pick-direction, slop-lint). The design council and the install-other-skills section were removed.

## Unreleased: idea-to-site pipeline

- Adds `references/prompt-enhancer.md` (12-part Cinematic Design Prompt), `scripts/select-build.mjs` (build selector), `scripts/finish-gate.mjs` (static polish gate) and `evals/pipeline-evals.md`; SKILL.md now opens with the six-stage pipeline.
- Fixes backspace characters that corrupted word-boundary regexes in `pick-direction.mjs` type detection.

## Unreleased: understanding-first theming and Impeccable bridge

- Adds `references/product-understanding.md` (understand, then plan, then derive the theme), `scripts/palette-lab.mjs` with `references/domain-swatches.json` (domain-grounded palette candidates, category-default flags including navy+yellow and cream grounds, `--check` for built pages).
- `select-build.mjs` now returns theme candidates and says to understand first; `finish-gate.mjs` runs the palette check and, when installed, the Impeccable detector (`references/impeccable-bridge.md`).
- Reorders the Cinematic Design Prompt so art direction is derived from the understanding and scene plan.

## Unreleased: one combined skill

- Adds a trimmed, licensed `library/` (about 4 MB, 340 files) with Impeccable playbooks, Hallmark, Taste references, UI/UX Pro Max data subset, Emil Kowalski, GSAP, Motion, Scroll Craft and Three.js guides, routed by `library/INDEX.md`, with `library/NOTICE.md` and `references/sources.md`.
- Adds a Commands layer to SKILL.md (new, shape, redesign, critique, audit, polish, harden, distill, bolder, quieter, typeset, layout, colorize, animate, onboard, clarify, adapt, optimize).
- SKILL.md slimmed from 36 KB to 12 KB: full guidance moved to `references/core-guidance.md`, file list to `references/file-map.md`, and a new `references/commands.md` says how each command runs here (including what to skip in Impeccable guides that assume its launcher). Hallmark token links repaired.
