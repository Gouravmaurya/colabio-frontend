# The studio bar: what a ten-thousand-dollar site has that a generated one does not

Read this for landing pages (cinematic by default), explicit cinematic/awwwards
work and delivery review. [Design memory](design-memory.md) defines defaults and
overrides. Premium alone does not force cinematic motion on operational UI.
Match accepted UI type, feel and motion using [brief-intake.md](brief-intake.md). It is the difference between a page that is correct and a page
someone would pay for.

## 1. Why the output looked generated (root causes, so they are not repeated)

1. **The library was never opened.** The tells registry (`library/taste/references/tells.md`), the scenes,
   imagery and motion references and the GSAP/scroll-craft modules already say what to do. Skipping them
   and "designing" from instinct produces the average of every page seen.
2. **No idea from the subject.** A category idea ("dark, editorial, mono labels") passes every check and
   still reads as generated. The competitor test in section 2 is the guard.
3. **No motion engine.** The selector said "showpiece: Lenis + GSAP". Hand-rolled scroll code and CSS
   fades are what a template does. "No-library path" means the page still reads if the CDN fails; it never
   means "do not use the libraries".
4. **No real pictures.** Flat vector scenery and CSS boxes where a picture belongs are the strongest tell.
   SVG drawings do not count toward the picture floor.
5. **Gallery fashion treated as taste.** Mono micro-labels, 01/02/03 numbering, hairline rules, tiny
   tracked capitals, eyebrows above every heading, status dots, a near-black ground with one accent. They
   are listed as banned in `tells.md`. A page can pass a contrast check and still be built entirely from them.
6. **One pass.** Studio work is look, fix, look again. Review a representative slice and the full journey using renders and actual playback.

## 2. Apply the bar to the actual scope

For a new full showpiece, use the image/stack guidance below as a starting craft bar.
For an existing surface, preserve approved regions, framework and supplied assets.
Do not add a fourth picture solely to meet a count, replace an approved hero, or
install a new transport for a focused body-animation pass. Use meaningful crops,
details and state changes from available assets; flag genuine asset limitations.
Scanner mismatches require investigation and a documented reason, not filler.

## 2a. Craft checks

- **Idea sentence.** "On this page, [something that belongs to the subject] becomes [the device]." Both
  blanks come from the subject inventory (its name, objects, printed things, rituals, constraints,
  numbers), never from the category. **Competitor test:** put the nearest competitor in the sentence; if the entire
  composition and proof remain interchangeable, strengthen real content and relationships.
  This is not a literal exclusivity test: ordinary ingredients may form a specific,
  useful combination, and no facts may be invented to force uniqueness. Write the sentence into `design-brief.md`.
- **One live thing**, made from the idea, using the subject's real content, working on a phone with a
  thumb, with a plain fallback. It carries the page's argument.
- **Headline:** about five words, two lines or fewer at every width, one supporting sentence under it, one
  primary action as a real button on the first screen.
- **Banned, no exceptions** (checked by `scripts/taste-check.mjs`): eyebrow/kicker above headings; monospace
  as a "technical" voice; index numbering (01, 02, Step 02); hairline rules and 1px outlined boxes as
  structure; tiny letter-spaced caps; pill badges; glass panels; glows; gradient headline text; three equal
  icon cards; fade-and-rise on every block; infinite marquees; decorative status dots; stock section order.
- **Pictures:** at least four real pictures (photographs, archival images, maps, engravings, footage,
  raster artwork). Order of preference: the project's own, generated, open-collection finds with a credit
  line, then pictures **drawn in code as a rendered scene** (canvas or WebGL with depth, light and grain,
  not flat shapes). If real pictures cannot be fetched in this environment, say so in the delivery notes
  and use a rendered scene as the hero medium; never fall back to flat vector decoration.
- **Fullness:** each desktop screen is a poster with one dominant thing. No stretch taller than half a
  screen holds nothing. Running text is full ink at 16px or more.
- **The frame:** one pair of equal outer margins; every section uses the width the page set up.
- **Every section carries the idea.** A distinctive first screen followed by stock blocks is the commonest
  failure, even among good pages.

## 3. The motion stack (showpiece, cinematic and awwwards briefs)

Use **Lenis + GSAP (ScrollTrigger, SplitText)** loaded from pinned versions, one clock, honest fallbacks.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.css">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js"></script>
```

```js
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ok = window.gsap && window.ScrollTrigger && window.Lenis && !reduce;
if (ok) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });          // one scroll owner
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);   // one clock
  document.documentElement.classList.add('motion');                    // CSS hides only under .motion
}
```

Rules:
- Content is visible by default. Hidden start states live under `.motion`, added only after the libraries ran.
  If a CDN fails or motion is reduced, the page is a complete static page.
- GSAP owns scroll-linked and choreography; CSS owns hover and focus. One owner per property.
- Pin at most three scenes. Each pinned scene has a reason from the idea and a scrubbed timeline
  (`scrub: 0.6` to `1`), `anticipatePin: 1`, `invalidateOnRefresh: true`. Use `ScrollTrigger.matchMedia` to
  swap pinned scenes for native stacking or `overflow-x: auto` below 900px.
- Preloader holds the page with `lenis.stop()` and releases with `lenis.start()` on a timer, always
  skippable, never longer than 2.5s.
- Anchors go through `lenis.scrollTo(target, { offset: -80 })`.
- Call `ScrollTrigger.refresh()` after fonts and images load.
- Use [cinematic-motion.md](cinematic-motion.md) to define visible choreography, concrete scene states and separate phone/reduced variants before implementation.
- Text reveals: `SplitText.create(el, { type: 'lines', mask: 'lines' })`, then `from(lines, { yPercent: 110,
  duration: 1, ease: 'expo.out', stagger: 0.08 })`. Related headings share a reveal grammar; pictures, lists, controls and scene transitions have roles appropriate to content. Do not repeat generic fade-up everywhere.
- A scroll-driven canvas or WebGL scene reads one number (`progress`) from a ScrollTrigger and renders in
  `gsap.ticker`; it caps device pixel ratio at 1.5 and pauses off-screen.
- Fine pointers only: a custom cursor and magnetic buttons, both with `pointer: fine` and reduced-motion
  guards. Never replace the native cursor over text inputs.

Recipes (pinned scene, scrubbed):

```js
const tl = gsap.timeline({ scrollTrigger: { trigger: '.scene', start: 'top top', end: '+=300%', pin: true, scrub: 0.8, anticipatePin: 1 } });
tl.to('.sky', { '--t': 1, ease: 'none' }, 0).from('.line-1', { autoAlpha: 0, y: 40 }, 0.1).to('.line-1', { autoAlpha: 0 }, 0.4);
```

Horizontal scroll: `gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), ease: 'none', scrollTrigger: { trigger: wrap, pin: true, scrub: 0.6, end: () => '+=' + track.scrollWidth, invalidateOnRefresh: true } })`.

## 4. Type and composition

- Pick type from the subject's printed world (timetable, label, engraving, signage), not from a "premium"
  shortcut. Five sizes, far apart. Display type is large enough to be a picture.
- Neighbouring sections never share a layout. Left-anchored with one centred moment. One radius, chosen once.
- Tone steps and whole fields of colour replace boxes and lines. Colour comes from the subject's own
  materials (`scripts/palette-lab.mjs --swatches`).
- Structure from space, scale and tone. If a section needs a hairline to hold together, its composition is wrong.

## 5. The look-and-fix loop (mandatory)

1. Capture 1440, 768 and 390 with `scripts/capture.mjs`, plus scene frames at 0, 25, 50, 75 and 100% of each
   pinned scene (use `--scroll`). Look at every image.
2. Review with reasons against the brief: Is there an idea only this subject has? What is the first thing the eye
   hits, and is it the right one? Could the nearest competitor use this page? Is any screen empty? Does every
   section carry the idea? Is there a real picture or a rendered scene with depth? Does motion tell the story
   or decorate it? Would a designer defend every choice in one sentence?
3. Record consequential problems and owners. Fix them; a peer rechecks affected states. Review the representative body/proof/function slice and completed journey. Keep a concise log in `design-brief.md`; no fixed issue quota, numeric taste score or expired round limit establishes acceptance.
4. Run `scripts/finish-gate.mjs` (includes `taste-check.mjs`), `variety-check.mjs`, `slop-lint.mjs`,
   `palette-lab.mjs --check`, `check-contrast.mjs`, and the Impeccable detector when installed. Every WARN is
   wrong unless defended in one sentence in the brief.
5. Drive real events: keyboard, touch widths, reverse/fast scroll, anchors, focus, runtime reduced-motion changes, scripts off and blocked libraries. Review actual timing and continuity as well as start/middle/settled frames.

## 6. Delivery says plainly

The idea sentence, what is a real picture and what is rendered, which libraries run and what the fallback is,
what was checked (rounds, widths, gates) and what remains unverified. No awards, scores or
performance numbers without evidence.
