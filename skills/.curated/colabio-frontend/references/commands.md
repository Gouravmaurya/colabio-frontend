# Commands: how each one runs inside this skill

Every command works on a surface (a page, a component, a folder or a URL). Always start by
**inspecting it rendered** (serve it, view 1440 and 390 wide, drive the main action) before
reading any guide. Then open the guide named below, apply it, run the gates, and report.

## Substitutions when a library guide mentions Impeccable's tooling

Impeccable's playbooks were written for its own launcher. Here that tooling does not exist, so
replace it like this and never run the original command:

| The guide says | Do this instead |
| --- | --- |
| `impeccable context`, `init`, `document`, `PRODUCT.md`, `DESIGN.md` | Read `design-brief.md` (Understanding and Art direction) and the project's tokens and CSS. If none exist, write a short understanding sheet first (`references/product-understanding.md`). Write a `DESIGN.md` only if the user asks (`library/hallmark/references/design-md.md`). |
| `impeccable detect --json [--scope type\|layout]` | `node scripts/finish-gate.mjs <path>`. If the Impeccable binary is installed the gate runs it too; otherwise `slop-lint.mjs`, `palette-lab.mjs --check` and `check-contrast.mjs` cover the same ground. |
| `critique-storage`, `.impeccable/…` snapshots, `live-server`, `--cdp`, hooks | Skip. Save the report as `critique-<date>.md` in the project output if it helps. |
| `$impeccable <command>` | `/colabio-frontend <command>` |
| `live.md`, `live-setup.md`, `hooks.md`, `doctor.md`, `routing.md`, `init.md`, `document.md` | Do not open. |

If a guide still asks for something unavailable, say so in one line and continue without it.

## new, shape, redesign

- **new**: run the pipeline in `SKILL.md`. For the craft floor read `library/impeccable/reference/craft-floor.md`; for page mode read one of `mode-persuade.md`, `mode-operate.md`, `mode-read.md` (same folder). Of `new-work.md` use sections 1, 3, 4, 6 and 7 (what is already true, how much invention, commit to the world, build with full commitment, inspect and finish). Record the decision in `design-brief.md` instead of section 5's files.
- **shape**: `library/impeccable/reference/shape.md` plus `references/product-understanding.md`. Output is the scene score and page list, no code.
- **redesign**: baseline first (`references/visual-comparison-gates.md`), list what to keep, then `library/hallmark/references/verbs/redesign.md` and `library/taste/references/critique.md`. Never ship a visual regression.

## critique

1. Inspect rendered; run `finish-gate.mjs` for evidence.
2. Open `library/impeccable/reference/critique.md` and use only: **Assessment A: Design Review**, the **report structure** (Design Health Score, Overall Impression, What's Working, Priority Issues, Persona Red Flags, Minor Observations, Questions), **Recommended Actions**, and everything under **Reference Material** (cognitive load, Nielsen's 10 heuristics scoring guide, personas, AI-slop tells). Skip Setup, Assessment B (detector and live browser), Persist the Snapshot and Ask the User.
3. Score each heuristic 0 to 4 with one line of evidence from the rendered page. Add `library/taste/references/tells.md` for template tells.
4. Output the report in that structure; name fixes as Colabio commands.

## audit

`library/impeccable/reference/audit.md` for accessibility, performance and responsive checks, with `finish-gate.mjs` as the mechanical pass. Ignore desktop-app (Electron) and native sections unless the target is one. Output: findings by severity with file and line, then the commands that fix them.

## polish, harden

- **polish** (`polish.md`): inspect neighbours and tokens first; fix alignment, states, focus, rhythm and copy; finish with `finish-gate.mjs`. Pair with `library/modules/emil-design-eng`.
- **harden** (`harden.md`): errors, empty, loading, long content, offline, i18n, permissions; drive each state with real events.

## distill, bolder, quieter

Each is a small playbook in `library/impeccable/reference/`. Keep the brand and the one primary style recipe; change intensity, not identity. Re-render, compare before and after at 1440 and 390, and list what changed.

## typeset, layout, colorize

- **typeset**: `typeset.md`, `library/taste/references/type.md`, `library/hallmark/references/typography.md`. Verify fonts loaded and weights exist.
- **layout**: `layout.md`, `library/hallmark/references/layout-and-space.md`, `macrostructures.md` for structural alternatives.
- **colorize**: `colorize.md`, then `node scripts/palette-lab.mjs --domain "<product words>"` for domain-grounded candidates. Colour is derived from the understanding, never chosen from a style word.

## animate

`references/motion-recipes.md` first (one clock, owners, reduced motion, fail-open), then `library/impeccable/reference/animate.md`, `library/modules/animate` and `design-motion-principles`. Review with `library/modules/review-animations`.

## onboard, clarify, adapt, optimize

`onboard.md` (first run, empty states), `clarify.md` (UX copy; also `references/asset-and-copy.md`), `adapt.md` (breakpoints and devices; native and desktop-app sections only if relevant), `optimize.md` (load and runtime performance; measure before claiming a gain).

## delight, overdrive

Optional. `delight.md` for small moments of joy that fit the register; `overdrive.md` for technically ambitious effects, with `library/modules/scroll-craft` and `threejs-webgl`. Always keep the no-library and reduced-motion paths.

## Every command ends the same way

State what was inspected and at which widths, what changed, which gates ran and their result, what was not checked, and one suggested next command.
