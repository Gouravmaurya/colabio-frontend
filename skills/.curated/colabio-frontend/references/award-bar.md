# Craft checks: apply the bar to the actual brief

These checks describe the Ashfold ceramics example (`templates/cinematic-product-shop/`).
Use them as craft prompts, not a mandatory page architecture or a universal technology
choice. For another brief translate the mechanism into its subject: an actual software
workflow, a portrait and real projects, a physical detail, a process or a useful instrument.
The strict [visual comparison gates](visual-comparison-gates.md) control acceptance.
No model, cinematic effect, template or self-score establishes an award or improvement.

## The ten things a finished site has

| # | Requirement | How it was met on the reference build | Acceptable alternatives |
| --- | --- | --- | --- |
| 1 | **One hero object or idea**, large, lit or composed with intent | A real 3D vase on a plinth, studio lighting, light pool behind it | Software: real product UI states at full fidelity; service: a working instrument; editorial: one huge typographic moment |
| 2 | **An opening moment**, no loader | Lights ramp up, object rises and slows, wordmark fades in, headline masks up (about 3 s) | Any single choreographed reveal of the hero |
| 3 | **Depth behind the subject** | Outlined 28vw brand word behind the object, vignette, film grain | Layered parallax, large type behind imagery |
| 4 | **The object travels** across scenes | One fixed canvas fitted into a slot per section | Sticky element that transforms through scenes |
| 5 | **Scroll explains the product** | Lump -> thrown -> trimmed -> glazed, with a kiln glow | Before/after scrub, process diagram, a scrubbed demo |
| 6 | **Something to touch** that proves the claim | Drag to turn; shape/glaze/size configurator with real dimensions, capacity, price | Calculator, estimator, playable demo, explorer |
| 7 | **Section mood changes** | Dark -> cream -> dark by theme switching on the body | Any deliberate palette shifts tied to content |
| 8 | **Consistent imagery**, no stock | Catalogue tiles baked from the same 3D engine | Illustrations or renders from one source, one light, one crop |
| 9 | **A type moment** and a small, precise system | 28vw outlined wordmark; serif display with small tracked labels; two families | One display face used at extremes against quiet labels |
| 10 | **Works everywhere** | Slot layout on phones, no horizontal overflow, 2D fallback (`?no3d`), reduced motion path, honest demo boundaries | Same |

## Rules that keep it from sliding back to a template

- No gradient headline text, no three-card icon rows, no glow blobs, no stock hero, no
  placeholder hosts, no invented customers or numbers (slop-lint covers many of these).
- Section heights, paddings and reveal styles vary by role. Masks for headlines, wipes for
  tiles, scrub for the manifesto; not one fade-up everywhere.
- Everything the visitor reads comes from real or labelled-sample facts about this product.
- One accent per theme. Contrast: body 7:1, muted 4.5:1 (check-contrast.mjs).

## How to reach the bar from a thin prompt

1. Classify the product (site-types.md), choose a content-led direction, and use a
   matching starter mechanism only when it fits (templates/README.md).
2. If using a starter, adapt its subject, architecture, tokens, copy and data to the
   brief. Preserve useful engineering; do not preserve an unsuitable composition.
3. Run the build to a vertical slice first (hero + configurator + one scroll scene), check it
   rendered (verify.md, including the WebGL snapshot technique), then finish the rest.
4. Self-review against the ten rows above and fix the weakest. Say plainly which rows are met
   by alternatives and which were not checked.

## Time and effort

The template already contains the hard parts (geometry, lighting, stage, themes, drag, baking,
fallback, cart). A new site is mostly content and a new object model. Spend the effort on the
parts only the new product can supply: its process stages, its configurator data, its copy,
its one signature moment. If the new object is not round, budget extra time for the geometry
and test lighting with real numbers (verify.md).
