# Motion recipes

Ownership: GSAP owns choreography and scroll scenes, Lenis owns scroll
interpolation, Motion (framer-motion or `motion/react`) owns React component
state transitions, CSS owns simple hover/focus. One owner per element and
property. Check current docs for the installed versions before relying on an
API; the snippets track the documented patterns.

For cinematic briefs read [cinematic-motion.md](cinematic-motion.md) for the shared
scene/state contract and vocabulary, then [cinematic-recipes.md](cinematic-recipes.md):
write the framing, continuous subject and motion score before choosing a tween.
These integration snippets are infrastructure, not proof of a cinematic result.

## Visible motion contract

For experience-led landing pages or an explicit animation request, include a motion
score alongside the scene score. For each major section name the subject, intended
effect, trigger, start/middle/end state, owner, phone choreography and separate reduced/static equivalent.
Choose recognizable motion that advances the subject: an image opens into an
eyepiece view, programme items enter in their actual order, a result's structure
appears as a coherent component, or a closing wordmark completes the scene.

A motion-rich brief needs a perceptible scroll-linked sequence and supporting
component reveals where they help the reading order. A tiny parallax, smooth-scroll
transport or hover feedback alone is insufficient. Keep one consistent reveal
grammar for related headings; vary the role of pictures, lists, controls and scene
transitions instead of applying fade-and-rise to every block. Still sections are
valid when intentional; do not force pins, loops or effects onto every element.

Disabling desktop smooth scrolling on a phone does not require disabling all native
scroll-triggered reveals. Define a touch composition independently, respecting
reduced motion. Keep controls usable while motion runs, finish or bypass reveals
when keyboard/anchor navigation reaches them, and avoid overflow from translated
components. Content is visible before successful motion initialization and remains
complete when libraries fail or motion is reduced.

Verify motion by scrolling through actual start, middle and settled states on desktop
and phone. Exercise component entry, reverse/fast scroll, focus, anchors and runtime
preference changes. Imports, static screenshots and “a transform changed” are not
enough to claim the planned choreography was delivered. Record which sequences and
component reveals were visibly observed, with any intentional still areas.

Install only what the build needs, locally:
`npm i gsap @gsap/react lenis` and, for React component transitions,
`npm i motion` (import from `motion/react`) or reuse an installed `framer-motion`.

## Lenis driven by the GSAP ticker (one clock)

```js
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis, tick;
if (!reduce) {
  lenis = new Lenis({ autoRaf: false, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  tick = (seconds) => lenis.raf(seconds * 1000);
  gsap.ticker.add(tick);
}
// Call on unmount. Kill only this scene's timelines via its gsap.context().revert().
function cleanupScroll() {
  if (tick) gsap.ticker.remove(tick);
  lenis?.off('scroll', ScrollTrigger.update);
  lenis?.destroy();
}
```

When Lenis owns interpolation, disable competing CSS `scroll-behavior: smooth` on
its active scroll root and restore native behavior on teardown. Test a lazy-image or
font-triggered refresh at a nonzero scroll position; scene ranges must remain correct.
Keep anchor links, keyboard scrolling, modals (`data-lenis-prevent`) and nested
scrollers working. Never run a second requestAnimationFrame loop. Never call
`ScrollTrigger.killAll()` from a reusable scene; that destroys other scenes.
If reduced-motion preferences change while mounted, create/destroy the scroll
transport through a media-query listener or one app-level owner.

## React scope and cleanup

```jsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

function Scene() {
  const root = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.line', { yPercent: 110, stagger: 0.06, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' } });
    });
    return () => mm.revert();
  }, { scope: root });
  return <section ref={root}>…</section>;
}
```

## Pinned, scrubbed scene

```js
gsap.timeline({ scrollTrigger: { trigger: '.scene', start: 'top top', end: '+=200%',
    pin: true, scrub: 0.6, anticipatePin: 1 } })
  .to('.object', { rotate: 90, scale: 1.2 }, 0)
  .to('.copy-a', { autoAlpha: 0, y: -24 }, 0.3)
  .from('.copy-b', { autoAlpha: 0, y: 24 }, 0.5);
```
Give a pinned scene the scroll length of its content (1.5-3 viewports is only a
starting range), keep `end` relative, and recompute on fonts/images load
(`ScrollTrigger.refresh()`). Give short scenes less distance. Disable pinning
when it clips controls. Use an in-flow mobile/reduced-motion variant. Test
entry/exit, reverse scroll, anchors, resize, focus and interruption.

For a horizontal project stage, measure actual travel instead of translating
an arbitrary multiple of viewport widths:

```js
// Inside a scoped matchMedia/context; stage and track are elements.
const travel = () => Math.max(0, track.scrollWidth - stage.clientWidth);
if (travel() > 0) {
  gsap.to(track, {
    x: () => -travel(), ease: 'none',
    scrollTrigger: { trigger: stage, pin: true, start: 'top top',
      end: () => `+=${travel()}`, scrub: .6, invalidateOnRefresh: true }
  });
}
```

This is only geometry. Add direct case navigation and focus handling that makes
offscreen project links visible, or use a selected case panel. At narrow/reduced
settings stack the cards. Capture actual mid/settled frames: a full-page image
alone cannot show the complete pinned track.

## Split-line masked headline

Wrap each line in `overflow: hidden`, animate the inner span with `yPercent`
from 110 to 0. Use SplitText (GSAP 3.13+ is free) or split by hand; re-split on
resize and after fonts load (`document.fonts.ready`). Keep the real heading text
accessible (`aria-label` on the heading, `aria-hidden` on the split spans).

## Motion for React: layout and presence

```jsx
import { AnimatePresence, motion, LayoutGroup } from 'motion/react';

<LayoutGroup>
  {tabs.map((t) => (
    <button key={t.id} onClick={() => setActive(t.id)}>
      {t.label}
      {active === t.id && <motion.span layoutId="pill" className="pill"
        transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
    </button>
  ))}
</LayoutGroup>
<AnimatePresence mode="wait">
  <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} />
</AnimatePresence>
```
Respect `useReducedMotion()`; do not let GSAP and Motion animate the same element.

## WebGL budget

Mount the canvas only when its section is near the viewport (IntersectionObserver),
pause the render loop off-screen, cap `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`,
compress models (Draco/Meshopt, KTX2 textures), dynamic-import three, show a poster
image until ready, and fall back to the poster for no-WebGL and reduced motion.

## Micro-interactions worth building

Magnetic primary button (pointer-fine only), press-down state (scale 0.97, 90ms),
input focus that moves a label, optimistic success states, skeletons shaped like
the final content, number tweens on data change, `view-transition` between routes
where supported.

---

# Tested patterns from the Reclone game page

Distilled from a working build (`game.html`: isometric room, clones as teammates).
Versions used: three 0.160.0 (importmap from jsdelivr), gsap 3.12.5 + ScrollTrigger
(cdnjs), lenis 1.1.13 (jsdelivr). Recheck current versions before reuse. For a
bundled project, install them locally instead of using a CDN.

## One fixed WebGL stage directed by scroll

One `position:fixed` canvas sits behind the page (`z-index:0`, `pointer-events:none`,
`100lvh`). Sections own *slot* elements; the stage fits its object into whichever
slot rectangle is active and tweens between slots as you scroll.

```js
// slotRect(): interpolate between the hero slot and the next section's slot
const a = heroSlot.getBoundingClientRect(), b = loopSlot.getBoundingClientRect(), t = blend;
const lerp = (p, q) => p + (q - p) * t;
const r = { x: lerp(a.x, b.x), y: lerp(a.y, b.y), w: lerp(a.width, b.width), h: lerp(a.height, b.height) };

// orthographic camera: fit the object's projected size into r, centre it on r
const ppu = Math.min(r.w / info.w, r.h / info.h) * 1.02;            // px per world unit
const fx = info.cx - (r.x + r.w / 2 - W / 2) / ppu, fy = info.cy + (r.y + r.h / 2 - H / 2) / ppu;
cam.left = fx - W / 2 / ppu; cam.right = fx + W / 2 / ppu;
cam.top = fy + H / 2 / ppu;  cam.bottom = fy - H / 2 / ppu; cam.updateProjectionMatrix();

ScrollTrigger.create({ trigger: '#next', start: 'top 95%', end: 'top top', scrub: true,
  onUpdate: (s) => { blend = s.progress; } });                         // hero slot -> next slot
ScrollTrigger.create({ trigger: '#after', start: 'top 95%', end: 'top 35%', scrub: true,
  onUpdate: (s) => { stageOpacity = 1 - s.progress; canvas.style.opacity = stageOpacity; } });
```
`info` comes from projecting the object's bounding-box corners through
`camera.matrixWorldInverse`. Only recompute the projection when the rectangle key
changes. Render from `gsap.ticker.add(tick)`; skip when opacity is ~0 or the tab is
hidden. Mobile needs no special case: the slot is just a block between headline and
controls.

## Pinned scrubbed demo (scroll is the clock)

```js
ScrollTrigger.create({ trigger: '#loop', start: 'top top', end: '+=320%', pin: true, anticipatePin: 1,
  onUpdate: (s) => setDemo(Math.floor(s.progress * FRAMES.length)),
  onEnter: enterDemo, onEnterBack: enterDemo, onLeaveBack: leaveDemo });
```
Keep live play state and demo state as separate objects; the render function takes
a state, never reads globals. Pure state `sim(level, clonePaths, moves)` recomputed
per frame makes scrubbing, undo and restart exact. Crossfade captions with a class
toggle (CSS transition), and drive a progress rail with a CSS variable
(`style.setProperty('--p', x)`).

## Isometric diorama (three.js)

Orthographic camera at `(13,12,13)` looking at the origin; `HemisphereLight` +
warm `DirectionalLight` (castShadow, mapSize 2048, 1024 on small screens,
`shadow.normalBias .03`) + cool fill; `PCFSoftShadowMap`; ACES tone mapping;
`setPixelRatio(min(dpr,2))`; shared geometries and materials; `RoundedBoxGeometry`
actors rotated 45° so a face points at the camera; emissive materials for
interactive parts. Intro: tween each block's `position.y` from below with a delay
proportional to `(x+y)`. Doors/plates animate by lerping toward a target value each
tick (`1 - exp(-dt*15)`); set the value directly under reduced motion.

## No-WebGL and reduced-motion path

```js
try { THREE = await import('three'); if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) throw 0; }
catch { THREE = null; document.documentElement.classList.add('no3d'); }   // hide canvas, show message
if (reduce || !window.gsap) document.documentElement.classList.add('static'); // no pin, no Lenis
```
`.static` lays pinned sections out in normal flow with all captions visible. Content
must never depend on animation initialising.

## Word-by-word scrub, mask lines, echo footer

```js
// walk text nodes, wrap words in <span class="w">, then:
gsap.to('#manifesto .w', { opacity: 1, ease: 'none', stagger: .5,
  scrollTrigger: { trigger: '#manifesto', start: 'top 78%', end: 'bottom 45%', scrub: true } });
// start words at opacity .16 only under `.js`, so no-JS readers see full text

// mask-line headline (give the mask room for descenders)
// .mk{display:block;overflow:hidden;padding-bottom:.12em;margin-bottom:-.12em}
gsap.set('.mk>span', { yPercent: 112, opacity: 1 });
gsap.to('.mk>span', { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: .1,
  scrollTrigger: { trigger: h, start: 'top 85%', once: true } });

// echo footer: layered text-shadows scaled by an animated CSS variable
// .mark{--e:0; text-shadow: calc(var(--e)*.03em) 0 0 rgba(255,138,91,.9), calc(var(--e)*.06em) 0 0 rgba(255,138,91,.55), ...}
gsap.to('#mark', { '--e': 1, ease: 'none', scrollTrigger: { trigger: '#footer', start: 'top 85%', end: 'bottom bottom', scrub: true } });
```
Mask-line `span` starts hidden via CSS only under `.js`; set `yPercent` in JS before
revealing, and add `aria-label` to the heading with `aria-hidden` on the split spans.

---

# Cinematic 3D product scene (tested on the Ashfold ceramics page)

Use when the product is a physical object and the brief asks for award-level or
cinematic. Use 3D when inspecting the real object benefits the visitor; consistent stills
or an authored 2D sequence can be stronger for another brief. Same architecture as the fixed stage above (one canvas, slot rectangles),
plus the points below. Versions: three 0.160.0 with `RoomEnvironment`, gsap 3.12.5.

**Geometry from a profile.** Turned objects (pots, bottles, lamps) are a
`LatheGeometry` of one profile array `[[radius, height], ...]`. Keep all shapes at
the same sample count so scenes can morph by lerping the arrays (lump -> thrown
cylinder -> trimmed vase). Build one closed loop: base centre, outer wall (150
samples, add a small sine ripple for throwing rings), rim lip, inner wall, floor.
Rebuild the geometry only when the damped value changed by more than ~1e-3.
Per-vertex colours give bare-foot clay, thinner glaze on the rim and darker glaze
pooling low; a canvas speckle texture goes in `map` (dark flecks) or `emissiveMap`
(light flecks on dark glaze). Handles: `TubeGeometry` along a `CatmullRomCurve3`.

**Light it like a studio.** `scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture`,
`MeshPhysicalMaterial` with `clearcoat 1`, a warm key `SpotLight` with shadows, a
cool-orange rim light from behind, a low fill, a plinth under the piece, a soft
radial sprite behind it as the light pool. Turn the object, not the lights, so
reflections sweep across the glaze.
- **SpotLight decay.** Physical lights fall off as `I / d^decay`. Use decay 2 and
  intensity around `3 * d^2` (about 12500 at a distance of 65-80 units). A decay of
  1.1 blew the whole scene out to white; check this first if everything is overexposed.
- Turn off `receiveShadow` on the object itself to avoid self-shadow acne on ripples.

**Opening and scroll.** Lights ramp up from 0 over ~3 s while the piece rises and the
turntable spins down (`intro.v` tweened by GSAP; scale intensities by it). The brand
word sits behind the object (outlined type, z-index below the canvas). The page
background and text colour switch between dark and cream sections by toggling a
class on `body` (CSS transition on `background-color`), driven by an
IntersectionObserver on the section centre line. Scroll-linked morph (process stages)
computes a fractional stage index from the step elements' centres, never from raw
scroll progress, so the label always matches the visible text.

**Reuse the engine for thumbnails.** Bake product tiles and picker icons from the same
scene at load: hide plinth and glow, show a `ShadowMaterial` catcher plane, render to
the main canvas at 520x560 with a throwaway camera, `toDataURL('image/png')` in the
same task, then restore size and pixel ratio. 10 bakes cost well under a second and
make the catalogue match the hero.

**Layer order.** Canvas at z-index 1, content wrappers at z-index 2. Anything that must
sit *under* the 3D object (panel backgrounds) cannot live inside those wrappers; use
transparent panels with borders and put glow in the scene instead.

**Fallback.** `?no3d` or a failed WebGL context adds `.no3d`: hide the canvas, show the
2D SVG pieces, keep every control working. Never compute colours with `THREE.Color`
at module top level (it breaks the fallback); convert hex to linear RGB by hand.
