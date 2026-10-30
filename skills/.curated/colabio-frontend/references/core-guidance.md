# Core guidance (moved out of SKILL.md to keep it short)

The full decision guidance. `SKILL.md` says when to open each part.

## 1. Establish the product and the scope

Inspect the actual application, reusable components, tokens, dependencies, assets,
and relevant content. Establish the audience, primary task, content density,
verified capabilities, brand constraints, supported languages, accessibility,
and performance needs before choosing a visual style. Distinguish working
product behavior from a demonstration or planned feature.

For a substantial redesign, inspect the existing page and any supplied live site
or reference rendered on desktop and mobile. Record a compact baseline: what the
visitor understands first, how the product proves its value, the main action,
recognizable brand elements, and strengths to retain. Source code or extracted
copy alone does not establish visual quality. If the page cannot be rendered,
state the limitation and use the available evidence without inventing a review.

Keep the existing logo, recognizable colors, and established type roles by default.
A request for a better interface does not itself request a new brand. Change an
identity element when the user asks or a concrete problem justifies it; explain
the tradeoff. Preserve important capabilities, navigation paths, and content
discovery when simplifying the page. Less content is not inherently clearer.

For a landing page, establish what the product is, whom it serves, and the useful
outcome before choosing its dominant image or headline. Visitors should recognize
the product category from the first screen. A broad industry photograph or an
emotional slogan cannot carry that explanation alone. For example, an investment
research platform needs its research or analysis value to remain apparent rather
than relying on a beautiful property photograph to explain the business.

Keep a component fix local. A review stays read-only unless fixes are requested.
For substantial creative work, follow [conversational intake](brief-intake.md):
ask 1-3 relevant questions initially, with follow-ups only for material ambiguity. Reuse settled answers and
respect users who delegate choices or request no questions. State reasonable
assumptions and continue; do not invent a brand or block on routine taste choices.

Write a brief rationale connecting product needs to composition, typography,
color, content, and interaction. An industry stereotype is not evidence for a
palette. Quiet minimal, editorial, playful, technical, and expressive are visual
characters, not quality tiers or guarantees of monetary value.

## Premium one-pass build (new premium sites and substantial redesigns)

Follow conversational intake first, show the selected skills and written design
preview, then wait for approval or revisions before implementation; state important
assumptions. Full detail: `references/agency-playbook.md`; this section
is the working summary. Run `scripts/pick-direction.mjs --seed "<product>" --mood <words>`
for a seeded starting direction and `scripts/slop-lint.mjs <src>` in the critique loop.

1. **Inspect first, then lock the idea**: capture the actual incumbent/reference
   before selecting a direction, apply the acceptance contract above, then write
   one sentence in the product's own nouns (no "premium",
   "immersive"). Visitor, single action, proof needed.
2. **Choose by decision, not mood**: pick ONE style character (editorial print,
   swiss precision, industrial brutal, Apple-fluid, cinematic composition, atmospheric
   soft, playful kinetic, GSAP-experimental) and at most two supporting influences.
   Mixed style guides average into a template. Brand and brief override all
   defaults. When the brief is open, vary the result from the usual
   Inter/dark/purple-glow: starting font pairs (Google/Fontshare) include
   Bricolage Grotesque + Instrument Sans, Instrument Serif + Geist, Syne + DM Sans,
   Cabinet Grotesk + Satoshi, Clash Display + General Sans, Newsreader + Public Sans,
   Big Shoulders Display + Barlow, Schibsted Grotesk + JetBrains Mono. Name exact
   weights, fallbacks, and loading.
   Treat the picker's palette as one candidate; apply the color decision in
   Section 3 before accepting it.
3. **Spec before code**: tokens (bg, surface, text, muted, accent, border with
   contrast ratios: text 7:1, muted 4.5:1), fluid type with `clamp()`
   (display line-height 0.92-1.05, tracking -0.02 to -0.05em, `text-wrap: balance`,
   tabular numerals), a 4px spacing base with section padding that varies by role,
   radius by role, motion tokens, scene list, mobile recomposition, and a budget
   (LCP < 2.5s with a 1.5s target, CLS < 0.05, INP < 200ms, 60fps on a mid phone).
4. **Assets and copy before layout**: reuse repo assets; build real-data UI frames
   and custom SVG in code; generate hero art with an image tool (crop, light, focal
   point stated; real alt text); lazy 3D only for a single owned object; stock is
   last resort and never the hero. No gray boxes or placeholder hosts. Copy comes
   from real facts: headline with a noun or number; ban unlock, elevate, seamless,
   supercharge, revolutionize, next-gen, cutting-edge, empower, streamline,
   effortless; outcome-named buttons; proof beside every claim, never invented;
   written empty/error/loading states.
5. **Vertical slice first**: hero + signature component + next transition with real
   content, rendered at 1440 and 390 and critiqued before building the rest. The
   signature component is original to this product (configurator, scrubbable
   before/after, annotated object explorer, case narrative, scenario calculator,
   morphing sticky stack, document-to-result transformer, and similar).
6. **Mine component library sites**, then transform: shadcn directory, 21st.dev,
   Magic UI, Aceternity UI, React Bits, Motion Primitives, Animate UI, Cult UI,
   Skiper UI, Vengeance UI, Codrops demos, Uiverse. Shortlist 3-6 mechanisms
   against the scene list, check license/deps/touch/keyboard/reduced motion,
   preview with `npx shadcn@latest add <item> --dry-run`, install finalists only,
   then replace content, tokens, easing and ownership. Never ship an unchanged demo.
7. **Match motion to the accepted brief**: premium alone needs no cinematic stack.
   Use CSS for simple feedback and preserve installed libraries. For a cinematic
   Lenis + GSAP build, use one clock: Lenis driven by the GSAP ticker; WebGL loops
   share it, mount in view, pause off-screen, cap pixel ratio at 2, dynamic-import,
   and keep a static fallback. Animate transform/opacity/clip-path. Vary reveal
   grammar by scene (mask wipe, scrub, split line, number roll); no blanket
   fade-up. Skip long intro loaders. Reduced-motion path throughout.
8. **Critique loop (required, 2+ rounds)**: render at representative desktop,
   tablet and narrow widths (1440/1024/768/390 are starting targets; record actual
   CSS dimensions), plus a full-page composition and scene checkpoints. Follow
   `visual-comparison-gates.md`: each dimension must be improved/preserved for a
   redesign or pass for a new build. No average or self-awarded score overrides
   a failure. Inspect before/middle/settled and reduced-motion states for cinematic
   work. Scan source for
   template tells: gradient headline text, Inter-only, indigo/purple defaults,
   rounded-2xl everywhere, repeated 3-up icon-tile cards, glow blobs, identical
   section padding, uniform fade-ups, emoji icons, filler copy, no imagery.
   Fix them or justify. Report only what was observed; never claim an award.

## 2. Choose the experience before its decoration

For a new full page or substantial redesign, consider two genuinely different
information architectures. Vary the visitor's journey, dominant object, content
relationships, or interaction model, rather than recoloring the same wireframe.
Choose against the product goals without requiring approval for routine choices.
Compare the options with the baseline's strengths as well as its weaknesses.
For a redesign, name concrete task-level improvements before building and
compare the complete visitor journey rather than only the opening screen.
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

For software, make the actual workflow, relevant interface, or credible interactive
demonstration prominent enough to explain the product early in the journey.
For other products, choose evidence appropriate to the offer, such as the object,
work, process, or service outcome. A useful secondary tool does not compensate for
obscuring the main offer. Label sample data and simulated actions; demonstrate
the mechanism without inventing customers, results, or capabilities.

Define its hierarchy, real content, interaction states, keyboard/touch behavior,
mobile recomposition, motion ownership, and reduced-motion or static equivalent.
Build that component and its adjoining transition as a vertical slice; inspect
it rendered alongside the opening screen before extending the composition across
the complete deliverable. For a redesign, compare this slice with the baseline:
is the product at least as recognizable, and is its value easier to understand?
Correct a category or brand regression here rather than polishing the wrong idea.
If it is interchangeable with a stock block, improve its anatomy or behavior.
Continue through all requested pages, secondary routes, and the footer in scope.

## 3. Establish a deliberate visual system

Set typography and palette after the concept and architecture, using real
headings, long labels, paragraphs, currencies, and languages to test the choices.

For a new full page or substantial redesign with an open color direction, decide
colour only after the Understanding Sheet and scene plan exist. Generate candidates
with `scripts/palette-lab.mjs --domain "<idea>"` (real materials of the field, contrast
checked, category defaults flagged), then compare at least two materially different
real candidates before coding; a straw alternative does not count. State their dominant
surfaces and accents, connect each to the actual work, audience, assets, or stated
character, then choose one and explain the tradeoff. Keep this a brief decision,
not two complete builds or an extra approval gate. Preserve settled brand colors
and the scope of small fixes; do not invent alternatives when color is settled.

The kit and seeded picker supply candidates, not evidence of fit. "Premium",
"calm", "high contrast", or an industry stereotype alone does not justify a hue.
Explain why the chosen colors and their visual prominence suit this content.
Consider tinted backgrounds, text, and borders as well as accent swatches: a
large colored CTA can dominate an otherwise neutral page. If comparable previous
work is available, check for unexplained repetition; preserve deliberate brand
continuity and do not claim a repetition check when no prior work was inspected.

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

Restraint does not mean visual timidity. Preserve a reference's useful ambition:
expressive type, product detail, custom composition, imagery, or motion when they
serve the brief. Improve the hierarchy around that character rather than reducing
every project to large sans-serif headings, muted surfaces, and image/text rows.
Learn the reference's mechanisms and why they work; do not copy its styling as a
universal preset or claim that matching its palette achieves comparable quality.

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

For motion-led work read [cinematic-motion.md](cinematic-motion.md): agree actual
assets, crops, anchors and meaningful before/middle/settled states with art before
building. Native-touch choreography and reduced/static equivalents are distinct.
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

## 6. Use the bundled toolkit, add dependencies only for the build

Everything above is in this folder. Do not install other skills. Choose a style
recipe from `references/styles.md` (one primary, at most two influences), use
`references/design-kit.json` as candidates for type and color, and choose against
the brief and brand using Section 3. Copy integration patterns from
`references/motion-recipes.md`.
Mine component libraries per `references/libraries.md`.

Website runtime libraries (gsap, lenis, motion/framer-motion, three, shadcn
source components) are different from skills: add only the ones the build needs,
locally, with the project's package manager, reusing what is installed. Never
install globally, never run `--all` or `--force`, and inspect registry source and
diffs before writing. Verify current APIs in official docs when unsure and say
so if you cannot. Skill selection, dependency install, and rendered use are
different states; report only what actually happened.

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

For a full-page review, revisit the palette decision against the rendered result,
including dominant surfaces, neutral tints, CTA area, and relevant states. Passing
contrast checks does not justify an arbitrary or repeated theme. Treat a palette
without a project-specific rationale as an unresolved design finding; correct
the affected color system and recheck it before sign-off. Respect explicit user
and brand choices. No color family is universally required or forbidden.

For a redesign, compare the baseline and result at matching desktop and mobile
viewport sizes, with motion settled and zoom accounted for. Assess product and
audience recognition, brand continuity, strength of evidence, action clarity,
feature discovery, visual craft, and usability separately. Name concrete gains,
regressions, and intentional tradeoffs; do not average them into an unsupported
quality score. Correct unintended losses of product identity, essential paths,
or brand recognition before calling the result an upgrade. If a tradeoff remains,
report it plainly instead of treating cleaner spacing as proof of a better page.
Visual inspection can support a design judgment; conversion and performance
claims require their own measurements.

For React/Next.js changes, consider relevant request waterfalls, server/client
boundaries, serialization, unnecessary rerenders, deferred heavy code, and media
loading. Measure material performance claims with available tools; do not trade
working behavior for speculative micro-optimizations. Run repository checks
appropriate to the change. Reuse an existing test/browser setup when suitable.

For substantial work, preserve a compact record in the task's output, including
the direction, references applied, dependency changes, rendered checks,
observed failures, fixes/rechecks, and remaining limitations. This can be delivery
notes for small tasks; substantial creative builds use `visual-review.json` and
the acceptance contract above. Do not modify
the global skill directory with task artifacts or demand routine user approvals.

Deliver the whole requested working result. State what changed and what was
verified. Identify unavailable checks and integration boundaries plainly. Do not
claim compliance, visual review, measured performance, independent scores,
awards, or guaranteed outcomes without the corresponding evidence.
