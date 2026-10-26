# Style recipes

Pick ONE primary recipe and at most two borrowed details from another. The
brief and existing brand override everything here. A recipe is a coherent set of
decisions; do not mix palettes, radii or motion grammars from different recipes.

## editorial-print
Fits: publishing, culture, studios, finance with a voice.
- Type: high-contrast serif or expressive grotesk display at 8-14vw, small
  text set in a clean sans or mono for captions. Italic for emphasis.
- Color: warm paper or deep ink, one hot accent used sparingly (rules, numbers).
- Layout: asymmetric 12-col, hairline rules, captions and marginalia, numbered
  sections, pull quotes, images with generous crops and credits.
- Motion: line-by-line text reveals with masks, slow parallax on images, a
  scrubbed headline. Nothing bouncy.
- Avoid: gradient glows, rounded cards, icon grids.

## swiss-precision
Fits: developer tools, B2B, fintech, infrastructure.
- Type: neutral grotesk, mono for data and labels, tabular numerals.
- Color: near-white or near-black, one saturated accent, strict neutrals.
- Layout: visible grid, dense honest data, tables and diagrams instead of
  illustrations, product UI shown at real fidelity, code that runs.
- Motion: functional only: state transitions, number tweens, hover reveals.
- Avoid: decoration, stock photos, centered hero-and-three-cards.

## industrial-brutal
Fits: creative tools, music, fashion, youth and anti-corporate brands.
- Type: heavy grotesk or condensed display, raw mono, tight leading.
- Color: flat, loud accent on warm gray or black, thick 2-4px black borders.
- Layout: exposed structure, hard offset shadows, oversized numbers, sticker or
  label elements, deliberate collisions that still read.
- Motion: snappy 120-200ms, hard cuts, press-down feedback, marquee only if it
  carries real content.
- Avoid: soft blur, glass, pastel gradients, tiny low-contrast text.

## apple-fluid
Fits: hardware, consumer apps, premium physical products.
- Type: optical-size grotesk, large calm headlines, short sentences.
- Color: mostly neutral, the product supplies the color.
- Layout: product as hero, long single-idea scenes, generous space, depth via
  scale and soft shadow, sticky product with changing copy.
- Motion: springs, interruptible transitions, scroll-scrubbed product states,
  momentum on drag.
- Avoid: busy backgrounds, many accents, cramped feature lists.

## cinematic-immersive
Fits: expressive portfolios, launches, entertainment, product stories and flagships.
Read [cinematic-recipes.md](cinematic-recipes.md) before using this character.
- Type: one dominant title/name and contrasting supporting roles; readable body
  text is allowed and often necessary. Condensed display is one option.
- Color: chosen from the subject/assets/brand. Light editorial scenes can be
  cinematic; dark is not mandatory. Change scene mood at a narrative boundary.
- Layout: an authored portrait, real product/UI, process or object as the subject;
  depth from crop, overlap, scale and framing. 3D is optional.
- Motion: establish/enter/hold/transform/resolve; one continuing subject crosses
  a meaningful transition. Pinning requires useful content and reachable controls.
- Avoid: generic orbiting logos, abstract diagrams replacing actual evidence,
  effects without continuity, heavy models, or scroll traps.

## atmospheric-soft
Fits: wellness, hospitality, travel, lifestyle, human-toned AI products.
- Type: soft serif or humanist sans, relaxed leading, sentence-case.
- Color: photographic fields, warm light, low-contrast surfaces with firm text.
- Layout: full-bleed photography with text on calm regions, overlapping
  rounded media, generous gutters, single clear CTA.
- Motion: slow fades, subtle image drift, no sharp moves.
- Avoid: generic stock, neon accents, dense grids.

## playful-kinetic
Fits: consumer, education, games, community.
- Type: rounded or quirky display, large friendly buttons.
- Color: 3-4 saturated colors with clear roles, white or cream ground.
- Layout: big shapes, character illustration, sticker-like components,
  physical hover feedback (tilt, squish, wobble limited to hover/press).
- Motion: springs with overshoot, staggered pops, delightful empty states.
- Avoid: random confetti, motion on every element, tiny tap targets.

## gsap-experimental
Fits: agencies, portfolios, campaign pages.
- Type: oversized display, split-line and scrub-per-word effects.
- Color: restrained palette so motion carries the personality.
- Layout: pinned stacking panels, horizontal sections only when the content is
  sequential, inline micro-images inside headlines, big index navigation.
- Motion: one scroll timeline per scene, shared clock with Lenis, labelled
  timelines, `gsap.matchMedia` for desktop/mobile/reduced-motion variants.
- Avoid: horizontal-scroll galleries as default, effects with no narrative job.
