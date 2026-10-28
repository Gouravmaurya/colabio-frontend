# Colabio Frontend v1.10.0 (main; no tag created)

Synchronizes the standalone skill with the installed v1.10.0 frontend skill.
Adds agent council role prompts, runtime-adapted orchestration, scoped design
memory, cinematic motion guidance, and plan/taste checks. Updates selection,
palette, component sourcing, contrast, variety, and finish checks with the
matching references and evaluation guidance.

The original full bundle and existing version tags remain unchanged. The
standalone installation check now includes the bundled `agents/` role prompts.

# Colabio Frontend v1.6.0 (main; release candidate, no tag created)

One skill that replaces a stack of frontend skills.

**Decisions**
- Understanding-first order: write an Understanding Sheet (users, device and light, decision, proof, domain
  vocabulary and materials, defaults to avoid), plan scenes and pages, and only then derive the theme.
- Prompt enhancer: any idea becomes a 12-part Cinematic Design Prompt (`design-brief.md`).
- `select-build.mjs` proposes type, starter, stack, motion level, pages, libraries and reading order.
- `palette-lab.mjs` builds domain-grounded palette candidates from real materials (20 domains), checks contrast,
  flags category defaults (navy + yellow, neon on black, purple glow, cream ground) and audits built pages.
- Anti-clone rule and craft bar: build the level of strong sites, never their design.

**Combined library**
- A trimmed, licensed `library/` (about 4 MB) bundles Impeccable playbooks (Apache-2.0), Hallmark components and
  page structures, Taste anti-slop references, a UI/UX Pro Max data subset, Emil Kowalski's guides, GSAP official
  skills, Motion, Scroll Craft and Three.js rules, routed by `library/INDEX.md`. Licences and pins are in
  `library/NOTICE.md` and `references/sources.md`; upstream entry files are renamed `GUIDE.md`.
- A Commands layer (new, shape, redesign, critique, audit, polish, harden, distill, bolder, quieter, typeset,
  layout, colorize, animate, onboard, clarify, adapt, optimize) with `references/commands.md` explaining how each
  runs here and what to skip in upstream guides that assume Impeccable's launcher.
- `SKILL.md` is 12 KB; full guidance lives in `references/core-guidance.md`.

**Beyond the template**
- `references/distinctive-design.md`: category inventory, one distinctive move per page, a section-form menu (no form more than twice, none adjacent, banned skeleton needs a reason), component sourcing order and five specificity tests.
- `scripts/variety-check.mjs`: heuristic scan for repeated or adjacent section forms, the banned skeleton, and demo phrases.
- `library/components`: 16 original, dependency-free components with a live gallery and a transform checklist.
- `scripts/component-source.mjs`: read-only viewer for the bundled components and the shadcn, Magic UI, Aceternity UI, React Bits, Skiper UI and Vengeance UI registries; 21st.dev works with the user's own `API_KEY_21ST` (never entered in chat). Nothing is installed.
- `scripts/capture.mjs`: exact-size PNG captures; finish-gate warns when mobile navigation is hidden with no menu.

**Build and verify**
- Intake and site-type playbooks, four working starters (cinematic product shop, scroll-stage game, precision
  service, portfolio index) with `scaffold.mjs`, local `serve.mjs`.
- `finish-gate.mjs` (meta, landmarks, alt text, focus, reduced motion, social card, favicon, placeholders, palette
  check, optional Impeccable detector), `slop-lint.mjs`, `check-contrast.mjs`, `verify-visual-gates.mjs`.
- Six content-led cinematic recipes; baseline, slice and final visual gates; a live reference study of a published
  portfolio (mechanisms only, no assets redistributed).
- Fixes: motion examples (removable ticker callbacks, scoped media cleanup, measured horizontal track),
  word-boundary regexes in the direction picker, Hallmark token links.

Not claimed: award-level results, measured performance, or independent design scores. Fresh-session acceptance
tests are listed in `skills/.curated/colabio-frontend/evals/acceptance.md`.

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

