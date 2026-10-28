# Cinematic direction: compose a sequence, not an effect collection

Read for cinematic, expressive, flagship, portfolio or motion-led briefs, or when
the incumbent/reference already has that character. Cinematic is a way of
directing attention through scale, framing, continuity and pacing. It does not
require black, gold, WebGL, a loader, tiny type or hidden content. A quiet business
interface can have high craft without taking this route.

## Choose a story engine

Choose one recipe from the content and assets. Write the subject that continues
between scenes, the visitor's action and the proof it reveals. Borrow a technique
from another recipe only if its role is explicit. Do not paste a full recipe onto
every brief. The examples below are original teaching compositions, not templates
or instructions to reproduce another brand.

### 1. Editorial portrait / author as the subject

**Fits:** independent creators, engineers, photographers, studios with a real person
or body of work to show. **Needs:** a supplied portrait, real project captures and
accurate project facts. Never generate a substitute identity for a real person.

- Opening: a condensed name or project title occupies roughly 18–26vw. A portrait
  crosses its baseline, with one line of type behind the image and one in front.
  Keep the person's face and the primary action unmasked. Put the role and a short
  useful statement in a quiet side column rather than another giant slogan.
- Type roles: condensed heavy display for presence, a contrasting editorial face
  for personal statements, readable sans for descriptions. Useful starting study:
  Barlow Condensed 700/800 + Italiana 400 + an existing body sans. This pairing is
  not the default; verify glyphs, loading and real text before choosing it.
- Sequence: poster → selected work → person/process → experience → closing title.
  Contrast an open poster with a denser work stage; vary alignment and media area.
- Motion score: image enters the established type frame; title resolves once;
  image and title separate slightly on scroll; a background change introduces the
  work. Use at most one substantial spatial transition in the opening.
- Signature: projects unfold as usable case narratives with actual interfaces,
  constraints, role and links. A grid of decorative node labels is not equivalent.
- Phone: portrait becomes an in-flow image, type fits without shrinking
  supporting text, work becomes stacked cards or an explicit swipe gallery, and
  all links remain reachable. Optional side navigation becomes a regular top nav.
- Failure test: replace the name and portrait. If the work, project explanation
  and interaction can remain unchanged for an unrelated person, add actual proof.

### 2. Product close-up / one object changes meaning

**Fits:** hardware, craft, physical products. **Needs:** licensed photography,
supplied renders, a lightweight model, or generated product art where appropriate.

- Opening: one large object with a deliberate crop and light direction. Type and
  object share the composition; do not place an unrelated slogan above a tiny model.
- Sequence: whole object → meaningful detail → process/material → choice → purchase.
  Preserve the same object or visual anchor across at least one transition.
- Motion score: a short entrance, a measured close-up, then a state change tied to
  actual information. Camera movement must reveal a feature, not just orbit.
- Signature: a real configurator, material comparison or functional cutaway. Its
  selected state changes the object and the resulting facts together.
- Alternative: consistent stills plus a masked detail reveal can outperform 3D.
- Phone: inline product, large choice controls, ordinary document scroll,
  poster fallback, no required drag, no canvas-only price/specification text.

### 3. Software walkthrough / input becomes an inspectable result

**Fits:** software, AI, developer products. **Needs:** actual app captures, verified
workflow states, or a clearly labelled working local demonstration.

- Opening: show a meaningful application state at readable scale. Put the promise
  beside the part of the interface that proves it. Background code rain, planets,
  floating logos and generic network diagrams do not prove software capabilities.
- Sequence: user input → relevant processing/decision → result → user correction.
  The same document, property, itinerary or scenario persists throughout.
- Motion score: focus follows a meaningful interface region; an annotation points
  to the decision; layout expands into the result. Avoid simulating live AI as if
  a backend ran. Scrubbed examples must be identified as demonstrations.
- Signature: editable input or a real scenario switch updates the result and its
  explanation. Explain one actual tradeoff, not four generic boxes joined by lines.
- Phone: show the same states as a sequence or accessible stepper, with
  enough text/UI scale to read them. Provide a direct link to the real product.

### 4. Project screening room / an ordered collection

**Fits:** selected case studies, film/design work, an ordered product collection.
**Needs:** a small collection with images, consistent crops and useful case text.

- Opening into work: a strong section title sets up a stage; one or two projects
  dominate the viewport. Cards contain actual work, not generic scenery.
- Desktop progression can pin the stage while a track advances horizontally.
  Use native vertical scrolling as the input. Set travel from
  `track.scrollWidth - stage.clientWidth`, not a guessed percentage. Disable pinning
  when travel is zero, the viewport is too short, or the content will be clipped.
- Keep links/controls reachable. An offscreen focused card must be scrolled into
  the visible track or activate an equivalent selected case panel. Provide named
  previous/next controls or a direct case index; do not require precision scrubbing.
- Cut to an unpinned quiet scene after the collection. Pinned galleries everywhere
  make the work harder to browse and erase the sense of a sequence.
- Phone: reflow the cards vertically by default, or use an explicit
  touch-scroll region with visible navigation. Never retain a desktop-wide pinned
  track while simply reducing font sizes.

### 5. Film-title sequence / chapters with a continuous subject

**Fits:** narrative portfolios, campaigns, stories where chapter order matters.
**Needs:** a real subject and enough content to sustain the chapters.

- Plan opening title, setup, proof, strongest scene and closing action together.
  Frame/caption motifs can connect them, but film bars and timecodes are optional.
- At each cut one element persists: image crop, title baseline, object, document or
  grid. Describe its before/transition/after state. Generic independent fade-ups
  are not continuity. A title sequence without useful work is only an intro.
- Text: mask the short title once, then give body copy a stable readable hold.
  A line must have enough ascender/descender room; inspect its fully settled state.
- Direct navigation must land on a usable settled scene, not a blank pinned frame.
  Never make a visitor perform a long scroll just to reveal a required button.
- Phone: in-flow chapters, visible headings, ordinary anchors and final
  readable states. Identity must survive without scrub, pinning or title splitting.

### 6. Material/process study / visual change proves the craft

**Fits:** fabrication, food, science, repair, art processes and services with
visible steps. **Needs:** accurate process stages, matched images or an authored
diagram of the real mechanism.

- Sequence: initial material → transformation → detail → result. Use matched
  framing so the visitor reads the change instead of relearning each composition.
- Signature: a scrubbable before/after, layer-depth study, or parameter-driven
  process view. Controls change meaningful data; sample quantities are labelled.
- Pair one strong visual moment with a quiet spec or evidence panel. Do not turn
  every process step into an equal icon card.
- Phone: labelled stills/steps, real controls, no concealed evidence.

Phone adaptations can retain appropriate native-scroll entrances and state transitions.
Separately, reduced-motion, missing-library and no-script modes expose complete settled
content with ordinary navigation; they are not the definition of mobile. For concrete
geometry, peer ownership and playback evidence use [cinematic-motion.md](cinematic-motion.md).

## Direct the motion before importing a library

Write a score for each major scene, using this structure:

| Beat | Content/subject | Framing and layers | Timing/scroll span | Ownership | Phone; separate reduced/static state |
| --- | --- | --- | --- | --- | --- |
| Establish | What the visitor understands immediately | Focal image, title, action, negative space | Visible before animation | CSS/HTML | Same meaning, stable |
| Enter | The one subject that moves | Element and actual start/end geometry | Usually 0.5–1.0 s; no input gate | GSAP wrapper | Touch entrance; reduced/static final state |
| Hold | What they need time to read | Stable copy and reachable controls | As long as reading needs | No competing tween | In-flow copy |
| Transform | What new fact is revealed | One anchored relationship changes | Scroll distance justified by content | One timeline | Native sequence; reduced/static labelled states |
| Resolve | Where this scene leaves the subject | Clear action/next-scene connection | No invisible dead scroll | Scoped cleanup | Normal anchor target |

These durations are starting points, not a universal tempo. Strong compositions
come first; do not use longer scroll distances to make a weak scene feel expensive.
Use labelled timelines and normalized checkpoints for before/middle/after captures.

## Asset, typography and continuity gates

Before scaling the page, inspect the opening + strongest evidence + one transition
in-browser. Check it with motion paused/removed too:

1. Does the image demonstrate this person/product/work, at an authored crop?
2. Is the dominant type intentional in family, weight, measure and contrast with
   body text, rather than just huge? Read it at narrow width and 200% text zoom.
3. Is there a foreground/midground/background relationship that survives a still?
   Depth can come from overlap, crop and scale; effects are not required.
4. Does the transition carry the subject or information into a new context?
5. Can the visitor access the same facts/action without the choreography?

Reject the slice if any answer is unresolved. Replace composition/assets/content
before adding particles, 3D, blur or a higher animation count. Use
[visual-comparison-gates.md](visual-comparison-gates.md) for redesign acceptance,
and [motion-recipes.md](motion-recipes.md) for scoped lifecycle patterns.
