# Reference study: Gourav Maurya's published portfolio

Observed 2026-10-26 at https://gouravmaurya.vercel.app/ in a live browser.
This is an original analysis of mechanisms, not copied source, assets or a
universal portfolio template. The owner supplied the site as a quality reference.
The published page differs from the earlier local film-trailer portfolio.

## Observed on desktop

At an actual 1280 × 720 CSS viewport:

- The name dominates the first screen in Barlow Condensed, weight 800, about
  278 CSS px. A tall supplied portrait crosses the typography; its photographic
  blue comes from the image rather than an arbitrary UI accent.
- The base is warm off-white (`rgb(238,234,225)`); primary ink is
  `rgb(35,35,31)`. Rust accents are used selectively. These are observed colors,
  not recommended defaults for unrelated sites.
- Italiana 400 provides a quieter editorial counterpoint: the opening supporting
  heading measures about 36 px and the about heading about 51 px. The 278/36
  contrast gives the page range; everything is not one oversized sans-serif.
- A slim persistent side navigation establishes orientation without competing
  with the portrait/title. This is a desktop composition choice, not a requirement
  to rotate navigation text on every site.
- The work scene changes to near-black. A pinned stage advances a horizontal
  collection through normal vertical scrolling. Its footer/action remains a
  stable anchor while different projects enter the frame.
- Projects show authored assets and actual UI: a Haven overview, a Safar screen,
  the social-media-agent illustration and Formwork overview. Role, description,
  stack and destination sit with the relevant image. No generic diagram replaces
  the work.
- The about scene returns to a quiet light ground, a large portrait and an
  editorial statement. Background/experience and a large closing invitation
  complete the journey. Each scene has a different density and visual job.

## What this teaches

1. Presence comes from a deliberate relationship among type, portrait, crop and
   space. A logo in a rotating diagram has less biographical information.
2. A type system needs contrasting roles and scale, not just an expensive font.
3. Dramatic light/dark changes can mark a narrative boundary rather than decorate
   arbitrary sections. The work becomes the visual subject in the dark scene.
4. Motion connects content across a stage. A gallery is cinematic because of
   framing/pacing and the quality of its work, not because it has ScrollTrigger.
5. A recognizable person and real projects make the composition specific.

## Observed friction and limits — do not copy uncritically

Direct navigation into the pinned work scene briefly showed a mostly empty dark
stage before further scrolling revealed the project cards. The custom cursor and
side rail are visible desktop treatments; do not make them universal defaults.
These observations call for settled-anchor and reachability tests in any reuse.
At 390 × 844 CSS pixels, the portrait/title recompose vertically, the navigation
becomes a bottom dock, and the work becomes a long stacked list (observed stage
height about 3117 px, image widths about 301 px). The observed document width was
390 px with no horizontal overflow. The dock overlaps the lower visible scene;
test safe-area spacing and focused-control visibility before borrowing it.
This inspection did not establish conversion impact, Core Web Vitals, screen-reader
compliance, reduced-motion behavior or source-code quality. A compelling reference
is not evidence of every state.

## Transfer without copying

For another creator: use their own portraits, real work and voice; choose a type
relationship that fits their content. For software: substitute a real workflow
for the portrait. For a physical product: a coherent object/detail/process series.
Preserve the principles—dominant subject, type range, actual evidence, scene
contrast, continuity—rather than reproducing this identity, palette or exact page.

Use the editorial-portrait, software-walkthrough or project-screening-room recipes
in [cinematic-recipes.md](../cinematic-recipes.md). Compare the working result
using [visual-comparison-gates.md](../visual-comparison-gates.md), not a self-score.
