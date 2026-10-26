# Sources: what was combined, what each adds, what was left out

Research date 2026-10-26. Roundups of 2026 Claude Code frontend skills agree on two
things: a base design skill (Anthropic's `frontend-design`) and an anti-slop layer
(Impeccable), with Taste Skill (tunable style rules) and UI/UX Pro Max (a design
database) as the other widely used choices. None were benchmarked head to head, so
this table records what each contributes, not a ranking. Star and install counts are
omitted because they change daily.

| Source | License | Unique value | Where it lives here | Overlap resolved by |
| --- | --- | --- | --- | --- |
| Colabio (this skill) | repo | Understanding-first decision order, domain-grounded palette lab, build selector, Cinematic Design Prompt, rendered baseline/slice/final gates, finish gate, anti-clone rule, working starters | `references/`, `scripts/`, `templates/` | It owns the order and the gates |
| Impeccable (pbakaus) | Apache-2.0 | 24 command playbooks (critique, audit, polish, harden, distill, bolder, quieter, typeset, layout, colorize, animate, onboard, adapt, optimize), persuade/operate/read modes, craft floor, 62-rule deterministic detector | `library/impeccable/reference/` (playbooks); detector binary stays optional (`references/impeccable-bridge.md`) | Playbooks become commands; its launcher, hooks and context-file setup are skipped |
| Hallmark (Nutlope / Together AI) | MIT | 21 page macrostructures, about 60 component recipes, themes, genres, copy and slop tests | `library/hallmark/` | Used for structure and components, not as a style preset |
| Taste Skill (Leonxlnx) | MIT | Anti-slop tells, type, layout, colour, scenes, imagery and copy references, redesign critique | `library/taste/references/` | Tells feed the critique; dials are not adopted |
| UI/UX Pro Max (nextlevelbuilder) | MIT | Decision data: styles, palettes, font pairings, UX rules, chart types, landing patterns, motion rules | `library/design-data/` (CSV subset) | Lookup only; Colabio's palette lab decides |
| Emil Kowalski guides | MIT | Interaction craft: polish details, animation decisions, Apple-style physical motion, animation review | `library/modules/emil-design-eng`, `apple-design`, `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary` | Feeds `polish` and `animate` |
| design-motion-principles (Zantos) | MIT | Motion audit and build guidance from three practitioners | `library/modules/design-motion-principles` | Motion review |
| GSAP official skills (GreenSock) | MIT | Core, timeline, ScrollTrigger, plugins, React, frameworks, utils, performance | `library/modules/gsap-*` | Depth behind `references/motion-recipes.md` |
| Motion.dev / Framer Motion guides | Apache-2.0 / MIT | React component motion | `library/modules/motion-dev-animations`, `framer-motion` | Component motion only |
| Scroll Craft, Three.js rules | MIT | Scroll-driven worlds; WebGL performance and loading rules | `library/modules/scroll-craft`, `threejs-webgl` | Used when the brief needs them |
| Style modules (minimalist, industrial-brutalist, Apple, high-end, GPT-taste, Stitch) | MIT | Distinct style recipes and DESIGN.md writing | `library/modules/` | One primary style recipe; the rest are borrowed details |
| Image modules (image-to-code, imagegen web, brandkit, prototype) | MIT | Concept images, brand boards, multi-variant prototypes | `library/modules/` | Asset phase only |
| Anthropic `frontend-design` | see upstream | Baseline: pick a bold direction, avoid generic AI aesthetics | Principles already in `references/craft-bar.md` and the pipeline; not copied | Covered |
| Vercel Web Interface Guidelines | unlicensed text | Accessibility and UI review checklist | Not redistributed; open it live when reviewing (`web-design-guidelines` skill if installed) | `scripts/finish-gate.mjs` covers the mechanical subset |

## What was deliberately left out

- Launcher binaries, live browser iteration bundles, font and icon catalogues, demo sites
  and test fixtures (size and no value to the agent).
- Setup and install flows of other skills (a second install path would defeat "one skill").
- Dials and presets that force one house style.

## Why one skill

Several skills active at once each add their own workflow, defaults and "do this first"
rules; the agent averages them, which is how generic results happen. One skill with one
order of decisions, one router and reference-only libraries keeps a single point of view
and still has the depth. If you also have these skills installed separately, consider
disabling them to avoid double-triggering.
