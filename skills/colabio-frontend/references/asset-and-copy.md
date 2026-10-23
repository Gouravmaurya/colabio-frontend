# Asset phase and copy gate

Template-looking sites are mostly missing two things: authored visuals and
specific words. Do both before layout.

## Asset phase (required for full builds)

Produce a short asset list in the design spec: for each scene, the dominant
visual, its source, and its fallback.

1. **Reuse first**: the repo's own screenshots, product UI, brand marks, photos.
2. **Build it in code** when the product is software: a faithful, real-data UI
   frame, chart, terminal or diagram built from the product's actual states beats
   any stock photo. Custom inline SVG for diagrams, marks and illustrations
   (consistent stroke, one palette, no gradients unless the style calls for them).
3. **Generate** with an available image tool for atmosphere, objects and hero art.
   Read `modules/imagegen-frontend-web/GUIDE.md` for prompts that keep
   typography off the image and the lighting consistent. State the crop, light
   and focal point in the prompt; generate a 2-3 variant set, keep the best, and
   save with descriptive names and real alt text.
4. **3D or shader** only when the idea needs a single owned object
   (`modules/threejs-webgl`). Budget it, lazy-mount it, and ship a poster image.
5. **License-clean stock** (Unsplash, Pexels, Pixabay) is a last resort for
   supporting photography, never for the hero. Credit where required.
6. Never ship placeholder hosts, gray boxes, or "image coming soon".

Optimization: modern formats (AVIF/WebP), explicit width/height, responsive
`srcset`, `fetchpriority="high"` on the LCP image only, lazy-load the rest,
video muted/inline with a poster and no autoplay sound.

Inspiration is for research only: study structure and craft on Awwwards, Godly,
Land-book, SiteInspire, Codrops, then write your own; never copy another
site's assets, layout or code.

## Copy gate (required)

Write copy before layout, from the product's real facts. Then check:

- Headline states what it is or does, with a noun or number: not "Unlock the
  future of X". Test: swap the product name for a competitor's; if it still
  reads true, rewrite.
- Banned unless quoting the user: unlock, elevate, seamless, supercharge,
  revolutionize, next-gen, cutting-edge, empower, streamline, effortless,
  reimagine, game-changing, "all-in-one", "built for the modern X".
- Buttons name the outcome ("Get my valuation", "Read the method"), not "Learn
  more" or "Get started" unless nothing more specific is true.
- Every claim has proof nearby: a number with its source, a real example, a
  screenshot, a named customer the user supplied. Never invent logos,
  testimonials, stats or awards.
- Microcopy has a voice: empty states, errors, loading, success, form hints,
  404, footer. These are where polish is visible.
- Section headings differ in shape and length; at most one section uses the
  "eyebrow + headline + subhead + 3 cards" pattern.
- Read the page aloud top to bottom: remove any sentence a visitor would skim.
