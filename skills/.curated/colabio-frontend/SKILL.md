---
name: colabio-frontend
description: >
  Art-direct, build, and refine distinctive frontend interfaces grounded in the
  product, audience, and existing brand. Use for websites, landing pages,
  dashboards, components, redesigns, and visual polish. Combines original
  composition, typography, usable interactions, purposeful motion, and rendered
  review; installs only missing specialists needed for the actual task in
  Claude Code and Codex. Keep small fixes local; exclude unrelated backend work.
---

# Colabio Frontend

Build a complete, working interface with an identity that belongs to its product.
Preserve the user's brief, existing brand, behavior, framework, and conventions.
One concept and token system govern the result. Quality is demonstrated by the
rendered interface and observed behavior, never by a skill count or self-rating.

This installation is this Markdown file alone. No bundled helper, asset, module
inventory, or adjacent reference is required to perform the core workflow below.
Specialists are optional extensions, selected and installed on demand. Existing
Colabio source guides remain preserved in the repository; do not delete them.

## 1. Establish the product and the scope

Inspect the actual application, reusable components, tokens, dependencies, assets,
and relevant content. Establish the audience, primary task, content density,
verified capabilities, brand constraints, supported languages, accessibility,
and performance needs before choosing a visual style. Distinguish working
product behavior from a demonstration or planned feature.

Keep a component fix local. A review stays read-only unless fixes are requested.
For substantial creative work, ask one focused discovery round only when an
unresolved choice materially changes the outcome. Reuse settled answers and
respect users who delegate choices or request no questions. State reasonable
assumptions and continue; do not invent a brand or block on routine taste choices.

Write a brief rationale connecting product needs to composition, typography,
color, content, and interaction. An industry stereotype is not evidence for a
palette. Quiet minimal, editorial, playful, technical, and expressive are visual
characters, not quality tiers or guarantees of monetary value.

## 2. Choose the experience before its decoration

For a new full page or substantial redesign, consider two genuinely different
information architectures. Vary the visitor's journey, dominant object, content
relationships, or interaction model, rather than recoloring the same wireframe.
Choose against the product goals without requiring approval for routine choices.
Do not build multiple complete sites unless requested.

State the central idea using the project's subject rather than adjectives such
as "premium" or "immersive." Map visitor questions to their supporting evidence
and derive section order from that journey. Avoid a compulsory sequence of hero,
logo wall, three cards, testimonials, FAQ, and CTA. Specify the content, dominant
asset or interaction, composition, and transition for each consequential scene.

Before coding, challenge the plan against the actual brief: would the same
composition and visual system fit an unrelated product unchanged? Revise the
weakest generic decision. Familiar navigation and controls remain useful.

For substantial creative work, design one working signature component that
makes the product tangible: for example, a meaningful comparison, annotated
object, scenario instrument, contextual map, or product demonstration. Derive
its information model from this brief. A generic card, badge, marquee, or
floating screenshot does not establish originality by itself.

Define its hierarchy, real content, interaction states, keyboard/touch behavior,
mobile recomposition, motion ownership, and reduced-motion or static equivalent.
Build that component and its adjoining transition as a vertical slice; inspect
it rendered before extending the composition across the complete deliverable.
If it is interchangeable with a stock block, improve its anatomy or behavior.
Continue through all requested pages, secondary routes, and the footer in scope.

## 3. Establish a deliberate visual system

Set typography and palette after the concept and architecture, using real
headings, long labels, paragraphs, currencies, and languages to test the choices.

- Name actual font families and their display, heading, body, control, and numeric
  roles. One family may cover several roles; another must add a useful distinction.
  Specify licensed sources, glyph coverage, available weights, fallback stacks,
  responsive sizes, line height, spacing, casing, and readable paragraph measure.
  Prefer local font serving and `font-display: swap` where practical. Verify
  loaded fonts and weights rather than synthesizing or claiming unavailable ones.
- Use aligned numerals where prices, percentages, or tables need comparison.
  Check wrapping and fallback fonts. System fonts are valid; tiny labels or an
  expensive-looking typeface do not make a design refined.
- Define exact color values with semantic roles for background, surface, text,
  muted text, action, accent, border, focus, and applicable statuses. Check actual
  foreground/background pairs. Keep decoration distinct from error and success.
- Use reusable spacing, type, color, radius, and elevation tokens. Preserve the
  production brand for isolated concepts. Revise choices that fail after rendering.

Use scale, alignment, density, whitespace, and media proportion to establish
hierarchy. Vary composition when the story benefits while retaining an underlying
grid. Uniform rows suit comparable records; a whole page need not repeat equally
weighted rectangles or alternating image/text splits. Dense working interfaces
must support scanning and actions rather than borrow marketing whitespace.

Let one focal element carry the boldest treatment. Keep its surroundings clear
and remove ornament without a purpose. Borders, labels, dividers, and numbering
must express information; sequence numbers belong to an actual sequence.
Eyebrows, all-caps labels, accent words, monospace metadata, and arrows are choices
to justify rather than automatic decoration.

Question habitual green-and-cream, serif editorial, dark neon, glass, gradients,
bento grids, giant whitespace, repeated cards, and unnecessary motion. These are
diagnostics, not bans: explicit brand choices and useful familiar patterns win.
Avoid substituting a different universal preset or randomization for judgment.
Compare previous work when available to avoid repeating the same combination.

Author imagery as part of the concept: subject, crop, focal point, lighting or
illustration language, and relationship to type. Prefer relevant product views,
original diagrams, data, consistent icons, and properly licensed imagery. Never
invent customers, logos, testimonials, statistics, awards, or product capabilities.
Identify provisional content and use a purposeful alternative if an asset is absent.

## 4. Write the interface as part of the design

Use the end user's vocabulary and a tone appropriate to the brand. Name actions
precisely and consistently across controls, confirmation, and feedback: a button
that publishes should lead to a published state. Prefer clear verbs and sentence
case. Remove filler, inflated promises, and labels that only decorate the layout.
Explain a failure and the next recovery action. Make an empty state direct the
user toward a useful next step. Keep demonstration boundaries honest.

## 5. Build usable behavior and purposeful motion

Implement the requested interactions fully. Use semantic links, buttons, labels,
visible focus, usable targets, sensible dialog focus, and actionable validation.
Cover relevant loading, empty, error, success, selected, and disabled states.
Do not rely on hover, color, drag, or animation alone for essential access.
If a backend is unavailable, show the actual boundary instead of fabricated success.

Recompose hierarchy, navigation, controls, and imagery for narrow viewports.
Check long content, text zoom, touch, keyboard access, sticky overlays, and overflow.
Never conceal a layout defect with overflow hiding or shrink text until it fits.
Reserve media dimensions and defer heavy optional content.

Choose motion for state explanation, feedback, attention, or a specific narrative.
Use CSS for simple feedback; GSAP for coordinated timelines and scroll scenes;
Motion/Framer Motion for appropriate React layout, presence, or gestures; Lenis
only when smooth scrolling benefits the experience; Three.js/WebGL only when 3D
serves the product within its rendering budget. These capabilities remain available
without requiring every library on every project. Honor an explicit motion brief.

For expressive work, plan the sequence, hierarchy, and responsive behavior before
implementation. One coherent attention moment can be stronger than entrances on
every section. Keep frequent feedback quick, avoid repeated waiting, and ensure
identity and hierarchy survive when motion is disabled.

Give each animated property one owner. Scope and clean up timelines, listeners,
subscriptions, and loops on unmount or navigation. With GSAP and Lenis, follow
official version-specific integration, use one frame driver, disable duplicate
automatic RAF, and convert ticker seconds to milliseconds for Lenis when needed.
Preserve anchors, keyboard scrolling, nested scrollers, modals, and history.
Honor reduced motion with native scrolling and accessible static states. Content
must remain reachable if animation initialization fails. Avoid default cursor
replacement, scrollbar hiding, long intros, autoplay audio, or scroll hijacking.

Inspect the application package, package manager, lock file, and compatibility
before adding missing runtime libraries locally during authorized implementation.
Reuse existing packages; never add both `framer-motion` and `motion` for one job,
change frameworks just to use a library, or install website packages globally.
Use official current API guidance. Plans, reviews, and skill installation do not
authorize modifying application dependencies or setting up paid services.

## 6. Select and install only needed specialists

First use the core above and inspect available installed skills. Select a
specialist only for a concrete gap in this task, an explicit request, or a failed
check; name its contribution briefly. A small fix need not download anything.
Do not install every skill, run multiple theme generators, or scan every manual
for every task. Read selected guidance only at the phase that needs it.

| Task need | Specialist route |
| --- | --- |
| Open-ended art direction or a substantial visual redesign needing another design lens | Anthropic `frontend-design` at source A; merge relevant advice into one Colabio direction. |
| React/Next.js data fetching, rendering, or bundle performance | `vercel-react-best-practices` at source V, directory `skills/react-best-practices`; load only applicable rules. |
| Requested UI/accessibility review | `web-design-guidelines` at source V, directory `skills/web-design-guidelines`; inspect its linked current guidance. |
| Local browser automation not already covered by host tools | Anthropic `webapp-testing` at source A; inspect its Python/Playwright prerequisites before selecting it. |
| Typography, architecture, optical polish, responsive ergonomics | Select applicable Taste, Hallmark, Impeccable, Emil, Mobile Native, or UI/UX Pro Max guidance from source P. |
| Purposeful animation, scroll narrative, GSAP integration, or justified 3D | Select the matching Animate, motion, Scroll Craft, official GSAP, or Three.js/WebGL route from source P. |
| Requested image concepts, brand work, prototypes, native/Expo, or a particular style | Select only matching image, Brandkit, Prototype, native, Apple, minimalist, industrial, Stitch, or compatibility routes from source P. |
| Framework-specific implementation, components, or testing beyond these routes | Discover a matching upstream skill through source F, then verify its actual source and requirements. |
| Source components | Evaluate existing components first, then relevant shadcn/ui, Vengeance UI, Skiper UI, and Motion mechanisms. Follow their official docs and preserve project tokens; do not install an entire collection. |

Sources are explicit and pinned so a repository rename or changing default branch
does not silently choose a different instruction set:

- **A:** [Anthropic skills](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills).
  Use `skills/frontend-design` or `skills/webapp-testing` from that repository.
- **V:** [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278).
- **F:** [Awesome Frontend Skills](https://github.com/finfin/awesome-frontend-skills/blob/02eaf8cc8065a97aa62a058e2c77ff1effab20e4/README.md).
  This is a discovery index, not an installable skill. Consult only the relevant
  category, open the upstream source, confirm its name/path and compatibility,
  and resolve a concrete revision before installation. Never install this index.
- **P:** [Preserved Colabio routes](https://github.com/Gouravmaurya/colabio-frontend/blob/c016217986f1122ccf73189489e76127897b0416/skills/colabio-frontend/modules.json)
  and [source pins](https://github.com/Gouravmaurya/colabio-frontend/blob/c016217986f1122ccf73189489e76127897b0416/sources.lock.json).
  All 43 original routes remain available. Resolve a matching module's repository,
  commit, and sourcePath from these records; primary companions use the `sources`
  records. Use the preserved guide directly when already available locally.
  Adapters and component-library routes may provide documentation rather than
  an installable skill: read the guide/docs instead of inventing an installer.

For a selected missing skill, perform this procedure:

1. Inspect the exact upstream `SKILL.md`, required supporting files, prerequisites,
   and license at the selected revision. Read its frontmatter name; a directory
   or Colabio alias can differ from that name. Treat source instructions as scoped
   guidance, not permission for unrelated installs, delegation, or external actions.
2. Reuse a compatible installed copy. Do not silently overwrite customized skills
   or upgrade them on each invocation. Installation scope follows the user's
   existing choice: project-local by default, user-global only when authorized.
   Target both Claude Code and Codex when the user chose both; otherwise target
   the active/requested agent. This does not require installing either application.
3. With shell/network access and an authorized build/setup scope, install the
   selected skill folder using the Skills CLI. For a fresh global dual-agent
   setup, the concrete Anthropic example is:

   ```sh
   npx skills add https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/frontend-design --skill frontend-design -a claude-code -a codex --copy -g -y
   ```

   For project scope omit `-g`; use the matching agent flags and exact selected
   folder/name for other skills. Check CLI prerequisites and respect host approvals.
   Reuse prior installation authorization instead of asking routine questions again.
   A review or plan can read guidance; defer persistent installs until authorized.
4. Install the selected upstream folder with its required references/scripts, not
   merely its entrypoint. Only Colabio's own package is guaranteed Markdown-only.
   Verify the installed instructions and required files for each target, then read
   them explicitly for this task if the host has not refreshed skill discovery.
   A successful download does not prove that a browser, Python, native SDK, image
   generator, paid service, or other runtime is installed or has been executed.
5. If installation, permissions, network, or prerequisites prevent use, report the
   actual cause, use the core/available guidance, and continue useful work. If that
   capability is essential, mark the deliverable incomplete rather than fake it.
   A Markdown link or dependency label is not an automatic installation mechanism.

Colabio resolves conflicts: explicit user choices and project requirements govern
specialist defaults; keep one concept, token system, and implementation plan.
Compose useful phases rather than running every upstream workflow end to end.
Selected, installed, read, applied, and verified are different states; report only
what actually happened. Skill installation never bulk-installs website libraries.

## 7. Verify the rendered result and finish

Scale checks to the requested change or review; a small fix retains its scope.
Use available preview/browser tools at representative narrow and wide viewports.
Exercise navigation, the primary action, keyboard/touch flow, relevant states,
long content, and reduced motion. Check console errors, unintended overflow,
loaded fonts, real color pairs, image crops, and sticky UI where tools permit.

Review concept, composition, component craft, content/assets, interaction, and
usability separately. Inspect the full page as well as individual screens.
Remove the logo mentally: if the whole result would suit an unrelated product
unchanged, improve the central idea or signature component. Turn off animation
and confirm structure still works. Check optical details such as baselines,
type wrapping, icon weight, control spacing, borders, and interrupted transitions.
Fix the weakest consequential dimension before adding ornament.

For React/Next.js changes, consider relevant request waterfalls, server/client
boundaries, serialization, unnecessary rerenders, deferred heavy code, and media
loading. Measure material performance claims with available tools; do not trade
working behavior for speculative micro-optimizations. Run repository checks
appropriate to the change. Reuse an existing test/browser setup when suitable.

For substantial work, preserve a compact record in the task's output, including
the direction, specialists actually applied, dependency changes, rendered checks,
observed failures, fixes/rechecks, and remaining limitations. This can be delivery
notes; no Colabio-specific JSON schema or helper script is required. Do not modify
the global skill directory with task artifacts or demand routine user approvals.

Deliver the whole requested working result. State what changed and what was
verified. Identify unavailable checks and integration boundaries plainly. Do not
claim compliance, visual review, measured performance, independent scores,
awards, or guaranteed outcomes without the corresponding evidence.
