# Motion recipes

Ownership: GSAP owns choreography and scroll scenes, Lenis owns scroll
interpolation, Motion (framer-motion or `motion/react`) owns React component
state transitions, CSS owns simple hover/focus. One owner per element and
property. Check current docs for the installed versions before relying on an
API; the snippets track the documented patterns.

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
let lenis;
if (!reduce) {
  lenis = new Lenis({ autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
// cleanup on unmount: gsap.ticker.remove(fn); lenis?.destroy(); ScrollTrigger.killAll();
```

Keep anchor links, keyboard scrolling, modals (`data-lenis-prevent`) and nested
scrollers working. Never run a second requestAnimationFrame loop.

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
Give a pinned scene the scroll length of its content (1.5-3 viewports), keep
`end` relative, and recompute on fonts/images load (`ScrollTrigger.refresh()`).

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
