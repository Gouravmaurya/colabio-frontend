---
name: colabio-frontend
metadata:
  version: "1.11.0"
description: >
  Art-direct, build, and refine websites, landing pages, dashboards and frontend
  components. Use for new interfaces, redesigns, visual polish, purposeful
  scroll or component animation, and complete website design/build prompts after
  user discussion. Grounds composition, type, imagery and motion
  in the product, with a bundled reference library, motion planning and rendered
  desktop/mobile verification. Preserve existing brand and behavior; keep small
  fixes local and exclude unrelated backend work. Clarify ordinary-language UI
  requests conversationally, show selected skills and a written design preview,
  then build after the user approves it. Landing pages default to
  premium cinematic craft; apply and learn scoped user design preferences.
---

# Colabio Frontend

Build a complete interface with product-specific identity. Preserve the brief,
brand, behavior, framework and conventions; use one concept and token system.
Judge quality against product needs and the existing experience using rendered
and behavioral evidence, never skill counts, self-ratings or fashion alone.

References, templates and licensed guides ship here; do not invoke another design
skill for the same job. Read by phase. Check scripts are read-only; scaffold/serve
affect the requested output. Use Node 18+ or perform applicable checks manually.

## Execution contract for Codex, Claude and orchestrators

Read project instructions and inspect the existing interface and stack first.
Resolve skill files from this folder and project files from the implementation workspace.

- **Focused work:** use the matching command and checks; keep scope local.
  A critique does not authorize source edits.
- **Substantial new interface or redesign:** read
  [ai-orchestration.md](references/ai-orchestration.md), then run the council and
  pipeline below through implementation and verification.
- **Delegated role:** read the role and task packet, inspect the governing plan,
  complete only the assigned scope, and return evidence to the coordinator.
  Do not restart intake or dispatch more workers unless assigned.

Use actual runtime capabilities. Role files are prompts, not registered tools.
The guide covers host adaptation, dependencies, ownership, handoffs and recovery;
use sequential roles when delegation is unavailable. No framework installation is required.

## Describe it, clarify it, build it

For substantial work, use [capability routing](references/capability-routing.md)
with Impeccable, Taste, MotionSites and GSAP as the required core.
GSAP + ScrollTrigger and Lenis are the default runtime for every non-static build;
use [motion recipes](references/motion-recipes.md) for integration and coverage.
Use [Pinterest research](references/pinterest-research.md) for visual inspiration;
[Anime.js](references/animejs.md) is optional for a selected component/SVG job.
Select other bundled specialists by task from `library/INDEX.md` for layout, fonts, color, components, media,
component animation and scroll storytelling. Produce one integrated prompt and
visual system. Open hero directions must satisfy the product-specific hero
contract in `references/distinctive-design.md`; a generic text/image split in
either direction is not the default. Preserve approved or explicitly requested work.

First read [design memory](references/design-memory.md) and the current user's
`~/.colabio/frontend-preferences.md` when present. Landing pages default to premium,
expressive, cinematic design with distinctive components, type and colour; explicit
user/brand constraints override this. Keep dashboards and small fixes task-appropriate.
Follow [intake](references/brief-intake.md): reuse answers, clarify material gaps,
recommend briefly, then write the complete, reusable design/build prompt in
`design-brief.md` using [prompt-enhancer.md](references/prompt-enhancer.md) before
implementation. Cover every agreed page, its sections, component anatomy and states,
visual tokens, motion choreography, assets, mobile behavior and acceptance checks.
Share the brief's location; prompt-only requests end with the prompt. Detailed
briefs skip repeated questions; "you decide"
skips optional ones. Save actual scoped feedback to the shared profile; general
praise approves an example, not every detail. Before implementation, show the
selected skills and written website preview, ask for approval or revisions, and
wait as specified in intake. Keep internal dispatch backstage.

## Motion is part of the composition

For experience-led landing pages and requests for cinematic or animated work, plan
visible motion across the journey before building. Give each major section an intent:
a scroll-linked sequence, a component reveal, interaction feedback, or a deliberate
still moment with a reason. Smooth scrolling, library imports and small image zooms
alone do not satisfy a motion-rich brief. “No blanket fade-ups” means avoid repeating
one generic effect; it does not mean omit component reveals or scroll choreography.
Read [cinematic-motion.md](references/cinematic-motion.md) for motion ambition,
scene states, component choreography and playback review, then the runtime patterns
in [motion-recipes.md](references/motion-recipes.md).
Preserve explicit static requests and the needs of operational or reading surfaces.

## The studio bar (for cinematic, awwwards and explicit showpiece briefs)

Landing pages use the cinematic bar by default unless explicitly overridden.
Premium alone does not force it on dashboards; use accepted motion and UI type. Selectors provide candidates, not commands.
A correct page is not a good page. Generated pages share one look: an eyebrow over every heading, mono
micro-labels, 01/02/03 numbers, hairline rules, a dark ground with one accent, flat vector scenery, fades on
every block. Those are banned (`library/taste/references/tells.md`). The bar, in
[agency-bar.md](references/agency-bar.md): a subject-grounded idea (competitor swap test), one live thing
built from real content, a two-line headline, **at least four real pictures** (SVG does not count), full
screens, and a **Lenis + GSAP motion stack** with honest fallbacks. For these briefs run
`finish-gate.mjs <page> --showpiece`: its studio-bar FAILs block delivery. Review the representative slice, then the full journey; fix and recheck actual findings. Skipping the library and designing from instinct is how generic output happens: open
`library/taste/references/` (tells, type, layout, scenes, imagery, motion) and the GSAP and scroll-craft modules.

Apply the studio bar within the requested scope. Approved regions stay locked;
existing brand, assets and behavior take precedence over generic image counts or
stack preferences. A focused body/motion pass does not require a fourth picture,
a new hero or replacement dependencies. Investigate and document scanner conflicts;
never add filler or change approved work to satisfy a heuristic.

## The agent council (discuss, plan and cross-review)

For substantial `new`, `redesign` and cinematic work, run the
[council](references/agent-council.md): compare alternatives, exchange concerns and
owner replies, reconcile one scene/state plan, then audit and build it. Cross-review
another author's representative slice and full journey; a strong hero cannot
approve weak body sections. Preserve approved regions and disclose self-review.

## Where things are

Read by phase. File list: [file-map.md](references/file-map.md).

- **Decide and build:** [core guidance](references/core-guidance.md), mapped below.
- **Verify:** [verification](references/verify.md) and [comparison gates](references/visual-comparison-gates.md).
- **Commands and library:** [commands](references/commands.md), [library index](library/INDEX.md) and [library rules](library/README.md).

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

Ask for a command by name (`/colabio-frontend critique src/pages/Home`) or
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
| `critique` | Evidence-based UX and visual review | `library/impeccable/reference/critique.md` |
| `audit` | Accessibility, performance, responsive checks | `library/impeccable/reference/audit.md`, `scripts/finish-gate.mjs` |
| `polish` | Final shipping pass | `library/impeccable/reference/polish.md` |
| `harden` | Errors, empty states, edge cases, i18n | `library/impeccable/reference/harden.md` |
| `distill` / `bolder` / `quieter` | Remove, amplify, tone down | `library/impeccable/reference/` |
| `typeset` / `layout` / `colorize` | Type, spacing and structure, colour | `library/impeccable/reference/`, `scripts/palette-lab.mjs` |
| `animate` | Purposeful motion | `references/cinematic-motion.md`, `references/motion-recipes.md`, `library/impeccable/reference/animate.md` |
| `onboard` / `clarify` / `adapt` / `optimize` | First run, UX copy, devices, speed | `library/impeccable/reference/` |

For precise prompts, media-led composition and specific motion techniques, start at
`library/modules/motionsites-web-builder/GUIDE.md`; it adapts MotionSites' licensed
spec, craft, media, technique and QA references to this workflow.

Rules for the library: Colabio's order and gates win (understand, plan, derive the theme,
anti-clone, rendered gates, finish gate); upstream guides are reference for a phase, never a
second workflow; skip upstream launcher, hook, init and install steps; open about three
library files per phase; keep one primary style recipe. Details in `library/README.md`.

## The pipeline: idea in, finished site out

For a new site or major redesign the user gives an idea, a design wish or a link.
Follow conversational intake, then complete these stages in order.

1. **Understand, then plan.** Follow [product-understanding.md](references/product-understanding.md)
   and [prompt-enhancer.md](references/prompt-enhancer.md). Write the Understanding
   Sheet first (what it is, who uses it, where and on what device and light, the
   decision they face, the proof that convinces them, domain vocabulary and
   materials, category defaults to avoid, emotional register, first-screen
   obligation). Clarify material gaps using `brief-intake.md`. Also list
   verified subject-specific ingredients (its name, objects, printed things,
   rituals, constraints and numbers); distinguish real facts from assumptions and write the **idea sentence**
   ("On this page, [a thing of the subject] becomes [the device]") plus **one live thing**
   (see agency-bar.md section 2). Then plan the scene score and pages from it.
   **No colour, type or theme decision before these exist.**
2. **Select, then decide the theme.** Run `node scripts/select-build.mjs --brief
   "<idea>"` (or `--file design-brief.md --project <app>`) for type, starter, stack,
   motion level, pages and reading order; its style, font and palette picks are
   candidates. Decide the theme from the understanding with `node
   scripts/palette-lab.mjs --domain "<idea words>"`: choose one candidate, name the
   real material behind each colour, justify light, dark or light-with-a-dark-scene
   from the use context ("cinematic" is framing, not darkness), and reject category
   defaults it flags. Write all of this into the **Cinematic Design Prompt**
   (`design-brief.md`); show the brief recommendation from intake.
3. **Design.** Write the spec (tokens with contrast, type scale, scene score with a
   section form, motion verb and hand-off per scene, mobile recomposition). Gather real
   assets and copy first. Satisfy the anti-clone rule in `craft-bar.md` and
   [distinctive-design.md](references/distinctive-design.md): name the one distinctive move,
   give each section a different form, and plan component sources (bundled originals first,
   then registries via `component-source.mjs`, always transformed).
4. **Build after preview approval.** Representative slice first (opening hand-off, real body/proof and
   useful component), rendered at 1440 and 390. Preserve an approved hero and start
   at the affected body scene when appropriate; then every page in the CDP's page list with its states. **Pictures first for showpiece briefs:**
   source at least four real pictures or build a rendered scene (canvas or WebGL with
   depth, light and grain), never flat vector decoration. **Motion:** for default cinematic landings and explicit showpiece
   or awwwards briefs use Lenis + GSAP (ScrollTrigger, SplitText) on one clock
   (`agency-bar.md` section 3). "No-library path" means the page is complete and readable
   if the CDN fails or motion is reduced; it never means skip the libraries.
5. **Polish and verify.** Run the look-and-fix loop (`agency-bar.md` section 5: capture 1440/768/390
   and scene frames, inspect playback, fix consequential findings, recheck). Run `finish-gate.mjs` (add
   `--showpiece` for cinematic landing pages/showpiece briefs; it also runs the Impeccable detector when
   installed, see `impeccable-bridge.md`), `slop-lint.mjs`, `variety-check.mjs`,
   `palette-lab.mjs --check` and `check-contrast.mjs`; serve and drive real events at 1440/1024/768/390; review the representative slice and full journey against the acceptance criteria.
6. **Deliver.** The site, `design-brief.md`, what was checked and what was not, and remaining limitations. Never claim an award, a score or measured performance
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
separate phone choreography and reduced/static states. Cinematic does not require dark surfaces or WebGL.

Inspect a representative opening + real proof + transition slice before extending
the build. Reject a weak slice. Do not substitute an abstract diagram, generic
orbiting logo or decorative mockup for real work or a product's actual workflow.

The final comparison must explicitly judge identity, composition, typography,
assets, motion, clarity, usability and completeness. A regressed/unverified row
prevents claiming a verified upgrade. At least one target must visibly improve.
Review the representative slice and completed journey for substantial work;
reaching a round limit never turns a failure into a pass. When using the existing
visual-record verifier, its final stage requires two evidenced critique/recheck rounds;
record real reviews and do not invent defects to populate them. Deliver an honest candidate if tools or scope
prevent verification, with the remaining finding stated. Gate decisions do not
require extra user approval or a new skill installation.

Keep the compact record/captures in the implementation project's output. Use
`scripts/verify-visual-gates.mjs --project <output> --record visual-review.json --stage baseline|slice|final`
at each applicable gate when Node is available, to check evidence completeness,
not to score aesthetics. Without Node, check the same fields manually and state
that limitation. Browser inspection and
observed interaction remain mandatory for visual/behavioral claims.

## Optional starters

Use `templates/README.md` and `scripts/scaffold.mjs` only when a starter's
mechanisms fit the brief. Preserve the project's framework; derive composition,
imagery, data and pacing from the user and product. A copied starter is not proof
of quality. Apply rendered gates to the result.

For real companies, follow "Real brands and companies" in
`references/brief-intake.md`: clarify ownership/context and keep unofficial
concepts visibly labelled with no invented claims or endorsement.
