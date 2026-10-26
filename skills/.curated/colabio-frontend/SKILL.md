---
name: colabio-frontend
metadata:
  version: "1.6.0"
description: >
  Art-direct, build, and refine distinctive frontend interfaces grounded in the
  product, audience, and existing brand. Use for websites, landing pages,
  dashboards, components, redesigns, and visual polish. Combines original
  composition, typography, usable interactions, purposeful motion, and rendered
  review. Ships a complete toolkit (style recipes, curated font pairs and
  palettes, a seeded direction picker, a template-tell scanner, asset, copy and
  motion guides, component-library mining) so no other skill is required.
  Includes cinematic composition recipes and rendered baseline/slice/final gates
  that reject visual regressions rather than treating working code as design proof.
  Runs an idea-to-site pipeline: enhances a thin idea into a Cinematic Design
  Prompt, selects the build plan (type, style, starter, stack, motion, pages),
  builds with scroll and motion systems, then verifies with polish and
  rendered gates before delivery. One skill, many commands: new, shape, redesign,
  critique, audit, polish, harden, distill, bolder, quieter, typeset, layout,
  colorize, animate, onboard, adapt, optimize. A bundled, licensed library
  (Impeccable playbooks, Hallmark components and page structures, Taste anti-slop
  references, UI/UX Pro Max decision data, GSAP, Motion, Scroll Craft, Three.js)
  is routed by one index, so no other frontend skill is needed.
  Keep small fixes local; exclude unrelated backend work.
---

# Colabio Frontend

Build a complete, working interface with an identity that belongs to its product.
Preserve the user's brief, existing brand, behavior, framework, and conventions.
One concept and token system govern the result. Quality is demonstrated by the
rendered interface and observed behavior, never by a skill count or self-rating.
Judge an upgrade against the product's actual needs and the existing experience,
not against a preference for a quieter or more fashionable visual style.

This is one skill and it is fully standalone: everything it needs ships in this folder
(`references/`, `scripts/`, `templates/` and a licensed `library/` of reviewed upstream
guides). It never requires installing another skill; if Impeccable, Taste or Hallmark are
also installed, do not invoke them separately for the same job. Read a reference only at
the phase that needs it. The picker, scanner and gate
verifier are read-only; scaffold/serve write or serve only the requested output.
Scripts use Node 18+; without Node, perform the applicable checks manually.

## Where things are

Open a file only when its phase needs it. Full list: [file-map.md](references/file-map.md).

- **Decide:** `references/product-understanding.md`, `prompt-enhancer.md`, `brief-intake.md`, `site-types.md`, `craft-bar.md`, `styles.md`, `design-kit.json`, `scripts/select-build.mjs`, `scripts/palette-lab.mjs`
- **Build:** `references/core-guidance.md` (sections below), `craft-defaults.md`, `asset-and-copy.md`, `motion-recipes.md`, `libraries.md`, `cinematic-recipes.md`, `templates/README.md`, `scripts/scaffold.mjs`
- **Verify:** `references/verify.md`, `visual-comparison-gates.md`, `award-bar.md`, `scripts/finish-gate.mjs`, `slop-lint.mjs`, `check-contrast.mjs`, `serve.mjs`, `verify-visual-gates.mjs`
- **Commands and library:** `references/commands.md`, `library/INDEX.md`, `library/README.md`, `library/NOTICE.md`, `references/sources.md`, `references/impeccable-bridge.md`

## Core guidance map (open `references/core-guidance.md` at the part you need)

| Part | Open it when |
| --- | --- |
| 1. Establish the product and the scope | starting any substantial task, or a redesign (baseline, brand, what to keep) |
| Premium one-pass build | building a new premium site end to end (nine working steps) |
| 2. Choose the experience before its decoration | picking page architecture, the signature component, scenes |
| 3. Establish a deliberate visual system | choosing type, colour, spacing, imagery (colour comes after understanding) |
| 4. Write the interface as part of the design | microcopy, labels, errors, empty states |
| 5. Build usable behavior and purposeful motion | interactions, states, responsive, motion ownership, Lenis/GSAP/Motion rules |
| 6. Use the bundled toolkit | adding dependencies, using the library |
| 7. Verify the rendered result and finish | final review, evidence, delivery notes |

## Commands

The user can ask for a command by name (`/colabio-frontend critique src/pages/Home`) or
in plain words. **new** and **redesign** run the pipeline below. Every other command is a
focused pass on an existing surface: inspect it rendered first, then open
[`references/commands.md`](references/commands.md) (how each command runs here, and what to
skip in upstream guides that assume Impeccable's launcher), then the guide it names (more in
[`library/INDEX.md`](library/INDEX.md)), and finish with the matching gates.

| Command | Purpose | Guide (see INDEX for more) |
| --- | --- | --- |
| `new` | Idea to finished site | the pipeline; `library/impeccable/reference/new-work.md` |
| `shape` | Plan UX and scenes before code | `library/impeccable/reference/shape.md` |
| `redesign` | Improve an existing site without regressions | `references/visual-comparison-gates.md` |
| `critique` | Scored UX and visual review | `library/impeccable/reference/critique.md` |
| `audit` | Accessibility, performance, responsive checks | `library/impeccable/reference/audit.md`, `scripts/finish-gate.mjs` |
| `polish` | Final shipping pass | `library/impeccable/reference/polish.md` |
| `harden` | Errors, empty states, edge cases, i18n | `library/impeccable/reference/harden.md` |
| `distill` / `bolder` / `quieter` | Remove, amplify, tone down | `library/impeccable/reference/` |
| `typeset` / `layout` / `colorize` | Type, spacing and structure, colour | `library/impeccable/reference/`, `scripts/palette-lab.mjs` |
| `animate` | Purposeful motion | `references/motion-recipes.md`, `library/impeccable/reference/animate.md` |
| `onboard` / `clarify` / `adapt` / `optimize` | First run, UX copy, devices, speed | `library/impeccable/reference/` |

Rules for the library: Colabio's order and gates win (understand, plan, derive the theme,
anti-clone, rendered gates, finish gate); upstream guides are reference for a phase, never a
second workflow; skip upstream launcher, hook, init and install steps; open about three
library files per phase; keep one primary style recipe. Details in `library/README.md`.

## The pipeline: idea in, finished site out

For a new site or major redesign the user gives an idea, a design wish or a link.
Run these stages in order, in one pass unless the user asked for questions.

1. **Understand, then plan.** Follow [product-understanding.md](references/product-understanding.md)
   and [prompt-enhancer.md](references/prompt-enhancer.md). Write the Understanding
   Sheet first (what it is, who uses it, where and on what device and light, the
   decision they face, the proof that convinces them, domain vocabulary and
   materials, category defaults to avoid, emotional register, first-screen
   obligation). Ask one round only if three or more material gaps remain. Then plan
   the scene score and pages from it. **No colour, type or theme decision before
   these exist.**
2. **Select, then decide the theme.** Run `node scripts/select-build.mjs --brief
   "<idea>"` (or `--file design-brief.md --project <app>`) for type, starter, stack,
   motion level, pages and reading order; its style, font and palette picks are
   candidates. Decide the theme from the understanding with `node
   scripts/palette-lab.mjs --domain "<idea words>"`: choose one candidate, name the
   real material behind each colour, justify light, dark or light-with-a-dark-scene
   from the use context ("cinematic" is framing, not darkness), and reject category
   defaults it flags. Write all of this into the **Cinematic Design Prompt**
   (`design-brief.md`) and show a 10-line summary.
3. **Design.** Write the spec (tokens with contrast, type scale, scene score with a
   motion verb and hand-off per scene, mobile recomposition). Gather real assets
   and copy first. Satisfy the anti-clone rule in `craft-bar.md`.
4. **Build.** Vertical slice first (hero, signature, hand-off), rendered at 1440
   and 390; then every page in the CDP's page list with its states; then motion on
   one clock with owners and reduced-motion and no-library paths.
5. **Polish and verify.** Run `finish-gate.mjs` (it also runs the Impeccable detector when
   installed, see `impeccable-bridge.md`), `slop-lint.mjs`, `palette-lab.mjs --check` and
   `check-contrast.mjs`; serve and drive real events at 1440/1024/768/390; at least
   two critique rounds against `award-bar.md` and the acceptance criteria.
6. **Deliver.** The site, `design-brief.md`, what was checked and what was not, and
   a "next time say" prompt. Never claim an award, a score or measured performance
   without evidence.

## Acceptance contract for substantial creative work

Read [visual comparison gates](references/visual-comparison-gates.md) **before
choosing a direction**. Inspect the actual live reference/incumbent when supplied;
never assume an older local source is the same site. Establish its strengths in
identity, composition, typography, assets and motion as well as usability. Preserve
that ambition unless the user explicitly changes it. A cleaner layout does not
by itself justify a visually weaker replacement.

For cinematic/expressive briefs, or an incumbent with that character, read
[cinematic recipes](references/cinematic-recipes.md). Choose a content-led recipe
and write a scene score: establish, enter, hold, transform, resolve. Plan dominant
type, real imagery, foreground/background relationships, continuity, control and
narrow/reduced-motion states. Cinematic does not require dark surfaces or WebGL.

Inspect a representative opening + real proof + transition slice before extending
the build. Reject a weak slice. Do not substitute an abstract diagram, generic
orbiting logo or decorative mockup for real work or a product's actual workflow.

The final comparison must explicitly judge identity, composition, typography,
assets, motion, clarity, usability and completeness. A regressed/unverified row
prevents claiming a verified upgrade. At least one target must visibly improve.
Two review rounds are the minimum for substantial work; reaching a round limit
never turns a failure into a pass. Deliver an honest candidate if tools or scope
prevent verification, with the remaining finding stated. Gate decisions do not
require extra user approval or a new skill installation.

Keep the compact record/captures in the implementation project's output. Use
`scripts/verify-visual-gates.mjs --project <output> --record visual-review.json --stage baseline|slice|final`
at each applicable gate when Node is available, to check evidence completeness,
not to score aesthetics. Without Node, check the same fields manually and state
that limitation. Browser inspection and
observed interaction remain mandatory for visual/behavioral claims.

## Brief intake and optional working starters

For new or vague requests, read `references/brief-intake.md` and the relevant
journey in `references/site-types.md`. Reuse facts from the repo, the supplied
live reference and settled answers. Ask only about gaps that materially change
the result; respect delegated decisions or "no questions" and state assumptions.
Never make a thin prompt a reason to lower the craft bar or invent proof.
If the idea names a real company or product, ask whether it is the user's own page, a tool for that audience, or an **unofficial concept**; follow "Real brands and companies" in `references/brief-intake.md` (visible unofficial label, no logo or trade dress, no invented claims).

The three examples in `templates/README.md` provide reusable working mechanisms:
a configurable product scene, a scroll-directed interactive stage, and a service
estimator. Use `scripts/scaffold.mjs` when one fits a new standalone build.
Templates are optional infrastructure: preserve the real project's framework and
derive composition, imagery, data and pacing from its content. Do not funnel
every app into a game stage, force a configurator onto every offer, or claim
quality because a starter was copied. Apply the rendered gates to every result.
