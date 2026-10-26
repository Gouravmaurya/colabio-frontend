# Optional starters: reuse working mechanisms when they fit

Read the brief and any rendered incumbent before selecting a starter. These are
examples, not compulsory site structures. Use a mechanism that fits the actual
content; do not migrate frameworks or turn every product into a 3D shop/game.
The cinematic recipes and strict rendered gates in `../references/` still apply.

Each folder is a complete, working single-file site that was built, rendered and
checked with this skill. Copy one with `node scripts/scaffold.mjs`, then change the
content, tokens and object model. Do not ship a template unchanged: rename the
brand, rewrite every sentence, replace the sample products, and re-run the checks.

| Template | Use it when | Signature it demonstrates | Stack |
| --- | --- | --- | --- |
| `cinematic-product-shop/` | A physical product the visitor would buy or customise: ceramics, bottles, lamps, candles, glassware, vessels, jars, any round object. Also the base for any shop that should feel like a film | Real 3D lathe-turned object lit like a product photograph, drag to turn, live configurator (shape, finish, size -> dimensions, capacity, price), scroll-scrubbed making sequence, baked 3D catalogue tiles, cart drawer, dark/cream section themes | three 0.160 (importmap), gsap + ScrollTrigger, lenis, Fontshare, no build step |
| `scroll-stage-game/` | A studio, game, app or interactive product where the mechanic itself is the hero | One fixed WebGL stage directed by scroll (slot rectangles), pinned scrubbed demo where scroll is the clock, playable prototype in the hero, isometric diorama | three, gsap, lenis, Google Fonts |
| `precision-service/` | A service or tool that sells on a trade-off the visitor can compute: printing, fabrication, logistics, repair, quotes | Live estimator with a magnified cross-section, materials table with data bars, honest quote form | no libraries, canvas + CSS |
| `editorial-portfolio/` | A person or studio portfolio, or any editorial page with a strong personal voice | Name-and-portrait hero with layered overlap, floating dock, intro with skip, pinned horizontal work track with vertical fallback, IO reveals, dark-section colour morph, fail-open and reduced-motion paths. Teardown in `references/portfolio-benchmark.md` | gsap + ScrollTrigger, lenis, Google Fonts, no build step |

## Choosing

1. Round physical product to sell -> `cinematic-product-shop`.
2. Non-round physical product (furniture, devices, packaging, apparel): use
   `cinematic-product-shop` for the structure and replace the lathe with one of
   - **extruded or boxed primitives** (`BoxGeometry`, `ExtrudeGeometry` from a 2D outline, `RoundedBoxGeometry`);
   - **a supplied glTF/GLB** via `GLTFLoader` (keep the stage, lights, plinth and slot fitting; skip the morph);
   - **photographed or generated stills** on the same layout if no model exists (parallax layers instead of 3D).
3. Studio, game, interactive tool -> `scroll-stage-game`.
4. Service with a computable trade-off -> `precision-service`.
4b. Portfolio, personal site or studio statement page -> `editorial-portfolio` (read `portfolio-benchmark.md` first; change the font trio, palette and layout details so it is not a clone).
5. Software product: keep the stage and scroll structure of `scroll-stage-game`, replace the 3D room with
   real UI states built in code (see site-types.md).

## What to change in `cinematic-product-shop`

Search the file for `@CONFIG` and `@COPY` markers:

| Marker | Change |
| --- | --- |
| `@CONFIG:tokens` | Palette for the dark and light sections, display and body fonts (swap the Fontshare/Google link too). Check with `scripts/check-contrast.mjs`. |
| `@CONFIG:objects` | Object types: profile points in cm, wall/floor thickness, base price, handle flag, capacity label. |
| `@CONFIG:finishes` | Colour, fleck colour, price add-on. |
| `@CONFIG:sizes` | Scale and price multipliers. |
| `@CONFIG:collection` | The pieces on the shelf (baked to 3D thumbnails automatically). |
| `@COPY:*` | Hero, manifesto, process and facts copy. Every claim real or labelled sample. |
| `PSTG` in the script | The stages of making and their surface state (clay, bisque, glazed, glow). Rewrite for the new product's process. |
| Section ids and `data-theme` | Keep the order dark, dark, light, dark, light, dark; the stage and theme logic key off these ids. |

Do not rewrite: the stage (`slotRect`, `fitCam`, `tick`), `rebuild()` geometry, `bake()`, the theme
observer, the cart drawer, or the `?no3d` fallback. Fix bugs in them, but keep the architecture. If something
looks wrong, read `references/verify.md` (WebGL section) first: overexposure is usually light decay or
intensity, not colour.

## What to change in the other two

- `scroll-stage-game`: replace `LEVELS` and `sim()` with the product's own interactive demo, keep `FRAMES`
  for the scrubbed demo, replace the project art in `ART`, rewrite all copy, keep the slot logic.
- `precision-service`: replace `model()`, the materials table, the form and the canvas drawing in
  `drawWall()` with the new trade-off's visual.

## Hygiene

- Keep scratch or assembly files out of the project folder. The desktop preview opens new files automatically
  and shows a load error if the file is later deleted. Use the scratchpad directory.
- Remove every debug hook (`window.__dbg`) before finishing.
- Templates pin CDN versions (three 0.160.0, gsap 3.12.5, lenis 1.1.13). Recheck them, or install locally in a
  bundled project.
