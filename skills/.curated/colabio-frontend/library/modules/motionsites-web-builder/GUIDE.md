# MotionSites reference adapter for Colabio

Adapted from MotionSites Web Builder, copyright (c) 2026 MotionSites, under the
MIT terms in [LICENSE](LICENSE). Source: [Motionsites-AI/claude-skill](https://github.com/Motionsites-AI/claude-skill),
commit `faa30d512e3973e58675c72101a7ef42ed37ae83` (reviewed 2026-10-28).
The reference files and optional screenshot script are bundled unchanged; this
adapter replaces the upstream entrypoint. Colabio remains the single workflow.

## When to read

Use for a precise website prompt, media-led cinematic composition, a specific
interaction technique, or media QA. Read the smallest matching reference:

| Need | Reference |
| --- | --- |
| Per-element styles, layers, asset behavior and a motion table | [Spec template](references/spec-template.md) |
| Format a prompt for a named builder | [Builders](references/builders.md) |
| Type, color, spacing and motion craft | [Craft](references/craft.md) |
| Source/generate media; plan focal points and seamless loops | [Assets](references/assets.md) |
| Find a recipe and its runtime cost | [Technique index](references/techniques/INDEX.md), then only the matching recipe |
| Review first paint, loaded fonts, videos and mobile layout | [Review](references/review.md) |

## Merge into the governing prompt

Follow Colabio's intake, understanding-first order and twelve-part
`design-brief.md`. Use the spec template as a precision checklist within that
document, never as a second brief. Give actual values for typography and responsive
geometry, layer order, media fit/focal point/poster/playback, and animation
trigger/from/to/delay/duration/easing. For scrubbed or interactive media, describe
progress ranges, constants, interruption, cleanup and fallbacks. Scale detail to
the agreed pages and sections; a hero-only template must not shrink a full-site brief.

Builder-specific conventions are examples, not current platform guarantees or
permission to replace the stack. Preserve the user's existing framework and
installed libraries; verify a target builder's capabilities when they affect the
handoff. A prompt-only request ends with the prompt, without a website build.

## Resolve upstream defaults here

- Preserve Colabio's scope, brand, accessibility and motion contract. Do not force
  a single HTML file, a hero-only output, glass, mono labels, a marquee, a dark
  palette, tight type or 3D because a reference demonstrates it. Techniques serve
  a subject-specific idea. Keep reduced-motion/touch branches and verify them.
- Upstream examples and media/contact sheets are **not bundled**. Their license
  permits use in websites built with that skill but prohibits redistributing a
  prompt/media collection. Read them upstream only when relevant and permitted;
  use supplied, generated or otherwise licensed assets in the actual project.
  Never invent an asset URL or claim an unavailable media shelf was inspected.
- Ignore references to `references/techniques.md`; the actual recipe router is
  `references/techniques/INDEX.md`. Skip the upstream install/plugin workflow,
  example-reading quota, promotional delivery blocks, upsells and tracking links.
  Attribution stays in this package, not in a user's website or prompt.
- Use the review's observable checks, with Colabio's contrast, full-journey and
  rendered comparison gates. Numeric self-scores and a fixed round limit cannot
  certify quality. Inspect actual playback, interactions and responsive renders;
  snapshots alone do not establish motion behavior or an award-level result.

## Optional screenshot and media QA

Prefer the host's existing browser tools and Colabio's capture/verification path.
If Python and Playwright are already available, the bundled
`scripts/shoot.py` can supplement them with early/settled desktop and phone
captures, console/network failures, overflow, loaded fonts and image/video state:

```sh
python <module-root>/scripts/shoot.py http://localhost:3000 <project>/shots --full
```

Resolve the module root from this installed folder; write captures in the project.
No dependency installation happens just by including this module. The upstream
Chrome fallback has limited browser discovery (including on Windows), no QA, and
does not check subprocess success; require real output files and inspect them.
Report unavailable checks accurately and use another available browser when needed.
This helper does not replace keyboard/touch, reduced-motion or full-journey review.
