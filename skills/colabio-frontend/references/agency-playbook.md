# Agency playbook: premium build in one pass

How top studios deliver: one idea, a spec before code, a designer's eye on the
rendered result, and a performance pass at the end. This is the default pipeline
for a new premium site or substantial redesign. Run all phases in one response
unless the user asked for questions. If they delegated choices, assume and state
assumptions in the first message. Small fixes skip this file.

Research basis (2026-10): practitioner write-ups of jury-scored winners and
third-party summaries of the Awwwards rubric (Design 40, Usability 30,
Creativity 20, Content 10, per secondary sources; verify on awwwards.com).
Lessons used here: a single opinionated idea beats a pile of effects; usability
and performance sink more entries than creativity; a flawless 2D site beats a
janky 3D one; stock imagery, placeholder text and broken mobile are penalized;
winners write a measured spec first and check every section against it.

## Phase 0: lock the brief (2 minutes)

One sentence idea in the product's own nouns. The visitor, the one action, the
proof they need. Reuse existing brand, content and assets in the repo. List
assumptions. No adjectives like "premium" or "immersive" in the idea sentence.

## Phase 1: direction by decision, not mood

1. Run `node <colabio>/scripts/pick-direction.mjs --seed "<product name>" --mood <2-3 words from the brief>`.
   It returns a style, font pair, palette, signature-mechanism prompt and hero
   composition from `references/design-kit.json`.
2. Accept, adjust, or replace each item **with a one-line reason tied to the
   product**. A brand's own fonts and colors always replace the kit.
   For an open color brief, compare two materially different palettes before
   choosing. Name their dominant surfaces and accents, the evidence for each,
   and the tradeoff behind the selection. A seed, a palette name, or "premium"
   is not that evidence. Preserve settled colors and local-fix scope; do not
   add a user approval gate or build both directions.
3. Load exactly **one primary style guide** (the picker's `guide`) and at most
   **two supporting guides**. Everything else in modules.json is "not needed this
   build". The selector script lists candidates; this cap overrides its breadth.
4. Rewrite the signature mechanism using the product's real content: what changes,
   what the visitor learns, what they can do with it.

## Phase 2: spec before code

Write `design-spec.md` in the target project (not the skill folder):
palette tokens (bg, surface, text, muted, accent, border) with contrast ratios;
type roles with exact family, weight, fluid sizes (see craft-defaults.md);
spacing and radius scale; grid; motion tokens (durations, eases, one scroll
ownership map); the scene list with, for each scene, the dominant asset or
interaction and the transition into the next; the mobile recomposition per scene.
Add the performance budget: LCP < 2.5s (target < 1.5s), CLS < 0.05, INP < 200ms
(target < 100ms), initial JS as small as the idea allows, 60fps on a mid phone.

## Phase 3: assets first

Follow [asset-and-copy.md](asset-and-copy.md). No layout work until the hero
asset, the signature component's data, and the real copy exist. Layouts built on
gray boxes and lorem text always regress to template.

## Phase 4: vertical slice

Build the hero plus the signature component plus the next transition with real
content. Render it at 1440 and 390 wide. Run the critique (Phase 7) once on the
slice. Fix before multiplying. If it still reads as a stock block, change the
composition or information model, not the effect intensity.

## Phase 5: library mining

Follow the library-site protocol in [component-libraries.md](component-libraries.md).
For a full React build inspect the catalogs, shortlist 3-6 mechanisms against the
scene list, preview with `--dry-run`, install only the finalists, then rewrite
their content, type, color and motion to the spec. Record what was used and what
was rejected and why. Do not ship an unchanged demo.

## Phase 6: complete the build

Remaining scenes, footer, secondary routes in scope, forms and states, SEO basics
(title, meta, OG image, structured data where relevant), accessible markup,
responsive recomposition. One shared animation clock: Lenis driven by the GSAP
ticker; WebGL render loops join the same tick, mount only in view, pause
off-screen, cap devicePixelRatio at 2, dynamic-import heavy modules, and keep a
static fallback for no-WebGL and reduced motion.

## Phase 7: critique loop (required, at least two rounds)

Render the live build in a browser (preview tools or playwright), screenshot at
1440, 1024, 768 and 390 wide, plus one full-page capture. Score each dimension
1-5 and write one concrete fix per dimension below 4:

| Dimension (weight) | What a strong result shows |
| --- | --- |
| Design (40) | Clear hierarchy in 3 seconds, custom type scale, cohesive color, micro-detail in hover/focus/selected states, tokens consistent on every page |
| Usability (30) | Navigation understood at first glance, no layout shift, no dead controls, mobile composed on its own terms, keyboard and reduced-motion paths work |
| Creativity (20) | The signature component is specific to this product; motion explains something; removing the logo changes more than the copy |
| Content (10) | Real copy and assets, passes the copy gate, no stock filler or placeholder |

First challenge the rendered palette against that decision: inspect neutral
tints, large surfaces, CTA area, and interaction states, not only swatches.
Check for unexplained reuse when prior work is available. Passing contrast or
the template scanner does not resolve an unsupported color choice. Correct the
affected system and re-render before sign-off; explicit brand choices remain
valid and no color family is banned.

Then run the mechanical checks:

```sh
node <colabio>/scripts/slop-lint.mjs <app-src-folder>     # template tells
node <colabio>/scripts/pick-direction.mjs --validate        # only after editing the kit
```

Fix every `high` finding or justify it in the delivery notes. Apply fixes, re-render,
re-score. Stop after round 3 or when no dimension is below 4, whichever is first.
Keep screenshots as evidence; do not claim an award or a score the browser did not show.

## Phase 8: ship notes

Report: concept sentence, chosen direction and why, signature component, libraries
used, motion ownership, checks run with results, known limits. Keep it short.

## Agency habits worth copying

- Restraint: cut competing ideas; one hero moment per viewport.
- Scroll with purpose: pinned, scrubbed sequences give users pacing control. No
  long intro loaders and no scroll hijacking of direction.
- Micro-craft on the 3 most-touched controls (nav, primary button, form field):
  hover, press, focus, loading, success. Magnetic or cursor effects only if they
  serve the concept and degrade on touch.
- Consistent system across every route, not only the home page.
- Test on a real mid-range phone or throttled profile before calling it done.
- Deploy or serve the production build for the final check; dev mode lies about
  performance.
