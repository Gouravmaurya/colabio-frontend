# One command, coordinated workflow

For substantial open briefs, use [product-led design decisions](design-decisions.md)
before direction draws or component research. Ask only unresolved, consequential
questions, then coordinate one chosen concept. Apply [quality gates](quality-gates.md)
at delivery. Its evidence verifier checks record completeness, not factual truth.
These phase-specific integrations do not invoke independent upstream critique,
scoring, theme, or orchestration workflows automatically.


All paths below are relative to the installed Colabio skill directory. Companions
are bundled supporting resources, not separately activated top-level skills.
Read the referenced upstream files when their phase applies. Do not merely list
them in a delivery report. Do not load every companion reference in advance.
For additional design, mobile, image, motion, scroll, and 3D work, use the
[module router](module-router.md). During implementation, apply SKILL.md's local
dependency installation step before importing missing runtime packages.

## Authority and compatibility

The user's brief, authorized scope, existing brand, accessibility, and platform
requirements control the work. Colabio coordinates the final concept and
implementation. Companion texts are phase-specific guidance; their independent
theme selection, installation, full rebuild, scoring, and orchestration rules do
not automatically become Colabio requirements. Explicitly invoking an upstream
command is different from using its bundled guidance in Colabio's pipeline.

Use one agreed direction, one set of tokens, and one motion ownership plan.
Do not combine multiple random theme draws, silently replace a brand, enforce
arbitrary font/color bans, or add hooks and global installations. Keep the core
GSAP/Lenis/React Motion requirements in SKILL.md, with reduced-motion equivalents.
Never run an upstream installer as part of ordinary frontend work.

## 1. Understand: Impeccable context model

First apply [automatic selection](automatic-selection.md) against the full
inventory. The named core companions below define phase responsibilities, not
an exclusive list. Combine the additional selected craft, responsive, motion,
component, and review guides within those phases and record their concrete use.

Read [Impeccable's entrypoint](../companions/impeccable/GUIDE.md) and its
[new-work guidance](../companions/impeccable/reference/new-work.md) for a new
surface or replacement visual world. For a narrow refinement, select the named
playbook instead. Read existing product/design briefs and inspect the incumbent
UI. Separate product facts from visual decisions and identify the surface's goal.
Missing context files alone do not authorize rebuilding or rewriting them.

When its context engine is available and useful, use the bundled runtime wrapper
below. It can download an optional engine into the project cache; installation
does not run it. If the host cannot run it, say that context loading did not run,
read existing context directly, and continue with the instruction-based workflow.
Do not imply the engine ran because its instructions were read.

## 2. Art direction: Taste Skill

Read [Taste Skill's entrypoint](../companions/taste/GUIDE.md). Inventory the
subject's particular assets, constraints, language, and proof; write the page's
argument before picking an aesthetic. For app screens also read
[app-screens](../companions/taste/references/app-screens.md).

For an open new direction, run the bundled direction generator through the
wrapper with `--options 3`, then choose by project fit. Do not generate a second
competing Hallmark theme. If the brand is fixed, preserve its palette/type and
use relevant Taste references to improve composition; do not impose a draw.
Use licensed, subject-relevant imagery. When generation or asset tooling cannot
run, derive candidates from the bundled library and disclose the fallback.

## 3. Structure and signature components: Hallmark

Read [Hallmark's entrypoint](../companions/hallmark/skills/hallmark/GUIDE.md),
[structure](../companions/hallmark/skills/hallmark/references/structure.md), and
[interaction states](../companions/hallmark/skills/hallmark/references/interaction-and-states.md).
Use their structural diagnostics to challenge the proposed page architecture.
Keep the chosen project direction; do not run Hallmark's catalog theme selector.

For substantial creative work, compare two different information journeys and
select one. Define the signature component's content model, real states,
keyboard/touch behavior, responsive composition, and static equivalent.
Use the [high-craft playbook](high-craft.md), build and inspect the focal slice,
then complete the whole deliverable. A new palette on an unchanged stock layout
is not evidence of structural originality.

## 4. Reference analysis: Awesome DESIGN.md

Use [the reference index](design-integrations.md). Read two or three relevant
analyses for an open substantial brief; choose them by the problem they help
solve, not brand popularity. Record the adopted mechanism and why it fits.
If the network or linked analysis is unavailable, state that limitation and
use the bundled research rather than inventing what the reference says.

## 5. Implementation: Colabio

Finalize project-specific font roles, exact font details, semantic colors,
spacing, component anatomy, and asset direction. Follow SKILL.md for GSAP,
Lenis, Motion for React, cleanup, performance, and reduced motion. Use reliable
accessible primitives beneath bespoke presentation. Keep all changes within the
requested surface; standalone demonstrations must not import production themes.

## 6. Rendered review: Impeccable and Hallmark

Immediately before UI editing, read
[Impeccable's craft floor](../companions/impeccable/reference/craft-floor.md).
Before delivery, read its [critique](../companions/impeccable/reference/critique.md)
and the relevant portions of [Hallmark's slop test](../companions/hallmark/skills/hallmark/references/slop-test.md).
Apply their useful diagnostics against the project brief; intentional patterns
are not automatically defects. Do not fabricate upstream pass counts or scores.

Inspect a full-page composition and representative desktop, tablet, and phone
views. Exercise the signature component, primary action, navigation, keyboard
focus, long content, and reduced motion. Check console errors and overflow.
Fix material findings in one batch, then confirm; expand checks only for a
remaining failure. Keep generated screenshots and a brief evidence record in
the requested test/output folder, not inside production routes by default.

## Runtime wrapper

Use `node <colabio>/scripts/companion.mjs --project <absolute-project> --tool taste -- --sector <supported-sector> --options 3 --brief "<subject>"`.
For app candidates replace `--sector` with `--app --kind <supported-kind>` after `--`.
For Impeccable use `--tool impeccable -- context --target <surface>`.

The wrapper keeps Taste history and Impeccable's engine cache inside
`<project>/.colabio-frontend/`. It does not install global skills or hooks.
Upstream browser inspectors must not bypass the host's required browser tools;
use the host browser when required and describe checks actually performed.
The companion instructions remain useful when optional runtimes are unavailable.

## Evidence record

For substantial work, keep a short record alongside the task brief: product
evidence; selected concept; companion files read; source commits; commands
actually run; reference mechanisms adopted; conflicts resolved; and observed
interaction/responsive checks. Mark generated samples as demonstrations.
For small fixes, keep the same honesty with a proportional delivery note.
