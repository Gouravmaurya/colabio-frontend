# File map

Every bundled file and what it is for.

| File | Use it for |
| --- | --- |
| `references/agency-playbook.md` | The one-pass premium build pipeline and critique rubric |
| `references/styles.md` | Eight style recipes: type, color, layout, motion, pitfalls |
| `references/design-kit.json` | Font pairs, contrast-checked palettes, signature mechanisms, hero compositions |
| `references/craft-defaults.md` | Type scale, spacing, color, motion and detail numbers |
| `references/asset-and-copy.md` | Asset phase and copy gate |
| `references/cinematic-motion.md` | Motion ambition, concrete scene states, component choreography, phone/reduced variants and playback review |
| `references/motion-recipes.md` | Lenis + GSAP + ScrollTrigger + Motion integration code |
| `references/libraries.md` | Component-library sites and the mining protocol |
| `references/cinematic-recipes.md` | Editorial portrait, product close-up, software walkthrough, screening room, title sequence and process-study direction |
| `references/visual-comparison-gates.md` | Baseline before direction, representative slice, no-regression final acceptance |
| `references/studies/editorial-portfolio.md` | Observed live reference: typography, portraits, actual work and scene continuity; principles to transfer, limits to avoid |
| `references/visual-review.example.json` | Intentionally unverified record showing the visual-gate fields |
| `scripts/pick-direction.mjs` | Brief-aware proposal (`--brief`, `--type`, `--style`, `--theme`); reports fallback; `--validate` checks kit contrast |
| `scripts/slop-lint.mjs` | Scans source for template tells |
| `scripts/verify-visual-gates.mjs` | Read-only evidence checks; fails recorded regression, missing comparison, bad viewport matching and unresolved findings |
| `references/design-memory.md` | Premium cinematic landing defaults and scoped feedback learning through the user profile |
| `evals/design-memory-evals.md` | Default styles, explicit overrides, accurate feedback memory and cross-host persistence cases |
| `references/brief-intake.md` | Conversational intake authority: clarify UI type, feel and motion; recommend, then build |
| `references/site-types.md` | Website-type journeys, proof and interaction options |
| `references/verify.md` | Serving, real-event browser verification and preview quirks |
| `references/craft-bar.md` | The level to build at (ten properties, mechanism menu, anti-clone rule); never a design to copy |
| `references/award-bar.md` | Context-specific craft checks; examples do not mandate 3D |
| `templates/README.md` | Optional working starters; reuse mechanisms only when they fit the brief |
| `scripts/scaffold.mjs` | Copy a selected starter into a new output folder |
| `scripts/serve.mjs` | Local static preview server |
| `scripts/check-contrast.mjs` | Check foreground/background token contrast |
| `evals/intake-evals.md` | Conversational intake behavior cases |
| `references/prompt-enhancer.md` | Turn any idea into a Cinematic Design Prompt (12-part schema, examples) |
| `scripts/select-build.mjs` | Build selector: type, style, starter, stack, motion level, pages, libraries, reading order |
| `scripts/finish-gate.mjs` | Static polish gate: meta, landmarks, alt text, focus, reduced motion, social card, favicon, placeholders |
| `evals/pipeline-evals.md` | End-to-end cases for the idea-to-finished-site pipeline |
| `references/impeccable-bridge.md` | Optional second opinion: Impeccable detector in the finish gate; its critique, audit and polish playbooks for existing surfaces |
| `references/product-understanding.md` | Understanding Sheet, plan-then-theme order, context-to-implication table |
| `references/domain-swatches.json` | Real colours of 19 domains' materials, tools and places, for palette evidence |
| `scripts/palette-lab.mjs` | Four domain-grounded palette candidates with contrast and category-default flags; `--check <page.html>` audits a built page |
| `library/INDEX.md` | Router: which bundled guide answers which command or need |
| `library/README.md` | Precedence and rules for using bundled upstream guides |
| `library/NOTICE.md` | Attribution and licenses for everything under `library/` |
| `references/sources.md` | What was combined from which skill, what each adds, what was left out |
| `references/commands.md` | How each command runs here, substitutions for upstream launcher steps |
| `references/core-guidance.md` | The full decision guidance (product, experience, visual system, interface, behaviour, toolkit, verification) |
| `references/file-map.md` | This list |
| `scripts/capture.mjs` | Exact-size PNG capture (true CSS width, height, DPR, overflow flag) for the visual gates; zero dependencies, any installed Chrome or Edge |
| `references/distinctive-design.md` | Beyond the template: category inventory, one distinctive move, section grammar, component sourcing, specificity tests |
| `library/components/INDEX.md` | Catalogue of the 16 bundled original components, transform checklist, variants |
| `library/components/components.html` | Live gallery of the bundled components with extraction markers |
| `scripts/component-source.mjs` | Read-only component viewer: bundled components and shadcn, Magic UI, Aceternity, React Bits, Skiper UI, Vengeance UI, Kokonut UI, 21st.dev (user key) |
| `scripts/variety-check.mjs` | Section-form heuristic: repeats, adjacent repeats, banned skeleton, demo phrases |
| `references/agency-bar.md` | The studio bar: root causes of generated output, non-negotiables, Lenis + GSAP stack and recipes, the look-and-fix loop |
| `references/agent-council.md` | Design alternatives, reciprocal discussion, shared plan, representative slice and independent cross-review |
| `references/ai-orchestration.md` | Shared Codex/Claude execution contract, external orchestrator usage, task packets, dependencies, ownership, recovery and sequential fallback |
| `evals/orchestration-evals.md` | Behavioral cases for dispatch, host adaptation, parallel edits, blockers, handoff and completion evidence |
| `agents/*.md` | Council role prompts: design-chair, subject-analyst, art-director, motion-director, copy-chief, experience-architect, slop-auditor, interface-builder, build-critic |
| `scripts/plan-lint.mjs` | Pre-build slop gate on the plan (council files and design-brief.md): idea, competitor test, planned tells, picture plan, motion stack |
| `scripts/taste-check.mjs` | Static studio-bar gate on a built page: mono voice, numbering, eyebrows, hairlines, tracked caps, pictures floor, motion stack (`--showpiece`) |
