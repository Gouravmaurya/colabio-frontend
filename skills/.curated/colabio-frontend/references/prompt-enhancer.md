# Prompt enhancer: idea in, Cinematic Design Prompt out

A thin idea ("a website for my tea ware shop") produces an average site. This
stage converts any idea, however short, into a **Cinematic Design Prompt (CDP)**:
a complete art-direction and UX brief that the build can follow without guessing.
Run it for every new site or major redesign. Skip it for small fixes, or when the
user already supplied a detailed brief (then validate it against the schema below
and fill gaps as assumptions).

## Procedure

1. **Read the idea** and anything attached (links, screenshots, repo, brand
   files). Inspect a supplied live site rendered, not only its source.
2. **Score gaps** with `brief-intake.md` (product, audience, action, look, scope,
   content, interaction, stack). Three or more gaps and the user is available:
   ask one round of 3-4 questions (recommended option first). Otherwise do not
   ask; enhance and list assumptions.
3. **Pick the building blocks** from the skill, not from habit:
   `node scripts/select-build.mjs --brief "<idea>"` for the type, style, starter,
   stack, motion level, pages and reading order; `scripts/pick-direction.mjs` for fonts and
   palette (it is called by the selector). Replace any pick with a one-line reason
   tied to the product.
4. **Write the CDP** to `design-brief.md` in the project (never the skill folder),
   using the schema below. Keep each section concrete: nouns, numbers, verbs.
5. **Show a 10-line summary** (logline, look, signature, scenes, pages, stack,
   assumptions) and continue to the build. Wait only if an assumption changes cost
   or brand. End the whole job with a "next time say" prompt.

## The schema

```
CINEMATIC DESIGN PROMPT: <working title>

1  Logline        One sentence in the product's own nouns. No "premium", "immersive".
2  Visitor        Who arrives, in what moment, wanting what. Primary action as a button label.
                  Success measure (what a good visit looks like).
3  Tone           Three concrete qualities with an example of each ("quiet: one idea per screen").
                  Two things to avoid.
4  Art direction  Light (source, hardness, colour temperature) · material/texture ·
                  camera language (macro, wide, orthographic, overhead) · colour story with
                  roles (surface, ink, accent, state) · type voice (display, text, label).
5  Scene score    5-8 scenes. For each: question it answers · composition · dominant asset ·
                  motion verb (establish, enter, hold, transform, resolve) · hand-off to
                  the next scene · phone recomposition.
6  Signature      One interaction or object specific to this product: what changes, what the
                  visitor learns or does, its states (idle, hover, active, loading, error),
                  keyboard and touch behaviour, static/reduced-motion equivalent.
7  Pages and UX   Page list with purpose · navigation model · primary flow in steps ·
                  secondary flows · forms with validation and honest results · empty, error,
                  loading and success states.
8  Motion system  Owners (scroll = Lenis, scroll-linked = GSAP, component = Motion or CSS) ·
                  duration/easing tokens · entrance grammar per content role · intro policy
                  (skippable, timer-released) · reduced-motion plan · performance limits.
9  Content        Supplied vs sample (label samples on the page) · copy voice with 3 example
                  lines · proof: what makes claims believable. Never invent customers, logos,
                  awards, reviews or statistics.
10 Stack          Single HTML, React, Next, or existing repo; libraries and why; hosting.
11 Acceptance     Measurable: viewports 1440/1024/768/390; LCP < 2.5 s on a throttled run if
                  measured; contrast text 7:1, muted 4.5:1; no console errors; every
                  interaction driven; reduced-motion and no-library paths work; scanners clean.
12 Assumptions    Every guess, one line each, so the user can correct in one reply.
```

## Quality rules for the CDP

- Every scene has a verb and a hand-off. A list of section names is not a scene score.
- The signature is a mechanism, not an adjective. "Drag to turn the jar, glaze and
  size change price and capacity" passes; "interactive 3D" does not.
- Colour, type and light are decisions with reasons tied to the product.
- Pages exist for visitor tasks, not to look complete. Every page has a job and a next step.
- No section that exists only because websites have one.
- Anti-clone rule (`craft-bar.md`): nothing may be taken from a reference studied
  or from a template's identity.

## Example: idea to CDP (abridged)

**Idea:** "I sell hand-thrown tea ware, make me a website that feels like holding a cup."

```
1  Logline    Nami Kiln throws tea bowls, cups and moon jars once a month and sells each firing.
2  Visitor    A tea drinker choosing a first good bowl. Action: "Design your piece". Success: a
              piece in the cart after turning it and trying a glaze.
3  Tone       Quiet (one object per screen) · tactile (surfaces you can feel) · exact (real
              dimensions and capacity). Avoid: rustic clichés, stock hands.
4  Art        Soft overhead key light, jade rim; matte stoneware; macro product lens; indigo ink
              surface with rice-paper surface; jade accent, persimmon for state; serif display
              with a clean sans.
5  Scenes     1 Establish: the jar turns on a plinth. 2 Enter: sentence about two hands.
              3 Hold: configurator. 4 Transform: clay to glazed jar as you scroll. 5 Resolve:
              the monthly shelf. 6 Close: kiln email list.
6  Signature  Real 3D lathe-turned piece: shape x glaze x size updates height, width, capacity,
              price; drag to turn; falls back to SVG drawings without WebGL.
7  Pages      Home with configurator, collection; cart drawer with demo checkout.
...
```

## Example: software idea (abridged)

**Idea:** "A tool that turns support tickets into a weekly product report."

```
1  Logline    Ticketlens reads a week of support tickets and writes the three things to fix.
2  Visitor    A product manager drowning in tickets. Action: "See a sample report".
6  Signature  Document-to-result transformer: paste ten sample tickets on the left, the grouped
              report assembles on the right with counts and quotes; labelled sample data.
7  Pages      Home, How it works, Pricing (sample), Sample report, Docs entry.
```

## Handing off

The CDP is the single source for the build. During the build, change it only in
writing (a line in the assumptions section) when reality disagrees. Deliver it with
the site so the user can reuse and edit it.
