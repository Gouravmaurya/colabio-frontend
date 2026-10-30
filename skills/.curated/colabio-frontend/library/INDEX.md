# library/INDEX.md: which guide for which job

Paths are relative to `library/`. Open the smallest file that answers the question.

## Complete inventory: required core and agent-selected guides

Colabio bundles **35 frontend guidance sources**: the four library collections
below and 31 modules. They are references inside one skill, not 35 workflows to
run together. Colabio's own intake, complete prompt, responsive/accessibility and
verification contract governs every task. Read by phase and keep focused fixes local.

| Use | Source | Job |
| --- | --- | --- |
| Required core | Impeccable (`impeccable/`) | Craft/usability floor; matching audit and polish |
| Required core | Taste Skill (`taste/`) | Reject template tells; typography, color and composition when open |
| Agent chooses | Hallmark (`hallmark/`) | Page structures, section/component anatomy |
| Agent chooses | UI/UX Pro Max (`design-data/`) | Design/UX data lookup and grounded candidates |
| Agent chooses | `animate` | Component animation decisions |
| Agent chooses | `animation-vocabulary` | Describe and coordinate movement |
| Agent chooses | `apple-design` | Apple-like interaction/material direction when appropriate |
| Agent chooses | `brandkit` | Brand/asset concepts |
| Agent chooses | `design-motion-principles` | Motion intent and review |
| Agent chooses | `emil-design-eng` | Interaction craft and fine polish |
| Agent chooses | `find-animation-opportunities` | Identify useful movement in an existing UI |
| Agent chooses | `framer-motion` | React animation and gesture patterns |
| Agent chooses | `gpt-taste` | An optional visual style lens |
| Required core | `gsap-core` | GSAP fundamentals and ownership; runtime for approved animated builds |
| Agent chooses | `gsap-frameworks` | Framework-specific GSAP integration |
| Agent chooses | `gsap-performance` | Animation performance |
| Agent chooses | `gsap-plugins` | A needed GSAP plugin |
| Agent chooses | `gsap-react` | React ownership and cleanup |
| Agent chooses | `gsap-scrolltrigger` | Scroll progression, pinning and refresh |
| Agent chooses | `gsap-timeline` | Coordinated sequences |
| Agent chooses | `gsap-utils` | A needed GSAP utility |
| Agent chooses | `high-end-visual-design` | A suitable premium visual direction |
| Agent chooses | `image-to-code` | Implement supplied visual references |
| Agent chooses | `imagegen-frontend-web` | Generate website asset concepts |
| Agent chooses | `improve-animations` | Refine existing animation |
| Agent chooses | `industrial-brutalist-ui` | An explicitly suitable raw/industrial direction |
| Agent chooses | `minimalist-ui` | A suitable restrained direction |
| Agent chooses | `mobile-native` | Touch and native-feeling phone behavior |
| Agent chooses | `motion-dev-animations` | Motion runtime recipes |
| Required core | `motionsites-web-builder` | Precise prompts, cinematic media, technique recipes and optional QA |
| Agent chooses | `prototype` | Asset/interface concept exploration |
| Agent chooses | `review-animations` | Playback and interaction review |
| Agent chooses | `scroll-craft` | Scroll-led narrative/world techniques |
| Agent chooses | `stitch-design-taste` | A requested design-system specification |
| Agent chooses | `threejs-webgl` | A justified 3D/WebGL feature and its performance/fallbacks |

All module paths are `modules/<name>/GUIDE.md`. Bundled original components in
`components/` and Colabio's `references/`, `scripts/`, `agents/` and `templates/`
support these sources; they are not extra upstream skills. Mandatory use means
apply all four sources within scope, without forcing one style or overriding
explicit static requests. Use GSAP for approved animated builds and select its
extensions as needed. Show the source names/reasons and written design preview
before building; wait for approval or revisions. Record specialist choices and why
they fit in the governing prompt. Skip unused specialists.

Additional Colabio-authored guides: `references/pinterest-research.md` covers
Pinterest inspiration and original-source verification; `references/animejs.md`
covers optional Anime.js component/SVG choreography. These are not extra vendored
upstream skills and do not change the 35-source inventory. Anime.js is selected
when requested or already used for a relevant effect; it does not replace GSAP
and Lenis or become an automatic runtime installation.

## By command (what the user asks for)

| Command / request | Open | Also use |
| --- | --- | --- |
| **new** (idea to site) | Colabio pipeline first (`references/product-understanding.md`, `prompt-enhancer.md`) | `impeccable/reference/new-work.md` (modes: persuade, operate, read) with `mode-persuade.md` / `mode-operate.md` / `mode-read.md`; `impeccable/reference/craft-floor.md` (quality floor before any UI edit) |
| **shape** (plan UX before code) | `impeccable/reference/shape.md` | `references/brief-intake.md`, `references/site-types.md` |
| **redesign** (existing site) | `references/visual-comparison-gates.md` | `hallmark/references/verbs/redesign.md`, `taste/references/critique.md`, `impeccable/reference/region-map.md` |
| **critique** (UX review, scored) | `impeccable/reference/critique.md` | `taste/references/tells.md`, `hallmark/references/slop-test.md`, `impeccable/reference/component-review.md` |
| **audit** (a11y, performance, responsive) | `impeccable/reference/audit.md` | `scripts/finish-gate.mjs`, `modules/gsap-performance`, `modules/threejs-webgl/rules/core-web-vitals.md` |
| **polish** (final pass) | `impeccable/reference/polish.md` | `modules/emil-design-eng`, `hallmark/references/microinteractions.md` |
| **harden** (errors, empty states, i18n, edge cases) | `impeccable/reference/harden.md` | `hallmark/references/interaction-and-states.md` |
| **distill** (remove, simplify) | `impeccable/reference/distill.md` | `modules/minimalist-ui` |
| **bolder** / **quieter** | `impeccable/reference/bolder.md` / `quieter.md` | `references/craft-bar.md`, `modules/gpt-taste` |
| **typeset** | `impeccable/reference/typeset.md` | `taste/references/type.md`, `hallmark/references/typography.md`, `design-data/data/typography.csv` |
| **layout** | `impeccable/reference/layout.md` | `taste/references/layout.md`, `hallmark/references/layout-and-space.md`, `hallmark/references/macrostructures/` |
| **colorize** | `impeccable/reference/colorize.md` | `scripts/palette-lab.mjs`, `taste/references/colour.md`, `hallmark/references/color.md`, `design-data/data/colors.csv` |
| **animate** | `impeccable/reference/animate.md` | `references/motion-recipes.md`, `modules/animate`, `modules/design-motion-principles`, `modules/animation-vocabulary` |
| **onboard** (first run, empty states) | `impeccable/reference/onboard.md` | `impeccable/reference/clarify.md` |
| **clarify** (UX copy) | `impeccable/reference/clarify.md` | `references/asset-and-copy.md`, `taste/references/copy.md`, `hallmark/references/copy.md` |
| **adapt** (responsive, devices) | `impeccable/reference/adapt.md` | `hallmark/references/responsive.md`, `modules/mobile-native` |
| **optimize** | `impeccable/reference/optimize.md` | `modules/gsap-performance`, `modules/threejs-webgl/rules/` |
| **delight** / **overdrive** | `impeccable/reference/delight.md`, `overdrive.md` | `modules/scroll-craft`, `modules/threejs-webgl` |
| **extract** (tokens, components) | `impeccable/reference/extract.md` | `hallmark/references/design-md.md`, `modules/stitch-design-taste` |

## By need

| Need | Open |
| --- | --- |
| Precise website prompts, media-led composition, builder handoffs and MotionSites techniques | `modules/motionsites-web-builder/GUIDE.md`, then its spec checklist or technique index |
| Page structure alternatives (21 macrostructures) | `hallmark/references/macrostructures.md`, `macrostructures/` |
| Component recipes (heroes, navs, footers, sections, proof) | `hallmark/references/component-cookbook.md`, `components/` |
| Themes and genres | `hallmark/references/themes/`, `hallmark/references/genres/` |
| Style systems | `modules/minimalist-ui`, `modules/industrial-brutalist-ui`, `modules/apple-design`, `modules/high-end-visual-design`, `modules/gpt-taste` |
| Anti-slop checks | `taste/references/tells.md`, `hallmark/references/anti-patterns.md`, `hallmark/references/slop-test.md` |
| Reasoned style, palette, font and UX rule lookup | `design-data/GUIDE.md`, `design-data/data/*.csv`, `design-data/references/quick-reference.md` |
| Scenes, imagery, heroes | `taste/references/scenes.md`, `taste/references/imagery.md`, `hallmark/references/imagery-kit.md`, `hallmark/references/hero-enrichment.md` |
| Design-system document | `modules/stitch-design-taste`, `hallmark/references/design-md.md` |
| GSAP (core, timeline, ScrollTrigger, plugins, React, frameworks, utils, performance) | `modules/gsap-*` |
| Motion / Framer Motion | `modules/motion-dev-animations`, `modules/framer-motion` |
| Motion craft review | `modules/review-animations`, `modules/improve-animations`, `modules/find-animation-opportunities` |
| Scroll-driven worlds | `modules/scroll-craft` |
| Three.js and WebGL | `modules/threejs-webgl` |
| Image concepts, mockups, image-to-code | `modules/image-to-code`, `modules/imagegen-frontend-web`, `modules/brandkit`, `modules/prototype` |
| Native feel on phones | `modules/mobile-native` |

## Commands in `SKILL.md`

`SKILL.md` lists the user-facing commands and routes each to the guide above. If a request
fits none, use the pipeline in `SKILL.md`.
