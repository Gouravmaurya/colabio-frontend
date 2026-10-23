# Craft defaults

Numbers to start from so type, space and motion are decided, not defaulted.
Override with the brand or measured reference values; record any override.

## Type

- Scale from one ratio: 1.25 (dense/product), 1.333 (balanced), 1.5+ (editorial/poster).
- Fluid display sizes with clamp, e.g. `h1: clamp(2.75rem, 1.2rem + 6.5vw, 8rem)`,
  `h2: clamp(2rem, 1rem + 3.5vw, 4.5rem)`, body `1rem-1.125rem`, small never < 0.875rem.
- Display: line-height 0.92-1.05, letter-spacing -0.02 to -0.05em. Body: 1.5-1.65.
  All-caps and mono labels: +0.06 to +0.14em tracking.
- Measure 55-70ch for reading text. Use `text-wrap: balance` on headings and
  `text-wrap: pretty` on paragraphs.
- `font-variant-numeric: tabular-nums` on prices, stats, tables.
- Load via `next/font` or `@font-face` with `font-display: swap`, `size-adjust`
  matched fallbacks, preload only the display weight used above the fold.
- Limit to 2 families and 3-4 weights. Real italics, not synthesized.

## Space and layout

- 4px base. Section padding varies by role: tight 64-96, standard 112-160,
  statement 200-280 (desktop), roughly 55% of that on mobile. Never one `py-*`
  for every section.
- 12-column grid with named exceptions: full-bleed media, a content column that
  breaks left or right, one element that crosses a boundary per scene.
- Radius by role: controls 8-12, cards 0-20, media 0-32, pills only for tags.
  Pick a family (sharp / soft / mixed) and hold it.
- Borders and hairlines (1px, low-contrast) organize more than shadows. Shadows
  only where depth means something (menus, floating nav).
- Mobile: single-column recomposition, 16px gutters min, 44px touch targets,
  sticky bars must not cover focus.

## Color

- 60-30-10: dominant neutral, supporting surface, one accent. A second accent
  only as a state or data color. Check text 7:1 (body 4.5 minimum), muted 4.5:1.
- Dark themes: tinted near-black (not #000), off-white text, reduce accent
  saturation slightly; shadows become borders and lighter surfaces.

## Motion

- Duration: micro 120-200ms, UI 200-350ms, scene 600-1200ms. Ease out for
  entrances `cubic-bezier(0.22, 1, 0.36, 1)`, ease in-out for movement,
  springs (stiffness 300-400, damping 28-36) for direct manipulation.
- Stagger 40-80ms, max 8 items. Distances 12-32px; large travel only for the
  hero. Different scenes use different reveal grammar (mask wipe, scrub, split
  line, clip-path, number roll, parallax), tied to what the scene says.
- Pinned scenes get scroll length equal to their content (typically 1.5-3
  viewports). Provide skip links and keep anchors working.
- Only animate transform, opacity, clip-path, filter (sparingly). `will-change`
  only during animation. Kill all of it under `prefers-reduced-motion`.
- Hover/press/focus on every interactive element, with distinct states. Cursor
  effects: desktop pointer-fine only.

## Detail checklist

Favicon and app icons, OG/Twitter image, custom selection color, scrollbar left
alone, focus ring in the accent, 404 page, loading skeletons shaped like content,
print stylesheet if content-heavy, `color-scheme` meta, `lang`, landmark roles,
image alt text, link underline offsets, `:target` offset for anchors under sticky nav.
