# Select the right expertise, then compose one website

Read for new websites, substantial redesigns and design/build prompts. Colabio
coordinates the bundled guides; do not activate every installed frontend skill
or average competing workflows. Roles may be sequential when delegation is not
available or useful. The user should discuss their website, not manage agents.

## Decide what the task needs

### Required core and selected specialists

For every new frontend or substantial redesign, apply Colabio's scope/intake,
complete prompt, responsive/accessibility and verification contract, plus these
four bundled sources at the appropriate phases:

- **Impeccable:** `library/impeccable/reference/craft-floor.md` for the usability
  and craft baseline; use its matching audit/polish playbook during verification.
- **Taste Skill:** `library/taste/references/tells.md` for template rejection;
  use its type, colour and layout references when those decisions are open.
- **MotionSites:** `library/modules/motionsites-web-builder/GUIDE.md` for precise
  visual specification, media composition and the appropriate technique recipes.
- **GSAP + ScrollTrigger, with Lenis:** `library/modules/gsap-core/GUIDE.md` and
  `references/motion-recipes.md` for the required motion runtime in non-static
  frontend builds. Include Lenis's CSS and one ticker integration. Touch retains
  native scroll; reduced motion and explicit static requests omit animation.

These core checks cannot be omitted because a more spectacular specialist was
chosen. Apply them within scope: a tiny fix needs only the affected baseline and
template/accessibility checks, not a complete redesign or a new brief. Prompt-only
work specifies future visual checks without claiming they have run.

Every other bundled source is selected by need using the table below and the
complete inventory in `library/INDEX.md`. The required MotionSites and GSAP
guidance still applies to static work for composition and fallback decisions;
it does not authorize adding unwanted animation or changing the project's stack.
Read references progressively rather than loading every core file and specialist
at once. Preserve the user's explicit choices and existing brand/stack.

Inspect the brief, approved regions, actual assets, stack and installed components.
Reuse the user's settled decisions. Separate the requested surface (marketing,
store, reading or operational), scope, visual character and motion ambition.
For a small font/color/button fix, open only its matching guide and verify the
affected surface. Do not run the complete creative pipeline for a local fix.

For substantial work, `scripts/select-build.mjs` returns candidate `workstreams`
with guide paths and required deliverables. Read them from the installed skill
root, then decide against the brief; keywords are not design judgment. Record
which guide answers which unresolved question, the chosen result and its reason
in `design-brief.md`. Open the smallest relevant references as each phase begins.
No dependency is installed by the selector or by reading a guide.

Before implementation, show the required four source names and any selected
specialists with one plain-language reason for each. Follow `brief-intake.md`:
ask material questions, present a written design preview and wait for approval
or requested changes. Keep internal dispatch/tool details out of that explanation.

| Part | Choose from | Must produce |
| --- | --- | --- |
| Structure and hero | `distinctive-design.md`, Taste layout/scenes, Hallmark structures | Product-specific composition alternatives, chosen page/section architecture and reading order |
| Fonts | Taste type, craft defaults, existing brand fonts | Role-based families, actual weights, mobile/desktop sizes, leading/tracking, loading/fallbacks |
| Color | Product understanding, palette lab, Taste colour | Semantic values derived from brand/materials, contrast pairs and a justified light/dark decision |
| Components | Existing house components, bundled originals, Hallmark, then registries/custom | Subject-specific anatomy and useful behavior; all relevant interaction/content states |
| Component motion | Cinematic motion, animation/design-motion-principles, existing Motion/CSS | Feedback, reveals, assembly and transitions appropriate to each component's role |
| Visual inspiration | `pinterest-research.md`, Pinterest and original designer/live sites | Inspected references, transferable principles, asset provenance and original composition; fallback when access is blocked |
| Anime.js specialist | `animejs.md`, official installed-version documentation | A bounded SVG/component effect when requested or already used; separate GSAP property ownership, cleanup and reduced motion |
| Scroll storytelling | Cinematic motion/recipes, GSAP ScrollTrigger, Scroll Craft | Scene progression, readable holds, hand-offs, reverse/fast-scroll, resize and phone/native-scroll behavior |
| Media/cinematic craft | MotionSites adapter/technique index, cinematic recipes, imagery guides | Real focal assets, crop/layers/light, continuity and start/middle/settled composition |
| 3D | Three.js and performance guides, MotionSites 3D recipe | A useful object interaction with loading, budget and usable poster/no-WebGL path; only when justified |
| Verification | Verify and visual comparison gates; optional MotionSites QA | Observed desktop/phone composition, real interactions and motion playback; honest limitations |

Resolve table paths through `library/INDEX.md`; Colabio references live in
`references/`. Use the MotionSites adapter before its upstream files. The bundled
module does not depend on the separately installed MotionSites skill. If that
skill is invoked explicitly, use its relevant expertise without restarting
discovery or changing approved scope, tokens or framework.

## Compose the decisions together

Develop a subject-specific idea first, then integrate structure, typography,
palette, assets, component anatomy and movement into one visual system. Design
the body, proof, useful interaction and ending as carefully as the hero. Premium
feeling comes from composition, readable type, good assets, spacing, detail and
responsive behavior; adding a serif, dark surface or blur is insufficient.

For an open hero direction, follow `distinctive-design.md`'s hero contract.
Choose a concept that would stop making sense if its product were swapped for a
competitor. Do not fall back to half-screen text beside a stock image or reverse
those columns and call it original. Preserve an approved hero or an explicit
user request for a split composition.

For expressive/cinematic briefs, specify visible component and scroll animation
through the whole requested journey: entrances/assembly, state changes, moving
proof and scene hand-offs, with deliberate reading holds. Smooth scrolling alone
does not satisfy it. Choose from meaningful mechanisms, not an effect quota;
avoid repeating one fade-up across every block. Still/static requests and
operational tasks retain appropriate motion. Include keyboard/touch and reduced
motion from the start, and give each animated property one runtime owner.
Record motion coverage for every major component, including navigation, forms,
results, disclosures and the footer. Verify real playback on tall and short
desktop viewports and touch; imports or a single hero animation cannot pass.

Merge all decisions into the complete prompt defined in `prompt-enhancer.md`.
Every route points to its section compositions, component states and motion
plans. Review the representative slice, fix real findings, then extend and
review the full journey. No guide, scanner or numeric score guarantees an award.
