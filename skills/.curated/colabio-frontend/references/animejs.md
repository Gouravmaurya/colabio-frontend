# Anime.js: optional component and SVG choreography

Use when the user requests Anime.js, or the project already uses it for a relevant
animation. It is an optional specialist alongside the required GSAP/ScrollTrigger
and Lenis baseline, not another default dependency. Reuse GSAP when it already
solves the effect. Do not add a second engine just for a logo or ordinary hover.

Inspect the installed `animejs` version first. Current v4 uses named imports such
as `animate` and `createScope`; do not mix v3's default `anime({ targets: ... })`
examples into v4 code. Preserve an existing v3 application unless migration is
requested. Verify the installed version against the official documentation:

- [Getting started](https://animejs.com/documentation/getting-started/)
- [Animation](https://animejs.com/documentation/animation/)
- [Scope media queries](https://animejs.com/documentation/scope/scope-parameters/mediaqueries/)
- [Scope cleanup](https://animejs.com/documentation/scope/scope-methods/revert/)

## Choose a bounded job

Useful candidates include an SVG drawing/morph, ordered stagger, interactive
illustration or self-contained component timeline. Specify the actual subject,
targets, trigger, start/settled states, interruption and fallback. No motion on
essential reading copy until a complete static equivalent is available.

Assign one owner per element/property. Keep GSAP on scroll scenes and Lenis on
scroll transport; give Anime.js a separate component, SVG, or inner wrapper.
Separate transform wrappers when both engines participate in a composition.
Do not let Anime.js and GSAP/CSS compete for the same `transform` or opacity.
Do not drive Lenis from Anime.js or add another Lenis RAF loop. If Anime.js
already owns a component's scroll observation, do not attach a competing
ScrollTrigger to the same effect. Avoid adding another smoothing layer after Lenis.

## Scope and verify

In v4, create a scope rooted in the component. Use its media-query support to
keep reduced motion complete and immediate, and call `scope.revert()` on unmount
or replacement. Return cleanup for listeners created by the scope. Rapid input
must replace or finish the previous animation instead of stacking timelines.
Keep content visible before initialization and when the engine fails to load.

Prefer transforms and opacity to per-frame layout changes. Animate expensive
SVG paths or large masks only when justified, inspect actual playback, and
measure the representative device before claiming smoothness. Verify keyboard,
touch, interrupted transitions, resize, reduced motion and cleanup. Install
`animejs` in the implementation project only after selecting it; adding this
guide does not install a runtime or change an existing site.
