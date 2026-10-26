# Reclone Studio — design spec (test landing page)

**Assumption:** "Reclone Studio" is a fictional 3D-printing service for this skill test. Prices, rates and turnaround in the page are sample values and labelled as such. No customers, logos, awards or stats are invented.

**Idea:** Send a broken or missing part; Reclone prints a working clone. The page lets the visitor see and price the one trade-off every print has — layer height vs. time and cost.

**Visitor / action / proof:** someone holding a broken part or a CAD file → "Price my part" (estimator) → "Send a file" (quote form). Proof = the estimator's visible mechanism (stair-step error, hours, cost) and a materials table, not testimonials.

## Direction
- Style: swiss-precision core (data, mono labels, hairlines) with industrial-brutal touches (hard offset shadow on the primary button, registration marks). Hero and estimator share one object: the printed layer.
- Fonts: Bricolage Grotesque (display 600-800, body-adjacent headings), Instrument Sans (body 400-600), JetBrains Mono (data 400-500). Google Fonts, `display=swap`, system fallbacks.
- Rejected from `pick-direction.mjs`: gsap-experimental + Clash/glacier — the brief is a service with a pricing mechanism, not an agency reel; cool blue-white reads as lab equipment, not as a print shop.

## Tokens
| Role | Value | Contrast |
| --- | --- | --- |
| paper (bg) | #F1EEE6 | — |
| ink (text) | #15140F | 15.9:1 on paper |
| muted | #5A574D | 6.2:1 on paper |
| accent (filament) | #FF4D1F | 5.6:1 on ink; graphics/large only on paper |
| accent-ink (text on paper) | #C8310A | 4.6:1 on paper |
| muted-dark | #A8A495 | 7.4:1 on ink |
| border | #CFCAB9 | decorative |

Type: h1 `clamp(3rem, 9.4vw, 9.5rem)` / 0.92 / -0.04em, h2 `clamp(2rem, 4.6vw, 4.5rem)`, body 1.0625rem/1.55, mono labels 0.75rem uppercase +0.06em. Spacing base 4px; section padding differs per role (hero 0/ process 128 / parts 96 / estimator 144 / materials 112 / quote 128). Radius: 2px controls, 0 panels (print-shop = square). Tabular numerals on every figure.

Motion tokens: 160ms feedback, 600ms reveals, ease `cubic-bezier(.2,.7,.1,1)`. Owners: hero canvas = rAF loop (paused off-screen); headings = CSS mask wipe on load; rules = scaleX on enter; numbers = count-up on enter. No scroll hijack, no smooth-scroll library (native scroll; nothing to sync). Reduced motion: hero canvas renders the finished part, all reveals skipped.

## Scenes
1. Hero — headline (noun + verb), live-printing vase in a build-plate frame with layer readout. Mobile: frame under copy.
2. Process — four real steps (send, slice, print, ship) as a numbered sequence; numerals are an actual order.
3. Parts — index list of job types with tiny drawn silhouettes; hover/focus reveals a spec line.
4. Estimator (signature) — layer height / material / infill / volume → zoomed wall cross-section (true curve vs. printed stair-steps), layers, hours, cost, stair error, delta vs coarsest. Dark scene.
5. Materials — table with a typical-use-temperature bar; stacked cards on mobile.
6. Quote — file drop + email + material; honest no-backend status.
7. FAQ + footer wordmark rendered with layer lines.

## Budget
No runtime dependencies. One HTML file, ~1 canvas loop at DPR≤2. Target LCP < 1.5s locally, CLS < 0.05 (fixed canvas aspect ratio), INP < 100ms.
