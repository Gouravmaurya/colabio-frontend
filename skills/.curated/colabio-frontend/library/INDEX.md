# library/INDEX.md: which guide for which job

Paths are relative to `library/`. Open the smallest file that answers the question.

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
