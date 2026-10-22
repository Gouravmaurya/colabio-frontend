---
name: colabio-frontend
description: >
  Art-direct and build distinctive, premium websites with project-specific
  page architecture, bespoke components, and meaningful interaction.
  Use for frontend design, landing pages, dashboards, components, visual polish,
  or requests to avoid a generic AI-generated look. Derives typography, font
  details, and theme colors from the project before styling. Uses GSAP and Lenis for
  expressive landing pages and Framer Motion for React interactions.
  Apply to frontend work, not unrelated backend tasks.
---

# Colabio Frontend

Build interfaces with a clear identity, useful hierarchy, and deliberate detail.
Premium quality comes from decisions that fit the product. Motion is designed,
implemented, and reviewed as part of expressive frontend work.
Preserve the user's brief, existing brand, working behavior, and project conventions.

For a new premium site or substantial creative redesign, a clean arrangement
of standard sections is a starting point, not the finished result. Establish
a recognizable idea, express it through the page architecture and a working
signature component, then refine assets, typography, motion, and detail.
Changing palette, fonts, border radii, or reveal effects alone does not qualify
as a substantive creative redesign. Award-level craft is the target, not a
claim that an award or an independent quality rating has been earned.

## Scope

Apply these instructions throughout the requested frontend task and its follow-ups.
Explicit user choices take precedence over aesthetic defaults here.
For a small fix, match the existing interface and keep the change local.
For a redesign, establish direction before changing components.
Do not turn a component request into a site redesign or install tools globally.
This distribution includes reviewed companion instructions and resources;
no paid service or separate skill installation is required.

### Design sources and companion skills

For substantial new UI, creative redesigns, or a request naming these sources,
read [the coordinated workflow](references/coordinated-workflow.md) before
selecting the concept. Follow its phase-specific routing into the bundled
Impeccable, Taste Skill, and Hallmark files. Use
[the reference index](references/design-integrations.md) for Awesome DESIGN.md.
For a narrow fix, read only the relevant guidance rather than running four
complete workflows. Listing a repository does not mean its skill was executed.
Colabio owns the final decisions. Its adapters deliberately compose selected
upstream phases rather than invoking all upstream workflows end to end.
Keep one coherent direction grounded in this project, including the motion
requirements below; do not combine incompatible presets or clone another brand.

## 1. Read the product before drawing the page

Inspect the existing UI, framework, reusable components, tokens, dependencies,
and available assets. Understand the audience, primary task, content density,
and constraints. Reuse sound foundations before introducing new systems.

### Understand first, choose second

Before choosing a font or palette for substantial frontend work, establish:

- What the product actually does, using its brief, existing content, and relevant
  source files. Separate verified capabilities from planned or demo behavior.
- Who uses it, what they need to decide or accomplish, and how much information
  they must read or compare. Distinguish marketing visitors from working users.
- Which qualities the interface should communicate and why: for example, clarity
  for complex research or energy for an entertainment experience. Do not assign
  colors or font categories from an industry stereotype alone.
- Existing brand requirements, user references, supported languages, accessibility
  needs, performance limits, and the scope of permission to change the design.

Use this evidence to write a short design rationale before implementation.
For each major choice, connect a project need to the specific visual decision.
For example: comparing financial scenarios calls for legible aligned numerals;
it does not automatically call for blue, green, or a particular typeface.
If the project lacks information, state the assumption instead of inventing a brand.

### Define the typography system

For a full creative redesign, settle the concept and page architecture in
Section 2 before finalizing font and palette choices. Let real compositions
and content refine preliminary visual candidates.

Choose actual font families after understanding the project. Specify:

- Display, heading, body, interface, and numeric roles. One family may cover
  several roles; a second family must add a useful distinction.
- Exact family names, licensed source, required scripts and glyphs, available
  weights, fallback stacks, and loading strategy. Prefer locally served font
  files with `font-display: swap` when practical. Do not synthesize unavailable
  weights or claim a font is loaded without checking it.
- Font sizes across narrow and wide viewports, weight, line-height, letter-spacing,
  casing, and paragraph measure. Use readable body and control text; do not use
  tiny labels to make an interface appear refined.
- Numeric treatment for prices, percentages, and tables. Use tabular numerals
  or an appropriate numeric face where stable alignment improves comparison.

Evaluate the choices with real headings, long labels, body paragraphs, and
the actual currencies and languages. Check font fallback and text wrapping.
Do not choose a serif, geometric sans, condensed face, or all-caps display
solely because it worked in the previous project.

### Define the color system

Choose colors to support the project's content and existing identity. Specify
exact values and semantic roles for background, surface, primary text, muted
text, primary action, accent, border, focus, and relevant status states.
Separate decorative accents from error and success meanings. Check contrast
for actual text/background pairs, including controls and muted labels.
Do not rely on a palette's name or perceived premium character as justification.

Use reusable tokens for both color and typography. For an independent concept,
keep the tokens local to that concept. Preserve the production brand when the
user requests an isolated test. After rendering, revise decisions that fail
readability or project fit, even if the initial rationale sounded convincing.

Use the brief and existing product to resolve routine choices. Ask only when
missing information materially changes the outcome. Do not block on taste questions.

For substantial design work, state a short direction before building:

- The audience and action the interface should support.
- The visual character, with concrete typography, color, and composition choices.
- The project evidence behind the font families, type details, and semantic palette.
- One or two distinctive details tied to the product or brand.
- The role of motion, or the reason the interface should remain mostly still.

Choose a direction that fits the context: editorial, technical, expressive,
quiet, playful, or another defensible approach. No universal luxury template.

Choose a project-specific visual direction. Do not default to sage, forest
green, beige, or editorial serif typography. These remain valid when the brand
or brief calls for them; they are not a shortcut to premium design.
When previous work is available, compare its palette, typography, composition,
and motion. Avoid repeating the same combination unless the user requests
continuity. Do not replace one habitual palette with another universal default.

## 2. Design the experience before assembling components

For full premium sites and substantial creative redesigns, read
[the high-craft playbook](references/high-craft.md) before choosing the page
architecture. Use [the research notes](references/design-research.md) when
you need the evidence and limits behind these principles. These references
support the workflow; they do not prescribe a house style or a component kit.

### Choose a concept and an information architecture

Write the site's central idea in one sentence using the project's own subject,
not adjectives such as "minimal," "premium," or "immersive." The idea should
remain understandable with animation turned off.

When the brief leaves a new full-page direction open, briefly consider two
genuinely different ways to organize the experience. Change the visitor's
journey, dominant visual object, content relationships, or interaction model;
different colors on the same wireframe are not different concepts. Choose
the stronger approach against the project goals and proceed without requiring
the user to approve routine design choices. Do not build two entire sites.

Map the questions the visitor needs answered and the proof needed for each.
Derive the section order from that journey. Do not start with a compulsory
hero, logo wall, three feature cards, testimonials, FAQ, and CTA.
For each major scene, specify its content, composition, dominant asset or
interaction, and how it leads into the next scene. Remove redundant scenes.
Use familiarity for navigation and controls while making the presentation
and product explanation specific to this project.

### Give the site a signature component

Design a working focal component that makes the product, content, or brand
tangible. Its information model and behavior should have a reason to belong
to this site. A generic card with a new radius, a rotating badge, a marquee,
or a floating product screenshot is not sufficient evidence of originality.

Possible mechanisms include a linked comparison, annotated object explorer,
interactive case narrative, contextual map, material study, scenario instrument,
or product demonstration. Derive the mechanism from the brief; do not turn
this list into a required menu. Reuse accessible primitives and reliable
infrastructure beneath the custom presentation.

For that component, define the information hierarchy, spatial anatomy,
real content and assets, interaction states, motion ownership, keyboard/touch
behavior, mobile recomposition, and static or reduced-motion equivalent.
Design selection, expanded details, loading, empty, and error states where
they apply. If an integration is unavailable, keep the demonstration honest.

Build the focal component and its adjoining transition as an initial vertical
slice with representative content. Inspect it rendered before multiplying
the design across the whole page. If it still looks interchangeable with
a stock landing-page block, change its composition or behavior; adding
animation intensity is not the remedy. Continue through the whole requested
deliverable after this check; the slice is not the final output.

### Compose a continuous page

Vary density, scale, reading direction, alignment, and media proportion when
the narrative benefits. Keep shared grids and visual rules underneath the
variation. Avoid identical section headings, equal-height card rows, and
alternating image/text splits for every topic. Uniformity is appropriate
for comparable records; it should not accidentally flatten the entire story.

Connect scenes through a meaningful subject: the same product detail, case,
location, annotation, or scenario can acquire more context as the page unfolds.
Use a coherent graphic language across components, rather than unrelated
visual tricks. Plan the opening, strongest proof, interactive focal point,
and ending together. The footer and secondary routes in scope need the same
care as the first viewport.

Treat imagery and diagrams as authored parts of the concept. Specify subject,
crop, lighting or illustration language, and the relationship to typography.
Create original SVG, data views, diagrams, or properly licensed imagery when
they materially support the concept. Do not use generic scenery to stand in
for missing product evidence. If a critical asset is unavailable, make that
limitation explicit and build a purposeful alternative within the scope.

### Make the composition specific

Let real content determine layout. Establish one clear primary action per
decision point. Make the first screen explain the product or help perform its task.

Use scale, spacing, alignment, and contrast to create hierarchy. Set reusable
tokens for type, color, spacing, radii, and elevation. Keep long text readable.
Choose typefaces for their role and legibility; use existing or licensed assets.
System fonts are valid. Never add a font merely to appear expensive.

Use a disciplined grid. Introduce asymmetry, overlap, or oversized type when
they strengthen the story and still work on narrow screens. Dense dashboards
need clear scanning and controls; marketing whitespace must not obstruct work.

Prefer relevant product views, original diagrams, meaningful photography,
custom SVG, or useful data over decorative filler. Use a consistent icon family.
Do not invent customer logos, testimonials, statistics, awards, or capabilities.
Keep provisional content clearly identified during review.

## 3. Reject generic patterns for a reason

Question these patterns when the brief does not justify them:

- A gradient headline, floating dashboard, three identical feature cards,
  and a testimonial strip copied into every landing page.
- Purple or blue glows, glass panels, excessive pills, or rounded cards everywhere.
- A bento grid used for content that needs a sequence, table, or simple list.
- Repeated centered sections, uniform visual weight, and generic stock illustrations.
- Empty claims such as "revolutionary" or "unlock your potential" without specifics.
- Cursor effects, marquees, counters, and scroll reveals added to demonstrate motion.

These are review signals, not bans. Keep a familiar pattern when it solves the
user's problem. Explain distinctive choices through content and interaction,
not decorative novelty. Never sacrifice comprehension to avoid familiarity.

## 4. Use GSAP, Lenis, and Framer Motion with clear ownership

The standard motion toolkit is GSAP, Lenis, and Framer Motion / Motion for React.
For a new expressive marketing or landing page, implement GSAP choreography
and Lenis smooth scrolling unless the user, accessibility needs, or host
constraints require an alternative. CSS hover transitions alone do not satisfy
an expressive motion brief. Explain any omitted part of the expected toolkit.

For React interfaces, also use Framer Motion for a meaningful component
interaction such as presence, layout changes, or selection feedback. Keep an
existing `framer-motion` dependency when suitable; new Motion for React projects
may use `motion/react`. Do not import both packages for the same job.
For a non-React page, use GSAP and Lenis directly; do not migrate frameworks
solely to add Framer Motion. If all three are explicitly required in the
deliverable, choose a compatible React setup within the authorized scope.

Small fixes should preserve the existing stack. Install necessary dependencies
only in the intended project or isolated demo, never globally. Check current
official documentation before integrating libraries or unfamiliar APIs.

| Tool | Appropriate use |
| --- | --- |
| GSAP | Coordinated timelines, SVG animation, complex sequencing, and deliberate choreography. |
| GSAP ScrollTrigger | Scroll-linked scenes and pinned storytelling where content warrants the extra scroll distance. |
| Lenis | Smooth scrolling coordinated with GSAP for expressive landing pages, with native scrolling for reduced motion and unsupported environments. |
| Motion / Framer Motion | React layout transitions, presence, gestures, and component state animation. |
| Three.js / React Three Fiber | Interactive 3D that explains or embodies the product and fits the performance budget. |
| Custom SVG | Brand-specific graphics, diagrams, and lightweight illustration. |

Before building, define the motion sequence and its purpose: entrance hierarchy,
scroll-linked storytelling, and interaction feedback. Implement a coordinated
entrance and at least one meaningful scroll-linked sequence for an expressive
landing page. Use modest distances and shorter sequences on small screens.
Document each sequence's purpose briefly in the delivery notes.

Assign ownership explicitly: GSAP owns page choreography and scroll effects;
Lenis owns scroll interpolation; Framer Motion owns React component transitions.
Use separate wrappers when different systems need to animate related content.
CSS remains appropriate for simple focus, color, and hover feedback.

Do not make different animation systems control the same property on the same
element. Keep timelines and event handlers scoped; clean them up on unmount,
route changes, or reinitialization. Avoid duplicate animation loops.

When combining Lenis and ScrollTrigger, follow the versions' official integration
guidance. Use one coordinated frame driver and remove subscriptions on cleanup.
With GSAP driving frames, disable Lenis's independent automatic RAF loop.
Update ScrollTrigger on Lenis scroll events and convert ticker seconds to
milliseconds when calling Lenis.raf. Restore native scrolling on cleanup.
Preserve anchor navigation, keyboard scrolling, nested scrollers, modal behavior,
and browser history restoration. Never intercept scrolling without a clear benefit.

Motion should explain a state change, direct attention, provide feedback, or
support a deliberate narrative. Prefer transform and opacity where suitable.
Keep frequent interactions quick; reserve longer sequences for intentional scenes.
Avoid making users wait through repeated entrance animations.

Honor prefers-reduced-motion: remove smooth scrolling, parallax, and nonessential
movement while preserving content and usable states. Content must not remain
hidden when animation setup fails. Touch and keyboard users need equivalent access.

## 5. Build the complete usable interface

Implement the requested interactions with honest behavior. If a backend action
is unavailable, disclose that boundary instead of showing fabricated success.
Use semantic elements, visible focus, useful labels, and sufficient contrast.
Do not rely on hover or color alone. Keep interactive targets comfortably usable.

Handle relevant loading, empty, error, success, selected, and disabled states.
Validate forms with actionable messages. Give dialogs sensible focus behavior.
Use progressive enhancement and preserve existing accessibility conventions.

Adapt composition to content and viewport, not just device labels. Check small
phones, wider screens, long labels, and text zoom. Prevent unintended overflow.
Keep essential actions reachable and sticky UI from covering content or focus.

Size media deliberately, reserve its layout space, and defer heavy optional
content. Avoid shipping large animation or 3D dependencies for trivial effects.

## 6. Review the result, not just the source

Use available browser or preview tools to inspect the rendered interface at
representative narrow and wide viewports. Exercise the main action, navigation,
keyboard flow, relevant states, and reduced-motion behavior.

Review hierarchy, typography, alignment, spacing rhythm, asset relevance, and
consistency. Fix the most visible weakness before adding ornament. Compare
against the user's reference when supplied; preserve its important relationships.
Compare the rendered page against the project rationale. Check that chosen
fonts actually loaded, their weights exist, text remains readable, financial
figures align, and the real color pairs meet the intended contrast targets.
When retesting this skill, apply its updated decisions to a representative
interface and exercise it; rereading the instructions alone is not a retest.

For a premium deliverable, review originality at the page and component levels:

- Remove the logo and mentally replace the copy with a different industry.
  If almost nothing else would need to change, revisit the concept or signature
  component. This is a diagnostic, not a ban on proven layout patterns.
- Inspect a full-page view as well as individual screens. If it becomes a
  repeated stack of equally weighted rectangles, revise the narrative rhythm.
- Turn off motion. The hierarchy and identity must survive. Then turn it on
  and verify that motion explains relationships rather than concealing weak design.
- Test the focal component's real behavior on touch and keyboard, with long
  content and reduced motion. A beautiful static mock is not a working component.
- Look for optical craft: image focal points, baseline alignment, type wrapping,
  spacing inside controls, icon weight, border intersections, selected states,
  transition interruptions, and responsive crops.

Review concept, composition, component craft, content/assets, interaction,
and usability as separate dimensions. Use rendered evidence and mark untested
items. Do not invent a jury score or declare "Awwwards-level" from a self-rating.
Fix the weakest consequential dimension before adding more decorative effects.
For major redesigns, compare before/after structure, not only color screenshots.

Run checks appropriate to the changed behavior and repository requirements.
Check console errors and unintended overflow where tools permit. Do not claim
visual verification, performance measurements, or accessibility compliance
without evidence. If preview access is unavailable, state that limitation.

## Do not

Treat these as explicit guardrails. A user's deliberate visual preference may
override an aesthetic default; it does not make broken behavior acceptable.

### Design shortcuts

- Do not reuse the same hero, card grid, palette, and section order for unrelated
  brands. Derive the composition from the product and its content.
- Do not repeatedly fall back to green-and-cream palettes or large serif
  headlines when the brief leaves the direction open. Make a fresh decision.
- Do not select fonts or colors before understanding the project, randomize
  the palette for novelty, or treat a previous project's design as a default.
- Do not choose an off-the-shelf page skeleton first and force all content into
  it. Do not report a reskin as a structural or experiential redesign.
- Do not confuse bespoke UI with rebuilding native controls, implementing
  needless infrastructure, or making standard interactions harder to recognize.
- Do not make every section compete for attention or place every piece of
  information in a card. Distinction requires hierarchy and purposeful restraint.
- Do not provide vague font guidance such as "use a premium font." Name the
  families, roles, weights, sizing, spacing, fallbacks, and loading approach.
- Do not equate premium with black backgrounds, gold accents, tiny labels,
  oversized whitespace, or expensive-looking fonts. Use them only when appropriate.
- Do not apply gradients, glass, noise, shadows, borders, or pill shapes to every
  surface. Give each treatment a clear role and preserve visual hierarchy.
- Do not use arbitrary asymmetry, random colors, or unusual navigation merely
  to appear original. Users should understand the interface without explanation.
- Do not replace useful product content with abstract decoration, filler copy,
  irrelevant stock imagery, or emoji presented as a professional icon system.
- Do not copy another brand's identity or use assets without appropriate rights.

### Motion and interaction mistakes

- Do not describe a page as animated because it has hover transitions. Deliver
  the expected GSAP, Lenis, and React-specific Framer Motion behavior, or state
  the concrete constraint that requires a different implementation.
- Do not add 3D or unrelated plugins merely to demonstrate a dependency.
- Do not hijack scroll direction, conceal the scrollbar, replace the cursor, or
  autoplay sound as a default styling choice. Any deliberate exception must
  preserve navigation, user control, and accessible alternatives.
- Do not gate essential content behind a long intro, repeated reveal, hover,
  drag gesture, or scroll animation. Provide a direct way to reach it.
- Do not animate every element, loop decorative motion without purpose, or
  create flashing effects. Respect reduced-motion preferences throughout.
- Do not make controls move away from the pointer, change layout unexpectedly,
  or delay feedback while an ornamental animation finishes.

### Implementation shortcuts

- Do not flatten the desktop page into a miniature mobile layout. Recompose
  hierarchy, navigation, spacing, and controls for the available space.
- Do not hide overflow to conceal a layout defect, remove focus outlines without
  a visible replacement, or shrink text until it fits.
- Do not use clickable generic elements where native links or buttons fit.
  Do not ship unlabeled icon controls or hover-only essential actions.
- Do not ship dead controls, placeholder destinations, fabricated success
  messages, or production-facing sample claims as completed functionality.
- Do not rebuild working components or introduce competing styling and animation
  systems without a concrete need. Keep fixes within the requested scope.
- Do not load full-resolution media, large dependencies, or continuous rendering
  for minor decoration. Evaluate the cost against the user's experience.

### Review shortcuts

- Do not call the result finished after checking only compilation or a desktop
  screenshot. Verify relevant interactions and responsive behavior when tools permit.
- Do not hide known defects or describe unperformed checks as passed. State
  unavailable previews, missing integrations, and remaining limitations plainly.

## Completion

Deliver the working result in the requested format. Briefly report the chosen
direction, implemented behavior, completed validation, and material limitations.
Keep explanations proportional to the change. Do not claim this skill guarantees
quality: the rendered result and observed behavior are the evidence.
