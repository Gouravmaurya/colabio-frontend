# Prompt enhancer: idea in, Cinematic Design Prompt out

A thin idea ("a website for my tea ware shop") produces an average site. This
stage converts any idea, however short, into a **Cinematic Design Prompt (CDP)**:
a complete brief that the build can follow without guessing. Run it for every new
site or major redesign. Skip it for small fixes, or when the user already supplied
a detailed brief (then validate it against the schema and fill gaps as assumptions).

**Order is the point:** understand what is being built, plan the scenes and pages
around it, and only then decide theme, colour, type and motion character
(`product-understanding.md`). A CDP whose art direction was written before its
understanding and plan is rejected and redone.

## Procedure

1. **Read the idea** and anything attached (links, screenshots, repo, brand
   files). Inspect a supplied live site rendered, not only its source.
2. **Understand** (`product-understanding.md`, Step 1): write the Understanding
   Sheet: what it is, who uses it, where and on what device, the decision they
   face, the proof that convinces them, the domain's vocabulary and materials,
   category defaults to avoid, emotional register, constraints, first-screen
   obligation. Ask the user only for gaps that change the build: score them with
   `brief-intake.md`; three or more material gaps and the user is available means
   one round of 3-4 questions (recommended option first); otherwise state assumptions.
3. **Plan** the scene score and page list from the sheet (its question sequence,
   proof and first-screen obligation). No colour or type yet.
4. **Select** with `node scripts/select-build.mjs --brief "<idea>"` for type, starter,
   stack, motion level, libraries, pages and reading order. Treat its style, font and
   palette picks as candidates only.
5. **Decide the theme** (`product-understanding.md`, Step 3) with
   `node scripts/palette-lab.mjs --domain "<idea words>"`: pick one of its candidates
   (or your own from real swatches), name which material each colour comes from, justify
   the surface (light, dark, or light with a dark scene) from the use context, and reject
   any `categoryDefaultFlags` unless required. Fonts follow register and density.
6. **Write the CDP** to `design-brief.md` in the project (never the skill folder),
   using the schema below. Keep each section concrete: nouns, numbers, verbs.
7. **Show a 10-line summary** (logline, understanding, scenes, theme with reasons,
   signature, pages, stack, assumptions) and continue to the build. Wait only if an
   assumption changes cost or brand. End the job with a "next time say" prompt.

## The schema (written in this order)

```
CINEMATIC DESIGN PROMPT: <working title>

1  Logline        One sentence in the product's own nouns. No "premium", "immersive".
2  Understanding  The ten answers: what it is and replaces · who uses it · where/device/light ·
                  the decision they face · proof that convinces · domain vocabulary and
                  materials · category defaults to avoid · emotional register · constraints ·
                  first-screen obligation.
3  Visitor        The moment they arrive in. Primary action as a button label. Success measure.
4  Scene score    5-8 scenes. Each: question it answers · composition · dominant asset ·
                  motion verb (establish, enter, hold, transform, resolve) · hand-off to the
                  next scene · phone recomposition.
5  Signature      One interaction or object specific to this product: what changes, what the
                  visitor learns or does, its states, keyboard and touch behaviour,
                  static/reduced-motion equivalent.
6  Pages and UX   Page list with purpose · navigation model · primary flow in steps ·
                  secondary flows · forms with validation and honest results · empty, error,
                  loading and success states.
7  Art direction  Derived, not chosen. Surface decision (light / dark / light + dark scene) with
                  the use-context reason · palette: three candidates from palette-lab, the
                  chosen one, which real material each colour comes from, flags rejected ·
                  light, material and camera language · type voice tied to register and
                  density · motion character tied to register.
8  Motion system  Owners (scroll = Lenis, scroll-linked = GSAP, component = Motion or CSS) ·
                  duration/easing tokens · entrance grammar per content role · intro policy
                  (skippable, timer-released) · reduced-motion plan · performance limits.
9  Content        Supplied vs sample (label samples on the page) · copy voice with 3 example
                  lines. Never invent customers, logos, awards, reviews or statistics.
10 Stack          Single HTML, React, Next, or existing repo; libraries and why; hosting.
11 Acceptance     Measurable: viewports 1440/1024/768/390; contrast text 7:1, muted 4.5:1;
                  no console errors; every interaction driven; reduced-motion and no-library
                  paths; scanners clean (slop-lint, check-contrast, palette-lab --check,
                  finish-gate).
12 Assumptions    Every guess, one line each, so the user can correct in one reply.
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
