# Prompt enhancer: idea in, Cinematic Design Prompt out

Users can start with a short idea. Follow [conversational intake](brief-intake.md)
to clarify material choices, recommend a direction and build. Record the result
as a **Cinematic Design Prompt (CDP)**:
a complete, copy-ready design and implementation brief. The legacy CDP name does not require cinematic
styling or motion for a dashboard, store or other interface. Run it for every new
site or major redesign, and when the user requests a website prompt. Skip the full
process for small fixes. Consolidate a supplied detailed brief into the same
document without repeating intake; fill safe gaps as explicit assumptions.

**Order is the point:** understand what is being built, plan the scenes and pages
around it, and only then decide theme, colour, type and motion character
(`product-understanding.md`). A CDP whose art direction was written before its
understanding and plan is rejected and redone.

## Procedure

1. **Read the idea**, relevant saved preferences from `design-memory.md`, and
   anything attached (links, screenshots, repo, brand files). Inspect a supplied live site rendered, not only its source.
2. **Understand** (`product-understanding.md`, Step 1): write the Understanding
   Sheet: what it is, who uses it, where and on what device, the decision they
   face, the proof that convinces them, the domain's vocabulary and materials,
   category defaults to avoid, emotional register, constraints, first-screen
   obligation. Ask the user only for gaps that change the build: follow
   `brief-intake.md`: ask 1-3 relevant questions initially and follow up only for
   material ambiguity. Reuse detailed briefs; skip optional questions for "you decide".
3. **Plan** the scene score and page list from the sheet (its question sequence,
   proof and first-screen obligation). No colour or type yet.
4. **Select** with `node scripts/select-build.mjs --brief "<idea>"` for type, starter,
   stack, motion level, libraries, pages and reading order. Treat its style, font and
   palette picks as candidates only.
   For open visual work, use `pinterest-research.md` alongside original live sites;
   record inspected principles and their product-specific transformation in the
   prompt. If Anime.js is selected, specify its bounded job and separate property
   ownership using `animejs.md`; do not silently add another engine.
5. **Decide the theme** (`product-understanding.md`, Step 3) with
   `node scripts/palette-lab.mjs --domain "<idea words>"`: pick one of its candidates
   (or your own from real swatches), name which material each colour comes from, justify
   the surface (light, dark, or light with a dark scene) from the use context, and reject
   any `categoryDefaultFlags` unless required. Fonts follow register and density.
6. **Write the complete CDP** to `design-brief.md` in the project (never the skill folder),
   using the schema and coverage contract below. Write direct instructions another
   builder can execute without the conversation, installed skill or council notes.
   Resolve choices instead of listing alternatives for the builder to guess.
7. **Share the prompt**, linking the file with the 3-5 line recommendation from
   intake; provide the full text in chat when file output is unavailable. For a
   prompt-only request, deliver the prompt and stop. For an authorized build,
   show the selected skills and a concrete written preview using `brief-intake.md`,
   then wait for approval or revisions before implementation. Honor an explicit
   waiver or existing approval of the unchanged preview. Deliver the result,
   observed checks and limitations; offer prompting advice only when requested.

## The schema (written in this order)

```
CINEMATIC DESIGN PROMPT: <working title>

1  Logline        One sentence in the product's own nouns. No "premium", "immersive".
2  Understanding  The ten answers: what it is and replaces · who uses it · where/device/light ·
                  the decision they face · proof that convinces · domain vocabulary and
                  materials · category defaults to avoid · emotional register · constraints ·
                  first-screen obligation.
3  Visitor        The moment they arrive in. Primary action as a button label. Success measure.
4  Scene score    Scenes or workflow views as needed for the requested scope. Each: question it answers · form from the section-grammar menu
                  (references/distinctive-design.md; no form more than twice, none adjacent) ·
                  composition · dominant asset · motion verb (establish, enter, hold, transform,
                  resolve) · hand-off to the next scene · phone recomposition · component
                  source (library/components, registry, or custom) with the planned change.
5  Signature      The one distinctive move only this product could own (one sentence), as an
                  interaction or object: what changes, what the visitor learns or does, its
                  states, keyboard and touch behaviour, static/reduced-motion equivalent.
                  For an open creative direction, list useful category patterns and relevant
                  references; do not force a reference count or displace approved choices.
6  Pages and UX   Page list with purpose · navigation model · primary flow in steps ·
                  secondary flows · forms with validation and honest results · empty, error,
                  loading and success states.
7  Art direction  Derived, not chosen. Surface decision (light / dark / light + dark scene) with
                  the use-context reason · palette: preserve settled brand colours; for open colour direction compare
                  candidates from palette-lab, their material sources and flags ·
                  light, material and camera language · type voice tied to register and
                  density · motion character tied to register.
8  Motion system  Owners matched to accepted motion level and existing stack
                  (CSS feedback, GSAP timelines, Motion gestures where appropriate) ·
                  duration/easing tokens · entrance grammar per content role · intro policy
                  (skippable, timer-released) · reduced-motion plan · performance limits.
9  Content        Supplied vs sample (label samples on the page) · copy voice with 3 example
                  lines. Never invent customers, logos, awards, reviews or statistics.
10 Stack          Single HTML, React, Next, or existing repo; libraries and why; hosting.
11 Acceptance     Measurable: viewports 1440/1024/768/390; contrast text 7:1, muted 4.5:1;
                  no console errors; every interaction driven; reduced-motion and CDN-failure
                  paths; scanners clean (slop-lint, check-contrast, palette-lab --check,
                  finish-gate).
12 Assumptions    Every guess, applied preference and explicit override, so the
                  user can correct consequential choices in one reply.
```

## Quality rules for the CDP

- Sections 1-6 exist and are specific before section 7 is written.
- Every scene has a verb and a hand-off. A list of section names is not a scene score.
- The signature is a mechanism, not an adjective. "Drag to turn the jar, glaze and
  size change price and capacity" passes; "interactive 3D" does not.
- Section 7 cites sections 2 and 4. "Dark because cinematic" and "navy because trust"
  fail; "light ground because merchandisers read dense matrices in daylight offices, one
  dark scene for the order story, madder red and indigo from the real dyes" passes.
- Pages exist for visitor tasks, not to look complete.
- Anti-clone rule (`craft-bar.md`): nothing may be taken from a studied reference or a
  template's identity.

## Coverage contract: a builder should not have to invent the design

For media-led prompts and per-element precision, use the bundled
[MotionSites adapter](../library/modules/motionsites-web-builder/GUIDE.md), then
its spec checklist and only the needed technique recipe. Merge concrete style
lines, layer order, media playback/crop and motion tables into this CDP. For a
named target builder, use its builder-format reference while preserving the
agreed stack and scope. Do not create competing specifications.

Keep the twelve sections above as one governing prompt. Expand them with the
following details wherever relevant to the agreed scope. Do not inflate a single
landing page into a multipage site or add commerce, accounts, a CMS or a backend
without a visitor need and authorization. Explicit static or quiet requests win.
Awwwards-level ambition means specific composition, craft and observed usability;
a prompt cannot guarantee an award. Do not claim awards, ratings or performance
that have not been earned or measured.

### Pages and sections (sections 4 and 6)

- List every agreed route with its purpose, audience/arrival context, visitor
  decision, primary action and destination. Specify shared navigation, footer,
  current-page treatment, mobile menu and transitions between routes. For public
  pages include title/description intent and heading hierarchy.
- Give each route its own ordered section blueprint. Each section needs a stable
  ID, the question it answers, truthful content/proof, proposed headline and key
  copy, section form, desktop composition, dominant asset, useful action and next
  hand-off. Include body, proof and ending with the same care as the hero.
- Describe the geometry: grid/columns, content width, alignment, image/text
  balance, focal point, crop, layers/depth, background and negative space. Choose
  useful sizes or ranges; distinguish precise design targets from measured facts.
- Specify tablet and phone recomposition: reading order, stacking, crop, spacing,
  controls, content priority and motion changes. Shrinking the desktop layout is
  insufficient. Mark intentional shared sections by ID; do not say "repeat Home"
  for a page with a different task.

### Components and working behavior (sections 5 and 6)

- Inventory shared and bespoke components with stable IDs and the sections that
  use them. Reuse the project's existing components where appropriate. Describe
  anatomy, size/variants, typography, surface, border/radius, iconography and
  content limits; "beautiful cards" is not a component specification.
- Specify meaningful default, hover, focus-visible, pressed, selected, expanded,
  disabled, loading, empty, error and success states as applicable. Name triggers,
  transitions, outputs, keyboard/touch behavior and focus destination. Avoid
  inventing states for elements that do not have them.
- Fully describe the signature interaction: real inputs, intermediate and final
  states, what it teaches, reset/reversal and a usable static equivalent. Forms
  need fields, labels, validation, submission destination, pending/error/success
  copy and what actually persists or is sent. Label demonstrations honestly.
- Record each component's existing/bundled/registry/custom source and the changes
  that make it belong to this product. A named library does not specify its design.

### Visual system, content and assets (sections 7 and 9)

- Write the chosen idea and why it belongs to this subject. State reference
  principles to transfer, approved regions to preserve and category defaults to
  avoid. Resolve the direction after discussion; do not leave a menu of styles.
- Provide actual semantic color values with intended surfaces/text pairings and
  contrast targets; font families and available source/fallback, roles, weights,
  desktop/mobile scale, line-height and tracking. Include spacing scale, container
  widths, breakpoints, grid/gutters, radii, borders, elevation and icon treatment.
  Preserve settled brand tokens and installed fonts before adding alternatives.
- Give an asset plan with IDs, usage/section, supplied/available/to-source status,
  subject, crop/aspect ratio, focal point, lighting, texture, treatment, alt-text
  intent and mobile variant. State source/usage rights when known and unresolved
  needs honestly. References are inspiration, not permission to copy assets.
- Include an actionable copy deck: headlines, descriptions, navigation and action
  labels, proof wording and relevant state messages. Distinguish verified facts,
  proposed copy and labelled samples; never manufacture business claims.

### Motion direction and choreography (sections 4 and 8)

- Give each major section a motion intent or a deliberate still/read state with
  a reason. Describe page entrance, navigation, section hand-offs, component
  reveals, microinteractions and the ending as one journey. Avoid applying one
  generic fade-up to every section.
- For each moving scene/component, name the target/layer, trigger, start state,
  intermediate/held state, settled state and exit. Specify duration, delay,
  stagger/easing or spring values; for scroll-linked scenes, give start/end
  anchors, progress intervals, pin/hold behavior and release. Include reverse,
  fast-scroll and interruption behavior where relevant.
- Map motion to an actual owner in the existing stack, with a single scroll clock
  where used. Plan mobile/touch, keyboard/focus, reduced-motion and failed-library
  behavior separately. Content and primary actions remain reachable throughout;
  no scroll trap, mandatory intro or hover-only task.
- State asset loading and animation performance budgets appropriate to the target
  devices, expensive effects to limit, and what will be measured. Favor transform
  and opacity when they fit the concept; add 3D only when its value is concrete.

### Implementation and acceptance (sections 10-12)

- Name the existing framework, routing, styling and reusable dependencies; retain
  APIs/data contracts and approved behavior. State what is real, mocked, local or
  requires missing credentials/assets. Do not put credentials, private profile
  paths or an unrequested deployment into the prompt.
- Specify the representative slice and build order, then every remaining agreed
  route and state. Include responsive, semantic HTML, focus, contrast, readable
  fallbacks, loading/error handling, image/font loading and SEO needs in scope.
- Define evidence for acceptance: actual renders at 1440/1024/768/390, full-page
  and section views, motion start/middle/end and playback, real navigation/forms,
  keyboard/touch, reduced motion, overflow and console checks. Map checks to
  concrete route/section/component IDs. Compare against the brief and any supplied
  incumbent; scanners cannot judge design quality on their own.
- Finish with confirmed decisions, explicit assumptions, unresolved blockers and
  exclusions. Resolve material blockers before dependent implementation. When the
  request is prompt-only, describe these as future checks, never checks already run.

## Completeness pass before hand-off

Read the prompt as a builder who has no chat history. Trace every agreed route to
its sections, each section to its content/assets/components, and moving components
to their state/trigger/phone/reduced plans. Check links, destinations and form
outcomes. Resolve conflicting tokens or behaviors and retain intentional shared
IDs. Missing evidence remains unverified; missing design decisions need a concrete
proposal or a clearly identified blocker, not "make it premium" or "add animation".
Keep optional council notes separate; merge their settled decisions into this
prompt. When user feedback changes the direction, revise the affected page,
component, motion and acceptance entries together before building further.

## Example: idea to CDP (abridged)

**Idea:** "A landing page for a garment ERP, cinematic and attractive."

```
1  Logline       Selvage follows one buyer order from size-colour matrix to cutting, sewing and dispatch.
2  Understanding Replaces spreadsheets and WhatsApp. Users: merchandisers (daily, dense data),
                 factory owners (weekly, decisions). Office desktop in daylight; floor tablets for
                 the line view. Decision: will this order ship on time? Proof: a real order moving
                 through the system. Vocabulary: PO, size-colour matrix, marker efficiency, SAM,
                 line balance, cartons. Materials: indigo and madder dyes, undyed cotton, horn
                 buttons, kraft pattern paper. Avoid: navy + yellow SaaS, stock factory photos.
                 Register: calm under pressure. First screen: it tracks one order end to end.
4  Scene score   1 Establish: the order board. 2 Hold+transform: one PO through plan, cut, sew, pack.
                 3 Decide: what-if fabric delay. 4 Index: modules. 5 Resolve: trial.
7  Art direction Light ground (undyed cotton) for dense matrices; one dark scene (horn brown) for the
                 order story; madder red accent and indigo second colour from real dyes;
                 palette-lab flagged the earlier navy + yellow as a SaaS default, so rejected.
```

## Example: software idea (abridged)

**Idea:** "A tool that turns support tickets into a weekly product report."

```
1  Logline       Ticketlens reads a week of support tickets and writes the three things to fix.
2  Understanding PMs drowning in tickets; desktop at work; decision: what to fix first; proof: paste
                 ten tickets, see the grouped report; vocabulary: tickets, tags, severity, quote.
5  Signature     Document-to-result transformer: tickets on the left, grouped report on the right,
                 labelled sample data.
6  Pages         Home, How it works, Pricing (sample), Sample report, Docs entry.
```

## Handing off

The CDP is the single source for the build. Change it only in writing (a line in
the assumptions) when reality disagrees. Deliver it with the site so the user can
reuse and edit it.
