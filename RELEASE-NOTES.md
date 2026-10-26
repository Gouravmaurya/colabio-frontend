# Colabio Frontend v1.5.0

## Main update: intake, site types, verification and templates

Merges the locally developed skill with the palette-grounding update: prompt-improvement intake (`brief-intake.md`), per-type playbooks (`site-types.md`), render verification (`verify.md`, `serve.mjs`, `check-contrast.mjs`), an award-bar reference, brief-aware `pick-direction.mjs`, starter `templates/` with `scaffold.mjs`, and intake evals. Palette comparison and rendered palette review from the previous update are retained.

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
