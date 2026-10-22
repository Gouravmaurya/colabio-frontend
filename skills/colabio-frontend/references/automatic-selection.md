# Automatic project-specific composition

Colabio is the entrypoint, not a fixed four-skill pipeline. Assess the full
modules.json inventory for every substantial frontend project. Select every
module with a concrete contribution to the requested result. There is no quota
or four-skill limit. Do not activate every module merely because it exists.

## Build the project profile

Inspect the actual implementation folder, framework, existing components,
tokens, dependencies, assets, brief, audience, content, and change boundaries.
Infer the surface, task, and needed capabilities without asking users to choose
skills or libraries. A component fix retains its scope. A complete creative
site requires broader coverage than art direction alone.

Use the bundled read-only selector to assess every inventory entry:

```sh
node <colabio>/scripts/select.mjs --project <actual-app-folder> --surface landing --task redesign
```

Surfaces: landing, website, app, component, native. Tasks: build, redesign,
polish, review, animation. The agent derives these from the request; the user
does not need to learn flags. The helper inspects package.json and produces a
plan only. It does not understand product facts or execute selected skills.
Review its suggestions against the brief and record justified adjustments.

Optional --features is a comma-separated list of motion, static, scroll-story,
webgl, image-concept, image-to-code, brand, alternatives, stitch,
source-components, experimental-layout, animation-audit, motion-terms,
gsap-plugins, legacy-taste. Choose features from real mechanisms or requested
deliverables, not keywords stripped of context. A request saying "no WebGL"
must never enable webgl. Full builds consider appropriate motion by default;
static disables it. Existing brand and reduced-motion requirements take priority.

Optional --style minimalist|industrial|apple selects a suitable style lens only
when supported by the brief or reasoned art direction. --include accepts exact
module IDs for explicit needs. Explicit inclusion does not override framework,
accessibility, scope, licensing, or host restrictions. If Node is unavailable,
perform the same assessment directly from modules.json and disclose the fallback.

## Cover the whole implementation, not only the concept

| Need | Skills to assess and combine |
| --- | --- |
| Product and direction | Impeccable context, current Taste, targeted UI/UX Pro Max guidance |
| Architecture and signature component | Hallmark, Colabio high-craft; gpt-taste for relevant experimental composition |
| Typography and component detail | High-end Visual Design, Emil design engineering, UI/UX Pro Max; one suitable style lens |
| Responsive behavior | Mobile Native for web ergonomics; native-specific guidance for an actual native target |
| Motion purpose and execution | Animate, Design Motion Principles, relevant official GSAP modules, the compatible Framer Motion/Motion guide |
| Scroll narratives and rendering | Scroll Craft for a real narrative; Three.js/WebGL for justified 3D/shaders |
| Concepts and alternatives | Appropriate image guide, Image-to-Code, Brandkit, Prototype, or Stitch when their deliverable is needed |
| Existing-site work | Redesign adapter, Emil, and applicable existing-motion audit guides |
| Review | Impeccable, relevant Hallmark diagnostics, Web Design Guidelines, Review Animations when motion exists |
| Component sources | shadcn/ui, Vengeance UI, Skiper UI, and Motion integration guides against actual component needs |

The selector produces selected, candidate, and not-needed dispositions for all
entries. Resolve library candidates before implementation: choose a specific
component and explain its function, reuse an existing component, or decline it
with a reason. Reassess source-library candidates even when the script cannot
detect the stack, including an authorized new React project. Do not introduce
React merely to qualify for a component library.

Read selected entrypoints and applicable references at the phase that needs
them. Identify a concrete application: component anatomy, token decision,
interaction behavior, animation ownership, responsive change, or review check.
Reading every manual at once wastes context; listing a selected guide without
consulting or applying it is not execution. Reassess when the implementation
reveals a new need, a failed review, or an unsuitable initial choice.

## Resolve overlaps into one design

Taste proposes direction, Hallmark challenges architecture, UI/UX Pro Max
supports specific design-system decisions, High-end Visual Design refines
optical detail, and Emil refines interaction craft. None independently selects
a competing theme. Preserve the chosen project's tokens and concept over an
upstream default font, palette, AIDA sequence, randomization, or component grid.

Animate defines purpose; motion principles refine timing; GSAP/Motion modules
inform implementation; Review Animations checks the result. GSAP owns sequence
and scroll choreography, Lenis owns suitable scroll interpolation, and Motion
owns appropriate React state transitions. Avoid two owners for one property.

Compatible contributions compose; redundant or conflicting recommendations
need a reasoned choice. Use one implementation plan and token system. Do not
start multiple theme generators, delegate automatically because a guide names
agents, or run separate complete redesigns. Keep discovery and installation
separate: dependencies and registry source install locally only when required
by an authorized implementation. Reviews and plans remain read-only.

## Evidence and originality

For substantial work, keep a selection record in the target project output
folder, never the global skill directory. Include project facts, each module's
disposition/reason/phase, actual guide usage, component or behavior affected,
commands executed, dependencies reused/installed, and observed checks. The
helper's evidence: not-yet-used is deliberate; replace it only with real evidence.
The record is part of the normal task, not a permission checkpoint.

Before delivery, check for missing coverage across product, concept, architecture,
component craft, responsiveness, motion when appropriate, and rendered review.
If only core companions were used for a full creative build, revisit the inventory
and justify any specialist omission rather than treating four skills as enough
by default. Do not add irrelevant guides to inflate the count.

Compare the rendered architecture, signature component, assets, type, palette,
and motion with earlier work. Change the underlying idea or information model
when the result is interchangeable. More skills do not establish originality:
working behavior and the rendered result do. Mark unavailable tools/references
honestly, fix material findings, and never promise an award-level outcome.
